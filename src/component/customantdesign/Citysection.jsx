import React from 'react';
import GraterNoida from '../../Images/Greaternoida.jpg';
import Noida from '../../Images/Noida.jpg';
import Delhi from '../../Images/Delhi.jpg';
import Gurgaon from '../../Images/Gurgoan.jpg';

const CitySection = () => {
  const cities = [
    {
      name: "Greater Noida",
      description: "Premium investments & developments.",
      image: GraterNoida
    },
    {
      name: "Noida",
      description: "Modern living with excellent connectivity",
      image: Noida
    },
    {
      name: "Delhi",
      description: "Prime locations in the capital city",
      image: Delhi
    },
    {
      name: "Gurgaon",
      description: "Luxury living & corporate hubs",
      image: Gurgaon
    }
  ];

  return (
    <div className="my-[100px]">
      <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cities.map((city, index) => (
          <div 
            key={index} 
            className="group relative h-64 w-full overflow-hidden rounded-xl shadow-lg cursor-pointer bg-white border-[6px] border-white"
          >
            {/* Background Image */}
            <img
              src={city.image}
              alt={city.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Content Bottom-Left */}
            <div className="absolute bottom-0 left-0 p-5 text-white">
              <span className="text-lg font-bold tracking-wide">
                {city.name}
              </span>
              <p className="text-xs font-light opacity-90 mt-1 leading-relaxed">
                {city.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CitySection;