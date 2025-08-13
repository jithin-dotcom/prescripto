

import React, { useState } from "react";
import  { isAxiosError } from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import logo from '../../assets/Screenshot 2025-07-08 170708.png';
import { APIAuthRoutes } from "../../constants/routes.constants";
import { axiosNoAuth } from "../../utils/axios";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axiosNoAuth.post(APIAuthRoutes.FORGOT_PASSWORD, { email });
      toast.success("OTP sent to your email");
      localStorage.setItem("forgotEmail", email);
      navigate("/verify-forgot-password");
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        toast.error(err.response?.data?.message || "Error sending OTP");
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-blue-50 p-4"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl rounded-xl p-8 max-w-md w-full hover:scale-105 transition duration-300"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: { staggerChildren: 0.15 }
          },
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
          className="text-2xl font-bold text-blue-600 mb-4"
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
        >
          Forgot Password
        </motion.h2>

        <motion.input
          type="email"
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
        />

        <motion.button
          type="submit"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
        >
          Send OTP
        </motion.button>
      </motion.form>
    </motion.div>
  );
};

export default ForgotPassword;
