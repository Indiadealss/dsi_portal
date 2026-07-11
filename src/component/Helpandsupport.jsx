import React, { useMemo, useState } from "react";
import {
  Search,
  ChevronRight,
  Rocket,
  ClipboardList,
  Users,
  MessageSquare,
  Award,
  Wallet,
  Settings as SettingsIcon,
  LineChart,
  ShieldAlert,
  Headphones,
  Mail,
  Phone,
  MessageCircle,
  ExternalLink,
  CheckCircle2,
} from "lucide-react";

/**
 * Help & Support Page
 * -----------------------------------------------------------------------
 * Single, self-contained page component (no external project scaffolding
 * required). Drop into any React + Tailwind app and render <HelpSupport />.
 *
 * DATA / BACKEND INTEGRATION
 * -----------------------------------------------------------------------
 * This page has no "Account Summary" widget in the source design — instead
 * the dynamic pieces are the support channels, support hours, and quick
 * resource links (things that realistically live in your backend/CMS so
 * ops can update hours or swap a WhatsApp number without a redeploy).
 * Pass them via props, shaped like the DEFAULT_* constants below.
 *
 *   const [contactMethods, setContactMethods] = useState(null);
 *   useEffect(() => {
 *     fetch("/api/support/channels").then(r => r.json()).then(setContactMethods);
 *   }, []);
 *   return (
 *     <HelpSupport
 *       contactMethods={contactMethods ?? undefined}
 *       onSearch={handleSearch}
 *       onCategoryClick={handleCategoryClick}
 *       onContactClick={handleContactClick}
 *       onContactSupport={handleContactSupport}
 *     />
 *   );
 *
 * Search, chips, category cards, contact methods, and the bottom CTA all
 * fire callback props so you can wire real navigation / API calls without
 * touching this file.
 */

// ---------------------------------------------------------------------------
// Demo / fallback data — replace via props
// ---------------------------------------------------------------------------
const TOPIC_CHIPS = [
  "How to add listing",
  "Verify your account",
  "Subscription Plans",
  "Payment issues",
  "Leads",
];

const HELP_CATEGORIES = [
  {
    key: "need-help",
    icon: Rocket,
    iconBg: "#DCFCE7",
    iconColor: "#16A34A",
    title: "Need Help?",
    description: "New to Brandsdoor? Learn the basics and get started quickly",
  },
  {
    key: "listings",
    icon: ClipboardList,
    iconBg: "#EFF6FF",
    iconColor: "#2563EB",
    title: "Listing & Properties",
    description: "Learn how to create, manage and promote your listings",
  },
  {
    key: "leads",
    icon: Users,
    iconBg: "#FFF7ED",
    iconColor: "#F97316",
    title: "Leads & Inquiries",
    description: "Manage leads, respond to inquiries and close deals",
  },
  {
    key: "messages",
    icon: MessageSquare,
    iconBg: "#F3E8FF",
    iconColor: "#7C3AED",
    title: "Messages",
    description: "Understand messaging features and best Practices",
  },
  {
    key: "account-billing",
    icon: Award,
    iconBg: "#DCFCE7",
    iconColor: "#16A34A",
    title: "Account & Billing",
    description: "Manage your account, Password, and Billing Setting",
  },
  {
    key: "subscription-billing",
    icon: Wallet,
    iconBg: "#FFF7ED",
    iconColor: "#D97706",
    title: "Subscription & Billing",
    description: "View plans, manage subscription and billing details",
  },
  {
    key: "platform-settings",
    icon: SettingsIcon,
    iconBg: "#EFF6FF",
    iconColor: "#2563EB",
    title: "Platform Settings",
    description: "Customize your preferences and platform experiences",
  },
  {
    key: "analytics",
    icon: LineChart,
    iconBg: "#F3E8FF",
    iconColor: "#7C3AED",
    title: "Analytics & Reports",
    description: "Track performances and make smarter business decisions",
  },
  {
    key: "policies",
    icon: ShieldAlert,
    iconBg: "#FEE2E2",
    iconColor: "#EF4444",
    title: "Policies & Guidelines",
    description: "Read our policies, terms and community guidelines",
  },
];

const DEFAULT_CONTACT_METHODS = [
  {
    key: "live-chat",
    icon: MessageCircle,
    title: "Live chat",
    description: "Chat with our support team in real-time",
    badge: "Default",
  },
  {
    key: "email",
    icon: Mail,
    title: "Email-Support",
    description: "We typically respond within 24 hours",
  },
  {
    key: "call",
    icon: Phone,
    title: "Call Support",
    description: "Speak with our support executive",
  },
  {
    key: "whatsapp",
    icon: MessageCircle,
    title: "WhatsApp Support",
    description: "Message us on whatsapp for quick help",
  },
];

const DEFAULT_SUPPORT_HOURS = [
  { label: "Monday-Saturday", time: "9:00 AM - 7:00 PM (IST)" },
  { label: "Sunday & Public Holidays", time: "10:00 AM - 04:00 PM (IST)" },
];

const DEFAULT_QUICK_RESOURCES = [
  { key: "help-center", title: "Help Center", type: "link" },
  { key: "video-tutorials", title: "Video Tutorials", type: "link" },
  { key: "feature-updates", title: "Feature Updates", type: "link" },
  { key: "system-status", title: "System Status", type: "status", statusOk: true },
];

function HelpCard({ category, onClick }) {
  const Icon = category.icon;
  return (
    <button
      type="button"
      onClick={() => onClick(category.key)}
      className="group relative flex min-h-[150px] w-full flex-col items-start rounded-xl border border-[#E5E7EB] bg-white p-5 text-left transition-all duration-200 hover:border-[#D1D5DB] hover:shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]/30"
    >
      <span
        className="flex h-11 w-11 items-center justify-center rounded-2xl"
        style={{ backgroundColor: category.iconBg }}
      >
        <Icon size={20} style={{ color: category.iconColor }} strokeWidth={2} />
      </span>
      <h3 className="mt-3 text-lg sm:text-xl font-semibold text-[#111827]">{category.title}</h3>
      <p className="mt-1 text-[15px] leading-snug text-[#6B7280]">{category.description}</p>
      <ChevronRight
        size={20}
        className="absolute bottom-4 right-4 text-[#2563EB] transition-transform duration-200 group-hover:translate-x-0.5"
      />
    </button>
  );
}

function ContactMethodRow({ method, onClick }) {
  const Icon = method.icon;
  return (
    <button
      type="button"
      onClick={() => onClick(method.key)}
      className="group flex w-full items-center gap-3 rounded-lg py-2.5 text-left transition-colors hover:bg-[#F9FAFB] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]/30"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#DBEAFE]/60">
        <Icon size={19} className="text-[#2563EB]" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[15px] font-semibold text-[#111827]">{method.title}</span>
        <span className="block text-sm text-[#6B7280]">{method.description}</span>
      </span>
      {method.badge ? (
        <span className="shrink-0 rounded-full bg-[#DCFCE7] px-3 py-1 text-xs font-medium text-[#16A34A]">
          {method.badge}
        </span>
      ) : (
        <ChevronRight
          size={18}
          className="shrink-0 text-[#9CA3AF] transition-transform group-hover:translate-x-0.5"
        />
      )}
    </button>
  );
}

export default function Helpandsupport({
  contactMethods = DEFAULT_CONTACT_METHODS,
  supportHours = DEFAULT_SUPPORT_HOURS,
  quickResources = DEFAULT_QUICK_RESOURCES,
  onSearch,
  onChipClick,
  onCategoryClick,
  onContactClick,
  onResourceClick,
  onContactSupport,
}) {
  const [query, setQuery] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(query);
    else console.log("[HelpSupport] search:", query);
  };

  const handleChip = (chip) => {
    setQuery(chip);
    if (onChipClick) onChipClick(chip);
    else console.log("[HelpSupport] chip:", chip);
  };

  const handleCategory = (key) => {
    if (onCategoryClick) onCategoryClick(key);
    else console.log("[HelpSupport] category:", key);
  };

  const handleContact = (key) => {
    if (onContactClick) onContactClick(key);
    else console.log("[HelpSupport] contact method:", key);
  };

  const handleResource = (key) => {
    if (onResourceClick) onResourceClick(key);
    else console.log("[HelpSupport] resource:", key);
  };

  const handleBottomCta = () => {
    if (onContactSupport) onContactSupport();
    else console.log("[HelpSupport] contact support (banner)");
  };

  const firstChipLabel = useMemo(() => "Profile Information :", []);

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="mx-auto w-full max-w-[1400px] px-4 py-6 sm:px-6">
        {/* Header */}
        <header className="mb-5">
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight text-[#0F172A]">
            Help &amp; Support
          </h1>
          <p className="mt-1 text-base text-[#6B7280]">
            We&apos;re here to help you. Find answers or get in touch with our support team.
          </p>
        </header>

        {/* Search bar */}
        <form onSubmit={handleSearchSubmit} className="mb-4">
          <div className="flex h-14 items-center gap-3 rounded-xl border border-[#D1D5DB] bg-white px-4 transition-colors focus-within:border-[#2563EB] focus-within:ring-2 focus-within:ring-[#2563EB]/20">
            <Search size={20} className="shrink-0 text-[#9CA3AF]" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Flat in Noida"
              className="w-full bg-transparent text-base text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none"
            />
          </div>
        </form>

        {/* Topic chips */}
        <div className="mb-6 flex flex-wrap items-center gap-2.5">
          <span className="mr-1 text-[15px] font-semibold text-[#111827]">{firstChipLabel}</span>
          {TOPIC_CHIPS.map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => handleChip(chip)}
              className="h-9 shrink-0 rounded-full border border-[#D1D5DB] bg-white px-[18px] text-sm text-[#4B5563] transition-colors hover:border-[#2563EB] hover:text-[#2563EB] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]/30"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Main grid: content + sidebar */}
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
          {/* Main content */}
          <div className="min-w-0 space-y-5">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {HELP_CATEGORIES.map((category) => (
                <HelpCard key={category.key} category={category} onClick={handleCategory} />
              ))}
            </div>

            {/* Bottom CTA banner */}
            <div className="flex flex-col items-start gap-4 rounded-[14px] bg-[#E8F2FF] p-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#2563EB]">
                  <Headphones size={24} className="text-white" />
                </span>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-[#0F172A]">
                    Still need help?
                  </h3>
                  <p className="mt-1 text-[15px] text-[#4B5563]">
                    Our support team is ready to assist you with any questions or issues you may
                    have.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleBottomCta}
                className="h-[46px] w-full shrink-0 rounded-lg bg-[#2563EB] px-6 text-[15px] font-semibold text-white transition-colors hover:bg-[#1D4ED8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]/40 sm:w-auto"
              >
                Contact Support
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-5 xl:w-[320px]">
            {/* Contact Support — channels can come from backend */}
            <div className="rounded-xl border border-[#E5E7EB] bg-white p-5">
              <h3 className="mb-1 text-lg font-semibold text-[#0F172A]">Contact Support</h3>
              <div className="mt-2 divide-y divide-[#F1F5F9]">
                {contactMethods.map((method) => (
                  <ContactMethodRow key={method.key} method={method} onClick={handleContact} />
                ))}
              </div>
            </div>

            {/* Support Hours — can come from backend */}
            <div className="rounded-xl border border-[#E5E7EB] bg-white p-5">
              <h3 className="mb-4 text-lg font-semibold text-[#0F172A]">Support Hours</h3>
              <div className="space-y-4">
                {supportHours.map((slot) => (
                  <div key={slot.label}>
                    <p className="text-[15px] text-[#6B7280]">{slot.label}</p>
                    <p className="mt-0.5 text-base font-medium text-[#111827]">{slot.time}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Resources */}
            <div className="rounded-xl border border-[#E5E7EB] bg-white p-5">
              <h3 className="mb-3 text-lg font-semibold text-[#0F172A]">Quick Resources</h3>
              <div className="divide-y divide-[#F1F5F9]">
                {quickResources.map((res) => (
                  <button
                    key={res.key}
                    type="button"
                    onClick={() => handleResource(res.key)}
                    className="flex w-full items-center justify-between rounded-md py-2.5 text-left transition-colors hover:bg-[#F9FAFB] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]/30"
                  >
                    <span className="text-[15px] text-[#111827]">{res.title}</span>
                    {res.type === "status" ? (
                      <CheckCircle2
                        size={18}
                        className={res.statusOk ? "text-[#16A34A]" : "text-[#EF4444]"}
                      />
                    ) : (
                      <ExternalLink size={16} className="text-[#2563EB]" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}