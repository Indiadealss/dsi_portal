import { useState, useEffect, useRef, useCallback } from "react";

const SECTIONS = [
  {
    id: "Acceptance of Terms",
    title: "Acceptance of Terms",
    content: {
      intro: "By using our Platform, you confirm that:",
      subsections: [
        {
          heading: "",
          items: [
            "You are at least 18 years old.",
            "You have the legal capacity to enter into a binding agreement.",
            "You agree to follow all rules, policies, and guidelines described in these Terms.",
          ],
        },
      ],
    },
  },
  {
    id: "Services Provided",
    title: "Services Provided",
    content: {
      intro: "INDIADEALSGROUP DIGITAL SERVICES PRIVATE LIMITED. provides:",
      items: [
        "Real estate advisory services",
        "Property listings and project information",
        "Booking and documentation support",
        "Site visit coordination",
        "Sales and marketing assistance",
        "Channel partner coordination",
      ],
      outro: "We reserve the right to update, modify, suspend, or discontinue any service at any time.",
    },
  },
  {
    id: "accuracy-of-information",
    title: "Accuracy of Information",
    content: {
      intro: "We strive to maintain accurate and updated information, but:",
      subsections: [
        {
          items: [
            "Property details, pricing, offers, layouts, and availability are subject to change without prior notice.",
            "Final specifications depend on the developer or project owner.",
            "Images, brochures, and visuals are for representation only.",
          ],
        },
      ],
      outro: "The Company is not responsible for any errors, delays, inaccuracies, or omissions in the information provided.",
    },
  },
  {
    id: " user-responsibilities",
    title: "User Responsibilities",
    content: {
      intro: "You agree NOT to:",
      items: [
        "Misuse the website or engage in unlawful activities",
        "Provide false, misleading, or incomplete information",
        "Attempt unauthorized access to any part of the Platform",
        "Copy, modify, or distribute content without written permission",
        "Interfere with the functioning of the website or attempt to bypass security",
      ],
      outro: "You are responsible for the accuracy of the information you provide.",
    },
  },
  {
    id: "booking-payments-transactions",
    title: "Booking, Payments & Transactions",
    content: {
      items: [
        "Any booking, EOI (Expression of Interest), payment, or transaction made through us is subject to verification.",
        "All payments are processed through secure third-party gateways or directly with the developer.",
        "The Company is not liable for payment failures or technical issues related to payment partners.",
        "Booking is considered confirmed only after issuance of an official receipt from the Company or developer.",
      ],
    },
  },
  {
    id: "communication-notifications",
    title: "Communication & Notifications",
    content: {
      intro: "By using our Platform, you consent to receive:",
      items: [
        "Calls",
        "SMS",
        "WhatsApp updates",
        "Email notifications",
        "Promotional offers",
      ],
      outro: "You may opt out of promotional messages by contacting us.",
    },
  },
  {
    id: "third-party-developers-partners",
    title: "Third-Party Developers & Partners",
    content: {
      intro: "We collaborate with multiple developers, brokers, and channel partners. ",
      items: [
        "We do not control the actions or commitments of third-party developers.",
        "All property-related contractual obligations lie between the customer and the respective developer.",
        "We are not responsible for construction delays, pricing changes, policy changes, or project modifications made by developers.",
      ],
    },
  },
  {
    id: "intellectual-property-rights",
    title: " Intellectual Property Rights",
    content: {
      intro: "All content on our Platform—including text, images, logos, graphics, brochures, and materials—is the exclusive property of INDIADEALSGROUP DIGITAL SERVICES PRIVATE LIMITED ",
      items: [
            "Copy",
            "Reproduce",
            "Modify",
            "Distribute",
            "Sell",
            "Publish"    
    ],
      outro: "Any content without prior written consent.",
    },
  },
  {
    id: "limitation-of-liability",
    title: "Limitation of Liability",
    content: {
      intro: "INDIADEALSGROUP DIGITAL SERVICES PRIVATE LIMITED is not liable for:",
      items: [
        "Losses arising from reliance on property information",
        "Errors or inaccuracies in developer-provided details",
        "Financial decisions made based on our listings or advice",
        "Technical issues, downtime, or interruptions",
        "Any indirect, incidental, or consequential damages",
      ],
      outro: "Your use of our Platform is at your own risk.",
    },
  },
  {
    id: "indemnification",
    title: "Indemnification",
    content: {
      intro: "You agree to indemnify and hold harmless the Company, its employees, directors, and partners from any claims, losses, or damages arising from:",
      items: [
        "Misuse of the Platform",
        "Violation of these Terms",
        "Incorrect information provided by you"
    ],
    },
  },
  {
    id: "Privacy",
    title: "Privacy",
    content: {
      intro:
        "Your use of the Platform is also governed by our Privacy Policy. Please review it carefully to understand how your data is collected, stored, and protected.",
      
    },
  },
  {
    id: "changes-to-terms",
    title: "Privacy",
    content: {
      intro:
        "We may update or modify these Terms at any time.",
    },
    intro2:"Continued use of the Platform signifies your acceptance of the updated Terms."
  },
  {
    id: "termination",
    title: "Termination",
    content: {
      intro: "We may suspend or terminate your access if you:",
      items: [
        "Violate these Terms",
        "Engage in fraudulent or illegal activities",
        "Misuse the Platform"
    ],
    outro: "Upon termination, your right to use the Platform ceases immediately.",
    },
  },
  
  {
    id: "governing-law-jurisdiction",
    title: "Governing Law & Jurisdiction",
    content: {
      intro:
        "These Terms are governed by the laws of India.",
        outro: "Any disputes arising under these Terms shall fall under the exclusive jurisdiction of courts located in [Add City/State].",
    },
  },
  {
    id: "contact-us",
    title: "Contact Us",
    content: {
      intro:
        "For any questions, requests, or concerns regarding this Privacy Policy, please contact:",
      contact: {
        company: "INDIADEALSGROUP DIGITAL SERVICES PRIVATE LIMITED",
        address: "Unit No. 320, TOWER C, GOLDEN I, TECHZONE 4, Greater Noida, 201009",
      },
    },
  },
];

const NAV_LABELS = [
  "Information We Collect",
  "How We Use Your Information",
  "Sharing of Information",
  "Data Security",
  "Cookies & Tracking Technologies",
  "Your Rights",
  "Data Retention",
  "Third-Party Links",
  "Children's Privacy",
  "Updates to this Privacy Policy",
  "Contact Us",
];

// ── Icons ──────────────────────────────────────────────────────────────────────
function ShieldIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1E88E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  );
}

function ChevronIcon({ open }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.25s ease", flexShrink: 0 }}>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

// ── Bullet list renderer ───────────────────────────────────────────────────────
function BulletList({ items }) {
  return (
    <ul style={{ margin: "10px 0", paddingLeft: 0, listStyle: "none" }}>
      {items.map((item, i) => (
        <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "7px", fontSize: "14.5px", color: "#6B7280", lineHeight: 1.75 }}>
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#1E88E5", flexShrink: 0, marginTop: "8px" }} />
          {item}
        </li>
      ))}
    </ul>
  );
}

// ── Section renderer ───────────────────────────────────────────────────────────
function PolicySection({ section, index }) {
  const { title, content } = section;

  return (
    <div id={section.id} style={{ scrollMarginTop: "32px" }}>
      {/* Section header */}
      <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "16px" }}>
        <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#1E88E5", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "13px", fontWeight: 700, flexShrink: 0 }}>
          {index + 1}
        </div>
        <h2 style={{ margin: 0, fontSize: "clamp(17px, 2.5vw, 21px)", fontWeight: 700, color: "#1F2937",  letterSpacing: "-0.01em" }}>
          {title}
        </h2>
      </div>

      {/* Content */}
      <div className="pl-0 md:pl-[46px]">
        {content.intro && (
          <p style={{ margin: "0 0 10px", fontSize: "14.5px", color: "#515151", lineHeight: 1.8 }}>{content.intro}</p>
        )}

        {content.items && <BulletList items={content.items} />}

        {content.subsections && content.subsections.map((sub, si) => (
          <div key={si} style={{ marginBottom: "14px" }}>
            <p style={{ margin: "0 0 6px", fontSize: "13.5px", fontWeight: 600, color: "#374151" }}>{sub.heading}</p>
            <BulletList items={sub.items} />
          </div>
        ))}

        {content.outro && (
          <p style={{ margin: "10px 0 0", fontSize: "14.5px", color: "#515151", lineHeight: 1.8, fontStyle: "italic" }}>{content.outro}</p>
        )}

        {content.contact && (
          <div style={{ marginTop: "12px", background: "#F0F7FF", border: "1px solid #BFDBFE", borderRadius: "10px", padding: "16px 20px" }}>
            <p style={{ margin: "0 0 4px", fontWeight: 700, fontSize: "14px", color: "#1F2937" }}>{content.contact.company}</p>
            <p style={{ margin: 0, fontSize: "13.5px", color: "#515151", lineHeight: 1.7 }}>{content.contact.address}</p>
          </div>
        )}
      </div>

      {/* Divider */}
      <div style={{ height: "1px", background: "#E5E7EB", margin: "28px 0" }} />
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────
export default function Termsconditions() {
  const [activeSection, setActiveSection] = useState(0);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const observerRef = useRef(null);

  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 640);
      setIsTablet(window.innerWidth < 1024 && window.innerWidth >= 640);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Scrollspy
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = SECTIONS.findIndex((s) => s.id === entry.target.id);
            if (idx !== -1) setActiveSection(idx);
          }
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id, idx) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(idx);
      setMobileNavOpen(false);
    }
  };

  const sidebarVisible = !isMobile && !isTablet;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Mulish:wght@400;500;600&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #F1F5F9; }
        ::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 3px; }
        .nav-item-hover:hover { background: #EFF6FF !important; color: #1E88E5 !important; }
        @keyframes fadeSlideIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        .section-animate { animation: fadeSlideIn 0.4s ease forwards; }
      `}</style>

      <div style={{  background: "#F5F7FA", minHeight: "100vh", color: "#1F2937" }}>

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", padding: isMobile ? "24px 16px" : "", }}>
            
            <h1 style={{ margin: "0 0 14px", fontSize: isMobile ? "clamp(26px, 8vw, 36px)" : "clamp(32px, 4vw, 44px)", fontWeight: 800,   letterSpacing: "-0.02em", lineHeight: 1.15 }}>
             Terms & Conditions
            </h1>
            <p className="text-xs font-medium text-[#515151] text-justify" style={{ margin: 0, lineHeight: 1.3 }}>
              Welcome to INDIADEALSGROUP
            </p>
            <p className="text-xs font-medium text-[#515151] text-justify mt-10 md:mt-0" style={{ margin: 0, lineHeight: 1.3 }}>
             By accessing or using any part of our Platform, you agree to be bound by these Terms. If you disagree with any part of these Terms, you should discontinue use of our services.  
              </p>
            <div style={{ marginTop: "20px", display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
              <span style={{ fontSize: "12px", color: "#6B8AA8" }}>Last updated: May 2025</span>
              <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#6B8AA8" }} />
              <span style={{ fontSize: "12px", color: "#6B8AA8" }}>Version 1.0</span>
            </div>
          </div>

        {/* ── Mobile / Tablet Nav Toggle ────────────────────────────────────── */}
        {/* {!sidebarVisible && (
          <div style={{ background: "#fff", borderBottom: "1px solid #E5E7EB", padding: "0 20px", position: "sticky", top: 0, zIndex: 100 }}>
            <button onClick={() => setMobileNavOpen(!mobileNavOpen)}
              style={{ display: "flex", alignItems: "center", gap: "10px", background: "none", border: "none", cursor: "pointer", padding: "14px 0", fontSize: "14px", fontWeight: 600, color: "#1F2937", width: "100%" }}>
              <MenuIcon />
              <span>On this page — {NAV_LABELS[activeSection]}</span>
              <ChevronIcon open={mobileNavOpen} />
            </button>

            {mobileNavOpen && (
              <div style={{ borderTop: "1px solid #F3F4F6", paddingBottom: "12px" }}>
                {SECTIONS.map((s, i) => (
                  <button key={s.id} onClick={() => scrollTo(s.id, i)}
                    className="nav-item-hover"
                    style={{ display: "block", width: "100%", textAlign: "left", background: activeSection === i ? "#EFF6FF" : "transparent", border: "none", borderLeft: activeSection === i ? "3px solid #1E88E5" : "3px solid transparent", padding: "9px 14px", fontSize: "13px", fontWeight: activeSection === i ? 600 : 500, color: activeSection === i ? "#1E88E5" : "#374151", cursor: "pointer",}}>
                    <span style={{ marginRight: "8px", color: "#9CA3AF", fontSize: "11px" }}>{String(i + 1).padStart(2, "0")}</span>
                    {s.title}
                  </button>
                ))}
              </div>
            )}
          </div>
        )} */}

        {/* ── Main Layout ───────────────────────────────────────────────────── */}
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: isMobile ? "24px 16px" : "36px 2px", display: "flex", gap: "28px", alignItems: "flex-start" }}>

          {/* Sidebar */}
          {sidebarVisible && (
            <aside style={{ width: "260px", flexShrink: 0, position: "sticky", top: "125px", display: "flex", flexDirection: "column", gap: "16px" }}>

              {/* TOC Card */}
              <div style={{ background: "#FFFFFF", border: "1px solid #D9E1EA", borderRadius: "12px", padding: "20px", overflow: "hidden" }}>
                <p style={{ margin: "0 0 14px", fontSize: "11px", fontWeight: 700, color: "#9CA3AF", letterSpacing: "0.1em", textTransform: "uppercase" }}>On this page</p>
                <nav>
                  {SECTIONS.map((s, i) => (
                    <button key={s.id} onClick={() => scrollTo(s.id, i)}
                      className="nav-item-hover"
                      style={{ display: "flex", alignItems: "center", gap: "10px", width: "100%", textAlign: "left", background: activeSection === i ? "#E8F2FF" : "transparent", border: "none", borderRadius: "8px", padding: "8px 10px", marginBottom: "2px", fontSize: "13px", fontWeight: activeSection === i ? 600 : 500, color: activeSection === i ? "#1E88E5" : "#4B5563", cursor: "pointer", transition: "all 0.15s" }}>
                      <span style={{ width: "20px", height: "20px", borderRadius: "50%", background: activeSection === i ? "#1E88E5" : "#E5E7EB", color: activeSection === i ? "white" : "#9CA3AF", fontSize: "10px", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.15s" }}>
                        {i + 1}
                      </span>
                      <span style={{ lineHeight: 1.4 }}>{s.title}</span>
                    </button>
                  ))}
                </nav>
              </div>

              {/* Trust Card */}
              <div style={{ background: "linear-gradient(135deg, #EFF6FF 0%, #F0F9FF 100%)", border: "1px solid #BFDBFE", borderRadius: "12px", padding: "20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#DBEAFE", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <ShieldIcon />
                  </div>
                  <p style={{ margin: 0, fontWeight: 700, fontSize: "13.5px", color: "#1F2937" }}>Important</p>
                </div>
                <p style={{ margin: 0, fontSize: "12.5px", color: "#6B7280", lineHeight: 1.7 }}>
                  By using Indiadealsgroup, you agree to these terms and condition.
                </p>
              </div>
            </aside>
          )}

          {/* Content */}
          <main style={{ flex: 1, minWidth: 0 }}>
            <div style={{ background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: "14px", padding: isMobile ? "24px 18px" : "36px 40px" }}>
              {SECTIONS.map((section, index) => (
                <PolicySection key={section.id} section={section} index={index} />
              ))}

              {/* Bottom strip */}
              {/* <div style={{ background: "linear-gradient(135deg, #F0F7FF, #F5F3FF)", borderRadius: "10px", padding: "20px 24px", display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#DBEAFE", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <ShieldIcon />
                </div>
                <div>
                  <p style={{ margin: 0, fontWeight: 700, fontSize: "14px", color: "#1F2937" }}>This document is legally binding.</p>
                  <p style={{ margin: "2px 0 0", fontSize: "13px", color: "#6B7280" }}>By using our services, you accept the terms of this Privacy Policy.</p>
                </div>
              </div> */}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}