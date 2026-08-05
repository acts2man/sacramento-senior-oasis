import type { Facility } from '../types/facility';

/**
 * Single source of truth for the CDSS licence badge shown on facility cards.
 *
 * This exists because the logic was duplicated in two files and the copies had
 * drifted. Both are fixed now; keep it in one place so they cannot drift again.
 *
 * Two rules, and neither is negotiable:
 *
 *   1. NO LICENCE STATUS, NO BADGE. Returning null means the caller renders
 *      nothing — no badge, no shield, no grey "unverified" pill. The previous
 *      behaviour fell through to a literal "License-verified · CA CCLD" for any
 *      record whose status was undefined, which put a green verified shield on
 *      five live community records the directory holds no licence data for,
 *      one of them featured on the homepage. Licence verification is this
 *      site's core claim; asserting it with nothing behind it is the worst
 *      thing this codebase can do. An absent claim is honest. A hedged one
 *      still reads as a claim.
 *
 *   2. PROBATION IS NEVER STYLED AS REASSURANCE. A facility whose CA licence
 *      is on probation must render in the warning tone wherever its badge
 *      appears. The homepage card previously showed probation in the same
 *      calm teal as a clean licence — including on the directory's
 *      highest-ranking page, whose facility is in fact on probation. Families
 *      use these badges to decide where to tour.
 */
export type LicenseTone = 'ok' | 'warning';

export interface LicenseBadge {
  text: string;
  tone: LicenseTone;
}

export const licenseBadge = (f: Facility): LicenseBadge | null => {
  if (f.license_status === 'current') {
    return {
      text: f.license_number ? `License #${f.license_number} · Current` : 'License current · CA CCLD',
      tone: 'ok',
    };
  }
  if (f.license_status === 'on_probation') {
    return { text: 'License on probation · CA CCLD', tone: 'warning' };
  }
  if (f.license_status === 'closed') {
    return { text: 'License closed · CA CCLD', tone: 'warning' };
  }
  if (f.license_status === 'pending') {
    return { text: 'License pending · CA CCLD', tone: 'warning' };
  }
  return null;
};

/** Tailwind classes for the badge pill and its icon, by tone. */
export const licenseBadgeClasses = (tone: LicenseTone) =>
  tone === 'warning'
    ? { pill: 'bg-amber-50 text-amber-900 border border-amber-300', icon: 'text-amber-700' }
    : { pill: 'bg-white/95 backdrop-blur-sm text-teal-800', icon: 'text-teal-700' };
