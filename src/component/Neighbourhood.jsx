import React, { useState, useEffect, useRef } from "react";
import NCRPLOTS from "../Images/NCR-PLOTS.png"
import { Link } from "react-router-dom";
import Seo from "../component/Seo";

// ── BLOG CONTENT ─────────────────────────────────────────────────────────────
const blog = [
    {
    type: "h2",
    id:"neighbourhood-watch",
    text: "Neighbourhood Watch: Sector 150, Noida is A Residential Oasis",
  },
  {
    type: "p",
    text: "When people picture the Delhi-NCR skyline, they often think of towering concrete structures, packed lanes, and fast-paced commercial intersections.",
  },
  {
    type: "p",
    text: "However, on the southern edge of the Noida-Greater Noida Expressway, a completely different architectural blueprint has come to life. Sector 150 of Noida.",
  },
  {
    type: "p",
    text: `Sector 150, Noida stands as a masterclass in modern, health-first urban planning. The low-density Sector 150 is deliberately designed as a simple, spectacular space with massive expanses of land strictly reserved for lush green open spaces.`,
  },
  {
    type: "p",
    text:"If you are looking for a dream home that trades the typical urban high-energy lifestyle, for pristine air, wider roads, and world-class infrastructure, this is where your search ends."
  },
  {
    type: "h2",
    id:"Low-Density",
    text: "Sector 150 Noida: The Serene, Low-Density Suburban Character",
  },
  {
    type: "p",
    text: "In most city hubs, you step out of your building onto a cramped service lane. In Sector 150, you step out into an expansive, nature-centric sanctuary.",
  },
  {
    type: "p",
    text: "At the heart of the sector's green ecosystem lies the magnificent 42-acre Shaheed Bhagat Singh Park, one of the largest residential parks in the entire region, complete with landscaped water features and tree-lined pathways."
  },
  {
    type: "p",
    text: "As Sector 150 is structurally low-density, individual residential towers in projects sit comfortably apart."
  },
  {
    type: "p",
    text: "The sector features wide internal concrete roads, overhead wire-free underground cabling, and beautifully designed forest patches that create an elite, uncluttered suburban vibe."
  },
  {
    type: "h2",
    id:"world-clss-sports-infrastructure",
    text:"World-Class Sports Infrastructure"
  },
  {
    type: "p",
    text: "What truly sets Sector 150 apart from any other residential sectors is its designation as a premier Sports City."
  },
  {
    type: "p",
    text: "Rather than standard apartment lifestyle amenities, residents here enjoy proximity to a massive multi-purpose stadium with seating capacities for 40,000 spectators, an expansive 9-hole golf course, multiple cricket pitches, and elite tennis, badminton, and swimming academies."
  },
  {
    type:"p",
    text:"For growing families and sports enthusiasts, it brings a health-focused, active lifestyle straight to your doorstep."
  },
  {
    type:"p",
    text:`Projects like ACE Golfshire feature a variety of in-house sports amenities and within this ACE Golfshire stands out as having an exclusive Golf Course for the residents - embodying the ethos of the sports city.`
  },
  {
    type: "h2",
    id:"flawless-urban-connectivity ",
    text: "Flawless Urban Connectivity ",
  },
  {
    type: "p",
    text: "While Sector 150 provides a quiet, stress-free escape from city noise, it keeps you perfectly plugged into every vital commercial nerve center.",
  },
  {
    type: "p",
    text: "Situated directly on the Noida-Greater Noida Expressway, when living in Sector 150 your daily commute to major IT and business hubs in Sectors 132, 135, and 142 becomes a comfortable, scenic drive."
  },
  {
    type: "p",
    text: "The sector sits at the sweet spot where the Noida Expressway meets the Yamuna Expressway and connects seamlessly to the Eastern Peripheral Expressway giving you connectivity to three major roadways."
  },
  {
    type: "p",
    text: "This upscale character is also carried over to projects in the sector. One such project is ACE Parkway, which is widely known for having contributions from Gauri Khan (interior design), Hafeez Contractor (architecture), and Sanju Bose (landscaping)."
  },
  {
    type: "p",
    text: "For frequent flyers, the sector is especially lucrative as it sits a comfortable 30-minute drive away from the Noida International Airport at Jewar. This also ensures incredible long-term capital appreciation for property owners."
  },
  {
    type: "h2",
    text: "A Hub of Premium Societies",
  },
  {
    type: "p",
    text: "Recognizing the unparalleled potential of this green belt, India’s absolute finest real estate developers have anchored their signature luxury portfolios here.",
  },
  {
    type: "p",
    text: "From smart, tech-driven townships to resort-themed low-rise communities. The sector features the massive ATS Le Grandiose project, which is known for having premium homes, upscale residential amenities and offering seamless connectivity to Noida and Greater Noida."
  },
  {
    type: "p",
    text: "Furthermore, the social infrastructure surrounding the expressway is mature. Prestigious educational institutions, multi-specialty healthcare centers, and corporate office spaces are all located within a short drive."
  },
  {
    type:"h2",
    text: "The Verdict"
  },
  {
    type: "p",
    text:"Choosing Noida, Sector 150 is a wonderful option for those looking for a lifestyle upgrade. It successfully balances luxury amenities and spacious home designs with a calm, sports-centric, suburban charm. Whether you are looking to put down permanent roots with your family or secure a highly liquid asset along the NCR's most lucrative growth corridor, Sector 150 is a choice you can make with absolute confidence!"
  },
];

// ── SIDEBAR DYNAMIC CONTENT ───────────────────────────────────────────────────
const relatedArticles = [
  {
    title: "Noida vs. Noida Extension Comparison: Where Should You Get Your NCR Dream Home?",
    date: "Jun 26, 2026",
    tag: "Investment",
    tagColor: "#0D6EFD",
    img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=200&q=80",
    link: 'noida-vs-noida-extension-comparison'
  },
];

const quickFacts = [
  {
    label: "Avg. Price/sqft (Noida)",
    value: "₹8,200",
    trend: "↑ 9%",
    up: true,
  },
  {
    label: "Avg. Price/sqft (Greater Noida)",
    value: "₹6,300",
    trend: "↑ 16%",
    up: true,
  },
  {
    label: "Metro Connectivity",
    value: "Aqua & Blue Line",
    trend: "Well Connected",
    up: true,
  },
  {
    label: "Growth Potential",
    value: "High",
    trend: "Rapid Development",
    up: true,
  },
];

const tableOfContents = [
    { id: "ultimate-ncr-plot", label: "The Ultimate NCR Plot-Buying Guide" },
  { id: "the-green-flags-when-buying-a-plot", label: "The Green Flags When Buying A Plot In A Township" },
  { id: "the-green-flags-when-buying-resale-seller-or-authority-plots", label: "The Green Flags When Buying Resale, Seller or Authority Plots" },
];

// ── INLINE LINK MAP ───────────────────────────────────────────────────────────
// Add any keyword → URL pair here.
// Longer phrases are matched first ("Noida Extension" before "Noida").
// Each keyword is linked only on its FIRST occurrence per text block.
const LINK_MAP = [
  { word: "IRISH PLATINUM", href: "/irish-platinum-greater-noida-npxid-87a7f",  title: "IRISH PLATINUM" },
  { word: 'ACE TERRA', href:"/ace-terra-greater-noida-npxid-3c960", title: "ACE TERRA"},
  { word: "Ace 153", href:"/ace-153-noida-npxid-8787d", title: "Ace 153"}
];

/**
 * renderWithLinks(text)
 * Splits a plain string into React nodes, turning matched keywords into <a> tags.
 * - Longest keyword wins (so "Noida Extension" beats "Noida").
 * - Each keyword is only linked once per call (first occurrence).
 */
function renderWithLinks(text) {
  if (!text) return text;

  // Sort longest-first so multi-word phrases take priority
  const sorted = [...LINK_MAP].sort((a, b) => b.word.length - a.word.length);
  const pattern = sorted
    .map((l) => l.word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|");
  const regex = new RegExp(`(${pattern})`, "g");

  const used = new Set(); // link each keyword only once per text block
  return text.split(regex).map((part, i) => {
    const def = sorted.find((l) => l.word === part);
    if (def && !used.has(def.word)) {
      used.add(def.word);
      return (
        <a
          key={i}
          href={def.href}
          title={def.title}
          style={{
            color: "#0D6EFD",
            fontWeight: 600,
            textDecoration: "none",
            borderBottom: "1.5px solid #93C5FD",
            paddingBottom: "1px",
            transition: "color 0.18s ease, border-color 0.18s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#1D4ED8";
            e.currentTarget.style.borderColor = "#1D4ED8";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#0D6EFD";
            e.currentTarget.style.borderColor = "#93C5FD";
          }}
        >
          {part}
        </a>
      );
    }
    return part;
  });
}

// ── HELPERS ───────────────────────────────────────────────────────────────────
function slugify(text = "") {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

// ── SUB-COMPONENTS ────────────────────────────────────────────────────────────
function BlogH2({ id, text }) {
  return (
    <h2
      id={id || slugify(text)}
      style={{
        fontSize: "clamp(20px, 2.5vw, 28px)",
        fontWeight: 700,
        color: "#0F172A",
        fontFamily: "Inter, sans-serif",
        marginTop: "40px",
        marginBottom: "16px",
        lineHeight: 1.3,
        paddingBottom: "10px",
        borderBottom: "2px solid #EEF2F7",
      }}
    >
      {typeof text === "string" ? renderWithLinks(text) : text}
    </h2>
  );
}

function BlogP({ text, idx }) {
  return (
    <p
      style={{
        fontSize: "clamp(15px, 1.3vw, 17px)",
        color: "#475569",
        fontFamily: "Inter, sans-serif",
        lineHeight: 1.85,
        marginBottom: "18px",
      }}
    >
      {typeof text === "string" ? renderWithLinks(text) : text}
    </p>
  );
}

function BlogList({ items, listKey = "" }) {
  return (
    <ul style={{ marginBottom: "24px", paddingLeft: 0, listStyle: "none" }}>
      {items.map((item, i) => {
        const colonIdx = item.indexOf(":");
        const bold = colonIdx !== -1 ? item.slice(0, colonIdx) : item;
        const rest = colonIdx !== -1 ? item.slice(colonIdx + 1) : "";
        return (
          <li
            key={i}
            style={{
              display: "flex",
              gap: "14px",
              marginBottom: "16px",
              alignItems: "flex-start",
            }}
          >
            {/* bullet */}
            <span
              style={{
                width: "22px",
                height: "22px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #0D6EFD, #60A5FA)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                marginTop: "2px",
              }}
            >
              <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                <path
                  d="M1 4L3.5 6.5L9 1"
                  stroke="white"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span
              style={{
                fontSize: "clamp(14px, 1.2vw, 16px)",
                color: "#475569",
                fontFamily: "Inter, sans-serif",
                lineHeight: 1.7,
              }}
            >
              <strong style={{ color: "#0F172A", fontWeight: 600 }}>
                {renderWithLinks(bold)}:
              </strong>
              {renderWithLinks(rest)}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

function TOC({ active }) {
  return (
    <nav
      style={{
        background: "#F8FAFC",
        border: "1px solid #E2E8F0",
        borderRadius: "16px",
        padding: "20px 24px",
        marginBottom: "24px",
      }}
    >
      <p
        style={{
          fontSize: "11px",
          fontWeight: 700,
          color: "#94A3B8",
          letterSpacing: "1px",
          textTransform: "uppercase",
          marginBottom: "14px",
          fontFamily: "Inter, sans-serif",
        }}
      >
        In This Article
      </p>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {tableOfContents.map((item) => (
          <li key={item.id} style={{ marginBottom: "10px" }}>
            <a
              href={`#${item.id}`}
              style={{
                fontSize: "14px",
                fontFamily: "Inter, sans-serif",
                fontWeight: active === item.id ? 600 : 400,
                color: active === item.id ? "#0D6EFD" : "#475569",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                transition: "color 0.2s ease",
                paddingLeft: active === item.id ? "4px" : "0",
              }}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: active === item.id ? "#0D6EFD" : "#CBD5E1",
                  flexShrink: 0,
                  transition: "background 0.2s ease",
                }}
              />
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function QuickFacts() {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #0D6EFD 0%, #2563EB 100%)",
        borderRadius: "16px",
        padding: "20px 24px",
        marginBottom: "24px",
      }}
    >
      <p
        style={{
          fontSize: "11px",
          fontWeight: 700,
          color: "rgba(255,255,255,0.7)",
          letterSpacing: "1px",
          textTransform: "uppercase",
          marginBottom: "16px",
          fontFamily: "Inter, sans-serif",
        }}
      >
        Quick Facts
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {quickFacts.map((f, i) => (
          <div
            key={i}
            style={{
              background: "rgba(255,255,255,0.12)",
              borderRadius: "10px",
              padding: "10px 14px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <p
                style={{
                  fontSize: "11px",
                  color: "rgba(255,255,255,0.7)",
                  fontFamily: "Inter, sans-serif",
                  marginBottom: "2px",
                }}
              >
                {f.label}
              </p>
              <p
                style={{
                  fontSize: "17px",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {f.value}
              </p>
            </div>
            <span
              style={{
                fontSize: "12px",
                fontWeight: 600,
                fontFamily: "Inter, sans-serif",
                color:
                  f.up === true
                    ? "#86EFAC"
                    : f.up === false
                    ? "#FCA5A5"
                    : "rgba(255,255,255,0.6)",
                background: "rgba(255,255,255,0.15)",
                borderRadius: "20px",
                padding: "3px 10px",
              }}
            >
              {f.trend}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function RelatedArticles() {
  const [hovered, setHovered] = useState(null);
  return (
    <div
      style={{
        background: "#FFFFFF",
        border: "1px solid #E2E8F0",
        borderRadius: "16px",
        padding: "20px 24px",
      }}
    >
      <p
        style={{
          fontSize: "11px",
          fontWeight: 700,
          color: "#94A3B8",
          letterSpacing: "1px",
          textTransform: "uppercase",
          marginBottom: "16px",
          fontFamily: "Inter, sans-serif",
        }}
      >
        Related Articles
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {relatedArticles.map((a, i) => (
          <div
            key={i}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              display: "flex",
              gap: "12px",
              cursor: "pointer",
              padding: "8px",
              borderRadius: "10px",
              background: hovered === i ? "#F8FAFC" : "transparent",
              transition: "background 0.18s ease",
            }}
          >
            <Link to={a.link} className="w-[200px] "><img
              src={a.img}
              alt={a.title}
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "8px",
                objectFit: "cover",
                flexShrink: 0,
              }}
            /></Link>
            <div style={{ minWidth: 0 }}>
              <span
                style={{
                  display: "inline-block",
                  fontSize: "10px",
                  fontWeight: 700,
                  color: a.tagColor,
                  background: `${a.tagColor}18`,
                  borderRadius: "20px",
                  padding: "2px 8px",
                  marginBottom: "4px",
                  fontFamily: "Inter, sans-serif",
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                }}
              >
                {a.tag}
              </span>
              <Link to={a.link}><p
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: hovered === i ? "#0D6EFD" : "#0F172A",
                  fontFamily: "Inter, sans-serif",
                  lineHeight: 1.4,
                  marginBottom: "4px",
                  transition: "color 0.18s ease",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {a.title}
              </p></Link>
              <p
                style={{
                  fontSize: "11px",
                  color: "#94A3B8",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {a.date}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────
const Neighbourhood = () => {
  const [activeSection, setActiveSection] = useState("");
  const [shareTooltip, setShareTooltip] = useState(false);
  const contentRef = useRef(null);

  // Active TOC section via IntersectionObserver
  useEffect(() => {
    const ids = tableOfContents.map((t) => t.id);
    const observers = ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: "-20% 0px -60% 0px" }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href).catch(() => {});
    setShareTooltip(true);
    setTimeout(() => setShareTooltip(false), 2000);
  };

  return (
    <>
      
    <Seo
              title='Neighbourhood Watch: Sector 150, Noida is A Residential Oasis'
              description="Neighbourhood Watch: Sector 150, Noida is A Residential Oasis"
              canonical={`https://www.indiadealsgroup.com/blog/neighbourhood-watch-sector-150-noida-is-a-residential-oasis`}
            />

      <article
        style={{
          width: "100%",
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "clamp(16px, 4vw, 40px) clamp(16px, 4vw, 32px)",
          fontFamily: "Inter, sans-serif",
        }}
      >
       {/* ── HERO HEADER ── */}
               <div
                 style={{
                   display: "flex",
                   flexDirection: "column",
                   gap: "32px",
                   marginBottom: "40px",
                 }}
                 className="blog-hero"
               >
                 {/* Image */}
                 <div
                   style={{
                     width: "100%",
                     borderRadius: "20px",
                     overflow: "hidden",
                     aspectRatio: "16/7",
                     position: "relative",
                   }}
                 >
                   <img
                     src={NCRPLOTS}
                     alt="Noida vs Greater Noida"
                     style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                   />
                   {/* gradient overlay */}
                   <div
                     style={{
                       position: "absolute",
                       inset: 0,
                       background:
                         "linear-gradient(to right, rgba(15,23,42,0.55) 0%, rgba(15,23,42,0.1) 60%, transparent 100%)",
                     }}
                   />
                  
                 </div>
       
                 {/* Meta row */}
                 <div
                   style={{
                     display: "flex",
                     alignItems: "center",
                     justifyContent: "space-between",
                     flexWrap: "wrap",
                     gap: "12px",
                   }}
                 >
                   <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                     {/* Avatar */}
                     <div
                       style={{
                         width: "42px",
                         height: "42px",
                         borderRadius: "50%",
                         background: "linear-gradient(135deg, #0D6EFD, #60A5FA)",
                         display: "flex",
                         alignItems: "center",
                         justifyContent: "center",
                         color: "#fff",
                         fontWeight: 700,
                         fontSize: "16px",
                         flexShrink: 0,
                       }}
                     >
                       RE
                     </div>
                     <div>
                       <p style={{ fontSize: "14px", fontWeight: 600, color: "#0F172A" }}>
                         INDIADEALS GROUP TEAM
                       </p>
                       <p style={{ fontSize: "13px", color: "#94A3B8" }}>
                         Jun 25, 2026 &nbsp;·&nbsp; 6 min read
                       </p>
                     </div>
                   </div>
       
                   {/* Share */}
                   <div style={{ position: "relative" }}>
                     <button
                       onClick={handleShare}
                       style={{
                         display: "flex",
                         alignItems: "center",
                         gap: "6px",
                         padding: "8px 18px",
                         borderRadius: "10px",
                         border: "1px solid #E2E8F0",
                         background: "#FFFFFF",
                         color: "#475569",
                         fontSize: "14px",
                         fontWeight: 500,
                         fontFamily: "Inter, sans-serif",
                         cursor: "pointer",
                         transition: "all 0.2s ease",
                       }}
                       onMouseEnter={(e) => {
                         e.currentTarget.style.background = "#F8FAFC";
                         e.currentTarget.style.borderColor = "#CBD5E1";
                       }}
                       onMouseLeave={(e) => {
                         e.currentTarget.style.background = "#FFFFFF";
                         e.currentTarget.style.borderColor = "#E2E8F0";
                       }}
                     >
                       <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                         <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
                         <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                       </svg>
                       Share
                     </button>
                     {shareTooltip && (
                       <span
                         style={{
                           position: "absolute",
                           top: "-34px",
                           left: "50%",
                           transform: "translateX(-50%)",
                           background: "#0F172A",
                           color: "#fff",
                           fontSize: "12px",
                           padding: "4px 10px",
                           borderRadius: "6px",
                           whiteSpace: "nowrap",
                           pointerEvents: "none",
                         }}
                       >
                         Link copied!
                       </span>
                     )}
                   </div>
                 </div>
               </div>

        {/* ── DIVIDER ── */}
        <div style={{ width: "100%", height: "1px", background: "#E2E8F0", marginBottom: "40px" }} />

        {/* ── BODY: CONTENT + SIDEBAR ── */}
        <div
          style={{
            display: "flex",
            gap: "clamp(24px, 4vw, 56px)",
            alignItems: "flex-start",
          }}
          className="blog-body"
        >
          {/* ── MAIN CONTENT ── */}
          <div ref={contentRef} style={{ flex: "1 1 0", minWidth: 0 }}>
            {blog.map((item, index) => {
              switch (item.type) {
                case "h1":
                  return (
                    <h1
                      key={index}
                      id={item.id || slugify(item.text)}
                      style={{
                        fontSize: "clamp(24px, 3vw, 36px)",
                        fontWeight: 700,
                        color: "#0F172A",
                        fontFamily: "Inter, sans-serif",
                        marginBottom: "16px",
                        lineHeight: 1.25,
                      }}
                    >
                      {item.text}
                    </h1>
                  );

                case "h2":
                  return <BlogH2 key={index} id={item.id} text={item.text} />;

                case "h3":
                  return (
                    <h3
                      key={index}
                      id={item.id || slugify(item.text)}
                      style={{
                        fontSize: "clamp(16px, 1.8vw, 22px)",
                        fontWeight: 600,
                        color: "#0F172A",
                        fontFamily: "Inter, sans-serif",
                        marginBottom: "12px",
                        marginTop: "28px",
                      }}
                    >
                      {item.text}
                    </h3>
                  );

                case "p":
                  return <BlogP key={index} idx={index} text={item.text} />;

                case "image":
                  return (
                    <div
                      key={index}
                      style={{
                        borderRadius: "16px",
                        overflow: "hidden",
                        marginBottom: "28px",
                        marginTop: "8px",
                      }}
                    >
                      <img
                        src={item.src}
                        alt={item.alt || ""}
                        style={{ width: "100%", display: "block", objectFit: "cover" }}
                      />
                      {item.caption && (
                        <p
                          style={{
                            fontSize: "13px",
                            color: "#94A3B8",
                            fontFamily: "Inter, sans-serif",
                            marginTop: "8px",
                            textAlign: "center",
                          }}
                        >
                          {item.caption}
                        </p>
                      )}
                    </div>
                  );

                case "list":
                  return <BlogList key={index} listKey={`list-${index}`} items={item.items} />;

                case "quote":
                  return (
                    <blockquote
                      key={index}
                      style={{
                        borderLeft: "4px solid #0D6EFD",
                        background: "#EFF6FF",
                        borderRadius: "0 12px 12px 0",
                        padding: "16px 24px",
                        marginBottom: "24px",
                        marginTop: "8px",
                        fontStyle: "italic",
                        fontSize: "clamp(15px, 1.3vw, 18px)",
                        color: "#1E40AF",
                        fontFamily: "Inter, sans-serif",
                        lineHeight: 1.7,
                      }}
                    >
                      {item.text}
                    </blockquote>
                  );

                default:
                  return null;
              }
            })}

            {/* ── VERDICT CARD ──
            <div className="mt-10 rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-green-50 p-7 md:p-8">
  <div className="mb-[18px] flex items-center gap-3">
    <span className="text-2xl">🏡</span>

    <h3 className="font-inter text-lg font-bold text-slate-900">
      Quick Comparison
    </h3>
  </div>

  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
    {[
      {
        title: "Choose Noida if…",
        color: "text-blue-600",
        bg: "bg-blue-50",
        border: "border-blue-200",
        points: [
          "You need metro access now",
          "School & hospital proximity matters",
          "Prefer a settled community",
        ],
      },
      {
        title: "Choose Noida Extension if…",
        color: "text-emerald-600",
        bg: "bg-emerald-50",
        border: "border-emerald-200",
        points: [
          "Budget is your priority",
          "Modern amenities & new builds",
          "Long-term investment growth",
        ],
      },
    ].map((col) => (
      <div
        key={col.title}
        className={`rounded-xl border ${col.border} ${col.bg} p-4 md:p-5`}
      >
        <p className={`mb-3 text-sm font-bold ${col.color}`}>
          {col.title}
        </p>

        {col.points.map((pt, i) => (
          <div
            key={i}
            className="mb-2 flex items-start gap-2 last:mb-0"
          >
            <span className={`mt-0.5 text-sm ${col.color}`}>
              ✓
            </span>

            <span className="text-[13px] leading-6 text-slate-600">
              {pt}
            </span>
          </div>
        ))}
      </div>
    ))}
  </div>
</div> */}
          </div>

          {/* ── SIDEBAR ── */}
          <aside
            style={{
              width: "clamp(240px, 28%, 320px)",
              flexShrink: 0,
              position: "sticky",
              top: "24px",
              display: "flex",
              flexDirection: "column",
              gap: "0",
            }}
            className="blog-sidebar"
          >
            <TOC active={activeSection} />
            <QuickFacts />
            <RelatedArticles />
          </aside>
        </div>
      </article>

      {/* ── RESPONSIVE OVERRIDES ── */}
      <style>{`
        @media (max-width: 1024px) {
          .blog-sidebar { display: none !important; }
          .blog-body { flex-direction: column !important; }
        }
        @media (max-width: 640px) {
          .hero-overlay-text { display: none !important; }
        }
      `}</style>
    </>
  );
};

export default Neighbourhood;