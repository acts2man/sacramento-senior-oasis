import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Map from '../components/Map';
import ContactForm from '../components/ContactForm';
import LocationCard from '../components/LocationCard';
import CareRecommendationsSection from '../components/CareRecommendationsSection';
import SEO from '../components/SEO';
import JsonLd from '../components/JsonLd';
import { getLocationById, getFeaturedLocations } from '../data/locations';
import type { Facility } from '../types/facility';
import { generateLocationSEO } from '../utils/seoUtils';
import { DIRECTORY_PHONE, SITE_URL, formatPhoneForDisplay, formatPhoneForTel } from '../lib/constants';
import { buildBreadcrumbSchema, buildLocalBusinessSchema } from '../lib/schema';
import { careTypeLabel } from '../lib/careTypes';
import {
  MapPin,
  Mail,
  DollarSign,
  Award,
  Coffee,
  Bed,
  ArrowLeft,
  ChevronRight,
  Phone,
  ShieldCheck,
  AlertTriangle,
  ExternalLink,
} from 'lucide-react';
import { Button } from '../components/ui/button';

const FORM_ANCHOR_ID = 'facility-lead-form';

const LocationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [location, setLocation] = useState<Facility | null>(null);
  const [similarLocations, setSimilarLocations] = useState<Facility[]>([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    if (id) {
      const locationData = getLocationById(id);
      if (locationData) {
        setLocation(locationData);
        const featured = getFeaturedLocations().filter(l => l.id !== id);
        setSimilarLocations(featured.slice(0, 3));
      }
    }
    setActiveTab('overview');
    setActiveImageIndex(0);
    window.scrollTo(0, 0);
  }, [id]);

  if (!location) {
    return (
      <div className="flex flex-col min-h-screen">
        <SEO
          title="Location not found"
          description="The requested senior living community could not be found. Browse our directory of Sacramento area senior living communities."
        />
        <Header />
        <main className="flex-grow bg-neutral-50 py-12">
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

  const seoData = generateLocationSEO(location);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);

  const photos = location.photos || [];
  const heroPhoto = photos[activeImageIndex];
  const careLabels = location.care_types.map(careTypeLabel);

  return (
    <div className="flex flex-col min-h-screen">
      <SEO
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
        ogImage={heroPhoto?.url}
        ogType="place"
        canonical={`${SITE_URL}/${location.id}`}
      />
      <JsonLd data={buildLocalBusinessSchema(location)} />
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Communities', url: '/locations' },
          { name: location.name, url: `/${location.id}` },
        ])}
      />

      <Header />

      <main className="flex-grow bg-neutral-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="container-custom py-3">
            <div className="flex items-center text-sm text-neutral-500">
              <Link to="/" className="hover:text-senior-blue">Home</Link>
              <ChevronRight size={12} className="mx-2" />
              <Link to="/locations" className="hover:text-senior-blue">Communities</Link>
              <ChevronRight size={12} className="mx-2" />
              <span className="text-neutral-700 font-medium">{location.name}</span>
            </div>
          </div>
        </div>

        {/* Location Header */}
        <div className="bg-white shadow-sm">
          <div className="container-custom py-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-senior-slate">{location.name}</h1>
                <div className="flex items-center mt-2 text-neutral-600">
                  <MapPin size={18} className="mr-1" />
                  <span>{location.street_address}, {location.city}, CA {location.zip}</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {careLabels.map(label => (
                    <span key={label} className="bg-senior-light text-senior-blue px-3 py-1 rounded-full text-sm font-medium">
                      {label}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 md:mt-0">
                <Button
                  className="btn-primary flex items-center"
                  asChild
                >
                  <a href={`#${FORM_ANCHOR_ID}`}>
                    <Mail size={16} />
                    <span>Request Info</span>
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Photo Gallery */}
        {heroPhoto && (
          <div className="container-custom py-6">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-96">
                <img
                  src={heroPhoto.url}
                  alt={heroPhoto.alt}
                  className="w-full h-full object-cover"
                />

                {photos.length > 1 && (
                  <>
                    <button
                      onClick={() => setActiveImageIndex(prev => (prev > 0 ? prev - 1 : photos.length - 1))}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                      aria-label="Previous image"
                    >
                      <ArrowLeft size={20} />
                    </button>
                    <button
                      onClick={() => setActiveImageIndex(prev => (prev < photos.length - 1 ? prev + 1 : 0))}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                      aria-label="Next image"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}
              </div>

              {photos.length > 1 && (
                <div className="p-4 flex space-x-2 overflow-x-auto">
                  {photos.map((photo, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden ${activeImageIndex === index ? 'ring-2 ring-senior-blue' : 'opacity-70'}`}
                    >
                      <img
                        src={photo.url}
                        alt={photo.alt}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

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
                      className={`py-4 px-6 font-medium whitespace-nowrap ${activeTab === 'overview' ? 'text-senior-blue border-b-2 border-senior-blue' : 'text-neutral-600 hover:text-senior-blue'}`}
                    >
                      Overview
                    </button>
                    {location.amenities && location.amenities.length > 0 && (
                      <button
                        onClick={() => setActiveTab('amenities')}
                        className={`py-4 px-6 font-medium whitespace-nowrap ${activeTab === 'amenities' ? 'text-senior-blue border-b-2 border-senior-blue' : 'text-neutral-600 hover:text-senior-blue'}`}
                      >
                        Amenities
                      </button>
                    )}
                    {Number.isFinite(location.price_range_low) && (
                      <button
                        onClick={() => setActiveTab('pricing')}
                        className={`py-4 px-6 font-medium whitespace-nowrap ${activeTab === 'pricing' ? 'text-senior-blue border-b-2 border-senior-blue' : 'text-neutral-600 hover:text-senior-blue'}`}
                      >
                        Pricing
                      </button>
                    )}
                  </div>
                </div>

                <div className="p-6">
                  {/* Overview Tab */}
                  {activeTab === 'overview' && (
                    <div>
                      <h2 className="text-2xl font-bold text-senior-slate mb-4">About {location.name}</h2>
                      <p className="text-neutral-600 mb-6">{location.description}</p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        {Number.isFinite(location.price_range_low) && (
                          <div className="bg-senior-light p-4 rounded-lg">
                            <h3 className="font-bold text-senior-slate mb-2 flex items-center">
                              <DollarSign size={18} className="mr-2 text-senior-blue" />
                              Pricing Information
                            </h3>
                            <p className="text-neutral-600">
                              Starting at {formatPrice(location.price_range_low!)} per month
                            </p>
                            {Number.isFinite(location.price_range_high) && (
                              <p className="text-neutral-600">
                                Up to {formatPrice(location.price_range_high!)} per month
                              </p>
                            )}
                          </div>
                        )}

                        <div className="bg-senior-light p-4 rounded-lg">
                          <h3 className="font-bold text-senior-slate mb-2 flex items-center">
                            <Award size={18} className="mr-2 text-senior-blue" />
                            Care Types
                          </h3>
                          <ul className="text-neutral-600 space-y-1">
                            {careLabels.map(label => (
                              <li key={label}>{label}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Amenities Tab */}
                  {activeTab === 'amenities' && location.amenities && (
                    <div>
                      <h2 className="text-2xl font-bold text-senior-slate mb-4">Amenities</h2>
                      <p className="text-neutral-600 mb-6">
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

                  {/* Pricing Tab */}
                  {activeTab === 'pricing' && Number.isFinite(location.price_range_low) && (
                    <div>
                      <h2 className="text-2xl font-bold text-senior-slate mb-4">Pricing Information</h2>
                      <p className="text-neutral-600 mb-6">
                        Indicative monthly rates at {location.name}. Final pricing depends on care needs and room type — our
                        advisors can confirm current availability and help you compare with similar communities.
                      </p>

                      <div className="space-y-6">
                        <div className="bg-senior-light p-5 rounded-lg">
                          <div className="flex justify-between items-center mb-3">
                            <h3 className="font-bold text-senior-slate flex items-center">
                              <Bed size={18} className="mr-2 text-senior-blue" />
                              Starting from
                            </h3>
                            <span className="text-xl font-bold text-senior-blue">
                              {formatPrice(location.price_range_low!)}+
                            </span>
                          </div>
                        </div>

                        {Number.isFinite(location.price_range_high) && (
                          <div className="bg-senior-light p-5 rounded-lg">
                            <div className="flex justify-between items-center mb-3">
                              <h3 className="font-bold text-senior-slate flex items-center">
                                <Bed size={18} className="mr-2 text-senior-blue" />
                                Up to
                              </h3>
                              <span className="text-xl font-bold text-senior-blue">
                                {formatPrice(location.price_range_high!)}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="mt-6 p-4 border border-teal-200 bg-teal-50 rounded-lg">
                        <h3 className="font-bold text-senior-slate mb-2">Financial Assistance Information</h3>
                        <p className="text-neutral-600">
                          {location.name} may accept long-term care insurance and VA benefits. Our advisors can walk you through
                          financing options when you request information below.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* License panel — CDSS / Community Care Licensing transparency */}
              {location.license_number && (
                <LicensePanel facility={location} />
              )}

              {/* Map — only when we have real geo for this facility */}
              {Number.isFinite(location.lat) && Number.isFinite(location.lng) && (
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                  <h2 className="text-2xl font-bold text-senior-slate mb-4">Location & Directions</h2>
                  <Map
                    lat={location.lat!}
                    lng={location.lng!}
                    name={location.name}
                    address={`${location.street_address}, ${location.city}, CA ${location.zip}`}
                  />
                </div>
              )}

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

            {/* Right Column - Lead capture */}
            <div>
              <div className="sticky top-24" id={FORM_ANCHOR_ID}>
                {/* Primary CTA card */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                  <h2 className="text-xl font-bold text-senior-slate mb-2">
                    Request information about {location.name}
                  </h2>
                  <p className="text-neutral-600 mb-4">
                    Our placement advisors can answer questions, share availability, and arrange a tour at no cost to your family.
                  </p>
                  {DIRECTORY_PHONE && (
                    <Button
                      className="w-full mb-2 flex items-center justify-center gap-2"
                      variant="outline"
                      asChild
                    >
                      <a href={formatPhoneForTel(DIRECTORY_PHONE)}>
                        <Phone size={16} />
                        <span>Call our advisor: {formatPhoneForDisplay(DIRECTORY_PHONE)}</span>
                      </a>
                    </Button>
                  )}
                </div>

                {/* Lead form (the form already covers the request) */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <ContactForm facilityName={location.name} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Care Recommendations Section */}
        <CareRecommendationsSection facilityName={location.name} />
      </main>

      <Footer />
    </div>
  );
};

/**
 * License transparency panel. Shows the CDSS / Community Care Licensing
 * fields verbatim and links to the public CCLD facility search so families
 * can verify the record themselves. "On probation" is shown distinctly
 * rather than hidden — the moat is honesty, not flattering display.
 */
const LicensePanel = ({ facility }: { facility: Facility }) => {
  const isProbation = facility.license_status === 'on_probation';
  const isCurrent = facility.license_status === 'current';
  const cldUrl = 'https://www.cdss.ca.gov/inforesources/community-care-licensing/facility-search';

  const dateLabel = facility.license_effective_date
    ? new Date(facility.license_effective_date + 'T00:00:00').toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  return (
    <div className={`rounded-lg shadow-md p-6 mb-6 border ${isProbation ? 'bg-amber-50 border-amber-300' : 'bg-white border-neutral-200'}`}>
      <div className="flex items-start gap-3 mb-4">
        {isProbation ? (
          <AlertTriangle size={22} className="text-amber-700 flex-shrink-0 mt-1" aria-hidden="true" />
        ) : (
          <ShieldCheck size={22} className="text-teal-700 flex-shrink-0 mt-1" aria-hidden="true" />
        )}
        <div>
          <h2 className="text-xl font-bold text-senior-slate">
            {isProbation ? 'License on probation' : 'License-verified'}
          </h2>
          <p className="text-sm text-neutral-600 mt-1">
            CA Department of Social Services — Community Care Licensing Division
          </p>
        </div>
      </div>

      {isProbation && (
        <p className="text-sm text-amber-900 mb-4 leading-relaxed">
          This facility's license is currently <strong>on probation</strong> with the
          California Department of Social Services. Verify the current status on the
          public CCLD facility search before touring.
        </p>
      )}

      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
        {facility.license_number && (
          <div>
            <dt className="text-neutral-500 uppercase tracking-wide text-xs">License #</dt>
            <dd className="font-semibold text-senior-slate mt-0.5">{facility.license_number}</dd>
          </div>
        )}
        {facility.license_type && (
          <div>
            <dt className="text-neutral-500 uppercase tracking-wide text-xs">License type</dt>
            <dd className="font-semibold text-senior-slate mt-0.5">
              {facility.license_type === 'RCFE' ? 'RCFE (Residential Care for the Elderly)' : facility.license_type}
            </dd>
          </div>
        )}
        {facility.license_status && (
          <div>
            <dt className="text-neutral-500 uppercase tracking-wide text-xs">Status</dt>
            <dd className={`font-semibold mt-0.5 ${isProbation ? 'text-amber-800' : isCurrent ? 'text-teal-700' : 'text-senior-slate'}`}>
              {isProbation ? 'On probation' : isCurrent ? 'Current' : facility.license_status}
            </dd>
          </div>
        )}
        {dateLabel && (
          <div>
            <dt className="text-neutral-500 uppercase tracking-wide text-xs">Licensed since</dt>
            <dd className="font-semibold text-senior-slate mt-0.5">{dateLabel}</dd>
          </div>
        )}
        {Number.isFinite(facility.capacity) && (
          <div>
            <dt className="text-neutral-500 uppercase tracking-wide text-xs">Licensed capacity</dt>
            <dd className="font-semibold text-senior-slate mt-0.5">{facility.capacity} residents</dd>
          </div>
        )}
        {facility.county && (
          <div>
            <dt className="text-neutral-500 uppercase tracking-wide text-xs">County</dt>
            <dd className="font-semibold text-senior-slate mt-0.5">{facility.county}</dd>
          </div>
        )}
      </dl>

      <a
        href={cldUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-teal-700 hover:text-teal-800"
      >
        View CCLD record
        <ExternalLink size={14} aria-hidden="true" />
      </a>
    </div>
  );
};

export default LocationDetail;
