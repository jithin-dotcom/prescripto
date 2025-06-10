

import React, { useState } from "react";
import axios, { isAxiosError } from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/api/auth/forgot-password", { email });
      toast.success("OTP sent to your email");
      localStorage.setItem("forgotEmail", email); 
      navigate("/verify-forgot-password");
    }catch (err: unknown) {
       if(isAxiosError(err)){
         toast.error(err.response?.data?.message || "Error sending OTP");
       }else{
         toast.error("Something went wrong");
       }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 p-4">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Forgot Password</h2>
        <input
          type="email"
          className="w-full mb-4 px-4 py-2 border rounded-lg"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg">Send OTP</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
