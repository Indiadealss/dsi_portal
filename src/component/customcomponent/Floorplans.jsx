import React, { useEffect, useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Leadgentaionform from "./Leadgentaionform";

const swiperStyles = `
.swiper-button-next,
.swiper-button-prev {
  top: 50% !important;
  transform: translateY(-50%);
}
`;

const FloorPlanSlider = ({ layoutData, propertys }) => {
   const bhkTypes = useMemo(() => Object.keys(layoutData || {}), [layoutData]);
  const defaultBhk = bhkTypes[0] || "";

  const [activeBhk, setActiveBhk] = useState(defaultBhk);
  const [leadModel, setLeadModel] = useState(false);

  useEffect(() => {
    if (bhkTypes.length > 0 && !bhkTypes.includes(activeBhk)) {
      setActiveBhk(bhkTypes[0]);
    }
  }, [bhkTypes, activeBhk]);

  if (!layoutData || !propertys || bhkTypes.length === 0) {
    return (
      <div className='my-3'>
        <p>Loading...</p>
      </div>
    )
  }
  
    // ✅ Clean tab names
  const formatTabName = (name) => {
    return name
      .replace("TOWN HOUSE", "Townhouse")
      .replace("LOWER FLOOR", "Lower")
      .replace("UPPER FLOOR", "Upper")
      .replace("SKY VILLA", "Sky Villa")
      .replace("DUPLEX", "Duplex");
  };


  const formatPrice = (value) => {
    const numberValue = Number(value);
    if (Number.isNaN(numberValue)) return "N/A";
    if (numberValue >= 10000000) return (numberValue / 10000000).toFixed(2) + " Cr";
    return (numberValue / 100000).toFixed(2) + " L";
  };

  const formatArea = (value) => {
    console.log(value,'value ai');
    
    const numberValue = Number(value);
    if (Number.isNaN(numberValue)) return "N/A";
    return numberValue.toLocaleString();
  };

  const leadGenration = () => {
    setLeadModel(true);
  }


  return (
    <div className={propertys.property === "commercial" ? "hidden" : "p-4"}>
      <style>{swiperStyles}</style>

      {/* Heading */}
      <h2 className="text-2xl font-semibold mb-4">
        Floor Plans <span className="text-gray-500">& Pricing</span>
      </h2>

      {/* ✅ Clean Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4 no-scrollbar">
        {bhkTypes.map((bhk) => (
          <button
            key={bhk}
            onClick={() => setActiveBhk(bhk)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition ${
              activeBhk === bhk
                ? "bg-blue-600 text-white shadow"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {formatTabName(bhk)}
          </button>
        ))}
      </div>

      {/* Count */}
      <p className="text-gray-400 mb-4">
        {(layoutData[activeBhk] || []).length} Floor Plans Available
      </p>

      {/* Slider */}
      <Swiper
        modules={[Pagination, Navigation]}
        spaceBetween={16}
        slidesPerView={1}
        navigation={true}
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 2 },
          1280: { slidesPerView: 3 },
        }}
      >
        {(layoutData[activeBhk] || []).map((item, index) => (
          <SwiperSlide key={index}>
            <div className="p-2">
              <div className="border rounded-2xl p-4 bg-white hover:shadow-xl transition-all duration-300">

                {/* Area */}
                <p className="font-semibold text-lg">
                  {formatArea(item.areaSqft)} sq.ft.
                  <span className="text-gray-500 text-sm">
                    {" "}
                    ({formatArea(item.areaSqm)} sq.m.)
                  </span>
                </p>

                <p className="text-sm text-gray-500 mb-2">
                  Super Built-up Area | {item.bhk}
                </p>

                {/* Image */}
                <img
                  src={item.image}
                  className="w-full h-44 object-cover rounded-lg my-3"
                  alt="floor plan"
                />

                {/* Price */}
                <p className="font-bold text-xl text-gray-800">
                  ₹ {formatPrice(item.price)}
                </p>

                {/* Status */}
                <div className="flex bg-gray-100 p-3 rounded-lg mt-3 text-gray-600 text-sm">
                  <p>{item.status}</p>
                  <p className="font-semibold">
                    {item.possession} possession
                  </p>
                </div>

                <div className="mt-4 text-blue-600 font-semibold cursor-pointer flex justify-between items-center" onClick={leadGenration}>
                  Request callback <span className="text-2xl ms-2" >📞</span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Modal */}
      {leadModel && (
        <Leadgentaionform setLeadModel={setLeadModel} />
      )}
    </div>
  );
};

export default FloorPlanSlider;