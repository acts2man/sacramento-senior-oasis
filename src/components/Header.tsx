import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Mail, ChevronDown, Facebook, Instagram, Linkedin, LogIn, Phone } from 'lucide-react';
import { BRAND_NAME, DIRECTORY_PHONE, formatPhoneForDisplay, formatPhoneForTel } from '../lib/constants';
import { topCitiesByInventory } from '../lib/cityInventory';
import CommunitiesNavDropdown from './CommunitiesNavDropdown';
import logoAsset from '@/assets/logo-header.png.asset.json';
const logo = logoAsset.url;

const CONTACT_EMAIL = 'care@sacramentoelderlycare.com';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mobileCommunitiesOpen, setMobileCommunitiesOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Top cities for the mobile expandable. Same source as desktop dropdown.
  const mobileCities = topCitiesByInventory(8);

  return (
    <header className="sticky top-0 z-50 shadow-sm">
      {/* Top utility bar */}
      <div className="bg-teal-700 text-white text-sm">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-2 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {DIRECTORY_PHONE && (
              <a
                href={formatPhoneForTel(DIRECTORY_PHONE)}
                className="flex items-center gap-2 font-semibold hover:text-coral-200 transition-colors"
              >
                <Phone size={14} />
                <span className="hidden sm:inline">Speak to an advisor: {formatPhoneForDisplay(DIRECTORY_PHONE)}</span>
                <span className="sm:hidden">{formatPhoneForDisplay(DIRECTORY_PHONE)}</span>
              </a>
            )}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="hidden md:flex items-center gap-2 hover:text-coral-200 transition-colors"
            >
              <Mail size={14} />
              <span>{CONTACT_EMAIL}</span>
            </a>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-coral-200 transition-colors"
            >
              <Facebook size={16} />
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-coral-200 transition-colors"
            >
              <Instagram size={16} />
            </a>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-coral-200 transition-colors"
            >
              <Linkedin size={16} />
            </a>
            <span className="h-4 w-px bg-teal-500/60 mx-1" aria-hidden="true" />
            <Link
              to="/login"
              className="flex items-center gap-1.5 hover:text-coral-200 transition-colors"
              aria-label="Admin login"
            >
              <LogIn size={16} />
              <span className="hidden sm:inline">Login</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-2">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              alt={BRAND_NAME}
              width={1920}
              height={395}
              decoding="async"
              loading="eager"
              className="h-16 md:h-24 w-auto object-contain [image-rendering:auto]"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex flex-1 items-center justify-between ml-6 lg:ml-10">
            <Link to="/" className="text-senior-slate hover:text-senior-blue font-medium transition-colors">
              Home
            </Link>
            <Link to="/about" className="text-senior-slate hover:text-senior-blue font-medium transition-colors">
              About
            </Link>
            <CommunitiesNavDropdown />
            <Link to="/assisted-living" className="text-senior-slate hover:text-senior-blue font-medium transition-colors">
              Assisted Living
            </Link>
            <Link to="/memory-care" className="text-senior-slate hover:text-senior-blue font-medium transition-colors">
              Memory Care
            </Link>
            <Link to="/contact" className="text-senior-slate hover:text-senior-blue font-medium transition-colors">
              Contact
            </Link>
            <Link to="/contact" className="btn-primary flex items-center">
              <Mail size={16} className="mr-2" /> Contact Us
            </Link>
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
          <nav className="md:hidden py-4 px-2 mt-2 bg-white rounded-lg shadow-lg animate-fade-in max-h-[calc(100vh-6rem)] overflow-y-auto overscroll-contain">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-senior-slate hover:text-senior-blue font-medium transition-colors px-2 py-1" onClick={toggleMenu}>
                Home
              </Link>
              <Link to="/about" className="text-senior-slate hover:text-senior-blue font-medium transition-colors px-2 py-1" onClick={toggleMenu}>
                About
              </Link>

              {/* Mobile Communities — expandable group */}
              <div>
                <button
                  type="button"
                  aria-expanded={mobileCommunitiesOpen}
                  aria-controls="mobile-communities-panel"
                  onClick={() => setMobileCommunitiesOpen(o => !o)}
                  className="w-full flex items-center justify-between text-senior-slate hover:text-senior-blue font-medium transition-colors px-2 py-1"
                >
                  Communities
                  <ChevronDown
                    size={18}
                    aria-hidden="true"
                    className={`transition-transform ${mobileCommunitiesOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {mobileCommunitiesOpen && (
                  <div id="mobile-communities-panel" className="mt-2 pl-4 border-l-2 border-teal-100 space-y-3">
                    <Link
                      to="/communities"
                      className="block text-sm text-senior-blue font-semibold hover:underline"
                      onClick={toggleMenu}
                    >
                      Browse all communities →
                    </Link>
                    <div>
                      <p className="text-xs font-semibold tracking-wide text-teal-700 uppercase mt-2 mb-1">
                        By city
                      </p>
                      <ul className="space-y-1.5">
                        {mobileCities.map(c => (
                          <li key={c.slug}>
                            <Link
                              to={`/assisted-living/${c.slug}`}
                              className="text-sm text-senior-slate hover:text-senior-blue"
                              onClick={toggleMenu}
                            >
                              {c.name} <span className="text-xs text-neutral-500">({c.count})</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-semibold tracking-wide text-teal-700 uppercase mt-3 mb-1">
                        By care type
                      </p>
                      <ul className="space-y-1.5">
                        <li>
                          <Link
                            to="/assisted-living/sacramento"
                            className="text-sm text-senior-slate hover:text-senior-blue"
                            onClick={toggleMenu}
                          >
                            Assisted Living
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/memory-care"
                            className="text-sm text-senior-slate hover:text-senior-blue"
                            onClick={toggleMenu}
                          >
                            Memory Care
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/board-and-care-homes/sacramento"
                            className="text-sm text-senior-slate hover:text-senior-blue"
                            onClick={toggleMenu}
                          >
                            Board &amp; Care Homes
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/senior-living/sacramento"
                            className="text-sm text-senior-slate hover:text-senior-blue"
                            onClick={toggleMenu}
                          >
                            Senior Living
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              <Link to="/assisted-living" className="text-senior-slate hover:text-senior-blue font-medium transition-colors px-2 py-1" onClick={toggleMenu}>
                Assisted Living
              </Link>
              <Link to="/memory-care" className="text-senior-slate hover:text-senior-blue font-medium transition-colors px-2 py-1" onClick={toggleMenu}>
                Memory Care
              </Link>
              <Link to="/contact" className="text-senior-slate hover:text-senior-blue font-medium transition-colors px-2 py-1" onClick={toggleMenu}>
                Contact
              </Link>
              <Link to="/contact" className="flex items-center text-senior-blue font-medium px-2 py-1" onClick={toggleMenu}>
                <Mail size={16} className="mr-2" /> Contact Us
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
