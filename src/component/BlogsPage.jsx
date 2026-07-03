import { useState } from "react";
import NoidaExtention from "../Images/noidavsnoidaextention.png";
import PropertyGuideCoverImage from "../Images/PropertyGuideCoverImage.png";
import experionSatori from "../Images/experionSatori.jpeg";
import { Link } from "react-router-dom";
import iNNERPAGE from "../Images/iNNERPAGE.png";
import Neighbourhood from "../Images/Neighbourhood.png";
import NCRPLOTS from "../Images/inner-image7.png";
import coverImage10Blog from "../Images/coverImage10Blog.png";

const heroPost = {
  id: 0,
  category: "Featured",
  title: "Exclusive Plot in Green Valley Estate: Premium Location, Unmatched Value",
  description:
    "Secure your dream land in one of the most sought-after gated communities. We sat down with our top consultant to explore why Green Valley Estate is the smartest real estate move of 2024.",
  image:
    "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1200&q=80",
};

const allPosts = [
  {
    id: 1,
    title: "Yamuna Expressway: Buy The Dream Today, Enjoy Gains Tomorrow",
    description:
      "When we look at the real estate landscape of the Delhi-NCR, it is impossible to ignore how the biggest and most expensive real estate markets of today, were once sparsely populated outskirts of the city. ",
    image: "https://d3eoh63gynpjzh.cloudfront.net/1769256244053-Ace%20153%20imag.jpg",
    author: "",
    avatar: "",
    date: "12 Mar 2024",
    link:'/blog/yamuna-expressway-buy-the-dream-today-enjoy-gains-tomorrow'
  },
  {
    id:2,
    title: "Noida vs. Greater Noida: Which One is Right for You?",
    description: "Choosing where to buy your dream home is a huge milestone, and naturally it feels like one of the biggest decisions you have ever made. Buying a home is a symbol of your hard work, dedication and success.",
    image:"https://d3eoh63gynpjzh.cloudfront.net/brandsdoor/1776427218293-amenities-external-1.jpg",
    author: "",
    avtar:"",
    date:"26 Jun 2026",
    link:'/blog/noida-vs-greater-noida'
  },
  {
    id:3,
    title:"Noida vs. Noida Extension Comparison: Where Should You Get Your NCR Dream Home?",
    description: "Finding the perfect spot for your dream home in the Delhi-NCR region often comes down to a classic real estate dilemma: should you move into an established, bustling hub, or buy into a rapidly growing, modern destination?",
    image:NoidaExtention,
    author: "",
    avtar:"",
    date:"26 Jun 2026",
    link:'/blog/noida-vs-noida-extension-comparison'
  },
  {
    id:4,
    title:"10-Step Guide to Buying A Property in NCR",
    description:"Buying a property in Delhi-NCR is an incredible milestone! But let’s be honest, the buying process can feel completely overwhelming.",
    image:PropertyGuideCoverImage,
    author:"",
    avtar:"",
    date:"27 Jun 2026",
    link: '/blog/guide-to-buying-a-property-in-ncr'
  },
  {
    id:5,
    title:"Project Watch: Noida Sector 151’s Experion Saatori",
    description:"When one is looking for a dream home along the high-growth corridor of the Noida-Greater Noida Expressway, the standard checklist includes the connectivity, urban conveniences, and established communites.",
    image:experionSatori,
    author:"",
    avtar:"",
    date:"28-06-2026",
    link:'/blog/project-watch-noida-sector-151-experion-saatori'
  },
  {
    id:7,
    title:"The Ultimate NCR Plot-Buying Guide",
    description:"When it comes to securing your own piece of land in the Delhi-NCR, the market shifts into a completely different gear compared to buying an apartment or a villa.",
    image:iNNERPAGE,
    author:"",
    avtar:"",
    date:"29-06-2026",
    link:'/blog/the-ultimate-ncr-plot-buying-guide'
  },
  {
    id:8,
    title:"Neighbourhood Watch: Sector 150, Noida is A Residential Oasis",
    description:"When people picture the Delhi-NCR skyline, they often think of towering concrete structures, packed lanes, and fast-paced commercial intersections.",
    image:Neighbourhood,
    author:"",
    avtar:"",
    date:"01-07-2026",
    link:'/blog/neighbourhood-watch-sector-150-noida-is-a-residential-oasis'
  },
  {
    id:9,
    title:"Greater Noida West: Affordable Suburb Turns Into Luxury Pin Code",
    description:"For nearly a decade, Greater Noida West (popularly known as Noida Extension) held a very specific and reliable identity in the Delhi-NCR real estate market. It was the absolute go-to destination for middle-income families and first-time homebuyers looking for spacious, budget-friendly apartments. ",
    image:NCRPLOTS,
    author:"",
    avtar:"",
    date:"02-07-2026",
    link:'/blog/greater-noida-west-affordable-suburb-turns-into-luxury-pin-code'
  },
  {
    id:10,
    title: "News: Godrej Properties Acquires Land Parcel in Noida, Sector 151",
    description:"The real estate corridor along the Noida-Greater Noida Expressway has fast become a darling of the market, as it offers prime lands, unbeatable connectivity, and buyers flocking to secure a property in the NCR.",
    image:coverImage10Blog,
    author:"",
    avtar:"",
    date:"03-07-2026",
    link:'/blog/news-godrej-properties-acquires-land-parcel-in-noida-sector-151'
  }
  
];

const INITIAL_VISIBLE = 6;
const LOAD_MORE_COUNT = 3;

export default function BlogsPage() {
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const [loading, setLoading] = useState(false);
  const [heroLoaded, setHeroLoaded] = useState(false);

  const visiblePosts = allPosts.slice(0, visibleCount);
  const hasMore = visibleCount < allPosts.length;

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setVisibleCount((c) => Math.min(c + LOAD_MORE_COUNT, allPosts.length));
      setLoading(false);
    }, 600);
  };

  return (
    <div className="bg-white min-h-screen w-full">
        {/* ── HERO ── */}
        <div className="relative w-full h-[220px] sm:h-[300px] lg:h-[380px] rounded-b-2xl lg:rounded-b-3xl overflow-hidden  group">
          <img
            src={heroPost.image}
            alt={heroPost.title}
            onLoad={() => setHeroLoaded(true)}
            className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03] ${
              heroLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
          {/* gradient overlay: left dark → right transparent */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.10) 100%)",
            }}
          />

          {/* content bottom-left */}
          <div className="absolute bottom-0 left-0 p-8 sm:p-10 lg:p-12 max-w-[75%] sm:max-w-[60%]">
            <span className="block text-white text-xs font-semibold uppercase tracking-widest mb-3 opacity-90">
              {heroPost.category}
            </span>
            <h1
              className="text-white font-bold leading-tight mb-3"
              style={{ fontSize: "clamp(22px, 3.5vw, 42px)", lineHeight: 1.15 }}
            >
              {heroPost.title}
            </h1>
            <p
              className="text-white text-sm sm:text-base leading-relaxed"
              style={{ opacity: 0.85 }}
            >
              {heroPost.description}
            </p>
          </div>

          {/* arrow button right-center */}
          <button
            className="absolute right-5 sm:right-8 top-1/2 -translate-y-1/2 w-14 h-14 sm:w-[72px] sm:h-[72px] rounded-full border-2 border-white/60 bg-white/10 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:bg-white/25 hover:border-white hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/60"
            aria-label="Read featured post"
          >
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 lg:px-16 pt-10 pb-16">

        

        {/* ── SECTION HEADING ── */}
        <h2 className="text-[#101828] font-bold text-xl sm:text-2xl mb-8">
          Recent blog posts
        </h2>

        {/* ── GRID ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {visiblePosts.map((post, idx) => (
            <BlogCard
              key={post.id}
              post={post}
              animationDelay={idx % LOAD_MORE_COUNT}
            />
          ))}
        </div>

        {/* ── LOAD MORE ── */}
        {hasMore && (
          <div className="flex justify-center mt-12">
            <button
              onClick={handleLoadMore}
              disabled={loading}
              className="inline-flex items-center gap-2 bg-[#101828] text-white text-sm font-medium px-7 py-2.5 rounded-lg shadow-sm hover:bg-[#1d2939] active:scale-95 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#101828]/40"
              style={{ minWidth: 140, height: 42 }}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                    <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round" />
                  </svg>
                  Loading…
                </>
              ) : (
                "Loading more..."
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function BlogCard({ post, animationDelay }) {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <article
      className="flex flex-col group cursor-pointer"
      style={{
        animation: `fadeSlideUp 0.45s ease both`,
        animationDelay: `${animationDelay * 80}ms`,
      }}
    >
      {/* Image */}
      <div className="w-full overflow-hidden rounded-2xl bg-[#F2F4F7]" style={{ aspectRatio: "16/10" }}>
        <Link to={post.link} ><img
          src={post.image}
          alt={post.title}
          onLoad={() => setImgLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-[1.04] ${
            imgLoaded ? "opacity-100" : "opacity-0"
          }`}
        /></Link>
      </div>

      {/* Content */}
      <div className="pt-4 flex flex-col flex-1">
        <Link to={post.link} ><h3
          className="text-[#101828] font-semibold leading-snug mb-3 line-clamp-2 group-hover:text-[#344054] transition-colors duration-200"
          style={{ fontSize: "clamp(16px, 1.4vw, 22px)" }}
        >
          {post.title}
        </h3></Link>
        <p className="text-[#667085] text-[15px] leading-relaxed line-clamp-3 mb-3 flex-1 cursor-default">
          {post.description}
        </p>

        {/* Meta */}
        {/* <div className="flex items-center gap-2 mt-auto">
          <img
            src={post.avatar}
            alt={post.author}
            className="w-5 h-5 rounded-full object-cover flex-shrink-0"
          />
          <span className="text-[#667085] text-[13px] font-medium">
            {post.author}
          </span>
          <span className="text-[#98A2B3] text-[13px]">•</span>
          <span className="text-[#98A2B3] text-[13px]">{post.date}</span>
        </div> */}
      </div>

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </article>
  );
}