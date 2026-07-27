import React, { useRef, useEffect, useState } from "react";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react"; // optional icons
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { getFeaturedProperties } from "../../api/api";

const mapPropertiesToCards = (properties) =>
  (properties || []).map((item) => {
    const covers = item.images?.filter((img) => img.type === "cover") ?? [];
    const coverImages = covers.length
      ? covers
      : item.images?.filter((img) => img.type === "banner") ?? [];

    const coverSrc =
      coverImages.length > 0
        ? coverImages[0].src
        : "https://indiadealss.s3.eu-north-1.amazonaws.com/indiadealss/noImageBg.svg";

    return {
      img: coverSrc,
      label: item.title || item.projecttitle || item.projectname,
      location: item.location,
      city: item.city,
      npxid: item.npxid,
    };
  });

const Smallmain = ({ title, data }) => {
  const sliderRef = useRef(null);
  const [card, setCard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const loadCards = async () => {
      if (data && data.length) {
        setCard(mapPropertiesToCards(data));
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const { data: res } = await getFeaturedProperties();
        if (!cancelled) setCard(mapPropertiesToCards(res?.data));
      } catch (error) {
        console.error("Failed to load featured properties", error);
        if (!cancelled) setCard([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadCards();

    return () => {
      cancelled = true;
    };
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

  const parseLocation = (location) => {
    if (typeof location === "string") {
      try {
        return JSON.parse(location);
      } catch {
        return null;
      }
    }
    return location;
  };

  const createSlug = (item) => {
    if (!item?.npxid) return "";

    const locationData = parseLocation(item.location);
    const city = locationData?.[0]?.City || "";

    return `${item.label}-${city}-npxid-${item.npxid}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  };

  if (loading) return <p className="text-center py-5">Loading...</p>;
  if (!card.length) return null;

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
              <Link to={`/${createSlug(item)}?preference=S`}><img
                src={item.img}
                alt={item.label}
                className="w-full h-32 rounded-lg object-cover rounded-t-xl"
              /></Link>
              <Link to={`/${createSlug(item)}?preference=S`}>
                <p className="py-2 text-sm font-medium cursor-pointer">
                  {item.label}
                </p>
              </Link>

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
