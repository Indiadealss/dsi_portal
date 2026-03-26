import React from "react";
import ProjectsCrousal from "./ProjectsCrousal";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const PropertyList = ({ properties }) => {

    const newCards = properties.map((item) => {
        const covers = item.images?.filter(img => img.type === "cover") ?? [];
        const coverImages = covers.length
            ? covers
            : item.images?.filter(img => img.type === "banner") ?? [];

        const bannerImages = item.images?.filter((img) => img.type === "cover") || [];

        const coverSrc =
            coverImages.length > 0
                ? coverImages[0].src
                : "https://indiadealss.s3.eu-north-1.amazonaws.com/indiadealss/noImageBg.svg";

        return {
            img: coverSrc,
            label: item.title,   // or item.title
            location: item.location,
            city: item.city,
            npxid: item.npxid,
        };
    });
    return (
        <div className="px-4 md:px-6 lg:px-10 py-6">

            <Swiper
                modules={[Navigation, Autoplay]}
                navigation
                loop={true}
                spaceBetween={20}

                autoplay={{
                    delay: 2500, // 2.5 sec
                    disableOnInteraction: false, // user swipe kare tab bhi chalta rahe
                }}

                breakpoints={{
                    0: {
                        slidesPerView: 1,
                        navigation: false, // ❌ mobile pe hide
                    },
                    640: {
                        slidesPerView: 2,
                        navigation: true, // ❌ tablet pe bhi hide
                    },
                    1024: {
                        slidesPerView: 2,
                        navigation: true, // ✅ desktop pe show
                    },
                    1280: {
                        slidesPerView: 3,
                        navigation: true,
                    },
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