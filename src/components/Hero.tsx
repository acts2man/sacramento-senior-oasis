
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
    <div className="relative bg-gradient-to-r from-senior-blue to-senior-teal text-white py-16 md:py-24">
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Find Quality Senior Living in Sacramento
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90">
            Your trusted guide to discovering the right assisted living community for your loved one. 
            Compare options across Sacramento, from memory care to independent living.
          </p>
          <SearchBar onSearch={handleSearch} />
          <div className="mt-6 text-white/80 text-sm">
            Popular searches: Assisted Living, Memory Care, Carmichael, Elk Grove, Natomas
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
