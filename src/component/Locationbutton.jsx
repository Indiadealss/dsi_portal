import React, { useEffect, useState } from "react";
import { updateField } from "./Redux/propertySlice";
import { useDispatch, useSelector } from "react-redux";
import { getSearch, searchaddress } from "../api/api";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { MdAddLocationAlt } from "react-icons/md";

export const Locationbutton = ({ setValidator }) => {


   const propertyData = useSelector((state) => state.property.data);
   const isForedit = useSelector((state) => state.property.isEditMode);
  const [query, setQuery] = useState(propertyData.location?.[0]?.City || "");
  const [results, setResults] = useState([]);
  const [locality, setLocality] = useState(propertyData.location?.[0]?.Address || "");
  const [localityResults, setLocalityResults] = useState([]);
  const [showLocality, setShowLocality] = useState(false);
  const [showAdditional,setShowAdditional] = useState(false);
  const [projectname,setProjectname] = useState(propertyData.projectname || '');
  const dispatch = useDispatch();
  const [apartment,setApartment] = useState('');
  const [detailData,setDetailData] = useState('');
  const [loadingLocation, setLoadingLocation] = useState(false);

  

  const getFullLocation = (location) => {
  try {
    if (!location) return {};

    if (typeof location === "string") {
      return JSON.parse(location);
    }

    if (Array.isArray(location)) {
      return location[0] || {};
    }

    if (typeof location === "object") {
      return location;
    }

    return {};
  } catch {
    return {};
  }
};

  useEffect(() => {
    dispatch(updateField({ location: [{"City":query,"Address":locality,"apartment_name":apartment}],projectname:projectname,apartment_name:apartment }));
  },[query,locality,apartment,projectname])

  

//   useEffect(() => {
//   if (propertyData) {
//     const loc = getFullLocation(propertyData.location);
//     console.log(loc,'locki');
    

// setQuery(loc.City || "");
// setLocality(loc.Address || "");
// setApartment(loc.apartment_name || "");
//   }
// }, [propertyData]);


useEffect(() => {
  if (!locality) return;

  let isMounted = true;

  const fetchData = async () => {
    try {
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${locality}&key=AIzaSyDWULr4OlxjUlSpoTR8_haquhxRJx0ynEo`
      );

      const data = await res.json();
      if (!isMounted) return;

      console.log(data,'lat lng data');
      

      const { lat, lng } = data.results[0].geometry.location;

      console.log("Coordinates:", lat, lng);

      // ---- FIX: Use PlacesService instead of fetch ----
      const service = new window.google.maps.places.PlacesService(
        document.createElement("div")
      );

      service.nearbySearch(
        {
          location: { lat, lng },
          radius: 1000,
          type:'road'
        },
        (results, status) => {
          if (status === "OK") {
            // // console.log("Nearby", results[2].name);

            for (let index = 0; index < results.length; index++) {
              const element = results[index].name
              // console.log(element);
              
              
            }
            const nearest = results[0];
            const distanceService = new window.google.maps.DistanceMatrixService();

distanceService.getDistanceMatrix(
  {
    origins: [{ lat, lng }], // property location
    destinations: [nearest.geometry.location], // selected place location
    travelMode: "DRIVING"
  },
  (response, status) => {
    if (status === "OK") {
      const distanceText = response.rows[0].elements[0].distance.text;
      const durationText = response.rows[0].elements[0].duration.text;

      // console.log("Distance:", distanceText); // e.g. "2.3 km"
      // console.log("Travel time:", durationText); // e.g. "10 mins"
    } else {
      // console.log("Distance calculation error:", status);
    }
  }
);
          } else {
            // console.log("Places Error:", status);
          }
        }
      );


      


    } catch (error) {
      console.error(error);
    }
  };

  fetchData();
  return () => (isMounted = false);
}, [locality]);



  // Generic search handler
  const fetchLocations = async (value, setData) => {
    if (value.length > 2) {
      try {
        const res = await getSearch(value);
        console.log(res, 'city search response');
        if (res.status === 200) {
          console.log(res.data, 'city data');
          const cityData = res.data.data || res.data;
          console.log(cityData, 'processed city data');
          setData(Array.isArray(cityData) ? cityData : []);
          setDetailData(res.data);
        }
      } catch (err) {
        console.error('Error fetching cities:', err);
        setData([]);
      }
    } else {
      setData([]);
    }
  };

  const fetchLocation = async (value, setData) => {
    if (value.length > 2) {
      try {
        const res = await searchaddress(value, query);
        if (res.status === 200) {
          console.log(res, 'res.data.results');
          setData(res.data.results);
        }
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

  const handlePickCurrentLocation = () => {
    setLoadingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyDWULr4OlxjUlSpoTR8_haquhxRJx0ynEo`
            );
            const data = await response.json();
            if (data.results && data.results.length > 0) {
              let city = "";
              // Extract city from address components
              const addressComponents = data.results[0].address_components;
              for (let component of addressComponents) {
                if (component.types.includes("locality")) {
                  city = component.long_name;
                  break;
                } else if (component.types.includes("administrative_area_level_2")) {
                  city = component.long_name;
                }
              }
              if (city) {
                setQuery(city);
                setResults([]);
                setShowLocality(true);
                setLoadingLocation(false);
              }
            }
          } catch (error) {
            console.error("Error reverse geocoding:", error);
            setLoadingLocation(false);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Unable to access your location. Please enable location permissions.");
          setLoadingLocation(false);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
      setLoadingLocation(false);
    }
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
  setLocality(`${place.name}, ${place.address}`);  // ✅ full location
  setLocalityResults([]);
  setShowAdditional(true);
};

  const propertyFirstData = useSelector((state) => state.property.data);

  useEffect(() => {
    if (setValidator) {
      setValidator(validateForm);
    }
  }, [locality,apartment,projectname]);

  function validateForm() {
    if (!locality) {
      alert("Enter your city name");
      return false;
    }
    if(propertyFirstData.purpose !== 'Project' &&  !apartment && !projectname){
      alert("Enter the Apartment name or project name");
      return false;
    }
    if(propertyFirstData.purpose === 'Project' && !projectname){
      alert("Enter the Project Name")
      // console.log(propertyFirstData.purpose === 'Project',!projectname);
      
      return false;
    }
   
    return true;
  }

  return (
    <div className="p-4">
      <style>{`
        .scroll-suggestion {
          scrollbar-width: thin;
          scrollbar-color: rgba(59, 130, 246, 0.4) transparent;
        }
        .scroll-suggestion::-webkit-scrollbar {
          width: 4px;
        }
        .scroll-suggestion::-webkit-scrollbar-button:increment,
        .scroll-suggestion::-webkit-scrollbar-button:decrement {
          height: 0;
          background: transparent;
        }
        .scroll-suggestion::-webkit-scrollbar-track {
          background: transparent;
        }
        .scroll-suggestion::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.3);
          border-radius: 10px;
          transition: all 0.3s ease;
        }
        .scroll-suggestion:hover::-webkit-scrollbar {
          width: 8px;
        }
        .scroll-suggestion:hover::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #3b82f6, #2563eb);
          width: 8px;
        }
        .scroll-suggestion:hover::-webkit-scrollbar-track {
          background: #f1f5f9;
        }
      `}</style>
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
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          id="city"
          className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
          focus:ring-blue-500 focus:border-blue-500 block p-2.5 pr-12
            
           "
          placeholder="Enter City"
          autoComplete="off"
          required
        />
        <button
          type="button"
          onClick={handlePickCurrentLocation}
          disabled={loadingLocation}
          title="Pick current location"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500 hover:text-blue-700 disabled:text-gray-400 transition text-lg"
        >
          {loadingLocation ? "⏳" : <FaLocationCrosshairs className="cursor-pointer" />}
        </button>
      </div>
      {results.length > 0 && (
        <ul className="border border-gray-200 mt-2 rounded-lg shadow-md bg-white max-h-48 overflow-y-auto scroll-suggestion">
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
      {(showLocality || isForedit) && (
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
            autoComplete="off"
            required
          />
          {localityResults.length > 0 && (
            <ul className="border border-gray-200 mt-2 rounded-t-lg shadow-md bg-white max-h-48 overflow-y-auto scroll-suggestion">
              {localityResults.map((item) => (
                <li
                  key={item.place_id}
                  onClick={() => handleSelects(item)}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {item.name},{item.address}
                </li>
              ))}
             
            </ul>
            
          )}
           
                {locality.length > 2 && (
            <button
              type="button"
              onClick={() => {
                setShowAdditional(true);
              }}
              className=" px-4 w-full py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm cursor-pointer rounded-b-lg"
            >
              < MdAddLocationAlt className="inline mr-2 text-lg text-purple-900" /> Can't find your location? Continue manually
            </button>
          )}
              
          
        </>
      )}
      {/* Locality */}
      {(showAdditional || isForedit) && (
        <>
        <label
            htmlFor="locality"
            className="block my-5 text-sm font-medium text-gray-900 "
          >
            Project Name <span className={`${propertyFirstData.purpose === 'Project' ? 'hidden' : "font-light text-sm text-gray-400"}`}>(Optional)</span>
          </label>
      <input type="text" 
       id="House_No"
       value={projectname}
       onChange={(e) => setProjectname(e.target.value)}
      placeholder="Enter the Project name"
      className="w-[30vw] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
            focus:ring-blue-500 focus:border-blue-500 block p-2.5 "
            autoComplete="off"
            />

            <label
            htmlFor="locality"
            className={`${propertyFirstData.purpose === 'Project' ? 'hidden': "block my-5 text-sm font-medium text-gray-900 "}`}
          >
            Apartment/Socity
          </label>
      <input type="text" 
       id="House_No"
       value={apartment}
       onChange={(e) => setApartment(e.target.value)}
      placeholder="Enter the Project name"
      className={`${propertyFirstData.purpose === 'Project' ? 'hidden' : "w-[30vw] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"}`} />
        
        <label
            htmlFor="locality"
            className={`${propertyFirstData.purpose === 'Project' ? 'hidden': "block my-5 text-sm font-medium text-gray-900 "}`}
          >
            House No <span className="font-light text-sm text-gray-400">(Optional)</span>
          </label>
      <input type="text" 
       id="House_No"
      placeholder="House No(optional)"
      className={`${propertyFirstData.purpose === 'Project' ? 'hidden' : "w-[30vw] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 "}`}
      />
      </>
      )}
    </div>
  );
};
