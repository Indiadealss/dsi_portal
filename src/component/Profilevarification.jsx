import React, { useState, useRef, useCallback } from "react";
import {
  Mail, Phone, MapPin, Briefcase, Camera, UploadCloud, CheckCircle2,
  Circle, ChevronRight, Bell, ShieldCheck, X, FileText, User,
  Fingerprint, Lock, Trash2, Headphones
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Static config                                                      */
/* ------------------------------------------------------------------ */

const TABS = [
  { id: "profile", label: "Profile Information" },
  { id: "verification", label: "Verification" },
  { id: "documents", label: "Documents" },
  { id: "bank", label: "Bank Details" },
];

const VERIFICATION_ORDER = ["email", "phone", "identity", "address", "business"];

const VERIFICATION_META = {
  email: { title: "Email Verification", desc: "Verify your mail", icon: Mail, needsDoc: false },
  phone: { title: "Phone Verification", desc: "Verify your phone number", icon: Phone, needsDoc: false },
  identity: { title: "Identity Verification", desc: "Verify your Identity", icon: Fingerprint, needsDoc: true },
  address: { title: "Address Verification", desc: "Verify your address proof", icon: MapPin, needsDoc: true },
  business: { title: "Business Verification", desc: "Verify your business details", icon: Briefcase, needsDoc: true },
};

const DOC_TYPE_OPTIONS = {
  address: ["Utility Bill (Electricity / Water / Gas / Internet)", "Bank Statement", "Rental Agreement"],
  identity: ["Aadhaar Card", "PAN Card", "Passport", "Driving Licence"],
  business: ["GST Certificate", "Shop & Establishment Licence", "Company PAN"],
};

const STATUS_LABEL = { verified: "Verified", pending: "Pending", not_started: "Not Started" };

/* ------------------------------------------------------------------ */
/*  Small building blocks                                              */
/* ------------------------------------------------------------------ */

function StatusBadge({ status }) {
  return (
    <span className={`status-badge status-${status}`}>
      {status === "verified" && <CheckCircle2 size={13} />}
      {status === "pending" && <Circle size={13} />}
      {status === "not_started" && <Circle size={13} />}
      {STATUS_LABEL[status]}
    </span>
  );
}

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(0) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

function Dropzone({ file, onFile, onRemove, accept = ".pdf,.png,.jpg,.jpeg", maxSizeMB = 5, hint = "PDF, PNG, JPG" }) {
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  const handleFiles = useCallback(
    (files) => {
      setError("");
      const f = files && files[0];
      if (!f) return;
      if (f.size > maxSizeMB * 1024 * 1024) {
        setError(`File is too large. Max size is ${maxSizeMB}MB.`);
        return;
      }
      const isImage = f.type.startsWith("image/");
      const preview = isImage ? URL.createObjectURL(f) : null;
      onFile({ name: f.name, size: f.size, type: f.type, preview });
    },
    [maxSizeMB, onFile]
  );

  return (
    <div>
      {!file ? (
        <div
          className={`dropzone${dragOver ? " dropzone-active" : ""}`}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            handleFiles(e.dataTransfer.files);
          }}
          onClick={() => inputRef.current && inputRef.current.click()}
          role="button"
          tabIndex={0}
        >
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            style={{ display: "none" }}
            onChange={(e) => handleFiles(e.target.files)}
          />
          <UploadCloud size={30} color="#0D6EFD" strokeWidth={1.6} />
          <div className="dropzone-title">Drag &amp; Drop Files here</div>
          <div className="dropzone-sub">
            or <span className="link-text">Browse</span>
          </div>
          <div className="dropzone-hint">{hint} ({maxSizeMB} MB)</div>
        </div>
      ) : (
        <div className="file-preview">
          {file.preview ? (
            <img src={file.preview} alt={file.name} className="file-thumb" />
          ) : (
            <div className="file-thumb file-thumb-icon">
              <FileText size={22} color="#0D6EFD" />
            </div>
          )}
          <div className="file-info">
            <div className="file-name">{file.name}</div>
            <div className="file-meta">{(file.type || "FILE").split("/").pop().toUpperCase()} · {formatBytes(file.size)}</div>
            <div className="file-ready"><CheckCircle2 size={13} /> Ready to submit</div>
          </div>
          <button className="file-remove" onClick={onRemove} aria-label="Remove file">
            <X size={14} />
          </button>
        </div>
      )}
      {error && <div className="dropzone-error">{error}</div>}
    </div>
  );
}

function ProgressCircle({ percent }) {
  const r = 52;
  const c = 2 * Math.PI * r;
  const offset = c - (percent / 100) * c;
  return (
    <svg width="140" height="140" viewBox="0 0 140 140" className="progress-svg">
      <circle cx="70" cy="70" r={r} fill="none" stroke="#ECECEC" strokeWidth="10" />
      <circle
        cx="70" cy="70" r={r} fill="none" stroke="#2EAD5F" strokeWidth="10"
        strokeDasharray={c} strokeDashoffset={offset} strokeLinecap="round"
        transform="rotate(-90 70 70)"
      />
      <text x="70" y="66" textAnchor="middle" className="progress-percent">{percent}%</text>
      <text x="70" y="86" textAnchor="middle" className="progress-label">Completed</text>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export default function ProfileVerificationPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [toast, setToast] = useState(null);

  const showToast = useCallback((msg) => {
    setToast(msg);
    window.clearTimeout(showToast._t);
    showToast._t = window.setTimeout(() => setToast(null), 2600);
  }, []);

  /* ---- profile ---- */
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    fullName: "Rajat Sharma",
    email: "rajat.sharma@email.com",
    phone: "+91 12345 67890",
    altPhone: "+91 12345 67890",
    role: "Buyer / Investor",
    location: "Gurgaon, Haryana",
    bio: "Real estate enthusiast with 5+ years of experience in buying and investing in residential and commercial properties.",
  });
  const [draftProfile, setDraftProfile] = useState(profile);
  const [avatar, setAvatar] = useState(null);
  const avatarInputRef = useRef(null);

  const startEdit = () => {
    setDraftProfile(profile);
    setEditing(true);
  };
  const cancelEdit = () => setEditing(false);
  const saveEdit = () => {
    setProfile(draftProfile);
    setEditing(false);
    showToast("Profile updated successfully");
  };

  /* ---- verification statuses (shared across tabs) ---- */
  const [statuses, setStatuses] = useState({
    email: "verified",
    phone: "verified",
    identity: "verified",
    address: "pending",
    business: "not_started",
  });
  const verifiedCount = VERIFICATION_ORDER.filter((k) => statuses[k] === "verified").length;
  const percent = Math.round((verifiedCount / VERIFICATION_ORDER.length) * 100);

  const [selectedVerification, setSelectedVerification] = useState("address");
  const [verificationFiles, setVerificationFiles] = useState({});
  const [verificationDocType, setVerificationDocType] = useState({});

  const submitVerification = (key) => {
    const file = verificationFiles[key];
    if (!file) {
      showToast("Please upload a document before submitting");
      return;
    }
    setStatuses((s) => ({ ...s, [key]: "pending" }));
    showToast(`${VERIFICATION_META[key].title} submitted for review`);
  };

  /* ---- documents tab ---- */
  const [documents, setDocuments] = useState([
    { id: "aadhaar", name: "Aadhaar Card", type: "ID Proof", status: "verified", icon: User },
    { id: "pan", name: "PAN Card", type: "ID Proof", status: "verified", icon: FileText },
    { id: "address_proof", name: "Address Proof", type: "Utility Bill", status: "pending", icon: FileText },
    { id: "photo", name: "Profile Photo", type: "Image", status: "verified", icon: User },
  ]);

  const [docVerificationType, setDocVerificationType] = useState("address");
  const [docType, setDocType] = useState(DOC_TYPE_OPTIONS.address[0]);
  const [docFile, setDocFile] = useState(null);

  const submitDocuments = () => {
    if (!docFile) {
      showToast("Please upload a document before submitting");
      return;
    }
    setStatuses((s) => ({ ...s, [docVerificationType]: "pending" }));
    if (docVerificationType === "address") {
      setDocuments((docs) => docs.map((d) => (d.id === "address_proof" ? { ...d, status: "pending" } : d)));
    }
    showToast("Document submitted for verification");
    setDocFile(null);
  };

  const removeDocument = (id) => {
    setDocuments((docs) => docs.filter((d) => d.id !== id));
    showToast("Document removed");
  };

  const [newDocFile, setNewDocFile] = useState(null);
  const addNewDocument = () => {
    if (!newDocFile) {
      showToast("Choose a file to upload first");
      return;
    }
    setDocuments((docs) => [
      ...docs,
      { id: `doc_${Date.now()}`, name: newDocFile.name, type: "Uploaded Document", status: "pending", icon: FileText },
    ]);
    setNewDocFile(null);
    showToast("New document uploaded");
  };

  /* ---- bank details tab ---- */
  const [bankForm, setBankForm] = useState({
    accountHolder: "Rajat Sharma",
    accountNumber: "5010 0002 0067 6969",
    bankName: "HDFC Bank",
    ifsc: "HDFC0001234",
    accountType: "current",
    branch: "Gurgaon Sushant lok Vihar",
  });
  const [bankFile, setBankFile] = useState(null);
  const updateBankField = (field, value) => setBankForm((f) => ({ ...f, [field]: value }));

  const submitBank = () => {
    if (!bankForm.accountHolder || !bankForm.accountNumber || !bankForm.ifsc) {
      showToast("Please fill all required bank fields");
      return;
    }
    if (!bankFile) {
      showToast("Please upload a cancelled cheque or passbook page");
      return;
    }
    showToast("Bank details submitted for verification");
  };

  /* ---- quick actions ---- */
  const quickActions = [
    { icon: FileText, label: "Update Information" },
    { icon: Lock, label: "Change Password" },
    { icon: Bell, label: "Notification Preference" },
    { icon: ShieldCheck, label: "Privacy Setting" },
  ];

  /* ------------------------------------------------------------------ */

  return (
    <div className="pv-root">
      <style>{CSS}</style>

      <div className="layout">
        {/* Main content */}
        <main className="main-content">
          <div className="page-header">
            <h1 className="page-title">Profile &amp; Verification</h1>
            <p className="page-subtitle">Manage all your profile details and verification status</p>
            <div className="tabs">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  className={`tab${activeTab === t.id ? " tab-active" : ""}`}
                  onClick={() => setActiveTab(t.id)}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="tab-body">
            {/* ---------------- PROFILE TAB ---------------- */}
            {activeTab === "profile" && (
              <>
                <section className="card profile-card">
                  <h2 className="card-title">Profile Information</h2>
                  <div className="profile-grid">
                    <div className="avatar-col">
                      <div className="avatar-wrap">
                        {avatar ? (
                          <img src={avatar} className="avatar-img" alt="Profile" />
                        ) : (
                          <div className="avatar-fallback"><User size={40} /></div>
                        )}
                        <button
                          className="avatar-camera"
                          onClick={() => avatarInputRef.current && avatarInputRef.current.click()}
                          aria-label="Change photo"
                        >
                          <Camera size={14} />
                        </button>
                        <input
                          ref={avatarInputRef}
                          type="file"
                          accept="image/*"
                          style={{ display: "none" }}
                          onChange={(e) => {
                            const f = e.target.files && e.target.files[0];
                            if (f) setAvatar(URL.createObjectURL(f));
                          }}
                        />
                      </div>
                      <span className="completion-badge">Profile Complete&nbsp;100%</span>
                    </div>

                    <div className="detail-col">
                      {!editing ? (
                        <>
                          <div className="detail-grid">
                            <div className="detail-item">
                              <span className="detail-label">Full Name</span>
                              <span className="detail-value">{profile.fullName}</span>
                            </div>
                            <div className="detail-item">
                              <span className="detail-label">E-mail Address</span>
                              <span className="detail-value">{profile.email}</span>
                            </div>
                            <div className="detail-item">
                              <span className="detail-label">Phone Number</span>
                              <span className="detail-value">{profile.phone}</span>
                            </div>
                            <div className="detail-item">
                              <span className="detail-label">Alternate Number</span>
                              <span className="detail-value">{profile.altPhone}</span>
                            </div>
                            <div className="detail-item">
                              <span className="detail-label">Role</span>
                              <span className="detail-value">{profile.role}</span>
                            </div>
                            <div className="detail-item">
                              <span className="detail-label">Location</span>
                              <span className="detail-value">{profile.location}</span>
                            </div>
                          </div>
                          <div className="field-group">
                            <span className="detail-label">Bio</span>
                            <div className="bio-box">{profile.bio}</div>
                          </div>
                          <button className="btn btn-outline" onClick={startEdit}>Edit Profile</button>
                        </>
                      ) : (
                        <>
                          <div className="detail-grid">
                            <label className="field-group">
                              <span className="detail-label">Full Name</span>
                              <input className="input" value={draftProfile.fullName}
                                onChange={(e) => setDraftProfile((d) => ({ ...d, fullName: e.target.value }))} />
                            </label>
                            <label className="field-group">
                              <span className="detail-label">E-mail Address</span>
                              <input className="input" value={draftProfile.email}
                                onChange={(e) => setDraftProfile((d) => ({ ...d, email: e.target.value }))} />
                            </label>
                            <label className="field-group">
                              <span className="detail-label">Phone Number</span>
                              <input className="input" value={draftProfile.phone}
                                onChange={(e) => setDraftProfile((d) => ({ ...d, phone: e.target.value }))} />
                            </label>
                            <label className="field-group">
                              <span className="detail-label">Alternate Number</span>
                              <input className="input" value={draftProfile.altPhone}
                                onChange={(e) => setDraftProfile((d) => ({ ...d, altPhone: e.target.value }))} />
                            </label>
                            <label className="field-group">
                              <span className="detail-label">Role</span>
                              <input className="input" value={draftProfile.role}
                                onChange={(e) => setDraftProfile((d) => ({ ...d, role: e.target.value }))} />
                            </label>
                            <label className="field-group">
                              <span className="detail-label">Location</span>
                              <input className="input" value={draftProfile.location}
                                onChange={(e) => setDraftProfile((d) => ({ ...d, location: e.target.value }))} />
                            </label>
                          </div>
                          <label className="field-group">
                            <span className="detail-label">Bio</span>
                            <textarea className="input textarea" rows={3} value={draftProfile.bio}
                              onChange={(e) => setDraftProfile((d) => ({ ...d, bio: e.target.value }))} />
                          </label>
                          <div className="btn-row">
                            <button className="btn btn-primary" onClick={saveEdit}>Save Changes</button>
                            <button className="btn btn-outline" onClick={cancelEdit}>Cancel</button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </section>

                <section className="card">
                  <h2 className="card-title">Documents</h2>
                  <div className="documents-grid">
                    {documents.map((doc) => {
                      const Icon = doc.icon;
                      return (
                        <div className="doc-card" key={doc.id}>
                          <div className="doc-card-top">
                            <div className="doc-icon"><Icon size={20} /></div>
                            <button className="doc-menu-btn" onClick={() => removeDocument(doc.id)} aria-label="Remove document">
                              <Trash2 size={15} />
                            </button>
                          </div>
                          <div className="doc-name">{doc.name}</div>
                          <div className="doc-type">{doc.type}</div>
                          <StatusBadge status={doc.status} />
                        </div>
                      );
                    })}
                    <div className="upload-card">
                      <Dropzone
                        file={newDocFile}
                        onFile={setNewDocFile}
                        onRemove={() => setNewDocFile(null)}
                        hint="PDF, JPG or PNG"
                        maxSizeMB={5}
                      />
                      {newDocFile && (
                        <button className="btn btn-primary btn-sm" onClick={addNewDocument}>Upload New Document</button>
                      )}
                      {!newDocFile && <div className="upload-card-label">Upload New Document</div>}
                    </div>
                  </div>
                </section>
              </>
            )}

            {/* ---------------- VERIFICATION TAB ---------------- */}
            {activeTab === "verification" && (
              <div className="verification-layout">
                <div className="card verification-list-card">
                  {VERIFICATION_ORDER.map((key) => {
                    const meta = VERIFICATION_META[key];
                    const Icon = meta.icon;
                    const status = statuses[key];
                    const active = selectedVerification === key;
                    return (
                      <button
                        key={key}
                        className={`verification-row${active ? " verification-row-active" : ""}`}
                        onClick={() => setSelectedVerification(key)}
                      >
                        <div className="verification-row-icon"><Icon size={17} /></div>
                        <div className="verification-row-text">
                          <div className="verification-row-title">{meta.title}</div>
                          <div className="verification-row-desc">{meta.desc}</div>
                        </div>
                        <span className={`inline-status inline-status-${status}`}>
                          {STATUS_LABEL[status]}
                          {status === "verified" && <CheckCircle2 size={13} />}
                          {status === "pending" && <Circle size={13} />}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="card verification-detail-card">
                  {(() => {
                    const key = selectedVerification;
                    const meta = VERIFICATION_META[key];
                    const status = statuses[key];
                    const options = DOC_TYPE_OPTIONS[key] || DOC_TYPE_OPTIONS.address;
                    const currentDocType = verificationDocType[key] || options[0];

                    if (status === "verified") {
                      return (
                        <div className="verified-panel">
                          <div className="verified-icon"><CheckCircle2 size={34} color="#2EAD5F" /></div>
                          <h3 className="card-title" style={{ marginTop: 12 }}>{meta.title}</h3>
                          <p className="muted-text">This step has already been verified. No further action is needed.</p>
                        </div>
                      );
                    }

                    return (
                      <>
                        <div className="detail-head">
                          <h3 className="card-title">{meta.title} <StatusBadge status={status} /></h3>
                          <p className="muted-text">Please submit a valid document to verify this step</p>
                        </div>

                        <div className="secure-banner">
                          <ShieldCheck size={18} color="#2EAD5F" />
                          <div>
                            <div className="secure-title">Your Information is secure</div>
                            <div className="secure-desc">We encrypt and secure your documents. Your data is safe with us</div>
                          </div>
                        </div>

                        <label className="field-group">
                          <span className="detail-label">Select Document Type</span>
                          <select
                            className="input"
                            value={currentDocType}
                            onChange={(e) => setVerificationDocType((v) => ({ ...v, [key]: e.target.value }))}
                          >
                            {options.map((o) => <option key={o}>{o}</option>)}
                          </select>
                        </label>

                        <div className="field-group">
                          <span className="detail-label">Upload Document</span>
                          <Dropzone
                            file={verificationFiles[key]}
                            onFile={(f) => setVerificationFiles((v) => ({ ...v, [key]: f }))}
                            onRemove={() => setVerificationFiles((v) => ({ ...v, [key]: null }))}
                          />
                        </div>

                        <div className="guideline-box">
                          <div className="guideline-title">Document Guideline</div>
                          <ul className="guideline-list">
                            <li><CheckCircle2 size={14} color="#2EAD5F" /> Document must be issued in your name</li>
                            <li><CheckCircle2 size={14} color="#2EAD5F" /> Document must contain your current address</li>
                            <li><CheckCircle2 size={14} color="#2EAD5F" /> Document should be valid and not older than 3 months</li>
                            <li><CheckCircle2 size={14} color="#2EAD5F" /> Accepted formats: PDF, JPG, PNG (Max size: 5MB)</li>
                          </ul>
                        </div>

                        <div className="btn-row btn-row-end">
                          <button className="btn btn-outline">Back</button>
                          <button className="btn btn-primary" onClick={() => submitVerification(key)}>Submit for verification</button>
                        </div>
                      </>
                    );
                  })()}
                </div>
              </div>
            )}

            {/* ---------------- DOCUMENTS TAB ---------------- */}
            {activeTab === "documents" && (
              <div className="card doc-submit-card">
                <label className="field-group">
                  <span className="detail-label">Verification type</span>
                  <div className="select-with-badge">
                    <select
                      className="input"
                      value={docVerificationType}
                      onChange={(e) => {
                        const v = e.target.value;
                        setDocVerificationType(v);
                        setDocType(DOC_TYPE_OPTIONS[v][0]);
                      }}
                    >
                      {VERIFICATION_ORDER.filter((k) => VERIFICATION_META[k].needsDoc).map((k) => (
                        <option key={k} value={k}>{VERIFICATION_META[k].title}</option>
                      ))}
                    </select>
                    <StatusBadge status={statuses[docVerificationType]} />
                  </div>
                </label>

                <label className="field-group">
                  <span className="detail-label">Select document type</span>
                  <span className="field-hint">Choose the type of document you want to upload</span>
                  <select className="input" value={docType} onChange={(e) => setDocType(e.target.value)}>
                    {(DOC_TYPE_OPTIONS[docVerificationType] || DOC_TYPE_OPTIONS.address).map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </label>

                <div className="field-group">
                  <span className="detail-label">Upload document</span>
                  <span className="field-hint">Ensure the document is clear, readable and not expired</span>
                  <Dropzone file={docFile} onFile={setDocFile} onRemove={() => setDocFile(null)} hint="JPG, PNG" maxSizeMB={10} />
                </div>

                <div className="guideline-box">
                  <div className="guideline-title">Document Guideline</div>
                  <ul className="guideline-list">
                    <li><CheckCircle2 size={14} color="#2EAD5F" /> Document must be issued in your name</li>
                    <li><CheckCircle2 size={14} color="#2EAD5F" /> Document must contain your current address</li>
                    <li><CheckCircle2 size={14} color="#2EAD5F" /> Document should be valid and not older than 3 months</li>
                  </ul>
                </div>

                <div className="btn-row btn-row-end">
                  <button className="btn btn-outline">Back</button>
                  <button className="btn btn-primary" onClick={submitDocuments}>Submit for verification</button>
                </div>
              </div>
            )}

            {/* ---------------- BANK DETAILS TAB ---------------- */}
            {activeTab === "bank" && (
              <div className="card bank-card">
                <h2 className="card-title">Account holder name</h2>
                <div className="form-grid">
                  <label className="field-group">
                    <span className="detail-label">Account holder name</span>
                    <input className="input" value={bankForm.accountHolder}
                      onChange={(e) => updateBankField("accountHolder", e.target.value)} />
                  </label>
                  <label className="field-group">
                    <span className="detail-label">Account Number</span>
                    <input className="input" value={bankForm.accountNumber}
                      onChange={(e) => updateBankField("accountNumber", e.target.value)} />
                  </label>
                  <label className="field-group">
                    <span className="detail-label">Bank Name</span>
                    <input className="input" value={bankForm.bankName}
                      onChange={(e) => updateBankField("bankName", e.target.value)} />
                  </label>
                  <label className="field-group">
                    <span className="detail-label">IFSC Code</span>
                    <input className="input" value={bankForm.ifsc}
                      onChange={(e) => updateBankField("ifsc", e.target.value)} />
                  </label>
                  <div className="field-group">
                    <span className="detail-label">Account Type</span>
                    <div className="radio-group">
                      <label className="radio-option">
                        <input type="radio" name="accType" checked={bankForm.accountType === "current"}
                          onChange={() => updateBankField("accountType", "current")} />
                        Current Account
                      </label>
                      <label className="radio-option">
                        <input type="radio" name="accType" checked={bankForm.accountType === "saving"}
                          onChange={() => updateBankField("accountType", "saving")} />
                        Saving Account
                      </label>
                    </div>
                  </div>
                  <label className="field-group">
                    <span className="detail-label">Branch Name</span>
                    <input className="input" value={bankForm.branch}
                      onChange={(e) => updateBankField("branch", e.target.value)} />
                  </label>
                </div>

                <div className="field-group">
                  <span className="detail-label">Upload Cancelled Cheque / Passbook</span>
                  <span className="field-hint">Upload a clear image of cancelled cheque or first page of passbook</span>
                  <Dropzone file={bankFile} onFile={setBankFile} onRemove={() => setBankFile(null)} maxSizeMB={10} />
                </div>

                <div className="secure-banner">
                  <ShieldCheck size={18} color="#2EAD5F" />
                  <div>
                    <div className="secure-title">Your Information is secure</div>
                    <div className="secure-desc">We use bank-level encryption to protect your data. Your details are only used for verification purpose</div>
                  </div>
                </div>

                <div className="btn-row btn-row-end">
                  <button className="btn btn-outline">Back</button>
                  <button className="btn btn-primary" onClick={submitBank}>Submit for verification</button>
                </div>
              </div>
            )}
          </div>
        </main>

        {/* Right sidebar */}
        <aside className="right-sidebar">
          {activeTab === "profile" ? (
            <div className="card">
              <h2 className="card-title">Verification Status</h2>
              <div className="status-list">
                {VERIFICATION_ORDER.map((key) => (
                  <div className="status-list-row" key={key}>
                    <span className="status-list-label">{VERIFICATION_META[key].title}</span>
                    <StatusBadge status={statuses[key]} />
                  </div>
                ))}
              </div>
              <button className="btn btn-outline btn-full" onClick={() => setActiveTab("verification")}>Go to Verification</button>
            </div>
          ) : (
            <div className="card progress-card">
              <h2 className="card-title">Verification Progress</h2>
              <div className="progress-circle-wrap">
                <ProgressCircle percent={percent} />
              </div>
              <div className="progress-caption">{verifiedCount} of {VERIFICATION_ORDER.length} completed</div>
              <div className="status-list">
                {VERIFICATION_ORDER.map((key) => (
                  <div className="status-list-row" key={key}>
                    <span className="status-list-label">{VERIFICATION_META[key].title}</span>
                    <StatusBadge status={statuses[key]} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "profile" && (
            <div className="card">
              <h2 className="card-title">Quick Actions</h2>
              <div className="quick-actions">
                {quickActions.map((qa) => {
                  const Icon = qa.icon;
                  return (
                    <button key={qa.label} className="quick-action-row" onClick={() => showToast(`${qa.label} — coming soon`)}>
                      <Icon size={17} />
                      <span>{qa.label}</span>
                      <ChevronRight size={16} className="chevron" />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {(activeTab === "documents" || activeTab === "bank") && (
            <div className="card">
              <div className="guideline-title">Document Guideline</div>
              <ul className="guideline-list">
                <li><CheckCircle2 size={14} color="#2EAD5F" /> Account holder name must match your profile name</li>
                <li><CheckCircle2 size={14} color="#2EAD5F" /> Please provide correct account number and IFSC code</li>
                <li><CheckCircle2 size={14} color="#2EAD5F" /> Upload a clear image of cancelled cheque or passbook</li>
                <li><CheckCircle2 size={14} color="#2EAD5F" /> We do not store your bank credentials</li>
                <li><CheckCircle2 size={14} color="#2EAD5F" /> Accepted formats: JPG, PNG, PDF · Max 5MB</li>
              </ul>
            </div>
          )}

          <div className="card help-card">
            <div className="help-icon"><Headphones size={20} color="#2EAD5F" /></div>
            <h3 className="help-title">Need Help?</h3>
            <p className="help-desc">Our Support Team is here to help you with your account</p>
            <button className="btn btn-outline btn-full" onClick={() => showToast("Our team will reach out shortly")}>Contact Support</button>
          </div>
        </aside>
      </div>

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Styles                                                              */
/* ------------------------------------------------------------------ */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

.pv-root, .pv-root * { box-sizing: border-box; }
.pv-root {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background: #F8FAFC;
  color: #4A5568;
  min-height: 100vh;
  width: 100%;
}

/* ---- layout ---- */
.layout {
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 24px;
  align-items: start;
  max-width: 1600px;
  margin: 0 auto;
  padding: 32px;
}

/* ---- main content ---- */
.main-content { min-width: 0; }
.page-header { margin-bottom: 24px; }
.page-title { font-size: 36px; font-weight: 700; color: #172B4D; margin: 0 0 4px; }
.page-subtitle { font-size: 15px; color: #7A869A; margin: 0 0 20px; }
.tabs { display: flex; gap: 28px; border-bottom: 1px solid #ECECEC; flex-wrap: wrap; }
.tab {
  background: none; border: none; padding: 10px 2px 14px;
  font-size: 15px; font-weight: 500; color: #7A869A; cursor: pointer;
  border-bottom: 2px solid transparent; margin-bottom: -1px;
}
.tab-active { color: #0B74FF; border-bottom: 2px solid #0B74FF; }

.tab-body { display: flex; flex-direction: column; gap: 20px; }

/* ---- cards ---- */
.card {
  background: #fff;
  border: 1px solid #E6EAF0;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,.05);
  padding: 24px;
}
.card-title { font-size: 20px; font-weight: 600; color: #172B4D; margin: 0 0 16px; display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }

/* ---- profile card ---- */
.profile-grid { display: grid; grid-template-columns: 150px 1fr; gap: 24px; }
.avatar-col { display: flex; flex-direction: column; align-items: center; gap: 12px; }
.avatar-wrap { position: relative; width: 110px; height: 110px; }
.avatar-img, .avatar-fallback {
  width: 110px; height: 110px; border-radius: 50%; object-fit: cover;
  background: #EAF2FF; display: flex; align-items: center; justify-content: center; color: #0D6EFD;
}
.avatar-camera {
  position: absolute; bottom: 2px; right: 2px; width: 30px; height: 30px; border-radius: 50%;
  background: #0D6EFD; color: #fff; border: 3px solid #fff; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
}
.completion-badge {
  background: #E8F8EE; color: #2EAD5F; font-size: 13px; font-weight: 500;
  padding: 5px 10px; border-radius: 20px; white-space: nowrap;
}
.detail-col { display: flex; flex-direction: column; gap: 16px; }
.detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.detail-item, .field-group { display: flex; flex-direction: column; gap: 6px; }
.detail-label { font-size: 13px; font-weight: 500; color: #7A869A; }
.field-hint { font-size: 12px; color: #B0B7C3; margin-top: -4px; }
.detail-value { font-size: 15px; font-weight: 500; color: #172B4D; }
.bio-box {
  border: 1px solid #E6EAF0; border-radius: 8px; padding: 12px 14px;
  font-size: 15px; color: #4A5568; line-height: 1.5; background: #FBFCFE;
}
.input {
  border: 1px solid #E6EAF0; border-radius: 8px; padding: 10px 12px;
  font-size: 15px; font-family: inherit; color: #172B4D; background: #fff; width: 100%;
}
.input:focus { outline: 2px solid #2F80ED; outline-offset: 1px; border-color: #2F80ED; }
.textarea { resize: vertical; }

/* ---- buttons ---- */
.btn {
  height: 42px; padding: 0 18px; border-radius: 8px; font-size: 15px; font-weight: 500;
  cursor: pointer; display: inline-flex; align-items: center; justify-content: center; gap: 6px;
  border: 1px solid transparent;
}
.btn-outline { background: #fff; border: 1px solid #0D6EFD; color: #0D6EFD; }
.btn-outline:hover { background: #F3F8FF; }
.btn-primary { background: #0D6EFD; color: #fff; }
.btn-primary:hover { background: #0b5fd6; }
.btn-sm { height: 36px; padding: 0 12px; font-size: 13px; }
.btn-full { width: 100%; margin-top: 4px; }
.btn-row { display: flex; gap: 12px; margin-top: 4px; flex-wrap: wrap; }
.btn-row-end { justify-content: flex-end; }

/* ---- documents grid ---- */
.documents-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.doc-card {
  border: 1px solid #E6EAF0; border-radius: 12px; padding: 16px;
  display: flex; flex-direction: column; gap: 6px;
}
.doc-card-top { display: flex; align-items: center; justify-content: space-between; }
.doc-icon {
  width: 38px; height: 38px; border-radius: 8px; background: #F3F8FF; color: #0D6EFD;
  display: flex; align-items: center; justify-content: center;
}
.doc-menu-btn { background: none; border: none; color: #B0B7C3; cursor: pointer; padding: 4px; }
.doc-menu-btn:hover { color: #F2994A; }
.doc-name { font-size: 15px; font-weight: 600; color: #172B4D; margin-top: 4px; }
.doc-type { font-size: 13px; color: #7A869A; margin-bottom: 4px; }
.upload-card {
  border: 1.5px dashed #C9D6E8; border-radius: 12px; padding: 16px;
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; text-align: center;
}
.upload-card-label { font-size: 13px; color: #7A869A; font-weight: 500; }

/* ---- status badge ---- */
.status-badge {
  display: inline-flex; align-items: center; gap: 5px;
  font-size: 13px; font-weight: 500; padding: 4px 10px; border-radius: 20px; white-space: nowrap;
}
.status-verified { background: #E8F8EE; color: #2EAD5F; }
.status-pending { background: #FFF4E8; color: #F2994A; }
.status-not_started { background: transparent; color: #B0B7C3; border: 1px solid #E6EAF0; }

/* ---- dropzone ---- */
.dropzone {
  border: 1.5px dashed #C9D6E8; border-radius: 10px; padding: 34px 16px;
  display: flex; flex-direction: column; align-items: center; gap: 4px;
  background: #FBFCFE; cursor: pointer; text-align: center;
}
.dropzone:hover, .dropzone-active { background: #F3F8FF; border-color: #0D6EFD; }
.dropzone-title { font-size: 15px; font-weight: 500; color: #172B4D; margin-top: 6px; }
.dropzone-sub { font-size: 14px; color: #7A869A; }
.link-text { color: #0B74FF; font-weight: 500; }
.dropzone-hint { font-size: 12px; color: #B0B7C3; margin-top: 2px; }
.dropzone-error { color: #E0563E; font-size: 13px; margin-top: 6px; }
.file-preview {
  display: flex; align-items: center; gap: 12px; border: 1px solid #E6EAF0; border-radius: 10px; padding: 12px;
}
.file-thumb { width: 56px; height: 56px; border-radius: 8px; object-fit: cover; background: #F3F8FF; }
.file-thumb-icon { display: flex; align-items: center; justify-content: center; }
.file-info { flex: 1; min-width: 0; }
.file-name { font-size: 14px; font-weight: 600; color: #172B4D; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.file-meta { font-size: 12px; color: #7A869A; margin-top: 2px; }
.file-ready { font-size: 12px; color: #2EAD5F; display: flex; align-items: center; gap: 4px; margin-top: 4px; font-weight: 500; }
.file-remove { background: #FFF0EE; color: #E0563E; border: none; width: 26px; height: 26px; border-radius: 50%; cursor: pointer; flex-shrink: 0; }

/* ---- guideline box ---- */
.guideline-box { background: #EAF8EF; border-radius: 10px; padding: 16px; }
.guideline-title { font-size: 15px; font-weight: 600; color: #172B4D; margin-bottom: 10px; }
.guideline-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 8px; }
.guideline-list li { display: flex; align-items: flex-start; gap: 8px; font-size: 14px; color: #4A5568; }

/* ---- secure banner ---- */
.secure-banner { background: #EAF8EF; border-radius: 10px; padding: 14px 16px; display: flex; gap: 12px; align-items: flex-start; }
.secure-title { font-size: 14px; font-weight: 600; color: #172B4D; }
.secure-desc { font-size: 13px; color: #4A5568; margin-top: 2px; }

/* ---- verification tab ---- */
.verification-layout { display: grid; grid-template-columns: 300px 1fr; gap: 20px; align-items: start; }
.verification-list-card { padding: 12px; display: flex; flex-direction: column; gap: 4px; }
.verification-row {
  display: flex; align-items: center; gap: 12px; padding: 12px; border-radius: 10px;
  background: none; border: 1px solid transparent; text-align: left; cursor: pointer; min-height: 56px;
}
.verification-row:hover { background: #FBFCFE; }
.verification-row-active { background: #F3F8FF; border-color: #2F80ED; }
.verification-row-icon {
  width: 34px; height: 34px; border-radius: 8px; background: #EAF2FF; color: #0D6EFD;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.verification-row-text { flex: 1; min-width: 0; }
.verification-row-title { font-size: 14px; font-weight: 600; color: #172B4D; }
.verification-row-desc { font-size: 12px; color: #7A869A; }
.inline-status { display: flex; align-items: center; gap: 4px; font-size: 13px; font-weight: 500; white-space: nowrap; }
.inline-status-verified { color: #2EAD5F; }
.inline-status-pending { color: #F2994A; }
.inline-status-not_started { color: #B0B7C3; }

.verification-detail-card { display: flex; flex-direction: column; gap: 18px; }
.detail-head { display: flex; flex-direction: column; gap: 4px; }
.muted-text { font-size: 14px; color: #7A869A; margin: 0; }
.verified-panel { text-align: center; padding: 30px 10px; }

/* ---- documents submit tab ---- */
.doc-submit-card { display: flex; flex-direction: column; gap: 18px; max-width: 720px; }
.select-with-badge { display: flex; align-items: center; gap: 12px; }
.select-with-badge .input { flex: 1; }

/* ---- bank tab ---- */
.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px 20px; margin-bottom: 4px; }
.radio-group { display: flex; gap: 24px; padding-top: 6px; }
.radio-option { display: flex; align-items: center; gap: 8px; font-size: 14px; color: #172B4D; cursor: pointer; }
.bank-card { display: flex; flex-direction: column; gap: 18px; }

/* ---- right sidebar ---- */
.right-sidebar { display: flex; flex-direction: column; gap: 20px; position: sticky; top: 96px; }
.progress-card { text-align: center; }
.progress-circle-wrap { display: flex; justify-content: center; margin: 4px 0 8px; }
.progress-percent { font-size: 22px; font-weight: 700; fill: #172B4D; font-family: 'Inter', sans-serif; }
.progress-label { font-size: 11px; fill: #7A869A; font-family: 'Inter', sans-serif; }
.progress-caption { font-size: 13px; color: #7A869A; margin-bottom: 16px; }
.status-list { display: flex; flex-direction: column; gap: 12px; margin-bottom: 16px; text-align: left; }
.status-list-row { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
.status-list-label { font-size: 14px; color: #172B4D; font-weight: 500; }

.quick-actions { display: flex; flex-direction: column; }
.quick-action-row {
  display: flex; align-items: center; gap: 12px; padding: 12px 4px; border: none; background: none;
  border-bottom: 1px solid #ECECEC; cursor: pointer; text-align: left; color: #172B4D; font-size: 14px; font-weight: 500;
}
.quick-action-row:last-child { border-bottom: none; }
.quick-action-row:hover { color: #0B74FF; }
.quick-action-row .chevron { margin-left: auto; color: #B0B7C3; }

.help-card { background: #EAF8EF; text-align: left; }
.help-icon {
  width: 40px; height: 40px; border-radius: 10px; background: #fff;
  display: flex; align-items: center; justify-content: center; margin-bottom: 10px;
}
.help-title { font-size: 16px; font-weight: 600; color: #172B4D; margin: 0 0 4px; }
.help-desc { font-size: 13px; color: #4A5568; margin: 0 0 14px; }

/* ---- toast ---- */
.toast {
  position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%);
  background: #172B4D; color: #fff; padding: 12px 20px; border-radius: 10px;
  font-size: 14px; font-weight: 500; z-index: 100; box-shadow: 0 8px 24px rgba(0,0,0,.18);
  max-width: 90vw; text-align: center;
}

/* ------------------------------------------------------------------ */
/*  Responsive                                                          */
/* ------------------------------------------------------------------ */

@media (max-width: 1280px) {
  .layout { grid-template-columns: 240px 1fr 320px; }
  .documents-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 1100px) {
  .layout { grid-template-columns: 220px 1fr; }
  .right-sidebar { grid-column: 1 / -1; flex-direction: row; flex-wrap: wrap; position: static; }
  .right-sidebar > .card { flex: 1 1 260px; }
  .verification-layout { grid-template-columns: 260px 1fr; }
}

@media (max-width: 860px) {
  .layout { grid-template-columns: 1fr; padding: 20px; gap: 16px; }
  .hamburger { display: flex; }
  .sidebar {
    position: fixed; top: 72px; left: 0; bottom: 0; width: 260px; z-index: 50;
    transform: translateX(-100%); transition: transform .2s ease; overflow-y: auto;
    border-radius: 0;
  }
  .sidebar-open { transform: translateX(0); }
  .sidebar-backdrop { display: block; position: fixed; inset: 72px 0 0 0; background: rgba(0,0,0,.35); z-index: 45; }
  .profile-grid { grid-template-columns: 1fr; }
  .avatar-col { flex-direction: row; }
  .detail-grid { grid-template-columns: 1fr; }
  .verification-layout { grid-template-columns: 1fr; }
  .documents-grid { grid-template-columns: repeat(2, 1fr); }
  .form-grid { grid-template-columns: 1fr; }
  .page-title { font-size: 28px; }
}

@media (max-width: 520px) {
  .btn-post-text { display: none; }
  .btn-post { width: 40px; padding: 0; border-radius: 50%; }
  .documents-grid { grid-template-columns: 1fr; }
  .tabs { gap: 16px; overflow-x: auto; }
  .card { padding: 18px; }
  .right-sidebar { flex-direction: column; }
}
`;