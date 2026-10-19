// Mobiles allowed to post projects and use bulk project upload.
// The backend re-checks bulk upload (indiadealss_backend/utils/bulkUploadAccess.js) — keep both lists in sync.
export const PROJECT_ADMIN_MOBILES = ["+917906518272"];

// compare on the last 10 digits so "+91 79065 18272" and "7906518272" both match
const last10 = (mobile) => String(mobile || "").replace(/\D/g, "").slice(-10);

export const isProjectAdmin = (mobile) =>
  !!last10(mobile) && PROJECT_ADMIN_MOBILES.some((m) => last10(m) === last10(mobile));
