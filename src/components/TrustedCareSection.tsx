
const TrustedCareSection = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-white to-senior-light relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-senior-blue/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-senior-blue/5 rounded-full blur-3xl"></div>
      
      <div className="container-custom relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-senior-slate leading-tight">
              Trusted Senior Care 
              <span className="block text-senior-blue">in Sacramento</span>
            </h2>
            <div className="w-24 h-1 bg-senior-blue rounded-full"></div>
            <p className="text-lg text-gray-600 leading-relaxed">Sacramento Senior Care helps families find the right Assisted living community across the greater Sacramento area. Whether you're looking for assisted living, memory care, or independent living options, we provide comprehensive information to help you make informed decisions about your loved one's care.</p>
            
            {/* Family moments showcase */}
            <div className="grid grid-cols-2 gap-4 py-6">
              <div className="relative group">
                <div className="absolute inset-0 bg-senior-blue/10 rounded-xl transform rotate-1 group-hover:rotate-2 transition-transform duration-300"></div>
                <div className="relative bg-white p-3 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <img 
                    src="/lovable-uploads/b28a71c0-2565-452f-80d2-878420b86d78.png" 
                    alt="Grandmother sharing precious moments with grandchildren"
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  <p className="text-xs text-gray-600 mt-2 text-center font-medium">Precious Family Moments</p>
                </div>
              </div>
              
              <div className="relative group">
                <div className="absolute inset-0 bg-senior-blue/10 rounded-xl transform -rotate-1 group-hover:-rotate-2 transition-transform duration-300"></div>
                <div className="relative bg-white p-3 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <img 
                    src="/lovable-uploads/51175d6d-e88c-4566-bd9c-58edb8bd9318.png" 
                    alt="Happy seniors enjoying life together"
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  <p className="text-xs text-gray-600 mt-2 text-center font-medium">Joyful Community Life</p>
                </div>
              </div>
            </div>
            
            <div className="pt-4">
              <div className="inline-flex items-center px-6 py-3 bg-senior-blue text-white rounded-lg hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 cursor-pointer hover:bg-senior-blue/90">
                <span className="font-medium">Explore Communities</span>
                <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
          <div className="relative animate-fade-in delay-300">
            <div className="absolute inset-0 bg-gradient-to-br from-senior-blue/20 to-senior-blue/20 rounded-2xl transform rotate-3"></div>
            <img src="/lovable-uploads/0648345f-b2f0-420b-a162-b1e333ad4349.png" alt="Sacramento cityscape with modern architecture" className="relative w-full h-auto rounded-2xl shadow-2xl object-cover transform hover:scale-105 transition-transform duration-500" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedCareSection;
