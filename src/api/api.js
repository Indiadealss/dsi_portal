import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,   // 🔥 THIS LINE FIXES EVERYTHING
  headers: {
    "Content-Type": "application/json",
  },
});


// Auth APIs
export const sentOtp = (mobile) =>
  API.post("/auth/send-otp", { mobile });


export const lead = (id) =>
  API.get(`/mycrmhomepage/getcrmHomepage?id=${id}`)

export const getAllpropertiesDetailsUser = async (id,page=1,limit=2,status='all') => {
  return API.get(`/mycrmhomepage/allListing?id=${id}&page=${page}&limit=${limit}&status=${status}`)
}


export const getPlainlistingWithleads = async (id,page=1,limit=2,status='all') => {
  return API.get(`/mycrmhomepage/PlanListing?id=${id}&page=${page}&limit=${limit}&status=${status}`)
}

export const getPlatinumlistingWithleads = async (id,page=1,limit=2,status='all') => {
  return API.get(`/mycrmhomepage/PlatinumListing?id=${id}&page=${page}&limit=${limit}&status=${status}`)
}

export const getPremimumlistingWithleads = async (id,page=1,limit=2,status='all') => {
  return API.get(`/mycrmhomepage/PremimumListing?id=${id}&page=${page}&limit=${limit}&status=${status}`)
}


export const getInfinitylistingWithleads = async (id,page=1,limit=2,status='all') => {
  return API.get(`/mycrmhomepage/InfinityListing?id=${id}&page=${page}&limit=${limit}&status=${status}`)
}

export const getAllProjectlistingWithleads = async (id,page=1,limit=2) => {
  return API.get(`/mycrmhomepage/getprojectslisting?id=${id}&page=${page}&limit=${limit}`)
}

export const getresponsebyid = async (id,page=1,limit=2) => {
  return API.get(`/mycrmhomepage/leadbyid?id=${id}&page=${page}&limit=${limit}`)
}

export const verifyOtp = (mobile, otp) =>
  API.post("/auth/verify-otp", { mobile, otp });


export const register = (name, email, mobile) =>
  API.post("/auth/register", { name, email, mobile })

export const getUserDetatils = () =>
  API.get("/auth/me");

export const updateUser = async (formData) => {
  return axios.post("/api/auth/updateuserprofile", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });
};

export const getLogout = async () => {
  return axios.post("/api/auth/logout", {}, { withCredentials: true })
}

export const getSearch = async (city) => {
  return API.get(`/cities/search?query=${city}`)
}

export const getallProperty = async (page ='',filter = '',purpose='',propertyType='', slug='') => {
  console.log(purpose,'purpose');
  
  return API.get(`/property/getAllProperties?page=${page}&limit=10&location=${filter}&purpose=${purpose}&propertyType=${propertyType}&slug=${slug}`);
}

export const getproperty = async(id) => {
  return API.get(`/property/getProperty/${id}`);
}

export const getPropertyByRera = async(rera) => {
  return API.get(`/property/getPropertyByRera/${rera}`);
}

export const getPropertyByspid = async(sipid) => {
  return API.get(`/property/getPropertyByspid/${sipid}`);
}

export const getCampainbyId = async (npxid) => {
  return API.get(`/adddealer/getcampainbyid/${npxid}`);
}

export const getAllProjectNames = async () => {
  return API.get(`/property/propertyName`);
}

export const createPropertyBasic = (data) =>
  API.post("/property/createPropertyBasic", data);

export const updatePropertyStep = (id, data) =>
  API.put(`/property/updateProperty/${id}`, data);

export const updatePropertyIdStep = (id, data) =>
  API.put(`/property/updatePropertyById/${id}`, data);

export const uploadImage = (id, formData) =>
  axios.post(`/api/property/uploadImage/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const uploadVideo = (id, formData) =>
  axios.post(`/api/property/uploadVideo/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  export const deleteImage = (id,imageid) => 
    API.delete(`/property/image/${id}/${imageid}`)

  export const deleteVideo = (id,videoid) => 
    API.delete(`/property/video/${id}/${videoid}`)


  export const updateImageMeta = (propertyId, imageId, data) => {
  return API.put(`/property/updateImageMeta/${propertyId}/${imageId}`, data);
};



  export const publishProperty = (id,purpose) =>
  API.put(`/property/publishProperty/${id}`,{ purpose });


  export const getOverlookingFeatureById = (id) =>
    API.get(`/overlookingfeature/getOverlookingFeatureById`)

// export const submitProperty = createAsyncThunk(
//   "property/submitProperty",
//   async (propertyData, { rejectWithValue }) => {
//     try {
//       const formData = new FormData();

//       Object.keys(propertyData).forEach((key) => {
//         if (!["images", "video"].includes(key)) {
//           let value = propertyData[key];

//           // ✅ Fix: Handle arrays of objects (unitData, offices, amenities, etc.)
//           if (Array.isArray(value)) {
//             value.forEach((item) => {
//               if (typeof item === "object") {
//                 formData.append(key, JSON.stringify(item)); // ✅ always stringify objects
//               } else {
//                 formData.append(key, item);
//               }
//             });
//           }
//           else if (typeof value === "object") {
//             formData.append(key, JSON.stringify(value)); // ✅ stringify single object
//           }
//           else {
//             formData.append(key, value);
//           }
//         }
//       });

//       // ✅ IMAGES
//       propertyData.images.forEach((imgObj, idx) => {
//         formData.append("images", imgObj.file);
//         formData.append("imageTypes", imgObj.type);
//         formData.append(`fields_${idx}`, JSON.stringify(imgObj.Fields));
//       });

//       // ✅ VIDEOS
//       propertyData.video.forEach((file) => {
//         formData.append("video", file);
//       });

//       const res = await axios.post("/api/property/createProperty", formData, {
//         headers: { "content-Type": "multipart/form-data" },
//         withCredentials: true,
//       });

//       return res.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data || { message: "Server error" });
//     }
//   }
// );

export const createGestLead = async (formatData) => {
  return API.post(`/leaduser/genrate`,formatData,{
    headers:{
      "Content-Type":"multipart/form-data",
    }
  })
}



export const createLead = async (formData) => {
  return API.post(`/lead/lead`,formData,{
    headers:{
      "Content-Type": "multipart/form-data",
    },
  })
}

export const createCampain = async (formData) => {
  return API.post(`/adddealer/adddelear`,formData,{
    headers:{
      "Content-Type": "multipart/form-data",
    },
  })
}

// upcoming projects Banners 

export const createProjectBanner = async (formData) => {
  return API.post(`/upcomingProjects/upcomingProjects`,formData,{
    headers:{
      "Content-Type": "multipart/form-data",
    },
  })
}

// get upcoming projects banners

export const getProjectBanner = async () => {
  return API.get(`/upcomingProjects/get`)
}

// get campain by npxid
export const getCampain = async () => {
  return API.get(`/adddealer/geddealer`)
}

export const createFeature = async (formData) => {
  return API.post(`/feature/create`,formData, {
    headers:{
      "Content-Type":"multipart/form-data",
    },
  });
};

export const createLocalAdvantages = async (formData) => {
  return API.post(`/feature/localAdvantages`,formData,{
    headers:{
      "Content-Type":"multipart/form-data",
    },
  });
};

export const createAminities = async (formData) => {
  return API.post(`/aminities/create`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getAminities = async () => {
  return API.get(`/aminities/getAminities`);
}

export const createroom = async (formData) => {
  return API.post(`/otherroom/create`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getotheroom = async () => {
  return API.get(`/otherroom/getotheroom`);
}

export const createpropertyfeature = async (formData) => {
  return API.post(`/propertyfeature/create`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getpropertyfeature = async () => {
  return API.get(`/propertyfeature/getpropertyFeature`);
}

export const createadditionalfeature = async (formData) => {
  return API.post(`/additionalfeature/create`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getadditionalfeature = async () => {
  return API.get(`/additionalfeature/getadditionalfeature`);
}


export const createoverlookingfeature = async (formData) => {
  return API.post(`/overlookingfeature/create`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getoverlookingfeature = async () => {
  return API.get(`/overlookingfeature/getoverlookingFeature`);
}



export const getLocalAdvantages = async (name) => {
  return API.get(`/feature/getlocationAdvantages?name=${name}`)
}

export const getAllFeature = async ()=> {
  return API.get(`/feature/getFeatures`);
} 

export const searchaddress = async (address,city) => {
  return API.get(`/searchaddress?query=${address}&$city=${city}`);
}

// ✅ Toggle Shortlist (Add / Remove)
export const toggleShortlist = async (userId, propertyId) => {
  return API.post("/shortlist/toggle", {
    userId,
    propertyId,
  });
};

// ✅ Get User Shortlist
export const getUserShortlist = async (userId) => {
  return API.get(`/shortlist/${userId}`);
};

export const toggleViewed = async (userId, propertyId) => {
  return API.post("/viewed/toggle", {
    userId,
    propertyId,
  });
};

// ✅ Get User Shortlist
export const getUserViewed = async (userId) => {
  return API.get(`/viewed/${userId}`);
};

export const toggleConnected = async (userId, propertyId) => {
  return API.post("/connect/toggle", {
    userId,
    propertyId,
  });
};

// ✅ Get User Shortlist
export const getUserConnected = async (userId) => {
  return API.get(`/connect/${userId}`);
};

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