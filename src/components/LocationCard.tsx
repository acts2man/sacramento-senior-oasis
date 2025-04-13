
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, Heart, DollarSign, Users } from 'lucide-react';
import { LocationType } from '../data/locations';

interface LocationCardProps {
  location: LocationType;
  featured?: boolean;
}

const LocationCard = ({ location, featured = false }: LocationCardProps) => {
  const [isFavorited, setIsFavorited] = useState(false);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorited(!isFavorited);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow ${featured ? 'border-l-4 border-senior-teal' : ''}`}>
      <Link to={`/location/${location.id}`} className="block">
        <div className="relative">
          <img 
            src={location.images[0]} 
            alt={location.name} 
            className="w-full h-48 object-cover"
          />
          <button 
            onClick={toggleFavorite}
            className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow-md"
            aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart 
              size={20} 
              className={isFavorited ? "fill-senior-teal text-senior-teal" : "text-gray-400"} 
            />
          </button>
          {featured && (
            <div className="absolute top-2 left-2 bg-senior-teal text-white text-xs font-bold px-2 py-1 rounded">
              Featured
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="flex items-start justify-between">
            <h3 className="text-xl font-bold text-senior-slate mb-1 line-clamp-2">{location.name}</h3>
            <div className="flex items-center text-amber-500 ml-2">
              <Star size={16} className="fill-amber-500" />
              <span className="ml-1 text-sm font-medium">{location.rating}</span>
            </div>
          </div>
          <div className="flex items-center text-gray-500 mb-2">
            <MapPin size={16} className="mr-1 flex-shrink-0" />
            <span className="text-sm">{location.city}, CA {location.zip}</span>
          </div>
          <p className="text-gray-600 mb-4 line-clamp-2">{location.shortDescription}</p>
          <div className="flex justify-between items-center">
            <div className="flex items-center text-senior-slate">
              <DollarSign size={16} className="mr-1" />
              <span className="font-semibold">{formatPrice(location.pricing.starting)}+</span>
              <span className="text-xs text-gray-500 ml-1">/ month</span>
            </div>
            <div className="flex items-center text-senior-slate">
              <Users size={16} className="mr-1" />
              <span className="text-sm">{location.services.length} services</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default LocationCard;
