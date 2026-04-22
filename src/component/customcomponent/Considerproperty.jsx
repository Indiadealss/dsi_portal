import React, { useRef } from "react";
import Slider from "react-slick";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button } from "antd";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector } from "react-redux";

const Considerpropety = () => {

    
  const sliderRef = useRef(null);
  

  const property = useSelector((state) => state.propertyid.data);


    if(!property || !property.locatadvance){
      return null;
    }
    

  
  

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

    const locAdvan = property.locatadvance.map(item => parseLocation(item))
    const Buldingfeatures = property.Buldingfeature;
    
    const total = locAdvan.length + Buldingfeatures.length;
    
    if(total === 0){
      return '';
    }

  return (
    <div className='block max-w-full p-6  border-b border-gray-300 '>
        <div className='flex my-2 max-w-[-webkit-fill-available] my-3'>
            <div>
            {/* <h2>Place nearby</h2> */}
            <p> <span className="text-xl font-medium text-sm">Why you should consider this property?</span></p>
            </div>
        </div>
       <div className="relative">
      {/* Left Button */}
      <Button
        onClick={() => sliderRef.current?.slickPrev()}
        className={`${total.length <= 8 ? "!hidden" :"!absolute !left-[-2px] !top-1/2 !-translate-y-1/2 !bg-[#011c49cf] !text-white !rounded-full z-10"}`}
        icon={<LeftOutlined />}
      />

      {/* Carousel */}
      <Slider ref={sliderRef} {...settings}>
        {locAdvan.map((item, idx) => (
          <div  className="px-2">
        <button key={idx} className="bg-white font-medium  text-[#011638]  border border-gray-100 w-full px-4 py-2 rounded-full text-sm">
              {item.name}
            </button>
          </div>
        ))}
        {Buldingfeatures.map((item, idx) => (
          <div  className="px-2">
        <button key={idx} className="bg-white  font-medium  text-[#011638]  border border-gray-100 w-full px-4 py-2 rounded-full text-sm flex">
             <img src={item.icon} alt={item.name} className="inline-block w-4 h-4 mr-2" />
              {item.name}
            </button>
          </div>
        ))}
      </Slider>

      {/* Right Button */}
      <Button
        onClick={() => sliderRef.current?.slickNext()}
        className={`${total.length <= 8 ? "!hidden":"!absolute !right-0 !top-1/2 !-translate-y-1/2 !bg-[#011c49cf] !text-white !rounded-full z-10"}`}
        icon={<RightOutlined />}
      />
    </div>
    </div>
  )
}

export default Considerpropety;