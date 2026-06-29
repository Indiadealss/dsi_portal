import { useState, useMemo, useRef, useEffect } from "react";
import * as XLSX from "xlsx";
import { lead } from "../api/api";
import { useSelector } from "react-redux";

// ─── MOCK BACKEND DATA ────────────────────────────────────────────────────────


// ─── ICONS ────────────────────────────────────────────────────────────────────
const Icon = {
  Download: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
  ),
  Search: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
  ),
  ChevronDown: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
  ),
  Eye: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
  ),
  Edit: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
  ),
  MoreVertical: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="12" cy="19" r="1" /></svg>
  ),
  ChevronRight: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
  ),
  Listing: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" /></svg>
  ),
  Layers: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></svg>
  ),
  Pause: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#9333EA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>
  ),
  EyeViews: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
  ),
  Users: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
  ),
};

// ─── STATUS BADGE ─────────────────────────────────────────────────────────────
const statusStyles = {
  Active: { bg: "#ECFDF3", text: "#16A34A" },
  Inactive: { bg: "#F3F4F6", text: "#374151" },
  Draft: { bg: "#F5ECFF", text: "#9333EA" },
};

function StatusBadge({ status }) {
  const s = statusStyles[status] || statusStyles.Inactive;
  return (
    <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full" style={{ background: s.bg, color: s.text }}>
      {status}
    </span>
  );
}

// ─── KPI CARD ─────────────────────────────────────────────────────────────────
function KPICard({ icon, iconBg, label, value, sub, subColor }) {
  return (
    <div className="flex items-center gap-4 bg-white border border-[#E5E7EB] rounded-xl p-5 h-[120px] transition-shadow duration-200 hover:shadow-md">
      <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: iconBg }}>
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs text-[#6B7280] font-medium mb-0.5 truncate">{label}</p>
        <p className="text-[28px] font-bold text-[#0F172A] leading-tight">{value}</p>
        <p className="text-xs font-medium mt-0.5" style={{ color: subColor }}>{sub}</p>
      </div>
    </div>
  );
}

// ─── ACTION BUTTON ────────────────────────────────────────────────────────────
function ActionBtn({ children, title }) {
  return (
    <button title={title} className="w-9 h-9 flex items-center justify-center rounded-lg text-[#6B7280] hover:bg-[#F3F4F6] hover:text-[#111827] transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#0D6EFD]/30">
      {children}
    </button>
  );
}

// ─── MOBILE LISTING CARD ──────────────────────────────────────────────────────
function MobileCard({ listing }) {
  return (
    <div className="bg-white border border-[#E5E7EB] rounded-xl p-4 hover:bg-[#F8FAFC] transition-colors duration-150">
      <div className="flex gap-3 mb-3">
        <img src={listing.image} alt={listing.title} className="w-20 h-16 rounded-lg object-cover flex-shrink-0" />
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-[#111827] text-sm leading-snug mb-1">{listing.title}</p>
          <p className="text-xs text-[#6B7280]">ID : {listing.id}</p>
          <p className="text-xs text-[#6B7280]">Added on {listing.addedOn}</p>
        </div>
        <StatusBadge status={listing.status} />
      </div>
      <div className="grid grid-cols-2 gap-2 text-xs text-[#6B7280] mb-3">
        <div><span className="font-medium text-[#111827]">{listing.type}</span><br />{listing.subType}</div>
        <div><span className="font-medium text-[#111827]">{listing.locationName}</span><br />{listing.city}</div>
        <div><span className="font-semibold text-[#111827] text-sm">{listing.price}</span><br />{listing.area}</div>
        <div>Views: <span className="font-medium text-[#111827]">{listing.views.toLocaleString()}</span><br />Leads: <span className="font-medium text-[#111827]">{listing.leads}</span></div>
      </div>
      <div className="flex gap-2 justify-end border-t border-[#E5E7EB] pt-3">
        <ActionBtn title="View"><Icon.Eye /></ActionBtn>
        <ActionBtn title="Edit"><Icon.Edit /></ActionBtn>
        <ActionBtn title="More"><Icon.MoreVertical /></ActionBtn>
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function MyListings() {
  const [activeTab, setActiveTab] = useState("All Listing");
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [cityFilter, setCityFilter] = useState("All Cities");
  const [sortBy, setSortBy] = useState("Newest First");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [BACKEND_LISTINGS, setbACKEND_LISTINGS] = useState([])

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setOpenDropdown(null);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);


  const user = useSelector((state) => state.user);

  useEffect(() => {
    setLoading(true);
    setError(null);

    lead(user.id)
      .then(res => {
        if (res.status === 200) {
          const apiData = res.data.data;
          console.log(apiData, 'api data is console')

          const formatData = apiData[0].map((item) => {
            // Handle location
            let location = {};

            try {
              if (typeof item.location === "string") {
                location = JSON.parse(item.location);
              } else if (Array.isArray(item.location)) {
                location = item.location[0] || {};
              } else {
                location = item.location || {};
              }
            } catch {
              location = {};
            }

            return {
              id: item.npxid || item.spid,
              title:
                item.projecttitle ||
                item.projectname ||
                item.apartment_name ||
                "",

              type:
                item.property,

              subType: item.purpose || "For Sale",

              locationName:
                location.apartment_name ||
                item.projectname ||
                "",

              city: location.City || "",

              price: item.price
                ? `₹ ${Number(
                  String(item.price).replace(/[^\d]/g, "")
                ).toLocaleString("en-IN")}`
                : "",

              area:
                item.superbuilduparea
                  ? `${item.superbuilduparea} Sq.Ft`
                  : item.plotarea && item.plotarea !== "null"
                    ? `${item.plotarea} Sq.Ft`
                    : "",

              status:
                item.availabestatus === "Ready to move"
                  ? "Active"
                  : "Inactive",

              views: item.views || 0,
              leads: item.leads || 0,

              addedOn: new Date(item.createdAt).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              }),

              image:
                item.images?.find((img) => img.type === "banner")?.src?.trim() ||
                item.images?.find((img) => img.type === "cover")?.src?.trim() ||
                item.images?.[0]?.src?.trim() ||
                "",
            };
          });

          console.log(formatData, 'hello Dear');
          setbACKEND_LISTINGS(formatData);

          setLoading(false);
          setTimeout(() => setVisible(true), 60);
        }
      })
      .catch(err => {
        console.error(err);
        setError(err.message ?? "Failed to load dashboard data");
        setLoading(false);
      });
  }, [user.id]);

  if (BACKEND_LISTINGS === []) {
    return (
      <div>
        ....
      </div>
    )
  }

  // Derived filter options
  const types = ["All Types", ...new Set(BACKEND_LISTINGS.map(l => l.type))];
  const statuses = ["All Status", "Active", "Inactive", "Draft"];
  const cities = ["All Cities", ...new Set(BACKEND_LISTINGS.map(l => l.city))];
  const sortOptions = ["Newest First", "Oldest First", "Price: High to Low", "Price: Low to High", "Most Views", "Most Leads"];

  // KPI stats
  const kpi = useMemo(() => ({
    total: BACKEND_LISTINGS.length,
    active: BACKEND_LISTINGS.filter(l => l.status === "Active").length,
    inactive: BACKEND_LISTINGS.filter(l => l.status === "Inactive").length,
    views: BACKEND_LISTINGS.reduce((s, l) => s + l.views, 0),
    leads: BACKEND_LISTINGS.reduce((s, l) => s + l.leads, 0),
  }), []);

  // Filter + search + tab
  const filtered = useMemo(() => {
    let data = [...BACKEND_LISTINGS];
    if (activeTab === "Drafts") data = data.filter(l => l.status === "Draft");
    else if (activeTab === "Inactive") data = data.filter(l => l.status === "Inactive");
    if (typeFilter !== "All Types") data = data.filter(l => l.type === typeFilter);
    if (statusFilter !== "All Status") data = data.filter(l => l.status === statusFilter);
    if (cityFilter !== "All Cities") data = data.filter(l => l.city === cityFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      data = data.filter(l =>
        l.title.toLowerCase().includes(q) ||
        l.locationName.toLowerCase().includes(q) ||
        l.city.toLowerCase().includes(q) ||
        l.id.toLowerCase().includes(q)
      );
    }
    // Sort
    if (sortBy === "Oldest First") data = data.slice().reverse();
    else if (sortBy === "Most Views") data.sort((a, b) => b.views - a.views);
    else if (sortBy === "Most Leads") data.sort((a, b) => b.leads - a.leads);
    return data;
  }, [activeTab, typeFilter, statusFilter, cityFilter, search, sortBy]);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paged = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // Reset page on filter change
  useEffect(() => { setCurrentPage(1); }, [activeTab, typeFilter, statusFilter, cityFilter, search, sortBy, pageSize]);

  // Export to Excel
  const handleExport = () => {
    const rows = filtered.map(l => ({
      "Property ID": l.id,
      "Title": l.title,
      "Type": l.type,
      "Sub-Type": l.subType,
      "Location": `${l.locationName}, ${l.city}`,
      "City": l.city,
      "Price": l.price,
      "Area": l.area,
      "Status": l.status,
      "Views": l.views,
      "Leads": l.leads,
      "Added On": l.addedOn,
    }));
    const ws = XLSX.utils.json_to_sheet(rows);
    const colWidths = [12, 28, 14, 12, 30, 12, 18, 14, 10, 8, 8, 14];
    ws["!cols"] = colWidths.map(w => ({ wch: w }));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "My Listings");
    XLSX.writeFile(wb, `my-listings-${new Date().toISOString().slice(0, 10)}.xlsx`);
  };

  // Pagination pages array
  const getPages = () => {
    if (totalPages <= 6) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (currentPage <= 3) return [1, 2, 3, "...", totalPages];
    if (currentPage >= totalPages - 2) return [1, "...", totalPages - 2, totalPages - 1, totalPages];
    return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
  };

  const Dropdown = ({ id, value, options, onChange, width }) => {
    const isOpen = openDropdown === id;
    return (
      <div className="relative" ref={isOpen ? dropdownRef : null}>
        <button
          onClick={() => setOpenDropdown(isOpen ? null : id)}
          className="flex items-center gap-2 bg-white border border-[#D1D5DB] rounded-lg px-3 text-sm text-[#374151] hover:bg-[#F8FAFC] transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-[#0D6EFD]/30"
          style={{ height: 48, width: width || 130, justifyContent: "space-between" }}
        >
          <span className="truncate">{value}</span>
          <span className={`transition-transform duration-200 flex-shrink-0 ${isOpen ? "rotate-180" : ""}`}><Icon.ChevronDown /></span>
        </button>
        {isOpen && (
          <div className="absolute z-50 top-full mt-1 bg-white border border-[#E5E7EB] rounded-xl shadow-lg py-1 min-w-full" style={{ minWidth: width || 130 }}>
            {options.map(opt => (
              <button key={opt} onClick={() => { onChange(opt); setOpenDropdown(null); }}
                className={`block w-full text-left px-4 py-2 text-sm transition-colors duration-100 ${value === opt ? "text-[#0D6EFD] font-semibold bg-[#EEF5FF]" : "text-[#374151] hover:bg-[#F8FAFC]"}`}>
                {opt}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen " style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 py-6 flex flex-col gap-6">

        {/* ── HEADER ── */}
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-3xl sm:text-[40px] font-bold text-[#0F172A] leading-tight">My Listings</h1>
            <p className="text-base text-[#64748B] mt-1">Manage all Your properties all at one place</p>
          </div>
          <button onClick={handleExport}
            className="flex items-center gap-2 bg-white border border-[#D1D5DB] rounded-lg px-5 text-sm font-medium text-[#374151] hover:bg-[#F8FAFC] active:scale-95 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#0D6EFD]/30 flex-shrink-0"
            style={{ height: 48 }}>
            <Icon.Download /> Export Report
          </button>
        </div>

        {/* ── KPI CARDS ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-5">
          <KPICard icon={<Icon.Listing />} iconBg="#ECFDF3" label="Total Listing" value={kpi.total} sub="All Time" subColor="#16A34A" />
          <KPICard icon={<Icon.Layers />} iconBg="#EEF5FF" label="Active Listings" value={kpi.active} sub={`${Math.round(kpi.active / kpi.total * 100)}% of Total`} subColor="#3B82F6" />
          <KPICard icon={<Icon.Pause />} iconBg="#F5ECFF" label="In Active" value={kpi.inactive} sub={`${Math.round(kpi.inactive / kpi.total * 100)}% Total`} subColor="#9333EA" />
          <KPICard icon={<Icon.EyeViews />} iconBg="#FFF7E9" label="Total Views" value={kpi.views.toLocaleString()} sub="This Month" subColor="#F59E0B" />
          <KPICard icon={<Icon.Users />} iconBg="#FFECEC" label="Total Leads" value={kpi.leads} sub="This Month" subColor="#EF4444" />
        </div>

        {/* ── TABS ── */}
        <div className="border-b border-[#E5E7EB]">
          <div className="flex gap-6 sm:gap-8">
            {["All Listing", "Drafts", "Inactive"].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`pb-3 text-sm font-medium transition-all duration-200 focus:outline-none relative ${activeTab === tab ? "text-[#0D6EFD]" : "text-[#6B7280] hover:text-[#374151]"
                  }`}>
                {tab}
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0D6EFD] rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ── FILTER TOOLBAR ── */}
        <div className="flex flex-wrap gap-3 items-center" ref={openDropdown ? undefined : dropdownRef}>
          {/* Search */}
          <div className="relative flex-1 min-w-[200px] max-w-[430px]">
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search by title, location or ID..."
              className="w-full border border-[#D1D5DB] rounded-lg pl-4 pr-10 text-sm text-[#111827] placeholder-[#9CA3AF] bg-white focus:outline-none focus:ring-2 focus:ring-[#0D6EFD]/30 focus:border-[#0D6EFD] transition-all duration-150"
              style={{ height: 48 }} />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"><Icon.Search /></span>
          </div>
          {/* Filters */}
          <div className="flex flex-wrap gap-3 items-center">
            <Dropdown id="type" value={typeFilter} options={types} onChange={setTypeFilter} />
            <Dropdown id="status" value={statusFilter} options={statuses} onChange={setStatusFilter} />
            <Dropdown id="city" value={cityFilter} options={cities} onChange={setCityFilter} />
          </div>
          {/* Sort - right aligned */}
          <div className="ml-auto">
            <Dropdown id="sort" value={`Sort By: ${sortBy}`} options={sortOptions.map(s => `Sort By: ${s}`)}
              onChange={v => setSortBy(v.replace("Sort By: ", ""))} width={200} />
          </div>
        </div>

        {/* ── TABLE (desktop) ── */}
        <div className="hidden md:block bg-white border border-[#E5E7EB] rounded-xl overflow-hidden">
          {/* Header */}
          <div className="grid text-xs font-semibold text-[#6B7280] bg-[#FAFAFA] border-b border-[#E5E7EB]"
            style={{ gridTemplateColumns: "2.5fr 1fr 1.2fr 1.2fr 0.8fr 0.6fr 0.6fr 0.7fr", height: 56 }}>
            {["Property", "Type", "Location", "Price", "Status", "Views", "Leads", "Actions"].map(col => (
              <div key={col} className="flex items-center px-5">{col}</div>
            ))}
          </div>

          {/* Rows */}
          {paged.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-[#9CA3AF]">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mb-3 opacity-40"><rect x="3" y="3" width="18" height="18" rx="2" /><line x1="3" y1="9" x2="21" y2="9" /></svg>
              <p className="text-base font-medium">No listings found</p>
              <p className="text-sm mt-1">Try adjusting your search or filters</p>
            </div>
          ) : paged.map((listing, idx) => (
            <div key={listing.id}
              className={`grid items-center hover:bg-[#F8FAFC] transition-colors duration-150 ${idx < paged.length - 1 ? "border-b border-[#E5E7EB]" : ""}`}
              style={{ gridTemplateColumns: "2.5fr 1fr 1.2fr 1.2fr 0.8fr 0.6fr 0.6fr 0.7fr", minHeight: 110 }}>

              {/* Property */}
              <div className=" items-center gap-4 px-5 py-4">
                <img src={listing.image} alt={listing.title} className="w-[160px] h-[80px] rounded-lg object-cover flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-[18px] font-semibold text-[#111827] leading-snug">{listing.title}</p>
                  <p className="text-xs text-[#6B7280] mt-0.5">ID : {listing.id}</p>
                  <p className="text-xs text-[#6B7280]">Added on {listing.addedOn}</p>
                </div>
              </div>

              {/* Type */}
              <div className="px-4">
                <p className="text-sm font-semibold text-[#111827]">{listing.type}</p>
                <p className="text-xs text-[#6B7280]">{listing.subType}</p>
              </div>

              {/* Location */}
              <div className="px-4">
                <p className="text-sm text-[#374151]">{listing.locationName},</p>
                <p className="text-sm text-[#374151]">{listing.city}</p>
              </div>

              {/* Price */}
              <div className="px-4">
                <p className="text-sm font-semibold text-[#111827]">{listing.price}</p>
                <p className="text-xs text-[#6B7280]">{listing.area}</p>
              </div>

              {/* Status */}
              <div className="px-4"><StatusBadge status={listing.status} /></div>

              {/* Views */}
              <div className="px-4 text-sm font-medium text-[#111827] text-center">{listing.views.toLocaleString()}</div>

              {/* Leads */}
              <div className="px-4 text-sm font-medium text-[#111827] text-center">{listing.leads}</div>

              {/* Actions */}
              <div className="px-4 flex items-center gap-1">
                <ActionBtn title="View"><Icon.Eye /></ActionBtn>
                <ActionBtn title="Edit"><Icon.Edit /></ActionBtn>
                <ActionBtn title="More"><Icon.MoreVertical /></ActionBtn>
              </div>
            </div>
          ))}
        </div>

        {/* ── CARDS (mobile) ── */}
        <div className="md:hidden flex flex-col gap-3">
          {paged.length === 0 ? (
            <div className="text-center py-12 text-[#9CA3AF]">
              <p className="font-medium">No listings found</p>
              <p className="text-sm mt-1">Try adjusting your search or filters</p>
            </div>
          ) : paged.map(listing => <MobileCard key={listing.id} listing={listing} />)}
        </div>

        {/* ── PAGINATION ── */}
        {filtered.length > 0 && (
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Left label */}
            <p className="text-sm text-[#6B7280] flex-shrink-0">
              Showing {Math.min((currentPage - 1) * pageSize + 1, filtered.length)} to {Math.min(currentPage * pageSize, filtered.length)} out of {filtered.length} listings
            </p>

            {/* Center pages */}
            <div className="flex items-center gap-1 flex-shrink-0">
              {getPages().map((page, i) => (
                page === "..." ? (
                  <span key={`ellipsis-${i}`} className="w-9 h-9 flex items-center justify-center text-sm text-[#6B7280]">…</span>
                ) : (
                  <button key={page} onClick={() => setCurrentPage(page)}
                    className={`w-9 h-9 flex items-center justify-center text-sm rounded-md font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#0D6EFD]/30 ${currentPage === page
                        ? "bg-[#0D6EFD] text-white"
                        : "border border-[#D1D5DB] bg-white text-[#374151] hover:bg-[#F8FAFC]"
                      }`}>
                    {page}
                  </button>
                )
              ))}
              {currentPage < totalPages && (
                <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                  className="w-9 h-9 flex items-center justify-center text-sm border border-[#D1D5DB] bg-white text-[#374151] rounded-md hover:bg-[#F8FAFC] transition-colors duration-150 focus:outline-none">
                  <Icon.ChevronRight />
                </button>
              )}
            </div>

            {/* Right page size */}
            <div className="flex items-center gap-2 text-sm text-[#6B7280] flex-shrink-0">
              Show :
              <Dropdown id="pagesize" value={`${pageSize}/page`} options={["4/page", "8/page", "12/page", "24/page"]}
                onChange={v => setPageSize(parseInt(v))} width={110} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}