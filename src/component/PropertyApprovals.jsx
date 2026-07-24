import { useEffect, useState } from "react";
import { getPendingProperties, approveProperty, rejectProperty } from "../api/api";

const TABS = [
  { id: "pending", label: "Pending" },
  { id: "approved", label: "Approved" },
  { id: "rejected", label: "Rejected" },
];

const statusStyles = {
  pending: { bg: "#FFF7E9", text: "#B45309" },
  approved: { bg: "#ECFDF3", text: "#16A34A" },
  rejected: { bg: "#FFECEC", text: "#DC2626" },
};

function StatusBadge({ status }) {
  const s = statusStyles[status] || statusStyles.pending;
  return (
    <span
      className="inline-block px-3 py-1 text-xs font-semibold rounded-full capitalize"
      style={{ background: s.bg, color: s.text }}
    >
      {status}
    </span>
  );
}

const parseLocation = (location) => {
  try {
    if (typeof location === "string") return JSON.parse(location);
    if (Array.isArray(location)) return location[0] || {};
    return location || {};
  } catch {
    return {};
  }
};

export default function PropertyApprovals() {
  const [activeTab, setActiveTab] = useState("pending");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [busyId, setBusyId] = useState(null);
  const [rejectingId, setRejectingId] = useState(null);
  const [rejectReason, setRejectReason] = useState("");

  const load = () => {
    setLoading(true);
    setError(null);
    getPendingProperties(1, 50, activeTab)
      .then((res) => {
        setItems(res.data?.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.response?.data?.message || "Failed to load properties");
        setLoading(false);
      });
  };

  useEffect(load, [activeTab]);

  const handleApprove = (id) => {
    setBusyId(id);
    approveProperty(id)
      .then(() => {
        setItems((prev) => prev.filter((p) => p._id !== id));
        setBusyId(null);
      })
      .catch((err) => {
        console.error(err);
        setBusyId(null);
      });
  };

  const openReject = (id) => {
    setRejectingId(id);
    setRejectReason("");
  };

  const submitReject = (id) => {
    setBusyId(id);
    rejectProperty(id, rejectReason)
      .then(() => {
        setItems((prev) => prev.filter((p) => p._id !== id));
        setBusyId(null);
        setRejectingId(null);
      })
      .catch((err) => {
        console.error(err);
        setBusyId(null);
      });
  };

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 py-6 flex flex-col gap-6">

        <div>
          <h1 className="text-3xl sm:text-[40px] font-bold text-[#0F172A] leading-tight">Property Approvals</h1>
          <p className="text-base text-[#64748B] mt-1">Every property posted goes live only after you approve it here.</p>
        </div>

        <div className="border-b border-[#E5E7EB]">
          <div className="flex gap-6 sm:gap-8">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-3 text-sm font-medium transition-all duration-200 focus:outline-none relative ${activeTab === tab.id ? "text-[#0D6EFD]" : "text-[#6B7280] hover:text-[#374151]"
                  }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0D6EFD] rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-[#9CA3AF] text-sm">Loading…</div>
        ) : error ? (
          <div className="text-center py-20 text-[#DC2626] text-sm">{error}</div>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-[#9CA3AF] bg-white border border-[#E5E7EB] rounded-xl">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mb-3 opacity-40">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <p className="text-base font-medium">No {activeTab} properties</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {items.map((item) => {
              const location = parseLocation(item.location);
              const title = item.projecttitle || item.projectname || item.property || item.propertyType || "Untitled property";
              const image = item.images?.[0]?.src && item.images[0].src !== "No image uploaded" ? item.images[0].src : null;
              const owner = item.owner || {};

              return (
                <div key={item._id} className="bg-white border border-[#E5E7EB] rounded-xl p-4 sm:p-5">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="w-full sm:w-[180px] h-[120px] rounded-lg bg-[#F1F5F9] flex-shrink-0 overflow-hidden flex items-center justify-center">
                      {image ? (
                        <img src={image} alt={title} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-xs text-[#9CA3AF]">No image</span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3 flex-wrap">
                        <div>
                          <p className="font-semibold text-[#111827] text-lg leading-snug">{title}</p>
                          <p className="text-xs text-[#6B7280] mt-0.5">
                            {location.City || location.Address || "Location not set"}
                          </p>
                        </div>
                        <StatusBadge status={item.approvalStatus || "pending"} />
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3 text-xs text-[#6B7280]">
                        <div>
                          <p className="text-[#9CA3AF]">Posted by</p>
                          <p className="text-[#111827] font-medium">{owner.name || "—"}</p>
                        </div>
                        <div>
                          <p className="text-[#9CA3AF]">Contact</p>
                          <p className="text-[#111827] font-medium">{owner.mobile || owner.email || "—"}</p>
                        </div>
                        <div>
                          <p className="text-[#9CA3AF]">Purpose</p>
                          <p className="text-[#111827] font-medium">{item.purpose || "—"}</p>
                        </div>
                        <div>
                          <p className="text-[#9CA3AF]">Submitted</p>
                          <p className="text-[#111827] font-medium">
                            {item.createdAt ? new Date(item.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "—"}
                          </p>
                        </div>
                      </div>

                      {item.approvalStatus === "rejected" && item.rejectionReason && (
                        <p className="text-xs text-[#DC2626] mt-3">Rejected: {item.rejectionReason}</p>
                      )}

                      {activeTab === "pending" && (
                        <div className="mt-4">
                          {rejectingId === item._id ? (
                            <div className="flex flex-col sm:flex-row gap-2">
                              <input
                                autoFocus
                                value={rejectReason}
                                onChange={(e) => setRejectReason(e.target.value)}
                                placeholder="Reason for rejection (optional)"
                                className="flex-1 border border-[#D1D5DB] rounded-lg px-3 text-sm text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#0D6EFD]/30"
                                style={{ height: 40 }}
                              />
                              <div className="flex gap-2">
                                <button
                                  disabled={busyId === item._id}
                                  onClick={() => submitReject(item._id)}
                                  className="px-4 h-10 rounded-lg bg-[#DC2626] text-white text-sm font-semibold hover:bg-[#B91C1C] transition-colors disabled:opacity-60"
                                >
                                  Confirm Reject
                                </button>
                                <button
                                  onClick={() => setRejectingId(null)}
                                  className="px-4 h-10 rounded-lg border border-[#D1D5DB] text-sm font-medium text-[#374151] hover:bg-[#F8FAFC] transition-colors"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex gap-2">
                              <button
                                disabled={busyId === item._id}
                                onClick={() => handleApprove(item._id)}
                                className="px-4 h-10 rounded-lg bg-[#16A34A] text-white text-sm font-semibold hover:bg-[#15803D] transition-colors disabled:opacity-60"
                              >
                                {busyId === item._id ? "Approving…" : "Approve"}
                              </button>
                              <button
                                disabled={busyId === item._id}
                                onClick={() => openReject(item._id)}
                                className="px-4 h-10 rounded-lg border border-[#DC2626] text-[#DC2626] text-sm font-semibold hover:bg-[#FFECEC] transition-colors disabled:opacity-60"
                              >
                                Reject
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
