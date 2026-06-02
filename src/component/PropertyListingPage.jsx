import { useState, useCallback, useEffect } from "react";
import { getOnlyProperties, searchaddress, searchCities } from "../api/api";
import BuyLabel from "../Images/BuyLabel.svg";
import RenLabel from "../Images/RentLabel.svg";
import LeaseLabel from "../Images/LeaseLabel.svg";
import AllLabel from "../Images/AllProperties.svg";
// import { getOnlyProperties } from "../api/api";



// Mock paginated API — replace with: getOnlyProperties(page, 'noida', purpose)
async function fetchPropertiesAPI(page, purpose) {
  const res = await getOnlyProperties(page, 'noida', purpose === 'all' ? 'sell' : purpose);
  const data = res.data?.data || [];
  return {
    data,
    total: res.data?.total || data.length,
    totalPages: res.data?.totalPages || 1,
    page,
  };
}
// ─────────────────────────────────────────────────────────────────────────────

// ─── Data formatter ───────────────────────────────────────────────────────────
function formatProperty(p) {
  let locationData = [];
  try {
    locationData = Array.isArray(p.location) ? p.location : JSON.parse(p.location);
  } catch { locationData = []; }

  const loc = locationData[0] || {};

  const validImages = Array.isArray(p.images) && p.images.length > 0
    ? p.images.filter(img => img && (img.src || img.fields?.src) && (img.src || img.fields?.src) !== "No image uploaded")
      .map(img => ({ type: img.type || img.fields?.type || "unknown", src: img.src || img.fields?.src || "" }))
    : [{ src: "https://indiadealss.s3.eu-north-1.amazonaws.com/indiadealss/noImageBg.svg", type: "cover" }];

  const highlights = [];
  if (p.propertyfacing) highlights.push(p.propertyfacing);
  if (p.pobackup) highlights.push(`Power Backup: ${p.pobackup}`);
  if (Array.isArray(p.watersource)) p.watersource.forEach(w => highlights.push(w));
  if (Array.isArray(p.overlo)) {
    p.overlo.forEach(item => {
      const label = typeof item === "string" ? item : (item.label || item.name || "Feature");
      highlights.push(label);
    });
  }

  const statusMap = { sell: "FOR SALE", rent: "FOR RENT", lease: "FOR LEASE" };

  const city = loc.City || "";
  const address = loc.Address || "Unknown Location";
  const aptName = loc.apartment_name || p.apartment_name || p.projectname || "";

  let subtitle = "";
  if (p.property === "commercial") {
    subtitle = `${p.availabestatus ? p.availabestatus + " " : ""}${p.propertyType} in ${city}`;
  } else if (p.propertyType === "plotLand") {
    subtitle = `${p.property} property in ${city} for ${p.purpose}`;
  } else {
    subtitle = `${p.bedroom ? p.bedroom + " BHK " : ""}${p.propertyType} in ${city}`;
  }

  return {
    id: p._id,
    images: validImages,
    title: aptName || address.split(",")[0] || "Property",
    subtitle,
    status: statusMap[p.purpose] || "FOR SALE",
    type: p.property || "residential",
    propertyType: p.propertyType || "",
    location: address,
    city,
    price: p.price ? Number(p.price) : 0,
    priceFormatted: formatPrice(p.price, p.purpose),
    bedroom: p.bedroom ? Number(p.bedroom) : null,
    bathroom: p.bathroom ? Number(p.bathroom) : null,
    buildarea: p.buildarea ? `${p.buildarea} sq.ft` : null,
    parking: (p.coveredparking || 0) + (p.uncoveredparking || 0),
    furnishing: p.furnishing || "",
    availabestatus: p.availabestatus || "",
    tags: highlights.slice(0, 5),
    agentName: typeof p.owner === "object" ? (p.owner?.name || "Owner") : (p.owner || "Owner"),
    developer: p.projectdeveloper || "",
    numSets: p.numSets || null,
    numCabin: p.numCabin || null,
    updatedAt: new Date(p.updatedAt).toLocaleDateString("en-IN"),
  };
}

function formatPrice(price, purpose) {
  const num = Number(price);
  if (!num) return "Price on Request";
  const suffix = purpose === "rent" ? "/mo" : purpose === "lease" ? "/mo" : "";
  if (num >= 10000000) return `₹ ${(num / 10000000).toFixed(num % 10000000 === 0 ? 0 : 2)} Cr${suffix}`;
  if (num >= 100000) return `₹ ${(num / 100000).toFixed(num % 100000 === 0 ? 0 : 2)} L${suffix}`;
  return `₹ ${num.toLocaleString("en-IN")}${suffix}`;
}
// ─────────────────────────────────────────────────────────────────────────────

const STATUS_COLORS = {
  "FOR SALE": { bg: "#22c55e", text: "#fff" },
  "FOR RENT": { bg: "#3b82f6", text: "#fff" },
  "FOR LEASE": { bg: "#8b5cf6", text: "#fff" },
};

const PROPERTY_TYPE_LABELS = {
  flatApartment: "Flat / Apartment",
  plotLand: "Plot / Land",
  villa: "Villa",
  builderFloor: "Builder Floor",
  office: "Office Space",
  shop: "Shop",
  warehouse: "Warehouse",
};

const CITIES = ["Noida", "Greater Noida", "Ghaziabad", "Delhi", "Gurugram"];
const PROP_TYPES = ["flatApartment", "plotLand", "villa", "builderFloor", "office", "shop"];
const FURNISH_OPTIONS = ["Fully Furnished", "Semi-furnished", "Un-furnished"];
const AVAIL_STATUS = ["Ready to move", "Under Construction", "New Launch"];
const BHK_OPTIONS = [1, 2, 3, 4];

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return isMobile;
}

// ─── Filter Panel ─────────────────────────────────────────────────────────────
function MultiCheck({ options, selected, onChange, labelMap }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
      {options.map(opt => {
        const checked = selected.includes(opt);
        const label = labelMap ? (labelMap[opt] || opt) : opt;
        return (
          <label key={opt} style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", padding: "6px 4px", borderRadius: "6px", fontSize: "13px", color: "#374151", background: checked ? "#EFF6FF" : "transparent" }}>
            <div onClick={() => onChange(checked ? selected.filter(x => x !== opt) : [...selected, opt])}
              style={{ width: "17px", height: "17px", borderRadius: "4px", border: checked ? "none" : "1.5px solid #D1D5DB", background: checked ? "#2563eb" : "white", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, cursor: "pointer" }}>
              {checked && <svg width="10" height="10" viewBox="0 0 10 10"><polyline points="1.5,5 4,7.5 8.5,2" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>}
            </div>
            {label}
          </label>
        );
      })}
    </div>
  );
}

function PillSelect({ options, selected, onChange }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
      {options.map(opt => {
        const active = selected.includes(opt);
        return (
          <button key={opt} onClick={() => onChange(active ? selected.filter(x => x !== opt) : [...selected, opt])}
            style={{ padding: "5px 14px", borderRadius: "999px", border: active ? "1.5px solid #2563eb" : "1.5px solid #E5E7EB", fontSize: "12.5px", cursor: "pointer", background: active ? "#EFF6FF" : "white", color: active ? "#2563eb" : "#374151", fontWeight: active ? 600 : 400, fontFamily: "inherit" }}>
            {opt} BHK
          </button>
        );
      })}
    </div>
  );
}

function Accordion({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ borderBottom: "1px solid #F3F4F6", paddingBottom: "4px" }}>
      <button onClick={() => setOpen(!open)} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", background: "none", border: "none", cursor: "pointer", padding: "13px 0 9px", color: "#111827", fontWeight: 600, fontSize: "13.5px", fontFamily: "inherit" }}>
        {title}
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: open ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }}>
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && <div style={{ paddingBottom: "14px" }}>{children}</div>}
    </div>
  );
}

function FilterPanel({ filters, onFiltersChange, onApply, onClear }) {
  const [local, setLocal] = useState(filters);
  const [locationInput, setLocationInput] = useState("");
  const [locations, setLocations] = useState([]);
  const [loadingLocation, setLoadingLocation] = useState(false);

  const getLocation = async (value) => {
    setLocationInput(value);

    if (value.length >= 2) {
      try {
        setLoadingLocation(true);

        const res = await searchCities(value);

        if (res.status === 200) {
          setLocations(res.data.data || []);
          console.log(res.data);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoadingLocation(false);
      }
    } else {
      setLocations([]);
    }
  };

  useEffect(() => { setLocal(filters); }, [filters]);

  const set = (key, val) => setLocal(f => ({ ...f, [key]: val }));

  const handleApply = () => { onFiltersChange(local); onApply?.(); };

  const handleClear = () => {
    const cleared = { cities: [], propertyType: [], bhk: [], furnishing: [], availStatus: [], minBudget: "", maxBudget: "" };
    setLocal(cleared);
    onFiltersChange(cleared);
    onClear?.();
  };



  const activeCount = [local.cities, local.propertyType, local.bhk, local.furnishing, local.availStatus].flat().length
    + (local.minBudget || local.maxBudget ? 1 : 0);

  return (
    <div className="modern-scrollbar" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px", flexShrink: 0 }}>
        <span style={{ fontWeight: 700, fontSize: "15px", color: "#111827" }}>
          Filters {activeCount > 0 && <span style={{ background: "#2563eb", color: "white", borderRadius: "999px", padding: "1px 8px", fontSize: "11px", marginLeft: "6px" }}>{activeCount}</span>}
        </span>
        <button onClick={handleClear} style={{ background: "none", border: "none", color: "#2563eb", fontSize: "12.5px", cursor: "pointer", fontWeight: 600, fontFamily: "inherit" }}>Clear all</button>
      </div>

      <div
        className="modern-scrollbar"
        style={{ overflowY: "auto", flex: 1 }}
      >
        <Accordion title="Location" defaultOpen>

          {/* Search Input */}
          <input
            type="text"
            value={locationInput}
            onChange={(e) => getLocation(e.target.value)}
            placeholder="Search location..."
            style={{
              width: "100%",
              height: "38px",
              border: "1px solid #D1D5DB",
              borderRadius: "10px",
              padding: "0 12px",
              fontSize: "13px",
              outline: "none",
              marginBottom: "10px",
            }}
          />

          {/* Loading */}
          {loadingLocation && (
            <div
              style={{
                fontSize: "12px",
                color: "#6B7280",
                marginBottom: "8px",
              }}
            >
              Searching...
            </div>
          )}

          {/* MultiCheck */}
          <MultiCheck
            options={locations
              .map((loc) => loc?.city || loc?.name)
              .filter(Boolean)}
            selected={local.cities}
            onChange={(v) => set("cities", v)}
          />

        </Accordion>

        <Accordion title="Budget" defaultOpen>

          {/* Inputs */}
          <div style={{ display: "flex", gap: "12px", marginBottom: "18px" }}>

            {/* Min */}
            <div style={{ flex: 1 }}>
              <p
                style={{
                  fontSize: "11px",
                  color: "#6B7280",
                  marginBottom: "6px",
                  fontWeight: 500,
                }}
              >
                Min Budget
              </p>

              <input
                type="number"
                value={local.minBudget}
                onChange={(e) =>
                  set(
                    "minBudget",
                    Number(e.target.value)
                  )
                }
                placeholder="₹ 0"
                style={{
                  width: "100%",
                  height: "42px",
                  border: "1px solid #D1D5DB",
                  borderRadius: "10px",
                  padding: "0 12px",
                  fontSize: "13px",
                  outline: "none",
                  fontWeight: 500,
                }}
              />
            </div>

            {/* Max */}
            <div style={{ flex: 1 }}>
              <p
                style={{
                  fontSize: "11px",
                  color: "#6B7280",
                  marginBottom: "6px",
                  fontWeight: 500,
                }}
              >
                Max Budget
              </p>

              <input
                type="number"
                value={local.maxBudget}
                onChange={(e) =>
                  set(
                    "maxBudget",
                    Number(e.target.value)
                  )
                }
                placeholder="₹ 10 Cr"
                style={{
                  width: "100%",
                  height: "42px",
                  border: "1px solid #D1D5DB",
                  borderRadius: "10px",
                  padding: "0 12px",
                  fontSize: "13px",
                  outline: "none",
                  fontWeight: 500,
                }}
              />
            </div>
          </div>

          {/* Dual Range Slider */}
          <div style={{ position: "relative", height: "42px" }}>

            {/* Track */}
            <div
              style={{
                position: "absolute",
                top: "16px",
                left: 0,
                right: 0,
                height: "4px",
                background: "#E5E7EB",
                borderRadius: "999px",
              }}
            />

            {/* Active Track */}
            <div
              style={{
                position: "absolute",
                top: "16px",
                left: `${((local.minBudget || 0) / 100000000) * 100
                  }%`,
                right: `${100 -
                  ((local.maxBudget || 100000000) /
                    100000000) *
                  100
                  }%`,
                height: "4px",
                background: "#2563EB",
                borderRadius: "999px",
              }}
            />

            {/* Min Slider */}
            <input
              type="range"
              min="0"
              max="100000000"
              step="50000"
              value={local.minBudget || 0}
              onChange={(e) =>
                set(
                  "minBudget",
                  Math.min(
                    Number(e.target.value),
                    (local.maxBudget || 100000000) -
                    50000
                  )
                )
              }
              style={{
                position: "absolute",
                width: "100%",
                pointerEvents: "none",
                appearance: "none",
                background: "transparent",
              }}
              className="budget-slider"
            />

            {/* Max Slider */}
            <input
              type="range"
              min="0"
              max="100000000"
              step="50000"
              value={local.maxBudget || 100000000}
              onChange={(e) =>
                set(
                  "maxBudget",
                  Math.max(
                    Number(e.target.value),
                    (local.minBudget || 0) + 50000
                  )
                )
              }
              style={{
                position: "absolute",
                width: "100%",
                pointerEvents: "none",
                appearance: "none",
                background: "transparent",
              }}
              className="budget-slider"
            />
          </div>

        </Accordion>

        <Accordion title="Property Type" defaultOpen>
          <MultiCheck options={PROP_TYPES} selected={local.propertyType} onChange={v => set("propertyType", v)} labelMap={PROPERTY_TYPE_LABELS} />
        </Accordion>

        <Accordion title="BHK">
          <PillSelect options={BHK_OPTIONS} selected={local.bhk} onChange={v => set("bhk", v)} />
        </Accordion>

        <Accordion title="Furnishing">
          <MultiCheck options={FURNISH_OPTIONS} selected={local.furnishing} onChange={v => set("furnishing", v)} />
        </Accordion>

        <Accordion title="Availability">
          <MultiCheck options={AVAIL_STATUS} selected={local.availStatus} onChange={v => set("availStatus", v)} />
        </Accordion>
      </div>

      <div style={{ paddingTop: "14px", flexShrink: 0 }}>
        <button onClick={handleApply} style={{ width: "100%", height: "46px", background: "linear-gradient(135deg,#1d4ed8,#2563eb)", color: "white", border: "none", borderRadius: "10px", fontWeight: 600, fontSize: "14px", cursor: "pointer", fontFamily: "inherit" }}>
          Apply Filters
        </button>
      </div>
    </div>
  );
}

// ─── Property Card ─────────────────────────────────────────────────────────────
function PropertyCard({ property, selected, onSelect }) {
  const [favorited, setFavorited] = useState(false);
  const [imgError, setImgError] = useState(false);
  const s = STATUS_COLORS[property.status] || STATUS_COLORS["FOR SALE"];
  const coverImg = property.images?.[0]?.src;

  return (
    <div onClick={onSelect} style={{ background: "#fff", borderRadius: "14px", overflow: "hidden", border: selected ? "2px solid #2563eb" : "1px solid #E5E7EB", cursor: "pointer", position: "relative", boxShadow: selected ? "0 8px 24px rgba(37,99,235,0.18)" : "0 1px 4px rgba(0,0,0,0.06)", transition: "all 0.22s" }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 12px 28px rgba(0,0,0,0.1)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = selected ? "0 8px 24px rgba(37,99,235,0.18)" : "0 1px 4px rgba(0,0,0,0.06)"; }}>

      {/* Image */}
      <div style={{ position: "relative", aspectRatio: "16/9", background: "linear-gradient(135deg,#1e3a5f,#2d6a9f)", overflow: "hidden" }}>
        {coverImg && !imgError
          ? <img src={coverImg} alt={property.title} onError={() => setImgError(true)} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "52px", opacity: 0.25 }}>{property.type === "commercial" ? "🏢" : "🏠"}</div>
        }

        {/* Status badge */}
        <div style={{ position: "absolute", top: "10px", left: "10px", background: s.bg, borderRadius: "6px", padding: "3px 9px" }}>
          <span style={{ fontSize: "10px", fontWeight: 700, color: s.text, letterSpacing: "0.06em" }}>{property.status}</span>
        </div>

        {/* Favorite */}
        <button onClick={e => { e.stopPropagation(); setFavorited(!favorited); }}
          style={{ position: "absolute", top: "8px", right: "8px", background: "rgba(0,0,0,0.35)", border: "none", borderRadius: "50%", width: "32px", height: "32px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill={favorited ? "#ef4444" : "none"} stroke={favorited ? "#ef4444" : "white"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>

        {/* Image count */}
        <div style={{ position: "absolute", bottom: "8px", left: "10px", background: "rgba(0,0,0,0.5)", borderRadius: "5px", padding: "2px 7px", display: "flex", alignItems: "center", gap: "4px" }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
          <span style={{ fontSize: "10px", color: "white", fontWeight: 500 }}>{property.images.length}</span>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "13px 14px 14px" }}>
        <h3 style={{ margin: "0 0 3px", fontSize: "14.5px", fontWeight: 700, color: "#111827", lineHeight: 1.3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{property.title}</h3>
        <p style={{ margin: "0 0 2px", fontSize: "11.5px", color: "#6b7280" }}>{property.subtitle}</p>
        <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "#9ca3af", marginBottom: "10px" }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
          <span style={{ fontSize: "11.5px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{property.location}</span>
        </div>

        <div style={{ fontSize: "18px", fontWeight: 800, color: "#111827", marginBottom: "10px", letterSpacing: "-0.02em" }}>{property.priceFormatted}</div>

        {/* Specs */}
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "10px", paddingBottom: "10px", borderBottom: "1px solid #F3F4F6" }}>
          {property.buildarea && <Spec label={property.buildarea} />}
          {property.bedroom && <Spec icon="🛏" label={`${property.bedroom} Bed`} />}
          {property.bathroom && <Spec icon="🚿" label={`${property.bathroom} Bath`} />}
          {property.numSets && <Spec icon="💼" label={`${property.numSets} Seats`} />}
          {property.numCabin && <Spec icon="🚪" label={`${property.numCabin} Cabin`} />}
          {property.parking > 0 && <Spec icon="🚗" label={`${property.parking}P`} />}
          {property.furnishing && <Spec label={property.furnishing.replace("Un-furnished", "Unfurnished")} />}
        </div>

        {/* Tags */}
        {property.tags.length > 0 && (
          <div style={{ display: "flex", gap: "5px", flexWrap: "wrap", marginBottom: "11px" }}>
            {property.tags.slice(0, 3).map(tag => (
              <span key={tag} style={{ padding: "2px 8px", background: "#F3F4F6", borderRadius: "999px", fontSize: "10.5px", color: "#374151", fontWeight: 500, maxWidth: "120px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{tag}</span>
            ))}
          </div>
        )}

        {/* Agent */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "26px", height: "26px", borderRadius: "50%", background: "linear-gradient(135deg,#2563eb,#7c3aed)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "10px", fontWeight: 700, flexShrink: 0 }}>
            {(property.agentName || "A").charAt(0).toUpperCase()}
          </div>
          <span style={{ fontSize: "12px", color: "#4B5563", fontWeight: 500, flex: 1 }}>{property.agentName}</span>
          <span style={{ fontSize: "10px", color: "#9ca3af" }}>{property.updatedAt}</span>
        </div>
      </div>
    </div>
  );
}

function Spec({ icon, label }) {
  return (
    <span style={{ fontSize: "11.5px", color: "#4B5563", display: "flex", alignItems: "center", gap: "3px" }}>
      {icon && <span style={{ fontSize: "12px" }}>{icon}</span>}{label}
    </span>
  );
}

// ─── Bottom Sheet ─────────────────────────────────────────────────────────────
function BottomSheet({ open, onClose, children }) {
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [open]);
  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 998, opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none", transition: "opacity 0.3s" }} />
      <div style={{ position: "fixed", left: 0, right: 0, bottom: 0, zIndex: 999, background: "white", borderRadius: "20px 20px 0 0", padding: "0 20px 20px", maxHeight: "88vh", display: "flex", flexDirection: "column", transform: open ? "translateY(0)" : "translateY(100%)", transition: "transform 0.35s cubic-bezier(0.32,0.72,0,1)", boxShadow: "0 -8px 40px rgba(0,0,0,0.18)" }}>
        <div style={{ display: "flex", justifyContent: "center", padding: "12px 0 8px", flexShrink: 0 }}>
          <div style={{ width: "40px", height: "4px", borderRadius: "2px", background: "#E5E7EB" }} />
        </div>
        <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>{children}</div>
      </div>
    </>
  );
}

// ─── Pagination ───────────────────────────────────────────────────────────────
function Pagination({ current, total, onChange }) {
  if (total <= 1) return null;

  const pages = [];
  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i);
  } else {
    pages.push(1);
    if (current > 3) pages.push("...");
    for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) pages.push(i);
    if (current < total - 2) pages.push("...");
    pages.push(total);
  }

  const btn = (content, onClick, active = false, disabled = false) => (
    <button key={content + Math.random()} onClick={onClick} disabled={disabled}
      style={{ minWidth: "34px", height: "34px", borderRadius: "8px", border: active ? "none" : "1px solid #E5E7EB", background: active ? "#2563eb" : disabled ? "#f9fafb" : "white", color: active ? "white" : disabled ? "#d1d5db" : "#374151", cursor: disabled ? "default" : "pointer", fontWeight: active ? 700 : 400, fontSize: "13px", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 4px" }}>
      {content}
    </button>
  );

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
      {btn(
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>,
        () => onChange(current - 1), false, current === 1
      )}
      {pages.map((p, i) =>
        p === "..." ? <span key={`dot${i}`} style={{ width: "34px", textAlign: "center", color: "#9ca3af", fontSize: "13px" }}>…</span>
          : btn(p, () => onChange(p), p === current)
      )}
      {btn(
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>,
        () => onChange(current + 1), false, current === total
      )}
    </div>
  );
}

// ─── Listing Type Tabs ─────────────────────────────────────────────────────────
const TABS = [
  { key: "all", img: AllLabel, label: "All", sub: "Properties", color: "#FD8B0F", activeBorder: "#FD8B0F", activeBg: "#fef6ea40" },
  { key: "buy", img: BuyLabel, label: "Buy", sub: "For Sale", color: "#08692A", activeBorder: "#22c55e", activeBg: "#F4FAF6" },
  { key: "rent", img: RenLabel, label: "Rent", sub: "For Rent", color: "#2153FC", activeBorder: "#2153FC", activeBg: "#e1ebfe4a" },
  { key: "lease", img: LeaseLabel, label: "Lease", sub: "For Lease", color: "#4737D9", activeBorder: "#4737D9", activeBg: "#f1edfe42" },
];

// ─── Main Page ─────────────────────────────────────────────────────────────────
const PAGE_SIZE = 6;

const EMPTY_FILTERS = { cities: [], propertyType: [], bhk: [], furnishing: [], availStatus: [], minBudget: "", maxBudget: "" };

export default function PropertyListingPage({
  initialListingType = "all",
  initialCity = "",
  initialAvailability = "",
}) {
  const isMobile = useIsMobile();

  const [listingType, setListingType] =
    useState(initialListingType);
  const [sortBy, setSortBy] = useState("relevance");
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState(null);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    ...EMPTY_FILTERS,
    cities: initialCity ? [initialCity] : [],
    availStatus: initialAvailability
      ? [initialAvailability]
      : [],
  });

  // Server data
  const [allProperties, setAllProperties] = useState([]);  // raw from API
  const [loading, setLoading] = useState(false);
  const [serverTotal, setServerTotal] = useState(0);
  const [serverTotalPages, setServerTotalPages] = useState(1);

  // ── Fetch on listingType or page change ────────────────────────────────────
  useEffect(() => {
    const purposeMap = { all: "all", buy: "sell", rent: "rent", lease: "lease" };
    const purpose = purposeMap[listingType] || "all";

    setLoading(true);
    fetchPropertiesAPI(page, purpose)
      .then(res => {
        setAllProperties(res.data.map(formatProperty));
        setServerTotal(res.total);
        setServerTotalPages(res.totalPages);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [listingType, page]);

  // Reset page when listing type changes
  const handleListingTypeChange = (t) => {
    setListingType(t);
    setPage(1);
  };

  // ── Client-side filter + sort (applied on top of server results) ───────────
  // ── Client-side filter + sort (applied on top of server results) ───────────
  const filtered = allProperties.filter((p) => {

    // Location
    if (
      filters.cities.length &&
      !filters.cities.some((c) => {
        if (!c || !p.location) return false;

        return p.location
          .toLowerCase()
          .includes(String(c).toLowerCase());
      })
    ) {
      return false;
    }

    // Property Type
    if (
      filters.propertyType.length &&
      !filters.propertyType.includes(p.propertyType)
    ) {
      return false;
    }

    // BHK
    if (
      filters.bhk.length &&
      p.bedroom &&
      !filters.bhk.includes(p.bedroom)
    ) {
      return false;
    }

    // Furnishing
    if (
      filters.furnishing.length &&
      !filters.furnishing.includes(p.furnishing)
    ) {
      return false;
    }

    // Availability
    if (
      filters.availStatus.length &&
      !filters.availStatus.includes(p.availabestatus)
    ) {
      return false;
    }

    // Budget
    const min = Number(filters.minBudget || 0);

    const max = Number(filters.maxBudget || 0);

    if (min && p.price < min) return false;
    if (max && p.price > max) return false;

    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "price_asc") return a.price - b.price;
    if (sortBy === "price_desc") return b.price - a.price;
    if (sortBy === "newest") return new Date(b.updatedAt) - new Date(a.updatedAt);
    return 0;
  });

  const activeFilterCount = [filters.cities, filters.propertyType, filters.bhk, filters.furnishing, filters.availStatus].flat().length
    + (filters.minBudget || filters.maxBudget ? 1 : 0);

  return (
    <div style={{ fontFamily: "'', -apple-system, BlinkMacSystemFont", background: "#F9FAFB", minHeight: "100vh" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: isMobile ? "16px 14px" : "24px 20px", display: "flex", gap: "24px", alignItems: "flex-start" }}>

        {/* Desktop Sidebar */}
        {!isMobile && (
          <aside style={{ width: "260px", flexShrink: 0, background: "#fff", border: "1px solid #E5E7EB", borderRadius: "14px", padding: "18px", position: "sticky", top: "24px", maxHeight: "calc(90vh - 48px)", display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <FilterPanel filters={filters} onFiltersChange={setFilters} onApply={() => { }} onClear={() => { }} />
          </aside>
        )}

        {/* Main */}
        <main style={{ flex: 1, minWidth: 0 }}>
          {/* Top bar */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "10px", marginBottom: "16px" }}>
            <div>
              <h1 style={{ fontSize: isMobile ? "20px" : "24px", fontWeight: 800, color: "#111827", letterSpacing: "-0.02em", lineHeight: 1.2, margin: 0 }}>All India Properties</h1>
              <p style={{ color: "#6B7280", fontSize: "13px", marginTop: "4px" }}>
                <strong style={{ color: "#111827" }}>{loading ? "…" : sorted.length}</strong> properties shown
                {serverTotal > 0 && !loading && <span> · <strong style={{ color: "#111827" }}>{serverTotal}</strong> total</span>}
              </p>
            </div>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              {isMobile && (
                <button onClick={() => setMobileFilterOpen(true)} style={{ height: "38px", padding: "0 14px", border: "1.5px solid #E5E7EB", borderRadius: "10px", background: "white", display: "flex", gap: "6px", alignItems: "center", cursor: "pointer", fontSize: "13px", fontFamily: "inherit", color: "#374151", position: "relative" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></svg>
                  Filters
                  {activeFilterCount > 0 && <span style={{ position: "absolute", top: "-6px", right: "-6px", background: "#2563eb", color: "white", borderRadius: "50%", width: "18px", height: "18px", fontSize: "10px", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>{activeFilterCount}</span>}
                </button>
              )}
              <select value={sortBy} onChange={e => setSortBy(e.target.value)}
                style={{ height: "38px", border: "1px solid #D1D5DB", borderRadius: "8px", padding: "0 10px", fontSize: "13px", fontFamily: "inherit", color: "#374151", outline: "none", background: "white", cursor: "pointer" }}>
                <option value="relevance">Sort: Relevance</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="newest">Newest First</option>
              </select>
            </div>
          </div>

          {/* Listing Type Tabs */}
          <div
            className="modern-scrollbar"
            style={{
              display: "flex",
              gap: "8px",
              marginBottom: "20px",
              overflowX: "auto",
              paddingBottom: "4px",
            }}
          >
            {TABS.map((tab) => {
              const active = listingType === tab.key;

              return (
                <button
                  key={tab.key}
                  onClick={() => handleListingTypeChange(tab.key)}
                  style={{
                    flexShrink: 0,
                    width: isMobile ? "auto" : "216px",
                    height: "70px",
                    borderRadius: "10px",
                    border: `2px solid ${active ? tab.activeBorder : "#E5E7EB"
                      }`,
                    background: active ? tab.activeBg : "white",
                    cursor: "pointer",
                    padding: "0 18px",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    transition: "all 0.18s",
                  }}
                >
                  {/* Icon */}
                  <span
                    style={{
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src={tab.img}
                      alt={tab.label}
                      style={{ width: "34px", height: "34px" }}
                    />
                  </span>

                  {/* Text */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      lineHeight: 1.2,
                      textAlign: "left",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "14px",
                        fontWeight: 600,
                        color: active ? tab.activeText : "#111827",
                      }}
                    >
                      {tab.label}
                    </span>

                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: 600,
                        color: "#6B7280",
                      }}
                    >
                      {tab.sub}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Loading */}
          {loading && (
            <div style={{ textAlign: "center", padding: "60px 20px", color: "#6b7280" }}>
              <div style={{ width: "32px", height: "32px", border: "3px solid #e5e7eb", borderTopColor: "#2563eb", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 12px" }} />
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
              <p style={{ fontSize: "14px", margin: 0 }}>Loading properties…</p>
            </div>
          )}

          {/* Empty state */}
          {!loading && sorted.length === 0 && (
            <div style={{ textAlign: "center", padding: "60px 20px", color: "#9CA3AF" }}>
              <div style={{ fontSize: "48px", marginBottom: "12px" }}>🏘️</div>
              <p style={{ fontSize: "16px", fontWeight: 600, color: "#374151" }}>No properties found</p>
              <p style={{ fontSize: "13px", marginTop: "4px" }}>Try adjusting your filters or switching tabs</p>
              {activeFilterCount > 0 && (
                <button onClick={() => setFilters(EMPTY_FILTERS)} style={{ marginTop: "12px", padding: "8px 20px", background: "#2563eb", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontFamily: "inherit", fontSize: "13px", fontWeight: 600 }}>
                  Clear Filters
                </button>
              )}
            </div>
          )}

          {/* Grid */}
          {!loading && sorted.length > 0 && (
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px", marginBottom: "28px" }}>
              {sorted.map(p => (
                <PropertyCard key={p.id} property={p} selected={selectedId === p.id} onSelect={() => setSelectedId(p.id === selectedId ? null : p.id)} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {!loading && serverTotalPages > 1 && (
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px", paddingTop: "16px", borderTop: "1px solid #F3F4F6" }}>
              <span style={{ fontSize: "12.5px", color: "#6B7280" }}>
                Page <strong>{page}</strong> of <strong>{serverTotalPages}</strong> · <strong>{serverTotal}</strong> total
              </span>
              <Pagination current={page} total={serverTotalPages} onChange={p => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); }} />
            </div>
          )}
        </main>
      </div>

      {/* Mobile Bottom Sheet */}
      {isMobile && (
        <BottomSheet open={mobileFilterOpen} onClose={() => setMobileFilterOpen(false)}>
          <FilterPanel filters={filters} onFiltersChange={setFilters} onApply={() => setMobileFilterOpen(false)} onClear={() => setMobileFilterOpen(false)} />
        </BottomSheet>
      )}
    </div>
  );
}