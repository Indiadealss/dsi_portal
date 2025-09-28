import axios from "axios";

const API = axios.create({
    baseURL: "/api",
    headers:{
        "Content-Type" : "application/json",
    },
});


// Auth APIs
export const sentOtp = (mobile) => 
    API.post("/auth/send-otp", {mobile});


export const verifyOtp = (mobile,otp) =>
    API.post("/auth/verify-otp", {mobile,otp});


export const register = (name,email,mobile) => 
    API.post("/auth/register",{name,email,mobile})

export const getUserDetatils = () => {
    return axios.get("/api/auth/me",
    { withCredentials: true ,
    headers: { "Cache-Control": "no-cache" }
    }
    )
}

export const getLogout = async () => {
    return axios.post("/api/auth/logout",{},{ withCredentials: true })
}