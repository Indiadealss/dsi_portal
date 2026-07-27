import React, { useEffect, useState } from 'react'
import { lead } from '../../api/api';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Editprofileproject = () => {


    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
const [properties, setProperties] = useState([]);
const [selectedType, setSelectedType] = useState("project");
const [selectedItem, setSelectedItem] = useState(null);
const [selectedId, setSelectedId] = useState("");
const [selectedName, setSelectedName] = useState("");
const [selectedCity, setSelectedCity] = useState("");
    const [stats, setStats] = useState({
  newProjects: 0,
  expiringSoon: 0,
  recentlyExpired: 0,
  enquiry: 0
});




  



 const user = useSelector((state) => state.user);


 const handleTypeChange = (type) => {
  setSelectedType(type);
  setSelectedItem(null);
};
 

useEffect(() => {
      lead(user.id)
      .then(res => {
        if (res.status === 200) {
          // console.log(res.data,'res.datas');
         const data = res.data.data;

         const propertyList = data[0] || [];
        const enquiryList = data[1] || [];

        setProjects(propertyList.filter(p => p.npxid));
        setProperties(propertyList.filter(p => p.spid));

          setStats({
  newProjects: propertyList.filter(p => p.npxid).length,
  properties: propertyList.filter(p => p.spid).length,
  expiringSoon: 0,
  recentlyExpired: 0,
  enquiry: enquiryList.length
});

console.log("propertyList", propertyList);
console.log("projects", propertyList.filter(p => p.npxid));
console.log("properties", propertyList.filter(p => p.spid));
        }
      })
      .catch(err => {
        console.error(err);
      });
  
},[user.id])
if (!projects.length && !properties.length) {
  return <div>Loading...</div>;
}

const list = selectedType === "project" ? projects : properties;
const filteredList = list.filter(item => {
  return (
    (!selectedId || item._id === selectedId) &&
    (!selectedName || getApartmentName(item) === selectedName) &&
    (!selectedCity || getCity(item.location) === selectedCity)
  );
});

    const parseLocation = (location) => {
  try {
    if (typeof location === "string") {
      return JSON.parse(location);
    }
    if (Array.isArray(location)) {
      return location[0] || {};
    }
    return {};
  } catch {
    return {};
  }
};

const getCity = (location) => {
  const loc = parseLocation(location);
  return loc.City || "No City";
};

const getApartmentName = (item) => {
  const loc = parseLocation(item.location);
  return (
    item.projectname ||
    loc.apartment_name ||
    item.apartment_name ||
    "Untitled"
  );
};

const getCoverImage = (images = []) => {
  const cover = images.find(img => img.type === "cover");
  return cover?.src || images[0]?.src || "";
};
  return (
    <div className='h-[50vw] mx-3'>
      
   <div className="mt-6 flex gap-4">
  <button
    onClick={() => handleTypeChange("project")}
    className={`px-4 py-2 rounded ${selectedType === "project" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
  >
    Projects
  </button>

  <button
    onClick={() => handleTypeChange("property")}
    className={`px-4 py-2 rounded ${selectedType === "property" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
  >
    Properties
  </button>
</div>
<div className='flex justify-between'>
<select
  className="shadow-md mx-3 py-2 rounded w-full mt-6"
  value={selectedId}
  onChange={(e) => {
    const id = e.target.value;
    setSelectedId(id);

    const selected = list.find(item => item._id === id);
    setSelectedItem(selected); // 🔥 sync here
  }}
>
  <option value="">Select ID</option>
  {list.map(item => (
    <option key={item._id} value={item._id}>
      {item._id}
    </option>
  ))}
</select>

<select
  className="mt-6 shadow-md mx-3 py-2 rounded w-full"
  value={selectedItem?._id || ""}
  onChange={(e) => {
    const selected = list.find(item => item._id === e.target.value);

    setSelectedItem(selected);
    setSelectedId(selected?._id || ""); // 🔥 sync back
  }}
>
  <option value="">Select {selectedType}</option>

  {list.map((item) => (
    <option key={item._id} value={item._id}>
      {item.title || item.projectname || item.name || "Untitled"}
    </option>
  ))}
</select>





</div>

{selectedItem && (
  <div className="my-10 mx-auto p-4 shadow rounded max-w-md">

    {/* IMAGE CONTAINER */}
    <div className="relative">

      {/* IMAGE */}
      <img
        src={getCoverImage(selectedItem.images)}
        alt="cover"
        className="w-full h-48 object-cover rounded"
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/300x200?text=No+Image";
        }}
      />

      {/* ✏️ EDIT ICON */}
      <button
        onClick={() => navigate(`/edit-property/${selectedItem._id}`)}
        className="absolute top-2 right-2 bg-white p-2 rounded-full shadow hover:bg-gray-100 cursor-pointer"
      >
        ✏️
      </button>
    </div>

    {/* DETAILS */}
    <h2 className="text-xl font-semibold mt-3">
      {selectedItem.title || selectedItem.projectname || selectedItem.name}
    </h2>

    <p className="text-gray-500">
      {getCity(selectedItem.location)}
    </p>
  </div>
)}
    </div>
  )
}

export default Editprofileproject
