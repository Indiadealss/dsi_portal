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
      const res = await axios.post("http://16.170.111.173:5000/api/auth/send-otp", { mobile });
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
        const res = await axios.post("http://16.170.111.173:5000/api/auth/login", {
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
        const res = await axios.post("http://16.170.111.173:5000/api/auth/register", {
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
        const res = await axios.post("http://16.170.111.173:5000/api/auth/forgot-password", { email });
        if (res.data.success) {
          alert("📩 Reset password link sent to your email");
          setMode("login");
        } else {
          setError(res.data.message || "Something went wrong");
        }
      }

      if (mode === "loginWithMobile") {
        const res = await axios.post("http://16.170.111.173:5000/api/auth/verify-otp", {
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
      <h4 className="text-xl font-bold mb-4 capitalize">{mode}</h4>

      {/* REGISTER FIELDS */}
      {mode === "register" && (
        <>
          <div className="mb-3">
            <label className="block text-sm">Full Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full border p-2 rounded" />
          </div>
          <div className="mb-3">
            <label className="block text-sm">Mobile Number</label>
            <input type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} className="w-full border p-2 rounded" />
          </div>
        </>
      )}

      {/* EMAIL FIELD */}
      {(mode === "login" || mode === "register" || mode === "forgot") && (
        <div className="mb-3">
          <label className="block text-sm">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border p-2 rounded" />
        </div>
      )}

      {/* PASSWORD FIELD */}
      {mode !== "forgot" && mode !== "loginWithMobile" && (
        <div className="mb-3">
          <label className="block text-sm">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border p-2 rounded" />
        </div>
      )}

      {/* CONFIRM PASSWORD */}
      {mode === "register" && (
        <div className="mb-3">
          <label className="block text-sm">Confirm Password</label>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full border p-2 rounded" />
        </div>
      )}

      {/* LOGIN WITH MOBILE */}
      {mode === "loginWithMobile" && (
        <div className="mb-3">
          <label className="block text-sm">Mobile Number</label>
          <input type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} className="w-full border p-2 rounded" />
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
