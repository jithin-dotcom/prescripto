
import React, { useEffect, useState } from "react";
import Navbar from "../../components/NavbarAdmin";
import SidebarAdmin from "../../components/SideBarAdmin";
import { assets } from "../../assets/assets2";
import { toast } from "react-toastify";
import axiosInstance from "../../utils/axios";
import { useAuthStore } from "../../store/authStore";
import { AxiosError } from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditUser = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    rePassword: "",
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

  const { accessToken } = useAuthStore();
  const { id } = useParams();

  const navigate = useNavigate();
  const nameRegex = /^[A-Za-z\s]*$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).+$/;
  const numberRegex = /^\d+$/;

  useEffect(() => {
    if (!id) return;

    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get(`/admin/get-user/${id}`);

        console.log("User fetch response:", response);
         const user = response.data.data;
         const profile = user.profile?.[0];

        setForm({
          name: user.name,
          email: user.email,
          password: "",
          rePassword: "",
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const dobDate = new Date(form.dob);
    const today = new Date();

    // Validation
    if (form.password !== form.rePassword) {
      toast.error("Passwords do not match.");
      return;
    }

    if (!nameRegex.test(form.name)) {
      toast.error("Name can only contain letters.");
      return;
    }

    if (!emailRegex.test(form.email)) {
      toast.error("Enter a valid email.");
      return;
    }

    if ((form.password && !passwordRegex.test(form.password)) || form.password === "") {
      toast.error("Password must contain at least one letter and one number.");
      return;
    }

    if (!form.dob || isNaN(dobDate.getTime()) || dobDate >= today) {
      toast.error("Invalid or future Date of Birth.");
      return;
    }

    if (!nameRegex.test(form.city) || !nameRegex.test(form.state) || !nameRegex.test(form.country)) {
      toast.error("City, state, and country must only contain letters.");
      return;
    }

    if (!numberRegex.test(form.pinCode) || form.pinCode.length !== 6) {
      toast.error("Pin code must be a 6-digit number.");
      return;
    }

    const userData = {
      name: form.name,
      email: form.email,
      ...(form.password && { password: form.password }),
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
      const endpoint = id ? `/admin/update-user/${id}` : "/admin/create-users";
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
                  onChange={(e) =>
                    setProfilePhoto(e.target.files?.[0] || null)
                  }
                />
                <p>
                  Upload user <br /> profile photo
                </p>
              </div>

              <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
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
                  <input
                    name="password"
                    placeholder="Password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    className="border rounded px-3 py-2"
                  />
                  <input
                    name="rePassword"
                    placeholder="Re-enter Password"
                    type="password"
                    value={form.rePassword}
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
                  {[
                    "India",
                    "United States",
                    "United Kingdom",
                    "Canada",
                    "Australia",
                    "Germany",
                    "France",
                    "Japan",
                    "China",
                    "Brazil"
                  ].map((country) => (
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
