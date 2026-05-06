import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { generatePageSEO } from '../utils/seoUtils';
import { SITE_URL } from '../lib/constants';
import { Heart, Users, Star, Shield } from 'lucide-react';
import JsonLd from '../components/JsonLd';
import { buildArticleSchema, buildBreadcrumbSchema } from '../lib/schema';

// Static page; treat the publish date as the time the About copy was last
// touched. Update both fields when the About copy is rewritten.
const ABOUT_PUBLISHED = '2026-05-06';
const ABOUT_MODIFIED = '2026-05-06';

const About = () => {
  const seoData = generatePageSEO('about');

  return (
    <div className="flex flex-col min-h-screen">
      <SEO
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
        canonical={`${SITE_URL}/about`}
      />
      <JsonLd
        data={buildArticleSchema({
          headline: seoData.title,
          description: seoData.description,
          url: '/about',
          datePublished: ABOUT_PUBLISHED,
          dateModified: ABOUT_MODIFIED,
        })}
      />
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'About', url: '/about' },
        ])}
      />

      <Header />
      
      <main className="flex-grow bg-gray-50">
        <div className="container-custom py-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-senior-slate mb-6">
              About Sacramento Senior Living Directory
            </h1>
            <p className="text-gray-600 text-lg mb-8">
              Welcome to Sacramento Senior Living Directory, your trusted resource for finding the perfect senior living community in the Sacramento area. We understand that choosing the right care option for yourself or your loved one can be a challenging and emotional process. That's why we're here to provide you with comprehensive information, expert guidance, and personalized support every step of the way.
            </p>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-senior-slate mb-4">
                Our Mission
              </h2>
              <p className="text-gray-600 text-lg">
                Our mission is to empower seniors and their families to make informed decisions about senior living options. We strive to connect you with communities that offer the highest quality care, enriching activities, and a supportive environment where seniors can thrive.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-senior-slate mb-4">
                What We Offer
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <Heart size={24} className="text-senior-blue mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-senior-slate mb-1">Comprehensive Directory</h3>
                    <p className="text-gray-600">
                      Explore our extensive directory of senior living communities in Sacramento, featuring detailed information on services, amenities, pricing, and more.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Users size={24} className="text-senior-blue mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-senior-slate mb-1">Expert Guidance</h3>
                    <p className="text-gray-600">
                      Our team of experienced senior care advisors is here to answer your questions, provide personalized recommendations, and guide you through the selection process.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Star size={24} className="text-senior-blue mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-senior-slate mb-1">Trusted Resources</h3>
                    <p className="text-gray-600">
                      Access valuable resources, articles, and tools to help you understand the different types of senior care, navigate financial considerations, and make informed decisions.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Shield size={24} className="text-senior-blue mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-senior-slate mb-1">Commitment to Quality</h3>
                    <p className="text-gray-600">
                      We are committed to connecting you with senior living communities that meet the highest standards of care, safety, and resident satisfaction.
                    </p>
                  </div>
                </div>
              </div>
            </section>
            
            <section className="mt-12">
              <h2 className="text-2xl font-bold text-senior-slate mb-4">
                Contact Us
              </h2>
              <p className="text-gray-600 text-lg">
                If you have any questions or would like to speak with a senior care advisor, please don't hesitate to contact us. We're here to help!
              </p>
              <a href="/contact" className="btn-primary mt-4 inline-block">
                Get in Touch
              </a>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
