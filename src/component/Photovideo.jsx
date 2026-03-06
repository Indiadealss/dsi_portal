import React, { useEffect, useRef, useState } from "react";
import { Uploadfile } from "./Uploadfile";
import { Uploadphots } from "./Uploadphots";
import { useDispatch, useSelector } from "react-redux";
import { updateField } from "./Redux/propertySlice";
import { updateImageMeta, uploadImage, uploadVideo } from "../api/api";

export const Photovideo = ({ propertyId }) => {

  const propertyData = useSelector((state) => state.property.data);

  const [videoFile, setVideoFile] = useState(propertyData.video || []);
  const [images, setImages] = useState(propertyData.images || []);

  const dispatch = useDispatch();

  const videoInputRef = useRef(null);
  const imageInputRef = useRef(null);

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

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const removeVideo = (index) => {
    setVideoFile((prev) => prev.filter((_, i) => i !== index));
  };

  // ---------------- VIDEO UPLOAD ----------------

  async function videoUp(e) {
    const files = Array.from(e.target.files);

    setVideoFile((prev) => [...prev, ...files]);

    for (let file of files) {
      const formData = new FormData();
      formData.append("video", file);
      await uploadVideo(propertyId, formData);
    }

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

  // ---------------- UI ----------------

  return (
    <>
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