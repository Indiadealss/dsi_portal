import React, { useRef } from "react";
import { Carousel, Card, Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import img1 from "../../Images/cardBander.jpg";

const Simllarpropertites = ({title}) => {
  const carouselRef = useRef(null);

  const goPrev = () => {
    carouselRef.current.prev();
  };

  const goNext = () => {
    carouselRef.current.next();
  };


  
  const card = [
    { img: img1, label: "ATS Kingston Heath",city:'sector 81, Gurgaon', description: "2, 3, 4 BHK Apartment in Sector 110, Noida", price: "₹ 36,000 onwards" },
    { img: img1, label: "ATS Kingston Heath",city:'sector 81, Gurgaon', description: "3, 4 BHK Apartment in Sector 150, Noida", price: "₹ 36,000 onwards" },
    { img: img1, label: "ATS Kingston Heath",city:'sector 81, Gurgaon', description: "3, 4, 5 BHK Apartment in Sector 168, Noida", price: "₹ 36,000 onwards" },
    { img: img1, label: "ATS Kingston Heath",city:'sector 81, Gurgaon', description: "2, 3 BHK Apartment in Sector 100, Noida", price: "₹ 36,000 onwards" },
    { img: img1, label: "ATS Kingston Heath",city:'sector 81, Gurgaon', description: "2, 3 BHK Apartment in Sector 100, Noida", price: "₹ 36,000 onwards" },
    { img: img1, label: "ATS Kingston Heath",city:'sector 81, Gurgaon', description: "2, 3 BHK Apartment in Sector 100, Noida", price: "₹ 36,000 onwards" },
    { img: img1, label: "ATS Kingston Heath",city:'sector 81, Gurgaon', description: "2, 3 BHK Apartment in Sector 100, Noida", price: "₹ 36,000 onwards" },
    { img: img1, label: "ATS Kingston Heath",city:'sector 81, Gurgaon', description: "2, 3 BHK Apartment in Sector 100, Noida", price: "₹ 36,000 onwards" },
    { img: img1, label: "ATS Kingston Heath",city:'sector 81, Gurgaon', description: "2, 3 BHK Apartment in Sector 100, Noida", price: "₹ 36,000 onwards" },
    { img: img1, label: "ATS Kingston Heath",city:'sector 81, Gurgaon', description: "2, 3 BHK Apartment in Sector 100, Noida", price: "₹ 36,000 onwards" },
    { img: img1, label: "ATS Kingston Heath",city:'sector 81, Gurgaon', description: "2, 3 BHK Apartment in Sector 100, Noida", price: "₹ 36,000 onwards" },
    { img: img1, label: "ATS Kingston Heath",city:'sector 81, Gurgaon', description: "2, 3 BHK Apartment in Sector 100, Noida", price: "₹ 36,000 onwards" },
    { img: img1, label: "ATS Kingston Heath",city:'sector 81, Gurgaon', description: "2, 3 BHK Apartment in Sector 100, Noida", price: "₹ 36,000 onwards" },
  ];

    
  // ✅ react-slick settings
   const settings = {
    dots: false,
    infinite: true,
    arrows: false,
    slidesToShow: 6, // Desktop default
    centerPadding: "100px", 
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
    <div className="" style={{ position: "relative", width: "100%"}}>
      
     <h2 className="my-5"><span className='font-medium text-sm text-gray-700 my-5'>{title}</span></h2>
      {/* Left button */}
      <Button
        shape="circle"
        icon={<LeftOutlined />}
        onClick={goPrev}
        className="mobileDisplay"
        style={{
          position: "absolute",
          top: "50%",
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
                className=""
              bordered={true}
              style={{
                width: "97%",
                borderRadius: 12,
                boxShadow: "none",
              }}
            >
              <img src={item.img} alt={item.label} className="rounded-t-lg w-full" />
              <div className="p-3 bg-transparent">
                <p className="font-medium text-xs">{item.price}</p>
                <p className="font-medium text-xs">{item.label}</p>
                <p className="font-base text-[0.5px]">{item.city}</p>
              </div>
              <div className="border-t border-gray-300">
                <p className="p-2 font-bold text-green-500">Enquire Now</p>
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

export default Simllarpropertites;
