import React, { useState, useMemo } from "react";
import {
  ClipboardList,
  Layers,
  Phone,
  Eye,
  Users,
  Calendar,
  Download,
  ChevronDown,
  ArrowUp,
  FileText,
  Sheet,
  Printer,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const COLORS = {
  primary: "#1677FF",
  primaryHover: "#0F5FD6",
  secondary: "#EAF4FF",
  bgLightGray: "#F8F9FA",
  border: "#E5E7EB",
  primaryText: "#0F172A",
  secondaryText: "#6B7280",
  muted: "#9CA3AF",
  views: "#22C55E",
  leads: "#1677FF",
  calls: "#7C3AED",
  messages: "#F59E0B",
  saved: "#EF4444",
};

const kpiCards = [
  { icon: ClipboardList, color: COLORS.views, bg: "#DCFCE7", value: "18,245", label: "Total Views", time: "All Time" },
  { icon: Layers, color: COLORS.leads, bg: COLORS.secondary, value: "362", label: "Total Leads", time: "All Time" },
  { icon: Phone, color: COLORS.calls, bg: "#EDE9FE", value: "42", label: "Call received", time: "This Month" },
  { icon: Eye, color: COLORS.messages, bg: "#FEF3C7", value: "28", label: "Message Received", time: "This Month" },
  { icon: Users, color: COLORS.saved, bg: "#FEE2E2", value: "18", label: "Saved Properties", time: "This Month" },
];

const insights = [
  { icon: Eye, text: "You got 35% more views", sub: "compared to last month" },
  { icon: Layers, text: "You got 35% more views", sub: "compared to last month" },
  { icon: ClipboardList, text: "You got 35% more views", sub: "compared to last month" },
  { icon: Users, text: "You got 35% more views", sub: "compared to last month" },
];

const performanceOverview = [
  { value: "12,450", label: "Property Views" },
  { value: "85", label: "New Leads" },
  { value: "42", label: "Call Received" },
  { value: "29", label: "Message Received" },
  { value: "17", label: "Saved Properties" },
  { value: "3", label: "Properties Sold" },
  { value: "₹2.45 Cr", label: "Revenue" },
  { value: "₹45,230", label: "Ad Spend" },
];

const allReports = [
  { name: "Leads Report", range: "01 May 2024 - 31 May 2024", generated: "31 May 2024, 11:30 AM", format: "PDF" },
  { name: "Listings Report", range: "01 May 2024 - 31 May 2024", generated: "31 May 2024, 11:28 AM", format: "Excel" },
  { name: "Traffic Report", range: "01 May 2024 - 31 May 2024", generated: "31 May 2024, 11:25 AM", format: "PDF" },
  { name: "User Activity Report", range: "01 May 2024 - 31 May 2024", generated: "31 May 2024, 11:20 AM", format: "Excel" },
  { name: "Overview Report", range: "01 April 2024 - 30 April 2024", generated: "30 May 2024, 10:15 AM", format: "PDF" },
];

const topProperties = [
  {
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=200&h=140&fit=crop",
    name: "3 BHK Apartment",
    location: "DLF The Crest, Gurgaon",
    views: "1,245 Views",
    leads: "28 Leads",
  },
  {
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=200&h=140&fit=crop",
    name: "Office Space",
    location: "One World Center, Noida",
    views: "987 Views",
    leads: "167 Leads",
  },
  {
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=200&h=140&fit=crop",
    name: "2 BHK Apartment",
    location: "Godrej Woods, Noida",
    views: "654 Views",
    leads: "12 Leads",
  },
];

const tabs = ["Overview", "Leads Report", "Listing Report", "Traffic Report", "User Activity"];

function Dropdown({ label, options }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(label);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-between gap-2 px-3 text-sm bg-white w-full sm:w-auto"
        style={{ height: 44, borderRadius: 8, border: `1px solid ${COLORS.border}`, color: COLORS.primaryText, minWidth: 150 }}
      >
        <span className="truncate">{value}</span>
        <ChevronDown size={14} style={{ color: COLORS.muted }} className="flex-shrink-0" />
      </button>
      {open && (
        <div
          className="absolute z-10 top-full mt-1 left-0 bg-white w-full min-w-[160px] py-1"
          style={{ borderRadius: 8, border: `1px solid ${COLORS.border}`, boxShadow: "0 4px 12px rgba(0,0,0,.08)" }}
        >
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => {
                setValue(opt);
                setOpen(false);
              }}
              className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-50"
              style={{ color: COLORS.primaryText }}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Analyticsreports() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(12);
  const totalReports = 84;
  const totalPages = Math.ceil(totalReports / 1); // pagination shown as spec: 1 2 3 ... 84

  const reports = useMemo(() => allReports, []);

  function handleExport(type) {
    alert(`Exporting report as ${type}...`);
  }

  return (
    <div className="w-full min-h-screen" style={{ backgroundColor: "#FFFFFF" }}>
      <div className="max-w-[1600px] mx-auto p-4 sm:p-6">
        {/* Header */}
        <div className="mb-5" style={{ minHeight: 90 }}>
          <h1 className="font-bold" style={{ color: COLORS.primaryText, fontSize: 36, fontFamily: "Inter, sans-serif" }}>
            Analytics &amp; Reports
          </h1>
          <p style={{ color: COLORS.secondaryText, fontSize: 14 }}>
            Track your performance and export detailed reports
          </p>
        </div>

        {/* KPI + Insights row */}
        <div className="flex flex-col lg:flex-row gap-5 mb-5">
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {kpiCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <div
                  key={i}
                  className="bg-white p-4 flex items-center gap-3"
                  style={{ borderRadius: 12, border: `1px solid ${COLORS.border}`, minHeight: 82 }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: card.bg }}
                  >
                    <Icon size={18} style={{ color: card.color }} />
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-lg truncate" style={{ color: COLORS.primaryText }}>
                      {card.value}
                    </div>
                    <div className="text-xs truncate" style={{ color: COLORS.secondaryText }}>
                      {card.label}
                    </div>
                    <div className="text-xs font-medium" style={{ color: COLORS.primary }}>
                      {card.time}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div
            className="w-full lg:w-[320px] flex-shrink-0 bg-white p-4"
            style={{ borderRadius: 12, border: `1px solid ${COLORS.border}` }}
          >
            <h3 className="font-semibold mb-3" style={{ fontSize: 18, color: COLORS.primaryText }}>
              Key Insights
            </h3>
            <div className="flex flex-col gap-3">
              {insights.map((ins, i) => {
                const Icon = ins.icon;
                return (
                  <div key={i} className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: COLORS.secondary }}
                    >
                      <Icon size={15} style={{ color: COLORS.primary }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm" style={{ color: COLORS.primaryText }}>
                        {ins.text}
                      </div>
                      <div className="text-xs" style={{ color: COLORS.muted }}>
                        {ins.sub}
                      </div>
                    </div>
                    <ArrowUp size={16} style={{ color: "#16A34A" }} className="flex-shrink-0" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-6 overflow-x-auto mb-5" style={{ borderBottom: `1px solid ${COLORS.border}` }}>
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="text-sm font-medium pb-3 whitespace-nowrap"
              style={{
                color: activeTab === tab ? COLORS.primary : COLORS.secondaryText,
                borderBottom: activeTab === tab ? `2px solid ${COLORS.primary}` : "2px solid transparent",
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 mb-5">
          <div className="relative flex-1 min-w-[220px]">
            <Calendar size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: COLORS.muted }} />
            <button
              className="w-full flex items-center justify-between pl-9 pr-3 text-sm bg-white"
              style={{ height: 44, borderRadius: 8, border: `1px solid ${COLORS.border}`, color: COLORS.primaryText }}
            >
              01 May 2024 - 31 May 2024
              <ChevronDown size={14} style={{ color: COLORS.muted }} />
            </button>
          </div>
          <Dropdown label="All Properties" options={["All Properties", "3 BHK Apartment", "Office Space", "Commercial Shop"]} />
          <Dropdown label="All Sources" options={["All Sources", "Website", "Referral", "Instagram", "Walk-in"]} />
          <Dropdown label="All Cities" options={["All Cities", "Gurgaon", "Noida", "Delhi"]} />
          <button
            onClick={() => handleExport("PDF")}
            className="flex items-center justify-center gap-2 px-4 text-sm font-medium flex-shrink-0"
            style={{ height: 44, borderRadius: 8, border: `1px solid ${COLORS.primary}`, color: COLORS.primary }}
          >
            <Download size={15} />
            Export Report
          </button>
        </div>

        {/* Performance Overview */}
        <div className="mb-5">
          <h2 className="font-semibold mb-3" style={{ fontSize: 22, color: COLORS.primaryText }}>
            Performance Overview
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {performanceOverview.map((item, i) => (
              <div
                key={i}
                className="bg-white flex flex-col justify-center px-4"
                style={{ height: 72, borderRadius: 10, border: `1px solid ${COLORS.border}` }}
              >
                <div className="font-bold text-lg" style={{ color: COLORS.primaryText }}>
                  {item.value}
                </div>
                <div className="text-xs" style={{ color: COLORS.secondaryText }}>
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reports table + sidebar */}
        <div className="flex flex-col lg:flex-row gap-5">
          <div className="flex-1 min-w-0 bg-white" style={{ borderRadius: 12, border: `1px solid ${COLORS.border}` }}>
            <div className="p-4" style={{ borderBottom: `1px solid ${COLORS.border}` }}>
              <h3 className="font-semibold" style={{ fontSize: 18, color: COLORS.primaryText }}>
                Recent Reports
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[560px]">
                <thead>
                  <tr style={{ backgroundColor: COLORS.bgLightGray }}>
                    {["Report Name", "Date Range", "Generated On", "Format", "Actions"].map((h) => (
                      <th key={h} className="text-left px-4 py-3 font-medium" style={{ color: COLORS.secondaryText, fontSize: 12 }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {reports.map((r, i) => (
                    <tr key={i} className="hover:bg-gray-50 transition-colors" style={{ borderTop: `1px solid ${COLORS.border}` }}>
                      <td className="px-4 py-3" style={{ color: COLORS.primaryText }}>
                        {r.name}
                      </td>
                      <td className="px-4 py-3" style={{ color: COLORS.secondaryText }}>
                        {r.range}
                      </td>
                      <td className="px-4 py-3" style={{ color: COLORS.secondaryText }}>
                        {r.generated}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className="px-2 py-0.5 text-xs font-medium"
                          style={{
                            borderRadius: 999,
                            backgroundColor: r.format === "PDF" ? "#FEE2E2" : "#DCFCE7",
                            color: r.format === "PDF" ? COLORS.saved : "#16A34A",
                          }}
                        >
                          {r.format}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button className="p-1 rounded hover:bg-gray-100">
                          <MoreVertical size={16} style={{ color: COLORS.muted }} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3" style={{ borderTop: `1px solid ${COLORS.border}` }}>
              <span className="text-xs" style={{ color: COLORS.muted }}>
                Showing 1 to 5 of 5 Reports
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="w-7 h-7 flex items-center justify-center rounded"
                  style={{ border: `1px solid ${COLORS.border}` }}
                >
                  <ChevronLeft size={14} style={{ color: COLORS.muted }} />
                </button>
                {[1, 2, 3].map((n) => (
                  <button
                    key={n}
                    onClick={() => setPage(n)}
                    className="w-7 h-7 flex items-center justify-center rounded text-xs font-medium"
                    style={{
                      backgroundColor: page === n ? COLORS.primary : "transparent",
                      color: page === n ? "#FFFFFF" : COLORS.secondaryText,
                      border: page === n ? "none" : `1px solid ${COLORS.border}`,
                    }}
                  >
                    {n}
                  </button>
                ))}
                <span className="text-xs" style={{ color: COLORS.muted }}>
                  ...
                </span>
                <button
                  onClick={() => setPage(84)}
                  className="w-7 h-7 flex items-center justify-center rounded text-xs font-medium"
                  style={{
                    backgroundColor: page === 84 ? COLORS.primary : "transparent",
                    color: page === 84 ? "#FFFFFF" : COLORS.secondaryText,
                    border: page === 84 ? "none" : `1px solid ${COLORS.border}`,
                  }}
                >
                  84
                </button>
                <button
                  onClick={() => setPage((p) => Math.min(84, p + 1))}
                  className="w-7 h-7 flex items-center justify-center rounded"
                  style={{ border: `1px solid ${COLORS.border}` }}
                >
                  <ChevronRight size={14} style={{ color: COLORS.muted }} />
                </button>
                <div className="relative ml-2">
                  <select
                    value={rowsPerPage}
                    onChange={(e) => setRowsPerPage(Number(e.target.value))}
                    className="text-xs px-2 py-1 rounded outline-none"
                    style={{ border: `1px solid ${COLORS.border}`, color: COLORS.secondaryText }}
                  >
                    <option value={12}>12/page</option>
                    <option value={24}>24/page</option>
                    <option value={50}>50/page</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-full lg:w-[300px] flex-shrink-0 flex flex-col gap-5">
            <div className="bg-white p-4" style={{ borderRadius: 12, border: `1px solid ${COLORS.border}` }}>
              <h3 className="font-semibold mb-3" style={{ fontSize: 18, color: COLORS.primaryText }}>
                Top Performing Properties
              </h3>
              <div className="flex flex-col gap-4">
                {topProperties.map((p, i) => (
                  <div key={i} className="flex flex-col gap-2">
                    <img src={p.image} alt={p.name} className="w-full object-cover" style={{ height: 100, borderRadius: 8 }} />
                    <div>
                      <div className="font-medium text-sm" style={{ color: COLORS.primaryText }}>
                        {p.name}
                      </div>
                      <div className="text-xs mb-1" style={{ color: COLORS.muted }}>
                        {p.location}
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span style={{ color: COLORS.secondaryText }}>{p.views}</span>
                        <span style={{ color: COLORS.primary, fontWeight: 500 }}>{p.leads}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-4" style={{ borderRadius: 12, border: `1px solid ${COLORS.border}` }}>
              <h3 className="font-semibold mb-3" style={{ fontSize: 18, color: COLORS.primaryText }}>
                Export Options
              </h3>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleExport("PDF")}
                  className="flex items-center gap-2 px-3 py-2 text-sm"
                  style={{ borderRadius: 8, border: `1px solid ${COLORS.border}`, color: COLORS.primaryText }}
                >
                  <FileText size={15} style={{ color: COLORS.saved }} />
                  Export as PDF
                </button>
                <button
                  onClick={() => handleExport("Excel")}
                  className="flex items-center gap-2 px-3 py-2 text-sm"
                  style={{ borderRadius: 8, border: `1px solid ${COLORS.border}`, color: COLORS.primaryText }}
                >
                  <Sheet size={15} style={{ color: "#16A34A" }} />
                  Export as Excel
                </button>
                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-2 px-3 py-2 text-sm"
                  style={{ borderRadius: 8, border: `1px solid ${COLORS.border}`, color: COLORS.primaryText }}
                >
                  <Printer size={15} style={{ color: COLORS.primary }} />
                  Print Report
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
