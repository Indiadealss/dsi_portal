import React, { useState } from 'react';
import { createadditionalfeature, createAminities, createFeature, createLocalAdvantages, createoverlookingfeature, createpropertyfeature, createroom } from '../../api/api';

const Addsomething = () => {
  const [activeTab, setActiveTab] = useState("feature");


  const activetabFunction = (e) => {
    console.log(e.currentTarget.name);
    setAnName('');
    setAnIcon('');
    setActiveTab(e.currentTarget.name);
  }
  
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

    // console.log(formData);

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

  const handleCreateAmenities = async (e) => {
  e.preventDefault();

  if (!anName || !anIcon) {
    setMessage("❌ Please provide both name and icon.");
    return;
  }

  const formData = new FormData();
  formData.append("name", anName);
  formData.append("label", anName);
  formData.append("icon", anIcon);

  console.log(anIcon);
  

  try {
    setLoading(true);
    await createAminities(formData);
    setMessage("✅ Amenities added successfully!");
    setAnName("");
    setAnIcon(null);
    e.target.reset();
  } catch (error) {
    console.error(error);
    setMessage("❌ Something went wrong.");
  } finally {
    setLoading(false);
  }
};

const handleCreateotherroom = async (e) => {
  e.preventDefault();

  if (!anName || !anIcon) {
    setMessage("❌ Please provide both name and icon.");
    return;
  }

  const formData = new FormData();
  formData.append("name", anName);
  formData.append("label", anName);
  formData.append("icon", anIcon);

  console.log(anIcon);
  

  try {
    setLoading(true);
    await createroom(formData);
    setMessage("✅ Other Room added successfully!");
    setAnName("");
    setAnIcon(null);
    e.target.reset();
  } catch (error) {
    console.error(error);
    setMessage("❌ Something went wrong.");
  } finally {
    setLoading(false);
  }
};


const handleCreatepropertyFeature = async (e) => {
  e.preventDefault();

  if (!anName || !anIcon) {
    setMessage("❌ Please provide both name and icon.");
    return;
  }

  const formData = new FormData();
  formData.append("name", anName);
  formData.append("label", anName);
  formData.append("icon", anIcon);

  console.log(anIcon);
  

  try {
    setLoading(true);
    await createpropertyfeature(formData);
    setMessage("✅ Property feature added successfully!");
    setAnName("");
    setAnIcon(null);
    e.target.reset();
  } catch (error) {
    console.error(error);
    setMessage("❌ Something went wrong.");
  } finally {
    setLoading(false);
  }
};

const handleCreateadditionalFeature = async (e) => {
  e.preventDefault();

  if (!anName || !anIcon) {
    setMessage("❌ Please provide both name and icon.");
    return;
  }

  const formData = new FormData();
  formData.append("name", anName);
  formData.append("label", anName);
  formData.append("icon", anIcon);

  console.log(anIcon);
  

  try {
    setLoading(true);
    await createadditionalfeature(formData);
    setMessage("✅ Additional feature added successfully!");
    setAnName("");
    setAnIcon(null);
    e.target.reset();
  } catch (error) {
    console.error(error);
    setMessage("❌ Something went wrong.");
  } finally {
    setLoading(false);
  }
};

const handleCreateoverlookingfeature = async (e) => {
  e.preventDefault();

  if (!anName || !anIcon) {
    setMessage("❌ Please provide both name and icon.");
    return;
  }

  const formData = new FormData();
  formData.append("name", anName);
  formData.append("label", anName);
  formData.append("icon", anIcon);

  console.log(anIcon);
  

  try {
    setLoading(true);
    await createoverlookingfeature(formData);
    setMessage("✅ Overlooking feature added successfully!");
    setAnName("");
    setAnIcon(null);
    e.target.reset();
  } catch (error) {
    console.error(error);
    setMessage("❌ Something went wrong.");
  } finally {
    setLoading(false);
  }
};

  return (

    <div>
      <div className='shadow m-5 p-5 rounded'>
      <div className='flex justify-center gap-4 mb-5'>
        <button 
          onClick={activetabFunction}
          name='feature'
          className={`px-4 py-2 rounded text-white ${activeTab === "feature" ? "bg-blue-600 cursor-pointer" : "bg-gray-400 cursor-pointer"}`}
        >
          Feature
        </button>

        <button
          onClick={() => setActiveTab("advantage")}
          className={`px-4 py-2 rounded text-white ${activeTab === "advantage" ? "bg-blue-600 cursor-pointer" : "bg-gray-400 cursor-pointer"}`}
        >
          Advantage
        </button>
        <button 
          onClick={() => setActiveTab("animities")}
          className={`px-4 py-2 rounded text-white ${activeTab === "animities" ? "bg-blue-600 cursor-pointer" : "bg-gray-400 cursor-pointer"}`}
        >
          Animities
        </button>

         <button 
         onClick={activetabFunction}
         name='otherroom'
          className={`px-4 py-2 rounded text-white ${activeTab === "otherroom" ? "bg-blue-600 cursor-pointer" : "bg-gray-400 cursor-pointer"}`}
        >
          Other Room
        </button>

        <button 
         onClick={activetabFunction}
         name='propertyFeature'
          className={`px-4 py-2 rounded text-white ${activeTab === "propertyFeature" ? "bg-blue-600 cursor-pointer" : "bg-gray-400 cursor-pointer"}`}
        >
          Property Feature
        </button>

        <button 
         onClick={activetabFunction}
         name='additionalFeature'
          className={`px-4 py-2 rounded text-white ${activeTab === "additionalFeature" ? "bg-blue-600 cursor-pointer" : "bg-gray-400 cursor-pointer"}`}
        >
          Additional Feature
        </button>

         <button 
         onClick={activetabFunction}
         name='overlookingfeature'
          className={`px-4 py-2 rounded text-white ${activeTab === "overlookingfeature" ? "bg-blue-600 cursor-pointer" : "bg-gray-400 cursor-pointer"}`}
        >
          Overlooking Feature
        </button>
      </div>
      </div>

    <div className='w-[30%] shadow-md mx-auto my-10 p-4'>
      

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
            className="bg-blue-500 text-white w-[80%] mx-auto mt-4 rounded py-2 disabled:bg-gray-400 cursor-pointer"
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
            className="bg-blue-500 text-white w-[80%] mx-auto mt-4 rounded py-2 disabled:bg-gray-400 cursor-pointer"
          >
            {loading ? "Uploading..." : "Add Advantage"}
          </button>
        </form>
      )}

      {activeTab === "animities" && (
        <form onSubmit={handleCreateAmenities} className='flex flex-col'>
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
            className="bg-blue-500 text-white w-[80%] mx-auto mt-4 rounded py-2 disabled:bg-gray-400 cursor-pointer"
          >
            {loading ? "Uploading..." : "Add Animities"}
          </button>
        </form>
      )}

      {activeTab === "otherroom" && (
        <form onSubmit={handleCreateotherroom} className='flex flex-col'>
          <input 
            type="text" 
            placeholder="otherroom name"
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
            className="bg-blue-500 text-white w-[80%] mx-auto mt-4 rounded py-2 disabled:bg-gray-400 cursor-pointer"
          >
            {loading ? "Uploading..." : "Add otherroom"}
          </button>
        </form>
      )}

      {activeTab === "propertyFeature" && (
        <form onSubmit={handleCreatepropertyFeature} className='flex flex-col'>
          <input 
            type="text" 
            placeholder="Property Feature name"
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
            className="bg-blue-500 text-white w-[80%] mx-auto mt-4 rounded py-2 disabled:bg-gray-400 cursor-pointer"
          >
            {loading ? "Uploading..." : "Add otherroom"}
          </button>
        </form>
      )}

      {activeTab === "additionalFeature" && (
        <form onSubmit={handleCreateadditionalFeature} className='flex flex-col'>
          <input 
            type="text" 
            placeholder="Additional Feature name"
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
            className="bg-blue-500 text-white w-[80%] mx-auto mt-4 rounded py-2 disabled:bg-gray-400 cursor-pointer"
          >
            {loading ? "Uploading..." : "Add otherroom"}
          </button>
        </form>
      )}

      {activeTab === "overlookingfeature" && (
        <form onSubmit={handleCreateoverlookingfeature} className='flex flex-col'>
          <input 
            type="text" 
            placeholder="Overlooking Feature name"
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
            className="bg-blue-500 text-white w-[80%] mx-auto mt-4 rounded py-2 disabled:bg-gray-400 cursor-pointer"
          >
            {loading ? "Uploading..." : "Add otherroom"}
          </button>
        </form>
      )}
    </div>
    </div>
  );
};

export default Addsomething;
