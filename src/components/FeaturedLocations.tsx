
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import LocationCard from './LocationCard';
import { getFeaturedLocations, LocationType } from '../data/locations';

const FeaturedLocations = () => {
  const featuredLocations: LocationType[] = getFeaturedLocations();

  return (
    <section className="py-20 bg-gradient-to-br from-senior-light to-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-senior-teal/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-senior-blue/5 rounded-full blur-3xl"></div>
      
      <div className="container-custom relative z-10">
        <div className="flex flex-wrap items-center justify-between mb-12 animate-fade-in">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-senior-slate mb-4">
              Featured 
              <span className="block text-senior-blue">Communities</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-senior-blue to-senior-teal rounded-full mb-4"></div>
            <p className="text-xl text-gray-600">Top-rated senior living options in Sacramento</p>
          </div>
          <Link 
            to="/locations" 
            className="flex items-center font-medium text-senior-blue hover:text-senior-teal transition-all duration-300 mt-4 sm:mt-0 group px-6 py-3 bg-white rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1"
          >
            View All Communities
            <ChevronRight size={18} className="ml-1 transform group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredLocations.map((location, index) => (
            <div 
              key={location.id} 
              className="animate-fade-in hover-scale"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <LocationCard location={location} featured={true} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedLocations;
