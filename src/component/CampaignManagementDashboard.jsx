import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Megaphone,
  Search,
  ChevronDown,
  ChevronRight,
  Plus,
  MoreVertical,
} from "lucide-react";
import { getAllCampains } from "../api/api";

const QUICK_ACTIONS = [
  { title: "Create Campaign", subtitle: "Launch a new campaign" },
  { title: "Upload Video", subtitle: "Add Project Videos" },
  { title: "Invite Brokers", subtitle: "Add brokers to campaign" },
  { title: "Manage Videos", subtitle: "View and manage Videos" },
  { title: "Download Report", subtitle: "Export Campaign data" },
];

function StatusBadge({ status }) {
  const isActive = String(status).toLowerCase() === "active";
  return (
    <span
      className={`inline-flex items-center rounded-[20px] px-3 py-1 text-[13px] font-medium capitalize ${
        isActive
          ? "bg-[#DCFCE7] text-[#16A34A]"
          : "bg-[#FDEBD3] text-[#F97316]"
      }`}
    >
      {status}
    </span>
  );
}

function formatDateTime(value) {
  if (!value) return { date: "-", time: "-" };
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return { date: "-", time: "-" };
  return {
    date: d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
    time: d.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };
}

function KpiCard({ label, value }) {
  return (
    <div className="flex h-[100px] items-center gap-4 rounded-xl border border-[#E5E7EB] bg-white px-5">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#FFEDE0]">
        <Megaphone className="h-5 w-5 text-[#FF6B00]" strokeWidth={2} />
      </div>
      <div>
        <p className="text-[14px] text-[#6B7280]">{label}</p>
        <p className="mt-1 text-[28px] font-bold leading-none text-[#0B1F33] sm:text-[32px]">
          {value}
        </p>
      </div>
    </div>
  );
}

function FilterDropdown({ label, options, value, onChange, isOpen, onToggle }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        onToggle(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onToggle]);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        aria-label={`Filter by ${label}`}
        onClick={() => onToggle(!isOpen)}
        className="flex h-12 w-[160px] items-center justify-between rounded-[10px] border border-[#D9D9D9] bg-white px-3 text-[14px] text-[#374151] hover:bg-[#F9FAFB]"
      >
        <span className="truncate">{value}</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-[#9CA3AF] transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-1 w-[200px] rounded-[10px] border border-[#E5E7EB] bg-white py-1 shadow-lg">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                onChange(option);
                onToggle(false);
              }}
              className={`block w-full truncate px-3 py-2 text-left text-[14px] hover:bg-[#F9FAFB] ${
                option === value
                  ? "font-semibold text-[#1677FF]"
                  : "text-[#374151]"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function QuickActionItem({ title, subtitle }) {
  return (
    <button
      type="button"
      className="flex w-full items-center gap-3 rounded-lg px-2 py-2.5 text-left hover:bg-[#F9FAFB]"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FFEDE0]">
        <Megaphone className="h-[18px] w-[18px] text-[#FF6B00]" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[15px] font-semibold text-[#0B1F33]">{title}</p>
        <p className="truncate text-[13px] text-[#6B7280]">{subtitle}</p>
      </div>
      <ChevronRight className="h-4 w-4 shrink-0 text-[#9CA3AF]" />
    </button>
  );
}

export default function CampaignManagementDashboard({setActiveNav}) {
  const [search, setSearch] = useState("");
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSource, setSelectedSource] = useState("All Sources");
  const [selectedCity, setSelectedCity] = useState("All Cities");
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const res = await getAllCampains();
        setCampaigns(res?.data?.data || []);
      } catch (err) {
        console.error("Failed to fetch campaigns", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCampaigns();
  }, []);

  const sourceOptions = useMemo(() => {
    const unique = Array.from(
      new Set(campaigns.map((row) => row.leadRouting).filter(Boolean))
    );
    return ["All Sources", ...unique];
  }, [campaigns]);

  const cityOptions = useMemo(() => {
    const unique = Array.from(
      new Set(campaigns.map((row) => row.city).filter(Boolean))
    );
    return ["All Cities", ...unique];
  }, [campaigns]);

  const filteredCampaigns = campaigns.filter((row) => {
    const matchesSearch = `${row.campaignTitle || ""} ${row.projectName || ""}`
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesSource =
      selectedSource === "All Sources" || row.leadRouting === selectedSource;
    const matchesCity =
      selectedCity === "All Cities" || row.city === selectedCity;
    return matchesSearch && matchesSource && matchesCity;
  });

  const kpiCards = useMemo(() => {
    const activeCampaigns = campaigns.filter(
      (row) => String(row.campaignStatus).toLowerCase() === "active"
    ).length;
    const totalBrokers = new Set(
      campaigns.map((row) => row.brokerName).filter(Boolean)
    ).size;
    const videosUploaded = campaigns.filter(
      (row) => !!row.promotionalVideo
    ).length;

    return [
      { label: "Active Campaigns", value: loading ? "-" : activeCampaigns },
      { label: "Total Brokers", value: loading ? "-" : totalBrokers },
      { label: "Campaign Leads", value: "-" },
      { label: "Videos Uploaded", value: loading ? "-" : videosUploaded },
    ];
  }, [campaigns, loading]);

  return (
    <div className="min-h-screen w-full  p-6 lg:p-8">
      <div className="mx-auto max-w-[1600px]">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-[32px] font-bold leading-tight text-[#0B1F33] sm:text-[36px]">
              Campaigns
            </h1>
            <p className="mt-1 text-[16px] font-normal text-[#6B7280]">
              Manage broker and dealer campaigns for your projects
            </p>
          </div>
          <button
              type="button"
              className="flex h-12 items-center gap-2 rounded-lg bg-[#0F6CBD] px-5 text-[15px] font-medium text-white transition-colors hover:bg-[#0B5AA0]"
              onClick={() => setActiveNav('createcampaign')}
            >
              <Plus className="h-4 w-4" />
              Create Campaign
            </button>

          
        </div>

        {/* search bar */}
        <div className="grid grid-cols-1 gap-4 my-10">
        <div className="flex flex-wrap items-center gap-3 float-right">
            <div className="flex h-12 w-full items-center gap-2 rounded-[10px] border border-[#D9D9D9] bg-white px-3 sm:w-[320px]">
              <Search className="h-[18px] w-[18px] shrink-0 text-[#9CA3AF]" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search Campaign"
                className="h-full w-full bg-transparent text-[14px] text-[#0B1F33] placeholder:text-[#9CA3AF] focus:outline-none"
              />
            </div>

            <FilterDropdown
              label="Sources"
              options={sourceOptions}
              value={selectedSource}
              onChange={setSelectedSource}
              isOpen={openDropdown === "source"}
              onToggle={(next) => setOpenDropdown(next ? "source" : null)}
            />

            <FilterDropdown
              label="Cities"
              options={cityOptions}
              value={selectedCity}
              onChange={setSelectedCity}
              isOpen={openDropdown === "city"}
              onToggle={(next) => setOpenDropdown(next ? "city" : null)}
            />


          </div>
          </div>

        {/* KPI cards + right column start */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-4">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-3 lg:grid-cols-4">
            {kpiCards.map((card) => (
              <KpiCard key={card.label} label={card.label} value={card.value} />
            ))}
          </div>
          <div className="hidden lg:col-span-1 lg:block" />
        </div>

        {/* Main content: table + sidebar */}
        <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-4">
          {/* Campaign table */}
          <div className="lg:col-span-3">
            <div
              className="overflow-hidden rounded-xl border border-[#E5E7EB] bg-white"
              style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.03)" }}
            >
              <div className="px-5 py-5">
                <h2 className="text-[16px] font-semibold text-[#0B1F33]">
                  Profile Information
                </h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px] border-collapse text-left">
                  <thead>
                    <tr className="bg-[#F8F9FB]">
                      <th className="px-5 py-3 text-[14px] font-semibold text-[#374151]">
                        Campaign Title
                      </th>
                      <th className="px-5 py-3 text-[14px] font-semibold text-[#374151]">
                        Project ID
                      </th>
                      <th className="px-5 py-3 text-[14px] font-semibold text-[#374151]">
                        Project Name
                      </th>
                      <th className="px-5 py-3 text-[14px] font-semibold text-[#374151]">
                        Broker Name
                      </th>
                      <th className="px-5 py-3 text-[14px] font-semibold text-[#374151]">
                        Status
                      </th>
                      <th className="px-5 py-3 text-[14px] font-semibold text-[#374151]">
                        Last Updated
                      </th>
                      <th className="px-5 py-3 text-[14px] font-semibold text-[#374151]">
                        Lead Routing
                      </th>
                      <th className="px-5 py-3 text-[14px] font-semibold text-[#374151]">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td
                          colSpan={8}
                          className="px-5 py-6 text-center text-[14px] text-[#6B7280]"
                        >
                          Loading campaigns...
                        </td>
                      </tr>
                    ) : filteredCampaigns.length === 0 ? (
                      <tr>
                        <td
                          colSpan={8}
                          className="px-5 py-6 text-center text-[14px] text-[#6B7280]"
                        >
                          No campaigns found.
                        </td>
                      </tr>
                    ) : (
                      filteredCampaigns.map((row) => {
                        const { date, time } = formatDateTime(row.updatedAt);
                        return (
                          <tr
                            key={row._id}
                            className="border-t border-[#F1F5F9] hover:bg-[#FAFAFA]"
                            style={{ height: "72px" }}
                          >
                            <td className="px-5 py-3 text-[14px] text-[#374151]">
                              {row.campaignTitle}
                            </td>
                            <td className="px-5 py-3 text-[14px] text-[#374151]">
                              {row.projectId}
                            </td>
                            <td className="px-5 py-3">
                              <p className="text-[14px] font-semibold text-[#0B1F33]">
                                {row.projectName}
                              </p>
                              <p className="text-[13px] text-[#6B7280]">
                                {row.city}
                              </p>
                            </td>
                            <td className="px-5 py-3 text-[14px] text-[#374151]">
                              {row.brokerName}
                            </td>
                            <td className="px-5 py-3">
                              <StatusBadge status={row.campaignStatus} />
                            </td>
                            <td className="px-5 py-3">
                              <p className="text-[14px] text-[#374151]">{date}</p>
                              <p className="text-[13px] text-[#6B7280]">{time}</p>
                            </td>
                            <td className="px-5 py-3 text-[14px] text-[#374151]">
                              {row.leadRouting}
                            </td>
                            <td className="px-5 py-3">
                              <button
                                type="button"
                                aria-label="More actions"
                                className="rounded p-1 text-[#9CA3AF] hover:bg-gray-100"
                              >
                                <MoreVertical className="h-5 w-5" />
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="flex flex-col gap-5 lg:col-span-1">
            {/* Quick Actions */}
            <div className="rounded-xl border border-[#E5E7EB] bg-white p-5">
              <h2 className="mb-2 text-[16px] font-semibold text-[#0B1F33]">
                Profile Information
              </h2>
              <div className="flex flex-col divide-y divide-[#F1F5F9]">
                {QUICK_ACTIONS.map((item) => (
                  <QuickActionItem
                    key={item.title}
                    title={item.title}
                    subtitle={item.subtitle}
                  />
                ))}
              </div>
            </div>

            
          </div>
        </div>
      </div>
    </div>
  );
}