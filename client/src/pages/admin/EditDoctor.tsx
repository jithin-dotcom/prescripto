

import React, { useEffect, useState } from "react";
import Navbar from "../../components/NavbarAdmin";
import SidebarAdmin from "../../components/SideBarAdmin";
import { assets } from "../../assets/assets2";
import { toast } from "react-toastify";
import axiosInstance from "../../utils/axios";
import { useAuthStore } from "../../store/authStore";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";


interface TimeBlock { from: string; to: string }
interface AvailabilitySlot { day: string; slots: TimeBlock[] }


const daysOfWeek = [ "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday" ];
const generateTimeOptions = (): string[] => {
  const opts: string[] = [];
  for (let h = 0; h < 24; h++) {
    for (const m of [0,30]) {
      const period = h >= 12 ? "PM" : "AM";
      const hour12 = (h % 12) || 12;
      opts.push(`${hour12}:${m.toString().padStart(2,"0")} ${period}`);
    }
  }
  return opts;
};
const timeOptions = generateTimeOptions();
const convertTo24Hour = (t: string): string => {
  const m = /^(\d{1,2}):(\d{2}) (AM|PM)$/.exec(t);
  if (!m) return "00:00";
  let h = parseInt(m[1]);
  const min = parseInt(m[2]);
  const p = m[3];
  if (p === "PM" && h < 12) h += 12;
  if (p === "AM" && h === 12) h = 0;
  return `${h.toString().padStart(2,"0")}:${min.toString().padStart(2,"0")}`;
};
const formatTo12Hour = (t24: string): string => {
  const [h, m] = t24.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const h12 = (h % 12) || 12;
  return `${h12}:${m.toString().padStart(2,"0")} ${period}`;
};


const EditDoctor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { accessToken } = useAuthStore();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "", email: "", specialization: "", educationDetails: "",
    registrationNumber: "", registrationYear: "", yearOfExperience: "",
    fee: "", about: "", slotDuration: 30, availability: [] as AvailabilitySlot[]
  });
  const [profilePhoto, setProfilePhoto] = useState<File|string|null>(null);
  const [proofDocuments, setProofDocuments] = useState<FileList|null>(null);

  
  useEffect(() => {
    if (!id) return;
    axiosInstance.get(`/admin/get-user/${id}`)
      .then(res => {
        const user = res.data.data;
        const p = user.profile?.[0] || {};
        console.log("user.data.data : ", user);
        const availability: AvailabilitySlot[] = (p.availability || []).map((slot: AvailabilitySlot) => ({
          day: slot.day,
          slots: (slot.slots || []).map((b: TimeBlock) => ({
            from: formatTo12Hour(b.from),
            to: formatTo12Hour(b.to)
          }))
        }));

        setForm({
          name: user.name || "",
          email: user.email || "",
          specialization: p.specialization || "",
          educationDetails: p.educationDetails || "",
          registrationNumber: p.registrationNumber || "",
          registrationYear: p.registrationYear || "",
          yearOfExperience: p.yearOfExperience?.toString() || "",
          fee: p.fee?.toString() || "",
          about: p.about || "",
          slotDuration: p.slotDuration || 30,
          availability
        });

        if (user.photo) setProfilePhoto(user.photo);
      })
      .catch(() => toast.error("Failed to load doctor"));
  }, [id]);

 
  const handleFieldChange = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  

  // Submit logic
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Basic validation
      if (!/^[A-Za-z\s]+$/.test(form.name)) throw new Error("Name invalid");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) throw new Error("Email invalid");
      if (!/^[A-Z\s]+$/.test(form.educationDetails)) throw new Error("Education uppercase only");
      if (!/^[a-zA-Z0-9]+$/.test(form.registrationNumber)) throw new Error("Registration invalid");
      if (!/^\d{4}$/.test(form.registrationYear)) throw new Error("Reg year invalid");
      if (isNaN(+form.yearOfExperience)) throw new Error("Experience must be numeric");
      if (isNaN(+form.fee)) throw new Error("Fee must be numeric");

      
      const seenDays = new Set<string>();
      const convertedAvail: AvailabilitySlot[] = [];

      for (const daySlot of form.availability) {
        if (!daySlot.day) throw new Error("Day missing");
        if (seenDays.has(daySlot.day)) throw new Error(`Duplicate ${daySlot.day}`);
        seenDays.add(daySlot.day);

        const seenRanges = new Set<string>();
        const blocks = daySlot.slots.map(b => {
          if (!b.from || !b.to) throw new Error(`Block missing times for ${daySlot.day}`);
          if (!timeOptions.includes(b.from) || !timeOptions.includes(b.to)) throw new Error("Invalid time format");
          const from = convertTo24Hour(b.from);
          const to = convertTo24Hour(b.to);
          if (from >= to) throw new Error(`Start must be before end for ${daySlot.day}`);
          const key = `${from}-${to}`;
          if (seenRanges.has(key)) throw new Error(`Duplicate block ${b.from} - ${b.to}`);
          seenRanges.add(key);
          return { from, to };
        });

        convertedAvail.push({ day: daySlot.day, slots: blocks });
      }

      const fd = new FormData();
      fd.append("userData", JSON.stringify({
        name: form.name, email: form.email, role: "doctor"
      }));
      fd.append("profileData", JSON.stringify({
        specialization: form.specialization,
        educationDetails: form.educationDetails,
        registrationNumber: form.registrationNumber,
        registrationYear: form.registrationYear,
        yearOfExperience: +form.yearOfExperience,
        fee: +form.fee,
        about: form.about,
        slotDuration: form.slotDuration,
        availability: convertedAvail
      }));

      if (profilePhoto && typeof profilePhoto !== "string") fd.append("photo", profilePhoto);
      if (proofDocuments) Array.from(proofDocuments).forEach(f => fd.append("proofDocument", f));

      await axiosInstance.put(`/admin/update-user/${id}`, fd, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`
        },
        withCredentials: true
      });

      toast.success("Doctor profile updated");
      navigate("/doctor-list");
    } catch (ex) {
      if (axios.isAxiosError(ex)) {
        toast.error(ex.response?.data?.message || "Update failed");
      } else {
        toast.error("Failed to update");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <SidebarAdmin />
        <main className="flex-1 p-6 overflow-y-auto mt-12">
          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white p-6 shadow rounded">
            <h2 className="text-2xl mb-4">Edit Doctor </h2>

           
            <div className="flex items-center gap-4 mb-4">
              <label htmlFor="photo">
                <img
                  src={typeof profilePhoto === "string"
                    ? profilePhoto
                    : profilePhoto
                      ? URL.createObjectURL(profilePhoto)
                      : assets.upload_area}
                  className="w-16 h-16 rounded-full object-cover cursor-pointer"
                  alt="Photo"
                />
              </label>
              <input type="file" id="photo" hidden accept="image/*"
                onChange={e => setProfilePhoto(e.target.files?.[0] || null)} />
              <span className="text-sm text-gray-600">Change photo</span>
            </div>


 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  
  <div className="flex flex-col">
    <label htmlFor="name" className="mb-1 text-sm font-medium text-gray-700">Name</label>
    <input
      id="name"
      name="name"
      value={form.name}
      onChange={handleFieldChange}
      className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Enter full name"
    />
  </div>

 
  <div className="flex flex-col">
    <label htmlFor="email" className="mb-1 text-sm font-medium text-gray-700">Email</label>
    <input
      id="email"
      name="email"
      value={form.email}
      onChange={handleFieldChange}
      className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Enter email address"
    />
  </div>

  
  <div className="flex flex-col">
    <label htmlFor="educationDetails" className="mb-1 text-sm font-medium text-gray-700">Education</label>
    <input
      id="educationDetails"
      name="educationDetails"
      value={form.educationDetails}
      onChange={handleFieldChange}
      className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="e.g., MBBS, MD"
    />
  </div>

 
  <div className="flex flex-col">
    <label htmlFor="yearOfExperience" className="mb-1 text-sm font-medium text-gray-700">Experience (years)</label>
    <input
      id="yearOfExperience"
      name="yearOfExperience"
      value={form.yearOfExperience}
      onChange={handleFieldChange}
      className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="e.g., 5"
    />
  </div>

 
  <div className="flex flex-col">
    <label htmlFor="specialization" className="mb-1 text-sm font-medium text-gray-700">Specialization</label>
    <select
      id="specialization"
      name="specialization"
      value={form.specialization}
      onChange={handleFieldChange}
      className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="">Select specialization</option>
      {daysOfWeek.map((v) => (
        <option key={v} value={v}>
          {v}
        </option>
      ))}
    </select>
  </div>

 
  <div className="flex flex-col">
    <label htmlFor="registrationNumber" className="mb-1 text-sm font-medium text-gray-700">Registration Number</label>
    <input
      id="registrationNumber"
      name="registrationNumber"
      value={form.registrationNumber}
      onChange={handleFieldChange}
      className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="e.g., DMC123456"
    />
  </div>

 
  <div className="flex flex-col">
    <label htmlFor="registrationYear" className="mb-1 text-sm font-medium text-gray-700">Registration Year</label>
    <input
      id="registrationYear"
      name="registrationYear"
      value={form.registrationYear}
      onChange={handleFieldChange}
      className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="e.g., 2020"
    />
  </div>

 
  <div className="flex flex-col">
    <label htmlFor="fee" className="mb-1 text-sm font-medium text-gray-700">Consultation Fee (₹)</label>
    <input
      id="fee"
      name="fee"
      value={form.fee}
      onChange={handleFieldChange}
      className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="e.g., 500"
    />
  </div>

 
  <div className="flex flex-col">
    <label htmlFor="documents" className="mb-1 text-sm font-medium text-gray-700">Proof Documents</label>
    <input
      id="documents"
      type="file"
      multiple
      accept=".pdf,image/*"
      className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      onChange={(e) => setProofDocuments(e.target.files)}
    />
  </div>
</div>

{/* About Textarea */}
<div className="mt-6 flex flex-col">
  <label htmlFor="about" className="mb-1 text-sm font-medium text-gray-700">About Doctor</label>
  <textarea
    id="about"
    name="about"
    value={form.about}
    onChange={handleFieldChange}
    className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    rows={4}
    placeholder="Write a brief description about the doctor..."
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

          {/* Add Time Block */}
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

  {/* Add New Day */}
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



            <div className="mt-4">
              <label>Slot duration (min)</label>
              <input type="number" name="slotDuration" min={10} max={120} value={form.slotDuration}
                onChange={handleFieldChange} className="border px-3 py-2 w-32" />
            </div>

            <button type="submit" className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
              Update Doctor
            </button>
          </form>
        </main>
      </div>
    </div>
  );
};

export default EditDoctor;
