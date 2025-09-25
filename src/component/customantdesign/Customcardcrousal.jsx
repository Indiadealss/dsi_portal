import React, { useRef } from "react";
import { Carousel, Card, Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import img1 from "../../Images/cardBander.jpg";
import img2 from "../../Images/Gaurs.85564924.png";
import img3 from "../../Images/m3m.aa9e165b.png";
import img4 from "../../Images/Prestige.76918ca7.png";
import img5 from "../../Images/Irish.ac2de9f3.png";

const Customcardcrousal = () => {
  const carouselRef = useRef(null);

  const goPrev = () => {
    carouselRef.current.prev();
  };

  const goNext = () => {
    carouselRef.current.next();
  };

  const card = [
    { img: img5, label: "ATS Kingston Heath", description: "2, 3, 4 BHK Apartment in Sector 110, Noida", price: "₹ 36,000 onwards" },
    { img: img2, label: "ATS Kingston Heath", description: "3, 4 BHK Apartment in Sector 150, Noida", price: "₹ 36,000 onwards" },
    { img: img3, label: "ATS Kingston Heath", description: "3, 4, 5 BHK Apartment in Sector 168, Noida", price: "₹ 36,000 onwards" },
    { img: img4, label: "ATS Kingston Heath", description: "2, 3 BHK Apartment in Sector 100, Noida", price: "₹ 36,000 onwards" },
  ];

  // ✅ react-slick settings
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
          slidesToShow: 2,
          centerMode: true,
          centerPadding: "60px", // adjust to show partial next
        },
      },
    ],
  };

  return (
    <>
    <div style={{ position: "relative", width: "95%", margin: "0" }}>
      
     <h2 className='font-bold text-xl hidden'>Recommended Projects</h2>
     <p className='text-sm text-gray-500'>The most search project in location</p>
      {/* Left button */}
      <Button
        shape="circle"
        icon={<LeftOutlined />}
        onClick={goPrev}
        className="mobileDisplay"
        style={{
          position: "absolute",
          top: "40%",
          left: "-15px",
          transform: "translateY(-50%)",
          zIndex: 1,
        }}
      />

      {/* Carousel */}
      <Carousel ref={carouselRef} {...settings}>
        {card.map((item, i) => (
          <div key={i} style={{ padding: "0 10px" }}>
            <Card
                className="shadow-none"
              bordered={true}
              style={{
                width: "100%",
                borderRadius: 12,
                boxShadow: "none",
              }}
            >
              <div className="p-2 shadow-sm rounded-lg mx-1">
              <img src={item.img} alt={item.label} className=" projectsPhotos" />
              </div>
              <p className="font-medium text-center"><span className="text-[10px]">{item.label}</span></p>
              {/* <div className="p-3 bg-transparent">
                <p className="font-medium">{item.label}</p>
                <p className="text-xs text-gray-500">{item.description}</p>
                <p className="font-semibold">{item.price}</p>
              </div> */}
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
          top: "40%",
          right: "-15px",
          transform: "translateY(-50%)",
          zIndex: 1,
        }}
      />
    </div>
    </>
  );
};

export default Customcardcrousal;
