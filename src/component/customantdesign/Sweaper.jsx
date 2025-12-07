import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { FaLongArrowAltRight } from "react-icons/fa";
import { getLocalAdvantages } from "../../api/api";
import { icon } from "@fortawesome/fontawesome-svg-core";

export default function NearbySlide({ data }) {

  const swiperRef = useRef(null);

  const parsed = data.map(item => JSON.parse(item));

   const [icons, setIcons] = useState({}); // store icon results

   // console.log(icons);
   

  useEffect(() => {
    const fetchIcons = async () => {
      const iconMap = {};

      for (const item of parsed) {
        try {
          const res = await getLocalAdvantages(item.type);

          // console.log(res?.data?.data[0].icon);
          
          // Store result based on type
          iconMap[item.type] = res?.data?.data[0]?.icon || null;
        } catch (error) {
          // console.log("Error fetching icon:", error);
        }
      }

      setIcons(iconMap);
    };

    fetchIcons();
  }, [data]);

  return (
    <div className="w-full relative">

      {/* Custom Navigation Buttons */}
      <button 
        className="absolute top-1/2 right- z-10 -translate-y-1/2 bg-gray-500 text-white p-2 rounded-full shadow-md cursor-pointer"
        onClick={() => swiperRef.current?.slidePrev()}
      >
        <FaLongArrowAltRight className="rotate-180" />
      </button>

      <button 
        className="absolute top-1/2 right-2 z-10 -translate-y-1/2 bg-gray-500 text-white p-2 rounded-full shadow-md cursor-pointer"
        onClick={() => swiperRef.current?.slideNext()}
      >
        <FaLongArrowAltRight />
      </button>

      {/* Slider */}

      <div className="mx-6">
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        spaceBetween={15}
        slidesPerView={2}
        breakpoints={{
          320: { slidesPerView: 1.2 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 2.2 },
        }}
        className="px-2"
      >
        {parsed.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="rounded-xl p-4 flex items-center gap-3 border border-gray-100 transition bg-white">
              
              <img
                src={icons[item.type] || "/placeholder-icon.png"} 
                alt={item.name}
                className="w-10 h-10 object-contain"
              />

              <div>
                <p className="font-medium text-gray-900">{item.propertyName}</p>
                <p className="text-sm text-gray-500">{item.distance}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      </div>
    </div>
  );
}
