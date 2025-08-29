import React, { useRef } from "react";
import { Carousel, Button } from "antd";
import { LeftOutlined, RightOutlined,HeartOutlined  } from "@ant-design/icons";

const Appartmentvill = () => {
  const carouselRef = useRef(null);

  const goPrev = () => carouselRef.current.prev();
  const goNext = () => carouselRef.current.next();

  const settings = {
    dots: false,
    infinite: true,
    arrows: false,
    slidesToShow: 3, // Desktop default
    slidesToScroll: 1,
    responsive: [
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

  const images = [
    {src:"https://picsum.photos/400/250?random=1",title:"Independent/Builder Floor",subTitle:"13000+ Properties"},
    {src:"https://picsum.photos/400/250?random=2",title:"Independent/Builder Floor",subTitle:"13000+ Properties"},
    {src:"https://picsum.photos/400/250?random=3",title:"Independent/Builder Floor",subTitle:"13000+ Properties"},
    {src:"https://picsum.photos/400/250?random=4",title:"Independent/Builder Floor",subTitle:"13000+ Properties"},
    {src:"https://picsum.photos/400/250?random=5",title:"Independent/Builder Floor",subTitle:"13000+ Properties"},
  ];

  return (
    <>
    <div className='mt-[10%]'>
        <h2 className='font-bold text-xl'>Apartments, Villas and more</h2>
              <p className='text-sm text-gray-500'>In location</p>
            
          </div>
    <div className="my-4" style={{ position: "relative", width: "100%" }}>
      {/* Left Button */}
      <Button
        shape="circle"
        icon={<LeftOutlined />}
        onClick={goPrev}
        className="mobileDisplay"
        style={{
          position: "absolute",
          top: "50%",
          left: "-10px",
          transform: "translateY(-50%)",
          zIndex: 1,
        }}
      />

      {/* Carousel */}
      <Carousel ref={carouselRef} {...settings} style={{ padding: "20px 0" }}>
        {images.map((item, index) => (
          <div key={index} style={{ padding: "0 10px" }}>
            <div
              style={{
                borderRadius: 12,
                overflow: "hidden",
                margin: "2px",
                width:"90%",
                position:"relative" // parent must be relative for overlay
              }}
            >
              <img
                src={item.src}
                alt={`Slide ${index}`}
                style={{
                  width: "100%",
                  height: "400px",
                  objectFit: "cover",
                }}
              />

              {/* Overlay Content */}
              <div className="mx-5 absolute top-10 left-0 right-0  items-center px-3"
              style={{
                textShadow:"0 1px 3px rgba(0,0,0,0,0.8)", // better readability
              }}
              >
                <span className=" pt-10 font-bold text-[#011638]  rounded-2xl text-xl">{item.title}</span>
                <p className="text-gray-500  rounded-2xl text-xm">{item.subTitle}</p>
              </div>
              
            </div>
          </div>
        ))}
      </Carousel>

      {/* Right Button */}
      <Button
        shape="circle"
        icon={<RightOutlined />}
        onClick={goNext}
        className="mobileDisplay"
        style={{
          position: "absolute",
          top: "50%",
          right: "15px",
          transform: "translateY(-50%)",
          zIndex: 1,
        }}
      />
    </div>
    </>
  );
};

export default Appartmentvill;
