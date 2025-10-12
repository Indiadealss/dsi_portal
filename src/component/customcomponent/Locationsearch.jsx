// src/components/CityRestrictedLocationSearch.jsx
import React, { useState, useRef } from "react";
import { LoadScript, StandaloneSearchBox } from "@react-google-maps/api";

const libraries = ["places"];

export default function Locationsearch({ cityName, onSelect }) {
  const [placesList, setPlacesList] = useState([]);
  const searchBoxRef = useRef(null);

  const handlePlacesChanged = () => {
    const places = searchBoxRef.current.getPlaces();
    if (!places || places.length === 0) return;

    // Filter results: accept only places inside the specified city
    const cityPlaces = places.filter((place) => {
      const components = place.address_components || [];
      const cityComponent = components.find((c) => c.types.includes("locality"));
      return cityComponent && cityComponent.long_name.toLowerCase() === cityName.toLowerCase();
    });

    setPlacesList(cityPlaces);

    if (cityPlaces.length > 0) {
      onSelect && onSelect(cityPlaces[0]);
    } else {
        onSelect && onSelect(cityPlaces[0]);
    }
  };

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyDWULr4OlxjUlSpoTR8_haquhxRJx0ynEo"
      libraries={libraries}
    >
      <StandaloneSearchBox
        onLoad={(ref) => (searchBoxRef.current = ref)}
        onPlacesChanged={handlePlacesChanged}
        options={{
          componentRestrictions: { country: "IN" }, // Restrict to India
          types: ["geocode"], // Addresses and locations
        }}
      >
        <input
          type="text"
          placeholder={`Search location in ${cityName}...`}
          style={{
            height: "40px",
            padding: "0 12px",
            fontSize: "16px",
            marginBottom: "10px",
          }}
           className="w-[30vw] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
            focus:ring-blue-500 focus:border-blue-500 block p-2.5"
        />
      </StandaloneSearchBox>

      <ul>
        {placesList.map((place, index) => (
          <li key={index} onClick={() => onSelect(place)}>
            {place.formatted_address || place.name}
          </li>
        ))}
      </ul>
    </LoadScript>
  );
}
