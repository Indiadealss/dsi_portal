import React from "react";
import { Carousel } from "antd";

const Custompropertycrousal = ({ images }) => {
  return (
    <div className="w-full md:w-[30vw] overflow-hidden rounded-xl">
      <Carousel autoplay dots={true}>
        {images.map((item, index) => (
          <div key={index}>
            <img
              src={item.src}
              alt="property"
              className="w-full h-[220px] sm:h-[280px] md:h-[16vw] object-cover rounded-xl transition-transform duration-500 hover:scale-105"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Custompropertycrousal;