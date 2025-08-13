

import React, { useEffect, useState } from "react";
import Navbar from "../../components/NavbarAdmin";
import SidebarAdmin from "../../components/SideBarAdmin";
import { assets } from "../../assets/assets2";
import { toast } from "react-toastify";
import axiosInstance from "../../utils/axios";
// import { useAuthStore } from "../../store/authStore";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { APIRoutes } from "../../constants/routes.constants";


interface ITimeBlock {
  from: string;
  to: string;
}

interface IAvailabilitySlot {
  day: string;
  slots: ITimeBlock[];
}

type TimeBlock = { from: string; to: string };
type AvailabilitySlot = { day: string; slots: TimeBlock[] };

const generateTimeOptions = (): string[] => {
  const opts: string[] = [];
  for (let h = 0; h < 24; h++) {
    for (const m of [0, 30]) {
      const ampm = h >= 12 ? "PM" : "AM";
      const hour12 = h % 12 === 0 ? 12 : h % 12;
      opts.push(`${hour12}:${m.toString().padStart(2, "0")} ${ampm}`);
    }
  }
  return opts;
};
const timeOptions = generateTimeOptions();

const formatTo12Hour = (time24: string): string => {
  const [h, m] = time24.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${m.toString().padStart(2, "0")} ${ampm}`;
};

const convertTo24Hour = (time12: string): string => {
  const match = /^(\d{1,2}):(\d{2}) (AM|PM)$/.exec(time12);
  if (!match) return "00:00";
  const [, hs, ms, period] = match;
  
  let h = parseInt(hs, 10);
  const m = parseInt(ms, 10);
  if (period === "PM" && h < 12) h += 12;
  if (period === "AM" && h === 12) h = 0;
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
};

const timeStringToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(":").map(Number);
  console.log(hours * 60 + minutes)
  return hours * 60 + minutes;
};

// const daysOfWeek = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

const EditDoctorProfile: React.FC = () => {
  const [form, setForm] = useState({
    name: "", email: "", specialization: "", educationDetails: "",
    registrationNumber: "", registrationYear: "", yearOfExperience: "",
    fee: "", about: "", slotDuration: 30,
    availability: [] as AvailabilitySlot[],
  });
  const [profilePhoto, setProfilePhoto] = useState<File | string | null>(null);
  const [proofDocuments, setProofDocuments] = useState<FileList | null>(null);
  const { id } = useParams<{ id: string }>();
  // const { accessToken } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    axiosInstance.get(`${APIRoutes.ADMIN_GET_USER_EDIT}/${id}`)
      .then(res => {
        const user = res.data.data;
        const prof = user.profile?.[0] || {};
        const formattedAvail: AvailabilitySlot[] = (prof.availability || []).map((s:  IAvailabilitySlot) => ({
          day: s.day,
          slots: (s.slots || []).map((b: ITimeBlock) => ({
            from: formatTo12Hour(b.from),
            to: formatTo12Hour(b.to),
          })),
        }));
        setForm({
          name: user.name || "", email: user.email || "",
          specialization: prof.specialization || "",
          educationDetails: prof.educationDetails || "",
          registrationNumber: prof.registrationNumber || "",
          registrationYear: prof.registrationYear || "",
          yearOfExperience: prof.yearOfExperience || "",
          fee: prof.fee || "", about: prof.about || "",
          slotDuration: prof.slotDuration || 30,
          availability: formattedAvail,
        });
        if (user.photo) setProfilePhoto(user.photo);
      })
      .catch(() => toast.error("Failed to load doctor info"));
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      
      if (!form.name.match(/^[A-Za-z\s]+$/) || !form.name?.trim()) throw new Error("Name must be letters/spaces");
      if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) || !form.email?.trim()) throw new Error("Invalid email");
      if (!form.educationDetails.match(/^[A-Z\s]+$/) || !form.educationDetails?.trim()) throw new Error("Education uppercase only");
      if (!form.registrationNumber.match(/^[a-zA-Z0-9]+$/) || !form.registrationNumber?.trim()) throw new Error("Invalid Reg Number");
      if (!form.registrationYear.match(/^\d{4}$/) || !form.registrationYear) throw new Error("Invalid Reg Year");
      // if (!form.yearOfExperience.match(/^\d+$/)) throw new Error("Invalid Experience");
      const experience = Number(form.yearOfExperience);
      if (isNaN(experience)) throw new Error("Invalid Experience");
      form.yearOfExperience = experience.toString();
      
      if (!form.specialization?.trim() || !form.about?.trim()) throw new Error("Fill all profile fields");

      const convertedAvail: AvailabilitySlot[] = [];
      const seenDays = new Set<string>();

      for (const slot of form.availability) {
        const { day, slots } = slot;
        if (!day) throw new Error("Select a day");
        if (seenDays.has(day)) throw new Error(`Duplicate day: ${day}`);
        seenDays.add(day);

        const convertedBlocks: TimeBlock[] = [];
        const seenBlocks = new Set<string>();

        for (const block of slots) {
          if (!block.from || !block.to)
            throw new Error(`Fill time block for ${day}`);
          if (!timeOptions.includes(block.from) || !timeOptions.includes(block.to))
            throw new Error(`Invalid time for ${day}`);

          const f24 = convertTo24Hour(block.from);
          const t24 = convertTo24Hour(block.to);

          console.log("from 24 : ",f24);
          console.log("to 24 : ",t24);

          if (timeStringToMinutes(f24) >= timeStringToMinutes(t24)) {
             toast.error(`"From" time must be before "To" time on ${day}`)
             return;
          }
          
         
          const key = `${f24}-${t24}`;
          if (seenBlocks.has(key)) throw new Error(`Duplicate block on ${day}`);
          seenBlocks.add(key);
          convertedBlocks.push({ from: f24, to: t24 });
        }

        convertedAvail.push({ day, slots: convertedBlocks });
      }

      const userData = {
        name: form.name, email: form.email, role: "doctor"
      };
      
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
      if (profilePhoto && typeof profilePhoto !== "string")
        fd.append("photo", profilePhoto);
      if (proofDocuments)
        Array.from(proofDocuments).forEach(f => fd.append("proofDocument", f));

      await axiosInstance.put(`${APIRoutes.ADMIN_UPDATE_USERS}/${id}`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
        // withCredentials: true,
      });
      toast.success("Doctor profile updated");
      navigate("/doctor-profile");
    }catch (err) {
      if(axios.isAxiosError(err)){
         toast.error(err.response?.data?.message || "Update failed");
      }else if(err instanceof Error){
         toast.error(err.message);
      }else{
         toast.error("Failed to Update");
      }
      console.log("error : ", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <SidebarAdmin />
        <main className="flex-1 p-6 overflow-y-auto mt-12">
          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white p-6 shadow rounded">
            <h2 className="text-2xl mb-4">Edit Doctor Profile</h2>

           
            <div className="flex items-center gap-4 mb-4">
              <label htmlFor="photo">
                <img
                  src={typeof profilePhoto === "string" ? profilePhoto : profilePhoto ? URL.createObjectURL(profilePhoto) : assets.upload_area}
                  className="w-16 h-16 rounded-full object-cover bg-gray-100 cursor-pointer"
                  alt="Profile"
                />
              </label>
              <input type="file" id="photo" accept="image/*" hidden onChange={e => setProfilePhoto(e.target.files?.[0] || null)} />
              <span className="text-sm text-gray-600">Change Photo</span>
            </div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
  <div className="flex flex-col">
    <label htmlFor="name" className="mb-1 font-medium">Name</label>
    <input
      id="name"
      name="name"
      value={form.name}
      onChange={handleChange}
      placeholder="Enter your full name"
      className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  <div className="flex flex-col">
    <label htmlFor="email" className="mb-1 font-medium">Email</label>
    <input
      id="email"
      name="email"
      value={form.email}
      onChange={handleChange}
      placeholder="Enter your email"
      className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  <div className="flex flex-col">
    <label htmlFor="educationDetails" className="mb-1 font-medium">Education</label>
    <input
      id="educationDetails"
      name="educationDetails"
      value={form.educationDetails}
      onChange={handleChange}
      placeholder="E.g. MBBS, MD"
      className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  <div className="flex flex-col">
    <label htmlFor="yearOfExperience" className="mb-1 font-medium">Experience (Years)</label>
    <input
      id="yearOfExperience"
      name="yearOfExperience"
      value={form.yearOfExperience}
      onChange={handleChange}
      placeholder="E.g. 5"
      className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  <div className="flex flex-col">
    <label htmlFor="specialization" className="mb-1 font-medium">Specialization</label>
    <select
      id="specialization"
      name="specialization"
      value={form.specialization}
      onChange={handleChange}
      className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="">Select Specialization</option>
      {[
        "General physician",
        "Gynecologist",
        "Dermatologist",
        "Pediatrician",
        "Neurologist",
        "Gastroenterologist",
      ].map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  </div>

  <div className="flex flex-col">
    <label htmlFor="registrationNumber" className="mb-1 font-medium">Registration Number</label>
    <input
      id="registrationNumber"
      name="registrationNumber"
      value={form.registrationNumber}
      onChange={handleChange}
      placeholder="Enter registration number"
      className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  <div className="flex flex-col">
    <label htmlFor="registrationYear" className="mb-1 font-medium">Registration Year</label>
    <input
      id="registrationYear"
      name="registrationYear"
      value={form.registrationYear}
      onChange={handleChange}
      placeholder="E.g. 2018"
      className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  <div className="flex flex-col">
    <label htmlFor="fee" className="mb-1 font-medium">Consultation Fee</label>
    <input
      id="fee"
      name="fee"
      value={form.fee}
      onChange={handleChange}
      placeholder="E.g. 500"
      className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  <div className="flex flex-col md:col-span-2">
    <label htmlFor="documents" className="mb-1 font-medium">Proof Documents (PDF/Image)</label>
    <input
      id="documents"
      type="file"
      accept=".pdf,image/*"
      multiple
      onChange={(e) => setProofDocuments(e.target.files)}
      className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
</div>

<div className="mt-6">
  <label htmlFor="about" className="block mb-1 font-medium text-gray-700">About</label>
  <textarea
    id="about"
    name="about"
    value={form.about}
    onChange={handleChange}
    placeholder="Tell us about yourself"
    rows={4}
    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
</div>


<div className="mt-10">
  <h3 className="text-xl font-semibold text-gray-800 mb-4">Availability</h3>

  <div className="flex flex-col gap-6">
    {form.availability.map((slot, i) => (
      <div key={i} className="border border-gray-200 rounded-xl p-5 bg-white shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex flex-wrap items-center gap-3">
            <label className="text-sm font-medium text-gray-700">Day:</label>
            <select
              value={slot.day}
              onChange={(e) => {
                const selectedDay = e.target.value;
                const isDuplicate = form.availability.some((a, idx) => idx !== i && a.day === selectedDay);
                if (isDuplicate) {
                  toast.error(`Day "${selectedDay}" is already selected.`);
                  return;
                }
                const updated = [...form.availability];
                updated[i].day = selectedDay;
                setForm({ ...form, availability: updated });
              }}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Day</option>
              {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(day => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
          </div>
          <button
            type="button"
            onClick={() => {
              const updated = [...form.availability];
              updated.splice(i, 1);
              setForm({ ...form, availability: updated });
            }}
            className="text-sm text-red-600 hover:underline"
          >
            🗑️ Remove Day
          </button>
        </div>

        {/* Time Slots */}
        <div className="flex flex-wrap gap-3">
          {slot.slots.map((blk, j) => (
            <div
              key={j}
              className="flex flex-wrap sm:flex-nowrap items-center gap-2 border border-gray-300 px-3 py-2 rounded-lg bg-gray-50"
            >
              <select
                value={blk.from}
                onChange={(e) => {
                  const updated = [...form.availability];
                  updated[i].slots[j].from = e.target.value;
                  setForm({ ...form, availability: updated });
                }}
                className="border border-gray-300 px-2 py-1 rounded text-sm focus:outline-none"
              >
                <option value="">From</option>
                {timeOptions.map(t => <option key={t} value={t}>{t}</option>)}
              </select>

              <span className="text-gray-500">to</span>

              <select
                value={blk.to}
                onChange={(e) => {
                  const updated = [...form.availability];
                  updated[i].slots[j].to = e.target.value;
                  setForm({ ...form, availability: updated });
                }}
                className="border border-gray-300 px-2 py-1 rounded text-sm focus:outline-none"
              >
                <option value="">To</option>
                {timeOptions.map(t => <option key={t} value={t}>{t}</option>)}
              </select>

              <button
                type="button"
                onClick={() => {
                  const updated = [...form.availability];
                  updated[i].slots.splice(j, 1);
                  setForm({ ...form, availability: updated });
                }}
                className="text-red-500 text-sm ml-2 hover:underline"
              >
                ❌
              </button>
            </div>
          ))}

         
          <button
            type="button"
            onClick={() => {
              const updated = [...form.availability];
              updated[i].slots.push({ from: "", to: "" });
              setForm({ ...form, availability: updated });
            }}
            className="text-blue-600 text-sm font-medium hover:underline"
          >
            ➕ Add Time Block
          </button>
        </div>
      </div>
    ))}
  </div>


  <div className="mt-6">
    <button
      type="button"
      onClick={() => {
        setForm({
          ...form,
          availability: [...form.availability, { day: "", slots: [{ from: "", to: "" }] }],
        });
      }}
      className="text-green-600 text-sm font-medium hover:underline"
    >
      ➕ Add New Day
    </button>
  </div>
</div>








            {/* Slot Duration */}
            <div className="mt-4">
              <label>Slot Duration (minutes)</label>
              <input type="number" name="slotDuration" value={form.slotDuration} min={10} max={120} onChange={handleChange} className="border px-3 py-2 w-32" />
            </div>

            <button type="submit" className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Update Doctor</button>
          </form>
        </main>
      </div>
    </div>
  );
};

export default EditDoctorProfile;
