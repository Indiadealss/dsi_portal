import React, { useRef, useState } from "react";
import Slider from "react-slick";
import { GiCarKey } from "react-icons/gi";
import { MdOutlineAddLocation } from "react-icons/md";
import { FaSign } from "react-icons/fa";
import { LeftOutlined, RightOutlined } from "@ant-design/icons"; // can swap with react-icons

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Contiunebrowser = ({ title }) => {

  const [active,setActive] = useState('Myproperties');
  const sliderRef = useRef(null);

  const goPrev = () => sliderRef.current.slickPrev();
  const goNext = () => sliderRef.current.slickNext();

  const noofProperties = 59;

  const card = [
            {icon:<FaSign/>,name:'Myproperties', label:`My properties ${noofProperties}`},
            {icon:<FaSign />,name:'Buydelhi', label:`Buy in Delhi South West`},
            {icon:<FaSign />,name:'BuyNoida', label:`Buy in Noida`},
            {icon:<FaSign />,name:'BuyGraternoida', label:`Buy in Graternoida`},
            {icon:<FaSign />,name:'Buyinlansdowne', label:`Buy in Landowne`},
            {icon:<GiCarKey />,name:'rentinGraterNoida', label:`Rent in GraterNoida`},
            {icon:<GiCarKey />,name:'rentinNorthDelhi', label:`Rent in North Delhi`},
            {icon:<FaSign />,name:'BuyCommercialRishikesh', label:`Buy Commercial in Rishikesh`},
            {icon:<FaSign />,name:'BuyinGurgoan',label:'Buy in Gurgaon'},
            {icon:<GiCarKey />,name:'RentinNoida',label:'Rent in Noida'},
            {icon:<FaSign />,name:'Buy Commercial in Greater Noida', label:'Buy Commercial in Greater Noida'},
            {icon:<FaSign />,name:'Buy Commercial in Dehradun',label:'Buy Commercial in Dehradun'},
            {icon:<MdOutlineAddLocation />,name:'Explore New City',label:'Explore New City'}
        ];

  const settings = {
    dots: false,
    infinite: false,
    arrows: false,
    slidesToShow: 4,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024, // Tablet
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 768, // Mobile
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="relative w-[80%] ms-5">
      {/* Title */}
      <h2 className="text-start mb-5 ms-10">
        <span className="font-bold text-sm text-gray-500">{title}</span>
      </h2>

      {/* Left Button */}
      <button
  onClick={goPrev}
  className="absolute top-[85px]  transform -translate-y-1/2 
             bg-gray-100 text-gray-700 rounded-full shadow p-2 
             hover:bg-gray-200 z-10 cursor-pointer -left-2"
>
  <LeftOutlined />
</button>

      {/* Slider */}
      <Slider ref={sliderRef} {...settings} className=" shadow-sm rounded-full">
        {card.map((item, i) => (
          <div key={i} onClick={() => setActive(item.name)}>
            <div className={`${active === item.name ? 'flex items-center  p-2 bg-white cursor-pointer rounded-full shadow-md hover:shadow-md transition' : "flex items-center  p-2 bg-white cursor-pointer rounded-full hover:shadow-md transition"}`}>
              <div className="text-blue-500 bg-blue-100 rounded-full p-2 mr-3">
                {item.icon}
              </div>
              <span className="text-gray-700 text-sm">{item.label}</span>
            </div>
          </div>
        ))}
      </Slider>

      {/* Right Button */}
      <button
        onClick={goNext}
        className="absolute top-[85px] cursor-pointer -right-4 transform -translate-y-1/2 bg-gray-100 text-gray-700 rounded-full shadow p-2 hover:bg-gray-200"
      >
        <RightOutlined />
      </button>
    </div>
  );
};

export default Contiunebrowser;
