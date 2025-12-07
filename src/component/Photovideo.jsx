import React, { useEffect, useState } from 'react';
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

  // Handle video upload
  function videoUp(e) {
    const videoFile = Array.from(e.target.files);
    setVideoFile((prev) => [...prev, ...videoFile]);
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
      <Uploadfile handleupload={videoUp} accept="video/*" multiple />

      {videoFile.map((file, index) => (
        <video
          key={index}
          src={URL.createObjectURL(file)}
          controls
          className="w-48 h-32 rounded my-2"
        />
      ))}

      {/* Photos Section */}
      <p className="text-xl font-medium mt-5">
        Add photos or PDFs of your Property
      </p>

      <div className="mt-5">
        <label className="font-medium">Upload Photos / PDFs</label>
        <Uploadphots
          handleuploadphoto={imageUp}
          accept="image/*,application/pdf"
          multiple
        />

        {/* Show image/pdf previews */}
        {images.length > 0 && (
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
            {images.map((img, idx) => (
              <div key={idx} className="border rounded-lg p-2 bg-gray-50">
                {/* Show image or pdf name */}
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

                {/* For PDF type only → show dynamic key-value inputs */}
                
                  <div className="mt-2 space-y-2">
                    {img.Fields.map((field, fieldIdx) => (
                      <div key={fieldIdx} className="flex gap-2">
                        <input
                          type="text"
                          value={field.key}
                          onChange={(e) =>
                            handlePdfFieldChange(idx, fieldIdx, 'key', e.target.value)
                          }
                          placeholder="Key"
                          className="border text-xs p-1 w-1/2 rounded"
                        />
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
                      className="text-blue-500 text-xs mt-1"
                    >
                      + Add Field
                    </button>
                  </div>
                
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
