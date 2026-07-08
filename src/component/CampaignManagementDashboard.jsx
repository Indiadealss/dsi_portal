import React, { useState } from "react";
import {
  Megaphone,
  Search,
  ChevronDown,
  ChevronRight,
  Plus,
  MoreVertical,
} from "lucide-react";

const KPI_CARDS = [
  { label: "Active Campaigns", value: "18" },
  { label: "Total Brokers", value: "1,248" },
  { label: "Campaign Leads", value: "3,562" },
  { label: "Videos Uploaded", value: "326" },
];

const CAMPAIGNS = [
  {
    id: "Cmp-2025-0001",
    projectId: "PRJ-2025-0001",
    projectName: "CRC Maestas",
    location: "Noida Extension",
    brokerCount: 245,
    status: "Active",
    date: "20 May 2024",
    time: "11:15 AM",
    leads: 245,
  },
  {
    id: "Cmp-2025-0002",
    projectId: "PRJ-2025-0002",
    projectName: "ACE Terra",
    location: "Noida Extension",
    brokerCount: 245,
    status: "Active",
    date: "20 May 2024",
    time: "11:15 AM",
    leads: 245,
  },
  {
    id: "Cmp-2025-0003",
    projectId: "PRJ-2025-0003",
    projectName: "CRC Maestas",
    location: "Noida Extension",
    brokerCount: 245,
    status: "Paused",
    date: "20 May 2024",
    time: "11:15 AM",
    leads: 245,
  },
  {
    id: "Cmp-2025-0004",
    projectId: "PRJ-2025-0004",
    projectName: "CRC Maestas",
    location: "Noida Extension",
    brokerCount: 245,
    status: "Active",
    date: "20 May 2024",
    time: "11:15 AM",
    leads: 245,
  },
  {
    id: "Cmp-2025-0005",
    projectId: "PRJ-2025-0005",
    projectName: "CRC Maestas",
    location: "Noida Extension",
    brokerCount: 245,
    status: "Active",
    date: "20 May 2024",
    time: "11:15 AM",
    leads: 245,
  },
  {
    id: "Cmp-2025-0006",
    projectId: "PRJ-2025-0006",
    projectName: "CRC Maestas",
    location: "Noida Extension",
    brokerCount: 245,
    status: "Paused",
    date: "20 May 2024",
    time: "11:15 AM",
    leads: 245,
  },
];

const QUICK_ACTIONS = [
  { title: "Create Campaign", subtitle: "Launch a new campaign" },
  { title: "Upload Video", subtitle: "Add Project Videos" },
  { title: "Invite Brokers", subtitle: "Add brokers to campaign" },
  { title: "Manage Videos", subtitle: "View and manage Videos" },
  { title: "Download Report", subtitle: "Export Campaign data" },
];

const ACTIVITIES = [
  {
    title: 'Campaign "CRC Maesta"',
    subtitle: "updated successfully",
    date: "20 May 2025, 10:30 AM",
  },
  {
    title: "45 New leads received in",
    subtitle: "ACE Terra",
    date: "19 May 2025, 04:15 PM",
  },
  {
    title: 'Campaign "Bhutani City Center"',
    subtitle: "ACE Terra",
    date: "19 May 2025, 04:15 PM",
  },
  {
    title: "Video uploaded in",
    subtitle: "Purvanchal Sunbliss",
    date: "19 May 2025, 04:15 PM",
  },
];

function StatusBadge({ status }) {
  const isActive = status === "Active";
  return (
    <span
      className={`inline-flex items-center rounded-[20px] px-3 py-1 text-[13px] font-medium ${
        isActive
          ? "bg-[#DCFCE7] text-[#16A34A]"
          : "bg-[#FDEBD3] text-[#F97316]"
      }`}
    >
      {status}
    </span>
  );
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

function ActivityItem({ title, subtitle, date }) {
  return (
    <div className="flex items-start gap-3 py-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FFEDE0]">
        <Megaphone className="h-[18px] w-[18px] text-[#FF6B00]" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[14px] font-semibold leading-snug text-[#0B1F33]">
          {title}
        </p>
        <p className="text-[13px] text-[#6B7280]">{subtitle}</p>
        <p className="mt-0.5 text-[12px] text-[#9CA3AF]">{date}</p>
      </div>
    </div>
  );
}

export default function CampaignManagementDashboard() {
  const [search, setSearch] = useState("");

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

            <button
              type="button"
              className="flex h-12 w-[140px] items-center justify-between rounded-[10px] border border-[#D9D9D9] bg-white px-3 text-[14px] text-[#374151] hover:bg-[#F9FAFB]"
            >
              All Sources
              <ChevronDown className="h-4 w-4 text-[#9CA3AF]" />
            </button>

            <button
              type="button"
              className="flex h-12 w-[140px] items-center justify-between rounded-[10px] border border-[#D9D9D9] bg-white px-3 text-[14px] text-[#374151] hover:bg-[#F9FAFB]"
            >
              All Cities
              <ChevronDown className="h-4 w-4 text-[#9CA3AF]" />
            </button>

            
          </div>
          </div>

        {/* KPI cards + right column start */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-4">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-3 lg:grid-cols-4">
            {KPI_CARDS.map((card) => (
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
                        Leads
                      </th>
                      <th className="px-5 py-3 text-[14px] font-semibold text-[#374151]">
                        Project ID
                      </th>
                      <th className="px-5 py-3 text-[14px] font-semibold text-[#374151]">
                        Project Name
                      </th>
                      <th className="px-5 py-3 text-center text-[14px] font-semibold text-[#374151]">
                        Broker Count
                      </th>
                      <th className="px-5 py-3 text-[14px] font-semibold text-[#374151]">
                        Status
                      </th>
                      <th className="px-5 py-3 text-[14px] font-semibold text-[#374151]">
                        Last Updated
                      </th>
                      <th className="px-5 py-3 text-[14px] font-semibold text-[#374151]">
                        Leads
                      </th>
                      <th className="px-5 py-3 text-[14px] font-semibold text-[#374151]">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {CAMPAIGNS.map((row) => (
                      <tr
                        key={row.id}
                        className="border-t border-[#F1F5F9] hover:bg-[#FAFAFA]"
                        style={{ height: "72px" }}
                      >
                        <td className="px-5 py-3 text-[14px] text-[#374151]">
                          {row.id}
                        </td>
                        <td className="px-5 py-3 text-[14px] text-[#374151]">
                          {row.projectId}
                        </td>
                        <td className="px-5 py-3">
                          <p className="text-[14px] font-semibold text-[#0B1F33]">
                            {row.projectName}
                          </p>
                          <p className="text-[13px] text-[#6B7280]">
                            {row.location}
                          </p>
                        </td>
                        <td className="px-5 py-3 text-center text-[14px] text-[#374151]">
                          {row.brokerCount}
                        </td>
                        <td className="px-5 py-3">
                          <StatusBadge status={row.status} />
                        </td>
                        <td className="px-5 py-3">
                          <p className="text-[14px] text-[#374151]">{row.date}</p>
                          <p className="text-[13px] text-[#6B7280]">{row.time}</p>
                        </td>
                        <td className="px-5 py-3 text-[14px] text-[#374151]">
                          {row.leads}
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
                    ))}
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

            {/* Recent Activities */}
            <div className="rounded-xl border border-[#E5E7EB] bg-white p-5">
              <h2 className="mb-1 text-[16px] font-semibold text-[#0B1F33]">
                Profile Information
              </h2>
              <div className="flex flex-col divide-y divide-[#F1F5F9]">
                {ACTIVITIES.map((activity, idx) => (
                  <ActivityItem
                    key={idx}
                    title={activity.title}
                    subtitle={activity.subtitle}
                    date={activity.date}
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