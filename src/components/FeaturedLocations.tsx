
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import LocationCard from './LocationCard';
import { getFeaturedLocations, LocationType } from '../data/locations';

const FeaturedLocations = () => {
  const featuredLocations: LocationType[] = getFeaturedLocations();

  return (
    <section className="py-12 bg-senior-light">
      <div className="container-custom">
        <div className="flex flex-wrap items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-senior-slate">Featured Communities</h2>
            <p className="text-gray-600 mt-2">Top-rated senior living options in Sacramento</p>
          </div>
          <Link to="/locations" className="flex items-center font-medium text-senior-blue hover:text-senior-teal transition-colors mt-4 sm:mt-0">
            View All Communities
            <ChevronRight size={18} className="ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredLocations.map((location) => (
            <LocationCard key={location.id} location={location} featured={true} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedLocations;
