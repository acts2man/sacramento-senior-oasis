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
    <section className="py-16 bg-gradient-to-br from-senior-light to-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-senior-slate mb-4">
            Types of Senior Care
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find the perfect level of care and support for your loved one's unique needs
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
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
