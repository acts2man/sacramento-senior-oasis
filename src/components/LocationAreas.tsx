import { Link } from 'react-router-dom';
import { MapPin, ChevronRight, Star, Brain } from 'lucide-react';

const LocationAreas = () => {
  const areas = [
    {
      name: 'Carmichael',
      description: 'Explore senior living options in this established, family-friendly community with excellent medical facilities nearby.',
      searchQuery: 'carmichael',
      highlights: ['Family-friendly community', 'Close to medical facilities', 'Established neighborhoods'],
      count: 12
    },
    {
      name: 'Elk Grove',
      description: 'Discover modern senior communities in one of Sacramento\'s fastest-growing areas.',
      searchQuery: 'elk grove',
      highlights: ['Modern facilities', 'Active senior community', 'Great dining options'],
      count: 15
    },
    {
      name: 'Midtown Sacramento',
      description: 'Find urban senior living with walkable access to cultural attractions and city amenities.',
      searchQuery: 'midtown',
      highlights: ['Urban lifestyle', 'Cultural attractions', 'Public transportation'],
      count: 8
    },
    {
      name: 'Natomas',
      description: 'Browse newer senior communities featuring resort-style amenities and modern care facilities.',
      searchQuery: 'natomas',
      highlights: ['Resort-style amenities', 'New developments', 'Family-oriented area'],
      count: 6
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-senior-light via-white to-senior-light/50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-10 right-10 w-80 h-80 bg-senior-blue/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-senior-blue/5 rounded-full blur-3xl"></div>
      
      <div className="container-custom relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-senior-slate mb-6">
            Popular Sacramento Areas
            <span className="block text-senior-blue">for Senior Living</span>
          </h2>
          <div className="w-24 h-1 bg-senior-blue rounded-full mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Explore senior communities across Sacramento's most sought-after neighborhoods. 
            Each area offers unique advantages for seniors and their families.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {areas.map((area, index) => (
            <div 
              key={area.name} 
              className="group bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 animate-fade-in relative overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-senior-blue/5 to-senior-blue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="bg-senior-light group-hover:bg-senior-blue rounded-full p-3 transition-all duration-500">
                    <MapPin className="text-senior-blue group-hover:text-white transition-colors duration-500" size={24} />
                  </div>
                  <span className="bg-senior-blue/10 group-hover:bg-senior-blue group-hover:text-white text-senior-blue px-3 py-1 rounded-full text-sm font-semibold transition-all duration-500">
                    {area.count} homes
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-senior-slate mb-4 group-hover:text-senior-blue transition-colors duration-300">
                  {area.name}
                </h3>
                
                <p className="text-gray-600 mb-6 text-sm leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  {area.description}
                </p>
                
                <ul className="text-sm text-gray-600 mb-8 space-y-2">
                  {area.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-center group-hover:text-gray-700 transition-colors duration-300">
                      <Star size={14} className="text-senior-blue mr-2 flex-shrink-0" />
                      {highlight}
                    </li>
                  ))}
                </ul>
                
                <Link 
                  to={`/locations?search=${encodeURIComponent(area.searchQuery)}`}
                  className="inline-flex items-center text-senior-blue hover:text-senior-blue/80 font-medium transition-all duration-300 group-hover:font-semibold"
                >
                  Browse {area.name} Communities
                  <ChevronRight size={16} className="ml-1 transform group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
              
              {/* Animated border */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-senior-blue/20 transition-all duration-500"></div>
            </div>
          ))}
        </div>

        <div className="text-center animate-fade-in" style={{ animationDelay: '600ms' }}>
          <div className="bg-white rounded-2xl shadow-xl p-12 max-w-4xl mx-auto relative overflow-hidden group hover:shadow-2xl transition-all duration-500">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-senior-blue/5 to-senior-blue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10">
              <div className="bg-senior-light rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-8 group-hover:bg-senior-blue transition-all duration-500">
                <Brain size={32} className="text-senior-blue group-hover:text-white transition-colors duration-500" />
              </div>
              
              <h3 className="text-3xl font-bold text-senior-slate mb-6 group-hover:text-senior-blue transition-colors duration-300">
                Looking for Memory Care?
              </h3>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                Memory care communities provide specialized support for residents with Alzheimer's and dementia. 
                These facilities offer secure environments with trained staff and programs designed specifically 
                for memory support needs.
              </p>
              <Link 
                to="/memory-care"
                className="btn-primary inline-flex items-center group transform hover:scale-105 transition-all duration-300"
              >
                Find Memory Care Options
                <ChevronRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationAreas;
