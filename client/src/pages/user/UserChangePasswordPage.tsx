

import React from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axios';
import { toast } from 'react-toastify';
import { useAuthStore } from '../../store/authStore';
import Navbar from '../../components/Navbar';
import ChangePasswordForm from '../../components/ChangePasswordForm';
import { APIUserRoutes } from '../../constants/routes.constants';
import type { ChangePasswordFormData, ChangePasswordResponse } from '../../interfaces/IChangePassword';

const UserChangePasswordPage: React.FC = () => {
  const { user, role } = useAuthStore();
  const navigate = useNavigate();
  

  const handleSubmit = async (formData: ChangePasswordFormData) => {
    try {
      const res = await axiosInstance.post<ChangePasswordResponse>(
        APIUserRoutes.CHANGE_PASSWORD,
        {
          password: formData.currentPassword,
          newPassword: formData.newPassword,
        },
        { withCredentials: true }
      );

      toast.success(res.data.message || 'Password changed successfully');
      navigate('/user-dashboard');
    } catch (error) {
        console.log(error)
    
    }
  };

  if (role !== 'user' || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md text-center">
          <p className="text-red-600 text-lg mb-4">Unauthorized access. Please log in as a user.</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition duration-300"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100">
      <Navbar />
      <div className="flex items-center justify-center px-4 py-10">
        <ChangePasswordForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default UserChangePasswordPage;