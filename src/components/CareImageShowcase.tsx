
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Card, CardContent } from './ui/card';

const CareImageShowcase = () => {
  const careImages = [
    {
      src: '/lovable-uploads/e4abdb28-03b2-4311-bb3b-af17c8ca4c97.png',
      title: 'Compassionate Care',
      description: 'Our dedicated caregivers provide personalized attention and support in comfortable, home-like settings.'
    },
    {
      src: '/lovable-uploads/8c07c0a4-e341-44d3-9edb-bcd75cdcb2c2.png',
      title: 'Social Engagement',
      description: 'Vibrant community life with meaningful activities and friendships that enrich daily living.'
    },
    {
      src: '/lovable-uploads/f79813c8-4a62-48a4-9b7d-05c7a2e90a7b.png',
      title: 'Active Living',
      description: 'Engaging activities and programs designed to promote mental stimulation and social connection.'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-senior-blue via-senior-blue to-senior-slate relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-senior-orange/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Experience Quality 
            <span className="block text-white">
              Senior Living
            </span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-senior-orange to-senior-sand rounded-full mx-auto mb-6"></div>
          <p className="text-xl text-white/90 max-w-4xl mx-auto leading-relaxed">
            Discover what makes our communities special - from compassionate care to vibrant social activities, 
            we create environments where seniors thrive.
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto animate-fade-in delay-300">
          <Carousel 
            className="w-full" 
            autoPlay={true} 
            autoPlayInterval={4000}
          >
            <CarouselContent>
              {careImages.map((image, index) => (
                <CarouselItem key={index}>
                  <Card className="border-0 shadow-2xl overflow-hidden backdrop-blur-sm bg-white/95 hover:bg-white transition-all duration-500 transform hover:scale-105">
                    <CardContent className="p-0">
                      <div className="grid md:grid-cols-2 gap-0 items-center min-h-[500px]">
                        <div className="relative h-full min-h-[400px] md:min-h-[500px] group overflow-hidden">
                          <img
                            src={image.src}
                            alt={image.title}
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <div className="p-8 md:p-12 bg-white h-full flex flex-col justify-center space-y-6">
                          <h3 className="text-3xl font-bold text-senior-slate leading-tight">
                            {image.title}
                          </h3>
                          <div className="w-16 h-1 bg-gradient-to-r from-senior-blue to-senior-orange rounded-full"></div>
                          <p className="text-lg text-gray-600 leading-relaxed">
                            {image.description}
                          </p>
                          <div className="flex items-center text-senior-blue font-medium hover:text-senior-orange transition-colors cursor-pointer group">
                            <span>Learn more about our approach</span>
                            <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4 bg-white/90 hover:bg-white border-0 shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300" />
            <CarouselNext className="right-4 bg-white/90 hover:bg-white border-0 shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default CareImageShowcase;
