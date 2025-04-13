
import { useEffect } from 'react';
import { MapPin } from 'lucide-react';

interface MapProps {
  lat: number;
  lng: number;
  name: string;
  address: string;
}

const Map = ({ lat, lng, name, address }: MapProps) => {
  useEffect(() => {
    // Here we would normally initialize a map like Google Maps or Mapbox
    // Since we're creating a mockup without API keys, we'll just create a placeholder
    console.log("Map would be initialized with coordinates:", { lat, lng });
  }, [lat, lng]);

  return (
    <div className="rounded-lg overflow-hidden shadow-md">
      <div className="relative bg-gray-200 h-64 flex items-center justify-center">
        {/* This is a placeholder for where the actual map would appear */}
        <div className="text-center p-6">
          <MapPin size={40} className="text-senior-blue mx-auto mb-2" />
          <h3 className="text-xl font-semibold text-senior-slate">{name}</h3>
          <p className="text-gray-600">{address}</p>
          <p className="mt-3 text-sm text-gray-500">
            Map view would display here with interactive features
          </p>
        </div>
      </div>
      <div className="bg-white p-4">
        <h3 className="font-bold text-senior-slate mb-1">Location Details</h3>
        <p className="text-gray-600 text-sm">
          <span className="font-medium">Address:</span> {address}
        </p>
        <p className="text-gray-600 text-sm">
          <span className="font-medium">Coordinates:</span> {lat.toFixed(4)}, {lng.toFixed(4)}
        </p>
        <div className="mt-2">
          <a 
            href={`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-senior-blue hover:text-senior-teal text-sm font-medium"
          >
            Get Directions
          </a>
        </div>
      </div>
    </div>
  );
};

export default Map;
