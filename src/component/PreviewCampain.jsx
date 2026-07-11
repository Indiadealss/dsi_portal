import React, { useState, useRef, useEffect } from "react";
import {
  RefreshCcw,
  Pause,
  Copy,
  Trash2,
  ChevronRight,
  Headphones,
  MoreVertical,
} from "lucide-react";

/**
 * Campaign Details Dashboard
 * -----------------------------------------------------------------------
 * A single, self-contained page component (no external project scaffolding
 * required). Drop it into any React + Tailwind app and render <CampaignDashboard />.
 *
 * DATA / BACKEND INTEGRATION
 * -----------------------------------------------------------------------
 * The component accepts an optional `campaign` prop shaped like DEFAULT_CAMPAIGN
 * below. If you don't pass one, the demo data is used so the page still renders.
 * Wire it to your API like:
 *
 *   const [campaign, setCampaign] = useState(null);
 *   useEffect(() => {
 *     fetch("/api/campaigns/CMP-2025-0001")
 *       .then((r) => r.json())
 *       .then(setCampaign);
 *   }, []);
 *   return <CampaignDashboard campaign={campaign} onAction={handleAction} />;
 *
 * Action callbacks (edit/pause/duplicate/delete/routing/support/leadAction)
 * are all exposed via the `onAction(type, payload)` prop so you can hook up
 * real API calls / navigation without touching this file.
 */

// ---------------------------------------------------------------------------
// Demo / fallback data — replace by passing a `campaign` prop from your API
// ---------------------------------------------------------------------------
const DEFAULT_CAMPAIGN = {
  name: "CRC Maesta Broker Campaign",
  projectId: "PRJ-2025-0001",
  projectName: "CRC Maesta",
  status: "CRC Maesta",
  campaignId: "CMP-2025-0001",
  profile: {
    projectId: "PRJ-2025-0001",
    projectName: "CRC Maesta",
    projectType: "Residential",
    campaignDates: "12 May 2025 - 30 Jun 2025",
  },
  media: {
    brokerLogoUrl:
      "https://images.unsplash.com/photo-1620641622540-58b3a89b0e0f?w=440&h=220&fit=crop",
    brokerLogoAlt: "Broker Logo",
    promoVideoThumbUrl:
      "https://images.unsplash.com/photo-1533488765986-dfa2a9939acd?w=440&h=220&fit=crop",
    promoVideoAlt: "Promotional Video",
  },
  leadRouting: {
    label: "Specific Broker",
    description: "Leads from this campaign are assigned to the selected broker",
  },
  leads: [
    { id: 1, name: "Amit sharma", mobile: "+91 9897556644", source: "Campaign", status: "New", date: "20 May 2025, 10:30 PM" },
    { id: 2, name: "Amit sharma", mobile: "+91 9897556644", source: "Campaign", status: "New", date: "20 May 2025, 10:30 PM" },
    { id: 3, name: "Amit sharma", mobile: "+91 9897556644", source: "Campaign", status: "New", date: "20 May 2025, 10:30 PM" },
    { id: 4, name: "Amit sharma", mobile: "+91 9897556644", source: "Campaign", status: "New", date: "20 May 2025, 10:30 PM" },
    { id: 5, name: "Amit sharma", mobile: "+91 9897556644", source: "Campaign", status: "New", date: "20 May 2025, 10:30 PM" },
  ],
};

const STATUS_STYLES = {
  New: "bg-[#DCFCE7] text-[#16A34A]",
  Contacted: "bg-[#DBEAFE] text-[#2563EB]",
  Lost: "bg-[#FEE2E2] text-[#DC2626]",
  Converted: "bg-[#EDE9FE] text-[#7C3AED]",
};

function StatusBadge({ status }) {
  const cls = STATUS_STYLES[status] || "bg-gray-100 text-gray-600";
  return (
    <span className={`inline-flex items-center rounded-full px-3.5 py-1.5 text-xs font-medium ${cls}`}>
      {status}
    </span>
  );
}

function Field({ label, value }) {
  return (
    <div>
      <p className="text-sm text-[#6B7280]">{label}</p>
      <p className="mt-1 text-base font-medium text-[#111827]">{value ?? "—"}</p>
    </div>
  );
}

function InfoCard({ title, children }) {
  return (
    <div className="rounded-xl border border-[#E5E7EB] bg-white p-4 sm:p-[18px] transition-shadow hover:shadow-sm">
      <h3 className="mb-4 text-lg sm:text-xl font-semibold text-[#0F172A]">{title}</h3>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function QuickActionRow({ icon: Icon, title, description, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex w-full items-center gap-3 rounded-lg py-2 text-left transition-colors hover:bg-[#F9FAFB] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316]/40"
    >
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[10px] bg-[#FFF3EB] text-[#F97316]">
        <Icon size={20} strokeWidth={2} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[15px] sm:text-base font-semibold text-[#0F172A]">{title}</span>
        <span className="block text-sm text-[#6B7280]">{description}</span>
      </span>
      <ChevronRight
        size={18}
        className="shrink-0 text-[#9CA3AF] transition-transform group-hover:translate-x-0.5"
      />
    </button>
  );
}

function LeadActionsMenu({ lead, onAction }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const options = ["View Lead", "Mark Contacted", "Mark Lost", "Delete Lead"];

  return (
    <div className="relative inline-block" ref={ref}>
      <button
        type="button"
        aria-label="Lead actions"
        onClick={() => setOpen((v) => !v)}
        className="rounded-md p-1.5 text-[#6B7280] transition-colors hover:bg-[#F1F5F9] hover:text-[#374151] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]/30"
      >
        <MoreVertical size={18} />
      </button>
      {open && (
        <div
          className="absolute right-0 z-20 mt-1 w-44 origin-top-right rounded-lg border border-[#E5E7EB] bg-white py-1 shadow-lg animate-[fadeIn_0.12s_ease-out]"
          role="menu"
        >
          {options.map((opt) => (
            <button
              key={opt}
              role="menuitem"
              onClick={() => {
                setOpen(false);
                onAction?.("leadAction", { lead, action: opt });
              }}
              className="block w-full px-3.5 py-2 text-left text-sm text-[#374151] transition-colors hover:bg-[#F9FAFB]"
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function PreviewCampain({ campaign = DEFAULT_CAMPAIGN, onAction }) {
  const { name, profile, media, leadRouting, leads } = campaign;

  const handle = (type, payload) => {
    if (onAction) onAction(type, payload);
    else console.log("[CampaignDashboard]", type, payload);
  };

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="mx-auto w-full max-w-[1400px] px-4 py-5 sm:px-5 sm:py-5">
        {/* Header */}
        <header className="mb-5">
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight text-[#0F172A]">
            Campaigns
          </h1>
          <p className="mt-1 text-base text-[#6B7280]">
            Manage broker and dealer campaigns for your projects
          </p>
        </header>

        {/* Campaign Summary Card */}
        <section className="mb-4 rounded-xl border border-[#E5E7EB] bg-white p-5">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-xl bg-[#FFF3EB]">
              <RefreshCcw size={30} className="text-[#F97316]" strokeWidth={2.25} />
            </div>
            <div className="flex-1">
              <h2 className="text-xl sm:text-2xl font-semibold text-[#0F172A]">{name}</h2>
              <div className="mt-4 grid grid-cols-2 gap-y-4 sm:grid-cols-4 sm:gap-4">
                <Field label="Project ID" value={campaign.projectId} />
                <Field label="Project Name" value={campaign.projectName} />
                <Field label="Status" value={campaign.status} />
                <Field label="Campaign ID" value={campaign.campaignId} />
              </div>
            </div>
          </div>
        </section>

        {/* Main grid: content + sidebar */}
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_280px]">
          {/* Main content */}
          <div className="min-w-0 space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <InfoCard title="Profile Information">
                <Field label="Project ID" value={profile.projectId} />
                <Field label="Project Name" value={profile.projectName} />
                <Field label="Project Type" value={profile.projectType} />
                <Field label="Campaign Dates" value={profile.campaignDates} />
              </InfoCard>

              <InfoCard title="Profile Information">
                <Field label="Project ID" value={profile.projectId} />
                <Field label="Project Name" value={profile.projectName} />
                <Field label="Project Type" value={profile.projectType} />
                <Field label="Campaign Dates" value={profile.campaignDates} />
              </InfoCard>

              <div className="rounded-xl border border-[#E5E7EB] bg-white p-4 sm:p-[18px]">
                <h3 className="mb-4 text-lg sm:text-xl font-semibold text-[#0F172A]">
                  Media Asset
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="mb-2 text-sm text-[#6B7280]">Broker Logo or photo</p>
                    <img
                      src={media.brokerLogoUrl}
                      alt={media.brokerLogoAlt}
                      className="h-[110px] w-full rounded-lg object-cover transition-transform duration-300 hover:scale-[1.02]"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <p className="mb-2 text-sm text-[#6B7280]">Promotional Video</p>
                    <img
                      src={media.promoVideoThumbUrl}
                      alt={media.promoVideoAlt}
                      className="h-[110px] w-full rounded-lg object-cover transition-transform duration-300 hover:scale-[1.02]"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Leads table */}
            <div className="overflow-hidden rounded-xl border border-[#E5E7EB] bg-white">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px] border-collapse text-left">
                  <thead>
                    <tr className="bg-[#F9FAFB] text-[15px] font-semibold text-[#374151]">
                      <th className="border-b border-[#E5E7EB] px-5 py-4">Leads</th>
                      <th className="border-b border-[#E5E7EB] px-5 py-4">Mobile</th>
                      <th className="border-b border-[#E5E7EB] px-5 py-4">Sources</th>
                      <th className="border-b border-[#E5E7EB] px-5 py-4">Status</th>
                      <th className="border-b border-[#E5E7EB] px-5 py-4">Date</th>
                      <th className="border-b border-[#E5E7EB] px-5 py-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-5 py-10 text-center text-sm text-[#6B7280]">
                          No leads yet for this campaign.
                        </td>
                      </tr>
                    ) : (
                      leads.map((lead) => (
                        <tr
                          key={lead.id}
                          className="h-14 text-[15px] text-[#374151] transition-colors hover:bg-[#F8FAFC]"
                        >
                          <td className="border-b border-[#E5E7EB] px-5 py-3">{lead.name}</td>
                          <td className="border-b border-[#E5E7EB] px-5 py-3">{lead.mobile}</td>
                          <td className="border-b border-[#E5E7EB] px-5 py-3">{lead.source}</td>
                          <td className="border-b border-[#E5E7EB] px-5 py-3">
                            <StatusBadge status={lead.status} />
                          </td>
                          <td className="border-b border-[#E5E7EB] px-5 py-3">{lead.date}</td>
                          <td className="border-b border-[#E5E7EB] px-5 py-3 text-right">
                            <LeadActionsMenu lead={lead} onAction={handle} />
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-4 xl:w-[280px]">
            <div className="rounded-xl border border-[#E5E7EB] bg-white p-[18px]">
              <h3 className="mb-2 text-lg font-semibold text-[#0F172A]">Quick Actions</h3>
              <div className="divide-y divide-[#F1F5F9]">
                <QuickActionRow
                  icon={RefreshCcw}
                  title="Edit Campaign"
                  description="Update campaign details"
                  onClick={() => handle("edit", campaign)}
                />
                <QuickActionRow
                  icon={Pause}
                  title="Pause Campaign"
                  description="Temporary pause this campaign"
                  onClick={() => handle("pause", campaign)}
                />
                <QuickActionRow
                  icon={Copy}
                  title="Duplicate Campaign"
                  description="Create a copy of this campaign"
                  onClick={() => handle("duplicate", campaign)}
                />
                <QuickActionRow
                  icon={Trash2}
                  title="Delete Campaign"
                  description="Permanently delete campaign"
                  onClick={() => handle("delete", campaign)}
                />
              </div>
            </div>

            <div className="rounded-xl border border-[#E5E7EB] bg-white p-[18px]">
              <h3 className="mb-3 text-lg font-semibold text-[#0F172A]">Lead Routing</h3>
              <p className="mb-2 text-sm text-[#6B7280]">Current Routing</p>
              <span className="inline-flex items-center rounded-full bg-[#DCFCE7] px-3.5 py-2 text-sm font-medium text-[#16A34A]">
                {leadRouting.label}
              </span>
              <p className="mt-3 text-sm text-[#6B7280]">{leadRouting.description}</p>
              <button
                type="button"
                onClick={() => handle("routing", campaign)}
                className="mt-4 h-10 w-full rounded-lg border border-[#D1D5DB] text-sm font-medium text-[#374151] transition-colors hover:bg-[#F9FAFB] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]/30"
              >
                View Routing Settings
              </button>
            </div>

            <div className="rounded-xl border border-[#E5E7EB] bg-white p-[18px]">
              <div className="flex h-11 w-11 items-center justify-center rounded-[10px] bg-[#DCFCE7] text-[#16A34A]">
                <Headphones size={20} />
              </div>
              <h3 className="mt-3 text-lg font-semibold text-[#0F172A]">Need Help?</h3>
              <p className="mt-1 text-sm text-[#6B7280]">
                Our Support Team is here to help you with your account
              </p>
              <button
                type="button"
                onClick={() => handle("support", campaign)}
                className="mt-4 h-10 w-full rounded-lg bg-[#2563EB] text-sm font-semibold text-white transition-colors hover:bg-[#1D4ED8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]/40"
              >
                Contact Support
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}