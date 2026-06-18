import { useState, useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateField } from "./Redux/propertySlice";

const initialRow = () => ({
  id: Date.now() + Math.random(),
  configuration: "",
  type: "",
  carpetArea: "",
  buildupArea: "",
  superBuildupArea: "",
  startingPrice: "",
  pricePerSqFt: "",
  availability: "",
});

const TYPES = ["Apartment", "Villa", "Studio", "Penthouse", "Duplex"];
const AVAILABILITY_OPTIONS = [
  "Size Availability",
  "120 Units",
  "100 Units",
  "80 Units",
  "60 Units",
  "50 Units",
  "30 Units",
  "Sold Out",
];
const CONFIG_OPTIONS = [
  "BHK TYPES",
  "1 BHK",
  "2 BHK",
  "3 BHK",
  "4 BHK",
  "5 BHK",
  "Studio",
];

function ConfigChip({ value, onRemove, onAdd }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          height: 32,
          padding: "0 10px",
          border: "1px solid #DADADA",
          borderRadius: 4,
          background: "#FFFFFF",
          fontSize: 13,
          fontWeight: 500,
          color: "#0F172A",
          whiteSpace: "nowrap",
        }}
      >
        {value}
        <button
          onClick={onRemove}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
            color: "#9CA3AF",
            fontSize: 14,
            lineHeight: 1,
            display: "flex",
            alignItems: "center",
          }}
        >
          ×
        </button>
      </div>
    </div>
  );
}

function SelectDropdown({ value, options, onChange, green }) {
  return (
    <div style={{ position: "relative" }}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          height: 36,
          padding: "0 28px 0 10px",
          border: "1px solid #DADADA",
          borderRadius: 4,
          background: "#FFFFFF",
          fontSize: 13,
          color: green ? "#16A34A" : "#0F172A",
          fontWeight: green ? 600 : 400,
          appearance: "none",
          cursor: "pointer",
          width: "100%",
          outline: "none",
          transition: "border-color 0.15s",
        }}
        onFocus={(e) => (e.target.style.borderColor = "#007AFF")}
        onBlur={(e) => (e.target.style.borderColor = "#DADADA")}
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <span
        style={{
          position: "absolute",
          right: 8,
          top: "50%",
          transform: "translateY(-50%)",
          pointerEvents: "none",
          color: green ? "#16A34A" : "#9CA3AF",
          fontSize: 11,
        }}
      >
        ▼
      </span>
    </div>
  );
}

function TableInput({ value, onChange, placeholder }) {
  return (
    <input
      type="text"
      value={value}
      placeholder={placeholder || ""}
      onChange={(e) => onChange(e.target.value)}
      style={{
        height: 36,
        padding: "0 10px",
        border: "1px solid #DADADA",
        borderRadius: 4,
        background: "#FFFFFF",
        fontSize: 13,
        color: "#0F172A",
        width: "100%",
        outline: "none",
        boxSizing: "border-box",
        transition: "border-color 0.15s",
      }}
      onFocus={(e) => (e.target.style.borderColor = "#007AFF")}
      onBlur={(e) => (e.target.style.borderColor = "#DADADA")}
    />
  );
}

function PricingInput({ label, value, onChange }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label
        style={{
          fontSize: 14,
          fontWeight: 600,
          color: "#0F172A",
          lineHeight: "20px",
        }}
      >
        {label}
      </label>
      <input
        type="text"
        value={value}
        placeholder="Select availability"
        onChange={(e) => onChange(e.target.value)}
        style={{
          height: 42,
          padding: "0 14px",
          border: "1px solid #DADADA",
          borderRadius: 6,
          background: "#FFFFFF",
          fontSize: 14,
          color: "#0F172A",
          width: "100%",
          outline: "none",
          boxSizing: "border-box",
          transition: "border-color 0.15s",
        }}
        onFocus={(e) => (e.target.style.borderColor = "#007AFF")}
        onBlur={(e) => (e.target.style.borderColor = "#DADADA")}
      />
    </div>
  );
}

export default function Configurationandpricing() {
  const propertyFirstData = useSelector((state) => state.property.data);
  const [rows, setRows] = useState(propertyFirstData.unitData);
  const [pricingInfo, setPricingInfo] = useState({
    bookingAmount: propertyFirstData.bookingAmount,
    plcCharges: propertyFirstData.plcCharges,
    plcDetails: propertyFirstData.plcDetails,
    paymentPlan: propertyFirstData.paymentPlan,
  });
  const [dragIdx, setDragIdx] = useState(null);
  const [dragOverIdx, setDragOverIdx] = useState(null);
  const [saved, setSaved] = useState(false);
  const dispatch = useDispatch();


  const debounce = useRef(null)
    useEffect(() => {
      console.log(propertyFirstData, propertyFirstData.unitData, 'this is a testing');
      
      clearTimeout(debounce.current);

      debounce.current = setTimeout(() => {
    dispatch(updateField({
      unitData: rows,
      bookingAmount: pricingInfo.bookingAmount,
      plcCharges: pricingInfo.plcCharges,
      plcDetails: pricingInfo.plcDetails,
      paymentPlan: pricingInfo.paymentPlan
    }))
    },400)

  },[rows, pricingInfo])

  const updateRow = useCallback((id, field, value) => {
    setRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [field]: value } : r))
    );
  }, []);

  const removeChip = useCallback((id) => {
    setRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, configuration: "" } : r))
    );
  }, []);

  const deleteRow = useCallback((id) => {
    setRows((prev) => prev.filter((r) => r.id !== id));
  }, []);

  const addRow = () => {
    setRows((prev) => [...prev, initialRow()]);
  };

  const handleDragStart = (idx) => setDragIdx(idx);
  const handleDragOver = (e, idx) => {
    e.preventDefault();
    setDragOverIdx(idx);
  };
  const handleDrop = (idx) => {
    if (dragIdx === null || dragIdx === idx) return;
    setRows((prev) => {
      const next = [...prev];
      const [moved] = next.splice(dragIdx, 1);
      next.splice(idx, 0, moved);
      return next;
    });
    setDragIdx(null);
    setDragOverIdx(null);
  };
  const handleDragEnd = () => {
    setDragIdx(null);
    setDragOverIdx(null);
  };

  const handleSaveDraft = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const colHeaders = [
    { label: "Configuration", width: 130 },
    { label: "Type", width: 130 },
    { label: "Carpet Area (Sq.Ft).", width: 140 },
    { label: "Buildup Area (Sq.Ft).", width: 140 },
    { label: "Super Buildup Area (Sq.Ft).", width: 170 },
    { label: "Starting Price", width: 140 },
    { label: "Price per Sq.Ft.", width: 130 },
    { label: "Availability", width: 140 },
    { label: "Action", width: 80 },
  ];




  return (
    <div
      style={{
        fontFamily: "Inter, Poppins, sans-serif",
        paddingLeft: "32px",
        paddingRight: "32px",
        paddingTop: "32px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          maxWidth: 1400,
          margin: "0 auto",
        }}
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl sm:text-3xl lg:text-3xl font-bold text-[#111827]">Configuration & Pricing</h1>
                        <p className="text-sm font-semibold text-[#6B7280] mt-1">Add all unit configurations along with sizes, pricing and availbility</p>
                        <div className="mt-2 h-0.5 bg-[#0D6EFD] rounded-full w-64 sm:w-80" />
                    </div>
                    {/* Tip card */}
                    <div className="bg-[#F2FBF5] border border-[#CDEED7] rounded-[10px] p-3 flex gap-2.5 items-start sm:min-w-[260px] sm:max-w-[300px] shrink-0">
                        <div className="mt-0.5 shrink-0">
                            <svg viewBox="0 0 24 24" fill="#16A34A" className="w-5 h-5"><path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7zm3 14H9v-1h6v1zm-6-3v-1.73C7.4 10.53 6 9.07 6 9c0-3.31 2.69-6 6-6s6 2.69 6 6c0 1.07-.6 2.53-2 3.27V13H9z" /></svg>
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-[#111827]">Tip</p>
                            <p className="text-xs text-[#6B7280] leading-snug">Add all configurations to give buyers more options and increase your project visibility.</p>
                        </div>
                    </div>
                </div>

        {/* Configuration Section */}
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: 10,
            padding: 24,
            marginBottom: 20,
          }}
        >
          <h2
            style={{
              fontSize: 18,
              fontWeight: 600,
              color: "#0F172A",
              margin: "0 0 4px 0",
            }}
          >
            Select Project Category
          </h2>
          <p
            style={{
              fontSize: 14,
              color: "#64748B",
              margin: "0 0 20px 0",
            }}
          >
            Choose the best category that suits your project
          </p>

          {/* Table wrapper with horizontal scroll */}
          <div
            style={{
              border: "1px solid #DADADA",
              borderRadius: 8,
              overflow: "hidden",
              overflowX: "auto",
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: colHeaders
                  .map((c) => `${c.width}px`)
                  .join(" "),
                minWidth: colHeaders.reduce((a, c) => a + c.width, 0) + "px",
                background: "#FFFFFF",
                borderBottom: "1px solid #DADADA",
                height: 72,
                alignItems: "center",
              }}
            >
              {colHeaders.map((col) => (
                <div
                  key={col.label}
                  style={{
                    padding: "0 12px",
                    fontSize: 14,
                    fontWeight: 600,
                    color: "#0F172A",
                    lineHeight: "20px",
                  }}
                >
                  {col.label}
                </div>
              ))}
            </div>

            {/* Rows */}
            {rows.map((row, idx) => (
              <div
                key={row.id}
                draggable
                onDragStart={() => handleDragStart(idx)}
                onDragOver={(e) => handleDragOver(e, idx)}
                onDrop={() => handleDrop(idx)}
                onDragEnd={handleDragEnd}
                style={{
                  display: "grid",
                  gridTemplateColumns: colHeaders
                    .map((c) => `${c.width}px`)
                    .join(" "),
                  minWidth:
                    colHeaders.reduce((a, c) => a + c.width, 0) + "px",
                  height: 58,
                  alignItems: "center",
                  borderBottom:
                    idx < rows.length - 1 ? "1px solid #F1F5F9" : "none",
                  background:
                    dragOverIdx === idx ? "#F0F7FF" : "#FFFFFF",
                  transition: "background 0.15s",
                  cursor: "grab",
                  opacity: dragIdx === idx ? 0.5 : 1,
                }}
              >
                {/* Configuration chip */}
                <div style={{ padding: "0 12px" }}>
                  {row.configuration ? (
                    <ConfigChip
                      value={row.configuration}
                      onRemove={() => removeChip(row.id)}
                    />
                  ) : (
                    <SelectDropdown
                      value=""
                      options={CONFIG_OPTIONS}
                      onChange={(v) => updateRow(row.id, "configuration", v)}
                    />
                  )}
                </div>

                {/* Type */}
                <div style={{ padding: "0 8px" }}>
                  <SelectDropdown
                    value={row.type}
                    options={TYPES}
                    onChange={(v) => updateRow(row.id, "type", v)}
                  />
                </div>

                {/* Carpet Area */}
                <div style={{ padding: "0 8px" }}>
                  <TableInput
                    value={row.carpetArea}
                    onChange={(v) => updateRow(row.id, "carpetArea", v)}
                    placeholder="850"
                  />
                </div>

                {/* Buildup Area */}
                <div style={{ padding: "0 8px" }}>
                  <TableInput
                    value={row.buildupArea}
                    onChange={(v) => updateRow(row.id, "buildupArea", v)}
                    placeholder="850"
                  />
                </div>

                {/* Super Buildup Area */}
                <div style={{ padding: "0 8px" }}>
                  <TableInput
                    value={row.superBuildupArea}
                    onChange={(v) => updateRow(row.id, "superBuildupArea", v)}
                    placeholder="950"
                  />
                </div>

                {/* Starting Price */}
                <div style={{ padding: "0 8px" }}>
                  <TableInput
                    value={row.startingPrice}
                    onChange={(v) => updateRow(row.id, "startingPrice", v)}
                    placeholder="45,00,000"
                  />
                </div>

                {/* Price Per Sq.Ft */}
                <div style={{ padding: "0 8px" }}>
                  <TableInput
                    value={row.pricePerSqFt}
                    onChange={(v) => updateRow(row.id, "pricePerSqFt", v)}
                    placeholder="5,294"
                  />
                </div>

                {/* Availability */}
                <div style={{ padding: "0 8px" }}>
                  <SelectDropdown
                    value={row.availability}
                    options={AVAILABILITY_OPTIONS}
                    onChange={(v) => updateRow(row.id, "availability", v)}
                    green
                  />
                </div>

                {/* Action */}
                <div
                  style={{
                    padding: "0 12px",
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <button
                    onClick={() => {}}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: 2,
                      color: "#9CA3AF",
                      display: "flex",
                      alignItems: "center",
                      transition: "color 0.15s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "#007AFF")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "#9CA3AF")
                    }
                    title="Edit"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => deleteRow(row.id)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: 2,
                      color: "#9CA3AF",
                      display: "flex",
                      alignItems: "center",
                      transition: "color 0.15s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "#EF4444")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "#9CA3AF")
                    }
                    title="Delete"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6l-1 14H6L5 6" />
                      <path d="M10 11v6M14 11v6" />
                      <path d="M9 6V4h6v2" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Info message + Add button */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 16,
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: 14,
                fontWeight: 500,
                color: "#007AFF",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#007AFF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="8" strokeWidth="3" />
                <line x1="12" y1="12" x2="12" y2="16" />
              </svg>
              Drag and Drop to rearrange configuration. The order will be
              displayed on your project page
            </div>

            <button
              onClick={addRow}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                height: 42,
                padding: "0 16px",
                background: "#FFFFFF",
                border: "1px solid #DADADA",
                borderRadius: 6,
                fontSize: 14,
                fontWeight: 500,
                color: "#0F172A",
                cursor: "pointer",
                transition: "border-color 0.15s, background 0.15s",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Add configuration
            </button>
          </div>
        </div>

        {/* Pricing Info Section */}
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: 10,
            padding: 24,
            marginBottom: 24,
          }}
        
        >
          <h2
            style={{
              fontSize: 18,
              fontWeight: 600,
              color: "#0F172A",
              margin: "0 0 4px 0",
            }}
          >
            Pricing Info
          </h2>
          <p
            style={{
              fontSize: 14,
              color: "#64748B",
              margin: "0 0 20px 0",
            }}
          >
            Add Additional pricing related information for your Project
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 24,
            }}
          >
            <PricingInput
              label="Booking Amount"
              value={pricingInfo.bookingAmount}
              onChange={(v) =>
                setPricingInfo((p) => ({ ...p, bookingAmount: v }))
              }
            />
            <PricingInput
              label="PLC/ Additional Charges"
              value={pricingInfo.plcCharges}
              onChange={(v) =>
                setPricingInfo((p) => ({ ...p, plcCharges: v }))
              }
            />
            <PricingInput
              label="PLC Details"
              value={pricingInfo.plcDetails}
              onChange={(v) =>
                setPricingInfo((p) => ({ ...p, plcDetails: v }))
              }
            />
            <PricingInput
              label="Payment Plan"
              value={pricingInfo.paymentPlan}
              onChange={(v) =>
                setPricingInfo((p) => ({ ...p, paymentPlan: v }))
              }
            />
          </div>
        </div>

        
      </div>
    </div>
  );
}