
export interface LocationType {
  id: string;
  name: string;
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
  description: string;
  shortDescription?: string;
  services: string[];
  amenities: string[];
  images: string[];
  pricing: {
    starting: number;
    average: number;
  };
  rating: number;
  featured: boolean;
}

export interface CareType {
  id: string;
  title: string;
  description: string;
  icon: string;
}
