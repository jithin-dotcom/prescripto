

// // Appointment.tsx
// import React from 'react';
// import { assets } from '../../assets/assets1';
// // import RelatedDoctors from '../components/RelatedDoctors';

// const Appointment: React.FC = () => {
//   // Dummy doctor data (replace with your own logic or fetched data)
//   const doctor = {
//     name: 'Dr. John Doe',
//     image: 'https://via.placeholder.com/300x400', // Replace with your actual image URL
//     degree: 'MD',
//     speciality: 'Cardiology',
//     experience: '10 years',
//     about: 'Experienced cardiologist with a passion for patient care. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     fees: '100'
//   };

//   // Dummy booking slots data
//   const slots = [
//     {
//       day: 'MON',
//       date: '22',
//       times: ['10:00 am', '10:30 am', '11:00 am']
//     },
//     {
//       day: 'TUE',
//       date: '23',
//       times: ['10:00 am', '10:30 am', '11:00 am']
//     },
//     {
//       day: 'WED',
//       date: '24',
//       times: ['10:00 am', '10:30 am', '11:00 am']
//     }
//   ];

//   // Note: You can add state and logic here later.
//   // For now, we use the first day and first time as active.
//   const activeSlotIndex = 0;
//   const activeTime = slots[0].times[0];

//   return (
//     <div className="p-4">
//       {/* ---------- Doctor Details ----------- */}
//       <div className="flex flex-col sm:flex-row gap-4">
//         <div>
//           <img
//             className="bg-primary w-full sm:max-w-72 rounded-lg"
//             src={doctor.image}
//             alt="Doctor"
//           />
//         </div>
//         <div className="flex-1 border border-[#ADADAD] rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
//           {/* Doctor Info: name, degree, experience */}
//           <p className="flex items-center gap-2 text-3xl font-medium text-gray-700">
//             {doctor.name}
//             <img className="w-5" src={assets.verified_icon} alt="Verified" />
//           </p>
//           <div className="flex items-center gap-2 mt-1 text-gray-600">
//             <p>
//               {doctor.degree} - {doctor.speciality}
//             </p>
//             <button className="py-0.5 px-2 border text-xs rounded-full">
//               {doctor.experience}
//             </button>
//           </div>
//           {/* About Doctor */}
//           <div>
//             <p className="flex items-center gap-1 text-sm font-medium text-[#262626] mt-3">
//               About <img className="w-3" src={assets.info_icon} alt="Info" />
//             </p>
//             <p className="text-sm text-gray-600 max-w-[700px] mt-1">
//               {doctor.about}
//             </p>
//           </div>
//           <p className="text-gray-600 font-medium mt-4">
//             Appointment fee:{' '}
//             <span className="text-gray-800">${doctor.fees}</span>
//           </p>
//         </div>
//       </div>

//       {/* ---------- Booking Slots ----------- */}
//       <div className="sm:ml-72 sm:pl-4 mt-8 font-medium text-[#565656]">
//         <p>Booking slots</p>
//         <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
//           {slots.map((slot, index) => (
//             <div
//               key={index}
//               // Later, add an onClick that will update the active slot index.
//               className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
//                 activeSlotIndex === index
//                   ? 'bg-primary text-white'
//                   : 'border border-[#DDDDDD]'
//               }`}
//             >
//               <p>{slot.day}</p>
//               <p>{slot.date}</p>
//             </div>
//           ))}
//         </div>

//         <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
//           {slots[activeSlotIndex].times.map((time, index) => (
//             <p
//               key={index}
//               // Later, add an onClick to set the active time slot.
//               className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
//                 activeTime === time
//                   ? 'bg-primary text-white'
//                   : 'text-[#949494] border border-[#B4B4B4]'
//               }`}
//             >
//               {time.toLowerCase()}
//             </p>
//           ))}
//         </div>

//         <button
//           // Later, add your onClick handler for booking the appointment
//           className="bg-primary text-white text-sm font-light px-20 py-3 rounded-full my-6"
//         >
//           Book an appointment
//         </button>
//       </div>

//       {/* ---------- Listing Related Doctors ----------- */}
//       {/* <RelatedDoctors speciality={doctor.speciality} docId="dummy-id" /> */}
//     </div>
//   );
// };

// export default Appointment;







import React from 'react';
import Navbar from '../../components/Navbar'; // adjust the path if needed
import { assets } from '../../assets/assets1';
// import RelatedDoctors from '../../components/RelatedDoctors';

const Appointment: React.FC = () => {
  const doctor = {
    name: 'Dr. John Doe',
    image: 'https://via.placeholder.com/300x400',
    degree: 'MD',
    speciality: 'Cardiology',
    experience: '10 years',
    about:
      'Experienced cardiologist with a passion for patient care. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    fees: '100',
  };

  const slots = [
    {
      day: 'MON',
      date: '22',
      times: ['10:00 am', '10:30 am', '11:00 am'],
    },
    {
      day: 'TUE',
      date: '23',
      times: ['10:00 am', '10:30 am', '11:00 am'],
    },
    {
      day: 'WED',
      date: '24',
      times: ['10:00 am', '10:30 am', '11:00 am'],
    },
  ];

  const activeSlotIndex = 0;
  const activeTime = slots[0].times[0];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Top Navbar */}
      <Navbar />

      {/* Main content */}
      <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-5xl mx-auto">
        {/* Doctor Details */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <img
              className="bg-primary w-full sm:max-w-72 rounded-lg"
              src={doctor.image}
              alt="Doctor"
            />
          </div>

          <div className="flex-1 border border-[#ADADAD] rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
            <p className="flex items-center gap-2 text-3xl font-medium text-gray-700">
              {doctor.name}
              <img className="w-5" src={assets.verified_icon} alt="Verified" />
            </p>
            <div className="flex items-center gap-2 mt-1 text-gray-600">
              <p>
                {doctor.degree} - {doctor.speciality}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-full">
                {doctor.experience}
              </button>
            </div>

            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-[#262626] mt-3">
                About <img className="w-3" src={assets.info_icon} alt="Info" />
              </p>
              <p className="text-sm text-gray-600 max-w-[700px] mt-1">
                {doctor.about}
              </p>
            </div>

            <p className="text-gray-600 font-medium mt-4">
              Appointment fee:{' '}
              <span className="text-gray-800">${doctor.fees}</span>
            </p>
          </div>
        </div>

        {/* Booking Slots */}
        <div className="mt-8 font-medium text-[#565656]">
          <p>Booking slots</p>
          <div className="flex gap-3 items-center w-full overflow-x-auto mt-4 pb-2">
            {slots.map((slot, index) => (
              <div
                key={index}
                className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                  activeSlotIndex === index
                    ? 'bg-primary text-white'
                    : 'border border-[#DDDDDD]'
                }`}
              >
                <p>{slot.day}</p>
                <p>{slot.date}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3 w-full overflow-x-auto mt-4 pb-2">
            {slots[activeSlotIndex].times.map((time, index) => (
              <p
                key={index}
                className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                  activeTime === time
                    ? 'bg-primary text-white'
                    : 'text-[#949494] border border-[#B4B4B4]'
                }`}
              >
                {time.toLowerCase()}
              </p>
            ))}
          </div>

          <button className="bg-primary text-white text-sm font-light px-20 py-3 rounded-full my-6">
            Book an appointment
          </button>
        </div>

        {/* Related Doctors */}
        {/* <RelatedDoctors speciality={doctor.speciality} docId="dummy-id" /> */}
      </main>
    </div>
  );
};

export default Appointment;
