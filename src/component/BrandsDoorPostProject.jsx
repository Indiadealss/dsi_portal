import { useState } from "react";
import shoppingmode from "../Images/shoppingmode.svg";
import assignment from "../Images/assignment.svg";
import key from "../Images/key.svg";
import { Link, useLocation } from "react-router-dom";

const steps = [
  { id: 1, label: "Choose Listing Type" },
  { id: 2, label: "Basic Details" },
  { id: 3, label: "Location Details" },
  { id: 4, label: "Pricing and Details" },
  { id: 5, label: "Photos & Videos" },
  { id: 6, label: "Amenities & Description" },
  { id: 7, label: "Preview & Publish" },
];

const listingTypes = [
  {
    id: "sale",
    title: "For Sale",
    description: "List your property for sale and connected with serious buyers",
    icon: shoppingmode
  },
  {
    id: "rent",
    title: "For Rent",
    description: "Find the right tenants by listing your property for rent",
    icon: assignment
  },
  {
    id: "lease",
    title: "For Lease",
    description: "List your property available for lease for business or commercial use",
    icon: key
  },
  {
    id: "pg",
    title: "PG / Hostel",
    description: "List your property available for lease for business or commercial use",
    icon: assignment
  },
];

const floorOptions = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11-15", "16-20", "20+"];

const benefits = [
  {
    title: "Maximum Visibility",
    desc: "Reach thousand of Verified Users",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
  },
  {
    title: "Trusted Platform",
    desc: "Secure, reliable and transparent",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: "Better Leads",
    desc: "Get quality leads and faster responses",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" />
      </svg>
    ),
  },
  {
    title: "Quick & Easy",
    desc: "Simple steps to list and manage your property",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
];

export default function BrandsDoorPostProject() {
  const [formData, setFormData] = useState({
    listingType: "",
    totalFloors: "",
  });
  const [currentStep] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [floorDropdownOpen, setFloorDropdownOpen] = useState(false);

  const updateForm = (key, value) => setFormData((prev) => ({ ...prev, [key]: value }));

  return (
    <div style={{ minHeight: "100vh" }}>
      <style>{`
        .listing-card { transition: border 0.2s, box-shadow 0.2s, transform 0.15s; cursor: pointer; }
        .listing-card:hover { border-color: #0D7EF2 !important; box-shadow: 0 4px 16px rgba(13,126,242,0.12); transform: translateY(-1px); }
        .listing-card.selected { border-color: #0D7EF2 !important; background: #F0F8FF !important; box-shadow: 0 4px 20px rgba(13,126,242,0.18); }
        .btn-primary { background: #0D7EF2; color: #fff; border: none; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer; transition: background 0.2s, transform 0.1s; }
        .btn-primary:hover { background: #0969D8; transform: translateY(-1px); }
        .btn-primary:active { transform: translateY(0); } 
        .step-item { display: flex; align-items: center; gap: 12px; padding: 10px 12px; border-radius: 8px; cursor: pointer; transition: background 0.2s; }
        .step-item.active { background: #EAF4FF; border: 1px solid #0D7EF2; }
        .step-item:not(.active):hover { background: #F3F4F6; }
        .step-circle { width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 600; flex-shrink: 0; transition: background 0.2s; }
        .step-circle.active { background: #0D7EF2; color: #fff; }
        .step-circle.inactive { background: #F3F4F6; color: #555; }
        .dropdown-option { padding: 10px 14px; cursor: pointer; font-size: 14px; color: #333; transition: background 0.15s; }
        .dropdown-option:hover { background: #EAF4FF; }
        .overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.4); z-index: 99; display: none; }
        .overlay.show { display: block; }
        .sidebar-mobile { position: fixed; left: 0; top: 0; bottom: 0; width: 280px; background: #fff; z-index: 100; transform: translateX(-100%); transition: transform 0.3s ease; overflow-y: auto; padding: 20px; box-shadow: 4px 0 20px rgba(0,0,0,0.12); }
        .sidebar-mobile.open { transform: translateX(0); }
        .hamburger { display: none; background: none; border: none; cursor: pointer; padding: 4px; }
        .progress-bar-fill { height: 8px; border-radius: 999px; background: #0D7EF2; transition: width 0.4s ease; }
        .benefit-item { flex: 1; min-width: 140px; }
        .benefit-divider { width: 1px; background: #D9EBDD; align-self: stretch; flex-shrink: 0; }
        @media (max-width: 1100px) {
          .main-container { flex-direction: column !important; }
          .sidebar-desktop { display: none !important; }
          .hamburger { display: block !important; }
          .listing-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 700px) {
          .listing-grid { grid-template-columns: 1fr !important; }
          .benefit-item { min-width: 100px; }
          .benefit-divider { display: none; }
          .page-title { font-size: 24px !important; }
          .post-project-btn { width: 140px !important; font-size: 13px !important; }
          .benefits-grid { flex-wrap: wrap !important; gap: 12px !important; }
        }
        @media (max-width: 480px) {
          .content-card { padding: 16px !important; }
          .page-title { font-size: 20px !important; }
        }
      `}</style>

     

      {/* MAIN */}
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "24px 16px" }}>
        <div style={{ marginBottom: 12 }}>
          <span style={{ fontSize: 13, color: "#555", cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
            Back
          </span>
        </div>

        <div className="main-container" style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
          {/* SIDEBAR DESKTOP */}
          

          {/* CONTENT */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="content-card" style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 12, padding: 24 }}>

              {/* Page Header */}
              <div style={{ marginBottom: 24 }}>
                <div className="flex flex-col md:flex-row justify-between">
                  <div>
                    <h1 className="page-title" style={{ fontSize: 32, fontWeight: 700, color: "#122033", lineHeight: 1.2 }}>
                      What would you like to post ?
                    </h1>
                    <p style={{ fontSize: 14, color: "#666", marginTop: 6 }}>Choose what you want to post and for what purpose</p>
                    <div style={{ width: 320, height: 2, background: "#0D7EF2", marginTop: 8, borderRadius: 2 }} />
                  </div>
                  <div>
                    <Link
                      to="/choose-listing-type"
                      className="inline-block bg-blue rounded text-md font-medium text-white px-10 py-2 cursor-pointer"
                    >
                      Post Project
                    </Link>
                  </div>
                </div>
              </div>

              {/* Listing Type */}
              <div style={{ marginBottom: 24 }}>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: "#122033", marginBottom: 4 }}>Choose Your listing type</h3>
                <p style={{ fontSize: 13, color: "#888", marginBottom: 16 }}>Select the purpose of your listing</p>

                <div className="listing-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
                  {listingTypes.map((type) => (
                    <div
                      key={type.id}
                      className={`listing-card ${formData.listingType === type.id ? "selected" : ""}`}
                      style={{ background: "#fff", border: `1px solid ${formData.listingType === type.id ? "#0D7EF2" : "#DADADA"}`, borderRadius: 10, padding: 16, position: "relative", minHeight: 110 }}
                      onClick={() => updateForm("listingType", type.id)}
                    >
                      {/* Radio */}
                      <div style={{ position: "absolute", top: 12, right: 12 }}>
                        <div style={{ width: 18, height: 18, borderRadius: "50%", border: `2px solid ${formData.listingType === type.id ? "#0D7EF2" : "#BDBDBD"}`, display: "flex", alignItems: "center", justifyContent: "center", background: "#fff" }}>
                          {formData.listingType === type.id && <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#0D7EF2" }} />}
                        </div>
                      </div>

                      <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                        <div className="w-[48px] h-[48px] rounded-md bg-[#EAF4FF] flex items-center justify-center shrink-0" style={{ width: 48, height: 48, borderRadius: "50%", background: "#EAF4FF", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <img src={type.icon} alt="INDIADEALSS Project Listings" />
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontSize: 15, fontWeight: 600, color: "#122033", marginBottom: 4 }}>{type.title}</div>
                          <div style={{ fontSize: 12, color: "#666", lineHeight: 1.4 }}>{type.description}</div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Dropdown alongside listing cards */}
                  {/* <div>
                    <label style={{ fontSize: 13, fontWeight: 500, color: "#333", display: "block", marginBottom: 8 }}>Total Floors in Building</label>
                    <div style={{ position: "relative" }}>
                      <div
                        onClick={() => setFloorDropdownOpen(!floorDropdownOpen)}
                        style={{ width: "100%", height: 44, border: "1px solid #DADADA", borderRadius: 8, padding: "0 12px", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", background: "#fff", fontSize: 14, color: formData.totalFloors ? "#333" : "#999" }}
                      >
                        {formData.totalFloors ? `${formData.totalFloors} Floor${formData.totalFloors === "1" ? "" : "s"}` : "Select the duration of time"}
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" style={{ transform: floorDropdownOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
                          <polyline points="6 9 12 15 18 9"/>
                        </svg>
                      </div>
                      {floorDropdownOpen && (
                        <div style={{ position: "absolute", top: "100%", left: 0, right: 0, background: "#fff", border: "1px solid #DADADA", borderRadius: 8, boxShadow: "0 8px 24px rgba(0,0,0,0.12)", zIndex: 20, maxHeight: 200, overflowY: "auto", marginTop: 4 }}>
                          {floorOptions.map((opt) => (
                            <div
                              key={opt}
                              className="dropdown-option"
                              style={{ background: formData.totalFloors === opt ? "#EAF4FF" : undefined, color: formData.totalFloors === opt ? "#0D7EF2" : undefined, fontWeight: formData.totalFloors === opt ? 500 : undefined }}
                              onClick={() => { updateForm("totalFloors", opt); setFloorDropdownOpen(false); }}
                            >
                              {opt} Floor{opt === "1" ? "" : "s"}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div> */}
                </div>
              </div>

              {/* Benefits Banner */}
              <div style={{ background: "#F3FBF6", border: "1px solid #D7F1DF", borderRadius: 10, padding: "16px 20px", marginBottom: 24 }}>
                <h4 style={{ fontSize: 15, fontWeight: 600, color: "#122033", marginBottom: 14 }}>Why Post with Indiadeals group ?</h4>
                <div className="benefits-grid" style={{ display: "flex", gap: 0, alignItems: "stretch" }}>
                  {benefits.map((b, i) => (
                    <>
                      <div key={b.title} className="benefit-item" style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "0 16px" }}>
                        <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#dcfce7", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          {b.icon}
                        </div>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 600, color: "#122033" }}>{b.title}</div>
                          <div style={{ fontSize: 12, color: "#666", marginTop: 2, lineHeight: 1.3 }}>{b.desc}</div>
                        </div>
                      </div>
                      {i < benefits.length - 1 && <div key={`div-${i}`} className="benefit-divider" />}
                    </>
                  ))}
                </div>
              </div>


            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SidebarContent({ currentStep }) {
  const progressPercent = (currentStep / 7) * 100;

  return (
    <div>
     
     

      
    </div>
  );
}