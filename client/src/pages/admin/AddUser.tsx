
import React, { useState, useEffect } from "react";
import Navbar from "../../components/NavbarAdmin";
import SidebarAdmin from "../../components/SideBarAdmin";
import { assets } from "../../assets/assets2";
import { toast } from "react-toastify";
import axiosInstance from "../../utils/axios";
import { useAuthStore } from "../../store/authStore";
import axios, { AxiosError } from "axios";
import { APIRoutes } from "../../constants/routes.constants";

type country = {
   name : {
     common: string,
   }
}

const AddUser = () => {
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
  const [countries, setCountries] = useState<string[]>([]);

  const { accessToken } = useAuthStore();
  const nameRegex = /^[A-Za-z\s]*$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).+$/;
  const dobDate = new Date(form.dob);
  const today = new Date();
  const numberRegex = /^\d+$/;

  useEffect(() => {
  const fetchCountries = async () => {
    try {
      const response = await axios.get("https://restcountries.com/v3.1/all?fields=name");
      const countryNames = response.data
        .map((country: country) => country.name.common)
        .sort(); // optional: alphabetical sort

      setCountries(countryNames);
    } catch (error) {
      toast.error("Failed to load countries");
      console.error(error);
    }
  };

  fetchCountries();
}, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!profilePhoto) {
      toast.error("Please upload profile photo.");
      return;
    }

    if (form.password !== form.rePassword) {
      toast.error("Passwords do not match.");
      return;
    }

    if(!nameRegex.test(form.name)){
      toast.error("Name can only be alphabet");
      return;
    }
    
    if(!emailRegex.test(form.email)){
      toast.error("enter a valid email");
      return;
    }

    if(!passwordRegex.test(form.password)){
      toast.error("password must have at least one number and one alphabet");
      return;
    }

    if (!form.dob) {
      toast.error("Date of Birth is required.");
      return;
    }
    if (isNaN(dobDate.getTime())) {
      toast.error("Invalid Date of Birth.");
      return;
    }
    if (dobDate >= today) {
      toast.error("Date of Birth must be before today.");
      return;
    }

    if(!nameRegex.test(form.city)){
       toast.error("city should only have alphabets");
       return;
    }
    if(!nameRegex.test(form.state)){
       toast.error("state should only have alphabets");
       return;
    }
    if(!nameRegex.test(form.country)){
       toast.error("country should only have alphabets");
       return;
    }
    if(!numberRegex.test(form.pinCode) || form.pinCode.length !== 6){
      toast.error("Pin code should be 6 digit number");
      return;
    }
    

   
    const userData = {
      name: form.name,
      email: form.email,
      password: form.password,
      role: "user",
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
    formData.append("photo", profilePhoto);

    try {
      await axiosInstance.post(APIRoutes.ADMIN_CREATE_USERS, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      });

      toast.success("User added successfully!");

      
      setForm({
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
      setProfilePhoto(null);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || "Something went wrong");
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />

      <div className="flex flex-1 flex-row">
        <SidebarAdmin />

        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto mt-12">
          <form className="w-full max-w-5xl mx-auto" onSubmit={handleSubmit}>
            <p className="mb-6 text-2xl font-semibold text-gray-700">Add User</p>

            <div className="bg-white px-6 py-8 border rounded-xl shadow-sm w-full">
              
              <div className="flex items-center gap-4 mb-8 text-gray-500">
                <label htmlFor="photo">
                  <img
                    className="w-16 h-16 object-cover bg-gray-100 rounded-full cursor-pointer"
                    src={
                      profilePhoto
                        ? URL.createObjectURL(profilePhoto)
                        : assets.upload_area
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
                  
                  <label htmlFor="">Date of Birth</label>
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
              </div>

              <button
                type="submit"
                className="bg-[#5F6FFF] px-10 py-3 mt-6 text-white rounded-full hover:bg-[#4a53cc] hover:scale-105 transition"
              >
                Add User
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default AddUser;
