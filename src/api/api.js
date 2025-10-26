import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const API = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});


// Auth APIs
export const sentOtp = (mobile) =>
  API.post("/auth/send-otp", { mobile });


export const verifyOtp = (mobile, otp) =>
  API.post("/auth/verify-otp", { mobile, otp });


export const register = (name, email, mobile) =>
  API.post("/auth/register", { name, email, mobile })

export const getUserDetatils = () => {
  return axios.get("/api/auth/me",
    {
      withCredentials: true,
      headers: { "Cache-Control": "no-cache" }
    }
  )
}

export const getLogout = async () => {
  return axios.post("/api/auth/logout", {}, { withCredentials: true })
}

export const getSearch = async (city) => {
  return API.get(`/cities/search?query=${city}`)
}

export const getallProperty = async (page,limit) => {
  return API.get(`/property/getAllProperties?page=${page}&limit=10`);
}

export const getproperty = async(id) => {
  return API.get(`/property/getProperty/${id}`);
}

export const submitProperty = createAsyncThunk(
  "property/submitProperty",
  async (propertyData, { rejectWithValue }) => {
    try {
      const formData = new FormData;
      // Append all normal fields
      Object.keys(propertyData).forEach((key) => {
        if (!["images", "video"].includes(key)) {
          let value = propertyData[key];

          if (key === "location" && typeof value === "object") {
            value = JSON.stringify(value);
          }
          if (Array.isArray(value)) {
            value.forEach((item) => formData.append(key, item));
          } else {
            formData.append(key, value);
          }
        }
      });

      // Append images
      propertyData.images.forEach((file) => {
        formData.append("images", file);
      });

      // Append videos
      propertyData.video.forEach((file) => {
        formData.append("video", file);
      })
      const res = await axios.post("/api/property/createProperty", formData, {
        headers: { "content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Server error" });
    }
  }
);

// export const submitProperty = createAsyncThunk(
//   "property/submitProperty",
//   async (propertyData, { rejectWithValue }) => {
//     try {
//       const res = await axios.post("/property/createProperty", propertyData, {
//         headers: { "Content-Type": "application/json" },
//         withCredentials: true, // if you need cookies/session
//       });
//       return res.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data || { message: "Server error" });
//     }
//   }
// );