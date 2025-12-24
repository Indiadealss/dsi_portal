import React, { useEffect, useState } from "react";

const BhkCards = ({ data = [] }) => {
  const formatPrice = (value) => {
    value = Number(value);
    if (value >= 10000000) {
      return (value / 10000000).toFixed(2) + " Cr";
    } else {
      return (value / 100000).toFixed(2) + " L";
    }
  };

  const [unitData, setUnitData] = useState([]);

  useEffect(() => {
    if (!Array.isArray(data)) return;

    // ✅ Parse string JSON into objects
    const parsed = data.map((item) => {
      const obj = typeof item === "string" ? JSON.parse(item) : item;

      return {
        bhk: obj.specs.bhk,
        areaMin: obj.specs.areaMin,
        areaMax: obj.specs.areaMax,
        priceMin: Number(obj.specs.priceMin),
        priceMax: Number(obj.specs.priceMax),
      };
    });

    setUnitData(parsed);
  }, []); // ✅ Correct dependency

  console.log(unitData);
  

  return (
    <div className="flex md:gap-4 flex-col md:flex-row">
      {unitData.map((item, index) => (
        <div
          key={index}
          className="shadow-md my-3 rounded-xl w-74 "
        >
          <h2 className=" font-bold text-blue-700 bg-[#F5F6FF] px-4 rounded-t-xl">
            <span className="text-lg">{item.bhk} Apartment</span>
          </h2>
        <div className="px-4">
          <p ><span className="text-xs text-gray-500 mt-2">Super Built-up Area</span></p>
          <p className="font-semibold text-gray-800">
            <span className="text-sm text-gray-800 mt-2">{item.areaMin} - {item.areaMax}</span>
          </p>

          <p ><span className="text-lg font-bold text-gray-800 mt-4">
            ₹ {formatPrice(item.priceMin)} - {formatPrice(item.priceMax)}
            <span className="text-blue-500 text-sm ml-1 cursor-pointer">
              + Charges 
            </span>
          </span></p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BhkCards;
