import React, { useState } from 'react';
import { createFeature, createLocalAdvantages } from '../../api/api';

const Addsomething = () => {
  const [activeTab, setActiveTab] = useState("feature");
  
  // Feature State
  const [featureName, setFeatureName] = useState("");
  const [featureIcon, setFeatureIcon] = useState(null);

  // Advantage State
  const [advName, setAdvName] = useState("");
  const [advIcon, setAdvIcon] = useState(null);

  const [anName,setAnName] = useState("");
  const [anIcon,setAnIcon] = useState(null);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFeatureSubmit = async (e) => {
    e.preventDefault();

    if (!featureName || !featureIcon) {
      setMessage("❌ Please provide both name and icon.");
      return;
    }

    const formData = new FormData();
    formData.append("name", featureName);
    formData.append("icon", featureIcon);

    try {
      setLoading(true);
      await createFeature(formData);
      setMessage("✅ Feature added successfully!");
      setFeatureName("");
      setFeatureIcon(null);
      e.target.reset();
    } catch {
      setMessage("❌ Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleAdvantageSubmit = async (e) => {
    e.preventDefault();

    if (!advName || !advIcon) {
      setMessage("❌ Please provide both name and icon.");
      return;
    }

    const formData = new FormData();
    formData.append("name", advName);
    formData.append("icon", advIcon);

    try {
      setLoading(true);
      await createLocalAdvantages(formData);
      setMessage("✅ Advantage added successfully!");
      setAdvName("");
      setAdvIcon(null);
      e.target.reset();
    } catch {
      setMessage("❌ Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreaAnimities = async (e) => {
    e.preventDefault();

    if (!anName || !anIcon) {
      setMessage("❌ Please provide both name and icon.");
      return;
    }

    const formData = new FormData();
    formData.append("name", anName);
    formData.append("icon", anIcon);

    try {
      setLoading(true);
      await createLocalAdvantages(formData);
      setMessage("✅ Animities added successfully!");
      setAdvName("");
      setAdvIcon(null);
      e.target.reset();
    } catch {
      setMessage("❌ Something went wrong.");
    } finally {
      setLoading(false);
    }
  
  }

  return (
    <div className='w-[30%] shadow-md mx-auto my-10 p-4'>
      <div className='flex justify-center gap-4 mb-5'>
        <button 
          onClick={() => setActiveTab("feature")}
          className={`px-4 py-2 rounded text-white ${activeTab === "feature" ? "bg-blue-600" : "bg-gray-400"}`}
        >
          Feature
        </button>

        <button 
          onClick={() => setActiveTab("advantage")}
          className={`px-4 py-2 rounded text-white ${activeTab === "advantage" ? "bg-blue-600" : "bg-gray-400"}`}
        >
          Advantage
        </button>
        <button 
          onClick={() => setActiveTab("animities")}
          className={`px-4 py-2 rounded text-white ${activeTab === "animities" ? "bg-blue-600" : "bg-gray-400"}`}
        >
          Animities
        </button>
      </div>

      {message && <p className='text-center text-blue-600 text-sm'>{message}</p>}

      {activeTab === "feature" && (
        <form onSubmit={handleFeatureSubmit} className='flex flex-col'>
          <input 
            type="text" 
            placeholder="Feature name"
            className="border p-2 rounded mx-auto w-[80%] my-3"
            value={featureName}
            onChange={(e) => setFeatureName(e.target.value)}
          />

          <input
            type="file"
            accept="image/*"
            className="w-[80%] mx-auto border p-2 rounded text-gray-500"
            onChange={(e) => setFeatureIcon(e.target.files[0])}
          />

          <button 
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white w-[80%] mx-auto mt-4 rounded py-2 disabled:bg-gray-400"
          >
            {loading ? "Uploading..." : "Add Feature"}
          </button>
        </form>
      )}

      {activeTab === "advantage" && (
        <form onSubmit={handleAdvantageSubmit} className='flex flex-col'>
          <input 
            type="text" 
            placeholder="Advantage name"
            className="border p-2 rounded mx-auto w-[80%] my-3"
            value={advName}
            onChange={(e) => setAdvName(e.target.value)}
          />

          <input
            type="file"
            accept="image/*"
            className="w-[80%] mx-auto border p-2 rounded text-gray-500"
            onChange={(e) => setAdvIcon(e.target.files[0])}
          />

          <button 
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white w-[80%] mx-auto mt-4 rounded py-2 disabled:bg-gray-400"
          >
            {loading ? "Uploading..." : "Add Advantage"}
          </button>
        </form>
      )}

      {activeTab === "animities" && (
        <form onSubmit={handleCreaAnimities} className='flex flex-col'>
          <input 
            type="text" 
            placeholder="Animities name"
            className="border p-2 rounded mx-auto w-[80%] my-3"
            value={anName}
            onChange={(e) => setAnName(e.target.value)}
          />

          <input
            type="file"
            accept="image/*"
            className="w-[80%] mx-auto border p-2 rounded text-gray-500"
            onChange={(e) => setAnIcon(e.target.files[0])}
          />

          <button 
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white w-[80%] mx-auto mt-4 rounded py-2 disabled:bg-gray-400"
          >
            {loading ? "Uploading..." : "Add Animities"}
          </button>
        </form>
      )}
    </div>
  );
};

export default Addsomething;
