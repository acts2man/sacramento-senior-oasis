
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
    <section className="py-16 bg-senior-light">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-senior-slate mb-4">
            Experience Quality Senior Living
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover what makes our communities special - from compassionate care to vibrant social activities, 
            we create environments where seniors thrive.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <Carousel 
            className="w-full" 
            autoPlay={true} 
            autoPlayInterval={4000}
          >
            <CarouselContent>
              {careImages.map((image, index) => (
                <CarouselItem key={index}>
                  <Card className="border-0 shadow-lg overflow-hidden">
                    <CardContent className="p-0">
                      <div className="grid md:grid-cols-2 gap-0 items-center min-h-[400px]">
                        <div className="relative h-full min-h-[300px] md:min-h-[400px]">
                          <img
                            src={image.src}
                            alt={image.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-8 md:p-12 bg-white h-full flex flex-col justify-center">
                          <h3 className="text-2xl font-bold text-senior-slate mb-4">
                            {image.title}
                          </h3>
                          <p className="text-lg text-gray-600 leading-relaxed mb-6">
                            {image.description}
                          </p>
                          <div className="flex items-center text-senior-blue font-medium">
                            <span>Learn more about our approach</span>
                            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default CareImageShowcase;
