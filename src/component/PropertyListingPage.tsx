import { useState, useCallback } from "react";

// ── Types ────────────────────────────────────────────────────────────────────

interface Property {
  id: number;
  title: string;
  location: string;
  price: string;
  priceNote?: string;
  status: "FOR SALE" | "FOR RENT" | "FOR LEASE";
  type: "residential" | "commercial";
  area: string;
  bhk?: number;
  baths?: number;
  parking: number;
  workstations?: number;
  cabins?: number;
  tags: string[];
  agentName: string;
  agentVerified: boolean;
  negotiable?: boolean;
  images: number;
  gradient: string;
}

interface Filters {
  listingType: "buy" | "rent" | "lease";
  locations: string[];
  propertyType: string[];
  bhk: string[];
  furnishing: string[];
  status: string[];
  minBudget: string;
  maxBudget: string;
  minArea: string;
  maxArea: string;
  page: number;
  limit: number;
}

// ── Mock Data ────────────────────────────────────────────────────────────────

const PROPERTIES: Property[] = [
  {
    id: 1, title: "3 BHK Premium Apartment", location: "Sector 62, Noida",
    price: "₹ 85,00,000", status: "FOR SALE", type: "residential",
    area: "1,450 sq.ft", bhk: 3, baths: 2, parking: 1,
    tags: ["Semi-Furnished", "Ready to Move", "East Facing"],
    agentName: "Rahul Sharma", agentVerified: true, negotiable: true, images: 14,
    gradient: "linear-gradient(135deg,#1a3a5c 0%,#2d6a9f 100%)",
  },
  {
    id: 2, title: "Modern Office Space", location: "Sector 132, Noida",
    price: "₹ 1,20,000/month", status: "FOR RENT", type: "commercial",
    area: "3,200 sq.ft", workstations: 40, cabins: 5, parking: 8,
    tags: ["Fully Furnished", "24×7 Power", "Fibre Internet"],
    agentName: "Priya Mehta", agentVerified: true, images: 9,
    gradient: "linear-gradient(135deg,#1a4a3a 0%,#2e7d5e 100%)",
  },
  {
    id: 3, title: "4 BHK Luxury Villa", location: "Sector 150, Noida",
    price: "₹ 2,40,00,000", status: "FOR SALE", type: "residential",
    area: "3,800 sq.ft", bhk: 4, baths: 4, parking: 2,
    tags: ["Private Pool", "Garden", "Smart Home"],
    agentName: "Amit Verma", agentVerified: true, negotiable: true, images: 22,
    gradient: "linear-gradient(135deg,#3a1a2c 0%,#7c3d5e 100%)",
  },
  {
    id: 4, title: "2 BHK Apartment", location: "Greater Noida West",
    price: "₹ 52,00,000", status: "FOR SALE", type: "residential",
    area: "980 sq.ft", bhk: 2, baths: 2, parking: 1,
    tags: ["Under Construction", "Metro Nearby"],
    agentName: "Sneha Gupta", agentVerified: false, images: 6,
    gradient: "linear-gradient(135deg,#1a2a4a 0%,#3b5ea6 100%)",
  },
  {
    id: 5, title: "Commercial Shop", location: "Sector 18, Noida",
    price: "₹ 45,000/month", status: "FOR LEASE", type: "commercial",
    area: "650 sq.ft", workstations: 8, cabins: 1, parking: 2,
    tags: ["Ground Floor", "High Footfall", "Corner Unit"],
    agentName: "Vikram Singh", agentVerified: true, images: 7,
    gradient: "linear-gradient(135deg,#2a1a4a 0%,#6b3da6 100%)",
  },
  {
    id: 6, title: "1 BHK Studio Apartment", location: "Sector 76, Noida",
    price: "₹ 18,000/month", status: "FOR RENT", type: "residential",
    area: "520 sq.ft", bhk: 1, baths: 1, parking: 0,
    tags: ["Fully Furnished", "Pet Friendly", "Gym Access"],
    agentName: "Ananya Roy", agentVerified: true, images: 11,
    gradient: "linear-gradient(135deg,#1a3a2a 0%,#2d8a6a 100%)",
  },
  {
    id: 7, title: "3 BHK Builder Floor", location: "Sector 44, Noida",
    price: "₹ 68,00,000", status: "FOR SALE", type: "residential",
    area: "1,650 sq.ft", bhk: 3, baths: 3, parking: 1,
    tags: ["Independent Floor", "Terrace", "Vastu Compliant"],
    agentName: "Deepak Arora", agentVerified: true, negotiable: true, images: 18,
    gradient: "linear-gradient(135deg,#3a2a1a 0%,#8a6030 100%)",
  },
  {
    id: 8, title: "IT Office Floor", location: "Sector 125, Noida",
    price: "₹ 3,50,000/month", status: "FOR RENT", type: "commercial",
    area: "8,500 sq.ft", workstations: 120, cabins: 12, parking: 20,
    tags: ["LEED Certified", "Cafeteria", "Conference Rooms"],
    agentName: "Neha Jain", agentVerified: true, images: 15,
    gradient: "linear-gradient(135deg,#0d2a3a 0%,#1a6080 100%)",
  },
];

const STATUS_COLORS: Record<string, { bg: string; text: string; dot: string }> = {
  "FOR SALE":  { bg: "rgba(34,197,94,0.15)",  text: "#15803d", dot: "#22c55e" },
  "FOR RENT":  { bg: "rgba(59,130,246,0.15)", text: "#1d4ed8", dot: "#3b82f6" },
  "FOR LEASE": { bg: "rgba(139,92,246,0.15)", text: "#6d28d9", dot: "#8b5cf6" },
};

// ── SVG Icons ────────────────────────────────────────────────────────────────

const Icon = {
  MapPin: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
    </svg>
  ),
  Bed: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/>
    </svg>
  ),
  Bath: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"/><line x1="10" x2="8" y1="5" y2="7"/><line x1="2" x2="22" y1="12" y2="12"/>
    </svg>
  ),
  Car: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 17H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h11l3 4v6z"/><circle cx="7.5" cy="17.5" r="1.5"/><circle cx="16.5" cy="17.5" r="1.5"/>
    </svg>
  ),
  Square: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2"/>
    </svg>
  ),
  Desk: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 20h20"/><path d="M5 20V8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v12"/><path d="M12 12h.01"/>
    </svg>
  ),
  Heart: ({ filled }: { filled?: boolean }) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? "#ef4444" : "none"} stroke={filled ? "#ef4444" : "white"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  ),
  BadgeCheck: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="#1E88E5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m9 12 2 2 4-4"/>
    </svg>
  ),
  Image: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
    </svg>
  ),
  Phone: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.5 12.14a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.41 1.5h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9.14a16 16 0 0 0 6 6l1.06-1.06a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  ),
  WA: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
    </svg>
  ),
  Visit: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1E88E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  ),
  ChevronDown: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  ),
  Search: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  ),
  Filter: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
    </svg>
  ),
  X: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
  ChevronLeft: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6"/>
    </svg>
  ),
  ChevronRight: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  ),
};

// ── Subcomponents ────────────────────────────────────────────────────────────

function Breadcrumb() {
  return (
    <nav style={{ padding: "14px 28px", background: "#fff", borderBottom: "1px solid #E5E7EB", display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#9CA3AF" }}>
      <span style={{ cursor: "pointer", color: "#1E88E5" }}>Home</span>
      <span>/</span>
      <span style={{ cursor: "pointer", color: "#1E88E5" }}>Properties</span>
      <span>/</span>
      <span style={{ color: "#111827", fontWeight: 500 }}>All India Projects</span>
    </nav>
  );
}

function AccordionSection({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ borderBottom: "1px solid #F3F4F6", paddingBottom: "16px", marginBottom: "4px" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", background: "none", border: "none", cursor: "pointer", padding: "12px 0 8px", color: "#111827", fontWeight: 600, fontSize: "14px", fontFamily: "inherit" }}
      >
        {title}
        <span style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s", color: "#6B7280" }}>
          <Icon.ChevronDown />
        </span>
      </button>
      {open && <div style={{ paddingTop: "8px" }}>{children}</div>}
    </div>
  );
}

function CheckItem({ label }: { label: string }) {
  const [checked, setChecked] = useState(false);
  return (
    <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", padding: "5px 0", fontSize: "13.5px", color: "#374151" }}>
      <input
        type="checkbox" checked={checked} onChange={() => setChecked(!checked)}
        style={{ width: "16px", height: "16px", borderRadius: "4px", accentColor: "#1E88E5", cursor: "pointer" }}
      />
      {label}
    </label>
  );
}

function FilterSidebar({ onClose, mobile }: { onClose?: () => void; mobile?: boolean }) {
  const sidebarStyle: React.CSSProperties = mobile
    ? { position: "fixed", left: 0, top: 0, width: "85%", maxWidth: "360px", height: "100%", background: "white", zIndex: 999, overflowY: "auto", padding: "20px", boxShadow: "4px 0 24px rgba(0,0,0,0.12)" }
    : { width: "280px", flexShrink: 0, background: "#fff", border: "1px solid #E5E7EB", borderRadius: "14px", padding: "20px", alignSelf: "flex-start", position: "sticky", top: "20px" };

  return (
    <aside style={sidebarStyle}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
        <span style={{ fontWeight: 700, fontSize: "16px", color: "#111827" }}>Filters</span>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <button style={{ background: "none", border: "none", color: "#1E88E5", fontSize: "12.5px", cursor: "pointer", fontWeight: 600, fontFamily: "inherit" }}>Clear all</button>
          {mobile && (
            <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#6B7280" }}><Icon.X /></button>
          )}
        </div>
      </div>

      <AccordionSection title="Location" defaultOpen>
        <div style={{ position: "relative", marginBottom: "10px" }}>
          <span style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)" }}><Icon.Search /></span>
          <input placeholder="Search city, locality…" style={{ width: "100%", height: "40px", border: "1px solid #D1D5DB", borderRadius: "8px", paddingLeft: "34px", paddingRight: "12px", fontSize: "13px", fontFamily: "inherit", outline: "none", boxSizing: "border-box" }} />
        </div>
        {["Noida", "Greater Noida", "Ghaziabad", "Delhi", "Gurugram"].map(l => <CheckItem key={l} label={l} />)}
      </AccordionSection>

      <AccordionSection title="Budget" defaultOpen>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "12px" }}>
          <input placeholder="Min (₹)" style={{ height: "38px", border: "1px solid #D1D5DB", borderRadius: "8px", padding: "0 10px", fontSize: "13px", fontFamily: "inherit", outline: "none" }} />
          <input placeholder="Max (₹)" style={{ height: "38px", border: "1px solid #D1D5DB", borderRadius: "8px", padding: "0 10px", fontSize: "13px", fontFamily: "inherit", outline: "none" }} />
        </div>
        <div style={{ position: "relative", height: "6px", background: "#E5E7EB", borderRadius: "999px", margin: "10px 0 16px" }}>
          <div style={{ position: "absolute", left: "10%", right: "25%", top: 0, bottom: 0, background: "#1E88E5", borderRadius: "999px" }} />
          <div style={{ position: "absolute", left: "calc(10% - 10px)", top: "-7px", width: "20px", height: "20px", borderRadius: "50%", background: "#fff", border: "2px solid #1E88E5", cursor: "pointer", boxShadow: "0 1px 4px rgba(0,0,0,0.15)" }} />
          <div style={{ position: "absolute", left: "calc(75% - 10px)", top: "-7px", width: "20px", height: "20px", borderRadius: "50%", background: "#fff", border: "2px solid #1E88E5", cursor: "pointer", boxShadow: "0 1px 4px rgba(0,0,0,0.15)" }} />
        </div>
      </AccordionSection>

      <AccordionSection title="Property Type" defaultOpen>
        {["Apartment", "Villa", "Builder Floor", "Plot", "Office Space", "Shop"].map(t => <CheckItem key={t} label={t} />)}
      </AccordionSection>

      <AccordionSection title="BHK">
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {["1 BHK", "2 BHK", "3 BHK", "4 BHK", "4+ BHK"].map(b => (
            <button key={b} style={{ padding: "5px 12px", borderRadius: "999px", border: "1px solid #E5E7EB", fontSize: "12.5px", cursor: "pointer", background: "white", color: "#374151", fontFamily: "inherit" }}>{b}</button>
          ))}
        </div>
      </AccordionSection>

      <AccordionSection title="Furnishing">
        {["Fully Furnished", "Semi-Furnished", "Unfurnished"].map(f => <CheckItem key={f} label={f} />)}
      </AccordionSection>

      <AccordionSection title="Property Status">
        {["Ready to Move", "Under Construction", "New Launch"].map(s => <CheckItem key={s} label={s} />)}
      </AccordionSection>

      <button style={{ width: "100%", height: "48px", background: "linear-gradient(135deg,#1565C0,#1E88E5)", color: "white", border: "none", borderRadius: "10px", fontWeight: 600, fontSize: "14.5px", cursor: "pointer", marginTop: "8px", fontFamily: "inherit", letterSpacing: "0.02em" }}>
        Apply Filters
      </button>
    </aside>
  );
}

function PropertyCard({ property, selected, onSelect }: { property: Property; selected: boolean; onSelect: () => void }) {
  const [favorited, setFavorited] = useState(false);
  const s = STATUS_COLORS[property.status];

  return (
    <div
      onClick={onSelect}
      style={{
        background: "#fff", borderRadius: "14px", overflow: "hidden",
        border: selected ? "2px solid #1E88E5" : "1px solid #E5E7EB",
        transition: "all 0.25s", cursor: "pointer", position: "relative",
        boxShadow: selected ? "0 8px 24px rgba(30,136,229,0.18)" : "0 1px 4px rgba(0,0,0,0.04)",
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 12px 28px rgba(0,0,0,0.1)"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLDivElement).style.boxShadow = selected ? "0 8px 24px rgba(30,136,229,0.18)" : "0 1px 4px rgba(0,0,0,0.04)"; }}
    >
      {/* Image */}
      <div style={{ position: "relative", aspectRatio: "16/10", background: property.gradient, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ color: "rgba(255,255,255,0.12)", fontSize: "64px", fontWeight: 700, userSelect: "none" }}>
          {property.type === "commercial" ? "🏢" : "🏠"}
        </div>
        {/* Status badge */}
        <div style={{ position: "absolute", top: "12px", left: "12px", background: s.bg, backdropFilter: "blur(8px)", border: `1px solid ${s.dot}`, borderRadius: "6px", padding: "3px 9px", display: "flex", alignItems: "center", gap: "5px" }}>
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: s.dot, display: "inline-block" }} />
          <span style={{ fontSize: "11px", fontWeight: 700, color: s.text, letterSpacing: "0.05em" }}>{property.status}</span>
        </div>
        {/* Favorite */}
        <button
          onClick={e => { e.stopPropagation(); setFavorited(!favorited); }}
          style={{ position: "absolute", top: "10px", right: "10px", background: "rgba(0,0,0,0.35)", backdropFilter: "blur(4px)", border: "none", borderRadius: "50%", width: "32px", height: "32px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <Icon.Heart filled={favorited} />
        </button>
        {/* Image count */}
        <div style={{ position: "absolute", bottom: "10px", left: "12px", background: "rgba(0,0,0,0.45)", borderRadius: "6px", padding: "3px 8px", display: "flex", alignItems: "center", gap: "4px" }}>
          <Icon.Image />
          <span style={{ fontSize: "11px", color: "white", fontWeight: 500 }}>{property.images}</span>
        </div>
        {property.negotiable && (
          <div style={{ position: "absolute", bottom: "10px", right: "12px", background: "#DCFCE7", borderRadius: "6px", padding: "3px 8px" }}>
            <span style={{ fontSize: "10.5px", color: "#15803d", fontWeight: 600 }}>Negotiable</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div style={{ padding: "14px 16px 16px" }}>
        <h3 style={{ margin: "0 0 4px", fontSize: "16px", fontWeight: 700, color: "#111827", lineHeight: 1.3 }}>{property.title}</h3>
        <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "#6B7280", marginBottom: "12px" }}>
          <Icon.MapPin />
          <span style={{ fontSize: "12.5px" }}>{property.location}</span>
        </div>

        <div style={{ fontSize: "20px", fontWeight: 800, color: "#111827", marginBottom: "12px", letterSpacing: "-0.02em" }}>
          {property.price}
        </div>

        {/* Specs */}
        <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", marginBottom: "12px", paddingBottom: "12px", borderBottom: "1px solid #F3F4F6" }}>
          <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12.5px", color: "#4B5563" }}>
            <Icon.Square />{property.area}
          </span>
          {property.type === "residential" ? (
            <>
              {property.bhk && <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12.5px", color: "#4B5563" }}><Icon.Bed />{property.bhk} Beds</span>}
              {property.baths && <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12.5px", color: "#4B5563" }}><Icon.Bath />{property.baths} Baths</span>}
            </>
          ) : (
            <>
              {property.workstations && <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12.5px", color: "#4B5563" }}><Icon.Desk />{property.workstations} Seats</span>}
              {property.cabins && <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12.5px", color: "#4B5563" }}><Icon.Desk />{property.cabins} Cabins</span>}
            </>
          )}
          <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12.5px", color: "#4B5563" }}><Icon.Car />{property.parking}P</span>
        </div>

        {/* Tags */}
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "14px" }}>
          {property.tags.slice(0, 3).map(tag => (
            <span key={tag} style={{ padding: "3px 9px", background: "#F3F4F6", borderRadius: "999px", fontSize: "11px", color: "#374151", fontWeight: 500 }}>{tag}</span>
          ))}
        </div>

        {/* Agent */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "linear-gradient(135deg,#1E88E5,#7C4DFF)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "11px", fontWeight: 700, flexShrink: 0 }}>
            {property.agentName.charAt(0)}
          </div>
          <span style={{ fontSize: "12.5px", color: "#4B5563", fontWeight: 500, flex: 1 }}>{property.agentName}</span>
          {property.agentVerified && <Icon.BadgeCheck />}
        </div>
      </div>
    </div>
  );
}

function Pagination({ current, total, onChange }: { current: number; total: number; onChange: (p: number) => void }) {
  const pages = [1, 2, 3, "...", total];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
      <button onClick={() => onChange(Math.max(1, current - 1))} style={{ width: "36px", height: "36px", borderRadius: "8px", border: "1px solid #E5E7EB", background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon.ChevronLeft />
      </button>
      {pages.map((p, i) => (
        <button key={i} onClick={() => typeof p === "number" && onChange(p)}
          style={{ width: "36px", height: "36px", borderRadius: "8px", border: p === current ? "none" : "1px solid #E5E7EB", background: p === current ? "#1E88E5" : "white", color: p === current ? "white" : "#374151", cursor: typeof p === "number" ? "pointer" : "default", fontWeight: p === current ? 700 : 400, fontSize: "13.5px", fontFamily: "inherit" }}>
          {p}
        </button>
      ))}
      <button onClick={() => onChange(Math.min(total, current + 1))} style={{ width: "36px", height: "36px", borderRadius: "8px", border: "1px solid #E5E7EB", background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon.ChevronRight />
      </button>
    </div>
  );
}

function FloatingCTA() {
  return (
    <div style={{ position: "fixed", right: "20px", bottom: "100px", display: "flex", flexDirection: "column", gap: "12px", zIndex: 100 }}>
      {[
        { label: "Call", bg: "#1E88E5", icon: <Icon.Phone />, title: "Call Now" },
        { label: "WA", bg: "#25D366", icon: <Icon.WA />, title: "WhatsApp" },
        { label: "Visit", bg: "#fff", icon: <Icon.Visit />, title: "Site Visit" },
      ].map(btn => (
        <button key={btn.label} title={btn.title} style={{ width: "54px", height: "54px", borderRadius: "14px", background: btn.bg, border: btn.bg === "#fff" ? "1px solid #E5E7EB" : "none", boxShadow: "0 8px 24px rgba(0,0,0,0.15)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "transform 0.15s" }}
          onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.08)")}
          onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
        >
          {btn.icon}
        </button>
      ))}
    </div>
  );
}

// ── Main Page ────────────────────────────────────────────────────────────────

export default function PropertyListingPage() {
  const [filters, setFilters] = useState<Filters>({ listingType: "buy", locations: [], propertyType: [], bhk: [], furnishing: [], status: [], minBudget: "", maxBudget: "", minArea: "", maxArea: "", page: 1, limit: 12 });
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const activeTab = filters.listingType;
  const setTab = useCallback((t: "buy" | "rent" | "lease") => setFilters(f => ({ ...f, listingType: t })), []);

  const tabStyle = (tab: string): React.CSSProperties => ({
    padding: "8px 22px", borderRadius: "10px", border: "1px solid", fontWeight: 600, fontSize: "14px", cursor: "pointer", transition: "all 0.18s", fontFamily: "inherit",
    ...(activeTab === tab
      ? { background: "#ECFDF5", borderColor: "#22C55E", color: "#15803d" }
      : { background: "white", borderColor: "#E5E7EB", color: "#6B7280" }),
  });

  return (
    <>
      {/* Google Fonts */}
      {/* <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=DM+Serif+Display&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'DM Sans', sans-serif; background: #F9FAFB; color: #111827; }
        ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: #f1f1f1; } ::-webkit-scrollbar-thumb { background: #D1D5DB; border-radius: 3px; }
        @media (max-width: 768px) { .hide-mobile { display: none !important; } .show-mobile { display: flex !important; } }
        @media (min-width: 769px) { .show-mobile { display: none !important; } }
      `}</style> */}

      {/* Top Nav */}
      {/* <header style={{ background: "#fff", borderBottom: "1px solid #E5E7EB", padding: "0 28px", display: "flex", alignItems: "center", height: "64px", gap: "20px", position: "sticky", top: 0, zIndex: 50, boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginRight: "20px" }}>
          <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "linear-gradient(135deg,#1565C0,#1E88E5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "white", fontSize: "16px", fontWeight: 800 }}>P</span>
          </div>
          <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: "20px", color: "#111827", letterSpacing: "-0.02em" }}>PropFinder</span>
        </div>
        <div style={{ flex: 1, maxWidth: "480px", position: "relative" }}>
          <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }}><Icon.Search /></span>
          <input placeholder="Search by location, project, builder…" style={{ width: "100%", height: "40px", border: "1px solid #E5E7EB", borderRadius: "10px", paddingLeft: "36px", paddingRight: "12px", fontSize: "13.5px", fontFamily: "inherit", outline: "none", background: "#F9FAFB" }} />
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: "10px" }}>
          <button style={{ height: "38px", padding: "0 18px", borderRadius: "8px", border: "1px solid #E5E7EB", background: "white", fontSize: "13.5px", cursor: "pointer", fontFamily: "inherit", color: "#374151", fontWeight: 500 }}>Sign In</button>
          <button style={{ height: "38px", padding: "0 18px", borderRadius: "8px", border: "none", background: "linear-gradient(135deg,#1565C0,#1E88E5)", color: "white", fontSize: "13.5px", cursor: "pointer", fontFamily: "inherit", fontWeight: 600 }}>Post Property</button>
        </div>
      </header> */}

      {/* <Breadcrumb /> */}

      {/* Body */}
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "24px 20px", display: "flex", gap: "24px", alignItems: "flex-start" }}>

        {/* Sidebar — desktop */}
        <div className="hide-mobile">
          <FilterSidebar />
        </div>

        {/* Main Content */}
        <main style={{ flex: 1, minWidth: 0 }}>
          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px", marginBottom: "20px" }}>
            <div>
              <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "26px", color: "#111827", letterSpacing: "-0.02em", lineHeight: 1.2 }}>All India Projects</h1>
              <p style={{ color: "#6B7280", fontSize: "13.5px", marginTop: "4px" }}>
                <span style={{ fontWeight: 700, color: "#111827" }}>2,408</span> Properties found in Noida
              </p>
            </div>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              {/* Mobile filter btn */}
              <button className="show-mobile" onClick={() => setMobileFilterOpen(true)} style={{ display: "none", height: "40px", padding: "0 16px", border: "1px solid #E5E7EB", borderRadius: "10px", background: "white", gap: "8px", alignItems: "center", cursor: "pointer", fontSize: "13.5px", fontFamily: "inherit", color: "#374151" }}>
                <Icon.Filter />Filters
              </button>
              <select style={{ height: "38px", border: "1px solid #D1D5DB", borderRadius: "8px", padding: "0 12px", fontSize: "13.5px", fontFamily: "inherit", color: "#374151", outline: "none", background: "white" }}>
                <option>Sort: Relevance</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest First</option>
              </select>
              <select style={{ height: "38px", border: "1px solid #D1D5DB", borderRadius: "8px", padding: "0 10px", fontSize: "13.5px", fontFamily: "inherit", color: "#374151", outline: "none", background: "white" }}>
                <option>12 / page</option>
                <option>24 / page</option>
                <option>48 / page</option>
              </select>
            </div>
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", gap: "10px", marginBottom: "22px", overflowX: "auto", paddingBottom: "2px" }}>
            <button style={tabStyle("buy")} onClick={() => setTab("buy")}>🏷️ Buy</button>
            <button style={tabStyle("rent")} onClick={() => setTab("rent")}>🔑 Rent</button>
            <button style={tabStyle("lease")} onClick={() => setTab("lease")}>📋 Lease</button>
          </div>

          {/* Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px", marginBottom: "32px" }}>
            {PROPERTIES.map(p => (
              <PropertyCard key={p.id} property={p} selected={selectedId === p.id} onSelect={() => setSelectedId(p.id === selectedId ? null : p.id)} />
            ))}
          </div>

          {/* Pagination */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px", paddingTop: "8px", borderTop: "1px solid #F3F4F6" }}>
            <span style={{ fontSize: "13px", color: "#6B7280" }}>Showing <strong>1–8</strong> of <strong>2,408</strong> properties</span>
            <Pagination current={filters.page} total={84} onChange={p => setFilters(f => ({ ...f, page: p }))} />
          </div>
        </main>
      </div>

      {/* Mobile filter drawer */}
      {mobileFilterOpen && (
        <>
          <div onClick={() => setMobileFilterOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 998 }} />
          <FilterSidebar mobile onClose={() => setMobileFilterOpen(false)} />
        </>
      )}

      <FloatingCTA />
    </>
  );
}