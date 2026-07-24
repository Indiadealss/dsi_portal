import React, { useEffect, useState } from "react";
import { businessProfileApi } from "../api/api.js";
import { useSelector } from "react-redux";

const ROLE_BADGE_STYLES = {
  Admin: "bg-[#E2F7EA] text-[#079447]",
  Manager: "bg-[#E2F7EA] text-[#079447]",
  Agent: "bg-[#E4EEFF] text-[#0067D9]",
};

const ROLE_OPTIONS = ["Admin", "Manager", "Agent"];

function initials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join(".");
}

function Field({ label, children }) {
  return (
    <div>
      <label className="mb-2 block text-[13px] font-medium text-[#071E33]">
        {label}
      </label>
      {children}
    </div>
  );
}

const inputClasses =
  "h-[38px] w-full rounded-[5px] border border-[#B8BDC3] bg-white px-3.5 text-[13px] text-[#071E33] " +
  "placeholder:text-[#9AA1A8] outline-none transition focus:border-[#0078F0] focus:ring-[3px] focus:ring-[#0078F0]/10";

const selectClasses = inputClasses + " appearance-none pr-8";

function ChevronDown({ className = "" }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M5 7.5L10 12.5L15 7.5"
        stroke="#666"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SelectField({ label, value, onChange, options, name }) {
  return (
    <Field label={label}>
      <div className="relative">
        <select
          name={name}
          value={value}
          onChange={onChange}
          className={selectClasses}
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2" />
      </div>
    </Field>
  );
}

export default function BusinessProfile({ setSettingsPage }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);


  const user = useSelector((state) => state.user);

  const userId = user.id;
  const ownerId = user.id;

  console.log(userId, 'user is the owner');
  

  useEffect(() => {
    let cancelled = false;

    businessProfileApi
      .getAll(userId)
      .then((response) => {
        if (cancelled) return;
        
        setProfile(response.data.profile);
        setTeamMembers(response.data.profile.teamMembers);
      })
      .catch((err) => !cancelled && setError(err.message))
      .finally(() => !cancelled && setLoading(false));

    return () => {
      cancelled = true;
    };
  }, [userId]);

  function updateField(e) {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSave() {
   
    if (!userId) {
    setError("User ID not found");
    return;
  }

  if (!profile) {
    setError("Profile data not found");
    return;
  }

   setSaving(true);
    setError(null);
    try {
      const { profile: saved } = await businessProfileApi.updateProfile(
        userId,
        profile
      );
      console.log(
      "Updated profile:",
      response.data
    );
      setProfile(saved);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleAddMember(userId,member) {

    console.log(userId);
    
    const { member: created } = await businessProfileApi.addTeamMember(
      ownerId,
      userId
    );
    setTeamMembers((prev) => [...prev, created]);
    setModalOpen(false);
  }

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center text-[14px] text-[#666]">
        Loading business profile…
      </div>
    );
  }

  if (error && !profile) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-2 text-center">
        <p className="text-[14px] text-red-600">Couldn't load your business profile.</p>
        <p className="text-[13px] text-[#666]">{error}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-3 flex items-center gap-3 text-[14px]">
        <button className="text-[#444] cursor-pointer" onClick={() => setSettingsPage('main')}>Setting</button>
        <span className="text-[#B0B6BC]">›</span>
        <span className="font-medium text-[#0078F0]">Business Profile</span>
      </nav>

      {/* Header */}
      <h1 className="text-[22px] font-bold leading-tight text-[#071E33] sm:text-[26px]">
        Business Profile
      </h1>
      <p className="mt-1.5 text-[14px] text-[#666]">
        Manage your business information, logo, team details and office address
      </p>

      {error && (
        <div className="mt-4 rounded-md border border-red-200 bg-red-50 px-4 py-2 text-[13px] text-red-600">
          {error}
        </div>
      )}

      {/* Main grid */}
      <div className="mt-5 grid grid-cols-1 items-start gap-5 lg:grid-cols-[minmax(0,2.3fr)_minmax(320px,1fr)]">
        {/* LEFT COLUMN */}
        <div className="rounded-lg border border-[#D8DDE2] bg-white p-4 sm:p-5">
          <h2 className="mb-5 text-[16px] font-semibold text-[#071E33]">
            Business information
          </h2>

          <div className="flex flex-col gap-6 sm:flex-row">
            {/* Logo uploader */}
            <div className="flex shrink-0 flex-col items-start sm:items-center">
              <div className="relative h-[140px] w-[140px] overflow-hidden rounded-full bg-gradient-to-br from-[#C9CDD3] to-[#8B9099]">
                {profile?.logoUrl && (
                  <img
                    src={profile?.logoUrl}
                    alt="Business logo"
                    className="h-full w-full object-cover"
                  />
                )}
                <button
                  type="button"
                  aria-label="Change logo"
                  className="absolute bottom-1 right-1 flex h-9 w-9 items-center justify-center rounded-full border border-[#D8DDE2] bg-white shadow-sm"
                >
                  <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none">
                    <path
                      d="M4 8h3l1.5-2h7L17 8h3a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V9a1 1 0 011-1z"
                      stroke="#0078F0"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                    <circle cx="12" cy="13.5" r="3.2" stroke="#0078F0" strokeWidth="1.5" />
                  </svg>
                </button>
              </div>
              <p className="mt-3 text-[13px] text-[#7A7A7A]">JPG, PNG (Max 5MB)</p>
              <button
                type="button"
                className="mt-2 h-[34px] rounded-md border border-[#0078F0] px-6 text-[13px] font-medium text-[#0078F0] transition hover:bg-[#0078F0]/5"
              >
                Change Photo
              </button>
            </div>

            {/* Form grid */}
            <div className="grid flex-1 grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2">
              <Field label="Business Name">
                <input
                  className={inputClasses}
                  name="businessName"
                  value={profile?.businessName}
                  onChange={updateField}
                />
              </Field>
              <SelectField
                label="Business Type"
                name="businessType"
                value={profile?.businessType}
                onChange={updateField}
                options={["Real Estate Agency", "Broker", "Developer", "Property Manager"]}
              />
              <Field label="Company Registration Number">
                <input
                  className={inputClasses}
                  name="registrationNumber"
                  value={profile?.registrationNumber}
                  onChange={updateField}
                />
              </Field>
              <Field label="Year of Establishment">
                <input
                  className={inputClasses}
                  name="yearOfEstablishment"
                  value={profile?.yearOfEstablishment}
                  onChange={updateField}
                />
              </Field>
              <Field label="Website (optional)">
                <input
                  className={inputClasses}
                  name="website"
                  value={profile?.website}
                  onChange={updateField}
                />
              </Field>
              <Field label="Business Email">
                <input
                  className={inputClasses}
                  name="businessEmail"
                  type="email"
                  value={profile?.businessEmail}
                  onChange={updateField}
                />
              </Field>
              <Field label="Business Phone Number">
                <input
                  className={inputClasses}
                  name="businessPhone"
                  value={profile?.businessPhone}
                  onChange={updateField}
                />
              </Field>
              <Field label="Alternate Phone Number">
                <input
                  className={inputClasses}
                  name="alternatePhone"
                  value={profile?.alternatePhone}
                  onChange={updateField}
                />
              </Field>
            </div>
          </div>

          <div className="my-6 border-t border-[#D8DDE2]" />

          <h2 className="mb-5 text-[16px] font-semibold text-[#071E33]">
            Office Address
          </h2>

          <div className="grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2">
            <Field label="Address Line 1">
              <input
                className={inputClasses}
                name="addressLine1"
                value={profile?.addressLine1}
                onChange={updateField}
              />
            </Field>
            <Field label="Address Line 2 (Optional)">
              <input
                className={inputClasses}
                name="addressLine2"
                value={profile?.addressLine2}
                onChange={updateField}
              />
            </Field>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-3">
            <Field label="City">
              <input
                className={inputClasses}
                name="city"
                value={profile?.city}
                onChange={updateField}
              />
            </Field>
            <Field label="State">
              <input
                className={inputClasses}
                name="state"
                value={profile?.state}
                onChange={updateField}
              />
            </Field>
            <Field label="PIN Code">
              <input
                className={inputClasses}
                name="pinCode"
                value={profile?.pinCode}
                onChange={updateField}
              />
            </Field>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3">
            <SelectField
              label="Country"
              name="country"
              value={profile?.country}
              onChange={updateField}
              options={["India", "United States", "United Kingdom", "UAE"]}
            />
          </div>

          <div className="mt-6">
            <label className="mb-1 block text-[13px] font-medium text-[#071E33]">
              Business Description (Optional)
            </label>
            <p className="mb-2 text-[12.5px] text-[#7A7A7A]">
              Tell Clients about your business, your mission and the services you offer
            </p>
            <textarea
              name="description"
              value={profile?.description}
              onChange={updateField}
              rows={3}
              className="w-full resize-none rounded-[5px] border border-[#B8BDC3] bg-white p-3.5 text-[13px] text-[#071E33] outline-none transition focus:border-[#0078F0] focus:ring-[3px] focus:ring-[#0078F0]/10"
            />
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-[#D8DDE2] pt-5">
            <button
              type="button"
              className="h-[38px] rounded-[4px] border border-[#D8DDE2] px-6 text-[13px] font-medium text-[#475569] transition hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="h-[38px] rounded-[4px] bg-[#0078F0] px-7 text-[13px] font-medium text-white transition hover:bg-[#0069D9] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Saving…" : "Save Changes"}
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex flex-col gap-5">
          {/* Business Preview */}
          <div className="rounded-lg border border-[#D8DDE2] bg-white p-4">
            <h3 className="mb-3 text-[16px] font-semibold text-[#071E33]">
              Business Preview
            </h3>
            <div className="rounded-md bg-[#F5F9F7] p-4">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 shrink-0 rounded-full bg-gradient-to-br from-[#C9CDD3] to-[#8B9099]" />
                <div>
                  <p className="text-[15px] font-semibold text-[#071E33]">
                    {profile?.businessName}
                  </p>
                  <p className="text-[13px] text-[#7A7A7A]">{profile?.businessType}</p>
                  <p className="text-[13px] text-[#7A7A7A]">
                    {profile?.city}, {profile?.state}
                  </p>
                </div>
              </div>
              <div className="my-3 border-t border-[#D8DDE2]" />
              <div className="flex flex-col gap-1.5 text-[13px] text-[#7A7A7A]">
                <span>{profile?.businessPhone}</span>
                <span>{profile?.businessEmail}</span>
                <span>{profile?.website}</span>
              </div>
            </div>
          </div>

          {/* Team Members */}
          <div className="rounded-lg border border-[#D8DDE2] bg-white p-4">
            <h3 className="mb-3 text-[16px] font-semibold text-[#071E33]">
              Team Members
            </h3>
            <div className="flex flex-col gap-4">
              {teamMembers?.map((member) => (
                <div key={member.id} className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F0EBFF] text-[12px] font-semibold text-[#7357FF]">
                    {initials(member.name)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="truncate text-[13.5px] font-medium text-[#071E33]">
                        {member.name}
                      </p>
                      <span
                        className={`shrink-0 rounded-md px-3 py-0.5 text-[12px] font-medium ${
                          ROLE_BADGE_STYLES[member.role] ||
                          "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {member.role}
                      </span>
                    </div>
                    <p className="truncate text-[12.5px] text-[#7A7A7A]">
                      {member.email}
                    </p>
                    <p className="text-[12.5px] text-[#7A7A7A]">{member.phone}</p>
                  </div>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="mt-4 text-[13px] font-medium text-[#079447] hover:underline"
            >
              + Add Team Member
            </button>
          </div>

          {/* Need Help */}
          <div className="rounded-lg border border-[#D8DDE2] bg-white p-4">
            <div className="flex h-[58px] w-[58px] items-center justify-center rounded-[14px] bg-[#DCF7E7]">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
                <path
                  d="M4 13a8 8 0 0116 0"
                  stroke="#079447"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
                <path
                  d="M4 13v3a2 2 0 002 2h1v-6H6a2 2 0 00-2 2zM20 13v3a2 2 0 01-2 2h-1v-6h1a2 2 0 012 2z"
                  stroke="#079447"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="mt-3 text-[15px] font-semibold text-[#071E33]">
              Need Help?
            </h3>
            <p className="mt-1 text-[13px] text-[#7A7A7A]">
              Our support team is here to help you with your account and settings
            </p>
            <button
              type="button"
              className="mt-3 h-[34px] w-full rounded-[5px] border border-[#0078F0] text-[13px] font-medium text-[#0078F0] transition hover:bg-[#0078F0]/5"
            >
              Contact Support
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <AddTeamMemberModal
          onClose={() => setModalOpen(false)}
          onSubmit={handleAddMember}
        />
      )}
    </div>
  );
}

function AddTeamMemberModal({ onClose, onSubmit }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
  });
  const [sendInvitation, setSendInvitation] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  function update(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit() {
    if (!form.name || !form.email || !form.role) {
      setError("Full name, email and role are required.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      await onSubmit({ ...form, sendInvitation });
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-[570px] overflow-y-auto rounded-xl bg-white p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-[20px] font-bold text-[#071E33]">
              Add Team Member
            </h2>
            <p className="mt-1 text-[14px] text-[#7A7A7A]">
              Invite a new team member to collaborate with you.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="text-[#666] hover:text-[#071E33]"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className="mt-5 flex flex-col gap-4">
          <Field label="Full Name">
            <input
              className={inputClasses}
              name="name"
              placeholder="Enter full name"
              value={form.name}
              onChange={update}
            />
          </Field>
          <Field label="Email Address">
            <input
              className={inputClasses}
              name="email"
              type="email"
              placeholder="Enter email address"
              value={form.email}
              onChange={update}
            />
          </Field>
          <Field label="Phone Number (Optional)">
            <input
              className={inputClasses}
              name="phone"
              placeholder="Enter phone number"
              value={form.phone}
              onChange={update}
            />
          </Field>
          <SelectField
            label="Role"
            name="role"
            value={form.role}
            onChange={update}
            options={["", ...ROLE_OPTIONS]}
          />

          <div className="rounded-lg bg-[#EFF7FF] p-4 text-[13px] text-[#334155]">
            <div className="mb-2 flex items-center gap-2 font-medium text-[#0078F0]">
              <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none">
                <circle cx="10" cy="10" r="8" stroke="#0078F0" strokeWidth="1.4" />
                <path d="M10 9v5" stroke="#0078F0" strokeWidth="1.4" strokeLinecap="round" />
                <circle cx="10" cy="6.5" r="0.9" fill="#0078F0" />
              </svg>
              Roles & Permissions
            </div>
            <ul className="space-y-1">
              <li><span className="font-medium">Admin</span> — Full access to all settings and members</li>
              <li><span className="font-medium">Manager</span> — Manage properties, team and leads</li>
              <li><span className="font-medium">Agent</span> — View and manage leads & properties</li>
            </ul>
          </div>

          <label className="flex items-center gap-2 text-[13.5px] text-[#071E33]">
            <input
              type="checkbox"
              checked={sendInvitation}
              onChange={(e) => setSendInvitation(e.target.checked)}
              className="h-4 w-4 rounded border-[#B8BDC3] text-[#0078F0] focus:ring-[#0078F0]"
            />
            Send invitation email
          </label>

          {error && <p className="text-[13px] text-red-600">{error}</p>}
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-[#D8DDE2] pt-5">
          <button
            type="button"
            onClick={onClose}
            className="h-[38px] rounded-[4px] border border-[#CDD2D7] px-6 text-[13px] font-medium text-[#475569] hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            className="h-[38px] rounded-[4px] bg-[#0078F0] px-6 text-[13px] font-medium text-white transition hover:bg-[#0069D9] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Adding…" : "Add Member"}
          </button>
        </div>
      </div>
    </div>
  );
}
