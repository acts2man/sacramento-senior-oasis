
export interface LocationType {
  id: string;
  name: string;
  address: string;
  city: string;
  zip: string;
  phone: string;
  email: string;
  website: string;
  description: string;
  shortDescription: string;
  pricing: {
    starting: number;
    average: number;
  };
  services: string[];
  amenities: string[];
  images: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
  featured: boolean;
  rating: number;
}

export const locations: LocationType[] = [
  {
    id: "abounding-love",
    name: "Abounding Love - Assisted Living Care Home",
    address: "27 Tristan Cir",
    city: "Sacramento",
    zip: "95823",
    phone: "(916) 555-1234",
    email: "info@aboundinglove.com",
    website: "www.aboundinglove.com",
    description: "Abounding Love provides a serene environment with beautifully landscaped grounds and spacious living quarters. Our dedicated staff provides 24/7 personalized care with a focus on maintaining independence and dignity. We offer a variety of engaging activities and amenities designed to enhance the quality of life for our residents. Our dining program features chef-prepared meals that cater to dietary preferences and restrictions. Located in a peaceful neighborhood with easy access to hospitals, shopping, and entertainment.",
    shortDescription: "A premier assisted living community offering personalized care in a tranquil setting with beautiful outdoor spaces.",
    pricing: {
      starting: 4200,
      average: 5200,
    },
    services: [
      "24-hour caregiving staff",
      "Medication management",
      "Assistance with daily activities",
      "Housekeeping and laundry",
      "Transportation services",
      "Memory care program"
    ],
    amenities: [
      "Private and semi-private rooms",
      "Restaurant-style dining",
      "Fitness center",
      "Library and computer room",
      "Beauty salon/barbershop",
      "Garden and walking paths"
    ],
    images: [
      "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1615875605825-5eb9bb5d52ac?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&q=80"
    ],
    coordinates: {
      lat: 38.481,
      lng: -121.435,
    },
    featured: true,
    rating: 4.8,
  },
  {
    id: "abounding-love-ii",
    name: "Abounding Love II - Assisted Living Senior Care Home",
    address: "3801 Lake Terrace Dr",
    city: "Elk Grove",
    zip: "95758",
    phone: "(916) 555-2345",
    email: "care@aboundinglove2.com",
    website: "www.aboundinglove2.com",
    description: "Abounding Love II is a luxury assisted living community located in Elk Grove. Our facility combines elegant design with practical amenities to create a comfortable and enriching living environment. We pride ourselves on our professional staff who are trained to provide compassionate care tailored to each resident's unique needs. Our culinary team creates delicious and nutritious meals using fresh, local ingredients. With a calendar full of activities and events, residents enjoy an engaging and fulfilling lifestyle.",
    shortDescription: "Luxury assisted living in Elk Grove with upscale amenities and personalized care plans.",
    pricing: {
      starting: 4800,
      average: 5500,
    },
    services: [
      "24/7 licensed nursing staff",
      "Personalized care plans",
      "Medication administration",
      "Physical, occupational, and speech therapy",
      "Concierge services",
      "Scheduled transportation"
    ],
    amenities: [
      "Spacious apartments",
      "Fine dining experience",
      "Heated swimming pool",
      "Movie theater",
      "Art studio",
      "Landscaped gardens with walking paths"
    ],
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1515263487990-61b07816b324?auto=format&fit=crop&q=80"
    ],
    coordinates: {
      lat: 38.4088,
      lng: -121.4301,
    },
    featured: true,
    rating: 4.9,
  },
  {
    id: "abounding-love-iii",
    name: "Abounding Love III - Assisted Living Senior Care",
    address: "5105 Village Wood Drive",
    city: "Sacramento",
    zip: "95823",
    phone: "(916) 555-3456",
    email: "hello@aboundinglove3.com",
    website: "www.aboundinglove3.com",
    description: "Abounding Love III offers a warm and welcoming community environment. Our facility is designed to promote independence while providing the necessary support for daily living. We offer a range of care options from independent living to memory care, allowing residents to age in place as their needs change. Our dedicated team creates a family atmosphere where every resident feels valued and respected. We emphasize wellness through our fitness programs, nutritious dining options, and social engagement opportunities.",
    shortDescription: "A community-focused assisted living facility offering multiple levels of care.",
    pricing: {
      starting: 3800,
      average: 4800,
    },
    services: [
      "Tiered care options",
      "Wellness checks",
      "Medication supervision",
      "Personal care assistance",
      "Housekeeping",
      "Social activities coordination"
    ],
    amenities: [
      "Pet-friendly accommodations",
      "Community dining room",
      "Game room",
      "Outdoor patio and garden",
      "Library",
      "Worship space"
    ],
    images: [
      "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600563438938-a9a27216b4f5?auto=format&fit=crop&q=80"
    ],
    coordinates: {
      lat: 38.4835,
      lng: -121.4412,
    },
    featured: false,
    rating: 4.6,
  },
  {
    id: "abounding-peace",
    name: "Abounding Peace Elderly Care - Assisted Living",
    address: "7124 Hayward Drive",
    city: "Sacramento",
    zip: "95828",
    phone: "(916) 555-4567",
    email: "care@aboundingpeace.com",
    website: "www.aboundingpeace.com",
    description: "Abounding Peace Elderly Care is a boutique assisted living community that focuses on personalized care in an intimate setting. Our smaller resident population allows us to provide individualized attention and build meaningful relationships. Located in a charming residential neighborhood, our facility offers a homelike atmosphere with all the necessary support services. We specialize in providing care for residents with specific health needs while encouraging maximum independence. Our dedicated staff members are selected for their compassion and expertise in senior care.",
    shortDescription: "Boutique assisted living offering personalized care in an intimate, homelike environment.",
    pricing: {
      starting: 4500,
      average: 5300,
    },
    services: [
      "Low staff-to-resident ratio",
      "Customized care plans",
      "Medication management",
      "Specialized dietary accommodations",
      "Personal laundry service",
      "Escort services"
    ],
    amenities: [
      "Private suites with en-suite bathrooms",
      "Family-style dining",
      "Cozy common areas",
      "Secure outdoor courtyard",
      "Activity room",
      "Tranquility room"
    ],
    images: [
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80"
    ],
    coordinates: {
      lat: 38.5152,
      lng: -121.4022,
    },
    featured: false,
    rating: 4.7,
  },
  {
    id: "abounding-peace-ii",
    name: "Abounding Peace Elderly Care II",
    address: "5490 Enrico Blvd",
    city: "Sacramento",
    zip: "95820",
    phone: "(916) 555-5678",
    email: "info@aboundingpeace2.com",
    website: "www.aboundingpeace2.com",
    description: "Abounding Peace Elderly Care II is a modern senior living community designed to promote active and engaged lifestyles for older adults. Our state-of-the-art facility offers a range of living options from independent apartments to assisted living suites. We focus on creating a vibrant community where residents can pursue their interests and form new friendships. Our wellness program encompasses physical fitness, mental stimulation, and social engagement. With a convenient location near shopping, dining, and healthcare facilities, residents maintain their connection to the wider community.",
    shortDescription: "Modern senior living promoting active lifestyles with a full range of care services and amenities.",
    pricing: {
      starting: 4000,
      average: 5000,
    },
    services: [
      "24-hour security",
      "Emergency response system",
      "Scheduled transportation",
      "Wellness program",
      "Housekeeping services",
      "Social and recreational activities"
    ],
    amenities: [
      "Variety of floor plans",
      "Multiple dining venues",
      "Fitness center with classes",
      "Swimming pool",
      "Craft room",
      "Community garden"
    ],
    images: [
      "https://images.unsplash.com/photo-1503174971373-b1f69c758a83?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?auto=format&fit=crop&q=80"
    ],
    coordinates: {
      lat: 38.5399,
      lng: -121.4456,
    },
    featured: true,
    rating: 4.5,
  },
  {
    id: "golden-legacy",
    name: "Golden Legacy Elderly Care",
    address: "1986 Leford Way",
    city: "Sacramento",
    zip: "95832",
    phone: "(916) 555-6789",
    email: "care@goldenlegacy.com",
    website: "www.goldenlegacy.com",
    description: "Golden Legacy Elderly Care provides compassionate memory care in a secure and supportive environment. Our facility is specifically designed to meet the unique needs of residents with Alzheimer's disease and other forms of dementia. We employ evidence-based approaches to memory care, focusing on preserving dignity and maximizing quality of life. Our specially trained staff members understand the challenges of memory impairment and provide patient, respectful care. The facility features secure indoor and outdoor spaces where residents can move freely and safely.",
    shortDescription: "Specialized memory care facility with secure environments and trained staff for Alzheimer's and dementia care.",
    pricing: {
      starting: 5200,
      average: 6000,
    },
    services: [
      "Specialized memory care program",
      "Secure environment",
      "24/7 specialized staffing",
      "Behavior management",
      "Family support and education",
      "Life enrichment activities"
    ],
    amenities: [
      "Memory care suites",
      "Secure courtyard",
      "Sensory room",
      "Reminiscence areas",
      "Family visiting spaces",
      "Therapeutic kitchen"
    ],
    images: [
      "https://images.unsplash.com/photo-1464146072230-91cabc968266?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585152915-d208bec867a1?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?auto=format&fit=crop&q=80"
    ],
    coordinates: {
      lat: 38.4800,
      lng: -121.4968,
    },
    featured: false,
    rating: 4.8,
  }
];

export const getCareTypes = () => {
  return [
    {
      id: "assisted-living",
      title: "Assisted Living",
      description: "For seniors who need some help with daily activities while maintaining their independence.",
      icon: "users"
    },
    {
      id: "memory-care",
      title: "Memory Care",
      description: "Specialized care for seniors with Alzheimer's, dementia, or other memory conditions.",
      icon: "brain"
    },
    {
      id: "independent-living",
      title: "Independent Living",
      description: "For active seniors who want a maintenance-free lifestyle with amenities and social activities.",
      icon: "home"
    },
    {
      id: "skilled-nursing",
      title: "Skilled Nursing",
      description: "24/7 medical care for seniors with complex health needs requiring professional nursing services.",
      icon: "stethoscope"
    }
  ];
};

export const getLocationById = (id: string): LocationType | undefined => {
  return locations.find(location => location.id === id);
};

export const getFeaturedLocations = (): LocationType[] => {
  return locations.filter(location => location.featured);
};

export const searchLocations = (query: string): LocationType[] => {
  const lowercaseQuery = query.toLowerCase();
  return locations.filter(location => 
    location.name.toLowerCase().includes(lowercaseQuery) || 
    location.city.toLowerCase().includes(lowercaseQuery) || 
    location.zip.includes(lowercaseQuery)
  );
};
