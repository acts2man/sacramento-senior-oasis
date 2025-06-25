
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import FeaturedLocations from '../components/FeaturedLocations';
import CareTypes from '../components/CareTypes';
import ContactForm from '../components/ContactForm';
import SEOContent from '../components/SEOContent';
import LocationAreas from '../components/LocationAreas';
import { Phone, Award, Heart, Users } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  
  const handleGetStarted = () => {
    navigate('/locations');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero />
        
        {/* SEO Content Section */}
        <SEOContent />
        
        {/* Location Areas */}
        <LocationAreas />
        
        {/* Featured Communities */}
        <FeaturedLocations />
        
        {/* Care Types */}
        <CareTypes />
        
        {/* How It Works */}
        <section className="py-12 bg-white">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-senior-slate">How It Works</h2>
              <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
                Finding the right senior living community is easy with our simple process. Whether you need 
                assisted living Sacramento cost information or memory care Sacramento options, we guide you every step.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-senior-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-senior-blue">1</span>
                </div>
                <h3 className="text-xl font-bold text-senior-slate mb-2">Search Communities</h3>
                <p className="text-gray-600">
                  Browse our directory of assisted living communities in Sacramento, including specialized 
                  memory care Sacramento CA facilities and retirement homes.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-senior-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-senior-blue">2</span>
                </div>
                <h3 className="text-xl font-bold text-senior-slate mb-2">Schedule Tours</h3>
                <p className="text-gray-600">
                  Contact communities directly or let us arrange tours for you. Compare senior living in Sacramento 
                  options including board and care homes Sacramento facilities.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-senior-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-senior-blue">3</span>
                </div>
                <h3 className="text-xl font-bold text-senior-slate mb-2">Make an Informed Decision</h3>
                <p className="text-gray-600">
                  Choose the perfect community based on your needs and preferences. Find the best 
                  retirement communities in Sacramento with transparent pricing and reviews.
                </p>
              </div>
            </div>
            
            <div className="mt-10 text-center">
              <button 
                onClick={handleGetStarted}
                className="btn-primary text-lg px-6 py-3"
              >
                Find Senior Living Options Today
              </button>
            </div>
          </div>
        </section>
        
        {/* Why Choose Us */}
        <section className="py-12 bg-senior-light">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-senior-slate">Why Choose Sacramento Senior Care</h2>
              <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
                We're dedicated to helping seniors find the perfect community to call home. From assisted living 
                Sacramento facilities to specialized nursing homes in Sacramento, we provide comprehensive support.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <Award className="h-12 w-12 text-senior-teal mb-4" />
                <h3 className="text-xl font-bold text-senior-slate mb-2">Quality Communities</h3>
                <p className="text-gray-600">
                  We only list communities that meet our high standards of care and comfort, including 
                  top-rated assisted living facilities Sacramento has to offer.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <Phone className="h-12 w-12 text-senior-teal mb-4" />
                <h3 className="text-xl font-bold text-senior-slate mb-2">Expert Guidance</h3>
                <p className="text-gray-600">
                  Our team provides personalized assistance throughout your search for senior housing Sacramento 
                  options, from memory care to independent living.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <Heart className="h-12 w-12 text-senior-teal mb-4" />
                <h3 className="text-xl font-bold text-senior-slate mb-2">Compassionate Service</h3>
                <p className="text-gray-600">
                  We understand the emotional journey of finding long term care facilities Sacramento 
                  families trust and provide caring support throughout the process.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <Users className="h-12 w-12 text-senior-teal mb-4" />
                <h3 className="text-xl font-bold text-senior-slate mb-2">Local Expertise</h3>
                <p className="text-gray-600">
                  Our deep knowledge of Sacramento communities ensures the right match, whether you need 
                  senior living in Elk Grove or assisted living in Carmichael.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Contact Section */}
        <section className="py-12 bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold text-senior-slate mb-4">
                  Need Help Finding Senior Living Options in Sacramento?
                </h2>
                <p className="text-gray-600 mb-6">
                  Our experts are ready to assist you in finding the perfect community for your loved one. Whether you have 
                  questions about assisted living Sacramento cost, memory care Sacramento facilities, or nursing homes in Sacramento, 
                  we're here to help you navigate your options.
                </p>
                <div className="bg-senior-light p-4 rounded-lg mb-6">
                  <div className="flex items-start">
                    <Phone className="text-senior-blue mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-senior-slate">Speak to a Senior Living Advisor</h3>
                      <p className="text-gray-600 mb-2">Available Monday-Friday, 8am-5pm</p>
                      <a href="tel:916-555-9000" className="text-senior-blue font-bold text-lg hover:text-senior-teal transition-colors">
                        (916) 555-9000
                      </a>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">
                  Finding the right senior living community is an important decision. Our free service helps you navigate 
                  options from 55 and over communities in Natomas to specialized board and care homes Sacramento offers.
                </p>
              </div>
              
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
