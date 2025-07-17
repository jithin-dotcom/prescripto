

// import React, { useState, useEffect } from "react";
// import Navbar from "../../components/NavbarAdmin";
// import SidebarAdmin from "../../components/SideBarAdmin";
// import { assets } from "../../assets/assets2";
// import { toast } from "react-toastify";
// import axiosInstance from "../../utils/axios";
// import { useAuthStore } from "../../store/authStore";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";


// const formatTo12Hour = (time24: string): string => {
//   const [hour, minute] = time24.split(":").map(Number);
//   const ampm = hour >= 12 ? "PM" : "AM";
//   const h12 = hour % 12 === 0 ? 12 : hour % 12;
//   return `${h12}:${minute.toString().padStart(2, "0")} ${ampm}`;
// };

// const convertTo24Hour = (time12: string): string => {
//   const [time, meridian] = time12.split(" ");
//   const timeSlot = time.split(":").map(Number);
//   let h = timeSlot[0];
//   const m = timeSlot[1];
//   if (meridian === "PM" && h < 12) h += 12;
//   if (meridian === "AM" && h === 12) h = 0;
//   return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
// };

//  type AvailabilitySlot = {
//       day: string;
//       from: string;
//       to: string;
//     };
// const generateTimeOptions = () => {
//   const opts: string[] = [];
//   for (let h = 0; h < 24; h++) {
//     for (const m of [0, 30]) {
//       const pm = h >= 12 ? "PM" : "AM";
//       const h12 = h % 12 === 0 ? 12 : h % 12;
//       opts.push(`${h12}:${m === 0 ? "00" : m} ${pm}`);
//     }
//   }
//   return opts;
// };

// const timeOptions = generateTimeOptions();

// const EditDoctor = () => {
//   const { id } = useParams();
//   const { accessToken } = useAuthStore();
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     specialization: "",
//     educationDetails: "",
//     registrationNumber: "",
//     registrationYear: "",
//     yearOfExperience: "",
//     fee: "",
//     about: "",
//     slotDuration: 30,
//     availability: [] as { day: string; from: string; to: string }[],
//   });

//   const [profilePhoto, setProfilePhoto] = useState<File | string | null>(null);
//   const [proofDocuments, setProofDocuments] = useState<FileList | null>(null);

//   useEffect(() => {
//     async function load() {
//       try {
//         const res = await axiosInstance.get(`/admin/get-user/${id}`);
//         const user = res.data.data;
//         const profile = user.profile?.[0] || {};

//         const formattedAvailability = (profile.availability || []).map((s: AvailabilitySlot) => ({
//           day: s.day,
//           from: formatTo12Hour(s.from),
//           to: formatTo12Hour(s.to),
//         }));

//         setForm({
//           name: user.name || "",
//           email: user.email || "",
//           specialization: profile.specialization || "",
//           educationDetails: profile.educationDetails || "",
//           registrationNumber: profile.registrationNumber || "",
//           registrationYear: profile.registrationYear || "",
//           yearOfExperience: profile.yearOfExperience || "",
//           fee: profile.fee || "",
//           about: profile.about || "",
//           slotDuration: profile.slotDuration || 30,
//           availability: formattedAvailability,
//         });

//         if (user.photo) setProfilePhoto(user.photo);
//       } catch (e) {
//         console.error(e);
//         toast.error("Failed to load doctor");
//       }
//     }
//     if (id) load();
//   }, [id]);


//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
//   ) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

  
//     if (!form.name.match(/^[A-Za-z\s]+$/)) return toast.error("Name must contain only letters/spaces");
//     if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) return toast.error("Invalid email");
//     if (!form.educationDetails.match(/^[A-Z\s]+$/)) return toast.error("Education uppercase only");
//     if (!form.registrationNumber.match(/^[a-zA-Z0-9]+$/)) return toast.error("Invalid reg number");
//     if (!form.registrationYear.match(/^\d{4}$/)) return toast.error("Invalid registration year");
//     if (!String(form.yearOfExperience).match(/^\d+$/)) return toast.error("Experience must be numeric");
//     if (!form.specialization) return toast.error("Select a specialization");
//     if (!form.about) return toast.error("Fill in About section");

   
//     const seen = new Set<string>();
   
//     const convertedAvail: AvailabilitySlot[] = [];

//     for (const s of form.availability) {
//       if (!s.day || !s.from || !s.to) return toast.error("Fill all fields in availability");
//       if (seen.has(s.day)) return toast.error(`Duplicate day: ${s.day}`);
//       seen.add(s.day);

//       const from24 = convertTo24Hour(s.from);
//       const to24 = convertTo24Hour(s.to);

//       if (!timeOptions.includes(s.from) || !timeOptions.includes(s.to))
//         return toast.error(`Invalid time select for ${s.day}`);
//       if (from24 >= to24) return toast.error(`From must be before To on ${s.day}`);

//       convertedAvail.push({ day: s.day, from: from24, to: to24 });
//     }

//     const userData = { name: form.name, email: form.email, role: "doctor" };
//     const profileData = {
//       specialization: form.specialization,
//       educationDetails: form.educationDetails,
//       registrationNumber: form.registrationNumber,
//       registrationYear: form.registrationYear,
//       yearOfExperience: form.yearOfExperience,
//       fee: form.fee,
//       about: form.about,
//       slotDuration: form.slotDuration,
//       availability: convertedAvail,
//     };

//     const fd = new FormData();
//     fd.append("userData", JSON.stringify(userData));
//     fd.append("profileData", JSON.stringify(profileData));
//     if (profilePhoto && typeof profilePhoto !== "string") fd.append("photo", profilePhoto);
//     if (proofDocuments) Array.from(proofDocuments).forEach((f) => fd.append("proofDocument", f));

//     try {
//       await axiosInstance.put(`/admin/update-user/${id}`, fd, {
//         headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${accessToken}` },
//         withCredentials: true,
//       });
//       toast.success("Doctor updated");
//       navigate("/doctor-list");
//     } catch (e) {
//       if(axios.isAxiosError(e)){
//          toast.error(e.response?.data?.message || "Update failed")
//       }else{
//          toast.error("Something went wrong")
//       }
      
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col">
//       <Navbar />
//       <div className="flex flex-1 flex-row">
//         <SidebarAdmin />
//         <main className="flex-1 p-6 overflow-y-auto">
//           <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white p-6 shadow rounded">
//             <h2 className="text-2xl mb-4">Edit Doctor</h2>

//               <div className="m-4 flex items-center gap-4">
//                            <label htmlFor="photo">
                             
//                              <img
//                                src={typeof profilePhoto === "string" ? profilePhoto : profilePhoto ? URL.createObjectURL(profilePhoto) : assets.upload_area}
//                                className="w-16 h-16 rounded-full object-cover bg-gray-100 cursor-pointer"
//                                alt="Profile Photo"
//                              />
//                            </label>
//                             <input
//                                type="file"
//                                id="photo"
//                                accept="image/*"
//                                hidden
//                                onChange={(e) => setProfilePhoto(e.target.files?.[0] || null)}
//                              />
//                            <label className="mt-2 text-sm text-gray-600 font-medium">Profile Photo</label>
                        
//                          </div>
           
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//               <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="border px-3 py-2" />
//               <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="border px-3 py-2" />
//               <input name="educationDetails" value={form.educationDetails} onChange={handleChange} placeholder="Education (MBBS/MD)" className="border px-3 py-2" />
//               <input name="yearOfExperience" value={form.yearOfExperience} onChange={handleChange} placeholder="Experience (years)" className="border px-3 py-2" />
//               <select name="specialization" value={form.specialization} onChange={handleChange} className="border px-3 py-2">
//                 <option value="">Select Speciality</option>
//                 {["General physician", "Gynecologist", "Dermatologist", "Pediatricians", "Neurologist", "Gastroenterologist"].map((v) => (
//                   <option key={v} value={v}>{v}</option>
//                 ))}
//               </select>
//               <input name="registrationNumber" value={form.registrationNumber} onChange={handleChange} placeholder="Reg Number" className="border px-3 py-2" />
//               <input name="registrationYear" value={form.registrationYear} onChange={handleChange} placeholder="Reg Year" className="border px-3 py-2" />
//               <input name="fee" value={form.fee} onChange={handleChange} placeholder="Fee" className="border px-3 py-2" />
//               <label className="mt-2 text-sm text-gray-600 font-medium">Upload proof documents (image)</label>
//               <input type="file" accept=".pdf,image/*" multiple onChange={(e) => setProofDocuments(e.target.files)} className="border px-2 py-2 rounded cursor-pointer" />
//             </div>

// {/*          
//             <div className="mt-4 flex items-center gap-4">
//               <label htmlFor="photo">
//                 <img
//                   src={typeof profilePhoto === "string" ? profilePhoto : profilePhoto ? URL.createObjectURL(profilePhoto) : assets.upload_area}
//                   className="w-16 h-16 rounded-full object-cover bg-gray-100 cursor-pointer"
//                   alt="Profile"
//                 />
//               </label>
//               <input id="photo" type="file" accept="image/*" hidden onChange={(e) => setProfilePhoto(e.target.files?.[0] || null)} />
//               <input type="file" accept=".pdf,image/*" multiple onChange={(e) => setProofDocuments(e.target.files)} />
//             </div> */}

//             {/* About */}
//             <textarea
//               name="about"
//               value={form.about}
//               onChange={handleChange}
//               placeholder="About doctor"
//               className="w-full border px-3 py-2 mt-4"
//               rows={4}
//             />

         
//             <div className="mt-6">
//               <h3 className="font-semibold mb-2">Availability Slots</h3>
//               {form.availability.map((s, i) => (
//                 <div key={i} className="flex gap-2 mb-2">
//                   <select
//                     value={s.day}
//                     onChange={(e) => {
//                       const a = [...form.availability];
//                       a[i].day = e.target.value;
//                       setForm({ ...form, availability: a });
//                     }}
//                     className="border px-2 py-1"
//                   >
//                     <option value="">Select Day</option>
//                     {["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"].map((d) => (
//                       <option key={d} value={d}>{d}</option>
//                     ))}
//                   </select>
//                   <select
//                     value={s.from}
//                     onChange={(e) => {
//                       const a = [...form.availability];
//                       a[i].from = e.target.value;
//                       setForm({ ...form, availability: a });
//                     }}
//                     className="border px-2 py-1"
//                   >
//                     <option value="">From</option>
//                     {timeOptions.map((opt) => (
//                       <option key={opt} value={opt}>{opt}</option>
//                     ))}
//                   </select>
//                   <select
//                     value={s.to}
//                     onChange={(e) => {
//                       const a = [...form.availability];
//                       a[i].to = e.target.value;
//                       setForm({ ...form, availability: a });
//                     }}
//                     className="border px-2 py-1"
//                   >
//                     <option value="">To</option>
//                     {timeOptions.map((opt) => (
//                       <option key={opt} value={opt}>{opt}</option>
//                     ))}
//                   </select>
//                   <button
//                     type="button"
//                     className="text-red-500 cursor-pointer"
//                     onClick={() => {
//                       const a = [...form.availability];
//                       a.splice(i, 1);
//                       setForm({ ...form, availability: a });
//                     }}
//                   >
//                     Remove
//                   </button>
//                 </div>
//               ))}
//               <button
//                 type="button"
//                 className="text-blue-600"
//                 onClick={() => setForm({ ...form, availability: [...form.availability, { day: "", from: "", to: "" }] })}
//               >
//                 + Add Slot
//               </button>
//             </div>

//             {/* Slot Duration */}
//             <div className="mt-4">
//               <label>Slot Duration (minutes)</label>
//               <input
//                 type="number"
//                 name="slotDuration"
//                 min={10}
//                 max={120}
//                 value={form.slotDuration}
//                 onChange={handleChange}
//                 className="border px-3 py-2 w-32"
//               />
//             </div>

//             <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded mt-6 hover:bg-blue-700">
//               Update Doctor
//             </button>
//           </form>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default EditDoctor;
























// import React, { useState, useEffect } from "react";
// import Navbar from "../../components/NavbarAdmin";
// import SidebarAdmin from "../../components/SideBarAdmin";
// import { assets } from "../../assets/assets2";
// import { toast } from "react-toastify";
// import axiosInstance from "../../utils/axios";
// import { useAuthStore } from "../../store/authStore";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";

// // Helpers
// const formatTo12Hour = (time24: string): string => {
//   const [hour, minute] = time24.split(":").map(Number);
//   const ampm = hour >= 12 ? "PM" : "AM";
//   const h12 = hour % 12 === 0 ? 12 : hour % 12;
//   return `${h12}:${minute.toString().padStart(2, "0")} ${ampm}`;
// };

// const convertTo24Hour = (time12: string): string => {
//   const [time, meridian] = time12.split(" ");
//   const [h, m] = time.split(":").map(Number);
//   let hour = h;
//   if (meridian === "PM" && h < 12) hour += 12;
//   if (meridian === "AM" && h === 12) hour = 0;
//   return `${hour.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
// };

// const generateTimeOptions = (): string[] => {
//   const opts: string[] = [];
//   for (let h = 0; h < 24; h++) {
//     for (const m of [0, 30]) {
//       const pm = h >= 12 ? "PM" : "AM";
//       const h12 = h % 12 === 0 ? 12 : h % 12;
//       opts.push(`${h12}:${m === 0 ? "00" : m} ${pm}`);
//     }
//   }
//   return opts;
// };

// const timeOptions = generateTimeOptions();

// type AvailabilitySlot = {
//   day: string;
//   from: string;
//   to: string;
// };

// const EditDoctor = () => {
//   const { id } = useParams();
//   const { accessToken } = useAuthStore();
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     specialization: "",
//     educationDetails: "",
//     registrationNumber: "",
//     registrationYear: "",
//     yearOfExperience: "",
//     fee: "",
//     about: "",
//     slotDuration: 30,
//     availability: [] as AvailabilitySlot[],
//   });

//   const [profilePhoto, setProfilePhoto] = useState<File | string | null>(null);
//   const [proofDocuments, setProofDocuments] = useState<FileList | null>(null);

//   useEffect(() => {
//     async function loadDoctor() {
//       try {
//         const res = await axiosInstance.get(`/admin/get-user/${id}`);
//         const user = res.data.data;
//         const profile = user.profile?.[0] || {};

//         const formattedAvailability: AvailabilitySlot[] = (profile.availability || []).map((slot: any) => ({
//           day: slot.day,
//           from: formatTo12Hour(slot.from),
//           to: formatTo12Hour(slot.to),
//         }));

//         setForm({
//           name: user.name || "",
//           email: user.email || "",
//           specialization: profile.specialization || "",
//           educationDetails: profile.educationDetails || "",
//           registrationNumber: profile.registrationNumber || "",
//           registrationYear: profile.registrationYear || "",
//           yearOfExperience: profile.yearOfExperience?.toString() || "",
//           fee: profile.fee?.toString() || "",
//           about: profile.about || "",
//           slotDuration: profile.slotDuration || 30,
//           availability: formattedAvailability,
//         });

//         if (user.photo) setProfilePhoto(user.photo);
//       } catch (err) {
//         console.error(err);
//         toast.error("Failed to load doctor");
//       }
//     }

//     if (id) loadDoctor();
//   }, [id]);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       // Basic validations
//       if (!form.name.match(/^[A-Za-z\s]+$/)) return toast.error("Name must contain only letters");
//       if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) return toast.error("Invalid email");
//       if (!form.educationDetails.match(/^[A-Z\s]+$/)) return toast.error("Education must be in uppercase");
//       if (!form.registrationNumber.match(/^[a-zA-Z0-9]+$/)) return toast.error("Invalid registration number");
//       if (!form.registrationYear.match(/^\d{4}$/)) return toast.error("Invalid registration year");
//       if (isNaN(Number(form.yearOfExperience))) return toast.error("Experience must be numeric");
//       if (!form.specialization) return toast.error("Select specialization");
//       if (!form.about) return toast.error("Fill out the About section");

//       const convertedAvailability: AvailabilitySlot[] = [];
//       const seen = new Set<string>();

//       for (const slot of form.availability) {
//         if (!slot.day || !slot.from || !slot.to) return toast.error("Complete all availability fields");
//         if (seen.has(slot.day)) return toast.error(`Duplicate day: ${slot.day}`);
//         seen.add(slot.day);

//         const from24 = convertTo24Hour(slot.from);
//         const to24 = convertTo24Hour(slot.to);

//         if (!timeOptions.includes(slot.from) || !timeOptions.includes(slot.to))
//           return toast.error(`Invalid time in ${slot.day}`);

//         if (from24 >= to24) return toast.error(`From time must be before To time on ${slot.day}`);

//         convertedAvailability.push({ day: slot.day, from: from24, to: to24 });
//       }

//       const userData = {
//         name: form.name,
//         email: form.email,
//         role: "doctor",
//       };

//       const profileData = {
//         specialization: form.specialization,
//         educationDetails: form.educationDetails,
//         registrationNumber: form.registrationNumber,
//         registrationYear: form.registrationYear,
//         yearOfExperience: Number(form.yearOfExperience),
//         fee: Number(form.fee),
//         about: form.about,
//         slotDuration: Number(form.slotDuration),
//         availability: convertedAvailability,
//       };

//       const fd = new FormData();
//       fd.append("userData", JSON.stringify(userData));
//       fd.append("profileData", JSON.stringify(profileData));
//       if (profilePhoto && typeof profilePhoto !== "string") fd.append("photo", profilePhoto);
//       if (proofDocuments) Array.from(proofDocuments).forEach((f) => fd.append("proofDocument", f));

//       await axiosInstance.put(`/admin/update-user/${id}`, fd, {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           "Content-Type": "multipart/form-data",
//         },
//         withCredentials: true,
//       });

//       toast.success("Doctor updated successfully");
//       navigate("/doctor-list");
//     } catch (err) {
//       if (axios.isAxiosError(err)) {
//         toast.error(err.response?.data?.message || "Update failed");
//       } else {
//         toast.error("Something went wrong");
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col">
//       <Navbar />
//       <div className="flex flex-1">
//         <SidebarAdmin />
//         <main className="flex-1 p-6">
//           <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
//             <h2 className="text-2xl font-semibold mb-4">Edit Doctor</h2>

//             {/* Profile photo */}
//             <div className="mb-4 flex items-center gap-4">
//               <label htmlFor="photo">
//                 <img
//                   src={
//                     typeof profilePhoto === "string"
//                       ? profilePhoto
//                       : profilePhoto
//                       ? URL.createObjectURL(profilePhoto)
//                       : assets.upload_area
//                   }
//                   alt="Profile"
//                   className="w-16 h-16 rounded-full object-cover cursor-pointer"
//                 />
//               </label>
//               <input
//                 type="file"
//                 id="photo"
//                 hidden
//                 accept="image/*"
//                 onChange={(e) => setProfilePhoto(e.target.files?.[0] || null)}
//               />
//               <label className="text-sm text-gray-600">Profile Photo</label>
//             </div>

//             {/* Input Fields */}
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//               <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="border px-3 py-2" />
//               <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="border px-3 py-2" />
//               <input name="educationDetails" value={form.educationDetails} onChange={handleChange} placeholder="Education (MBBS/MD)" className="border px-3 py-2" />
//               <input name="yearOfExperience" value={form.yearOfExperience} onChange={handleChange} placeholder="Experience (Years)" className="border px-3 py-2" />
//               <select name="specialization" value={form.specialization} onChange={handleChange} className="border px-3 py-2">
//                 <option value="">Select Specialization</option>
//                 {["General physician", "Gynecologist", "Dermatologist", "Pediatricians", "Neurologist", "Gastroenterologist"].map((s) => (
//                   <option key={s} value={s}>{s}</option>
//                 ))}
//               </select>
//               <input name="registrationNumber" value={form.registrationNumber} onChange={handleChange} placeholder="Registration Number" className="border px-3 py-2" />
//               <input name="registrationYear" value={form.registrationYear} onChange={handleChange} placeholder="Registration Year" className="border px-3 py-2" />
//               <input name="fee" value={form.fee} onChange={handleChange} placeholder="Consultation Fee" className="border px-3 py-2" />
//               <input type="file" multiple accept=".pdf,image/*" onChange={(e) => setProofDocuments(e.target.files)} className="border p-2" />
//             </div>

//             {/* About */}
//             <textarea
//               name="about"
//               value={form.about}
//               onChange={handleChange}
//               placeholder="About doctor"
//               className="w-full border px-3 py-2 mt-4"
//               rows={4}
//             />

//             {/* Availability */}
//             <div className="mt-6">
//               <h3 className="font-semibold mb-2">Availability Slots</h3>
//               {form.availability.map((slot, i) => (
//                 <div key={i} className="flex gap-2 mb-2">
//                   <select
//                     value={slot.day}
//                     onChange={(e) => {
//                       const updated = [...form.availability];
//                       updated[i].day = e.target.value;
//                       setForm({ ...form, availability: updated });
//                     }}
//                     className="border px-2 py-1"
//                   >
//                     <option value="">Day</option>
//                     {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((d) => (
//                       <option key={d} value={d}>{d}</option>
//                     ))}
//                   </select>
//                   <select
//                     value={slot.from}
//                     onChange={(e) => {
//                       const updated = [...form.availability];
//                       updated[i].from = e.target.value;
//                       setForm({ ...form, availability: updated });
//                     }}
//                     className="border px-2 py-1"
//                   >
//                     <option value="">From</option>
//                     {timeOptions.map((t) => <option key={t} value={t}>{t}</option>)}
//                   </select>
//                   <select
//                     value={slot.to}
//                     onChange={(e) => {
//                       const updated = [...form.availability];
//                       updated[i].to = e.target.value;
//                       setForm({ ...form, availability: updated });
//                     }}
//                     className="border px-2 py-1"
//                   >
//                     <option value="">To</option>
//                     {timeOptions.map((t) => <option key={t} value={t}>{t}</option>)}
//                   </select>
//                   <button
//                     type="button"
//                     onClick={() => {
//                       const updated = [...form.availability];
//                       updated.splice(i, 1);
//                       setForm({ ...form, availability: updated });
//                     }}
//                     className="text-red-500"
//                   >
//                     Remove
//                   </button>
//                 </div>
//               ))}
//               <button
//                 type="button"
//                 onClick={() => setForm({ ...form, availability: [...form.availability, { day: "", from: "", to: "" }] })}
//                 className="text-blue-600"
//               >
//                 + Add Slot
//               </button>
//             </div>

//             {/* Slot duration */}
//             <div className="mt-4">
//               <label>Slot Duration (minutes)</label>
//               <input
//                 type="number"
//                 name="slotDuration"
//                 min={10}
//                 max={120}
//                 value={form.slotDuration}
//                 onChange={handleChange}
//                 className="border px-3 py-2 w-32"
//               />
//             </div>

//             <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded mt-6 hover:bg-blue-700">
//               Update Doctor
//             </button>
//           </form>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default EditDoctor;












// src/pages/admin/EditDoctor.tsx
import React, { useEffect, useState } from "react";
import Navbar from "../../components/NavbarAdmin";
import SidebarAdmin from "../../components/SideBarAdmin";
import { assets } from "../../assets/assets2";
import { toast } from "react-toastify";
import axiosInstance from "../../utils/axios";
import { useAuthStore } from "../../store/authStore";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";



// === Type defs ===
interface TimeBlock { from: string; to: string }
interface AvailabilitySlot { day: string; slots: TimeBlock[] }

// === Helpers ===
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

// === Component ===
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

  // Load and format existing doctor data
  useEffect(() => {
    if (!id) return;
    axiosInstance.get(`/admin/get-user/${id}`)
      .then(res => {
        const user = res.data.data;
        const p = user.profile?.[0] || {};

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

  // Generic field handler
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

      // Process availability
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
        <main className="flex-1 p-6 overflow-y-auto">
          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white p-6 shadow rounded">
            <h2 className="text-2xl mb-4">Edit Doctor (Admin)</h2>

            {/* Photo upload */}
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

            {/* Basic info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="name" value={form.name} onChange={handleFieldChange} placeholder="Name" className="border px-3 py-2" />
              <input name="email" value={form.email} onChange={handleFieldChange} placeholder="Email" className="border px-3 py-2" />
              <input name="educationDetails" value={form.educationDetails} onChange={handleFieldChange} placeholder="Education (MBBS/MD)" className="border px-3 py-2" />
              <input name="yearOfExperience" value={form.yearOfExperience} onChange={handleFieldChange} placeholder="Experience (years)" className="border px-3 py-2" />
              <select name="specialization" value={form.specialization} onChange={handleFieldChange} className="border px-3 py-2">
                <option value="">Select specialization</option>
                {daysOfWeek.map(v => <option key={v} value={v}>{v}</option>)}
              </select>
              <input name="registrationNumber" value={form.registrationNumber} onChange={handleFieldChange} placeholder="Reg Number" className="border px-3 py-2" />
              <input name="registrationYear" value={form.registrationYear} onChange={handleFieldChange} placeholder="Reg Year" className="border px-3 py-2" />
              <input name="fee" value={form.fee} onChange={handleFieldChange} placeholder="Fee" className="border px-3 py-2" />
              <input type="file" multiple accept=".pdf,image/*" className="border" onChange={e => setProofDocuments(e.target.files)} />
            </div>

            <textarea name="about" value={form.about} onChange={handleFieldChange}
              placeholder="About doctor" className="w-full border px-3 py-2 mt-4" rows={4} />

            {/* Availability */}
         
            <div className="mt-6">
  <h3 className="font-semibold mb-3 text-lg">Availability</h3>

  <div className="flex flex-col gap-3">
    {form.availability.map((slot, i) => (
      <div key={i} className="border p-4 rounded bg-gray-50">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium">Day:</label>
            <select
              value={slot.day}
              onChange={(e) => {
              
                const selectedDay = e.target.value;
                const isDuplicate = form.availability.some((a, idx) => idx !== i && a.day === selectedDay);
                if (isDuplicate) {
                  toast.error(`Day "${selectedDay}" is already selected. Cannot add duplicate day`);
                  return;
                }
                
                const updated = [...form.availability];
                updated[i].day = e.target.value;
                setForm({ ...form, availability: updated });
              }}
              className="border px-2 py-1 rounded text-sm"
            >
              <option value="">Select Day</option>
              {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </div>
          <button
            type="button"
            className="text-red-500 text-sm"
            onClick={() => {
              const updated = [...form.availability];
              updated.splice(i, 1);
              setForm({ ...form, availability: updated });
            }}
          >
            Remove Day
          </button>
        </div>

        {/* Time Blocks */}
        <div className="flex flex-wrap gap-3">
          {slot.slots.map((blk, j) => (
            <div key={j} className="flex items-center gap-2 bg-white border px-2 py-1 rounded shadow-sm">
              <select
                value={blk.from}
                onChange={(e) => {
                  const updated = [...form.availability];
                  updated[i].slots[j].from = e.target.value;
                  setForm({ ...form, availability: updated });
                }}
                className="border px-1 py-1 rounded text-sm"
              >
                <option value="">From</option>
                {timeOptions.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>

              <span>-</span>

              <select
                value={blk.to}
                onChange={(e) => {
                  const updated = [...form.availability];
                  updated[i].slots[j].to = e.target.value;
                  setForm({ ...form, availability: updated });
                }}
                className="border px-1 py-1 rounded text-sm"
              >
                <option value="">To</option>
                {timeOptions.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>

              <button
                type="button"
                onClick={() => {
                  const updated = [...form.availability];
                  updated[i].slots.splice(j, 1);
                  setForm({ ...form, availability: updated });
                }}
                className="text-xs text-red-600 ml-2"
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
            className="text-blue-600 text-sm"
          >
            ➕ Add Time Block
          </button>
        </div>
      </div>
    ))}
  </div>

  {/* Add New Day */}
  <button
    type="button"
    className="mt-4 text-green-600 text-sm"
    onClick={() => {
      setForm({
        ...form,
        availability: [...form.availability, { day: "", slots: [{ from: "", to: "" }] }],
      });
    }}
  >
    ➕ Add New Day
  </button>
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
