/**
 * Tier-1 Sacramento-metro city records used by the City × Care-Type listing
 * template. Read-only; the dynamic /assisted-living/:citySlug and
 * /senior-living/:citySlug routes look up cities here to decide whether a
 * given slug is recognized vs. should fall through to the 404 route.
 *
 * `nearbyHospitals` is intentionally conservative — only well-known major
 * medical centers physically located in the named city are listed by name.
 * Cities where I wasn't certain of a specific named hospital have
 * `nearbyHospitals: []`; the listing template renders a generic "major
 * medical centers serving [City]" line for those and flags them with a
 * TODO so a follow-up can fill in real names.
 */

export interface City {
  name: string;
  slug: string;
  county: string;
  description: string;
  /**
   * Confirmed hospitals physically in this city. Empty array means we
   * surface a generic fallback rather than fabricate a name.
   */
  nearbyHospitals: string[];
}

export const CITIES: City[] = [
  {
    name: 'Sacramento',
    slug: 'sacramento',
    county: 'Sacramento',
    description:
      'California state capital and the heart of the metro — the densest concentration of senior living, assisted living, and board & care homes (RCFEs) in the region.',
    nearbyHospitals: [
      'UC Davis Medical Center',
      'Sutter Medical Center, Sacramento',
      'Mercy General Hospital',
    ],
  },
  {
    name: 'Elk Grove',
    slug: 'elk-grove',
    county: 'Sacramento',
    description:
      'Fast-growing suburb south of Sacramento. A popular choice for families who want assisted living in a quieter, newer-build setting.',
    // TODO: confirm specific Elk Grove hospital names — Kaiser South Sacramento
    // and Methodist Hospital of Sacramento are nearby but not in city limits.
    nearbyHospitals: [],
  },
  {
    name: 'Roseville',
    slug: 'roseville',
    county: 'Placer',
    description:
      'Largest city in Placer County. High concentration of newer senior living communities and strong hospital coverage.',
    nearbyHospitals: ['Sutter Roseville Medical Center', 'Kaiser Permanente Roseville Medical Center'],
  },
  {
    name: 'Folsom',
    slug: 'folsom',
    county: 'Sacramento',
    description:
      'Quiet, well-resourced foothill community east of Sacramento with excellent hospital access and a growing assisted living market.',
    nearbyHospitals: ['Mercy Hospital of Folsom', 'Kaiser Permanente Folsom Medical Offices'],
  },
  {
    name: 'Rocklin',
    slug: 'rocklin',
    county: 'Placer',
    description:
      'Placer County community next to Roseville with similar suburban character — assisted living residents typically use Roseville hospitals.',
    // TODO: confirm Rocklin-specific hospital. Sutter Roseville serves the area.
    nearbyHospitals: [],
  },
  {
    name: 'Auburn',
    slug: 'auburn',
    county: 'Placer',
    description:
      'Historic foothill town in Placer County with a strong locally-rooted senior living community.',
    nearbyHospitals: ['Sutter Auburn Faith Hospital'],
  },
  {
    name: 'Citrus Heights',
    slug: 'citrus-heights',
    county: 'Sacramento',
    description:
      'Established Sacramento-area community near Roseville and Carmichael with a mix of mid-priced assisted living options.',
    // TODO: no major hospital in city; served by Mercy San Juan (Carmichael) and Sutter Roseville.
    nearbyHospitals: [],
  },
  {
    name: 'Carmichael',
    slug: 'carmichael',
    county: 'Sacramento',
    description:
      'Established Sacramento suburb known for its mature neighborhoods and strong hospital presence.',
    nearbyHospitals: ['Mercy San Juan Medical Center'],
  },
  {
    name: 'Fair Oaks',
    slug: 'fair-oaks',
    county: 'Sacramento',
    description:
      'Quiet Sacramento-area community next to Carmichael; assisted living residents typically use Mercy San Juan Medical Center.',
    // TODO: no hospital in city limits; Mercy San Juan in Carmichael is closest.
    nearbyHospitals: [],
  },
  {
    name: 'El Dorado Hills',
    slug: 'el-dorado-hills',
    county: 'El Dorado',
    description:
      'Upscale El Dorado County community east of Folsom with a smaller, premium-end senior living market.',
    // TODO: served by Marshall Medical Center in Placerville; confirm specific facility for the city.
    nearbyHospitals: [],
  },
  {
    name: 'Rancho Cordova',
    slug: 'rancho-cordova',
    county: 'Sacramento',
    description:
      'Sacramento-area city east of the airport with mid-priced senior living options and good freeway access.',
    // TODO: no major hospital in city limits; nearest are Sutter and Mercy Sacramento.
    nearbyHospitals: [],
  },
  {
    name: 'West Sacramento',
    slug: 'west-sacramento',
    county: 'Yolo',
    description:
      'Yolo County city just across the river from downtown Sacramento; smaller assisted living footprint, with Sacramento-area hospitals nearby.',
    nearbyHospitals: [],
  },
  {
    name: 'Davis',
    slug: 'davis',
    county: 'Yolo',
    description:
      'University town in Yolo County with a smaller but well-established senior living market.',
    nearbyHospitals: ['Sutter Davis Hospital'],
  },
  {
    name: 'Lincoln',
    slug: 'lincoln',
    county: 'Placer',
    description:
      'Placer County community north of Roseville; growing senior living market, with Sutter Roseville as the nearest major hospital.',
    nearbyHospitals: [],
  },
];

export const TIER_1_CITY_SLUGS = CITIES.map(c => c.slug);

export const findCityBySlug = (slug: string): City | undefined =>
  CITIES.find(c => c.slug === slug);

/**
 * Slugify a city name from locations.ts so the listing template can match
 * city strings (e.g., "Elk Grove") to the canonical slug ("elk-grove").
 */
export const cityNameToSlug = (cityName: string): string =>
  cityName.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
