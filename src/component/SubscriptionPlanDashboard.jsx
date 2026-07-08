import React, { useState } from "react";
import {
  LayoutGrid,
  Sparkles,
  Gem,
  Crown,
  Check,
  Circle,
  CheckCircle2,
  XCircle,
  Eye,
  Users,
  Zap,
  TrendingUp,
  Headphones,
} from "lucide-react";

const PLANS = [
  {
    key: "basic",
    name: "Basic",
    description: "Perfect for getting started with your real estate journey",
    icon: LayoutGrid,
    iconBg: "#DCFCE7",
    iconColor: "#16A34A",
    price: "999",
    isCustom: false,
    cta: "Current Plan",
    ctaVariant: "outline",
    popular: false,
    features: [
      { label: "Up to 5 Property Listings", enabled: true },
      { label: "10 Leads / Month", enabled: true },
      { label: "Basic Search and Filters", enabled: true },
      { label: "Messages and inquiries", enabled: true },
      { label: "Mobile Access", enabled: true },
      { label: "Featured Listings", enabled: false },
      { label: "Priority Support", enabled: false },
      { label: "Analytics & Reports", enabled: false },
    ],
  },
  {
    key: "pro",
    name: "Pro",
    description: "Ideal for growing agents and real estate professionals",
    icon: Sparkles,
    iconBg: "#DBEAFE",
    iconColor: "#2563EB",
    price: "2,499",
    isCustom: false,
    cta: "Upgrade to Pro",
    ctaVariant: "outline",
    popular: true,
    features: [
      { label: "Up to 25 Property Listings", enabled: true },
      { label: "50 Leads / Month", enabled: true },
      { label: "Advance Search & Filter", enabled: true },
      { label: "Messages and inquiries", enabled: true },
      { label: "Featured Listings", enabled: true },
      { label: "Analytics & Reports", enabled: true },
      { label: "Priority Support", enabled: true },
      { label: "Team Member (Coming Soon)", enabled: false },
    ],
  },
  {
    key: "premium",
    name: "Premium",
    description: "Advanced tools for serious real estate professionals.",
    icon: Gem,
    iconBg: "#F3E8FF",
    iconColor: "#7C3AED",
    price: "4,999",
    isCustom: false,
    cta: "Upgrade to Premium",
    ctaVariant: "outline",
    popular: false,
    features: [
      { label: "up to 100 Property Listings", enabled: true },
      { label: "200 Leads / month", enabled: true },
      { label: "Advanced Search & Filters", enabled: true },
      { label: "Messages and inquiries", enabled: true },
      { label: "Featured Listings", enabled: true },
      { label: "Analytics & Reports", enabled: true },
      { label: "Priority Support", enabled: true },
      { label: "Team Members (3 Users)", enabled: true },
    ],
  },
  {
    key: "enterprise",
    name: "Enterprise",
    description: "Custom Solutions for agencies and enterprises",
    icon: Crown,
    iconBg: "#FFF7ED",
    iconColor: "#EA580C",
    price: null,
    isCustom: true,
    cta: "Contact Sales",
    ctaVariant: "outline",
    popular: false,
    features: [
      { label: "Unlimited Property Listings", enabled: true },
      { label: "Unlimited leads", enabled: true },
      { label: "Advanced Search & Filters", enabled: true },
      { label: "Messages and Inquiries", enabled: true },
      { label: "Featured Listings", enabled: true },
      { label: "Analytics & Reports", enabled: true },
      { label: "Priority Support", enabled: true },
      { label: "Team Members (Unlimited)", enabled: true },
      { label: "Custom Branding", enabled: true },
    ],
  },
];

const COMPARE_ROWS = [
  { label: "Leads Report", basic: "up to 5", pro: "up to 25", premium: "up to 100", enterprise: "Unlimited" },
  { label: "Leads Report", basic: "10", pro: "50", premium: "200", enterprise: "Unlimited" },
  { label: "Featured Listings", basic: false, pro: true, premium: true, enterprise: true },
  { label: "Analytics & Reports", basic: false, pro: true, premium: true, enterprise: true },
  { label: "Priority Support", basic: false, pro: true, premium: true, enterprise: true },
  { label: "Team Members", basic: false, pro: "Coming Soon", premium: "3 Users", enterprise: "Unlimited" },
];

function PlanIcon({ icon: Icon, bg, color }) {
  return (
    <div
      className="flex h-[60px] w-[60px] items-center justify-center rounded-2xl"
      style={{ backgroundColor: bg }}
    >
      <Icon className="h-7 w-7" style={{ color }} strokeWidth={2} />
    </div>
  );
}

function FeatureRow({ label, enabled }) {
  return (
    <div className="flex items-center gap-3 py-1.5">
      {enabled ? (
        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#E8F5FF]">
          <Check className="h-3 w-3 text-[#1677FF]" strokeWidth={3} />
        </span>
      ) : (
        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#D1D5DB]">
          <Circle className="h-2 w-2 fill-[#9CA3AF] text-[#9CA3AF]" />
        </span>
      )}
      <span
        className={`text-[15px] ${enabled ? "text-[#374151]" : "text-[#9CA3AF]"}`}
      >
        {label}
      </span>
    </div>
  );
}

function PlanCard({ plan }) {
  return (
    <div
      className={`relative flex w-full flex-col rounded-xl border bg-white p-6 transition-shadow hover:shadow-[0_8px_24px_rgba(15,23,42,0.08)] ${
        plan.popular ? "border-[#BFDBFE] bg-[#F5F9FF]" : "border-[#E5E7EB]"
      }`}
    >
      {plan.popular && (
        <span className="absolute -top-3 left-6 rounded-md bg-[#1677FF] px-3 py-1 text-[12px] font-semibold text-white">
          Most Popular
        </span>
      )}

      <PlanIcon icon={plan.icon} bg={plan.iconBg} color={plan.iconColor} />

      <h3 className="mt-4 text-[22px] font-semibold text-[#0F172A]">
        {plan.name}
      </h3>
      <p className="mt-1 text-[14px] leading-snug text-[#6B7280]">
        {plan.description}
      </p>

      <div className="mt-4 mb-4">
        {plan.isCustom ? (
          <span className="text-[26px] font-bold text-[#111827]">Custom</span>
        ) : (
          <span>
            <span className="text-[28px] font-bold text-[#111827]">
              &#8377; {plan.price}
            </span>
            <span className="ml-1 text-[16px] text-[#6B7280]">/month</span>
          </span>
        )}
      </div>

      <button
        type="button"
        className="mb-5 flex h-11 w-full items-center justify-center rounded-lg border border-[#1677FF] bg-white text-[15px] font-semibold text-[#1677FF] transition-colors hover:bg-[#EEF5FF]"
      >
        {plan.cta}
      </button>

      <div className="flex flex-col">
        {plan.features.map((f, idx) => (
          <FeatureRow key={idx} label={f.label} enabled={f.enabled} />
        ))}
      </div>
    </div>
  );
}

function StatusIcon({ value }) {
  if (value === true) {
    return <CheckCircle2 className="mx-auto h-5 w-5 text-[#16A34A]" />;
  }
  if (value === false) {
    return <XCircle className="mx-auto h-5 w-5 text-[#EF4444]" />;
  }
  return <span className="text-[14px] text-[#9CA3AF]">{value}</span>;
}

function BenefitRow({ icon: Icon, label }) {
  return (
    <div className="flex items-center gap-3 py-2">
      <Icon className="h-[18px] w-[18px] text-[#6B7280]" />
      <span className="text-[15px] text-[#374151]">{label}</span>
    </div>
  );
}

function PaymentRow({ label, value, isLast }) {
  return (
    <div
      className={`flex items-center justify-between py-2 ${
        !isLast ? "" : ""
      }`}
    >
      <span className="text-[14px] text-[#6B7280]">{label}</span>
      <span className="text-[14px] font-medium text-[#111827]">{value}</span>
    </div>
  );
}

export default function SubscriptionPlanDashboard() {
  const [billing, setBilling] = useState("monthly");

  return (
    <div className="min-h-screen w-full bg-[#F8FAFC] p-6 lg:p-8">
      <div className="mx-auto max-w-[1400px]">
        {/* Header */}
        <div className="mb-5">
          <h1 className="text-[36px] font-bold leading-tight text-[#0F172A] sm:text-[40px]">
            Subscription / Plan
          </h1>
          <p className="mt-1 text-[16px] font-normal text-[#64748B]">
            Choose the perfect plan to grow your real estate business
          </p>
        </div>

        {/* Billing toggle */}
        <div className="mb-6 flex items-center gap-6">
          <button
            type="button"
            onClick={() => setBilling("monthly")}
            className={`relative pb-1 text-[15px] ${
              billing === "monthly"
                ? "font-semibold text-[#1677FF]"
                : "text-[#6B7280] hover:text-[#1677FF]"
            }`}
          >
            Monthly
            {billing === "monthly" && (
              <span className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-[#1677FF]" />
            )}
          </button>
          <button
            type="button"
            onClick={() => setBilling("yearly")}
            className={`relative pb-1 text-[15px] ${
              billing === "yearly"
                ? "font-semibold text-[#1677FF]"
                : "text-[#6B7280] hover:text-[#1677FF]"
            }`}
          >
            Yearly
            {billing === "yearly" && (
              <span className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-[#1677FF]" />
            )}
          </button>
          <span className="rounded-full bg-[#DCFCE7] px-3 py-[6px] text-[12px] font-medium text-[#15803D]">
            Save 20%
          </span>
        </div>

        {/* Main grid: pricing cards + sidebar */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-4">
          {/* Pricing cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-3 lg:grid-cols-4">
            {PLANS.map((plan) => (
              <PlanCard key={plan.key} plan={plan} />
            ))}
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-5 lg:col-span-1">
            {/* Compare plans / current plan */}
            <div
              className="rounded-xl border border-[#E5E7EB] bg-white p-5"
              style={{
                boxShadow:
                  "0 1px 3px rgba(0,0,0,.04), 0 6px 16px rgba(15,23,42,.05)",
              }}
            >
              <h2 className="mb-3 text-[18px] font-semibold text-[#111827]">
                Compare plans
              </h2>
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#DCFCE7]">
                  <LayoutGrid className="h-5 w-5 text-[#16A34A]" />
                </div>
                <div>
                  <p className="text-[15px] font-semibold text-[#0F172A]">
                    Basic Plan
                  </p>
                  <p className="text-[15px] text-[#111827]">
                    &#8377; 999{" "}
                    <span className="text-[14px] text-[#6B7280]">/ month</span>
                  </p>
                  <p className="text-[13px] text-[#9CA3AF]">
                    Renews on 20 Jun 2024
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="mt-4 flex h-11 w-full items-center justify-center rounded-lg border border-[#1677FF] bg-white text-[14px] font-semibold text-[#1677FF] hover:bg-[#EEF5FF]"
              >
                Manage Subscription
              </button>
            </div>

            {/* Plan Benefits */}
            <div
              className="rounded-xl border border-[#E5E7EB] bg-white p-5"
              style={{
                boxShadow:
                  "0 1px 3px rgba(0,0,0,.04), 0 6px 16px rgba(15,23,42,.05)",
              }}
            >
              <h2 className="mb-2 text-[18px] font-semibold text-[#111827]">
                Plan Benefits
              </h2>
              <div className="flex flex-col divide-y divide-[#F1F5F9]">
                <BenefitRow icon={Eye} label="Increase your property visibility" />
                <BenefitRow icon={Users} label="Get more qualified leads" />
                <BenefitRow icon={Zap} label="Access Powerful Tools" />
                <BenefitRow icon={TrendingUp} label="Grow your real estate business" />
              </div>
            </div>

            {/* Payment Details */}
            <div
              className="rounded-xl border border-[#E5E7EB] bg-white p-5"
              style={{
                boxShadow:
                  "0 1px 3px rgba(0,0,0,.04), 0 6px 16px rgba(15,23,42,.05)",
              }}
            >
              <h2 className="mb-2 text-[18px] font-semibold text-[#111827]">
                Payment Details
              </h2>
              <div className="flex flex-col divide-y divide-[#F1F5F9]">
                <PaymentRow label="Last Payment" value="₹ 999" />
                <PaymentRow label="Payment Date" value="20 May 2024" />
                <PaymentRow label="Next Billing Date" value="20 Jun 2024" />
                <PaymentRow label="Payment Method" value="******4242" isLast />
              </div>
              <button
                type="button"
                className="mt-4 flex h-11 w-full items-center justify-center rounded-lg border border-[#1677FF] bg-white text-[14px] font-semibold text-[#1677FF] hover:bg-[#EEF5FF]"
              >
                Manage Subscription
              </button>
            </div>

            {/* Help Card */}
            <div
              className="rounded-xl border border-[#E5E7EB] bg-white p-5"
              style={{
                boxShadow:
                  "0 1px 3px rgba(0,0,0,.04), 0 6px 16px rgba(15,23,42,.05)",
              }}
            >
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#DCFCE7]">
                  <Headphones className="h-5 w-5 text-[#16A34A]" />
                </div>
                <div>
                  <p className="text-[16px] font-semibold text-[#111827]">
                    Need Help?
                  </p>
                  <p className="mt-0.5 text-[13px] leading-relaxed text-[#6B7280]">
                    Our support team in here to help you choose the right plan
                  </p>
                </div>
              </div>
              <div className="mt-4 flex gap-3">
                <button
                  type="button"
                  className="h-10 flex-1 rounded-lg bg-[#1677FF] text-[14px] font-medium text-white hover:bg-[#0F66E8]"
                >
                  Contact Support
                </button>
                <button
                  type="button"
                  className="h-10 flex-1 rounded-lg border border-[#E5E7EB] bg-white text-[14px] font-medium text-[#111827] hover:bg-[#F8FAFC]"
                >
                  FAQs
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Compare Plans Table */}
        <div
          className="mt-6 overflow-hidden rounded-xl border border-[#E5E7EB] bg-white"
          style={{
            boxShadow:
              "0 1px 3px rgba(0,0,0,.04), 0 6px 16px rgba(15,23,42,.05)",
          }}
        >
          <div className="border-b border-[#E5E7EB] px-6 py-4">
            <h2 className="text-[18px] font-semibold text-[#111827]">
              Compare plans
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] border-collapse text-left">
              <thead>
                <tr className="bg-[#F9FAFB]">
                  <th className="px-6 py-3 text-[14px] font-semibold text-[#374151]">
                    Report Name
                  </th>
                  <th className="px-6 py-3 text-center text-[14px] font-semibold text-[#374151]">
                    Basic
                  </th>
                  <th className="px-6 py-3 text-center text-[14px] font-semibold text-[#374151]">
                    Pro
                  </th>
                  <th className="px-6 py-3 text-center text-[14px] font-semibold text-[#374151]">
                    Premium
                  </th>
                  <th className="px-6 py-3 text-center text-[14px] font-semibold text-[#374151]">
                    Enterprise
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARE_ROWS.map((row, idx) => (
                  <tr
                    key={idx}
                    className="border-t border-[#F1F5F9] hover:bg-[#F8FAFC]"
                  >
                    <td className="px-6 py-3 text-[14px] text-[#374151]">
                      {row.label}
                    </td>
                    <td className="px-6 py-3 text-center text-[14px] text-[#374151]">
                      <StatusIcon value={row.basic} />
                    </td>
                    <td className="px-6 py-3 text-center text-[14px] text-[#374151]">
                      <StatusIcon value={row.pro} />
                    </td>
                    <td className="px-6 py-3 text-center text-[14px] text-[#374151]">
                      <StatusIcon value={row.premium} />
                    </td>
                    <td className="px-6 py-3 text-center text-[14px] text-[#374151]">
                      <StatusIcon value={row.enterprise} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}