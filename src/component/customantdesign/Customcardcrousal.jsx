import React, { useRef } from "react";
import { Carousel, Card, Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const Customcardcrousal = () => {
  const carouselRef = useRef(null);

  const goPrev = () => {
    carouselRef.current.prev();
  };

  const goNext = () => {
    carouselRef.current.next();
  };

  return (
    <div style={{ position: "relative", width: "80%", margin: "auto" }}>
      {/* Left button */}
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
        dots={false} // hide bottom dots
        slidesToShow={3} // show 3 cards at once
        infinite
        style={{ padding: "20px 0" }}
      >
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} style={{ padding: "0 10px" }}>
            <Card
              title={`Card ${item}`}
              bordered={true}
              style={{ width: 250, borderRadius: 12 }}
            >
              <p>Card content {item}</p>
            </Card>
          </div>
        ))}
      </Carousel>

      {/* Right button */}
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

export default Customcardcrousal;
