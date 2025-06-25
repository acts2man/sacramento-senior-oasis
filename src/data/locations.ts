import { v4 as uuidv4 } from 'uuid';

export interface LocationType {
  id: string;
  slug: string;
  name: string;
  images: string[];
  address: string;
  city: string;
  zip: string;
  phone: string;
  email: string;
  website: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  rating: number;
  shortDescription: string;
  description: string;
  amenities: string[];
  services: string[];
  pricing: {
    starting: number;
    average: number;
  };
  type: string;
}

const locations: LocationType[] = [
  {
    id: "vita-bella-ii",
    slug: "vita-bella-elderly-care-ii",
    name: "Vita Bella II",
    images: [
      "https://source.unsplash.com/random/400x300?seniorliving=1",
      "https://source.unsplash.com/random/400x300?seniorliving=2",
      "https://source.unsplash.com/random/400x300?seniorliving=3"
    ],
    address: "789 Oak Street",
    city: "Sacramento",
    zip: "95814",
    phone: "916-555-0102",
    email: "info@vitabella.com",
    website: "www.vitabella.com",
    coordinates: {
      lat: 38.5757,
      lng: -121.4944
    },
    rating: 4.6,
    shortDescription: "A cozy and comfortable assisted living community.",
    description: "Vita Bella II offers a warm, inviting atmosphere with personalized care services. Our residents enjoy a variety of activities and amenities designed to promote independence and well-being.",
    amenities: ["Private rooms", "Communal dining", "Outdoor garden", "Activity center"],
    services: ["Medication management", "Personal care assistance", "Housekeeping", "Transportation"],
    pricing: {
      starting: 3200,
      average: 4500
    },
    type: "Assisted Living"
  },
  {
    id: "sunrise-senior-living",
    slug: "sunrise-senior-living-assisted-care",
    name: "Sunrise Senior Living",
    images: [
      "https://source.unsplash.com/random/400x300?seniorliving=4",
      "https://source.unsplash.com/random/400x300?seniorliving=5",
      "https://source.unsplash.com/random/400x300?seniorliving=6"
    ],
    address: "456 Elm Avenue",
    city: "Sacramento",
    zip: "95815",
    phone: "916-555-0103",
    email: "info@sunrisesenior.com",
    website: "www.sunrisesenior.com",
    coordinates: {
      lat: 38.5662,
      lng: -121.4662
    },
    rating: 4.2,
    shortDescription: "A vibrant community offering a range of care options.",
    description: "Sunrise Senior Living is dedicated to providing high-quality care and support to seniors. We offer independent living, assisted living, and memory care services in a comfortable and engaging environment.",
    amenities: ["Fitness center", "Library", "Salon", "Scheduled outings"],
    services: ["24-hour nursing", "Therapy services", "Dietary planning", "Social activities"],
    pricing: {
      starting: 4000,
      average: 5500
    },
    type: "Assisted Living"
  },
  {
    id: "abounding-love-ii",
    slug: "abounding-love-memory-care-ii",
    name: "Abounding Love II",
    images: [
      "https://source.unsplash.com/random/400x300?seniorliving=7",
      "https://source.unsplash.com/random/400x300?seniorliving=8",
      "https://source.unsplash.com/random/400x300?seniorliving=9"
    ],
    address: "123 Main Street",
    city: "Sacramento",
    zip: "95811",
    phone: "916-555-0104",
    email: "info@aboundinglove.com",
    website: "www.aboundinglove.com",
    coordinates: {
      lat: 38.5816,
      lng: -121.4944
    },
    rating: 4.8,
    shortDescription: "Specialized memory care in a loving environment.",
    description: "Abounding Love II is a memory care community committed to providing compassionate and dignified care for individuals with Alzheimer's and other forms of dementia. Our trained staff offers personalized support and engaging activities to enhance the quality of life for our residents.",
    amenities: ["Secure environment", "Sensory garden", "Reminiscence therapy", "Comfortable living spaces"],
    services: ["Memory care", "Behavioral support", "Medication assistance", "24-hour supervision"],
    pricing: {
      starting: 5000,
      average: 6500
    },
    type: "Memory Care"
  },
  {
    id: "golden-years-manor",
    slug: "golden-years-manor-assisted-living",
    name: "Golden Years Manor",
    images: [
      "https://source.unsplash.com/random/400x300?seniorliving=10",
      "https://source.unsplash.com/random/400x300?seniorliving=11",
      "https://source.unsplash.com/random/400x300?seniorliving=12"
    ],
    address: "987 Pine Avenue",
    city: "Sacramento",
    zip: "95825",
    phone: "916-555-0105",
    email: "info@goldenyears.com",
    website: "www.goldenyears.com",
    coordinates: {
      lat: 38.5732,
      lng: -121.4823
    },
    rating: 4.5,
    shortDescription: "A peaceful and supportive assisted living community.",
    description: "Golden Years Manor offers a serene and supportive environment for seniors in need of assisted living services. Our dedicated team provides personalized care, engaging activities, and a comfortable atmosphere to promote the well-being of our residents.",
    amenities: ["Landscaped gardens", "Social events", "Arts and crafts", "Cozy common areas"],
    services: ["Assisted living", "Medication management", "Personal care", "Transportation services"],
    pricing: {
      starting: 3800,
      average: 5200
    },
    type: "Assisted Living"
  },
  {
    id: "serenity-gardens",
    slug: "serenity-gardens-senior-community",
    name: "Serenity Gardens",
    images: [
      "https://source.unsplash.com/random/400x300?seniorliving=13",
      "https://source.unsplash.com/random/400x300?seniorliving=14",
      "https://source.unsplash.com/random/400x300?seniorliving=15"
    ],
    address: "654 Cherry Lane",
    city: "Sacramento",
    zip: "95831",
    phone: "916-555-0106",
    email: "info@serenitygardens.com",
    website: "www.serenitygardens.com",
    coordinates: {
      lat: 38.5648,
      lng: -121.4912
    },
    rating: 4.7,
    shortDescription: "A beautiful senior community with a focus on wellness.",
    description: "Serenity Gardens is a premier senior community dedicated to promoting wellness and independence. We offer a range of living options, including independent living, assisted living, and memory care, all within a beautifully landscaped setting.",
    amenities: ["Walking paths", "Wellness programs", "Recreational activities", "Restaurant-style dining"],
    services: ["Independent living", "Assisted living", "Memory care", "Respite care"],
    pricing: {
      starting: 4500,
      average: 6000
    },
    type: "Senior Community"
  },
  {
    id: "comfort-care-homes",
    slug: "comfort-care-homes-assisted-living",
    name: "Comfort Care Homes",
    images: [
      "https://source.unsplash.com/random/400x300?seniorliving=16",
      "https://source.unsplash.com/random/400x300?seniorliving=17",
      "https://source.unsplash.com/random/400x300?seniorliving=18"
    ],
    address: "321 Oak Street",
    city: "Sacramento",
    zip: "95811",
    phone: "916-555-0107",
    email: "info@comfortcare.com",
    website: "www.comfortcare.com",
    coordinates: {
      lat: 38.5832,
      lng: -121.4756
    },
    rating: 4.3,
    shortDescription: "Providing compassionate assisted living in a home-like setting.",
    description: "Comfort Care Homes offers personalized assisted living services in a warm and inviting residential setting. Our caregivers are dedicated to providing compassionate care and support to help our residents maintain their independence and quality of life.",
    amenities: ["Home-cooked meals", "Cozy living rooms", "Personalized care plans", "Family involvement"],
    services: ["Assisted living", "Medication assistance", "Personal hygiene", "Mobility support"],
    pricing: {
      starting: 3500,
      average: 4800
    },
    type: "Assisted Living"
  },
  {
    id: "heritage-oaks",
    slug: "heritage-oaks-senior-living",
    name: "Heritage Oaks",
    images: [
      "https://source.unsplash.com/random/400x300?seniorliving=19",
      "https://source.unsplash.com/random/400x300?seniorliving=20",
      "https://source.unsplash.com/random/400x300?seniorliving=21"
    ],
    address: "159 Maple Drive",
    city: "Sacramento",
    zip: "95822",
    phone: "916-555-0108",
    email: "info@heritageoaks.com",
    website: "www.heritageoaks.com",
    coordinates: {
      lat: 38.5518,
      lng: -121.4692
    },
    rating: 4.6,
    shortDescription: "A premier senior living community with a focus on active living.",
    description: "Heritage Oaks is a vibrant senior living community offering a wide range of amenities and services to promote an active and fulfilling lifestyle. Our residents enjoy spacious apartments, engaging social activities, and personalized care options.",
    amenities: ["Swimming pool", "Fitness center", "Clubhouse", "Walking trails"],
    services: ["Independent living", "Assisted living", "Memory care", "Skilled nursing"],
    pricing: {
      starting: 5000,
      average: 6500
    },
    type: "Senior Living"
  },
  {
    id: "peaceful-manor",
    slug: "peaceful-manor-memory-care",
    name: "Peaceful Manor",
    images: [
      "https://source.unsplash.com/random/400x300?seniorliving=22",
      "https://source.unsplash.com/random/400x300?seniorliving=23",
      "https://source.unsplash.com/random/400x300?seniorliving=24"
    ],
    address: "753 Willow Street",
    city: "Sacramento",
    zip: "95828",
    phone: "916-555-0109",
    email: "info@peacefulmanor.com",
    website: "www.peacefulmanor.com",
    coordinates: {
      lat: 38.5684,
      lng: -121.4859
    },
    rating: 4.9,
    shortDescription: "Specialized memory care services in a tranquil setting.",
    description: "Peaceful Manor is dedicated to providing compassionate and comprehensive memory care services in a serene and supportive environment. Our trained staff offers personalized care plans, engaging activities, and a secure setting for individuals with memory loss.",
    amenities: ["Secure environment", "Therapeutic activities", "Outdoor patios", "Comfortable common areas"],
    services: ["Memory care", "Dementia care", "Cognitive therapy", "24-hour supervision"],
    pricing: {
      starting: 5500,
      average: 7000
    },
    type: "Memory Care"
  },
  {
    id: "sunny-acres",
    slug: "sunny-acres-senior-community",
    name: "Sunny Acres",
    images: [
      "https://source.unsplash.com/random/400x300?seniorliving=25",
      "https://source.unsplash.com/random/400x300?seniorliving=26",
      "https://source.unsplash.com/random/400x300?seniorliving=27"
    ],
    address: "258 Birch Road",
    city: "Sacramento",
    zip: "95833",
    phone: "916-555-0110",
    email: "info@sunnyacres.com",
    website: "www.sunnyacres.com",
    coordinates: {
      lat: 38.5499,
      lng: -121.4726
    },
    rating: 4.4,
    shortDescription: "A friendly senior community offering a variety of lifestyle options.",
    description: "Sunny Acres is a welcoming senior community that provides a range of lifestyle options to suit individual needs and preferences. Our residents enjoy independent living, assisted living, and memory care services in a vibrant and supportive atmosphere.",
    amenities: ["Community center", "Fitness classes", "Social events", "Transportation services"],
    services: ["Independent living", "Assisted living", "Memory care", "Respite care"],
    pricing: {
      starting: 4200,
      average: 5800
    },
    type: "Senior Community"
  },
  {
    id: "garden-view-estates",
    slug: "garden-view-estates-assisted-living",
    name: "Garden View Estates",
    images: [
      "https://source.unsplash.com/random/400x300?seniorliving=28",
      "https://source.unsplash.com/random/400x300?seniorliving=29",
      "https://source.unsplash.com/random/400x300?seniorliving=30"
    ],
    address: "864 Elm Avenue",
    city: "Sacramento",
    zip: "95817",
    phone: "916-555-0111",
    email: "info@gardenview.com",
    website: "www.gardenview.com",
    coordinates: {
      lat: 38.5715,
      lng: -121.4893
    },
    rating: 4.5,
    shortDescription: "Comfortable assisted living with beautiful garden views.",
    description: "Garden View Estates offers comfortable and supportive assisted living services in a tranquil setting with beautiful garden views. Our caring staff provides personalized assistance, engaging activities, and a warm, inviting atmosphere.",
    amenities: ["Landscaped gardens", "Outdoor seating", "Activity rooms", "Restaurant-style dining"],
    services: ["Assisted living", "Medication management", "Personal care", "Housekeeping services"],
    pricing: {
      starting: 3900,
      average: 5400
    },
    type: "Assisted Living"
  },
  {
    id: "emerald-hills",
    slug: "emerald-hills-senior-care",
    name: "Emerald Hills",
    images: [
      "https://source.unsplash.com/random/400x300?seniorliving=31",
      "https://source.unsplash.com/random/400x300?seniorliving=32",
      "https://source.unsplash.com/random/400x300?seniorliving=33"
    ],
    address: "429 Pine Street",
    city: "Sacramento",
    zip: "95821",
    phone: "916-555-0112",
    email: "info@emeraldhills.com",
    website: "www.emeraldhills.com",
    coordinates: {
      lat: 38.5531,
      lng: -121.4659
    },
    rating: 4.7,
    shortDescription: "Comprehensive senior care in a vibrant community.",
    description: "Emerald Hills is committed to providing comprehensive senior care services in a vibrant and supportive community. Our residents enjoy a wide range of amenities, engaging activities, and personalized care options to promote their well-being and independence.",
    amenities: ["Fitness center", "Library", "Social events", "Transportation services"],
    services: ["Independent living", "Assisted living", "Memory care", "Skilled nursing"],
    pricing: {
      starting: 4800,
      average: 6200
    },
    type: "Senior Care"
  },
  {
    id: "valley-view-manor",
    slug: "valley-view-manor-elderly-care",
    name: "Valley View Manor",
    images: [
      "https://source.unsplash.com/random/400x300?seniorliving=34",
      "https://source.unsplash.com/random/400x300?seniorliving=35",
      "https://source.unsplash.com/random/400x300?seniorliving=36"
    ],
    address: "951 Cherry Avenue",
    city: "Sacramento",
    zip: "95826",
    phone: "916-555-0113",
    email: "info@valleyview.com",
    website: "www.valleyview.com",
    coordinates: {
      lat: 38.5665,
      lng: -121.4826
    },
    rating: 4.6,
    shortDescription: "Providing exceptional elderly care with a scenic view.",
    description: "Valley View Manor offers exceptional elderly care services in a comfortable and supportive environment with a scenic view. Our dedicated team provides personalized care, engaging activities, and a warm, inviting atmosphere to promote the well-being of our residents.",
    amenities: ["Scenic views", "Outdoor patios", "Activity rooms", "Restaurant-style dining"],
    services: ["Assisted living", "Medication management", "Personal care", "Respite care"],
    pricing: {
      starting: 4000,
      average: 5500
    },
    type: "Elderly Care"
  }
];

export const getAllLocations = (): LocationType[] => {
  return locations;
};

export const getFeaturedLocations = (): LocationType[] => {
  return locations.slice(0, 6);
};

export const getLocationById = (id: string): LocationType | undefined => {
  return locations.find(location => location.id === id);
};

export const getLocationBySlug = (slug: string): LocationType | undefined => {
  return locations.find(location => location.slug === slug);
};

export const searchLocations = (query: string): LocationType[] => {
  const searchTerm = query.toLowerCase();
  return locations.filter(location =>
    location.name.toLowerCase().includes(searchTerm) ||
    location.city.toLowerCase().includes(searchTerm) ||
    location.type.toLowerCase().includes(searchTerm) ||
    location.shortDescription.toLowerCase().includes(searchTerm) ||
    location.description.toLowerCase().includes(searchTerm)
  );
};
