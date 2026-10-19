import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import {
  bulkCreateProjects,
  getBulkProjects,
  getAminities,
  getotheroom,
  getpropertyfeature,
  getadditionalfeature,
  getAllFeature,
} from "../api/api";
import computerTable from "../Images/computerTable.avif";
import shop from "../Images/shop.jpeg";

// Bulk project upload — everything the post-project form collects except photos,
// videos, layouts, brochure, FAQ and description; those are added later from Edit.
// Residential and commercial have separate templates (Projects + Units sheets).
// All validation runs on the backend (dry run first), so the preview shows exactly
// what the upload will do. Uploaded projects stay "pending" until approved.
// Visible only to isProjectAdmin(); the backend re-checks the mobile.

const PROJECT_TYPES = {
  residential: ["1 Bhk", "2 Bhk", "3 Bhk", "4 Bhk", "5 Bhk", "1 Rk", "Studio Appartment", "Land", "Independent House/Villa", "Farmhouse"],
  commercial: ["Office", "Ploat/Land", "Retail", "Storage", "Industry"],
};

const col = (key, header, help, required = false) => ({ key, header: required ? `${header}*` : header, help, required });

const COMMON_HEAD = [
  col("projectname", "Project Name", "Must match the Project Name in the Units sheet", true),
  col("city", "City", "e.g. Noida", true),
  col("locality", "Locality", "e.g. Sector 150", true),
];

const COMMON_TAIL = [
  col("availabestatus", "Status", "Ready to move or Under construction", true),
  col("Possession", "Possession", "Under construction only — e.g. Dec 2027, By 2028, within 6 Months"),
  col("propertyage", "Age of Property", "Ready to move only — 0-1 years, 1-5 years, 5-10 years, 10+ years"),
  col("projectTotalFloor", "Total Floors", "Total floors in the project, e.g. 32", true),
  col("ownership", "Ownership", "Freehold, Leasehold, Co-operative society, Power of Attorney", true),
  col("rera", "RERA Number", "e.g. UPRERAPRJ546517 — leave blank if not available"),
];

const FEATURES = [
  col("otherrooms", "Other Rooms", "Comma separated — see the Allowed Values sheet"),
  col("furnishing", "Furnishing", "Furnished, Semi-furnished, Un-furnished"),
  col("propertyfacing", "Property Facing", "North, South, East, West, North-East, North-West, South-East, South-West"),
  col("pobackup", "Power Backup", "None, Partial, Full"),
  col("amenitie", "Amenities", "Comma separated — see the Allowed Values sheet"),
  col("Buldingfeature", "Society/Building Features", "Comma separated — see the Allowed Values sheet"),
  col("propertyfeature", "Property Features", "Comma separated — see the Allowed Values sheet"),
  col("addFeature", "Additional Features", "Comma separated — see the Allowed Values sheet"),
  col("overlo", "Overlooking", "Comma separated — see the Allowed Values sheet"),
  col("watersource", "Water Source", "Comma separated: Municipal corporation, Borewell/Tank, 24*7 water"),
  col("locatadvance", "Location Advantages", "Name: Place (distance); … e.g. Close to Metro Station: Sector 148 Metro (1.2 km); Close to School: DPS (2 km)"),
  col("price", "Price", "Shown on the listing, e.g. 85 L - 1.4 Cr. Leave blank to use the unit price range"),
  col("selectedPricing", "Price Details", "Comma separated: All inclusive Price, Tax and Govt. Charges excluded, Price Negotiable"),
  col("projectdeveloper", "Developer", "e.g. ACE Group", true),
  col("projecttitle", "Project Title", "SEO title"),
  col("titleDescription", "Meta Description", "SEO meta description (short)"),
  col("projectKeyword", "Meta Keywords", "SEO keywords, comma separated"),
];

const TEMPLATES = {
  residential: {
    label: "Residential",
    projectsSheet: "Residential Projects",
    unitsSheet: "Residential Units",
    columns: [
      ...COMMON_HEAD,
      col("propertyType", "Property Types", `Comma separated: ${PROJECT_TYPES.residential.join(", ")}`, true),
      ...COMMON_TAIL,
      col("coveredparking", "Covered Parking", "Number, e.g. 1"),
      col("uncoveredparking", "Uncovered Parking", "Number, e.g. 0"),
      ...FEATURES,
    ],
    unitColumns: [
      col("projectname", "Project Name", "Same as in the Projects sheet", true),
      col("bhk", "BHK Type", "e.g. 2 BHK, 3 BHK + Study", true),
      col("areaMin", "Area Min (sq.ft)", "e.g. 1250"),
      col("areaMax", "Area Max (sq.ft)", "e.g. 1450"),
      col("priceMin", "Price Min", "e.g. 95 L, 1.2 Cr or 9500000"),
      col("priceMax", "Price Max", "e.g. 1.4 Cr"),
    ],
    // Example projects for the Instructions sheet and the "Sample" download (not real data)
    samples: [
      {
        projectname: "Ace Hanei", city: "Noida", locality: "Sector 12", propertyType: "3 Bhk, 4 Bhk",
        availabestatus: "Under construction", Possession: "Dec 2027", projectTotalFloor: "32", ownership: "Freehold",
        rera: "UPRERAPRJ546517", coveredparking: "1", uncoveredparking: "1", otherrooms: "Pooja Room, Study Room",
        furnishing: "Semi-furnished", propertyfacing: "North-East", pobackup: "Full",
        amenitie: "Lifts, Security, Park, Power Back-up", Buldingfeature: "Swimming Pool, Fitness Centre/GYM, club house/Community center",
        propertyfeature: "Piped-gas, Natural Light", addFeature: "Rain water Harvesting, Low Density Society", overlo: "Park/Garden, Pool",
        watersource: "Municipal corporation, 24*7 water",
        locatadvance: "Close to Metro Station: Sector 16 Metro (1.2 km); Close to School: DPS Noida (2 km); Close to Mall: DLF Mall of India (3 km)",
        selectedPricing: "Tax and Govt. Charges excluded", projectdeveloper: "ACE Group",
        projecttitle: "Ace Hanei Sector 12 Noida | 3 & 4 BHK Apartments",
        titleDescription: "Premium 3 & 4 BHK apartments by ACE Group in Sector 12, Noida.",
        projectKeyword: "ace hanei, 3 bhk noida, 4 bhk sector 12",
      },
      {
        projectname: "Eldeco Echoes of Eden", city: "Greater Noida", locality: "Sector 22D, Yamuna Expressway", propertyType: "2 Bhk, 3 Bhk",
        availabestatus: "Ready to move", propertyage: "0-1 years", projectTotalFloor: "20", ownership: "Leasehold",
        rera: "UPRERAPRJ442099", coveredparking: "1", uncoveredparking: "0", otherrooms: "Study Room",
        furnishing: "Un-furnished", propertyfacing: "East", pobackup: "Partial",
        amenitie: "Lifts, Security, Water Storage", Buldingfeature: "Swimming Pool, Shopping Centre",
        propertyfeature: "Natural Light", addFeature: "Waste Disposal", overlo: "Park/Garden", watersource: "Borewell/Tank",
        locatadvance: "Close to Highway: Yamuna Expressway (500 m); Close to Airport: Jewar Airport (15 km)",
        price: "75 L - 1.2 Cr", selectedPricing: "All inclusive Price", projectdeveloper: "Eldeco Group",
        projecttitle: "Eldeco Echoes of Eden Yamuna Expressway",
        titleDescription: "Ready to move 2 & 3 BHK homes on Yamuna Expressway.",
        projectKeyword: "eldeco echoes of eden, 2 bhk yamuna expressway",
      },
    ],
    sampleUnits: [
      { projectname: "Ace Hanei", bhk: "3 BHK", areaMin: "1650", areaMax: "1850", priceMin: "1.6 Cr", priceMax: "1.9 Cr" },
      { projectname: "Ace Hanei", bhk: "3 BHK + Study", areaMin: "1950", priceMin: "2.05 Cr" },
      { projectname: "Ace Hanei", bhk: "4 BHK", areaMin: "2350", areaMax: "2600", priceMin: "2.4 Cr", priceMax: "2.75 Cr" },
      { projectname: "Eldeco Echoes of Eden", bhk: "2 BHK", areaMin: "1050", areaMax: "1150", priceMin: "75 L", priceMax: "82 L" },
      { projectname: "Eldeco Echoes of Eden", bhk: "3 BHK", areaMin: "1450", areaMax: "1600", priceMin: "1.05 Cr", priceMax: "1.2 Cr" },
    ],
  },
  commercial: {
    label: "Commercial",
    projectsSheet: "Commercial Projects",
    unitsSheet: "Commercial Units",
    columns: [
      ...COMMON_HEAD,
      col("propertyType", "Property Types", `Comma separated: ${PROJECT_TYPES.commercial.join(", ")}`, true),
      ...COMMON_TAIL,
      ...FEATURES,
    ],
    unitColumns: [
      col("projectname", "Project Name", "Same as in the Projects sheet", true),
      col("unitType", "Unit Type", "Offices, Studio or Shop", true),
      col("size", "Size (sq.ft)", "e.g. 450", true),
      col("price", "Price", "e.g. 45 L, 1.2 Cr or 4500000", true),
    ],
    samples: [
      {
        projectname: "CRC The Flagship", city: "Noida", locality: "Sector 140A", propertyType: "Office, Retail",
        availabestatus: "Under construction", Possession: "By 2028", projectTotalFloor: "18", ownership: "Leasehold",
        rera: "UPRERAPRJ733201", furnishing: "Un-furnished", propertyfacing: "East", pobackup: "Full",
        amenitie: "Lifts, Security, ATM, Cafeteria/Food Court, DG Avvailability", Buldingfeature: "Shopping Centre",
        propertyfeature: "Centerally Air Conditioneal, Internet/wi-fi connectivity", addFeature: "Waste Disposal", overlo: "Main Road",
        watersource: "Municipal corporation",
        locatadvance: "Close to Highway: Noida-Greater Noida Expressway (300 m); Close to Metro Station: Sector 142 Metro (800 m)",
        selectedPricing: "Price Negotiable", projectdeveloper: "CRC Group",
        projecttitle: "CRC The Flagship Sector 140A | Office & Retail",
        titleDescription: "Office spaces and retail shops on Noida Expressway.",
        projectKeyword: "crc the flagship, office space noida",
      },
      {
        projectname: "Bhutani Grandthum", city: "Greater Noida West", locality: "Tech Zone 4", propertyType: "Office, Retail, Storage",
        availabestatus: "Ready to move", propertyage: "1-5 years", projectTotalFloor: "26", ownership: "Freehold",
        furnishing: "Furnished", propertyfacing: "North", pobackup: "Full",
        amenitie: "Lifts, Security, Power Back-up", Buldingfeature: "Fitness Centre/GYM",
        propertyfeature: "High Ceilling Height", overlo: "Main Road, Club", watersource: "24*7 water",
        locatadvance: "Close to Market: Gaur City Mall (1 km)",
        selectedPricing: "All inclusive Price", projectdeveloper: "Bhutani Infra",
        projecttitle: "Bhutani Grandthum Tech Zone 4",
        titleDescription: "Ready office studios and shops in Greater Noida West.",
        projectKeyword: "bhutani grandthum, studio office greater noida",
      },
    ],
    sampleUnits: [
      { projectname: "CRC The Flagship", unitType: "Offices", size: "450", price: "45 L" },
      { projectname: "CRC The Flagship", unitType: "Offices", size: "900", price: "88 L" },
      { projectname: "CRC The Flagship", unitType: "Shop", size: "300", price: "60 L" },
      { projectname: "Bhutani Grandthum", unitType: "Studio", size: "550", price: "52 L" },
      { projectname: "Bhutani Grandthum", unitType: "Shop", size: "250", price: "48 L" },
    ],
  },
};

const UNIT_ICONS = { Offices: computerTable, Studio: shop, Shop: shop };

const squash = (s) => String(s ?? "").toLowerCase().replace(/[^a-z0-9/]/g, "");
const errMsg = (err, fallback) => err?.response?.data?.message || fallback;

// Names from the DB lists the backend matches against (Allowed Values sheet)
const fetchLookupNames = async () => {
  const names = async (fn) => {
    try {
      const res = await fn();
      return (res.data?.data || []).map((d) => d.name).filter(Boolean);
    } catch {
      return [];
    }
  };
  const [amenities, rooms, propertyFeatures, additional, building] = await Promise.all([
    names(getAminities), names(getotheroom), names(getpropertyfeature), names(getadditionalfeature), names(getAllFeature),
  ]);
  // key = the column these names are matched against
  return [
    ["amenitie", "Amenities", amenities],
    ["otherrooms", "Other Rooms", rooms],
    ["Buldingfeature", "Society/Building Features", building],
    ["propertyfeature", "Property Features", propertyFeatures],
    ["addFeature", "Additional Features", additional],
    ["overlo", "Overlooking", additional],
  ];
};

// Keep only names the DB knows, so the sample uploads without "not found" warnings.
// If a list couldn't be loaded (or is empty) the sample's names are kept as they are.
const fitSampleToLookups = (sample, lookups) => {
  const out = { ...sample };
  for (const [key, , names] of lookups) {
    if (!out[key] || !names.length) continue;
    const known = new Set(names.map(squash));
    out[key] = out[key].split(",").map((s) => s.trim()).filter((s) => known.has(squash(s))).join(", ");
  }
  return out;
};

// Empty template, or with withSample = true a filled sample (the example projects) to try uploading
const downloadTemplate = async (type, withSample = false) => {
  const t = TEMPLATES[type];
  const wb = XLSX.utils.book_new();
  const lookups = await fetchLookupNames();
  const samples = t.samples.map((s) => fitSampleToLookups(s, lookups));

  // every cell as text, so Excel doesn't turn "Dec 2027" into a date or RERA into a number
  const textSheet = (rows, width) => {
    const ws = XLSX.utils.aoa_to_sheet(rows);
    Object.keys(ws).filter((k) => !k.startsWith("!")).forEach((k) => { ws[k].t = "s"; ws[k].v = String(ws[k].v); ws[k].z = "@"; });
    ws["!cols"] = rows[0].map(() => ({ wch: width }));
    return ws;
  };
  const projectRows = withSample ? samples.map((s) => t.columns.map((c) => s[c.key] || "")) : [];
  const unitRows = withSample ? t.sampleUnits.map((u) => t.unitColumns.map((c) => u[c.key] || "")) : [];

  XLSX.utils.book_append_sheet(wb, textSheet([t.columns.map((c) => c.header), ...projectRows], 24), t.projectsSheet);
  XLSX.utils.book_append_sheet(wb, textSheet([t.unitColumns.map((c) => c.header), ...unitRows], 22), t.unitsSheet);

  const firstName = t.samples[0].projectname;
  const help = XLSX.utils.aoa_to_sheet([
    ...(withSample
      ? [["SAMPLE FILE — the projects in this file are examples, not real data. Replace them with your projects (or upload as-is to try it out, then delete them)."], []]
      : []),
    [`${t.label} project bulk upload`],
    [`One project per row in "${t.projectsSheet}". Add its units in "${t.unitsSheet}" using the same Project Name.`],
    ["Columns with * are required. Don't rename the sheets or the column headers."],
    ["Photos, videos, layouts, brochure, FAQ and description are added later from Edit."],
    [],
    ["Projects sheet column", "What to fill"],
    ...t.columns.map((c) => [c.header, c.help]),
    [],
    ["Units sheet column", "What to fill"],
    ...t.unitColumns.map((c) => [c.header, c.help]),
    [],
    ["Example — Projects sheet"],
    t.columns.map((c) => c.header),
    t.columns.map((c) => samples[0][c.key] || ""),
    [],
    ["Example — Units sheet"],
    t.unitColumns.map((c) => c.header),
    ...t.sampleUnits.filter((u) => u.projectname === firstName).map((u) => t.unitColumns.map((c) => u[c.key] || "")),
  ]);
  help["!cols"] = [{ wch: 30 }, { wch: 100 }];
  XLSX.utils.book_append_sheet(wb, help, "Instructions");

  // DB-driven lists, one column each
  const longest = Math.max(1, ...lookups.map(([, , v]) => v.length));
  const allowed = XLSX.utils.aoa_to_sheet([
    lookups.map(([, label]) => label),
    ...Array.from({ length: longest }, (_, i) => lookups.map(([, , v]) => v[i] || "")),
  ]);
  allowed["!cols"] = lookups.map(() => ({ wch: 28 }));
  XLSX.utils.book_append_sheet(wb, allowed, "Allowed Values");

  XLSX.writeFile(wb, `bulk-${type}-projects-${withSample ? "sample" : "template"}.xlsx`);
};

// Sheet → [{ rowNumber, ...values by column key }], skipping blank rows
const readSheet = (sheet, columns) => {
  const raw = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: "", raw: false, dateNF: "mmm yyyy" });
  const [headers = [], ...body] = raw;
  const keys = headers.map((h) => columns.find((c) => squash(c.header) === squash(h))?.key);
  const missing = columns.filter((c) => c.required && !keys.includes(c.key)).map((c) => c.header);
  const rows = body
    .map((cells, i) => {
      const row = { rowNumber: i + 2 };
      columns.forEach((c) => { row[c.key] = ""; });
      keys.forEach((k, j) => { if (k) row[k] = String(cells[j] ?? "").trim(); });
      return row;
    })
    .filter((row) => columns.some((c) => row[c.key]));
  return { rows, missing };
};

// Reads a filled template: detects residential/commercial from the sheet names and
// attaches each Units row to its project by Project Name.
const parseWorkbook = (wb) => {
  const type = Object.keys(TEMPLATES).find((k) => wb.Sheets[TEMPLATES[k].projectsSheet]);
  if (!type) {
    throw new Error(`Sheet "${TEMPLATES.residential.projectsSheet}" or "${TEMPLATES.commercial.projectsSheet}" not found. Please use the downloaded template.`);
  }
  const t = TEMPLATES[type];

  const projects = readSheet(wb.Sheets[t.projectsSheet], t.columns);
  if (projects.missing.length) throw new Error(`Missing columns in "${t.projectsSheet}": ${projects.missing.join(", ")}`);

  const unitsSheet = wb.Sheets[t.unitsSheet];
  const units = unitsSheet ? readSheet(unitsSheet, t.unitColumns) : { rows: [], missing: [] };
  if (units.missing.length) throw new Error(`Missing columns in "${t.unitsSheet}": ${units.missing.join(", ")}`);

  const byName = new Map();
  for (const p of projects.rows) {
    const key = squash(p.projectname);
    byName.set(key, byName.has(key) ? "duplicate" : p);
  }

  const fileErrors = [];
  const unitKey = type === "residential" ? "units" : "officeUnits";
  const rows = projects.rows.map((p) => ({ ...p, property: type, [unitKey]: [] }));
  const rowByNumber = new Map(rows.map((r) => [r.rowNumber, r]));

  for (const u of units.rows) {
    const match = byName.get(squash(u.projectname));
    if (!match) {
      fileErrors.push(`${t.unitsSheet} row ${u.rowNumber}: no project named "${u.projectname}" in ${t.projectsSheet}`);
      continue;
    }
    if (match === "duplicate") {
      fileErrors.push(`${t.unitsSheet} row ${u.rowNumber}: "${u.projectname}" appears more than once in ${t.projectsSheet}, so the unit can't be matched`);
      continue;
    }
    const unit = { ...u };
    delete unit.projectname;
    if (type === "commercial") unit.icon = UNIT_ICONS[Object.keys(UNIT_ICONS).find((k) => squash(k) === squash(u.unitType))] || "";
    rowByNumber.get(match.rowNumber)[unitKey].push(unit);
  }

  return { type, rows, fileErrors };
};

const unitCount = (r) => (r.units?.length || 0) + (r.officeUnits?.length || 0);
const toPayload = (r) => {
  const payload = { ...r };
  delete payload.result;
  return payload;
};

// ── Upload section ──────────────────────────────────────────────────────────
function UploadSection({ onUploaded }) {
  const inputRef = useRef(null);
  const [fileName, setFileName] = useState("");
  const [type, setType] = useState("");
  const [rows, setRows] = useState([]);
  const [fileErrors, setFileErrors] = useState([]);
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [downloading, setDownloading] = useState("");
  const [result, setResult] = useState(null);

  const readyRows = rows.filter((r) => r.result?.success);

  const reset = () => {
    setRows([]);
    setType("");
    setFileName("");
    setFileErrors([]);
    setResult(null);
    setError("");
    if (inputRef.current) inputRef.current.value = "";
  };

  const download = async (t, withSample) => {
    setDownloading(`${t}-${withSample ? "sample" : "template"}`);
    try {
      await downloadTemplate(t, withSample);
    } finally {
      setDownloading("");
    }
  };

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    reset();
    setFileName(file.name);

    let parsed;
    try {
      parsed = parseWorkbook(XLSX.read(await file.arrayBuffer(), { cellDates: true }));
    } catch (err) {
      setError(err.message || "Could not read this file. Upload the .xlsx template.");
      return;
    }
    if (!parsed.rows.length) {
      setError("No projects found in the file.");
      return;
    }
    setType(parsed.type);
    setFileErrors(parsed.fileErrors);
    setRows(parsed.rows);

    // dry run: backend checks every row (and DB duplicates) without saving
    setChecking(true);
    try {
      const res = await bulkCreateProjects(parsed.rows.map(toPayload), true);
      const byRow = new Map(res.data.results.map((r) => [r.rowNumber, r]));
      setRows(parsed.rows.map((r) => ({ ...r, result: byRow.get(r.rowNumber) })));
    } catch (err) {
      setError(errMsg(err, "Could not check the file. Please try again."));
    } finally {
      setChecking(false);
    }
  };

  const upload = async () => {
    if (!readyRows.length) return;
    setUploading(true);
    try {
      const res = await bulkCreateProjects(readyRows.map(toPayload));
      setResult(res.data);
      onUploaded();
    } catch (err) {
      setError(errMsg(err, "Upload failed. Please try again."));
    } finally {
      setUploading(false);
    }
  };

  const failedResults = (result?.results || []).filter((r) => !r.success);
  const errorCount = rows.filter((r) => r.result && !r.result.success).length;

  return (
    <div className="rounded-xl border border-gray-200 bg-white">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-gray-100 p-4">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Bulk Project Upload</h2>
          <p className="text-xs text-gray-500">
            Upload complete projects from Excel. Photos, videos, layouts, brochure, FAQ and description are added later from Edit.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          {Object.entries(TEMPLATES).map(([key, t]) => (
            <div key={key} className="flex flex-wrap items-center gap-2">
              <span className="w-24 text-xs font-semibold text-gray-500">{t.label}</span>
              <button
                onClick={() => download(key, false)}
                disabled={!!downloading}
                className="h-9 rounded-lg border border-gray-200 px-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              >
                {downloading === `${key}-template` ? "Preparing…" : "Empty Template"}
              </button>
              <button
                onClick={() => download(key, true)}
                disabled={!!downloading}
                title="Template filled with 2 example projects — see how to fill it, or upload it to try"
                className="h-9 rounded-lg border border-[#0D6EFD] px-3 text-sm font-semibold text-[#0D6EFD] hover:bg-blue-50 disabled:opacity-50"
              >
                {downloading === `${key}-sample` ? "Preparing…" : "Download Sample"}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4">
        <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 px-4 py-8 text-center transition hover:border-[#0D6EFD]">
          <input ref={inputRef} type="file" accept=".xlsx,.xls" className="hidden" onChange={handleFile} />
          <span className="text-sm font-semibold text-gray-800">{fileName || "Choose filled template (.xlsx)"}</span>
          <span className="mt-1 text-xs text-gray-500">Residential or commercial is detected from the template, up to 500 projects</span>
        </label>

        {error && <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}

        {fileErrors.length > 0 && !result && (
          <div className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-800">
            <p className="font-semibold">Units not added:</p>
            <ul className="mt-1 list-disc space-y-0.5 pl-4">
              {fileErrors.map((e, i) => <li key={i}>{e}</li>)}
            </ul>
          </div>
        )}

        {result && (
          <div className="mt-4 rounded-lg border border-gray-200 p-3 text-sm">
            <p className="font-semibold text-gray-900">
              <span className="text-green-600">{result.created} {TEMPLATES[type]?.label.toLowerCase()} projects created</span>
              {result.failed > 0 && <span className="text-red-600"> · {result.failed} failed</span>}
            </p>
            {failedResults.length > 0 && (
              <ul className="mt-2 space-y-1 text-xs text-red-600">
                {failedResults.map((r) => (
                  <li key={r.rowNumber}>Row {r.rowNumber}{r.projectname ? ` (${r.projectname})` : ""}: {r.errors.join(", ")}</li>
                ))}
              </ul>
            )}
            <button onClick={reset} className="mt-3 h-8 rounded-md border border-gray-200 px-3 text-xs font-semibold text-gray-700">Upload another file</button>
          </div>
        )}

        {rows.length > 0 && !result && (
          <>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm text-gray-700">
                <span className="font-semibold">{TEMPLATES[type]?.label}</span> · {rows.length} projects
                {checking ? (
                  <span className="text-gray-500"> · checking…</span>
                ) : (
                  <>
                    {" · "}<span className="text-green-600">{readyRows.length} ready</span>
                    {errorCount > 0 && <span className="text-red-600"> · {errorCount} with errors (will be skipped)</span>}
                  </>
                )}
              </p>
              <div className="flex gap-2">
                <button onClick={reset} className="h-9 rounded-lg border border-gray-200 px-3 text-sm font-semibold text-gray-700">Cancel</button>
                <button
                  onClick={upload}
                  disabled={checking || uploading || !readyRows.length}
                  className="h-9 rounded-lg bg-[#0D6EFD] px-4 text-sm font-semibold text-white disabled:opacity-50"
                >
                  {uploading ? "Uploading…" : `Upload ${readyRows.length} project${readyRows.length === 1 ? "" : "s"}`}
                </button>
              </div>
            </div>

            <div className="mt-3 max-h-[460px] overflow-auto rounded-lg border border-gray-100">
              <table className="w-full min-w-[760px] text-sm">
                <thead className="sticky top-0 bg-gray-50">
                  <tr>
                    {["Row", "Project", "Location", "Types", "Units", "Check"].map((h) => (
                      <th key={h} className="whitespace-nowrap px-3 py-2 text-left text-xs font-semibold text-gray-500">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => {
                    const res = r.result;
                    const failed = res && !res.success;
                    return (
                      <tr key={r.rowNumber} className={`border-t border-gray-100 align-top ${failed ? "bg-red-50/50" : ""}`}>
                        <td className="px-3 py-2 text-gray-500">{r.rowNumber}</td>
                        <td className="px-3 py-2">
                          <p className="font-medium text-gray-900">{r.projectname || "—"}</p>
                          <p className="text-xs text-gray-500">{r.projectdeveloper}</p>
                        </td>
                        <td className="px-3 py-2 text-gray-700">{[r.locality, r.city].filter(Boolean).join(", ") || "—"}</td>
                        <td className="px-3 py-2 text-gray-700">{r.propertyType || "—"}</td>
                        <td className="px-3 py-2 text-gray-700">{unitCount(r)}</td>
                        <td className="max-w-[360px] px-3 py-2 text-xs">
                          {!res ? (
                            <span className="text-gray-400">{checking ? "Checking…" : "—"}</span>
                          ) : failed ? (
                            <span className="text-red-600">{res.errors.join(", ")}</span>
                          ) : (
                            <span className="text-green-600">Ready</span>
                          )}
                          {res?.warnings?.length > 0 && (
                            <p className="mt-1 text-amber-700">{res.warnings.join(", ")}</p>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ── Uploaded projects: what's still missing ────────────────────────────────
const CHECKS = [
  { key: "description", label: "Description" },
  { key: "faq", label: "FAQ" },
  { key: "cover", label: "Cover" },
  { key: "photos", label: "Photos" },
  { key: "layouts", label: "Layouts" },
  { key: "brochure", label: "Brochure" },
  { key: "videos", label: "Videos" },
];

const STATUS_BADGE = {
  pending: "bg-amber-50 text-amber-700",
  approved: "bg-green-50 text-green-700",
  rejected: "bg-red-50 text-red-700",
};

function useDebounced(value, delay = 350) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setV(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return v;
}

function UploadedProjects({ refreshKey }) {
  const navigate = useNavigate();
  const [status, setStatus] = useState("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState({ data: [], totalPages: 1, totalItems: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const q = useDebounced(search);

  useEffect(() => setPage(1), [status, q, refreshKey]);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setError("");
    getBulkProjects(page, 20, status, q)
      .then((res) => alive && setData(res.data))
      .catch((err) => alive && setError(errMsg(err, "Could not load projects")))
      .finally(() => alive && setLoading(false));
    return () => { alive = false; };
  }, [page, status, q, refreshKey]);

  return (
    <div className="mt-4 rounded-xl border border-gray-200 bg-white">
      <div className="border-b border-gray-100 p-4">
        <h3 className="text-base font-bold text-gray-900">Bulk Uploaded Projects</h3>
        <p className="text-xs text-gray-500">Open Edit to add content, photos, layouts, brochure and videos. Projects go live only after approval.</p>
      </div>
      <div className="flex flex-wrap items-center gap-2 border-b border-gray-100 p-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search name, RERA or city"
          className="h-10 min-w-[220px] flex-1 rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-[#0D6EFD]"
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm outline-none focus:border-[#0D6EFD]">
          <option value="all">All statuses</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[820px]">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Project</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Still needed</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {(loading || error || !data.data.length) && (
              <tr>
                <td colSpan={4} className={`px-4 py-10 text-center text-sm ${error ? "text-red-500" : "text-gray-500"}`}>
                  {loading ? "Loading…" : error || "No bulk uploaded projects yet."}
                </td>
              </tr>
            )}
            {!loading && !error && data.data.map((p) => {
              const c = p.completeness || {};
              const loc = Array.isArray(p.location) ? p.location[0] : p.location;
              return (
                <tr key={p._id} className="border-t border-gray-100">
                  <td className="px-4 py-3 align-top text-sm">
                    <p className="font-semibold text-gray-900">{p.projectname}</p>
                    <p className="text-xs text-gray-500">{[loc?.Address, loc?.City].filter(Boolean).join(", ")}{p.rera ? ` · ${p.rera}` : ""}</p>
                  </td>
                  <td className="px-4 py-3 align-top">
                    <div className="flex flex-wrap gap-1">
                      {CHECKS.map(({ key, label }) => {
                        const v = c[key];
                        const done = typeof v === "number" ? v > 0 : !!v;
                        return (
                          <span key={key} className={`rounded-full px-2 py-0.5 text-xs font-medium ${done ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                            {done ? "✓" : "✗"} {label}{typeof v === "number" && v > 0 ? ` (${v})` : ""}
                          </span>
                        );
                      })}
                    </div>
                  </td>
                  <td className="px-4 py-3 align-top">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${STATUS_BADGE[p.approvalStatus] || "bg-gray-100 text-gray-600"}`}>
                      {p.approvalStatus || "—"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right align-top">
                    <button
                      onClick={() => navigate(`/edit-property/${p._id}`)}
                      className="h-8 whitespace-nowrap rounded-md border border-gray-200 px-3 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t border-gray-100 px-4 py-3 text-sm text-gray-600">
        <span>{data.totalItems || 0} total</span>
        <div className="flex items-center gap-2">
          <button disabled={page <= 1} onClick={() => setPage(page - 1)} className="h-8 rounded-md border border-gray-200 px-3 disabled:opacity-40">Prev</button>
          <span>{page} / {data.totalPages || 1}</span>
          <button disabled={page >= (data.totalPages || 1)} onClick={() => setPage(page + 1)} className="h-8 rounded-md border border-gray-200 px-3 disabled:opacity-40">Next</button>
        </div>
      </div>
    </div>
  );
}

export default function BulkProjectUpload() {
  const [refreshKey, setRefreshKey] = useState(0);
  return (
    <div className="min-w-0">
      <UploadSection onUploaded={() => setRefreshKey((k) => k + 1)} />
      <UploadedProjects refreshKey={refreshKey} />
    </div>
  );
}
