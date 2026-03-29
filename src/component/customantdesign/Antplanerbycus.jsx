import React, { useRef } from "react";
import Slider from "react-slick";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useSelector } from "react-redux";

const Antplanerbycus = () => {
  const sliderRef = useRef(null);
  const property = useSelector((state) => state.propertyid.data);

  const parseLocation = (location) => {
    if (!location) return null;

    if (typeof location === "string") {
      try {
        return JSON.parse(location);
      } catch {
        return null;
      }
    }
    return location;
  };

  // ✅ safe mapping
  const locAdvan = property?.locatadvance
    ?.map(item => parseLocation(item))
    ?.filter(Boolean) || [];

  // ✅ hide if empty
  if (locAdvan.length === 0) return null;

  const settings = {
    dots: false,
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    variableWidth: true,
    arrows: false,
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
        className={`${
          locAdvan.length <= 6
            ? "!hidden"
            : "!absolute !left-0 !top-1/2 !-translate-y-1/2 !bg-[#011c49cf] !text-white !rounded-full z-10"
        }`}
        icon={<LeftOutlined />}
      />

      {/* Slider */}
      <Slider ref={sliderRef} {...settings}>
        {locAdvan.map((item, idx) => (
          <div key={idx} className="px-2">
            <button className="bg-white w-full px-4 py-2 rounded shadow text-sm whitespace-nowrap">
              {item?.propertyName || "N/A"}
            </button>
          </div>
        ))}
      </Slider>

      {/* Right Button */}
      <Button
        onClick={() => sliderRef.current?.slickNext()}
        className={`${
          locAdvan.length <= 6
            ? "!hidden"
            : "!absolute !right-0 !top-1/2 !-translate-y-1/2 !bg-[#011c49cf] !text-white !rounded-full z-10"
        }`}
        icon={<RightOutlined />}
      />

    </div>
  );
};

export default Antplanerbycus;