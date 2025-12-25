import React, { useEffect, useRef, useState } from 'react';
import { Uploadfile } from './Uploadfile';
import { Uploadphots } from './Uploadphots';
import { useDispatch, useSelector } from 'react-redux';
import { updateField } from './Redux/propertySlice';

export const Photovideo = () => {
  const [videoFile, setVideoFile] = useState([]);
  const [images, setImages] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateField({ images, video: videoFile }));
  }, [videoFile, images]);

  const videoInputRef = useRef(null);
  const imageInputRef = useRef(null);


  const pdfFieldOptions = [
    "Floor_Plan",
    "Price",
    "super_build_area",
    "carpet_area"
  ];


  // ❌ Remove image / pdf
  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  // ❌ Remove video
  const removeVideo = (index) => {
    setVideoFile(prev => prev.filter((_, i) => i !== index));
  };



  // Handle video upload
  function videoUp(e) {
    const videoFile = Array.from(e.target.files);
    setVideoFile((prev) => [...prev, ...videoFile]);

    // ✅ RESET INPUT
    e.target.value = "";
  }

  const propertyDataFirst = useSelector((state) => state.property.data);


  // Handle multiple image/pdf upload
  function imageUp(e) {
    const files = Array.from(e.target.files).map((file) => ({
      file,
      type: file.type === 'application/pdf' ? 'pdf' : '',
      Fields: propertyDataFirst.purpose === 'Project' ? [{ key: '', value: '' }] : [],
    }));
    setImages((prev) => [...prev, ...files]);

    // ✅ RESET INPUT
    e.target.value = "";
  }

  function handleTypeChange(index, newType) {
    setImages((prev) =>
      prev.map((img, i) =>
        i === index ? { ...img, type: newType } : img
      )
    );
  }

  // Add new key-value field for PDF
  function addPdfField(index) {
    setImages((prev) =>
      prev.map((img, i) =>
        i === index
          ? { ...img, Fields: [...img.Fields, { key: '', value: '' }] }
          : img
      )
    );
  }

  // Update specific key/value in PDF
  function handlePdfFieldChange(imgIndex, fieldIndex, name, newValue) {
    setImages((prev) =>
      prev.map((img, i) => {
        if (i !== imgIndex) return img;
        const updatedPdfFields = img.Fields.map((field, j) =>
          j === fieldIndex ? { ...field, [name]: newValue } : field
        );
        return { ...img, Fields: updatedPdfFields };
      })
    );
  }

  return (
    <>
      <h3 className="text-xl font-medium">Add one Video of Property</h3>
      <p className="text-sm font-medium text-gray-400 my-3">
        A video is worth a thousand picture with video get higher page views.
      </p>

      <label className="font-medium my-3">Upload Video</label>
      <Uploadfile ref={videoInputRef} handleupload={videoUp} accept="video/*" multiple />

      {videoFile.map((file, index) => (
        <div key={index} className="relative inline-block mr-3">
          <video
            src={URL.createObjectURL(file)}
            controls
            className="w-48 h-32 rounded"
          />

          {/* FILE NAME */}
          <p className="text-xs text-gray-600 mt-1 truncate">
            🎥 {file.name}
          </p>


          {/* DELETE ICON */}
          <button
            type="button"
            onClick={() => removeVideo(index)}
            className="absolute top-1 right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full"
          >
            ✕
          </button>
        </div>
      ))}


      {/* Photos Section */}
      <p className="text-xl font-medium mt-5">
        Add photos or PDFs of your Property
      </p>

      <div className="mt-5">
        <label className="font-medium">Upload Photos / PDFs</label>
        <Uploadphots
          ref={imageInputRef}
          handleuploadphoto={imageUp}
          accept="image/*,application/pdf"
          multiple
        />

        {/* Show image/pdf previews */}
        {images.map((img, idx) => (
          <div key={idx} className="relative border rounded-lg p-2 bg-gray-50">

            {/* DELETE ICON */}
            <button
              type="button"
              onClick={() => removeImage(idx)}
              className="absolute top-1 right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full"
            >
              ✕
            </button>

            {/* IMAGE / PDF PREVIEW */}
            {img.file.type.startsWith('image/') ? (
              <img
                src={URL.createObjectURL(img.file)}
                alt={img.file.name}
                className="w-full h-32 object-cover rounded"
              />
            ) : (
              <p className="text-xs text-red-500">
                📄 PDF File: {img.file.name}
              </p>
            )}

            {/* FILE NAME */}
            <p className="text-xs text-gray-600 mt-1 truncate">
              {img.file.name}
            </p>

            {/* TYPE SELECT */}
            <select
              value={img.type}
              onChange={(e) => handleTypeChange(idx, e.target.value)}
              className="mt-2 w-full text-xs border border-gray-300 rounded p-1"
            >
              <option value="">Select Type</option>
              <option value="layout">Layout Image</option>
              <option value="Photos">Photos</option>
              <option value="Construction Status">Construction Status</option>
              <option value="cover">Cover Image</option>
              <option value="banner">Banner Image</option>
              <option value="pdf">PDF File</option>
              <option value="brouser">Brochure</option>
            </select>

            {/* PDF FIELDS */}
            <div className={propertyDataFirst.purpose === 'Project' ? "mt-2 space-y-2" : 'hidden'}>
              {img.Fields.map((field, fieldIdx) => (
                <div key={fieldIdx} className="flex gap-2">
                  <select
                    value={field.key}
                    onChange={(e) =>
                      handlePdfFieldChange(idx, fieldIdx, 'key', e.target.value)
                    }
                    className="border text-xs p-1 w-1/2 rounded bg-white"
                  >
                    <option value="">Select Key</option>
                    {pdfFieldOptions.map((option, i) => (
                      <option key={i} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>

                  <input
                    type="text"
                    value={field.value}
                    onChange={(e) =>
                      handlePdfFieldChange(idx, fieldIdx, 'value', e.target.value)
                    }
                    placeholder="Value"
                    className="border text-xs p-1 w-1/2 rounded"
                  />
                </div>
              ))}

              <button
                type="button"
                onClick={() => addPdfField(idx)}
                className="text-blue-500 text-xs mt-1 cursor-pointer"
              >
                + Add Field
              </button>
            </div>
          </div>
        ))}

      </div>
    </>
  );
};
