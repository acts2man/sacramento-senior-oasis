import { Link } from 'react-router-dom';
import { Mail, MapPin, Heart, Phone } from 'lucide-react';
import { BRAND_NAME, DIRECTORY_PHONE, formatPhoneForDisplay, formatPhoneForTel } from '../lib/constants';
import { topCitiesByInventory } from '../lib/cityInventory';
import logoAsset from '@/assets/logo-footer.png.asset.json';
const logo = logoAsset.url;

const Footer = () => {
  const currentYear = new Date().getFullYear();
  // Top populated cities — derived from data so the order and counts stay
  // honest as inventory shifts. Footer links are one of the highest-value
  // internal-linking surfaces, so we link directly to the keyword-rich
  // /assisted-living/{slug} pages rather than search-style /locations URLs.
  const popularCities = topCitiesByInventory(10);

  return (
    <footer className="bg-teal-800 text-white pt-12 pb-6">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Column 1: About */}
          <div className="lg:col-span-1">
            <img src={logo} alt={BRAND_NAME} className="h-auto max-h-28 w-auto max-w-full object-contain mb-3" />
            <h3 className="text-xl font-bold mb-4">{BRAND_NAME}</h3>
            <p className="text-white/80 mb-4">
              Helping Sacramento seniors and their families find the perfect assisted living communities tailored to their unique needs and preferences.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-white/80 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/communities" className="text-white/80 hover:text-white transition-colors">Browse Communities</Link>
              </li>
              <li>
                <Link to="/locations" className="text-white/80 hover:text-white transition-colors">Full Directory</Link>
              </li>
              <li>
                <Link to="/about" className="text-white/80 hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/80 hover:text-white transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Care Types */}
          <div>
            <h3 className="text-xl font-bold mb-4">Care Types</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/assisted-living" className="text-white/80 hover:text-white transition-colors">Assisted Living</Link>
              </li>
              <li>
                <Link to="/memory-care" className="text-white/80 hover:text-white transition-colors">Memory Care</Link>
              </li>
              <li>
                <Link to="/board-and-care-homes/sacramento" className="text-white/80 hover:text-white transition-colors">Board &amp; Care Homes</Link>
              </li>
              <li>
                <Link to="/senior-living/sacramento" className="text-white/80 hover:text-white transition-colors">Senior Living</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Popular Cities */}
          <div>
            <h3 className="text-xl font-bold mb-4">Popular Cities</h3>
            <ul className="space-y-2">
              {popularCities.map(c => (
                <li key={c.slug}>
                  <Link
                    to={`/assisted-living/${c.slug}`}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link
                  to="/communities"
                  className="text-white/90 hover:text-white font-medium transition-colors"
                >
                  All cities →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={20} className="mr-2 flex-shrink-0 mt-1" />
                <span className="text-white/80">Serving the Greater Sacramento Metro Area</span>
              </li>
              {DIRECTORY_PHONE && (
                <li className="flex items-center">
                  <Phone size={20} className="mr-2 flex-shrink-0" />
                  <a
                    href={formatPhoneForTel(DIRECTORY_PHONE)}
                    className="text-white font-semibold hover:text-coral-200 transition-colors"
                  >
                    {formatPhoneForDisplay(DIRECTORY_PHONE)}
                  </a>
                </li>
              )}
              <li className="flex items-center">
                <Mail size={20} className="mr-2 flex-shrink-0" />
                <a href="mailto:care@sacramentoelderlycare.com" className="text-white/80 hover:text-white transition-colors">care@sacramentoelderlycare.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-8 pt-6 text-center text-white/60 text-sm">
          <p className="flex flex-col sm:flex-row justify-center items-center gap-1">
            <span>&copy; {currentYear} {BRAND_NAME}.</span>
            <span className="hidden sm:inline">|</span>
            <span>Made with <Heart size={14} className="inline text-senior-sand mx-1" /> in Sacramento</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
