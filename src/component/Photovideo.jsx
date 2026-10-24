import React, { useEffect, useRef, useState } from "react";
import { Uploadfile } from "./Uploadfile";
import { Uploadphots } from "./Uploadphots";
import { useDispatch, useSelector } from "react-redux";
import { updateField } from "./Redux/propertySlice";
import { deleteImage, deleteVideo, updateImageMeta, uploadImage, uploadVideo } from "../api/api";
import * as XLSX from "xlsx";

// "brandsdoor/1772189452456-3bhk-1500sq.ft.jpeg" -> "3bhk-1500sq.ft.jpeg" (the backend prefixes a timestamp)
const originalName = (src = "") => {
  const last = src.split("/").pop() || "";
  let name = last;
  try { name = decodeURIComponent(last); } catch { /* keep raw name */ }
  return name.replace(/^\d+-/, "");
};

// "Floor_Plan*" / "floor plan" / "FloorPlan" all become "floorplan"
const normHeader = (h) => String(h).toLowerCase().replace(/[^a-z0-9]/g, "");

export const Photovideo = ({ propertyId }) => {

  const propertyData = useSelector((state) => state.property.data);
  const [loading, setLoading] = useState(false);

  const [videoFile, setVideoFile] = useState(propertyData.video || []);
  const [images, setImages] = useState(propertyData.images || []);
  const [bulkResult, setBulkResult] = useState(null);

  const dispatch = useDispatch();

  const videoInputRef = useRef(null);
  const imageInputRef = useRef(null);
  const layoutSheetRef = useRef(null);

  const pdfFieldOptions = [
    "Floor_Plan",
    "Price",
    "super_build_area",
    "carpet_area",
  ];

  // Sync redux
  useEffect(() => {
    dispatch(updateField({ images, video: videoFile }));
  }, [images, videoFile, dispatch]);

  // ---------------- REMOVE ----------------

  const removeImage = async (index) => {
    try {
    const imageId = propertyData.images[index]._id;
    const propertyId = propertyData._id

    const resData = await deleteImage(propertyId,imageId);

    setImages(resData.data.data.images);
    
    

    // UI update
    // setImages(prev => prev.filter((_, i) => i !== index));

  } catch (error) {
    console.log(error);
  }
    // setImages((prev) => prev.filter((_, i) => i !== index));
  };

 const removeVideo = async (index) => {
  try {
    const videoId = propertyData.video[index]._id;
    const propertyId = propertyData._id;

    const res = await deleteVideo(propertyId, videoId);

    console.log(res.data.data,'data');
    
    setVideoFile(res.data.data.video);

  } catch (error) {
    console.log(error);
  }
};

  // ---------------- VIDEO UPLOAD ----------------

  async function videoUp(e) {
    const files = Array.from(e.target.files);
    const uploadedVideoes = [];

    for (let file of files) {
      const formData = new FormData();
      formData.append("video", file);
      const res = await uploadVideo(propertyId, formData);
      const newVideo = res.data.video;
      
      console.log("FULL RESPONSE:", res);
console.log("DATA:", res.data);

      uploadedVideoes.push({
        ...newVideo,
        fields: newVideo.fields || [],
      });
    }

    console.log(uploadedVideoes);
    

    setVideoFile((prev) => [...prev, ...uploadedVideoes]);

    e.target.value = "";
  }

  // ---------------- IMAGE UPLOAD ----------------

  async function imageUp(e) {
    const files = Array.from(e.target.files);
    const uploadedImages = [];

    for (let file of files) {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("type", "general");

      const res = await uploadImage(propertyId, formData);
      const newImage = res.data.image;
      

      uploadedImages.push({
        ...newImage,
        file,
        fields: newImage.fields || [],
      });
    }

    setImages((prev) => [...prev, ...uploadedImages]);

    e.target.value = "";
  }

  // ---------------- TYPE CHANGE ----------------

  async function handleTypeChange(index, newType) {

    const image = images[index];

    const updated = images.map((img, i) =>
      i === index ? { ...img, type: newType } : img
    );

    setImages(updated);

    if (image._id) {
      await updateImageMeta(propertyId, image._id, {
        type: newType,
        fields: image.fields || [],
      });
    }
  }

  // ---------------- ADD FIELD ----------------

  async function addPdfField(index) {

    const image = images[index];

    const updatedFields = [...(image.fields || []), { key: "", value: "" }];

    const updatedImages = images.map((img, i) =>
      i === index ? { ...img, fields: updatedFields } : img
    );

    setImages(updatedImages);

    if (image._id) {
      await updateImageMeta(propertyId, image._id, {
        type: image.type,
        fields: updatedFields,
      });
    }
  }

  // ---------------- UPDATE FIELD ----------------

  async function handlePdfFieldChange(imgIndex, fieldIndex, name, value) {

    const image = images[imgIndex];

    const updatedFields = (image.fields || []).map((field, i) =>
      i === fieldIndex ? { ...field, [name]: value } : field
    );

    const updatedImages = images.map((img, i) =>
      i === imgIndex ? { ...img, fields: updatedFields } : img
    );

    setImages(updatedImages);

    if (image._id) {
      await updateImageMeta(propertyId, image._id, {
        type: image.type,
        fields: updatedFields,
      });
    }
  }

  // ---------------- BULK LAYOUT FIELDS ----------------
  // Download a sheet with one row per image (prefilled with saved values),
  // fill it in Excel, upload it back — every matched image is saved at once.

  function downloadLayoutSheet() {
    const rows = images.map((img) => {
      const row = { "Image ID": img._id || "", "File Name": originalName(img.src), Type: img.type || "" };
      pdfFieldOptions.forEach((key) => {
        row[key] = (img.fields || []).find((f) => f.key === key)?.value || "";
      });
      return row;
    });

    const ws = XLSX.utils.json_to_sheet(rows, { header: ["Image ID", "File Name", "Type", ...pdfFieldOptions] });
    ws["!cols"] = [{ wch: 26 }, { wch: 36 }, { wch: 12 }, ...pdfFieldOptions.map(() => ({ wch: 18 }))];
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Layouts");
    XLSX.writeFile(wb, `layouts-${propertyData.projectname || propertyId || "project"}.xlsx`);
  }

  async function uploadLayoutSheet(e) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    setLoading(true);
    setBulkResult(null);
    try {
      const wb = XLSX.read(await file.arrayBuffer());
      const ws = wb.Sheets[wb.SheetNames[0]];
      // raw:false keeps everything as text (Projectdetail expects string values)
      const rawRows = XLSX.utils.sheet_to_json(ws, { defval: "", raw: false });

      const fieldByHeader = Object.fromEntries(pdfFieldOptions.map((k) => [normHeader(k), k]));
      const rows = rawRows.map((r) => {
        const row = { fields: {} };
        Object.entries(r).forEach(([h, v]) => {
          const n = normHeader(h);
          const val = String(v ?? "").trim();
          if (n === "imageid") row.id = val;
          else if (n === "filename") row.name = val.toLowerCase();
          else if (n === "type") row.type = val;
          else if (fieldByHeader[n]) row.fields[fieldByHeader[n]] = val;
        });
        return row;
      });

      const updated = [...images];
      const unmatched = [];
      const failed = [];
      let saved = 0;

      for (const [i, row] of rows.entries()) {
        if (!row.id && !row.name) continue; // blank line

        const idx = row.id
          ? updated.findIndex((img) => img._id === row.id)
          : updated.findIndex((img) => originalName(img.src).toLowerCase() === row.name);
        if (idx === -1) {
          unmatched.push(`Row ${i + 2}: ${row.id || row.name}`);
          continue;
        }

        const img = updated[idx];
        const hasValues = Object.values(row.fields).some(Boolean);
        if (!hasValues && !row.type) continue; // nothing to change for this image

        // sheet columns replace their keys (blank cell clears it); other keys are kept
        const fields = [
          ...(img.fields || [])
            .filter((f) => f.key && !(f.key in row.fields))
            .map((f) => ({ key: f.key, value: f.value })),
          ...Object.entries(row.fields)
            .filter(([, v]) => v)
            .map(([key, value]) => ({ key, value })),
        ];
        const type = row.type || (hasValues ? "layout" : img.type);

        try {
          if (img._id) await updateImageMeta(propertyId, img._id, { type, fields });
          updated[idx] = { ...img, type, fields };
          saved++;
        } catch (err) {
          console.log(err);
          failed.push(`Row ${i + 2}: ${row.id || row.name}`);
        }
      }

      setImages(updated);
      setBulkResult({ saved, unmatched, failed });
    } catch (err) {
      console.log(err);
      setBulkResult({ saved: 0, unmatched: [], failed: [], error: "Could not read the file. Upload the .xlsx/.csv sheet downloaded above." });
    } finally {
      setLoading(false);
    }
  }

  // ---------------- UI ----------------

  return (
    
    <>
    {loading && (
  <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-50 flex items-center justify-center">
    
    <div className="bg-white px-6 py-4 rounded-xl shadow-lg flex flex-col items-center gap-3">
      
      {/* Spinner */}
      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

      {/* Text */}
      <p className="text-sm font-medium text-gray-700">
        Uploading... Please wait ⏳
      </p>

    </div>
  </div>
)}
      <h3 className="text-xl font-medium">Add one Video of Property</h3>

      <Uploadfile
        ref={videoInputRef}
        handleupload={videoUp}
        accept="video/*"
        multiple
      />

      {videoFile.map((file, index) => (
        <div key={index} className="relative inline-block mr-3">
          <video
            src={file.src || URL.createObjectURL(file)}
            controls
            className="w-48 h-32 rounded"
          />

          <button
            type="button"
            onClick={() => removeVideo(index)}
            className="absolute top-1 right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full"
          >
            ✕
          </button>
        </div>
      ))}

      {/* ---------------- IMAGE SECTION ---------------- */}

      <p className="text-xl font-medium mt-5">
        Add photos or PDFs of your Property
      </p>

      <Uploadphots
        ref={imageInputRef}
        handleuploadphoto={imageUp}
        accept="image/*,application/pdf"
        multiple
      />

      {propertyData.purpose === "Project" && images.length > 0 && (
        <div className="mt-4 mb-3 border rounded-lg p-3 bg-blue-50">
          <p className="text-sm font-medium">Bulk layout details</p>
          <p className="text-xs text-gray-600 mt-1">
            Download the sheet, fill Floor_Plan, Price, super_build_area and carpet_area for each layout image,
            then upload it. Keep the Image ID column — rows without it are matched by file name.
          </p>
          <div className="flex gap-2 mt-2">
            <button
              type="button"
              onClick={downloadLayoutSheet}
              className="text-xs border border-blue-500 text-blue-600 rounded px-3 py-1 bg-white"
            >
              Download sheet
            </button>
            <button
              type="button"
              onClick={() => layoutSheetRef.current?.click()}
              className="text-xs bg-blue-500 text-white rounded px-3 py-1"
            >
              Upload filled sheet
            </button>
            <input
              ref={layoutSheetRef}
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={uploadLayoutSheet}
              className="hidden"
            />
          </div>

          {bulkResult && (
            <div className="text-xs mt-2 space-y-1">
              {bulkResult.error ? (
                <p className="text-red-600">{bulkResult.error}</p>
              ) : (
                <p className="text-green-700">Saved layout details for {bulkResult.saved} image(s).</p>
              )}
              {bulkResult.unmatched.length > 0 && (
                <p className="text-orange-600">No matching image for: {bulkResult.unmatched.join(", ")}</p>
              )}
              {bulkResult.failed.length > 0 && (
                <p className="text-red-600">Failed to save: {bulkResult.failed.join(", ")}</p>
              )}
            </div>
          )}
        </div>
      )}

      {images.map((img, idx) => (

        <div key={idx} className="relative border rounded-lg p-2 bg-gray-50">

          <button
            type="button"
            onClick={() => removeImage(idx)}
            className="absolute top-1 right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full"
          >
            ✕
          </button>

          {/* preview */}

          {img.file ? (
            img.file.type.startsWith("image/") ? (
              <img
                src={URL.createObjectURL(img.file)}
                className="w-full h-32 object-cover rounded"
              />
            ) : (
              <p className="text-xs text-red-500">📄 {img.file.name}</p>
            )
          ) : (
            <img src={img.src} className="w-full h-32 object-cover rounded" />
          )}

          <p className="text-xs text-gray-600 mt-1 truncate">
            {img.file?.name || img.src?.split("/").pop()}
          </p>

          {/* TYPE */}

          <select
            value={img.type || ""}
            onChange={(e) => handleTypeChange(idx, e.target.value)}
            className="mt-2 w-full text-xs border rounded p-1"
          >
            <option value="">Select Type</option>
            <option value="layout">Layout</option>
            <option value="Photos">Photos</option>
            <option value="Construction Status">Construction</option>
            <option value="cover">Cover</option>
            <option value="banner">Banner</option>
            <option value="pdf">PDF</option>
            <option value="brouser">Brochure</option>
          </select>

          {/* PDF FIELDS */}

          {propertyData.purpose === "Project" && (
            <div className="mt-2 space-y-2">

              {(img.fields || []).map((field, fieldIdx) => (

                <div key={fieldIdx} className="flex gap-2">

                  <select
                    value={field.key}
                    onChange={(e) =>
                      handlePdfFieldChange(
                        idx,
                        fieldIdx,
                        "key",
                        e.target.value
                      )
                    }
                    className="border text-xs p-1 w-1/2 rounded"
                  >
                    <option value="">Select Key</option>

                    {pdfFieldOptions.map((opt, i) => (
                      <option key={i} value={opt}>
                        {opt}
                      </option>
                    ))}

                  </select>

                  <input
                    type="text"
                    value={field.value}
                    onChange={(e) =>
                      handlePdfFieldChange(
                        idx,
                        fieldIdx,
                        "value",
                        e.target.value
                      )
                    }
                    className="border text-xs p-1 w-1/2 rounded"
                  />

                </div>
              ))}

              <button
                type="button"
                onClick={() => addPdfField(idx)}
                className="text-blue-500 text-xs"
              >
                + Add Field
              </button>

            </div>
          )}
        </div>
      ))}
    </>
  );
};