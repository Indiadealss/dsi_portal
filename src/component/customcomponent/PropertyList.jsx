import React, { useRef } from "react";
import ProjectsCrousal from "./ProjectsCrousal";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { FaAngleRight } from "react-icons/fa6";

import "swiper/css";
import "swiper/css/navigation";
import { FaAngleLeft } from "react-icons/fa6";

const PropertyList = ({ properties }) => {
    const swiperRef = useRef(null);

    const newCards = properties.map((item) => {
        const covers = item.images?.filter(img => img.type === "cover") ?? [];
        const coverImages = covers.length
            ? covers
            : item.images?.filter(img => img.type === "banner") ?? [];

        const coverSrc =
            coverImages.length > 0
                ? coverImages[0].src
                : "https://indiadealss.s3.eu-north-1.amazonaws.com/indiadealss/noImageBg.svg";

        return {
            img: coverSrc,
            label: item.title,
            location: item.location,
            city: item.city,
            devloper: item.devloper,
            property: item.property,
            npxid: item.npxid,
        };
    });

    return (
        <div className="px-0 pe-3 md:px-6 lg:px-10 py-6 relative">
            <div className="my-10">
            <h1 className="uppercase"><span className="tracking-wider text-4xl">RECENT Projects</span></h1>
            <span className="uppercase text-sm text-gray-400 pt-3 font-bold">find your dream project in your city</span>
            </div>
            {/* LEFT BUTTON */}
            <button
                onClick={() => swiperRef.current?.slidePrev()}
                className="hidden md:block absolute left-2 top-1/2 -translate-y-1/2 z-10 cursor-pointer"
            >
                <div className="w-12 h-12 flex items-center justify-center
  bg-transparent text-black
  hover:bg-[#84cc16] hover:text-white
  transition-all duration-300
  [clip-path:polygon(0%_0%,80%_0%,100%_100%,20%_100%)]">

                    <FaAngleLeft />
                </div>
            </button>

            {/* RIGHT BUTTON */}
            <button
                onClick={() => swiperRef.current?.slideNext()}
                className="hidden md:block absolute right-2 top-1/2 -translate-y-1/2 z-10 cursor-pointer"
            >
                <div className="w-12 h-12 flex items-center justify-center 
  bg-transparent text-black
  hover:bg-[#84cc16] hover:text-white
  transition-all duration-300
  [clip-path:polygon(20%_0%,100%_0%,80%_100%,0%_100%)]">

                    <FaAngleRight />
                </div>
            </button>

            {/* SWIPER */}
            <Swiper
                modules={[Navigation]}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                loop={true}
                spaceBetween={20}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                breakpoints={{
                    320: { slidesPerView: 1 },
                    640: { slidesPerView: 2 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 2 },
                    1280: { slidesPerView: 3 },
                }}
            >
                {newCards.map((item, index) => (
                    <SwiperSlide key={index}>
                        <ProjectsCrousal data={item} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default PropertyList;