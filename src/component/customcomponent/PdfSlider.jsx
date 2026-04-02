import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.min?url";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FaAngleRight } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";
import { AiOutlineFullscreen } from "react-icons/ai";
import { AiOutlineFullscreenExit } from "react-icons/ai";

import "swiper/css";
import "swiper/css/navigation";
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

// ✅ Proper Vite/Webpack-safe worker setup
pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;


export default function PdfSlider({ pdfUrl }) {

  // console.log(pdfjs.version);
  const [numPages, setNumPages] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [swiperRef,setSwiperRef] = useState(null);
  const [currentIndex,setCurrentIndex] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const openFullscreen = () => setIsFullscreen(true);
const closeFullscreen = () => setIsFullscreen(false);

  const wrapperRef = useRef(null);
  const [fullScreen,setFullScreen] = useState(false);

  const goFullScreen = () => {
    if(wrapperRef.current) {
      if(wrapperRef.current.requestFullscreen){
        wrapperRef.current.requestFullscreen();
        setFullScreen(true);
      }
    }
  }

  const exitFullScreen = () => {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  }
  setFullScreen(false);
};

     useEffect(() => {
  // Fires when user exits element fullscreen (ESC)
  const handleFullscreenChange = () => {
    if (!document.fullscreenElement) {
      setFullScreen(false);
    }
  };

  // Detect F11 & ESC manually
  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      exitFullScreen();
    }

    if (e.key === "F11") {
      setTimeout(() => {
        if (!document.fullscreenElement) {
          // User toggled browser fullscreen with F11
          exitFullScreen();
        }
      }, 250);
    }
  };

  document.addEventListener("fullscreenchange", handleFullscreenChange);
  window.addEventListener("keydown", handleKeyDown);

  return () => {
    document.removeEventListener("fullscreenchange", handleFullscreenChange);
    window.removeEventListener("keydown", handleKeyDown);
  };
}, []);



  const onDocLoad = ({ numPages }) => {
    setNumPages(numPages);
    setLoading(false);
  };

  const onError = () => {
    setError(true);
    setLoading(false);
  };

  return (
    <div ref={wrapperRef} className={`${fullScreen ? "w-full relative max-w-4xl mx-auto bg-neutral-800 shadow-lg rounded-xl ": "w-full  relative h-[10%]  mx-auto bg-neutral-800 shadow-lg rounded-xl"}`}>
      <div className=" absolute right-4 top-4 z-20">
                    {
  fullScreen ? (
    <AiOutlineFullscreenExit
    onClick={exitFullScreen}
    className="text-white text-3xl cursor-pointer"
    />
  ) : (
    
    <AiOutlineFullscreen
      onClick={goFullScreen}
      className="text-white text-3xl cursor-pointer"
    />
  )
}

                    </div>
      {loading && <p className="text-center text-gray-500">Loading brochure...</p>}
      {error && <p className="text-center text-red-500">Failed to load PDF</p>}

      {!error && (
        <Document file={pdfUrl} onLoadSuccess={onDocLoad} onLoadError={onError}>
          {numPages && (
            <Swiper
              spaceBetween={20}
              slidesPerView={1}
              navigation
              className="overflow-hidden"
              onSwiper={(swiper) => setSwiperRef(swiper)}
              onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex + 1)}
            >
              {Array.from({ length: numPages }, (_, index) => (
                <SwiperSlide key={index}>
                  <div className="flex justify-center w-full relative items-center w-full mt-2 ms-4">
                    
                  <Page
                    pageNumber={index + 1}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                    className={`${fullScreen ?  '' : 'mx-auto w-auto h-auto'}`}
                    width={`${fullScreen ?  1100 : 500}`}
                    
                  />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </Document>
      )}
          <div className="flex justify-center items-center rounded-b-xl gap-6 p-2 mt-2 bg-neutral-900 text-white">
            <button
            onClick={() => swiperRef?.slidePrev()}
            className="px-4 py-2 bg-white rounded-lg text-black cursor-pointer"
            >
               <FaAngleLeft />
            </button>

            <span className="text-white text-lg font-medium">{currentIndex} of {numPages}</span>

            <button 
            onClick={() => swiperRef?.slideNext()}
            className="px-4 py-2 bg-white text-black rounded cursor-pointer"
            >
             
              <FaAngleRight />
            </button>

          </div>
          
    </div>
  );
}
