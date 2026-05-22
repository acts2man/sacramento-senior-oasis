
import { useState } from 'react';
import { User, Mail, MapPin, Heart, Clock, ChevronRight } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import emailjs from '@emailjs/browser';

const ContactSection = () => {
  // This component is now simplified and only contains contact information
  // The form has been moved to CareRecommendationsSection component
  
  return (
    <section className="py-20 bg-gradient-to-br from-senior-blue/5 via-white to-senior-light/30 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-senior-blue/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-senior-blue/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }}></div>
      
      <div className="container-custom relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-senior-slate mb-6">
            Contact Our
            <span className="block text-senior-blue">Senior Care Experts</span>
          </h2>
          <div className="w-24 h-1 bg-senior-blue rounded-full mx-auto mb-6"></div>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            Ready to find the perfect senior living community? Our local experts are here to help guide you through your options.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
            <div className="bg-white rounded-2xl shadow-xl p-8 relative overflow-hidden group hover:shadow-2xl transition-all duration-500">
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-senior-slate mb-6">
                  Get in Touch
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-center p-4 bg-senior-light rounded-lg group-hover:bg-senior-blue/10 transition-all duration-500">
                    <Mail className="text-senior-blue mr-4" size={24} />
                    <div>
                      <h4 className="font-semibold text-senior-slate">Contact Us</h4>
                      <a href="/contact" className="text-neutral-600 hover:text-senior-blue transition-colors">
                        Send a message via our contact form
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-4 bg-senior-light rounded-lg group-hover:bg-senior-blue/10 transition-all duration-500">
                    <Mail className="text-senior-blue mr-4" size={24} />
                    <div>
                      <h4 className="font-semibold text-senior-slate">Email Us</h4>
                      <a href="mailto:care@sacramentoelderlycare.com" className="text-neutral-600 hover:text-senior-blue transition-colors">
                        care@sacramentoelderlycare.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-4 bg-senior-light rounded-lg group-hover:bg-senior-blue/10 transition-all duration-500">
                    <MapPin className="text-senior-blue mr-4" size={24} />
                    <div>
                      <h4 className="font-semibold text-senior-slate">Service Area</h4>
                      <p className="text-neutral-600">Sacramento & Surrounding Areas</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-4 bg-senior-light rounded-lg group-hover:bg-senior-blue/10 transition-all duration-500">
                    <Clock className="text-senior-blue mr-4" size={24} />
                    <div>
                      <h4 className="font-semibold text-senior-slate">Hours</h4>
                      <p className="text-neutral-600">Mon-Fri: 8AM-8PM PST</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="animate-fade-in" style={{ animationDelay: '400ms' }}>
            <div className="bg-gradient-to-br from-senior-blue to-senior-blue/90 rounded-2xl shadow-xl p-8 text-white relative overflow-hidden group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              {/* Background decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
              
              <div className="relative z-10">
                <div className="text-center mb-8">
                  <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 group-hover:bg-white/30 transition-all duration-500 group-hover:scale-110">
                    <Heart size={28} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">
                    Why Choose Our
                    <span className="block">Expert Guidance?</span>
                  </h3>
                  <div className="w-16 h-1 bg-white/30 rounded-full mx-auto mb-6"></div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center">
                    <Heart size={16} className="mr-3 text-white/80" />
                    <span className="text-sm">Personalized recommendations</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin size={16} className="mr-3 text-white/80" />
                    <span className="text-sm">Local Sacramento expertise</span>
                  </div>
                  <div className="flex items-center">
                    <Mail size={16} className="mr-3 text-white/80" />
                    <span className="text-sm">Contact via form submission</span>
                  </div>
                  <div className="flex items-center">
                    <Clock size={16} className="mr-3 text-white/80" />
                    <span className="text-sm">Quick response time</span>
                  </div>
                </div>

                <a
                  href="/contact"
                  className="w-full py-4 px-6 bg-white text-senior-blue font-semibold rounded-lg hover:bg-white/90 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg flex items-center justify-center group/btn mb-6"
                >
                  <Mail size={20} className="mr-2 group-hover/btn:animate-pulse" />
                  Contact Us - Free Consultation
                </a>

                <div className="bg-white/10 rounded-xl p-6 group-hover:bg-white/20 transition-all duration-500">
                  <p className="text-sm leading-relaxed opacity-90">
                    <strong className="text-white">Ready to get started?</strong> Our experienced team is here to help you find the perfect senior living community that meets your loved one's unique needs and preferences.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
