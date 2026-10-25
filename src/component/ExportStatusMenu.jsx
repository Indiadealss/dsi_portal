import { useEffect, useRef, useState } from "react";

// "Export" button with an All / Active / Inactive menu.
// onExport(status) receives "all" | "active" | "inactive" and may return a promise.

const EXPORT_OPTIONS = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

export default function ExportStatusMenu({ onExport, label = "Export", icon = null, buttonClassName = "", buttonStyle }) {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const pick = async (status) => {
    setOpen(false);
    setBusy(true);
    try {
      await onExport(status);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="relative flex-shrink-0" ref={ref}>
      <button type="button" disabled={busy} onClick={() => setOpen((o) => !o)} className={buttonClassName} style={buttonStyle}>
        {icon}
        {busy ? "Exporting…" : label}
      </button>
      {open && (
        <div className="absolute right-0 top-full z-50 mt-1 min-w-[160px] rounded-xl border border-[#E5E7EB] bg-white py-1 shadow-lg">
          <div className="px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-gray-400">Export listings</div>
          {EXPORT_OPTIONS.map((o) => (
            <button
              key={o.value}
              type="button"
              onClick={() => pick(o.value)}
              className="block w-full px-4 py-2 text-left text-sm text-[#374151] transition-colors hover:bg-[#F8FAFC]"
            >
              {o.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
