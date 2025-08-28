import React, { useRef } from "react";
import { Carousel, Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const Customimagebar = () => {
  const carouselRef = useRef(null);

  const goPrev = () => {
    carouselRef.current.prev();
  };

  const goNext = () => {
    carouselRef.current.next();
  };

  const images = [
    "https://picsum.photos/400/250?random=1",
    "https://picsum.photos/400/250?random=2",
    "https://picsum.photos/400/250?random=3",
    "https://picsum.photos/400/250?random=4",
    "https://picsum.photos/400/250?random=5",
  ];

  return (
    <div style={{ position: "relative", width: "80%", margin: "auto" }}>
      {/* Left Button */}
      <Button
        shape="circle"
        icon={<LeftOutlined />}
        onClick={goPrev}
        style={{
          position: "absolute",
          top: "50%",
          left: "-40px",
          transform: "translateY(-50%)",
          zIndex: 1,
        }}
      />

      {/* Carousel */}
      <Carousel
        ref={carouselRef}
        dots={false}
        slidesToShow={3}   // show 3 images at once
        infinite
        style={{ padding: "20px 0" }}
      >
        {images.map((src, index) => (
          <div key={index} style={{ padding: "0 10px" }}>
            <div
              style={{
                borderRadius: 12,
                overflow: "hidden",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                margin:"10px"
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
            </div>
          </div>
        ))}
      </Carousel>

      {/* Right Button */}
      <Button
        shape="circle"
        icon={<RightOutlined />}
        onClick={goNext}
        style={{
          position: "absolute",
          top: "50%",
          right: "-40px",
          transform: "translateY(-50%)",
          zIndex: 1,
        }}
      />
    </div>
  );
};

export default Customimagebar;
