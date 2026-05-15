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

 

  if(property?.locatadvance.length === 0){
    return (
      <>  </>
    )
  }

  return (
    <div className="relative border-b border-gray-300 py-10">
      <div className="py-5">
            {/* <h2>Place nearby</h2> */}
            <p> <span className="text-xl font-medium text-sm">Location advantages</span></p>
            </div>
      {locAdvan.map((item, idx) => (
          <div key={idx} className="px-2">
            <button className="bg-white w-[min-content] px-4  py-2 rounded shadow  text-sm whitespace-nowrap">
              {item?.propertyName || "N/A"}
            </button>
          </div>
        ))}
     
    </div>
  );
};

export default Antplanerbycus;