import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CountdownTimer from "./TimeCountVerify";
import { url } from "./Port";
import { ProfilerWrapper } from "../../utils/Profiler";
function Verify() {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [status, setStatus] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [timeExpired, setTimeExpired] = useState(false);
  const [resetKey, setResetKey] = useState(Date.now());
  const [isResending, setIsResending] = useState(false);

  const handleExpire = () => {
    setTimeExpired(true);
    setStatus("⚠️ Code expired! Please request a new one.");
  };

  const handleResendCode = async () => {
    setIsResending(true);
    try {
      let email = localStorage.getItem("email");
      const response = await fetch(`${url}/auth/regenerate-otp`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();

      if (response.status === 200) {
        setStatus("✅ Code sent again. Please check your email.");
        setTimeExpired(false);
        setCode("");
        setResetKey(Date.now());
      } else {
        setStatus(`❌ ${data.message}`);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsResending(false);
    }
  };

  const handleVerifyCode = async () => {
    if (code.length !== 6) {
      setStatus("Enter 6 digit number");
      return;
    }

    setIsVerifying(true);
    setStatus("🔄 Verifying code...");
    const email = localStorage.getItem("email");

    try {
      const res = await fetch(`${url}/auth/verify`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, code }),
      });

      const data = await res.json();
      if (res.status === 200 && data.message?.includes("verified")) {
        setStatus("✅ Email verified successfully!");
        localStorage.removeItem("email");
        setTimeout(() => navigate("/user/dashboard"), 2000);
      } else if (res.status === 401) {
        setStatus(`❌ ${data.message || "Invalid code."}`);
      } else {
        setStatus(data.message);
      }
    } catch (error) {
      console.error(error);
      setStatus("❌ Server error.");
      navigate("/auth/server-error");
    }

    setIsVerifying(false);
  };

  return (
    <ProfilerWrapper id="verfiy">
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md text-center w-96">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">
          Email Verification
        </h1>
        <p className="text-gray-600 mb-6">
          Enter the 6-digit code sent to your email
        </p>

        <input
          type="text"
          value={code}
          onChange={(e) =>
            setCode(
              e.target.value.replace(/\D/g, "").slice(0, 6),
              setStatus("")
            )
          }
          placeholder="Enter code"
          maxLength={6}
          className="w-full text-center text-2xl tracking-widest border border-gray-300 p-3 rounded-md outline-blue-500"
        />

        <button
          onClick={timeExpired ? handleResendCode : handleVerifyCode}
          disabled={isVerifying || isResending}
          className={`w-full mt-4 ${
            timeExpired
              ? "bg-yellow-500 hover:bg-yellow-600"
              : "bg-blue-600 hover:bg-blue-700"
          } text-white py-2 rounded transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed`}
        >
          {isVerifying || isResending
            ? timeExpired
              ? "Resending..."
              : "Verifying..."
            : timeExpired
            ? "Resend Code"
            : "Verify"}
        </button>

        {status && <p className="mt-4 text-gray-700 font-medium">{status}</p>}

        <CountdownTimer
          duration={300}
          onExpire={handleExpire}
          resetKey={resetKey}
        />
      </div>
    </div></ProfilerWrapper>
  );
}

export default Verify;
