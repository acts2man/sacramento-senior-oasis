
import Hero from '../components/Hero';
import FeaturedLocations from '../components/FeaturedLocations';
import CareTypes from '../components/CareTypes';
import LocationAreas from '../components/LocationAreas';
import SEOContent from '../components/SEOContent';
import CareRecommendationsSection from '../components/CareRecommendationsSection';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import TrustedCareSection from '../components/TrustedCareSection';
import CareImageShowcase from '../components/CareImageShowcase';
import { generatePageSEO } from '../utils/seoUtils';
import { SITE_URL } from '../lib/constants';

const Index = () => {
  const seoData = generatePageSEO('home');
  
  return (
    <div className="flex flex-col min-h-screen">
      <SEO 
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
        canonical={SITE_URL}
      />
      
      <Header />
      <main className="flex-grow">
        <Hero />
        <TrustedCareSection />
        <CareImageShowcase />
        <FeaturedLocations />
        <CareTypes />
        <LocationAreas />
        <SEOContent />
        <CareRecommendationsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
