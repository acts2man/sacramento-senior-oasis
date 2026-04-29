import { useState } from 'react';
import { Phone, User, Mail, MapPin, Heart, Clock, ChevronRight } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import emailjs from '@emailjs/browser';

const CareRecommendationsSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    careType: '',
    urgency: '',
    budget: '',
    additionalInfo: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // EmailJS configuration with your actual credentials
      const serviceId = 'service_qklbs5m';
      const templateId = 'template_3f1h5fw';
      const publicKey = 'VHqdZf6et7WQV3YAA';

      // Template parameters mapped to form fields
      // Use these variable names in your EmailJS template:
      const templateParams = {
        // Basic contact information
        client_name: formData.name,
        client_email: formData.email,
        client_phone: formData.phone,
        
        // Care requirements
        preferred_location: formData.location || 'Not specified',
        care_type: formData.careType || 'Not specified',
        timeline: formData.urgency || 'Not specified',
        budget_range: formData.budget || 'Not specified',
        
        // Additional details
        additional_notes: formData.additionalInfo || 'No additional information provided',
        
        // Metadata
        submission_date: new Date().toLocaleDateString(),
        submission_time: new Date().toLocaleTimeString(),
        
        // Your business email (where you want to receive inquiries)
        to_email: 'your-business-email@example.com' // Replace with your email
      };

      console.log('Sending care inquiry with EmailJS:', templateParams);

      // Send email via EmailJS
      const response = await emailjs.send(serviceId, templateId, templateParams, publicKey);
      
      console.log('EmailJS response:', response);
      
      toast({
        title: "Care Inquiry Submitted Successfully!",
        description: "Thank you for your interest! A senior care advisor will contact you within 24 hours to discuss your needs.",
      });
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        location: '',
        careType: '',
        urgency: '',
        budget: '',
        additionalInfo: ''
      });
      
    } catch (error) {
      console.error('EmailJS Error:', error);
      toast({
        title: "Submission Error",
        description: "We couldn't submit your information right now. Please try again or call us directly at (916) 538-9563.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-senior-blue/5 via-white to-senior-light/30 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-senior-blue/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-senior-blue/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }}></div>
      
      <div className="container-custom relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-senior-slate mb-6">
            Get Personalized Care
            <span className="block text-senior-blue">Recommendations</span>
          </h2>
          <div className="w-24 h-1 bg-senior-blue rounded-full mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Connect with our senior care experts to find the perfect community for your loved one's unique needs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {/* Contact Form - Left Side */}
          <div className="lg:col-span-2 animate-fade-in" style={{ animationDelay: '200ms' }}>
            <div className="bg-white rounded-2xl shadow-xl p-8 relative overflow-hidden group hover:shadow-2xl transition-all duration-500">
              {/* Background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-senior-blue/5 to-senior-blue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="flex items-center mb-8">
                  <div className="bg-senior-light rounded-full p-3 mr-4 group-hover:bg-senior-blue transition-all duration-500">
                    <User className="text-senior-blue group-hover:text-white transition-colors duration-500" size={24} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-senior-slate group-hover:text-senior-blue transition-colors duration-300">
                      Tell Us About Your Needs
                    </h3>
                    <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                      Help us match you with the perfect senior care community
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group/input">
                      <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2 group-hover/input:text-senior-blue transition-colors duration-300">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-senior-blue focus:ring-2 focus:ring-senior-blue/20 transition-all duration-300 hover:border-gray-300"
                        placeholder="Enter your full name"
                      />
                    </div>
                    
                    <div className="group/input">
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2 group-hover/input:text-senior-blue transition-colors duration-300">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-senior-blue focus:ring-2 focus:ring-senior-blue/20 transition-all duration-300 hover:border-gray-300"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group/input">
                      <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2 group-hover/input:text-senior-blue transition-colors duration-300">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-senior-blue focus:ring-2 focus:ring-senior-blue/20 transition-all duration-300 hover:border-gray-300"
                        placeholder="‪(916) 538-9563‬"
                      />
                    </div>
                    
                    <div className="group/input">
                      <label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-2 group-hover/input:text-senior-blue transition-colors duration-300">
                        Preferred Location
                      </label>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-senior-blue focus:ring-2 focus:ring-senior-blue/20 transition-all duration-300 hover:border-gray-300"
                        placeholder="Sacramento, Carmichael, etc."
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group/input">
                      <label htmlFor="careType" className="block text-sm font-semibold text-gray-700 mb-2 group-hover/input:text-senior-blue transition-colors duration-300">
                        Type of Care Needed
                      </label>
                      <select
                        id="careType"
                        name="careType"
                        value={formData.careType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-senior-blue focus:ring-2 focus:ring-senior-blue/20 transition-all duration-300 hover:border-gray-300"
                      >
                        <option value="">Select care type</option>
                        <option value="independent">Independent Living</option>
                        <option value="assisted">Assisted Living</option>
                        <option value="memory">Memory Care</option>
                        <option value="skilled">Skilled Nursing</option>
                        <option value="unsure">Not Sure Yet</option>
                      </select>
                    </div>
                    
                    <div className="group/input">
                      <label htmlFor="urgency" className="block text-sm font-semibold text-gray-700 mb-2 group-hover/input:text-senior-blue transition-colors duration-300">
                        Timeline
                      </label>
                      <select
                        id="urgency"
                        name="urgency"
                        value={formData.urgency}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-senior-blue focus:ring-2 focus:ring-senior-blue/20 transition-all duration-300 hover:border-gray-300"
                      >
                        <option value="">Select timeline</option>
                        <option value="immediate">Immediate (Within 1 month)</option>
                        <option value="soon">Soon (1-3 months)</option>
                        <option value="planning">Planning (3-6 months)</option>
                        <option value="exploring">Just Exploring</option>
                      </select>
                    </div>
                  </div>

                  <div className="group/input">
                    <label htmlFor="budget" className="block text-sm font-semibold text-gray-700 mb-2 group-hover/input:text-senior-blue transition-colors duration-300">
                      Monthly Budget Range (Optional)
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-senior-blue focus:ring-2 focus:ring-senior-blue/20 transition-all duration-300 hover:border-gray-300"
                    >
                      <option value="">Select budget range</option>
                      <option value="under-3000">Under $3,000</option>
                      <option value="3000-5000">$3,000 - $5,000</option>
                      <option value="5000-7000">$5,000 - $7,000</option>
                      <option value="7000-plus">$7,000+</option>
                      <option value="discuss">Prefer to Discuss</option>
                    </select>
                  </div>

                  <div className="group/input">
                    <label htmlFor="additionalInfo" className="block text-sm font-semibold text-gray-700 mb-2 group-hover/input:text-senior-blue transition-colors duration-300">
                      Additional Information
                    </label>
                    <textarea
                      id="additionalInfo"
                      name="additionalInfo"
                      value={formData.additionalInfo}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-senior-blue focus:ring-2 focus:ring-senior-blue/20 transition-all duration-300 hover:border-gray-300 resize-none"
                      placeholder="Tell us about specific needs, preferences, or questions you have..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 px-6 bg-senior-blue text-white font-semibold rounded-lg hover:bg-senior-blue/90 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center group ${isSubmitting ? '' : 'hover:scale-105'}`}
                  >
                    {isSubmitting ? (
                      'Submitting Your Care Inquiry...'
                    ) : (
                      <>
                        Get My Personalized Recommendations
                        <ChevronRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                      </>
                    )}
                  </button>

                  <p className="text-sm text-gray-500 text-center mt-4">
                    Your information is confidential and will only be used to provide you with care recommendations.
                  </p>
                </form>
              </div>
            </div>
          </div>

          {/* Call to Action - Right Side */}
          <div className="lg:col-span-1 animate-fade-in" style={{ animationDelay: '400ms' }}>
            <div className="bg-gradient-to-br from-senior-blue to-senior-blue/90 rounded-2xl shadow-xl p-8 text-white relative overflow-hidden group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              {/* Background decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
              
              <div className="relative z-10">
                <div className="text-center mb-8">
                  <div className="flex items-center justify-center gap-3 mb-6">
                    <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center group-hover:bg-white/30 transition-all duration-500 group-hover:scale-110">
                      <Mail size={28} className="text-white" />
                    </div>
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/20 group-hover:border-white/40 transition-all duration-500 group-hover:scale-110">
                      <img 
                        src="/lovable-uploads/d77f6f3a-0329-497f-b3bf-3e26e931e65d.png" 
                        alt="Care advisor" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">
                    Connect With a Senior Care
                    <span className="block">Advisor Today</span>
                  </h3>
                  <div className="w-16 h-1 bg-white/30 rounded-full mx-auto mb-6"></div>
                </div>

                <div className="text-center mb-8">
                  <div className="bg-white/10 rounded-xl p-6 mb-6 group-hover:bg-white/20 transition-all duration-500">
                    <div className="flex items-center justify-center mb-3">
                      <Mail size={20} className="mr-2" />
                      <span className="text-sm font-medium opacity-90">Reach us through our contact form</span>
                    </div>
                    <p className="text-base font-medium opacity-90">
                      Fill out the form and a care advisor will respond promptly.
                    </p>
                  </div>

                  <a
                    href="/contact"
                    className="btn-secondary w-full py-4 px-6 bg-white text-senior-blue font-semibold rounded-lg hover:bg-white/90 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg flex items-center justify-center group/btn mb-6"
                  >
                    <Mail size={20} className="mr-2 group-hover/btn:animate-pulse" />
                    Contact Us - Free Consultation
                  </a>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center">
                    <Clock size={16} className="mr-3 text-white/80" />
                    <span className="text-sm">Mon-Fri: 8AM-8PM PST</span>
                  </div>
                  <div className="flex items-center">
                    <Heart size={16} className="mr-3 text-white/80" />
                    <span className="text-sm">Free expert guidance</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin size={16} className="mr-3 text-white/80" />
                    <span className="text-sm">Local Sacramento expertise</span>
                  </div>
                </div>

                <div className="bg-white/10 rounded-xl p-6 group-hover:bg-white/20 transition-all duration-500">
                  <p className="text-sm leading-relaxed opacity-90">
                    <strong className="text-white">Don't wait.</strong> Our experienced advisors are standing by to help you navigate your options and find the perfect care community for your loved one. Every call is confidential and completely free.
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

export default CareRecommendationsSection;
