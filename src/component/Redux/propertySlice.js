import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { submitProperty } from "../../api/api";

// ✅ Async thunk for API posting




const initialState = {
  step: 0,
  data: {
    purpose: "",
    property: "",
    propertyType:"",
    commercialType:"",
    location: [],
    apartment_name:"",
    bathroom: "",
    bedroom:"",
    balconies: "",
    superbuilduparea:"",
    plotarea: "",
    buildarea:"",
    carpetarea:"",
    totalfloor:0,
    floor: 0,
    availabestatus: "",
    Possession:'',
    propertyage:'',
    ownership:"",
    coveredparking: "",
    uncoveredparking: "",
    description: "",
    images: [],
    video: [],
    faqanswer: [],
    otherrooms: [],
    furnishing: "",
    propertyfacing:"",
    pobackup:'',
    amenitie:[],
    propertyfeature:[],
    Buldingfeature:[],
    addFeature:[],
    watersource:[],
    overlo:[],
    locatadvance:[],
    road_width:'',
    price: "",
    flooring:"",
    deposit: "",
    size: "",
    higlights: [],
    owner_type:'',
    owner:'',
    currentProjectPdf:''
  },
  errors: {},
  isSubmitting: false,
  success: null,
};

const propertySlice = createSlice({
  name: "property",
  initialState,
  reducers: {
    updateField: (state, action) => {
      state.data = { ...state.data, ...action.payload };
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
  extraReducers: (builder) => {
    builder
      .addCase(submitProperty.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(submitProperty.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.data = action.payload; // update with server response
      })
      .addCase(submitProperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to submit";
      });
  },
});

export const { updateField, nextStep, prevStep, setError, resetForm } =
  propertySlice.actions;

export default propertySlice.reducer;
