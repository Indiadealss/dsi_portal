import React, { useEffect, useState } from 'react'

const Dashboard = () => {
    const API_URL = "/api/dashboard"; // ← swap to your real endpoint

    const [visible, setVisible] = useState(false);
      const [loading,       setLoading]       = useState(true);
       const [error,         setError]         = useState(null);
         const [data,          setData]          = useState(null);
           const [openDropdown,  setOpenDropdown]  = useState(null);

           useEffect(() => {
    fetchDashboard()
      .then((d) => { setData(d); setLoading(false); setTimeout(() => setVisible(true), 60); })
      .catch((e) => { setError(e.message); setLoading(false); });
  }, []);

  useEffect(() => {
    const close = () => setOpenDropdown(null);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

const fetchDashboard = async () => {
  // ---------- MOCK — remove this block when real API is ready ----------
  await new Promise((r) => setTimeout(r, 700));
  return {
    userName: "K",
    stats: {
      totalListings: 24,
      activeListings: 18,
      activeListingsPct: "75% of Total",
      totalLeads: 362,
      savedProperties: 20,
      unreadMessages: 28,
    },
    leads: [
      { id: 1, name: "Rahul Verma",  phone: "+91 8868821528", propertyType: "3 BHK Apartment",   location: "DLF the crest, Gurgaon",      status: "New",       time: "2 min. ago"  },
      { id: 2, name: "Sneha Iyer",   phone: "+91 9123456789", propertyType: "Office Space",       location: "One world Center, Noida",     status: "Contacted", time: "15 min. ago" },
      { id: 3, name: "Amit Singh",   phone: "+91 9123456789", propertyType: "2 BHK Apartment",   location: "One world Center, Noida",     status: "New",       time: "1 hr. ago"   },
      { id: 4, name: "Pooja Mehta",  phone: "+91 9123456789", propertyType: "Commercial Space",   location: "One world Center, Noida",     status: "New",       time: "2 hr. ago"   },
      { id: 5, name: "Vikram Joshi", phone: "+91 9123456789", propertyType: "4 BHK Apartment",   location: "One world Center, Noida",     status: "Contacted", time: "3 hr. ago"   },
    ],
    listings: [
      { id: 1, title: "3 BHK Apartment", location: "DLF the crest, Gurgaon",       price: "₹ 3.25 CR", status: "Active", imageUrl: null },
      { id: 2, title: "Office Space",     location: "One World Center, Noida",      price: "₹ 3.25 CR", status: "Active", imageUrl: null },
      { id: 3, title: "2 BHK Apartment", location: "Godrej Woods, Noida",           price: "₹ 3.25 CR", status: "Active", imageUrl: null },
      { id: 4, title: "4 BHK Villa",     location: "Bestech Park View, Gurgaon",   price: "₹ 3.25 CR", status: "Active", imageUrl: null },
    ],
    performance: {
      propertyViews:   "12,450",
      newLeads:        "85",
      callReceived:    "42",
      messageReceived: "29",
      savedListings:   "17",
    },
  };
  // ---------- END MOCK ----------
};


const Icon = ({ name, size = 20, color = "currentColor" }) => {
  const s = { width: size, height: size, display: "block", flexShrink: 0 };
  const p = { fill: "none", stroke: color, strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" };
  const map = {
    listing:      <svg style={s} viewBox="0 0 24 24" {...p}><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>,
    layers:       <svg style={s} viewBox="0 0 24 24" {...p}><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>,
    users:        <svg style={s} viewBox="0 0 24 24" {...p}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    bookmark:     <svg style={s} viewBox="0 0 24 24" {...p}><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>,
    message:      <svg style={s} viewBox="0 0 24 24" {...p}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
    eye:          <svg style={s} viewBox="0 0 24 24" {...p}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
    phone:        <svg style={s} viewBox="0 0 24 24" {...p}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.58 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
    settings:     <svg style={s} viewBox="0 0 24 24" {...p}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
    plus:         <svg style={s} viewBox="0 0 24 24" {...p}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
    chevronLeft:  <svg style={s} viewBox="0 0 24 24" {...p}><polyline points="15 18 9 12 15 6"/></svg>,
    bell:         <svg style={s} viewBox="0 0 24 24" {...p}><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
    analytics:    <svg style={s} viewBox="0 0 24 24" {...p}><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
    subscription: <svg style={s} viewBox="0 0 24 24" {...p}><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>,
    campaign:     <svg style={s} viewBox="0 0 24 24" {...p}><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>,
    shield:       <svg style={s} viewBox="0 0 24 24" {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    help:         <svg style={s} viewBox="0 0 24 24" {...p}><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
    menu:         <svg style={s} viewBox="0 0 24 24" {...p}><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
    close:        <svg style={s} viewBox="0 0 24 24" {...p}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    dots:         <svg style={s} viewBox="0 0 24 24" {...p}><circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/></svg>,
  };
  return map[name] || null;
}


// Static stat card config — only the VALUE comes from the backend
const STAT_CONFIG = [
  { key: "totalListings",    label: "Total Listing",      subKey: null,                   staticSub: "All Time",     iconBg: "#ECFDF3", iconColor: "#16A34A", icon: "listing"  },
  { key: "activeListings",   label: "Active Listings",    subKey: "activeListingsPct",    staticSub: null,           iconBg: "#EEF5FF", iconColor: "#3B82F6", icon: "layers"   },
  { key: "totalLeads",       label: "Total Leads",        subKey: null,                   staticSub: "This Month",   iconBg: "#F5ECFF", iconColor: "#9333EA", icon: "users"    },
  { key: "savedProperties",  label: "Saved Properties",   subKey: null,                   staticSub: "All Time",     iconBg: "#FFF7E9", iconColor: "#F59E0B", icon: "bookmark" },
  { key: "unreadMessages",   label: "Messages",           subKey: null,                   staticSub: "Unread",       iconBg: "#FFECEC", iconColor: "#EF4444", icon: "message"  },
];

// Static performance config — only VALUE comes from backend
const PERF_CONFIG = [
  { key: "propertyViews",   label: "Property Views",    icon: "eye",      iconColor: "#22C55E" },
  { key: "newLeads",        label: "New Leads",         icon: "users",    iconColor: "#2563EB" },
  { key: "callReceived",    label: "Call Received",     icon: "phone",    iconColor: "#8B5CF6" },
  { key: "messageReceived", label: "Message Received",  icon: "message",  iconColor: "#F59E0B" },
  { key: "savedListings",   label: "Saved Listings",    icon: "bookmark", iconColor: "#EF4444" },
];


// Static quick-action config — nothing comes from backend
const QUICK_ACTIONS = [
  { label: "Manage Listing",    icon: "listing",  color: "#0D6EFD" },
  { label: "Leads & Inquiries", icon: "users",    color: "#9333EA" },
  { label: "Messages",          icon: "message",  color: "#3B82F6" },
  { label: "Post Property",     icon: "plus",     color: "#16A34A" },
  { label: "Setting",           icon: "settings", color: "#EF4444" },
];

// Status badge style map (static)
const BADGE_STYLE = {
  New:       { bg: "#ECFDF3", color: "#16A34A" },
  Contacted: { bg: "#EEF4FF", color: "#2563EB" },
  Active:    { bg: "#ECFDF3", color: "#16A34A" },
};


// Listing accent colours rotate by index (static)
const LISTING_ACCENTS = ["#0ea5e9","#14b8a6","#a3e635","#f59e0b","#8b5cf6","#ef4444"];

// Avatar background colours rotate by first char
const AVATAR_BG = ["#3B82F6","#9333EA","#16A34A","#F59E0B","#EF4444","#0891B2","#DC2626"];

// ─── Small helpers ─────────────────────────────────────────────────────────────
const initials = (name = "") =>
  name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();

const Avatar = ({ name, size = 40 }) => {
  const ini = initials(name);
  const bg  = AVATAR_BG[ini.charCodeAt(0) % AVATAR_BG.length];
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", background: bg, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.3, fontWeight: 700, flexShrink: 0 }}>
      {ini}
    </div>
  );
};

const Badge = ({ status }) => {
  const s = BADGE_STYLE[status] || BADGE_STYLE.New;
  return <span style={{ background: s.bg, color: s.color, borderRadius: 999, padding: "4px 12px", fontSize: 12, fontWeight: 600, whiteSpace: "nowrap" }}>{status}</span>;
};

const Skeleton = ({ w = "100%", h = 14, r = 6, mb = 0 }) => (
  <div style={{ width: w, height: h, borderRadius: r, background: "linear-gradient(90deg,#f0f0f0 25%,#e8e8e8 50%,#f0f0f0 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.4s infinite", marginBottom: mb, flexShrink: 0 }} />
);

const PropertyThumb = ({ src, accent }) =>
  src
    ? <img src={src} alt="" style={{ width: 110, height: 70, borderRadius: 8, objectFit: "cover", flexShrink: 0 }} />
    : <div style={{ width: 110, height: 70, borderRadius: 8, background: `linear-gradient(135deg,${accent}25,${accent}55)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Icon name="listing" size={28} color={accent} /></div>;


     <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        button{font-family:inherit;}
        @keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
        .fade-up{animation:fadeUp 0.45s ease both;}

        /* Layout */
        .page{max-width:1600px;margin:0 auto;padding:32px 24px;display:grid;grid-template-columns:240px 1fr;gap:24px;align-items:start;}
        .sidebar{width:240px;background:#fff;border:1px solid #E5E7EB;border-radius:12px;padding:16px;position:sticky;top:24px;}
        .content-grid{display:grid;grid-template-columns:2fr 1.4fr;gap:24px;}
        .stat-row{display:flex;flex-wrap:wrap;gap:14px;}
        .stat-card{flex:1 1 160px;min-width:130px;}
        .perf-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:12px;}
        .qa-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:10px;}

        /* Mobile bar */
        .mob-bar{display:none;align-items:center;gap:12px;background:#fff;border-bottom:1px solid #E5E7EB;padding:12px 16px;position:sticky;top:0;z-index:30;}
        .overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,.35);z-index:40;}

        /* Sidebar mobile drawer */
        @media(max-width:860px){
          .page{grid-template-columns:1fr!important;padding:16px!important;}
          .sidebar{display:none;position:fixed;left:0;top:0;height:100vh;z-index:50;border-radius:0;overflow-y:auto;width:260px!important;}
          .sidebar.open{display:block;}
          .overlay.open{display:block;}
          .mob-bar{display:flex!important;}
        }
        @media(max-width:1100px){
          .content-grid{grid-template-columns:1fr!important;}
          .perf-grid{grid-template-columns:repeat(3,1fr)!important;}
        }
        @media(max-width:600px){
          .perf-grid{grid-template-columns:repeat(2,1fr)!important;}
          .qa-grid{grid-template-columns:repeat(3,1fr)!important;}
          .hide-sm{display:none!important;}
        }

        /* Interaction */
        .qa-btn:hover{transform:translateY(-2px);box-shadow:0 4px 14px rgba(0,0,0,.08)!important;}
        .row-hover:hover{background:#F8FAFC;}
        .listing-row:hover{background:#F8FAFC;}
        .view-btn{background:none;border:none;cursor:pointer;color:#0D6EFD;font-size:13px;font-weight:600;padding:4px 0;}
        .view-btn:hover{text-decoration:underline;}
        .icon-btn{background:none;border:none;cursor:pointer;padding:5px;border-radius:6px;display:flex;align-items:center;}
        .icon-btn:hover{background:#F1F5F9;}
        .dropdown{position:absolute;right:0;top:32px;background:#fff;border:1px solid #E5E7EB;border-radius:8px;box-shadow:0 4px 16px rgba(0,0,0,.1);z-index:20;min-width:130px;overflow:hidden;}
        .dropdown button{display:block;width:100%;text-align:left;padding:10px 14px;font-size:13px;color:#374151;background:none;border:none;cursor:pointer;}
        .dropdown button:hover{background:#F5F7FA;}
        .full-btn{width:100%;height:44px;border-radius:8px;border:1px solid #E5E7EB;background:#fff;color:#0D6EFD;font-size:14px;font-weight:600;cursor:pointer;transition:background .15s;}
        .full-btn:hover{background:#EAF5FF;}
        .card{border:1px solid #E5E7EB;border-radius:12px;background:#fff;}
        .section-header{display:flex;justify-content:space-between;align-items:center;padding:16px 20px;border-bottom:1px solid #F1F5F9;}
      `}</style>

  return (
    <div>{/* Main */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24, minWidth: 0 }}>

          {/* Back */}
          <button className="icon-btn" style={{ display: "flex", alignItems: "center", gap: 4, color: "#64748B", fontSize: 14, width: "fit-content" }}>
            <Icon name="chevronLeft" size={16} color="#64748B"/> Back
          </button>

          {/* Welcome — userName from backend */}
          <div className={visible ? "fade-up" : ""} style={{ opacity: visible ? 1 : 0 }}>
            <h1 style={{ fontSize: "clamp(22px,3.5vw,38px)", fontWeight: 700, color: "#0F172A" }}>
              Welcome Back, {loading ? "…" : (data?.userName ?? "—")} ! 👋
            </h1>
            <p style={{ fontSize: 15, color: "#64748B", marginTop: 4 }}>Here's What's happening with your account today</p>
          </div>

          {/* ── Stat Cards ── */}
          <div className="stat-row">
            {loading
              ? Array(5).fill(0).map((_, i) => (
                  <div key={i} className="stat-card card" style={{ padding: 20, display: "flex", gap: 14, alignItems: "center", height: 110 }}>
                    <Skeleton w={48} h={48} r={24} />
                    <div style={{ flex: 1 }}><Skeleton h={11} mb={8}/><Skeleton h={26} w="55%" mb={6}/><Skeleton h={10} w="45%"/></div>
                  </div>
                ))
              : STAT_CONFIG.map(({ key, label, subKey, staticSub, iconBg, iconColor, icon }, i) => {
                  const value = data?.stats?.[key] ?? "—";
                  const sub   = subKey ? (data?.stats?.[subKey] ?? staticSub) : staticSub;
                  return (
                    <div key={key} className={`stat-card card fade-up`} style={{ padding: "16px 20px", display: "flex", alignItems: "center", gap: 14, height: 110, animationDelay: `${i * 60}ms` }}>
                      <div style={{ width: 48, height: 48, borderRadius: "50%", background: iconBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Icon name={icon} size={22} color={iconColor}/>
                      </div>
                      <div>
                        <div style={{ fontSize: 13, color: "#64748B", fontWeight: 500, marginBottom: 2 }}>{label}</div>
                        <div style={{ fontSize: 28, fontWeight: 700, color: "#0F172A", lineHeight: 1 }}>{value}</div>
                        <div style={{ fontSize: 12, color: "#0D6EFD", marginTop: 3 }}>{sub}</div>
                      </div>
                    </div>
                  );
                })
            }
          </div>

          {/* ── Two-column content ── */}
          <div className="content-grid">

            {/* LEFT */}
            <div style={{ display: "flex", flexDirection: "column", gap: 24, minWidth: 0 }}>

              {/* Recent Leads */}
              <div className={`card${visible ? " fade-up" : ""}`} style={{ overflow: "hidden" }}>
                <div className="section-header">
                  <h2 style={{ fontSize: 18, fontWeight: 600 }}>Recent Leads</h2>
                  <button className="view-btn">View all</button>
                </div>
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead className="hide-sm">
                      <tr style={{ borderBottom: "1px solid #F1F5F9" }}>
                        {["Name", "Property Type", "Status", "Time"].map(h => (
                          <th key={h} style={{ padding: "10px 20px", textAlign: "left", fontSize: 12, fontWeight: 500, color: "#64748B" }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {loading
                        ? Array(5).fill(0).map((_, i) => (
                            <tr key={i}><td colSpan={4} style={{ padding: "12px 20px" }}>
                              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                                <Skeleton w={40} h={40} r={20}/>
                                <div style={{ flex: 1 }}><Skeleton h={12} mb={6}/><Skeleton h={10} w="55%"/></div>
                              </div>
                            </td></tr>
                          ))
                        : (data?.leads ?? []).map((lead) => (
                            <tr key={lead.id} className="row-hover" style={{ borderBottom: "1px solid #F8FAFC", transition: "background .15s" }}>
                              {/* Name — from backend */}
                              <td style={{ padding: "13px 20px" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                  <Avatar name={lead.name}/>
                                  <div>
                                    <div style={{ fontSize: 14, fontWeight: 600, color: "#111827" }}>{lead.name}</div>
                                    <div style={{ fontSize: 12, color: "#6B7280" }}>{lead.phone}</div>
                                  </div>
                                </div>
                              </td>
                              {/* Property type — from backend */}
                              <td style={{ padding: "13px 20px" }}>
                                <div style={{ fontSize: 14, fontWeight: 500, color: "#111827" }}>{lead.propertyType}</div>
                                <div style={{ fontSize: 12, color: "#6B7280" }}>{lead.location}</div>
                              </td>
                              {/* Status — from backend */}
                              <td style={{ padding: "13px 20px" }}><Badge status={lead.status}/></td>
                              {/* Time — from backend */}
                              <td style={{ padding: "13px 20px", fontSize: 13, color: "#6B7280", whiteSpace: "nowrap" }}>{lead.time}</td>
                            </tr>
                          ))
                      }
                    </tbody>
                  </table>
                </div>
                <div style={{ padding: "12px 20px", borderTop: "1px solid #F1F5F9" }}>
                  <button className="full-btn">View all leads</button>
                </div>
              </div>

              {/* Performance Summary */}
              <div className={`card${visible ? " fade-up" : ""}`} style={{ padding: 20 }}>
                <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Performance Summary (This Month)</h2>
                <div className="perf-grid">
                  {loading
                    ? Array(5).fill(0).map((_, i) => (
                        <div key={i} className="card" style={{ padding: 14 }}>
                          <Skeleton w={28} h={28} r={14} mb={10}/><Skeleton h={10} mb={6}/><Skeleton h={22} w="60%"/>
                        </div>
                      ))
                    : PERF_CONFIG.map(({ key, label, icon, iconColor }) => (
                        <div key={key} className="card" style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: 6 }}>
                          {/* icon & label: static */}
                          <Icon name={icon} size={22} color={iconColor}/>
                          <div style={{ fontSize: 12, color: "#64748B" }}>{label}</div>
                          {/* value: from backend */}
                          <div style={{ fontSize: 22, fontWeight: 700, color: "#0F172A" }}>{data?.performance?.[key] ?? "—"}</div>
                        </div>
                      ))
                  }
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div style={{ display: "flex", flexDirection: "column", gap: 24, minWidth: 0 }}>

              {/* Recent Listings */}
              <div className={`card${visible ? " fade-up" : ""}`} style={{ overflow: "hidden" }}>
                <div className="section-header">
                  <h2 style={{ fontSize: 18, fontWeight: 600 }}>Recent Listings</h2>
                  <button className="view-btn">View all</button>
                </div>
                <div>
                  {loading
                    ? Array(4).fill(0).map((_, i) => (
                        <div key={i} style={{ display: "flex", gap: 12, padding: "14px 20px", borderBottom: "1px solid #F8FAFC", alignItems: "center" }}>
                          <Skeleton w={110} h={70} r={8}/>
                          <div style={{ flex: 1 }}><Skeleton h={13} mb={6}/><Skeleton h={11} w="70%" mb={6}/><Skeleton h={13} w="50%"/></div>
                        </div>
                      ))
                    : (data?.listings ?? []).map((listing, i) => {
                        const accent = LISTING_ACCENTS[i % LISTING_ACCENTS.length];
                        return (
                          <div key={listing.id} className="listing-row" style={{ display: "flex", gap: 14, padding: "14px 20px", borderBottom: "1px solid #F8FAFC", alignItems: "center", transition: "background .15s" }}>
                            {/* Thumbnail: imageUrl from backend, accent colour static */}
                            <PropertyThumb src={listing.imageUrl} accent={accent}/>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              {/* title, location, price: from backend */}
                              <div style={{ fontSize: 15, fontWeight: 600, color: "#111827", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{listing.title}</div>
                              <div style={{ fontSize: 12, color: "#6B7280", margin: "2px 0" }}>{listing.location}</div>
                              <div style={{ fontSize: 14, fontWeight: 600, color: "#111827" }}>{listing.price}</div>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8, flexShrink: 0 }}>
                              {/* status: from backend */}
                              <Badge status={listing.status}/>
                              <div style={{ position: "relative" }}>
                                <button className="icon-btn" onClick={e => { e.stopPropagation(); setOpenDropdown(openDropdown === listing.id ? null : listing.id); }}>
                                  <Icon name="dots" size={18} color="#6B7280"/>
                                </button>
                                {openDropdown === listing.id && (
                                  <div className="dropdown">
                                    <button>Edit</button>
                                    <button>View Details</button>
                                    <button style={{ color: "#EF4444" }}>Delete</button>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })
                  }
                </div>
              </div>

              {/* Quick Actions — fully static */}
              <div className={`card${visible ? " fade-up" : ""}`} style={{ padding: 20 }}>
                <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 14 }}>Quick Actions</h2>
                <div className="qa-grid">
                  {QUICK_ACTIONS.map(({ label, icon, color }) => (
                    <button key={label} className="qa-btn" style={{ border: "1px solid #E5E7EB", borderRadius: 10, background: "#fff", height: 90, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, cursor: "pointer", fontSize: 11, fontWeight: 500, color: "#374151", transition: "transform .18s, box-shadow .18s" }}>
                      <div style={{ width: 36, height: 36, borderRadius: "50%", background: `${color}18`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Icon name={icon} size={18} color={color}/>
                      </div>
                      <span style={{ textAlign: "center", lineHeight: 1.3 }}>{label}</span>
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Error state */}
          {error && (
            <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 10, padding: "14px 18px", color: "#DC2626", fontSize: 14 }}>
              Failed to load dashboard data: {error}
            </div>
          )}
        </div></div>
  )
}

export default Dashboard