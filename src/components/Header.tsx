
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/0bb5268e-089d-4f35-8188-42e0e75743d7.png" 
              alt="Sacramento Senior Care" 
              className="h-12 md:h-16 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-senior-slate hover:text-senior-blue font-medium transition-colors">
              Home
            </Link>
            <Link to="/locations" className="text-senior-slate hover:text-senior-blue font-medium transition-colors">
              Communities
            </Link>
            <Link to="/memory-care" className="text-senior-slate hover:text-senior-blue font-medium transition-colors">
              Memory Care
            </Link>
            <Link to="/about" className="text-senior-slate hover:text-senior-blue font-medium transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-senior-slate hover:text-senior-blue font-medium transition-colors">
              Contact
            </Link>
            <a href="tel:916-555-9000" className="btn-primary flex items-center">
              <Phone size={16} className="mr-2" /> (916) 555-9000
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMenu} 
            className="md:hidden text-senior-slate hover:text-senior-blue"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 px-2 mt-2 bg-white rounded-lg shadow-lg animate-fade-in">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-senior-slate hover:text-senior-blue font-medium transition-colors px-2 py-1" onClick={toggleMenu}>
                Home
              </Link>
              <Link to="/locations" className="text-senior-slate hover:text-senior-blue font-medium transition-colors px-2 py-1" onClick={toggleMenu}>
                Communities
              </Link>
              <Link to="/memory-care" className="text-senior-slate hover:text-senior-blue font-medium transition-colors px-2 py-1" onClick={toggleMenu}>
                Memory Care
              </Link>
              <Link to="/about" className="text-senior-slate hover:text-senior-blue font-medium transition-colors px-2 py-1" onClick={toggleMenu}>
                About
              </Link>
              <Link to="/contact" className="text-senior-slate hover:text-senior-blue font-medium transition-colors px-2 py-1" onClick={toggleMenu}>
                Contact
              </Link>
              <a href="tel:916-555-9000" className="flex items-center text-senior-blue font-medium px-2 py-1" onClick={toggleMenu}>
                <Phone size={16} className="mr-2" /> (916) 555-9000
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
