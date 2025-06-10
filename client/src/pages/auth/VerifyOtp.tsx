

import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios, { isAxiosError } from "axios";
import { useAuthStore } from "../../store/authStore";
import { toast } from "react-toastify";

const VERIFY_DURATION = 60; 
const OTP_SENT_KEY = "otp-sent-timestamp";

const VerifyOtp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = (location.state as { email?: string })?.email || "";
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [isVerifyEnabled, setIsVerifyEnabled] = useState(false);
  const [verifyTimer, setVerifyTimer] = useState(0);
  const [isResending, setIsResending] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const setAuth = useAuthStore((state) => state.setAuth);

  
  const calculateRemainingTime = () => {
    const sentTime = localStorage.getItem(OTP_SENT_KEY);
    if (!sentTime) return VERIFY_DURATION;
    const elapsed = Math.floor((Date.now() - parseInt(sentTime)) / 1000);
    return Math.max(0, VERIFY_DURATION - elapsed);
  };

  
  const startVerifyCountdown = (duration: number = VERIFY_DURATION) => {
    if (timerRef.current) clearInterval(timerRef.current);
    let timeLeft = duration;

    setVerifyTimer(timeLeft); 

    timerRef.current = setInterval(() => {
      timeLeft -= 1;
      setVerifyTimer(timeLeft);

      if (timeLeft <= 0) {
        clearInterval(timerRef.current!);
        setIsVerifyEnabled(false);
      }
    }, 1000);
  };

  useEffect(() => {
    if (!email) {
      navigate("/signup");
      return;
    }

    
    if (!localStorage.getItem(OTP_SENT_KEY)) {
      localStorage.setItem(OTP_SENT_KEY, Date.now().toString());
    }

    const remaining = calculateRemainingTime();
    if (remaining > 0) {
      setIsVerifyEnabled(true);
      startVerifyCountdown(remaining);
    } else {
      setIsVerifyEnabled(false);
    }

    setHydrated(true); 
  }, [email, navigate]);

  const handleVerifyOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isVerifyEnabled) {
      toast.warning("OTP expired. Please resend OTP.");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post("/api/auth/verify-otp", { email, otp });
      setAuth(res.data); 
      localStorage.removeItem(OTP_SENT_KEY); 
      navigate("/dashboard");
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        toast.error(err.response?.data?.message || "Invalid or expired OTP");
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setIsResending(true);
    try {
      await axios.post("/api/auth/resend-otp", { email });
      localStorage.setItem(OTP_SENT_KEY, Date.now().toString());
      toast.success("OTP sent successfully");
      setOtp("");
      setIsVerifyEnabled(true);
      startVerifyCountdown();
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        toast.error(err.response?.data?.message || "Failed to resend OTP");
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setIsResending(false);
    }
  };

  if (!hydrated) return null; 

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8 space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-blue-600">Verify your email</h2>
          <p className="text-sm text-gray-500 mt-2">We sent an OTP to <strong>{email}</strong></p>
        </div>

        <form onSubmit={handleVerifyOtp} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">OTP</label>
            <input
              type="text"
              name="otp"
              maxLength={6}
              placeholder="Enter the 6-digit code"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-center tracking-wider"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              required
            />
          </div>

          
          <button
            type="submit"
            disabled={loading || !isVerifyEnabled}
            className={`w-full py-2 rounded-lg transition duration-200 ${
              isVerifyEnabled
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {loading
              ? "Verifying..."
              : isVerifyEnabled
              ? `Verify & Complete Signup (${verifyTimer}s)`
              : "Verify Expired"}
          </button>

          
          <button
            type="button"
            disabled={isVerifyEnabled || isResending}
            onClick={handleResendOtp}
            className={`w-full py-2 rounded-lg border ${
              isVerifyEnabled || isResending
                ? "border-gray-400 text-gray-400 cursor-not-allowed"
                : "border-blue-600 text-blue-600 hover:bg-blue-100"
            }`}
          >
            {isResending ? "Resending..." : "Resend OTP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;
