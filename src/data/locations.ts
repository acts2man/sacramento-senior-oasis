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
      "/lovable-uploads/faa9592c-ceff-4f35-82ca-b3ffabdedeab.png", // Exterior view
      "/lovable-uploads/022f45e2-aab9-417b-a5dc-e262a64732bf.png", // Living room with fireplace
      "/lovable-uploads/1ce3f3d6-bac8-42f1-88a7-b05058974747.png", // Dining area and kitchen view
      "/lovable-uploads/4be45100-6037-4173-a593-e610873b5c06.png", // Dining room closeup
      "/lovable-uploads/df9862b7-ad5d-4d84-8779-a49ef62fe835.png", // Kitchen
      "/lovable-uploads/97e697fa-13b9-409a-b6cd-7b6b9eaba22c.png", // Bedroom with blue pattern bedding
      "/lovable-uploads/82239084-a71e-4fc2-8429-3daf602cddb3.png", // Another bedroom view
      "/lovable-uploads/62b9b61e-e503-4bb7-9ce5-92ed015cd946.png", // Twin beds room
      "/lovable-uploads/2e75b146-58c4-41b3-a651-549ba187a423.png", // Outdoor patio area
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
      "/lovable-uploads/59380478-fc98-4263-9293-d269cbd287a4.png", // Front view of facility with palm trees and driveway
      "/lovable-uploads/478d7794-77d8-4ac1-9fb1-d81152ab4226.png", // Landscaped backyard with stone walls and green lawn
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
      "/lovable-uploads/c6d8c9db-1c2a-493a-92f1-5a41e7917cbe.png", // Exterior view of white house with porch
      "/lovable-uploads/e48923de-b6cc-4f33-b03b-7d69b537dbd6.png", // Modern dining area with glass table and wall decor
      "/lovable-uploads/749cc486-ae95-4a0c-8a54-cebfe856570b.png", // Red dining table with chairs and decorative vase
    ],
    coordinates: {
      lat: 38.5399,
      lng: -121.4456,
    },
    featured: true,
    rating: 4.5,
  },
  {
    id: "abounding-peace-iii",
    name: "Abounding Peace III Elderly Care",
    address: "10339 Sagres Way",
    city: "Sacramento",
    zip: "95828",
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
    featured: false,
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
    featured: false,
    rating: 4.8,
  },
  {
    id: "golden-heritage",
    name: "Golden Heritage Senior Care",
    address: "37 Mossglen Cir",
    city: "Sacramento",
    zip: "95826",
    phone: "(916) 555-6543",
    email: "care@goldenheritage.com",
    website: "www.goldenheritage.com",
    description: "Golden Heritage Senior Care provides a comfortable and supportive environment for seniors needing assistance with daily living. Our community emphasizes dignity and quality of life through personalized care plans, engaging activities, and a nurturing atmosphere. While we respect our residents' independence, we provide the necessary support to ensure their safety and well-being. Our trained staff is available 24/7 to assist with personal care, medication management, and other daily needs.",
    shortDescription: "Quality senior care focused on dignity and independence in a supportive community setting.",
    pricing: {
      starting: 4100,
      average: 4900,
    },
    services: [
      "Personalized care plans",
      "Medication management",
      "Assistance with ADLs",
      "Nutritional monitoring",
      "Transportation services",
      "Wellness programming"
    ],
    amenities: [
      "Private rooms",
      "Community dining",
      "Activity areas",
      "Outdoor gardens",
      "Recreational spaces",
      "Visitor lounges"
    ],
    images: [
      "https://images.unsplash.com/photo-1600585153490-76fb20a32601?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600566752734-2a0e4f557873?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80"
    ],
    coordinates: {
      lat: 38.5574,
      lng: -121.4066,
    },
    featured: false,
    rating: 4.6,
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
      "https://images.unsplash.com/photo-1600607687120-9e4bae19287a?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600607688583-ea6a71588ede?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?auto=format&fit=crop&q=80"
    ],
    coordinates: {
      lat: 38.6184,
      lng: -121.4277,
    },
    featured: false,
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
    featured: true,
    rating: 4.9,
  },
  {
    id: "bella-villa",
    name: "Bella Villa Elderly Care II Assisted Living",
    address: "3612 Eastern Ave",
    city: "Sacramento",
    zip: "95821",
    phone: "(916) 555-2468",
    email: "info@bellavilla.com",
    website: "www.bellavilla.com",
    description: "Bella Villa Elderly Care II provides a European-inspired living experience for seniors seeking assisted living services. Our beautiful facility features Mediterranean architecture, lush gardens, and elegant common areas. We believe in a holistic approach to senior care that addresses physical, emotional, and social wellbeing. Our professional staff is trained to provide personalized care while encouraging residents to pursue their interests and maintain connections with family and friends.",
    shortDescription: "European-inspired assisted living with elegant surroundings and a holistic approach to care.",
    pricing: {
      starting: 4300,
      average: 5100,
    },
    services: [
      "Personalized care plans",
      "Medication management",
      "Bathing and dressing assistance",
      "Mobility support",
      "Transportation to appointments",
      "Activity coordination"
    ],
    amenities: [
      "Private suites",
      "Mediterranean courtyard",
      "Gourmet dining",
      "Library and reading room",
      "Art studio",
      "Beauty salon"
    ],
    images: [
      "/lovable-uploads/bc8cf363-65b9-413c-b11b-d0c9ad0daff5.png", // Exterior view of house with garage and trees
      "/lovable-uploads/ec6dce33-9f77-4acd-913e-5cfc0b328fde.png", // Single bedroom with wooden floors and flower art
      "/lovable-uploads/67cf301c-8286-4c5c-b32d-4b4b0e84a49c.png", // Twin bedroom with black bedding and wooden floors
      "/lovable-uploads/8a511d8b-8af3-4ff5-bb3b-0c124ec1be11.png", // Large bedroom with twin beds and patterned bedding
      "/lovable-uploads/87d9b1dd-242b-4f9e-b777-d5f10e9de76a.png", // Living room with leather couch and open kitchen
      "/lovable-uploads/d562ee63-991d-4634-9277-9f107a074e85.png", // Modern kitchen with black countertops and white cabinets
      "/lovable-uploads/b88ded2c-fa43-4f7e-b92d-5ba3fad787d4.png", // Dining and living area with red tablecloth
      "/lovable-uploads/fab2b4ad-4ee7-412e-a5b9-59a1053a99c5.png", // Bedroom with chandelier and patterned bedding
    ],
    coordinates: {
      lat: 38.6184,
      lng: -121.4271,
    },
    featured: false,
    rating: 4.7,
  },
  {
    id: "love-and-comfort",
    name: "Love and Comfort - Assisted Living Care Home",
    address: "6532 Rancho Grande Way",
    city: "Sacramento",
    zip: "95828",
    phone: "(916) 555-1357",
    email: "care@loveandcomfort.com",
    website: "www.loveandcomfort.com",
    description: "Love and Comfort offers a family-oriented approach to assisted living in a residential setting. Our cozy home environment provides a comfortable alternative to larger facilities while still offering professional care services. We maintain a small resident population to ensure personalized attention and a strong sense of community. Our compassionate caregivers become like extended family to our residents, providing assistance while respecting their dignity and independence.",
    shortDescription: "Family-oriented assisted living in a residential setting with personalized attention.",
    pricing: {
      starting: 3900,
      average: 4700,
    },
    services: [
      "Personal care assistance",
      "Medication reminders",
      "Meal preparation",
      "Laundry services",
      "Housekeeping",
      "Transportation arrangements"
    ],
    amenities: [
      "Private and shared rooms",
      "Home-cooked meals",
      "Family-style dining",
      "Cozy common areas",
      "Garden",
      "Entertainment center"
    ],
    images: [
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c8a54eb?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585153725-d29c8f545d22?auto=format&fit=crop&q=80"
    ],
    coordinates: {
      lat: 38.5125,
      lng: -121.4119,
    },
    featured: false,
    rating: 4.6,
  },
  {
    id: "love-and-comfort-ii",
    name: "Love and Comfort II - Assisted Living Elderly Care Home",
    address: "320 Bowman Ave",
    city: "Sacramento",
    zip: "95833",
    phone: "(916) 555-2468",
    email: "info@loveandcomfort2.com",
    website: "www.loveandcomfort2.com",
    description: "Love and Comfort II continues our tradition of exceptional residential care in a convenient Sacramento location. Our home-like environment offers comfort and security while our professional staff provides personalized care services. We focus on creating a nurturing atmosphere where residents feel valued and respected. Daily activities promote social interaction and mental engagement, while our care services ensure physical well-being. Family involvement is encouraged to maintain important connections.",
    shortDescription: "Residential care home offering personalized services in a nurturing, home-like environment.",
    pricing: {
      starting: 4000,
      average: 4800,
    },
    services: [
      "24-hour supervision",
      "Medication management",
      "Personal hygiene assistance",
      "Incontinence care",
      "Meal preparation",
      "Mobility assistance"
    ],
    amenities: [
      "Comfortable private rooms",
      "Spacious common areas",
      "Accessible bathroom facilities",
      "Outdoor patio",
      "Cable TV and internet",
      "Transportation coordination"
    ],
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585153490-76fb20a32601?auto=format&fit=crop&q=80"
    ],
    coordinates: {
      lat: 38.6136,
      lng: -121.5066,
    },
    featured: false,
    rating: 4.5,
  },
  {
    id: "love-and-serenity-ii",
    name: "Love And Serenity II - Assisted Living For The Elderly",
    address: "5942 Park Village St",
    city: "Sacramento",
    zip: "95822",
    phone: "(916) 555-3692",
    email: "care@loveandserenity2.com",
    website: "www.loveandserenity2.com",
    description: "Love And Serenity II provides a peaceful living environment focused on comfort and tranquility. Our facility is designed to minimize stress and create a serene atmosphere conducive to well-being. We offer specialized programs for residents dealing with anxiety and depression, with an emphasis on mental health alongside physical care. Our staff is trained in gentle approaches to caregiving, and we incorporate relaxation techniques and mindfulness practices into daily activities.",
    shortDescription: "Peaceful assisted living focused on mental well-being, comfort, and tranquility.",
    pricing: {
      starting: 4200,
      average: 5000,
    },
    services: [
      "Anxiety and depression support",
      "Gentle care approaches",
      "Medication management",
      "Personal care assistance",
      "Mindfulness program",
      "Relaxation therapy"
    ],
    amenities: [
      "Quiet private rooms",
      "Meditation garden",
      "Soothing common areas",
      "Aromatherapy",
      "Music therapy room",
      "Seasonal menu"
    ],
    images: [
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1542928658-22251e208ac1?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600573472569-78f9e5271dd6?auto=format&fit=crop&q=80"
    ],
    coordinates: {
      lat: 38.5098,
      lng: -121.5190,
    },
    featured: false,
    rating: 4.8,
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
    featured: true,
    rating: 4.9,
  },
  {
    id: "love-and-serenity-elk-grove-iii",
    name: "Love and Serenity of Elk Grove III",
    address: "9442 Mazatlan Way",
    city: "Elk Grove",
    zip: "95624",
    phone: "(916) 555-7531",
    email: "care@loveandserenity-eg3.com",
    website: "www.loveandserenity-elkgrove3.com",
    description: "Love and Serenity of Elk Grove III provides a nurturing environment for seniors in a convenient Elk Grove location. Our facility is designed to balance independence with appropriate levels of care, allowing residents to enjoy life on their own terms. We take a person-centered approach to caregiving, recognizing each resident's unique needs and preferences. Our dedicated staff builds meaningful relationships with residents, creating a true sense of community. Regular family events strengthen connections between residents and their loved ones.",
    shortDescription: "Person-centered care in Elk Grove balancing independence with appropriate support services.",
    pricing: {
      starting: 4100,
      average: 4900,
    },
    services: [
      "Customized care plans",
      "Medication supervision",
      "Personal care assistance",
      "Health monitoring",
      "Transportation services",
      "Activity planning"
    ],
    amenities: [
      "Private and shared suites",
      "Home-style meals",
      "Community living areas",
      "Secured outdoor space",
      "Entertainment options",
      "Visiting areas"
    ],
    images: [
      "https://images.unsplash.com/photo-1600607687164-234c1bfed94f?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600573472568-bc0f132060a1?auto=format&fit=crop&q=80"
    ],
    coordinates: {
      lat: 38.4099,
      lng: -121.3846,
    },
    featured: false,
    rating: 4.6,
  },
  {
    id: "love-and-serenity-elk-grove-ii",
    name: "Love and Serenity of Elk Grove II - Senior Care",
    address: "9279 Orange Crest Ct",
    city: "Elk Grove",
    zip: "95624",
    phone: "(916) 555-9753",
    email: "info@loveandserenity-eg2.com",
    website: "www.loveandserenity-elkgrove2.com",
    description: "Love and Serenity of Elk Grove II offers specialized care for seniors with early to mid-stage memory concerns. Our secure environment is designed specifically to support those with cognitive challenges while maintaining dignity and quality of life. Our staff is trained in best practices for dementia care, using gentle redirection and positive engagement techniques. We provide structured daily routines that offer comfort and security while including activities that stimulate cognition and encourage social interaction.",
    shortDescription: "Specialized care for early to mid-stage memory concerns in a secure, supportive environment.",
    pricing: {
      starting: 4600,
      average: 5400,
    },
    services: [
      "Memory-focused care",
      "Safety monitoring",
      "Cognitive stimulation",
      "Structured routines",
      "Personal care assistance",
      "Family support services"
    ],
    amenities: [
      "Secure living areas",
      "Memory boxes",
      "Orientation cues",
      "Sensory room",
      "Enclosed courtyard",
      "Specialized dining"
    ],
    images: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80"
    ],
    coordinates: {
      lat: 38.4091,
      lng: -121.3839,
    },
    featured: false,
    rating: 4.7,
  },
  {
    id: "love-and-serenity-vintage-park",
    name: "Love and Serenity of Vintage Park - Senior Care Home",
    address: "8901 Sonoma Valley Way",
    city: "Sacramento",
    zip: "95829",
    phone: "(916) 555-1597",
    email: "care@loveandserenity-vp.com",
    website: "www.loveandserenity-vintagepark.com",
    description: "Love and Serenity of Vintage Park provides assisted living services in the beautiful Vintage Park neighborhood. Our residential care home offers a comfortable alternative to larger facilities with the same professional care standards. We maintain a low resident-to-caregiver ratio to ensure personalized attention and responsive service. Our experienced staff develops close relationships with residents and their families, creating a supportive environment that feels like home. We emphasize both physical care and emotional well-being in our approach.",
    shortDescription: "Residential care home in Vintage Park offering personalized attention and a homelike environment.",
    pricing: {
      starting: 4000,
      average: 4800,
    },
    services: [
      "Personalized care plans",
      "Medication monitoring",
      "Bathing and grooming assistance",
      "Incontinence care",
      "Mobility assistance",
      "Meal preparation"
    ],
    amenities: [
      "Private and semi-private rooms",
      "Home-cooked meals",
      "Accessible bathrooms",
      "Common living areas",
      "Cable TV",
      "Outdoor seating"
    ],
    images: [
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600607687164-234c1bfed94f?auto=format&fit=crop&q=80"
    ],
    coordinates: {
      lat: 38.4845,
      lng: -121.3297,
    },
    featured: false,
    rating: 4.6,
  },
  {
    id: "sacramento-senior-living",
    name: "Sacramento Senior Living",
    address: "6825 Bender Ct",
    city: "Sacramento",
    zip: "95820",
    phone: "(916) 555-2583",
    email: "info@sacramentoseniorliving.com",
    website: "www.sacramentoseniorliving.com",
    description: "Sacramento Senior Living offers affordable assisted living options without compromising on quality care. Our community focuses on creating a supportive environment where residents receive the assistance they need while maintaining as much independence as possible. We take a holistic approach to senior care, addressing physical, emotional, and social needs through our comprehensive services and engaging activity program. Our central location provides convenient access to medical facilities, shopping, and entertainment.",
    shortDescription: "Affordable assisted living with quality care services and a holistic approach to senior wellness.",
    pricing: {
      starting: 3700,
      average: 4500,
    },
    services: [
      "Assistance with daily activities",
      "Medication management",
      "Health monitoring",
      "Housekeeping",
      "Transportation services",
      "Social programs"
    ],
    amenities: [
      "Private and shared accommodations",
      "Community dining",
      "Activity room",
      "TV lounge",
      "Outdoor patio",
      "Visiting areas"
    ],
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80"
    ],
    coordinates: {
      lat: 38.5349,
      lng: -121.4338,
    },
    featured: false,
    rating: 4.5,
  },
  {
    id: "sacramento-senior-living-ii",
    name: "Sacramento Senior Living II",
    address: "34 Loma Mar Ct",
    city: "Sacramento",
    zip: "95828",
    phone: "(916) 555-2583",
    email: "info@sacramentoseniorliving2.com",
    website: "www.sacramentoseniorliving2.com",
    description: "Sacramento Senior Living II provides enhanced assisted living services for seniors requiring more comprehensive care. Our facility is designed to accommodate residents with greater physical limitations or cognitive challenges while promoting dignity and quality of life. We maintain a higher staff-to-resident ratio to ensure prompt attention to all needs. Our team includes trained caregivers who specialize in managing complex care requirements with compassion and professionalism. Family involvement is encouraged through regular care conferences and open communication.",
    shortDescription: "Enhanced assisted living with comprehensive care services for seniors with greater care needs.",
    pricing: {
      starting: 4500,
      average: 5300,
    },
    services: [
      "Enhanced personal care",
      "Intensive medication management",
      "Specialized diets",
      "Transfer assistance",
      "Wound care",
      "Oxygen management"
    ],
    amenities: [
      "Accessible accommodations",
      "Adaptive equipment",
      "Care stations",
      "Specialized dining",
      "Therapy room",
      "Family meeting space"
    ],
    images: [
      "https://images.unsplash.com/photo-1600607687120-9e4bae19287a?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600607688583-ea6a71588ede?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?auto=format&fit=crop&q=80"
    ],
    coordinates: {
      lat: 38.5151,
      lng: -121.4055,
    },
    featured: false,
    rating: 4.7,
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
    featured: true,
    rating: 4.8,
  },
  {
    id: "vita-bella",
    name: "Vita Bella Elderly Care - Assisted Living Facility",
    address: "4082 73rd St",
    city: "Sacramento",
    zip: "95820",
    phone: "(916) 555-8642",
    email: "info@vitabella.com",
    website: "www.vitabella.com",
    description: "Vita Bella Elderly Care embraces an Italian-inspired approach to senior living, emphasizing family, food, and community. Our warm, welcoming environment encourages social connection and engagement. We believe in 'la dolce vita' (the sweet life) for our residents through quality care, delicious meals, and meaningful activities. Our staff is trained to provide personalized assistance while respecting independence and dignity. The facility features comfortable indoor spaces and beautiful outdoor areas for relaxation and socialization.",
    shortDescription: "Italian-inspired assisted living focusing on family values, delicious food, and community connection.",
    pricing: {
      starting: 4100,
      average: 4900,
    },
    services: [
      "Personalized care plans",
      "Medication management",
      "Personal care assistance",
      "Housekeeping",
      "Laundry services",
      "Transportation arrangements"
    ],
    amenities: [
      "Private and shared rooms",
      "Italian-inspired cuisine",
      "Family-style dining",
      "Garden patio",
      "Community lounge",
      "Activity center"
    ],
    images: [
      "/lovable-uploads/b5ca2441-44ef-4f9d-84eb-6047fc9f993e.png", // Exterior
      "/lovable-uploads/8f0c75af-1290-4991-b8cc-730da5196a23.png", // Living room
      "/lovable-uploads/353d2d0d-8659-4178-bbe6-6cc5d25f00a0.png", // Secondary living area
      "/lovable-uploads/efdfe73a-f649-4361-aeb2-b0f085579a8c.png", // Bedroom with twin beds
      "/lovable-uploads/e7df5213-21f9-4158-b6fd-2b2880f8f0bc.png", // Bedroom with twin beds 2
    ],
    coordinates: {
      lat: 38.5356,
      lng: -121.4253,
    },
    featured: false,
    rating: 4.6,
  },
  {
    id: "vita-bella-ii",
    name: "Vita Bella Elderly Care II Assisted Living Senior Home",
    address: "8362 New Point Dr",
    city: "Sacramento",
    zip: "95828",
    phone: "(916) 555-9753",
    email: "care@vitabella2.com",
    website: "www.vitabella2.com",
    description: "Vita Bella Elderly Care II continues our tradition of exceptional care with a focus on creating a true home environment for our residents. Our intimate setting allows for personalized attention and strong relationships between residents and caregivers. We emphasize quality of life through nutritious Italian-inspired meals, engaging activities, and compassionate care. Our staff is selected not only for their professional qualifications but also for their genuine passion for elder care. We maintain open communication with families to ensure coordinated support for our residents.",
    shortDescription: "Intimate assisted living environment with Italian-inspired care philosophy and personalized attention.",
    pricing: {
      starting: 4200,
      average: 5000,
    },
    services: [
      "Individualized care plans",
      "Medication assistance",
      "Personal hygiene support",
      "Mobility assistance",
      "Incontinence care",
      "Social engagement"
    ],
    amenities: [
      "Comfortable private rooms",
      "Home-cooked Italian meals",
      "Family dining area",
      "Secured outdoor space",
      "Entertainment options",
      "Common living areas"
    ],
    images: [
      "/lovable-uploads/d26da6bc-c979-45d2-9e1f-46c6b716e967.png", // Bedroom with blue bedding
      "/lovable-uploads/b30d7fda-accd-4024-916d-15b9f02d29c3.png", // Bedroom with twin pink beds
      "/lovable-uploads/62a84882-d05e-43ef-b915-22a89abc4c36.png", // Modern bathroom
      "/lovable-uploads/63abe475-d170-4636-90d0-144a46f7ee7c.png", // Bathroom with shower
      "/lovable-uploads/91549c68-429a-4a65-8962-c72ef1e28820.png", // Built-in closet space
    ],
    coordinates: {
      lat: 38.5140,
      lng: -121.4107,
    },
    featured: false,
    rating: 4.7,
  },
  {
    id: "vita-bella-iii",
    name: "Vita Bella Elderly Care III",
    address: "6700 Sun River Dr",
    city: "Sacramento",
    zip: "95828",
    phone: "(916) 555-3579",
    email: "info@vitabella3.com",
    website: "www.vitabella3.com",
    description: "Vita Bella Elderly Care III specializes in memory care services within a secure, supportive environment. Our facility is designed specifically for residents with Alzheimer's disease, dementia, and other memory impairments. We use evidence-based approaches to memory care that promote dignity and quality of life. Our specially trained staff understands the unique challenges of memory loss and provides patient, compassionate care. The facility features circular pathways, memory cues, and secure outdoor spaces that allow residents to move freely while remaining safe.",
    shortDescription: "Specialized memory care facility with secure environment and trained staff for residents with cognitive impairments.",
    pricing: {
      starting: 5300,
      average: 6100,
    },
    services: [
      "Memory-specific care plans",
      "Secure environment",
      "Cognitive stimulation",
      "Specialized dining assistance",
      "Behavior management",
      "Family support programs"
    ],
    amenities: [
      "Memory care suites",
      "Secure wandering paths",
      "Sensory stimulation areas",
      "Memory boxes",
      "Calming spaces",
      "Enclosed courtyard"
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
