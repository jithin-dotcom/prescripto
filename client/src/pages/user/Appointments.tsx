

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { assets } from "../../assets/assets1";
import axiosInstance from "../../utils/axios";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import type { Slot, DoctorProfile, Availability } from "../../interfaces/IAppointments";
import { APIUserRoutes } from "../../constants/routes.constants";
import ConfirmModal from "../../components/ConfirmModal";
import { useNavigate } from "react-router-dom";



function formatTime24to12(time: string): string {
  const [hourStr, minuteStr] = time.split(":");
  let hour = parseInt(hourStr);
  const minute = parseInt(minuteStr);
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;
  return `${hour}:${minute.toString().padStart(2, "0")} ${ampm}`;
}

function convertToMinutes(time: string): number {
  const [hourMin, meridiem] = time.split(" ");
  const [rawHours, minutes] = hourMin.split(":").map(Number);
  let hours = rawHours;
  if (meridiem === "PM" && hours !== 12) hours += 12;
  if (meridiem === "AM" && hours === 12) hours = 0;
  return hours * 60 + minutes;
}


function generateSlots(
  availability: Availability[],
  slotDuration: number,
  bookedSlotsByDate: Record<string, string[]>
): Slot[] {
 
  const today = new Date();
  const result: Slot[] = [];
 
  for (let i = 0; i < 7; i++) {
    const currentDate = new Date();
    currentDate.setDate(today.getDate() + i);

    const dayName = currentDate.toLocaleDateString("en-US", { weekday: "long" });
    const dateStr = currentDate.toLocaleDateString("en-GB"); 

    const booked = new Set(bookedSlotsByDate[dateStr] || []);
    const availabilityForDay = availability.find((a) => a.day === dayName);
    if (!availabilityForDay || availabilityForDay.slots.length === 0) continue;

    const daySlots: string[] = [];

   
    for (const timeRange of availabilityForDay.slots) {
      const [fromHour, fromMinute] = timeRange.from.split(":").map(Number);
      const [toHour, toMinute] = timeRange.to.split(":").map(Number);

      let from = new Date(currentDate);
      from.setHours(fromHour, fromMinute, 0, 0);

      const to = new Date(currentDate);
      to.setHours(toHour, toMinute, 0, 0);

      while (from < to) {
        const timeStr = formatTime24to12(
          `${from.getHours().toString().padStart(2, "0")}:${from.getMinutes().toString().padStart(2, "0")}`
        );

        
        if (!booked.has(timeStr)) {
          daySlots.push(timeStr);
        }
       
        from = new Date(from.getTime() + slotDuration * 60000);
      }
    }


    if (daySlots.length > 0) {
      result.push({
        day: dayName,
        date: dateStr,
        times: [...new Set(daySlots)].sort((a,b) => convertToMinutes(a)-convertToMinutes(b)),
      });
    }
  }
 
  return result;
}

const Appointment: React.FC = () => {
  const { doctorId } = useParams();
  const [doctor, setDoctor] = useState<DoctorProfile | null>(null);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [activeSlotIndex, setActiveSlotIndex] = useState(0);
  const [activeTime, setActiveTime] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const navigate = useNavigate();


  const handleBooking = async () => {
  if (!doctorId || !slots[activeSlotIndex] || !activeTime) return;

  console.log("active time : ", activeTime);
  const selectedSlot = slots[activeSlotIndex];

 
  const [timeStr, period] = activeTime.split(" ");
  const [hourStr, minuteStr] = timeStr.split(":");

  let hour = parseInt(hourStr);
  const minute = parseInt(minuteStr);

  if (period === "PM" && hour !== 12) hour += 12;
  if (period === "AM" && hour === 12) hour = 0;

  const appointmentDateTime = new Date();
  const [day, month, year] = selectedSlot.date.split("/").map(Number); 
  appointmentDateTime.setFullYear(year, month - 1, day);
  appointmentDateTime.setHours(hour, minute, 0, 0);

  const now = new Date();
  const diffInMinutes = (appointmentDateTime.getTime() - now.getTime()) / (1000 * 60);

  if (diffInMinutes < 60) {
    toast.error("Please book at least 1 hour in advance.");
    return;
  }

  try {
     await axiosInstance.post(APIUserRoutes.CREATE_APPOINTMENTS, {
      doctorId,
      date: selectedSlot.date,
      time: activeTime,
    });
   
    toast.success("Make Payment to Confirm your Appointment ");

       
    setSlots(prevSlots => {
      const updated = prevSlots.map((slot, index) => {
        if (index === activeSlotIndex) {
          return {
            ...slot,
            times: slot.times.filter(time => time !== activeTime),
          };
        }
        return slot;
      }).filter(slot => slot.times.length > 0);
      return updated;
    });

   
    const updatedTimes = slots[activeSlotIndex].times.filter(time => time !== activeTime);
    setActiveTime(updatedTimes.length > 0 ? updatedTimes[0] : "");
    navigate("/my-appointments");
  } catch (err) {
    console.log("error : ",err);
   
  }
};


  useEffect(() => {
    async function fetchDoctorProfile() {
      try {
        const res = await axiosInstance.get(`${APIUserRoutes.GET_ALL_APPOINTMENTS}/${doctorId}`);
     
        const firstDoctor = res.data.responses?.[0]?.doctor;

        if (!firstDoctor) {
          toast.error("Doctor not found.");
          return;
        }
       
        const transformedDoctor: DoctorProfile = {
          _id: firstDoctor._id,
          name: firstDoctor.name,
          profilePhoto: firstDoctor.photo,
          specialization: firstDoctor.specialization,
          educationDetails: firstDoctor.educationDetails,
          fee: firstDoctor.fee,
          about: firstDoctor.about,
          isVerified: firstDoctor.isVerified,
          yearOfExperience: firstDoctor.yearOfExperience || 0,
          averageRating: firstDoctor.averageRating || 0,
          ratingCount: firstDoctor.ratingCount || 0,
          availability: firstDoctor.availability || [],
          slotDuration: firstDoctor.slotDuration || 30,
        };

        setDoctor(transformedDoctor);

        const generatedSlots = generateSlots(
          transformedDoctor.availability,
          transformedDoctor.slotDuration,
          res.data?.timeArray,
        );
        setSlots(generatedSlots);
        if (generatedSlots.length > 0 && generatedSlots[0].times.length > 0) {
          setActiveTime(generatedSlots[0].times[0]);
        }
      } catch (err) {
        console.error("Failed to fetch doctor data:", err);
        
      }
    }

    if (doctorId) {
      fetchDoctorProfile();
    }
  }, [doctorId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 flex flex-col">
      <Navbar />
      <main className="flex-1 px-4 sm:px-6 md:px-10 py-8 max-w-6xl mx-auto w-full">
        {doctor ? (
          <>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="glass-effect shadow-2xl rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6 bg-white hover:scale-105 transition duration-300"
            >
              <img
                src={doctor.profilePhoto}
                alt="Doctor"
                className="w-36 h-36 sm:w-40 sm:h-40 rounded-full border-4 border-indigo-200 object-cover"
              />
              <div className="flex-1 text-gray-800 space-y-2 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <h1 className="text-2xl sm:text-3xl font-semibold">{doctor.name}</h1>
                  {doctor.isVerified && (
                    <img
                      src={assets.verified_icon}
                      alt="Verified"
                      className="w-5 h-5"
                      title="Verified Doctor"
                    />
                  )}
                </div>
                <p className="text-sm text-gray-500">
                  {doctor.educationDetails} - {doctor.specialization}
                  <span className="py-0.5 px-2 border text-xs rounded-full ml-2">
                    {doctor.yearOfExperience} years
                  </span>
                </p>
                 {doctor.averageRating !== undefined && doctor.ratingCount !== undefined && (
                        <div className="flex items-center gap-2 mt-1 text-sm text-yellow-600">
                          <span className="font-semibold">{doctor.averageRating.toFixed(1)} {"⭐".repeat(Math.round(doctor.averageRating))}</span>
                          <span className="text-gray-500">({doctor.ratingCount})</span>
                          <span className="py-0.5 px-2 border text-xs rounded-full ml-2 cursor-pointer" onClick={() => {
                              sessionStorage.setItem("doctorId",doctor._id);
                              navigate("/rating");
                          }}>
                              view Rating
                          </span>
                        </div>
                        )}
                <p className="text-gray-600 text-sm">{doctor.about}</p>
                <p className="text-gray-700 font-medium pt-2">
                  Consultation Fee: ₹{doctor.fee}
                </p>
              </div>
            </motion.div>

            {!doctor.isVerified ? (
              <div className="mt-10 text-center text-red-700 font-semibold bg-red-100 p-6 rounded-xl">
                This doctor is not verified. You cannot book appointments.
              </div>
            ) : slots.length > 0 ? (
              <div className="mt-10">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">Available Slots</h2>

                <div className="flex gap-3 overflow-x-auto sm:justify-start pb-2 scrollbar-hide">
                  {slots.map((slot, index) => (
                    <div
                      key={index}
                      className={`min-w-[100px] text-center py-4 px-3 rounded-xl  transition duration-300 ${
                        activeSlotIndex === index
                          ? "bg-indigo-600 text-white"
                          : "bg-white border border-gray-300 text-gray-600 hover:bg-[#4F39F6] hover:text-white cursor-pointer"
                      }`}
                      onClick={() => {
                        setActiveSlotIndex(index);
                        setActiveTime(slot.times[0]);
                      }}
                    >
                      <p className="text-sm font-medium">{slot.day}</p>
                      <p className="text-xs">{slot.date}</p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-10 gap-3 mt-6">
                  {slots[activeSlotIndex]?.times.map((time, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveTime(time)}
                      className={`w-full px-4 py-2 rounded-full text-sm transition ${
                        activeTime === time
                          ? "bg-indigo-600 text-white"
                          : "bg-white border border-gray-400 text-gray-600 hover:bg-[#4F39F6] hover:text-white cursor-pointer"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>

                <div className="mt-8 text-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    // onClick={handleBooking}
                    onClick={() => setShowConfirmModal(true)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full shadow-md cursor-pointer"
                  >
                    Book Appointment
                  </motion.button>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 mt-10">No appointment slots available.</p>
            )}
          </>
        ) : (
          <p className="text-gray-600 text-center mt-20">Loading doctor profile...</p>
        )}

        <ConfirmModal
         isOpen={showConfirmModal}
         onClose={() => setShowConfirmModal(false)}
         onConfirm={handleBooking}
         title="Confirm Appointment Booking"
         description={`Do you want to book an appointment with Dr. ${doctor?.name} at ${activeTime} on ${slots[activeSlotIndex]?.date}?`}
         confirmText="Book"
         cancelText="Cancel"
        />

      </main>
    </div>
  );
};

export default Appointment;




























