// FloorSelector.jsx
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateField } from "../Redux/propertySlice";

/**
 * FloorSelector props:
 * - maxPreset (number) default number of floors to generate (e.g. 50)
 * - onChange(value) called with selected value (string or number or "unknown")
 */
export default function FloorSelector({ maxPreset = 50, onChange }) {
  const [mode, setMode] = useState("select"); // "select" or "manual" or "other"
  const [value, setValue] = useState(""); // actual returned value
  const [yourfloor,setYourFloor] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    
    dispatch(updateField({floor:yourfloor}))
  },[yourfloor])

  // Build options: basements, ground, 1..maxPreset
  const presets = [
    "B2",
    "B1",
    "G", // ground
    ...Array.from({ length: maxPreset }, (_, i) => String(i + 1)),
  ];

  useEffect(() => {
    if (onChange) onChange(value);
  }, [value, onChange]);

  function handleSelect(e) {
    const v = e.target.value;
   setYourFloor(v);
  }



  return (
    <div className="space-y-2 max-w-xs">
      <label htmlFor="floor-select" className="block text-sm font-medium text-gray-700">
        Floor
      </label>

      <select
        id="floor-select"
        value={yourfloor} 
        onChange={handleSelect}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-300"
      >
        <option >Select floor</option>

        {presets.map((p) => (
          <option key={p} value={p}>
            {p === "G" ? "Ground (G)" : p}
          </option>
        ))}

        {/* <option value="other">Other (type)</option>
        <option value="unknown">I don't know</option> */}
      </select>

      
    </div>
  );
}
