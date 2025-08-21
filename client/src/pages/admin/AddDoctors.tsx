
import React, { useState } from "react";
import Navbar from "../../components/NavbarAdmin";
import SidebarAdmin from "../../components/SideBarAdmin";
import { assets } from "../../assets/assets2";
import { toast } from "react-toastify";
import axiosInstance from "../../utils/axios";

import { APIRoutes } from "../../constants/routes.constants";

const AddDoctor = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    rePassword: "",
    specialization: "",
    educationDetails: "",
    registrationNumber: "",
    registrationYear: "",
    yearOfExperience: "",
    fee: "",
    about: "",
  });

  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [proofDocuments, setProofDocuments] = useState<FileList | null>(null);
  const nameRegex = /^[A-Za-z\s]*$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).+$/;
  const eduRegex = /^[A-Z\s]+$/;
  const numberRegex = /^\d+$/;
  const registrationNumberRegex = /^[a-zA-Z0-9]+$/;
  const registrationYearRegex = /^\d{4}$/;
  
 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!profilePhoto || !proofDocuments) {
    toast.error("Please upload profile photo and proof documents.");
    return;
  }

  if (form.password !== form.rePassword ) {
    toast.error("Passwords do not match.");
      return;
  }
  
  if(!nameRegex.test(form.name) || form.name.trim() .length=== 0){
    toast.error("Name can only be alphabet");
    return;
  }

  if(form.name.trim().length > 20){
     toast.error("Name should be smaller than 20 words");
     return;
  }
      
  if(!emailRegex.test(form.email) || form.email.trim().length === 0){
    toast.error("enter a valid email");
    return;
  }
  
  if(!passwordRegex.test(form.password) || form.password.trim().length === 0){
    toast.error("password must have at least one number and one alphabet");
    return;
  }
  
  if(!eduRegex.test(form.educationDetails) || form.educationDetails.trim() .length === 0){
     toast.error("Education qualification should only have capital alphabet");
     return;
  }

  if(!numberRegex.test(form.yearOfExperience) || !form.yearOfExperience){
     toast.error("Year of experience should be number");
     return;
  }

  if (!form.specialization || form.specialization === "") {
    toast.error("Please select a valid specialization.");
    return;
  }

  if (!registrationNumberRegex.test(form.registrationNumber) || form.registrationNumber.trim().length === 0) {
    toast.error("Registration number must contain only letters and numbers.");
    return;
  }

  if (!registrationYearRegex.test(form.registrationYear) || !form.registrationYear) {
    toast.error("Registration year must be a 4-digit number.");
    return;
  }

  if(form.about.trim().length <= 0){
     toast.error("about cannot be empty");
     return;
  }
  
  

  
  const userData = {
    name: form.name,
    email: form.email,
    password: form.password,
    role: "doctor",
  };

  const profileData = {
    specialization: form.specialization,
    educationDetails: form.educationDetails,
    registrationNumber: form.registrationNumber,
    registrationYear: form.registrationYear,
    yearOfExperience: form.yearOfExperience,
    fee: form.fee,
    about: form.about,
  };

  const formData = new FormData();
  formData.append("userData", JSON.stringify(userData));
  formData.append("profileData", JSON.stringify(profileData));

  formData.append("photo", profilePhoto);
  Array.from(proofDocuments).forEach((file) => {
    formData.append("proofDocument", file);
  });

  try {
     await axiosInstance.post(APIRoutes.ADMIN_CREATE_USERS, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
     
    });

    toast.success("Doctor added successfully!");

    
    setForm({
      name: "",
      email: "",
      password: "",
      rePassword: "",
      specialization: "",
      educationDetails: "",
      registrationNumber: "",
      registrationYear: "",
      yearOfExperience: "",
      fee: "",
      about: "",
    });
    setProfilePhoto(null);
    setProofDocuments(null);
  } catch (error) {
    console.log("error : ",error);
    
  }
};





  return (
    <div className="min-h-screen bg-gray-100 flex flex-col bg-gradient-to-br from-blue-100 to-indigo-100">
      <Navbar />

      <div className="flex flex-1 flex-row">
        <SidebarAdmin />

        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto mt-12">
          <form className="w-full max-w-5xl mx-auto" onSubmit={handleSubmit}>
            <p className="mb-6 text-2xl font-semibold text-gray-700">Add Doctor</p>

            <div className="bg-white px-6 py-8  rounded-xl shadow-2xl w-full hover:scale-101 transition duration-300">
              
              <div className="flex items-center gap-4 mb-8 text-gray-500">
                <label htmlFor="photo">
                  <img
                    className="w-16 h-16 object-cover bg-gray-100 rounded-full cursor-pointer"
                    src={profilePhoto ? URL.createObjectURL(profilePhoto) : assets.upload_area}
                    alt="Upload doctor"
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
                  Upload doctor <br /> profile photo
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
                    type="email"
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
                  <input
                    name="educationDetails"
                    placeholder="Education (MBBS, MD, etc)"
                    value={form.educationDetails}
                    onChange={handleChange}
                    className="border rounded px-3 py-2"
                  
                  />
                  <input
                    name="yearOfExperience"
                    placeholder="Years of Experience"
                    type="number"
                    value={form.yearOfExperience}
                    onChange={handleChange}
                    className="border rounded px-3 py-2"
                  
                  />
                
                </div>

                
                <div className="w-full lg:flex-1 flex flex-col gap-4">
                 <div className="flex flex-col gap-1">
                    <p>Fees</p>
                    <input
                      name="fee"
                      className="border rounded px-3 py-2"
                      type="number"
                      placeholder="Doctor fees"
                      value={form.fee}
                      onChange={handleChange}
                   
                    />
                  </div>
                  
                  <select
                    name="specialization"
                    value={form.specialization}
                    onChange={handleChange}
                    className="border rounded px-3 py-2"
                  
                  >
                    <option value="">Select Speciality</option>
                    {[
                      "General physician",
                      "Gynecologist",
                      "Dermatologist",
                      "Pediatricians",
                      "Neurologist",
                      "Gastroenterologist",
                    ].map((spec) => (
                      <option key={spec} value={spec}>
                        {spec}
                      </option>
                    ))}
                  </select>

                  <input
                    name="registrationNumber"
                    placeholder="Registration Number"
                    value={form.registrationNumber}
                    onChange={handleChange}
                    className="border rounded px-3 py-2"
                  
                  />
                  <input
                    name="registrationYear"
                    placeholder="Registration Year"
                    value={form.registrationYear}
                    onChange={handleChange}
                    className="border rounded px-3 py-2"
                   
                  />

                  <label className="mt-2 text-sm text-gray-600 font-medium">
                    Upload proof documents (PDF or image)
                  </label>
                  <input
                    type="file"
                    accept=".pdf,image/*"
                    multiple
                    onChange={(e) => setProofDocuments(e.target.files)}
                    className="border px-2 py-2 rounded"
                  />
                </div>
              </div>

              <div className="mt-6">
                <p className="mb-2">About Doctor</p>
                <textarea
                  name="about"
                  value={form.about}
                  onChange={handleChange}
                  className="w-full px-4 pt-2 border rounded"
                  rows={5}
                  placeholder="Write about doctor"
                 
                ></textarea>
              </div>

              <button
                type="submit"
                className="bg-[#5F6FFF] px-10 py-3 mt-6 text-white rounded-full hover:bg-[#4a53cc] hover:scale-105 transition"
              >
                Add doctor
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default AddDoctor;








