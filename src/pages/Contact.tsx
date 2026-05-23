
import Header from '../components/Header';
import Footer from '../components/Footer';
import InquiryForm from '../components/InquiryForm';
import SEO from '../components/SEO';
import { generatePageSEO } from '../utils/seoUtils';
import { SITE_URL } from '../lib/constants';
import { Mail, MapPin, Clock } from 'lucide-react';
import JsonLd from '../components/JsonLd';
import {
  buildBreadcrumbSchema,
  buildOrganizationWithContactSchema,
} from '../lib/schema';

const Contact = () => {
  const seoData = generatePageSEO('contact');

  return (
    <div className="flex flex-col min-h-screen">
      <SEO
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
        canonical={`${SITE_URL}/contact`}
      />
      <JsonLd
        data={buildOrganizationWithContactSchema('care@sacramentoelderlycare.com')}
      />
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Contact', url: '/contact' },
        ])}
      />

      <Header />
      
      <main className="flex-grow bg-neutral-50">
        <div className="bg-senior-blue text-white py-12">
          <div className="container-custom">
            <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl text-white/90">
              We're here to help you find the right senior living community in Sacramento. 
              Contact us with any questions or to schedule a consultation.
            </p>
          </div>
        </div>
        
        {/* Hero Image Section */}
        <div className="container-custom py-8">
          <div className="rounded-lg overflow-hidden shadow-lg mb-8">
            <img 
              src="/lovable-uploads/6cf1acc2-8db0-43ce-9da9-3c12fec8389a.png" 
              alt="Compassionate senior care - caregiver assisting elderly gentleman in wheelchair in a beautiful garden setting"
              className="w-full h-64 md:h-80 object-cover object-center"
              style={{ objectPosition: "center 20%" }}
            />
          </div>
        </div>
        
        <div className="container-custom pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div>
              <InquiryForm />
            </div>
            
            {/* Contact Information */}
            <div>
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-senior-slate mb-6">Contact Information</h2>
                
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-senior-slate mb-2">Address</h3>
                  <div className="flex items-center text-neutral-600">
                    <MapPin size={20} className="mr-2 text-senior-blue" />
                    <span>1234 Senior Care Lane, Sacramento, CA 95814</span>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-senior-slate mb-2">Email</h3>
                  <div className="flex items-center text-neutral-600">
                    <Mail size={20} className="mr-2 text-senior-blue" />
                    <a href="mailto:care@sacramentoelderlycare.com" className="hover:text-senior-blue">care@sacramentoelderlycare.com</a>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold text-senior-slate mb-2">Hours</h3>
                  <div className="flex items-center text-neutral-600">
                    <Clock size={20} className="mr-2 text-senior-blue" />
                    <span>Monday - Friday: 9am - 5pm</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
