import { useState } from "react";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import readyToMove from "../Images/ready_to_move.svg";
import areaSize from "../Images/area_size.svg";
import stairs from "../Images/stairs_2.svg";
import parking from "../Images/Parking.svg";
import powerBackup from "../Images/power_backup.svg";
import call from "../Images/call.svg";
import whatsapp from "../Images/whatsapp.svg";
import calendar_month from "../Images/calendar_month.svg";

// ─── Real property data from API ───────────────────────────────────────────
const property = {
  _id: "6a1acf41b5d3ef5279566de8",
  spid: "66de8",
  projectname: "Golden I",
  description: "This is a premium Commercial Office Space located at Golden I, one of the most sought-after commercial destinations in Greater Noida. The property offers a modern, well-ventilated work environment with high ceiling height, false ceiling lighting, and piped-gas connectivity. Situated on the 3rd floor of a 5-floor building, it features excellent road-facing visibility, ample parking, and a professional reception area. Surrounded by top schools, hospitals, metro access, and retail markets, it's ideal for corporates and startups alike.",
  price: "10000000",
  buildarea: "1200",
  carpetarea: "920",
  superBuildUParia: 2120,
  floor: "3",
  totalfloor: "5",
  furnishing: "Un-furnished",
  propertyType: "office",
  commercialType: "Office Space",
  property: "commercial",
  purpose: "sell",
  availabestatus: "Ready to move",
  propertyage: "1-5 years",
  propertyfacing: "East",
  ownership: "Freehold",
  reraStatus: "Not Available",
  pobackup: "Full",
  parking: "Available",
  coveredparking: 0,
  uncoveredparking: 0,
  numCabin: "2",
  numSets: "15",
  maxnumSets: "20",
  mettingRoom: "1",
  pantry: "Private",
  recptionarea: "Available",
  choiseConfrance: "Available",
  choiseWashroom: "Available",
  privateWashroom: 2,
  publicWashroom: 2,
  road_width: "22",
  watersource: ["Municipal corporation", "Borewell/Tank", "24*7 water"],
  saftyFeature: ["Fire Extinguisher", "Sprinklers", "Fire House"],
  selectedPricing: "All inclusive Price",
  createdAt: "2026-05-30T11:51:29.551Z",
  location: [{
    City: "Noida",
    Address: "GOLDEN I, Plot No. 11, Sector-Tech Zone IV, Amrapali Leisure Valley, Greater Noida, Uttar Pradesh 201318, India",
  }],
  owner: { name: "INDIADEALSS", mobile: "+917906518272" },
  images: [
    { src: "https://d3eoh63gynpjzh.cloudfront.net/brandsdoor/1780142676990-1.jpg", type: "cover" },
    { src: "https://d3eoh63gynpjzh.cloudfront.net/brandsdoor/1780142679733-2.jpg", type: "banner" },
    { src: "https://d3eoh63gynpjzh.cloudfront.net/brandsdoor/1780142682774-5.jpg", type: "Photos" },
    { src: "https://d3eoh63gynpjzh.cloudfront.net/brandsdoor/1780142687159-7.jpg", type: "Photos" },
  ],
  Buldingfeature: [
    { name: "Children's Play Area", icon: "https://d3eoh63gynpjzh.cloudfront.net/brandsdoor/1775630058426-kids_play_area.png" },
    { name: "Jogging Track", icon: "https://d3eoh63gynpjzh.cloudfront.net/brandsdoor/1775630007263-jogging_track.png" },
    { name: "Rock Climbing Wall", icon: "https://d3eoh63gynpjzh.cloudfront.net/brandsdoor/1775629989871-rock_climbing_wall.png" },
    { name: "Landscape Garden", icon: "https://d3eoh63gynpjzh.cloudfront.net/brandsdoor/1775629958707-landscape_garden.png" },
    { name: "Badminton Court", icon: "https://d3eoh63gynpjzh.cloudfront.net/brandsdoor/1775629912479-badminton_court.png" },
    { name: "Club", icon: "https://d3eoh63gynpjzh.cloudfront.net/brandsdoor/1775629828953-club.png" },
    { name: "Swimming Pool", icon: "https://d3eoh63gynpjzh.cloudfront.net/brandsdoor/1765889910936-swimming.png" },
    { name: "Fitness Centre /Gym", icon: "https://d3eoh63gynpjzh.cloudfront.net/brandsdoor/1765889761554-gym.png" },
    { name: "Shopping Center", icon: "https://d3eoh63gynpjzh.cloudfront.net/brandsdoor/1765889625782-placeholder%20%281%29.png" },
  ],
  amenitie: [
    { name: "Lift(s)", icon: "https://d3eoh63gynpjzh.cloudfront.net/brandsdoor/1765817409969-elevator.png" },
    { name: "Intercom Facility", icon: "https://d3eoh63gynpjzh.cloudfront.net/brandsdoor/1765817387759-intercom.png" },
    { name: "Park", icon: "https://d3eoh63gynpjzh.cloudfront.net/brandsdoor/1765817305635-park.png" },
    { name: "Feng Shui / Vaastu Compliant", icon: "https://d3eoh63gynpjzh.cloudfront.net/brandsdoor/1765817280980-download%20%281%29.png" },
    { name: "Visitor Parking", icon: "https://d3eoh63gynpjzh.cloudfront.net/brandsdoor/1765798076846-placeholder.png" },
    { name: "Security/Fire Alarm", icon: "https://d3eoh63gynpjzh.cloudfront.net/brandsdoor/1765798023387-fire-alarm.png" },
    { name: "Water Storage", icon: "https://d3eoh63gynpjzh.cloudfront.net/brandsdoor/1765797995862-tank.png" },
    { name: "Maintenance Staff", icon: "https://d3eoh63gynpjzh.cloudfront.net/brandsdoor/1765797958066-mechanic.png" },
  ],
  propertyfeature: [
    { name: "Internet / wi-fi connectivity", icon: "https://d3eoh63gynpjzh.cloudfront.net/brandsdoor/1765817755574-wifi.png" },
    { name: "Piped-gas", icon: "https://d3eoh63gynpjzh.cloudfront.net/brandsdoor/1765817668923-pipe.png" },
    { name: "False Ceiling Lighting", icon: "https://d3eoh63gynpjzh.cloudfront.net/brandsdoor/1765817606743-ceiling-lamp.png" },
    { name: "High Ceiling Height", icon: "https://d3eoh63gynpjzh.cloudfront.net/brandsdoor/1765817548418-ceiling.png" },
  ],
  addFeature: [
    { name: "Rain Water Harvesting", icon: "https://cdn.brandsdoor.in/indiadealss/indiadealss/1765818650204-rain-water.png" },
    { name: "No open drainage around", icon: "https://cdn.brandsdoor.in/indiadealss/indiadealss/1765818594088-plumbing.png" },
    { name: "Waste Disposal", icon: "https://cdn.brandsdoor.in/indiadealss/indiadealss/1765818493107-waste.png" },
    { name: "Separate entry for servant room", icon: "https://cdn.brandsdoor.in/indiadealss/indiadealss/1765818440637-room-service.png" },
  ],
  otherrooms: [
    { name: "Study Room", icon: "https://d3eoh63gynpjzh.cloudfront.net/brandsdoor/1765797745151-book.png" },
  ],
  locatadvance: [
    { name: "Close to Metro Station", type: "metro", propertyName: "Sector 51 Metro Station", distance: "5 Km" },
    { name: "Close to School", type: "school", propertyName: "OM Public School", distance: "2.5 Km" },
    { name: "Close to Hospital", type: "hospital", propertyName: "AIMS", distance: "5 Km" },
    { name: "Close to Market", type: "market", propertyName: "Zudio", distance: "2.4 Km" },
  ],
  faq: [{ question: "Why you should consider Golden I?", answer: [] }],
};

const SIMILAR = [
  { img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&auto=format&fit=crop", name: "Stellar IT Park", location: "Sector 62, Noida", price: "₹85 L", area: "1100 sq.ft", type: "Office Space", status: "FOR SALE" },
  { img: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&auto=format&fit=crop", name: "Wave One Tower", location: "Sector 18, Noida", price: "₹1.2 Cr", area: "1600 sq.ft", type: "Office Space", status: "FOR RENT" },
  { img: "https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=400&auto=format&fit=crop", name: "The Headquarters", location: "Alpha 1, Greater Noida", price: "₹72 L", area: "980 sq.ft", type: "Office Space", status: "FOR SALE" },
  { img: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=400&auto=format&fit=crop", name: "Gaur City Centre", location: "Greater Noida West", price: "₹95 L", area: "1350 sq.ft", type: "Office Space", status: "FOR LEASE" },
];

const DOCS = [
  { label: "RERA Certificate", size: "1.2 MB" },
  { label: "Floor Plan", size: "3.4 MB" },
  { label: "Property Tax Receipt", size: "0.9 MB" },
  { label: "Brochure", size: "5.0 MB" },
];

const locationTypeIcon = { metro: "🚇", school: "🏫", hospital: "🏥", market: "🛒" };

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
        <div className="flex items-center justify-between px-5 py-4 ">
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
      <h2 className="heading-h6 text-gray-800  tracking-wide ">Location</h2>
      <div className="flex flex-col md:flex-row gap-3 rounded-md py-4">
        <div className=" rounded-md overflow-hidden min-h-40 w-[500px]">
          <iframe
          title="map"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          src={`https://www.google.com/maps?q=${encodedAddr}&z=15&output=embed`}
          className="rounded-md"
        />
        </div>
        <div className="flex-1  border border-color p-4 rounded-md ">
          <p className="font-bold text-sm">Amenities</p>
          <ul className="space-y-3 py-3">
            {locatadvance?.map((loc, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="flex justify-between w-full">
                  <p className="text-xs font-semibold text-[#515151]">{loc.propertyName}</p>
                  <p className="text-xs font-bold text-gray-800">{loc.distance}</p>
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
    <div className="flex flex-col items-center gap-2   border border-[#E6E6E6] rounded-lg py-3 transition-colors cursor-default text-center">
      <img src={icon} alt={label} className="w-8 h-8 object-contain" onError={e => { e.target.style.display = "none"; }} />
      <span className="text-[11px] text-[#6E6E6E] font-medium leading-tight">{label}</span>
    </div>
  );
}

export default function PropertyDetailsPage() {
  const [activeImg, setActiveImg] = useState(0);
  const [showMore, setShowMore] = useState(false);
  const [saved, setSaved] = useState(false);
  const [emiOpen, setEmiOpen] = useState(false);
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  const [tab, setTab] = useState("building");

  const imgs = property.images;
  const addr = property.location[0];
  const priceNum = parseInt(property.price);
  const pricePerSqft = Math.round(priceNum / parseInt(property.buildarea));
  const emi = Math.round((priceNum * 0.8 * 0.085) / 12 / (1 - Math.pow(1 + 0.085 / 12, -240)));

  const allAmenities = [...property.amenitie, ...property.propertyfeature];
  const visibleAmenities = showAllAmenities ? allAmenities : allAmenities.slice(0, 8);

  const buildingFeatures = property.Buldingfeature;
  const addFeatures = property.addFeature;

  const descShort = property.description.slice(0, 220);

  const statusColor = { "FOR SALE": "bg-[#2F73D9] text-white", "FOR RENT": "bg-[#24B15A] text-white", "FOR LEASE": "bg-orange-500 text-white" };

  return (
    <div className="min-h-screen" >
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
                <span className={i === arr.length - 1 ? "text-[#2F73D9] font-semibold" : " transition-colors"}>
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

            {/* MEDIA SECTION */}
            <div className="fade-up fade-up-1  rounded overflow-hidden">
              <div className="flex flex-col md:flex-row gap-0">
                {/* Hero image */}
                <div className="relative flex-1 h-64 sm:h-80 rounded md:h-[380px] group">
                  <img
                    key={activeImg}
                    src={imgs[activeImg]?.src}
                    alt="Property"
                    className="w-full h-full object-cover transition-opacity duration-300 rounded"
                    style={{ animation: "fadeUp 0.3s ease both" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                  {/* Arrows */}
                  <button onClick={() => setActiveImg((p) => (p - 1 + imgs.length) % imgs.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full backdrop-blur-md bg-black/40 cursor-pointer  flex items-center justify-center shadow-md text-white font-bold transition-opacity text-lg leading-none">
                    <ChevronLeft size={18} />
                  </button>
                  <button onClick={() => setActiveImg((p) => (p + 1) % imgs.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full backdrop-blur-md bg-black/40 cursor-pointer flex items-center justify-center shadow-md text-white font-bold transition-opacity text-lg leading-none">
                    <ChevronRight size={18} />
                  </button>
                  {/* Top badges */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="bg-[#24B15A] text-white text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
                      {property.availabestatus}
                    </span>
                    <span className="bg-[#2F73D9] text-white text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
                      For Sale
                    </span>
                  </div>
                  {/* Top right */}
                  <div className="absolute top-3 right-3 flex gap-2">
                    <button onClick={() => setSaved(!saved)} className={`w-8 h-8 rounded-full flex items-center justify-center shadow text-sm transition-all cursor-pointer ${saved ? "bg-red-500 text-white scale-110" : "bg-white/90 text-gray-500 hover:bg-white"}`}>
                      {saved ? "♥" : "♡"}
                    </button>
                   </div>
                  {/* Count */}
                  <span className="absolute bottom-3 right-3 bg-black/60 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full">
                    {activeImg + 1} / {imgs.length}
                  </span>
                </div>
                {/* Vertical thumbnails */}
                <div className="flex md:flex-col flex-row gap-1.5 p-2 overflow-x-auto md:overflow-y-auto hide-scroll" style={{ maxHeight: 380, width: "auto" }}>
                  {imgs.map((img, i) => (
                    <button key={i} onClick={() => setActiveImg(i)}
                      className={`flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-150 ${activeImg === i ? "border-[#2F73D9] ring-2 ring-blue-200" : "border-transparent hover:border-gray-300"}`}
                      style={{ width: 100, height: 74 }}>
                      <img src={img.src} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                  {/* +20 indicator */}
                  <div className="flex-shrink-0 rounded-lg bg-black/60 flex items-center justify-center text-white font-bold text-sm cursor-pointer hover:bg-black/70 transition-colors"
                    style={{ width: 100, height: 74 }}>
                    +20
                  </div>
                </div>
              </div>
            </div>

            {/* PROPERTY HEADER */}
            <div className="fade-up fade-up-2  rounded-xl border border-[#E6E6E6] p-5">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className="bg-[#E8F7EC] text-[#24B15A] text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase">{property.commercialType}</span>
                    <span className="bg-blue-50 text-[#2F73D9] text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase">{property.ownership}</span>
                    <span className="bg-gray-100 text-[#6E6E6E] text-[11px] font-semibold px-2.5 py-0.5 rounded-full">{property.propertyfacing} Facing</span>
                  </div>
                  <h1 className="text-xl sm:text-2xl font-extrabold text-[#1F1F1F] leading-tight tracking-tight">
                    {property.commercialType} in <span className={property.projectname !== "" ? "" : "hidden"}>{property.projectname},</span> <span className={property.projectname !== "" ? "hidden" : ""}>{addr.City}</span>
                  </h1>
                  <div className="flex items-start gap-1.5 mt-2 text-[#6E6E6E] text-sm">
                    <span className=""><MapPin size={18} /></span>
                    <span className="leading-snug">{addr.Address}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* PROPERTY FEATURES GRID */}
            <div className="fade-up fade-up-2 bg-white rounded-xl border border-[#E6E6E6] p-5">
              <h2 className="text-[15px] font-bold text-[#1F1F1F] mb-4 tracking-tight">Property Features</h2>
              <div className="flex gap-3 justify-items-start">
                {[
                  { icon: areaSize, label: "Build Area", val: `${property.buildarea} sq.ft` },
                  { icon: areaSize, label: "Carpet Area", val: `${property.carpetarea} sq.ft` },
                  { icon: stairs, label: "Floor", val: `${property.floor}rd / ${property.totalfloor}` },
                  { icon: parking, label: "Parking", val: property.parking },
                  { icon: powerBackup, label: "Power Backup", val: property.pobackup },
                  { icon: readyToMove, label: "Status", val: property.availabestatus },
                ].map((f) => (
                  <div key={f.label} className="flex flex-col w-[max-content] items-center justify-center  border border-[#E6E6E6] rounded-lg py-1 px-4 text-center transition-colors cursor-default gap-1">
                    <span className="text-2xl"><img src={f.icon} className="w-5 h-5" /></span>
                    <span className="text-xs font-bold text-[#1F1F1F] leading-tight">{f.val}</span>
                    <span className="text-[10px] text-[#6E6E6E]">{f.label}</span>
                  </div>
                ))}
              </div>
              {/* Office specs row */}
              <div className="mt-4 flex gap-2.5">
                {[
                  { label: "Cabins", val: property.numCabin },
                  { label: "Seats", val: `${property.numSets} (max ${property.maxnumSets})` },
                  { label: "Meeting Rooms", val: property.mettingRoom },
                  { label: "Washrooms", val: `${property.privateWashroom} Pvt + ${property.publicWashroom} Pub` },
                ].map((s) => (
                  <div key={s.label} className=" rounded-lg px-3 py-2.5 border border-blue-100">
                    <div className="text-[10px] text-[#6E6E6E] mb-0.5">{s.label}</div>
                    <div className="text-sm font-bold text-[#1F1F1F] text-center">{s.val}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* ABOUT PROPERTY */}
            <Section title="About this property">
              <p className="text-sm text-[#6E6E6E] leading-relaxed">
                {showMore ? property.description : descShort + (property.description.length > 220 ? "..." : "")}
                {property.description.length > 220 && (
                  <button onClick={() => setShowMore(!showMore)} className="ml-1 text-[#2F73D9] font-semibold hover:underline text-sm">
                    {showMore ? "View Less" : "View More"}
                  </button>
                )}
              </p>
              {/* Property features chips */}
              
            </Section>

            {/* AMENITIES */}
            <div className="bg-white rounded-xl border border-[#E6E6E6] overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 ">
                <h2 className="text-[15px] font-bold text-[#1F1F1F] tracking-tight">Amenities</h2>
                <button onClick={() => setShowAllAmenities(!showAllAmenities)} className="text-xs font-semibold text-[#2F73D9] hover:underline">
                  {showAllAmenities ? "View Less" : "View All"}
                </button>
              </div>
              <div className="px-5 pb-5">
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
                  {(property.amenitie).map(a => <FeatureTag key={a.name} icon={a.icon} label={a.name} />)}
                </div>
              </div>
            </div>

            {/* LOCATION */}
            <div className="rounded-xl  px-5 py-4 border border-gray-200">
              <LocationSection locatadvance={property.locatadvance} address={property.location?.[0]?.Address} />
            </div>

            {/* LISTING DETAILS */}
            

            {/* DOCUMENTS */}
            <Section title="Property Documents" action="View All Documents">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {DOCS.map(doc => (
                  <div key={doc.label} className="flex items-center gap-3  rounded-lg px-4 py-3 border border-[#E6E6E6] hover:border-[#2F73D9] /30 transition-all group">
                    <span className="text-2xl">📄</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-[#1F1F1F] truncate">{doc.label}</div>
                      <div className="text-[11px] text-[#6E6E6E]">{doc.size}</div>
                    </div>
                    <button className="text-[11px] bg-[#2F73D9] text-white font-bold px-3 py-1.5 rounded-lg hover:bg-blue-700 transition">↓</button>
                  </div>
                ))}
              </div>
            </Section>

            {/* SIMILAR PROPERTIES */}
            <div className="bg-white rounded-xl border border-[#E6E6E6] overflow-hidden">
              <div className="px-5 py-4 ">
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

          </div>

          {/* ══ RIGHT SIDEBAR ══ */}
          <div className="xl:w-[400px] shrink-0">
            <div className="xl:sticky xl:top-25 space-y-4">

              {/* PRICE CARD */}
              <div className="bg-white rounded-xl border border-[#E6E6E6] overflow-hidden shadow-sm fade-up fade-up-3">
                {/* Price header */}
                <div className="flex justify-between p-5">
                  <div>
                  <div className="text-[11px]  font-bold uppercase tracking-widest mb-1">Property Price</div>
                  <div className="text-3xl font-extrabold color-blue tracking-tight">{formatPrice(property.price)}</div>
                  <div className=" text-sm mt-0.5">₹{pricePerSqft.toLocaleString("en-IN")} / Sq.Ft</div>
                  </div>
                  <div className="flex flex-col  gap-2 mt-2.5">
                    <span className="bg-[#24B15A]/20 text-[#24B15A] text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-[#24B15A]/30">Negotiable</span>
                    <span className="bg-blue-500/20 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-blue-500/30">{property.selectedPricing}</span>
                  </div>
                </div>

                {/* EMI */}
                <div className="px-5 py-4  ">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[11px] text-[#6E6E6E]">EMI Starts At</div>
                      <div className="text-lg font-extrabold text-[#1F1F1F]">₹{emi.toLocaleString("en-IN")} / Month</div>
                    </div>
                    <button onClick={() => setEmiOpen(!emiOpen)}
                      className="text-[11px] text-[#2F73D9] font-bold border border-[#2F73D9] px-3 py-1.5 rounded-lg  transition">
                      EMI Calculator
                    </button>
                  </div>
                  {emiOpen && (
                    <div className="shadow-md">
                    <div className="mt-3 bg-white rounded-lg border border-[#E6E6E6] p-3 space-y-2 text-xs text-[#6E6E6E]">
                      <div className="flex justify-between"><span>Loan Amount (80%)</span><span className="font-bold text-[#1F1F1F]">₹{Math.round(priceNum * 0.8).toLocaleString("en-IN")}</span></div>
                      <div className="flex justify-between"><span>Interest Rate</span><span className="font-bold text-[#1F1F1F]">8.5% p.a.</span></div>
                      <div className="flex justify-between"><span>Tenure</span><span className="font-bold text-[#1F1F1F]">20 Years</span></div>
                      <div className="flex justify-between border-t border-[#E6E6E6] pt-2 mt-1"><span className="font-semibold text-[#1F1F1F]">Monthly EMI</span><span className="font-extrabold text-[#2F73D9]">₹{emi.toLocaleString("en-IN")}</span></div>
                    </div>
                    </div>
                  )}
                </div>

                {/* Property info table */}
                <div className="px-5 py-4  space-y-2.5">
                  {[
                    { label: "Property For", val: property.purpose === "sell" ? "Sale" : property.purpose },
                    { label: "Property Type", val: property.commercialType },
                    { label: "Furnishing", val: property.furnishing },
                    { label: "Age Of Property", val: property.propertyage },
                    { label: "RERA ID", val: property.reraStatus },
                  ].map(row => (
                    <div key={row.label} className="flex justify-between items-center text-sm">
                      <span className="text-[#6E6E6E]">{row.label}</span>
                      <span className="font-semibold text-[#1F1F1F] text-right max-w-[55%] truncate">{row.val}</span>
                    </div>
                  ))}
                </div>

                {/* CTAs */}
                <div className="p-5 space-y-2.5">
                  <button className="w-full bg-[#2F73D9]  text-white font-bold py-3.5 rounded-xl text-sm transition-all shadow-sm flex items-center justify-center gap-2">
                    <img src={call} className="w-5 h-5" alt="BRANDSDOOR" /> Contact Seller
                  </button>
                  <button className="w-full bg-[#24B15A] cursor-pointer text-white font-bold py-3.5 rounded-xl text-sm transition-all shadow-sm flex items-center justify-center gap-2">
                    <img src={whatsapp} className="w-5 h-5" alt="WHATSAPP" /> WhatsApp
                  </button>
                  <button className="w-full border-2 border-[#2F73D9] text-[#2F73D9] cursor-pointer font-bold py-3.5 rounded-xl text-sm transition-all flex items-center justify-center gap-2">
                    <img src={calendar_month} className="w-5 h-5" alt="Contact US" /> Schedule Site Visit
                  </button>
                </div>
              </div>

              {/* AGENT CARD */}
              <div className="bg-white rounded-xl border border-[#E6E6E6] p-5 fade-up fade-up-4">
                <h3 className="text-[13px] font-bold text-[#1F1F1F] mb-4 uppercase tracking-wider">Agent Information</h3>
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-blue-100 shrink-0">
                    <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&auto=format&fit=crop" alt="Agent" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="font-extrabold text-[#1F1F1F] text-sm">Rahul Yadav</div>
                    <div className="text-[11px] text-[#6E6E6E]">Property Consultant</div>
                    <div className="text-[11px] text-[#001A2D] font-semibold">Brandsdoor Agent</div>
                    <div className="flex items-center gap-1 mt-0.5">
                      {[1,2,3,4,5].map(s => <span key={s} className={`text-xs ${s <= 4 ? "text-yellow-400" : "text-gray-300"}`}>★</span>)}
                      <span className="text-[10px] text-[#6E6E6E] ml-1">4.8 · 120 Reviews</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <button className="flex-1 bg-[#2F73D9] text-white text-xs font-bold py-2.5 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-1">
                    📞 Call Now
                  </button>
                  <button className="flex-1 bg-[#24B15A] text-white text-xs font-bold py-2.5 rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-1">
                    💬 WhatsApp
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      

      {/* ── MOBILE BOTTOM CTA ── */}
      <div className="xl:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-[#E6E6E6] px-4 py-3 flex gap-2.5 shadow-2xl">
        <button className="flex-1 bg-[#2F73D9] text-white font-bold py-3 rounded-xl text-sm transition">📞 Contact</button>
        <button className="flex-1 bg-[#24B15A] text-white font-bold py-3 rounded-xl text-sm transition">💬 WhatsApp</button>
        <button className="flex-1 border-2 border-[#2F73D9] text-[#2F73D9] font-bold py-3 rounded-xl text-sm transition">🗓 Visit</button>
      </div>

      <div className="xl:hidden h-20" />
    </div>
  );
}