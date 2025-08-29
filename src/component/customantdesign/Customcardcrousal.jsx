import React, { useRef } from "react";
import { Carousel, Card, Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import img1 from "../../Images/cardBander.jpg";

const Customcardcrousal = () => {
  const carouselRef = useRef(null);

  const goPrev = () => {
    carouselRef.current.prev();
  };

  const goNext = () => {
    carouselRef.current.next();
  };

  const card = [
    { img: img1, label: "ATS Kingston Heath", description: "2, 3, 4 BHK Apartment in Sector 110, Noida", price: "₹ 36,000 onwards" },
    { img: img1, label: "ATS Kingston Heath", description: "3, 4 BHK Apartment in Sector 150, Noida", price: "₹ 36,000 onwards" },
    { img: img1, label: "ATS Kingston Heath", description: "3, 4, 5 BHK Apartment in Sector 168, Noida", price: "₹ 36,000 onwards" },
    { img: img1, label: "ATS Kingston Heath", description: "2, 3 BHK Apartment in Sector 100, Noida", price: "₹ 36,000 onwards" },
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
          slidesToShow: 1,
          centerMode: true,
          centerPadding: "60px", // adjust to show partial next
        },
      },
    ],
  };

  return (
    <>
    <div style={{ position: "relative", width: "95%", margin: "0" }}>
      
     <h2 className='font-bold text-xl'>Recommended Projects</h2>
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
              <img src={item.img} alt={item.label} className="rounded-lg w-full" />
              <div className="p-3 bg-transparent">
                <p className="font-medium">{item.label}</p>
                <p className="text-xs text-gray-500">{item.description}</p>
                <p className="font-semibold">{item.price}</p>
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
