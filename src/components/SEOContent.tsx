
const SEOContent = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          {/* Main SEO Content */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-senior-slate mb-6">
              Trusted Senior Care in Sacramento
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Sacramento Senior Care helps families find the right senior living community across the greater Sacramento area. 
              Whether you're looking for assisted living, memory care, or independent living options, we provide comprehensive 
              information to help you make informed decisions about your loved one's care.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              Our directory features communities throughout Sacramento County, from downtown locations to suburban neighborhoods 
              like Carmichael, Elk Grove, and Natomas. Each listing includes detailed information about services, amenities, 
              and pricing to help you compare your options.
            </p>
          </div>

          {/* Location-Specific Content */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-senior-slate mb-6">
              Senior Living Communities Across Sacramento
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              From urban settings in Midtown to family-friendly neighborhoods in Elk Grove, Sacramento offers diverse 
              senior living options. Our platform helps you explore communities that match your preferences for location, 
              care level, and lifestyle amenities.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              Whether you're considering communities in established areas like Carmichael or newer developments in Natomas, 
              we provide transparent information about costs and services to help you plan with confidence.
            </p>
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
