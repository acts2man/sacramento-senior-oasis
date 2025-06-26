const SEOContent = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          {/* Location-Specific Content */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-senior-slate mb-6">
              Senior Living Communities Across Sacramento
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 items-center mb-6">
              <div>
                <p className="text-lg text-gray-600 mb-4">
                  From urban settings in Midtown to family-friendly neighborhoods in Elk Grove, Sacramento offers diverse 
                  senior living options. Our platform helps you explore communities that match your preferences for location, 
                  care level, and lifestyle amenities.
                </p>
              </div>
              <div className="flex justify-center">
                <img 
                  src="/lovable-uploads/b28a71c0-2565-452f-80d2-878420b86d78.png" 
                  alt="Happy family spending quality time together" 
                  className="w-48 h-48 rounded-full object-cover shadow-lg"
                />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="flex justify-center md:order-first">
                <img 
                  src="/lovable-uploads/51175d6d-e88c-4566-bd9c-58edb8bd9318.png" 
                  alt="Multi-generational family enjoying time together" 
                  className="w-48 h-48 rounded-full object-cover shadow-lg"
                />
              </div>
              <div>
                <p className="text-lg text-gray-600 mb-8">
                  Whether you're considering communities in established areas like Carmichael or newer developments in Natomas, 
                  we provide transparent information about costs and services to help you plan with confidence.
                </p>
              </div>
            </div>
          </div>

          {/* Specialized Care Content */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-senior-slate mb-6">
              Specialized Care for Every Need
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Many seniors require specialized care services, from memory support for those with Alzheimer's or dementia 
              to skilled nursing for complex medical needs. Our directory includes communities that specialize in various 
              levels of care, ensuring you can find the right fit for your loved one's specific requirements.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              We feature everything from intimate board and care homes to full-service retirement communities with 
              comprehensive health services. Each listing clearly outlines the types of care provided and any specialized 
              programs available.
            </p>
          </div>

          {/* Cost & Comparison Content */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-senior-slate mb-6">
              Compare Communities and Services
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Making the right choice means having access to clear, comprehensive information. Our platform helps you compare:
            </p>
            <ul className="text-lg text-gray-600 mb-8 space-y-3">
              <li className="flex items-start">
                <span className="text-senior-blue mr-2">•</span>
                Monthly costs and what's included in base pricing
              </li>
              <li className="flex items-start">
                <span className="text-senior-blue mr-2">•</span>
                Available amenities and community features
              </li>
              <li className="flex items-start">
                <span className="text-senior-blue mr-2">•</span>
                Care services and support levels offered
              </li>
              <li className="flex items-start">
                <span className="text-senior-blue mr-2">•</span>
                Location advantages and nearby resources
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SEOContent;
