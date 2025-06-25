
const TrustedCareSection = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold text-senior-slate mb-6">
              Trusted Senior Care in Sacramento
            </h2>
            <p className="text-lg text-gray-600">
              Sacramento Senior Care helps families find the right senior living community across the greater Sacramento area. 
              Whether you're looking for assisted living, memory care, or independent living options, we provide comprehensive 
              information to help you make informed decisions about your loved one's care.
            </p>
          </div>
          <div className="relative">
            <img
              src="/lovable-uploads/0648345f-b2f0-420b-a162-b1e333ad4349.png"
              alt="Sacramento cityscape with modern architecture"
              className="w-full h-auto rounded-lg shadow-lg object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedCareSection;
