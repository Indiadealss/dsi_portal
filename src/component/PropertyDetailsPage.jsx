import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import readyToMove from "../Images/ready_to_move.svg";
import areaSize from "../Images/area_size.svg";
import stairs from "../Images/stairs_2.svg";
import parking from "../Images/Parking.svg";
import powerBackup from "../Images/power_backup.svg";
import call from "../Images/call.svg";
import whatsapp from "../Images/whatsapp.svg";
import calendar_month from "../Images/calendar_month.svg";
import bed from "../Images/bed.svg";
import shower from "../Images/shower.svg";
import { createLeadMessage, getPropertyByspid } from "../api/api";
import { useParams } from "react-router-dom";

const SIMILAR = [
  { img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&auto=format&fit=crop", name: "Stellar IT Park", location: "Sector 62, Noida", price: "₹85 L", area: "1100 sq.ft", type: "Office Space", status: "FOR SALE" },
  { img: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&auto=format&fit=crop", name: "Wave One Tower", location: "Sector 18, Noida", price: "₹1.2 Cr", area: "1600 sq.ft", type: "Office Space", status: "FOR RENT" },
  { img: "https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=400&auto=format&fit=crop", name: "The Headquarters", location: "Alpha 1, Greater Noida", price: "₹72 L", area: "980 sq.ft", type: "Office Space", status: "FOR SALE" },
  { img: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=400&auto=format&fit=crop", name: "Gaur City Centre", location: "Greater Noida West", price: "₹95 L", area: "1350 sq.ft", type: "Office Space", status: "FOR LEASE" },
];

function formatPrice(p) {
  const n = parseInt(p);
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)} Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(0)} L`;
  return `₹${n.toLocaleString("en-IN")}`;
}

function Section({ title, action, children }) {
  return (
    <div className="bg-white rounded-xl border border-[#E6E6E6] overflow-hidden">
      {title && (
        <div className="flex items-center justify-between px-5 py-4">
          <h2 className="text-[15px] font-bold text-[#1F1F1F] tracking-tight">{title}</h2>
          {action && <button className="text-xs font-semibold text-[#2F73D9] hover:underline">{action}</button>}
        </div>
      )}
      <div className="px-5 pb-5">{children}</div>
    </div>
  );
}

function LocationSection({ locatadvance, address }) {
  const encodedAddr = encodeURIComponent(address || "");
  return (
    <div>
      <h2 className="heading-h6 text-gray-800 tracking-wide">Location</h2>
      <div className="flex flex-col md:flex-row gap-3 rounded-md py-4">
        <div className="rounded-md overflow-hidden min-h-40 w-[-webkit-fill-available] md:w-[500px]">
          <iframe
            title="map"
            width="100%"
            height="280"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            src={`https://www.google.com/maps?q=${encodedAddr}&z=15&output=embed`}
            className="rounded-md"
          />
        </div>
        <div className="flex-1 border border-gray-200 p-4 rounded-md">
          <p className="font-bold text-sm">Nearby</p>
          <ul className="space-y-3 py-3">
            {locatadvance?.map((loc, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="flex justify-between w-full">
                  <p className="text-xs font-medium text-[#515151]">{loc.propertyName}</p>
                  <p className="text-xs font-medium text-gray-800">{loc.distance}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function FeatureTag({ icon, label }) {
  return (
    <div className="flex flex-col items-center gap-2 border border-[#E6E6E6] rounded-lg py-3 transition-colors cursor-default text-center">
      <img src={icon} alt={label} className="w-8 h-8 object-contain" onError={e => { e.target.style.display = "none"; }} />
      <span className="text-[11px] text-[#6E6E6E] font-medium leading-tight">{label}</span>
    </div>
  );
}

export default function PropertyDetailsPage() {
  // ── All hooks at the top, unconditionally ──────────────────────────────
  const [activeImg, setActiveImg] = useState(0);
  const [showMore, setShowMore] = useState(false);
  const [saved, setSaved] = useState(false);
  const [emiOpen, setEmiOpen] = useState(false);
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  const [openLeadModal, setOpenLeadModal] = useState(false);
  const [property, setProperty] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ property_id: "", projectname: "", Name: "", PhoneNumber: "", message: "" });
  const [amount, setAmount] = useState(1000000);
  const [rate, setRate] = useState(8.5);
  const [years, setYears] = useState(20);
  const [imageError, setImageError] = useState(false);


  const getInitials = (name = "") =>
    name
      .trim()
      .split(" ")
      .map((word) => word[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();


  const getAvatarColor = (name = "") => {
    const colors = [
      "#2563EB", // Blue
      "#DC2626", // Red
      "#16A34A", // Green
      "#9333EA", // Purple
      "#EA580C", // Orange
      "#0891B2", // Cyan
      "#BE185D", // Pink
      "#CA8A04", // Yellow
      "#4F46E5", // Indigo
      "#0F766E", // Teal
    ];

    let hash = 0;

    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }

    return colors[Math.abs(hash) % colors.length];
  };
  const { slug } = useParams();
  const spid = slug?.slice(-5);

  useEffect(() => {
    fetchproperty();
  }, [spid]);

  const fetchproperty = async () => {
    try {
      const res = await getPropertyByspid(spid);
      setProperty(res.data);
    } catch (err) {
      console.error("API ERROR", err);
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // ── handleSubmit: just the async logic, no JSX inside ─────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createLeadMessage(form);
      if (res.status === 201) {
        alert("✅ Enquiry submitted");
        setSubmitted(true);
        setOpenLeadModal(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setForm({ property_id: "", projectname: "", Name: "", PhoneNumber: "", message: "" });
    }
  };

  const emi = useMemo(() => {
    const monthlyRate = rate / 12 / 100;
    const months = years * 12;
    const emiValue =
      (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);
    return isNaN(emiValue) ? 0 : Math.round(emiValue);
  }, [amount, rate, years]);

  // ── Loading guard — after all hooks, before any property access ────────
  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 text-sm">
        Loading property...
      </div>
    );
  }

  // ── Derived values — safe to use property here ─────────────────────────
  const imgs = property.images || [];
  const addr = property.location?.[0] || {};
  const priceNum = parseInt(property.price || 0);
  const pricePerSqft = property.buildarea
    ? Math.round(priceNum / parseInt(property.buildarea))
    : 0;
  const descShort = property.description?.slice(0, 220) || "";
  const statusColor = {
    "FOR SALE": "bg-[#2F73D9] text-white",
    "FOR RENT": "bg-[#24B15A] text-white",
    "FOR LEASE": "bg-orange-500 text-white",
  };

  // ── Main JSX ───────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&display=swap');
        .hide-scroll::-webkit-scrollbar { display: none; }
        .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
        .fade-up { animation: fadeUp 0.4s ease both; }
        .fade-up-1 { animation-delay: 0.05s; }
        .fade-up-2 { animation-delay: 0.12s; }
        .fade-up-3 { animation-delay: 0.18s; }
        .fade-up-4 { animation-delay: 0.24s; }
      `}</style>

      {/* ── Breadcrumb ── */}
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 pt-5">
        <nav className="flex items-center gap-1.5 text-[11px] text-[#7A7A7A] flex-wrap cursor-default">
          {["Home", "All Properties", "Ready To Move", property.projectname].map((b, i, arr) => (
            <span key={b} className="flex items-center gap-1.5">
              <span className={i === arr.length - 1 ? "text-[#2F73D9] font-semibold" : "transition-colors"}>
                {b}
              </span>
              {i < arr.length - 1 && <span className="text-[#C0C0C0] text-[10px]">›</span>}
            </span>
          ))}
        </nav>
      </div>

      {/* ── Main Layout ── */}
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 py-5">
        <div className="flex flex-col xl:flex-row gap-5">

          {/* ══ LEFT COLUMN ══ */}
          <div className="flex-1 min-w-0 space-y-4">

            {/* MEDIA */}
            <div className="fade-up fade-up-1 rounded overflow-hidden">
              <div className="flex flex-col md:flex-row gap-0">
                <div className="relative flex-1 h-64 sm:h-80 rounded md:h-[380px] group">
                  <img
                    key={activeImg}
                    src={imgs[activeImg]?.src}
                    alt="Property"
                    className="w-full h-full object-cover transition-opacity duration-300 rounded"
                    style={{ animation: "fadeUp 0.3s ease both" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                  <button onClick={() => setActiveImg((p) => (p - 1 + imgs.length) % imgs.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full backdrop-blur-md bg-black/40 cursor-pointer flex items-center justify-center shadow-md text-white">
                    <ChevronLeft size={18} />
                  </button>
                  <button onClick={() => setActiveImg((p) => (p + 1) % imgs.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full backdrop-blur-md bg-black/40 cursor-pointer flex items-center justify-center shadow-md text-white">
                    <ChevronRight size={18} />
                  </button>
                  <div className="absolute top-3 left-3 flex gap-2">
                    {property.availabestatus && (
                      <span className="bg-[#24B15A] text-white text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
                        {property.availabestatus}
                      </span>
                    )}
                    <span className="bg-[#2F73D9] text-white text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
                      For Sale
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 flex gap-2">
                    <button onClick={() => setSaved(!saved)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center shadow text-sm transition-all cursor-pointer ${saved ? "bg-red-500 text-white scale-110" : "bg-white/90 text-gray-500 hover:bg-white"}`}>
                      {saved ? "♥" : "♡"}
                    </button>
                  </div>
                  <span className="absolute bottom-3 right-3 bg-black/60 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full">
                    {activeImg + 1} / {imgs.length}
                  </span>
                </div>
                <div className="flex md:flex-col flex-row gap-1.5 p-2 overflow-x-auto md:overflow-y-auto hide-scroll" style={{ maxHeight: 380 }}>
                  {imgs.map((img, i) => (
                    <button key={i} onClick={() => setActiveImg(i)}
                      className={`flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-150 ${activeImg === i ? "border-[#2F73D9] ring-2 ring-blue-200" : "border-transparent hover:border-gray-300"}`}
                      style={{ width: 100, height: 74 }}>
                      <img src={img.src} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                  <div className="flex-shrink-0 rounded-lg bg-black/60 flex items-center justify-center text-white font-bold text-sm cursor-pointer hover:bg-black/70 transition-colors"
                    style={{ width: 100, height: 74 }}>
                    +20
                  </div>
                </div>
              </div>
            </div>

            {/* PROPERTY HEADER */}
            <div className="fade-up fade-up-2 rounded-xl border border-[#E6E6E6] p-5">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {property.commercialType && (
                      <span className="bg-blue-50 text-[#2F73D9] text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase">{property.commercialType}</span>
                    )}
                    {property.ownership && (
                      <span className="bg-blue-50 text-[#2F73D9] text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase">{property.ownership}</span>
                    )}
                    <span className="bg-gray-100 text-[#6E6E6E] text-[11px] font-semibold px-2.5 py-0.5 rounded-full">{property.propertyfacing} Facing</span>
                  </div>
                  <h1 className="text-xl sm:text-2xl font-extrabold text-[#1F1F1F] leading-tight tracking-tight">
                    {property.property === "residential" && property.propertyType !== "plotLand" && (
                      <span>{property.bedroom} BHK Apartment </span>
                    )}
                    {property.propertyType === "plotLand" && <span>Plots </span>}
                    {property.commercialType} in{" "}
                    {property.projectname ? `${property.projectname},` : addr.City}
                  </h1>
                  <div className="flex items-start gap-1.5 mt-2 text-[#6E6E6E] text-sm">
                    <MapPin size={18} />
                    <span className="leading-snug">{addr.Address}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 flex-wrap mt-6">
                {[
                  { icon: bed, label: "Bedroom", val: property.bedroom ? `${property.bedroom}` : "" },
                  { icon: shower, label: "Bathroom", val: property.bathroom ? `${property.bathroom}` : "" },
                  { icon: areaSize, label: "Build Area", val: property.buildarea ? `${property.buildarea} sq.ft` : "" },
                  { icon: areaSize, label: "Carpet Area", val: property.carpetarea ? `${property.carpetarea} sq.ft` : "" },
                  { icon: stairs, label: "Floor", val: property.floor && property.totalfloor ? `${property.floor}rd / ${property.totalfloor}` : "" },
                  { icon: parking, label: "Parking", val: property.parking },
                  { icon: powerBackup, label: "Power Backup", val: property.pobackup },
                  { icon: readyToMove, label: "Status", val: property.availabestatus },
                ]
                  .filter((f) => f.val && f.val !== "null" && f.val !== "undefined")
                  .map((f) => (
                    <div key={f.label} className="flex flex-col w-max items-center justify-center border border-[#E6E6E6] rounded-lg py-1 px-4 text-center gap-1">
                      <img src={f.icon} className="w-5 h-5" alt={f.label} />
                      <span className="text-xs font-bold text-[#1F1F1F] leading-tight">{f.val}</span>
                      <span className="text-[10px] text-[#6E6E6E]">{f.label}</span>
                    </div>
                  ))}
              </div>

              <div className="flex gap-2.5">
                {[
                  { label: "Cabins", val: property.numCabin },
                  { label: "Seats", val: property.numSets != null && property.maxnumSets != null ? `${property.numSets} (max ${property.maxnumSets})` : null },
                  { label: "Meeting Rooms", val: property.mettingRoom },
                  { label: "Washrooms", val: Number(property.privateWashroom) === 0 && Number(property.publicWashroom) === 0 ? null : `${property.privateWashroom || 0} Pvt + ${property.publicWashroom || 0} Pub` },
                ]
                  .filter((f) => f.val !== null && f.val !== undefined && f.val !== "" && f.val !== "null" && f.val !== 0)
                  .map((s) => (
                    <div key={s.label} className="rounded-lg px-3 py-2.5 border border-blue-100 mt-4">
                      <div className="text-[10px] text-[#6E6E6E] mb-0.5">{s.label}</div>
                      <div className="text-sm font-bold text-[#1F1F1F] text-center">{s.val}</div>
                    </div>
                  ))}
              </div>
            </div>

            {/* ABOUT */}
            <Section title="About this property">
              <p className="text-sm text-[#6E6E6E] leading-relaxed">
                {showMore ? property.description : descShort + (property.description?.length > 220 ? "..." : "")}
                {property.description?.length > 220 && (
                  <button onClick={() => setShowMore(!showMore)} className="ml-1 text-[#2F73D9] font-semibold hover:underline text-sm">
                    {showMore ? "View Less" : "View More"}
                  </button>
                )}
              </p>
            </Section>

            {/* AMENITIES */}
            <div className="bg-white rounded-xl border border-[#E6E6E6] overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4">
                <h2 className="text-[15px] font-bold text-[#1F1F1F] tracking-tight">Amenities</h2>
                <button onClick={() => setShowAllAmenities(!showAllAmenities)} className="text-xs font-semibold text-[#2F73D9] hover:underline">
                  {showAllAmenities ? "View Less" : "View All"}
                </button>
              </div>
              <div className="px-5 pb-5">
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
                  {(showAllAmenities ? property.amenitie : property.amenitie.slice(0, 8)).map(a => (
                    <FeatureTag key={a.name} icon={a.icon} label={a.name} />
                  ))}
                </div>
              </div>
            </div>

            {/* LOCATION */}
            <div className="rounded-xl px-5 py-4 border border-gray-200">
              <LocationSection locatadvance={property.locatadvance} address={property.location?.[0]?.Address} />
            </div>

            {/* SIMILAR PROPERTIES */}
            {property.OnlyPropertys > 2 && (
              <div className="bg-white rounded-xl border border-[#E6E6E6] overflow-hidden">
                <div className="px-5 py-4">
                  <h2 className="text-[15px] font-bold text-[#1F1F1F] tracking-tight">Similar Properties</h2>
                </div>
                <div className="p-5">
                  <div className="flex gap-4 overflow-x-auto hide-scroll pb-1">
                    {SIMILAR.map(p => (
                      <div key={p.name} className="shrink-0 w-60 rounded-xl border border-[#E6E6E6] overflow-hidden hover:shadow-lg transition-shadow cursor-pointer bg-white group">
                        <div className="relative h-36 overflow-hidden">
                          <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          <span className={`absolute top-2 left-2 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wide ${statusColor[p.status]}`}>
                            {p.status}
                          </span>
                        </div>
                        <div className="p-3.5">
                          <div className="font-bold text-[#1F1F1F] text-sm truncate">{p.name}</div>
                          <div className="text-[11px] text-[#6E6E6E] mt-0.5 flex items-center gap-1">
                            <span>📍</span> {p.location}
                          </div>
                          <div className="text-lg font-extrabold text-[#2F73D9] mt-2">{p.price}</div>
                          <div className="flex items-center gap-3 mt-1.5 text-[11px] text-[#6E6E6E]">
                            <span>📐 {p.area}</span>
                            <span>🏢 {p.type}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ══ RIGHT SIDEBAR ══ */}
          <div className="xl:w-[400px] shrink-0">
            <div className="xl:sticky xl:top-25 space-y-4">

              {/* PRICE CARD */}
              <div className="bg-white rounded-xl border border-[#E6E6E6] overflow-hidden shadow-sm fade-up fade-up-3">
                <div className="flex justify-between p-5">
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-widest mb-1">Property Price</div>
                    <div className="text-3xl font-extrabold color-blue tracking-tight">{formatPrice(property.price)}</div>
                    {pricePerSqft > 0 && (
                      <div className="text-sm mt-0.5">₹{pricePerSqft.toLocaleString("en-IN")} / Sq.Ft</div>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 mt-2.5">
                    <span className="bg-[#24B15A]/20 text-[#24B15A] text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-[#24B15A]/30">Negotiable</span>
                    <span className="bg-blue-500/20 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-blue-500/30">{property.selectedPricing}</span>
                  </div>
                </div>

                {/* EMI */}
                <div className="px-5 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[11px] text-[#6E6E6E]">EMI Starts At</div>
                      <div className="text-lg font-extrabold text-[#1F1F1F]">₹{emi.toLocaleString("en-IN")} / Month</div>
                    </div>
                    <button onClick={() => setEmiOpen(!emiOpen)}
                      className="text-[11px] text-[#2F73D9] font-bold border border-[#2F73D9] px-3 py-1.5 rounded-lg transition">
                      EMI Calculator
                    </button>
                  </div>
                </div>

                {/* Property info table */}
                <div className="px-5 py-4 space-y-2.5">
                  {[
                    { label: "Property For", val: property.purpose === "sell" ? "Sale" : property.purpose },
                    { label: "Property Type", val: property.commercialType || property.propertyType },
                    { label: "Furnishing", val: property.furnishing },
                    { label: "Age Of Property", val: property.propertyage },
                    // { label: "RERA ID", val: property.reraStatus },
                  ]
                    .filter((row) => row.val && row.val !== "null" && row.val !== "undefined" && row.val !== "NA" && row.val !== "N/A")
                    .map((row) => (
                      <div key={row.label} className="flex justify-between items-center text-sm">
                        <span className="text-[#6E6E6E]">{row.label}</span>
                        <span className="font-semibold text-[#1F1F1F] text-right max-w-[55%] truncate uppercase">{row.val}</span>
                      </div>
                    ))}
                </div>

                {/* CTAs */}
                <div className="p-5 space-y-2.5">
                  <a href={`tel:${property?.owner?.mobile}`}
                    className="w-full bg-[#2F73D9] text-white font-bold py-3.5 rounded-xl text-sm transition-all shadow-sm flex items-center justify-center gap-2">
                    <img src={call} className="w-5 h-5" alt="Call" />
                    Contact Seller
                  </a>
                  <a href={`https://wa.me/${property?.owner?.mobile}?text=`} target="_blank" rel="noopener noreferrer"
                    className="w-full bg-[#24B15A] cursor-pointer text-white font-bold py-3.5 rounded-xl text-sm transition-all shadow-sm flex items-center justify-center gap-2">
                    <img src={whatsapp} className="w-5 h-5" alt="WhatsApp" />
                    WhatsApp
                  </a>
                  <button onClick={() => setOpenLeadModal(true)}
                    className="w-full border-2 border-[#2F73D9] text-[#2F73D9] cursor-pointer font-bold py-3.5 rounded-xl text-sm transition-all flex items-center justify-center gap-2">
                    <img src={calendar_month} className="w-5 h-5" alt="Schedule" /> Schedule Site Visit
                  </button>
                </div>
              </div>

              {/* AGENT CARD */}
              {property.agent !== "assign" && (
                <div className="bg-white rounded-xl border border-[#E6E6E6] p-5 fade-up fade-up-4">
                  <h3 className="text-[13px] font-bold text-[#1F1F1F] mb-4 uppercase tracking-wider">Agent Information</h3>
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-blue-100 shrink-0  flex items-center justify-center" style={{ backgroundColor: getAvatarColor(property?.owner?.name) }}>
                      {!imageError && property?.owner?.image ? (
                        <img
                          src={property.owner.image}
                          alt={property.owner?.name}
                          className="w-full h-full object-cover"
                          onError={() => setImageError(true)}
                        />
                      ) : (
                        <span className="text-white font-bold text-lg">
                          {getInitials(property?.owner?.name)}
                        </span>
                      )}
                    </div>
                    <div>
                      <div className="font-extrabold text-[#1F1F1F] text-sm">{property.owner?.name}</div>
                      <div className="text-[11px] text-[#6E6E6E]">Property Consultant</div>
                      <div className="text-[11px] text-[#001A2D] font-semibold">Indiadeals Agent</div>
                      <div className="flex items-center gap-1 mt-0.5">
                        {[1, 2, 3, 4, 5].map(s => (
                          <span key={s} className={`text-xs ${s <= 4 ? "text-yellow-400" : "text-gray-300"}`}>★</span>
                        ))}
                        <span className="text-[10px] text-[#6E6E6E] ml-1">4.8 · 120 Reviews</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <a href={`tel:${property?.owner?.mobile}`}
                      className="flex-1 bg-[#2F73D9] text-white text-xs font-bold py-2.5 rounded-lg transition flex items-center justify-center gap-1">
                      <img src={call} className="w-5 h-5" alt="Call" />
                      Call Now
                    </a>
                    <a href={`https://wa.me/${property?.owner?.mobile}?text=`} target="_blank" rel="noopener noreferrer"
                      className="flex-1 bg-[#24B15A] text-white text-xs font-bold py-2.5 rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-1">
                      <img src={whatsapp} className="w-5 h-5" alt="WhatsApp" />
                      WhatsApp
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── MOBILE BOTTOM CTA ── */}
      <div className="hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-[#E6E6E6] px-4 py-3 flex gap-2.5 shadow-2xl">
        <a href={`tel:${property?.owner?.mobile}`} className="flex-1 bg-[#2F73D9] text-white font-bold py-3 rounded-xl text-sm transition text-center">📞 Contact</a>
        <a href={`https://wa.me/${property?.owner?.mobile}`} target="_blank" rel="noopener noreferrer" className="flex-1 bg-[#24B15A] text-white font-bold py-3 rounded-xl text-sm transition text-center">💬 WhatsApp</a>
        <button onClick={() => setOpenLeadModal(true)} className="flex-1 border-2 border-[#2F73D9] text-[#2F73D9] font-bold py-3 rounded-xl text-sm transition">🗓 Visit</button>
      </div>
      <div className="xl:hidden h-20" />

      {/* ── EMI SIDEBAR ── */}
      <div className={`fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${emiOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}>
        <div className="absolute inset-0" onClick={() => setEmiOpen(false)} />
        <div className={`absolute right-0 top-0 h-screen w-full max-w-sm bg-white p-8 shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${emiOpen ? "translate-x-0" : "translate-x-full"}`}>
          <button className="float-right cursor-pointer text-xl" onClick={() => setEmiOpen(false)}>✕</button>
          <div className="border border-gray-200 rounded-xl p-5 mt-8">
            <h2 className="text-xl font-semibold mb-6">EMI Calculator</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Loan Amount (₹)</label>
                <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full border rounded-lg p-2 outline-none" />
              </div>
              <div>
                <label className="block text-sm mb-1">Interest Rate (%)</label>
                <input type="number" step="0.1" value={rate} onChange={(e) => setRate(Number(e.target.value))}
                  className="w-full border rounded-lg p-2 outline-none" />
              </div>
              <div>
                <label className="block text-sm mb-1">Tenure (Years)</label>
                <input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))}
                  className="w-full border rounded-lg p-2 outline-none" />
              </div>
              <div className="bg-gray-50 rounded-lg p-4 mt-4 space-y-3">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500">Monthly EMI</p>
                  <h3 className="text-lg font-bold text-blue-600">₹{emi.toLocaleString("en-IN")}</h3>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500">Interest Rate</p>
                  <h3 className="text-lg font-bold text-blue-600">{rate}%</h3>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500">Tenure</p>
                  <h3 className="text-lg font-bold text-blue-600">{years} Years</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── LEAD MODAL ── */}
      {openLeadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="relative w-full max-w-lg mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden">
            <button onClick={() => setOpenLeadModal(false)} className="absolute top-4 right-4 text-gray-400 cursor-pointer">✕</button>
            <div className="bg-[#001A2D] p-6 text-white">
              <h3 className="text-xl font-bold">Interested In This Property?</h3>
              <p className="text-sm text-blue-100 mt-1">Fill in your details and our expert will get in touch shortly.</p>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input name="Name" value={form.Name} onChange={handleChange} placeholder="Your Name"
                  className="border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-blue-500" />
                <input name="PhoneNumber" value={form.PhoneNumber} onChange={handleChange} placeholder="Mobile Number"
                  className="border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-blue-500" />
              </div>
              <textarea name="message" value={form.message} onChange={handleChange} rows={4}
                placeholder="Tell us your requirement..."
                className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none resize-none focus:border-blue-500" />
              <div className="flex gap-3">
                <button onClick={handleSubmit}
                  className="flex-1 bg-[#2F73D9] text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition">
                  Schedule a Visit
                </button>
                <a href="tel:+919818764200"
                  className="flex-1 border border-[#2F73D9] text-[#2F73D9] font-semibold py-3 rounded-lg text-center hover:bg-blue-50 transition">
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}