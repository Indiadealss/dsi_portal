import React, { useEffect, useRef, useState } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Carousel,Button } from "antd";
import { Link } from "react-router-dom";

const Antcustom  = ({articles}) => {

    const [activebtn,setActivebtn] = useState('Overview');
  const carouselRef = useRef(null);
const [current, setCurrent] = useState(0);
const [y,setY] = useState(0)



const handleScrollToDealer = (y) => {
  window.scrollTo({
    top: Number(y), // whatever position "Dealer Details" is located
    behavior: 'smooth',
  });
  console.log(y);

  
};  

  // Helper to chunk array
  const chunkArray = (arr, size) =>
    arr.reduce((acc, _, i) => {
      if (i % size === 0) acc.push(arr.slice(i, i + size));
      return acc;
    }, []);

  // Default: Desktop (2x2 → 4 per slide)
  let chunkSize = 1;

  // Detect screen width (can also use react-responsive or custom hook)
  const width = window.innerWidth;
  if (width < 640) {
    chunkSize = 1; // Mobile
  } else if (width < 1024) {
    chunkSize = 1; // Tablet
  }

 

  const articlePairs = chunkArray(articles, chunkSize);
   const totalSlides = articlePairs.length;

    // 👉 custom arrows
  const CustomPrevArrow = ({ onClick }) =>
    current === 0 ? null : (
      <Button
        onClick={onClick}
        className="!absolute !left-2 !top-1/2 !-translate-y-1/2 !bg-[#011c49cf] !text-white !rounded-full z-10"
        icon={<LeftOutlined />}
      />
    );

  const CustomNextArrow = ({ onClick }) =>
    current === totalSlides - 1 ? null : (
      <Button
        onClick={onClick}
        className="!absolute !right-2 !top-1/2 !-translate-y-1/2 !bg-[#011c49cf] !text-white !rounded-full z-10"
        icon={<RightOutlined />}
      />
    );


  const settings = {
    dots: false,
    infinite: false,
    arrows: true,
    slidesToShow: 5, // show one pair at a time
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    beforeChange: (_, next) => setCurrent(next),
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 1 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 },
      },
    ],
  };

   const changeBtn =(e) => {
    setActivebtn(e.currentTarget.name)
    handleScrollToDealer(e.currentTarget.dataset.scroll - 250)
  }


  return (
    <Carousel ref={carouselRef} {...settings} dots arrows infinite={false}>
      {articlePairs.map((group, idx) => (
        <div
          key={idx}
          className={`grid gap-4  
            ${chunkSize === 1 ? "grid-cols-1 grid-rows-1" : ""} 
            ${chunkSize === 1 ? "grid-cols-1" : ""} 
            ${chunkSize === 1 ? "grid-cols-1" : ""}`}
        >
          {group.map((item, i) => (
            <div
              key={i}
              bordered
              className="rounded-lg"
              style={{ boxShadow: "none !important" }}
            >
              <div className="">
                <div>
                  <button className={`${activebtn === item.title ? "font-medium  text-sm border-b-4 pb-2 rounded cursor-pointer" : "font-medium  text-sm pb-2 rounded cursor-pointer"}`} name={item.title} data-scroll={item.to} onClick={changeBtn}>{item.title}</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </Carousel>
  );
};

export default Antcustom;
