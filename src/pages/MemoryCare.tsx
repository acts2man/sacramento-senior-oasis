
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Clock, Heart, Users, Brain, CheckCircle, ArrowRight, Star } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import LocationCard from '../components/LocationCard';
import { getAllLocations, LocationType } from '../data/locations';

const MemoryCare = () => {
  const [memoryCareCommunities, setMemoryCareCommunities] = useState<LocationType[]>([]);

  useEffect(() => {
    const allLocations = getAllLocations();
    // Filter for memory care services
    const memoryCareLocations = allLocations.filter(location => 
      location.services.some(service => 
        service.toLowerCase().includes('memory') || 
        service.toLowerCase().includes('dementia') || 
        service.toLowerCase().includes('alzheimer')
      )
    );
    setMemoryCareCommunities(memoryCareLocations.slice(0, 6)); // Show first 6
  }, []);

  const features = [
    {
      icon: Clock,
      title: "24/7 Supervision",
      description: "Round-the-clock care for dementia and Alzheimer's patients with trained staff always available."
    },
    {
      icon: Brain,
      title: "Cognitive Support",
      description: "Specialized programs designed to maintain cognitive function and provide mental stimulation."
    },
    {
      icon: Shield,
      title: "Safe Environment",
      description: "Secure, wandering-proof facilities designed specifically for memory care needs."
    },
    {
      icon: Heart,
      title: "Compassionate Care",
      description: "Dignified, person-centered approach that honors each resident's unique story."
    },
    {
      icon: Users,
      title: "Family Support",
      description: "Guidance and resources for families navigating the memory care journey together."
    },
    {
      icon: CheckCircle,
      title: "Medication Management",
      description: "Professional medication administration and health monitoring by licensed staff."
    }
  ];

  const choosingTips = [
    {
      title: "Visit Multiple Facilities",
      description: "Tour several memory care homes to compare environments, staff interactions, and overall atmosphere."
    },
    {
      title: "Meet the Care Team",
      description: "Speak with nurses, caregivers, and administrators about their experience and training in memory care."
    },
    {
      title: "Review Care Plans",
      description: "Understand how each facility creates personalized care plans and adapts to changing needs."
    },
    {
      title: "Compare Costs & Services",
      description: "Evaluate what's included in monthly fees and what additional services may incur extra charges."
    },
    {
      title: "Observe Daily Activities",
      description: "Watch how staff engage residents and what programs are offered for cognitive stimulation."
    },
    {
      title: "Check Safety Measures",
      description: "Ensure the facility has proper security, emergency procedures, and wandering prevention systems."
    }
  ];

  const testimonials = [
    {
      quote: "The staff at our chosen memory care facility treats my mother with such dignity and compassion. We couldn't have made a better choice.",
      author: "Sarah M.",
      location: "Sacramento, CA"
    },
    {
      quote: "Finding the right memory care home seemed overwhelming, but this resource helped us compare options and find the perfect fit for Dad.",
      author: "Michael R.",
      location: "Elk Grove, CA"
    },
    {
      quote: "The peace of mind knowing Mom is safe and engaged in meaningful activities every day is priceless.",
      author: "Jennifer L.",
      location: "Natomas, CA"
    }
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <SEO 
        title="Memory Care in Sacramento | Dementia & Alzheimer's Care Homes"
        description="Discover trusted memory care facilities in Sacramento, CA. Find specialized Alzheimer's and dementia care homes with 24/7 supervision and expert staff."
        keywords="memory care sacramento, dementia care sacramento, alzheimer's care, memory care facilities, sacramento senior care"
        canonical="/memory-care"
      />
      
      <Header />
      
      <main>
        {/* Hero Section */}
        <section 
          className="relative h-[70vh] bg-cover bg-center bg-no-repeat overflow-hidden"
          style={{
            backgroundImage: `url('/lovable-uploads/483f4e3d-f678-44d5-83a1-75f43eec305f.png')`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-senior-blue/80 via-senior-blue/70 to-purple-900/60"></div>
          
          <div className="container-custom relative z-10 h-full flex items-center">
            <div className="max-w-3xl text-white animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Compassionate Memory Care
                <span className="block text-white/90">in Sacramento, CA</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed">
                Discover trusted memory care communities that support dignity, safety, and peace of mind.
              </p>
              <Link 
                to="/locations?filter=memory-care"
                className="btn-primary inline-flex items-center group transform hover:scale-105 transition-all duration-300"
              >
                Browse Memory Care Homes
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </section>

        {/* Intro Section */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in">
                <img 
                  src="/lovable-uploads/ac19db84-a20b-46a9-ba9c-41a01d7c2485.png"
                  alt="Memory care support and compassion"
                  className="rounded-2xl shadow-lg w-full h-80 object-cover"
                />
              </div>
              <div className="animate-fade-in delay-300">
                <h2 className="text-4xl font-bold text-senior-slate mb-6">
                  Finding the Right Memory Care in Sacramento
                </h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  Sacramento Senior Care makes it easy to find trusted <strong>memory care in Sacramento</strong>, 
                  including homes that specialize in supporting those with Alzheimer's and dementia. Our directory 
                  highlights facilities offering safe environments, trained staff, and compassionate daily routines.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Whether you're looking in <strong>Elk Grove</strong>, <strong>Midtown</strong>, <strong>Natomas</strong>, 
                  or nearby, we help you explore the best <strong>dementia care Sacramento</strong> has to offer.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What Is Memory Care Section */}
        <section className="py-16 bg-senior-light">
          <div className="container-custom">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-4xl font-bold text-senior-slate mb-4">What Is Memory Care?</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Memory care provides specialized support for individuals with Alzheimer's, dementia, and other cognitive impairments.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={feature.title}
                  className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="bg-senior-blue/10 rounded-full w-16 h-16 flex items-center justify-center mb-6 group-hover:bg-senior-blue group-hover:text-white transition-all duration-300">
                    <feature.icon size={32} className="text-senior-blue group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-senior-slate mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Memory Care Communities */}
        {memoryCareCommunities.length > 0 && (
          <section className="py-16 bg-white">
            <div className="container-custom">
              <div className="text-center mb-12 animate-fade-in">
                <h2 className="text-4xl font-bold text-senior-slate mb-4">
                  Featured Memory Care Communities
                </h2>
                <p className="text-xl text-gray-600">
                  Explore top-rated memory care facilities in the Sacramento area
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {memoryCareCommunities.map((location, index) => (
                  <div 
                    key={location.id}
                    className="animate-fade-in hover-scale"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <LocationCard location={location} featured={true} />
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-12">
                <Link 
                  to="/locations?filter=memory-care"
                  className="btn-outline inline-flex items-center group"
                >
                  View All Memory Care Communities
                  <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* How to Choose Section */}
        <section className="py-16 bg-senior-light">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
              <div className="animate-fade-in">
                <h2 className="text-4xl font-bold text-senior-slate mb-4">
                  How to Choose the Right Memory Care Facility
                </h2>
                <p className="text-xl text-gray-600">
                  Making the right choice requires careful consideration. Here's what to look for when evaluating memory care options.
                </p>
              </div>
              <div className="animate-fade-in delay-300">
                <img 
                  src="/lovable-uploads/972fbbc1-e176-437f-8cac-bf56d99926b7.png"
                  alt="Compassionate memory care interaction"
                  className="rounded-2xl shadow-lg w-full h-80 object-cover"
                />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {choosingTips.map((tip, index) => (
                <div 
                  key={tip.title}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="bg-senior-blue rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white font-bold text-sm">{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-senior-slate mb-2">{tip.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{tip.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-senior-slate mb-4">What Families Say</h2>
              <p className="text-xl text-gray-600">Real experiences from Sacramento families</p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="bg-senior-light rounded-2xl p-8 md:p-12 text-center animate-fade-in">
                <div className="mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={24} className="inline-block text-amber-400 fill-amber-400 mx-1" />
                  ))}
                </div>
                <blockquote className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed italic">
                  "{testimonials[currentTestimonial].quote}"
                </blockquote>
                <div className="text-senior-blue font-semibold">
                  — {testimonials[currentTestimonial].author}, {testimonials[currentTestimonial].location}
                </div>
                
                <div className="flex justify-center mt-8 space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentTestimonial ? 'bg-senior-blue' : 'bg-gray-300'
                      }`}
                      aria-label={`View testimonial ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Footer */}
        <section className="py-16 bg-gradient-to-br from-senior-blue to-senior-blue/90 text-white">
          <div className="container-custom text-center">
            <div className="animate-fade-in">
              <h2 className="text-4xl font-bold mb-6">
                Ready to find a memory care home your family can trust?
              </h2>
              <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
                Start your search today and discover compassionate memory care options throughout Sacramento.
              </p>
              <Link 
                to="/locations?filter=memory-care"
                className="bg-white text-senior-blue hover:bg-gray-100 font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg inline-flex items-center group"
              >
                Search Sacramento Memory Care Listings
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default MemoryCare;
