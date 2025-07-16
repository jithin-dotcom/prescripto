

import React, { useState, useEffect } from "react";
import Navbar from "../../components/NavbarAdmin";
import SidebarAdmin from "../../components/SideBarAdmin";
import { assets } from "../../assets/assets2";
import { toast } from "react-toastify";
import axiosInstance from "../../utils/axios";
import { useAuthStore } from "../../store/authStore";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";


const formatTo12Hour = (time24: string): string => {
  const [hour, minute] = time24.split(":").map(Number);
  const ampm = hour >= 12 ? "PM" : "AM";
  const h12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${h12}:${minute.toString().padStart(2, "0")} ${ampm}`;
};

const convertTo24Hour = (time12: string): string => {
  const [time, meridian] = time12.split(" ");
  const timeSlot = time.split(":").map(Number);
  let h = timeSlot[0];
  const m = timeSlot[1];
  if (meridian === "PM" && h < 12) h += 12;
  if (meridian === "AM" && h === 12) h = 0;
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
};

 type AvailabilitySlot = {
      day: string;
      from: string;
      to: string;
    };
const generateTimeOptions = () => {
  const opts: string[] = [];
  for (let h = 0; h < 24; h++) {
    for (const m of [0, 30]) {
      const pm = h >= 12 ? "PM" : "AM";
      const h12 = h % 12 === 0 ? 12 : h % 12;
      opts.push(`${h12}:${m === 0 ? "00" : m} ${pm}`);
    }
  }
  return opts;
};

const timeOptions = generateTimeOptions();

const EditDoctor = () => {
  const { id } = useParams();
  const { accessToken } = useAuthStore();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    specialization: "",
    educationDetails: "",
    registrationNumber: "",
    registrationYear: "",
    yearOfExperience: "",
    fee: "",
    about: "",
    slotDuration: 30,
    availability: [] as { day: string; from: string; to: string }[],
  });

  const [profilePhoto, setProfilePhoto] = useState<File | string | null>(null);
  const [proofDocuments, setProofDocuments] = useState<FileList | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await axiosInstance.get(`/admin/get-user/${id}`);
        const user = res.data.data;
        const profile = user.profile?.[0] || {};

        const formattedAvailability = (profile.availability || []).map((s: AvailabilitySlot) => ({
          day: s.day,
          from: formatTo12Hour(s.from),
          to: formatTo12Hour(s.to),
        }));

        setForm({
          name: user.name || "",
          email: user.email || "",
          specialization: profile.specialization || "",
          educationDetails: profile.educationDetails || "",
          registrationNumber: profile.registrationNumber || "",
          registrationYear: profile.registrationYear || "",
          yearOfExperience: profile.yearOfExperience || "",
          fee: profile.fee || "",
          about: profile.about || "",
          slotDuration: profile.slotDuration || 30,
          availability: formattedAvailability,
        });

        if (user.photo) setProfilePhoto(user.photo);
      } catch (e) {
        console.error(e);
        toast.error("Failed to load doctor");
      }
    }
    if (id) load();
  }, [id]);


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

  
    if (!form.name.match(/^[A-Za-z\s]+$/)) return toast.error("Name must contain only letters/spaces");
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) return toast.error("Invalid email");
    if (!form.educationDetails.match(/^[A-Z\s]+$/)) return toast.error("Education uppercase only");
    if (!form.registrationNumber.match(/^[a-zA-Z0-9]+$/)) return toast.error("Invalid reg number");
    if (!form.registrationYear.match(/^\d{4}$/)) return toast.error("Invalid registration year");
    if (!String(form.yearOfExperience).match(/^\d+$/)) return toast.error("Experience must be numeric");
    if (!form.specialization) return toast.error("Select a specialization");
    if (!form.about) return toast.error("Fill in About section");

   
    const seen = new Set<string>();
   
    const convertedAvail: AvailabilitySlot[] = [];

    for (const s of form.availability) {
      if (!s.day || !s.from || !s.to) return toast.error("Fill all fields in availability");
      if (seen.has(s.day)) return toast.error(`Duplicate day: ${s.day}`);
      seen.add(s.day);

      const from24 = convertTo24Hour(s.from);
      const to24 = convertTo24Hour(s.to);

      if (!timeOptions.includes(s.from) || !timeOptions.includes(s.to))
        return toast.error(`Invalid time select for ${s.day}`);
      if (from24 >= to24) return toast.error(`From must be before To on ${s.day}`);

      convertedAvail.push({ day: s.day, from: from24, to: to24 });
    }

    const userData = { name: form.name, email: form.email, role: "doctor" };
    const profileData = {
      specialization: form.specialization,
      educationDetails: form.educationDetails,
      registrationNumber: form.registrationNumber,
      registrationYear: form.registrationYear,
      yearOfExperience: form.yearOfExperience,
      fee: form.fee,
      about: form.about,
      slotDuration: form.slotDuration,
      availability: convertedAvail,
    };

    const fd = new FormData();
    fd.append("userData", JSON.stringify(userData));
    fd.append("profileData", JSON.stringify(profileData));
    if (profilePhoto && typeof profilePhoto !== "string") fd.append("photo", profilePhoto);
    if (proofDocuments) Array.from(proofDocuments).forEach((f) => fd.append("proofDocument", f));

    try {
      await axiosInstance.put(`/admin/update-user/${id}`, fd, {
        headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${accessToken}` },
        withCredentials: true,
      });
      toast.success("Doctor updated");
      navigate("/doctor-list");
    } catch (e) {
      if(axios.isAxiosError(e)){
         toast.error(e.response?.data?.message || "Update failed")
      }else{
         toast.error("Something went wrong")
      }
      
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <div className="flex flex-1 flex-row">
        <SidebarAdmin />
        <main className="flex-1 p-6 overflow-y-auto">
          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white p-6 shadow rounded">
            <h2 className="text-2xl mb-4">Edit Doctor</h2>

           
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="border px-3 py-2" />
              <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="border px-3 py-2" />
              <input name="educationDetails" value={form.educationDetails} onChange={handleChange} placeholder="Education (MBBS/MD)" className="border px-3 py-2" />
              <input name="yearOfExperience" value={form.yearOfExperience} onChange={handleChange} placeholder="Experience (years)" className="border px-3 py-2" />
              <select name="specialization" value={form.specialization} onChange={handleChange} className="border px-3 py-2">
                <option value="">Select Speciality</option>
                {["General physician", "Gynecologist", "Dermatologist", "Pediatricians", "Neurologist", "Gastroenterologist"].map((v) => (
                  <option key={v} value={v}>{v}</option>
                ))}
              </select>
              <input name="registrationNumber" value={form.registrationNumber} onChange={handleChange} placeholder="Reg Number" className="border px-3 py-2" />
              <input name="registrationYear" value={form.registrationYear} onChange={handleChange} placeholder="Reg Year" className="border px-3 py-2" />
              <input name="fee" value={form.fee} onChange={handleChange} placeholder="Fee" className="border px-3 py-2" />
            </div>

         
            <div className="mt-4 flex items-center gap-4">
              <label htmlFor="photo">
                <img
                  src={typeof profilePhoto === "string" ? profilePhoto : profilePhoto ? URL.createObjectURL(profilePhoto) : assets.upload_area}
                  className="w-16 h-16 rounded-full object-cover bg-gray-100 cursor-pointer"
                  alt="Profile"
                />
              </label>
              <input id="photo" type="file" accept="image/*" hidden onChange={(e) => setProfilePhoto(e.target.files?.[0] || null)} />
              <input type="file" accept=".pdf,image/*" multiple onChange={(e) => setProofDocuments(e.target.files)} />
            </div>

            {/* About */}
            <textarea
              name="about"
              value={form.about}
              onChange={handleChange}
              placeholder="About doctor"
              className="w-full border px-3 py-2 mt-4"
              rows={4}
            />

         
            <div className="mt-6">
              <h3 className="font-semibold mb-2">Availability Slots</h3>
              {form.availability.map((s, i) => (
                <div key={i} className="flex gap-2 mb-2">
                  <select
                    value={s.day}
                    onChange={(e) => {
                      const a = [...form.availability];
                      a[i].day = e.target.value;
                      setForm({ ...form, availability: a });
                    }}
                    className="border px-2 py-1"
                  >
                    <option value="">Select Day</option>
                    {["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"].map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                  <select
                    value={s.from}
                    onChange={(e) => {
                      const a = [...form.availability];
                      a[i].from = e.target.value;
                      setForm({ ...form, availability: a });
                    }}
                    className="border px-2 py-1"
                  >
                    <option value="">From</option>
                    {timeOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                  <select
                    value={s.to}
                    onChange={(e) => {
                      const a = [...form.availability];
                      a[i].to = e.target.value;
                      setForm({ ...form, availability: a });
                    }}
                    className="border px-2 py-1"
                  >
                    <option value="">To</option>
                    {timeOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                  <button
                    type="button"
                    className="text-red-500 cursor-pointer"
                    onClick={() => {
                      const a = [...form.availability];
                      a.splice(i, 1);
                      setForm({ ...form, availability: a });
                    }}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="text-blue-600"
                onClick={() => setForm({ ...form, availability: [...form.availability, { day: "", from: "", to: "" }] })}
              >
                + Add Slot
              </button>
            </div>

            {/* Slot Duration */}
            <div className="mt-4">
              <label>Slot Duration (minutes)</label>
              <input
                type="number"
                name="slotDuration"
                min={10}
                max={120}
                value={form.slotDuration}
                onChange={handleChange}
                className="border px-3 py-2 w-32"
              />
            </div>

            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded mt-6 hover:bg-blue-700">
              Update Doctor
            </button>
          </form>
        </main>
      </div>
    </div>
  );
};

export default EditDoctor;
