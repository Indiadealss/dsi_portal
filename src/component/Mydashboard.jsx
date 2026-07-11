import { useState, useEffect } from "react";
import Dashboard from "./Dashboard";
import { lead } from "../api/api";
import { useSelector } from "react-redux";
import MyListings from "./MyListings";
import LeadsInquiries from "./LeadsInquiries";
import NotificationsDashboard from "./Notifications";
import SubscriptionPlanDashboard from "./SubscriptionPlanDashboard";
import CampaignManagementDashboard from "./CampaignManagementDashboard";
import CreateCampaignForm from "./CreateCampaignForm";
import Settingdashboard from "./Settingdashboard";
import Helpandsupport from "./Helpandsupport";

// ─────────────────────────────────────────────────────────────────────────────
//  API  — replace the URL with your real endpoint.
//  Expected shape:
//  {
//    userName: string,
//    stats: {
//      totalListings: number, activeListings: number, activeListingsPct: string,
//      totalLeads: number, savedProperties: number, unreadMessages: number
//    },
//    leads: Array<{ id, name, phone, propertyType, location, status, time }>,
//    listings: Array<{ id, title, location, price, status, imageUrl? }>,
//    performance: { propertyViews, newLeads, callReceived, messageReceived, savedListings },
//  }
// ─────────────────────────────────────────────────────────────────────────────
const API_URL = "/api/dashboard"; // ← swap to your real endpoint

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

// ─── SVG Icons (static UI asset) ─────────────────────────────────────────────
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
};

// ─── Static sidebar nav (labels & icons never change) ─────────────────────────
const NAV = [
  { id: "dashboard",    label: "Dashboard",            icon: "listing"      },
  { id: "listings",     label: "My Listings",          icon: "layers"       },
  // { id: "saved",        label: "Saved Properties",     icon: "bookmark"     },
  { id: "leads",        label: "Leads & Inquiries",    icon: "users"        },
  { id: "messages",     label: "Messages",             icon: "message"      },
  { id: "notifications",label: "Notifications",        icon: "bell"         },
  { id: "analytics",    label: "Analytics & Reports",  icon: "analytics"    },
  { id: "subscription", label: "Subscription & Plan",  icon: "subscription" },
  { id: "campaign",     label: "Campaign",             icon: "campaign"     },
  { id: "verification", label: "Profile Verification", icon: "shield"       },
  { id: "settings",     label: "Settings",             icon: "settings"     },
  { id: "help",         label: "Help & Support",       icon: "help"         },
];





// ─── Main Dashboard ───────────────────────────────────────────────────────────
export default function Mydashboard() {


 
  const [activeNav,     setActiveNav]     = useState("dashboard");
  const [sidebarOpen,   setSidebarOpen]   = useState(false);



  const nav = (
    <nav style={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {NAV.map(({ id, label, icon }) => {
        const active = activeNav === id;
        return (
          <button key={id}
            onClick={() => { setActiveNav(id); setSidebarOpen(false); }}
            style={{ display: "flex", alignItems: "center", gap: 10, height: 48, padding: "0 12px", borderRadius: 8, border: active ? "1px solid #0D6EFD" : "1px solid transparent", background: active ? "#EAF5FF" : "transparent", color: active ? "#0D6EFD" : "#4B5563", cursor: "pointer", fontSize: 14, fontWeight: active ? 600 : 400, transition: "background 0.15s, color 0.15s", textAlign: "left", width: "100%" }}
            onMouseEnter={e => { if (!active) e.currentTarget.style.background = "#F5F7FA"; }}
            onMouseLeave={e => { if (!active) e.currentTarget.style.background = "transparent"; }}
          >
            <Icon name={icon} size={18} color={active ? "#0D6EFD" : "#4B5563"} />
            {label}
          </button>
        );
      })}
    </nav>
  );

  return (
    <>
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

      {/* Mobile top bar */}
      <div className="mob-bar">
        <button className="icon-btn" onClick={() => setSidebarOpen(true)}><Icon name="menu" size={22} color="#374151"/></button>
        <span style={{ fontWeight: 700, fontSize: 16 }}>Real Estate Portal</span>
      </div>

      {/* Overlay */}
      <div className={`overlay${sidebarOpen ? " open" : ""}`} onClick={() => setSidebarOpen(false)} />

      {/* Page */}
      <div className="page">

        {/* Sidebar */}
        <aside className={`sidebar${sidebarOpen ? " open" : ""}`}>
          {sidebarOpen && (
            <button className="icon-btn" onClick={() => setSidebarOpen(false)} style={{ marginBottom: 10, marginLeft: "auto", display: "flex" }}>
              <Icon name="close" size={20} color="#374151"/>
            </button>
          )}
          {nav}
        </aside>

          {activeNav === "dashboard" && <Dashboard />}
          {activeNav === "listings" && <MyListings />}
          {activeNav === 'leads' && <LeadsInquiries />}
          {activeNav === "notifications" && <NotificationsDashboard />}
          {activeNav === "subscription" && <SubscriptionPlanDashboard />}
          {activeNav === 'campaign' && <CampaignManagementDashboard  setActiveNav={setActiveNav} />}
          {activeNav === 'createcampaign' && <CreateCampaignForm setActiveNav={setActiveNav}/>}
          {activeNav === 'settings' && <Settingdashboard />}
          {activeNav === 'help' && <Helpandsupport />}

          
      </div>
    </>
  );
}