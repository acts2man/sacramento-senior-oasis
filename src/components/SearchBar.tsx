
import { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchBar = ({ 
  onSearch, 
  placeholder = "Search by community name, city, or zip code...", 
  className = "" 
}: SearchBarProps) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <div className="flex items-center relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full p-4 pr-12 rounded-l-lg border-0 shadow-md text-neutral-900 focus:ring-2 focus:ring-senior-blue focus:outline-none"
          aria-label="Search communities"
        />
        <button
          type="submit"
          className="absolute right-0 h-full px-3 text-white bg-senior-blue rounded-r-lg hover:bg-senior-blue/90 transition-colors"
          aria-label="Search"
        >
          <Search size={24} />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
