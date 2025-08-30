import React, { useRef } from "react";
import { Carousel, Card, Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import img from "../../Images/gzyg5sq_1744807099_587259907_med.jpg"
import Antdcrousal from "../customantdesign/Antdcrousal";
import line from "../../Images/Dashed_Line.png";
import nl from "../../Images/NL_Tag.png";
import leftTagEnd from "../../Images/LeftTagEnd.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const Newlaunchcard = ({colu}) => {
  const carouselRef = useRef(null);

  const goPrev = () => {
    carouselRef.current.prev();
  };

  const goNext = () => {
    carouselRef.current.next();
  };

  const newlaunchProject = [
    {
        image:img,
        title:"Signature Global",
        subtitle:"Sohna, Gurgaon",
        price:'2.1 Cr',
        flatdetils:'3 BHK Independent Floor',
        increasedRate:'16.2 price increased in last 1 year in ...'
    },
    {
        image:img,
        title:"ROF Pravasa",
        subtitle:"Sector 88A, Gurgaon",
        price:'2.1 Cr',
        flatdetils:'3 BHK Independent Floor',
        increasedRate:'5.6 price increased in last 1 year in'
    },{
        image:img,
        title:"Signature Global",
        subtitle:"Sohna, Gurgaon",
        price:'2.1 Cr',
        flatdetils:'3 BHK Independent Floor',
        increasedRate:'16.2 price increased in last 1 year in ...'
    },{
        image:img,
        title:"ROF Pravasa",
        subtitle:"Sector 88A, Gurgaon",
        price:'2.1 Cr',
        flatdetils:'3 BHK Independent Floor',
        increasedRate:'5.6 price increased in last 1 year in'
    },{
        image:img,
        title:"ROF Pravasa",
        subtitle:"Sector 88A, Gurgaon",
        price:'2.1 Cr',
        flatdetils:'3 BHK Independent Floor',
        increasedRate:'5.6 price increased in last 1 year in'
    },
  ]

  // ✅ react-slick settings
   const settings = {
    dots: false,
    infinite: true,
    arrows: false,
    slidesToShow: colu, // Desktop default
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "250px",
    responsive: [
      {
      breakpoint: 1440, // Large screens
      settings: {
        slidesToShow: colu,
        centerMode: true,
        centerPadding: "20px",
      },
    },
      {
        breakpoint: 1024, // Tablet
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: "80px", // show half of next card
        },
      },
      {
        breakpoint: 768, // Mobile
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: "60px", // adjust to show partial next
        },
      },
    ],
  };

  return (
    <>
     <h2 className='font-bold text-xl'>Newly launched projects</h2>
     <p className='text-xs text-gray-500 font-medium'><Antdcrousal /></p>
    <div style={{ position: "relative", width: "100%" }} className="my-5" >
      {/* Left button */}
      <Button
        shape="circle"
        icon={<LeftOutlined />}
        onClick={goPrev}
        className="mobileDisplay"
        style={{
          position: "absolute",
          top: "30%",
          left: "-15px",
          transform: "translateY(-50%)",
          zIndex: 1,
        }}
      />

      {/* Carousel */}
      <Carousel ref={carouselRef} {...settings}>
        {newlaunchProject.map((item, i) => (
          <div key={i} style={{ padding: "0 10px" }}>
            <Card
                className="shadow-none"
              bordered={true}
              style={{
                width: "97%",
                boxShadow: "none",
                
              }}
            >
              <div className="my-3 flex items-center">
  <span className="relative bg-[#9d484b87] px-5 text-sm ">
    New Launch
    <span className="absolute right-[0px] top-0 h-full w-3 bg-gray-200 clip-slant"></span>
  </span>
</div>

                <div className="flex justify-evenly">
                    <div className="rounded-full w-15 h-15  bg-gray-500">
                      <img src={item.image} alt="..." className="w-15 h-15 rounded-full" />
                    </div>
                    <div className="px-2">
                      <h3>{item.title}</h3>
                      <h3>{item.subtitle}</h3>
                      <p><span className="text-black font-bold text-sm border-e-1 pe-3">{item.price}</span><span className="px-2">{item.flatdetils}</span> </p>
                      <p className="text-xs font-medium text-gray-500">{item.increasedRate}</p>
                    </div>
                </div>
                <img src={line} alt="..." className="py-3" />
                <div className="flex justify-evenly">
                  <img src={nl} alt="...." className="w-5 h-5" />
                    <div >
                      <p className="text-xs">Get Preferred options</p>
                      <p className="text-xs">@zero brokerage</p>
                    </div>
                    <div >
                      <button type="button" className="bg-[#022c6f] rounded text-white py-2 px-3">View Number</button>
                    </div>
                </div>
                
            </Card>
          </div>
        ))}
      </Carousel>

      {/* Right button */}
      <Button
        shape="circle"
        icon={<RightOutlined />}
        onClick={goNext}
        className="mobileDisplay"
        style={{
          position: "absolute",
          top: "30%",
          right: "-15px",
          transform: "translateY(-50%)",
          zIndex: 1,
        }}
      />
    </div>
    </>
  );
};

export default Newlaunchcard;
