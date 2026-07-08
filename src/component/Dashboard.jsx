import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { lead } from '../api/api';

const Dashboard = () => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [listings, setListings] = useState([])

  const user = useSelector((state) => state.user);

  // ─── FIX 1: Single useEffect — fetch lead data FIRST, then build dashboard ───
  useEffect(() => {
    setLoading(true);
    setError(null);

    lead(user.id)
      .then(res => {
        if (res.status === 200) {
          const apiData = res.data.data;
          console.log(apiData, 'dashboard api data');

          // ─── FIX 2: Build dashboarddata AFTER the API resolves ──────────────
          // Adjust apiData[0], apiData[1], apiData[2] to match your real API shape
          const stats = apiData[2] ?? {};
          const leadsArr = apiData[1] ?? [];
          const listings = apiData[0] ?? [];

          console.log(listings, 'check listings');


          const formattedListings = listings.map((listing) => ({
            id: listing.npxid || listing.spid,
            key: listing.npxid || listing.spid,
            title:
              listing.projectname ||
              listing.apartment_name ||
              listing.projecttitle ||
              "",
            location: listing.location || "",
            price: listing.price,
            status: Boolean(listing.npxid || listing.spid) ? "Active" : "Inactive",
            images: listing.images[0]?.src || [],
            imageUrl: listing.images?.[0]?.src || null,
            npxid: listing.npxid || null,
            spid: listing.spid || null,
          }));

          setListings(formattedListings);


          setData({
            userName: user.name, 
            stats: {
              totalListings: stats.totalListings ?? 0,
              activeListings: stats.activeListings ?? 0,
              activeListingsPct: stats.activeListingsPct ?? "—",
              totalLeads: stats.totalLeads ?? 0,
              savedProperties: stats.savedProperties ?? 0,
              unreadMessages: stats.unreadMessages ?? 0,
            },
            leads: leadsArr,
            listings: formattedListings,
            performance: {
              propertyViews: "12,450",
              newLeads: "85",
              callReceived: "42",
              messageReceived: "29",
              savedListings: "17",
            },
          });

          setLoading(false);
          setTimeout(() => setVisible(true), 60);
        }
      })
      .catch(err => {
        console.error(err);
        setError(err.message ?? "Failed to load dashboard data");
        setLoading(false);
      });
  }, [user.id]);

  // ─── Close dropdown on outside click ─────────────────────────────────────────
  useEffect(() => {
    const close = () => setOpenDropdown(null);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  // ─── Icons ───────────────────────────────────────────────────────────────────
  const Icon = ({ name, size = 20, color = "currentColor" }) => {
    const s = { width: size, height: size, display: "block", flexShrink: 0 };
    const p = { fill: "none", stroke: color, strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" };
    const map = {
      listing: <svg style={s} viewBox="0 0 24 24" {...p}><rect x="3" y="3" width="18" height="18" rx="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" /></svg>,
      layers: <svg style={s} viewBox="0 0 24 24" {...p}><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></svg>,
      users: <svg style={s} viewBox="0 0 24 24" {...p}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
      bookmark: <svg style={s} viewBox="0 0 24 24" {...p}><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /></svg>,
      message: <svg style={s} viewBox="0 0 24 24" {...p}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>,
      eye: <svg style={s} viewBox="0 0 24 24" {...p}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>,
      phone: <svg style={s} viewBox="0 0 24 24" {...p}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.58 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>,
      settings: <svg style={s} viewBox="0 0 24 24" {...p}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>,
      plus: <svg style={s} viewBox="0 0 24 24" {...p}><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>,
      chevronLeft: <svg style={s} viewBox="0 0 24 24" {...p}><polyline points="15 18 9 12 15 6" /></svg>,
      dots: <svg style={s} viewBox="0 0 24 24" {...p}><circle cx="12" cy="5" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="12" cy="19" r="1" /></svg>,
    };
    return map[name] || null;
  };

  // ─── Static configs ───────────────────────────────────────────────────────────
  const STAT_CONFIG = [
    { key: "totalListings", label: "Total Listing", subKey: null, staticSub: "All Time", iconBg: "#ECFDF3", iconColor: "#16A34A", icon: "listing" },
    { key: "activeListings", label: "Active Listings", subKey: "activeListingsPct", staticSub: null, iconBg: "#EEF5FF", iconColor: "#3B82F6", icon: "layers" },
    { key: "totalLeads", label: "Total Leads", subKey: null, staticSub: "This Month", iconBg: "#F5ECFF", iconColor: "#9333EA", icon: "users" },
    { key: "savedProperties", label: "Saved Properties", subKey: null, staticSub: "All Time", iconBg: "#FFF7E9", iconColor: "#F59E0B", icon: "bookmark" },
  ];

  const BADGE_STYLE = {
    New: { bg: "#ECFDF3", color: "#16A34A" },
    Contacted: { bg: "#EEF4FF", color: "#2563EB" },
    Active: { bg: "#ECFDF3", color: "#16A34A" },
  };

  const LISTING_ACCENTS = ["#0ea5e9", "#14b8a6", "#a3e635", "#f59e0b", "#8b5cf6", "#ef4444"];
  const AVATAR_BG = ["#3B82F6", "#9333EA", "#16A34A", "#F59E0B", "#EF4444", "#0891B2", "#DC2626"];

  // ─── Helpers ──────────────────────────────────────────────────────────────────
  const initials = (name = "") =>
    name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();

  const Avatar = ({ name, size = 40 }) => {
    const ini = initials(name);
    const bg = AVATAR_BG[ini.charCodeAt(0) % AVATAR_BG.length];
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

  // ─── FIX 3: Loading / error guards BEFORE return (not mixed with hooks) ───────
  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 300, fontSize: 16, color: "#64748B" }}>
        Loading dashboard…
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 10, padding: "14px 18px", color: "#DC2626", fontSize: 14, margin: 24 }}>
        Failed to load dashboard data: {error}
      </div>
    );
  }

  // ─── Render ───────────────────────────────────────────────────────────────────
  return (
    <div>
      {/* ── FIX 4: style tag belongs inside JSX return, wrapped in <style> ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        button { font-family: inherit; }
        @keyframes shimmer { 0% { background-position: 200% 0 } 100% { background-position: -200% 0 } }
        @keyframes fadeUp  { from { opacity:0; transform:translateY(14px) } to { opacity:1; transform:translateY(0) } }
        .fade-up    { animation: fadeUp 0.45s ease both; }
        .stat-row   { display:flex; flex-wrap:wrap; gap:14px; }
        .stat-card  { flex:1 1 160px; min-width:130px; }
        .content-grid { display:grid; grid-template-columns:2fr 1.4fr; gap:24px; }
        .row-hover:hover     { background:#F8FAFC; }
        .listing-row:hover   { background:#F8FAFC; }
        .view-btn  { background:none; border:none; cursor:pointer; color:#0D6EFD; font-size:13px; font-weight:600; padding:4px 0; }
        .view-btn:hover { text-decoration:underline; }
        .icon-btn  { background:none; border:none; cursor:pointer; padding:5px; border-radius:6px; display:flex; align-items:center; }
        .icon-btn:hover { background:#F1F5F9; }
        .dropdown  { position:absolute; right:0; top:32px; background:#fff; border:1px solid #E5E7EB; border-radius:8px; box-shadow:0 4px 16px rgba(0,0,0,.1); z-index:20; min-width:130px; overflow:hidden; }
        .dropdown button { display:block; width:100%; text-align:left; padding:10px 14px; font-size:13px; color:#374151; background:none; border:none; cursor:pointer; }
        .dropdown button:hover { background:#F5F7FA; }
        .full-btn  { width:100%; height:44px; border-radius:8px; border:1px solid #E5E7EB; background:#fff; color:#0D6EFD; font-size:14px; font-weight:600; cursor:pointer; transition:background .15s; }
        .full-btn:hover { background:#EAF5FF; }
        .card      { border:1px solid #E5E7EB; border-radius:12px; background:#fff; }
        .section-header { display:flex; justify-content:space-between; align-items:center; padding:16px 20px; border-bottom:1px solid #F1F5F9; }
        .hide-sm   { }
        @media(max-width:1100px) { .content-grid { grid-template-columns:1fr !important; } }
        @media(max-width:600px)  { .hide-sm { display:none !important; } }
      `}</style>

      <div style={{ display: "flex", flexDirection: "column", gap: 24, minWidth: 0 }}>

        {/* Back */}
        <button className="icon-btn" style={{ display: "flex", alignItems: "center", gap: 4, color: "#64748B", fontSize: 14, width: "fit-content" }}>
          <Icon name="chevronLeft" size={16} color="#64748B" /> Back
        </button>

        {/* Welcome */}
        <div className={visible ? "fade-up" : ""} style={{ opacity: visible ? 1 : 0 }}>
          <h1 style={{ fontSize: "clamp(22px,3.5vw,38px)", fontWeight: 700, color: "#0F172A" }}>
            Welcome Back, {user?.name ?? "—"} ! 👋
          </h1>
          <p style={{ fontSize: 15, color: "#64748B", marginTop: 4 }}>Here's what's happening with your account today</p>
        </div>

        {/* ── Stat Cards ── */}
        <div className="stat-row">
          {STAT_CONFIG.map(({ key, label, subKey, staticSub, iconBg, iconColor, icon }, i) => {
            const value = data?.stats?.[key] ?? "—";
            const sub = subKey ? (data?.stats?.[subKey] ?? staticSub) : staticSub;
            return (
              <div key={key} className="stat-card card fade-up" style={{ padding: "16px 20px", display: "flex", alignItems: "center", gap: 14, height: 110, animationDelay: `${i * 60}ms` }}>
                <div style={{ width: 48, height: 48, borderRadius: "50%", background: iconBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon name={icon} size={22} color={iconColor} />
                </div>
                <div>
                  <div style={{ fontSize: 13, color: "#64748B", fontWeight: 500, marginBottom: 2 }}>{label}</div>
                  <div style={{ fontSize: 28, fontWeight: 700, color: "#0F172A", lineHeight: 1 }}>{value}</div>
                  <div style={{ fontSize: 12, color: "#0D6EFD", marginTop: 3 }}>{sub}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Two-column content ── */}
        <div className="content-grid">

          {/* LEFT — Recent Leads */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24, minWidth: 0 }}>
            <div className={`card${visible ? " fade-up" : ""}`} style={{ overflow: "hidden" }}>
              <div className="section-header">
                <h2 style={{ fontSize: 18, fontWeight: 600 }}>Recent Leads</h2>
                <button className="view-btn">View all</button>
              </div>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead className="hide-sm">
                    <tr style={{ borderBottom: "1px solid #F1F5F9" }}>
                      {["Name", "Property Type", "Time"].map(h => (
                        <th key={h} style={{ padding: "10px 20px", textAlign: "left", fontSize: 12, fontWeight: 500, color: "#64748B" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {(data?.leads ?? []).length === 0 ? (
                      <tr><td colSpan={3} style={{ padding: "24px 20px", textAlign: "center", color: "#9CA3AF", fontSize: 14 }}>No leads yet</td></tr>
                    ) : (data?.leads ?? []).map((lead) => (
                      <tr key={lead.npxid} className="row-hover" style={{ borderBottom: "1px solid #F8FAFC", transition: "background .15s" }}>
                        <td style={{ padding: "13px 20px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <Avatar name={lead.Name} />
                            <div>
                              <div style={{ fontSize: 14, fontWeight: 600, color: "#111827" }}>{lead.Name}</div>
                              <div style={{ fontSize: 12, color: "#6B7280" }}>{lead.phone}</div>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: "13px 20px" }}>
                          <div style={{ fontSize: 14, fontWeight: 500, color: "#111827" }}>{lead.projectname}</div>
                        </td>
                        <td style={{ padding: "13px 20px", fontSize: 13, color: "#6B7280", whiteSpace: "nowrap" }}>{lead.createdAt}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div style={{ padding: "12px 20px", borderTop: "1px solid #F1F5F9" }}>
                <button className="full-btn">View all leads</button>
              </div>
            </div>
          </div>

          {/* RIGHT — Recent Listings */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24, minWidth: 0 }}>
            <div className={`card${visible ? " fade-up" : ""}`} style={{ overflow: "hidden" }}>
              <div className="section-header">
                <h2 style={{ fontSize: 18, fontWeight: 600 }}>Recent Listings</h2>
                <button className="view-btn">View all</button>
              </div>
              <div>
                {(data?.listings ?? [])
                  .slice(0, 3)
                  .map((listing, i) => {
                    const accent = LISTING_ACCENTS[i % LISTING_ACCENTS.length];

                    return (
                      <div
                        key={listing.id}
                        className="listing-row"
                        style={{
                          display: "flex",
                          gap: 14,
                          padding: "14px 20px",
                          borderBottom: "1px solid #F8FAFC",
                          alignItems: "center",
                          transition: "background .15s",
                        }}
                      >
                        <PropertyThumb src={listing.imageUrl} accent={accent} />

                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div
                            style={{
                              fontSize: 15,
                              fontWeight: 600,
                              color: "#111827",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {listing.title}
                          </div>

                          <div
                            style={{
                              fontSize: 14,
                              fontWeight: 600,
                              color: "#111827",
                            }}
                          >
                            {listing.price}
                          </div>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-end",
                            gap: 8,
                            flexShrink: 0,
                          }}
                        >
                          <Badge status={listing.status} />

                          <div style={{ position: "relative" }}>
                            <button
                              className="icon-btn"
                              onClick={(e) => {
                                e.stopPropagation();
                                setOpenDropdown(
                                  openDropdown === listing.id ? null : listing.id
                                );
                              }}
                            >
                              <Icon name="dots" size={18} color="#6B7280" />
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
                  })}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;