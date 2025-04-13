
import Header from '../components/Header';
import Footer from '../components/Footer';
import ContactForm from '../components/ContactForm';
import { Phone, Mail, MapPin, Clock, MessageSquare, Users } from 'lucide-react';

const Contact = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-senior-blue text-white py-16">
          <div className="container-custom">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
              <p className="text-xl text-white/90">
                We're here to help you find the perfect senior living solution.
              </p>
            </div>
          </div>
        </div>
        
        {/* Contact Information */}
        <section className="py-12 bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-senior-light p-6 rounded-lg text-center">
                <Phone className="h-12 w-12 text-senior-blue mx-auto mb-4" />
                <h2 className="text-xl font-bold text-senior-slate mb-2">Call Us</h2>
                <p className="text-gray-600 mb-2">Speak directly with a senior living advisor</p>
                <a href="tel:916-555-9000" className="text-senior-blue font-bold text-lg hover:text-senior-teal transition-colors">
                  (916) 555-9000
                </a>
              </div>
              
              <div className="bg-senior-light p-6 rounded-lg text-center">
                <Mail className="h-12 w-12 text-senior-blue mx-auto mb-4" />
                <h2 className="text-xl font-bold text-senior-slate mb-2">Email Us</h2>
                <p className="text-gray-600 mb-2">Send us your questions or concerns</p>
                <a href="mailto:info@sacramentoseniorcare.com" className="text-senior-blue font-bold hover:text-senior-teal transition-colors">
                  info@sacramentoseniorcare.com
                </a>
              </div>
              
              <div className="bg-senior-light p-6 rounded-lg text-center">
                <Clock className="h-12 w-12 text-senior-blue mx-auto mb-4" />
                <h2 className="text-xl font-bold text-senior-slate mb-2">Business Hours</h2>
                <p className="text-gray-600 mb-1">Monday-Friday: 8am-5pm</p>
                <p className="text-gray-600 mb-1">Saturday: 9am-1pm</p>
                <p className="text-gray-600">Sunday: Closed</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h2 className="text-3xl font-bold text-senior-slate mb-6">
                  Get in Touch
                </h2>
                <p className="text-gray-600 mb-6">
                  Whether you're looking for senior living options for yourself or a loved one, we're here to help you navigate this important decision. Our team of experienced advisors can provide personalized assistance to find the perfect community.
                </p>
                
                <div className="bg-senior-light p-6 rounded-lg mb-6">
                  <h3 className="text-xl font-bold text-senior-slate mb-3">Our Office</h3>
                  <div className="flex items-start mb-4">
                    <MapPin className="text-senior-blue mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-gray-700 font-medium">Sacramento Senior Care Directory</p>
                      <p className="text-gray-600">1234 Capitol Avenue</p>
                      <p className="text-gray-600">Sacramento, CA 95814</p>
                    </div>
                  </div>
                  <div className="aspect-w-16 aspect-h-9">
                    <div className="relative w-full h-64 bg-gray-200 rounded-md overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <MapPin size={36} className="text-senior-blue mb-2" />
                        <span className="sr-only">Map would display here</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="bg-white border border-gray-200 p-5 rounded-lg">
                    <div className="flex items-start">
                      <div className="mr-4">
                        <div className="w-10 h-10 bg-senior-teal/10 rounded-full flex items-center justify-center">
                          <MessageSquare className="h-5 w-5 text-senior-teal" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold text-senior-slate mb-1">Free Consultation</h3>
                        <p className="text-gray-600 text-sm">
                          Schedule a free consultation with our senior living advisors.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white border border-gray-200 p-5 rounded-lg">
                    <div className="flex items-start">
                      <div className="mr-4">
                        <div className="w-10 h-10 bg-senior-sand/10 rounded-full flex items-center justify-center">
                          <Users className="h-5 w-5 text-senior-sand" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold text-senior-slate mb-1">Community Tours</h3>
                        <p className="text-gray-600 text-sm">
                          We can arrange tours of communities that match your needs.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="text-3xl font-bold text-senior-slate mb-6">
                  Send Us a Message
                </h2>
                <p className="text-gray-600 mb-6">
                  Fill out the form below and one of our senior living advisors will contact you shortly.
                </p>
                
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-12 bg-senior-light">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-senior-slate mb-8 text-center">
              Frequently Asked Questions
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold text-senior-slate mb-2">
                  Is your service free to use?
                </h3>
                <p className="text-gray-600">
                  Yes, our directory and advisory services are completely free for seniors and their families. We're compensated by the communities in our network.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold text-senior-slate mb-2">
                  How do you select communities for your directory?
                </h3>
                <p className="text-gray-600">
                  We carefully screen all communities, ensuring they meet our standards for quality care, comfortable environments, and responsible management.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold text-senior-slate mb-2">
                  Can you help with financial questions?
                </h3>
                <p className="text-gray-600">
                  Our advisors can provide general information about payment options, including long-term care insurance, veterans benefits, and other financial resources.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold text-senior-slate mb-2">
                  Do you only work with assisted living communities?
                </h3>
                <p className="text-gray-600">
                  No, we provide information on various senior living options, including independent living, memory care, skilled nursing facilities, and in-home care services.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold text-senior-slate mb-2">
                  How quickly can you help me find a community?
                </h3>
                <p className="text-gray-600">
                  We can provide immediate information and recommendations. If you need urgent placement, our advisors can expedite the process to find appropriate options quickly.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold text-senior-slate mb-2">
                  What areas do you serve?
                </h3>
                <p className="text-gray-600">
                  We focus on Sacramento and surrounding areas, including West Sacramento, Citrus Heights, Folsom, Roseville, Elk Grove, and other nearby communities.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
