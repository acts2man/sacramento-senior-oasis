import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, Heart, DollarSign, Users } from 'lucide-react';
import { LocationType } from '../data/locations';

interface LocationCardProps {
  location: LocationType;
  featured?: boolean;
  layout?: 'card' | 'list';
}

const LocationCard = ({ location, featured = false, layout = 'card' }: LocationCardProps) => {
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

  if (layout === 'list') {
    return (
      <div className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 group ${featured ? 'border-l-4 border-senior-blue' : ''}`}>
        <Link to={`/${location.id}`} className="block">
          <div className="flex flex-col md:flex-row">
            <div className="relative overflow-hidden md:w-80 h-48 md:h-auto">
              <img 
                src={location.images[0]} 
                alt={location.name} 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <button 
                onClick={toggleFavorite}
                className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white hover:scale-110 transition-all duration-300"
                aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
              >
                <Heart 
                  size={18} 
                  className={isFavorited ? "fill-senior-blue text-senior-blue" : "text-gray-400"} 
                />
              </button>
              
              {featured && (
                <div className="absolute top-4 left-4 bg-senior-blue text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg">
                  Featured
                </div>
              )}
            </div>
            
            <div className="flex-1 p-6 space-y-4">
              <div className="flex items-start justify-between">
                <h3 className="text-2xl font-bold text-senior-slate mb-2 group-hover:text-senior-blue transition-colors duration-300">
                  {location.name}
                </h3>
                <div className="flex items-center text-amber-500 ml-4 bg-amber-50 px-3 py-2 rounded-lg">
                  <Star size={16} className="fill-amber-500" />
                  <span className="ml-1 text-sm font-medium">{location.rating}</span>
                </div>
              </div>
              
              <div className="flex items-center text-gray-500">
                <MapPin size={16} className="mr-2 flex-shrink-0 text-senior-blue" />
                <span className="text-base">{location.city}, CA {location.zip}</span>
              </div>
              
              <p className="text-gray-600 leading-relaxed text-base">{location.shortDescription}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {location.services.slice(0, 3).map((service, index) => (
                  <span key={index} className="bg-senior-light text-senior-blue px-3 py-1 rounded-full text-sm font-medium">
                    {service}
                  </span>
                ))}
                {location.services.length > 3 && (
                  <span className="text-gray-500 text-sm">+{location.services.length - 3} more</span>
                )}
              </div>
              
              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <div className="flex items-center text-senior-slate">
                  <div className="bg-senior-light p-2 rounded-lg mr-3">
                    <DollarSign size={18} className="text-senior-blue" />
                  </div>
                  <div>
                    <span className="font-bold text-xl">{formatPrice(location.pricing.starting)}+</span>
                    <span className="text-sm text-gray-500 block">/ month</span>
                  </div>
                </div>
                <div className="flex items-center text-senior-slate">
                  <div className="bg-senior-light p-2 rounded-lg mr-3">
                    <Users size={18} className="text-senior-blue" />
                  </div>
                  <span className="text-base font-medium">{location.services.length} services</span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  }

  // Default card layout
  return (
    <div className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group ${featured ? 'border-l-4 border-senior-blue' : ''}`}>
      <Link to={`/${location.id}`} className="block">
        <div className="relative overflow-hidden">
          <img 
            src={location.images[0]} 
            alt={location.name} 
            className="w-full h-56 object-cover transform group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          <button 
            onClick={toggleFavorite}
            className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white hover:scale-110 transition-all duration-300"
            aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart 
              size={18} 
              className={isFavorited ? "fill-senior-blue text-senior-blue" : "text-gray-400"} 
            />
          </button>
          
          {featured && (
            <div className="absolute top-4 left-4 bg-senior-blue text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg">
              Featured
            </div>
          )}
        </div>
        
        <div className="p-6 space-y-4">
          <div className="flex items-start justify-between">
            <h3 className="text-xl font-bold text-senior-slate mb-2 line-clamp-2 group-hover:text-senior-blue transition-colors duration-300">
              {location.name}
            </h3>
            <div className="flex items-center text-amber-500 ml-2 bg-amber-50 px-2 py-1 rounded-lg">
              <Star size={14} className="fill-amber-500" />
              <span className="ml-1 text-sm font-medium">{location.rating}</span>
            </div>
          </div>
          
          <div className="flex items-center text-gray-500">
            <MapPin size={16} className="mr-2 flex-shrink-0 text-senior-blue" />
            <span className="text-sm">{location.city}, CA {location.zip}</span>
          </div>
          
          <p className="text-gray-600 line-clamp-2 leading-relaxed">{location.shortDescription}</p>
          
          <div className="flex justify-between items-center pt-4 border-t border-gray-100">
            <div className="flex items-center text-senior-slate">
              <div className="bg-senior-light p-2 rounded-lg mr-2">
                <DollarSign size={16} className="text-senior-blue" />
              </div>
              <div>
                <span className="font-bold text-lg">{formatPrice(location.pricing.starting)}+</span>
                <span className="text-xs text-gray-500 block">/ month</span>
              </div>
            </div>
            <div className="flex items-center text-senior-slate">
              <div className="bg-senior-light p-2 rounded-lg mr-2">
                <Users size={16} className="text-senior-blue" />
              </div>
              <span className="text-sm font-medium">{location.services.length} services</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default LocationCard;
