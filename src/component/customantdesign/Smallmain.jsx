import React, { useRef } from "react";
import { Carousel, Card, Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import img1 from "../../Images/Bhutani.497cb9c2.png";
import img2 from "../../Images/Gaurs.85564924.png";
import img3 from "../../Images/m3m.aa9e165b.png";
import img4 from "../../Images/Prestige.76918ca7.png";
import img5 from "../../Images/Irish.ac2de9f3.png";
import img6 from "../../Images/Dlf.6cb4c42a.png";
import img7 from "../../Images/Group108o.ee6a8587.png"

const Smallmain = ({title}) => {
  const carouselRef = useRef(null);

  const goPrev = () => {
    carouselRef.current.prev();
  };

  const goNext = () => {
    carouselRef.current.next();
  };


  
  const card = [
    { img: img1, label: "ATS Kingston Heath", description: "2, 3, 4 BHK Apartment in Sector 110, Noida", price: "₹ 36,000 onwards" },
    { img: img2, label: "ATS Kingston Heath", description: "3, 4 BHK Apartment in Sector 150, Noida", price: "₹ 36,000 onwards" },
    { img: img3, label: "ATS Kingston Heath", description: "3, 4, 5 BHK Apartment in Sector 168, Noida", price: "₹ 36,000 onwards" },
    { img: img4, label: "ATS Kingston Heath", description: "2, 3 BHK Apartment in Sector 100, Noida", price: "₹ 36,000 onwards" },
    { img: img5, label: "ATS Kingston Heath", description: "2, 3 BHK Apartment in Sector 100, Noida", price: "₹ 36,000 onwards" },
    { img: img6, label: "ATS Kingston Heath", description: "2, 3 BHK Apartment in Sector 100, Noida", price: "₹ 36,000 onwards" },
    { img: img7, label: "ATS Kingston Heath", description: "2, 3 BHK Apartment in Sector 100, Noida", price: "₹ 36,000 onwards" },
    { img: img1, label: "ATS Kingston Heath", description: "2, 3 BHK Apartment in Sector 100, Noida", price: "₹ 36,000 onwards" },
    { img: img2, label: "ATS Kingston Heath", description: "2, 3 BHK Apartment in Sector 100, Noida", price: "₹ 36,000 onwards" },
    { img: img3, label: "ATS Kingston Heath", description: "2, 3 BHK Apartment in Sector 100, Noida", price: "₹ 36,000 onwards" },
    { img: img4, label: "ATS Kingston Heath", description: "2, 3 BHK Apartment in Sector 100, Noida", price: "₹ 36,000 onwards" },
    { img: img5, label: "ATS Kingston Heath", description: "2, 3 BHK Apartment in Sector 100, Noida", price: "₹ 36,000 onwards" },
    { img: img6, label: "ATS Kingston Heath", description: "2, 3 BHK Apartment in Sector 100, Noida", price: "₹ 36,000 onwards" },
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
    <div className="mx-auto" style={{ position: "relative", width: "90%"}}>
      
     <h2 className="text-center my-5"><span className='font-bold text-xs text-gray-500  '>{title}</span></h2>
      {/* Left button */}
      <Button
        shape="circle"
        icon={<LeftOutlined />}
        onClick={goPrev}
        className="mobileDisplay"
        style={{
          position: "absolute",
          top: "75%",
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
                width: "97%",
                borderRadius: 12,
                boxShadow: "none",
              }}
            >
              <img src={item.img} alt={item.label} className="rounded-xl w-[9vw] h-[8vw]" />
              {/* <div className="p-3 bg-transparent">
                <p className="font-medium text-xs">{item.label}</p>
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
          top: "75%",
          right: "-15px",
          transform: "translateY(-50%)",
          zIndex: 1,
        }}
      />
    </div>
    </>
  );
};

export default Smallmain;
