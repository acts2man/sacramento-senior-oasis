import { LocationType } from '../types';

export const locations: LocationType[] = [
  {
    id: "abounding-love",
    name: "Abounding Love",
    address: "1234 Elm Street",
    city: "Sacramento",
    zip: "95814",
    phone: "(916) 538-9563",
    email: "info@aboundinglove.com",
    website: "www.aboundinglove.com",
    coordinates: {
      lat: 38.575342,
      lng: -121.476127
    },
    description: "Abounding Love is a family-owned assisted living community in the heart of Sacramento. We provide personalized care in a warm, inviting environment.",
    services: ["Assistance with daily living", "Medication management", "Meals and snacks", "Housekeeping", "Transportation"],
    amenities: ["Private rooms", "Common areas", "Outdoor garden", "Activities and events", "24-hour staff"],
    images: [
      "/lovable-uploads/assisted-living-community-exterior.webp",
      "/lovable-uploads/assisted-living-community-room.webp",
      "/lovable-uploads/assisted-living-community-dining.webp"
    ],
    pricing: {
      starting: 3500,
      average: 4200
    },
    rating: 4.5,
    featured: true
  },
  {
    id: "golden-years-manor",
    name: "Golden Years Manor",
    address: "5678 Oak Avenue",
    city: "Sacramento",
    zip: "95825",
    phone: "(916) 538-9563",
    email: "info@goldenyearsmanor.com",
    website: "www.goldenyearsmanor.com",
    coordinates: {
      lat: 38.563124,
      lng: -121.421789
    },
    description: "Golden Years Manor offers compassionate care and a vibrant community for seniors. Our dedicated staff ensures residents feel at home.",
    services: ["Assistance with bathing and dressing", "Memory care", "Respite care", "Physical therapy", "Occupational therapy"],
    amenities: ["Secured environment", "Social activities", "Pet-friendly", "Beauty salon", "Library"],
    images: [
      "/lovable-uploads/assisted-living-community-exterior2.webp",
      "/lovable-uploads/assisted-living-community-room2.webp",
      "/lovable-uploads/assisted-living-community-garden.webp"
    ],
    pricing: {
      starting: 4000,
      average: 4800
    },
    rating: 4.2,
    featured: true
  },
  {
    id: "sunrise-gardens",
    name: "Sunrise Gardens",
    address: "9101 Pine Road",
    city: "Elk Grove",
    zip: "95624",
    phone: "(916) 538-9563",
    email: "info@sunrisegardens.com",
    website: "www.sunrisegardens.com",
    coordinates: {
      lat: 38.412345,
      lng: -121.345678
    },
    description: "Sunrise Gardens is a premier senior living community in Elk Grove, offering a range of care options and a beautiful, serene setting.",
    services: ["Independent living", "Assisted living", "Memory care", "Skilled nursing", "Rehabilitation"],
    amenities: ["Restaurant-style dining", "Fitness center", "Swimming pool", "Walking trails", "Arts and crafts studio"],
    images: [
      "/lovable-uploads/assisted-living-community-exterior3.webp",
      "/lovable-uploads/assisted-living-community-room3.webp",
      "/lovable-uploads/assisted-living-community-activities.webp"
    ],
    pricing: {
      starting: 3800,
      average: 4500
    },
    rating: 4.7,
    featured: true
  },
  {
    id: "serenity-springs",
    name: "Serenity Springs",
    address: "2468 Maple Lane",
    city: "Folsom",
    zip: "95630",
    phone: "(916) 538-9563",
    email: "info@serenitysprings.com",
    website: "www.serenitysprings.com",
    coordinates: {
      lat: 38.678901,
      lng: -121.123456
    },
    description: "Serenity Springs offers a peaceful and supportive environment for seniors in Folsom. Our caring staff provides personalized attention to each resident.",
    services: ["Assisted living", "Memory care", "Hospice care", "Medication management", "Personal care"],
    amenities: ["Courtyard", "Chapel", "Transportation services", "Emergency call system", "Visiting physicians"],
    images: [
      "/lovable-uploads/assisted-living-community-exterior4.webp",
      "/lovable-uploads/assisted-living-community-room4.webp",
      "/lovable-uploads/assisted-living-community-common.webp"
    ],
    pricing: {
      starting: 4200,
      average: 5000
    },
    rating: 4.3,
    featured: false
  },
  {
    id: "harmony-heights",
    name: "Harmony Heights",
    address: "1357 Cedar Drive",
    city: "Roseville",
    zip: "95661",
    phone: "(916) 538-9563",
    email: "info@harmonyheights.com",
    website: "www.harmonyheights.com",
    coordinates: {
      lat: 38.789012,
      lng: -121.234567
    },
    description: "Harmony Heights is a vibrant senior living community in Roseville, offering a variety of activities and amenities to promote an active lifestyle.",
    services: ["Independent living", "Assisted living", "Rehabilitation services", "Skilled nursing", "Long-term care"],
    amenities: ["Clubhouse", "Billiards room", "Movie theater", "Gardening club", "Computer lab"],
    images: [
      "/lovable-uploads/assisted-living-community-exterior5.webp",
      "/lovable-uploads/assisted-living-community-room5.webp",
      "/lovable-uploads/assisted-living-community-dining2.webp"
    ],
    pricing: {
      starting: 3900,
      average: 4600
    },
    rating: 4.6,
    featured: false
  },
  {
    id: "peaceful-pines",
    name: "Peaceful Pines",
    address: "7890 Birch Boulevard",
    city: "Davis",
    zip: "95616",
    phone: "(916) 538-9563",
    email: "info@peacefulpines.com",
    website: "www.peacefulpines.com",
    coordinates: {
      lat: 38.543210,
      lng: -121.765432
    },
    description: "Peaceful Pines offers a tranquil and supportive environment for seniors in Davis. Our dedicated staff provides personalized care and attention.",
    services: ["Assisted living", "Memory care", "Respite care", "Adult day care", "Home care"],
    amenities: ["Walking paths", "Outdoor seating", "Arts and crafts", "Music therapy", "Pet therapy"],
    images: [
      "/lovable-uploads/assisted-living-community-exterior6.webp",
      "/lovable-uploads/assisted-living-community-room6.webp",
      "/lovable-uploads/assisted-living-community-garden2.webp"
    ],
    pricing: {
      starting: 4100,
      average: 4900
    },
    rating: 4.4,
    featured: false
  },
  {
    id: "tranquil-terrace",
    name: "Tranquil Terrace",
    address: "4321 Willow Way",
    city: "West Sacramento",
    zip: "95691",
    phone: "(916) 538-9563",
    email: "info@tranquilterrace.com",
    website: "www.tranquilterrace.com",
    coordinates: {
      lat: 38.598765,
      lng: -121.532098
    },
    description: "Tranquil Terrace is a welcoming senior living community in West Sacramento, offering a range of services and amenities to enhance residents' lives.",
    services: ["Independent living", "Assisted living", "Memory care", "Skilled nursing", "Rehabilitation"],
    amenities: ["Dining room", "Activity center", "Library", "Transportation", "Housekeeping"],
    images: [
      "/lovable-uploads/assisted-living-community-exterior7.webp",
      "/lovable-uploads/assisted-living-community-room7.webp",
      "/lovable-uploads/assisted-living-community-activities2.webp"
    ],
    pricing: {
      starting: 3700,
      average: 4400
    },
    rating: 4.1,
    featured: false
  },
  {
    id: "graceful-gardens",
    name: "Graceful Gardens",
    address: "8642 Sycamore Street",
    city: "Citrus Heights",
    zip: "95621",
    phone: "(916) 538-9563",
    email: "info@gracefulgardens.com",
    website: "www.gracefulgardens.com",
    coordinates: {
      lat: 38.701234,
      lng: -121.298765
    },
    description: "Graceful Gardens provides a comfortable and supportive environment for seniors in Citrus Heights. Our caring staff is dedicated to meeting residents' needs.",
    services: ["Assisted living", "Memory care", "Hospice care", "Medication management", "Personal care"],
    amenities: ["Gardens", "Patio", "Social activities", "Religious services", "Beauty salon"],
    images: [
      "/lovable-uploads/assisted-living-community-exterior8.webp",
      "/lovable-uploads/assisted-living-community-room8.webp",
      "/lovable-uploads/assisted-living-community-garden3.webp"
    ],
    pricing: {
      starting: 4300,
      average: 5100
    },
    rating: 4.8,
    featured: false
  },
  {
    id: "blissful-haven",
    name: "Blissful Haven",
    address: "9753 Redwood Circle",
    city: "Fair Oaks",
    zip: "95628",
    phone: "(916) 538-9563",
    email: "info@blissfulhaven.com",
    website: "www.blissfulhaven.com",
    coordinates: {
      lat: 38.645678,
      lng: -121.243210
    },
    description: "Blissful Haven offers a warm and inviting atmosphere for seniors in Fair Oaks. Our compassionate staff provides personalized care and support.",
    services: ["Independent living", "Assisted living", "Memory care", "Skilled nursing", "Rehabilitation"],
    amenities: ["Community center", "Fitness room", "Game room", "Library", "Transportation"],
    images: [
      "/lovable-uploads/assisted-living-community-exterior9.webp",
      "/lovable-uploads/assisted-living-community-room9.webp",
      "/lovable-uploads/assisted-living-community-common2.webp"
    ],
    pricing: {
      starting: 3600,
      average: 4300
    },
    rating: 4.0,
    featured: false
  },
  {
    id: "golden-sunset",
    name: "Golden Sunset",
    address: "1598 Poplar Place",
    city: "Rancho Cordova",
    zip: "95670",
    phone: "(916) 538-9563",
    email: "info@goldensunset.com",
    website: "www.goldensunset.com",
    coordinates: {
      lat: 38.556789,
      lng: -121.334455
    },
    description: "Golden Sunset is a vibrant senior living community in Rancho Cordova, offering a range of activities and amenities to promote an active lifestyle.",
    services: ["Assisted living", "Memory care", "Respite care", "Adult day care", "Home care"],
    amenities: ["Walking trails", "Gardening", "Arts and crafts", "Music", "Social events"],
    images: [
      "/lovable-uploads/assisted-living-community-exterior10.webp",
      "/lovable-uploads/assisted-living-community-room10.webp",
      "/lovable-uploads/assisted-living-community-dining3.webp"
    ],
    pricing: {
      starting: 4000,
      average: 4700
    },
    rating: 4.9,
    featured: false
  }
];

export const getLocationById = (id: string) => {
  return locations.find(location => location.id === id);
};

export const getFeaturedLocations = () => {
  return locations.filter(location => location.featured);
};
