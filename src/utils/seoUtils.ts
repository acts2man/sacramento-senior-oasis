
import { LocationType } from '../data/locations';

// Custom SEO data for each location
const customLocationSEO: Record<string, { title: string; description: string }> = {
  'abounding-love': {
    title: 'Abounding Love - Assisted Living Care Home | Sacramento Assisted Living & Senior Care',
    description: 'Abounding Love - Assisted Living Care Home is located in Sacramento, CA at 27 Tristan Cir. This senior care home offers a peaceful residential setting, ideal for older adults seeking comfort and dignity. Discover high-quality assisted living services tailored to your loved one\'s needs.'
  },
  'abounding-love-ii': {
    title: 'Abounding Love II - Assisted Living Senior Care Home | Elk Grove Assisted Living & Senior Care',
    description: 'Abounding Love II - Assisted Living Senior Care Home is located in Elk Grove, CA at 3801 Lake Terrace Dr. This senior care home offers daily activities and home-cooked meals, ideal for older adults seeking comfort and dignity. Discover high-quality assisted living services tailored to your loved one\'s needs.'
  },
  'abounding-love-iii': {
    title: 'Abounding Love III - Assisted Living Senior Care | Sacramento Assisted Living & Senior Care',
    description: 'Abounding Love III - Assisted Living Senior Care is located in Sacramento, CA at 5105 Village Wood Drive. This senior care home offers a family-like environment, ideal for older adults seeking comfort and dignity. Discover high-quality assisted living services tailored to your loved one\'s needs.'
  },
  'abounding-peace': {
    title: 'Abounding Peace Elderly Care - Assisted Living | Sacramento Assisted Living & Senior Care',
    description: 'Abounding Peace Elderly Care - Assisted Living is located in Sacramento, CA at 7124 Hayward Drive. This senior care home offers well-maintained private rooms, ideal for older adults seeking comfort and dignity. Discover high-quality assisted living services tailored to your loved one\'s needs.'
  },
  'abounding-peace-ii': {
    title: 'Abounding Peace Elderly Care II | Sacramento Assisted Living & Senior Care',
    description: 'Abounding Peace Elderly Care II is located in Sacramento, CA at 5490 Enrico Blvd. This senior care home offers experienced and compassionate caregivers, ideal for older adults seeking comfort and dignity. Discover high-quality assisted living services tailored to your loved one\'s needs.'
  },
  'abounding-peace-iii': {
    title: 'Abounding Peace III Elderly Care | Sacramento Assisted Living & Senior Care',
    description: 'Abounding Peace III Elderly Care is located in Sacramento, CA at 10339 Sagres Way. This senior care home offers a holistic approach to senior wellness, ideal for older adults seeking comfort and dignity. Discover high-quality assisted living services tailored to your loved one\'s needs.'
  },
  'golden-legacy': {
    title: 'Golden Legacy Elderly Care | Sacramento Assisted Living & Senior Care',
    description: 'Golden Legacy Elderly Care is located in Sacramento, CA at 1986 Leford Way. This senior care home offers personalized care plans, ideal for older adults seeking comfort and dignity. Discover high-quality assisted living services tailored to your loved one\'s needs.'
  },
  'golden-heritage': {
    title: 'Golden Heritage Senior Care | Sacramento Assisted Living & Senior Care',
    description: 'Golden Heritage Senior Care is located in Sacramento, CA at 37 Mossglen Cir. This senior care home offers a warm, welcoming atmosphere for seniors, ideal for older adults seeking comfort and dignity. Discover high-quality assisted living services tailored to your loved one\'s needs.'
  },
  'golden-legacy-ii': {
    title: 'Golden Legacy Elderly Care II | Sacramento Assisted Living & Senior Care',
    description: 'Golden Legacy Elderly Care II is located in Sacramento, CA at 2710 Eastern Ave. This senior care home offers support for memory care and mobility needs, ideal for older adults seeking comfort and dignity. Discover high-quality assisted living services tailored to your loved one\'s needs.'
  },
  'golden-legacy-iii': {
    title: 'Golden Legacy Elderly Care III - Greenhaven Assisted Senior Living | Sacramento Assisted Living & Senior Care',
    description: 'Golden Legacy Elderly Care III - Greenhaven Assisted Senior Living is located in Sacramento, CA at 7695 River Village Dr. This senior care home offers a peaceful residential setting, ideal for older adults seeking comfort and dignity. Discover high-quality assisted living services tailored to your loved one\'s needs.'
  },
  'bella-villa': {
    title: 'Bella Villa Elderly Care II Assisted Living | Sacramento Assisted Living & Senior Care',
    description: 'Bella Villa Elderly Care II Assisted Living is located in Sacramento, CA at 3612 Eastern Ave. This senior care home offers daily activities and home-cooked meals, ideal for older adults seeking comfort and dignity. Discover high-quality assisted living services tailored to your loved one\'s needs.'
  },
  'love-and-comfort': {
    title: 'Love and Comfort - Assisted Living Care Home | Sacramento Assisted Living & Senior Care',
    description: 'Love and Comfort - Assisted Living Care Home is located in Sacramento, CA at 6532 Rancho Grande Way. This senior care home offers experienced and compassionate caregivers, ideal for older adults seeking comfort and dignity. Discover high-quality assisted living services tailored to your loved one\'s needs.'
  },
  'love-and-comfort-ii': {
    title: 'Love and Comfort II - Assisted Living Elderly Care Home | Sacramento Assisted Living & Senior Care',
    description: 'Love and Comfort II - Assisted Living Elderly Care Home is located in Sacramento, CA at 320 Bowman Ave. This senior care home offers support for memory care and mobility needs, ideal for older adults seeking comfort and dignity. Discover high-quality assisted living services tailored to your loved one\'s needs.'
  },
  'love-and-serenity-ii': {
    title: 'Love And Serenity II - Assisted Living For The Elderly | Sacramento Assisted Living & Senior Care',
    description: 'Love And Serenity II - Assisted Living For The Elderly is located in Sacramento, CA at 5942 Park Village St. This senior care home offers a holistic approach to senior wellness, ideal for older adults seeking comfort and dignity. Discover high-quality assisted living services tailored to your loved one\'s needs.'
  },
  'love-and-serenity-iii': {
    title: 'Love and Serenity III - Greenhaven Assisted Living Community | Sacramento Assisted Living & Senior Care',
    description: 'Love and Serenity III - Greenhaven Assisted Living Community is located in Sacramento, CA at 573 Shaw River Way. This senior care home offers a family-like environment, ideal for older adults seeking comfort and dignity. Discover high-quality assisted living services tailored to your loved one\'s needs.'
  },
  'love-and-serenity-elk-grove-iii': {
    title: 'Love and Serenity of Elk Grove III | Elk Grove Assisted Living & Senior Care',
    description: 'Love and Serenity of Elk Grove III is located in Elk Grove, CA at 9442 Mazatlan Way. This senior care home offers daily activities and home-cooked meals, ideal for older adults seeking comfort and dignity. Discover high-quality assisted living services tailored to your loved one\'s needs.'
  },
  'love-and-serenity-elk-grove-ii': {
    title: 'Love and Serenity of Elk Grove II - Senior Care | Elk Grove Assisted Living & Senior Care',
    description: 'Love and Serenity of Elk Grove II - Senior Care is located in Elk Grove, CA at 9279 Orange Crest Ct. This senior care home offers well-maintained private rooms, ideal for older adults seeking comfort and dignity. Discover high-quality assisted living services tailored to your loved one\'s needs.'
  },
  'love-and-serenity-vintage-park': {
    title: 'Love and Serenity of Vintage Park - Senior Care Home | Sacramento Assisted Living & Senior Care',
    description: 'Love and Serenity of Vintage Park - Senior Care Home is located in Sacramento, CA at 8901 Sonoma Valley Way. This senior care home offers a peaceful residential setting, ideal for older adults seeking comfort and dignity. Discover high-quality assisted living services tailored to your loved one\'s needs.'
  },
  'sacramento-senior-living': {
    title: 'Sacramento Senior Living | Sacramento Assisted Living & Senior Care',
    description: 'Sacramento Senior Living is located in Sacramento, CA at 6825 Bender Ct. This senior care home offers personalized care plans, ideal for older adults seeking comfort and dignity. Discover high-quality assisted living services tailored to your loved one\'s needs.'
  },
  'sacramento-senior-living-ii': {
    title: 'Sacramento Senior Living II | Sacramento Assisted Living & Senior Care',
    description: 'Sacramento Senior Living II is located in Sacramento, CA at 34 Loma Mar Ct. This senior care home offers experienced and compassionate caregivers, ideal for older adults seeking comfort and dignity. Discover high-quality assisted living services tailored to your loved one\'s needs.'
  },
  'villa-natomas': {
    title: 'Villa Natomas Elderly Care | Sacramento Assisted Living & Senior Care',
    description: 'Villa Natomas Elderly Care is located in Sacramento, CA at 540 Alcantar Circle. This senior care home offers a family-like environment, ideal for older adults seeking comfort and dignity. Discover high-quality assisted living services tailored to your loved one\'s needs.'
  },
  'vita-bella': {
    title: 'Vita Bella Elderly Care - Assisted Living Facility | Sacramento Assisted Living & Senior Care',
    description: 'Vita Bella Elderly Care - Assisted Living Facility is located in Sacramento, CA at 4082 73rd St. This senior care home offers a holistic approach to senior wellness, ideal for older adults seeking comfort and dignity. Discover high-quality assisted living services tailored to your loved one\'s needs.'
  },
  'vita-bella-ii': {
    title: 'Vita Bella Elderly Care II Assisted Living Senior Home | Sacramento Assisted Living & Senior Care',
    description: 'Vita Bella Elderly Care II Assisted Living Senior Home is located in Sacramento, CA at 8362 New Point Dr. This senior care home offers a peaceful residential setting, ideal for older adults seeking comfort and dignity. Discover high-quality assisted living services tailored to your loved one\'s needs.'
  },
  'vita-bella-iii': {
    title: 'Vita Bella Elderly Care III | Sacramento Assisted Living & Senior Care',
    description: 'Vita Bella Elderly Care III is located in Sacramento, CA at 6700 Sun River Dr. This senior care home offers a warm, welcoming atmosphere for seniors, ideal for older adults seeking comfort and dignity. Discover high-quality assisted living services tailored to your loved one\'s needs.'
  }
};

export const generateLocationSEO = (location: LocationType) => {
  // Use custom SEO data if available, otherwise fall back to auto-generated
  const customSEO = customLocationSEO[location.id];
  
  const title = customSEO?.title || `${location.name} - Senior Living in ${location.city}, CA`;
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SeniorCareService",
    "name": location.name,
    "description": location.description,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": location.address,
      "addressLocality": location.city,
      "addressRegion": "CA",
      "postalCode": location.zip,
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": location.coordinates.lat,
      "longitude": location.coordinates.lng
    },
    "telephone": location.phone,
    "email": location.email,
    "url": location.website,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": location.rating,
      "bestRating": "5"
    },
    "priceRange": `$${location.pricing.starting} - $${location.pricing.average}`,
    "serviceType": location.services,
    "amenityFeature": location.amenities.map(amenity => ({
      "@type": "LocationFeatureSpecification",
      "name": amenity
    })),
    "image": location.images
  };

  return { title, description, keywords, jsonLd };
};

export const generatePageSEO = (pageName: string, customDescription?: string) => {
  const titles = {
    home: 'Sacramento Senior Care - Find the Best Senior Living Communities',
    locations: 'Senior Living Communities in Sacramento, CA - Complete Directory',
    about: 'About Sacramento Senior Care - Your Trusted Senior Living Guide',
    contact: 'Contact Sacramento Senior Care - Get Help Finding Senior Housing'
  };

  const descriptions = {
    home: 'Find the perfect senior living community in Sacramento, CA. Compare assisted living, memory care, and independent living options with pricing, amenities, and reviews.',
    locations: 'Browse our complete directory of senior living communities across Sacramento, CA. Compare assisted living, memory care, and independent living facilities with detailed information.',
    about: 'Learn about Sacramento Senior Care, your trusted resource for finding quality senior living communities throughout the Sacramento area. Expert guidance for families.',
    contact: 'Contact Sacramento Senior Care for personalized assistance finding the right senior living community. Free consultation and guidance for Sacramento area families.'
  };

  return {
    title: titles[pageName as keyof typeof titles] || `${pageName} | Sacramento Senior Care`,
    description: customDescription || descriptions[pageName as keyof typeof descriptions] || 'Sacramento Senior Care - Your guide to senior living communities.',
    keywords: 'sacramento senior living, assisted living sacramento, memory care california, senior communities, elderly care sacramento'
  };
};
