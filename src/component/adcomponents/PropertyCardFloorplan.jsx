import React from 'react';

const PropertyCardFloorplan = ({ title, size, features, imageUrl,setCustomEnquiry }) => {
  return (
    <div className="bg-[#1e252b] text-white rounded-xl p-6 shadow-2xl border border-gray-700 min-w-2xl">
      {/* Image Container */}
      <div className="bg-white rounded-lg overflow-hidden mb-6 h-64 flex items-center justify-center">
        <img 
          src={imageUrl} 
          alt={title} 
          className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Text Content */}
      <div className="text-center">
        <h2 className="text-[#c19a6b] text-2xl font-serif uppercase tracking-widest mb-2">
          {title}
        </h2>
        <div className="text-sm space-y-1 text-gray-300">
          <p className="font-semibold">{size}</p>
          <p className="italic text-gray-400">{features}</p>
        </div>

        {/* Action Button */}
        <button onClick={() => setCustomEnquiry(true)} className="mt-8 px-8 py-3 bg-gradient-to-r from-[#7b3f21] to-[#b38b5d] rounded-full font-bold uppercase text-xs tracking-tighter hover:opacity-90 transition-opacity">
          Download Brochure
        </button>
      </div>
    </div>
  );
};

export default PropertyCardFloorplan;