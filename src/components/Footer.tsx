
import { Link } from 'react-router-dom';
import { Mail, MapPin, Facebook, Twitter, Instagram, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-senior-blue text-white pt-12 pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: About */}
          <div>
            <h3 className="text-xl font-bold mb-4">Sacramento Senior Care</h3>
            <p className="text-white/80 mb-4">
              Helping Sacramento seniors and their families find the perfect assisted living communities tailored to their unique needs and preferences.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" aria-label="Facebook" className="hover:text-senior-sand transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" aria-label="Twitter" className="hover:text-senior-sand transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com" aria-label="Instagram" className="hover:text-senior-sand transition-colors">
                <Instagram size={20} />
              </a>
            </div>
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
                <Link to="/" className="text-white/80 hover:text-white transition-colors">Assisted Living</Link>
              </li>
              <li>
                <Link to="/" className="text-white/80 hover:text-white transition-colors">Memory Care</Link>
              </li>
              <li>
                <Link to="/" className="text-white/80 hover:text-white transition-colors">Independent Living</Link>
              </li>
              <li>
                <Link to="/" className="text-white/80 hover:text-white transition-colors">Skilled Nursing</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={20} className="mr-2 flex-shrink-0 mt-1" />
                <span className="text-white/80">1234 Capitol Avenue, Sacramento, CA 95814</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-2 flex-shrink-0" />
                <a href="mailto:info@sacramentoseniorcare.com" className="text-white/80 hover:text-white transition-colors">info@sacramentoseniorcare.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-8 pt-6 text-center text-white/60 text-sm">
          <p className="flex flex-col sm:flex-row justify-center items-center gap-1">
            <span>&copy; {currentYear} Sacramento Senior Care Directory.</span>
            <span className="hidden sm:inline">|</span>
            <span>Made with <Heart size={14} className="inline text-senior-sand mx-1" /> in Sacramento</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
