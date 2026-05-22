
import { Link } from 'react-router-dom';
import { Mail, MapPin, Heart } from 'lucide-react';
import { BRAND_NAME } from '../lib/constants';
import logo from '@/assets/logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-senior-blue text-white pt-12 pb-6">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: About */}
          <div>
            <img src={logo} alt={BRAND_NAME} className="h-auto max-h-28 w-auto max-w-full object-contain mb-3 bg-white rounded p-2" />
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
                <Link to="/locations" className="text-white/80 hover:text-white transition-colors">Communities</Link>
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
                <Link to="/locations" className="text-white/80 hover:text-white transition-colors">All Communities</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={20} className="mr-2 flex-shrink-0 mt-1" />
                <span className="text-white/80">Serving the Greater Sacramento Metro Area</span>
              </li>
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
