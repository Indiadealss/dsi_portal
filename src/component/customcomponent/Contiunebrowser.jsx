import React, { useRef } from "react";
import { Carousel, Card, Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { GiCarKey } from "react-icons/gi";
import { MdOutlineAddLocation } from "react-icons/md";


const Contiunebrowser = ({title}) => {

    const carouselRef = useRef(null);
    
      const goPrev = () => {
        carouselRef.current.prev();
      };
    
      const goNext = () => {
        carouselRef.current.next();
      };
    
      const noofProperties = 59;
    
      
      const card = [
            {icon:'',name:'Myproperties', label:`My properties ${noofProperties}`},
            {icon:'',name:'Buydelhi', label:`My properties ${noofProperties}`},
            {icon:'',name:'BuyNoida', label:`My properties ${noofProperties}`},
            {icon:'',name:'BuyGraternoida', label:`My properties ${noofProperties}`},
            {icon:'',name:'Buyinlansdowne', label:`My properties ${noofProperties}`},
            {icon:GiCarKey,name:'rentinGraterNoida', label:`My properties ${noofProperties}`},
            {icon:'',name:'rentinNorthDelhi', label:`My properties ${noofProperties}`},
            {icon:'',name:'BuyCommercialRishikesh', label:`My properties ${noofProperties}`},
            {icon:'',name:'BuyinGurgoan',label:'Buy in Gurgaon'},
            {icon:'',name:'RentinNoida',label:'Rent in Noida'},
            {icon:'',name:'Buy Commercial in Greater Noida'},
            {icon:'',name:'Buy Commercial in Dehradun'},
            {icon:MdOutlineAddLocation,name:'Explore New City'}
        ];
    
        
      // ✅ react-slick settings
       const settings = {
        dots: false,
        infinite: false,
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
      
     <h2 className="text-start ms-4 mb-5"><span className='font-bold text-sm text-gray-500  '>{title}</span></h2>
      {/* Left button */}
      <Button
        shape="circle"
        icon={<LeftOutlined />}
        onClick={goPrev}
        className="mobileDisplay"
        style={{
          position: "absolute",
          top: "90%",
          left: "-15px",
          transform: "translateY(-50%)",
          zIndex: 1,
        }}
      />

      {/* Carousel */}
      <Carousel ref={carouselRef} {...settings} style={{border: '0.5px solid gray', borderColor:'gray', borderRadius:'37px', padding:'2px'}}>
        {card.map((item, i) => (
          <div key={i} style={{ padding: "0 10px" }}>
            <Card
                className="shadow-none"
              bordered={true}
              style={{
                width: "97%",
                boxShadow: "none",
              }}
            >
              <div className="">

                {item.label}
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
          top: "90%",
          right: "-15px",
          transform: "translateY(-50%)",
          zIndex: 1,
        }}
      />
    </div>
    </>
  )
}

export default Contiunebrowser