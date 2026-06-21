import React, { useRef, useEffect } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import ProjectsCrousal from "./ProjectsCrousal";

const GAP = 16;

const PropertyList = ({ properties }) => {
  const propertyes = properties.filter((item) => item.hotScreen === true);

  const newCards = propertyes.map((item) => {
    const covers = item.images?.filter((img) => img.type === "cover") ?? [];
    const coverImages = covers.length
      ? covers
      : item.images?.filter((img) => img.type === "banner") ?? [];
    const coverSrc =
      coverImages.length > 0
        ? coverImages[0].src
        : "https://indiadealss.s3.eu-north-1.amazonaws.com/indiadealss/noImageBg.svg";

    const randomUnit =
      item.unitData?.[Math.floor(Math.random() * item.unitData.length)];
    const randomOfficeType =
      item.officeUnits?.[Math.floor(Math.random() * item.officeUnits.length)];
    const randomOfficeItem =
      randomOfficeType?.items?.[
        Math.floor(Math.random() * randomOfficeType.items.length)
      ];

    return {
      img: coverSrc,
      label: item.title,
      location: item.location,
      city: item.city,
      unitData: item.unitData,
      bhk: item.property === "residential" ? randomUnit?.specs?.bhk || "N/A" : null,
      size:
        item.property === "residential"
          ? randomUnit?.specs?.areaMax
            ? `${randomUnit.specs.areaMax} Sq.ft`
            : "N/A"
          : randomOfficeItem?.area
          ? `${randomOfficeItem.area} Sq.ft`
          : "N/A",
      officeData: item.officeUnits,
      devloper: item.devloper,
      property: item.property,
      npxid: item.npxid,
      price: item.price,
    };
  });

  const wrapperRef = useRef(null);   // overflow-hidden outer div
  const innerRef = useRef(null);     // the transformed flex track (2x cards)
  const positionRef = useRef(0);     // always increases for autoplay
  const halfWidthRef = useRef(0);    // width of ONE full set of cards
  const isPaused = useRef(false);
  const isNudging = useRef(false);
  const rafId = useRef(null);
  const resumeTimeout = useRef(null);
  const nudgeTimeout = useRef(null);
  const speed = 0.6; // px per frame, badhao/ghatao raftar ke liye

  const loopedCards = [...newCards, ...newCards];

  // measure total width of one set, on mount + resize
  useEffect(() => {
    const measure = () => {
      if (innerRef.current) {
        halfWidthRef.current = innerRef.current.scrollWidth / 2;
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [newCards.length]);

  // main animation loop — sirf forward, kabhi backward nahi
  useEffect(() => {
    const step = () => {
      const inner = innerRef.current;
      const half = halfWidthRef.current;

      if (inner && half > 0) {
        if (!isPaused.current && !isNudging.current) {
          positionRef.current += speed;
        }
        if (!isNudging.current) {
          let pos = positionRef.current % half;
          if (pos < 0) pos += half;
          inner.style.transform = `translateX(-${pos}px)`;
        }
      }
      rafId.current = requestAnimationFrame(step);
    };
    rafId.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId.current);
  }, []);

  const pauseAutoplay = () => {
    isPaused.current = true;
    clearTimeout(resumeTimeout.current);
  };

  const resumeAutoplayAfterDelay = (delay = 200) => {
    clearTimeout(resumeTimeout.current);
    resumeTimeout.current = setTimeout(() => {
      isPaused.current = false;
    }, delay);
  };

  const nudge = (dir) => {
    const inner = innerRef.current;
    const half = halfWidthRef.current;
    if (!inner || half <= 0) return;

    isNudging.current = true;
    pauseAutoplay();

    const cardWidth = (inner.firstChild?.offsetWidth || 280) + GAP;
    positionRef.current += dir * cardWidth;

    let pos = positionRef.current % half;
    if (pos < 0) pos += half;

    inner.style.transition = "transform 450ms cubic-bezier(0.22,1,0.36,1)";
    inner.style.transform = `translateX(-${pos}px)`;

    clearTimeout(nudgeTimeout.current);
    nudgeTimeout.current = setTimeout(() => {
      inner.style.transition = "";
      isNudging.current = false;
      resumeAutoplayAfterDelay(150);
    }, 450);
  };

  return (
    <div className="relative mt-[100px]">
      <div className="mb-[30px]">
        <h1 className="uppercase">
          <span className="heading-h3">HOT PROPERTIES</span>
        </h1>
      </div>

      <button
        type="button"
        onClick={() => nudge(-1)}
        className="hidden md:flex items-center justify-center absolute left-2 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white rounded-full shadow cursor-pointer hover:bg-[#84cc16] hover:text-white transition-all duration-300"
      >
        <FaAngleLeft />
      </button>

      <button
        type="button"
        onClick={() => nudge(1)}
        className="hidden md:flex items-center justify-center absolute right-2 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white rounded-full shadow cursor-pointer hover:bg-[#84cc16] hover:text-white transition-all duration-300"
      >
        <FaAngleRight />
      </button>

      <div
        ref={wrapperRef}
        onMouseEnter={pauseAutoplay}
        onMouseLeave={() => resumeAutoplayAfterDelay(200)}
        className="overflow-hidden"
      >
        <div ref={innerRef} className="flex gap-[16px] will-change-transform">
          {loopedCards.map((item, index) => (
            <div
              key={index}
              className="flex-[0_0_85%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] xl:flex-[0_0_20%] rounded-xl border border-gray-200 overflow-hidden shrink-0"
            >
              <ProjectsCrousal data={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyList;