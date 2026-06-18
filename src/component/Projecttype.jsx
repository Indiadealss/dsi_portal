import { useState } from "react";
import lightbulb from '../Images/lightbulb.svg'
import Choosepropertype from "./Choosepropertype";
import Projectoverview from "./Projectoverview";
import Projectlocationnew from "./Projectlocationnew";
import Configurationandpricing from "./Configurationandpricing";
import Aminitiesandfeatures from "./Aminitiesandfeatures";
import FloorPlanPage from "./Floorplanpage";





export default function ProjectListingStep1() {
  const [activeStep, setActiveStep] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [steps, setSteps] = useState([
  { id: 1, label: "Choose Project Type", status:true, step:Choosepropertype},
  { id: 2, label: "Project Overview", status:false, step:Projectoverview },
  { id: 3, label: "Project Location", status:false, step:Projectlocationnew },
  { id: 4, label: "Configuration and pricing", status:false, step:Configurationandpricing },
  { id: 5, label: "Amenities and features", status:false, step:Aminitiesandfeatures },
  { id: 6, label: "Documents and Gallery", status:false, step:FloorPlanPage },
  { id: 7, label: "Preview & Publish", status:false, step:Choosepropertype },
]);

const CurrentStepComponent =
  steps.find(step => step.id === activeStep)?.step;

const handleNextStep = () => {
  if (activeStep < steps.length) {
    setActiveStep(activeStep + 1);
  }
};

const handleBackStep = () => {
  if (activeStep !== 1) {
    setActiveStep(activeStep - 1);
  }
};
  const progressPercent = Math.round((activeStep / steps.length) * 100);
  /* ── Sidebar rendered both in desktop slot and mobile drawer ── */
  const SidebarContent = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, }}>
      {/* Title */}
      <div>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: "#122033", lineHeight: 1.25, margin: 0 }}>
          Create a Listing
        </h2>
        <p style={{  color: "#6B7280", marginTop: 6, lineHeight: 1.5 }} className="text-sm font-medium">
          Add listing details to get more Visibility and more leads.
        </p>
      </div>

      {/* Progress card */}
      <div style={{border: "1px solid #E2E2E2", borderRadius: 10,}} className="p-[20px]">
      <div style={{}} className="border-b-2 border-[#E2E2E2] pb-3">
        <p style={{ fontSize: 11, color: "#6B7280", margin: 0 }}>Steps {activeStep} of {steps.length}</p>
        <p style={{ fontSize: 13, fontWeight: 600, color: "#111827", margin: "4px 0 10px" }}>Basic Details</p>
        <div style={{ height: 8, borderRadius: 999, background: "#E5E7EB", overflow: "hidden" }}>
          <div
            style={{
              height: "100%",
              borderRadius: 999,
              background: "#0D7EF2",
              width: `${progressPercent}%`,
              transition: "width 0.4s ease",
            }}
          />
        </div>
      </div>

      {/* Step list */}
      <nav style={{ display: "flex", flexDirection: "column", gap: 4 }} className="my-3">
        {steps.map((s) => {
          const isActive = s.id === activeStep;
          return (
            <div
              key={s.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "10px 12px",
                borderRadius: 8,
                border: isActive ? "1px solid #0D7EF2" : "1px solid transparent",
                background: isActive ? "#EAF4FF" : "transparent",
                cursor: "pointer",
                transition: "background 0.2s, border 0.2s",
              }}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 13,
                  fontWeight: 600,
                  flexShrink: 0,
                  background: isActive ? "#0D7EF2" : "#F3F4F6",
                  color: isActive ? "#fff" : "#555",
                  transition: "background 0.2s",
                }}
              >
                {s.id}
              </div>
              <span
                style={{
                  fontSize: 13,
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? "#0D7EF2" : "#6B7280",
                  lineHeight: 1.3,
                }}
              >
                {s.label}
              </span>
            </div>
          );
        })}
      </nav>
      </div>

      {/* Help card */}
      <div style={{ background: "#EEF6FF", borderRadius: 10, padding: "14px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
          <div
            style={{
              width: 24,
              height: 24,
              borderRadius: "50%",
              background: "#0D7EF2",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <span style={{ color: "#fff", fontSize: 13, fontWeight: 700 }}>?</span>
          </div>
          <p style={{ fontSize: 13, fontWeight: 600, color: "#111827", margin: 0 }}>Need Help ?</p>
        </div>
        <p style={{ fontSize: 12, color: "#6B7280", margin: "0 0 8px", lineHeight: 1.4 }}>
          Visit our Help Center or contact our support team.
        </p>
        <button
          style={{
            background: "none",
            border: "none",
            padding: 0,
            color: "#0D7EF2",
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          Go to Help Center
          <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 14, height: 14 }}>
            <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
          </svg>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      <style>{`
        .sidebar-desktop { display: block; }
        .hamburger-btn { display: none; }
        @media (max-width: 1024px) {
          .sidebar-desktop { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
      `}</style>

      {/* ── HEADER ── */}
      

      {/* ── BODY ── */}
      <div className="">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-6">
            <button className="flex items-center gap-1.5 text-[#666] text-sm hover:text-[#0D6EFD] transition-colors cursor-pointer" onClick={handleBackStep}>
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" /></svg>
                  Back
                </button>
          <div className="flex gap-6 xl:gap-8 items-start py-3">

            {/* ── SIDEBAR DESKTOP ── */}
            <aside
              className="sidebar-desktop"
              style={{
                width: 260,
                flexShrink: 0,
                borderRadius: 12,
              }}
            >
              <SidebarContent />
            </aside>

            {/* ── MOBILE HAMBURGER ── */}
            <button
              className="hamburger-btn"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{
                position: "fixed",
                bottom: 24,
                left: 24,
                zIndex: 40,
                background: "#0D7EF2",
                color: "#fff",
                border: "none",
                borderRadius: "50%",
                width: 48,
                height: 48,
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 14px rgba(13,126,242,0.4)",
                cursor: "pointer",
              }}
            >
              <svg viewBox="0 0 24 24" fill="white" style={{ width: 22, height: 22 }}>
                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
              </svg>
            </button>

            {/* ── MOBILE SIDEBAR DRAWER ── */}
            <div
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 99,
                pointerEvents: sidebarOpen ? "auto" : "none",
              }}
            >
              {/* overlay */}
              <div
                onClick={() => setSidebarOpen(false)}
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(0,0,0,0.4)",
                  opacity: sidebarOpen ? 1 : 0,
                  transition: "opacity 0.3s ease",
                }}
              />
              {/* drawer */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  bottom: 0,
                  width: 280,
                  paddingTop: 90,
                  overflowY: "auto",
                  boxShadow: "4px 0 20px rgba(0,0,0,0.12)",
                  transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)",
                  transition: "transform 0.3s ease",
                }}
              >
                <SidebarContent />
              </div>
            </div>

            {/* ── MAIN CONTENT ── */}
            <main className="flex-1 min-w-0">
                <div  className="bg-white border border-[#E5E7EB] rounded-xl space-y-7">
                {CurrentStepComponent && <CurrentStepComponent />}
              {/* ── ACTION BUTTONS ── */}
                <div className="flex flex-col md:flex-row items-center justify-between pt-1 mx-5 mb-5">
                  <button className="flex items-center gap-2 px-4 h-11 border border-[#D1D5DB] rounded-lg text-sm font-semibold text-[#374151] bg-white hover:bg-gray-50 transition-colors mb-3">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#6B7280]">
                      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z" />
                    </svg>
                    Save as Draft
                  </button>

                  <button className="flex items-center gap-2 px-5 h-11 bg-[#0D6EFD] hover:bg-[#0B5ED7] active:bg-[#0A51BE] text-white text-sm font-semibold rounded-lg transition-colors shadow-sm" onClick={handleNextStep}>
                    Save and continue
                    <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" /></svg>
                  </button>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
