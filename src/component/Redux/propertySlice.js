import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  step: 0,
  propertyId: null,   // ✅ store created draft id
  data: {
    purpose: "",
    property: "",
    propertyType: "",
    commercialType: "",
    location: [],
    apartment_name: "",
    bathroom: "",
    bedroom: "",
    balconies: "",
    superbuilduparea: "",
    plotarea: "",
    buildarea: "",
    carpetarea: "",
    totalfloor: 0,
    floor: 0,
    availabestatus: "",
    Possession: "",
    propertyage: "",
    ownership: "",
    coveredparking: "",
    uncoveredparking: "",
    description: "",
    faq: [],
    otherrooms: [],
    furnishing: "",
    propertyfacing: "",
    pobackup: "",
    amenitie: [],
    propertyfeature: [],
    Buldingfeature: [],
    addFeature: [],
    watersource: [],
    overlo: [],
    locatadvance: [],
    road_width: "",
    price: "",
    flooring: "",
    deposit: "",
    size: "",
    higlights: [],
    owner_type: "",
    owner: "",
    currentProjectPdf: ""
  },
  errors: {},
};

const propertySlice = createSlice({
  name: "property",
  initialState,
  reducers: {
    updateField: (state, action) => {
      state.data = { ...state.data, ...action.payload };
    },

    setPropertyId: (state, action) => {
      state.propertyId = action.payload;
    },

    nextStep: (state) => {
      state.step += 1;
    },

    prevStep: (state) => {
      state.step -= 1;
    },

    setError: (state, action) => {
      state.errors = action.payload;
    },

    resetForm: () => initialState,
  },
});

export const {
  updateField,
  nextStep,
  prevStep,
  setError,
  resetForm,
  setPropertyId
} = propertySlice.actions;

export default propertySlice.reducer;