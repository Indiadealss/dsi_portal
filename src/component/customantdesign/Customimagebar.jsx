import React, { useRef } from "react";
import { Carousel, Button } from "antd";
import { LeftOutlined, RightOutlined,HeartOutlined  } from "@ant-design/icons";

const Customimagebar = () => {
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
    "https://picsum.photos/400/250?random=1",
    "https://picsum.photos/400/250?random=2",
    "https://picsum.photos/400/250?random=3",
    "https://picsum.photos/400/250?random=4",
    "https://picsum.photos/400/250?random=5",
  ];

  return (
    <>
    <div className='flex flex-col md:flex-row mt-[15%] justify-between mb-0' style={{width: "97%" }}>
            <div>
              <h2 className='font-bold text-xl'>Recommended Projects</h2>
              <p className='text-sm text-gray-500'>The most search project in location</p>
            </div>
            <div>
              <button type="button" class="py-2.5 px-5 me-2  text-sm font-medium text-[#00307c] focus:outline-none bg-white rounded-lg border border-[#00307c] cursor-pointer   focus:z-10 focus:ring-4 focus:ring-gray-100 ">
                View all Insights
                </button>
            </div>
          </div>
    <div  style={{ position: "relative",width: "97%" }}>
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
        {images.map((src, index) => (
          <div key={index} style={{ padding: "0 10px" }}>
            <div
              style={{
                borderRadius: 12,
                overflow: "hidden",
                margin: "2px",
                position:"relative" // parent must be relative for overlay
              }}
            >
              <img
                src={src}
                alt={`Slide ${index}`}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                }}
              />

              {/* Overlay Content */}
              <div className="absolute top-2 left-0 right-0 flex justify-between items-center px-3"
              style={{
                color:"white",
                fontWeight:"bold",
                textShadow:"0 1px 3px rgba(0,0,0,0,0.8)", // better readability
              }}
              >
                <span className="px-2 py-1 bg-[#3d3d3d63] rounded-2xl text-xs">RERA</span>
                <HeartOutlined className="text-xl cursor-pointer hover:text-red-500" />
              </div>
              <div className="absolute bottom-2 left-0"
              style={{
                color:"white",
                fontWeight:"bold",
                fontSize:"10px",
                padding:"1px",
                textShadow:"0 1px 3px rgba(0,0,0,00.8)",
              }}
              >
                <span>Ready To Move</span>
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
          right: "-15px",
          transform: "translateY(-50%)",
          zIndex: 1,
        }}
      />
    </div>
    </>
  );
};

export default Customimagebar;
