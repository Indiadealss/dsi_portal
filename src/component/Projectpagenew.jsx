import { useEffect, useState } from "react";
import {
  MapPin, Heart, Share2, ChevronLeft, ChevronRight,
  Download, Phone, Calendar, CheckCircle, Home, Info,
  Building2, Ruler, Zap, Car, Droplets, Shield,
  Trees, Dumbbell, ShoppingBag, Waves, PlayCircle,
  Activity, Mountain, AlignJustify, Building,
  X, ZoomIn, Play, Star
} from "lucide-react";
import PdfSlider from "./customcomponent/PdfSlider";
import dobuleBad from "../Images/Group_454.svg";
import area from "../Images/Group_455.svg";
import Status from "../Images/Group_456.svg";
import buldingIcon from "../Images/Group_457.svg";
import {
  Bath,
  Compass,
} from "lucide-react";
import { createLead, createLeadMessage, getCampainbyId, getPropertyByRera } from "../api/api";
import { useParams } from "react-router-dom";
import Unitsavailble from "./customcomponent/Unitsavailble";
import { useDispatch } from "react-redux";
import { setProperty } from "./Redux/propertyidSlice";
import Seo from "./Seo";
import Leadgentaionform from "./customcomponent/Leadgentaionform";



// ─── PASTE YOUR BACKEND DATA HERE ───────────────────────────────────────────
const propertyDatas = {
  _id: "69e8b8e4a70326c0f7f4d06a",
  projectname: "PURVANCHAL ROYAL ATLANTIS",
  projecttitle: "Purvanchal Royal Atlantis Lucknow, Gomti Nagar, 4BHK Flats",
  projectdeveloper: "Purvanchal Group",
  price: "40 L - 2 Cr",
  availabestatus: "Ready to move",
  propertyType: ["1 Bhk", "2 Bhk", "Studio Appartment"],
  rera: "UPRERAPRJ546517/07/2024",
  reraStatus: "Available",
  propertyage: "5-10 years",
  propertyfacing: "North-East",
  furnishing: "Un-furnished",
  coveredparking: 1,
  uncoveredparking: 1,
  pobackup: "Full",
  projectTotalFloor: "22",
  ownership: "Leasehold",
  road_width: "22",
  watersource: ["Municipal corporation", "Borewell/Tank", "24*7 water"],
  location: [
    {
      City: "Lucknow",
      Address:
        "PURVANCHAL ROYAL ATLANTIS, C.G City, Plot No. F-7, Chak Ganajaria, Lucknow, Ahmamau, Uttar Pradesh 226002, India",
    },
  ],
  description: `Purvanchal Royal Atlantis Phase 1 is an under construction, RERA registered, residential society in Gomti Nagar Extension, Lucknow. The project is being developed by Purvanchal Projects and is scheduled for completion in 2029. The Gomti Nagar Extension area is a rapidly developing pocket of Lucknow and known for its upscale, high-end projects. It offers proximity to renowned schools, hospitals and malls with global brands.

**Project Features**
Purvanchal Royal Atlantis Phase 1 has a sprawling campus surrounded by lush, landscaped greenery and wide internal roads. The society is 20 minutes away from the Chaudhary Charan Singh International Airport, Charbagh Railway Station, Purvanchal Expressway and Indira Nagar Metro Station. The homes in Purvanchal Royal Atlantis have a spacious 4-BHK configuration. The sizes of the flats are 2955 sq. ft. All units are open on 4 sides with 360° views and ventilation.`,
  faq: [
    {
      question: "Why you should consider PURVANCHAL ROYAL ATLANTIS?",
      answer: [
        "Developed by Purvanchal Projects, a firm known for delivering successful projects in Noida and Greater Noida.",
        "Located in the upscale location of Sector 7, Gomti Nagar Extension.",
        "Spacious 4-BHK configurations measuring 2955 sq. ft.",
        "All units are open on 4 sides with 360° views and ventilation.",
        "Wellness facilities like open terrace spaces, yoga zone, sauna, steam room and landscaped areas.",
      ],
    },
  ],
  images: [
    { src: "https://d3eoh63gynpjzh.cloudfront.net/brandsdoor/1776861146640-1.jpg", type: "cover" },
    { src: "https://d3eoh63gynpjzh.cloudfront.net/brandsdoor/1776861148448-2.jpg", type: "general" },
    { src: "https://d3eoh63gynpjzh.cloudfront.net/brandsdoor/1776861149035-3.jpg", type: "general" },
    { src: "https://d3eoh63gynpjzh.cloudfront.net/brandsdoor/1776861149592-4.jpg", type: "general" },
    { src: "https://d3eoh63gynpjzh.cloudfront.net/brandsdoor/1776861150092-5.jpg", type: "general" },
    { src: "https://d3eoh63gynpjzh.cloudfront.net/brandsdoor/1776861151307-6.jpg", type: "general" },
    { src: "https://d3eoh63gynpjzh.cloudfront.net/brandsdoor/1776861152628-7.jpg", type: "general" },
    { src: "https://d3eoh63gynpjzh.cloudfront.net/brandsdoor/1776861155042-8.jpg", type: "general" },
    { src: "https://d3eoh63gynpjzh.cloudfront.net/brandsdoor/1776861161938-layout.jpg", type: "general" },
    {
      src: "https://d3eoh63gynpjzh.cloudfront.net/brandsdoor/1776861162399-purvanchal-royal-at.pdf",
      type: "brouser", // brochure PDF
    },
    {
      src: "https://d3eoh63gynpjzh.cloudfront.net/brandsdoor/1776861162974-TOWER_1.jpg",
      type: "layout",
      fields: [{ key: "Floor_Plan", value: "Tower 1" }],
    },
    {
      src: "https://d3eoh63gynpjzh.cloudfront.net/brandsdoor/1776861163376-Tower_2.jpg",
      type: "layout",
      fields: [{ key: "Floor_Plan", value: "Tower 2" }],
    },
    {
      src: "https://d3eoh63gynpjzh.cloudfront.net/brandsdoor/1776861163621-Tower1&2_1BHK.jpg",
      type: "layout",
      fields: [
        { key: "Floor_Plan", value: "1 BHK" },
        { key: "carpet_area", value: "570 sqft" },
        { key: "Price", value: "6000000" },
      ],
    },
    {
      src: "https://d3eoh63gynpjzh.cloudfront.net/brandsdoor/1776861163918-Tower1&2_2BHK.jpg",
      type: "layout",
      fields: [
        { key: "Floor_Plan", value: "2 BHK" },
        { key: "carpet_area", value: "947.17 sqft" },
        { key: "Price", value: "9800000" },
      ],
    },
    {
      src: "https://d3eoh63gynpjzh.cloudfront.net/brandsdoor/1776861164070-Tower1&2_Studio.jpg",
      type: "layout",
      fields: [
        { key: "Floor_Plan", value: "Studio" },
        { key: "carpet_area", value: "373.43 sqft" },
        { key: "Price", value: "4000000" },
      ],
    },
    {
      src: "https://d3eoh63gynpjzh.cloudfront.net/brandsdoor/1776861164204-Tower1_3BHK.jpg",
      type: "layout",
      fields: [
        { key: "Floor_Plan", value: "3 BHK" },
        { key: "carpet_area", value: "1670 sqft" },
        { key: "Price", value: "18000000" },
      ],
    },
  ],
  video: [
    { src: "https://d3eoh63gynpjzh.cloudfront.net/brandsdoor/1776861160505-purvanchal%20atlantics.mp4" },
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
    { name: "Water softening planting", icon: "https://d3eoh63gynpjzh.cloudfront.net/brandsdoor/1765819825195-watering.png" },
  ],
  amenitie: [
    { name: "Lift(s)", icon: "https://d3eoh63gynpjzh.cloudfront.net/brandsdoor/1765817409969-elevator.png" },
    { name: "Intercom Facility", icon: "https://d3eoh63gynpjzh.cloudfront.net/brandsdoor/1765817387759-intercom.png" },
    { name: "Park", icon: "https://d3eoh63gynpjzh.cloudfront.net/brandsdoor/1765817305635-park.png" },
    { name: "Feng Shui / Vaastu Compliant", icon: "https://d3eoh63gynpjzh.cloudfront.net/brandsdoor/1765817280980-download%20%281%29.png" },
    { name: "Visitor Parking", icon: "https://d3eoh63gynpjzh.cloudfront.net/brandsdoor/1765798076846-placeholder.png" },
    { name: "Security/Fire Alarm", icon: "https://d3eoh63gynpjzh.cloudfront.net/brandsdoor/1765798023387-fire-alarm.png" },
    { name: "Water Storage", icon: "https://d3eoh63gynpjzh.cloudfront.net/brandsdoor/1765797995862-tank.png" },
  ],
  locatadvance: [
    { name: "Close to Airport", type: "airport", propertyName: "Chaudhary Charan Singh International Airport", distance: "22 Km" },
    { name: "Close to School", type: "school", propertyName: "Delhi Public School Gomti Nagar Extension", distance: "2.5 Km" },
  ],
  unitData: [
    { id: 1, specs: { bhk: "1 BHK", areaMin: "570 sqft", priceMin: "6000000" } },
    { id: 2, specs: { bhk: "2 BHK", areaMin: "947.17 sqft", priceMin: "10000000" } },
    { id: 3, specs: { bhk: "Studio", areaMin: "373.41 sqft", priceMin: "8000000" } },
    { id: 4, specs: { bhk: "3 BHK", areaMin: "1670 sqft", areaMax: "1674 sqft", priceMin: "17535000", priceMax: "18000000" } },
  ],
  owner: { name: "INDIADEALSS", mobile: "", email: "indiadealsgroup@gmail.com" },
};
// ────────────────────────────────────────────────────────────────────────────

// ── Helpers ──────────────────────────────────────────────────────────────────
const formatPrice = (val) => {
  if (!val) return "";
  const n = Number(val);
  if (n >= 10000000) return `${(n / 10000000).toFixed(2)} Cr`;
  if (n >= 100000) return `${(n / 100000).toFixed(2)} L`;
  return n.toLocaleString("en-IN");
};

const renderDescription = (text) => {
  if (!text) return null;
  return text.split("\n").map((line, i) => {
    if (line.startsWith("**") && line.endsWith("**"))
      return <p key={i} className="font-semibold text-gray-800 mt-3 mb-1">{line.replace(/\*\*/g, "")}</p>;
    if (line.startsWith("●")) return <li key={i} className="ml-4 text-gray-600 text-sm list-disc">{line.replace("●\t", "").replace("●", "")}</li>;
    return line.trim() ? <p key={i} className="text-gray-600 text-sm leading-relaxed">{line}</p> : null;
  });
};

// ── Gallery Component ─────────────────────────────────────────────────────────
function Gallery({ images, propertyData }) {
  const galleryImgs = images.filter((i) => ["cover", "general", "banner"].includes(i.type));
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [reraModal, setReraModal] = useState(false);
  const prev = () => setActive((a) => (a - 1 + galleryImgs.length) % galleryImgs.length);
  const next = () => setActive((a) => (a + 1) % galleryImgs.length);

  return (
    <div className="flex flex-col gap-2">
      {/* Main Image */}
      <div className="relative rounded-md overflow-hidden" style={{ height: 380 }}>
        <img src={galleryImgs[active]?.src} alt="property" className="w-full h-full object-cover" />
        {/* Verified Badge */}
        <div className="absolute top-3 left-3 group z-20">

          {/* Badge */}
          <div className="bg-green-500  text-white text-xs font-semibold px-3 py-1 rounded-md flex items-center gap-1 cursor-pointer" onMouseEnter={() => setReraModal(true)} onMouseLeave={() => setReraModal(false)}>
            <Info size={15} />
            Rera Approved
          </div>

          {/* Hover Modal */}
          <div className={reraModal ? "absolute top-12 left-0 w-[280px] transition-all duration-300 backdrop-blur-xl bg-white/90 border border-white/30 shadow-2xl rounded-2xl p-4 " : "hidden"}>

            <div className="flex items-start gap-3">

              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <CheckCircle size={20} className="text-green-600" />
              </div>

              <div>
                <h4 className="text-sm font-bold text-gray-800">
                  RERA Registered
                </h4>

                <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                  This property is verified and registered under the Real Estate
                  Regulatory Authority (RERA).
                </p>

                <div className="mt-3 space-y-1">
                  <p className="text-xs">
                    <span className="font-semibold text-gray-700">
                      RERA No:
                    </span>{" "}
                    {propertyData.rera}
                  </p>

                  <p className="text-xs">
                    <span className="font-semibold text-gray-700">
                      Status:
                    </span>{" "}
                    {propertyData.reraStatus}
                  </p>
                </div>
              </div>
            </div>

            {/* Arrow */}
            <div className="absolute -top-2 left-5 w-4 h-4 backdrop-blur-xl shadow-2xl bg-[#F8F6F3] rotate-45 "></div>
          </div>
        </div>
        {/* Nav Arrows */}
        <button onClick={prev} className="backdrop-blur-md absolute left-3 text-white top-1/2 -translate-y-1/2 bg-black/40 cursor-pointer rounded-full p-2 shadow">
          <ChevronLeft size={18} />
        </button>
        <button onClick={next} className="backdrop-blur-md absolute right-3 top-1/2 text-white -translate-y-1/2 bg-black/40 cursor-pointer rounded-full p-2 shadow">
          <ChevronRight size={18} />
        </button>
        {/* View Photos */}
        <button onClick={() => setLightbox(true)} className="absolute bottom-3 left-3 backdrop-blur-md bg-black/40  text-white cursor-pointer text-xs font-medium px-3 py-1.5 rounded-lg flex items-center gap-1 shadow">
          <ZoomIn size={13} /> View Photos ({galleryImgs.length})
        </button>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {galleryImgs.slice(0, 5).map((img, i) => (
          <button key={i} onClick={() => setActive(i)}
            className={`flex-shrink-0 rounded-md overflow-hidden border-2 transition-all ${active === i ? "border-blue-700" : "border-transparent"}`}
            style={{ width: 100, height: 80 }}>
            <img src={img.src} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
        {galleryImgs.length > 5 && (
          <button onClick={() => setLightbox(true)}
            className="relative flex-shrink-0 rounded-md overflow-hidden bg-black/40 text-white text-xs font-semibold flex items-center justify-center"
            style={{
              width: 100,
              height: 80,
              backgroundImage: `url(${galleryImgs[5]?.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}>
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-xs font-semibold">
              +{galleryImgs.length - 5}
            </div>
          </button>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
          <button onClick={() => setLightbox(false)} className="absolute top-4 right-4 text-white"><X size={28} /></button>
          <button onClick={prev} className="absolute left-4 text-white"><ChevronLeft size={36} /></button>
          <img src={galleryImgs[active]?.src} alt="" className="max-h-screen max-w-5xl object-contain rounded-md" />
          <button onClick={next} className="absolute right-4 text-white"><ChevronRight size={36} /></button>
          <div className="absolute bottom-4 text-white text-sm">{active + 1} / {galleryImgs.length}</div>
        </div>
      )}
    </div>
  );
}

// ── Property Info Card ────────────────────────────────────────────────────────
function InfoCard({ data, propertyData  }) {
  const [saved, setSaved] = useState(false);
  return (
    <div className=" border border-gray-200 rounded-md p-3 md:p-5  h-fit sticky top-4">
      <h1 className=" font-bold text-[#001A2D]"><span className="heading-h4 font-bold">{data.projectname}</span></h1>
      <div className="flex items-start gap-1 mt-[5px] text-[#515151] text-sm">
        <MapPin size={18} className="mt-0.5 flex-shrink-0" />
        <span>{data.location?.[0]?.Address}</span>
      </div>
      <p className="mt-[35px] text-sm text-[#001A2D]">
        Developed By
      </p>
      <p className="text-sm text-[#1D85DB] font-medium">
        {data.projectdeveloper}
      </p>

      <div className="mt-[35px]">
        <p className="text-xs uppercase tracking-wide font-medium text-[#001A2D]"><span className="font-bold">Starting From</span></p>
        <p className="text-lg md:text-4xl font-bold text-[#1D85DB] mt-0.5">{data.price}<sup>*</sup></p>
      </div>

      {/* Unit type chips */}
      <div className="mt-[35px]">
        <p className="text-xs tracking-wide font-medium mb-2"><span className="font-bold">Size Availble</span></p>
        <div className={ propertyData.property === "commercial" ? "hidden" : "flex flex-wrap gap-2 mt-[0.5px]"}>
          {data.unitData?.map((u) => (
            <span key={u.id} className="text-center border border-gray-300 bg-[#E8F5FF] text-[#001A2D] text-sm font-bold px-3 py-1.5 rounded-md">
              {u.specs.bhk} <br />
              <span className="text-xs font-medium text-center text-[#515151]"> Apartment </span>
            </span>
          ))}
        </div>

        <div className={ propertyData.property === "commercial" ? "flex flex-wrap gap-2 mt-[0.5px]" : "hidden"}>
          {data.officeUnits?.map((u) => (
            <span key={u.name} className="text-center border border-gray-300 bg-[#E8F5FF] text-[#001A2D] text-sm font-bold px-3 py-1.5 rounded-md">
              {u.name} <br />
            </span>
          )) }
        </div>
      </div>

      <div className="flex gap-3 mt-[35px]">
        <button onClick={() => setSaved(!saved)}
          className={`flex-1 flex items-center justify-center gap-2 border rounded-lg py-2.5 text-sm font-medium transition-all ${saved ? "bg-red-50 border-red-300 text-red-600" : "border-gray-300 text-gray-600 hover:border-gray-400"}`}>
          <Heart size={16} fill={saved ? "currentColor" : "none"} /> {saved ? "Saved" : "Save Property"}
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 border border-gray-300 text-gray-600 rounded-md py-2.5 text-sm font-medium hover:border-gray-400 transition-all">
          <Share2 size={16} /> Share
        </button>
      </div>

      {/* RERA
      {data.rera && (
        <div className="mt-4 bg-blue-50 rounded-md px-3 py-2 text-xs text-blue-700">
          <span className="font-semibold">RERA:</span> {data.rera}
        </div>
      )} */}
    </div>
  );
}

// ── Highlight Cards ───────────────────────────────────────────────────────────
function Highlights({ data }) {
  const items = [
    { icon: <img src={dobuleBad} size={18} className="text-blue-600 w-10 h-10" />, label: "Configuration", value: data.unitData?.map((u) => u.specs.bhk).join(", ") || data.propertyType?.join(", ") },
    { icon: <img src={area} size={18} className="text-blue-600 w-10 h-10" />, label: "Area (Sq.Ft.)", value: data.unitData?.[0]?.specs?.areaMin ? `${data.unitData[0].specs.areaMin}+` : "—" },
    { icon: <img src={Status} size={18} className="text-blue-600 w-10 h-10" />, label: "Status", value: data.availabestatus },
    { icon: <img src={buldingIcon} size={18} className="text-blue-600 w-10 h-10" />, label: "Property Type", value: data.property ? data.property.charAt(0).toUpperCase() + data.property.slice(1) + " Apartment" : "Residential Apartment" },
  ];
  return (
    <div className="flex flex-wrap gap-3">
      {items.map((item, i) => (
        <div key={i} className="bg-white border border-gray-200 rounded-md px-[12px] py-2 flex items-center gap-3">
          <div className="flex-shrink-0">{item.icon}</div>
          <div>
            <p className="text-xs text-gray-500">{item.label}</p>
            <p className="text-sm font-semibold text-gray-800 mt-0.5">{item.value || "—"}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── About Section ─────────────────────────────────────────────────────────────
function AboutSection({ data }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      <h2 className="text-lg font-bold text-gray-800 uppercase tracking-wide mb-3 heading-h6"><span className="font-bold"> About Property</span></h2>
      <div className={`overflow-hidden transition-all text-justify ${expanded ? "" : "max-h-40"}`}>
        {renderDescription(data.description)}
      </div>
      <button onClick={() => setExpanded(!expanded)}
        className="cursor-pointer mt-3 text-blue-600 border border-blue-600 text-sm font-medium px-4 py-1.5 rounded-md hover:bg-blue-50 transition-all">
        {expanded ? "View Less" : "View More"}
      </button>
    </div>
  );
}

// ── Floor Plan & Brochure ─────────────────────────────────────────────────────
function FloorPlanBrochure({ images, propertyData,setLeadModel, cachedPdf}) {
  const [tab, setTab] = useState("floorplan");
  const [activeLayout, setActiveLayout] = useState(0);




  useEffect(() => {
    if (propertyData.property === "commercial") {
      setTab("brochure");
    }
  }, [propertyData.property]);

  const layouts = images.filter((i) => i.type === "layout" && i.fields?.length > 0);
  const brochurePdf = images.find((i) => i.type === "brouser");

  const activeImg = layouts[activeLayout];
  const getField = (key) => activeImg?.fields?.find((f) => f.key === key)?.value || "—";


  const hasValue = (key) => {
    const value = getField(key);

    return (
      value &&
      value !== "—" &&
      value !== "null" &&
      value !== "undefined"
    );
  };

  return (
    <div>
      <h2 className="heading-h6 text-gray-800 uppercase tracking-wide mb-3"><span className={propertyData.property === "commercial" ? "hidden" : "font-bold"}> Floor Plan &amp;</span>  Brochure</h2>

      {/* Tab Buttons */}
      <div className="flex gap-2 mb-4">
        <button onClick={() => setTab("floorplan")}
          className={`${propertyData.property === "commercial" ? "hidden" : ""} px-5 py-2 rounded-md text-sm font-medium border transition-all ${tab === "floorplan" ? "bg-blue cursor-pointer text-white border-blue-600" : "cursor-pointer bg-white text-gray-600 border-gray-300 hover:border-gray-400"}`}>
          Floor Plan
        </button>
        <button onClick={() => setTab("brochure")}
          className={`px-5 py-2 rounded-md text-sm font-medium border transition-all ${tab === "brochure" ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-600 border-gray-300 hover:border-gray-400"}`}>
          Brochure
        </button>
      </div>

      {/* FLOOR PLAN */}
      {tab === "floorplan" && layouts.length > 0 && (
        <div className="border border-gray-300 rounded-xl overflow-hidden bg-white">

          {/* BHK Tabs */}
          <div className="flex items-center gap-6 border-b border-gray-200 px-4 py-3">
            {layouts.map((l, i) => {
              const label =
                l.fields?.find((f) => f.key === "Floor_Plan")?.value ||
                `Plan ${i + 1}`;

              return (
                <button
                  key={i}
                  onClick={() => setActiveLayout(i)}
                  className={`text-[18px] font-medium pb-1 transition-all ${activeLayout === i
                      ? "text-[#1D85DB] border-b-2 border-[#1D85DB]"
                      : "text-gray-700"
                    }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Main Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr]">

            {/* LEFT IMAGE */}
            <div className="border-r border-gray-200 bg-[#FAFAFA] p-4">
              <img
                src={activeImg?.src}
                alt="Floor Plan"
                className="w-full h-full object-cover rounded-md"
              />
            </div>

            {/* RIGHT DETAILS */}
            <div className="p-6 flex flex-col">

              {/* Heading */}
              {hasValue("Floor_Plan") && (
                <h3 className="text-[20px] font-bold text-gray-800 mb-4">
                  {getField("Floor_Plan")} Apartment
                </h3>
              )}

              {/* Area */}
              {(hasValue("super_built_area") || hasValue("carpet_area")) && (
                <div className="space-y-1 border-b border-gray-200 pb-4">

                  {hasValue("super_built_area") && (
                    <div className="flex justify-between text-[18px]">
                      <span className="text-gray-600">Super Built up Area</span>
                      <span className="font-semibold text-gray-800">
                        {getField("super_built_area")}
                      </span>
                    </div>
                  )}

                  {hasValue("carpet_area") && (
                    <div className="flex justify-between text-[18px]">
                      <span className="text-gray-600">Carpet Area</span>
                      <span className="font-semibold text-gray-800">
                        {getField("carpet_area")}
                      </span>
                    </div>
                  )}

                </div>
              )}

              {/* Features */}
              <div className="flex flex-col gap-6 py-6">

                {hasValue("bedroom") && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src={dobuleBad} alt="Bedroom" size={22} className="text-[#1D85DB]" />
                      <span className="text-[18px] text-gray-700">Bedrooms</span>
                    </div>
                    <span className="text-[18px] font-medium">
                      {getField("bedroom")}
                    </span>
                  </div>
                )}

                {hasValue("bathroom") && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Bath size={22} className="text-[#1D85DB]" />
                      <span className="text-[18px] text-gray-700">Bathrooms</span>
                    </div>
                    <span className="text-[18px] font-medium">
                      {getField("bathroom")}
                    </span>
                  </div>
                )}

                {hasValue("balcony") && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Building2 size={22} className="text-[#1D85DB]" />
                      <span className="text-[18px] text-gray-700">Balcony</span>
                    </div>
                    <span className="text-[18px] font-medium">
                      {getField("balcony")}
                    </span>
                  </div>
                )}

                {hasValue("facing") && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Compass size={22} className="text-[#1D85DB]" />
                      <span className="text-[18px] text-gray-700">Facing</span>
                    </div>
                    <span className="text-[18px] font-medium">
                      {getField("facing")}
                    </span>
                  </div>
                )}

              </div>

              {/* Buttons */}
              <div className="mt-auto flex flex-col gap-3">

                {activeImg?.src && (
                  <a
                    href={activeImg?.src}
                    download
                    className="h-[50px] rounded-xl border border-[#1D85DB] text-[#1D85DB] flex items-center justify-center gap-2 text-[18px] font-medium hover:bg-blue-50 transition-all"
                  >
                    <Download size={18} />
                    Download Site Layout
                  </a>
                )}

              </div>
            </div>
          </div>
        </div>
      )}

      {tab === "brochure" && (
        <div className="flex flex-col items-start gap-4 ml-[auto] mr-[auto]">
          {cachedPdf ? (
            <div className="relative w-full max-w-2xl  rounded-xl p-8 flex flex-col items-center gap-4">
              <PdfSlider pdfUrl={cachedPdf} />
              <button onClick={() => setLeadModel(true)}
                className="absolute z-21 top-100 left-10 flex items-center gap-2 bg-blue-600 text-white text-sm font-medium px-3 py-3 rounded-full hover:bg-blue-700 transition-all">
                <Download size={24} />
              </button>
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No brochure available.</p>
          )}
        </div>
      )}
    </div>
  );
}

// ── Amenities ─────────────────────────────────────────────────────────────────
function Amenities({ features, amenities }) {
  const all = [...(features || []), ...(amenities || [])];
  return (
    <div>
      <h2 className="heading-h6 text-gray-800 uppercase tracking-wide mb-3">Amenities</h2>
      <div className="flex flex-wrap gap-3">
        {all.map((item, i) => (
          <div key={i} className="flex items-center gap-2 bg-white border border-gray-200 rounded-md px-4 py-4 text-xs text-gray-700">
            <img src={item.icon} alt={item.name} className="w-5 h-5 object-contain" onError={(e) => { e.target.style.display = "none"; }} />
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Location Advantages ───────────────────────────────────────────────────────
function LocationSection({ locatadvance, address }) {
  const encodedAddr = encodeURIComponent(address || "");
  return (
    <div>
      <h2 className="heading-h6 text-gray-800 uppercase tracking-wide mb-3">Location Advantages</h2>
      <div className="flex flex-col md:flex-row gap-6 rounded-md p-4">
        <div className="flex-1 rounded-md overflow-hidden min-h-40">
          <iframe
            title="map"
            width="100%" height="200"
            style={{ border: 0 }}
            loading="lazy"
            src={`https://maps.google.com/maps?q=${encodedAddr}&output=embed`}
            className="rounded-md"
          />
        </div>
        <div className="flex-1">
          <ul className="space-y-3">
            {locatadvance?.map((loc, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-md bg-blue-500 mt-1.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-gray-800">{loc.propertyName}</p>
                  <p className="text-xs text-gray-500">{loc.name} · {loc.distance}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// ── Unit Pricing Table ────────────────────────────────────────────────────────
function UnitTable({ unitData, propertyData }) {
  // if (!unitData?.length) return null;
  return (
    <div>
      <h2 className="heading-h6 text-gray-800 uppercase tracking-wide mb-3"><span className="font-bold">Pricing & Configurations </span></h2>
      <div className={propertyData.property === "commercial" ? "hidden" : "overflow-x-auto rounded-md border border-gray-200"}>
        <table className="w-full text-sm">
          <thead className="bg-blue-50 text-gray-700">
            <tr>
              <th className="text-left px-4 py-3 font-semibold">Type</th>
              <th className="text-left px-4 py-3 font-semibold">Area</th>
              <th className="text-left px-4 py-3 font-semibold">Price</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {unitData.map((u, i) => (
              <tr key={i} className=" transition-colors">
                <td className="px-4 py-3 font-medium text-gray-800">{u.specs.bhk}</td>
                <td className="px-4 py-3 text-gray-600">
                  {u.specs.areaMin}{u.specs.areaMax ? ` – ${u.specs.areaMax}` : ""}
                </td>
                <td className="px-4 py-3 text-blue-600 font-semibold">
                  {formatPrice(u.specs.priceMin)}{u.specs.priceMax ? ` – ${formatPrice(u.specs.priceMax)}` : ""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={propertyData.property === "commercial" ?  "" : "hidden"}>
      <Unitsavailble propertys={propertyData}/>
      </div>
    </div>
  );
}

// ── Lead Form Sidebar ─────────────────────────────────────────────────────────
function LeadForm({ owner, propertyData }) {
  const [form, setForm] = useState({ property_id: propertyData._id, projectname: propertyData.projectname, Name: "", email:"", Requirement:"", PhoneNumber: "", message: "" });
  
  console.log(propertyData.projectname, 'PropertyData is see');
  
   const [errors, setErrors] = useState({});

   console.log(form, errors);
   
   const handleChange = (e) => {
    const { name, value } = e.target;

    // Allow only numbers for phone
    if (name === "PhoneNumber") {
      if (!/^\d*$/.test(value)) return;
    }

    setForm((prev) => ({
      ...prev,
      ['property_id']: propertyData._id
    }))

    setForm((prev) => ({
      ...prev,
      ['projectname']: propertyData.projectname
    }))

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Remove error while typing
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };


  const validate = () => {
    const newErrors = {};

    // Name
    if (!form.Name.trim()) {
      newErrors.Name = "Name is required";
    } else if (form.Name.trim().length < 3) {
      newErrors.Name = "Minimum 3 characters required";
    }

    // Phone
    if (!form.PhoneNumber.trim()) {
      newErrors.PhoneNumber = "Mobile number is required";
    } else if (!/^[6-9]\d{9}$/.test(form.PhoneNumber)) {
      newErrors.PhoneNumber = "Enter a valid 10-digit mobile number";
    }

    // Email
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email)
    ) {
      newErrors.email = "Enter a valid email";
    }

    // Requirement
    if (!form.Requirement.trim()) {
      newErrors.Requirement = "Requirement is required";
    }

    // Message
    if (!form.message.trim()) {
      newErrors.message = "Message is required";
    } else if (form.message.trim().length < 10) {
      newErrors.message = "Message should be at least 10 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log(form, 'form is validation');
    
     if (!validate()) return;
    try {
      const res = await createLeadMessage(form);
      console.log(res.status, 'hee', res.status === 200);
      if (res.status === 201) {
        alert(' ✅ Enquiry submitted')
        setSubmitted(true);
      }
    } catch (error) {
      console.log(error);

    } finally {
      //   setLoading(false); // stop loader
      //   setReady(true);
      //    setLoading(false)
      //    setTimeout(() => {
      //    setSubmitted(false);
      //  }, 2000);

      setForm({
        projectname: "",
        Name: "",
        Requirement: "",
        PhoneNumber: "",
        email: "",
        message: "",
      });

    }
  };

  return (
    <div className="bg-blue-50 rounded-md p-6 border border-blue-100">
      
      <h3 className="font-bold text-gray-800 text-base mb-1">Interested In This Property?</h3>
      <p className="text-xs text-gray-500 mb-4">Fill in your details and our expert will get in touch with you shortly.</p>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col md:flex-row gap-3">
          <div>
      <p className="text-xs text-gray-500 ">{errors.Name}</p>
          <input name="Name" value={form.Name} onChange={handleChange} placeholder="Name"
            className="flex-1 bg-white border border-gray-200 rounded-md px-3 py-2.5 text-sm outline-none  transition-all" />
            </div>
            <div>
              <p className="text-xs text-gray-500 ">{errors.PhoneNumber}</p>
          <input name="PhoneNumber" value={form.PhoneNumber} onChange={handleChange} minLength={10} maxLength={10} placeholder="Mobile No."
            className="flex-1 bg-white border border-gray-200 rounded-md px-3 py-2.5 text-sm outline-none  transition-all" />
            </div>
        </div>

        <div className="flex flex-col md:flex-row gap-3">
          <div>
            <p className="text-xs text-gray-500 ">{errors.email}</p>
          <input name="email" value={form.email} onChange={handleChange} placeholder="email Id" className="flex-1 bg-white border border-gray-200 rounded-md px-3 py-2.5 text-sm outline-none transition-all" />
          </div>
          <div>
            <p className="text-xs text-gray-500 ">{errors.Requirement}</p>
          <input name="Requirement" value={form.Requirement} onChange={handleChange} placeholder="Requirements" className="flex-1 bg-white border border-gray-200 rounded-md px-3 py-2.5 text-sm outline-none transition-all" />
          </div>
        </div>
      <p className="text-xs text-gray-500 ">{errors.message}</p>
        <textarea name="message" value={form.message} onChange={handleChange} placeholder="What's on your mind?"
          rows={3} className="bg-white border border-gray-200 rounded-md px-3 py-2.5 text-sm outline-none  transition-all resize-none" />
        {/* <div className="flex gap-3 mt-1">
          <button onClick={handleSubmit}
            className="cursor-pointer flex-1 flex items-center justify-center gap-2 bg-blue .color-blue text-white text-sm font-semibold py-2.5 rounded-md transition-all">
            <Calendar size={15} /> Schedule a Visit
          </button>
          <a href={`tel:+919818764200`}
            className="cursor-pointer flex-1 flex items-center justify-center gap-2 text-white border-2 bg-blue text-blue-600 text-sm font-semibold py-2.5 rounded-md hover:bg-blue-50 transition-all">
            <Phone size={15} /> Call Now
          </a>
        </div> */}

          <button onClick={handleSubmit}
            className="cursor-pointer flex-1 flex items-center justify-center gap-2 bg-blue  text-white text-sm font-semibold py-2.5 rounded-md transition-all">
            Submit
          </button>

      </div>
    </div>
  );
}

// ── FAQ Section ───────────────────────────────────────────────────────────────
function FAQSection({ faq }) {
  if (!faq?.length) return null;
  return (
    <div>
      <h2 className="heading-h6 text-gray-800 uppercase tracking-wide mb-3">FAQs</h2>
      {faq.map((item, i) => (
        <div key={i} className="mb-4">
          <p className="font-semibold text-gray-800 mb-2">{item.question}</p>
          <ul className="space-y-1.5">
            {item.answer.map((ans, j) => (
              <li key={j} className="flex items-start gap-2 text-sm text-gray-600">
                <CheckCircle size={14} className="text-green-500 mt-0.5 flex-shrink-0" />
                {ans}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function PropertyDetailPage() {
  const [propertyData, setPropertyData] = useState(null);
  const [leadModel, setLeadModel] = useState(false);
  const [projectOwners,setprojectOwners] = useState('');
  const { slug } = useParams();
  const npxid = slug.split("npxid-")[1];


  const [cachedPdf, setCachedPdf] = useState(null);

  


  useEffect(() => {
    fetchproperty()
    getcampaindetails(npxid)
  }, [npxid]);


useEffect(() => {
    if (!propertyData?.images) return;

    const brochure = propertyData.images.find(
        (img) => img.type === "brouser"
    );

    if (!brochure?.src) return;

    fetch(brochure.src)
        .then((res) => res.blob())
        .then((blob) => {
            const blobUrl = URL.createObjectURL(blob);
            setCachedPdf(blobUrl);
        })
        .catch(console.error);

    return () => {
        if (cachedPdf) {
            URL.revokeObjectURL(cachedPdf);
        }
    };
}, [propertyData]);


  const getcampaindetails = async (npxid) => {
    try {
      const res = await getCampainbyId(npxid);
      //  console.log(res,'26');
      //  const data = res.data.data[0];
      //  console.log(data,'33');

      console.log(res, 'campaign details');

    } catch (err) {
      console.error(err);

    }
  }

    const dispatch = useDispatch();

  const fetchproperty = async () => {
    try {
      const res = await getPropertyByRera(npxid)
      const data = res.data
      console.log(data, 'property details');
      setPropertyData(data);
      setprojectOwners(data.owner.mobile)
      dispatch(setProperty(data));
    } catch (err) {
      console.error(err)
    }
  }


  if (!propertyData) {
    return <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-500 text-sm">Loading property details...</p>
    </div>
  }


  const d = propertyData;
  return (
    <div className=" min-h-screen ">
      <Seo
        title={`${d?.projecttitle || "INDIADEALS GROUP"}`}
        description={
          d?.titleDescription
            ? d.titleDescription
            : "Explore premium residential and commercial projects in India."
        }
        canonical={
          slug
            ? `https://www.indiadealsgroup.com/project/${slug}`
            : null
        }
      />
      <div className="w-full md:max-w-[1300px] mx-auto  py-4 px-4 lg:px-0">
        {/* Breadcrumb */}
        <nav className="text-[12px] curdor-default text-gray-500 mb-4 flex items-center gap-1 flex-wrap font-medium">
          {["Home", "All Project", d.location?.[0]?.City, d.availabestatus, d.projectname].map((crumb, i, arr) => (
            <span key={i} className="flex items-center gap-1">
              {crumb}
              {/* <a href="#" className={`hover:text-blue-600 ${i === arr.length - 1 ? "text-gray-800 font-medium" : ""}`}>{crumb}</a> */}
              {i < arr.length - 1 && <span className="text-gray-300">&gt;</span>}
            </span>
          ))}
        </nav>

        {/* Hero: Gallery + Info */}
        <div className="flex flex-col lg:flex-row gap-6 mb-6">
          <div className="w-full lg:w-[800px]">
            <Gallery images={d.images} propertyData={d} />
          </div>
          <div className="w-full lg:w-[800px]">
            <InfoCard data={d}  propertyData={d}/>
          </div>
        </div>

        {/* Highlights */}
        {/* <div className="mb-6">
          <Highlights data={d} />
        </div> */}

        {/* Two-column: Main Content + Sidebar */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content */}
          <div className="flex-1 flex flex-col gap-2">
            <div className="mb-6">
              <Highlights data={d} />
            </div>
            <div className="py-6 border-b border-gray-200">
              <AboutSection data={d} />
            </div>

            <div className="py-6 border-b border-gray-200">
              <UnitTable unitData={d.unitData} propertyData={d}/>
            </div>

            <div className="py-6 border-b border-gray-200">
              <FloorPlanBrochure images={d.images} propertyData={d} setLeadModel={setLeadModel} cachedPdf={cachedPdf}/>
            </div>

            <div className="py-6 border-b border-gray-200">
              <Amenities features={d.Buldingfeature} amenities={d.amenitie} />
            </div>

            <div className="py-6 border-b border-gray-200">
              <LocationSection locatadvance={d.locatadvance} address={d.location?.[0]?.Address} />
            </div>

            <div className="py-6 border-b border-gray-200">
              <FAQSection faq={d.faq} />
            </div>
          </div>

          {/* Sticky Sidebar */}
          <div className="w-full lg:w-110 flex flex-col gap-4">
            <div className="sticky top-[115px]">
              <LeadForm owner={d.owner} propertyData={d} />

              {/* Quick Info */}
              <div className="mt-4 rounded-md p-5 border border-gray-200">
                <h4 className="font-semibold text-gray-800 text-sm mb-3">Property Details</h4>
                <div className="space-y-2 text-sm  text-gray-600">
                  {[
                    ["Developer", d.projectdeveloper],
                    ["Status", d.availabestatus],
                    ["Total Floors", d.projectTotalFloor],
                    ["Facing", d.propertyfacing],
                    ["Furnishing", d.furnishing],
                    ["Ownership", d.ownership],
                    ["Property Age", d.propertyage],
                    ["Water Source", d.watersource?.join(", ")],
                  ].map(([label, value]) => value ? (
                    <div key={label} className="flex justify-between gap-2">
                      <span className="paragraph-color flex-shrink-0">{label}</span>
                      <span className="font-medium text-gray-500 text-right">{value}</span>
                    </div>
                  ) : null)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {leadModel && (
        <div>
          <Leadgentaionform setLeadModel={setLeadModel} projectOwners={projectOwners}  />
          {/* <Customenquiryform setLeadModel={setLeadModel} /> */}
        </div>
      )}
    </div>
  );
}