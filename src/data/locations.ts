
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
    id: "golden-oaks",
    name: "Golden Oaks Senior Living",
    address: "1234 Oak Tree Lane",
    city: "Sacramento",
    zip: "95815",
    phone: "(916) 555-1234",
    email: "info@goldenoakssenior.com",
    website: "www.goldenoakssenior.com",
    description: "Golden Oaks Senior Living offers a serene environment with beautifully landscaped grounds and spacious living quarters. Our dedicated staff provides 24/7 personalized care with a focus on maintaining independence and dignity. We offer a variety of engaging activities and amenities designed to enhance the quality of life for our residents. Our dining program features chef-prepared meals that cater to dietary preferences and restrictions. Located in a peaceful neighborhood with easy access to hospitals, shopping, and entertainment.",
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
      lat: 38.587,
      lng: -121.476,
    },
    featured: true,
    rating: 4.8,
  },
  {
    id: "riverside-gardens",
    name: "Riverside Gardens",
    address: "4567 River View Drive",
    city: "Sacramento",
    zip: "95819",
    phone: "(916) 555-2345",
    email: "care@riversidegardens.com",
    website: "www.riversidegardens.com",
    description: "Riverside Gardens is a luxury assisted living community located along the scenic American River. Our facility combines elegant design with practical amenities to create a comfortable and enriching living environment. We pride ourselves on our professional staff who are trained to provide compassionate care tailored to each resident's unique needs. Our culinary team creates delicious and nutritious meals using fresh, local ingredients. With a calendar full of activities and events, residents enjoy an engaging and fulfilling lifestyle.",
    shortDescription: "Luxury assisted living on the American River with upscale amenities and personalized care plans.",
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
      "Spacious apartments with river views",
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
      lat: 38.5651,
      lng: -121.4193,
    },
    featured: true,
    rating: 4.9,
  },
  {
    id: "parkside-meadows",
    name: "Parkside Meadows",
    address: "789 Meadowlark Avenue",
    city: "Sacramento",
    zip: "95825",
    phone: "(916) 555-3456",
    email: "hello@parksidemeadows.com",
    website: "www.parksidemeadows.com",
    description: "Parkside Meadows offers a warm and welcoming community environment adjacent to a beautiful city park. Our facility is designed to promote independence while providing the necessary support for daily living. We offer a range of care options from independent living to memory care, allowing residents to age in place as their needs change. Our dedicated team creates a family atmosphere where every resident feels valued and respected. We emphasize wellness through our fitness programs, nutritious dining options, and social engagement opportunities.",
    shortDescription: "A community-focused assisted living facility next to a beautiful park, offering multiple levels of care.",
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
      lat: 38.5992,
      lng: -121.4338,
    },
    featured: false,
    rating: 4.6,
  },
  {
    id: "magnolia-terrace",
    name: "Magnolia Terrace",
    address: "2468 Magnolia Boulevard",
    city: "Sacramento",
    zip: "95822",
    phone: "(916) 555-4567",
    email: "care@magnoliaterrace.com",
    website: "www.magnoliaterrace.com",
    description: "Magnolia Terrace is a boutique assisted living community that focuses on personalized care in an intimate setting. Our smaller resident population allows us to provide individualized attention and build meaningful relationships. Located in a charming residential neighborhood, our facility offers a homelike atmosphere with all the necessary support services. We specialize in providing care for residents with specific health needs while encouraging maximum independence. Our dedicated staff members are selected for their compassion and expertise in senior care.",
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
      lat: 38.5267,
      lng: -121.4946,
    },
    featured: false,
    rating: 4.7,
  },
  {
    id: "sunrise-village",
    name: "Sunrise Village",
    address: "9876 Sunrise Avenue",
    city: "Sacramento",
    zip: "95742",
    phone: "(916) 555-5678",
    email: "info@sunrisevillage.com",
    website: "www.sunrisevillage.com",
    description: "Sunrise Village is a modern senior living community designed to promote active and engaged lifestyles for older adults. Our state-of-the-art facility offers a range of living options from independent apartments to assisted living suites. We focus on creating a vibrant community where residents can pursue their interests and form new friendships. Our wellness program encompasses physical fitness, mental stimulation, and social engagement. With a convenient location near shopping, dining, and healthcare facilities, residents maintain their connection to the wider community.",
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
      lat: 38.6376,
      lng: -121.2280,
    },
    featured: true,
    rating: 4.5,
  },
  {
    id: "elm-street-residence",
    name: "Elm Street Residence",
    address: "1357 Elm Street",
    city: "Sacramento",
    zip: "95816",
    phone: "(916) 555-6789",
    email: "care@elmstreetresidence.com",
    website: "www.elmstreetresidence.com",
    description: "Elm Street Residence provides compassionate memory care in a secure and supportive environment. Our facility is specifically designed to meet the unique needs of residents with Alzheimer's disease and other forms of dementia. We employ evidence-based approaches to memory care, focusing on preserving dignity and maximizing quality of life. Our specially trained staff members understand the challenges of memory impairment and provide patient, respectful care. The facility features secure indoor and outdoor spaces where residents can move freely and safely.",
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
      lat: 38.5721,
      lng: -121.4685,
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
