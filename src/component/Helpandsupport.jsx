import React, { useState } from "react";
import {
  Search,
  ChevronRight,
  ChevronDown,
  LayoutGrid,
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
 * Clicking any category card opens that topic inline (breadcrumb + tab
 * nav + FAQ panel) inside this same component, the same pattern used by
 * <Settingdashboard />. Each category has its own set of FAQs (FAQ_DATA
 * below) with a local search box and an accordion to expand/collapse
 * answers.
 *
 * DATA / BACKEND INTEGRATION
 * -----------------------------------------------------------------------
 * The support channels, support hours and quick resource links are the
 * pieces that realistically live in your backend/CMS so ops can update
 * hours or swap a WhatsApp number without a redeploy - pass them via
 * props, shaped like the DEFAULT_* constants below. FAQ_DATA is static
 * copy for now; swap it for a fetched map (`{ [categoryKey]: faq[] }`)
 * once there's a FAQ endpoint.
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

const FAQ_DATA = {
  "need-help": [
    {
      question: "What is Brandsdoor and who can use it?",
      answer:
        "Brandsdoor is a real estate platform where buyers, agents, developers and property managers can list, discover and manage properties. Anyone with a verified account can post listings, generate leads and manage their business from one dashboard.",
    },
    {
      question: "How do I set up my account for the first time?",
      answer:
        "After registering, complete your Profile Information and Business Profile under Settings, then verify your email and phone number so buyers can trust and contact you directly.",
    },
    {
      question: "Where can I find video tutorials?",
      answer:
        "Video Tutorials are linked under Quick Resources in the sidebar of this page. They walk through posting your first listing, responding to leads and reading your analytics.",
    },
    {
      question: "Who do I contact if I'm stuck?",
      answer:
        "Use Live Chat, Email or WhatsApp Support from the Contact Support panel on this page - our team typically responds within 24 hours.",
    },
  ],
  listings: [
    {
      question: "How do I add a new property listing?",
      answer:
        "Go to My Dashboard → Post Property, fill in the basic details, location, pricing and amenities, upload photos/videos, then submit for review. Approved listings go live automatically.",
    },
    {
      question: "How many photos and videos can I upload per listing?",
      answer:
        "You can upload multiple photos across categories (exterior, interior, floor plan, etc.) and a limited number of videos depending on your subscription plan - higher plans unlock more media slots.",
    },
    {
      question: "How do I edit or update an existing listing?",
      answer:
        "Open My Listings, select the property and click Edit. Changes to price, availability or media are reflected immediately; major changes may be re-queued for a quick review.",
    },
    {
      question: "Why is my listing pending approval?",
      answer:
        "New and heavily edited listings go through a short manual review to check for accuracy and policy compliance before they're published. This usually takes a few hours.",
    },
    {
      question: "How do I boost or promote a listing?",
      answer:
        "From My Listings, choose Boost Listing on any active property to increase its visibility in search results. Boost availability depends on your current subscription plan.",
    },
  ],
  leads: [
    {
      question: "Where can I see leads for my properties?",
      answer:
        "Open Leads & Inquiries from the main dashboard to see every inquiry, callback request and shortlist against each of your listings in one place.",
    },
    {
      question: "How do I respond to a buyer inquiry?",
      answer:
        "Click a lead to open the conversation thread and reply directly - buyers are notified by email/SMS the moment you respond, based on their notification preferences.",
    },
    {
      question: "Can I export my leads list?",
      answer:
        "Yes, use the export option on the Leads & Inquiries page to download your current lead list as a spreadsheet for offline follow-up or reporting.",
    },
    {
      question: "How do I mark a lead as converted or closed?",
      answer:
        "Open the lead detail view and update its status (New, Contacted, Converted or Closed) so your pipeline and analytics stay accurate.",
    },
  ],
  messages: [
    {
      question: "How do buyers contact me through the platform?",
      answer:
        "Buyers message you directly from a property page using the built-in chat, without seeing your personal number until you choose to share it.",
    },
    {
      question: "Can I reply to messages from my phone?",
      answer:
        "Yes, the messaging dashboard is fully responsive, so you can read and reply to conversations from any mobile browser.",
    },
    {
      question: "How do I know if a message is unread?",
      answer:
        "Unread conversations are highlighted with a badge count in the Messages tab and in the main navigation until you open them.",
    },
    {
      question: "Can I disable messaging notifications?",
      answer:
        "Yes, go to Settings → Notification Preferences and turn off Email, SMS or Push notifications for the Messages category individually.",
    },
  ],
  "account-billing": [
    {
      question: "How do I change my password?",
      answer:
        "Go to Settings → Account & Login → Change Password, enter your current password and a new one, then confirm to update it immediately.",
    },
    {
      question: "How do I update my email or phone number?",
      answer:
        "Registered email and phone changes require verification for account security - contact support from this page and we'll help you update and re-verify them.",
    },
    {
      question: "How do I verify my account?",
      answer:
        "Visit Profile Verification from your dashboard to submit identity, address or business documents. Verified accounts get a badge and appear more trustworthy to buyers.",
    },
    {
      question: "How do I delete my account?",
      answer:
        "Reach out to our support team via Email or Live Chat with your account details - we'll confirm your request and permanently remove your data per our privacy policy.",
    },
  ],
  "subscription-billing": [
    {
      question: "What subscription plans are available?",
      answer:
        "We offer Free, Professional and Enterprise plans, each with a different number of active listings, support level and analytics access. Compare them under Settings → Subscription & Billing.",
    },
    {
      question: "How do I upgrade or downgrade my plan?",
      answer:
        "Open Settings → Subscription & Billing, choose a plan card and confirm. Upgrades apply immediately; downgrades take effect at the start of your next billing cycle.",
    },
    {
      question: "Where can I view my billing history?",
      answer:
        "Your past invoices, amounts and payment status are listed under Settings → Subscription & Billing → Billing History.",
    },
    {
      question: "How do I update my payment method?",
      answer:
        "Go to Settings → Payment Method to add a new card, set a default card, or remove an old one.",
    },
    {
      question: "What happens to my listings if my subscription expires?",
      answer:
        "Listings beyond your plan's free limit are paused (not deleted) until you renew or upgrade, so you never lose your data.",
    },
  ],
  "platform-settings": [
    {
      question: "How do I change notification preferences?",
      answer:
        "Go to Settings → Notification Preferences to choose Email, SMS or Push alerts separately for leads, messages, listing updates, marketing and billing.",
    },
    {
      question: "How do I switch the app language or region?",
      answer:
        "Settings → Language & Region lets you set your preferred language, time zone, date format and currency.",
    },
    {
      question: "How do I control who sees my contact details?",
      answer:
        "Settings → Privacy & Security has toggles to show or hide your phone number and email address on public listings.",
    },
    {
      question: "How do I switch between light and dark mode?",
      answer:
        "Settings → Appearance lets you choose Light, Dark or System theme along with an accent color and font size.",
    },
  ],
  analytics: [
    {
      question: "What metrics can I track for my listings?",
      answer:
        "You can track views, shortlists, leads generated, response time and conversion rate for each listing from the Analytics & Reports dashboard.",
    },
    {
      question: "How often is analytics data updated?",
      answer:
        "Core metrics update in near real-time; summary reports and trend charts refresh once every 24 hours.",
    },
    {
      question: "Can I download analytics reports?",
      answer:
        "Yes, use the export option on the Analytics & Reports page to download a CSV report for any date range.",
    },
    {
      question: "How do I see which listings perform best?",
      answer:
        "The Top Performing Listings widget on the Analytics page ranks your properties by views and leads so you know where to focus.",
    },
  ],
  policies: [
    {
      question: "What is Brandsdoor's listing policy?",
      answer:
        "Listings must be accurate, owned or authorized by the person posting them, and free of misleading pricing or duplicate entries. Violations may lead to listing removal.",
    },
    {
      question: "What are the community guidelines?",
      answer:
        "Be respectful and honest in messages and listings, avoid spam or repeated unsolicited contact, and never share another user's personal information without consent.",
    },
    {
      question: "How does Brandsdoor handle disputes?",
      answer:
        "Report a dispute via Contact Support with relevant details (listing ID, conversation, screenshots). Our team reviews and responds within our standard support hours.",
    },
    {
      question: "Where can I read the terms of service and privacy policy?",
      answer:
        "Both documents are linked in the site footer under Support - Privacy Policy and Terms & Conditions.",
    },
  ],
};

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

function FAQItem({ faq, isOpen, onToggle }) {
  return (
    <div className="border-b border-[#F1F5F9] last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 py-4 text-left"
      >
        <span className="text-[15px] font-medium text-[#111827]">{faq.question}</span>
        <ChevronDown
          size={18}
          className={`shrink-0 text-[#6B7280] transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {isOpen && <p className="pb-4 text-sm leading-relaxed text-[#6B7280]">{faq.answer}</p>}
    </div>
  );
}

function tabButtonClass(active) {
  return `flex shrink-0 items-center gap-2.5 whitespace-nowrap rounded-lg px-3.5 py-2.5 text-sm font-medium transition-colors lg:w-full ${
    active ? "bg-[#EFF6FF] text-[#2563EB]" : "text-[#374151] hover:bg-[#F9FAFB]"
  }`;
}

function CategoryNav({ activeKey, onSelect }) {
  return (
    <nav className="flex gap-1.5 overflow-x-auto rounded-xl border border-[#E5E7EB] bg-white p-2 lg:w-[260px] lg:shrink-0 lg:flex-col lg:self-start lg:overflow-visible">
      <button type="button" onClick={() => onSelect("overview")} className={tabButtonClass(activeKey === "overview")}>
        <LayoutGrid size={18} />
        Overview
      </button>
      {HELP_CATEGORIES.map((category) => {
        const Icon = category.icon;
        return (
          <button
            key={category.key}
            type="button"
            onClick={() => onSelect(category.key)}
            className={tabButtonClass(activeKey === category.key)}
          >
            <Icon size={18} />
            {category.title}
          </button>
        );
      })}
    </nav>
  );
}

function CategoryFAQPanel({ category, onContactSupport }) {
  const [query, setQuery] = useState("");
  const [openIndex, setOpenIndex] = useState(0);
  const Icon = category.icon;
  const faqs = FAQ_DATA[category.key] || [];
  const filtered = query.trim()
    ? faqs.filter(
        (f) =>
          f.question.toLowerCase().includes(query.toLowerCase()) ||
          f.answer.toLowerCase().includes(query.toLowerCase())
      )
    : faqs;

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-[#E5E7EB] bg-white p-4 sm:p-6">
        <div className="flex items-start gap-3">
          <span
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl"
            style={{ backgroundColor: category.iconBg }}
          >
            <Icon size={20} style={{ color: category.iconColor }} strokeWidth={2} />
          </span>
          <div>
            <h2 className="text-lg font-semibold text-[#0F172A] sm:text-xl">{category.title}</h2>
            <p className="mt-1 text-sm text-[#6B7280]">{category.description}</p>
          </div>
        </div>

        <div className="mt-5 flex h-11 items-center gap-2.5 rounded-lg border border-[#D1D5DB] bg-white px-3.5 transition-colors focus-within:border-[#2563EB] focus-within:ring-2 focus-within:ring-[#2563EB]/20">
          <Search size={16} className="shrink-0 text-[#9CA3AF]" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpenIndex(0);
            }}
            placeholder={`Search ${category.title.toLowerCase()} FAQs`}
            className="w-full bg-transparent text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none"
          />
        </div>

        <h3 className="mb-1 mt-5 text-sm font-semibold text-[#111827]">Frequently Asked Questions</h3>
        {filtered.length === 0 ? (
          <p className="py-6 text-center text-sm text-[#6B7280]">No FAQs match your search.</p>
        ) : (
          <div className="divide-y divide-[#F1F5F9]">
            {filtered.map((faq, i) => (
              <FAQItem
                key={faq.question}
                faq={faq}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col items-start gap-4 rounded-[14px] bg-[#E8F2FF] p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#2563EB]">
            <Headphones size={24} className="text-white" />
          </span>
          <div>
            <h3 className="text-lg font-semibold text-[#0F172A] sm:text-xl">Still need help?</h3>
            <p className="mt-1 text-[15px] text-[#4B5563]">
              Didn't find your answer above? Our support team is ready to assist you directly.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onContactSupport}
          className="h-[46px] w-full shrink-0 rounded-lg bg-[#2563EB] px-6 text-[15px] font-semibold text-white transition-colors hover:bg-[#1D4ED8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]/40 sm:w-auto"
        >
          Contact Support
        </button>
      </div>
    </div>
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
  const [activeTab, setActiveTab] = useState("overview");
  const [query, setQuery] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(query);
  };

  const handleChip = (chip) => {
    setQuery(chip);
    if (onChipClick) onChipClick(chip);
  };

  const handleCategory = (key) => {
    setActiveTab(key);
    if (onCategoryClick) onCategoryClick(key);
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

  const activeCategory = HELP_CATEGORIES.find((c) => c.key === activeTab);

  const normalizedQuery = query.trim().toLowerCase();
  const filteredCategories = normalizedQuery
    ? HELP_CATEGORIES.filter((c) => {
        if (c.title.toLowerCase().includes(normalizedQuery)) return true;
        if (c.description.toLowerCase().includes(normalizedQuery)) return true;
        return (FAQ_DATA[c.key] || []).some(
          (f) =>
            f.question.toLowerCase().includes(normalizedQuery) ||
            f.answer.toLowerCase().includes(normalizedQuery)
        );
      })
    : HELP_CATEGORIES;

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

        {activeTab === "overview" ? (
          <>
            {/* Search bar */}
            <form onSubmit={handleSearchSubmit} className="mb-4">
              <div className="flex h-14 items-center gap-3 rounded-xl border border-[#D1D5DB] bg-white px-4 transition-colors focus-within:border-[#2563EB] focus-within:ring-2 focus-within:ring-[#2563EB]/20">
                <Search size={20} className="shrink-0 text-[#9CA3AF]" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search help topics, e.g. Subscription plans"
                  className="w-full bg-transparent text-base text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none"
                />
              </div>
            </form>

            {/* Topic chips */}
            <div className="mb-6 flex flex-wrap items-center gap-2.5">
              {TOPIC_CHIPS.map((chip) => (
                <button
                  key={chip}
                  type="button"
                  onClick={() => handleChip(chip)}
                  className={`h-9 shrink-0 rounded-full border px-[18px] text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]/30 ${
                    query === chip
                      ? "border-[#2563EB] bg-[#EFF6FF] text-[#2563EB]"
                      : "border-[#D1D5DB] bg-white text-[#4B5563] hover:border-[#2563EB] hover:text-[#2563EB]"
                  }`}
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Main grid: content + sidebar */}
            <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
              {/* Main content */}
              <div className="min-w-0 space-y-5">
                {filteredCategories.length === 0 ? (
                  <div className="rounded-xl border border-[#E5E7EB] bg-white p-8 text-center text-sm text-[#6B7280]">
                    No help topics match “{query}”.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredCategories.map((category) => (
                      <HelpCard key={category.key} category={category} onClick={handleCategory} />
                    ))}
                  </div>
                )}

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
          </>
        ) : (
          <>
            {/* Breadcrumb */}
            <nav className="mb-4 flex flex-wrap items-center gap-2 text-sm">
              <button
                type="button"
                onClick={() => setActiveTab("overview")}
                className="text-[#6B7280] transition-colors hover:text-[#374151]"
              >
                Help &amp; Support
              </button>
              <span className="text-[#D1D5DB]">›</span>
              <span className="font-medium text-[#2563EB]">{activeCategory?.title}</span>
            </nav>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-[260px_minmax(0,1fr)] lg:items-start">
              <CategoryNav activeKey={activeTab} onSelect={handleCategory} />
              <div className="min-w-0">
                <CategoryFAQPanel category={activeCategory} onContactSupport={handleBottomCta} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
