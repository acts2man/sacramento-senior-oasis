
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

export interface CareType {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export const locations: LocationType[] = [
  {
    id: "vita-bella-ii",
    slug: "vita-bella-elderly-care-ii",
    name: "Vita Bella II",
    images: [
      "/lovable-uploads/022f45e2-aab9-417b-a5dc-e262a64732bf.png",
      "/lovable-uploads/09a49d18-77fe-4059-8f5f-71e525c0821f.png",
      "/lovable-uploads/09be1fb9-8eba-4580-9869-d9079b186b42.png"
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
      "/lovable-uploads/1ce3f3d6-bac8-42f1-88a7-b05058974747.png",
      "/lovable-uploads/27f891fb-fb72-42b5-ba46-9eae9da29002.png",
      "/lovable-uploads/2aa7fe16-ed79-4883-a9bc-c7d2e16e255c.png"
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
      "/lovable-uploads/2b263e1e-0019-4d81-9062-0b30a2549d40.png",
      "/lovable-uploads/2ce3d4af-0ff4-4184-9edf-6542bcbf632f.png",
      "/lovable-uploads/2e75b146-58c4-41b3-a651-549ba187a423.png"
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
      "/lovable-uploads/32b3ebd5-820c-477a-b81c-cf9acac27af9.png",
      "/lovable-uploads/33b8df9e-e3ad-4e8f-a8dd-328769da1733.png",
      "/lovable-uploads/353d2d0d-8659-4178-bbe6-6cc5d25f00a0.png"
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
      "/lovable-uploads/37f420c0-f252-483e-a319-c7631853284e.png",
      "/lovable-uploads/3c5f4256-e888-4246-bd5e-fe93861e21a1.png",
      "/lovable-uploads/3c9f34a4-ffc5-44b7-a131-d219f3e04f72.png"
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
      "/lovable-uploads/44df1279-5968-4ddf-b139-24854240a933.png",
      "/lovable-uploads/4743e7a8-667e-4a56-908c-55a007d068c0.png",
      "/lovable-uploads/478d7794-77d8-4ac1-9fb1-d81152ab4226.png"
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
      "/lovable-uploads/4a6944c4-f741-40f7-af61-72005cfa78e6.png",
      "/lovable-uploads/4be45100-6037-4173-a593-e610873b5c06.png",
      "/lovable-uploads/4ff800e4-d48b-40d5-afde-b9b608e0ff64.png"
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
      "/lovable-uploads/55f3d34a-e353-4d9b-843d-6f0e9a9f61bf.png",
      "/lovable-uploads/5921188d-0450-46a4-b484-c75078f04cbb.png",
      "/lovable-uploads/59380478-fc98-4263-9293-d269cbd287a4.png"
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
      "/lovable-uploads/5ce5de82-fcca-4fff-9c15-d2f9b2ca18ee.png",
      "/lovable-uploads/628bace6-0de3-486a-85f3-e462b650abe7.png",
      "/lovable-uploads/62a84882-d05e-43ef-b915-22a89abc4c36.png"
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
      "/lovable-uploads/62b9b61e-e503-4bb7-9ce5-92ed015cd946.png",
      "/lovable-uploads/62c160f2-9772-4b15-b058-4e66a7aaef26.png",
      "/lovable-uploads/63abe475-d170-4636-90d0-144a46f7ee7c.png"
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
      "/lovable-uploads/67cf301c-8286-4c5c-b32d-4b4b0e84a49c.png",
      "/lovable-uploads/6d016c8d-0d65-45be-a79e-8a95e9916a54.png",
      "/lovable-uploads/749cc486-ae95-4a0c-8a54-cebfe856570b.png"
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
      "/lovable-uploads/8039f371-26f8-4bcf-8ef3-55d72f7fc517.png",
      "/lovable-uploads/82239084-a71e-4fc2-8429-3daf602cddb3.png",
      "/lovable-uploads/87d55c9c-9d7c-4f02-848c-308d1f247bc4.png"
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
  },
  {
    id: "maple-ridge-senior-living",
    slug: "maple-ridge-senior-living",
    name: "Maple Ridge Senior Living",
    images: [
      "/lovable-uploads/87d9b1dd-242b-4f9e-b777-d5f10e9de76a.png",
      "/lovable-uploads/89a0b14d-7858-4856-b048-e0a70d4e98e3.png",
      "/lovable-uploads/8a511d8b-8af3-4ff5-bb3b-0c124ec1be11.png"
    ],
    address: "142 Maple Ridge Drive",
    city: "Sacramento",
    zip: "95819",
    phone: "916-555-0114",
    email: "info@mapleridge.com",
    website: "www.mapleridge.com",
    coordinates: {
      lat: 38.5601,
      lng: -121.4701
    },
    rating: 4.4,
    shortDescription: "A modern senior living community with comprehensive care.",
    description: "Maple Ridge Senior Living offers modern amenities and comprehensive care services in a beautifully designed community. Our residents enjoy spacious apartments, restaurant-style dining, and a full range of activities and wellness programs.",
    amenities: ["Modern apartments", "Restaurant dining", "Wellness center", "Beautiful landscaping"],
    services: ["Independent living", "Assisted living", "Memory care", "Wellness programs"],
    pricing: {
      starting: 4300,
      average: 5900
    },
    type: "Senior Living"
  },
  {
    id: "cedar-creek-assisted-living",
    slug: "cedar-creek-assisted-living",
    name: "Cedar Creek Assisted Living",
    images: [
      "/lovable-uploads/8eed304a-3b15-43ff-a24f-6b67f22043c5.png",
      "/lovable-uploads/8f0c75af-1290-4991-b8cc-730da5196a23.png",
      "/lovable-uploads/8f9a0e32-5572-4665-a085-541b3e34a778.png"
    ],
    address: "876 Cedar Creek Boulevard",
    city: "Sacramento",
    zip: "95820",
    phone: "916-555-0115",
    email: "info@cedarcreek.com",
    website: "www.cedarcreek.com",
    coordinates: {
      lat: 38.5489,
      lng: -121.4834
    },
    rating: 4.5,
    shortDescription: "Personalized assisted living care in a homelike environment.",
    description: "Cedar Creek Assisted Living provides personalized care in a warm, homelike environment. Our dedicated staff focuses on maintaining residents' independence while providing the support they need for daily activities and health management.",
    amenities: ["Homelike setting", "Private rooms", "Common areas", "Outdoor spaces"],
    services: ["Assisted living", "Medication management", "Personal care", "24-hour support"],
    pricing: {
      starting: 3700,
      average: 5100
    },
    type: "Assisted Living"
  },
  {
    id: "willow-brook-memory-care",
    slug: "willow-brook-memory-care",
    name: "Willow Brook Memory Care",
    images: [
      "/lovable-uploads/91549c68-429a-4a65-8962-c72ef1e28820.png",
      "/lovable-uploads/931fcefc-e4da-4901-9754-ecc898916214.png",
      "/lovable-uploads/93ebc135-71b8-47bf-8660-2b6fd28f7466.png"
    ],
    address: "543 Willow Brook Lane",
    city: "Sacramento",
    zip: "95823",
    phone: "916-555-0116",
    email: "info@willowbrook.com",
    website: "www.willowbrook.com",
    coordinates: {
      lat: 38.5423,
      lng: -121.4567
    },
    rating: 4.8,
    shortDescription: "Specialized memory care with innovative therapeutic programs.",
    description: "Willow Brook Memory Care specializes in providing innovative therapeutic programs for individuals with Alzheimer's and dementia. Our secure environment features specialized staff trained in memory care techniques and engaging activities designed to maintain cognitive function.",
    amenities: ["Secure environment", "Therapeutic gardens", "Memory care activities", "Specialized dining"],
    services: ["Memory care", "Cognitive therapy", "Behavioral support", "Family counseling"],
    pricing: {
      starting: 5200,
      average: 6800
    },
    type: "Memory Care"
  },
  {
    id: "oak-meadows-senior-community",
    slug: "oak-meadows-senior-community",
    name: "Oak Meadows Senior Community",
    images: [
      "/lovable-uploads/9574bcc1-29e8-4ce4-a547-cd50f72f75a9.png",
      "/lovable-uploads/9649bce7-e56d-4d40-8527-ab3f4d3f19c3.png",
      "/lovable-uploads/96683bda-6e70-4212-9106-8a532e7d736c.png"
    ],
    address: "789 Oak Meadows Way",
    city: "Sacramento",
    zip: "95824",
    phone: "916-555-0117",
    email: "info@oakmeadows.com",
    website: "www.oakmeadows.com",
    coordinates: {
      lat: 38.5367,
      lng: -121.4723
    },
    rating: 4.6,
    shortDescription: "A spacious senior community with resort-style amenities.",
    description: "Oak Meadows Senior Community offers resort-style living with spacious apartments and premium amenities. Our community features multiple dining options, wellness programs, and a wide variety of social and recreational activities for active seniors.",
    amenities: ["Resort-style amenities", "Multiple dining venues", "Spa services", "Golf simulator"],
    services: ["Independent living", "Concierge services", "Wellness programs", "Transportation"],
    pricing: {
      starting: 5500,
      average: 7200
    },
    type: "Senior Community"
  },
  {
    id: "sunrise-manor-assisted-living",
    slug: "sunrise-manor-assisted-living",
    name: "Sunrise Manor Assisted Living",
    images: [
      "/lovable-uploads/96e730cb-fb88-41c4-a526-71d6e8ba8e4c.png",
      "/lovable-uploads/97e697fa-13b9-409a-b6cd-7b6b9eaba22c.png",
      "/lovable-uploads/996ef2f5-2be5-4f96-9b2f-3c41fc0e3376.png"
    ],
    address: "234 Sunrise Boulevard",
    city: "Sacramento",
    zip: "95827",
    phone: "916-555-0118",
    email: "info@sunrisemanor.com",
    website: "www.sunrisemanor.com",
    coordinates: {
      lat: 38.5298,
      lng: -121.4891
    },
    rating: 4.3,
    shortDescription: "Affordable assisted living with quality care and services.",
    description: "Sunrise Manor Assisted Living provides affordable, quality care in a friendly and supportive environment. Our experienced staff offers personalized assistance with daily activities while encouraging independence and social engagement among residents.",
    amenities: ["Affordable living", "Community dining", "Activity programs", "Outdoor gardens"],
    services: ["Assisted living", "Medication assistance", "Personal care", "Social activities"],
    pricing: {
      starting: 3400,
      average: 4600
    },
    type: "Assisted Living"
  },
  {
    id: "riverside-senior-care",
    slug: "riverside-senior-care",
    name: "Riverside Senior Care",
    images: [
      "/lovable-uploads/a45c791c-5916-4891-87b7-8723fe76baa3.png",
      "/lovable-uploads/a5a44a2c-1c37-4bda-92f7-33f2346976e2.png",
      "/lovable-uploads/a8072319-9350-4b35-be2f-761db7e194b0.png"
    ],
    address: "456 Riverside Drive",
    city: "Sacramento",
    zip: "95829",
    phone: "916-555-0119",
    email: "info@riversidecare.com",
    website: "www.riversidecare.com",
    coordinates: {
      lat: 38.5234,
      lng: -121.4612
    },
    rating: 4.7,
    shortDescription: "Waterfront senior care with scenic river views.",
    description: "Riverside Senior Care offers a unique waterfront location with beautiful river views. Our community provides comprehensive care services in a peaceful setting, with outdoor terraces and walking paths along the water for residents to enjoy.",
    amenities: ["Waterfront location", "River views", "Outdoor terraces", "Walking paths"],
    services: ["Assisted living", "Skilled nursing", "Rehabilitation", "Hospice care"],
    pricing: {
      starting: 4600,
      average: 6100
    },
    type: "Senior Care"
  },
  {
    id: "golden-age-manor",
    slug: "golden-age-manor",
    name: "Golden Age Manor",
    images: [
      "/lovable-uploads/afc98756-1c70-47ae-b595-87c593a204c1.png",
      "/lovable-uploads/afcb3e15-9f58-4536-8e3d-892e030a743b.png",
      "/lovable-uploads/b1313780-5535-420c-9898-186b199b50fe.png"
    ],
    address: "321 Golden Age Avenue",
    city: "Sacramento",
    zip: "95830",
    phone: "916-555-0120",
    email: "info@goldenage.com",
    website: "www.goldenage.com",
    coordinates: {
      lat: 38.5156,
      lng: -121.4778
    },
    rating: 4.5,
    shortDescription: "Elegant senior living with luxury amenities and services.",
    description: "Golden Age Manor provides elegant senior living with luxury amenities and personalized services. Our beautifully appointed community features fine dining, concierge services, and a full range of wellness and recreational programs for discerning seniors.",
    amenities: ["Luxury amenities", "Fine dining", "Concierge services", "Elegant interiors"],
    services: ["Independent living", "Assisted living", "Concierge services", "Wellness programs"],
    pricing: {
      starting: 5800,
      average: 7500
    },
    type: "Senior Living"
  },
  {
    id: "meadowbrook-memory-care",
    slug: "meadowbrook-memory-care",
    name: "Meadowbrook Memory Care",
    images: [
      "/lovable-uploads/b13751e7-6155-4bec-9e4b-78ab38a63083.png",
      "/lovable-uploads/b30d7fda-accd-4024-916d-15b9f02d29c3.png",
      "/lovable-uploads/b5ca2441-44ef-4f9d-84eb-6047fc9f993e.png"
    ],
    address: "678 Meadowbrook Circle",
    city: "Sacramento",
    zip: "95832",
    phone: "916-555-0121",
    email: "info@meadowbrook.com",
    website: "www.meadowbrook.com",
    coordinates: {
      lat: 38.5089,
      lng: -121.4645
    },
    rating: 4.9,
    shortDescription: "Premier memory care with innovative therapeutic approaches.",
    description: "Meadowbrook Memory Care is a premier facility specializing in innovative therapeutic approaches for memory care. Our state-of-the-art facility features advanced security systems, specialized programming, and highly trained staff dedicated to enhancing quality of life for residents with memory impairments.",
    amenities: ["State-of-the-art facility", "Advanced security", "Therapeutic environments", "Specialized programming"],
    services: ["Memory care", "Cognitive rehabilitation", "Music therapy", "Art therapy"],
    pricing: {
      starting: 6000,
      average: 7800
    },
    type: "Memory Care"
  },
  {
    id: "parkside-assisted-living",
    slug: "parkside-assisted-living",
    name: "Parkside Assisted Living",
    images: [
      "/lovable-uploads/b88ded2c-fa43-4f7e-b92d-5ba3fad787d4.png",
      "/lovable-uploads/ba5cd2ba-813e-4585-8cc1-881a6a3935c1.png",
      "/lovable-uploads/ba95c800-30fa-44db-9666-77eb557cb5b6.png"
    ],
    address: "890 Parkside Avenue",
    city: "Sacramento",
    zip: "95834",
    phone: "916-555-0122",
    email: "info@parkside.com",
    website: "www.parkside.com",
    coordinates: {
      lat: 38.5012,
      lng: -121.4556
    },
    rating: 4.4,
    shortDescription: "Comfortable assisted living adjacent to beautiful parklands.",
    description: "Parkside Assisted Living is conveniently located adjacent to beautiful parklands, offering residents easy access to nature and outdoor activities. Our comfortable community provides quality assisted living services with a focus on maintaining an active and healthy lifestyle.",
    amenities: ["Park location", "Outdoor activities", "Nature access", "Comfortable living"],
    services: ["Assisted living", "Activity programs", "Outdoor excursions", "Health monitoring"],
    pricing: {
      starting: 3800,
      average: 5300
    },
    type: "Assisted Living"
  },
  {
    id: "tranquil-gardens-senior-living",
    slug: "tranquil-gardens-senior-living",
    name: "Tranquil Gardens Senior Living",
    images: [
      "/lovable-uploads/bc80fb7a-8748-4f20-bfde-8f7d5e874f61.png",
      "/lovable-uploads/bc8cf363-65b9-413c-b11b-d0c9ad0daff5.png",
      "/lovable-uploads/c6d8c9db-1c2a-493a-92f1-5a41e7917cbe.png"
    ],
    address: "567 Tranquil Gardens Lane",
    city: "Sacramento",
    zip: "95835",
    phone: "916-555-0123",
    email: "info@tranquilgardens.com",
    website: "www.tranquilgardens.com",
    coordinates: {
      lat: 38.4945,
      lng: -121.4623
    },
    rating: 4.6,
    shortDescription: "Peaceful senior living community with beautiful gardens.",
    description: "Tranquil Gardens Senior Living offers a peaceful environment with beautifully maintained gardens and outdoor spaces. Our community emphasizes wellness and tranquility, providing residents with a serene setting for their golden years while offering comprehensive care and support services.",
    amenities: ["Beautiful gardens", "Peaceful environment", "Outdoor spaces", "Wellness focus"],
    services: ["Independent living", "Assisted living", "Wellness programs", "Garden therapy"],
    pricing: {
      starting: 4400,
      average: 5900
    },
    type: "Senior Living"
  },
  {
    id: "harmony-heights-senior-care",
    slug: "harmony-heights-senior-care",
    name: "Harmony Heights Senior Care",
    images: [
      "/lovable-uploads/cab14450-f826-4e9c-a5ad-6d479598edb3.png",
      "/lovable-uploads/d26da6bc-c979-45d2-9e1f-46c6b716e967.png",
      "/lovable-uploads/d3df9465-018e-4016-abb4-aa8d50324b8b.png"
    ],
    address: "123 Harmony Heights Boulevard",
    city: "Sacramento",
    zip: "95836",
    phone: "916-555-0124",
    email: "info@harmonyheights.com",
    website: "www.harmonyheights.com",
    coordinates: {
      lat: 38.4878,
      lng: -121.4789
    },
    rating: 4.8,
    shortDescription: "Comprehensive senior care with a focus on holistic wellness.",
    description: "Harmony Heights Senior Care takes a holistic approach to senior wellness, offering comprehensive care services that address physical, mental, and spiritual well-being. Our community features innovative wellness programs, therapeutic services, and a supportive environment that promotes overall health and happiness.",
    amenities: ["Holistic wellness", "Therapeutic services", "Innovative programs", "Supportive environment"],
    services: ["Assisted living", "Memory care", "Therapy services", "Wellness programs"],
    pricing: {
      starting: 4900,
      average: 6400
    },
    type: "Senior Care"
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

export const getCareTypes = (): CareType[] => {
  return [
    {
      id: 'assisted-living',
      title: 'Assisted Living',
      description: 'Personalized care and support for daily activities while maintaining independence.',
      icon: 'users'
    },
    {
      id: 'memory-care',
      title: 'Memory Care',
      description: 'Specialized care for individuals with Alzheimer\'s and dementia in a secure environment.',
      icon: 'brain'
    },
    {
      id: 'independent-living',
      title: 'Independent Living',
      description: 'Active lifestyle communities with optional support services and amenities.',
      icon: 'home'
    },
    {
      id: 'skilled-nursing',
      title: 'Skilled Nursing',
      description: '24/7 medical care and supervision for those requiring comprehensive healthcare.',
      icon: 'stethoscope'
    }
  ];
};
