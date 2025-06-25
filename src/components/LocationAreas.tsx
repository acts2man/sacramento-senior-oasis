
import { Link } from 'react-router-dom';
import { MapPin, ChevronRight } from 'lucide-react';

const LocationAreas = () => {
  const areas = [
    {
      name: 'Carmichael',
      description: 'Discover assisted living in Carmichael with our comprehensive directory of senior care options.',
      searchQuery: 'carmichael',
      highlights: ['Family-friendly community', 'Close to medical facilities', 'Established neighborhoods']
    },
    {
      name: 'Elk Grove',
      description: 'Explore Elk Grove senior living communities offering exceptional care and amenities.',
      searchQuery: 'elk grove',
      highlights: ['Modern facilities', 'Active senior community', 'Great dining options']
    },
    {
      name: 'Midtown Sacramento',
      description: 'Find top-rated assisted living in Midtown Sacramento with urban convenience and charm.',
      searchQuery: 'midtown',
      highlights: ['Urban lifestyle', 'Cultural attractions', 'Public transportation']
    },
    {
      name: 'Natomas',
      description: 'Browse 55+ communities in Natomas featuring resort-style living and comprehensive care.',
      searchQuery: 'natomas',
      highlights: ['Resort-style amenities', 'New developments', 'Family-oriented area']
    }
  ];

  return (
    <section className="py-12 bg-senior-light">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-senior-slate mb-4">
            Senior Living Communities by Sacramento Area
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore assisted living Sacramento options across popular neighborhoods. 
            From memory care Sacramento CA to retirement communities, find the perfect location for your needs.
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
              Looking for Memory Care Sacramento?
            </h3>
            <p className="text-gray-600 mb-6">
              Specialized memory care facilities in Sacramento provide expert care for residents with Alzheimer's 
              and dementia. Our directory includes board and care homes Sacramento and long-term care facilities 
              with memory support programs.
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
