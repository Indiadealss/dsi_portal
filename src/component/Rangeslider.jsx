import React, { useState } from 'react';

export const Rangeslider = () => {
  const MIN = 1000;
  const MAX = 100000;

  const [minValue, setMinValue] = useState(10000);
  const [maxValue, setMaxValue] = useState(80000);

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), maxValue - 1000);
    setMinValue(value);
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), minValue + 1000);
    setMaxValue(value);
  };

  // Calculate % for progress bar positioning
  const getPercent = (value) => ((value - MIN) / (MAX - MIN)) * 100;

  const progressStyle = {
    left: `${getPercent(minValue)}%`,
    width: `${getPercent(maxValue) - getPercent(minValue)}%`,
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="relative h-6">
        {/* Min Slider */}
        <input
          type="range"
          min={MIN}
          max={MAX}
          value={minValue}
          onChange={handleMinChange}
          className="absolute top-2 left-0 w-full h-2 bg-transparent appearance-none pointer-events-auto z-20"
        />

        {/* Max Slider */}
        <input
          type="range"
          min={MIN}
          max={MAX}
          value={maxValue}
          onChange={handleMaxChange}
          className="absolute top-2 left-0 w-full h-2 bg-transparent appearance-none pointer-events-auto z-20"
        />

        {/* Track */}
        <div className="absolute top-1/2 transform -translate-y-1/2 w-full h-2 bg-gray-200 rounded"></div>

        {/* Progress Bar */}
        <div
          className="absolute top-1/2 transform -translate-y-1/2 h-2 bg-blue-500 rounded z-10"
          style={progressStyle}
        ></div>
      </div>

      {/* Budget Display or Dropdowns */}
      <div className="flex justify-between mt-6">
        <div>
          <select
            value={minValue}
            onChange={(e) => setMinValue(Number(e.target.value))}
            className="block py-2 px-4 border border-gray-300 rounded"
          >
            <option value={1000}>₹1,000</option>
            <option value={10000}>₹10,000</option>
            <option value={25000}>₹25,000</option>
            <option value={50000}>₹50,000</option>
            <option value={75000}>₹75,000</option>
          </select>
        </div>
        <div>
          <select
            value={maxValue}
            onChange={(e) => setMaxValue(Number(e.target.value))}
            className="block py-2 px-4 border border-gray-300 rounded"
          >
            <option value={25000}>₹25,000</option>
            <option value={50000}>₹50,000</option>
            <option value={75000}>₹75,000</option>
            <option value={100000}>₹1,00,000</option>
          </select>
        </div>
      </div>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Selected Budget: ₹{minValue.toLocaleString()} - ₹{maxValue.toLocaleString()}
        </p>
      </div>
    </div>
  );
};
