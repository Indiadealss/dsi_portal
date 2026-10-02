import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.min?url";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaAngleRight } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";
import { AiOutlineFullscreen } from "react-icons/ai";
import { AiOutlineFullscreenExit } from "react-icons/ai";
import { Download } from "lucide-react";

import "swiper/css";
import { Mosaic } from "react-loading-indicators";

// ✅ Proper Vite/Webpack-safe worker setup
pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

// Every brochure renders inside the same fixed frame, whatever its page shape
// (portrait / landscape / mixed): each page is scaled to fit and centred.
const FRAME_RATIO = 0.62;      // frame height = width * ratio
const FRAME_MAX_HEIGHT = 520;
const FRAME_MIN_HEIGHT = 260;
const FRAME_PADDING = 24;      // breathing room around the page
const TOOLBAR_HEIGHT = 72;

export default function PdfSlider({ pdfUrl, onDownload }) {
  const [numPages, setNumPages] = useState(null);
  const [error, setError] = useState(false);
  const [swiperRef, setSwiperRef] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [fullScreen, setFullScreen] = useState(false);
  const [frameWidth, setFrameWidth] = useState(0);
  const [pageRatios, setPageRatios] = useState({}); // pageNumber -> width / height

  const wrapperRef = useRef(null);
  const frameRef = useRef(null);

  const goFullScreen = () => {
    if (wrapperRef.current?.requestFullscreen) {
      wrapperRef.current.requestFullscreen();
      setFullScreen(true);
    }
  };

  const exitFullScreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
    setFullScreen(false);
  };

  useEffect(() => {
    setError(false);
    setNumPages(null);
    setCurrentIndex(1);
    setPageRatios({});
  }, [pdfUrl]);

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

  // keep the frame size in sync with the available width
  useEffect(() => {
    if (!frameRef.current) return;
    const observer = new ResizeObserver(([entry]) => {
      const width = Math.floor(entry.contentRect.width);
      setFrameWidth((prev) => (Math.abs(prev - width) > 1 ? width : prev));
    });
    observer.observe(frameRef.current);
    return () => observer.disconnect();
  }, []);

  const frameHeight = fullScreen
    ? window.innerHeight - TOOLBAR_HEIGHT
    : Math.min(FRAME_MAX_HEIGHT, Math.max(FRAME_MIN_HEIGHT, frameWidth * FRAME_RATIO));

  // fit a page inside the frame without distorting it
  const pageSize = (pageNumber) => {
    const innerW = Math.max(frameWidth - FRAME_PADDING * 2, 0);
    const innerH = Math.max(frameHeight - FRAME_PADDING * 2, 0);
    const ratio = pageRatios[pageNumber];
    if (!ratio || !innerW) return { height: innerH };
    return ratio > innerW / innerH ? { width: innerW } : { height: innerH };
  };

  const onDocLoad = ({ numPages }) => {
    setNumPages(numPages);
  };

  const onError = (error) => {
    console.log("PDF Error:", error);
    setError(true);
  };

  const onPageLoad = (page) => {
    const { pageNumber, originalWidth, originalHeight } = page;
    if (!originalHeight) return;
    setPageRatios((prev) =>
      prev[pageNumber] ? prev : { ...prev, [pageNumber]: originalWidth / originalHeight }
    );
  };

  const centred = "flex items-center justify-center";

  return (
    <div
      ref={wrapperRef}
      // contain:inline-size -> the rendered page can never widen the layout (avoids a resize feedback loop in flex parents)
      className={`w-full min-w-0 max-w-full overflow-hidden bg-white [contain:inline-size] ${fullScreen ? "h-screen" : "rounded-2xl border border-gray-200 shadow-sm"}`}
    >
      {/* Frame */}
      <div
        ref={frameRef}
        className="relative w-full min-w-0 overflow-hidden bg-gradient-to-b from-slate-50 to-slate-100"
        style={{ height: frameHeight }}
      >
        <button
          type="button"
          onClick={fullScreen ? exitFullScreen : goFullScreen}
          aria-label={fullScreen ? "Exit full screen" : "View full screen"}
          className="absolute right-3 top-3 z-20 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/90 text-gray-600 shadow-md transition hover:bg-white hover:text-[#007BE2]"
        >
          {fullScreen ? <AiOutlineFullscreenExit size={20} /> : <AiOutlineFullscreen size={20} />}
        </button>

        {error ? (
          <div className={`${centred} h-full text-sm text-gray-500`}>
            Brochure preview is not available right now.
          </div>
        ) : (
          frameWidth > 0 && (
            <Document
              file={pdfUrl}
              loading={
                <div className={`${centred} h-full`} style={{ height: frameHeight }}>
                  <Mosaic color="#3183cc" size="medium" text="" textColor="" />
                </div>
              }
              error={
                <div className={`${centred} text-sm text-gray-500`} style={{ height: frameHeight }}>
                  Brochure preview is not available right now.
                </div>
              }
              onLoadSuccess={onDocLoad}
              onLoadError={onError}
            >
              {numPages && (
                <Swiper
                  spaceBetween={20}
                  slidesPerView={1}
                  style={{ height: frameHeight }}
                  onSwiper={setSwiperRef}
                  onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex + 1)}
                >
                  {Array.from({ length: numPages }, (_, index) => (
                    <SwiperSlide key={index}>
                      <div className={`${centred} h-full w-full`}>
                        {Math.abs(index - (currentIndex - 1)) <= 1 && (
                          <Page
                            pageNumber={index + 1}
                            renderTextLayer={false}
                            renderAnnotationLayer={false}
                            onLoadSuccess={onPageLoad}
                            loading=""
                            className="overflow-hidden rounded-md bg-white shadow-xl ring-1 ring-black/5"
                            {...pageSize(index + 1)}
                          />
                        )}
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </Document>
          )
        )}
      </div>

      {/* Toolbar */}
      <div
        className="flex items-center justify-between gap-3 border-t border-gray-200 bg-white px-4"
        style={{ height: TOOLBAR_HEIGHT }}
      >
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => swiperRef?.slidePrev()}
            disabled={!numPages || currentIndex <= 1}
            aria-label="Previous page"
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-gray-300 text-gray-700 transition hover:border-[#007BE2] hover:text-[#007BE2] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <FaAngleLeft />
          </button>

          <span className="min-w-[64px] text-center text-sm font-medium text-gray-700">
            {numPages ? `${currentIndex} / ${numPages}` : "– / –"}
          </span>

          <button
            type="button"
            onClick={() => swiperRef?.slideNext()}
            disabled={!numPages || currentIndex >= numPages}
            aria-label="Next page"
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-gray-300 text-gray-700 transition hover:border-[#007BE2] hover:text-[#007BE2] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <FaAngleRight />
          </button>
        </div>

        {onDownload && (
          <button
            type="button"
            onClick={onDownload}
            className="flex h-10 cursor-pointer items-center gap-2 rounded-full bg-[#007BE2] px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0068c0]"
          >
            <Download size={16} />
            <span className="hidden sm:inline">Download Brochure</span>
            <span className="sm:hidden">Download</span>
          </button>
        )}
      </div>
    </div>
  );
}
