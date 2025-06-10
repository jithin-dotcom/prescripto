


import React, { useState, useEffect } from "react";
import axios, { isAxiosError } from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const calculatePasswordStrength = (password: string) => {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
};

const strengthLabels = ["Too weak", "Weak", "Fair", "Good", "Strong", "Very Strong"];
const strengthColors = ["#e74c3c", "#e67e22", "#f1c40f", "#2ecc71", "#27ae60", "#2c3e50"];

const ResetPassword: React.FC = () => {
  const [newPassword, setNewPassword] = useState("");
  const [reenterPassword, setReenterPassword] = useState("");
  const [passwordScore, setPasswordScore] = useState(0);
  const email = localStorage.getItem("forgotEmail");
  const navigate = useNavigate();

  useEffect(() => {
    setPasswordScore(calculatePasswordStrength(newPassword));
  }, [newPassword]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return toast.error("Session expired. Start again.");
    if (newPassword !== reenterPassword) return toast.error("Passwords do not match.");
    if (passwordScore < 3) return toast.error("Password is too weak.");

    try {
      await axios.post("/api/auth/update-password", {
        email,
        newPassword,
        reenterNewPassword: reenterPassword,
      });
      toast.success("Password updated successfully");
      localStorage.removeItem("forgotEmail");
      navigate("/login");
    }catch (err: unknown) {
       if(isAxiosError(err)){
         toast.error(err.response?.data?.message || "Failed to update password");
       }else{
         toast.error("Something went wrong");
       }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 p-4">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Reset Password</h2>
        <input
          type="password"
          className="w-full mb-1 px-4 py-2 border rounded-lg"
          placeholder="New password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <div className="mb-4 h-2 rounded bg-gray-200">
          <div
            style={{
              width: `${(passwordScore / 5) * 100}%`,
              backgroundColor: strengthColors[passwordScore],
              height: "100%",
              borderRadius: "inherit",
              transition: "width 0.3s ease",
            }}
          />
        </div>
        <p className="mb-4 text-sm" style={{ color: strengthColors[passwordScore] }}>
          {strengthLabels[passwordScore]}
        </p>

        <input
          type="password"
          className="w-full mb-4 px-4 py-2 border rounded-lg"
          placeholder="Re-enter new password"
          value={reenterPassword}
          onChange={(e) => setReenterPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
