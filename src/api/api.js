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