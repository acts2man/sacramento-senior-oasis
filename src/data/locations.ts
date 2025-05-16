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
      "/lovable-uploads/d6afd72b-569f-4f7e-ae06-1c17e30b4390.png", // Exterior view
      "/lovable-uploads/a5a44a2c-1c37-4bda-92f7-33f2346976e2.png", // Living room with brick wall
      "/lovable-uploads/de5de461-4639-4b84-9849-e2b8f55431e0.png", // Kitchen
      "/lovable-uploads/e6f139ff-3378-4667-ad05-ca1431ad94c2.png", // Second living room view
      "/lovable-uploads/32b3ebd5-820c-477a-b81c-cf9acac27af9.png", // Bedroom
      "/lovable-uploads/37f420c0-f252-483e-a319-c7631853284e.png", // Dining room
      "/lovable-uploads/5ce5de82-fcca-4fff-9c15-d2f9b2ca18ee.png", // Second bedroom
      "/lovable-uploads/09be1fb9-8eba-4580-9869-d9079b186b42.png", // Patio/outdoor area
      "/lovable-uploads/27f891fb-fb72-42b5-ba46-9eae9da29002.png", // Living room with couch
      "/lovable-uploads/d41f8d21-b02a-4c62-958e-9f94fa94e3ee.png" // Sitting area
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
      "/lovable-uploads/4a6944c4-f741-40f7-af61-72005cfa78e6.png", // Exterior of house
      "/lovable-uploads/33b8df9e-e3ad-4e8f-a8dd-328769da1733.png", // Dining room
      "/lovable-uploads/de710014-22c9-4d6d-bc9c-457355325b5b.png", // Living room with sectional
      "/lovable-uploads/e3021f26-223d-4860-84ea-38d93413d190.png", // Bedroom with black and white bedding
      "/lovable-uploads/fde4d088-2359-4af3-a9b6-d0636dd3cdb7.png", // Single bedroom with recliner
      "/lovable-uploads/6d016c8d-0d65-45be-a79e-8a95e9916a54.png", // Kitchen with island
      "/lovable-uploads/2aa7fe16-ed79-4883-a9bc-c7d2e16e255c.png", // Bathroom
      "/lovable-uploads/93ebc135-71b8-47bf-8660-2b6fd28f7466.png", // Backyard/garden
    ],
    coordinates: {
      lat: 38.4088,
      lng: -121.4301,
    },
    featured: true,
    rating: 4.9,
  },
  {
    id: "abounding-peace-iii",
    name: "Abounding Peace III Elderly Care",
    address: "5490 Enrico Blvd",
    city: "Sacramento",
    zip: "95820",
    phone: "(916) 555-6789",
    email: "care@aboundingpeace3.com",
    website: "www.aboundingpeace3.com",
    description: "Abounding Peace III Elderly Care is a premier senior living facility in the heart of Elk Grove. Our community is designed to provide a comfortable and supportive environment where seniors can thrive. We offer personalized care plans that adapt to changing needs, ensuring residents receive the right level of assistance while maintaining their dignity and independence. Our professional staff is trained to provide exceptional care while fostering warm relationships with residents and their families.",
    shortDescription: "Premier senior living in Elk Grove with personalized care plans and a supportive community environment.",
    pricing: {
      starting: 4300,
      average: 5100,
    },
    services: [
      "24/7 trained caregivers",
      "Medication monitoring",
      "Mobility assistance",
      "Personal care services",
      "Incontinence care",
      "Scheduled transportation"
    ],
    amenities: [
      "Private and shared rooms",
      "Home-cooked meals",
      "Gardens and walking paths",
      "Community lounge",
      "Entertainment center",
      "Therapy room"
    ],
    images: [
      "/lovable-uploads/2b263e1e-0019-4d81-9062-0b30a2549d40.png", // Luxury bedroom with jacuzzi
      "/lovable-uploads/3c9f34a4-ffc5-44b7-a131-d219f3e04f72.png", // Room with jacuzzi view 2
      "/lovable-uploads/8f0c75af-1290-4991-b8cc-730da5196a23.png", // Common living area
      "/lovable-uploads/353d2d0d-8659-4178-bbe6-6cc5d25f00a0.png", // Community space
      "/lovable-uploads/b5ca2441-44ef-4f9d-84eb-6047fc9f993e.png", // Exterior view
    ],
    coordinates: {
      lat: 38.5113,
      lng: -121.4220,
    },
    featured: true,
    rating: 4.8,
  },
  {
    id: "golden-legacy",
    name: "Golden Legacy Elderly Care",
    address: "1986 Leford Way",
    city: "Sacramento",
    zip: "95832",
    phone: "(916) 555-7890",
    email: "info@goldenlegacy.com",
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
      "/lovable-uploads/f2bf5dae-5e05-494b-ae5c-02d8a39f40c8.png", // Exterior view of house with pink flowers
      "/lovable-uploads/9574bcc1-29e8-4ce4-a547-cd50f72f75a9.png", // Hallway with artwork
      "/lovable-uploads/87d55c9c-9d7c-4f02-848c-308d1f247bc4.png", // Bedroom with blue floral bedding
      "/lovable-uploads/cab14450-f826-4e9c-a5ad-6d479598edb3.png", // Living room with fireplace and TV
      "/lovable-uploads/d3df9465-018e-4016-abb4-aa8d50324b8b.png", // Room with twin beds and blue curtains
      "/lovable-uploads/44df1279-5968-4ddf-b139-24854240a933.png", // Kitchen with wooden cabinets
      "/lovable-uploads/8039f371-26f8-4bcf-8ef3-55d72f7fc517.png", // Another exterior view
      "/lovable-uploads/afcb3e15-9f58-4536-8e3d-892e030a743b.png"  // Living room with sectional sofa
    ],
    coordinates: {
      lat: 38.4800,
      lng: -121.4968,
    },
    featured: true,
    rating: 4.8,
  },
  {
    id: "golden-legacy-ii",
    name: "Golden Legacy Elderly Care II",
    address: "2710 Eastern Ave",
    city: "Sacramento",
    zip: "95821",
    phone: "(916) 555-8765",
    email: "info@goldenlegacy2.com",
    website: "www.goldenlegacy2.com",
    description: "Golden Legacy Elderly Care II offers a specialized approach to senior living with a focus on residents requiring more intensive care. Our facility provides a safe, comfortable environment with comprehensive care services tailored to each resident's unique needs. We maintain a higher staff-to-resident ratio to ensure attentive care for all. Our professional team includes skilled nurses and caregivers who are experienced in managing complex health conditions while maintaining residents' comfort and dignity.",
    shortDescription: "Specialized senior living with enhanced care services and higher staff-to-resident ratios.",
    pricing: {
      starting: 4900,
      average: 5700,
    },
    services: [
      "Enhanced nursing care",
      "Specialized diet planning",
      "Physical therapy on-site",
      "Medication administration",
      "Pain management",
      "Advanced care planning"
    ],
    amenities: [
      "Barrier-free rooms",
      "Hospital-grade beds",
      "Therapy spaces",
      "Monitored security",
      "Family conference room",
      "Comfort care suites"
    ],
    images: [
      "/lovable-uploads/09a49d18-77fe-4059-8f5f-71e525c0821f.png", // Front exterior with garage and landscaping
      "/lovable-uploads/9649bce7-e56d-4d40-8527-ab3f4d3f19c3.png", // Living room with dining area
      "/lovable-uploads/4ff800e4-d48b-40d5-afde-b9b608e0ff64.png", // Formal dining room with table and chairs
      "/lovable-uploads/96683bda-6e70-4212-9106-8a532e7d736c.png", // Living area with china cabinet
      "/lovable-uploads/2ce3d4af-0ff4-4184-9edf-6542bcbf632f.png", // Reception area with red chairs
      "/lovable-uploads/df1a9b3b-db28-4eee-bb0c-fbcb3031c965.png", // Bedroom with floral bedding and brown chair
      "/lovable-uploads/8eed304a-3b15-43ff-a24f-6b67f22043c5.png", // Single bedroom with light floral bedding
      "/lovable-uploads/fb10f888-0b90-4054-a857-d65f6d51956a.png", // Bedroom with sliding door access to yard
    ],
    coordinates: {
      lat: 38.6184,
      lng: -121.4277,
    },
    featured: true,
    rating: 4.7,
  },
  {
    id: "golden-legacy-iii",
    name: "Golden Legacy Elderly Care III - Greenhaven Assisted Senior Living",
    address: "7695 River Village Dr",
    city: "Sacramento",
    zip: "95831",
    phone: "(916) 555-9876",
    email: "contact@goldenlegacy3.com",
    website: "www.goldenlegacy3.com",
    description: "Golden Legacy Elderly Care III is located in the beautiful Greenhaven neighborhood of Sacramento. Our riverside location provides a serene and peaceful setting for residents. We offer a blend of independent and assisted living options in a resort-style environment. Residents enjoy spacious apartments, gourmet dining, and a robust calendar of activities. Our professional staff provides discreet assistance as needed, allowing residents to maintain their independence while knowing support is always available.",
    shortDescription: "Resort-style senior living in Greenhaven with beautiful riverside views and upscale amenities.",
    pricing: {
      starting: 4700,
      average: 5500,
    },
    services: [
      "Tiered assistance packages",
      "Concierge services",
      "Wellness coordination",
      "Scheduled transportation",
      "Housekeeping",
      "Personal care assistance"
    ],
    amenities: [
      "Waterfront views",
      "Full-service dining",
      "Fitness center",
      "Beauty salon",
      "Game room",
      "Riverside walking paths"
    ],
    images: [
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80"
    ],
    coordinates: {
      lat: 38.4792,
      lng: -121.5183,
    },
    featured: false,
    rating: 4.9,
  },
  {
    id: "love-and-serenity-iii",
    name: "Love and Serenity III - Greenhaven Assisted Living Community",
    address: "573 Shaw River Way",
    city: "Sacramento",
    zip: "95831",
    phone: "(916) 555-8642",
    email: "info@loveandserenity3.com",
    website: "www.loveandserenity3.com",
    description: "Love and Serenity III is our premier location in the desirable Greenhaven neighborhood. This upscale facility offers assisted living services in an elegant environment with a focus on active lifestyles. Our spacious campus features beautiful outdoor spaces, walking paths, and comfortable indoor amenities. We encourage residents to remain engaged and independent through our extensive activity program, while providing discreet assistance as needed. Our culinary program features chef-prepared meals that delight the senses.",
    shortDescription: "Upscale assisted living in Greenhaven focusing on active lifestyles and elegant surroundings.",
    pricing: {
      starting: 4800,
      average: 5600,
    },
    services: [
      "Personalized assistance",
      "Wellness program",
      "Medication management",
      "Scheduled transportation",
      "Housekeeping",
      "Social coordination"
    ],
    amenities: [
      "Spacious apartments",
      "Gourmet dining",
      "Fitness center",
      "Library",
      "Game room",
      "Outdoor gardens"
    ],
    images: [
      "https://images.unsplash.com/photo-1600494448637-4e5e7a5f8475?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600573472601-75c73dba264c?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?auto=format&fit=crop&q=80"
    ],
    coordinates: {
      lat: 38.4796,
      lng: -121.5189,
    },
    featured: false,
    rating: 4.9,
  },
  {
    id: "villa-natomas",
    name: "Villa Natomas Elderly Care",
    address: "540 Alcantar Circle",
    city: "Sacramento",
    zip: "95834",
    phone: "(916) 555-7139",
    email: "care@villanatomas.com",
    website: "www.villanatomas.com",
    description: "Villa Natomas Elderly Care offers a luxurious assisted living experience in the desirable Natomas area. Our elegant facility combines upscale amenities with comprehensive care services to create an exceptional senior living environment. We focus on providing a socially active community with numerous opportunities for engagement and connection. Our professional staff delivers personalized care with a hospitality-oriented approach, ensuring residents feel both well-cared for and respected. The convenient location offers easy access to shopping, dining, and entertainment.",
    shortDescription: "Luxurious assisted living in Natomas with upscale amenities and hospitality-oriented care.",
    pricing: {
      starting: 4900,
      average: 5700,
    },
    services: [
      "Personalized care plans",
      "Concierge services",
      "Medication management",
      "Health and wellness program",
      "Transportation services",
      "Social engagement coordination"
    ],
    amenities: [
      "Elegant private suites",
      "Fine dining experience",
      "Theater room",
      "Fitness center",
      "Library and computer center",
      "Beauty salon and spa"
    ],
    images: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?auto=format&fit=crop&q=80"
    ],
    coordinates: {
      lat: 38.6483,
      lng: -121.5066,
    },
    featured: false,
    rating: 4.8,
  },
  {
    id: "vita-bella-3",
    name: "Vita Bella Elderly Care 3",
    address: "4230 Eastern Avenue",
    city: "Sacramento",
    zip: "95864",
    phone: "(916) 555-4321",
    email: "info@vitabella3.com",
    website: "www.vitabella3.com",
    description: "Vita Bella Elderly Care 3 offers a luxurious and comfortable living environment for seniors who need assistance with daily activities. Our beautiful facility features spacious rooms, elegant common areas, and meticulously maintained gardens. Our professional staff is dedicated to providing personalized care that enhances the quality of life for all residents. We focus on creating a warm, home-like atmosphere where seniors can enjoy their golden years with dignity and comfort.",
    shortDescription: "Luxury senior living with personalized care plans and elegant surroundings in East Sacramento.",
    pricing: {
      starting: 4600,
      average: 5300,
    },
    services: [
      "24/7 caregiving staff",
      "Medication management",
      "Personalized care plans",
      "Wellness programs",
      "Transportation services",
      "Memory care support"
    ],
    amenities: [
      "Private suites",
      "Gourmet dining",
      "Garden courtyard",
      "Library and reading room",
      "Activity center",
      "Beauty salon"
    ],
    images: [
      "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1517022812141-23620dba5c23?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&q=80"
    ],
    coordinates: {
      lat: 38.5665,
      lng: -121.4132,
    },
    featured: true,
    rating: 4.9,
  },
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
