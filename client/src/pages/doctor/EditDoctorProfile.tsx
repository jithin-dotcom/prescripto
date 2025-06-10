

import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar2";
import SidebarAdmin from "../../components/SideBarAdmin";
import { assets } from "../../assets/assets2";
import { toast } from "react-toastify";
import axiosInstance from "../../utils/axios";
import { useAuthStore } from "../../store/authStore";
import { AxiosError } from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const EditDoctorProfile = () => {
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

  const [profilePhoto, setProfilePhoto] = useState<File | string | null>(null);
  const [proofDocuments, setProofDocuments] = useState<FileList | null>(null);
  const { id } = useParams();
  const { accessToken } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    async function getUser() {
      try {
        const res = await axiosInstance.get(`/admin/get-user/${id}`);
        console.log("response : ",res.data);
        const user = res.data.data;
        const profile = res.data.data.profile?.[0] || {};

        setForm({
          name: user.name || "",
          email: user.email || "",
          password: "",
          rePassword: "",
          specialization: profile?.specialization || "",
          educationDetails: profile?.educationDetails || "",
          registrationNumber: profile?.registrationNumber || "",
          registrationYear: profile?.registrationYear || "",
          yearOfExperience: profile?.yearOfExperience || "",
          fee: profile?.fee || "",
          about: profile?.about || "",
        });

        if (user.photo) {
          setProfilePhoto(user.photo); // URL string
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch doctor info");
      }
    }

    if (id) getUser();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Form validations
    if (form.password !== form.rePassword) return toast.error("Passwords do not match.");
    if (!form.name.match(/^[A-Za-z\s]*$/)) return toast.error("Name must only contain letters and spaces.");
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) return toast.error("Enter a valid email.");
    // if (!form.password.match( /^(?=.*[A-Za-z])(?=.*\d).+$/) return toast.error("Password must contain letters and numbers.");
    if (!form.educationDetails.match(/^[A-Z\s]+$/)) return toast.error("Education should be uppercase letters only.");
    if (!form.registrationNumber.match(/^[a-zA-Z0-9]+$/)) return toast.error("Invalid registration number.");
    if (!form.registrationYear.match(/^\d{4}$/)) return toast.error("Registration year must be 4 digits.");
    if (!String(form.yearOfExperience).match(/^\d+$/)) return toast.error("Experience should be numeric.");
    if (!form.about) return toast.error("Please fill in the About section.");
    if (!form.specialization) return toast.error("Please select a specialization.");

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

    if (profilePhoto && typeof profilePhoto !== "string") {
      formData.append("photo", profilePhoto);
    }

    if (proofDocuments) {
      Array.from(proofDocuments).forEach((file) => {
        formData.append("proofDocument", file);
      });
    }

    try {
      await axiosInstance.put(`/admin/update-user/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      });

      toast.success("Doctor updated successfully!");
      navigate("/doctor-profile")
      
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || "Update failed.");
      } else {
        toast.error("Something went wrong.");
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
            <p className="mb-6 text-2xl font-semibold text-gray-700">Edit Doctor</p>
            <div className="bg-white px-6 py-8 border rounded-xl shadow-sm w-full">
              {/* Profile Photo */}
              <div className="flex items-center gap-4 mb-8 text-gray-500">
                <label htmlFor="photo">
                  <img
                    className="w-16 h-16 object-cover bg-gray-100 rounded-full cursor-pointer"
                    src={
                      typeof profilePhoto === "string"
                        ? profilePhoto
                        : profilePhoto
                        ? URL.createObjectURL(profilePhoto)
                        : assets.upload_area
                    }
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
                <p>Upload doctor <br /> profile photo</p>
              </div>

              <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
                {/* Left */}
                <div className="w-full lg:flex-1 flex flex-col gap-4">
                  <input name="name" placeholder="Name" value={form.name} onChange={handleChange} className="border rounded px-3 py-2" required />
                  <input name="email" placeholder="Email" value={form.email} onChange={handleChange} className="border rounded px-3 py-2" required />
                  <input name="password" placeholder="Password" type="password" value={form.password} onChange={handleChange} className="border rounded px-3 py-2"  />
                  <input name="rePassword" placeholder="Re-enter Password" type="password" value={form.rePassword} onChange={handleChange} className="border rounded px-3 py-2"  />
                  <input name="educationDetails" placeholder="Education (MBBS, MD, etc)" value={form.educationDetails} onChange={handleChange} className="border rounded px-3 py-2" required />
                  <input name="yearOfExperience" placeholder="Years of Experience" value={form.yearOfExperience} onChange={handleChange} className="border rounded px-3 py-2" required />
                </div>

                {/* Right */}
                <div className="w-full lg:flex-1 flex flex-col gap-4">
                  <select name="specialization" value={form.specialization} onChange={handleChange} className="border rounded px-3 py-2" required>
                    <option value="">Select Speciality</option>
                    {["General physician", "Gynecologist", "Dermatologist", "Pediatricians", "Neurologist", "Gastroenterologist"].map((spec) => (
                      <option key={spec} value={spec}>{spec}</option>
                    ))}
                  </select>
                  <input name="registrationNumber" placeholder="Registration Number" value={form.registrationNumber} onChange={handleChange} className="border rounded px-3 py-2" required />
                  <input name="registrationYear" placeholder="Registration Year" value={form.registrationYear} onChange={handleChange} className="border rounded px-3 py-2" required />
                  <label className="mt-2 text-sm text-gray-600 font-medium">Upload proof documents (PDF or image)</label>
                  <input type="file" accept=".pdf,image/*" multiple onChange={(e) => setProofDocuments(e.target.files)} className="border px-2 py-2 rounded" />
                </div>
              </div>

              <div className="mt-6">
                <p className="mb-2">About Doctor</p>
                <textarea name="about" value={form.about} onChange={handleChange} className="w-full px-4 pt-2 border rounded" rows={5} placeholder="Write about doctor" required />
              </div>

              <button type="submit" className="bg-[#5F6FFF] px-10 py-3 mt-6 text-white rounded-full hover:bg-[#4a53cc] hover:scale-105 transition">
                Update Doctor
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default EditDoctorProfile;




