import React, { useMemo, useState } from "react";

const COMMON_UNITS = {
  sqm: { label: "Square Meter (m²)", toSqm: 1 },
  sqft: { label: "Square Foot (ft²)", toSqm: 0.09290304 },
  acre: { label: "Acre", toSqm: 4046.8564224 },
  hectare: { label: "Hectare", toSqm: 10000 },
};

// Regional/state-specific units (approximate, verify locally)
// Factors reflect *1 unit in m²*.
const STATE_FACTORS = {
  "Uttar Pradesh": {
    // Commonly: 1 Bigha ≈ 2,500 m² (varies widely by district)
    bigha: { label: "Bigha", toSqm: 2500 },
    biswa: { label: "Biswa (1/20 Bigha)", toSqm: 125 },
  },
  Rajasthan: {
    // Many variants exist; a widely referenced value is ≈ 1 Bigha ~ 1,618 to 2,500 m² or larger
    // Here we place a *placeholder* mid-range; PLEASE confirm locally and adjust!
    bigha: { label: "Bigha (verify locally)", toSqm: 17000 },
    biswa: { label: "Biswa (verify locally)", toSqm: 850 },
  },
  Bihar: {
    // 1 Katha ≈ 1,361 ft² → 126.44 m² (approx)
    katha: { label: "Katha", toSqm: 126.44 },
    decimal: { label: "Decimal (1/100 Acre)", toSqm: 40.468564224 },
  },
  "West Bengal": {
    // 1 Katha = 720 ft² → 66.889 m²; 1 Bigha = 20 Katha → 1,337.78 m²
    katha: { label: "Katha", toSqm: 66.889 },
    bigha: { label: "Bigha (20 Katha)", toSqm: 1337.78 },
    decimal: { label: "Decimal (1/100 Acre)", toSqm: 40.468564224 },
  },
  Assam: {
    // 1 Katha = 2,880 ft² → 267.564 m²; 1 Bigha = 20 Katha → 5,351.28 m²
    katha: { label: "Katha", toSqm: 267.564 },
    bigha: { label: "Bigha (20 Katha)", toSqm: 5351.28 },
  },
  Maharashtra: {
    // 1 Guntha = 1,089 ft² → 101.171 m²; 40 Guntha = 1 Acre
    guntha: { label: "Guntha", toSqm: 101.171 },
  },
  Karnataka: {
    // Also spelled Gunta; commonly same as Guntha
    gunta: { label: "Gunta", toSqm: 101.171 },
  },
  Punjab: {
    // 1 Kanal = 20 Marla; using marla ≈ 272.25 ft² → 25.2929 m²
    marla: { label: "Marla (old conv.)", toSqm: 25.2929 },
    kanal: { label: "Kanal (20 Marla)", toSqm: 505.858 },
  },
  Haryana: {
    marla: { label: "Marla (old conv.)", toSqm: 25.2929 },
    kanal: { label: "Kanal (20 Marla)", toSqm: 505.858 },
  },
  "Himachal Pradesh": {
    marla: { label: "Marla (old conv.)", toSqm: 25.2929 },
    kanal: { label: "Kanal (20 Marla)", toSqm: 505.858 },
  },
  "Jammu & Kashmir": {
    marla: { label: "Marla (old conv.)", toSqm: 25.2929 },
    kanal: { label: "Kanal (20 Marla)", toSqm: 505.858 },
  },
  "Tamil Nadu": {
    // 1 Ground = 2,400 ft² → 222.967 m² (approx)
    ground: { label: "Ground", toSqm: 222.967 },
  },
};

const ALL_STATES = Object.keys(STATE_FACTORS);

const formatNumber = (n) => {
  if (!isFinite(n)) return "";
  try {
    return new Intl.NumberFormat(undefined, { maximumFractionDigits: 6 }).format(n);
  } catch {
    return String(Number(n.toFixed ? n.toFixed(6) : n));
  }
};

export default function StateWiseLandConverter() {
  const [state, setState] = useState("Uttar Pradesh");
  const [amount, setAmount] = useState("1");
  const [fromUnit, setFromUnit] = useState("sqm");
  const [toUnit, setToUnit] = useState("bigha");

  // Build unit lists for the chosen state
  const { unitOptions, labelByKey, toSqmByKey } = useMemo(() => {
    const regional = STATE_FACTORS[state] || {};

    const merge = {
      ...COMMON_UNITS,
      ...regional,
    };

    const options = Object.entries(merge).map(([key, val]) => ({
      key,
      label: val.label,
      toSqm: val.toSqm,
    }));

    const labelMap = Object.fromEntries(options.map((o) => [o.key, o.label]));
    const factorMap = Object.fromEntries(options.map((o) => [o.key, o.toSqm]));

    return { unitOptions: options, labelByKey: labelMap, toSqmByKey: factorMap };
  }, [state]);

  // Ensure the target unit defaults to a regional unit where possible
  React.useEffect(() => {
    const regionalKeys = Object.keys(STATE_FACTORS[state] || {});
    if (regionalKeys.length > 0) {
      setToUnit((prev) => (regionalKeys.includes(prev) ? prev : regionalKeys[0]));
    } else {
      setToUnit("sqm");
    }
  }, [state]);

  const parsedAmount = Number(amount) || 0;
  const canConvert = toSqmByKey[fromUnit] && toSqmByKey[toUnit] && parsedAmount >= 0;

  const result = useMemo(() => {
    if (!canConvert) return 0;
    // Convert: source → m² → target
    const inSqm = parsedAmount * toSqmByKey[fromUnit];
    const out = inSqm / toSqmByKey[toUnit];
    return out;
  }, [parsedAmount, fromUnit, toUnit, toSqmByKey, canConvert]);

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex items-start justify-center">
      <div className="w-full max-w-3xl">
    

        <div className="grid grid-cols-1 gap-4">
          <div className="bg-white rounded-2xl shadow p-4 sm:p-6">
            <div className="grid sm:grid-cols-3 gap-4 items-end">
              {/* State */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">State</label>
                <select
                  className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  {ALL_STATES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              {/* Amount */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Amount</label>
                <input
                  type="number"
                  inputMode="decimal"
                  min="0"
                  className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter value"
                />
              </div>

              {/* From unit */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">From unit</label>
                <select
                  className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={fromUnit}
                  onChange={(e) => setFromUnit(e.target.value)}
                >
                  {unitOptions.map((u) => (
                    <option key={u.key} value={u.key}>
                      {u.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-4 grid sm:grid-cols-3 gap-4 items-end">
              {/* To unit (only one is shown as result) */}
              <div className="flex flex-col gap-2 sm:col-span-2">
                <label className="text-sm font-medium">To unit (result will be shown only in this unit)</label>
                <select
                  className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={toUnit}
                  onChange={(e) => setToUnit(e.target.value)}
                >
                  {unitOptions.map((u) => (
                    <option key={u.key} value={u.key}>
                      {u.label}
                    </option>
                  ))}
                </select>
              </div>

            </div>
          </div>

          {/* Result card — shows only the chosen target unit */}
          <div className="bg-white rounded-2xl shadow p-6">
            <div className="text-xs uppercase tracking-wider text-gray-500 mb-1">Converted Value</div>
            <div className="text-3xl font-semibold">
              {formatNumber(result)}
              <span className="text-base font-normal text-gray-600 ml-2">
                {labelByKey[toUnit] || toUnit}
              </span>
            </div>
            <div className="mt-3 text-sm text-gray-500">
              From {formatNumber(parsedAmount)} {labelByKey[fromUnit] || fromUnit} → {labelByKey[toUnit] || toUnit}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
