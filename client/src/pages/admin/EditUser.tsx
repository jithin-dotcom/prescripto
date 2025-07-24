

import React, { useEffect, useState } from "react";
import Navbar from "../../components/NavbarAdmin";
import SidebarAdmin from "../../components/SideBarAdmin";
import { assets } from "../../assets/assets2";
import { toast } from "react-toastify";
import axiosInstance from "../../utils/axios";
import { useAuthStore } from "../../store/authStore";
import axios, { AxiosError } from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { APIRoutes } from "../../constants/routes.constants";

type country = {
  name: {
    common: string;
  };
};

const EditUser = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "user",
    dob: "",
    gender: "male",
    houseName: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
  });

  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [countries, setCountries] = useState<string[]>([]);

  const { accessToken } = useAuthStore();
  const { id } = useParams();
  const navigate = useNavigate();

  const nameRegex = /^[A-Za-z\s]*$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const numberRegex = /^\d+$/;

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all?fields=name");
        const countryNames = response.data
          .map((country: country) => country.name.common)
          .sort();
        setCountries(countryNames);
      } catch (error) {
        toast.error("Failed to load countries");
        console.error(error);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    if (!id) return;

    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get(`${APIRoutes.ADMIN_GET_USER_EDIT}/${id}`);
        const user = response.data.data;
        const profile = user.profile?.[0];

        setForm({
          name: user.name,
          email: user.email,
          role: user.role,
          dob: profile?.dateOfBirth || "",
          gender: profile?.gender || "male",
          houseName: profile?.houseName || "",
          city: profile?.city || "",
          state: profile?.state || "",
          country: profile?.country || "",
          pinCode: profile?.pin?.toString() || "",
        });

        setPhotoPreview(user.photo || null);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load user details");
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const dobDate = new Date(form.dob);
    const today = new Date();

    if (!nameRegex.test(form.name)) return toast.error("Name can only contain letters.");
    if (!emailRegex.test(form.email)) return toast.error("Enter a valid email.");
    if (!form.dob || isNaN(dobDate.getTime()) || dobDate >= today)
      return toast.error("Invalid or future Date of Birth.");
    if (!nameRegex.test(form.city) || !nameRegex.test(form.state) || !nameRegex.test(form.country))
      return toast.error("City, state, and country must only contain letters.");
    if (!numberRegex.test(form.pinCode) || form.pinCode.length !== 6)
      return toast.error("Pin code must be a 6-digit number.");

    const userData = {
      name: form.name,
      email: form.email,
      role: form.role,
    };

    const profileData = {
      dateOfBirth: form.dob,
      gender: form.gender,
      houseName: form.houseName,
      city: form.city,
      state: form.state,
      country: form.country,
      pin: form.pinCode,
    };

    const formData = new FormData();
    formData.append("userData", JSON.stringify(userData));
    formData.append("profileData", JSON.stringify(profileData));
    if (profilePhoto) {
      formData.append("photo", profilePhoto);
    }

    try {
      const endpoint = id ? `${APIRoutes.ADMIN_UPDATE_USERS}/${id}` : APIRoutes.ADMIN_CREATE_USERS;
      const method = id ? "put" : "post";

      await axiosInstance[method](endpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      });

      toast.success(`User ${id ? "updated" : "created"} successfully!`);
      navigate("/user-list");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || "Error occurred");
      } else {
        toast.error("Unknown error");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <div className="flex flex-1 flex-row">
        <SidebarAdmin />
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          <form className="w-full max-w-5xl mx-auto" onSubmit={handleSubmit}>
            <p className="mb-6 text-2xl font-semibold text-gray-700">
              {id ? "Edit User" : "Add User"}
            </p>
            <div className="bg-white px-6 py-8 border rounded-xl shadow-sm w-full">
              <div className="flex items-center gap-4 mb-8 text-gray-500">
                <label htmlFor="photo">
                  <img
                    className="w-16 h-16 object-cover bg-gray-100 rounded-full cursor-pointer"
                    src={
                      profilePhoto
                        ? URL.createObjectURL(profilePhoto)
                        : photoPreview || assets.upload_area
                    }
                    alt="Upload user"
                  />
                </label>
                <input
                  type="file"
                  id="photo"
                  accept="image/*"
                  hidden
                  onChange={(e) => setProfilePhoto(e.target.files?.[0] || null)}
                />
                <p>
                  Upload user <br /> profile photo
                </p>
              </div>

              {/* <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
                <div className="w-full lg:flex-1 flex flex-col gap-4">
                  
                  <input
                    name="name"
                    placeholder="Name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    className="border rounded px-3 py-2"
                  />
                  <input
                    name="email"
                    placeholder="Email"
                    type="text"
                    value={form.email}
                    onChange={handleChange}
                    className="border rounded px-3 py-2"
                  />
                  <label>Date of Birth</label>
                  <input
                    name="dob"
                    type="date"
                    value={form.dob}
                    onChange={handleChange}
                    className="border rounded px-3 py-2"
                  />
                </div>

                <div className="w-full lg:flex-1 flex flex-col gap-4">
                  <select
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                    className="border rounded px-2 py-2"
                  >
                    {["male", "female", "other"].map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                  <input
                    name="houseName"
                    placeholder="House Name"
                    type="text"
                    value={form.houseName}
                    onChange={handleChange}
                    className="border rounded px-3 py-2"
                  />
                  <input
                    name="city"
                    placeholder="City"
                    type="text"
                    value={form.city}
                    onChange={handleChange}
                    className="border rounded px-3 py-2"
                  />
                  <input
                    name="state"
                    placeholder="State"
                    type="text"
                    value={form.state}
                    onChange={handleChange}
                    className="border rounded px-3 py-2"
                  />
                  <select
                    name="country"
                    value={form.country}
                    onChange={handleChange}
                    className="border rounded px-3 py-2"
                  >
                    <option value="">Select Country</option>
                    {countries.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                  <input
                    name="pinCode"
                    placeholder="PIN Code"
                    type="number"
                    value={form.pinCode}
                    onChange={handleChange}
                    className="border rounded px-3 py-2"
                  />
                </div>
              </div> */}





              <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-700">
  {/* Left Section */}
  <div className="w-full lg:flex-1 flex flex-col gap-5">
    {/* Name */}
    <div className="flex flex-col">
      <label htmlFor="name" className="mb-1 text-sm font-medium">Full Name</label>
      <input
        id="name"
        name="name"
        type="text"
        placeholder="Enter your name"
        value={form.name}
        onChange={handleChange}
        className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    {/* Email */}
    <div className="flex flex-col">
      <label htmlFor="email" className="mb-1 text-sm font-medium">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        placeholder="Enter your email"
        value={form.email}
        onChange={handleChange}
        className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    {/* DOB */}
    <div className="flex flex-col">
      <label htmlFor="dob" className="mb-1 text-sm font-medium">Date of Birth</label>
      <input
        id="dob"
        name="dob"
        type="date"
        value={form.dob}
        onChange={handleChange}
        className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  </div>

  {/* Right Section */}
  <div className="w-full lg:flex-1 flex flex-col gap-5">
    {/* Gender */}
    <div className="flex flex-col">
      <label htmlFor="gender" className="mb-1 text-sm font-medium">Gender</label>
      <select
        id="gender"
        name="gender"
        value={form.gender}
        onChange={handleChange}
        className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select gender</option>
        {["male", "female", "other"].map((g) => (
          <option key={g} value={g}>{g}</option>
        ))}
      </select>
    </div>

    {/* House Name */}
    <div className="flex flex-col">
      <label htmlFor="houseName" className="mb-1 text-sm font-medium">House Name</label>
      <input
        id="houseName"
        name="houseName"
        type="text"
        placeholder="e.g., Rose Villa"
        value={form.houseName}
        onChange={handleChange}
        className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    {/* City */}
    <div className="flex flex-col">
      <label htmlFor="city" className="mb-1 text-sm font-medium">City</label>
      <input
        id="city"
        name="city"
        type="text"
        placeholder="Enter city"
        value={form.city}
        onChange={handleChange}
        className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    {/* State */}
    <div className="flex flex-col">
      <label htmlFor="state" className="mb-1 text-sm font-medium">State</label>
      <input
        id="state"
        name="state"
        type="text"
        placeholder="Enter state"
        value={form.state}
        onChange={handleChange}
        className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    {/* Country */}
    <div className="flex flex-col">
      <label htmlFor="country" className="mb-1 text-sm font-medium">Country</label>
      <select
        id="country"
        name="country"
        value={form.country}
        onChange={handleChange}
        className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select Country</option>
        {countries.map((country) => (
          <option key={country} value={country}>{country}</option>
        ))}
      </select>
    </div>

    {/* PIN Code */}
    <div className="flex flex-col">
      <label htmlFor="pinCode" className="mb-1 text-sm font-medium">PIN Code</label>
      <input
        id="pinCode"
        name="pinCode"
        type="number"
        placeholder="Enter PIN code"
        value={form.pinCode}
        onChange={handleChange}
        className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  </div>
</div>


              <button
                type="submit"
                className="bg-[#5F6FFF] px-10 py-3 mt-6 text-white rounded-full hover:bg-[#4a53cc] hover:scale-105 transition"
              >
                {id ? "Update User" : "Add User"}
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default EditUser;
