
import type { Facility } from '../types/facility';
import { careTypeLabel } from '../lib/careTypes';
import { BRAND_NAME } from '../lib/constants';

const BRAND_SUFFIX = BRAND_NAME;

/**
 * Title/meta generation for community detail pages (/:id).
 *
 * These pages are the directory's traffic engine, so the SERP snippet has to
 * do two jobs at once: read like an answer a searcher wants to click, and stay
 * strictly truthful. Every token below is derived from OUR data — name, city,
 * county, RCFE license number/type/status, licensed-since date, and
 * CDSS-reported capacity. Nothing about amenities, price, ratings, or room
 * types is asserted here, because we don't verify those per-home.
 *
 * The brand suffix is deliberately NOT baked into the community-page title.
 * With a 36-character brand, "{Name} — {Type} in {City}, CA | {Brand}" blows
 * past the ~60-char SERP budget on nearly every home and pushes the city out
 * of the visible title. LocationDetail renders these with `appendBrand={false}`
 * and the brand lives in og:site_name / the meta description instead.
 */

// Soft ceilings. Google renders roughly 60 chars of title and ~155-160 of
// description before truncating; we treat these as targets, not hard failures,
// and fall back to leaner copy when a long facility name would overrun.
const TITLE_TAG_MAX = 62;
const META_MAX = 160;

type SizeClass = 'board_and_care' | 'large_al' | 'generic_al';

/**
 * Classify a home for copy purposes. Capacity is the deciding signal (a 6-bed
 * RCFE is a board & care home; a larger RCFE reads as an assisted living
 * community); care_types is the fallback when CDSS capacity is unknown.
 */
const classifySize = (f: Facility): SizeClass => {
  const cap = f.capacity;
  if (Number.isFinite(cap)) {
    return (cap as number) <= 6 ? 'board_and_care' : 'large_al';
  }
  if (f.care_types.includes('board_and_care')) return 'board_and_care';
  return 'generic_al';
};

const isCurrentRcfe = (f: Facility): boolean =>
  f.license_type === 'RCFE' && f.license_status === 'current';

const isOnProbation = (f: Facility): boolean => f.license_status === 'on_probation';

const nameMentionsAssistedLiving = (name: string): boolean => /assisted living/i.test(name);
const nameMentionsBoardAndCare = (name: string): boolean => /board (?:&|and) care/i.test(name);

const TITLE_TYPE_LABEL: Record<SizeClass, string> = {
  board_and_care: 'Board & Care Home',
  large_al: 'Assisted Living Community',
  generic_al: 'Assisted Living',
};

/**
 * Build the <title>. Front-loads the facility name and city (the tokens people
 * search for and the local-intent signal), appends a care-type qualifier, and
 * adds a "(Licensed RCFE)" trust marker only when the license is current, the
 * home is small enough that the marker adds signal, and it actually fits the
 * title budget. Probation homes never get the positive RCFE marker in the
 * title — the honest framing is carried in the description instead.
 */
const buildTitle = (f: Facility, size: SizeClass): string => {
  const label = TITLE_TYPE_LABEL[size];

  // If the name already carries a care-type word, don't bolt a (possibly
  // different) qualifier onto it — that both lengthens the title and can read
  // as a contradiction (e.g. "…Assisted Living Care Home — Board & Care Home").
  // The description still supplies the accurate classification.
  const nameCarriesType =
    nameMentionsAssistedLiving(f.name) || nameMentionsBoardAndCare(f.name);

  const base = nameCarriesType
    ? `${f.name} in ${f.city}, CA`
    : `${f.name} — ${label} in ${f.city}, CA`;

  if (isCurrentRcfe(f) && size !== 'large_al') {
    const tagged = `${base} (Licensed RCFE)`;
    if (tagged.length <= TITLE_TAG_MAX) return tagged;
  }
  return base;
};

const indefiniteArticle = (word: string): string => (/^[aeiou]/i.test(word) ? 'an' : 'a');

/**
 * Pick the richest description that stays within the meta budget. Candidates
 * are ordered longest→leanest; the last one is guaranteed short so a very long
 * facility name still yields a clean, non-truncated snippet.
 */
const firstFitting = (candidates: string[]): string => {
  const usable = candidates.filter(Boolean);
  for (const candidate of usable) {
    if (candidate.length <= META_MAX) return candidate;
  }
  return usable[usable.length - 1];
};

/**
 * Build the <meta description>: warm, factual, and ending in a soft
 * call-to-action (our inquiries route to free local placement advisors). Only
 * facts we hold are used; capacity and license status appear only when present.
 */
const buildDescription = (f: Facility, size: SizeClass): string => {
  const { name, city } = f;
  const cap = f.capacity;
  const hasCap = Number.isFinite(cap);

  if (isOnProbation(f)) {
    const noun = size === 'board_and_care' ? 'board & care home' : 'assisted living community';
    return firstFitting([
      `${name} is a licensed ${noun} in ${city}, CA. Its RCFE license is currently on probation — see the full CDSS record on the listing. Talk with a free local advisor.`,
      `${name} is a ${noun} in ${city}, CA. RCFE license currently on probation — see the CDSS record. Connect with a free local senior care advisor.`,
      `${name} — ${noun} in ${city}, CA. RCFE license on probation; see the CDSS record. Connect with a free local advisor.`,
      `${name} in ${city}, CA. RCFE license on probation — see the CDSS record. Talk with a free local advisor.`,
    ]);
  }

  if (size === 'board_and_care') {
    return firstFitting([
      hasCap
        ? `${name} is a licensed ${cap}-bed board & care home in ${city}, CA — a small, home-like RCFE. See license details and connect with a free local senior care advisor.`
        : '',
      hasCap
        ? `${name} is a licensed ${cap}-bed board & care home in ${city}, CA. See its RCFE license details and connect with a free local advisor.`
        : '',
      `${name} is a licensed board & care home in ${city}, CA. See license details and connect with a free local senior care advisor.`,
      `${name} is a board & care home in ${city}, CA. Connect with a free local senior care advisor.`,
      `${name} — board & care in ${city}, CA. Talk with a free local advisor.`,
    ]);
  }

  if (size === 'large_al') {
    const noun = nameMentionsAssistedLiving(name) ? 'senior care community' : 'assisted living community';
    return firstFitting([
      hasCap
        ? `${name} is a licensed ${noun} in ${city}, CA with capacity for ${cap} residents. See its RCFE license details and connect with a free local advisor.`
        : '',
      hasCap
        ? `${name} is a licensed ${noun} in ${city}, CA (capacity ${cap}). See license details and connect with a free local senior care advisor.`
        : '',
      hasCap
        ? `${name} — a licensed ${noun} in ${city}, CA, capacity ${cap}. Connect with a free local senior care advisor.`
        : '',
      `${name} is a licensed ${noun} in ${city}, CA. See license details and connect with a free local senior care advisor.`,
      `${name} — ${noun} in ${city}, CA. Connect with a free local senior care advisor.`,
      `${name} in ${city}, CA. Connect with a free local senior care advisor.`,
    ]);
  }

  // generic_al: no CDSS capacity and not flagged board & care. Stay factual and
  // avoid echoing "assisted living" when the name already contains it.
  const licensed = isCurrentRcfe(f);
  const noun = nameMentionsAssistedLiving(name) ? 'senior care home' : 'assisted living care home';
  const nounPhrase = licensed ? `a licensed ${noun}` : `${indefiniteArticle(noun)} ${noun}`;
  const middle = licensed ? 'See its RCFE license details and' : 'Compare care details and';
  return firstFitting([
    `${name} is ${nounPhrase} in ${city}, CA. ${middle} connect with a free local senior care advisor — at no cost to your family.`,
    `${name} is ${nounPhrase} in ${city}, CA. ${middle} connect with a free local senior care advisor.`,
    `${name} — senior care in ${city}, CA. Connect with a free local senior care advisor — at no cost to your family.`,
    `${name} in ${city}, CA. Connect with a free local senior care advisor.`,
  ]);
};

/**
 * Public API: derive the community-page title, meta description, and keywords
 * entirely from verified facility data. Returned titles are brand-free by
 * design — render with `appendBrand={false}`.
 */
export const generateLocationSEO = (location: Facility) => {
  const size = classifySize(location);
  const title = buildTitle(location, size);
  const description = buildDescription(location, size);

  const keywordSet = [
    location.name.toLowerCase(),
    `${location.name.toLowerCase()} ${location.city.toLowerCase()}`,
    `senior living ${location.city.toLowerCase()}`,
    `assisted living ${location.city.toLowerCase()}`,
    size === 'board_and_care' ? `board and care ${location.city.toLowerCase()}` : '',
    location.license_type === 'RCFE' ? `rcfe ${location.city.toLowerCase()}` : '',
    ...location.care_types.map(careTypeLabel).map(s => s.toLowerCase()),
    location.zip,
  ].filter(Boolean);
  const keywords = Array.from(new Set(keywordSet)).join(', ');

  return { title, description, keywords };
};

export const generatePageSEO = (pageName: string, customDescription?: string) => {
  const titles = {
    home: `${BRAND_SUFFIX} — Assisted Living, Memory Care & Board and Care Homes`,
    locations: `Senior Living Communities in Sacramento, CA - Complete Directory | ${BRAND_SUFFIX}`,
    about: `About ${BRAND_SUFFIX} — Your Trusted Senior Living Guide`,
    contact: `Contact ${BRAND_SUFFIX} — Get Help Finding Senior Housing`
  };

  const descriptions = {
    home: `${BRAND_SUFFIX} helps families compare assisted living, memory care, and board and care homes — with free placement advisors guiding the way.`,
    locations: 'Browse our complete directory of senior living communities across Sacramento, CA. Compare assisted living, memory care, and independent living facilities with detailed information.',
    about: `Learn about ${BRAND_SUFFIX}, your trusted resource for finding quality senior living communities throughout the Sacramento area. Expert guidance for families.`,
    contact: `Contact ${BRAND_SUFFIX} for personalized assistance finding the right senior living community. Free consultation and guidance for Sacramento area families.`
  };

  return {
    title: titles[pageName as keyof typeof titles] || `${pageName} | ${BRAND_SUFFIX}`,
    description: customDescription || descriptions[pageName as keyof typeof descriptions] || `${BRAND_SUFFIX} — Your guide to senior living communities.`,
    keywords: 'sacramento senior living, assisted living sacramento, memory care california, senior communities, elderly care sacramento'
  };
};
