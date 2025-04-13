
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LocationCard from '../components/LocationCard';
import SearchBar from '../components/SearchBar';
import { locations, searchLocations, LocationType } from '../data/locations';
import { Filter, MapPin, SlidersHorizontal, X } from 'lucide-react';

const Locations = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [filteredLocations, setFilteredLocations] = useState<LocationType[]>(locations);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  // Initialize search query from URL if available
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const queryParam = params.get('search');
    if (queryParam) {
      setSearchQuery(queryParam);
      setFilteredLocations(searchLocations(queryParam));
    }
  }, [location.search]);
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setFilteredLocations(searchLocations(query));
    
    // Update URL with search query
    navigate(`/locations?search=${encodeURIComponent(query)}`);
  };
  
  const clearSearch = () => {
    setSearchQuery('');
    setFilteredLocations(locations);
    navigate('/locations');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-gray-50">
        <div className="bg-senior-blue text-white py-8">
          <div className="container-custom">
            <h1 className="text-3xl font-bold mb-4">Senior Living Communities in Sacramento</h1>
            <p className="text-xl text-white/90 mb-6">
              Explore our directory of {locations.length} assisted living communities
            </p>
            
            <div className="relative">
              <SearchBar 
                onSearch={handleSearch} 
                placeholder="Search by community name, city, or zip code..." 
              />
              {searchQuery && (
                <div className="mt-4 flex items-center text-white/90">
                  <span>
                    Showing {filteredLocations.length} results for "{searchQuery}"
                  </span>
                  <button 
                    onClick={clearSearch}
                    className="ml-3 flex items-center text-white hover:text-senior-sand"
                  >
                    <X size={16} className="mr-1" /> Clear
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="container-custom py-8">
          <div className="flex flex-wrap items-center justify-between mb-6">
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl font-bold text-senior-slate">
                {filteredLocations.length} Communities Available
              </h2>
            </div>
            
            <div className="flex space-x-4">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 transition-colors"
              >
                <SlidersHorizontal size={18} className="mr-2" />
                Filters
              </button>
              
              <div className="relative">
                <select 
                  className="appearance-none px-4 py-2 pr-8 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-senior-blue"
                  defaultValue="recommended"
                >
                  <option value="recommended">Recommended</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <Filter size={16} className="text-gray-500" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Filters Panel */}
          {showFilters && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6 animate-fade-in">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-senior-slate">Filter Options</h3>
                <button 
                  onClick={() => setShowFilters(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Care Type</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-senior-blue mr-2" />
                      Assisted Living
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-senior-blue mr-2" />
                      Memory Care
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-senior-blue mr-2" />
                      Independent Living
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-senior-blue mr-2" />
                      Skilled Nursing
                    </label>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Price Range</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-senior-blue mr-2" />
                      Under $3,000
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-senior-blue mr-2" />
                      $3,000 - $4,000
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-senior-blue mr-2" />
                      $4,000 - $5,000
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-senior-blue mr-2" />
                      $5,000+
                    </label>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Amenities</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-senior-blue mr-2" />
                      Pet Friendly
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-senior-blue mr-2" />
                      Fitness Center
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-senior-blue mr-2" />
                      Swimming Pool
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-senior-blue mr-2" />
                      Transportation Services
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-4">
                <button className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 transition-colors">
                  Clear All
                </button>
                <button className="px-4 py-2 bg-senior-blue text-white rounded hover:bg-senior-blue/90 transition-colors">
                  Apply Filters
                </button>
              </div>
            </div>
          )}
          
          {filteredLocations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLocations.map((location) => (
                <LocationCard key={location.id} location={location} />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <MapPin size={32} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-senior-slate mb-2">No Communities Found</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                We couldn't find any communities matching your search criteria. Try adjusting your filters or search terms.
              </p>
              <button 
                onClick={clearSearch}
                className="mt-4 btn-primary"
              >
                View All Communities
              </button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Locations;
