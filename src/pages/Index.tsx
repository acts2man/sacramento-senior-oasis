
import Hero from '../components/Hero';
import FeaturedLocations from '../components/FeaturedLocations';
import CareTypes from '../components/CareTypes';
import LocationAreas from '../components/LocationAreas';
import SEOContent from '../components/SEOContent';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { generatePageSEO } from '../utils/seoUtils';

const Index = () => {
  const seoData = generatePageSEO('home');
  
  return (
    <div className="flex flex-col min-h-screen">
      <SEO 
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
        canonical="https://sacramentoseniorcare.com"
      />
      
      <Header />
      <main className="flex-grow">
        <Hero />
        <FeaturedLocations />
        <CareTypes />
        <LocationAreas />
        <SEOContent />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
