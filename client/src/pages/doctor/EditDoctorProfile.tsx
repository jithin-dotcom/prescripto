


// // import React, { useEffect, useState } from "react";
// // import Navbar from "../../components/NavbarAdmin";
// // import SidebarAdmin from "../../components/SideBarAdmin";
// // import { assets } from "../../assets/assets2";
// // import { toast } from "react-toastify";
// // import axiosInstance from "../../utils/axios";
// // import { useAuthStore } from "../../store/authStore";
// // import { useParams, useNavigate } from "react-router-dom";
// // import axios from "axios";

// // type AvailabilitySlot = { day: string; from: string; to: string };

// // const formatTo12Hour = (time24: string): string => {
// //   const [h, m] = time24.split(":").map(Number);
// //   const ampm = h >= 12 ? "PM" : "AM";
// //   const hour = h % 12 === 0 ? 12 : h % 12;
// //   return `${hour}:${m.toString().padStart(2, "0")} ${ampm}`;
// // };


// // const convertTo24Hour = (time12: string): string => {
// //   const time12Regex = /^(\d{1,2}):(\d{2}) (AM|PM)$/;
// //   const match = time12.match(time12Regex);

// //   if (!match) return "00:00"; 

// //   const [_, hours, minutes, ampm] = match;
// //   console.log(_);
// //   let h = parseInt(hours, 10);
// //   const m = parseInt(minutes, 10);

// //   if (ampm === "PM" && h < 12) h += 12;
// //   if (ampm === "AM" && h === 12) h = 0;

// //   return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
// // };


// // const generateTimeOptions = (): string[] => {
// //   const opts: string[] = [];
// //   for (let h = 0; h < 24; h++) {
// //     for (const m of [0, 30]) {
// //       const ampm = h >= 12 ? "PM" : "AM";
// //       const hour = h % 12 === 0 ? 12 : h % 12;
// //       opts.push(`${hour}:${m === 0 ? "00" : m} ${ampm}`);
// //     }
// //   }
// //   return opts;
// // };

// // const timeOptions = generateTimeOptions();

// // const EditDoctorProfile = () => {
// //   const [form, setForm] = useState({
// //     name: "",
// //     email: "",
// //     specialization: "",
// //     educationDetails: "",
// //     registrationNumber: "",
// //     registrationYear: "",
// //     yearOfExperience: "",
// //     fee: "",
// //     about: "",
// //     slotDuration: 30,
// //     availability: [] as AvailabilitySlot[],
// //   });

// //   const [profilePhoto, setProfilePhoto] = useState<File | string | null>(null);
// //   const [proofDocuments, setProofDocuments] = useState<FileList | null>(null);
// //   const { id } = useParams();
// //   const { accessToken } = useAuthStore();
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     async function loadDoctor() {
// //       try {
// //         const res = await axiosInstance.get(`/admin/get-user/${id}`);
// //         const user = res.data.data;
// //         const profile = user.profile?.[0] || {};

// //         const formattedAvailability = (profile.availability || []).map((slot: AvailabilitySlot) => ({
// //           day: slot.day,
// //           from: formatTo12Hour(slot.from),
// //           to: formatTo12Hour(slot.to),
// //         }));

// //         setForm({
// //           name: user.name || "",
// //           email: user.email || "",
// //           specialization: profile.specialization || "",
// //           educationDetails: profile.educationDetails || "",
// //           registrationNumber: profile.registrationNumber || "",
// //           registrationYear: profile.registrationYear || "",
// //           yearOfExperience: profile.yearOfExperience || "",
// //           fee: profile.fee || "",
// //           about: profile.about || "",
// //           slotDuration: profile.slotDuration || 30,
// //           availability: formattedAvailability,
// //         });

// //         if (user.photo) setProfilePhoto(user.photo);
// //       } catch (e) {
// //         console.error(e);
// //         toast.error("Failed to load doctor info");
// //       }
// //     }

// //     if (id) loadDoctor();
// //   }, [id]);

// //   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
// //     setForm({ ...form, [e.target.name]: e.target.value });
// //   };

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();

// //     if (!form.name.match(/^[A-Za-z\s]+$/)) return toast.error("Name must contain only letters/spaces");
// //     if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) return toast.error("Invalid email");
// //     if (!form.educationDetails.match(/^[A-Z\s]+$/)) return toast.error("Education uppercase only");
// //     if (!form.registrationNumber.match(/^[a-zA-Z0-9]+$/)) return toast.error("Invalid registration number");
// //     if (!form.registrationYear.match(/^\d{4}$/)) return toast.error("Invalid registration year");
// //     if (!String(form.yearOfExperience).match(/^\d+$/)) return toast.error("Experience must be numeric");
// //     if (!form.specialization) return toast.error("Select a specialization");
// //     if (!form.about) return toast.error("Fill in About section");

// //     const seen = new Set<string>();
// //     const convertedAvail: AvailabilitySlot[] = [];

// //     for (const slot of form.availability) {
// //       if (!slot.day || !slot.from || !slot.to) return toast.error("Fill all fields in availability");
// //       if (seen.has(slot.day)) return toast.error(`Duplicate day: ${slot.day}`);
// //       seen.add(slot.day);


// //       const from24 = convertTo24Hour(slot.from);
// //       const to24 = convertTo24Hour(slot.to);

// //       console.log("from24 : ",from24);
// //       console.log("to24 : ",to24);

// //       if (!timeOptions.includes(slot.from) || !timeOptions.includes(slot.to)) {
// //         return toast.error(`Invalid time selected for ${slot.day}`);
// //       }
// //       if (from24 >= to24) return toast.error(`From must be before To on ${slot.day}`);

// //       convertedAvail.push({ day: slot.day, from: from24, to: to24 });
// //     }

// //     const userData = { name: form.name, email: form.email, role: "doctor" };
// //     const profileData = {
// //       specialization: form.specialization,
// //       educationDetails: form.educationDetails,
// //       registrationNumber: form.registrationNumber,
// //       registrationYear: form.registrationYear,
// //       yearOfExperience: form.yearOfExperience,
// //       fee: form.fee,
// //       about: form.about,
// //       availability: convertedAvail,
// //       slotDuration: form.slotDuration,
// //     };

// //     const fd = new FormData();
// //     fd.append("userData", JSON.stringify(userData));
// //     fd.append("profileData", JSON.stringify(profileData));
// //     if (profilePhoto && typeof profilePhoto !== "string") fd.append("photo", profilePhoto);
// //     if (proofDocuments) Array.from(proofDocuments).forEach((f) => fd.append("proofDocument", f));

// //     try {
// //       await axiosInstance.put(`/admin/update-user/${id}`, fd, {
// //         headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${accessToken}` },
// //         withCredentials: true,
// //       });
// //       toast.success("Doctor profile updated");
// //       navigate("/doctor-profile");
// //     } catch (e) {
// //       if (axios.isAxiosError(e)) {
// //         toast.error(e.response?.data?.message || "Update failed");
// //       } else {
// //         toast.error("Something went wrong");
// //       }
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-100 flex flex-col">
// //       <Navbar />
// //       <div className="flex flex-1 flex-row">
// //         <SidebarAdmin />
// //         <main className="flex-1 p-6 overflow-y-auto">
// //           <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white p-6 shadow rounded">
// //             <h2 className="text-2xl mb-4">Edit Doctor Profile</h2>

// //             <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
// //               <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="border px-3 py-2" />
// //               <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="border px-3 py-2" />
// //               <input name="educationDetails" value={form.educationDetails} onChange={handleChange} placeholder="Education (MBBS/MD)" className="border px-3 py-2" />
// //               <input name="yearOfExperience" value={form.yearOfExperience} onChange={handleChange} placeholder="Experience (years)" className="border px-3 py-2" />
// //               <select name="specialization" value={form.specialization} onChange={handleChange} className="border px-3 py-2">
// //                 <option value="">Select Speciality</option>
// //                 {["General physician", "Gynecologist", "Dermatologist", "Pediatricians", "Neurologist", "Gastroenterologist"].map((v) => (
// //                   <option key={v} value={v}>{v}</option>
// //                 ))}
// //               </select>
// //               <input name="registrationNumber" value={form.registrationNumber} onChange={handleChange} placeholder="Reg Number" className="border px-3 py-2" />
// //               <input name="registrationYear" value={form.registrationYear} onChange={handleChange} placeholder="Reg Year" className="border px-3 py-2" />
// //               <input name="fee" value={form.fee} onChange={handleChange} placeholder="Fee" className="border px-3 py-2" />
// //             </div>

// //             <div className="mt-4 flex items-center gap-4">
// //               <label htmlFor="photo">
// //                 <img
// //                   src={typeof profilePhoto === "string" ? profilePhoto : profilePhoto ? URL.createObjectURL(profilePhoto) : assets.upload_area}
// //                   className="w-16 h-16 rounded-full object-cover bg-gray-100 cursor-pointer"
// //                   alt="Profile"
// //                 />
// //               </label>
// //               <input id="photo" type="file" accept="image/*" hidden onChange={(e) => setProfilePhoto(e.target.files?.[0] || null)} />
// //               <input type="file" accept=".pdf,image/*" multiple onChange={(e) => setProofDocuments(e.target.files)} />
// //             </div>

// //             <textarea
// //               name="about"
// //               value={form.about}
// //               onChange={handleChange}
// //               placeholder="About doctor"
// //               className="w-full border px-3 py-2 mt-4"
// //               rows={4}
// //             />

// //             <div className="mt-6">
// //               <h3 className="font-semibold mb-2">Availability Slots</h3>
// //               {form.availability.map((s, i) => (
// //                 <div key={i} className="flex gap-2 mb-2">
// //                   <select value={s.day} onChange={(e) => {
// //                     const updated = [...form.availability];
// //                     updated[i].day = e.target.value;
// //                     setForm({ ...form, availability: updated });
// //                   }} className="border px-2 py-1">
// //                     <option value="">Select Day</option>
// //                     {["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"].map(d => (
// //                       <option key={d} value={d}>{d}</option>
// //                     ))}
// //                   </select>
// //                   <select value={s.from} onChange={(e) => {
// //                     const updated = [...form.availability];
// //                     updated[i].from = e.target.value;
// //                     setForm({ ...form, availability: updated });
// //                   }} className="border px-2 py-1">
// //                     <option value="">From</option>
// //                     {timeOptions.map(opt => (
// //                       <option key={opt} value={opt}>{opt}</option>
// //                     ))}
// //                   </select>
// //                   <select value={s.to} onChange={(e) => {
// //                     const updated = [...form.availability];
// //                     updated[i].to = e.target.value;
// //                     setForm({ ...form, availability: updated });
// //                   }} className="border px-2 py-1">
// //                     <option value="">To</option>
// //                     {timeOptions.map(opt => (
// //                       <option key={opt} value={opt}>{opt}</option>
// //                     ))}
// //                   </select>
// //                   <button type="button" className="text-red-500 cursor-pointer" onClick={() => {
// //                     const updated = [...form.availability];
// //                     updated.splice(i, 1);
// //                     setForm({ ...form, availability: updated });
// //                   }}>
// //                     Remove
// //                   </button>
// //                 </div>
// //               ))}
// //               <button type="button" onClick={() => setForm({ ...form, availability: [...form.availability, { day: "", from: "", to: "" }] })} className="text-blue-600">
// //                 + Add Slot
// //               </button>
// //             </div>

// //             {/* <div className="mt-4">
// //               <label>Slot Duration (minutes)</label>
// //               <input type="number" name="slotDuration" value={form.slotDuration} min={10} max={120} onChange={handleChange} className="border px-3 py-2 w-32" />
// //             </div> */}

// //             <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded mt-6 hover:bg-blue-700">
// //               Update Doctor
// //             </button>
// //           </form>
// //         </main>
// //       </div>
// //     </div>
// //   );
// // };

// // export default EditDoctorProfile;















// import React, { useEffect, useState } from "react";
// import Navbar from "../../components/NavbarAdmin";
// import SidebarAdmin from "../../components/SideBarAdmin";
// import { assets } from "../../assets/assets2";
// import { toast } from "react-toastify";
// import axiosInstance from "../../utils/axios";
// import { useAuthStore } from "../../store/authStore";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// type AvailabilitySlot = { day: string; from: string; to: string };

// const formatTo12Hour = (time24: string): string => {
//   const [h, m] = time24.split(":").map(Number);
//   const ampm = h >= 12 ? "PM" : "AM";
//   const hour = h % 12 === 0 ? 12 : h % 12;
//   return `${hour}:${m.toString().padStart(2, "0")} ${ampm}`;
// };


// const convertTo24Hour = (time12: string): string => {
//   const time12Regex = /^(\d{1,2}):(\d{2}) (AM|PM)$/;
//   const match = time12.match(time12Regex);

//   if (!match) return "00:00"; 

//   const [_, hours, minutes, ampm] = match;
//   console.log(_);
//   let h = parseInt(hours, 10);
//   const m = parseInt(minutes, 10);

//   if (ampm === "PM" && h < 12) h += 12;
//   if (ampm === "AM" && h === 12) h = 0;

//   return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
// };


// const generateTimeOptions = (): string[] => {
//   const opts: string[] = [];
//   for (let h = 0; h < 24; h++) {
//     for (const m of [0, 30]) {
//       const ampm = h >= 12 ? "PM" : "AM";
//       const hour = h % 12 === 0 ? 12 : h % 12;
//       opts.push(`${hour}:${m === 0 ? "00" : m} ${ampm}`);
//     }
//   }
//   return opts;
// };

// const timeOptions = generateTimeOptions();

// const EditDoctorProfile = () => {
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
//   const { id } = useParams();
//   const { accessToken } = useAuthStore();
//   const navigate = useNavigate();

//   useEffect(() => {
//     async function loadDoctor() {
//       try {
//         const res = await axiosInstance.get(`/admin/get-user/${id}`);
//         const user = res.data.data;
//         const profile = user.profile?.[0] || {};

//         const formattedAvailability = (profile.availability || []).map((slot: AvailabilitySlot) => ({
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
//           yearOfExperience: profile.yearOfExperience || "",
//           fee: profile.fee || "",
//           about: profile.about || "",
//           slotDuration: profile.slotDuration || 30,
//           availability: formattedAvailability,
//         });

//         if (user.photo) setProfilePhoto(user.photo);
//       } catch (e) {
//         console.error(e);
//         toast.error("Failed to load doctor info");
//       }
//     }

//     if (id) loadDoctor();
//   }, [id]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!form.name.match(/^[A-Za-z\s]+$/)) return toast.error("Name must contain only letters/spaces");
//     if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) return toast.error("Invalid email");
//     if (!form.educationDetails.match(/^[A-Z\s]+$/)) return toast.error("Education uppercase only");
//     if (!form.registrationNumber.match(/^[a-zA-Z0-9]+$/)) return toast.error("Invalid registration number");
//     if (!form.registrationYear.match(/^\d{4}$/)) return toast.error("Invalid registration year");
//     if (!String(form.yearOfExperience).match(/^\d+$/)) return toast.error("Experience must be numeric");
//     if (!form.specialization) return toast.error("Select a specialization");
//     if (!form.about) return toast.error("Fill in About section");

//     const seen = new Set<string>();
//     const convertedAvail: AvailabilitySlot[] = [];

//     for (const slot of form.availability) {
//       if (!slot.day || !slot.from || !slot.to) return toast.error("Fill all fields in availability");
//       if (seen.has(slot.day)) return toast.error(`Duplicate day: ${slot.day}`);
//       seen.add(slot.day);


//       const from24 = convertTo24Hour(slot.from);
//       const to24 = convertTo24Hour(slot.to);

//       console.log("from24 : ",from24);
//       console.log("to24 : ",to24);

//       if (!timeOptions.includes(slot.from) || !timeOptions.includes(slot.to)) {
//         return toast.error(`Invalid time selected for ${slot.day}`);
//       }
//       if (from24 >= to24) return toast.error(`From must be before To on ${slot.day}`);

//       convertedAvail.push({ day: slot.day, from: from24, to: to24 });
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
//       availability: convertedAvail,
//       slotDuration: form.slotDuration,
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
//       toast.success("Doctor profile updated");
//       navigate("/doctor-profile");
//     } catch (e) {
//       if (axios.isAxiosError(e)) {
//         toast.error(e.response?.data?.message || "Update failed");
//       } else {
//         toast.error("Something went wrong");
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
//             <h2 className="text-2xl mb-4">Edit Doctor Profile</h2>

//             <div className="m-4 flex items-center gap-4">
//               <label htmlFor="photo">
                
//                 <img
//                   src={typeof profilePhoto === "string" ? profilePhoto : profilePhoto ? URL.createObjectURL(profilePhoto) : assets.upload_area}
//                   className="w-16 h-16 rounded-full object-cover bg-gray-100 cursor-pointer"
//                   alt="Profile Photo"
//                 />
//               </label>
//                <input
//                   type="file"
//                   id="photo"
//                   accept="image/*"
//                   hidden
//                   onChange={(e) => setProfilePhoto(e.target.files?.[0] || null)}
//                 />
//               <label className="mt-2 text-sm text-gray-600 font-medium">Profile Photo</label>
           
//             </div>

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
//                   <select value={s.day} onChange={(e) => {
//                     const updated = [...form.availability];
//                     updated[i].day = e.target.value;
//                     setForm({ ...form, availability: updated });
//                   }} className="border px-2 py-1">
//                     <option value="">Select Day</option>
//                     {["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"].map(d => (
//                       <option key={d} value={d}>{d}</option>
//                     ))}
//                   </select>
//                   <select value={s.from} onChange={(e) => {
//                     const updated = [...form.availability];
//                     updated[i].from = e.target.value;
//                     setForm({ ...form, availability: updated });
//                   }} className="border px-2 py-1">
//                     <option value="">From</option>
//                     {timeOptions.map(opt => (
//                       <option key={opt} value={opt}>{opt}</option>
//                     ))}
//                   </select>
//                   <select value={s.to} onChange={(e) => {
//                     const updated = [...form.availability];
//                     updated[i].to = e.target.value;
//                     setForm({ ...form, availability: updated });
//                   }} className="border px-2 py-1">
//                     <option value="">To</option>
//                     {timeOptions.map(opt => (
//                       <option key={opt} value={opt}>{opt}</option>
//                     ))}
//                   </select>
//                   <button type="button" className="text-red-500 cursor-pointer" onClick={() => {
//                     const updated = [...form.availability];
//                     updated.splice(i, 1);
//                     setForm({ ...form, availability: updated });
//                   }}>
//                     Remove
//                   </button>
//                 </div>
//               ))}
//               <button type="button" onClick={() => setForm({ ...form, availability: [...form.availability, { day: "", from: "", to: "" }] })} className="text-blue-600 cursor-pointer">
//                 + Add Slot
//               </button>
//             </div>

//             <div className="mt-4">
//               <label>Slot Duration (minutes)</label>
//               <input type="number" name="slotDuration" value={form.slotDuration} min={10} max={120} onChange={handleChange} className="border px-3 py-2 w-32" />
//             </div>

//             <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded mt-6 hover:bg-blue-700 cursor-pointer">
//               Update Doctor
//             </button>
//           </form>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default EditDoctorProfile;











import React, { useEffect, useState } from "react";
import Navbar from "../../components/NavbarAdmin";
import SidebarAdmin from "../../components/SideBarAdmin";
import { assets } from "../../assets/assets2";
import { toast } from "react-toastify";
import axiosInstance from "../../utils/axios";
import { useAuthStore } from "../../store/authStore";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";


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
  const { accessToken } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    axiosInstance.get(`/admin/get-user/${id}`)
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
      // Basic validation (name, email, etc.)
      if (!form.name.match(/^[A-Za-z\s]+$/)) throw new Error("Name must be letters/spaces");
      if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) throw new Error("Invalid email");
      if (!form.educationDetails.match(/^[A-Z\s]+$/)) throw new Error("Education uppercase only");
      if (!form.registrationNumber.match(/^[a-zA-Z0-9]+$/)) throw new Error("Invalid Reg Number");
      if (!form.registrationYear.match(/^\d{4}$/)) throw new Error("Invalid Reg Year");
      // if (!form.yearOfExperience.match(/^\d+$/)) throw new Error("Invalid Experience");
      const experience = Number(form.yearOfExperience);
      if (isNaN(experience)) throw new Error("Invalid Experience");
      form.yearOfExperience = experience.toString();
      if (!form.specialization || !form.about) throw new Error("Fill all profile fields");

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
          
          // if (f24 >= t24) throw new Error(`From must be before To on ${day}`);
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

      await axiosInstance.put(`/admin/update-user/${id}`, fd, {
        headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${accessToken}` },
        withCredentials: true,
      });
      toast.success("Doctor profile updated");
      navigate("/doctor-profile");
    }catch (err) {
      if(axios.isAxiosError(err)){
         toast.error(err.response?.data?.message || "Update failed");
      }else{
         toast.error("Failed to Update");
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
            <h2 className="text-2xl mb-4">Edit Doctor Profile</h2>

            {/* Profile Photo */}
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

            {/* Profile Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="border px-3 py-2" />
              <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="border px-3 py-2" />
              <input name="educationDetails" value={form.educationDetails} onChange={handleChange} placeholder="Education (MBBS/MD)" className="border px-3 py-2" />
              <input name="yearOfExperience" value={form.yearOfExperience} onChange={handleChange} placeholder="Experience (years)" className="border px-3 py-2" />
              <select name="specialization" value={form.specialization} onChange={handleChange} className="border px-3 py-2">
                <option value="">Select Specialization</option>
                {["General physician","Gynecologist","Dermatologist","Pediatrician","Neurologist","Gastroenterologist"].map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <input name="registrationNumber" value={form.registrationNumber} onChange={handleChange} placeholder="Reg Number" className="border px-3 py-2" />
              <input name="registrationYear" value={form.registrationYear} onChange={handleChange} placeholder="Reg Year" className="border px-3 py-2" />
              <input name="fee" value={form.fee} onChange={handleChange} placeholder="Fee" className="border px-3 py-2" />
              <input type="file" accept=".pdf,image/*" multiple onChange={e => setProofDocuments(e.target.files)} className="border px-3 py-2" />
            </div>

            {/* About */}
            <textarea name="about" value={form.about} onChange={handleChange} placeholder="About" className="w-full border px-3 py-2 mt-4" rows={4} />

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
