import { createContext, useContext, useEffect, useState } from "react";

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState("Noida");

  useEffect(() => {
    const savedLocation = localStorage.getItem("userLocation");
    updateLocation(savedLocation || "Noida"); // Set default location if none is saved
    if (savedLocation) {
      setLocation(savedLocation);
    }
  }, []);

  const updateLocation = (newLocation) => {
    setLocation(newLocation);
    localStorage.setItem("userLocation", newLocation);
  };

  return (
    <LocationContext.Provider
      value={{
        location,
        updateLocation,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocationContext = () => {
  return useContext(LocationContext);
};