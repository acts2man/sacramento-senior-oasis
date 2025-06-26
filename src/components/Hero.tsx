
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';

const Hero = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    navigate(`/locations?search=${encodeURIComponent(query)}`);
  };

  return (
    <div 
      className="relative text-white py-24 md:py-32 bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{
        backgroundImage: `url('/lovable-uploads/6d4216d1-143f-4717-88a9-8d4297366ca8.png')`
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-senior-blue/40"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-senior-blue/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-senior-blue/10 rounded-full blur-xl animate-pulse delay-1000"></div>
      </div>

      {/* Floating family photos */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-8 w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white/20 backdrop-blur-sm animate-pulse opacity-30 hover:opacity-50 transition-opacity duration-500">
          <img 
            src="/lovable-uploads/b28a71c0-2565-452f-80d2-878420b86d78.png" 
            alt="Grandmother with grandchildren"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute bottom-1/4 right-8 w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden border-4 border-white/20 backdrop-blur-sm animate-pulse opacity-30 hover:opacity-50 transition-opacity duration-500" style={{ animationDelay: '2s' }}>
          <img 
            src="/lovable-uploads/51175d6d-e88c-4566-bd9c-58edb8bd9318.png" 
            alt="Happy seniors together"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight">
              Find Quality Senior Living 
              <span className="block bg-gradient-to-r from-senior-blue to-white bg-clip-text text-transparent">
                in Sacramento
              </span>
            </h1>
          </div>
          
          <div className="animate-fade-in delay-300">
            <p className="text-xl md:text-2xl mb-10 text-white/90 leading-relaxed max-w-4xl mx-auto">
              Your trusted guide to discovering the right assisted living community for your loved one. 
              Compare options across Sacramento, from memory care to independent living.
            </p>
          </div>
          
          <div className="animate-fade-in delay-500">
            <div className="max-w-2xl mx-auto transform hover:scale-105 transition-all duration-300">
              <SearchBar onSearch={handleSearch} />
            </div>
          </div>
          
          <div className="mt-8 text-white/70 text-sm animate-fade-in delay-700">
            <div className="flex flex-wrap justify-center gap-4">
              {['Assisted Living', 'Memory Care', 'Carmichael', 'Elk Grove', 'Natomas'].map((term, index) => (
                <span 
                  key={term}
                  className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300 cursor-pointer"
                  style={{ animationDelay: `${800 + index * 100}ms` }}
                >
                  {term}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
