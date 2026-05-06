
import { LocationType } from '../data/locations';

const BRAND_SUFFIX = 'Sacramento Senior Living Directory';

// Keyed by `LocationType.id` from `data/locations.ts` — the real source of truth.
// If a location is added there with no entry here, generateLocationSEO falls
// back to a derived title/description.
const customLocationSEO: Record<string, { title: string; description: string }> = {
  'abounding-love-home-care': {
    title: `Abounding Love - Assisted Living Care Home | ${BRAND_SUFFIX}`,
    description: 'Abounding Love is a senior care home in Sacramento, CA at 27 Tristan Cir, offering a peaceful residential setting for older adults. Compare amenities, services, and pricing.'
  },
  'abounding-love-ii': {
    title: `Abounding Love II - Assisted Living Senior Care Home | ${BRAND_SUFFIX}`,
    description: 'Abounding Love II is a senior care home in Elk Grove, CA at 3801 Lake Terrace Dr, offering daily activities and home-cooked meals. Compare amenities, services, and pricing.'
  },
  'abounding-love-iii': {
    title: `Abounding Love III - Assisted Living Senior Care | ${BRAND_SUFFIX}`,
    description: 'Abounding Love III is a senior care home in Sacramento, CA at 5105 Village Wood Drive, offering a family-like environment for older adults. Compare amenities, services, and pricing.'
  },
  'abounding-peace-elder-care': {
    title: `Abounding Peace Elderly Care - Assisted Living | ${BRAND_SUFFIX}`,
    description: 'Abounding Peace Elderly Care is a senior care home in Sacramento, CA at 7124 Hayward Drive, offering well-maintained private rooms. Compare amenities, services, and pricing.'
  },
  'abounding-peace-ii': {
    title: `Abounding Peace Elderly Care II | ${BRAND_SUFFIX}`,
    description: 'Abounding Peace Elderly Care II is a senior care home in Sacramento, CA at 5490 Enrico Blvd, with experienced and compassionate caregivers. Compare amenities, services, and pricing.'
  },
  'abounding-peace-iii': {
    title: `Abounding Peace III Elderly Care | ${BRAND_SUFFIX}`,
    description: 'Abounding Peace III Elderly Care is a senior care home in Sacramento, CA at 10339 Sagres Way, with a holistic approach to senior wellness. Compare amenities, services, and pricing.'
  },
  'golden-legacy': {
    title: `Golden Legacy Elderly Care | ${BRAND_SUFFIX}`,
    description: 'Golden Legacy Elderly Care is a senior care home in Sacramento, CA at 1986 Leford Way, offering personalized memory care plans. Compare amenities, services, and pricing.'
  },
  'golden-heritage': {
    title: `Golden Heritage Senior Care | ${BRAND_SUFFIX}`,
    description: 'Golden Heritage Senior Care is a senior care home in Sacramento, CA at 37 Mossglen Cir, with a warm, welcoming atmosphere for seniors. Compare amenities, services, and pricing.'
  },
  'golden-legacy-ii': {
    title: `Golden Legacy Elderly Care II | ${BRAND_SUFFIX}`,
    description: 'Golden Legacy Elderly Care II is a senior care home in Sacramento, CA at 2710 Eastern Ave, offering enhanced care and mobility support. Compare amenities, services, and pricing.'
  },
  'golden-legacy-iii': {
    title: `Golden Legacy Elderly Care III - Greenhaven Assisted Senior Living | ${BRAND_SUFFIX}`,
    description: 'Golden Legacy Elderly Care III is a senior care home in Sacramento, CA at 7695 River Village Dr, in the Greenhaven neighborhood. Compare amenities, services, and pricing.'
  },
  'bella-villa': {
    title: `Bella Villa Elderly Care II Assisted Living | ${BRAND_SUFFIX}`,
    description: 'Bella Villa Elderly Care II is a senior care home in Sacramento, CA at 3612 Eastern Ave, offering daily activities and home-cooked meals. Compare amenities, services, and pricing.'
  },
  'love-and-comfort-elderly-care': {
    title: `Love and Comfort - Assisted Living Care Home | ${BRAND_SUFFIX}`,
    description: 'Love and Comfort is a senior care home in Sacramento, CA at 6532 Rancho Grande Way, with experienced and compassionate caregivers. Compare amenities, services, and pricing.'
  },
  'love-and-comfort-ii': {
    title: `Love and Comfort II - Assisted Living Elderly Care Home | ${BRAND_SUFFIX}`,
    description: 'Love and Comfort II is a senior care home in Sacramento, CA at 320 Bowman Ave, supporting memory care and mobility needs. Compare amenities, services, and pricing.'
  },
  'love-and-serenity-ii': {
    title: `Love And Serenity II - Assisted Living For The Elderly | ${BRAND_SUFFIX}`,
    description: 'Love And Serenity II is a senior care home in Sacramento, CA at 5942 Park Village St, with a holistic approach to senior wellness. Compare amenities, services, and pricing.'
  },
  'love-and-serenity-iii': {
    title: `Love and Serenity III - Greenhaven Assisted Living Community | ${BRAND_SUFFIX}`,
    description: 'Love and Serenity III is a senior care home in Sacramento, CA at 573 Shaw River Way, offering a family-like environment. Compare amenities, services, and pricing.'
  },
  'love-and-serenity-iii-of-elk-grove': {
    title: `Love and Serenity of Elk Grove III | ${BRAND_SUFFIX}`,
    description: 'Love and Serenity of Elk Grove III is a senior care home in Elk Grove, CA at 9442 Mazatlan Way, offering daily activities and home-cooked meals. Compare amenities, services, and pricing.'
  },
  'love-and-serenity-of-elk-grove-ii': {
    title: `Love and Serenity of Elk Grove II - Senior Care | ${BRAND_SUFFIX}`,
    description: 'Love and Serenity of Elk Grove II is a senior care home in Elk Grove, CA at 9279 Orange Crest Ct, with well-maintained private rooms. Compare amenities, services, and pricing.'
  },
  'love-and-serenity-of-vintage-park': {
    title: `Love and Serenity of Vintage Park - Senior Care Home | ${BRAND_SUFFIX}`,
    description: 'Love and Serenity of Vintage Park is a senior care home in Sacramento, CA at 8901 Sonoma Valley Way, offering a peaceful residential setting. Compare amenities, services, and pricing.'
  },
  'sacramento-senior-living': {
    title: `Sacramento Senior Living | ${BRAND_SUFFIX}`,
    description: 'Sacramento Senior Living is a senior care home in Sacramento, CA at 6825 Bender Ct, offering personalized care plans for older adults. Compare amenities, services, and pricing.'
  },
  'sacramento-senior-living-ii': {
    title: `Sacramento Senior Living II | ${BRAND_SUFFIX}`,
    description: 'Sacramento Senior Living II is a senior care home in Sacramento, CA at 34 Loma Mar Ct, with experienced and compassionate caregivers. Compare amenities, services, and pricing.'
  },
  'villa-natomas-elderly-care': {
    title: `Villa Natomas Elderly Care | ${BRAND_SUFFIX}`,
    description: 'Villa Natomas Elderly Care is a senior care home in Sacramento, CA at 540 Alcantar Circle, offering a family-like environment in Natomas. Compare amenities, services, and pricing.'
  },
  'vita-bella-elderly-care': {
    title: `Vita Bella Elderly Care - Assisted Living Facility | ${BRAND_SUFFIX}`,
    description: 'Vita Bella Elderly Care is a senior care home in Sacramento, CA at 4082 73rd St, with a holistic approach to senior wellness. Compare amenities, services, and pricing.'
  },
  'vita-bella-elderly-care-ii': {
    title: `Vita Bella Elderly Care II Assisted Living Senior Home | ${BRAND_SUFFIX}`,
    description: 'Vita Bella Elderly Care II is a senior care home in Sacramento, CA at 8362 New Point Dr, offering a peaceful residential setting. Compare amenities, services, and pricing.'
  },
  'vita-bella-iii': {
    title: `Vita Bella Elderly Care III | ${BRAND_SUFFIX}`,
    description: 'Vita Bella Elderly Care III is a senior care home in Sacramento, CA at 6700 Sun River Dr, with a warm, welcoming atmosphere for seniors. Compare amenities, services, and pricing.'
  }
};

export const generateLocationSEO = (location: LocationType) => {
  const customSEO = customLocationSEO[location.id];

  const title = customSEO?.title || `${location.name} - Senior Living in ${location.city}, CA | ${BRAND_SUFFIX}`;
  const description = customSEO?.description || `${location.name} in ${location.city}, CA offers ${location.services.join(', ')}. Starting at $${location.pricing.starting.toLocaleString()}/month. Tour this ${location.rating}-star senior community today.`;

  const keywords = [
    location.name.toLowerCase(),
    `senior living ${location.city.toLowerCase()}`,
    `assisted living ${location.city.toLowerCase()}`,
    'memory care sacramento',
    'senior communities california',
    ...location.services.map(service => service.toLowerCase()),
    location.zip
  ].join(', ');

  return { title, description, keywords };
};

export const generatePageSEO = (pageName: string, customDescription?: string) => {
  const titles = {
    home: `${BRAND_SUFFIX} — Find Assisted Living, Memory Care & Board and Care Homes in Sacramento`,
    locations: `Senior Living Communities in Sacramento, CA - Complete Directory | ${BRAND_SUFFIX}`,
    about: `About ${BRAND_SUFFIX} — Your Trusted Senior Living Guide`,
    contact: `Contact ${BRAND_SUFFIX} — Get Help Finding Senior Housing`
  };

  const descriptions = {
    home: 'Find the perfect senior living community in Sacramento, CA. Compare assisted living, memory care, and independent living options with pricing, amenities, and reviews.',
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
