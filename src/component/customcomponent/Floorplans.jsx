import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Leadgentaionform from "./Leadgentaionform";

const FloorPlanSlider = ({ layoutData,propertys }) => {
  const bhkTypes = Object.keys(layoutData || {});

  if (!layoutData || !propertys || bhkTypes.length === 0) {
    return (
      <div className='my-3'>
        <p>Loading...</p>
      </div>
    )
  }

  const [activeBhk, setActiveBhk] = useState(bhkTypes[0]);
  const [leadModel, setLeadModel] = useState(false);

  useEffect(() => {
    if (bhkTypes.length > 0 && !bhkTypes.includes(activeBhk)) {
      setActiveBhk(bhkTypes[0]);
    }
  }, [layoutData, activeBhk, bhkTypes]);
  


  const formatPrice = (value) => {
    if (value >= 10000000) return (value / 10000000).toFixed(2) + " Cr";
    return (value / 100000).toFixed(2) + " L";
  };

  const leadGenration = () => {
    setLeadModel(true);
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
      <Swiper
        modules={[Pagination]}
        spaceBetween={16}
        slidesPerView={1}
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 1 },
          1024: { slidesPerView: Math.min(2, (layoutData[activeBhk] || []).length || 1) },
          1280: { slidesPerView: Math.min(3, (layoutData[activeBhk] || []).length || 1) },
        }}
      >
        {(layoutData[activeBhk] || []).map((item, index) => (
          <SwiperSlide key={index}>
            <div className="p-3">
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
          </SwiperSlide>
        ))}
      </Swiper>

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
