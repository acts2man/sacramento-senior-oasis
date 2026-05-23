/**
 * Category-level content used on the community detail page when we have no
 * verified per-facility data from the owner. Every claim here is true of
 * the LICENSE CATEGORY itself (California RCFE program), not asserted as
 * a feature of any specific named home.
 *
 * When an owner-supplied field exists on the Facility record (e.g.
 * `owner_amenities`), the detail page renders that instead — see
 * src/types/facility.ts for the owner_* shape.
 */

/**
 * Baseline services every licensed California RCFE is regulated to provide.
 *
 * Sources:
 *   - California Health and Safety Code §1569.2 (RCFE definition / scope)
 *   - 22 CCR §87464–§87468 (resident care services, planned activities,
 *     food service, personal services)
 *   - CDSS Community Care Licensing — RCFE program overview
 *
 * Listed here in user-facing language. Differentiating amenities (movie
 * nights, salon, transportation specifics, dietary specialties, etc.) are
 * NOT here — those vary per home and belong on the future owner portal.
 */
export const TYPICAL_RCFE_SERVICES: { title: string; description: string; icon: 'pill' | 'hand' | 'utensils' | 'clock' | 'sparkles' | 'shirt' }[] = [
  {
    title: 'Medication management',
    description:
      "Help with prescription medications — reminders, supervision, and centrally stored medications under California's RCFE assistance-with-medications rules.",
    icon: 'pill',
  },
  {
    title: 'Help with daily living',
    description:
      'Assistance with bathing, dressing, grooming, mobility, and transfers — the daily personal care RCFEs are licensed to provide.',
    icon: 'hand',
  },
  {
    title: 'Three meals daily, plus snacks',
    description:
      'Three nutritious meals per day plus snacks, with menus that meet California RCFE food-service requirements.',
    icon: 'utensils',
  },
  {
    title: '24-hour supervision and staffing',
    description:
      'A staff member on site around the clock — California requires direct-care staff awake or on call 24 hours a day depending on capacity.',
    icon: 'clock',
  },
  {
    title: 'Housekeeping',
    description:
      'Regular cleaning of resident rooms and shared spaces, included in the room-and-board fee at licensed RCFEs.',
    icon: 'sparkles',
  },
  {
    title: 'Laundry',
    description:
      'Personal laundry service for residents, included as part of the RCFE program of care.',
    icon: 'shirt',
  },
];

/**
 * Regional cost guidance for senior care in the Sacramento metro.
 *
 * SOURCE NEEDED: the figures here should come from a real public source —
 * the Genworth/CareScout Cost of Care Survey for the Sacramento-Roseville
 * MSA is the standard reference. Until a sourced range is wired in (with a
 * survey-year citation), the cost section renders qualitatively only and
 * does not display dollar figures.
 *
 * To switch the section on with real numbers:
 *   1. Pull the most recent Genworth/CareScout monthly median for the
 *      Sacramento-Roseville-Arden-Arcade MSA, assisted-living line.
 *      Citation format: { source: 'Genworth/CareScout Cost of Care 2024',
 *        url: 'https://www.carescout.com/cost-of-care' }
 *   2. Fill the fields below with `assistedLivingLow`, `assistedLivingHigh`,
 *      `surveyYear`, and `source`.
 *   3. The detail page will then render the numeric range, labelled clearly
 *      as a regional figure (not this specific home's price).
 *
 * Never invent a number. If the source isn't wired in, the page falls back
 * to qualitative guidance with no dollar amounts.
 */
export interface RegionalCostInfo {
  /** Regional median monthly assisted-living rate, low end of typical range, $/month. */
  assistedLivingLow?: number;
  /** Regional median monthly assisted-living rate, high end of typical range, $/month. */
  assistedLivingHigh?: number;
  /** Survey year for the figures (e.g. 2024). */
  surveyYear?: number;
  /** Human-readable citation, e.g. "Genworth/CareScout Cost of Care 2024". */
  source?: string;
  /** Source URL. */
  sourceUrl?: string;
}

// TODO: wire in real Genworth/CareScout numbers and uncomment fields. Until
// then this object is intentionally empty so the cost section renders the
// qualitative-only fallback. Keep this empty rather than guess.
export const SACRAMENTO_REGIONAL_COST: RegionalCostInfo = {
  // assistedLivingLow: ____,
  // assistedLivingHigh: ____,
  // surveyYear: ____,
  // source: 'Genworth/CareScout Cost of Care ____',
  // sourceUrl: 'https://www.carescout.com/cost-of-care',
};

export const hasRegionalCostData = (info: RegionalCostInfo): boolean =>
  typeof info.assistedLivingLow === 'number' &&
  typeof info.assistedLivingHigh === 'number' &&
  !!info.source;
