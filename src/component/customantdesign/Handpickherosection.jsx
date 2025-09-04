import React, { useRef } from "react";
import { WhatsAppOutlined, ArrowRightOutlined } from "@ant-design/icons";
import {Carousel, Typography, Button, Card, Tabs, List, Avatar } from "antd";
import Antddobluecardcrousal from "./Antddobluecardcrousal";

const { Title, Paragraph, Text } = Typography;

const Handpickherosection = ({content}) => {
  const propcontent = content[0];
  

  return (
    <div >
      {/* Hero Section */}
      <div
        style={{
            width:"100%",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "32px",
          alignItems: "center",
        }}
      >
        {/* Left Image */}
        <div>
          <img
            src={propcontent.img}
            alt="Home Banner"
            style={{ width: "100%", borderRadius: "12px" }}
          />
        </div>

        {/* Right Content */}
        <div className="w-[90%]">
          <p type="secondary" className="font-medium ms-2" strong>
           {propcontent.title.includes("Whatsapp") ? (
              <>
                Post via <WhatsAppOutlined />  Whatsapp <ArrowRightOutlined />
              </>
            ) : (
              propcontent.title
            )}
          </p>
          <h1 level={2} style={{ paddingRight:"10%" }}>
            {propcontent.subtitle}
          </h1>
          <p>
            {propcontent.subtitleDesc}
          </p>
          <Button type="primary" size="large">
            {propcontent.buttonName}
          </Button>
        </div>
      </div>

      {/* Articles Section */}
      <Card
  style={{
    marginTop: "-40px", // 👈 overlap upwards
    width:"90%",
    marginLeft:"5%",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
  }}
>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "30% 65%",
            gap: "32px",
          }}
        >
          {/* Left Side */}
          <div className="p-5">
            <h2  className="text-3xl font-bold">{propcontent.bannercontenttitle}</h2>
            <Paragraph type="secondary">
              Read from Beginners check-list to Pro Tips
            </Paragraph>
          </div>

          {/* Right Side Tabs */}
        <div>
  {/* <Carousel ref={carouselRef} {...settings}>
    {articleSlides.map((slide, idx) => (
      <div
        key={idx}
        className="grid grid-cols-2 gap-4 px-4" // 2 cols → with 4 items = 2 rows
      >
        {slide.map((item, i) => (
          <Card
            key={i}
            bordered
            className="rounded-lg"
            style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}
          >
            <div className="flex items-start gap-2">
              <img
                src={item.img}
                alt={item.title}
                className="rounded-lg w-10 h-10"
              />
              <div>
                <p className="font-medium text-sm">{item.title}</p>
                <span className="text-xs text-gray-500">{item.date}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    ))}
  </Carousel> */}
  <Antddobluecardcrousal articles={propcontent.articles} />
</div>

        </div>
      </Card>
    </div>
  );
};

export default Handpickherosection;
