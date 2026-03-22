import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  step: 0,
  propertyId: null,   // ✅ store created draft id
  isEditMode:false,
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
    updateFields: (state, action) => {
  const isObject = (obj) =>
    obj && typeof obj === "object" && !Array.isArray(obj);

  const mergeDeep = (target, source) => {
    for (const key in source) {
      const sourceValue = source[key];
      const targetValue = target[key];

      if (isObject(sourceValue)) {
        // 🔥 FIX: ensure target is object
        target[key] = mergeDeep(
          isObject(targetValue) ? targetValue : {},
          sourceValue
        );
      } else {
        target[key] = sourceValue;
      }
    }
    return target;
  };

  state.data = mergeDeep({ ...state.data }, action.payload);
},

    setPropertyId: (state, action) => {
      state.propertyId = action.payload;
    },

    setEditMode: (state, action) => {
  state.isEditMode = action.payload;
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

    setPropertyData: (state, action) => {
  state.data = action.payload; // 🔥 full replace (NO merge)
},

    resetForm: () => initialState,

    resetProperty: (state) => {
  state.data = initialState.data;
},
  },
});

export const {
  updateField,
  updateFields,
  setEditMode,
  nextStep,
  prevStep,
  setError,
  resetForm,
  setPropertyId,
  resetProperty,
  setPropertyData
} = propertySlice.actions;

export default propertySlice.reducer;