import { useRef } from "react";
import { Carousel, Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Shield, CheckCircle, Play } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const settings = {
  dots: false,
  infinite: false,
  arrows: false,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    { breakpoint: 1280, settings: { slidesToShow: 3 } },
    { breakpoint: 900, settings: { slidesToShow: 2 } },
    { breakpoint: 600, settings: { slidesToShow: 1 } },
  ],
};

function SellerCard({ seller }) {
  const name = seller.brokerName || "Property Advisor";
  const thumb = seller.promotionalVideo || seller.brokerLogo;

  return (
    <div className="px-2">
      <div
        className="relative rounded-xl overflow-hidden h-[340px] flex flex-col justify-between text-white bg-gradient-to-br from-slate-700 to-slate-900"
        style={thumb ? { backgroundImage: `url(${thumb})`, backgroundSize: "cover", backgroundPosition: "center" } : undefined}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/10 to-black/70" />

        {/* Badges */}
        <div className="relative z-10 flex flex-col items-start gap-1 p-3">
          <span className="flex items-center gap-1 bg-[#7a6428] text-white text-[11px] font-semibold px-3 py-1 rounded-full">
            <Shield size={12} /> RERA Registered
          </span>
          <span className="flex items-center gap-1 bg-[#7a6428] text-white text-[11px] font-semibold px-3 py-1 rounded-full">
            <CheckCircle size={12} /> Property Advisor
          </span>
        </div>

        {/* Play button */}
        {seller.promotionalVideo && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="w-12 h-12 rounded-full bg-white/25 backdrop-blur flex items-center justify-center">
              <Play size={20} fill="white" className="text-white ml-0.5" />
            </div>
          </div>
        )}

        {/* Footer: avatar + name + button */}
        <div className="relative z-10 p-3 flex flex-col items-start gap-2">
          {seller.brokerLogo && (
            <div className="w-12 h-12 rounded-full bg-white border-2 border-white overflow-hidden flex items-center justify-center">
              <img src={seller.brokerLogo} alt={name} className="w-full h-full object-contain" />
            </div>
          )}
          <p className="text-sm font-semibold">{name}</p>
          <button className="w-full bg-white text-blue-600 text-sm font-medium py-2 rounded-md hover:bg-blue-50 transition-all">
            View Number
          </button>
        </div>
      </div>
    </div>
  );
}

export default function SellerCarousel({ sellers }) {
  const carouselRef = useRef(null);
  const activeSellers = sellers?.filter((s) => s.campaignStatus !== "Inactive") || [];

  if (!activeSellers.length) return null;

  return (
    <div>
      <div className="flex justify-between items-center flex-col md:flex-row gap-2 mb-3">
        <h2 className="heading-h6 text-gray-800 uppercase tracking-wide"><span className="font-bold">Sellers you may contact for more details</span></h2>
        <button className="text-sm text-blue-600 font-medium">View All Sellers</button>
      </div>

      <div style={{ position: "relative" }}>
        <Button
          shape="circle"
          icon={<LeftOutlined />}
          onClick={() => carouselRef.current?.prev()}
          style={{ position: "absolute", top: "40%", left: -15, transform: "translateY(-50%)", zIndex: 1 }}
        />
        <Carousel ref={carouselRef} {...settings}>
          {activeSellers.map((seller, i) => (
            <SellerCard key={seller._id || i} seller={seller} />
          ))}
        </Carousel>
        <Button
          shape="circle"
          icon={<RightOutlined />}
          onClick={() => carouselRef.current?.next()}
          style={{ position: "absolute", top: "40%", right: -15, transform: "translateY(-50%)", zIndex: 1 }}
        />
      </div>
    </div>
  );
}
