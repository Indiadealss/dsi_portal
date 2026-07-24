import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getUserDetatils, updateUser, settingsApi } from "../api/api.js";
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
  ChevronDown,
  Home,
  ClipboardList,
  Bookmark,
  Calendar,
  BadgeCheck,
  Headphones,
  Gem,
  LayoutGrid,
  Eye,
  EyeOff,
  Smartphone,
  Monitor,
  Sun,
  Moon,
  LogOut,
  Trash2,
  Plus,
  Check,
} from "lucide-react";

/**
 * Settings Dashboard
 * -----------------------------------------------------------------------
 * Self-contained, tabbed settings page. Clicking any settings card opens
 * that section inline (tab bar + panel) inside this same component - no
 * extra routing needed. The "Business Profile" card is the one exception:
 * it still navigates to the existing <BusinessProfile /> page via
 * `setSettingsPage`, since that page already talks to a real API.
 *
 * Every other tab (Profile, Notifications, Privacy, Login, Subscription,
 * Payment, Language, Appearance) fetches and saves through a real backend
 * call: Profile uses the existing /auth/me + /auth/updateuserprofile
 * endpoints (same as Profilevarification.jsx); the rest use `settingsApi`
 * in ../api/api.js, which follows the same REST convention as
 * `businessProfileApi`. Those `/settings/*` routes don't exist on the
 * backend yet, so calls will fail until they're implemented there - each
 * tab surfaces that as an inline error, the same way BusinessProfile does
 * when its API is unreachable.
 */

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

function useSavedFlash() {
  const [saved, setSaved] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const flash = () => {
    setSaved(true);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setSaved(false), 2000);
  };

  return [saved, flash];
}

function apiErrorMessage(err, fallback) {
  return err?.response?.data?.message || err?.message || fallback;
}

// ---------------------------------------------------------------------------
// Shared form atoms
// ---------------------------------------------------------------------------
const inputClasses =
  "h-10 w-full rounded-lg border border-[#D1D5DB] bg-white px-3 text-sm text-[#0F172A] " +
  "placeholder:text-[#9CA3AF] outline-none transition focus:border-[#2563EB] focus:ring-[3px] focus:ring-[#2563EB]/10 disabled:bg-[#F9FAFB] disabled:text-[#9CA3AF]";

function Field({ label, children, hint }) {
  return (
    <div>
      <label className="mb-1.5 block text-[13px] font-medium text-[#374151]">{label}</label>
      {children}
      {hint && <p className="mt-1 text-xs text-[#9CA3AF]">{hint}</p>}
    </div>
  );
}

function SelectField({ label, value, onChange, options }) {
  return (
    <Field label={label}>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${inputClasses} appearance-none pr-9`}
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <ChevronDown
          size={16}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
        />
      </div>
    </Field>
  );
}

function Toggle({ checked, onChange, label, description }) {
  return (
    <label className="flex items-start justify-between gap-4 py-3">
      <span className="min-w-0">
        <span className="block text-sm font-medium text-[#0F172A]">{label}</span>
        {description && (
          <span className="mt-0.5 block text-[13px] leading-snug text-[#6B7280]">{description}</span>
        )}
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]/30 ${
          checked ? "bg-[#2563EB]" : "bg-[#E5E7EB]"
        }`}
      >
        <span
          className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </label>
  );
}

function SaveBar({ onSave, saved, saving, savingLabel = "Save Changes" }) {
  return (
    <div className="mt-6 flex flex-wrap items-center justify-end gap-3 border-t border-[#F1F5F9] pt-5">
      {saved && (
        <span className="flex items-center gap-1 text-sm font-medium text-[#16A34A]">
          <Check size={16} /> Saved
        </span>
      )}
      <button
        type="button"
        onClick={onSave}
        disabled={saving}
        className="h-10 rounded-lg bg-[#2563EB] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#1D4ED8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]/40 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {saving ? "Saving…" : savingLabel}
      </button>
    </div>
  );
}

function TabPanel({ title, description, children }) {
  return (
    <div className="min-w-0 rounded-xl border border-[#E5E7EB] bg-white p-4 sm:p-6">
      <h2 className="text-lg font-semibold text-[#0F172A] sm:text-xl">{title}</h2>
      {description && <p className="mt-1 text-sm text-[#6B7280]">{description}</p>}
      <div className="mt-5">{children}</div>
    </div>
  );
}

function ErrorBanner({ error }) {
  if (!error) return null;
  return (
    <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-2 text-[13px] text-red-600">
      {error}
    </div>
  );
}

function TabLoading({ title }) {
  return (
    <TabPanel title={title}>
      <p className="text-sm text-[#6B7280]">Loading…</p>
    </TabPanel>
  );
}

function TabSignedOut({ title }) {
  return (
    <TabPanel title={title}>
      <p className="text-sm text-[#6B7280]">Please log in to manage this section.</p>
    </TabPanel>
  );
}

function tabButtonClass(active) {
  return `flex shrink-0 items-center gap-2.5 whitespace-nowrap rounded-lg px-3.5 py-2.5 text-sm font-medium transition-colors lg:w-full ${
    active ? "bg-[#EFF6FF] text-[#2563EB]" : "text-[#374151] hover:bg-[#F9FAFB]"
  }`;
}

function TabNav({ activeKey, onSelect }) {
  return (
    <nav className="flex gap-1.5 overflow-x-auto rounded-xl border border-[#E5E7EB] bg-white p-2 lg:w-[240px] lg:shrink-0 lg:self-start lg:overflow-visible">
      <button
        type="button"
        onClick={() => onSelect("overview")}
        className={tabButtonClass(activeKey === "overview")}
      >
        <LayoutGrid size={18} />
        Overview
      </button>
      {SETTINGS_CARDS.map((card) => {
        const Icon = card.icon;
        return (
          <button
            key={card.key}
            type="button"
            onClick={() => onSelect(card.key)}
            className={tabButtonClass(activeKey === card.key)}
          >
            <Icon size={18} />
            {card.title}
          </button>
        );
      })}
    </nav>
  );
}

// ---------------------------------------------------------------------------
// Tab: Profile Information - backed by /auth/me + /auth/updateuserprofile
// (same endpoints and field names as Profilevarification.jsx)
// ---------------------------------------------------------------------------
function ProfileTab({ userId }) {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    altPhone: "",
    role: "",
    location: "",
    bio: "",
    avatarUrl: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saved, flash] = useSavedFlash();
  const [avatarFile, setAvatarFile] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    getUserDetatils()
      .then((res) => {
        if (cancelled) return;
        const u = res.data.usedetails || {};
        setForm({
          fullName: u.name || "",
          email: u.email || "",
          phone: u.phone || "",
          altPhone: u.altPhone || "",
          role: u.you_are || "",
          location: u.location || "",
          bio: u.bio || "",
          avatarUrl: u.profile || "",
        });
      })
      .catch((err) => !cancelled && setError(apiErrorMessage(err, "Couldn't load your profile.")))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, []);

  const update = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarPick = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    setForm((prev) => ({ ...prev, avatarUrl: URL.createObjectURL(file) }));
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      const formData = new FormData();
      if (userId) formData.append("id", userId);
      formData.append("name", form.fullName);
      formData.append("email", form.email);
      formData.append("phone", form.phone);
      formData.append("altPhone", form.altPhone);
      formData.append("you_are", form.role);
      formData.append("location", form.location);
      formData.append("bio", form.bio);
      if (avatarFile) formData.append("profile", avatarFile);

      const res = await updateUser(formData);
      const u = res.data.data || {};
      setForm((prev) => ({
        ...prev,
        fullName: u.name ?? prev.fullName,
        email: u.email ?? prev.email,
        phone: u.phone ?? prev.phone,
        altPhone: u.altPhone ?? prev.altPhone,
        role: u.you_are ?? prev.role,
        location: u.location ?? prev.location,
        bio: u.bio ?? prev.bio,
        avatarUrl: u.profile || prev.avatarUrl,
      }));
      setAvatarFile(null);
      flash();
    } catch (err) {
      setError(apiErrorMessage(err, "Failed to update profile."));
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <TabLoading title="Profile Information" />;

  return (
    <TabPanel
      title="Profile Information"
      description="View and update your personal information, contact details and profile"
    >
      <ErrorBanner error={error} />
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
        <div className="flex shrink-0 flex-col items-center">
          {form.avatarUrl ? (
            <img
              src={form.avatarUrl}
              alt={form.fullName || "Profile"}
              className="h-24 w-24 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#F3F4F6] text-[#9CA3AF]">
              <User size={36} />
            </div>
          )}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="mt-3 h-9 rounded-lg border border-[#2563EB] px-4 text-xs font-semibold text-[#2563EB] transition-colors hover:bg-[#EFF6FF]"
          >
            Change Photo
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarPick}
          />
        </div>

        <div className="grid flex-1 grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2">
          <Field label="Full Name">
            <input className={inputClasses} name="fullName" value={form.fullName} onChange={update} />
          </Field>
          <Field label="Email Address">
            <input className={inputClasses} name="email" type="email" value={form.email} onChange={update} />
          </Field>
          <Field label="Phone Number">
            <input className={inputClasses} name="phone" value={form.phone} onChange={update} />
          </Field>
          <Field label="Alternate Phone Number">
            <input className={inputClasses} name="altPhone" value={form.altPhone} onChange={update} />
          </Field>
          <Field label="Location / City">
            <input
              className={inputClasses}
              name="location"
              value={form.location}
              onChange={update}
              placeholder="Enter your city"
            />
          </Field>
          <Field label="I am a">
            <input
              className={inputClasses}
              name="role"
              value={form.role}
              onChange={update}
              placeholder="Buyer / Agent / Owner"
            />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Short Bio">
              <textarea
                name="bio"
                value={form.bio}
                onChange={update}
                rows={3}
                placeholder="Tell others about yourself"
                className="w-full resize-none rounded-lg border border-[#D1D5DB] bg-white p-3 text-sm text-[#0F172A] outline-none transition focus:border-[#2563EB] focus:ring-[3px] focus:ring-[#2563EB]/10"
              />
            </Field>
          </div>
        </div>
      </div>

      <SaveBar onSave={handleSave} saved={saved} saving={saving} />
    </TabPanel>
  );
}

// ---------------------------------------------------------------------------
// Tab: Notification Preferences
// ---------------------------------------------------------------------------
const NOTIFICATION_CATEGORIES = [
  { key: "leads", label: "New Leads & Inquiries", description: "When a buyer contacts you or requests a callback" },
  { key: "messages", label: "Messages", description: "New chat messages from buyers or your team" },
  { key: "propertyUpdates", label: "Property Approvals & Status", description: "Listing approvals, rejections and status changes" },
  { key: "marketing", label: "Marketing & Promotions", description: "Offers, tips and product updates" },
  { key: "billing", label: "Billing & Subscription", description: "Payment receipts, renewals and plan changes" },
];

const NOTIFICATION_CHANNELS = [
  { key: "email", label: "Email" },
  { key: "sms", label: "SMS" },
  { key: "push", label: "Push" },
];

function defaultNotificationPrefs() {
  const prefs = {};
  NOTIFICATION_CATEGORIES.forEach((cat) => {
    prefs[cat.key] = { email: true, sms: cat.key === "leads", push: true };
  });
  return prefs;
}

function NotificationsTab({ userId }) {
  const [prefs, setPrefs] = useState(defaultNotificationPrefs());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saved, flash] = useSavedFlash();

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    settingsApi
      .getNotifications(userId)
      .then((res) => {
        if (cancelled) return;
        setPrefs((prev) => ({ ...prev, ...(res.data?.settings || {}) }));
      })
      .catch((err) => !cancelled && setError(apiErrorMessage(err, "Couldn't load notification preferences.")))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [userId]);

  const toggle = (catKey, channelKey) => {
    setPrefs((prev) => ({
      ...prev,
      [catKey]: { ...prev[catKey], [channelKey]: !prev[catKey][channelKey] },
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      const res = await settingsApi.updateNotifications(userId, prefs);
      setPrefs((prev) => ({ ...prev, ...(res.data?.settings || {}) }));
      flash();
    } catch (err) {
      setError(apiErrorMessage(err, "Failed to save notification preferences."));
    } finally {
      setSaving(false);
    }
  };

  if (!userId) return <TabSignedOut title="Notification Preferences" />;
  if (loading) return <TabLoading title="Notification Preferences" />;

  return (
    <TabPanel title="Notification Preferences" description="Choose what notifications you want to receive and how">
      <ErrorBanner error={error} />
      <div className="hidden overflow-x-auto sm:block">
        <table className="w-full min-w-[480px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-[#E5E7EB] text-[13px] text-[#6B7280]">
              <th className="py-2 pr-4 font-medium">Category</th>
              {NOTIFICATION_CHANNELS.map((c) => (
                <th key={c.key} className="w-20 py-2 text-center font-medium">
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {NOTIFICATION_CATEGORIES.map((cat) => (
              <tr key={cat.key} className="border-b border-[#F1F5F9]">
                <td className="py-3 pr-4">
                  <p className="font-medium text-[#0F172A]">{cat.label}</p>
                  <p className="text-xs text-[#6B7280]">{cat.description}</p>
                </td>
                {NOTIFICATION_CHANNELS.map((c) => (
                  <td key={c.key} className="text-center">
                    <input
                      type="checkbox"
                      checked={prefs[cat.key][c.key]}
                      onChange={() => toggle(cat.key, c.key)}
                      className="h-4 w-4 rounded border-[#D1D5DB] text-[#2563EB] focus:ring-[#2563EB]"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-4 sm:hidden">
        {NOTIFICATION_CATEGORIES.map((cat) => (
          <div key={cat.key} className="rounded-lg border border-[#E5E7EB] p-3">
            <p className="text-sm font-medium text-[#0F172A]">{cat.label}</p>
            <p className="mt-0.5 text-xs text-[#6B7280]">{cat.description}</p>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
              {NOTIFICATION_CHANNELS.map((c) => (
                <label key={c.key} className="flex items-center gap-2 text-sm text-[#374151]">
                  <input
                    type="checkbox"
                    checked={prefs[cat.key][c.key]}
                    onChange={() => toggle(cat.key, c.key)}
                    className="h-4 w-4 rounded border-[#D1D5DB] text-[#2563EB] focus:ring-[#2563EB]"
                  />
                  {c.label}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <SaveBar onSave={handleSave} saved={saved} saving={saving} />
    </TabPanel>
  );
}

// ---------------------------------------------------------------------------
// Tab: Privacy & Security
// ---------------------------------------------------------------------------
function defaultPrivacy() {
  return {
    publicProfile: true,
    showPhone: true,
    showEmail: false,
    showActivityStatus: true,
    searchEngineIndexing: false,
    twoFactorAuth: false,
    shareUsageData: true,
  };
}

function PrivacyTab({ userId }) {
  const [settings, setSettings] = useState(defaultPrivacy());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saved, flash] = useSavedFlash();

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    settingsApi
      .getPrivacy(userId)
      .then((res) => {
        if (cancelled) return;
        setSettings((prev) => ({ ...prev, ...(res.data?.settings || {}) }));
      })
      .catch((err) => !cancelled && setError(apiErrorMessage(err, "Couldn't load privacy settings.")))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [userId]);

  const toggle = (key) => setSettings((prev) => ({ ...prev, [key]: !prev[key] }));

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      const res = await settingsApi.updatePrivacy(userId, settings);
      setSettings((prev) => ({ ...prev, ...(res.data?.settings || {}) }));
      flash();
    } catch (err) {
      setError(apiErrorMessage(err, "Failed to save privacy settings."));
    } finally {
      setSaving(false);
    }
  };

  if (!userId) return <TabSignedOut title="Privacy & Security" />;
  if (loading) return <TabLoading title="Privacy & Security" />;

  return (
    <TabPanel title="Privacy & Security" description="Control your privacy setting and manage your account security">
      <ErrorBanner error={error} />
      <div className="divide-y divide-[#F1F5F9]">
        <Toggle
          label="Public Profile"
          description="Allow other users to view your public profile page"
          checked={settings.publicProfile}
          onChange={() => toggle("publicProfile")}
        />
        <Toggle
          label="Show Phone Number"
          description="Let buyers see your phone number on listings"
          checked={settings.showPhone}
          onChange={() => toggle("showPhone")}
        />
        <Toggle
          label="Show Email Address"
          description="Let buyers see your email address on listings"
          checked={settings.showEmail}
          onChange={() => toggle("showEmail")}
        />
        <Toggle
          label="Show Activity Status"
          description="Show when you were last active to other users"
          checked={settings.showActivityStatus}
          onChange={() => toggle("showActivityStatus")}
        />
        <Toggle
          label="Search Engine Indexing"
          description="Allow search engines to index your public profile"
          checked={settings.searchEngineIndexing}
          onChange={() => toggle("searchEngineIndexing")}
        />
        <Toggle
          label="Two-Factor Authentication"
          description="Require an OTP in addition to your password when logging in"
          checked={settings.twoFactorAuth}
          onChange={() => toggle("twoFactorAuth")}
        />
        <Toggle
          label="Share Usage Data"
          description="Help us improve recommendations by sharing anonymised usage data"
          checked={settings.shareUsageData}
          onChange={() => toggle("shareUsageData")}
        />
      </div>
      <SaveBar onSave={handleSave} saved={saved} saving={saving} />
    </TabPanel>
  );
}

// ---------------------------------------------------------------------------
// Tab: Account & Login
// ---------------------------------------------------------------------------
function LoginTab({ userId, user }) {
  const [security, setSecurity] = useState({ loginAlerts: true, passwordExpiry: false });
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saved, flash] = useSavedFlash();

  const [passwordForm, setPasswordForm] = useState({ current: "", next: "", confirm: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordSaving, setPasswordSaving] = useState(false);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    Promise.all([settingsApi.getLoginSecurity(userId), settingsApi.getSessions(userId)])
      .then(([secRes, sessRes]) => {
        if (cancelled) return;
        setSecurity((prev) => ({ ...prev, ...(secRes.data?.settings || {}) }));
        setSessions(sessRes.data?.sessions || []);
      })
      .catch((err) => !cancelled && setError(apiErrorMessage(err, "Couldn't load login & security settings.")))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [userId]);

  const toggleSecurity = (key) => setSecurity((prev) => ({ ...prev, [key]: !prev[key] }));

  const handleSaveSecurity = async () => {
    setSaving(true);
    setError(null);
    try {
      const res = await settingsApi.updateLoginSecurity(userId, security);
      setSecurity((prev) => ({ ...prev, ...(res.data?.settings || {}) }));
      flash();
    } catch (err) {
      setError(apiErrorMessage(err, "Failed to save login preferences."));
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordMessage("");
    if (!passwordForm.current || !passwordForm.next || !passwordForm.confirm) {
      setPasswordError("Please fill in all password fields.");
      return;
    }
    if (passwordForm.next.length < 8) {
      setPasswordError("New password must be at least 8 characters.");
      return;
    }
    if (passwordForm.next !== passwordForm.confirm) {
      setPasswordError("New password and confirmation do not match.");
      return;
    }
    setPasswordSaving(true);
    try {
      await settingsApi.changePassword(userId, {
        currentPassword: passwordForm.current,
        newPassword: passwordForm.next,
      });
      setPasswordMessage("Password updated successfully.");
      setPasswordForm({ current: "", next: "", confirm: "" });
    } catch (err) {
      setPasswordError(apiErrorMessage(err, "Failed to update password."));
    } finally {
      setPasswordSaving(false);
    }
  };

  const endSession = async (id) => {
    try {
      await settingsApi.endSession(userId, id);
      setSessions((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      setError(apiErrorMessage(err, "Failed to end that session."));
    }
  };

  const endOtherSessions = async () => {
    try {
      await settingsApi.endOtherSessions(userId);
      setSessions((prev) => prev.filter((s) => s.current));
    } catch (err) {
      setError(apiErrorMessage(err, "Failed to end other sessions."));
    }
  };

  if (!userId) return <TabSignedOut title="Account & Login" />;
  if (loading) return <TabLoading title="Account & Login" />;

  return (
    <div className="space-y-5">
      <TabPanel title="Account & Login" description="Manage your email, password and account login preferences">
        <ErrorBanner error={error} />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Registered Email">
            <input className={inputClasses} value={user?.email || ""} disabled />
          </Field>
          <Field label="Registered Phone">
            <input className={inputClasses} value={user?.mobile || ""} disabled />
          </Field>
        </div>
        <p className="mt-2 text-xs text-[#9CA3AF]">
          To change your registered email or phone, contact support for verification.
        </p>

        <div className="my-6 border-t border-[#F1F5F9]" />

        <h3 className="text-sm font-semibold text-[#0F172A]">Change Password</h3>
        <form onSubmit={handlePasswordUpdate} className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Field label="Current Password">
              <input
                className={inputClasses}
                type={showPassword ? "text" : "password"}
                value={passwordForm.current}
                onChange={(e) => setPasswordForm((p) => ({ ...p, current: e.target.value }))}
              />
            </Field>
          </div>
          <Field label="New Password">
            <input
              className={inputClasses}
              type={showPassword ? "text" : "password"}
              value={passwordForm.next}
              onChange={(e) => setPasswordForm((p) => ({ ...p, next: e.target.value }))}
            />
          </Field>
          <Field label="Confirm New Password">
            <input
              className={inputClasses}
              type={showPassword ? "text" : "password"}
              value={passwordForm.confirm}
              onChange={(e) => setPasswordForm((p) => ({ ...p, confirm: e.target.value }))}
            />
          </Field>

          <div className="flex flex-wrap items-center justify-between gap-3 sm:col-span-2">
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="flex items-center gap-1.5 text-xs font-medium text-[#6B7280] hover:text-[#374151]"
            >
              {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
              {showPassword ? "Hide passwords" : "Show passwords"}
            </button>
            <button
              type="submit"
              disabled={passwordSaving}
              className="h-10 rounded-lg bg-[#2563EB] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#1D4ED8] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {passwordSaving ? "Updating…" : "Update Password"}
            </button>
          </div>
          {passwordError && <p className="text-sm text-red-600 sm:col-span-2">{passwordError}</p>}
          {passwordMessage && <p className="text-sm text-[#16A34A] sm:col-span-2">{passwordMessage}</p>}
        </form>
      </TabPanel>

      <TabPanel title="Login Preferences">
        <div className="divide-y divide-[#F1F5F9]">
          <Toggle
            label="Login Alerts"
            description="Email me when there's a new login to my account"
            checked={security.loginAlerts}
            onChange={() => toggleSecurity("loginAlerts")}
          />
          <Toggle
            label="Periodic Password Reset"
            description="Ask me to change my password every 90 days"
            checked={security.passwordExpiry}
            onChange={() => toggleSecurity("passwordExpiry")}
          />
        </div>
        <SaveBar onSave={handleSaveSecurity} saved={saved} saving={saving} />
      </TabPanel>

      <TabPanel title="Active Sessions" description="Devices currently signed in to your account">
        {sessions.length === 0 ? (
          <p className="text-sm text-[#6B7280]">No active sessions found.</p>
        ) : (
          <div className="space-y-3">
            {sessions.map((s) => (
              <div
                key={s.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-[#E5E7EB] p-3"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F3F4F6] text-[#374151]">
                    {s.icon === "phone" ? <Smartphone size={18} /> : <Monitor size={18} />}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-[#0F172A]">
                      {s.device}{" "}
                      {s.current && (
                        <span className="ml-1 inline-flex items-center rounded-full bg-[#DCFCE7] px-2 py-0.5 text-[11px] font-medium text-[#16A34A]">
                          This device
                        </span>
                      )}
                    </p>
                    <p className="truncate text-xs text-[#6B7280]">
                      {s.location} · {s.lastActive}
                    </p>
                  </div>
                </div>
                {!s.current && (
                  <button
                    type="button"
                    onClick={() => endSession(s.id)}
                    className="shrink-0 text-xs font-medium text-red-600 hover:underline"
                  >
                    Log out
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
        {sessions.length > 1 && (
          <button
            type="button"
            onClick={endOtherSessions}
            className="mt-4 flex items-center gap-1.5 text-sm font-medium text-red-600 hover:underline"
          >
            <LogOut size={15} /> Log out of all other devices
          </button>
        )}
      </TabPanel>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Tab: Subscription & Billing
// ---------------------------------------------------------------------------
const PLANS = [
  { key: "free", name: "Free", price: "₹0/mo", features: ["3 active listings", "Basic support", "Standard visibility"] },
  {
    key: "professional",
    name: "Professional",
    price: "₹999/mo",
    features: ["25 active listings", "Priority support", "Boosted visibility", "Analytics dashboard"],
  },
  {
    key: "enterprise",
    name: "Enterprise",
    price: "₹2,999/mo",
    features: ["Unlimited listings", "Dedicated manager", "Premium placement", "Team accounts"],
  },
];

function SubscriptionTab({ userId, onUpgrade }) {
  const [planKey, setPlanKey] = useState("free");
  const [renewsOn, setRenewsOn] = useState("");
  const [billingHistory, setBillingHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saved, flash] = useSavedFlash();

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    Promise.all([settingsApi.getSubscription(userId), settingsApi.getBillingHistory(userId)])
      .then(([subRes, billRes]) => {
        if (cancelled) return;
        setPlanKey(subRes.data?.subscription?.plan || "free");
        setRenewsOn(subRes.data?.subscription?.renewsOn || "");
        setBillingHistory(billRes.data?.invoices || []);
      })
      .catch((err) => !cancelled && setError(apiErrorMessage(err, "Couldn't load subscription details.")))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [userId]);

  const currentPlan = PLANS.find((p) => p.key === planKey) || PLANS[0];

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      const res = await settingsApi.updateSubscriptionPlan(userId, planKey);
      if (res.data?.subscription?.renewsOn) setRenewsOn(res.data.subscription.renewsOn);
      flash();
      if (onUpgrade) onUpgrade(planKey);
    } catch (err) {
      setError(apiErrorMessage(err, "Failed to update subscription plan."));
    } finally {
      setSaving(false);
    }
  };

  if (!userId) return <TabSignedOut title="Subscription & Billing" />;
  if (loading) return <TabLoading title="Subscription & Billing" />;

  return (
    <div className="space-y-5">
      <TabPanel
        title="Subscription & Billing"
        description="View your plan details, billing history and manage subscription"
      >
        <ErrorBanner error={error} />
        <div className="rounded-lg bg-[#EFF6FF] p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-[#2563EB]">Current Plan</p>
          <div className="mt-1 flex flex-wrap items-baseline gap-2">
            <p className="text-xl font-bold text-[#0F172A]">{currentPlan.name}</p>
            <p className="text-sm text-[#6B7280]">{currentPlan.price}</p>
          </div>
          {renewsOn && <p className="mt-1 text-xs text-[#6B7280]">Renews on {renewsOn}</p>}
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {PLANS.map((plan) => (
            <button
              key={plan.key}
              type="button"
              onClick={() => setPlanKey(plan.key)}
              className={`rounded-xl border p-4 text-left transition-colors ${
                planKey === plan.key ? "border-[#2563EB] bg-[#EFF6FF]" : "border-[#E5E7EB] hover:border-[#D1D5DB]"
              }`}
            >
              <p className="text-base font-semibold text-[#0F172A]">{plan.name}</p>
              <p className="text-sm text-[#6B7280]">{plan.price}</p>
              <ul className="mt-3 space-y-1.5 text-xs text-[#374151]">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-1.5">
                    <Check size={13} className="mt-0.5 shrink-0 text-[#16A34A]" />
                    {f}
                  </li>
                ))}
              </ul>
            </button>
          ))}
        </div>
        <SaveBar onSave={handleSave} saved={saved} saving={saving} savingLabel="Confirm Plan" />
      </TabPanel>

      <TabPanel title="Billing History">
        {billingHistory.length === 0 ? (
          <p className="text-sm text-[#6B7280]">No billing history yet.</p>
        ) : (
          <>
            <div className="hidden overflow-x-auto sm:block">
              <table className="w-full min-w-[520px] text-left text-sm">
                <thead>
                  <tr className="border-b border-[#E5E7EB] text-xs text-[#6B7280]">
                    <th className="py-2 pr-4 font-medium">Date</th>
                    <th className="py-2 pr-4 font-medium">Description</th>
                    <th className="py-2 pr-4 font-medium">Amount</th>
                    <th className="py-2 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {billingHistory.map((row) => (
                    <tr key={row.id} className="border-b border-[#F1F5F9]">
                      <td className="py-3 pr-4 text-[#374151]">{row.date}</td>
                      <td className="py-3 pr-4 text-[#374151]">{row.description}</td>
                      <td className="py-3 pr-4 text-[#374151]">{row.amount}</td>
                      <td className="py-3">
                        <span className="rounded-full bg-[#DCFCE7] px-2.5 py-0.5 text-xs font-medium text-[#16A34A]">
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="space-y-3 sm:hidden">
              {billingHistory.map((row) => (
                <div key={row.id} className="rounded-lg border border-[#E5E7EB] p-3">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium text-[#0F172A]">{row.description}</p>
                    <span className="shrink-0 rounded-full bg-[#DCFCE7] px-2 py-0.5 text-[11px] font-medium text-[#16A34A]">
                      {row.status}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-[#6B7280]">{row.date}</p>
                  <p className="mt-1 text-sm font-semibold text-[#374151]">{row.amount}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </TabPanel>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Tab: Payment Method
// ---------------------------------------------------------------------------
function detectCardBrand(number) {
  if (/^4/.test(number)) return "Visa";
  if (/^5/.test(number)) return "Mastercard";
  if (/^3/.test(number)) return "Amex";
  return "Card";
}

function PaymentTab({ userId }) {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({ holder: "", number: "", expiry: "", cvv: "" });
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [saved, flash] = useSavedFlash();

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    settingsApi
      .getPaymentMethods(userId)
      .then((res) => {
        if (cancelled) return;
        setCards(res.data?.paymentMethods || []);
      })
      .catch((err) => !cancelled && setError(apiErrorMessage(err, "Couldn't load payment methods.")))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [userId]);

  const handleAdd = async (e) => {
    e.preventDefault();
    setFormError("");
    const digits = form.number.replace(/\s+/g, "");
    if (!form.holder || digits.length < 12 || !/^\d{2}\/\d{2}$/.test(form.expiry) || form.cvv.length < 3) {
      setFormError("Please enter a valid card holder name, number, expiry (MM/YY) and CVV.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await settingsApi.addPaymentMethod(userId, {
        holder: form.holder,
        number: digits,
        expiry: form.expiry,
      });
      const created = res.data?.paymentMethod || {
        id: `c${Date.now()}`,
        brand: detectCardBrand(digits),
        last4: digits.slice(-4),
        expiry: form.expiry,
        holder: form.holder,
        isDefault: cards.length === 0,
      };
      setCards((prev) => [...prev, created]);
      setForm({ holder: "", number: "", expiry: "", cvv: "" });
      flash();
    } catch (err) {
      setFormError(apiErrorMessage(err, "Failed to add card."));
    } finally {
      setSubmitting(false);
    }
  };

  const removeCard = async (id) => {
    try {
      await settingsApi.removePaymentMethod(userId, id);
      setCards((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      setError(apiErrorMessage(err, "Failed to remove card."));
    }
  };

  const setDefaultCard = async (id) => {
    try {
      await settingsApi.setDefaultPaymentMethod(userId, id);
      setCards((prev) => prev.map((c) => ({ ...c, isDefault: c.id === id })));
    } catch (err) {
      setError(apiErrorMessage(err, "Failed to set default card."));
    }
  };

  if (!userId) return <TabSignedOut title="Payment Methods" />;
  if (loading) return <TabLoading title="Payment Methods" />;

  return (
    <div className="space-y-5">
      <TabPanel title="Payment Methods" description="Manage your saved payment methods and billing details">
        <ErrorBanner error={error} />
        {cards.length === 0 ? (
          <p className="text-sm text-[#6B7280]">You have no saved payment methods yet.</p>
        ) : (
          <div className="space-y-3">
            {cards.map((card) => (
              <div
                key={card.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-[#E5E7EB] p-3"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-14 shrink-0 items-center justify-center rounded-md bg-[#F3F4F6] text-xs font-bold text-[#374151]">
                    {card.brand}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-[#0F172A]">
                      •••• •••• •••• {card.last4}{" "}
                      {card.isDefault && (
                        <span className="ml-1 inline-flex items-center rounded-full bg-[#DCFCE7] px-2 py-0.5 text-[11px] font-medium text-[#16A34A]">
                          Default
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-[#6B7280]">
                      {card.holder} · Expires {card.expiry}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {!card.isDefault && (
                    <button
                      type="button"
                      onClick={() => setDefaultCard(card.id)}
                      className="text-xs font-medium text-[#2563EB] hover:underline"
                    >
                      Set default
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => removeCard(card.id)}
                    aria-label="Remove card"
                    className="text-[#9CA3AF] transition-colors hover:text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </TabPanel>

      <TabPanel title="Add New Card">
        <form onSubmit={handleAdd} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Field label="Card Holder Name">
              <input
                className={inputClasses}
                value={form.holder}
                onChange={(e) => setForm((f) => ({ ...f, holder: e.target.value }))}
                placeholder="Name on card"
              />
            </Field>
          </div>
          <div className="sm:col-span-2">
            <Field label="Card Number">
              <input
                className={inputClasses}
                value={form.number}
                onChange={(e) => setForm((f) => ({ ...f, number: e.target.value }))}
                placeholder="1234 5678 9012 3456"
                inputMode="numeric"
              />
            </Field>
          </div>
          <Field label="Expiry (MM/YY)">
            <input
              className={inputClasses}
              value={form.expiry}
              onChange={(e) => setForm((f) => ({ ...f, expiry: e.target.value }))}
              placeholder="08/27"
            />
          </Field>
          <Field label="CVV">
            <input
              className={inputClasses}
              value={form.cvv}
              onChange={(e) => setForm((f) => ({ ...f, cvv: e.target.value }))}
              placeholder="123"
              inputMode="numeric"
              maxLength={4}
            />
          </Field>
          {formError && <p className="text-sm text-red-600 sm:col-span-2">{formError}</p>}
          <div className="flex items-center justify-end gap-3 sm:col-span-2">
            {saved && (
              <span className="flex items-center gap-1 text-sm font-medium text-[#16A34A]">
                <Check size={16} /> Card added
              </span>
            )}
            <button
              type="submit"
              disabled={submitting}
              className="flex h-10 items-center gap-1.5 rounded-lg bg-[#2563EB] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#1D4ED8] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Plus size={16} /> {submitting ? "Adding…" : "Add Card"}
            </button>
          </div>
        </form>
      </TabPanel>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Tab: Language & Region
// ---------------------------------------------------------------------------
const LANGUAGES = ["English", "Hindi", "Bengali", "Tamil", "Telugu", "Marathi", "Gujarati"];
const REGIONS = ["India", "United States", "United Kingdom", "United Arab Emirates", "Singapore"];
const TIMEZONES = [
  "(GMT+5:30) India Standard Time",
  "(GMT+0:00) UTC",
  "(GMT-5:00) Eastern Time",
  "(GMT+4:00) Gulf Standard Time",
];
const DATE_FORMATS = ["DD/MM/YYYY", "MM/DD/YYYY", "YYYY-MM-DD"];
const CURRENCIES = ["INR", "USD", "EUR", "GBP", "AED"];
const CURRENCY_SYMBOLS = { INR: "₹", USD: "$", EUR: "€", GBP: "£", AED: "AED " };

function defaultLanguageSettings() {
  return { language: "English", region: "India", timezone: TIMEZONES[0], dateFormat: "DD/MM/YYYY", currency: "INR" };
}

function formatSampleDate(format) {
  const d = new Date(2026, 6, 23);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  if (format === "MM/DD/YYYY") return `${mm}/${dd}/${yyyy}`;
  if (format === "YYYY-MM-DD") return `${yyyy}-${mm}-${dd}`;
  return `${dd}/${mm}/${yyyy}`;
}

function LanguageTab({ userId }) {
  const [settings, setSettings] = useState(defaultLanguageSettings());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saved, flash] = useSavedFlash();

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    settingsApi
      .getLanguage(userId)
      .then((res) => {
        if (cancelled) return;
        setSettings((prev) => ({ ...prev, ...(res.data?.settings || {}) }));
      })
      .catch((err) => !cancelled && setError(apiErrorMessage(err, "Couldn't load language settings.")))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [userId]);

  const update = (key, value) => setSettings((prev) => ({ ...prev, [key]: value }));

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      const res = await settingsApi.updateLanguage(userId, settings);
      setSettings((prev) => ({ ...prev, ...(res.data?.settings || {}) }));
      flash();
    } catch (err) {
      setError(apiErrorMessage(err, "Failed to save language settings."));
    } finally {
      setSaving(false);
    }
  };

  if (!userId) return <TabSignedOut title="Language & Region" />;
  if (loading) return <TabLoading title="Language & Region" />;

  return (
    <TabPanel title="Language & Region" description="Set your preferred language, time zone and region">
      <ErrorBanner error={error} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <SelectField label="Language" value={settings.language} onChange={(v) => update("language", v)} options={LANGUAGES} />
        <SelectField label="Region / Country" value={settings.region} onChange={(v) => update("region", v)} options={REGIONS} />
        <SelectField label="Time Zone" value={settings.timezone} onChange={(v) => update("timezone", v)} options={TIMEZONES} />
        <SelectField label="Date Format" value={settings.dateFormat} onChange={(v) => update("dateFormat", v)} options={DATE_FORMATS} />
        <SelectField label="Currency" value={settings.currency} onChange={(v) => update("currency", v)} options={CURRENCIES} />
      </div>

      <div className="mt-5 rounded-lg bg-[#F9FAFB] p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-[#6B7280]">Preview</p>
        <p className="mt-1 text-sm text-[#374151]">
          Sample date: <span className="font-semibold text-[#0F172A]">{formatSampleDate(settings.dateFormat)}</span>
        </p>
        <p className="text-sm text-[#374151]">
          Sample amount:{" "}
          <span className="font-semibold text-[#0F172A]">{CURRENCY_SYMBOLS[settings.currency]}1,250.00</span>
        </p>
      </div>

      <SaveBar onSave={handleSave} saved={saved} saving={saving} />
    </TabPanel>
  );
}

// ---------------------------------------------------------------------------
// Tab: Appearance
// ---------------------------------------------------------------------------
const THEME_OPTIONS = [
  { key: "light", label: "Light", icon: Sun },
  { key: "dark", label: "Dark", icon: Moon },
  { key: "system", label: "System", icon: Monitor },
];

const ACCENT_COLORS = [
  { key: "blue", value: "#2563EB" },
  { key: "purple", value: "#7C3AED" },
  { key: "green", value: "#16A34A" },
  { key: "orange", value: "#F97316" },
  { key: "red", value: "#EF4444" },
];

const FONT_SIZES = ["Small", "Medium", "Large"];

function defaultAppearance() {
  return { theme: "light", accent: "blue", fontSize: "Medium" };
}

function AppearanceTab({ userId }) {
  const [settings, setSettings] = useState(defaultAppearance());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saved, flash] = useSavedFlash();

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    settingsApi
      .getAppearance(userId)
      .then((res) => {
        if (cancelled) return;
        setSettings((prev) => ({ ...prev, ...(res.data?.settings || {}) }));
      })
      .catch((err) => !cancelled && setError(apiErrorMessage(err, "Couldn't load appearance settings.")))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [userId]);

  const update = (key, value) => setSettings((prev) => ({ ...prev, [key]: value }));

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      const res = await settingsApi.updateAppearance(userId, settings);
      setSettings((prev) => ({ ...prev, ...(res.data?.settings || {}) }));
      flash();
    } catch (err) {
      setError(apiErrorMessage(err, "Failed to save appearance settings."));
    } finally {
      setSaving(false);
    }
  };

  if (!userId) return <TabSignedOut title="Appearance" />;
  if (loading) return <TabLoading title="Appearance" />;

  const accentValue = ACCENT_COLORS.find((c) => c.key === settings.accent)?.value || "#2563EB";
  const previewIsDark = settings.theme === "dark";
  const previewFontSize = settings.fontSize === "Small" ? "13px" : settings.fontSize === "Large" ? "17px" : "15px";

  return (
    <TabPanel title="Appearance" description="Customize theme, color mode and display preferences">
      <ErrorBanner error={error} />
      <div>
        <p className="mb-2 text-sm font-medium text-[#374151]">Theme</p>
        <div className="grid grid-cols-3 gap-3">
          {THEME_OPTIONS.map((opt) => {
            const Icon = opt.icon;
            const active = settings.theme === opt.key;
            return (
              <button
                key={opt.key}
                type="button"
                onClick={() => update("theme", opt.key)}
                className={`flex flex-col items-center gap-2 rounded-xl border p-4 transition-colors ${
                  active ? "border-[#2563EB] bg-[#EFF6FF]" : "border-[#E5E7EB] hover:border-[#D1D5DB]"
                }`}
              >
                <Icon size={20} className={active ? "text-[#2563EB]" : "text-[#6B7280]"} />
                <span className={`text-sm font-medium ${active ? "text-[#2563EB]" : "text-[#374151]"}`}>
                  {opt.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6">
        <p className="mb-2 text-sm font-medium text-[#374151]">Accent Color</p>
        <div className="flex flex-wrap gap-3">
          {ACCENT_COLORS.map((color) => (
            <button
              key={color.key}
              type="button"
              aria-label={color.key}
              onClick={() => update("accent", color.key)}
              className="h-9 w-9 rounded-full transition-shadow"
              style={{
                backgroundColor: color.value,
                boxShadow: settings.accent === color.key ? `0 0 0 2px white, 0 0 0 4px ${color.value}` : "none",
              }}
            />
          ))}
        </div>
      </div>

      <div className="mt-6">
        <p className="mb-2 text-sm font-medium text-[#374151]">Font Size</p>
        <div className="inline-flex rounded-lg border border-[#E5E7EB] p-1">
          {FONT_SIZES.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => update("fontSize", size)}
              className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
                settings.fontSize === size ? "bg-[#2563EB] text-white" : "text-[#374151] hover:bg-[#F9FAFB]"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <p className="mb-2 text-sm font-medium text-[#374151]">Live Preview</p>
        <div
          className={`rounded-xl border p-5 transition-colors ${
            previewIsDark ? "border-[#1F2937] bg-[#0F172A]" : "border-[#E5E7EB] bg-white"
          }`}
          style={{ fontSize: previewFontSize }}
        >
          <p className={`font-semibold ${previewIsDark ? "text-white" : "text-[#0F172A]"}`}>Sample Heading</p>
          <p className={`mt-1 ${previewIsDark ? "text-gray-300" : "text-[#6B7280]"}`}>
            This is how your interface elements will look.
          </p>
          <button
            type="button"
            className="mt-3 rounded-lg px-4 py-2 text-sm font-semibold text-white"
            style={{ backgroundColor: accentValue }}
          >
            Sample Button
          </button>
        </div>
      </div>

      <SaveBar onSave={handleSave} saved={saved} saving={saving} />
    </TabPanel>
  );
}

// ---------------------------------------------------------------------------
// Overview grid pieces
// ---------------------------------------------------------------------------
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

const DEFAULT_STATS = { activeListings: 0, leadsAndInquiries: 0, savedProperties: 0 };

export default function Settingdashboard({ setSettingsPage, onNavigate, onUpgrade, onContactSupport }) {
  const [activeTab, setActiveTab] = useState("overview");
  const reduxUser = useSelector((state) => state.user);
  const userId = reduxUser?.id;

  const user = {
    name: reduxUser?.name || "Your Account",
    verified: reduxUser?.loggedIn || false,
    email: reduxUser?.email || "",
    phone: reduxUser?.mobile || "",
    avatarUrl: reduxUser?.profile_photo || "",
    stats: DEFAULT_STATS,
    accountType: reduxUser?.you_are || "—",
    memberSince: "—",
    accountStatus: reduxUser?.loggedIn ? "Verified" : "Not signed in",
  };

  const handleNavigate = (key) => {
    if (key === "business") {
      setSettingsPage("BusinessProfile");
      return;
    }
    setActiveTab(key);
    if (onNavigate) onNavigate(key);
  };

  const handleUpgrade = (planKey) => {
    if (onUpgrade) onUpgrade(planKey);
  };
  const handleSupport = () => {
    if (onContactSupport) onContactSupport();
    else console.log("[SettingsDashboard] contact support clicked");
  };

  const activeCard = SETTINGS_CARDS.find((c) => c.key === activeTab);

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileTab userId={userId} />;
      case "notifications":
        return <NotificationsTab userId={userId} />;
      case "privacy":
        return <PrivacyTab userId={userId} />;
      case "login":
        return <LoginTab userId={userId} user={reduxUser} />;
      case "subscription":
        return <SubscriptionTab userId={userId} onUpgrade={handleUpgrade} />;
      case "payment":
        return <PaymentTab userId={userId} />;
      case "language":
        return <LanguageTab userId={userId} />;
      case "appearance":
        return <AppearanceTab userId={userId} />;
      default:
        return null;
    }
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

        {activeTab === "overview" ? (
          <>
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
                {/* Account Summary - backed by Redux user state */}
                <div className="rounded-xl border border-[#E5E7EB] bg-white p-5">
                  <h3 className="mb-4 text-lg font-semibold text-[#0F172A]">Account Summary</h3>
                  <div className="flex items-center gap-3">
                    {user.avatarUrl ? (
                      <img
                        src={user.avatarUrl}
                        alt={user.name}
                        className="h-12 w-12 shrink-0 rounded-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#F3F4F6] text-[#9CA3AF]">
                        <User size={22} />
                      </div>
                    )}
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
                    onClick={() => handleNavigate("subscription")}
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
                Settings
              </button>
              <span className="text-[#D1D5DB]">›</span>
              <span className="font-medium text-[#2563EB]">{activeCard?.title}</span>
            </nav>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-[240px_minmax(0,1fr)] lg:items-start">
              <TabNav activeKey={activeTab} onSelect={handleNavigate} />
              <div className="min-w-0">{renderTabContent()}</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
