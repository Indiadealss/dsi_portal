import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import { ChevronUp, ChevronDown } from "lucide-react";
import { useRef } from "react";

import "swiper/css";

const slides = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  "https://images.unsplash.com/photo-1493246507139-91e8fad9978e",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
];

export default function Testimonisecc() {
  const swiperRef = useRef(null);

  return (
    <div className="h-screen  flex justify-center items-center relative">
      
      {/* PREV BUTTON */}
      <button
        onClick={() => swiperRef.current?.slidePrev()}
        className="absolute top-10 z-40 bg-white/10 backdrop-blur-md border border-white/20
        hover:bg-white/20 transition-all duration-300
        w-14 h-14 rounded-full flex items-center justify-center"
      >
        <ChevronUp className="text-white" size={28} />
      </button>

      {/* NEXT BUTTON */}
      <button
        onClick={() => swiperRef.current?.slideNext()}
        className="absolute bottom-10 z-40 bg-white/10 backdrop-blur-md border border-white/20
        hover:bg-white/20 transition-all duration-300
        w-14 h-14 rounded-full flex items-center justify-center"
      >
        <ChevronDown className="text-white" size={28} />
      </button>

      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        direction="vertical"
        slidesPerView={3}
        centeredSlides={true}
        spaceBetween={1}
        mousewheel={true}
        modules={[Mousewheel]}
        className="h-[600px] w-[200px]"
      >
        {slides.map((img, index) => (
          <SwiperSlide key={index}>
            {({ isActive }) => (
              <div
                className={`transition-all duration-500 overflow-hidden
                ${
                  isActive
                    ? "scale-100 opacity-100 h-[220px]"
                    : "scale-75 opacity-30 h-[220px]"
                }`}
              >
                <img
                  src={img}
                  alt=""
                  className="w-full h-full object-cover rounded-[32px]"
                />
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}