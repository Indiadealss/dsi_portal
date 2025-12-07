import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  location:'All India',
  purpose:'sell',
  budget:'',
  selectedFilters:{},
  AriaringSlider:{},
  MINPRICE:0,
  MAXPRICE:10000000,
  propertyType:[],
  projectname:'',
  hideAlreadySeen: false,
  budget: "",
  noOfBedroom: 0,
  typeOfProperty: [],
  availableFor: [],
  postedBy: [],
  furnishingStatus: [],
  localities: [],
  newProject: [],
  amenities: [],
  propertiesWithPhotos: false,
  areaStart: 0,
  areaEnd: 0,
  verifiedProperties: false,
  ageOfProperty: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    updateFilter: (state, action) => {
      // Merge new values with existing filter
      return { ...state, ...action.payload };
    },
    clearFilter: () => initialState,
  },
});

export const { updateFilter, clearFilter } = filterSlice.actions;
export default filterSlice.reducer;
