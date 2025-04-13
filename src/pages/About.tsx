
import Header from '../components/Header';
import Footer from '../components/Footer';
import ContactForm from '../components/ContactForm';
import { Heart, Award, Users, Clock, Phone } from 'lucide-react';

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-senior-blue text-white py-16">
          <div className="container-custom">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">About Sacramento Senior Care Directory</h1>
              <p className="text-xl text-white/90">
                Helping families find the perfect senior living communities in the Sacramento area.
              </p>
            </div>
          </div>
        </div>
        
        {/* Our Mission */}
        <section className="py-12 bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-senior-slate mb-4">Our Mission</h2>
                <p className="text-gray-600 mb-4">
                  At Sacramento Senior Care Directory, our mission is to connect seniors and their families with the best assisted living and senior care communities in the Sacramento area.
                </p>
                <p className="text-gray-600 mb-4">
                  We understand that finding the right senior living community is an important and often emotional decision. Our comprehensive directory provides reliable information about local facilities, enabling families to make informed choices that meet their loved ones' unique needs.
                </p>
                <p className="text-gray-600">
                  By offering detailed profiles, transparent pricing information, and personal support throughout the search process, we strive to simplify and demystify the senior housing selection process.
                </p>
              </div>
              
              <div className="bg-senior-light p-8 rounded-lg">
                <div className="flex flex-col space-y-6">
                  <div className="flex">
                    <div className="mr-4">
                      <div className="w-12 h-12 bg-senior-blue rounded-full flex items-center justify-center">
                        <Heart className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-senior-slate mb-1">Compassionate Guidance</h3>
                      <p className="text-gray-600">
                        We approach each family's journey with empathy and understanding, providing personalized assistance.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="mr-4">
                      <div className="w-12 h-12 bg-senior-teal rounded-full flex items-center justify-center">
                        <Award className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-senior-slate mb-1">Quality Standards</h3>
                      <p className="text-gray-600">
                        We only list communities that meet our high standards for care, comfort, and service.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="mr-4">
                      <div className="w-12 h-12 bg-senior-sand rounded-full flex items-center justify-center">
                        <Users className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-senior-slate mb-1">Local Expertise</h3>
                      <p className="text-gray-600">
                        Our deep knowledge of Sacramento senior living options ensures the right match for every senior.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Story */}
        <section className="py-12 bg-senior-light">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-senior-slate mb-4">Our Story</h2>
              <p className="text-gray-600">
                Sacramento Senior Care Directory was founded by a team of healthcare professionals and family members who experienced firsthand the challenges of finding appropriate senior care.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-8">
              <p className="text-gray-600 mb-4">
                Our founder, Sarah Johnson, struggled to find the right assisted living community for her mother after a sudden health decline. Despite being a healthcare professional herself, she found the process overwhelming, confusing, and filled with hidden information.
              </p>
              <p className="text-gray-600 mb-4">
                This experience revealed a clear need for a transparent, comprehensive resource dedicated to helping Sacramento families navigate senior living options. In 2018, Sacramento Senior Care Directory was born with a commitment to simplifying this important life transition.
              </p>
              <p className="text-gray-600 mb-4">
                Today, our team combines healthcare expertise, senior care knowledge, and personal experience to guide families through every step of finding the perfect community. We've helped thousands of Sacramento families find senior living solutions that provide safety, comfort, and joy.
              </p>
              <p className="text-gray-600">
                Our directory has grown to include detailed information on all types of senior living options throughout the greater Sacramento area, but our mission remains the same: to be the most trusted resource for families seeking exceptional care for their loved ones.
              </p>
            </div>
          </div>
        </section>
        
        {/* Our Process */}
        <section className="py-12 bg-white">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-senior-slate mb-4">How We Help Families</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our streamlined process makes finding the right senior living community simple and stress-free.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-senior-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-senior-blue">1</span>
                </div>
                <h3 className="text-xl font-bold text-senior-slate mb-2">Explore Communities</h3>
                <p className="text-gray-600">
                  Browse our comprehensive directory of senior living options in Sacramento.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-senior-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-senior-blue">2</span>
                </div>
                <h3 className="text-xl font-bold text-senior-slate mb-2">Get Detailed Information</h3>
                <p className="text-gray-600">
                  Access pricing, services, amenities, and photos for each community.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-senior-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-senior-blue">3</span>
                </div>
                <h3 className="text-xl font-bold text-senior-slate mb-2">Connect With Communities</h3>
                <p className="text-gray-600">
                  Contact communities directly or let us arrange tours for you.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-senior-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-senior-blue">4</span>
                </div>
                <h3 className="text-xl font-bold text-senior-slate mb-2">Find the Perfect Fit</h3>
                <p className="text-gray-600">
                  Choose the perfect community with confidence and peace of mind.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Team Section */}
        <section className="py-12 bg-senior-light">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-senior-slate mb-4">Our Team</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Meet the dedicated professionals behind Sacramento Senior Care Directory.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80" 
                  alt="Sarah Johnson" 
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-senior-slate mb-1">Sarah Johnson</h3>
                  <p className="text-senior-teal font-medium mb-3">Founder & Executive Director</p>
                  <p className="text-gray-600">
                    Former healthcare administrator with 15+ years experience in senior care. Sarah founded SSCD after her personal journey finding care for her mother.
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80" 
                  alt="Michael Chen" 
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-senior-slate mb-1">Michael Chen</h3>
                  <p className="text-senior-teal font-medium mb-3">Senior Living Advisor</p>
                  <p className="text-gray-600">
                    Gerontologist and certified senior advisor with a passion for helping families navigate care decisions for their loved ones.
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80" 
                  alt="Jennifer Patel" 
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-senior-slate mb-1">Jennifer Patel</h3>
                  <p className="text-senior-teal font-medium mb-3">Community Relations</p>
                  <p className="text-gray-600">
                    Former assisted living director who now helps families connect with the perfect communities for their unique needs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Contact Section */}
        <section className="py-12 bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold text-senior-slate mb-4">Contact Us</h2>
                <p className="text-gray-600 mb-6">
                  Have questions about senior living options in Sacramento? Our team is here to help you every step of the way.
                </p>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-start">
                    <div className="mr-4">
                      <div className="w-10 h-10 bg-senior-blue/10 rounded-full flex items-center justify-center">
                        <Phone className="h-5 w-5 text-senior-blue" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-senior-slate">Call Us</h3>
                      <p className="text-gray-600 mb-1">Available Monday-Friday, 8am-5pm</p>
                      <a href="tel:916-555-9000" className="text-senior-blue font-bold hover:text-senior-teal transition-colors">
                        (916) 555-9000
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mr-4">
                      <div className="w-10 h-10 bg-senior-blue/10 rounded-full flex items-center justify-center">
                        <Clock className="h-5 w-5 text-senior-blue" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-senior-slate">Business Hours</h3>
                      <p className="text-gray-600">Monday-Friday: 8am-5pm</p>
                      <p className="text-gray-600">Saturday: 9am-1pm</p>
                      <p className="text-gray-600">Sunday: Closed</p>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-600">
                  Our senior living advisors are ready to answer your questions and provide personalized assistance in your search for the perfect community.
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

export default About;
