import { Mail, MapPin, Heart, Clock } from 'lucide-react';
import InquiryForm from './InquiryForm';

interface CareRecommendationsSectionProps {
  facilityName?: string;
  facilityId?: string;
}

const CareRecommendationsSection = ({
  facilityName,
  facilityId,
}: CareRecommendationsSectionProps = {}) => {
  return (
    <section className="py-20 bg-gradient-to-br from-senior-blue/5 via-white to-senior-light/30 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-senior-blue/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-senior-blue/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }}></div>

      <div className="container-custom relative z-10">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-senior-slate mb-6">
            Get Personalized Care
            <span className="block text-senior-blue">Recommendations</span>
          </h2>
          <div className="w-24 h-1 bg-senior-blue rounded-full mx-auto mb-6"></div>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            Connect with our senior care experts to find the perfect community for your loved one's unique needs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
          <div className="lg:col-span-2 animate-fade-in" style={{ animationDelay: '200ms' }}>
            <InquiryForm
              communityName={facilityName}
              communityId={facilityId}
              heading="Tell us about your needs"
              subheading="Help us match you with the right Sacramento-area community. A local advisor follows up the same day."
            />
          </div>

          <div className="lg:col-span-1 animate-fade-in" style={{ animationDelay: '400ms' }}>
            <div className="bg-gradient-to-br from-senior-blue to-senior-blue/90 rounded-2xl shadow-xl p-8 text-white relative overflow-hidden h-full">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>

              <div className="relative z-10">
                <div className="text-center mb-8">
                  <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                    <Mail size={28} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">
                    Why families work with us
                  </h3>
                  <div className="w-16 h-1 bg-white/30 rounded-full mx-auto"></div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center">
                    <Heart size={16} className="mr-3 text-white/80" />
                    <span className="text-sm">Free expert guidance for families</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin size={16} className="mr-3 text-white/80" />
                    <span className="text-sm">Local Sacramento expertise</span>
                  </div>
                  <div className="flex items-center">
                    <Clock size={16} className="mr-3 text-white/80" />
                    <span className="text-sm">Same-day callbacks, Mon–Fri</span>
                  </div>
                </div>

                <div className="bg-white/10 rounded-xl p-6">
                  <p className="text-sm leading-relaxed opacity-95">
                    <strong className="text-white">Confidential and free.</strong> Our advisors listen first, then shortlist license-verified communities with current availability — never sold, never spammed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareRecommendationsSection;
