import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  features: [],
  amenities: [],
  otherroom:[],
  propertyfeature:[],
  additionalfeature:[],
  overlooking:[],
};

const featureSlice = createSlice({
  name: "feature",
  initialState,
  reducers: {
    updateFeatures: (state, action) => {
      state.features = action.payload;
    },
    updateAmenities: (state, action) => {
      state.amenities = action.payload;
    },
    updateotheroom: (state, action) => {
      state.otherroom = action.payload;
    },
    updatepropertyfeature: (state,action) => {
      state.propertyfeature = action.payload;
    },
    updateadditionalfeature: (state,action) => {
      state.additionalfeature = action.payload;
    },
    updateoverlookingfeature:(state,action) => {
      state.overlooking = action.payload;
    },
    clearFeatures: () => initialState,
  },
});

export const {
  updateFeatures,
  updateAmenities,
  updateotheroom,
  updatepropertyfeature,
  updateadditionalfeature,
  updateoverlookingfeature,
  clearFeatures,
} = featureSlice.actions;

export default featureSlice.reducer;
