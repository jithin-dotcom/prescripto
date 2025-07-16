

import { useState } from "react";
import { motion } from "framer-motion";
import logo from "../../assets/logo.svg";
import axiosInstance from "../../utils/axios";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuthStore } from "../../store/authStore";
import Navbar from "../../components/Navbar";
import NavbarAdmin from "../../components/NavbarAdmin";
import Sidebar from "../../components/SideBarAdmin";
import { useNavigate } from "react-router-dom";

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const ChangePassword = () => {
  const { role } = useAuthStore();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    rePassword: "",
  });

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).+$/;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    
    if (!form.currentPassword || !form.newPassword || !form.rePassword) {
      toast.error("All fields are required.");
      return;
    }

    if (!passwordRegex.test(form.newPassword)) {
      toast.error("New password must contain at least one letter and one number.");
      return;
    }

    if (form.newPassword !== form.rePassword) {
      toast.error("New passwords do not match.");
      return;
    }

    try {
      const res = await axiosInstance.post(
        "/user/change-password", 
        {
          password: form.currentPassword,
          newPassword: form.newPassword,
        },
        { withCredentials: true }
      );

      toast.success(res.data.message || "Password changed successfully");

      if(role === "doctor"){
        navigate("/doctor-dashboard");
      }else if(role === "user"){
        navigate("/user-dashboard");
      }
      setForm({ currentPassword: "", newPassword: "", rePassword: "" });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Failed to change password");
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  const FormContent = (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      transition={{ duration: 0.6 }}
      className="w-full max-w-md p-6 bg-white shadow-2xl rounded-xl hover:scale-105 transition duration-300 "
    >
      <div className="flex flex-col items-center mb-4">
        <img src={logo} alt="logo" className="h-6 w-auto sm:h-7 mb-1" />
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 text-center">
          Change Password
        </h2>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Current Password</label>
          <input
            type="password"
            name="currentPassword"
            value={form.currentPassword}
            placeholder="Enter current password"
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg text-sm shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">New Password</label>
          <input
            type="password"
            name="newPassword"
            value={form.newPassword}
            placeholder="Enter new password"
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg text-sm shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Re-enter New Password</label>
          <input
            type="password"
            name="rePassword"
            value={form.rePassword}
            placeholder="Re-enter new password"
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg text-sm shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2.5 mt-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition"
        >
          Change Password
        </button>
      </form>
    </motion.div>
  );


  if (role === "doctor") {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 to-white flex flex-col">
     
      <NavbarAdmin />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <main className="flex-1 flex items-center justify-center px-4 py-6 overflow-auto">
          {FormContent}
        </main>
      </div>
    </div>
  );
}

 
  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 to-white">
      <Navbar />
      <div className="flex items-center justify-center px-4 py-10">
        {FormContent}
      </div>
    </div>
  );
};

export default ChangePassword;
