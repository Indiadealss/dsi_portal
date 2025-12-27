import React, { useState } from "react";
import Slider from "react-slick";
import Leadgentaionform from "./Leadgentaionform";

const FloorPlanSlider = ({ layoutData,propertys }) => {
  const bhkTypes = Object.keys(layoutData);
  const [activeBhk, setActiveBhk] = useState(bhkTypes[0] || "");
  const [leadModel, setLeadModel] = useState(false);

  console.log(propertys,"propertys project");
  

  console.log(layoutData);
  


  const formatPrice = (value) => {
    if (value >= 10000000) return (value / 10000000).toFixed(2) + " Cr";
    return (value / 100000).toFixed(2) + " L";
  };

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } }
    ]
  };

  const leadGenration = () => {
    setLeadModel(true);
    setOpen(false);
  }

  return (
    <div className={propertys.property === 'commercial' ? 'hidden' :'p-4'}>
      <h2 className="text-xl font-bold mb-3">Floor Plans <span className={propertys.property === 'commercial' ?  'hidden' : ''}> & Pricing </span></h2>

      {/* Tabs */}
      <div className="flex gap-3 mb-5">
        {bhkTypes.map((bhk) => (
          <button
            key={bhk}
            onClick={() => setActiveBhk(bhk)}
            className={`px-4 py-2 rounded-lg font-medium ${
              activeBhk === bhk
                ? "bg-blue-100 text-blue-700 border border-blue-400"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            {bhk} Layout
          </button>
        ))}
      </div>

      <p className="text-gray-400 mb-3">
        {(layoutData[activeBhk] || []).length} Floor Plans Available
      </p>

      {/* Slider */}
      <Slider {...sliderSettings}>
        {(layoutData[activeBhk] || []).map((item, index) => (
          <div key={index} className="p-3">
            <div className="border rounded-xl shadow-sm p-3 hover:shadow-lg transition">

              {/* Area */}
              <p className="font-bold text-lg">
                {item.areaSqft} sq.ft.
                <span className="text-gray-500 text-sm"> ({item.areaSqm} sq.m.)</span>
              </p>
              <p className="text-sm text-gray-500">
                Super Built-up Area | {item.bhk}
              </p>

              {/* Image */}
              <img
                src={item.image}
                className="w-full h-40 object-cover my-4 rounded"
                alt="floor plan"
              />

              {/* Price */}
              <p className="font-bold text-xl">₹ {formatPrice(item.price)}</p>

              {/* Status */}
              <div className="bg-gray-100 p-2 rounded mt-3 text-gray-600 text-sm">
                <p>{item.status}</p>
                <p className="font-semibold">{item.possession} possession</p>
              </div>

              {/* Callback */}
              <div className="mt-4 text-blue-600 font-semibold cursor-pointer flex justify-between items-center" onClick={leadGenration}>
                Request callback <span className="text-2xl ms-2" >📞</span>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* Lead Modal */}
      {leadModel && (
        <div>
          <Leadgentaionform setLeadModel={setLeadModel} />
        </div>
      )}
    </div>
  );
};

export default FloorPlanSlider;
