import { useState, useRef } from "react";
import NoidaExtention from "../Images/noidavsnoidaextention.png"
import { Link } from "react-router-dom";

const articles = [
  {
    id: 1,
    title: "Noida vs. Noida Extension Comparison",
    date: "Feb 16, 2022",
    img: NoidaExtention,
    link: '/blog/noida-vs-noida-extension-comparison'
  },
  {
    id: 2,
    title: "Yamuna Expressway: Buy The Dream Today, Enjoy Gains Tomorrow",
    date: "Feb 24, 2022",
    img: " https://d3eoh63gynpjzh.cloudfront.net/1769256244053-Ace%20153%20imag.jpg",
    link: '/blog/yamuna-expressway-buy-the-dream-today-enjoy-gains-tomorrow'
  },
  {
    id: 3,
    title: "Noida vs. Greater Noida: Which One is Right for You?",
    date: "Jun 26 2026",
    img:'https://d3eoh63gynpjzh.cloudfront.net/brandsdoor/1776427218293-amenities-external-1.jpg',
    link: '/blog/noida-vs-greater-noida'
  },
  {
    id: 4,
    title: "10-Step Guide to Buying A Property in NCR",
    date: "Jun 27 2026",
    img:'https://d3eoh63gynpjzh.cloudfront.net/brandsdoor/1775993901712-8.jpg',
    link: '/blog/guide-to-buying-a-property-in-ncr'
  }
];



export default function Blogone() {
  const [scrollIndex, setScrollIndex] = useState(0);
  const [btnHover, setBtnHover] = useState(false);
  const [nextHover, setNextHover] = useState(false);
  const articlesRef = useRef(null);

  const visibleCount = 4; // articles visible at once (desktop)
  const maxIndex = articles.length - visibleCount;

  const handleNext = () => {
    setScrollIndex((prev) => {
      const next = prev + 1 > maxIndex ? 0 : prev + 1;
      return next;
    });
  };

  return (
    <section
      className="w-full "
      style={{
        position: "relative",
      }}
    >
      {/* ── HERO CARD ── */}
      <div
        className="flex flex-col lg:flex-row justify-between overflow-hidden"
        style={{
          height:"550px",
        }}
      >
        {/* LEFT PANEL */}
        <div
          className="flex flex-col lg:justify-center w-full lg:w-[35%] order-2 lg:order-1"
        >
          {/* Category label */}
          <span
            className="block mb-4 tracking-widest uppercase"
            style={{
              fontSize: "16px",
              fontWeight: 700,
              color: "#0D6EFD",
              letterSpacing: "1px",
              fontFamily: "Inter, sans-serif",
            }}
          >
            BUY Now
          </span>

          {/* Main heading */}
          <h3
            className="mb-5 text-4xl"
            style={{
              fontWeight: 700,
              lineHeight: 1.2,
              color: "#0F172A",
            }}
          >
           Find the Perfect Address for Your Next Home
          </h3>

          {/* Description */}
          <p
            className="mb-8"
            style={{
              fontSize: "clamp(16px, 2vw, 24px)",
              fontWeight: 400,
              lineHeight: "1.65",
              color: "#64748B",
            }}
          >
            Explore Residential,
            Agricultural,
            Industrial and Commercial
            Plots/Land
          </p>

          {/* CTA */}
          <Link
            to="/blog/noida-vs-noida-extension-comparison"
            onMouseEnter={() => setBtnHover(true)}
            onMouseLeave={() => setBtnHover(false)}
            style={{
              width: "clamp(200px, 100%, 260px)",
              height: "72px",
              padding:"1px",
              background: btnHover ? "#005CE6" : "#0D6EFD",
              color: "#FFFFFF",
              borderRadius: "12px",
              fontSize: "clamp(16px, 1.8vw, 24px)",
              fontWeight: 600,
              fontFamily: "Inter, sans-serif",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              transform: btnHover ? "translateY(-2px)" : "translateY(0)",
              transition: "all 0.22s ease",
              boxShadow: btnHover
                ? "0 8px 24px rgba(13,110,253,0.35)"
                : "0 4px 12px rgba(13,110,253,0.2)",
            }}
          >
            Explore More
            <span style={{ fontSize: "1.2em", lineHeight: 1 }}>→</span>
          </Link>
        </div>

        {/* RIGHT IMAGE PANEL */}
        <div
          className="w-full lg:w-[62%] order-1 lg:order-2 relative overflow-hidden"
          style={{ minHeight: "280px", height: "auto", flexShrink: 0 }}
        >
          <img
            src='https://d3eoh63gynpjzh.cloudfront.net/brandsdoor/1775989095185-1.jpg'
            alt="Aerial view of residential and commercial plots"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              minHeight: "280px",
            }}
            className="rounded-lg"
          />

          
        </div>
      </div>

      {/* ── FLOATING ARTICLES CARD ── */}
      <div
        className="w-[92%] absolute left-1/2"
        style={{
          transform: "translateX(-50%)",
          bottom: "-108px",
          background: "#FFFFFF",
          borderRadius: "20px",
          boxShadow: "0 20px 60px rgba(15,23,42,0.12)",
          border: "1px solid #EEF2F7",
          minHeight: "160px",
          overflow: "hidden",
        }}
      >
        <div
          className="flex items-center"
          style={{ padding: "clamp(20px, 3vw, 32px)", gap: "clamp(16px, 2vw, 32px)" }}
        >
          {/* Featured text */}
          <div
            className="shrink-0 hidden sm:block"
            style={{ width: "clamp(140px, 20%, 200px)" }}
          >
            <h3
              style={{
                fontSize: "clamp(16px, 1.8vw, 26px)",
                fontWeight: 700,
                color: "#0F172A",
                fontFamily: "Inter, sans-serif",
                lineHeight: 1.3,
                marginBottom: "8px",
              }}
            >
              Choose your blog
            </h3>
            <p
              style={{
                fontSize: "clamp(12px, 1.1vw, 15px)",
                color: "#64748B",
                fontFamily: "Inter, sans-serif",
                lineHeight: 1.5,
              }}
            >
              Read from Beginners
              <br />
              check-list to Pro Tips
            </p>
          </div>

          {/* Divider */}
          <div
            className="hidden sm:block self-stretch shrink-0"
            style={{ width: "1px", background: "#E2E8F0", minHeight: "80px" }}
          />

          {/* Articles slider */}
          <div
            className="flex-1 overflow-hidden"
            ref={articlesRef}
            style={{ minWidth: 0 }}
          >
            <div
              style={{
                display: "flex",
                gap: "clamp(12px, 2vw, 24px)",
                transition: "transform 0.4s cubic-bezier(.4,0,.2,1)",
                transform: `translateX(calc(-${scrollIndex} * (clamp(180px, 22vw, 240px) + clamp(12px, 2vw, 24px))))`,
              }}
            >
              {articles.map((a) => (
                <article
                  key={a.id}
                  className="shrink-0 flex items-center cursor-pointer group"
                  style={{
                    width: "clamp(170px, 22vw, 240px)",
                    gap: "12px",
                  }}
                >
                  <Link to={a.link} className="w-[208px] h-[88px]"><img
                    src={a.img}
                    alt={a.title}
                    style={{
                      width: "88px",
                      height: "88px",
                      borderRadius: "10px",
                      objectFit: "cover",
                      flexShrink: 0,
                      transition: "transform 0.2s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "scale(1.04)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                  /></Link>
                  <div style={{ minWidth: 0 }}>
                    <Link to={a.link}><p
                      style={{
                        fontSize: "clamp(13px, 1.2vw, 18px)",
                        fontWeight: 600,
                        color: "#0F172A",
                        fontFamily: "Inter, sans-serif",
                        lineHeight: 1.4,
                        marginBottom: "6px",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {a.title}
                    </p></Link>
                    <span
                      style={{
                        fontSize: "clamp(11px, 1vw, 15px)",
                        color: "#94A3B8",
                        fontFamily: "Inter, sans-serif",
                      }}
                    >
                      {a.date}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Next button */}
          <button
            onClick={handleNext}
            onMouseEnter={() => setNextHover(true)}
            onMouseLeave={() => setNextHover(false)}
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              background: nextHover ? "#F1F5F9" : "#FFFFFF",
              border: "none",
              boxShadow: nextHover
                ? "0 16px 36px rgba(0,0,0,0.16)"
                : "0 12px 30px rgba(0,0,0,0.10)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              flexShrink: 0,
              transition: "all 0.2s ease",
              transform: nextHover ? "scale(1.08)" : "scale(1)",
            }}
            aria-label="Next articles"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0F172A"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>

      {/* ── RESPONSIVE STYLES ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

        @media (max-width: 640px) {
          .sm\\:hidden { display: none !important; }
        }

        @media (max-width: 768px) {
          /* Stack hero vertically on mobile */
        }

        @media (prefers-reduced-motion: reduce) {
          * { transition: none !important; }
        }
      `}</style>
    </section>
  );
}