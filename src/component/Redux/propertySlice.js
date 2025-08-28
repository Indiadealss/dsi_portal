import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ Async thunk for API posting
export const submitProperty = createAsyncThunk(
  "property/submitProperty", // changed from "from/submitProperty"
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:5000/property", formData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const initialState = {
  step: 0,
  data: {
    ttitle: "",
    purpose: "",
    propertyType: "",
    location: "",
    status: "",
    bathroom: "",
    otherrooms: "",
    furnishing: "",
    balconies: "",
    floor: "",
    price: "",
    deposit: "",
    size: "",
    area: "",
    amenities: [],
    higlights: [],
    coveredparking: "",
    uncoveredparking: "",
    description: "",
    images: [],
    video: "",
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
        state.isSubmitting = true;
        state.success = null;
        state.errors = {};
      })
      .addCase(submitProperty.fulfilled, (state, action) => { // ✅ fixed spelling
        state.isSubmitting = false;
        state.success = action.payload.message || "Property submitted successfully!";
      })
      .addCase(submitProperty.rejected, (state, action) => {
        state.isSubmitting = false;
        state.errors = action.payload || { general: "Something went wrong" };
      });
  },
});

export const { updateField, nextStep, prevStep, setError, resetForm } =
  propertySlice.actions;

export default propertySlice.reducer;
