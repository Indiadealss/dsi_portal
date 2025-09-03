import React, { useRef } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Carousel, Card,Button } from "antd";

const Antddobluecardcrousal = () => {
  const carouselRef = useRef(null);

  const articles = [
    {
      title: "UP women homebuyers get 1% stamp duty rebate",
      date: "Jul 28, 2025",
      img: "https://picsum.photos/200/140?random=1",
    },
    {
      title: "Oberoi Realty to enter Gurgaon market",
      date: "May 20, 2025",
      img: "https://picsum.photos/200/140?random=2",
    },
    {
      title: "UP w homebuyers get 1% stamp duty rebate",
      date: "Jul 28, 2026",
      img: "https://picsum.photos/200/140?random=3",
    },
    {
      title: "Oberoi Real to enter Gurgaon market",
      date: "May 20, 2026",
      img: "https://picsum.photos/200/140?random=4",
    },
    {
      title: "UP women homebuyers get 1% stamp duty rebate",
      date: "Jul 28, 2025",
      img: "https://picsum.photos/200/140?random=1",
    },
    {
      title: "Oberoi Realty to enter Gurgaon market",
      date: "May 20, 2025",
      img: "https://picsum.photos/200/140?random=2",
    },
    {
      title: "UP w homebuyers get 1% stamp duty rebate",
      date: "Jul 28, 2026",
      img: "https://picsum.photos/200/140?random=3",
    },
    {
      title: "Oberoi Real to enter Gurgaon market",
      date: "May 20, 2026",
      img: "https://picsum.photos/200/140?random=4",
    },
  ];

  // Helper to chunk array
  const chunkArray = (arr, size) =>
    arr.reduce((acc, _, i) => {
      if (i % size === 0) acc.push(arr.slice(i, i + size));
      return acc;
    }, []);

  // Default: Desktop (2x2 → 4 per slide)
  let chunkSize = 2;

  // Detect screen width (can also use react-responsive or custom hook)
  const width = window.innerWidth;
  if (width < 640) {
    chunkSize = 1; // Mobile
  } else if (width < 1024) {
    chunkSize = 2; // Tablet
  }

  const articlePairs = chunkArray(articles, chunkSize);

    // 👉 custom arrows
  const CustomPrevArrow = ({ onClick }) => (
    <Button
      onClick={onClick}
      className="!absolute !left-2 !top-1/2 !-translate-y-1/2 bg-black/60 text-white rounded-full z-10"
      icon={<LeftOutlined />}
    />
  );

  const CustomNextArrow = ({ onClick }) => (
    <Button
      onClick={onClick}
      className="!absolute !right-2 !top-1/2 !-translate-y-1/2 bg-black/60 text-white rounded-full z-10"
      icon={<RightOutlined />}
    />
  );

  const settings = {
    dots: false,
    infinite: false,
    arrows: true,
    slidesToShow: 2, // show one pair at a time
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
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


  return (
    <Carousel ref={carouselRef} {...settings} dots arrows infinite={false}>
      {articlePairs.map((group, idx) => (
        <div
          key={idx}
          className={`grid gap-4 px-4 
            ${chunkSize === 4 ? "grid-cols-2 grid-rows-2" : ""} 
            ${chunkSize === 2 ? "grid-cols-2" : ""} 
            ${chunkSize === 1 ? "grid-cols-1" : ""}`}
        >
          {group.map((item, i) => (
            <div
              key={i}
              bordered
              className="rounded-lg"
              style={{ boxShadow: "none !important" }}
            >
              <div className="flex gap-3 items-center p-3">
                <img
                  src={item.img}
                  alt={item.title}
                  className="rounded-lg w-15 h-15 object-cover"
                />
                <div className="border-b border-gray-300 pb-4">
                  <p className="font-medium text-sm">{item.title}</p>
                  <span className="text-xs text-gray-500">{item.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </Carousel>
  );
};

export default Antddobluecardcrousal;
