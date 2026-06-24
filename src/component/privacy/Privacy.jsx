import { useState, useEffect, useRef, useCallback } from "react";

const SECTIONS = [
  {
    id: "information-we-collect",
    title: "Information We Collect",
    content: {
      intro: "We may collect various categories of information:",
      subsections: [
        {
          heading: "A. Personal Information",
          items: [
            "Full name",
            "Mobile number",
            "Email address",
            "Residential address",
            "Identity details (PAN, Aadhaar, if required for verification or KYC)",
            "Property preferences or buying requirements",
          ],
        },
        {
          heading: "B. Transaction & Service Information",
          items: [
            "Property enquiries",
            "Site visit details",
            "Booking information",
            "Payment or transaction records (processed through secure channels)",
          ],
        },
        {
          heading: "C. Technical / Automatic Data",
          items: [
            "Device information (IP address, browser type, device ID)",
            "Cookies and tracking data",
            "Usage details (pages viewed, clicks, time spent)",
          ],
        },
        {
          heading: "D. Voluntary Information",
          items: [
            "Feedback, complaints, or support queries",
            "Participation in surveys, offers, or promotional campaigns",
          ],
        },
      ],
    },
  },
  {
    id: "how-we-use",
    title: "How We Use Your Information",
    content: {
      intro: "We use your information for legitimate business purposes, including:",
      items: [
        "Scheduling site visits and providing project details",
        "Processing bookings, documentation, and transactions",
        "Sending updates, offers, and promotional communications",
        "Improving our customer experience and service quality",
        "Verifying identity and preventing fraud",
        "Meeting legal or regulatory compliance requirements",
      ],
      outro: "We only use your data in ways that support our services and communication with you.",
    },
  },
  {
    id: "sharing-of-information",
    title: "Sharing of Information",
    content: {
      intro: "We do not sell, rent, or trade your personal data to third parties. However, your information may be shared with:",
      subsections: [
        {
          heading: "A. Service Providers",
          items: [
            "Payment gateways",
            "Marketing or customer support agencies",
            "IT and data hosting partners",
            "Verification/KYC agencies",
            "Channel partners or authorised real-estate agents",
          ],
        },
        {
          heading: "B. Legal & Regulatory Authorities",
          items: ["If mandated under law, court orders, or government directives."],
        },
        {
          heading: "C. Business Partners",
          items: [
            "Only when required for relevant real-estate services, promotions, or customer support.",
            "Every third party is bound by confidentiality and is required to protect your data.",
          ],
        },
      ],
    },
  },
  {
    id: "data-security",
    title: "Data Security",
    content: {
      intro: "We use industry-standard technical and organisational safeguards such as:",
      items: [
        "Encrypted servers",
        "Secure data storage",
        "Access controls and authentication",
        "Regular security audits",
        "Monitoring for unauthorised access",
      ],
      outro: "Despite strong measures, no digital system can guarantee 100% security.",
    },
  },
  {
    id: "cookies-tracking",
    title: "Cookies & Tracking Technologies",
    content: {
      intro: "Our website may use cookies to:",
      items: [
        "Improve performance",
        "Personalise your browsing experience",
        "Show relevant real-estate offers",
        "Analyse website traffic patterns",
      ],
      outro: "You may disable cookies through browser settings, though some website features may be affected.",
    },
  },
  {
    id: "your-rights",
    title: "Your Rights",
    content: {
      intro: "Depending on applicable law, you may have the right to:",
      items: [
        "Access your personal information",
        "Request correction of inaccurate data",
        "Request deletion of your data",
        "Withdraw consent for marketing communication",
        "Opt-out of promotional SMS or email updates",
      ],
      outro: "To exercise these rights, contact us at the details provided below.",
    },
  },
  {
    id: "data-retention",
    title: "Data Retention",
    content: {
      intro: "We retain your information only as long as necessary for:",
      items: [
        "Providing services",
        "Legal or taxation requirements",
        "Resolving disputes",
        "Maintaining business records",
      ],
      outro: "Once data is no longer required, it is securely deleted or anonymised.",
    },
  },
  {
    id: "third-party-links",
    title: "Third-Party Links",
    content: {
      items: [
        "Our website or promotional materials may include links to third-party websites.",
        "DSI INDIADEALSS PRIVATE LIMITED is not responsible for the privacy practices, accuracy, or content of these external platforms.",
      ],
      outro: "Please review their privacy policies before interacting with them.",
    },
  },
  {
    id: "childrens-privacy",
    title: "Children's Privacy",
    content: {
      items: [
        "Our services are not intended for individuals under 18 years of age.",
        "We do not knowingly collect data from minors.",
      ],
      outro: "If such information is identified, we will delete it promptly.",
    },
  },
  {
    id: "updates-policy",
    title: "Updates to this Privacy Policy",
    content: {
      intro: "We may revise this policy from time to time to reflect:",
      items: ["Changes in law", "Business needs", "Service updates"],
      outro: 'The updated policy will always include a revised "Last Updated" date.',
    },
  },
  {
    id: "contact-us",
    title: "Contact Us",
    content: {
      intro:
        "For any questions, requests, or concerns regarding this Privacy Policy, please contact:",
      contact: {
        company: "DSI INDIADEALSS PRIVATE LIMITED",
        address: "Unit No. 337, TOWER C, GOLDEN I, TECHZONE 4, Greater Noida, 201009",
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
export default function Privacy() {
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
              Privacy Policy
            </h1>
            <p className="text-xs font-medium text-[#515151] text-justify" style={{ margin: 0, lineHeight: 1.3 }}>
               INDIADEALSGROUP 
            </p>
            <p className="text-xs font-medium text-[#515151] text-justify mt-10 md:mt-0" style={{ margin: 0, lineHeight: 1.3 }}>
             By accessing or using our services, you acknowledge and agree to the terms described in this Privacy Policy.  
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
                  <p style={{ margin: 0, fontWeight: 700, fontSize: "13.5px", color: "#1F2937" }}>Your Privacy Matters</p>
                </div>
                <p style={{ margin: 0, fontSize: "12.5px", color: "#6B7280", lineHeight: 1.7 }}>
                  We are committed to keeping your information safe and secure. Your data is never sold to third parties.
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
              <div style={{ background: "linear-gradient(135deg, #F0F7FF, #F5F3FF)", borderRadius: "10px", padding: "20px 24px", display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#DBEAFE", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <ShieldIcon />
                </div>
                <div>
                  <p style={{ margin: 0, fontWeight: 700, fontSize: "14px", color: "#1F2937" }}>This document is legally binding.</p>
                  <p style={{ margin: "2px 0 0", fontSize: "13px", color: "#6B7280" }}>By using our services, you accept the terms of this Privacy Policy.</p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}