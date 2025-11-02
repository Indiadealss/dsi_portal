import React, { useRef, useEffect, useState } from "react";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react"; // optional icons
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

const Smallmain = ({ title, data }) => {
  const sliderRef = useRef(null);
  const [card, setCard] = useState([]);


  const elCard = [
    { img: 'https://indiadealss.s3.eu-north-1.amazonaws.com/indiadealss/Bhutani.497cb9c2.png', label: "ATS Kingston Heath", description: "2, 3, 4 BHK Apartment in Sector 110, Noida", price: "₹ 36,000 onwards" },
    { img: 'https://indiadealss.s3.eu-north-1.amazonaws.com/indiadealss/Gaurs.85564924.png', label: "ATS Kingston Heath", description: "3, 4 BHK Apartment in Sector 150, Noida", price: "₹ 36,000 onwards" },
    { img: 'https://indiadealss.s3.eu-north-1.amazonaws.com/indiadealss/m3m.aa9e165b.png', label: "ATS Kingston Heath", description: "3, 4, 5 BHK Apartment in Sector 168, Noida", price: "₹ 36,000 onwards" },
    { img: 'https://indiadealss.s3.eu-north-1.amazonaws.com/indiadealss/Prestige.76918ca7.png', label: "ATS Kingston Heath", description: "2, 3 BHK Apartment in Sector 100, Noida", price: "₹ 36,000 onwards" },
    { img: 'https://indiadealss.s3.eu-north-1.amazonaws.com/indiadealss/Irish.ac2de9f3.png', label: "ATS Kingston Heath", description: "2, 3 BHK Apartment in Sector 100, Noida", price: "₹ 36,000 onwards" },
    { img: 'https://indiadealss.s3.eu-north-1.amazonaws.com/indiadealss/Dlf.6cb4c42a.png', label: "ATS Kingston Heath", description: "2, 3 BHK Apartment in Sector 100, Noida", price: "₹ 36,000 onwards" },
    { img: 'https://indiadealss.s3.eu-north-1.amazonaws.com/indiadealss/Group108o.ee6a8587.png', label: "ATS Kingston Heath", description: "2, 3 BHK Apartment in Sector 100, Noida", price: "₹ 36,000 onwards" },
    { img: 'https://indiadealss.s3.eu-north-1.amazonaws.com/indiadealss/Bhutani.497cb9c2.png', label: "ATS Kingston Heath", description: "2, 3 BHK Apartment in Sector 100, Noida", price: "₹ 36,000 onwards" },
    { img: 'https://indiadealss.s3.eu-north-1.amazonaws.com/indiadealss/Gaurs.85564924.png', label: "ATS Kingston Heath", description: "2, 3 BHK Apartment in Sector 100, Noida", price: "₹ 36,000 onwards" },
    { img: 'https://indiadealss.s3.eu-north-1.amazonaws.com/indiadealss/m3m.aa9e165b.png', label: "ATS Kingston Heath", description: "2, 3 BHK Apartment in Sector 100, Noida", price: "₹ 36,000 onwards" },
    { img: 'https://indiadealss.s3.eu-north-1.amazonaws.com/indiadealss/Prestige.76918ca7.png', label: "ATS Kingston Heath", description: "2, 3 BHK Apartment in Sector 100, Noida", price: "₹ 36,000 onwards" },
    { img: 'https://indiadealss.s3.eu-north-1.amazonaws.com/indiadealss/Irish.ac2de9f3.png', label: "ATS Kingston Heath", description: "2, 3 BHK Apartment in Sector 100, Noida", price: "₹ 36,000 onwards" },
    { img: 'https://indiadealss.s3.eu-north-1.amazonaws.com/indiadealss/Dlf.6cb4c42a.png', label: "ATS Kingston Heath", description: "2, 3 BHK Apartment in Sector 100, Noida", price: "₹ 36,000 onwards" },
  ];

  useEffect(() => {
    if (!data || !data.length){
      setCard(elCard)
    }else{

    const newCards = data.map((item) => {
      const coverImages = item.images?.filter((img) => img.type === "cover") || [];
      console.log(item._id);
      
      const coverSrc =
        coverImages.length > 0
          ? coverImages[0].src
          : "https://indiadealss.s3.eu-north-1.amazonaws.com/indiadealss/noImageBg.svg";

      return { img: coverSrc, label: item.title,id:item.id };
    });
    setCard(newCards);
  }
    

  }, [data]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  const goNext = () => sliderRef.current.slickNext();
  const goPrev = () => sliderRef.current.slickPrev();

  if (!card.length) return <p className="text-center py-5">Loading...</p>;

  return (
    <div className="relative w-[90%] mx-auto my-5">
      <h2 className="text-center my-5">
        <span className="font-bold text-xs text-gray-500">{title}</span>
      </h2>

      {/* Prev button */}
      <button
        onClick={goPrev}
        className="absolute left-[-20px] top-1/2 -translate-y-1/2 z-10 bg-gray-100 hover:bg-gray-200 p-2 rounded-full shadow"
      >
        <ChevronLeft size={18} />
      </button>

      <Slider ref={sliderRef} {...settings}>
        {card.map((item, i) => (
          <div key={i} className="px-2">
            <div className="bg-white  overflow-hidden text-center">
              <img
                src={item.img}
                alt={item.label}
                className="w-full h-32 rounded-lg object-cover rounded-t-xl"
              />
              <Link to={`/projectDetails/${item.id}`}><p className="py-2 text-sm font-medium cursor-pointer" >{item.label}</p></Link>
            </div>
          </div>
        ))}
      </Slider>

      {/* Next button */}
      <button
        onClick={goNext}
        className="absolute right-[-20px] top-1/2 -translate-y-1/2 z-10 bg-gray-100 hover:bg-gray-200 p-2 rounded-full shadow"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

export default Smallmain;
