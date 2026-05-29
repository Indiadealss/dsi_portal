import React, { useState } from "react";
import { useLocationContext } from "./LocationContext";
import { searchaddress } from "../api/api";

const LocationModel = ({ open, onClose }) => {
  const { updateLocation } = useLocationContext();

  const [search, setSearch] = useState("");
  const [locations, setLocations] = useState([]);

  if (!open) return null;

  const getLocation = async (value) => {
    if (value.length >= 2) {
      try {
        const res = await searchaddress(value);

        if (res.status === 200) {
          console.log(res.data);

          setLocations(res.data.results || []);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      setLocations([]);
    }
  };

  const handleSelect = (item) => {

    console.log(item, 'item city is where');
    
    updateLocation(item.city);
    setSearch('');
    setLocations([]);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[999]">
      <div className="bg-white w-[90%] md:w-[400px] rounded-xl p-5">

        <h2 className="text-xl font-semibold mb-4">
          Select Location
        </h2>

        <input
          type="text"
          placeholder="Search City..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            getLocation(e.target.value);
          }}
          className="w-full border p-2 rounded mb-4"
        />

        <div className="max-h-[300px] overflow-y-auto">

          {locations.length > 0 ? (
            locations.map((item) => (
              <div
                key={item.place_id}
                onClick={() => handleSelect(item)}
                className="p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-400"
              >
                <p className="font-medium">
                  {item.city}
                </p>

                
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-sm text-center py-4">
              Search location...
            </p>
          )}

        </div>

        <button
          onClick={onClose}
          className="mt-4 w-full bg-gray-200 py-2 rounded cursor-pointer"
        >
          Close
        </button>

      </div>
    </div>
  );
};

export default LocationModel;