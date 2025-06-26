
import { Heart, Brain, Home, Stethoscope } from 'lucide-react';
import { getCareTypes } from '../data/locations';

const CareTypes = () => {
  const careTypes = getCareTypes();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'users':
        return <Heart size={40} className="text-senior-blue" />;
      case 'brain':
        return <Brain size={40} className="text-senior-blue" />;
      case 'home':
        return <Home size={40} className="text-senior-blue" />;
      case 'stethoscope':
        return <Stethoscope size={40} className="text-senior-blue" />;
      default:
        return <Heart size={40} className="text-senior-blue" />;
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
                    <div className="group-hover:text-white transition-colors duration-500">
                      {getIcon(type.icon)}
                    </div>
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
