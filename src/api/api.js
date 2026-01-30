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

export const updateUser = (formatData) => {
  return axios.post("/api/auth/updateuserprofile",{formatData})
}

export const getLogout = async () => {
  return axios.post("/api/auth/logout", {}, { withCredentials: true })
}

export const getSearch = async (city) => {
  return API.get(`/cities/search?query=${city}`)
}

export const getallProperty = async (page ='',filter = '',purpose='',propertyType='') => {
  console.log(purpose,'purpose');
  
  return API.get(`/property/getAllProperties?page=${page}&limit=10&location=${filter}&purpose=${purpose}&propertyType=${propertyType}`);
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
export const submitProperty = createAsyncThunk(
  "property/submitProperty",
  async (propertyData, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      Object.keys(propertyData).forEach((key) => {
        if (!["images", "video"].includes(key)) {
          let value = propertyData[key];

          // ✅ Fix: Handle arrays of objects (unitData, offices, amenities, etc.)
          if (Array.isArray(value)) {
            value.forEach((item) => {
              if (typeof item === "object") {
                formData.append(key, JSON.stringify(item)); // ✅ always stringify objects
              } else {
                formData.append(key, item);
              }
            });
          }
          else if (typeof value === "object") {
            formData.append(key, JSON.stringify(value)); // ✅ stringify single object
          }
          else {
            formData.append(key, value);
          }
        }
      });

      // ✅ IMAGES
      propertyData.images.forEach((imgObj, idx) => {
        formData.append("images", imgObj.file);
        formData.append("imageTypes", imgObj.type);
        formData.append(`fields_${idx}`, JSON.stringify(imgObj.Fields));
      });

      // ✅ VIDEOS
      propertyData.video.forEach((file) => {
        formData.append("video", file);
      });

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