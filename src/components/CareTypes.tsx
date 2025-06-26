
import { Heart, Brain, Home, Stethoscope } from 'lucide-react';
import { getCareTypes } from '../data/locations';

const CareTypes = () => {
  const careTypes = getCareTypes();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'users':
        return <Heart size={40} className="text-senior-blue group-hover:text-white transition-colors duration-500" />;
      case 'brain':
        return <Brain size={40} className="text-senior-blue group-hover:text-white transition-colors duration-500" />;
      case 'home':
        return <Home size={40} className="text-senior-blue group-hover:text-white transition-colors duration-500" />;
      case 'stethoscope':
        return <Stethoscope size={40} className="text-senior-blue group-hover:text-white transition-colors duration-500" />;
      default:
        return <Heart size={40} className="text-senior-blue group-hover:text-white transition-colors duration-500" />;
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-white via-senior-light/30 to-senior-light relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-senior-blue/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-senior-blue/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      <div className="container-custom relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-senior-slate mb-6">
            Types of 
            <span className="block text-senior-blue">Senior Care</span>
          </h2>
          <div className="w-24 h-1 bg-senior-blue rounded-full mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explore different types of senior care communities to find the right fit for your loved one's needs.
          </p>
        </div>

        {/* Family moments showcase */}
        <div className="flex justify-center mb-12 space-x-8 animate-fade-in delay-300">
          <div className="relative group">
            <div className="absolute inset-0 bg-senior-blue/10 rounded-full transform rotate-3 group-hover:rotate-6 transition-transform duration-300"></div>
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl group-hover:shadow-2xl transition-all duration-300">
              <img 
                src="/lovable-uploads/b28a71c0-2565-452f-80d2-878420b86d78.png" 
                alt="Grandmother sharing precious moments with grandchildren"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded-full shadow-md">
              <p className="text-xs text-gray-600 font-medium whitespace-nowrap">Family Bonds</p>
            </div>
          </div>
          
          <div className="relative group">
            <div className="absolute inset-0 bg-senior-blue/10 rounded-full transform -rotate-3 group-hover:-rotate-6 transition-transform duration-300"></div>
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl group-hover:shadow-2xl transition-all duration-300">
              <img 
                src="/lovable-uploads/51175d6d-e88c-4566-bd9c-58edb8bd9318.png" 
                alt="Happy seniors enjoying life together"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded-full shadow-md">
              <p className="text-xs text-gray-600 font-medium whitespace-nowrap">Joyful Living</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {careTypes.map((type, index) => (
            <div 
              key={type.id} 
              className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 animate-fade-in relative overflow-hidden"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-senior-blue/5 to-senior-blue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="mb-6 flex justify-center transform group-hover:scale-110 transition-transform duration-500">
                  <div className="bg-senior-light group-hover:bg-senior-blue rounded-full p-4 transition-all duration-500">
                    {getIcon(type.icon)}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-senior-slate mb-4 group-hover:text-senior-blue transition-colors duration-300 text-center">
                  {type.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-center group-hover:text-gray-700 transition-colors duration-300">
                  {type.description}
                </p>
              </div>
              
              {/* Animated border */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-senior-blue/20 transition-all duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CareTypes;
