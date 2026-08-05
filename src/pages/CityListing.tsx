import { useMemo, useState } from 'react';
import { useParams, Link, Navigate, useNavigate } from 'react-router-dom';
import {
  ChevronRight,
  MapPin,
  ShieldCheck,
  Building2,
  Hospital,
  ArrowRight,
  Mail,
  Phone,
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import InquiryForm from '../components/InquiryForm';
import SEO from '../components/SEO';
import JsonLd from '../components/JsonLd';
import {
  BRAND_NAME,
  DIRECTORY_PHONE,
  SITE_URL,
  formatPhoneForDisplay,
  formatPhoneForTel,
} from '../lib/constants';
import { locations } from '../data/locations';
import type { Facility, CareType } from '../types/facility';
import { careTypeLabel } from '../lib/careTypes';
import { CITIES, cityNameToSlug, findCityBySlug, type City } from '../data/cities';
import { cityCareCounts } from '../lib/cityInventory';
import { licenseBadge, licenseBadgeClasses } from '../lib/licenseBadge';
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildItemListSchema,
  type FaqEntry,
} from '../lib/schema';

/**
 * `senior_living` was removed here in Aug 2026. It rendered an identical list
 * to `assisted_living` in every city — the mode returned the whole city
 * unfiltered, but all 765 facilities in the dataset carry the
 * `assisted_living` care tag, so the set difference was always zero. The 23
 * /senior-living/:city URLs are now 301'd in public/_redirects.
 *
 * If a genuine independent-living or 55+ tag ever lands in the data, a
 * separate mode may be justified again — but only once the two views would
 * actually list different communities.
 */
type ListingMode = 'assisted_living' | 'board_and_care';

interface CityListingProps {
  mode: ListingMode;
}

const MODE_CONFIG: Record<ListingMode, {
  careWord: string;
  careWordLower: string;
  pathBase: string;
  /**
   * Plural noun phrase for counting listings, e.g. "95 {countNoun} listed".
   * Separate from careWordLower because that string already ends in "homes"
   * for board & care — "board & care homes facilities listed" is not English.
   */
  countNoun: string;
}> = {
  assisted_living: {
    careWord: 'Assisted Living',
    careWordLower: 'assisted living',
    pathBase: '/assisted-living',
    countNoun: 'assisted living facilities',
  },
  board_and_care: {
    careWord: 'Board & Care Homes',
    careWordLower: 'board & care homes',
    pathBase: '/board-and-care-homes',
    countNoun: 'board & care homes',
  },
};

/**
 * Listings per page.
 *
 * 24 divides evenly into the 1/2/3-column grid at every breakpoint, and keeps
 * page one of the largest city (Sacramento, 212 listings) to a DOM a headless
 * renderer can take in one pass.
 */
const PAGE_SIZE = 24;

const formatPrice = (n: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(n);

const facilitiesInCity = (citySlug: string): Facility[] =>
  locations.filter(f => cityNameToSlug(f.city) === citySlug);

const facilitiesForListing = (citySlug: string, mode: ListingMode): Facility[] => {
  const inCity = facilitiesInCity(citySlug);
  const tag: CareType = mode === 'board_and_care' ? 'board_and_care' : 'assisted_living';
  return inCity.filter(f => f.care_types.includes(tag));
};

/** Slugs of cities that actually have at least one community of any kind. */
const SLUGS_WITH_DATA = new Set(locations.map(f => cityNameToSlug(f.city)));

const nearestCitiesWithListings = (currentSlug: string, max = 4): City[] => {
  // "Nearby" is a soft notion here without geo — we just pick other Tier-1
  // cities that have at least one community and exclude the current one.
  // For the data we have today (Sacramento + Elk Grove only) the list of
  // nearby links includes Tier-1 cities with no listings; that's fine —
  // those city pages still render (with the graceful empty state) and
  // build internal-link equity for them. Once data backfills, prioritise
  // cities that have listings first.
  const withListings = CITIES.filter(c => SLUGS_WITH_DATA.has(c.slug) && c.slug !== currentSlug);
  const others = CITIES.filter(c => !SLUGS_WITH_DATA.has(c.slug) && c.slug !== currentSlug);
  return [...withListings, ...others].slice(0, max);
};

const buildFaqEntries = (city: City, mode: ListingMode, count: number, priceLow?: number, priceHigh?: number): FaqEntry[] => {
  const careLabel = MODE_CONFIG[mode].careWordLower;
  const costAnswer = (priceLow && priceHigh)
    ? `Among the ${count} communities currently listed in ${city.name}, monthly rates run from about ${formatPrice(priceLow)} to ${formatPrice(priceHigh)}. Final pricing depends on care level, room type, and current availability — our placement advisors can confirm what each community is quoting this week. For Medi-Cal eligibility, see our guide: Does Medi-Cal pay for assisted living?`
    : `${city.name} ${careLabel} pricing varies by care level and room type. Our placement advisors track current rates across ${city.name} communities and can share what each one is quoting this week — no fee to families. For Medi-Cal eligibility, see our guide: Does Medi-Cal pay for assisted living?`;

  return [
    {
      question: `How much does ${careLabel} cost in ${city.name}?`,
      answer: costAnswer,
    },
    {
      question: `What's the difference between assisted living and memory care?`,
      answer:
        "Assisted living is for older adults who need help with day-to-day tasks (dressing, medications, meals) but don't have significant cognitive impairment. Memory care is a specialised, secured environment with staff trained in dementia and Alzheimer's care. Many communities offer both side by side. For a deeper breakdown, see our guide: Assisted living vs. memory care.",
    },
    {
      question: `What is a Residential Care Facility for the Elderly (RCFE)?`,
      answer:
        "RCFE is California's licensing category for non-medical assisted living, regulated by the Department of Social Services' Community Care Licensing Division (CDSS / CCLD). Every assisted living and memory care community on this directory is RCFE-licensed; you can verify any license by name on the CCLD facility search. For more, see our guide: What is an RCFE?",
    },
    {
      question: `Does Medi-Cal cover assisted living in California?`,
      answer:
        "Medi-Cal generally does not pay the room and board cost of assisted living, but California's Assisted Living Waiver (ALW) program can cover care services in participating communities for eligible residents. Availability is limited and rules change. See our resource page on Medi-Cal and assisted living for the current picture.",
    },
    {
      question: `How do I tour ${careLabel} communities in ${city.name}?`,
      answer: `Most ${city.name} communities will schedule a tour within a few days. We can arrange tours on your behalf, attend with you if you'd like, and help interpret what you see. There's no fee to families.`,
    },
  ];
};

/* ----------------------------- card sub-component ---------------------------- */


const CommunityCard = ({ facility }: { facility: Facility }) => {
  const hero = facility.photos?.[0];
  const badge = licenseBadge(facility);
  const badgeStyle = badge ? licenseBadgeClasses(badge.tone) : null;
  return (
    <li>
      <Link
        to={`/${facility.id}`}
        className="group flex flex-col h-full bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
        aria-label={`${facility.name} in ${facility.city}, California`}
      >
        <div className="relative overflow-hidden">
          {hero ? (
            <img
              src={hero.url}
              alt={hero.alt}
              loading="lazy"
              className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-700"
            />
          ) : (
            <div
              aria-hidden="true"
              className="w-full h-56 bg-gradient-to-br from-sage-100 via-teal-50 to-teal-100"
            />
          )}
          {/* No licence status, no badge. Not a grey badge, not "unverified" —
              nothing. See src/lib/licenseBadge.ts. */}
          {badge && badgeStyle && (
            <div className={`absolute top-3 left-3 inline-flex items-center gap-1.5 ${badgeStyle.pill} text-xs font-medium rounded-full px-3 py-1.5 shadow-sm`}>
              <ShieldCheck size={14} className={badgeStyle.icon} aria-hidden="true" />
              {badge.text}
            </div>
          )}
        </div>

        <div className="p-6 flex flex-col flex-1 gap-3">
          <h3 className="font-serif text-xl font-semibold text-neutral-800 group-hover:text-teal-700 transition-colors">
            {facility.name}
          </h3>
          <div className="flex items-center gap-2 text-neutral-600">
            <MapPin size={14} className="text-teal-700 flex-shrink-0" aria-hidden="true" />
            {/* Licensed capacity is appended as text inside the existing line
                rather than as its own element. It is the most useful
                comparison axis for RCFEs (most are six-bed homes) and it is
                present on every imported record — but this markup repeats up
                to 212 times per page, so it must not add nodes. */}
            <span className="text-sm">
              {facility.neighborhood ? `${facility.neighborhood}, ` : ''}
              {facility.city}, CA {facility.zip}
              {Number.isFinite(facility.capacity) && ` · ${facility.capacity} beds`}
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {facility.care_types.map(t => (
              <span
                key={t}
                className="bg-teal-50 text-teal-800 rounded-full px-2.5 py-0.5 text-xs font-medium"
              >
                {careTypeLabel(t)}
              </span>
            ))}
          </div>

          {Number.isFinite(facility.price_range_low) && (
            <p className="text-neutral-700 text-sm mt-auto pt-2">
              From <span className="font-semibold text-neutral-800">
                {formatPrice(facility.price_range_low!)}
              </span>
              {Number.isFinite(facility.price_range_high) && (
                <>
                  {' '}–{' '}
                  <span className="font-semibold text-neutral-800">
                    {formatPrice(facility.price_range_high!)}
                  </span>
                </>
              )}
              <span className="text-neutral-600"> / month</span>
            </p>
          )}

          {/* TODO: wire a real "Compare" tray. For now this is visual-only;
              click bubbles to the wrapping Link, which intentionally lands
              the user on the facility's detail page rather than nothing. */}
          <div className="pt-2 flex items-center justify-end text-sm font-medium text-teal-700 group-hover:text-teal-800 transition-colors">
            View details
            <ArrowRight size={14} className="ml-1 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
          </div>
        </div>
      </Link>
    </li>
  );
};

/* ---------------------------------- main page -------------------------------- */

const CityListing = ({ mode }: CityListingProps) => {
  const { citySlug, page: pageParam } = useParams<{ citySlug: string; page?: string }>();
  const city = citySlug ? findCityBySlug(citySlug) : undefined;

  if (!city) {
    // Unknown slug — defer to the catch-all NotFound. Using <Navigate> keeps
    // the URL intact for the 404 page.
    return <Navigate to="/404-not-found" replace />;
  }

  const allInCity = useMemo(() => facilitiesInCity(city.slug), [city.slug]);
  const filtered = useMemo(() => facilitiesForListing(city.slug, mode), [city.slug, mode]);

  // Filters: care-type subset + sort
  const [careFilter, setCareFilter] = useState<CareType | 'all'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'price-low'>('name');

  const visible = useMemo(() => {
    let list = filtered;
    if (careFilter !== 'all') list = list.filter(f => f.care_types.includes(careFilter));
    list = [...list].sort((a, b) => {
      if (sortBy === 'price-low') {
        const ap = a.price_range_low ?? Number.POSITIVE_INFINITY;
        const bp = b.price_range_low ?? Number.POSITIVE_INFINITY;
        return ap - bp;
      }
      return a.name.localeCompare(b.name);
    });
    return list;
  }, [filtered, careFilter, sortBy]);

  /* Pagination.
     Sacramento listed 212 cards on one URL, producing a ~636 KB DOM with a
     0.8% text-to-markup ratio and tripping crawlers' "more than 1500 nodes"
     warning. That is the page shape most likely to strain a prerender
     function, and no amount of copy fixes a ratio dominated by markup.
     Paging to PAGE_SIZE cuts page one to roughly a fifth of that. */
  const totalPages = Math.max(1, Math.ceil(visible.length / PAGE_SIZE));
  const requestedPage = Number(pageParam ?? '1');
  const pageIsValid =
    Number.isInteger(requestedPage) && requestedPage >= 1 && requestedPage <= totalPages;
  const page = pageIsValid ? requestedPage : 1;
  const pageItems = visible.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const navigate = useNavigate();
  // Filters are client-side state, so a filtered set can be shorter than the
  // page the URL asks for. Send the reader back to page one rather than
  // stranding them on an empty page.
  const resetToFirstPage = () => {
    if (pageParam) navigate(`${pathBase}/${city.slug}`);
  };

  // Aggregate price data (only used if at least 2 communities have prices)
  const priceLows = filtered.map(f => f.price_range_low).filter((n): n is number => Number.isFinite(n));
  const priceHighs = filtered.map(f => f.price_range_high).filter((n): n is number => Number.isFinite(n));
  const hasPriceData = priceLows.length >= 2;
  const priceMin = hasPriceData ? Math.min(...priceLows) : undefined;
  const priceMax = hasPriceData ? Math.max(...priceHighs) : undefined;

  const count = filtered.length;
  const allCareTypes = Array.from(
    new Set(filtered.flatMap(f => f.care_types)),
  );
  // CDSS/CCLD-verified subset. Reported honestly rather than rounded up to
  // `count` — a handful of records carry a non-current licence status.
  const licensedCount = filtered.filter(f => f.license_status === 'current').length;
  // CDSS-reported licensed capacity. Six is the statutory line between a small
  // board & care home and a larger RCFE, and it is the distinction families
  // actually choose between.
  const smallHomeCount = filtered.filter(f => Number.isFinite(f.capacity) && f.capacity! <= 6).length;

  // /page/1 and out-of-range pages both collapse to the bare city URL rather
  // than rendering. /page/1 would otherwise be a second URL serving identical
  // content to the page that carries the city's ranking intent, and an
  // out-of-range page would be an empty listing returning 200.
  if (pageParam && (!pageIsValid || requestedPage === 1)) {
    return <Navigate to={`${MODE_CONFIG[mode].pathBase}/${city.slug}`} replace />;
  }

  /* SEO */
  const { careWord, careWordLower, pathBase, countNoun } = MODE_CONFIG[mode];
  const basePath = `${pathBase}/${city.slug}`;
  // Page one lives at the bare city URL, never at /page/1 — one canonical
  // home for the term, no self-competing duplicate. Pages 2+ are ordinary
  // indexable URLs with their own self-referencing canonical, which is
  // Google's current guidance for paginated sequences (rel=next/prev has
  // been unused since 2019). Their titles carry the page number so they are
  // not near-duplicates of page one.
  const path = page > 1 ? `${basePath}/page/${page}` : basePath;
  const canonical = `${SITE_URL}${path}`;
  const pageSuffix = totalPages > 1 && page > 1 ? ` — Page ${page} of ${totalPages}` : '';

  let title: string;
  if (mode === 'assisted_living') {
    // "Facilities", not "Communities". The word appeared nowhere on this
    // template, and it carries real volume: 17 ranking keywords / 6,090
    // searches a month across the site use it, including "assisted living
    // facilities in sacramento" (1,300/mo, KD 4) which currently lands on the
    // homepage at position 28. "Communities" survives in the H2 and body copy.
    title = page > 1
      ? `Assisted Living in ${city.name}, CA${pageSuffix}`
      : `Assisted Living in ${city.name}, CA — ${count > 0 ? `Compare ${count} Facilities & Costs` : 'Facilities & Costs'}`;
  } else {
    title = page > 1
      ? `Board & Care Homes in ${city.name}, CA${pageSuffix}`
      : `Board & Care Homes in ${city.name}, CA — ${count > 0 ? `${count} Licensed Small RCFEs` : 'Small Licensed RCFEs'}`;
  }

  // Meta description aims for 150–160 chars. We assemble from data so the
  // count is always honest; the template is sized to stay within budget at
  // typical city/count combinations.
  let description: string;
  if (mode === 'assisted_living') {
    description = count > 0
      ? `Compare ${count} assisted living communities in ${city.name}, CA — real costs, license-verified senior living, and a free local advisor for families.`
      : `${city.name}, CA assisted living and senior living guide. License-verified communities across the Sacramento metro and a free local advisor for families.`;
  } else {
    description = count > 0
      ? `Compare ${count} licensed board & care homes (RCFEs, capacity 6 or fewer) in ${city.name}, CA. License-verified small senior care homes with a free advisor.`
      : `Board & care homes (small RCFEs) in ${city.name}, CA — license-verified residential care for the elderly with a free local advisor for families.`;
  }

  if (page > 1) {
    // Pages 2+ get their own description so they are not duplicates of page
    // one in the SERP. They carry no unique search intent — they exist to
    // hold inventory and to be crawled.
    description = `${countNoun.charAt(0).toUpperCase()}${countNoun.slice(1)} in ${city.name}, CA — page ${page} of ${totalPages}, listings ${(page - 1) * PAGE_SIZE + 1}–${Math.min(page * PAGE_SIZE, visible.length)} of ${visible.length}.`;
  }

  const keywords = Array.from(new Set([
    `${careWordLower} ${city.name.toLowerCase()}`,
    `senior living ${city.name.toLowerCase()}`,
    `${city.name.toLowerCase()} assisted living`,
    mode === 'assisted_living' ? `assisted living facilities ${city.name.toLowerCase()}` : '',
    mode === 'board_and_care' ? `board and care homes ${city.name.toLowerCase()}` : '',
    'memory care sacramento',
    'residential care for the elderly',
    'RCFE',
    'senior care homes',
  ].filter(Boolean))).join(', ');

  const faqEntries = buildFaqEntries(city, mode, count, priceMin, priceMax);

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: careWord, url: pathBase },
    { name: city.name, url: path },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <SEO
        title={title}
        description={description}
        keywords={keywords}
        canonical={canonical}
        appendBrand={false}
      />
      <JsonLd data={buildBreadcrumbSchema(breadcrumbs)} />
      {/* ItemList describes the listings actually on THIS page. Emitting the
          full city on every page would tell a crawler each page carries all
          212 items, which is not what it can see. */}
      <JsonLd data={buildItemListSchema(pageItems, path)} />
      {/* FAQPage only on page one — repeating the same five questions across
          every page of a sequence is duplicate structured data. */}
      {page === 1 && <JsonLd data={buildFaqSchema(faqEntries)} />}

      <Header />
      <main className="flex-grow">

        {/* HERO */}
        <section className="bg-sage-50">
          <div className="container-custom py-12 md:py-16">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="text-sm text-neutral-600 mb-6">
              <ol className="flex items-center flex-wrap gap-1">
                <li><Link to="/" className="hover:text-teal-700">Home</Link></li>
                <li aria-hidden="true"><ChevronRight size={14} className="text-neutral-400" /></li>
                <li><Link to={pathBase} className="hover:text-teal-700">{careWord}</Link></li>
                <li aria-hidden="true"><ChevronRight size={14} className="text-neutral-400" /></li>
                <li className="text-neutral-800 font-medium">{city.name}</li>
              </ol>
            </nav>

            <div className="max-w-3xl">
              <p className="text-sm font-semibold tracking-wide text-teal-700 uppercase">
                {city.county} County
              </p>
              <h1 className="mt-2 font-serif text-3xl md:text-5xl font-bold text-neutral-800 leading-tight">
                {careWord} in {city.name}, CA
              </h1>
              <p className="mt-5 text-lg text-neutral-700 leading-relaxed">
                {count > 0 ? (
                  <>
                    The directory lists <strong>{count}</strong>{' '}
                    {mode === 'assisted_living' ? 'license-verified assisted living facilities' : 'board & care homes'} in{' '}
                    {city.name}, CA — from six-resident board & care homes to larger senior living
                    communities{allCareTypes.length > 0 && (
                      <>, covering {allCareTypes.map(careTypeLabel).join(', ')}</>
                    )}.
                    {' '}{city.description} {mode === 'board_and_care'
                      ? 'Board & care homes are small, license-verified residential care facilities for the elderly (RCFEs) with a maximum of 6 residents.'
                      : 'Compare monthly costs, licensed capacity, care type, and current CA Community Care Licensing status side by side.'}
                  </>
                ) : (
                  <>
                    We're actively adding {careWordLower} communities in{' '}
                    {city.name}. {city.description} In the meantime, our placement advisors track
                    {' '}{city.name} {careWordLower} openings across
                    the Sacramento metro — no fee for families.
                  </>
                )}
              </p>
            </div>

            {/* At-a-glance comparison figures. Every value is computed from the
                live listing set, so none of it can drift from the cards below.
                Kept to four short text tiles on purpose: this template already
                renders a ~636 KB DOM on the larger cities (212 unpaginated
                cards on /assisted-living/sacramento), and the fix for that is
                pagination or prerendering, not more markup here. */}
            {count > 0 && (
              <ComparisonSnapshot
                count={count}
                countNoun={countNoun}
                licensedCount={licensedCount}
                smallHomeCount={smallHomeCount}
                priceMin={priceMin}
                priceMax={priceMax}
              />
            )}

            {/* Cross-links to the other care-type variants for THIS city —
                keeps the three variants from being orphans of each other
                and gives families an explicit way to switch view. */}
            <VariantCrossLinks city={city} currentMode={mode} />

            {/* Filters bar (only show when there are listings to filter) */}
            {count > 0 && (
              <div className="mt-8 bg-white border border-neutral-200 rounded-2xl p-4 md:p-5 flex flex-col md:flex-row gap-3 md:items-center">
                <div className="flex items-center gap-2 text-neutral-700 text-sm font-medium md:mr-4">
                  <Building2 size={16} className="text-teal-700" aria-hidden="true" />
                  Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, visible.length)} of {visible.length}
                </div>
                <div className="flex-1 flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <label htmlFor="care-filter" className="sr-only">Care type</label>
                    <select
                      id="care-filter"
                      value={careFilter}
                      onChange={(e) => { setCareFilter(e.target.value as CareType | 'all'); resetToFirstPage(); }}
                      className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-neutral-800 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                      <option value="all">All care types</option>
                      {allCareTypes.map(t => (
                        <option key={t} value={t}>{careTypeLabel(t)}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex-1">
                    <label htmlFor="sort" className="sr-only">Sort by</label>
                    <select
                      id="sort"
                      value={sortBy}
                      onChange={(e) => { setSortBy(e.target.value as 'name' | 'price-low'); resetToFirstPage(); }}
                      className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-neutral-800 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                      <option value="name">Sort: Name (A-Z)</option>
                      <option value="price-low">Sort: Lowest starting price</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* COMMUNITY LIST */}
        <section aria-labelledby="community-list-heading" className="bg-white">
          <div className="container-custom py-12 md:py-16">
            {count > 0 ? (
              <>
                <h2 id="community-list-heading" className="font-serif text-2xl md:text-3xl font-bold text-neutral-800 mb-8">
                  {careWord} communities in {city.name}
                </h2>
                {visible.length > 0 ? (
                  <>
                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {pageItems.map(f => <CommunityCard key={f.id} facility={f} />)}
                    </ul>
                    <Pagination page={page} totalPages={totalPages} basePath={basePath} />
                  </>
                ) : (
                  <p className="text-neutral-700">
                    No communities match those filters. <button
                      type="button"
                      className="text-teal-700 hover:text-teal-800 font-medium underline-offset-2 hover:underline"
                      onClick={() => { setCareFilter('all'); setSortBy('name'); resetToFirstPage(); }}
                    >Clear filters</button>.
                  </p>
                )}
              </>
            ) : (
              <EmptyStateBlock city={city} />
            )}
          </div>
        </section>

        {/* COST SECTION */}
        <section aria-labelledby="cost-heading" className="bg-neutral-50">
          <div className="container-custom py-12 md:py-16">
            <h2 id="cost-heading" className="font-serif text-2xl md:text-3xl font-bold text-neutral-800">
              {careWord} costs in {city.name}
            </h2>
            {hasPriceData ? (
              <>
                {/* Wording matters here: on a page listing 95 or 212
                    communities, "based on N communities" reads as though the
                    page only knows about N. It is the number that PUBLISH a
                    rate that is small, not the inventory. */}
                <p className="mt-4 text-lg text-neutral-700 leading-relaxed max-w-3xl">
                  {priceLows.length} of the {count} {careWord.toLowerCase()} communities listed in {city.name}{' '}
                  publish their monthly rates; those run from <strong>{formatPrice(priceMin!)}</strong> to{' '}
                  <strong>{formatPrice(priceMax!)}</strong>. Most smaller board & care homes quote by phone
                  instead. Pricing varies with care level, room type, and any add-on services — ask an advisor
                  what each community is quoting this week.
                </p>
                <div className="mt-6 inline-flex items-stretch border border-neutral-200 rounded-lg overflow-hidden bg-white">
                  <div className="px-5 py-4 border-r border-neutral-200">
                    <p className="text-xs text-neutral-600 uppercase tracking-wide">Starts from</p>
                    <p className="font-serif text-2xl font-bold text-teal-800 mt-1">{formatPrice(priceMin!)}</p>
                  </div>
                  <div className="px-5 py-4">
                    <p className="text-xs text-neutral-600 uppercase tracking-wide">Up to</p>
                    <p className="font-serif text-2xl font-bold text-teal-800 mt-1">{formatPrice(priceMax!)}</p>
                  </div>
                </div>
              </>
            ) : (
              <p className="mt-4 text-lg text-neutral-700 leading-relaxed max-w-3xl">
                Posted monthly rates for {city.name} {careWord.toLowerCase()} communities vary widely depending
                on care level, room type, and shared vs. private. Our placement advisors track current pricing
                and can share what each community is quoting this week.{' '}
                <Link to="/contact" className="text-teal-700 hover:text-teal-800 font-medium underline-offset-2 hover:underline">
                  Get current pricing
                </Link>. Cost-constrained?{' '}
                <Link to="/resources/medi-cal-and-assisted-living" className="text-teal-700 hover:text-teal-800 font-medium underline-offset-2 hover:underline">
                  See whether Medi-Cal can help
                </Link>.
              </p>
            )}
          </div>
        </section>

        {/* LOCAL CONTEXT */}
        <section aria-labelledby="local-context-heading" className="bg-white">
          <div className="container-custom py-12 md:py-16">
            <h2 id="local-context-heading" className="font-serif text-2xl md:text-3xl font-bold text-neutral-800">
              About senior living in {city.name}
            </h2>
            <div className="grid md:grid-cols-2 gap-8 mt-6">
              <div>
                <p className="text-lg text-neutral-700 leading-relaxed">
                  {city.description} For families touring {city.name} senior living, we recommend visiting
                  multiple communities, asking each one about its current waitlist, and confirming the active
                  CA Community Care Licensing (CCLD) status before committing.
                </p>
              </div>
              <div className="bg-sage-50 border border-teal-100 rounded-2xl p-6">
                <div className="flex items-center gap-2 text-teal-700 mb-3">
                  <Hospital size={18} aria-hidden="true" />
                  <span className="text-sm font-semibold uppercase tracking-wide">Nearby hospitals</span>
                </div>
                {city.nearbyHospitals.length > 0 ? (
                  <ul className="space-y-2 text-neutral-700">
                    {city.nearbyHospitals.map(h => (
                      <li key={h} className="flex items-start gap-2">
                        <span aria-hidden="true" className="text-teal-700 mt-1">·</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  /* TODO: replace with specific hospital names once confirmed for {city.name}. */
                  <p className="text-neutral-700">
                    Major medical centers serving {city.name} are within the broader{' '}
                    {city.county} County hospital network.
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section aria-labelledby="faq-heading" className="bg-sage-50">
          <div className="container-custom py-12 md:py-16">
            <h2 id="faq-heading" className="font-serif text-2xl md:text-3xl font-bold text-neutral-800">
              Common questions about {careWord.toLowerCase()} in {city.name}
            </h2>
            <dl className="mt-8 space-y-6 max-w-3xl">
              {faqEntries.map(({ question, answer }) => (
                <div key={question} className="bg-white border border-teal-100 rounded-2xl p-6">
                  <dt>
                    <h3 className="font-serif text-lg font-semibold text-neutral-800">{question}</h3>
                  </dt>
                  <dd className="mt-2 text-neutral-700 leading-relaxed">{answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* RELATED GUIDES — internal-link funnel to the editorial guides */}
        <RelatedGuidesBlock />

        {/* NEARBY CITIES */}
        <NearbyCitiesBlock currentSlug={city.slug} mode={mode} />

        {/* ADVISOR CTA + inline inquiry form */}
        <section aria-labelledby="advisor-cta-heading" className="bg-coral-700 text-white">
          <div className="container-custom py-16 md:py-20">
            <div className="grid md:grid-cols-2 gap-10 items-start">
              <div>
                <p className="text-sm font-semibold tracking-wide text-white/80 uppercase">Talk to a local advisor</p>
                <h2 id="advisor-cta-heading" className="mt-2 font-serif text-3xl md:text-4xl font-bold leading-tight">
                  {city.name} {careWord.toLowerCase()} is easier with a person on the phone.
                </h2>
                <p className="mt-4 text-lg text-white/90 leading-relaxed max-w-2xl">
                  Free for families. A Sacramento-based advisor calls you back the same day, listens to what your
                  loved one needs, and shortlists {city.name} {careWord.toLowerCase()} communities that actually have availability.
                </p>
                <ul className="mt-6 space-y-2 text-white/90 text-sm">
                  <li>· No fee to families. We're paid by the community when there's a match.</li>
                  <li>· Every community we recommend is CA-licensed and currently verified.</li>
                  <li>· Your information is shared only with our advisors — never sold.</li>
                </ul>
              </div>
              <div className="text-neutral-800">
                <InquiryForm
                  city={city.name}
                  defaultCareType={
                    mode === 'board_and_care'
                      ? 'Board & Care Home'
                      : mode === 'assisted_living'
                      ? 'Assisted Living'
                      : undefined
                  }
                  heading={`Talk to a ${city.name} advisor`}
                  subheading="Tell us what you're looking for. We'll follow up today."
                />
              </div>
            </div>
          </div>
        </section>



      </main>
      <Footer />

      {/* Brand crumb for assistive tech; visible brand is in the Header */}
      <span className="sr-only">{BRAND_NAME}</span>
    </div>
  );
};

/* ----------------------- comparison snapshot ----------------------- */

/**
 * Four-figure summary that answers the comparison question a city-level
 * searcher is actually asking, above the fold and before the card grid.
 *
 * EVERY TILE MUST BE EVIDENCED BY A CDSS FIELD. That constraint is why the
 * care-type tile was removed in Aug 2026 and replaced with the capacity
 * distribution.
 *
 * The site's care-type taxonomy is derived from bed count, not from
 * licensing — scripts/import-cdss.mjs assigns `board_and_care` when capacity
 * is 6 or fewer and `assisted_living` to everything, and never assigns
 * `memory_care` at all. The source CCLD roster has no dementia field to
 * derive it from. So all 24 `memory_care` tags in the dataset are hand-set on
 * the 24 curated records, and a "3 care types" tile on a 95-facility page was
 * resting on 3 of them. Not a false claim, but far too soft for a page whose
 * entire pitch is license-verified data.
 *
 * Licensed capacity IS a real CDSS field on every imported record, and it is
 * the more useful comparison axis for RCFEs anyway — the practical choice
 * families make is between a six-resident house and a large community.
 *
 * The price tile only appears when at least two listed communities publish
 * rates (`hasPriceData` upstream). Most small RCFEs quote by phone, and the
 * directory does not invent figures.
 */
const ComparisonSnapshot = ({
  count,
  countNoun,
  licensedCount,
  smallHomeCount,
  priceMin,
  priceMax,
}: {
  count: number;
  countNoun: string;
  licensedCount: number;
  smallHomeCount: number;
  priceMin?: number;
  priceMax?: number;
}) => {
  const tiles: { value: string; label: string }[] = [
    { value: String(count), label: `${countNoun} listed` },
  ];

  if (licensedCount > 0) {
    tiles.push({
      value: String(licensedCount),
      label: 'with a current CA license',
    });
  }

  // Only shown when it actually discriminates. On the board & care view every
  // listing is six residents or fewer by definition, so the tile would just
  // restate the page.
  if (smallHomeCount > 0 && smallHomeCount < count) {
    tiles.push({
      value: String(smallHomeCount),
      label: 'six-resident homes',
    });
  }

  if (priceMin !== undefined && priceMax !== undefined) {
    tiles.push({
      value: `${formatPrice(priceMin)}–${formatPrice(priceMax)}`,
      label: 'published monthly range',
    });
  }

  return (
    <dl className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3">
      {tiles.map(t => (
        // flex-col-reverse renders the value above its label while keeping the
        // required dt-then-dd order in the DOM, so the figure is not announced
        // twice by a screen reader.
        <div
          key={t.label}
          className="flex flex-col-reverse bg-white border border-teal-100 rounded-xl px-4 py-3"
        >
          <dt className="mt-1 text-sm text-neutral-600 leading-snug">{t.label}</dt>
          <dd className="font-serif text-2xl font-bold text-teal-800">{t.value}</dd>
        </div>
      ))}
    </dl>
  );
};

/* ----------------------- variant cross-links ----------------------- */

/**
 * "Also in {City}" — small link strip pointing to the OTHER care-type
 * variants of the same city. Solves the orphan-variant problem (the three
 * variants for the same city share keywords but had nothing linking them
 * to each other) and gives families a one-click way to broaden or narrow
 * their view without leaving the city.
 *
 * We only render a link to /board-and-care-homes/{slug} when there's
 * actual small-RCFE inventory in that city — emitting an empty page link
 * would just look broken.
 */
const VariantCrossLinks = ({
  city,
  currentMode,
}: {
  city: City;
  currentMode: ListingMode;
}) => {
  const counts = cityCareCounts(city.slug);

  const variants: { mode: ListingMode; label: string; path: string; show: boolean }[] = [
    {
      mode: 'assisted_living',
      label: `Assisted Living in ${city.name}`,
      path: `/assisted-living/${city.slug}`,
      show: counts.assistedLiving > 0,
    },
    {
      mode: 'board_and_care',
      label: `Board & Care Homes in ${city.name}`,
      path: `/board-and-care-homes/${city.slug}`,
      show: counts.boardAndCare > 0,
    },
  ];

  const others = variants.filter(v => v.mode !== currentMode && v.show);
  if (others.length === 0) return null;

  return (
    <div className="mt-6 inline-flex flex-wrap items-center gap-2 bg-white/70 border border-teal-100 rounded-lg px-4 py-2.5">
      <span className="text-xs font-semibold tracking-wide text-teal-700 uppercase">
        Also in {city.name}:
      </span>
      {others.map(v => (
        <Link
          key={v.path}
          to={v.path}
          className="text-sm text-teal-800 hover:text-teal-900 font-medium underline-offset-2 hover:underline"
        >
          {v.label}
        </Link>
      ))}
    </div>
  );
};

/* ----------------------- empty-state + nearby-links blocks ----------------------- */

const EmptyStateBlock = ({ city }: { city: City }) => {
  const otherCities = CITIES.filter(c => SLUGS_WITH_DATA.has(c.slug) && c.slug !== city.slug);
  return (
    <div className="bg-sage-50 border border-teal-100 rounded-2xl p-8 md:p-12">
      <h2 className="font-serif text-2xl font-bold text-neutral-800">
        We're adding communities in {city.name}
      </h2>
      <p className="mt-4 text-lg text-neutral-700 leading-relaxed max-w-2xl">
        The directory doesn't have license-verified listings in {city.name} yet — we don't post communities
        we haven't confirmed. In the meantime, our placement advisors track {city.name} assisted living and
        senior living openings across the Sacramento metro at no cost to families.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
          Talk to an advisor about {city.name}
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
        {otherCities.length > 0 && (
          <Link to="/locations" className="btn-outline inline-flex items-center gap-2">
            See all communities
          </Link>
        )}
      </div>
      {otherCities.length > 0 && (
        <div className="mt-8">
          <p className="text-sm font-semibold tracking-wide text-teal-700 uppercase">Nearby cities with listings</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {otherCities.map(c => (
              <li key={c.slug}>
                <Link
                  to={`/assisted-living/${c.slug}`}
                  className="inline-flex items-center bg-white border border-teal-200 text-teal-800 rounded-full px-4 py-1.5 text-sm font-medium hover:border-teal-300 transition-colors"
                >
                  Assisted Living in {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const GUIDE_LINKS: { title: string; blurb: string; to: string }[] = [
  {
    title: 'Assisted living vs. memory care',
    blurb: 'Side-by-side comparison, who needs which, and how to decide.',
    to: '/guides/assisted-living-vs-memory-care',
  },
  {
    title: 'Board and care vs. assisted living',
    blurb: 'Small 6-bed homes vs. larger communities — the trade-offs.',
    to: '/guides/board-and-care-vs-assisted-living',
  },
  {
    title: 'What is an RCFE?',
    blurb: "California's senior care license explained, plus how to verify any community.",
    to: '/guides/what-is-an-rcfe',
  },
  {
    title: 'Does Medi-Cal pay for assisted living?',
    blurb: "What Medi-Cal covers, what the Assisted Living Waiver does, and what doesn't qualify.",
    to: '/resources/medi-cal-and-assisted-living',
  },
];

const RelatedGuidesBlock = () => (
  <section aria-labelledby="related-guides-heading" className="bg-neutral-50">
    <div className="container-custom py-12 md:py-16">
      <h2
        id="related-guides-heading"
        className="font-serif text-2xl md:text-3xl font-bold text-neutral-800"
      >
        Family guides: how senior care actually works
      </h2>
      <p className="mt-3 text-neutral-700 max-w-2xl">
        Plain-language answers to the questions families ask before touring.
      </p>
      <ul className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {GUIDE_LINKS.map(g => (
          <li key={g.to}>
            <Link
              to={g.to}
              className="block bg-white border border-neutral-200 rounded-xl p-5 hover:border-teal-300 hover:shadow-md transition-all group h-full"
            >
              <p className="font-serif text-lg font-semibold text-neutral-800 group-hover:text-teal-700 transition-colors">
                {g.title}
              </p>
              <p className="mt-2 text-sm text-neutral-600 leading-relaxed">{g.blurb}</p>
              <span className="mt-3 inline-flex items-center text-sm font-medium text-teal-700">
                Read the guide
                <ArrowRight size={14} className="ml-1 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

const NearbyCitiesBlock = ({ currentSlug, mode }: { currentSlug: string; mode: ListingMode }) => {
  const cities = nearestCitiesWithListings(currentSlug, 4);
  if (cities.length === 0) return null;
  const { careWord, pathBase: basePath } = MODE_CONFIG[mode];
  return (
    <section aria-labelledby="nearby-heading" className="bg-white">
      <div className="container-custom py-12 md:py-16">
        <h2 id="nearby-heading" className="font-serif text-2xl md:text-3xl font-bold text-neutral-800">
          {careWord} in nearby Sacramento-area cities
        </h2>
        <ul className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {cities.map(c => (
            <li key={c.slug}>
              <Link
                to={`${basePath}/${c.slug}`}
                className="block bg-sage-50 border border-teal-100 rounded-xl p-5 hover:border-teal-300 hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-2 text-teal-700">
                  <MapPin size={16} aria-hidden="true" />
                  <span className="text-xs font-semibold uppercase tracking-wide">{c.county} County</span>
                </div>
                <p className="mt-2 font-serif text-lg font-semibold text-neutral-800 group-hover:text-teal-700 transition-colors">
                  {careWord} in {c.name}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

/* ----------------------------- pagination ----------------------------- */

/**
 * Numbered pagination for the listing grid.
 *
 * Real <Link>s, not buttons: the sequence has to be crawlable, and page one
 * is the only page carrying the city's ranking intent. Page one is always the
 * bare city URL — /page/1 is never linked and redirects away — so there is
 * exactly one canonical home for the term.
 *
 * Long sequences are elided (1 … 4 5 6 … 9) so a 212-listing city does not
 * put nine links in front of the reader, but first and last are always
 * reachable in one click.
 */
const Pagination = ({
  page,
  totalPages,
  basePath,
}: {
  page: number;
  totalPages: number;
  basePath: string;
}) => {
  if (totalPages <= 1) return null;

  const href = (n: number) => (n === 1 ? basePath : `${basePath}/page/${n}`);

  const numbers: (number | 'gap')[] = [];
  for (let n = 1; n <= totalPages; n++) {
    if (n === 1 || n === totalPages || Math.abs(n - page) <= 1) {
      numbers.push(n);
    } else if (numbers[numbers.length - 1] !== 'gap') {
      numbers.push('gap');
    }
  }

  const linkClasses =
    'inline-flex items-center justify-center min-w-10 h-10 px-3 rounded-lg border text-sm font-medium transition-colors';

  return (
    <nav aria-label="Pagination" className="mt-10 flex flex-wrap items-center justify-center gap-2">
      {page > 1 && (
        <Link to={href(page - 1)} rel="prev" className={`${linkClasses} border-neutral-200 text-neutral-700 hover:border-teal-300 hover:text-teal-800`}>
          Previous
        </Link>
      )}

      {numbers.map((n, i) =>
        n === 'gap' ? (
          <span key={`gap-${i}`} aria-hidden="true" className="px-1 text-neutral-400">…</span>
        ) : n === page ? (
          <span
            key={n}
            aria-current="page"
            className={`${linkClasses} border-teal-700 bg-teal-700 text-white`}
          >
            {n}
          </span>
        ) : (
          <Link
            key={n}
            to={href(n)}
            aria-label={`Page ${n}`}
            className={`${linkClasses} border-neutral-200 text-neutral-700 hover:border-teal-300 hover:text-teal-800`}
          >
            {n}
          </Link>
        ),
      )}

      {page < totalPages && (
        <Link to={href(page + 1)} rel="next" className={`${linkClasses} border-neutral-200 text-neutral-700 hover:border-teal-300 hover:text-teal-800`}>
          Next
        </Link>
      )}
    </nav>
  );
};

export default CityListing;
