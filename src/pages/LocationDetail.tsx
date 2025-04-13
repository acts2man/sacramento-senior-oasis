
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Map from '../components/Map';
import ContactForm from '../components/ContactForm';
import LocationCard from '../components/LocationCard';
import { getLocationById, getFeaturedLocations, LocationType } from '../data/locations';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  DollarSign, 
  Star, 
  Heart, 
  Users, 
  Award,
  Coffee,
  Bed,
  ArrowLeft,
  ChevronRight
} from 'lucide-react';

const LocationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [location, setLocation] = useState<LocationType | null>(null);
  const [similarLocations, setSimilarLocations] = useState<LocationType[]>([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  useEffect(() => {
    if (id) {
      const locationData = getLocationById(id);
      if (locationData) {
        setLocation(locationData);
        // Get some featured locations as similar ones
        const featured = getFeaturedLocations().filter(l => l.id !== id);
        setSimilarLocations(featured.slice(0, 3));
      }
    }
    
    // Reset active tab and image when location changes
    setActiveTab('overview');
    setActiveImageIndex(0);
    
    // Scroll to top when location changes
    window.scrollTo(0, 0);
  }, [id]);
  
  if (!location) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow bg-gray-50 py-12">
          <div className="container-custom text-center">
            <h1 className="text-2xl font-bold mb-4">Location not found</h1>
            <Link to="/locations" className="text-senior-blue hover:underline">
              View all communities
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-gray-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="container-custom py-3">
            <div className="flex items-center text-sm text-gray-500">
              <Link to="/" className="hover:text-senior-blue">Home</Link>
              <ChevronRight size={12} className="mx-2" />
              <Link to="/locations" className="hover:text-senior-blue">Communities</Link>
              <ChevronRight size={12} className="mx-2" />
              <span className="text-gray-700 font-medium">{location.name}</span>
            </div>
          </div>
        </div>
        
        {/* Location Header */}
        <div className="bg-white shadow-sm">
          <div className="container-custom py-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-senior-slate">{location.name}</h1>
                <div className="flex items-center mt-2 text-gray-600">
                  <MapPin size={18} className="mr-1" />
                  <span>{location.address}, {location.city}, CA {location.zip}</span>
                </div>
              </div>
              
              <div className="mt-4 md:mt-0 flex items-center">
                <div className="flex items-center bg-senior-light px-3 py-1 rounded-md mr-4">
                  <Star size={18} className="text-amber-500 fill-amber-500 mr-1" />
                  <span className="font-bold">{location.rating}</span>
                </div>
                <a 
                  href={`tel:${location.phone}`}
                  className="btn-primary flex items-center"
                >
                  <Phone size={16} className="mr-2" />
                  Call Community
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Photo Gallery */}
        <div className="container-custom py-6">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-96">
              <img 
                src={location.images[activeImageIndex]} 
                alt={`${location.name} - Image ${activeImageIndex + 1}`} 
                className="w-full h-full object-cover"
              />
              
              <button 
                onClick={() => setActiveImageIndex(prev => (prev > 0 ? prev - 1 : location.images.length - 1))}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                aria-label="Previous image"
              >
                <ArrowLeft size={20} />
              </button>
              
              <button 
                onClick={() => setActiveImageIndex(prev => (prev < location.images.length - 1 ? prev + 1 : 0))}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                aria-label="Next image"
              >
                <ChevronRight size={20} />
              </button>
            </div>
            
            <div className="p-4 flex space-x-2 overflow-x-auto">
              {location.images.map((image, index) => (
                <button 
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden ${activeImageIndex === index ? 'ring-2 ring-senior-blue' : 'opacity-70'}`}
                >
                  <img 
                    src={image} 
                    alt={`${location.name} - Thumbnail ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="container-custom py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Location Info */}
            <div className="lg:col-span-2">
              {/* Tabs */}
              <div className="bg-white rounded-lg shadow-md mb-6">
                <div className="border-b">
                  <div className="flex overflow-x-auto">
                    <button 
                      onClick={() => setActiveTab('overview')}
                      className={`py-4 px-6 font-medium whitespace-nowrap ${activeTab === 'overview' ? 'text-senior-blue border-b-2 border-senior-blue' : 'text-gray-600 hover:text-senior-blue'}`}
                    >
                      Overview
                    </button>
                    <button 
                      onClick={() => setActiveTab('amenities')}
                      className={`py-4 px-6 font-medium whitespace-nowrap ${activeTab === 'amenities' ? 'text-senior-blue border-b-2 border-senior-blue' : 'text-gray-600 hover:text-senior-blue'}`}
                    >
                      Amenities
                    </button>
                    <button 
                      onClick={() => setActiveTab('services')}
                      className={`py-4 px-6 font-medium whitespace-nowrap ${activeTab === 'services' ? 'text-senior-blue border-b-2 border-senior-blue' : 'text-gray-600 hover:text-senior-blue'}`}
                    >
                      Services
                    </button>
                    <button 
                      onClick={() => setActiveTab('pricing')}
                      className={`py-4 px-6 font-medium whitespace-nowrap ${activeTab === 'pricing' ? 'text-senior-blue border-b-2 border-senior-blue' : 'text-gray-600 hover:text-senior-blue'}`}
                    >
                      Pricing
                    </button>
                  </div>
                </div>
                
                <div className="p-6">
                  {/* Overview Tab */}
                  {activeTab === 'overview' && (
                    <div>
                      <h2 className="text-2xl font-bold text-senior-slate mb-4">About {location.name}</h2>
                      <p className="text-gray-600 mb-6">{location.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-senior-light p-4 rounded-lg">
                          <h3 className="font-bold text-senior-slate mb-2 flex items-center">
                            <DollarSign size={18} className="mr-2 text-senior-blue" />
                            Pricing Information
                          </h3>
                          <p className="text-gray-600">
                            Starting at {formatPrice(location.pricing.starting)} per month
                          </p>
                          <p className="text-gray-600">
                            Average cost: {formatPrice(location.pricing.average)} per month
                          </p>
                        </div>
                        
                        <div className="bg-senior-light p-4 rounded-lg">
                          <h3 className="font-bold text-senior-slate mb-2 flex items-center">
                            <Award size={18} className="mr-2 text-senior-blue" />
                            Community Highlights
                          </h3>
                          <p className="text-gray-600">
                            Rating: {location.rating}/5 from residents and families
                          </p>
                          <p className="text-gray-600">
                            {location.services.length} services and {location.amenities.length} amenities
                          </p>
                        </div>
                      </div>
                      
                      <div className="border-t pt-6">
                        <h3 className="font-bold text-senior-slate mb-3">Contact Information</h3>
                        <ul className="space-y-2">
                          <li className="flex items-center text-gray-600">
                            <Phone size={18} className="mr-2 text-senior-blue" />
                            <a href={`tel:${location.phone}`} className="hover:text-senior-blue">
                              {location.phone}
                            </a>
                          </li>
                          <li className="flex items-center text-gray-600">
                            <Mail size={18} className="mr-2 text-senior-blue" />
                            <a href={`mailto:${location.email}`} className="hover:text-senior-blue">
                              {location.email}
                            </a>
                          </li>
                          <li className="flex items-center text-gray-600">
                            <Globe size={18} className="mr-2 text-senior-blue" />
                            <a href={`https://${location.website}`} target="_blank" rel="noopener noreferrer" className="hover:text-senior-blue">
                              {location.website}
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}
                  
                  {/* Amenities Tab */}
                  {activeTab === 'amenities' && (
                    <div>
                      <h2 className="text-2xl font-bold text-senior-slate mb-4">Amenities</h2>
                      <p className="text-gray-600 mb-6">
                        {location.name} offers the following amenities to enhance residents' quality of life:
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {location.amenities.map((amenity, index) => (
                          <div key={index} className="flex items-center p-3 bg-senior-light rounded-lg">
                            <Coffee size={18} className="mr-3 text-senior-blue" />
                            <span>{amenity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Services Tab */}
                  {activeTab === 'services' && (
                    <div>
                      <h2 className="text-2xl font-bold text-senior-slate mb-4">Services</h2>
                      <p className="text-gray-600 mb-6">
                        {location.name} provides the following care services to residents:
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {location.services.map((service, index) => (
                          <div key={index} className="flex items-center p-3 bg-senior-light rounded-lg">
                            <Users size={18} className="mr-3 text-senior-blue" />
                            <span>{service}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-8 p-4 border border-senior-blue/20 bg-senior-blue/5 rounded-lg">
                        <h3 className="font-bold text-senior-slate mb-2 flex items-center">
                          <Heart size={18} className="mr-2 text-senior-blue" />
                          Personalized Care
                        </h3>
                        <p className="text-gray-600">
                          Care plans are individually tailored to each resident's needs and preferences, and are regularly reviewed and adjusted as needed.
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {/* Pricing Tab */}
                  {activeTab === 'pricing' && (
                    <div>
                      <h2 className="text-2xl font-bold text-senior-slate mb-4">Pricing Information</h2>
                      <p className="text-gray-600 mb-6">
                        {location.name} offers the following pricing options:
                      </p>
                      
                      <div className="space-y-6">
                        <div className="bg-senior-light p-5 rounded-lg">
                          <div className="flex justify-between items-center mb-3">
                            <h3 className="font-bold text-senior-slate flex items-center">
                              <Bed size={18} className="mr-2 text-senior-blue" />
                              Studio Apartment
                            </h3>
                            <span className="text-xl font-bold text-senior-blue">
                              {formatPrice(location.pricing.starting)}+
                            </span>
                          </div>
                          <p className="text-gray-600">
                            Private studio apartment with private bathroom, kitchenette, and emergency call system.
                          </p>
                        </div>
                        
                        <div className="bg-senior-light p-5 rounded-lg">
                          <div className="flex justify-between items-center mb-3">
                            <h3 className="font-bold text-senior-slate flex items-center">
                              <Bed size={18} className="mr-2 text-senior-blue" />
                              One Bedroom Apartment
                            </h3>
                            <span className="text-xl font-bold text-senior-blue">
                              {formatPrice(location.pricing.average)}+
                            </span>
                          </div>
                          <p className="text-gray-600">
                            Spacious one-bedroom apartment with living area, private bathroom, kitchenette, and emergency call system.
                          </p>
                        </div>
                        
                        <div className="bg-senior-light p-5 rounded-lg">
                          <div className="flex justify-between items-center mb-3">
                            <h3 className="font-bold text-senior-slate flex items-center">
                              <Bed size={18} className="mr-2 text-senior-blue" />
                              Two Bedroom Apartment
                            </h3>
                            <span className="text-xl font-bold text-senior-blue">
                              {formatPrice(location.pricing.average + 800)}+
                            </span>
                          </div>
                          <p className="text-gray-600">
                            Premium two-bedroom apartment with living area, private bathroom, full kitchen, and emergency call system.
                          </p>
                        </div>
                      </div>
                      
                      <div className="mt-6 p-4 border border-yellow-400/30 bg-yellow-50 rounded-lg">
                        <h3 className="font-bold text-senior-slate mb-2">Financial Assistance Information</h3>
                        <p className="text-gray-600">
                          {location.name} accepts long-term care insurance and VA benefits. Our staff can provide information on additional financial options during your visit.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Map */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-2xl font-bold text-senior-slate mb-4">Location & Directions</h2>
                <Map 
                  lat={location.coordinates.lat} 
                  lng={location.coordinates.lng} 
                  name={location.name}
                  address={`${location.address}, ${location.city}, CA ${location.zip}`} 
                />
              </div>
              
              {/* Similar Communities */}
              {similarLocations.length > 0 && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-bold text-senior-slate mb-4">Similar Communities</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {similarLocations.map((similarLocation) => (
                      <LocationCard key={similarLocation.id} location={similarLocation} />
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Right Column - Contact & Info */}
            <div>
              <div className="sticky top-24">
                {/* Schedule Tour */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                  <h2 className="text-xl font-bold text-senior-slate mb-4">Schedule a Tour</h2>
                  <p className="text-gray-600 mb-4">
                    Visit {location.name} to see if it's the right fit for you or your loved one.
                  </p>
                  <a 
                    href={`tel:${location.phone}`}
                    className="btn-primary w-full justify-center mb-3"
                  >
                    <Phone size={16} className="mr-2" />
                    Call for Tour
                  </a>
                  <button className="btn-outline w-full justify-center">
                    <Mail size={16} className="mr-2" />
                    Email Community
                  </button>
                </div>
                
                {/* Get More Info */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-bold text-senior-slate mb-4">Get More Information</h2>
                  <p className="text-gray-600 mb-4">
                    Have questions about {location.name}? Fill out the form below and we'll be in touch.
                  </p>
                  <ContactForm />
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

export default LocationDetail;
