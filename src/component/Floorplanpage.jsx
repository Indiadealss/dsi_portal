import { useState, useRef, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateField } from "./Redux/propertySlice";
// import { enableMapSet } from "immer";

// enableMap

// ─── SVG Icons ────────────────────────────────────────────────────────────────
const IcoEye = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
  </svg>
);

const IcoPencil = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);
const IcoTrash = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" />
    <path d="M10 11v6M14 11v6" /><path d="M9 6V4h6v2" />
  </svg>
);
const IcoCloudUp = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#1677FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" />
    <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
  </svg>
);
const IcoInfo = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1677FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" strokeWidth="3" />
  </svg>
);
const IcoBulb = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="9" y1="18" x2="15" y2="18" /><line x1="10" y1="22" x2="14" y2="22" />
    <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" />
  </svg>
);
const IcoBed = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 4v16" /><path d="M2 8h18a2 2 0 0 1 2 2v10" /><path d="M2 17h20" /><path d="M6 8v9" />
  </svg>
);
const IcoAreaIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="1" /><path d="M3 9h18M9 21V9" />
  </svg>
);
const IcoPlus = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);
const IcoPlay = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" fill="rgba(0,0,0,0.55)" stroke="none"/>
    <polygon points="10 8 16 12 10 16 10 8" fill="white" />
  </svg>
);
const IcoDoc = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" /><line x1="9" y1="13" x2="15" y2="13" /><line x1="9" y1="17" x2="15" y2="17" />
  </svg>
);

// ─── Constants ────────────────────────────────────────────────────────────────
const CONFIGS = ["1 BHK", "2 BHK", "3 BHK", "4 BHK", "5 BHK", "Studio", "Duplex"];
const UNIT_TYPES = ["Apartment", "Villa", "Studio", "Penthouse", "Duplex", "Commercial"];
const TABS = ["Floor Plan", "Master Plan", "Tower Plan", "Photos", "Videos", "Documents"];
const GUIDELINES = [
  { title: "Upload clear and readable plans", desc: "Use high resolution files (250 DPI or more)" },
  { title: "Include labels and dimensions", desc: "Helps buyers understand the layout better" },
  { title: "Show Carpet area and room labels", desc: "Improves trust and reduce queries" },
  { title: "Supported Formats", desc: "JPG, PNG, PDF (Max 10MB per file)" },
];

// ─── Backend type → Tab mapping ───────────────────────────────────────────────
// "layout"  → Floor Plan
// "banner"  → Master Plan
// "cover"   → Tower Plan
// "Photos"  → Photos
// video entries → Videos
// "brouser" → Documents
const TYPE_TO_TAB = {
  layout:  "Floor Plan",
  banner:  "Master Plan",
  cover:   "Tower Plan",
  Photos:  "Photos",
  brouser: "Documents",
};

// Helper: extract a field value from the fields array by key
const getField = (fields = [], key) =>
  (fields.find((f) => f.key === key) || {}).value || "";

// ─── Transform backend API data → tabData rows ────────────────────────────────
let _id = 0;
const transformApiData = (images = [], videos = []) => {
  const tabData = {
    "Floor Plan": [],
    "Master Plan": [],
    "Tower Plan": [],
    "Photos": propertyFirstData.Photos,
    "Videos": propertyFirstData.Videos,
    "Documents": [],
  };

  images.forEach((img) => {
    const tab = TYPE_TO_TAB[img.type];
    if (!tab) return;

    const isDocument = tab === "Documents";
    const isImage = !isDocument;

    const row = {
      id: ++_id,
      _id: img._id,
      image: isImage ? img.src : null,
      src: img.src,
      file: null,
      uploadedToBackend: true,
      type: img.type,
      // Floor Plan specific fields
      configuration: getField(img.fields, "Floor_Plan") || "3 BHK",
      area: getField(img.fields, "super_build_area") || getField(img.fields, "carpet_area") || "—",
      unitType: "Apartment",
      // Extra metadata
      price: getField(img.fields, "Price"),
      carpetArea: getField(img.fields, "carpet_area"),
    };

    tabData[tab].push(row);
  });

  videos.forEach((vid) => {
    const row = {
      id: ++_id,
      _id: vid._id,
      image: null,
      src: vid.src,
      file: null,
      uploadedToBackend: true,
      type: "video",
      configuration: "—",
      area: "—",
      unitType: "—",
    };
    tabData["Videos"].push(row);
  });

  return tabData;
};

// ─── Mock API response (replace with real fetch in production) ─────────────────
const MOCK_IMAGES = [
  { src: "https://d3eoh63gynpjzh.cloudfront.net/1772189452433-project-banner.webp", type: "banner", fields: [{ key: "", value: "", _id: "a1" }], _id: "img-banner" },
  { src: "https://d3eoh63gynpjzh.cloudfront.net/1772189452435-imgi_4_overview.webp", type: "cover", fields: [{ key: "", value: "", _id: "a2" }], _id: "img-cover" },
  { src: "https://d3eoh63gynpjzh.cloudfront.net/1772189452454-imgi_3_7%20%281%29.jpg", type: "Photos", fields: [{ key: "", value: "", _id: "a3" }], _id: "img-photo" },
  { src: "https://d3eoh63gynpjzh.cloudfront.net/1772189452456-3bhk-1500sq.ft.jpeg", type: "layout", fields: [{ key: "Floor_Plan", value: "3 BHK", _id: "b1" }, { key: "Price", value: "13100000", _id: "b2" }, { key: "super_build_area", value: "1500 sqft", _id: "b3" }, { key: "carpet_area", value: "833.78 sqft", _id: "b4" }], _id: "img-3bhk" },
  { src: "https://d3eoh63gynpjzh.cloudfront.net/1772189452459-2bhk-1110sq.ft.jpeg", type: "layout", fields: [{ key: "Floor_Plan", value: "2 BHK", _id: "c1" }, { key: "Price", value: "8900000", _id: "c2" }, { key: "super_build_area", value: "1110 sqft", _id: "c3" }, { key: "carpet_area", value: "573.08 sqft", _id: "c4" }], _id: "img-2bhk-1" },
  { src: "https://d3eoh63gynpjzh.cloudfront.net/1772189452464-2bhk-1130sq.ft.jpeg", type: "layout", fields: [{ key: "Floor_Plan", value: "2 BHK", _id: "d1" }, { key: "Price", value: "9800000", _id: "d2" }, { key: "super_build_area", value: "1130 sqft", _id: "d3" }], _id: "img-2bhk-2" },
  { src: "https://d3eoh63gynpjzh.cloudfront.net/1772189452467-2bhk-1170sq.ft.jpeg", type: "layout", fields: [{ key: "Floor_Plan", value: "2 BHK", _id: "e1" }, { key: "Price", value: "10000000", _id: "e2" }, { key: "super_build_area", value: "1170 sqft", _id: "e3" }, { key: "carpet_area", value: "602.03 sqft", _id: "e4" }], _id: "img-2bhk-3" },
  { src: "https://d3eoh63gynpjzh.cloudfront.net/1772189452470-2bk-1240sq.ft.jpeg", type: "layout", fields: [{ key: "Floor_Plan", value: "2 BHK", _id: "f1" }, { key: "Price", value: "10700000", _id: "f2" }, { key: "super_build_area", value: "1240 sqft", _id: "f3" }, { key: "carpet_area", value: "862.08 sqft", _id: "f4" }], _id: "img-2bhk-4" },
  { src: "https://d3eoh63gynpjzh.cloudfront.net/1772189452472-2bhk-1335sq.ft.jpeg", type: "layout", fields: [{ key: "Floor_Plan", value: "2 BHK", _id: "g1" }, { key: "Price", value: "11000000", _id: "g2" }, { key: "super_build_area", value: "1335 sqft", _id: "g3" }, { key: "carpet_area", value: "676.09 sqft", _id: "g4" }], _id: "img-2bhk-5" },
  { src: "https://d3eoh63gynpjzh.cloudfront.net/1772189452474-2bhk-1435sq.ft.jpeg", type: "layout", fields: [{ key: "Floor_Plan", value: "2 BHK", _id: "h1" }, { key: "Price", value: "18000000", _id: "h2" }, { key: "super_build_area", value: "1435 sqft", _id: "h3" }, { key: "carpet_area", value: "704.29 sqft", _id: "h4" }], _id: "img-2bhk-6" },
  { src: "https://d3eoh63gynpjzh.cloudfront.net/1772189452477-Future-Estate.pdf", type: "brouser", fields: [{ key: "", value: "", _id: "i1" }], _id: "img-doc" },
];
const MOCK_VIDEOS = [
  { _id: "vid-1", src: "https://d3eoh63gynpjzh.cloudfront.net/1772189452559-Future_Estate.mp4" },
  { _id: "vid-2", src: "https://d3eoh63gynpjzh.cloudfront.net/1772189452559-Future_Estate.mp4" },
];

const PREVIEW_PLACEHOLDER = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='280' height='200'%3E%3Crect width='280' height='200' fill='%23F9FAFB'/%3E%3Crect x='14' y='14' width='102' height='90' fill='none' stroke='%23D1D5DB' stroke-width='1.5'/%3E%3Crect x='122' y='14' width='144' height='44' fill='none' stroke='%23D1D5DB' stroke-width='1.5'/%3E%3Crect x='122' y='62' width='74' height='42' fill='none' stroke='%23D1D5DB' stroke-width='1.5'/%3E%3Crect x='200' y='62' width='66' height='42' fill='none' stroke='%23D1D5DB' stroke-width='1.5'/%3E%3Crect x='14' y='108' width='102' height='78' fill='none' stroke='%23D1D5DB' stroke-width='1.5'/%3E%3Crect x='122' y='108' width='144' height='78' fill='none' stroke='%23D1D5DB' stroke-width='1.5'/%3E%3Ctext x='90' y='105' font-size='10' fill='%239CA3AF'  text-anchor='middle'%3ENo preview%3C/text%3E%3C/svg%3E`;

// ─── Dropdown ─────────────────────────────────────────────────────────────────
function Dropdown({ value, options, onChange, width = 150 }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ position: "relative", width, flexShrink: 0 }}>
      <select
        value={value} onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{
          width: "100%", height: 40, padding: "0 28px 0 12px",
          border: `1px solid ${focused ? "#1677FF" : "#D1D5DB"}`, borderRadius: 6,
          background: "#fff", fontSize: 14, color: "#111827",
          appearance: "none", cursor: "pointer", outline: "none",
          transition: "border-color 0.15s",
          boxShadow: focused ? "0 0 0 2px rgba(22,119,255,0.12)" : "none",
        }}
      >
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
      <span style={{ position: "absolute", right: 9, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", fontSize: 10, color: "#9CA3AF" }}>▼</span>
    </div>
  );
}

// ─── Area Input ───────────────────────────────────────────────────────────────
function AreaInput({ value, onChange }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: "flex", flexShrink: 0 }}>
      <input
        type="text" value={value} onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{
          width: 88, height: 40, padding: "0 10px",
          border: `1px solid ${focused ? "#1677FF" : "#D1D5DB"}`,
          borderRight: "none", borderRadius: "6px 0 0 6px",
          fontSize: 14, color: "#111827", outline: "none",
          transition: "border-color 0.15s",
        }}
      />
      <div style={{
        height: 40, padding: "0 10px", background: "#F9FAFB",
        border: `1px solid ${focused ? "#1677FF" : "#D1D5DB"}`,
        borderRadius: "0 6px 6px 0",
        display: "flex", alignItems: "center",
        fontSize: 13, color: "#6B7280", whiteSpace: "nowrap",
        transition: "border-color 0.15s",
      }}>Sq.Ft</div>
    </div>
  );
}

// ─── Icon Button ──────────────────────────────────────────────────────────────
function IconBtn({ Icon, title, onClick, danger }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      title={title} onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        background: "none", border: "none", cursor: "pointer",
        padding: 4, borderRadius: 4, display: "flex", alignItems: "center",
        color: hov ? (danger ? "#EF4444" : "#1677FF") : "#9CA3AF",
        transition: "color 0.15s",
      }}
    >
      <Icon />
    </button>
  );
}

// ─── Upload Modal ─────────────────────────────────────────────────────────────
function UploadModal({ onClose, onUpload, uploading, progress, activeTab }) {
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef(null);

  const isVideo = activeTab === "Videos";
  const isDoc = activeTab === "Documents";
  const accept = isVideo
    ? "video/mp4,video/webm,video/quicktime"
    : isDoc
    ? "application/pdf"
    : "image/jpeg,image/png,image/webp";
  const label = isVideo ? "MP4, WebM, MOV" : isDoc ? "PDF" : "JPG, PNG, WebP";

  const process = useCallback((files) => {
    const valid = Array.from(files).filter((f) => f.size <= 50 * 1024 * 1024);
    if (valid.length) onUpload(valid);
  }, [onUpload]);

  useEffect(() => {
    const fn = (e) => { if (e.key === "Escape" && !uploading) onClose(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose, uploading]);

  return (
    <div onClick={() => !uploading && onClose()} style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)",
      zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center",
      animation: "fpFade .2s ease",
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        width: "min(940px, 92vw)", background: "#fff", borderRadius: 12,
        padding: "32px 40px", boxShadow: "0 24px 64px rgba(0,0,0,0.18)",
        animation: "fpUp .22s ease",
      }}>
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => { e.preventDefault(); setDragOver(false); process(e.dataTransfer.files); }}
          onClick={() => !uploading && fileRef.current?.click()}
          style={{
            border: `2px dashed ${dragOver ? "#1677FF" : "#D1D5DB"}`, borderRadius: 10,
            padding: "44px 24px", display: "flex", flexDirection: "column",
            alignItems: "center", gap: 10,
            cursor: uploading ? "default" : "pointer",
            background: dragOver ? "#EFF6FF" : "#fff",
            transition: "background 0.18s, border-color 0.18s",
          }}
        >
          <IcoCloudUp />
          {uploading ? (
            <>
              <p style={{ fontSize: 18, fontWeight: 600, color: "#111827", margin: 0 }}>Uploading… {progress}%</p>
              <div style={{ width: 280, height: 4, background: "#E5E7EB", borderRadius: 999, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${progress}%`, background: "#1677FF", borderRadius: 999, transition: "width .12s ease" }} />
              </div>
            </>
          ) : (
            <>
              <p style={{ fontSize: 18, fontWeight: 600, color: "#111827", margin: 0 }}>Drag &amp; Drop Files here</p>
              <p style={{ fontSize: 15, color: "#6B7280", margin: 0 }}>or <span style={{ color: "#1677FF", fontWeight: 500 }}>Browse</span></p>
              <p style={{ fontSize: 13, color: "#9CA3AF", margin: 0, textAlign: "center", lineHeight: "22px" }}>
                {label} allowed<br />MAX size {isVideo ? "50" : "10"} MB per file
              </p>
            </>
          )}
        </div>
        <input ref={fileRef} type="file" accept={accept} multiple
          style={{ display: "none" }} onChange={(e) => process(e.target.files)} />
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
          <button onClick={() => !uploading && onClose()} style={{
            height: 40, padding: "0 20px", background: "#fff",
            border: "1px solid #D1D5DB", borderRadius: 6,
            fontSize: 14, color: "#374151", cursor: uploading ? "default" : "pointer",
          }}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

// ─── Lightbox (image or video) ─────────────────────────────────────────────────
function Lightbox({ src, type, onClose }) {
  useEffect(() => {
    const fn = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.82)",
      zIndex: 3000, display: "flex", alignItems: "center", justifyContent: "center",
      animation: "fpFade .15s ease",
    }}>
      {type === "video" ? (
        <video
          src={src} controls autoPlay
          onClick={(e) => e.stopPropagation()}
          style={{ maxWidth: "85vw", maxHeight: "85vh", borderRadius: 8, boxShadow: "0 8px 48px rgba(0,0,0,0.5)" }}
        />
      ) : (
        <img src={src} alt="Preview" onClick={(e) => e.stopPropagation()}
          style={{ maxWidth: "85vw", maxHeight: "85vh", borderRadius: 8, objectFit: "contain", boxShadow: "0 8px 48px rgba(0,0,0,0.5)" }} />
      )}
    </div>
  );
}

// ─── Video Thumbnail Row ──────────────────────────────────────────────────────
function VideoThumb({ src, onClick }) {
  return (
    <div onClick={onClick} style={{
      width: 180, height: 100, border: "1px solid #E5E7EB", borderRadius: 6,
      overflow: "hidden", background: "#111827", flexShrink: 0,
      cursor: "pointer", position: "relative",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <video src={src} muted style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.7 }} />
      <div style={{ position: "absolute" }}><IcoPlay /></div>
    </div>
  );
}

// ─── Document Row Thumb ───────────────────────────────────────────────────────
function DocThumb({ src }) {
  const name = src.split("/").pop().split("?")[0];
  return (
    <div style={{
      width: 180, height: 100, border: "1px solid #E5E7EB", borderRadius: 6,
      background: "#F9FAFB", flexShrink: 0,
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6,
    }}>
      <IcoDoc />
      <span style={{ fontSize: 11, color: "#6B7280", textAlign: "center", padding: "0 8px", wordBreak: "break-all", maxWidth: "100%" }}>{name}</span>
    </div>
  );
}

// ─── Determine row display type ───────────────────────────────────────────────
function getRowMedia(row, tab) {
  if (tab === "Videos" || row.type === "video") return "video";
  if (tab === "Documents" || row.type === "brouser") return "document";
  return "image";
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function FloorPlanPage() {
  const propertyFirstData = useSelector((state) => state.property.data);
  const [activeTab, setActiveTab] = useState("Floor Plan");
  const [tabData, setTabData] = useState(() => transformApiData());
  const [loading, setLoading] = useState(false); // set true while fetching real API
  const [showModal, setShowModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [lightbox, setLightbox] = useState(null); // { src, type }
  const [dragIdx, setDragIdx] = useState(null);
  const [dragOver, setDragOver] = useState(null);
  const [previewIdx, setPreviewIdx] = useState(0);

  const dispatch = useDispatch();
  const debounce = useRef(null);

  useEffect(() => {
    clearTimeout(debounce.current);

    debounce.current = setTimeout(() => {
      dispatch(updateField({
        image:activeTab.Photos,
        video:activeTab.Videoes

      }))
    })
    console.log(tabData.Photos, tabData.Videos, 'What is goging on')
  },[activeTab, tabData, loading, showModal, uploading, lightbox, dragIdx, dragOver, previewIdx])

  const rows = tabData[activeTab];
  const setRows = (fn) =>
    setTabData((prev) => ({ ...prev, [activeTab]: typeof fn === "function" ? fn(prev[activeTab]) : fn }));

  useEffect(() => {
    if (rows.length > 0 && previewIdx >= rows.length) setPreviewIdx(rows.length - 1);
  }, [rows.length]);



  const handleUpload = useCallback(async (files) => {
    setUploading(true); setProgress(0);
    for (let p = 10; p <= 90; p += 10) {
      await new Promise((r) => setTimeout(r, 90));
      setProgress(p);
    }

    const tab = activeTab;
    const isVideo = tab === "Videos";
    const isDoc = tab === "Documents";

    const reads = await Promise.all(
      files.map((f) => new Promise((res) => {
        if (isVideo || isDoc) { res({ file: f, dataUrl: null }); return; }
        const r = new FileReader();
        r.onload = (e) => res({ file: f, dataUrl: e.target.result });
        r.readAsDataURL(f);
      }))
    );

    // In production: POST to /api/v1/floor-plans/upload
    await new Promise((r) => setTimeout(r, 300));
    setProgress(100);
    await new Promise((r) => setTimeout(r, 200));

    const newRows = reads.map((r) => ({
      id: ++_id, _id: null,
      image: r.dataUrl,
      src: r.dataUrl || URL.createObjectURL(r.file),
      file: r.file, uploadedToBackend: false,
      type: isVideo ? "video" : isDoc ? "brouser" : "layout",
      configuration: "3 BHK", area: "", unitType: "Apartment",
    }));

    setRows((prev) => [...prev, ...newRows]);
    setUploading(false);
    setShowModal(false);
  }, [activeTab]);

  const updateRow = (id, field, val) =>
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, [field]: val } : r)));

  const deleteRow = (id) => setRows((prev) => prev.filter((r) => r.id !== id));

  const handleDrop = (toIdx) => {
    if (dragIdx === null || dragIdx === toIdx) return;
    setRows((prev) => {
      const next = [...prev];
      const [moved] = next.splice(dragIdx, 1);
      next.splice(toIdx, 0, moved);
      return next;
    });
    setDragIdx(null); setDragOver(null);
  };

  const current = rows[previewIdx] ?? null;
  const isFloorPlanTab = activeTab === "Floor Plan";
  const showFields = ["Floor Plan", "Master Plan", "Tower Plan"].includes(activeTab);

  // Tab badge counts
  const tabCount = (tab) => tabData[tab]?.length || 0;

  return (
    <>
      <style>{`
        @keyframes fpFade { from{opacity:0} to{opacity:1} }
        @keyframes fpUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        *{box-sizing:border-box;} body{margin:0;}
        ::-webkit-scrollbar{width:5px;height:5px;}
        ::-webkit-scrollbar-track{background:#F3F4F6;border-radius:999px;}
        ::-webkit-scrollbar-thumb{background:#D1D5DB;border-radius:999px;}
        @media(max-width:1024px){.fp-grid{grid-template-columns:1fr!important;}}
        @media(max-width:768px){
          .fp-row{grid-template-columns:1fr!important;gap:10px!important;}
          .fp-row-thumb{width:100%!important;height:140px!important;}
          .fp-th-grid{display:none!important;}
          .fp-guide-grid{grid-template-columns:1fr 1fr!important;}
        }
        @media(max-width:480px){
          .fp-guide-grid{grid-template-columns:1fr!important;}
          .fp-tabs{flex-wrap:wrap;}
        }
      `}</style>

      <div style={{ minHeight: "100vh", fontFamily: "'Inter', -apple-system, sans-serif", padding: "28px 24px 48px" }}>
        <div className="fp-grid" style={{
          maxWidth: 1440, margin: "0 auto",
          display: "grid", gridTemplateColumns: "1fr 320px",
          gap: 32, alignItems: "start",
        }}>

          {/* ════ LEFT ════ */}
          <div style={{ minWidth: 0 }}>
            <div style={{ marginBottom: 28 }}>
              <h1 style={{ fontSize: "clamp(28px,3vw,40px)", fontWeight: 700, color: "#111827", margin: "0 0 6px 0", lineHeight: 1.2 }}>
                Floor Plan
              </h1>
              <p style={{ fontSize: 16, color: "#6B7280", margin: "0 0 14px 0", lineHeight: "24px" }}>
                Upload Floor Plans, Master Plan and Tower Plan of your project
              </p>
              <div style={{ width: "min(550px,100%)", height: 3, background: "#1677FF", borderRadius: 999 }} />
            </div>

            {/* Tabs */}
            <div className="fp-tabs" style={{ display: "flex", gap: 10, marginBottom: 28, flexWrap: "wrap" }}>
              {TABS.map((tab) => {
                const active = activeTab === tab;
                const count = tabCount(tab);
                return (
                  <button key={tab} onClick={() => { setActiveTab(tab); setPreviewIdx(0); }}
                    style={{
                      height: 40, padding: "0 16px",
                      border: `1px solid ${active ? "#1677FF" : "#D1D5DB"}`,
                      borderRadius: 6,
                      background: active ? "#EFF6FF" : "#fff",
                      color: active ? "#1677FF" : "#374151",
                      fontSize: 14, fontWeight: active ? 600 : 400,
                      cursor: "pointer", transition: "all .15s", whiteSpace: "nowrap",
                      display: "flex", alignItems: "center", gap: 6,
                    }}
                  >
                    {tab}
                    {count > 0 && (
                      <span style={{
                        background: active ? "#1677FF" : "#E5E7EB",
                        color: active ? "#fff" : "#374151",
                        borderRadius: 999, fontSize: 11, fontWeight: 600,
                        padding: "1px 6px", minWidth: 18, textAlign: "center",
                      }}>{count}</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Section header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12, marginBottom: 16 }}>
              <div>
                <h2 style={{ fontSize: 20, fontWeight: 600, color: "#111827", margin: "0 0 4px 0" }}>Add {activeTab}</h2>
                <p style={{ fontSize: 14, color: "#6B7280", margin: 0 }}>
                  {activeTab === "Videos"
                    ? "Upload project walkthrough videos"
                    : activeTab === "Documents"
                    ? "Upload brochures and project documents"
                    : "Upload and map each plan with the correct configuration"}
                </p>
              </div>
              <button onClick={() => setShowModal(true)}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  height: 44, padding: "0 18px",
                  background: "#fff", border: "1px solid #D1D5DB",
                  borderRadius: 8, fontSize: 14, fontWeight: 500,
                  color: "#374151", cursor: "pointer", flexShrink: 0,
                  boxShadow: "0 1px 2px rgba(0,0,0,0.04)", transition: "border-color .15s, color .15s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#1677FF"; e.currentTarget.style.color = "#1677FF"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#D1D5DB"; e.currentTarget.style.color = "#374151"; }}
              >
                <IcoPlus /> Upload {activeTab}
              </button>
            </div>

            {/* Table */}
            <div style={{
              background: "#fff", border: "1px solid #E5E7EB",
              borderRadius: 10, overflow: "auto",
              boxShadow: "0 1px 2px rgba(0,0,0,0.04)", marginBottom: 14,
            }}>
              {/* Table head — only for tabs with metadata fields */}
              {showFields && (
                <div className="fp-th-grid" style={{
                  display: "grid",
                  gridTemplateColumns: "200px 1fr 1fr 1fr 120px",
                  gap: 16, padding: "14px 20px",
                  borderBottom: "1px solid #E5E7EB", background: "#FAFAFA",
                }}>
                  {[activeTab, "Configuration", "Area", "Unit Type", "Action"].map((h) => (
                    <div key={h} style={{ fontSize: 14, fontWeight: 600, color: "#374151" }}>{h}</div>
                  ))}
                </div>
              )}

              {/* Media-only tabs header */}
              {!showFields && rows.length > 0 && (
                <div style={{
                  display: "grid", gridTemplateColumns: "200px 1fr 120px",
                  gap: 16, padding: "14px 20px",
                  borderBottom: "1px solid #E5E7EB", background: "#FAFAFA",
                }}>
                  {[activeTab, "File name", "Action"].map((h) => (
                    <div key={h} style={{ fontSize: 14, fontWeight: 600, color: "#374151" }}>{h}</div>
                  ))}
                </div>
              )}

              {/* Empty state */}
              {rows.length === 0 && !loading && (
                <div style={{ padding: "52px 24px", textAlign: "center", color: "#9CA3AF", fontSize: 14 }}>
                  <div style={{ fontSize: 36, marginBottom: 10 }}>🗂️</div>
                  No {activeTab.toLowerCase()} added yet.{" "}
                  <span style={{ color: "#1677FF", cursor: "pointer", fontWeight: 500 }} onClick={() => setShowModal(true)}>
                    Upload one to get started.
                  </span>
                </div>
              )}

              {loading && (
                <div style={{ padding: "52px 24px", textAlign: "center", color: "#9CA3AF", fontSize: 14 }}>Loading…</div>
              )}

              {/* Rows */}
              {rows.map((row, idx) => {
                const mediaType = getRowMedia(row, activeTab);
                const fileName = (row.src || "").split("/").pop().split("?")[0];

                return (
                  <div
                    key={row.id}
                    draggable
                    onDragStart={() => setDragIdx(idx)}
                    onDragOver={(e) => { e.preventDefault(); setDragOver(idx); }}
                    onDrop={() => handleDrop(idx)}
                    onDragEnd={() => { setDragIdx(null); setDragOver(null); }}
                    className="fp-row"
                    style={{
                      display: "grid",
                      gridTemplateColumns: showFields ? "200px 1fr 1fr 1fr 120px" : "200px 1fr 120px",
                      alignItems: "center", gap: 16,
                      padding: "14px 20px",
                      borderBottom: idx < rows.length - 1 ? "1px solid #F3F4F6" : "none",
                      background: dragOver === idx && dragIdx !== idx ? "#EFF6FF" : dragIdx === idx ? "#F9FAFB" : "#fff",
                      opacity: dragIdx === idx ? 0.5 : 1,
                      cursor: "grab", transition: "background .15s, opacity .15s",
                    }}
                  >
                    {/* Thumbnail */}
                    <div className="fp-row-thumb" style={{ width: 180, height: 100, flexShrink: 0, position: "relative" }}>
                      {mediaType === "video" ? (
                        <VideoThumb src={row.src} onClick={() => setLightbox({ src: row.src, type: "video" })} />
                      ) : mediaType === "document" ? (
                        <DocThumb src={row.src} />
                      ) : (
                        <div style={{
                          width: "100%", height: "100%",
                          border: "1px solid #E5E7EB", borderRadius: 6,
                          overflow: "hidden", background: "#F9FAFB",
                        }}>
                          <img src={row.image || row.src} alt={`Item ${idx + 1}`}
                            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                          {row.uploadedToBackend && (
                            <div style={{
                              position: "absolute", top: 4, right: 4,
                              background: "#16A34A", borderRadius: "50%",
                              width: 16, height: 16,
                              display: "flex", alignItems: "center", justifyContent: "center",
                            }}>
                              <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                                <polyline points="1.5,4.5 3.5,6.8 7.5,2.2" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Fields for Floor Plan / Master Plan / Tower Plan tabs */}
                    {showFields && (
                      <>
                        <Dropdown
                          value={CONFIGS.includes(row.configuration) ? row.configuration : CONFIGS[0]}
                          options={CONFIGS}
                          onChange={(v) => updateRow(row.id, "configuration", v)}
                          width={150}
                        />
                        <AreaInput value={row.area} onChange={(v) => updateRow(row.id, "area", v)} />
                        <Dropdown
                          value={UNIT_TYPES.includes(row.unitType) ? row.unitType : UNIT_TYPES[0]}
                          options={UNIT_TYPES}
                          onChange={(v) => updateRow(row.id, "unitType", v)}
                          width={150}
                        />
                      </>
                    )}

                    {/* File name for media-only tabs */}
                    {!showFields && (
                      <div style={{ fontSize: 13, color: "#374151", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {fileName}
                        {row.uploadedToBackend && (
                          <span style={{ marginLeft: 8, fontSize: 11, color: "#16A34A", fontWeight: 500 }}>✓ Saved</span>
                        )}
                      </div>
                    )}

                    {/* Actions */}
                    <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                      <IconBtn Icon={IcoEye} title="View"
                        onClick={() => mediaType === "document"
                          ? window.open(row.src, "_blank")
                          : setLightbox({ src: row.src || row.image, type: mediaType })}
                      />
                      <IconBtn Icon={IcoPencil} title="Edit" onClick={() => {}} />
                      <IconBtn Icon={IcoTrash} title="Delete" onClick={() => deleteRow(row.id)} danger />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Drag tip */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: 6, fontSize: 14, fontWeight: 500, color: "#1677FF", marginBottom: 32, lineHeight: "20px" }}>
              <div style={{ flexShrink: 0, marginTop: 1 }}><IcoInfo /></div>
              <span>Tip: Drag and drop rows to reorder. The first item will be shown as primary.</span>
            </div>

            {/* Guidelines */}
            <div style={{ marginBottom: 36 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: "#111827", margin: "0 0 18px 0" }}>Floor Plan Guidelines</h3>
              <div className="fp-guide-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
                {GUIDELINES.map((g, i) => (
                  <div key={i}>
                    <p style={{ fontSize: 14, fontWeight: 600, color: "#111827", margin: "0 0 5px 0", lineHeight: "20px" }}>{g.title}</p>
                    <p style={{ fontSize: 13, color: "#6B7280", margin: 0, lineHeight: "19px" }}>{g.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ════ RIGHT SIDEBAR ════ */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20, position: "sticky", top: 24 }}>

            {/* Tip card */}
            <div style={{ background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 10, padding: 16, display: "flex", gap: 12, alignItems: "flex-start" }}>
              <div style={{ flexShrink: 0, marginTop: 1 }}><IcoBulb /></div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#111827", marginBottom: 4 }}>Tip</div>
                <div style={{ fontSize: 13, color: "#6B7280", lineHeight: "18px" }}>
                  High quality floor plans help buyers understand your project better and build trust.
                </div>
              </div>
            </div>

            {/* Preview card */}
            <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 10, overflow: "hidden", boxShadow: "0 1px 2px rgba(0,0,0,0.04)" }}>
              <div style={{ padding: "14px 16px 10px" }}>
                <span style={{ fontSize: 15, fontWeight: 700, color: "#111827" }}>Preview </span>
                <span style={{ fontSize: 13, color: "#6B7280" }}>(as it appears on listing)</span>
              </div>

              {/* Preview image / video / doc */}
              <div style={{ width: "100%", height: 230, background: "#F9FAFB", overflow: "hidden", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {current ? (
                  (() => {
                    const mt = getRowMedia(current, activeTab);
                    if (mt === "video") return (
                      <>
                        <video src={current.src} muted style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.75 }} />
                        <div style={{ position: "absolute" }}><IcoPlay /></div>
                      </>
                    );
                    if (mt === "document") return (
                      <div style={{ textAlign: "center", padding: 16 }}>
                        <IcoDoc />
                        <p style={{ fontSize: 12, color: "#6B7280", marginTop: 8, wordBreak: "break-all" }}>
                          {(current.src || "").split("/").pop().split("?")[0]}
                        </p>
                      </div>
                    );
                    return <img src={current.image || current.src} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "contain", transition: "opacity .2s" }} />;
                  })()
                ) : (
                  <img src={PREVIEW_PLACEHOLDER} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                )}
              </div>

              {/* Footer */}
              <div style={{ padding: "12px 16px 16px" }}>
                {showFields && (
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 14, fontWeight: 600, color: "#111827" }}>
                      <IcoBed />{current?.configuration || "—"}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 14, fontWeight: 600, color: "#111827" }}>
                      <IcoAreaIcon />{current?.area || "—"}
                    </div>
                  </div>
                )}
                <div style={{ fontSize: 14, color: "#374151", fontWeight: 500, marginBottom: rows.length > 1 ? 14 : 0 }}>
                  {showFields ? (current?.unitType || "—") : (current ? activeTab : "No items")}
                </div>

                {rows.length > 1 && (
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <button onClick={() => setPreviewIdx((i) => Math.max(0, i - 1))} disabled={previewIdx === 0}
                      style={{ width: 28, height: 28, background: "#fff", border: "1px solid #E5E7EB", borderRadius: "50%", cursor: previewIdx === 0 ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", opacity: previewIdx === 0 ? 0.35 : 1, transition: "opacity .15s" }}
                      onMouseEnter={(e) => previewIdx > 0 && (e.currentTarget.style.borderColor = "#1677FF")}
                      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#E5E7EB")}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6" /></svg>
                    </button>

                    <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
                      {rows.slice(0, 8).map((_, i) => (
                        <div key={i} onClick={() => setPreviewIdx(i)} style={{
                          width: i === previewIdx ? 18 : 8, height: 8, borderRadius: 999,
                          background: i === previewIdx ? "#1677FF" : "#D1D5DB",
                          cursor: "pointer", transition: "all .2s",
                        }} />
                      ))}
                      {rows.length > 8 && <span style={{ fontSize: 11, color: "#9CA3AF" }}>+{rows.length - 8}</span>}
                    </div>

                    <button onClick={() => setPreviewIdx((i) => Math.min(rows.length - 1, i + 1))} disabled={previewIdx === rows.length - 1}
                      style={{ width: 28, height: 28, background: "#fff", border: "1px solid #E5E7EB", borderRadius: "50%", cursor: previewIdx === rows.length - 1 ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", opacity: previewIdx === rows.length - 1 ? 0.35 : 1, transition: "opacity .15s" }}
                      onMouseEnter={(e) => previewIdx < rows.length - 1 && (e.currentTarget.style.borderColor = "#1677FF")}
                      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#E5E7EB")}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6" /></svg>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Help card */}
            <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 10, padding: 20, boxShadow: "0 1px 2px rgba(0,0,0,0.04)" }}>
              <p style={{ fontSize: 15, fontWeight: 600, color: "#111827", margin: "0 0 6px 0" }}>Need Help?</p>
              <p style={{ fontSize: 13, color: "#6B7280", margin: "0 0 14px 0", lineHeight: "19px" }}>
                See our guide on how to upload professional floor plans.
              </p>
              <button style={{ height: 40, width: "100%", background: "#fff", border: "1px solid #1677FF", borderRadius: 6, fontSize: 14, fontWeight: 500, color: "#1677FF", cursor: "pointer", transition: "background .15s" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#EFF6FF")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}
              >View Floor Plan Guide</button>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <UploadModal
          onClose={() => !uploading && setShowModal(false)}
          onUpload={handleUpload}
          uploading={uploading}
          progress={progress}
          activeTab={activeTab}
        />
      )}
      {lightbox && <Lightbox src={lightbox.src} type={lightbox.type} onClose={() => setLightbox(null)} />}
    </>
  );
}