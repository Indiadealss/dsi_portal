import React from "react";
import {
  User,
  Briefcase,
  Bell,
  ShieldCheck,
  Lock,
  Award,
  Wallet,
  Languages,
  ScanEye,
  ChevronRight,
  Home,
  ClipboardList,
  Bookmark,
  Calendar,
  BadgeCheck,
  Headphones,
  Gem,
} from "lucide-react";

/**
 * Settings Dashboard
 * -----------------------------------------------------------------------
 * Single, self-contained page component (no external project scaffolding
 * required). Drop into any React + Tailwind app and render <SettingsDashboard />.
 *
 * DATA / BACKEND INTEGRATION
 * -----------------------------------------------------------------------
 * Only the "Account Summary" block (avatar, name, verification, contact,
 * stats) is meant to come from your backend — pass it via the `user` prop,
 * shaped like DEFAULT_USER below. Everything else (setting cards, premium
 * card, help card, account overview) is static UI copy per the design spec,
 * but is easy to make dynamic too if you need that later.
 *
 *   const [user, setUser] = useState(null);
 *   useEffect(() => {
 *     fetch("/api/me").then((r) => r.json()).then(setUser);
 *   }, []);
 *   return <SettingsDashboard user={user} onNavigate={handleNavigate} onUpgrade={handleUpgrade} />;
 *
 * `onNavigate(cardKey)` fires when a settings card (or its chevron) is
 * clicked, so you can route to the relevant sub-page. `onUpgrade()` and
 * `onContactSupport()` are exposed the same way for the premium/help CTAs.
 */

// ---------------------------------------------------------------------------
// Demo / fallback account summary — replace by passing a `user` prop
// ---------------------------------------------------------------------------
const DEFAULT_USER = {
  name: "Rajat Sharma",
  verified: true,
  email: "rajat.sharma@email.com",
  phone: "+91 98765 43210",
  avatarUrl:
    "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200&h=200&fit=crop&crop=faces",
  stats: {
    activeListings: 14,
    leadsAndInquiries: 23,
    savedProperties: 56,
  },
  accountType: "Buyer / Investor",
  memberSince: "12 Jan 2024",
  accountStatus: "Verified",
};

const SETTINGS_CARDS = [
  {
    key: "profile",
    icon: User,
    iconBg: "#F3E8FF",
    iconColor: "#7C3AED",
    title: "Profile Information",
    description: "View and update your personal information contact details and profile",
  },
  {
    key: "business",
    icon: Briefcase,
    iconBg: "#DCFCE7",
    iconColor: "#16A34A",
    title: "Business Profile",
    description: "Manage your business information, logo, team and company details",
  },
  {
    key: "notifications",
    icon: Bell,
    iconBg: "#FFF3E8",
    iconColor: "#F97316",
    title: "Notification Preferences",
    description: "Choose what notifications you want to receive and how",
  },
  {
    key: "privacy",
    icon: ShieldCheck,
    iconBg: "#EFF6FF",
    iconColor: "#2563EB",
    title: "Privacy & Security",
    description: "Control your privacy setting and manage your account security",
  },
  {
    key: "login",
    icon: Lock,
    iconBg: "#F3E8FF",
    iconColor: "#7C3AED",
    title: "Account & Login",
    description: "Manage your email, password and account login preferences",
  },
  {
    key: "subscription",
    icon: Award,
    iconBg: "#DCFCE7",
    iconColor: "#16A34A",
    title: "Subscription & Billing",
    description: "View your plan details, billing history and manage subscription",
  },
  {
    key: "payment",
    icon: Wallet,
    iconBg: "#FFF7ED",
    iconColor: "#F97316",
    title: "Payment Method",
    description: "Manage your saved payment methods and billing details",
  },
  {
    key: "language",
    icon: Languages,
    iconBg: "#EFF6FF",
    iconColor: "#2563EB",
    title: "Language & Region",
    description: "Set your preferred language, time zone and region",
  },
  {
    key: "appearance",
    icon: ScanEye,
    iconBg: "#FEF2F2",
    iconColor: "#EF4444",
    title: "Appearance",
    description: "Customize theme, color mode and display preferences",
  },
];

function SettingCard({ card, onClick }) {
  const Icon = card.icon;
  return (
    <button
      type="button"
      onClick={() => onClick(card.key)}
      className="group flex min-h-[190px] w-full flex-col rounded-xl border border-[#E5E7EB] bg-white p-5 text-left transition-all duration-200 hover:border-[#D1D5DB] hover:shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]/30"
    >
      <div className="flex items-start justify-between">
        <span
          className="flex h-12 w-12 items-center justify-center rounded-[14px]"
          style={{ backgroundColor: card.iconBg }}
        >
          <Icon size={22} style={{ color: card.iconColor }} strokeWidth={2} />
        </span>
        <ChevronRight
          size={20}
          className="text-[#6B7280] transition-transform duration-200 group-hover:translate-x-0.5"
        />
      </div>
      <h3 className="mt-4 text-lg sm:text-xl font-semibold text-[#111827]">{card.title}</h3>
      <p className="mt-1.5 text-[15px] leading-snug text-[#6B7280]">{card.description}</p>
    </button>
  );
}

function StatItem({ icon: Icon, value, label }) {
  return (
    <div className="flex items-start gap-2">
      <Icon size={16} className="mt-0.5 shrink-0 text-[#6B7280]" />
      <div>
        <p className="text-base font-bold leading-none text-[#0F172A]">{value}</p>
        <p className="mt-1 text-xs text-[#6B7280]">{label}</p>
      </div>
    </div>
  );
}

function OverviewItem({ icon: Icon, label, value, badge }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] bg-[#F3F4F6] text-[#374151]">
        <Icon size={20} />
      </span>
      <div>
        <p className="text-sm text-[#6B7280]">{label}</p>
        {badge ? (
          <span className="mt-0.5 inline-flex items-center rounded-full bg-[#DCFCE7] px-3 py-0.5 text-sm font-medium text-[#16A34A]">
            {value}
          </span>
        ) : (
          <p className="mt-0.5 text-base font-semibold text-[#0F172A]">{value}</p>
        )}
      </div>
    </div>
  );
}

export default function Settingdashboard({
  user = DEFAULT_USER,
  onNavigate,
  onUpgrade,
  onContactSupport,
}) {
  const handleNavigate = (key) => {
    if (onNavigate) onNavigate(key);
    else console.log("[SettingsDashboard] navigate:", key);
  };
  const handleUpgrade = () => {
    if (onUpgrade) onUpgrade();
    else console.log("[SettingsDashboard] upgrade clicked");
  };
  const handleSupport = () => {
    if (onContactSupport) onContactSupport();
    else console.log("[SettingsDashboard] contact support clicked");
  };

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="mx-auto w-full max-w-[1400px] px-4 py-6 sm:px-6">
        {/* Header */}
        <header className="mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight text-[#0F172A]">
            Settings
          </h1>
          <p className="mt-1 text-base text-[#6B7280]">
            Manage your account, Preferences and platform settings
          </p>
        </header>

        <h2 className="mb-4 text-lg sm:text-[22px] font-semibold text-[#0F172A]">
          Account &amp; Preferences
        </h2>

        {/* Main grid: content + sidebar */}
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
          {/* Main content */}
          <div className="min-w-0 space-y-5">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {SETTINGS_CARDS.map((card) => (
                <SettingCard key={card.key} card={card} onClick={handleNavigate} />
              ))}
            </div>

            {/* Account Overview */}
            <div className="rounded-xl border border-[#E5E7EB] bg-white p-5">
              <h3 className="mb-5 text-lg font-semibold text-[#0F172A]">Account Overview</h3>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                <OverviewItem icon={User} label="Account Type" value={user.accountType} />
                <OverviewItem icon={Calendar} label="Member Since" value={user.memberSince} />
                <OverviewItem
                  icon={BadgeCheck}
                  label="Account Status"
                  value={user.accountStatus}
                  badge
                />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-5 xl:w-[320px]">
            {/* Account Summary — backed by `user` prop */}
            <div className="rounded-xl border border-[#E5E7EB] bg-white p-5">
              <h3 className="mb-4 text-lg font-semibold text-[#0F172A]">Account Summary</h3>
              <div className="flex items-center gap-3">
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  className="h-12 w-12 shrink-0 rounded-full object-cover"
                  loading="lazy"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-base font-semibold text-[#0F172A]">
                      {user.name}
                    </p>
                    {user.verified && (
                      <span className="inline-flex shrink-0 items-center rounded-full bg-[#DCFCE7] px-2.5 py-0.5 text-xs font-medium text-[#16A34A]">
                        Verified
                      </span>
                    )}
                  </div>
                  <p className="truncate text-sm text-[#6B7280]">{user.email}</p>
                  <p className="text-sm text-[#6B7280]">{user.phone}</p>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-2 border-t border-[#F1F5F9] pt-4">
                <StatItem icon={Home} value={user.stats.activeListings} label="Active Listing" />
                <StatItem
                  icon={ClipboardList}
                  value={user.stats.leadsAndInquiries}
                  label="Leads & inquiries"
                />
                <StatItem
                  icon={Bookmark}
                  value={user.stats.savedProperties}
                  label="Saved Properties"
                />
              </div>
            </div>

            {/* Premium Card */}
            <div className="relative overflow-hidden rounded-xl bg-[#E8F2FF] p-5">
              <h3 className="text-lg font-semibold text-[#0F172A]">Explore Premium Features</h3>
              <p className="mt-2 max-w-[190px] text-sm leading-snug text-[#4B5563]">
                Upgrade to premium and unlock more visibility, analytics and exclusive tools
              </p>
              <button
                type="button"
                onClick={handleUpgrade}
                className="mt-4 h-10 rounded-lg bg-[#2563EB] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#1D4ED8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]/40"
              >
                Upgrade Now
              </button>
              <Gem
                size={64}
                strokeWidth={1.5}
                className="pointer-events-none absolute bottom-4 right-4 text-[#2563EB]/70"
              />
            </div>

            {/* Help Card */}
            <div className="rounded-xl border border-[#E5E7EB] bg-white p-5">
              <span className="flex h-11 w-11 items-center justify-center rounded-[10px] bg-[#DCFCE7] text-[#16A34A]">
                <Headphones size={20} />
              </span>
              <h3 className="mt-3 text-lg font-semibold text-[#0F172A]">Need Help?</h3>
              <p className="mt-1 text-sm text-[#6B7280]">
                Our support team is here to help you with your account and settings
              </p>
              <button
                type="button"
                onClick={handleSupport}
                className="mt-4 h-10 w-full rounded-lg border border-[#2563EB] text-sm font-semibold text-[#2563EB] transition-colors hover:bg-[#EFF6FF] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]/30"
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