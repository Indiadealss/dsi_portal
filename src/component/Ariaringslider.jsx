import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateFilter } from './Redux/filterSlice';

export const Ariaringslider = ({ MIN, MAX, filterKey }) => {

  const dispatch = useDispatch();

  // READ from Redux (source of truth)
  const selectedFilters = useSelector(state => state.filterSlice.selectedFilters);

  const [minValue, setMinValue] = useState(MIN);
  const [maxValue, setMaxValue] = useState(MAX);

  // Sync slider with Redux when Redux changes
  useEffect(() => {
    if (selectedFilters && selectedFilters[filterKey]) {
      const [min, max] = selectedFilters[filterKey];
      setMinValue(min);
      setMaxValue(max);
    }
  }, [selectedFilters, filterKey]);

  // Update Redux on slider change
  const updateRedux = (newMin, newMax) => {
    dispatch(updateFilter({
      AriaringSlider: {
        ...selectedFilters,
        [filterKey]: [newMin, newMax]
      }
    }));
  };

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), maxValue - 1000);
    setMinValue(value);
    updateRedux(value, maxValue);
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), minValue + 1000);
    setMaxValue(value);
    updateRedux(minValue, value);
  };

  const getPercent = (value) => ((value - MIN) / (MAX - MIN)) * 100;

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="relative h-6">

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

        <div className="absolute top-1/2 -translate-y-1/2 w-full h-2 bg-gray-200"></div>

        <div
          className="absolute top-1/2 -translate-y-1/2 h-2 bg-blue-500 z-10"
          style={{
            left: `${getPercent(minValue)}%`,
            width: `${getPercent(maxValue) - getPercent(minValue)}%`
          }}
        ></div>
      </div>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Selected Budget: ₹{minValue.toLocaleString()} - ₹{maxValue.toLocaleString()}
        </p>
      </div>
    </div>
  );
};
