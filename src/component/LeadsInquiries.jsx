import { useState, useMemo, useRef, useEffect } from "react";
import * as XLSX from "xlsx";
import { lead } from "../api/api";
import { useSelector } from "react-redux";

// ── Mock Backend Data ──────────────────────────────────────────────────────────
const MOCK_LEADS = [
  {
    id: 1,
    name: "Rahul Verma",
    email: "Rahul.verma@email.com",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    property: "3 BHK Apartment",
    address: "DLF The Crest, Gurgaon",
    price: "₹ 2.45 Cr",
    source: "Website",
    status: "New",
    phone: "+91 98765 43210",
    date: "20 May 2024",
    time: "02:30 PM",
    city: "Gurgaon",
  },
  {
    id: 2,
    name: "Sneha Iyer",
    email: "Sneha.iyer@gmail.com",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    property: "Office Space",
    address: "One World Center, Noida",
    price: "₹ 1.85 L / Month",
    source: "Website",
    status: "New",
    phone: "+91 91234 56789",
    date: "20 May 2024",
    time: "11:15 AM",
    city: "Noida",
  },
  {
    id: 3,
    name: "Amit Singh",
    email: "Amit.singh@email.com",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    property: "2 BHK Apartment",
    address: "Godrej Woods, Noida",
    price: "₹ 28,000 / Month",
    source: "Advertisement",
    status: "Contacted",
    phone: "+91 99887 66554",
    date: "19 May 2024",
    time: "05:45 PM",
    city: "Noida",
  },
  {
    id: 4,
    name: "Pooja Mehta",
    email: "Pooja.mehta@email.com",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    property: "Commercial Shop",
    address: "Sushant Lok, Gurgaon",
    price: "₹ 1.20 Cr",
    source: "Website",
    status: "New",
    phone: "+91 87654 32109",
    date: "19 May 2024",
    time: "03:20 PM",
    city: "Gurgaon",
  },
  {
    id: 5,
    name: "Vikram Joshi",
    email: "Vikram.joshi@email.com",
    avatar: "https://randomuser.me/api/portraits/men/52.jpg",
    property: "4 BHK Villa",
    address: "Bestech Park View, Gurgaon",
    price: "₹ 6.75 Cr",
    source: "Advertisement",
    status: "Contacted",
    phone: "+91 96543 21098",
    date: "18 May 2024",
    time: "12:05 PM",
    city: "Gurgaon",
  },
  {
    id: 6,
    name: "Ananaya Gupta",
    email: "Ananaya.gupta@email.com",
    avatar: "https://randomuser.me/api/portraits/women/29.jpg",
    property: "Luxury Project- Sky Height",
    address: "Sector 150, Noida",
    price: "₹ 1.2 Cr onwards",
    source: "Website",
    status: "New",
    phone: "+91 95432 10987",
    date: "18 May 2024",
    time: "10:30 AM",
    city: "Noida",
  },
  {
    id: 7,
    name: "Rohit Bansal",
    email: "Rohit.Bansal@email.com",
    avatar: "https://randomuser.me/api/portraits/men/61.jpg",
    property: "Business Park",
    address: "Golf Course Extension, Gurgaon",
    price: "₹ 85 L onwards",
    source: "Website",
    status: "New",
    phone: "+91 90345 67821",
    date: "17 May 2024",
    time: "04:10 PM",
    city: "Gurgaon",
  },
  {
    id: 8,
    name: "Priya Sharma",
    email: "Priya.sharma@email.com",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    property: "Studio Apartment",
    address: "Sector 62, Noida",
    price: "₹ 15,000 / Month",
    source: "Referral",
    status: "Qualified",
    phone: "+91 88765 43210",
    date: "16 May 2024",
    time: "09:00 AM",
    city: "Noida",
  },
  {
    id: 9,
    name: "Karan Malhotra",
    email: "Karan.malhotra@email.com",
    avatar: "https://randomuser.me/api/portraits/men/78.jpg",
    property: "Penthouse",
    address: "Golf Course Road, Gurgaon",
    price: "₹ 12 Cr",
    source: "Social Media",
    status: "Converted",
    phone: "+91 77654 32198",
    date: "15 May 2024",
    time: "03:45 PM",
    city: "Gurgaon",
  },
  {
    id: 10,
    name: "Neha Kapoor",
    email: "Neha.kapoor@email.com",
    avatar: "https://randomuser.me/api/portraits/women/55.jpg",
    property: "Warehouse",
    address: "Industrial Area, Delhi",
    price: "₹ 3.5 L / Month",
    source: "Advertisement",
    status: "Qualified",
    phone: "+91 99123 45678",
    date: "14 May 2024",
    time: "11:30 AM",
    city: "Delhi",
  },
];

const STATS = [
  { label: "Total Leads", value: "362", sub: "All Time", iconBg: "#ECFDF3", iconColor: "#16A34A", subColor: "#16A34A", icon: "📋" },
  { label: "New Leads", value: "85", sub: "75% of Total", iconBg: "#E8F1FF", iconColor: "#2563EB", subColor: "#2563EB", icon: "🔔" },
  { label: "Contacted", value: "124", sub: "8% Total", iconBg: "#F4EFFF", iconColor: "#7C3AED", subColor: "#7C3AED", icon: "📞" },
  { label: "Qualified", value: "98", sub: "This Month", iconBg: "#FFF7ED", iconColor: "#F97316", subColor: "#F97316", icon: "⭐" },
  { label: "Converted", value: "55", sub: "This Month", iconBg: "#FDECEC", iconColor: "#DC2626", subColor: "#DC2626", icon: "✅" },
];

const STATUS_STYLES = {
  New: { bg: "#DCFCE7", text: "#16A34A" },
  Contacted: { bg: "#DBEAFE", text: "#2563EB" },
  Qualified: { bg: "#FEF3C7", text: "#D97706" },
  Converted: { bg: "#F3E8FF", text: "#7C3AED" },
};

const PAGE_SIZES = [4, 7, 10, 15];

// ── Icons ──────────────────────────────────────────────────────────────────────
const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);
const ChevronDown = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);
const ChevronLeft = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);
const ChevronRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);
const EyeIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
  </svg>
);
const EditIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);
const MessageIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);
const MoreIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="5" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="12" cy="19" r="1" />
  </svg>
);
const CalendarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

// ── Excel Export ───────────────────────────────────────────────────────────────
function exportToExcel(data) {
  const rows = data.map((l) => ({
    Name: l.name,
    Email: l.email,
    Property: l.property,
    Address: l.address,
    Price: l.price,
    Source: l.source,
    Status: l.status,
    Phone: l.phone,
    Date: l.date,
    Time: l.time,
    City: l.city,
  }));
  const ws = XLSX.utils.json_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Leads & Inquiries");
  XLSX.writeFile(wb, "Leads_Inquiries_Report.xlsx");
}

// ── Reusable Select ────────────────────────────────────────────────────────────
function Select({ value, onChange, options, width = "w-36" }) {
  return (
    <div className={`relative ${width} flex-shrink-0`}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-12 pl-3 pr-8 border border-gray-300 rounded-lg text-sm text-gray-600 bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer transition-shadow"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400">
        <ChevronDown />
      </span>
    </div>
  );
}

// ── Action Button ──────────────────────────────────────────────────────────────
function ActionBtn({ children, title, onClick }) {
  return (
    <button
      title={title}
      onClick={onClick}
      className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors duration-150"
    >
      {children}
    </button>
  );
}

// ── Status Badge ───────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const s = STATUS_STYLES[status] || STATUS_STYLES.New;
  return (
    <span
      className="px-4 py-1 rounded-full text-xs font-semibold whitespace-nowrap"
      style={{ backgroundColor: s.bg, color: s.text }}
    >
      {status}
    </span>
  );
}

// ── Avatar ─────────────────────────────────────────────────────────────────────
function Avatar({ src, name }) {
  const [err, setErr] = useState(false);
  const initials = name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  if (err) {
    return (
      <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold flex-shrink-0">
        {initials}
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={name}
      onError={() => setErr(true)}
      className="w-12 h-12 rounded-full object-cover flex-shrink-0"
    />
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function LeadsInquiries() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [propertyFilter, setPropertyFilter] = useState("all");
  const [cityFilter, setCityFilter] = useState("all");
  const [dateRange] = useState("01 May 2024 - 31 May 2024");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(7);
  const [moreMenu, setMoreMenu] = useState(null);
  const [stats, setStats] = useState();

  
  const user = useSelector((state) =>  state.user);


  useEffect(() => {
    featch()
  },[user.id])

  const featch = async () => {
    const res = await lead(user.id)

    console.log(res, "res data is comming from backend")
  }

  // Derived options
  const sources = useMemo(() => {
    const s = [...new Set(MOCK_LEADS.map((l) => l.source))];
    return [{ value: "all", label: "All Sources" }, ...s.map((x) => ({ value: x, label: x }))];
  }, []);
  const properties = useMemo(() => {
    const p = [...new Set(MOCK_LEADS.map((l) => l.property))];
    return [{ value: "all", label: "All Properties" }, ...p.map((x) => ({ value: x, label: x }))];
  }, []);
  const cities = useMemo(() => {
    const c = [...new Set(MOCK_LEADS.map((l) => l.city))];
    return [{ value: "all", label: "All Cities" }, ...c.map((x) => ({ value: x, label: x }))];
  }, []);
  const statuses = [
    { value: "all", label: "All Status" },
    { value: "New", label: "New" },
    { value: "Contacted", label: "Contacted" },
    { value: "Qualified", label: "Qualified" },
    { value: "Converted", label: "Converted" },
  ];
  const sorts = [
    { value: "newest", label: "Sort By: Newest First" },
    { value: "oldest", label: "Sort By: Oldest First" },
    { value: "name", label: "Sort By: Name A-Z" },
  ];
  const pageSizeOpts = PAGE_SIZES.map((s) => ({ value: String(s), label: `${s}/page` }));

  // Filter + sort
  const filtered = useMemo(() => {
    let data = [...MOCK_LEADS];
    if (statusFilter !== "all") data = data.filter((l) => l.status === statusFilter);
    if (sourceFilter !== "all") data = data.filter((l) => l.source === sourceFilter);
    if (propertyFilter !== "all") data = data.filter((l) => l.property === propertyFilter);
    if (cityFilter !== "all") data = data.filter((l) => l.city === cityFilter);
    if (sort === "oldest") data = data.reverse();
    if (sort === "name") data = [...data].sort((a, b) => a.name.localeCompare(b.name));
    return data;
  }, [statusFilter, sourceFilter, propertyFilter, cityFilter, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const resetPage = () => setPage(1);

  const getPagButtons = () => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (page <= 3) return [1, 2, 3, "...", totalPages];
    if (page >= totalPages - 2) return [1, "...", totalPages - 2, totalPages - 1, totalPages];
    return [1, "...", page - 1, page, page + 1, "...", totalPages];
  };

  return (
    <div
      className="min-h-screen bg-white"
      style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif" }}
      onClick={() => setMoreMenu(null)}
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 py-6 space-y-6">

        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">Leads &amp; Inquires</h1>
            <p className="text-base text-slate-500 mt-1">Manage all your follow up with all your leads in one place</p>
          </div>
          <button
            onClick={() => exportToExcel(filtered)}
            className="flex items-center gap-2 h-12 px-5 border border-gray-300 rounded-lg bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm whitespace-nowrap self-start"
          >
            <DownloadIcon />
            Export Report
          </button>
        </div>

        {/* ── KPI Cards ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="bg-white border border-gray-200 rounded-xl p-5 flex items-center gap-4 hover:shadow-md transition-shadow duration-200"
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{ backgroundColor: s.iconBg }}
              >
                {s.icon}
              </div>
              <div className="min-w-0">
                <p className="text-sm text-slate-500 font-medium truncate">{s.label}</p>
                <p className="text-3xl font-bold text-slate-900 leading-tight">{s.value}</p>
                <p className="text-sm font-medium" style={{ color: s.subColor }}>{s.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Filter Bar ── */}
        <div className="flex flex-wrap gap-3 items-center">
          <Select value={statusFilter} onChange={(v) => { setStatusFilter(v); resetPage(); }} options={statuses} width="w-36" />
          <Select value={sourceFilter} onChange={(v) => { setSourceFilter(v); resetPage(); }} options={sources} width="w-36" />
          <Select value={propertyFilter} onChange={(v) => { setPropertyFilter(v); resetPage(); }} options={properties} width="w-40" />
          <Select value={cityFilter} onChange={(v) => { setCityFilter(v); resetPage(); }} options={cities} width="w-36" />

          {/* Date Range (display only) */}
          <div className="relative flex-shrink-0">
            <div className="flex items-center gap-2 h-12 px-4 border border-gray-300 rounded-lg bg-white text-sm text-gray-600 w-64 cursor-pointer hover:bg-gray-50 transition-colors">
              <CalendarIcon />
              <span>{dateRange}</span>
              <span className="ml-auto text-gray-400"><ChevronDown /></span>
            </div>
          </div>

          <div className="ml-auto flex-shrink-0">
            <Select value={sort} onChange={setSort} options={sorts} width="w-52" />
          </div>
        </div>

        {/* ── Table Card ── */}
        <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  {["Leads", "Property", "Source", "Status", "Phone", "Date / Time", "Actions"].map((h) => (
                    <th
                      key={h}
                      className={`py-4 px-4 text-sm font-semibold text-slate-500 ${h === "Actions" ? "text-center" : "text-left"}`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginated.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-16 text-center text-gray-400 text-sm">
                      No leads found. Try adjusting your filters.
                    </td>
                  </tr>
                ) : (
                  paginated.map((lead) => (
                    <tr key={lead.id} className="hover:bg-gray-50 transition-colors duration-100">
                      {/* Lead */}
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <Avatar src={lead.avatar} name={lead.name} />
                          <div>
                            <p className="text-sm font-bold text-slate-900">{lead.name}</p>
                            <p className="text-sm text-slate-500">{lead.email}</p>
                          </div>
                        </div>
                      </td>
                      {/* Property */}
                      <td className="py-4 px-4 max-w-[200px]">
                        <p className="text-sm font-bold text-slate-900 leading-snug">{lead.property}</p>
                        <p className="text-xs text-slate-500">{lead.address}</p>
                        <p className="text-xs text-slate-600 font-medium mt-0.5">{lead.price}</p>
                      </td>
                      {/* Source */}
                      <td className="py-4 px-4">
                        <p className="text-sm text-slate-500">{lead.source}</p>
                      </td>
                      {/* Status */}
                      <td className="py-4 px-4">
                        <StatusBadge status={lead.status} />
                      </td>
                      {/* Phone */}
                      <td className="py-4 px-4">
                        <p className="text-sm text-slate-500 whitespace-nowrap">{lead.phone}</p>
                      </td>
                      {/* Date / Time */}
                      <td className="py-4 px-4">
                        <p className="text-sm font-semibold text-slate-900 whitespace-nowrap">{lead.date}</p>
                        <p className="text-xs text-slate-500">{lead.time}</p>
                      </td>
                      {/* Actions */}
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-center gap-1 relative">
                          <ActionBtn title="View"><EyeIcon /></ActionBtn>
                          <ActionBtn title="Edit"><EditIcon /></ActionBtn>
                          <ActionBtn title="Message"><MessageIcon /></ActionBtn>
                          <div className="relative">
                            <ActionBtn
                              title="More"
                              onClick={(e) => {
                                e.stopPropagation();
                                setMoreMenu(moreMenu === lead.id ? null : lead.id);
                              }}
                            >
                              <MoreIcon />
                            </ActionBtn>
                            {moreMenu === lead.id && (
                              <div
                                className="absolute right-0 top-9 z-20 bg-white border border-gray-200 rounded-lg shadow-lg py-1 w-40"
                                style={{ animation: "fadeIn 0.15s ease-out" }}
                                onClick={(e) => e.stopPropagation()}
                              >
                                {["Change Status", "Assign Lead", "Delete"].map((opt) => (
                                  <button
                                    key={opt}
                                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${opt === "Delete" ? "text-red-500" : "text-gray-700"}`}
                                    onClick={() => setMoreMenu(null)}
                                  >
                                    {opt}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Card Layout */}
          <div className="md:hidden divide-y divide-gray-100">
            {paginated.length === 0 ? (
              <div className="py-16 text-center text-gray-400 text-sm">No leads found.</div>
            ) : (
              paginated.map((lead) => (
                <div key={lead.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start gap-3 mb-3">
                    <Avatar src={lead.avatar} name={lead.name} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-bold text-slate-900 truncate">{lead.name}</p>
                        <StatusBadge status={lead.status} />
                      </div>
                      <p className="text-xs text-slate-500 truncate">{lead.email}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-slate-600 mb-3">
                    <div><span className="font-semibold text-slate-800">Property: </span>{lead.property}</div>
                    <div><span className="font-semibold text-slate-800">Source: </span>{lead.source}</div>
                    <div><span className="font-semibold text-slate-800">Phone: </span>{lead.phone}</div>
                    <div><span className="font-semibold text-slate-800">City: </span>{lead.city}</div>
                    <div><span className="font-semibold text-slate-800">Date: </span>{lead.date}</div>
                    <div><span className="font-semibold text-slate-800">Price: </span>{lead.price}</div>
                  </div>
                  <div className="flex gap-1 justify-end">
                    <ActionBtn title="View"><EyeIcon /></ActionBtn>
                    <ActionBtn title="Edit"><EditIcon /></ActionBtn>
                    <ActionBtn title="Message"><MessageIcon /></ActionBtn>
                    <ActionBtn title="More"><MoreIcon /></ActionBtn>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* ── Pagination ── */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-4 border-t border-gray-100">
            <p className="text-sm text-gray-500 order-2 sm:order-1">
              Showing {filtered.length === 0 ? 0 : (page - 1) * pageSize + 1} to{" "}
              {Math.min(page * pageSize, filtered.length)} out of {filtered.length} listings
            </p>

            <div className="flex items-center gap-1 order-1 sm:order-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="w-8 h-8 rounded-md border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 flex items-center justify-center transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft />
              </button>
              {getPagButtons().map((btn, i) =>
                btn === "..." ? (
                  <span key={`d${i}`} className="w-8 h-8 flex items-center justify-center text-gray-400 text-sm">…</span>
                ) : (
                  <button
                    key={btn}
                    onClick={() => setPage(btn)}
                    className={`w-8 h-8 rounded-md text-sm font-medium transition-colors ${
                      page === btn ? "bg-blue-600 text-white" : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {btn}
                  </button>
                )
              )}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="w-8 h-8 rounded-md border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 flex items-center justify-center transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronRight />
              </button>
            </div>

            <div className="flex items-center gap-2 order-3">
              <span className="text-sm text-gray-500">Show :</span>
              <Select
                value={String(pageSize)}
                onChange={(v) => { setPageSize(Number(v)); setPage(1); }}
                options={pageSizeOpts}
                width="w-28"
              />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}