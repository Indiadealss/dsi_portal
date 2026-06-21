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

  console.log(properties, 'properties');

  const propertyes = properties.filter((item) => {
    return item.hotScreen === true;
    
  })

  console.log(propertyes, 'propertyes is filter');
  


  const newCards = propertyes.map((item) => {
    const covers = item.images?.filter(
      (img) => img.type === "cover"
    ) ?? [];

    const coverImages = covers.length
      ? covers
      : item.images?.filter(
        (img) => img.type === "banner"
      ) ?? [];

    const coverSrc =
      coverImages.length > 0
        ? coverImages[0].src
        : "https://indiadealss.s3.eu-north-1.amazonaws.com/indiadealss/noImageBg.svg";

    // RESIDENTIAL RANDOM UNIT
    const randomUnit =
      item.unitData?.[
      Math.floor(Math.random() * item.unitData.length)
      ];

    // COMMERCIAL RANDOM OFFICE TYPE
    const randomOfficeType =
      item.officeUnits?.[
      Math.floor(Math.random() * item.officeUnits.length)
      ];

    // RANDOM AREA INSIDE OFFICE TYPE
    const randomOfficeItem =
      randomOfficeType?.items?.[
      Math.floor(
        Math.random() * randomOfficeType.items.length
      )
      ];

    return {
      img: coverSrc,
      label: item.title,
      location: item.location,
      city: item.city,

      unitData: item.unitData,

      // RESIDENTIAL
      bhk:
        item.property === "residential"
          ? randomUnit?.specs?.bhk || "N/A"
          : null,

      // SIZE FOR BOTH
      size:
        item.property === "residential"
          ? randomUnit?.specs?.areaMax
            ? `${randomUnit.specs.areaMax} Sq.ft`
            : "N/A"
          : randomOfficeItem?.area
            ? `${randomOfficeItem.area} Sq.ft`
            : "N/A",

      officeData: item.officeUnits,

      devloper: item.devloper,
      property: item.property,
      npxid: item.npxid,
      price: item.price,
    };
  });

  return (
    <div className="relative mt-[100px]">
      <div className="mb-[30px]">
        <h1 className="uppercase"><span className="heading-h3">HOT PROPERTIES</span></h1>
      </div>
      {/* LEFT BUTTON
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
            </button> */}

      {/* RIGHT BUTTON
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
            </button> */}

      {/* SWIPER */}
      <Swiper
        modules={[Autoplay]}
        loop={true}
        speed={7000}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        onMouseEnter={() => { swiperRef.current?.autoplay?.stop() }}
        onMouseLeave={() => swiperRef.current?.autoplay?.start()}
        breakpoints={{
          320: { slidesPerView: 1.2 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 5 },
        }}
      >
        {newCards.map((item, index) => (
          <SwiperSlide key={index} className="rounded-xl border border-gray-200 overflow-hidden ">
            <ProjectsCrousal data={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PropertyList;