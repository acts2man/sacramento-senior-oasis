
import { Link } from 'react-router-dom';
import { MapPin, ChevronRight } from 'lucide-react';

const LocationAreas = () => {
  const areas = [
    {
      name: 'Carmichael',
      description: 'Explore senior living options in this established, family-friendly community with excellent medical facilities nearby.',
      searchQuery: 'carmichael',
      highlights: ['Family-friendly community', 'Close to medical facilities', 'Established neighborhoods']
    },
    {
      name: 'Elk Grove',
      description: 'Discover modern senior communities in one of Sacramento\'s fastest-growing areas.',
      searchQuery: 'elk grove',
      highlights: ['Modern facilities', 'Active senior community', 'Great dining options']
    },
    {
      name: 'Midtown Sacramento',
      description: 'Find urban senior living with walkable access to cultural attractions and city amenities.',
      searchQuery: 'midtown',
      highlights: ['Urban lifestyle', 'Cultural attractions', 'Public transportation']
    },
    {
      name: 'Natomas',
      description: 'Browse newer senior communities featuring resort-style amenities and modern care facilities.',
      searchQuery: 'natomas',
      highlights: ['Resort-style amenities', 'New developments', 'Family-oriented area']
    }
  ];

  return (
    <section className="py-12 bg-senior-light">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-senior-slate mb-4">
            Popular Sacramento Areas for Senior Living
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore senior communities across Sacramento's most sought-after neighborhoods. 
            Each area offers unique advantages for seniors and their families.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {areas.map((area) => (
            <div key={area.name} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start mb-4">
                <MapPin className="text-senior-blue mt-1 mr-3 flex-shrink-0" size={20} />
                <h3 className="text-xl font-bold text-senior-slate">{area.name}</h3>
              </div>
              
              <p className="text-gray-600 mb-4 text-sm">
                {area.description}
              </p>
              
              <ul className="text-sm text-gray-600 mb-6 space-y-1">
                {area.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-senior-blue rounded-full mr-2"></span>
                    {highlight}
                  </li>
                ))}
              </ul>
              
              <Link 
                to={`/locations?search=${encodeURIComponent(area.searchQuery)}`}
                className="inline-flex items-center text-senior-blue hover:text-senior-teal font-medium transition-colors"
              >
                Browse {area.name} Communities
                <ChevronRight size={16} className="ml-1" />
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-white rounded-lg shadow-md p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-senior-slate mb-4">
              Looking for Memory Care?
            </h3>
            <p className="text-gray-600 mb-6">
              Memory care communities provide specialized support for residents with Alzheimer's and dementia. 
              These facilities offer secure environments with trained staff and programs designed specifically 
              for memory support needs.
            </p>
            <Link 
              to="/locations?search=memory+care"
              className="btn-primary inline-flex items-center"
            >
              Find Memory Care Options
              <ChevronRight size={16} className="ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationAreas;
