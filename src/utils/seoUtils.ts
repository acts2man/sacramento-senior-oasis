
import { LocationType } from '../data/locations';

export const generateLocationSEO = (location: LocationType) => {
  const title = `${location.name} - Senior Living in ${location.city}, CA`;
  
  const description = `${location.name} in ${location.city}, CA offers ${location.services.join(', ')}. Starting at $${location.pricing.starting.toLocaleString()}/month. Tour this ${location.rating}-star senior community today.`;
  
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
