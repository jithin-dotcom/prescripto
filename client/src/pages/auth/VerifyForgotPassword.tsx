

import React, { useState, useEffect, useRef } from "react";
import axios, { isAxiosError } from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../../assets/Screenshot 2025-07-08 170708.png";
import { APIAuthRoutes } from "../../constants/routes.constants";

const VERIFY_DURATION = 60;
const OTP_FORGOT_KEY = "otp-forgot-timestamp";

const VerifyForgotPassword: React.FC = () => {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState<string | null>(null);
  const [isResending, setIsResending] = useState(false);
  const [isVerifyEnabled, setIsVerifyEnabled] = useState(false);
  const [verifyTimer, setVerifyTimer] = useState(0);
  const [hydrated, setHydrated] = useState(false);
  const navigate = useNavigate();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const calculateRemainingTime = () => {
    const sentTime = localStorage.getItem(OTP_FORGOT_KEY);
    if (!sentTime) return VERIFY_DURATION;
    const elapsed = Math.floor((Date.now() - parseInt(sentTime)) / 1000);
    return Math.max(0, VERIFY_DURATION - elapsed);
  };

  const startVerifyCountdown = (duration: number = VERIFY_DURATION) => {
    if (timerRef.current) clearInterval(timerRef.current);
    let timeLeft = duration;
    setVerifyTimer(timeLeft);
    setIsVerifyEnabled(true);
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
    const storedEmail = localStorage.getItem("forgotEmail");
    if (!storedEmail) {
      toast.error("Session expired. Please start again.");
      navigate("/forgot-password");
      return;
    }
    setEmail(storedEmail);

    if (!localStorage.getItem(OTP_FORGOT_KEY)) {
      localStorage.setItem(OTP_FORGOT_KEY, Date.now().toString());
    }

    const remaining = calculateRemainingTime();
    if (remaining > 0) {
      setIsVerifyEnabled(true);
      startVerifyCountdown(remaining);
    }

    setHydrated(true);
  }, [navigate]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return toast.error("Session expired. Start again.");
    if (otp.length !== 6) return toast.error("Please enter a 6-digit OTP");
    if (!isVerifyEnabled) return toast.error("Time expired. Please resend OTP.");

    try {
      await axios.post(APIAuthRoutes.FORGOT_PASSWORD_OTP, { email, otp });
      toast.success("OTP verified successfully. Please reset your password.");
      localStorage.removeItem(OTP_FORGOT_KEY);
      navigate("/reset-password");
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        toast.error(err.response?.data?.message || "OTP verification failed");
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  const handleResendOtp = async () => {
    if (!email) return toast.error("Session expired. Start again.");
    setIsResending(true);
    try {
      await axios.post(APIAuthRoutes.RESEND_OTP, { email });
      localStorage.setItem(OTP_FORGOT_KEY, Date.now().toString());
      toast.success("OTP resent successfully.");
      setOtp("");
      startVerifyCountdown();
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        toast.error(err.response?.data?.message || "Failed to send OTP");
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setIsResending(false);
    }
  };

  if (!hydrated) return null;

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-blue-50 p-4"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.form
        onSubmit={handleVerify}
        className="bg-white shadow-2xl rounded-xl p-8 max-w-md w-full hover:scale-105 transition duration-300"
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.15 } },
          hidden: {}
        }}
      >
         <motion.img
            src={logo}
            alt="Logo"
            className="w-40 h-12 mx-auto mb-0"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        <motion.h2
          className="text-2xl font-bold text-blue-600 mb-4 text-center"
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
        >
          Verify OTP
        </motion.h2>

        <motion.input
          type="text"
          maxLength={6}
          className="w-full mb-4 px-4 py-2 border rounded-lg text-center text-xl tracking-widest"
          placeholder="Enter 6-digit OTP"
          value={otp}
          onChange={(e) => {
            const val = e.target.value.replace(/\D/g, "");
            setOtp(val);
          }}
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
        />

        <motion.button
          type="submit"
          disabled={!isVerifyEnabled}
          className={`w-full py-2 rounded-lg mb-4 ${
            isVerifyEnabled
              ? "bg-blue-600 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          whileHover={isVerifyEnabled ? { scale: 1.03 } : {}}
          whileTap={isVerifyEnabled ? { scale: 0.97 } : {}}
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
        >
          {isVerifyEnabled
            ? `Verify OTP (${verifyTimer}s)`
            : "Verify OTP (Expired)"}
        </motion.button>

        <motion.button
          type="button"
          disabled={isVerifyEnabled || isResending}
          onClick={handleResendOtp}
          className={`w-full py-2 rounded-lg border ${
            isVerifyEnabled || isResending
              ? "border-gray-400 text-gray-400 cursor-not-allowed"
              : "border-blue-600 text-blue-600 hover:bg-blue-100"
          }`}
          whileHover={!isVerifyEnabled && !isResending ? { scale: 1.03 } : {}}
          whileTap={!isVerifyEnabled && !isResending ? { scale: 0.97 } : {}}
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
        >
          {isResending ? "Resending..." : "Resend OTP"}
        </motion.button>
      </motion.form>
    </motion.div>
  );
};

export default VerifyForgotPassword;
