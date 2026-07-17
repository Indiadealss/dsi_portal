import React, { useState, useRef } from "react";
import axios from "axios";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default function CreateBlog() {
  const [blogName, setBlogName] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");

  const [thumbnail, setThumbnail] = useState(null);
  const [cover, setCover] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);

  const [links, setLinks] = useState([
  {
    word: "",
    href: "",
    title: "",
  },
]);

  const thumbnailInputRef = useRef(null);
  const coverInputRef = useRef(null);

  const categories = ["News", "Guides", "Market Updates", "Tips & Tricks"];

  const handleLinkChange = (index, field, value) => {
  const updated = [...links];
  updated[index][field] = value;
  setLinks(updated);
};

const addLink = () => {
  setLinks([
    ...links,
    {
      word: "",
      href: "",
      title: "",
    },
  ]);
};

const removeLink = (index) => {
  setLinks(links.filter((_, i) => i !== index));
};

  const handleFileSelect = (file, type) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    if (type === "thumbnail") {
      setThumbnail(file);
      setThumbnailPreview(url);
    } else {
      setCover(file);
      setCoverPreview(url);
    }
  };

  const handleDrop = (e, type) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    handleFileSelect(file, type);
  };

  const handlePublish = async () => {
    try {
      const formData = new FormData();
      formData.append("blogName", blogName);
      formData.append("slug", slug);
      formData.append("category", category);
      formData.append("description", description);
      formData.append("content", content);
      formData.append("links", JSON.stringify(links));
      if (thumbnail) formData.append("thumbnail", thumbnail);
      if (cover) formData.append("cover", cover);

      const res = await axios.post("/api/blogs", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if(res.status === '200'){
        setBlogName("");
        setSlug("");
        setCategory("");
        setDescription("");
        setContent("");
      }

      console.log("Blog published:", res.data);
    } catch (err) {
      console.error("Error publishing blog:", err);
    }
  };

  const UploadBox = ({ label, preview, inputRef, type }) => (
    <div className="flex-1">
      <p className="text-sm font-semibold text-gray-800 mb-2">{label}</p>
      <div
        onClick={() => inputRef.current.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => handleDrop(e, type)}
        className="border border-dashed border-gray-300 rounded-lg bg-gray-50 flex flex-col items-center justify-center text-center py-10 px-4 cursor-pointer"
      >
        {preview ? (
          <img
            src={preview}
            alt={label}
            className="max-h-32 object-contain rounded"
          />
        ) : (
          <>
            <svg
              className="w-9 h-9 text-blue-500 mb-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.5 15a4.5 4.5 0 01-.276-8.987A6 6 0 0118.75 9.75a3.75 3.75 0 01-.375 7.5H7.5z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 12v6m0-6l-2.25 2.25M12 12l2.25 2.25"
              />
            </svg>
            <p className="text-sm font-semibold text-gray-800">
              Upload Photos
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Drag &amp; Drop Files here
            </p>
            <p className="text-sm text-gray-500">
              or{" "}
              <span className="text-blue-600 font-medium">Browse</span>
            </p>
            <p className="text-xs text-gray-400 mt-2">
              JPG, PNG, Webp allowed MAX size 10 MB per Image
            </p>
          </>
        )}
        <input
          ref={inputRef}
          type="file"
          accept=".jpg,.jpeg,.png,.webp"
          className="hidden"
          onChange={(e) => handleFileSelect(e.target.files?.[0], type)}
        />
      </div>
    </div>
  );

  return (
    <div className=" p-8 bg-white">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">Create New Blog</h1>
          <p className="text-base text-gray-500 mt-1">
            Create the blog and the users know what was trending
          </p>
        </div>
        <button
          type="button"
          className="h-11 w-[120px] border border-gray-300 rounded-lg flex items-center justify-center gap-2 text-gray-800 text-sm font-medium hover:bg-gray-50"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16"
            />
          </svg>
          Preview
        </button>
      </div>

      {/* Blog Details Card */}
      <div className="border border-gray-200 rounded-[10px] p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-5">
          Blog Details
        </h2>

        {/* Broker Name */}
        <div className="mb-5">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Blog Name
          </label>
          <input
            type="text"
            value={blogName}
            onChange={(e) => setBlogName(e.target.value)}
            placeholder="Enter blog title here...."
            className="w-full h-12 border border-gray-300 rounded-lg px-4 text-sm text-gray-900 placeholder-gray-400 focus:outline-none "
          />
        </div>

        {/* Slug & Category */}
        <div className="grid grid-cols-2 gap-5 mb-2">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Slug
            </label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="Enter blog title here...."
              className="w-full h-12 border border-gray-300 rounded-lg px-4 text-sm text-gray-900 placeholder-gray-400 focus:outline-none  "
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full h-12 border border-gray-300 rounded-lg px-4 text-sm text-gray-900 focus:outline-none   appearance-none bg-white"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%239CA3AF' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 16px center",
                backgroundSize: "16px",
              }}
            >
              <option value="" disabled>
                Select Category
              </option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-5">
          Your blog will be live at :{" "}
          <span className="text-blue-600">
            yourwebsite.com/blog/{slug || "blog-slug"}
          </span>
        </p>

        {/* Short Description */}
        <div className="mb-5">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Short description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter short description"
            className="w-full h-[90px] border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-900 placeholder-gray-400 resize-none focus:outline-none  "
          />
        </div>

        {/* Multiple links form */}

        {/* Internal Links */}
<div className="mb-6">
  <div className="flex items-center justify-between mb-3">
    <label className="text-sm font-semibold text-gray-700">
      Internal Links
    </label>

    <button
      type="button"
      onClick={addLink}
      className="px-3 py-2 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700"
    >
      + Add Link
    </button>
  </div>

  {links.map((item, index) => (
    <div
      key={index}
      className="grid grid-cols-12 gap-3 border border-gray-300 rounded-lg p-4 mb-3"
    >
      <div className="col-span-3">
        <label className="text-xs text-gray-600">Keyword</label>
        <input
          type="text"
          value={item.word}
          onChange={(e) =>
            handleLinkChange(index, "word", e.target.value)
          }
          placeholder="Irish Platinum"
          className="w-full border border-gray-300 rounded-lg px-3 py-2"
        />
      </div>

      <div className="col-span-5">
        <label className="text-xs text-gray-600">URL</label>
        <input
          type="text"
          value={item.href}
          onChange={(e) =>
            handleLinkChange(index, "href", e.target.value)
          }
          placeholder="/irish-platinum-greater-noida..."
          className="w-full border border-gray-300 rounded-lg px-3 py-2"
        />
      </div>

      <div className="col-span-3">
        <label className="text-xs text-gray-600">Title</label>
        <input
          type="text"
          value={item.title}
          onChange={(e) =>
            handleLinkChange(index, "title", e.target.value)
          }
          placeholder="Irish Platinum"
          className="w-full border border-gray-300 rounded-lg px-3 py-2"
        />
      </div>

      <div className="col-span-1 flex items-end">
        <button
          type="button"
          onClick={() => removeLink(index)}
          className="w-full rounded-lg bg-red-500 text-white py-2 hover:bg-red-600"
        >
          ✕
        </button>
      </div>
    </div>
  ))}
</div>

        {/* Content / Rich Text Editor */}
        <CKEditor
  editor={ClassicEditor}
  data={content}
  config={{
    toolbar: [
      "heading",
      "|",
      "bold",
      "italic",
      "underline",
      "|",
      "bulletedList",
      "numberedList",
      "|",
      "link",
      "insertTable",
      "blockQuote",
      "|",
      "undo",
      "redo",
    ],
  }}
  onChange={(event, editor) => {
    setContent(editor.getData());
  }}
/>
      </div>

      {/* Image Upload Card */}
      <div className="border border-gray-200 rounded-[10px] p-6 mb-6">
        <div className="flex gap-5">
          <UploadBox
            label="Thumbnail Image"
            preview={thumbnailPreview}
            inputRef={thumbnailInputRef}
            type="thumbnail"
          />
          <UploadBox
            label="Cover Image"
            preview={coverPreview}
            inputRef={coverInputRef}
            type="cover"
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={handlePublish}
          className="h-12 w-[110px] bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-md"
        >
          Publish
        </button>
      </div>
    </div>
  );
}