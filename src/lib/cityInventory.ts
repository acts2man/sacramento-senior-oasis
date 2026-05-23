/**
 * Derived city-inventory data: counts, sort order, top-N selection.
 *
 * Centralised here so the header dropdown, footer "Popular cities" column,
 * homepage BrowseByCity grid, and /communities hub all read the same
 * single source of truth. Counts come from the live locations data so they
 * never drift from what's actually in the directory; the city metadata
 * (slug, county, hospitals) comes from src/data/cities.ts.
 *
 * Two-bucket categorisation:
 *   - "with inventory" — cities the directory actually has communities in.
 *     These get prime placement in nav and the hub. Counts are honest.
 *   - "without inventory" — Tier-1 cities we publish a graceful empty-state
 *     page for. Surfaced in the hub but not in the nav dropdown, so we
 *     don't dilute click intent.
 */

import { CITIES, cityNameToSlug, type City } from '../data/cities';
import { locations } from '../data/locations';

export interface CityWithCount extends City {
  count: number;
}

const computeCounts = (): Map<string, number> => {
  const map = new Map<string, number>();
  for (const f of locations) {
    const slug = cityNameToSlug(f.city);
    map.set(slug, (map.get(slug) ?? 0) + 1);
  }
  return map;
};

const COUNTS = computeCounts();

/** All Tier-1 cities, each annotated with the current community count. */
export const CITIES_WITH_COUNTS: CityWithCount[] = CITIES.map(c => ({
  ...c,
  count: COUNTS.get(c.slug) ?? 0,
}));

/** Tier-1 cities that have at least one community, sorted by count desc, then name. */
export const CITIES_WITH_INVENTORY: CityWithCount[] = CITIES_WITH_COUNTS
  .filter(c => c.count > 0)
  .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));

/** Tier-1 cities with no community yet — surfaced on the hub for SEO breadth. */
export const CITIES_WITHOUT_INVENTORY: CityWithCount[] = CITIES_WITH_COUNTS
  .filter(c => c.count === 0)
  .sort((a, b) => a.name.localeCompare(b.name));

/** Top N populated cities, ranked by inventory. Used by nav surfaces. */
export const topCitiesByInventory = (n: number): CityWithCount[] =>
  CITIES_WITH_INVENTORY.slice(0, n);

/**
 * Group populated cities by county for the /communities hub. Counties are
 * ordered by aggregate community count, cities within each county by
 * count desc.
 */
export const citiesGroupedByCounty = (): { county: string; cities: CityWithCount[] }[] => {
  const buckets = new Map<string, CityWithCount[]>();
  for (const c of CITIES_WITH_INVENTORY) {
    const arr = buckets.get(c.county) ?? [];
    arr.push(c);
    buckets.set(c.county, arr);
  }
  return Array.from(buckets.entries())
    .map(([county, cities]) => ({ county, cities }))
    .sort((a, b) => {
      const totalA = a.cities.reduce((s, c) => s + c.count, 0);
      const totalB = b.cities.reduce((s, c) => s + c.count, 0);
      return totalB - totalA;
    });
};

/** Total community count across all Tier-1 cities (matches locations.length). */
export const totalCommunityCount = (): number =>
  CITIES_WITH_INVENTORY.reduce((s, c) => s + c.count, 0);

/**
 * Care-type sub-counts for a single city slug. Used by the hub and the
 * variant cross-link on each CityListing page so the link only shows when
 * there's actual inventory under that variant.
 */
export const cityCareCounts = (slug: string): { assistedLiving: number; boardAndCare: number } => {
  let assistedLiving = 0;
  let boardAndCare = 0;
  for (const f of locations) {
    if (cityNameToSlug(f.city) !== slug) continue;
    if (f.care_types.includes('assisted_living')) assistedLiving++;
    if (f.care_types.includes('board_and_care')) boardAndCare++;
  }
  return { assistedLiving, boardAndCare };
};
