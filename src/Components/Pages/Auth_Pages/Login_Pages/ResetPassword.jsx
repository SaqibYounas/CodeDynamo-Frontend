import React, { useRef, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { url } from "./Port";
import { ProfilerWrapper } from "../../utils/Profiler";

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const navigate = useNavigate();

  const passwordRef = useRef();
  const confirmRef = useRef();

  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    const password = passwordRef.current.value.trim();
    const confirmPass = confirmRef.current.value.trim();
    let hasError = false;

    setPasswordError("");
    setConfirmError("");
    setMessage("");

    if (!password) {
      setPasswordError("Please enter your password.");
      passwordRef.current.focus();
      hasError = true;
    } else if (!/^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(password)) {
      setPasswordError(
        "Password must be at least 8 characters and include a special character."
      );
      passwordRef.current.focus();
      hasError = true;
    }

    if (!confirmPass) {
      setConfirmError("Please confirm your password.");
      confirmRef.current.focus();
      hasError = true;
    } else if (password !== confirmPass) {
      setConfirmError("Passwords do not match.");
      confirmRef.current.focus();
      hasError = true;
    }

    if (hasError) return;

    try {
      const response = await fetch(
        `${url}/auth/reset-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
            credentials: "include",
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (
        response.status === 200 &&
        data.message === "Password updated successfully. Please login."
      ) {
        setMessage("✅ Password has been reset. Redirecting...");
        setTimeout(() => navigate("/auth/login"), 2000);
      } else {
        setMessage(data.message || "Something went wrong.");
      }
    } catch (err) {
      setMessage("Network error. Try again.");
    }
  };

  return (
    <ProfilerWrapper id="Reset Password">
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Reset Password
        </h2>
        <form onSubmit={handleReset} className="space-y-4">
          <div>
            <label
              htmlFor="new-password"
              className="block text-gray-700 font-medium"
            >
              New Password
            </label>
            <input
              id="new-password"
              type="password"
              ref={passwordRef}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="At least 8 characters, 1 special char"
              required
              onChange={()=>setPasswordError("")}
            />
            {passwordError && (
              <p className="text-red-600 text-sm mt-1">{passwordError}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="confirm-password"
              className="block text-gray-700 font-medium"
            >
              Confirm Password
            </label>
            <input
              id="confirm-password"
              type="password"
              ref={confirmRef}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Retype password"
              required
              onChange={()=>setConfirmError("")}

            />
            {confirmError && (
              <p className="text-red-600 text-sm mt-1">{confirmError}</p>
            )}
          </div>

          <button
          
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 cursor-pointer"
          >
            Reset Password
          </button>
        </form>
        {message && (
          <p className="mt-4 text-center text-green-600 font-semibold">
            {message}
          </p>
        )}
      </div>
    </div></ProfilerWrapper>
  );
}

export default ResetPassword;
