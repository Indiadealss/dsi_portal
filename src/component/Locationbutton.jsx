import React, { useEffect, useState } from "react";
import { updateField } from "./Redux/propertySlice";
import { useDispatch } from "react-redux";
import { getSearch } from "../api/api";

export const Locationbutton = ({ setValidator }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [locality, setLocality] = useState("");
  const [localityResults, setLocalityResults] = useState([]);
  const [showLocality, setShowLocality] = useState(false);
  const [showAdditional,setShowAdditional] = useState(false);
  const [projectname,setProjectname] = useState('');
  const dispatch = useDispatch();
  const [apartment,setApartment] = useState('')
  const [detailData,setDetailData] = useState('');

  useEffect(() => {
    dispatch(updateField({ location: [{"City":query,"Address":locality,"apartment_name":apartment}] }));
  },[query,locality,apartment])

  // Generic search handler
  const fetchLocations = async (value, setData) => {
    if (value.length > 2) {
      // try {
      //   const res = await fetch(
      //     `https://nominatim.openstreetmap.org/search?format=json&q=${value}&addressdetails=1&limit=5&countrycodes=in`
      //   );
      //   const data = await res.json();
      //   console.log(data);
        
      //   setData(data);
      // } catch (error) {
      //   console.log("Error fetching location:", error);
      // }
       try{
            getSearch(value)
                  .then(res => {
                    if (res.status === 200) {
                      // console.log(res.data.usedetails);
                      console.log(res.data);
                      const data = res.data.data;
                      console.log(data);
                      
                     setData(res.data.data);     
                     setDetailData(res.data)    
                    }
                  })
                  .catch(err => {
                    console.error(err);
                  });
          }catch(err){
            console.error("Logout failed",err);
            
          }
    } else {
      setData([]);
    }
  };

  const fetchLocation = async (value, setData) => {
    if (value.length > 2) {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${value}&addressdetails=1&limit=5&countrycodes=in`
        );
        const data = await res.json();
        setData(data);
      } catch (error) {
        console.log("Error fetching location:", error);
      }
    } else {
      setData([]);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    fetchLocations(value, setResults);
  };

  const handleSearchLocation = (e) => {
    const value = e.target.value;
    setLocality(value);
    fetchLocation(value, setLocalityResults);
  };

  const handleSelect = (place) => {
    // if (place.address.village || place.address.city || place.address.town) {
    //   setQuery(
    //     place.address.village ||
    //       place.address.city ||
    //       place.address.town ||
    //       place.display_name
    //   );
    // }
    setQuery(place.city)
    setResults([]);
    setShowLocality(true);
  };

  const handleSelects = (place) => {
  setLocality(place.display_name);  // ✅ full location
  setLocalityResults([]);
  setShowAdditional(true);
};


  useEffect(() => {
    if (setValidator) {
      setValidator(validateForm);
    }
  }, [locality,apartment]);

  function validateForm() {
    if (!locality) {
      alert("Enter your city name");
      return false;
    }
    if(!apartment){
      alert("Enter the Apartment name");
      return false;
    }
    return true;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-medium mb-5">
        Where is your property located?
      </h2>

      {/* City */}
      <label
        htmlFor="city"
        className="block mb-2 text-sm font-medium text-gray-900 "
      >
        City
      </label>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        id="city"
        className="w-[30vw] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
        focus:ring-blue-500 focus:border-blue-500 block p-2.5 
          
         "
        placeholder="Enter City"
        required
      />
      {results.length > 0 && (
        <ul className="border border-gray-200 mt-2 rounded-lg shadow-md bg-white max-h-48 overflow-y-auto">
          {results.map((item) => (
            <li
              key={item.place_id}
              onClick={() => handleSelect(item)}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {item.city}
            </li>
          ))}
        </ul>
      )}

      {/* Locality */}
      {showLocality && (
        <>
          <label
            htmlFor="locality"
            className="block my-5 text-sm font-medium text-gray-900 "
          >
            Locality
          </label>
          <input
            type="text"
            value={locality}
            onChange={handleSearchLocation}
            id="locality"
            className="w-[30vw] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
            focus:ring-blue-500 focus:border-blue-500 block p-2.5 
              
             "
            placeholder="Enter Locality"
            required
          />
          {localityResults.length > 0 && (
            <ul className="border border-gray-200 mt-2 rounded-lg shadow-md bg-white max-h-48 overflow-y-auto">
              {localityResults.map((item) => (
                <li
                  key={item.place_id}
                  onClick={() => handleSelects(item)}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {item.display_name}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
      {/* Locality */}
      {showAdditional && (
        <>
        <label
            htmlFor="locality"
            className="block my-5 text-sm font-medium text-gray-900 "
          >
            Project Name <span className="font-light text-sm text-gray-400">(Optional)</span>
          </label>
      <input type="text" 
       id="House_No"
       value={projectname}
       onChange={(e) => setProjectname(e.target.value)}
      placeholder="Enter the Project name"
      className="w-[30vw] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
            focus:ring-blue-500 focus:border-blue-500 block p-2.5 
              
             " />

            <label
            htmlFor="locality"
            className="block my-5 text-sm font-medium text-gray-900 "
          >
            Apartment/Socity
          </label>
      <input type="text" 
       id="House_No"
       value={apartment}
       onChange={(e) => setApartment(e.target.value)}
      placeholder="Enter the Project name"
      className="w-[30vw] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
            focus:ring-blue-500 focus:border-blue-500 block p-2.5 
              
             " />
        
        <label
            htmlFor="locality"
            className="block my-5 text-sm font-medium text-gray-900 "
          >
            House No <span className="font-light text-sm text-gray-400">(Optional)</span>
          </label>
      <input type="text" 
       id="House_No"
      placeholder="House No(optional)"
      className="w-[30vw] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
            focus:ring-blue-500 focus:border-blue-500 block p-2.5 
              
             " />
      </>
      )}
    </div>
  );
};
