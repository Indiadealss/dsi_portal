import React from "react";
import { Carousel } from "antd";

const Custompropertycrousal = ({ images }) => {

 const validImages = images?.filter(
    (item) =>
      item?.src &&
      !item.src.toLowerCase().endsWith(".pdf")
  );

  if (!validImages || validImages.length === 0) return null;
  
  return (
    <div className="w-full md:w-[30vw] overflow-hidden rounded-xl h-[220px] sm:h-[280px] md:h-[16vw]">
  <Carousel autoplay dots>
        {validImages.map((item, index) => (
  <div key={index} className="h-full">
    <img
      src={item.src}
      alt="property"
      className="w-full h-full object-cover rounded-t-xl"
    />
  </div>
))}
      </Carousel>
    </div>
  );
};

export default Custompropertycrousal;