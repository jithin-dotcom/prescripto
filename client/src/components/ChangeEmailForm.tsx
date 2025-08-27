

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import logo from '../assets/logo.svg'
import { toast } from 'react-toastify';
import type { ChangeEmailFormData } from '../interfaces/IChangeEmail';

interface ChangeEmailFormProps {
  onSubmit: (formData: ChangeEmailFormData) => Promise<void>;
}

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const ChangeEmailForm: React.FC<ChangeEmailFormProps> = ({ onSubmit }) => {
  const [form, setForm] = useState<ChangeEmailFormData>({
    newEmail: '',
    confirmEmail: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password.trim().length === 0 || form.newEmail.trim().length === 0 || form.confirmEmail.trim().length === 0) {
      toast.error('All fields are required.');
      return;
    }

    if (!emailRegex.test(form.newEmail)) {
      toast.error('Enter a valid email address.');
      return;
    }

    if (form.newEmail !== form.confirmEmail) {
      toast.error('Emails do not match.');
      return;
    }

    try {
      await onSubmit(form);
      setForm({ newEmail: '', confirmEmail: '', password: '' });
    } catch (error) {
       console.log(error);
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      transition={{ duration: 0.6 }}
      className="w-full max-w-md p-6 bg-white shadow-2xl rounded-xl hover:scale-102 transition duration-300"
    >
      <div className="flex flex-col items-center mb-6">
        <img src={logo} alt="logo" className="h-7 w-auto mb-1" />
        <h2 className="text-2xl font-semibold text-gray-800 text-center">
          Change Email
        </h2>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit} noValidate>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            New Email
          </label>
          <input
            type="email"
            name="newEmail"
            value={form.newEmail}
            placeholder="e.g. new@example.com"
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md shadow-sm text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Confirm New Email
          </label>
          <input
            type="email"
            name="confirmEmail"
            value={form.confirmEmail}
            placeholder="Re-enter new email"
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md shadow-sm text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Current Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={form.password}
              placeholder="Enter your password"
              onChange={handleChange}
              className="w-full px-3 py-2 pr-10 border rounded-md shadow-sm text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2.5 mt-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition"
        >
          Update Email
        </button>
      </form>
    </motion.div>
  );
};

export default ChangeEmailForm;