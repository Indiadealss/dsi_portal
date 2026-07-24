import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateField, updateFields } from "./Redux/propertySlice";

// ─── Amenity Icons (SVG inline) ───────────────────────────────────────────────
const icons = {
  Swimming: (c) => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12c1.5-2 3-2 4.5 0s3 2 4.5 0 3-2 4.5 0 3 2 4.5 0"/>
      <path d="M2 17c1.5-2 3-2 4.5 0s3 2 4.5 0 3-2 4.5 0 3 2 4.5 0"/>
      <circle cx="12" cy="5" r="1.5"/><path d="M12 6.5v3l2 2"/>
    </svg>
  ),
  Gym: (c) => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 4v16M18 4v16M2 8h4M18 8h4M2 16h4M18 16h4M6 12h12"/>
    </svg>
  ),
  Parking: (c) => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 17V7h4a3 3 0 0 1 0 6H9"/>
    </svg>
  ),
  Garden: (c) => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22V12"/><path d="M12 12C12 7 7 4 4 6c3 0 5 2 8 6z"/><path d="M12 12c0-5 5-8 8-6-3 0-5 2-8 6z"/>
    </svg>
  ),
  Security: (c) => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L4 6v6c0 5.5 3.5 10.7 8 12 4.5-1.3 8-6.5 8-12V6l-8-4z"/>
    </svg>
  ),
  Elevator: (c) => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="2" width="18" height="20" rx="2"/><path d="M8 8l4-4 4 4M8 16l4 4 4-4"/>
    </svg>
  ),
  Clubhouse: (c) => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 22V11l9-9 9 9v11"/><path d="M9 22V16h6v6"/><rect x="9" y="9" width="6" height="5"/>
    </svg>
  ),
  Playground: (c) => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 20V8l7-6 7 6v12"/><circle cx="12" cy="14" r="3"/>
    </svg>
  ),
  Wifi: (c) => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12.5A9.97 9.97 0 0 1 12 10a9.97 9.97 0 0 1 7 2.5"/><path d="M8.5 16A4.97 4.97 0 0 1 12 15a4.97 4.97 0 0 1 3.5 1"/><circle cx="12" cy="19" r="1"/>
      <path d="M2 8.5A14.5 14.5 0 0 1 12 5a14.5 14.5 0 0 1 10 3.5"/>
    </svg>
  ),
  CCTV: (c) => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2"/>
    </svg>
  ),
  Power: (c) => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18.4 6.6A9 9 0 1 1 5.6 6.6"/><line x1="12" y1="2" x2="12" y2="12"/>
    </svg>
  ),
  Intercom: (c) => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92V19a2 2 0 0 1-2.18 2A19.86 19.86 0 0 1 3.08 5.18 2 2 0 0 1 5 3h2.08a2 2 0 0 1 2 1.72c.13 1 .38 1.97.74 2.9a2 2 0 0 1-.45 2.1L8.1 11a16 16 0 0 0 4.89 4.89l1.28-1.27a2 2 0 0 1 2.1-.45c.93.36 1.9.61 2.9.74A2 2 0 0 1 22 16.92z"/>
    </svg>
  ),
  Rainwater: (c) => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C6 9 4 13 4 16a8 8 0 0 0 16 0c0-3-2-7-8-14z"/>
    </svg>
  ),
  SolarPower: (c) => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  ),
  FireSafety: (c) => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8.5 14.5A4.5 4.5 0 0 0 17 12c0-4-3-7-5-9-2 3-3 4-3 7a4.5 4.5 0 0 0 .5 2z"/>
    </svg>
  ),
  Jogging: (c) => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="13" cy="4" r="2"/><path d="M7 22l2-8 3 3 2-5 2 10"/><path d="M5 12h5l2-3 3 2h4"/>
    </svg>
  ),
  Yoga: (c) => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="4" r="2"/><path d="M12 6v6l-4 4M12 12l4 4M8 20h8"/>
    </svg>
  ),
  Temple: (c) => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 22V11l9-9 9 9v11H3z"/><path d="M12 2v20M3 11h18"/>
    </svg>
  ),
  Sports: (c) => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M2 12h20"/>
    </svg>
  ),
  Library: (c) => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19V5a2 2 0 0 1 2-2h13a1 1 0 0 1 1 1v13"/><path d="M4 19a2 2 0 0 0 2 2h13"/><path d="M9 3v12l3-2 3 2V3"/>
    </svg>
  ),
  Cafe: (c) => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/>
    </svg>
  ),
  Medical: (c) => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
    </svg>
  ),
  ATM: (c) => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>
    </svg>
  ),
  Market: (c) => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
    </svg>
  ),
  WasteManagement: (c) => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/>
    </svg>
  ),
  EV: (c) => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/>
    </svg>
  ),
  Tennis: (c) => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><path d="M4.5 4.5C7 7 7 11 4.5 14"/><path d="M19.5 4.5C17 7 17 11 19.5 14"/>
    </svg>
  ),
  Amphitheatre: (c) => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 20h20"/><path d="M4 20V10a8 8 0 0 1 16 0v10"/><path d="M8 20v-6a4 4 0 0 1 8 0v6"/>
    </svg>
  ),
  Concierge: (c) => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4"/><path d="M2 20c0-4 4-7 10-7s10 3 10 7"/>
    </svg>
  ),
  Pet: (c) => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 5.172C10 3.782 8.423 2.679 6.5 3c-2.823.47-4.113 6.006-4 7 .08.703.461 1 1.5 1C6.22 11 7 10 8 10c.63 0 1.146.448 1.5 1h1c.354-.552.87-1 1.5-1 1 0 1.78 1 3 1 1.039 0 1.42-.297 1.5-1 .113-.994-1.177-6.53-4-7-1.923-.321-3.5.782-3.5 2.172z"/>
      <path d="M12 13c-2.5 2-4 4-4 6.5 0 1.5 1 2.5 4 2.5s4-1 4-2.5c0-2.5-1.5-4.5-4-6.5z"/>
    </svg>
  ),
  Rooftop: (c) => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12l9-9 9 9"/><path d="M5 10v10h14V10"/><path d="M10 22v-6h4v6"/>
    </svg>
  ),
  Spa: (c) => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C6 6 4 10 4 14c0 4.4 3.6 8 8 8s8-3.6 8-8c0-4-2-8-8-12z"/><path d="M12 8c-2 2-3 4-3 6"/>
    </svg>
  ),
};

const ALL_AMENITIES = [
  { id: 1, name: "Swimming Pool", key: "Swimming" },
  { id: 2, name: "Gym", key: "Gym" },
  { id: 3, name: "Parking", key: "Parking" },
  { id: 4, name: "Garden", key: "Garden" },
  { id: 5, name: "24/7 Security", key: "Security" },
  { id: 6, name: "Elevator", key: "Elevator" },
  { id: 7, name: "Clubhouse", key: "Clubhouse" },
  { id: 8, name: "Playground", key: "Playground" },
  { id: 9, name: "Wi-Fi Zone", key: "Wifi" },
  { id: 10, name: "CCTV", key: "CCTV" },
  { id: 11, name: "Power Backup", key: "Power" },
  { id: 12, name: "Intercom", key: "Intercom" },
  { id: 13, name: "Rainwater Harvesting", key: "Rainwater" },
  { id: 14, name: "Solar Power", key: "SolarPower" },
  { id: 15, name: "Fire Safety", key: "FireSafety" },
  { id: 16, name: "Jogging Track", key: "Jogging" },
  { id: 17, name: "Yoga Deck", key: "Yoga" },
  { id: 18, name: "Temple", key: "Temple" },
  { id: 19, name: "Sports Court", key: "Sports" },
  { id: 20, name: "Library", key: "Library" },
  { id: 21, name: "Café", key: "Cafe" },
  { id: 22, name: "Medical Room", key: "Medical" },
  { id: 23, name: "ATM", key: "ATM" },
  { id: 24, name: "Mini Market", key: "Market" },
  { id: 25, name: "Waste Mgmt", key: "WasteManagement" },
  { id: 26, name: "EV Charging", key: "EV" },
  { id: 27, name: "Tennis Court", key: "Tennis" },
  { id: 28, name: "Amphitheatre", key: "Amphitheatre" },
  { id: 29, name: "Concierge", key: "Concierge" },
  { id: 30, name: "Pet Area", key: "Pet" },
  { id: 31, name: "Rooftop Lounge", key: "Rooftop" },
  { id: 32, name: "Spa", key: "Spa" },
];

const DEFAULT_FEATURES = [];

// ─── Amenity Card ─────────────────────────────────────────────────────────────
function AmenityCard({ amenity, selected, onToggle }) {
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);
  const IconFn = icons[amenity.key];
  const iconColor = selected ? "#007AFF" : "#9CA3AF";

  let bg = "#FFFFFF";
  let border = "1px solid #DADADA";
  if (active && selected) { bg = "#E6F2FF"; border = "1px solid #007AFF"; }
  else if (selected) { bg = "#F0F8FF"; border = "1px solid #007AFF"; }
  else if (hovered) { bg = "#F8FAFC"; border = "1px solid #BFC6D1"; }

  return (
    <div
      role="checkbox"
      aria-checked={selected}
      tabIndex={0}
      onClick={onToggle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setActive(false); }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      onKeyDown={(e) => (e.key === " " || e.key === "Enter") && onToggle()}
      style={{
        position: "relative",
        width: "100%",
        height: 76,
        background: bg,
        border,
        borderRadius: 8,
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
        transition: "background 0.15s, border-color 0.15s",
        outline: "none",
        userSelect: "none",
      }}
      onFocus={(e) => (e.currentTarget.style.boxShadow = "0 0 0 2px #007AFF55")}
      onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
    >
      {/* Selection badge */}
      {selected && (
        <div
          style={{
            position: "absolute",
            top: 5,
            right: 5,
            width: 18,
            height: 18,
            background: "#007AFF",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <polyline points="2,5 4.2,7.5 8,3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      )}
      {IconFn && IconFn(iconColor)}
      <span style={{
        fontSize: 11,
        fontWeight: selected ? 500 : 400,
        color: selected ? "#007AFF" : "#7A7A7A",
        textAlign: "center",
        lineHeight: "14px",
        padding: "0 4px",
        transition: "color 0.15s",
      }}>
        {amenity.name}
      </span>
    </div>
  );
}

// ─── Feature Tag ──────────────────────────────────────────────────────────────
function FeatureTag({ label, onRemove }) {
  return (
    <div style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      height: 32,
      padding: "0 12px",
      background: "#F0FDF4",
      border: "1px solid #DCFCE7",
      borderRadius: 4,
      fontSize: 14,
      fontWeight: 500,
      color: "#15803D",
      whiteSpace: "nowrap",
    }}>
      {label}
      <button
        onClick={() => onRemove(label)}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
          color: "#15803D",
          fontSize: 14,
          lineHeight: 1,
          display: "flex",
          alignItems: "center",
          opacity: 0.8,
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = 0.8)}
        aria-label={`Remove ${label}`}
      >
        ×
      </button>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Aminitiesandfeatures() {

  const propertyFirstData = useSelector((state) => state.property.data);

  const [selectedAmenities, setSelectedAmenities] = useState(new Set(propertyFirstData.amenitie || []));
  const [features, setFeatures] = useState(DEFAULT_FEATURES);
  const [newFeature, setNewFeature] = useState("");
  const [addingFeature, setAddingFeature] = useState(false);
  const [saved, setSaved] = useState(false);
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const debounce = useRef(null);


  useEffect(() => {
    console.log(selectedAmenities, 'select amenities are');
    clearTimeout(debounce.current);

    debounce.current = setTimeout(() => {
      dispatch(updateFields({
        amenitie:[...selectedAmenities],
      }))
    },400)
    
  },[selectedAmenities])


  useEffect(() => {
    if (addingFeature && inputRef.current) inputRef.current.focus();
  }, [addingFeature]);

  const toggleAmenity = (id) => {
    setSelectedAmenities((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const removeFeature = (label) => {
    setFeatures((prev) => prev.filter((f) => f !== label));
  };

  const confirmFeature = () => {
    const trimmed = newFeature.trim();
    if (trimmed && !features.includes(trimmed)) {
      setFeatures((prev) => [...prev, trimmed]);
    }
    setNewFeature("");
    setAddingFeature(false);
  };

  const handleSaveDraft = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div style={{
      minHeight: "100vh",
      fontFamily: "Inter, sans-serif",
      padding: "32px 24px",
      boxSizing: "border-box",
    }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>

        {/* ── Header ── */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: 16,
          marginBottom: 24,
        }}>
          <div style={{ flex: 1, minWidth: 260 }}>
            <h1 style={{
              fontSize: "clamp(26px, 3vw, 40px)",
              fontWeight: 700,
              color: "#0F172A",
              letterSpacing: "-0.1px",
              lineHeight: 1.2,
              margin: "0 0 6px 0",
            }}>
              Amenities and Features
            </h1>
            <p style={{
              color: "#64748B",
              margin: "0 0 12px 0",
              lineHeight: "28px",
            }}
            className="text-sm font-semibold"
            >
              Select all the amenities and features available in your commercial project
            </p>
            <div style={{ width: "min(520px, 100%)", height: 2, background: "#007AFF", borderRadius: 999 }} />
          </div>

          {/* Tip card */}
          <div style={{
            width: 320,
            minHeight: 72,
            background: "#F8FFF9",
            border: "1px solid #D8ECDC",
            borderRadius: 10,
            padding: 16,
            display: "flex",
            gap: 12,
            alignItems: "flex-start",
            flexShrink: 0,
          }}>
            <div style={{ marginTop: 2, flexShrink: 0 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="9" y1="18" x2="15" y2="18"/><line x1="10" y1="22" x2="14" y2="22"/>
                <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/>
              </svg>
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#0F172A", marginBottom: 4 }}>Tip</div>
              <div style={{ fontSize: 13, color: "#64748B", lineHeight: "18px" }}>
                Highlighting the right amenities helps buyers understand the value of your project.
              </div>
            </div>
          </div>
        </div>

        {/* ── Amenities Section ── */}
        <div style={{
          background: "#FFFFFF",
          border: "1px solid #E5E7EB",
          borderRadius: 10,
          padding: 24,
          marginBottom: 20,
        }}>
          <h2 style={{ fontSize: 18, fontWeight: 600, color: "#0F172A", margin: "0 0 4px 0" }}>
            Select Amenities
          </h2>
          <p style={{ fontSize: 14, color: "#64748B", margin: "0 0 16px 0" }}>
            Choose from the list of amenities available in your project
          </p>

          {/* Scrollable grid */}
          <div style={{
            border: "1px solid #DADADA",
            borderRadius: 8,
            padding: 14,
            height: 390,
            overflowY: "auto",
            scrollbarWidth: "thin",
            scrollbarColor: "#D1D5DB #F1F5F9",
          }}>
            <style>{`
              .amenities-grid::-webkit-scrollbar { width: 6px; }
              .amenities-grid::-webkit-scrollbar-track { background: #F1F5F9; border-radius: 999px; }
              .amenities-grid::-webkit-scrollbar-thumb { background: #D1D5DB; border-radius: 999px; }
            `}</style>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))",
              gap: 14,
            }}>
              {ALL_AMENITIES.map((a) => (
                <AmenityCard
                  key={a.id}
                  amenity={a}
                  selected={selectedAmenities.has(a.name)}
                  onToggle={() => toggleAmenity(a.name)}
                />
              ))}
            </div>
          </div>

          {/* Info note */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            marginTop: 12,
            fontSize: 14,
            fontWeight: 500,
            color: "#007AFF",
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#007AFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="8" strokeWidth="3"/>
              <line x1="12" y1="12" x2="12" y2="16"/>
            </svg>
            you can select multiple amenities that best describe your project
            {selectedAmenities.size > 0 && (
              <span style={{
                marginLeft: 8,
                background: "#007AFF",
                color: "#fff",
                borderRadius: 999,
                padding: "1px 8px",
                fontSize: 12,
                fontWeight: 600,
              }}>
                {selectedAmenities.size} selected
              </span>
            )}
          </div>
        </div>

        {/* ── Key Features Section ── */}
        <div style={{
          background: "#FFFFFF",
          border: "1px solid #E5E7EB",
          borderRadius: 10,
          padding: 24,
          marginBottom: 24,
        }}>
          <h2 style={{ fontSize: 18, fontWeight: 600, color: "#0F172A", margin: "0 0 4px 0" }}>
            Key Features <span style={{ fontWeight: 400, color: "#64748B", fontSize: 16 }}>(Optional)</span>
          </h2>
          <p style={{ fontSize: 14, color: "#64748B", margin: "0 0 16px 0" }}>
            Add key features or special USPs of your project
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
            {features.map((f) => (
              <FeatureTag key={f} label={f} onRemove={removeFeature} />
            ))}

            {/* Inline add input */}
            {addingFeature ? (
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                <input
                  ref={inputRef}
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") confirmFeature();
                    if (e.key === "Escape") { setAddingFeature(false); setNewFeature(""); }
                  }}
                  placeholder="Type feature & press Enter"
                  style={{
                    height: 32,
                    padding: "0 10px",
                    border: "1px solid #007AFF",
                    borderRadius: 4,
                    fontSize: 13,
                    color: "#0F172A",
                    outline: "none",
                    width: 200,
                    background: "#fff",
                  }}
                />
                <button
                  onClick={confirmFeature}
                  style={{
                    height: 32,
                    padding: "0 10px",
                    background: "#007AFF",
                    border: "none",
                    borderRadius: 4,
                    color: "#fff",
                    fontSize: 13,
                    cursor: "pointer",
                    fontWeight: 500,
                  }}
                >
                  Add
                </button>
                <button
                  onClick={() => { setAddingFeature(false); setNewFeature(""); }}
                  style={{
                    height: 32,
                    padding: "0 8px",
                    background: "#fff",
                    border: "1px solid #DADADA",
                    borderRadius: 4,
                    color: "#64748B",
                    fontSize: 13,
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setAddingFeature(true)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 5,
                  height: 32,
                  padding: "0 12px",
                  background: "#FFFFFF",
                  border: "1px solid #DADADA",
                  borderRadius: 4,
                  fontSize: 13,
                  fontWeight: 500,
                  color: "#64748B",
                  cursor: "pointer",
                  transition: "border-color 0.15s, color 0.15s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#007AFF"; e.currentTarget.style.color = "#007AFF"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#DADADA"; e.currentTarget.style.color = "#64748B"; }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
                ADD More
              </button>
            )}
          </div>
        </div>

        

      </div>
    </div>
  );
}