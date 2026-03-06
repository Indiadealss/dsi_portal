import React, { useRef } from "react";
import Slider from "react-slick";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button } from "antd";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector } from "react-redux";

const Antplanerbycus = () => {

    
  const sliderRef = useRef(null);

  const property = useSelector((state) => state.propertyid.data);
  
  if (!property || !property.locatadvance || property.locatadvance.length === 0) {
    return null;   // hides component fully
  }
  
    const parseLocation = (location) => {
  if (typeof location === "string") {
    try {
      return JSON.parse(location);
    } catch {
      return null;
    }
  }
  return location;
};
    const locationData = parseLocation(property.location);
    console.log(property.locatadvance);

    // console.log(property.locatadvance.map(item => JSON.parse(item)),'hello');

    const locAdvan = property.locatadvance.map(item => parseLocation(item))
    
    

  
  

  const settings = {
    dots: false,
    infinite: false,
    slidesToShow: 6,
    slidesToScroll: 1,
    variableWidth:true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  if (!property || !property.locatadvance) {
    return (
      <div className="text-center py-4 text-gray-500">
        Loading nearby places...
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Left Button */}
      <Button
        onClick={() => sliderRef.current?.slickPrev()}
        className={`${locAdvan.length <= 8 ? "!hidden" :"!absolute !left-[-2px] !top-1/2 !-translate-y-1/2 !bg-[#011c49cf] !text-white !rounded-full z-10"}`}
        icon={<LeftOutlined />}
      />

      {/* Carousel */}
      <Slider ref={sliderRef} {...settings}>
        {locAdvan.map((item, idx) => (
          <div  className="px-2">
        <button key={idx} className="bg-white w-full px-4 py-2 rounded  shadow text-sm">
              {item.propertyName}
            </button>
          </div>
        ))}
      </Slider>

      {/* Right Button */}
      <Button
        onClick={() => sliderRef.current?.slickNext()}
        className={`${locAdvan.length <= 8 ? "!hidden":"!absolute !right-0 !top-1/2 !-translate-y-1/2 !bg-[#011c49cf] !text-white !rounded-full z-10"}`}
        icon={<RightOutlined />}
      />
    </div>
  );
};

export default Antplanerbycus;
