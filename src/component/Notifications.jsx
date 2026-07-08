import React, { useState } from "react";
import {
  Check,
  Users,
  Eye,
  MessageSquare,
  ClipboardCheck,
  Bell,
  CheckCircle,
  Heart,
  Settings,
  Mail,
  MoreVertical,
  ChevronRight,
  ChevronDown,
} from "lucide-react";

const TABS = [
  { key: "all", label: "All", count: 12 },
  { key: "unread", label: "Unread", count: 12 },
  { key: "leads", label: "Leads", count: 4 },
  { key: "properties", label: "Properties", count: 3 },
  { key: "messages", label: "Messages", count: 3 },
  { key: "system", label: "System", count: 2 },
];

const NOTIFICATIONS = [
  {
    id: 1,
    icon: Users,
    iconBg: "#E8F8F0",
    iconColor: "#22C55E",
    title: "New lead Received",
    description: "Rahul Verma is interested in your property 3 BHK Apartment",
    time: "10 min ago",
    unread: true,
  },
  {
    id: 2,
    icon: Eye,
    iconBg: "#EEF2FF",
    iconColor: "#2563EB",
    title: "Your property has been viewed",
    description:
      "your property office space has been viewed by 25 people today",
    time: "1 hour ago",
    unread: true,
  },
  {
    id: 3,
    icon: MessageSquare,
    iconBg: "#F3F0FF",
    iconColor: "#4F46E5",
    title: "New Message",
    description: "Sneha Iyer send you a message regarding Office Space",
    time: "2 hours ago",
    unread: false,
  },
  {
    id: 4,
    icon: ClipboardCheck,
    iconBg: "#FFF4E5",
    iconColor: "#F97316",
    title: "Your Property is under review",
    description: "Your Property 2 BHK Apartment is under review by our team",
    time: "3 hours ago",
    unread: false,
  },
  {
    id: 5,
    icon: Bell,
    iconBg: "#FDECEC",
    iconColor: "#EF4444",
    title: "Price Alert",
    description: "Price drop alert! Similar properties in DLF The Crest, Gurgaon",
    time: "5 hours ago",
    unread: false,
  },
  {
    id: 6,
    icon: CheckCircle,
    iconBg: "#EAFBF0",
    iconColor: "#16A34A",
    title: "Your Property is Approved",
    description: "Congratulations! Your property 4 BHK Villa is now live",
    time: "1 day ago",
    unread: false,
  },
  {
    id: 7,
    icon: Heart,
    iconBg: "#EEF4FF",
    iconColor: "#3B82F6",
    title: "Congratulations !",
    description: "You've received a nre review on your profile",
    time: "1 day ago",
    unread: false,
  },
  {
    id: 8,
    icon: Settings,
    iconBg: "#F5F3FF",
    iconColor: "#7C3AED",
    title: "Subscription Renewed",
    description: "Your pro plan subscription has been renewed successfully",
    time: "1 day ago",
    unread: false,
  },
  {
    id: 9,
    icon: Users,
    iconBg: "#FFF4E5",
    iconColor: "#F97316",
    title: "New lead Received",
    description: "Rahul Verma is interested in your property 3 BHK Apartment",
    time: "2 day ago",
    unread: false,
  },
  {
    id: 10,
    icon: Eye,
    iconBg: "#FDECEC",
    iconColor: "#EF4444",
    title: "Your property has been viewed",
    description:
      "your property office space has been viewed by 25 people today",
    time: "2 day ago",
    unread: false,
  },
];

function NotificationRow({ item }) {
  const Icon = item.icon;
  return (
    <div className="group flex items-center gap-4 border-b border-[#F1F5F9] px-5 py-5 last:border-b-0 hover:bg-[#F8FAFC]">
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
        style={{ backgroundColor: item.iconBg }}
      >
        <Icon className="h-5 w-5" style={{ color: item.iconColor }} strokeWidth={2} />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[18px] font-semibold leading-tight text-[#0F172A]">
          {item.title}
        </p>
        <p className="mt-1 truncate text-[15px] font-normal text-[#6B7280]">
          {item.description}
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-4">
        <span className="text-[14px] text-[#9CA3AF]">{item.time}</span>
        <span
          className={`h-2 w-2 rounded-full ${
            item.unread ? "bg-[#1677FF]" : "bg-transparent"
          }`}
        />
        <button
          type="button"
          aria-label="More options"
          className="rounded p-1 text-[#9CA3AF] opacity-0 transition-opacity hover:bg-gray-100 group-hover:opacity-100"
        >
          <MoreVertical className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

function SummaryRow({ label, count, isLast }) {
  return (
    <div
      className={`flex items-center justify-between py-3 ${
        !isLast ? "" : ""
      }`}
    >
      <span className="text-[15px] text-[#6B7280]">{label}</span>
      <span className="text-[15px] font-medium text-[#111827]">{count}</span>
    </div>
  );
}

function QuickAction({ icon: Icon, label }) {
  return (
    <button
      type="button"
      className="flex h-11 w-full items-center gap-3 rounded-md px-2 text-left text-[15px] text-[#111827] hover:bg-[#F8FAFC]"
    >
      <Icon className="h-[18px] w-[18px] text-[#6B7280]" />
      <span>{label}</span>
    </button>
  );
}

export default function NotificationsDashboard() {
  const [activeTab, setActiveTab] = useState("all");
  const [perPage, setPerPage] = useState("12/page");

  return (
    <div className="min-h-screen w-full  p-6 lg:p-8">
      <div className="mx-auto max-w-[1400px]">
        {/* Header */}
        <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-[38px] font-bold leading-tight text-[#0F172A]">
              Notifications
            </h1>
            <p className="mt-1 text-[16px] font-normal text-[#6B7280]">
              Stay updated with important activities and alerts
            </p>
          </div>
          <button
            type="button"
            className="flex h-11 items-center gap-2 rounded-lg bg-[#1677FF] px-6 text-[15px] font-medium text-white transition-colors hover:bg-[#0F66E8] active:bg-[#0958D9]"
          >
            <Check className="h-4 w-4" />
            Mark as all read
          </button>
        </div>

        {/* Tabs */}
        <div className="mb-5 flex flex-wrap items-center gap-6 border-b border-[#E5E7EB] px-1">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`relative pb-3 text-[15px] transition-colors ${
                  isActive
                    ? "font-medium text-[#1677FF]"
                    : "text-[#6B7280] hover:text-[#1677FF]"
                }`}
              >
                {tab.label} ({tab.count})
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#1677FF]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          {/* Notification list */}
          <div className="lg:col-span-3">
            <div
              className="overflow-hidden rounded-xl border border-[#E5E7EB] bg-white"
              style={{
                boxShadow:
                  "0 1px 2px rgba(0,0,0,0.04), 0 2px 6px rgba(0,0,0,0.04)",
              }}
            >
              {NOTIFICATIONS.map((item) => (
                <NotificationRow key={item.id} item={item} />
              ))}
            </div>

            {/* Footer / Pagination */}
            <div className="mt-5 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <p className="text-[14px] text-[#6B7280]">
                Showing 1 to 10 out of 24 listings
              </p>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {[1, 2, 3].map((p) => (
                    <button
                      key={p}
                      type="button"
                      className={`flex h-8 w-8 items-center justify-center rounded-md text-[14px] ${
                        p === 1
                          ? "bg-[#1677FF] text-white"
                          : "border border-[#E5E7EB] text-[#374151] hover:bg-[#F8FAFC]"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                  <span className="px-1 text-[#9CA3AF]">...</span>
                  <button
                    type="button"
                    className="flex h-8 w-8 items-center justify-center rounded-md border border-[#E5E7EB] text-[14px] text-[#374151] hover:bg-[#F8FAFC]"
                  >
                    84
                  </button>
                  <button
                    type="button"
                    aria-label="Next page"
                    className="flex h-8 w-8 items-center justify-center rounded-md text-[#6B7280] hover:bg-[#F8FAFC]"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[14px] text-[#6B7280]">Show :</span>
                  <button
                    type="button"
                    className="flex h-8 items-center gap-1 rounded-md border border-[#E5E7EB] px-3 text-[14px] text-[#374151] hover:bg-[#F8FAFC]"
                  >
                    {perPage}
                    <ChevronDown className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="flex flex-col gap-5 lg:col-span-1">
            {/* Notification Summary */}
            <div
              className="rounded-[10px] border border-[#E5E7EB] bg-white p-5"
              style={{
                boxShadow:
                  "0 1px 2px rgba(0,0,0,0.04), 0 2px 6px rgba(0,0,0,0.04)",
              }}
            >
              <h2 className="mb-2 text-[18px] font-semibold text-[#111827]">
                Notification Summary
              </h2>
              <div className="divide-y divide-[#F1F5F9]">
                <SummaryRow label="All Notifications" count={12} />
                <SummaryRow label="Unread" count={12} />
                <SummaryRow label="Leads" count={4} />
                <SummaryRow label="Properties" count={3} />
                <SummaryRow label="Messages" count={3} />
                <SummaryRow label="System" count={2} isLast />
              </div>
            </div>

            {/* Quick Actions */}
            <div
              className="rounded-[10px] border border-[#E5E7EB] bg-white p-5"
              style={{
                boxShadow:
                  "0 1px 2px rgba(0,0,0,0.04), 0 2px 6px rgba(0,0,0,0.04)",
              }}
            >
              <h2 className="mb-2 text-[18px] font-semibold text-[#111827]">
                Quick Actions
              </h2>
              <div className="flex flex-col gap-1">
                <QuickAction icon={Check} label="Mark all read" />
                <QuickAction icon={Settings} label="Notification Settings" />
                <QuickAction icon={Mail} label="Manage Email Alerts" />
              </div>
            </div>

            {/* Stay Updated */}
            <div
              className="rounded-[10px] border border-[#E5E7EB] bg-white p-6 text-center"
              style={{
                boxShadow:
                  "0 1px 2px rgba(0,0,0,0.04), 0 2px 6px rgba(0,0,0,0.04)",
              }}
            >
              <div className="mb-4 flex justify-center">
                <Bell
                  className="h-10 w-10"
                  style={{ color: "#1677FF" }}
                  strokeWidth={2}
                  fill="#1677FF"
                />
              </div>
              <h3 className="mb-2 text-[18px] font-semibold text-[#111827]">
                Enable push notifications
              </h3>
              <p className="mb-4 text-[14px] leading-relaxed text-[#6B7280]">
                Get instant alerts for new leads, messages and important
                updates
              </p>
              <button
                type="button"
                className="h-11 w-full rounded-lg bg-[#1677FF] text-[15px] font-medium text-white transition-colors hover:bg-[#0F66E8] active:bg-[#0958D9]"
              >
                Enable Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}