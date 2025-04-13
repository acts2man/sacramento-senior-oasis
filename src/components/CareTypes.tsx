
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
    <section className="py-12 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-senior-slate">Types of Senior Care</h2>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
            Explore different types of senior care communities to find the right fit for your loved one's needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {careTypes.map((type) => (
            <div 
              key={type.id} 
              className="bg-senior-light p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center"
            >
              <div className="mb-4 flex justify-center">
                {getIcon(type.icon)}
              </div>
              <h3 className="text-xl font-bold text-senior-slate mb-2">{type.title}</h3>
              <p className="text-gray-600">{type.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CareTypes;
