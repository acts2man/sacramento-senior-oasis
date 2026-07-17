
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Clock, Heart, Users, Brain, CheckCircle, ArrowRight, MapPin, BookOpen, ShieldCheck } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import LocationCard from '../components/LocationCard';
import { locations } from '../data/locations';
import type { Facility } from '../types/facility';
import { SITE_URL } from '../lib/constants';
import { CITIES, cityNameToSlug } from '../data/cities';
import JsonLd from '../components/JsonLd';
import { buildBreadcrumbSchema, buildItemListSchema, buildFaqSchema } from '../lib/schema';

const memoryCareFacilities = locations.filter(f => f.care_types.includes('memory_care'));

// Sacramento-metro cities that actually have at least one home offering memory
// care, most-homes-first. Drives the "by city" internal-link hub — we only link
// cities that have real listings, never fabricated placeholders.
const memoryCareByCity = CITIES
  .map(city => ({
    city,
    count: memoryCareFacilities.filter(f => cityNameToSlug(f.city) === city.slug).length,
  }))
  .filter(entry => entry.count > 0)
  .sort((a, b) => b.count - a.count);

// Honest, sourced FAQ content. No fabricated prices or claims; cost answers
// stay qualitative and route families to our advisors.
const memoryCareFaqs = [
  {
    question: 'What is memory care?',
    answer:
      "Memory care is a form of residential senior care designed for people living with Alzheimer's disease or another form of dementia. Homes provide a secure setting, staff trained in dementia care, structured daily routines, and supervision to keep residents safe. The Alzheimer's Association is a good starting point for understanding the different stages of dementia and what to look for.",
  },
  {
    question: 'How is memory care different from assisted living?',
    answer:
      'Assisted living supports older adults who need help with day-to-day tasks but are largely independent. Memory care adds a secured environment, higher staffing, and dementia-specific programming. Many Sacramento-area homes offer both, so a resident can stay in place as needs change. Our guide comparing assisted living and memory care walks through the differences in detail.',
  },
  {
    question: 'How much does memory care cost in the Sacramento area?',
    answer:
      'Costs vary by home, room type, and level of care, and memory care generally costs more than standard assisted living because of the added supervision and specialized staffing. We do not publish per-home prices we cannot verify — our local advisors can share what each community is quoting right now, at no cost to your family.',
  },
  {
    question: 'Are Sacramento memory care homes licensed?',
    answer:
      'Yes. Memory care in California is provided in Residential Care Facilities for the Elderly (RCFEs), licensed by the California Department of Social Services (CDSS). On every listing we surface the public license number, status, and capacity so you can verify a home before you tour.',
  },
];

const MemoryCare = () => {
  const [memoryCareCommunities, setMemoryCareCommunities] = useState<Facility[]>([]);

  useEffect(() => {
    setMemoryCareCommunities(memoryCareFacilities.slice(0, 6));
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


  return (
    <>
      <SEO
        title="Memory Care in the Sacramento Metro — Dementia & Alzheimer's Care"
        description="Find licensed memory care and dementia care homes across the Sacramento metro, including small RCFE board & care homes. See license details and get free help from a local advisor."
        keywords="memory care sacramento, dementia care sacramento, alzheimer's care, memory care facilities, rcfe memory care, sacramento metro senior care"
        canonical={`${SITE_URL}/memory-care`}
        appendBrand={false}
      />
      <JsonLd data={buildItemListSchema(memoryCareFacilities, '/memory-care')} />
      <JsonLd data={buildFaqSchema(memoryCareFaqs)} />
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Memory Care', url: '/memory-care' },
        ])}
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
          <div className="absolute inset-0 bg-gradient-to-br from-senior-blue/80 via-senior-blue/70 to-teal-900/60"></div>
          
          <div className="container-custom relative z-10 h-full flex items-center">
            <div className="max-w-3xl text-white animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Specialized Memory Care in Sacramento, CA
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed animate-fade-in delay-500">
                Discover trusted memory care communities that support dignity, safety, and peace of mind.
              </p>
              <Link 
                to="/locations?filter=memory-care"
                className="btn-primary inline-flex items-center group transform hover:scale-105 transition-all duration-300 animate-scale-in delay-700"
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
              <div className="animate-slide-up">
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
                <p className="text-lg text-neutral-600 mb-6 leading-relaxed">
                  Sacramento Assisted Living Directory makes it easy to find trusted <strong>memory care in Sacramento</strong>,
                  including homes that specialize in supporting those with Alzheimer's and dementia. Our directory 
                  highlights facilities offering safe environments, trained staff, and compassionate daily routines.
                </p>
                <p className="text-lg text-neutral-600 leading-relaxed">
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
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                Memory care provides specialized support for individuals with Alzheimer's, dementia, and other cognitive impairments.
                In California this care is delivered in licensed Residential Care Facilities for the Elderly (RCFEs). For background on
                the stages of dementia, the{' '}
                <a
                  href="https://www.alz.org/alzheimers-dementia/stages"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-senior-blue underline hover:text-senior-blue/80"
                >
                  Alzheimer's Association
                </a>{' '}
                is an authoritative starting point.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={feature.title}
                  className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-slide-up group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="bg-senior-blue/10 rounded-full w-16 h-16 flex items-center justify-center mb-6 group-hover:bg-senior-blue group-hover:text-white transition-all duration-300">
                    <feature.icon size={32} className="text-senior-blue group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-senior-slate mb-4">{feature.title}</h3>
                  <p className="text-neutral-600 leading-relaxed">{feature.description}</p>
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
                <p className="text-xl text-neutral-600">
                  Explore top-rated memory care facilities in the Sacramento area
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {memoryCareCommunities.map((location, index) => (
                  <div 
                    key={location.id}
                    className="animate-scale-in hover-scale"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <LocationCard location={location} featured={true} />
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-12">
                <Link 
                  to="/locations?filter=memory-care"
                  className="btn-outline inline-flex items-center group animate-fade-in delay-700"
                >
                  View All Memory Care Communities
                  <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Memory Care by City — internal-link hub */}
        {memoryCareByCity.length > 0 && (
          <section className="py-16 bg-white">
            <div className="container-custom">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-senior-slate mb-4">
                  Memory Care by Sacramento-Metro City
                </h2>
                <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                  Browse licensed senior care homes — including those offering memory support — in each metro community.
                  Every listing shows the home's public RCFE license details.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {memoryCareByCity.map(({ city, count }) => (
                  <Link
                    key={city.slug}
                    to={`/senior-living/${city.slug}`}
                    className="group flex items-center justify-between bg-senior-light rounded-xl px-5 py-4 hover:bg-senior-blue hover:text-white transition-colors"
                  >
                    <span className="flex items-center gap-2 font-semibold">
                      <MapPin size={18} className="text-senior-blue group-hover:text-white" aria-hidden="true" />
                      {city.name}
                    </span>
                    <span className="text-sm text-neutral-500 group-hover:text-white/90">
                      {count} {count === 1 ? 'home' : 'homes'}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Guides — supporting editorial for decision-stage searchers */}
        <section className="py-16 bg-senior-light">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-senior-slate mb-4">Understand Your Options</h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                Clear, plain-language guides to help you compare care types and understand California licensing.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <Link
                to="/guides/assisted-living-vs-memory-care"
                className="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow flex items-start gap-4"
              >
                <BookOpen size={24} className="text-senior-blue flex-shrink-0 mt-1" aria-hidden="true" />
                <div>
                  <h3 className="text-lg font-bold text-senior-slate mb-1 group-hover:text-senior-blue">
                    Assisted Living vs. Memory Care
                  </h3>
                  <p className="text-neutral-600 text-sm">
                    How the two differ, and how to tell which level of care fits your family member.
                  </p>
                </div>
              </Link>
              <Link
                to="/guides/what-is-an-rcfe"
                className="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow flex items-start gap-4"
              >
                <ShieldCheck size={24} className="text-senior-blue flex-shrink-0 mt-1" aria-hidden="true" />
                <div>
                  <h3 className="text-lg font-bold text-senior-slate mb-1 group-hover:text-senior-blue">
                    What Is an RCFE?
                  </h3>
                  <p className="text-neutral-600 text-sm">
                    How California licenses residential care homes — and what the public record tells you.
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* How to Choose Section */}
        <section className="py-16 bg-senior-light">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
              <div className="animate-fade-in">
                <h2 className="text-4xl font-bold text-senior-slate mb-4">
                  How to Choose the Right Memory Care Facility
                </h2>
                <p className="text-xl text-neutral-600">
                  Making the right choice requires careful consideration. Here's what to look for when evaluating memory care options.
                </p>
              </div>
              <div className="animate-slide-up delay-300">
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
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="bg-senior-blue rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white font-bold text-sm">{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-senior-slate mb-2">{tip.title}</h3>
                      <p className="text-neutral-600 text-sm leading-relaxed">{tip.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section — honest, sourced answers (mirrored in FAQPage schema) */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-4xl font-bold text-senior-slate mb-4">Memory Care Questions, Answered</h2>
              <p className="text-xl text-neutral-600">Straightforward answers for families navigating a dementia diagnosis</p>
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
              {memoryCareFaqs.map((faq) => (
                <div key={faq.question} className="bg-senior-light rounded-2xl p-6 md:p-8">
                  <h3 className="text-lg md:text-xl font-bold text-senior-slate mb-3">{faq.question}</h3>
                  <p className="text-neutral-700 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
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
                className="bg-white text-senior-blue hover:bg-neutral-100 font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg inline-flex items-center group animate-scale-in delay-300"
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
