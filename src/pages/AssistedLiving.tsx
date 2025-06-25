import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Clock, Heart, Users, Home, CheckCircle, ArrowRight, Star, MapPin } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import LocationCard from '../components/LocationCard';
import { getAllLocations, LocationType } from '../data/locations';

const AssistedLiving = () => {
  const [assistedLivingCommunities, setAssistedLivingCommunities] = useState<LocationType[]>([]);

  useEffect(() => {
    const allLocations = getAllLocations();
    // Filter for assisted living services
    const assistedLivingLocations = allLocations.filter(location => 
      location.services.some(service => 
        service.toLowerCase().includes('assisted living') || 
        service.toLowerCase().includes('personal care') ||
        service.toLowerCase().includes('daily living')
      )
    );
    setAssistedLivingCommunities(assistedLivingLocations.slice(0, 6)); // Show first 6
  }, []);

  const assistedLivingFeatures = [
    {
      icon: Users,
      title: "Personal Care Assistance",
      description: "Help with dressing, bathing, grooming, and mobility from trained caregivers."
    },
    {
      icon: Clock,
      title: "Medication Management",
      description: "Professional medication reminders and administration by licensed nursing staff."
    },
    {
      icon: Home,
      title: "Housekeeping & Meals",
      description: "Daily housekeeping services and nutritious meals prepared in community dining rooms."
    },
    {
      icon: Shield,
      title: "24/7 Staff Support",
      description: "Round-the-clock access to trained staff for assistance and emergency response."
    },
    {
      icon: Heart,
      title: "Social Activities",
      description: "Engaging programs and activities to maintain social connections and wellness."
    },
    {
      icon: CheckCircle,
      title: "Safe Environment",
      description: "Secure, residential setting designed for comfort, safety, and independence."
    }
  ];

  const choosingTips = [
    {
      title: "Tour Multiple Communities",
      description: "Visit several assisted living facilities to compare environments, staff, and overall atmosphere."
    },
    {
      title: "Ask About Daily Routines",
      description: "Learn about meal times, activities, and how residents spend their typical day."
    },
    {
      title: "Review Care Services",
      description: "Understand what personal care services are included and what may cost extra."
    },
    {
      title: "Consider Location",
      description: "Choose a location convenient for family visits and near medical providers."
    },
    {
      title: "Evaluate Staffing",
      description: "Ask about staff-to-resident ratios and the training background of caregivers."
    },
    {
      title: "Compare Costs",
      description: "Get detailed pricing information including base fees and additional service charges."
    }
  ];

  const neighborhoods = [
    { name: "Midtown Sacramento", count: 8 },
    { name: "Carmichael", count: 12 },
    { name: "Elk Grove", count: 15 },
    { name: "Natomas", count: 6 }
  ];

  const testimonials = [
    {
      quote: "The assisted living community we chose has given my father the perfect balance of independence and support. The staff is wonderful.",
      author: "Maria S.",
      location: "Carmichael, CA"
    },
    {
      quote: "Finding the right assisted living home seemed overwhelming, but this resource made it so much easier to compare our options.",
      author: "Robert T.",
      location: "Elk Grove, CA"
    },
    {
      quote: "Mom loves her new home and has made so many friends. The care she receives is exceptional and gives our family peace of mind.",
      author: "Linda K.",
      location: "Midtown Sacramento, CA"
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
        title="Assisted Living in Sacramento | Trusted Senior Care Options"
        description="Discover the best assisted living communities in Sacramento, CA. Compare care homes, explore services, and connect with trusted providers near you."
        keywords="assisted living sacramento, senior care sacramento, assisted living facilities, sacramento senior living, personal care assistance"
        canonical="/assisted-living"
      />
      
      <Header />
      
      <main>
        {/* Hero Section */}
        <section 
          className="relative h-[70vh] bg-cover bg-center bg-no-repeat overflow-hidden"
          style={{
            backgroundImage: `url('/lovable-uploads/f5286fdb-56ae-48a9-ae6c-a83ab1659741.png')`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-senior-blue/80 via-senior-blue/70 to-purple-900/60"></div>
          
          <div className="container-custom relative z-10 h-full flex items-center">
            <div className="max-w-3xl text-white animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Top-Rated Assisted Living in Sacramento, CA
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed animate-fade-in delay-500">
                Compassionate care and independence — discover trusted assisted living homes near you.
              </p>
              <Link 
                to="/locations?filter=assisted-living"
                className="btn-primary inline-flex items-center group transform hover:scale-105 transition-all duration-300 animate-scale-in delay-700"
              >
                Explore Assisted Living Listings
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </section>

        {/* Intro Section */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="animate-slide-up">
                <img 
                  src="/lovable-uploads/235e7547-3d2e-487d-aff1-fe04e3b3fc4f.png"
                  alt="Caring assistance and support in assisted living"
                  className="rounded-2xl shadow-lg w-full h-80 object-cover"
                />
              </div>
              <div className="animate-fade-in delay-300">
                <h2 className="text-4xl font-bold text-senior-slate mb-6">
                  Finding the Right Assisted Living in Sacramento
                </h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  At Sacramento Senior Care, we help you explore the most trusted <strong>assisted living Sacramento</strong> has 
                  to offer. Whether you're looking for support with daily tasks or a comfortable new place to call home, 
                  our listings make it easy to compare the top <strong>assisted living facilities in Sacramento, CA</strong>.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Search by neighborhood, view detailed services, and find a location that meets your family's unique needs 
                  in areas like <strong>Carmichael</strong>, <strong>Elk Grove</strong>, <strong>Midtown</strong>, and <strong>Natomas</strong>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What Does Assisted Living Include Section */}
        <section className="py-16 bg-senior-light">
          <div className="container-custom">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-4xl font-bold text-senior-slate mb-4">What Does Assisted Living Include?</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Assisted living provides the perfect balance of independence and support for daily living activities.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {assistedLivingFeatures.map((feature, index) => (
                <div 
                  key={feature.title}
                  className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-slide-up group"
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

        {/* Featured Assisted Living Communities */}
        {assistedLivingCommunities.length > 0 && (
          <section className="py-16 bg-white">
            <div className="container-custom">
              <div className="text-center mb-12 animate-fade-in">
                <h2 className="text-4xl font-bold text-senior-slate mb-4">
                  Featured Assisted Living Communities
                </h2>
                <p className="text-xl text-gray-600">
                  Explore top-rated assisted living facilities in the Sacramento area
                </p>
              </div>
              
              <div className="space-y-8">
                {assistedLivingCommunities.map((location, index) => (
                  <div 
                    key={location.id}
                    className="animate-scale-in hover-scale"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <LocationCard location={location} featured={true} layout="list" />
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-12">
                <Link 
                  to="/locations?filter=assisted-living"
                  className="btn-outline inline-flex items-center group animate-fade-in delay-700"
                >
                  View All Assisted Living Communities
                  <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Neighborhood Navigation */}
        <section className="py-16 bg-senior-light">
          <div className="container-custom">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-4xl font-bold text-senior-slate mb-4">
                Assisted Living by Neighborhood
              </h2>
              <p className="text-xl text-gray-600">
                Find assisted living options in your preferred Sacramento area
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {neighborhoods.map((neighborhood, index) => (
                <Link
                  key={neighborhood.name}
                  to={`/locations?area=${neighborhood.name.toLowerCase().replace(' ', '-')}`}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-slide-up group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <MapPin size={24} className="text-senior-blue group-hover:text-senior-blue/80 transition-colors duration-300" />
                    <span className="bg-senior-blue/10 text-senior-blue px-3 py-1 rounded-full text-sm font-semibold">
                      {neighborhood.count} homes
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-senior-slate mb-2 group-hover:text-senior-blue transition-colors duration-300">
                    {neighborhood.name}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    View assisted living options in {neighborhood.name}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Choosing the Right Facility Section */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
              <div className="animate-fade-in">
                <h2 className="text-4xl font-bold text-senior-slate mb-4">
                  How to Choose the Right Assisted Living Facility
                </h2>
                <p className="text-xl text-gray-600">
                  Making the right choice requires careful consideration. Here's what to look for when evaluating assisted living options.
                </p>
              </div>
              <div className="animate-slide-up delay-300">
                <img 
                  src="/lovable-uploads/03afb3bf-6e89-4bca-9323-f10e1e35c60f.png"
                  alt="Professional care assistance in assisted living"
                  className="rounded-2xl shadow-lg w-full h-80 object-cover"
                />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {choosingTips.map((tip, index) => (
                <div 
                  key={tip.title}
                  className="bg-senior-light p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 animate-slide-up"
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
        <section className="py-16 bg-senior-light">
          <div className="container-custom">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-4xl font-bold text-senior-slate mb-4">What Families Say</h2>
              <p className="text-xl text-gray-600">Real experiences from Sacramento families</p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl p-8 md:p-12 text-center animate-scale-in delay-300">
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
                Find the right assisted living home today
              </h2>
              <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
                Start your search and discover compassionate assisted living options throughout Sacramento.
              </p>
              <Link 
                to="/locations?filter=assisted-living"
                className="bg-white text-senior-blue hover:bg-gray-100 font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg inline-flex items-center group animate-scale-in delay-300"
              >
                Search Sacramento Assisted Living Listings
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

export default AssistedLiving;
