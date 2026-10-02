import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { adminApi, approveProperty, rejectProperty } from "../api/api";

// Admin-only control room: platform-wide stats, every property, every lead, every user.
// The backend (/api/admin/*) re-checks the admin role on every request.

const SUB_TABS = [
  { id: "overview", label: "Overview" },
  { id: "properties", label: "All Properties" },
  { id: "leads", label: "All Leads" },
  { id: "users", label: "Users" },
];

const BADGE = {
  pending: { bg: "#FFF7E9", text: "#B45309" },
  approved: { bg: "#ECFDF3", text: "#16A34A" },
  rejected: { bg: "#FFECEC", text: "#DC2626" },
  active: { bg: "#EAF5FF", text: "#0D6EFD" },
  inactive: { bg: "#F1F5F9", text: "#64748B" },
  admin: { bg: "#F3E8FF", text: "#7C3AED" },
  user: { bg: "#F1F5F9", text: "#475569" },
};

function Badge({ value }) {
  const s = BADGE[value] || BADGE.inactive;
  return (
    <span className="inline-block whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize" style={{ background: s.bg, color: s.text }}>
      {value || "—"}
    </span>
  );
}

const fmtDate = (d) =>
  d ? new Date(d).toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "—";

const cityOf = (location) => {
  const loc = Array.isArray(location) ? location[0] : location;
  return loc?.City || "";
};

const publicUrl = (p) => {
  const id = p.npxid ? `npxid-${p.npxid}` : p.spid ? `spid-${p.spid}` : "";
  if (!id) return "";
  const slug = `${p.projectname || "property"}-${cityOf(p.location)}-${id}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
  return `/${slug}`;
};

const errMsg = (err, fallback) => err?.response?.data?.message || fallback;

// small debounce so typing in a search box doesn't fire a request per key
function useDebounced(value, delay = 350) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setV(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return v;
}

function Toolbar({ children }) {
  return <div className="flex flex-wrap items-center gap-2 border-b border-gray-100 p-4">{children}</div>;
}

function SearchBox({ value, onChange, placeholder }) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="h-10 min-w-[220px] flex-1 rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-[#0D6EFD]"
    />
  );
}

function Select({ value, onChange, options }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)} className="h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm outline-none focus:border-[#0D6EFD]">
      {options.map(([v, label]) => (
        <option key={v} value={v}>{label}</option>
      ))}
    </select>
  );
}

function Pager({ page, totalPages, totalItems, onPage }) {
  return (
    <div className="flex items-center justify-between border-t border-gray-100 px-4 py-3 text-sm text-gray-600">
      <span>{totalItems} total</span>
      <div className="flex items-center gap-2">
        <button disabled={page <= 1} onClick={() => onPage(page - 1)} className="h-8 rounded-md border border-gray-200 px-3 disabled:opacity-40">Prev</button>
        <span>{page} / {totalPages}</span>
        <button disabled={page >= totalPages} onClick={() => onPage(page + 1)} className="h-8 rounded-md border border-gray-200 px-3 disabled:opacity-40">Next</button>
      </div>
    </div>
  );
}

function TableState({ loading, error, empty, cols }) {
  if (!loading && !error && !empty) return null;
  return (
    <tr>
      <td colSpan={cols} className={`px-4 py-10 text-center text-sm ${error ? "text-red-500" : "text-gray-500"}`}>
        {loading ? "Loading…" : error || "Nothing found."}
      </td>
    </tr>
  );
}

const th = "whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500";
const td = "px-4 py-3 align-top text-sm text-gray-700";
const actionBtn = "h-8 whitespace-nowrap rounded-md border px-2.5 text-xs font-semibold transition disabled:opacity-40";

// ── Overview ────────────────────────────────────────────────────────────────
function StatCard({ label, value, sub, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!onClick}
      className="flex min-w-[150px] flex-1 flex-col items-start rounded-xl border border-gray-200 bg-white p-4 text-left transition enabled:hover:border-[#0D6EFD] enabled:hover:shadow-sm"
    >
      <span className="text-xs font-medium uppercase tracking-wide text-gray-500">{label}</span>
      <span className="mt-1 text-2xl font-bold text-gray-900">{value ?? "—"}</span>
      {sub && <span className="mt-1 text-xs text-gray-500">{sub}</span>}
    </button>
  );
}

function Overview({ goTo, setActiveNav }) {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    adminApi.getStats()
      .then((res) => setStats(res.data.data))
      .catch((err) => setError(errMsg(err, "Failed to load stats")));
  }, []);

  if (error) return <p className="p-6 text-sm text-red-500">{error}</p>;
  if (!stats) return <p className="p-6 text-sm text-gray-500">Loading…</p>;

  const { users, properties, leads, recentLeads } = stats;

  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="flex flex-wrap gap-3">
        <StatCard label="Users" value={users.total} sub={`${users.newThisWeek} new this week · ${users.admins} admin`} onClick={() => goTo("users")} />
        <StatCard label="Properties" value={properties.total} sub={`${properties.active} active`} onClick={() => goTo("properties")} />
        <StatCard label="Pending approval" value={properties.pending} sub="Waiting for review" onClick={() => setActiveNav("approvals")} />
        <StatCard label="Leads" value={leads.total} sub={`${leads.today} today · ${leads.thisWeek} this week`} onClick={() => goTo("leads")} />
      </div>

      <div className="flex flex-wrap gap-3">
        <StatCard label="Approved" value={properties.approved} onClick={() => goTo("properties", { approvalStatus: "approved" })} />
        <StatCard label="Rejected" value={properties.rejected} onClick={() => goTo("properties", { approvalStatus: "rejected" })} />
        <StatCard label="Leads today" value={leads.today} onClick={() => goTo("leads")} />
      </div>

      <div className="rounded-xl border border-gray-200">
        <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
          <h3 className="text-sm font-semibold text-gray-800">Latest leads</h3>
          <button onClick={() => goTo("leads")} className="text-sm font-semibold text-[#0D6EFD] hover:underline">View all</button>
        </div>
        {recentLeads.length === 0 ? (
          <p className="px-4 py-6 text-sm text-gray-500">No leads yet.</p>
        ) : (
          <ul className="divide-y divide-gray-100">
            {recentLeads.map((l) => (
              <li key={l._id} className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 text-sm">
                <span className="font-medium text-gray-800">{l.Name || "Guest"} <span className="font-normal text-gray-500">· {l.PhoneNumber}</span></span>
                <span className="text-gray-600">{l.property_id?.projectname || l.projectname || "—"}</span>
                <span className="text-xs text-gray-400">{fmtDate(l.createdAt)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

// ── Properties ──────────────────────────────────────────────────────────────
function Properties({ initialFilters, goTo }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [approvalStatus, setApprovalStatus] = useState(initialFilters.approvalStatus || "");
  const [status, setStatus] = useState("");
  const [owner, setOwner] = useState(initialFilters.owner || "");
  const [page, setPage] = useState(1);
  const [result, setResult] = useState({ data: [], totalPages: 1, totalItems: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState(null);
  const q = useDebounced(search);

  const load = () => {
    setLoading(true);
    setError("");
    adminApi.getProperties({ page, search: q, approvalStatus, status, owner })
      .then((res) => setResult(res.data))
      .catch((err) => setError(errMsg(err, "Failed to load properties")))
      .finally(() => setLoading(false));
  };

  useEffect(() => { setPage(1); }, [q, approvalStatus, status, owner]);
  useEffect(load, [page, q, approvalStatus, status, owner]);

  const run = (id, action) => {
    setBusyId(id);
    action()
      .then(load)
      .catch((err) => alert(errMsg(err, "Action failed")))
      .finally(() => setBusyId(null));
  };

  const onReject = (p) => {
    const reason = window.prompt(`Reason for rejecting "${p.projectname}"?`, "");
    if (reason === null) return;
    run(p._id, () => rejectProperty(p._id, reason));
  };

  const onDelete = (p) => {
    if (!window.confirm(`Delete "${p.projectname || "this property"}" permanently? This cannot be undone.`)) return;
    run(p._id, () => adminApi.deleteProperty(p._id));
  };

  return (
    <div>
      <Toolbar>
        <SearchBox value={search} onChange={setSearch} placeholder="Search name, NPX ID, SPID, RERA, city…" />
        <Select value={approvalStatus} onChange={setApprovalStatus} options={[["", "All approvals"], ["pending", "Pending"], ["approved", "Approved"], ["rejected", "Rejected"]]} />
        <Select value={status} onChange={setStatus} options={[["", "Any status"], ["active", "Active"], ["inactive", "Inactive"]]} />
        {owner && (
          <button onClick={() => setOwner("")} className="h-10 rounded-lg bg-[#EAF5FF] px-3 text-sm font-medium text-[#0D6EFD]">
            One user's properties ✕
          </button>
        )}
      </Toolbar>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[980px]">
          <thead className="bg-gray-50">
            <tr>
              <th className={th}>Property</th>
              <th className={th}>Owner</th>
              <th className={th}>Approval</th>
              <th className={th}>Status</th>
              <th className={th}>Leads</th>
              <th className={th}>Added</th>
              <th className={th}>Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <TableState loading={loading} error={error} empty={!result.data.length} cols={7} />
            {!loading && !error && result.data.map((p) => {
              const url = publicUrl(p);
              const busy = busyId === p._id;
              return (
                <tr key={p._id} className="hover:bg-gray-50">
                  <td className={td}>
                    <div className="flex items-center gap-3">
                      {p.coverImage ? (
                        <img src={p.coverImage} alt="" className="h-12 w-16 shrink-0 rounded-md object-cover" />
                      ) : (
                        <div className="h-12 w-16 shrink-0 rounded-md bg-gray-100" />
                      )}
                      <div>
                        <div className="font-semibold text-gray-900">{p.projectname || "Untitled"}</div>
                        <div className="text-xs text-gray-500">
                          {[p.npxid && `NPX ${p.npxid}`, p.spid && `SP ${p.spid}`, p.purpose, cityOf(p.location)].filter(Boolean).join(" · ")}
                        </div>
                        {p.approvalStatus === "rejected" && p.rejectionReason && (
                          <div className="mt-0.5 text-xs text-red-500">Reason: {p.rejectionReason}</div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className={td}>
                    <div>{p.owner?.name || "—"}</div>
                    <div className="text-xs text-gray-500">{p.owner?.mobile || p.owner?.email || ""}</div>
                  </td>
                  <td className={td}><Badge value={p.approvalStatus} /></td>
                  <td className={td}><Badge value={p.status || "inactive"} /></td>
                  <td className={td}>
                    <button
                      disabled={!p.leadCount}
                      onClick={() => goTo("leads", { property: p._id, propertyName: p.projectname })}
                      className="font-semibold text-[#0D6EFD] enabled:hover:underline disabled:text-gray-400"
                    >
                      {p.leadCount}
                    </button>
                  </td>
                  <td className={`${td} whitespace-nowrap text-xs`}>{fmtDate(p.createdAt)}</td>
                  <td className={td}>
                    <div className="flex flex-wrap gap-1.5">
                      {url && (
                        <a href={url} target="_blank" rel="noreferrer" className={`${actionBtn} inline-flex items-center border-gray-200 text-gray-700 hover:bg-gray-50`}>View</a>
                      )}
                      <button onClick={() => navigate(`/edit-property/${p._id}`)} className={`${actionBtn} border-gray-200 text-gray-700 hover:bg-gray-50`}>Edit</button>
                      {p.approvalStatus !== "approved" && (
                        <button disabled={busy} onClick={() => run(p._id, () => approveProperty(p._id))} className={`${actionBtn} border-green-200 text-green-700 hover:bg-green-50`}>Approve</button>
                      )}
                      {p.approvalStatus !== "rejected" && (
                        <button disabled={busy} onClick={() => onReject(p)} className={`${actionBtn} border-amber-200 text-amber-700 hover:bg-amber-50`}>Reject</button>
                      )}
                      <button
                        disabled={busy}
                        onClick={() => run(p._id, () => adminApi.setPropertyStatus(p._id, p.status === "active" ? "inactive" : "active"))}
                        className={`${actionBtn} border-gray-200 text-gray-700 hover:bg-gray-50`}
                      >
                        {p.status === "active" ? "Deactivate" : "Activate"}
                      </button>
                      <button disabled={busy} onClick={() => onDelete(p)} className={`${actionBtn} border-red-200 text-red-600 hover:bg-red-50`}>Delete</button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Pager page={page} totalPages={result.totalPages} totalItems={result.totalItems} onPage={setPage} />
    </div>
  );
}

// ── Leads ───────────────────────────────────────────────────────────────────
function Leads({ initialFilters }) {
  const [search, setSearch] = useState("");
  const [property, setProperty] = useState(initialFilters.property || "");
  const [page, setPage] = useState(1);
  const [result, setResult] = useState({ data: [], totalPages: 1, totalItems: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const q = useDebounced(search);

  useEffect(() => { setPage(1); }, [q, property]);
  useEffect(() => {
    setLoading(true);
    setError("");
    adminApi.getLeads({ page, search: q, property })
      .then((res) => setResult(res.data))
      .catch((err) => setError(errMsg(err, "Failed to load leads")))
      .finally(() => setLoading(false));
  }, [page, q, property]);

  return (
    <div>
      <Toolbar>
        <SearchBox value={search} onChange={setSearch} placeholder="Search name, phone, email, project, message…" />
        {property && (
          <button onClick={() => setProperty("")} className="h-10 rounded-lg bg-[#EAF5FF] px-3 text-sm font-medium text-[#0D6EFD]">
            {initialFilters.propertyName || "One property"} ✕
          </button>
        )}
      </Toolbar>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead className="bg-gray-50">
            <tr>
              <th className={th}>Received</th>
              <th className={th}>Name</th>
              <th className={th}>Phone</th>
              <th className={th}>Email</th>
              <th className={th}>Project</th>
              <th className={th}>Owner</th>
              <th className={th}>Message</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <TableState loading={loading} error={error} empty={!result.data.length} cols={7} />
            {!loading && !error && result.data.map((l) => (
              <tr key={l._id} className="hover:bg-gray-50">
                <td className={`${td} whitespace-nowrap text-xs`}>{fmtDate(l.createdAt)}</td>
                <td className={`${td} font-medium text-gray-900`}>{l.Name || "Guest"}</td>
                <td className={`${td} whitespace-nowrap`}>
                  {l.PhoneNumber ? <a href={`tel:${l.PhoneNumber}`} className="text-[#0D6EFD] hover:underline">{l.PhoneNumber}</a> : "—"}
                </td>
                <td className={td}>{l.email || "—"}</td>
                <td className={td}>{l.property_id?.projectname || l.projectname || "—"}</td>
                <td className={td}>
                  <div>{l.owner?.name || "—"}</div>
                  <div className="text-xs text-gray-500">{l.owner?.mobile || ""}</div>
                </td>
                <td className={`${td} max-w-[280px] break-words`}>{l.message || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pager page={page} totalPages={result.totalPages} totalItems={result.totalItems} onPage={setPage} />
    </div>
  );
}

// ── Users ───────────────────────────────────────────────────────────────────
function Users({ goTo }) {
  const me = useSelector((state) => state.user);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [page, setPage] = useState(1);
  const [result, setResult] = useState({ data: [], totalPages: 1, totalItems: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState(null);
  const q = useDebounced(search);

  const load = () => {
    setLoading(true);
    setError("");
    adminApi.getUsers({ page, search: q, role })
      .then((res) => setResult(res.data))
      .catch((err) => setError(errMsg(err, "Failed to load users")))
      .finally(() => setLoading(false));
  };

  useEffect(() => { setPage(1); }, [q, role]);
  useEffect(load, [page, q, role]);

  const toggleRole = (u) => {
    const next = u.role === "admin" ? "user" : "admin";
    const msg = next === "admin"
      ? `Make ${u.name || u.mobile} an ADMIN? They will see and control everything.`
      : `Remove admin access from ${u.name || u.mobile}?`;
    if (!window.confirm(msg)) return;
    setBusyId(u._id);
    adminApi.setUserRole(u._id, next)
      .then(load)
      .catch((err) => alert(errMsg(err, "Could not change role")))
      .finally(() => setBusyId(null));
  };

  return (
    <div>
      <Toolbar>
        <SearchBox value={search} onChange={setSearch} placeholder="Search name, mobile, email, company…" />
        <Select value={role} onChange={setRole} options={[["", "All roles"], ["admin", "Admins"], ["user", "Users"]]} />
      </Toolbar>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[860px]">
          <thead className="bg-gray-50">
            <tr>
              <th className={th}>User</th>
              <th className={th}>Mobile</th>
              <th className={th}>Type</th>
              <th className={th}>Properties</th>
              <th className={th}>Leads</th>
              <th className={th}>Joined</th>
              <th className={th}>Role</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <TableState loading={loading} error={error} empty={!result.data.length} cols={7} />
            {!loading && !error && result.data.map((u) => {
              const isMe = String(u._id) === String(me.id);
              return (
                <tr key={u._id} className="hover:bg-gray-50">
                  <td className={td}>
                    <div className="font-medium text-gray-900">{u.name || "—"} {isMe && <span className="text-xs text-gray-400">(you)</span>}</div>
                    <div className="text-xs text-gray-500">{u.email || ""}</div>
                  </td>
                  <td className={`${td} whitespace-nowrap`}>{u.mobile || "—"}</td>
                  <td className={td}>{u.you_are || "—"}</td>
                  <td className={td}>
                    <button
                      disabled={!u.propertyCount}
                      onClick={() => goTo("properties", { owner: u._id })}
                      className="font-semibold text-[#0D6EFD] enabled:hover:underline disabled:text-gray-400"
                    >
                      {u.propertyCount}
                    </button>
                  </td>
                  <td className={td}>{u.leadCount}</td>
                  <td className={`${td} whitespace-nowrap text-xs`}>{fmtDate(u.createdAt)}</td>
                  <td className={td}>
                    <div className="flex items-center gap-2">
                      <Badge value={u.role || "user"} />
                      {!isMe && (
                        <button
                          disabled={busyId === u._id}
                          onClick={() => toggleRole(u)}
                          className={`${actionBtn} border-gray-200 text-gray-700 hover:bg-gray-50`}
                        >
                          {u.role === "admin" ? "Remove admin" : "Make admin"}
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Pager page={page} totalPages={result.totalPages} totalItems={result.totalItems} onPage={setPage} />
    </div>
  );
}

// ── Shell ───────────────────────────────────────────────────────────────────
export default function AdminPanel({ setActiveNav }) {
  const [sub, setSub] = useState("overview");
  const [filters, setFilters] = useState({});
  // bump to remount a section when it's re-entered with new filters
  const [visit, setVisit] = useState(0);

  const goTo = (id, nextFilters = {}) => {
    setFilters(nextFilters);
    setSub(id);
    setVisit((v) => v + 1);
  };

  return (
    <div className="min-w-0 overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 px-4 pt-4">
        <div className="pb-3">
          <h2 className="text-lg font-bold text-gray-900">Admin Panel</h2>
          <p className="text-xs text-gray-500">Everything on the portal — all users, properties and leads.</p>
        </div>
        <div className="flex gap-1 overflow-x-auto">
          {SUB_TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => goTo(t.id)}
              className={`whitespace-nowrap border-b-2 px-3 pb-3 text-sm font-semibold transition ${sub === t.id ? "border-[#0D6EFD] text-[#0D6EFD]" : "border-transparent text-gray-500 hover:text-gray-800"}`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {sub === "overview" && <Overview key={visit} goTo={goTo} setActiveNav={setActiveNav} />}
      {sub === "properties" && <Properties key={visit} initialFilters={filters} goTo={goTo} />}
      {sub === "leads" && <Leads key={visit} initialFilters={filters} />}
      {sub === "users" && <Users key={visit} goTo={goTo} />}
    </div>
  );
}
