import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { Check, Users, MessageSquare, ClipboardCheck, Bell, Loader2 } from "lucide-react";
import { getNotifications, markNotificationRead } from "../api/api";

const POLL_MS = 20000;

const MODEL_META = {
  Lead: { icon: Users, iconBg: "#E8F8F0", iconColor: "#22C55E", label: "Leads" },
  Message: { icon: MessageSquare, iconBg: "#F3F0FF", iconColor: "#4F46E5", label: "Messages" },
  Property: { icon: ClipboardCheck, iconBg: "#FFF4E5", iconColor: "#F97316", label: "Properties" },
};

const TABS = [
  { key: "all", label: "All" },
  { key: "unread", label: "Unread" },
  { key: "Lead", label: "Leads" },
  { key: "Message", label: "Messages" },
];

function formatTime(date) {
  if (!date) return "";
  const diffMs = Date.now() - new Date(date).getTime();
  const min = Math.floor(diffMs / 60000);
  if (min < 1) return "Just now";
  if (min < 60) return `${min} min ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr} hour${hr > 1 ? "s" : ""} ago`;
  const day = Math.floor(hr / 24);
  if (day < 7) return `${day} day${day > 1 ? "s" : ""} ago`;
  return new Date(date).toLocaleDateString([], { day: "2-digit", month: "short" });
}

function NotificationRow({ item, onRead }) {
  const meta = MODEL_META[item.model] || { icon: Bell, iconBg: "#EEF2FF", iconColor: "#2563EB" };
  const Icon = meta.icon;
  const unread = item.status !== "read";
  return (
    <button
      type="button"
      onClick={() => unread && onRead(item._id)}
      className="group flex w-full items-center gap-4 border-b border-[#F1F5F9] px-5 py-5 text-left last:border-b-0 hover:bg-[#F8FAFC]"
    >
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
        style={{ backgroundColor: meta.iconBg }}
      >
        <Icon className="h-5 w-5" style={{ color: meta.iconColor }} strokeWidth={2} />
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-[15px] font-medium text-[#0F172A]">{item.name}</p>
      </div>

      <div className="flex shrink-0 items-center gap-4">
        <span className="text-[14px] text-[#9CA3AF]">{formatTime(item.createdAt)}</span>
        <span className={`h-2 w-2 rounded-full ${unread ? "bg-[#1677FF]" : "bg-transparent"}`} />
      </div>
    </button>
  );
}

function SummaryRow({ label, count }) {
  return (
    <div className="flex items-center justify-between py-3">
      <span className="text-[15px] text-[#6B7280]">{label}</span>
      <span className="text-[15px] font-medium text-[#111827]">{count}</span>
    </div>
  );
}

export default function NotificationsDashboard() {
  const user = useSelector((state) => state.user);
  const myId = user.id;

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  const load = useCallback(() => {
    if (!myId) return Promise.resolve();
    return getNotifications(myId)
      .then((res) => setNotifications(res.data.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [myId]);

  useEffect(() => {
    load();
    const t = window.setInterval(load, POLL_MS);
    return () => window.clearInterval(t);
  }, [load]);

  const markRead = async (id) => {
    setNotifications((prev) => prev.map((n) => (n._id === id ? { ...n, status: "read" } : n)));
    try {
      await markNotificationRead(id);
    } catch {
      load();
    }
  };

  const markAllRead = async () => {
    const unreadIds = notifications.filter((n) => n.status !== "read").map((n) => n._id);
    setNotifications((prev) => prev.map((n) => ({ ...n, status: "read" })));
    try {
      await Promise.all(unreadIds.map((id) => markNotificationRead(id)));
    } catch {
      load();
    }
  };

  const unreadCount = notifications.filter((n) => n.status !== "read").length;
  const countFor = (key) => {
    if (key === "all") return notifications.length;
    if (key === "unread") return unreadCount;
    return notifications.filter((n) => n.model === key).length;
  };

  const filtered = notifications.filter((n) => {
    if (activeTab === "all") return true;
    if (activeTab === "unread") return n.status !== "read";
    return n.model === activeTab;
  });

  return (
    <div className="min-h-screen w-full p-6 lg:p-8">
      <div className="mx-auto max-w-[1400px]">
        {/* Header */}
        <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-[38px] font-bold leading-tight text-[#0F172A]">Notifications</h1>
            <p className="mt-1 text-[16px] font-normal text-[#6B7280]">
              Stay updated with new leads and messages
            </p>
          </div>
          <button
            type="button"
            onClick={markAllRead}
            disabled={unreadCount === 0}
            className="flex h-11 items-center gap-2 rounded-lg bg-[#1677FF] px-6 text-[15px] font-medium text-white transition-colors hover:bg-[#0F66E8] active:bg-[#0958D9] disabled:opacity-50"
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
                  isActive ? "font-medium text-[#1677FF]" : "text-[#6B7280] hover:text-[#1677FF]"
                }`}
              >
                {tab.label} ({countFor(tab.key)})
                {isActive && <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#1677FF]" />}
              </button>
            );
          })}
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          <div className="lg:col-span-3">
            <div
              className="overflow-hidden rounded-xl border border-[#E5E7EB] bg-white"
              style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 2px 6px rgba(0,0,0,0.04)" }}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2 py-16 text-[15px] text-[#6B7280]">
                  <Loader2 className="h-4 w-4 animate-spin" /> Loading notifications…
                </div>
              ) : filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
                  <Bell className="h-8 w-8 text-[#CBD5E1]" />
                  <p className="text-[15px] text-[#6B7280]">No notifications here yet.</p>
                </div>
              ) : (
                filtered.map((item) => <NotificationRow key={item._id} item={item} onRead={markRead} />)
              )}
            </div>

            {!loading && (
              <p className="mt-5 text-[14px] text-[#6B7280]">
                Showing {filtered.length} of {notifications.length} notifications
              </p>
            )}
          </div>

          {/* Right sidebar */}
          <div className="flex flex-col gap-5 lg:col-span-1">
            <div
              className="rounded-[10px] border border-[#E5E7EB] bg-white p-5"
              style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 2px 6px rgba(0,0,0,0.04)" }}
            >
              <h2 className="mb-2 text-[18px] font-semibold text-[#111827]">Notification Summary</h2>
              <div className="divide-y divide-[#F1F5F9]">
                <SummaryRow label="All Notifications" count={notifications.length} />
                <SummaryRow label="Unread" count={unreadCount} />
                <SummaryRow label="Leads" count={countFor("Lead")} />
                <SummaryRow label="Messages" count={countFor("Message")} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
