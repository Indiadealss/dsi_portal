import React, { useRef, useState } from "react";
import { Carousel, Card } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { FaPlay } from "react-icons/fa";

const Antdpropertydetailsimgcroul = ({ crousal = [], video = [] }) => {
  const carouselRef = useRef();

  const [activeSlide, setActiveSlide] = useState(0);
  const [playVideo, setPlayVideo] = useState(false);
  const [activeTab, setActiveTab] = useState("property"); // 🔥 tab state

  return (
    <Card className="w-full lg:w-[48%] relative overflow-hidden rounded-xl shadow-lg p-0">

      {/* 🔥 TOP TABS */}
      <div className="absolute top-0 left-0 w-full z-10 bg-gradient-to-b from-black/70 to-transparent text-white flex gap-6 px-4 py-3 font-medium">

        <button
          onClick={() => {
            setActiveTab("video");
            setPlayVideo(true);
          }}
          className={`border-b-2 pb-1 ${
            activeTab === "video" ? "border-white" : "border-transparent"
          }`}
        >
          Videos ({video.length})
        </button>

        <button
          onClick={() => {
            setActiveTab("property");
            setPlayVideo(false);
          }}
          className={`border-b-2 pb-1 ${
            activeTab === "property" ? "border-white" : "border-transparent"
          }`}
        >
          Property ({crousal.length})
        </button>

        <button
          onClick={() => setActiveTab("society")}
          className={`border-b-2 pb-1 ${
            activeTab === "society" ? "border-white" : "border-transparent"
          }`}
        >
          Society (0)
        </button>
      </div>

      {/* 🔥 VIDEO */}
      {activeTab === "video" && video?.length > 0 && (
        <video
          src={video[0].video}
          controls
          autoPlay
          className="w-full h-[40vw] lg:h-[32vw] object-cover"
        />
      )}

      {/* 🔥 PROPERTY IMAGES */}
      {activeTab === "property" && (
        <>
          <Carousel
            ref={carouselRef}
            arrows={false}
            infinite={false}
            dots={false}
            afterChange={(i) => setActiveSlide(i)}
          >
            {crousal.map((item, index) => (
              <div key={index}>
                <img
                  src={item.image}
                  alt={`property-${index}`}
                  className="w-full h-[40vw] lg:h-[32vw] object-cover"
                />
              </div>
            ))}
          </Carousel>

          {/* arrows */}
          <div
            onClick={() => carouselRef.current.prev()}
            className="absolute top-1/2 left-3 -translate-y-1/2 bg-black/40 hover:bg-black text-white p-2 rounded-full cursor-pointer"
          >
            <LeftOutlined />
          </div>

          <div
            onClick={() => carouselRef.current.next()}
            className="absolute top-1/2 right-3 -translate-y-1/2 bg-black/40 hover:bg-black text-white p-2 rounded-full cursor-pointer"
          >
            <RightOutlined />
          </div>

          {/* count */}
          <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
            {activeSlide + 1} / {crousal.length}
          </div>
        </>
      )}

      {/* 🔥 EMPTY STATE (Society) */}
      {activeTab === "society" && (
        <div className="flex items-center justify-center h-[40vw] lg:h-[32vw] text-gray-500">
          No Society Images
        </div>
      )}
    </Card>
  );
};

export default Antdpropertydetailsimgcroul;