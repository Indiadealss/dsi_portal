import React, { useState, useEffect, useMemo, useRef } from "react";
import { Share2, Check, Clock, Calendar, ExternalLink } from "lucide-react";
import { getBlog } from "./api/api";
import { useLocation, useParams } from "react-router-dom";

/**
 * Sample data — this is exactly the shape your API returns.
 * In production, swap this for the fetched array (e.g. via useEffect + fetch,
 * or pass it in as the `data` prop).
 */
const SAMPLE_DATA = [
  {
    _id: "6a58db3b518adecd0dd9df56",
    blogName: "What To Expect From The New Generation of Luxury Smart Homes",
    slug: "/what-to-expect-from-the-new-generation-of-luxury-smart-homes",
    category: "Guides",
    description:
      "Not long ago, a luxury home was defined purely by its physical elements. The glossy Italian marble flooring, double-height ceilings, and imported modular kitchens.",
    content:
      '<h2><strong>What To Expect From The New Generation of Luxury Smart Homes</strong></h2><p>Not long ago, a luxury home was defined purely by its physical elements. The glossy Italian marble flooring, double-height ceilings, and imported modular kitchens. <strong>IRISH PEARLS</strong></p><p>Today, the definition of premium real estate has undergone a profound shift. Affluent homebuyers across the NCR expect more from their luxury homes, things which elevate their everyday life in a helpful manner.</p><p>This demand is being met with the seamless integration of state-of-the-art technology into the grand interiors. Luxury homes are now Luxury \u201cSmart\u201d Homes. Irish Platinum</p><p>The term "Smart Home" is ever-present in modern builder brochures, but it has evolved far beyond controlling a single gadget from a smartphone. In the premium housing segment, home automation has transformed into an invisible ecosystem designed to remove friction, secure assets, and actively elevate day-to-day living.</p><h2><strong>The Standard Baseline: Invisible, Experiential Comfort</strong></h2><p>For any modern premium development along the Noida-Greater Noida Expressway or Gurugram\u2019s Golf Course Extension, certain smart home features have transitioned from "optional upgrades" into the mandatory standard baseline.</p><p><strong>Centralized Climate Management</strong></p><p>Modern smart layouts have moved past individual wall units. Premium homes now utilize centralized VRV/VRF air conditioning systems integrated with intelligent thermostats. These systems learn your daily routines, automatically adjusting temperature zones based on occupancy, time of day, and external weather conditions to balance comfort with energy efficiency.</p><p><strong>Biometric &amp; Digital Access Control</strong></p><p>High-end apartments are anchored by multi-tiered digital locks featuring encrypted facial recognition, biometric fingerprint scanning, and temporary app-generated access keys for guests or maintenance staff.</p><p><strong>Ambient Architectural Lighting</strong></p><p>Instead of standard switches, modern properties deploy unified modular panels. Homeowners can program complex "scenes", such as dimming overhead lights, drawing motorized custom drapes, and activating soft accent LEDs simultaneously for movie nights or formal dinners with a single voice command.</p><h2><strong>What to Expect in Upcoming Smart Launches?</strong></h2><p>As technology accelerates, upcoming residential towers are pushing past basic connectivity. The next wave of luxury real estate launches is focusing heavily on predictive automation, wellness infrastructure, and unified ecosystems. If you are looking at premium projects hitting the market over the next few financial cycles, here are the advanced smart amenities you can expect to see built directly into the layout:</p><h3><strong>AI-Driven Wellness &amp; Environmental Monitors</strong></h3><p>Post-pandemic residential priorities have permanently shifted toward health. Future luxury projects are integrating whole-home air purification and humidity management systems that communicate directly with continuous indoor air quality sensors. These systems actively filter out PM2.5 pollutants and pathogens in real time without human intervention. Furthermore, ambient lighting is upgrading to circadian rhythm systems that automatically alter color temperatures throughout the day, shifting from energizing blue-toned light in the morning to calming, warm amber hues at night to naturally improve melatonin production.</p><h3><strong>Unified IoT Hubs&nbsp;</strong></h3><p>Historically, the biggest headache for smart homeowners was managing ten different applications for ten different appliances. Upcoming premium builds are solving this by adopting universal open communication standards (like the Matter protocol). This allows integrated touchless smart kitchen appliances, automated wine preservation vaults, robotic cleaning systems, and central hub interfaces to speak to one another seamlessly under one application window.</p><h3><strong>Predictive Energy &amp; EV Infrastructure</strong></h3><p>With sustainability standing as a core marker of luxury, smart homes are taking charge of energy distribution. Future apartments will feature built-in predictive energy dashboards linked to smart meters and common-area solar grids. These systems optimize power consumption, run heavy appliances during off-peak hours, and integrate seamlessly with dedicated EV charging infrastructure at your specific parking bay, sending real-time battery diagnostics directly to your phone.</p><p>Ultimately, true luxury no longer lies in highly visible gadgets. The defining characteristic of the next generation of smart homes is invisible, adaptive automation-creating a living environment that quietly protects your family, manages resources, and anticipates your needs before you even realize them.</p>',
    links: [
      {
        word: "IRISH PEARLS",
        href: "https://www.indiadealsgroup.com/irish-pearls-greater-noida-west-npxid-c4b40",
        title: "IRISH PEARLS",
      },
    ],
    thumbnail:
      "https://d3eoh63gynpjzh.cloudfront.net/brandsdoor/1784208187085-2%20(1).png",
    cover:
      "https://d3eoh63gynpjzh.cloudfront.net/brandsdoor/1784208187103-Thumbnail.png",
    createdAt: "2026-07-16T13:23:07.818Z",
    updatedAt: "2026-07-16T13:23:07.818Z",
    __v: 0,
  },
];

/* ---------------- helpers ---------------- */

function estimateReadingTime(html) {
  const text = html.replace(/<[^>]*>/g, " ");
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function formatDate(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// Pull out h2/h3 headings from the content HTML to build the "In this article" nav
function extractHeadings(html) {
  if (typeof window === "undefined" || !html) return [];
  const doc = new DOMParser().parseFromString(html, "text/html");
  return Array.from(doc.querySelectorAll("h2, h3")).map((h, i) => ({
    id: `section-${i}`,
    text: h.textContent.trim(),
    level: h.tagName.toLowerCase(),
  }));
}

// Stamp matching ids onto the headings inside the content so the TOC can scroll to them
function withHeadingIds(html) {
  if (typeof window === "undefined" || !html) return html;
  const doc = new DOMParser().parseFromString(html, "text/html");
  Array.from(doc.querySelectorAll("h2, h3")).forEach((h, i) => {
    h.id = `section-${i}`;
  });
  return doc.body.innerHTML;
}

/* ---------------- component ---------------- */

export default function BlogDetailPage() {

    const { slug } = useParams();

    console.log(slug);

    const [data, setData] = useState(null);
    const [activeId, setActiveId] = useState(null);
  const [copied, setCopied] = useState(false);

  const blog = Array.isArray(data) ? data[0] : data;

  

  const headings = useMemo(
    () => (blog ? extractHeadings(blog.content) : []),
    [blog]
  );
const processedContent = useMemo(() => {
  if (!blog) return "";

  let html = withHeadingIds(blog.content);

  html = injectLinks(html, blog.links);

  return html;
}, [blog]);
  const readingTime = useMemo(
    () => (blog ? estimateReadingTime(blog.content) : 0),
    [blog]
  );

  const contentRef = useRef(null);

  useEffect(() => {
    if (!headings.length) return;
    const els = headings
      .map((h) => document.getElementById(h.id))
      .filter(Boolean);
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-96px 0px -70% 0px", threshold: 0 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings, processedContent]);
    const featch = async () => {
        try{
            const res = await getBlog(slug)
            const result = await res.data.data;

            console.log(result, 'run test')
            setData(result)
        }catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        featch()
        console.log('run hua ?');
        
    },[])

    if(data === null){
        return (
            <>
            <div>
                ...
            </div>
            </>
        )
    }

    function injectLinks(html, links = []) {
  if (!html || !links.length) return html;

  let updatedHtml = html;

  links.forEach(({ word, href, title }) => {
    const escapedWord = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const regex = new RegExp(escapedWord, "gi");

    updatedHtml = updatedHtml.replace(
      regex,
      `<a href="${href}"
          target="_blank"
          rel="noopener noreferrer"
          title="${title || word}">
          $&
      </a>`
    );
  });

  return updatedHtml;
}

  

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[#64748B]">
        No article to display.
      </div>
    );
  }

  const handleShare = async () => {
    const url =
      typeof window !== "undefined"
        ? `${window.location.origin}${blog.slug || ""}`
        : blog.slug || "";
    try {
      if (navigator.clipboard) await navigator.clipboard.writeText(url);
    } catch (e) {
      /* clipboard not available — fail silently */
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const scrollTo = (id) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero banner */}
      <div className=" mx-auto px-4 md:px-6 pt-6 md:pt-10">
        <div className="relative h-[280px] sm:h-[380px] md:h-[460px] rounded-3xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.08)] bg-[#F8FAFC]">
          <img
            src={blog.cover || blog.thumbnail}
            alt={blog.blogName}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-10">
            {blog.category && (
              <span className="inline-block mb-3 px-3 py-1 rounded-full bg-white/95 text-[#2563EB] text-[11px] font-bold uppercase tracking-wider">
                {blog.category}
              </span>
            )}
            <h1 className="text-white font-bold leading-[1.15] max-w-3xl text-2xl sm:text-4xl md:text-5xl">
              {blog.blogName}
            </h1>
          </div>
        </div>
      </div>

      {/* Author / meta bar */}
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="flex flex-wrap items-center justify-between gap-4 py-8 md:py-10 border-b border-[#E2E8F0]">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 shrink-0 rounded-full bg-[#2563EB] text-white flex items-center justify-center font-semibold text-sm">
              ID
            </div>
            <div>
              <div className="text-[#0F172A] font-semibold text-sm">
                IndiaDeals Team
              </div>
              <div className="flex items-center gap-3 text-[#94A3B8] text-xs mt-1">
                <span className="flex items-center gap-1">
                  <Clock size={12} /> {readingTime} min read
                </span>
                <span>&bull;</span>
                <span className="flex items-center gap-1">
                  <Calendar size={12} /> {formatDate(blog.createdAt)}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={handleShare}
            className="h-[52px] px-5 rounded-2xl border border-[#CBD5E1] flex items-center gap-2 text-[#0F172A] text-sm font-medium transition-colors hover:border-[#2563EB] hover:bg-[#F8FAFC] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2"
          >
            {copied ? (
              <Check size={16} className="text-[#22C55E]" />
            ) : (
              <Share2 size={16} />
            )}
            {copied ? "Link copied" : "Share"}
          </button>
        </div>
      </div>

      {/* Content + sidebar */}
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-10 md:py-12 flex flex-col lg:flex-row gap-10">
        {/* Article */}
        <article className="w-full lg:w-[68%] min-w-0">
          
          <div
            ref={contentRef}
            className="prose-content max-w-[780px]"
            dangerouslySetInnerHTML={{ __html: processedContent }}
          />
        </article>

        {/* Sidebar */}
        <aside className="w-full lg:w-[32%] min-w-0">
          <div className="lg:sticky lg:top-[24px] space-y-6">
            {headings.length > 0 && (
              <div className="rounded-3xl border border-[#E5E7EB] bg-white p-6">
                <div className="text-[#94A3B8] text-xs font-bold tracking-wider mb-4">
                  IN THIS ARTICLE
                </div>
                <nav className="space-y-3">
                  {headings.map((h) => (
                    <button
                      key={h.id}
                      onClick={() => scrollTo(h.id)}
                      className={`block text-left text-sm w-full transition-colors leading-snug ${
                        h.level === "h3" ? "pl-4" : ""
                      } ${
                        activeId === h.id
                          ? "text-[#2563EB] font-semibold"
                          : "text-[#64748B] hover:text-[#0F172A]"
                      }`}
                    >
                      {h.text}
                    </button>
                  ))}
                </nav>
              </div>
            )}

            {blog.links && blog.links.length > 0 && (
              <div
                className="rounded-3xl p-6 text-white"
                style={{
                  background:
                    "linear-gradient(180deg, #2563EB 0%, #1D4ED8 100%)",
                }}
              >
                <div className="text-xs font-bold tracking-wider text-blue-100 mb-4">
                  FEATURED IN THIS ARTICLE
                </div>
                <div className="space-y-3">
                  {blog.links.map((l, i) => (
                    <a
                      key={i}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between gap-2 bg-white/10 rounded-2xl px-4 py-3 hover:bg-white/20 transition-colors"
                    >
                      <span className="text-sm font-semibold">
                        {l.title || l.word}
                      </span>
                      <ExternalLink size={14} className="shrink-0 opacity-80" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            <div className="rounded-3xl border border-[#E5E7EB] p-6 bg-[#F8FAFC]">
              <div className="text-[#94A3B8] text-xs font-bold tracking-wider mb-2">
                PUBLISHED
              </div>
              <div className="text-[#0F172A] text-sm font-medium">
                {formatDate(blog.createdAt)}
              </div>
              {blog.updatedAt && blog.updatedAt !== blog.createdAt && (
                <div className="text-[#64748B] text-xs mt-1">
                  Updated {formatDate(blog.updatedAt)}
                </div>
              )}
            </div>
          </div>
        </aside>
      </div>

      <style>{`
        .prose-content h2 {
          font-size: 28px;
          font-weight: 700;
          color: #0F172A;
          margin-top: 48px;
          margin-bottom: 18px;
          line-height: 1.3;
        }
        .prose-content h3 {
          font-size: 21px;
          font-weight: 700;
          color: #0F172A;
          margin-top: 36px;
          margin-bottom: 14px;
          line-height: 1.35;
        }
        .prose-content p {
          font-size: 17px;
          color: #64748B;
          line-height: 1.8;
          margin-bottom: 24px;
        }
        .prose-content strong { color: #0F172A; font-weight: 600; }
        .prose-content a {
          color: #2563EB;
          text-decoration: underline;
          text-underline-offset: 2px;
        }
        .prose-content a:hover { color: #1D4ED8; }
        .prose-content img {
          width: 100%;
          border-radius: 24px;
          margin: 28px 0;
        }
        .prose-content ul, .prose-content ol {
          margin: 0 0 24px 0;
          padding-left: 22px;
          color: #64748B;
        }
        .prose-content li { margin-bottom: 10px; line-height: 1.7; }
        @media (max-width: 640px) {
          .prose-content h2 { font-size: 22px; }
          .prose-content h3 { font-size: 18px; }
          .prose-content p { font-size: 16px; }
        }
      `}</style>
    </div>
  );
}