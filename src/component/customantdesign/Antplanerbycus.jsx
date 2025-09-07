import React, { useRef } from "react";
import Slider from "react-slick";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button } from "antd";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Antplanerbycus = ({ articles }) => {

    
  const sliderRef = useRef(null);

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

  return (
    <div className="relative">
      {/* Left Button */}
      <Button
        onClick={() => sliderRef.current?.slickPrev()}
        className="!absolute !left-[-2px] !top-1/2 !-translate-y-1/2 !bg-[#011c49cf] !text-white !rounded-full z-10"
        icon={<LeftOutlined />}
      />

      {/* Carousel */}
      <Slider ref={sliderRef} {...settings}>
        {articles.map((item, idx) => (
          <div key={idx} className="px-2">
        <button className="bg-white w-full px-4 py-2 rounded  shadow text-sm">
              {item.title}
            </button>
          </div>
        ))}
      </Slider>

      {/* Right Button */}
      <Button
        onClick={() => sliderRef.current?.slickNext()}
        className="!absolute !right-0 !top-1/2 !-translate-y-1/2 !bg-[#011c49cf] !text-white !rounded-full z-10"
        icon={<RightOutlined />}
      />
    </div>
  );
};

export default Antplanerbycus;
