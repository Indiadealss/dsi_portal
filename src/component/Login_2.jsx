import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Loginform = () => {
  const [mode, setMode] = useState("login"); // login | register | forgot | loginWithMobile
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // ✅ Validation helper
  const validate = () => {
    if (mode === "login") {
      if (!email || !password) return "Email and password are required";
      if (!/\S+@\S+\.\S+/.test(email)) return "Invalid email ID";
    }
    if (mode === "register") {
      if (!name) return "Name is required";
      if (!mobile || !/^\d{10}$/.test(mobile)) return "Valid 10-digit mobile is required";
      if (!email || !/\S+@\S+\.\S+/.test(email)) return "Valid email is required";
      if (password.length < 6) return "Password must be at least 6 characters";
      if (password !== confirmPassword) return "Passwords do not match";
    }
    if (mode === "forgot") {
      if (!email || !/\S+@\S+\.\S+/.test(email)) return "Valid email is required";
    }
    if (mode === "loginWithMobile") {
      if (!mobile || !/^\d{10}$/.test(mobile)) return "Valid 10-digit mobile is required";
      if (otpSent && !otp) return "Please enter the OTP";
    }
    return "";
  };

  const handleSendOtp = async () => {
    if (!mobile || !/^\d{10}$/.test(mobile)) {
      setError("Please enter a valid 10-digit mobile number");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await axios.post("https://indiadealss.com/api/auth/send-otp", { mobile });
      if (res.data.success) {
        setOtpSent(true);
        alert("✅ OTP sent to your mobile number");
      } else {
        setError(res.data.message || "Failed to send OTP");
      }
    } catch (err) {
      console.error(err);
      setError("❌ Server error while sending OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    setLoading(true);

    try {
      if (mode === "login") {
        const res = await axios.post("https://indiadealss.com/api/auth/login", {
          email,
          password,
        });
        if (res.data.success) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.user));
          navigate("/postproperty"); // ✅ Redirect after login
        } else {
          setError(res.data.message || "Invalid email or password");
        }
      }

      if (mode === "register") {
        const res = await axios.post("https://indiadealss.com/api/auth/register", {
          name,
          mobile,
          email,
          password,
        });
        if (res.data.success) {
          alert("✅ Registration successful! Please login.");
          setMode("login");
        } else {
          setError(res.data.message || "Registration failed");
        }
      }

      if (mode === "forgot") {
        const res = await axios.post("https://indiadealss.com/api/auth/forgot-password", { email });
        if (res.data.success) {
          alert("📩 Reset password link sent to your email");
          setMode("login");
        } else {
          setError(res.data.message || "Something went wrong");
        }
      }

      if (mode === "loginWithMobile") {
        const res = await axios.post("https://indiadealss.com/api/auth/verify-otp", {
          mobile,
          otp,
        });
        if (res.data.success) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.user));
          navigate("/postproperty"); // ✅ Redirect after OTP login
        } else {
          setError(res.data.message || "Invalid OTP");
        }
      }
    } catch (err) {
      console.error(err);
      setError("❌ Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h4 className="text-xl font-bold mb-4 capitalize text-center">{mode}</h4>

      {/* REGISTER FIELDS */}
      {mode === "register" && (
        <>
          <div className="mb-3">
            <label for="email-address-icon" className=' block mb-2 text-sm font-medium text-gray-900 '>Full Name</label>
                <div className='flex'>
                    <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md   ">
                        <svg className="w-4 h-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                        </svg>
                    </span>
                    <input type="text" value={name} id="website-admin" onChange={(e) => setName(e.currentTarget.value)} className='rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5     'placeholder="Full Name" />
                </div>
          </div>
          <div className="mb-3">
            <label className="block mb-2 text-sm font-medium text-gray-900 ">Mobile Number</label>
            <input type="number" value={mobile} onChange={(e) => setMobile(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5    " placeholder="Enter your phone number" />
          </div>
        </>
      )}

      {/* EMAIL FIELD */}
      {(mode === "login" || mode === "register" || mode === "forgot") && (
        <div className="mb-3">
          
          <label for="email-address-icon" className='my-4 block mb-2 text-sm font-medium text-gray-900 '>Email</label>

                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none ">
                        <svg className="w-4 h-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                            <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                            <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                        </svg>
                    </div>
                    <input type="email" id="email-address-icon" onChange={(e) => setEmail(e.currentTarget.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5     " placeholder="name@flowbite.com" />
                
                </div>
        </div>
      )}

      {/* PASSWORD FIELD */}
      {mode !== "forgot" && mode !== "loginWithMobile" && (
        <div className="mb-3">
          <label for="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                    <input type="password" id="Password" value={password} onChange={(e) => setPassword(e.currentTarget.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5    " placeholder="•••••••••" required />
                    
        </div>
      )}

      {/* CONFIRM PASSWORD */}
      {mode === "register" && (
        <div className="mb-3">
          <label for="password" className="block mb-2 text-sm font-medium text-gray-900 ">Conform Password</label>
                    <input type="password" id="ConformPassword" onChange={(e) => setConfirmPassword(e.currentTarget.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5    " placeholder="•••••••••" required />
        </div>
      )}

      {/* LOGIN WITH MOBILE */}
      {mode === "loginWithMobile" && (
        <div className="mb-3">
          <label className="block mb-2 text-sm font-medium text-gray-900 ">Mobile Number</label>
          <input type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5    " />
          {otpSent && (
            <>
              <label className="block text-sm mt-2">Enter OTP</label>
              <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} className="w-full border p-2 rounded" />
            </>
          )}
          {!otpSent && (
            <button onClick={handleSendOtp} disabled={loading} className="w-full bg-blue-500 text-white py-2 mt-2 rounded">
              {loading ? "Sending..." : "Send OTP"}
            </button>
          )}
        </div>
      )}

      {/* ERROR */}
      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

      {/* SUBMIT */}
      <button onClick={handleSubmit} disabled={loading} className="w-full bg-blue-500 text-white py-2 rounded">
        {loading
          ? "Please wait..."
          : mode === "login"
          ? "Login"
          : mode === "register"
          ? "Register"
          : mode === "forgot"
          ? "Reset Password"
          : "Verify OTP"}
      </button>

      {/* TOGGLE MODES */}
      <div className="mt-4 text-sm text-center">
        {mode === "login" && (
          <>
            <p>
              Don’t have an account?{" "}
              <span onClick={() => setMode("register")} className="text-blue-500 cursor-pointer">
                Register
              </span>
            </p>
            <p>
              <span onClick={() => setMode("forgot")} className="text-blue-500 cursor-pointer">
                Forgot Password?
              </span>
            </p>
            <p>
              <span onClick={() => setMode("loginWithMobile")} className="text-blue-500 cursor-pointer">
                Login with Mobile
              </span>
            </p>
          </>
        )}
        {mode === "register" && (
          <p>
            Already have an account?{" "}
            <span onClick={() => setMode("login")} className="text-blue-500 cursor-pointer">
              Login
            </span>
          </p>
        )}
        {mode === "forgot" && (
          <p>
            Back to{" "}
            <span onClick={() => setMode("login")} className="text-blue-500 cursor-pointer">
              Login
            </span>
          </p>
        )}
        {mode === "loginWithMobile" && (
          <p>
            Back to{" "}
            <span onClick={() => setMode("login")} className="text-blue-500 cursor-pointer">
              Login with Email
            </span>
          </p>
        )}
      </div>
    </>
  );
};
