

import React from 'react';
import Navbar from '../../components/Navbar'; // Adjust path if needed
import { assets } from '../../assets/assets1';

const MyAppointments: React.FC = () => {
  // Dummy appointment data
  const appointments = [
    {
      _id: '1',
      cancelled: false,
      isCompleted: false,
      payment: false,
      slotDate: '22_07_2025',
      slotTime: '10:00 am',
      docData: {
        name: 'Dr. John Doe',
        speciality: 'Cardiology',
        image: 'https://via.placeholder.com/150x150',
        address: {
          line1: '123 Heart Street',
          line2: 'Healthy City, Careland',
        },
      },
    },
    {
      _id: '2',
      cancelled: true,
      isCompleted: false,
      payment: false,
      slotDate: '23_07_2025',
      slotTime: '11:00 am',
      docData: {
        name: 'Dr. Jane Smith',
        speciality: 'Neurology',
        image: 'https://via.placeholder.com/150x150',
        address: {
          line1: '456 Brain Ave',
          line2: 'Neurotown, Mediland',
        },
      },
    },
  ];

  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];

  const formatDate = (slotDate: string) => {
    const [day, month, year] = slotDate.split('_');
    return `${day} ${months[+month - 1]} ${year}`;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Top Navbar */}
      <Navbar />

      {/* Main content */}
      <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-5xl mx-auto">
        <p className="pb-3 mt-6 text-lg font-medium text-gray-600 border-b">
          My appointments
        </p>

        <div className="mt-4">
          {appointments.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-4 border-b"
            >
              {/* Doctor Image */}
              <div>
                <img
                  className="w-36 bg-[#EAEFFF] rounded-md"
                  src={item.docData.image}
                  alt={item.docData.name}
                />
              </div>

              {/* Doctor Info */}
              <div className="flex-1 text-sm text-[#5E5E5E]">
                <p className="text-[#262626] text-base font-semibold">
                  {item.docData.name}
                </p>
                <p>{item.docData.speciality}</p>
                <p className="text-[#464646] font-medium mt-1">Address:</p>
                <p>{item.docData.address.line1}</p>
                <p>{item.docData.address.line2}</p>
                <p className="mt-1">
                  <span className="text-sm text-[#3C3C3C] font-medium">
                    Date & Time:
                  </span>{' '}
                  {formatDate(item.slotDate)} | {item.slotTime}
                </p>
              </div>

              {/* Appointment Actions */}
              <div className="flex flex-col gap-2 justify-end text-sm text-center">
                {!item.cancelled && !item.payment && !item.isCompleted && (
                  <>
                    <button className="text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300">
                      Pay Online
                    </button>
                    <button className="text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-gray-100 hover:text-white transition-all duration-300 flex items-center justify-center">
                      <img
                        className="max-w-20 max-h-5"
                        src={assets.stripe_logo}
                        alt="Stripe"
                      />
                    </button>
                    <button className="text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-gray-100 hover:text-white transition-all duration-300 flex items-center justify-center">
                      <img
                        className="max-w-20 max-h-5"
                        src={assets.razorpay_logo}
                        alt="Razorpay"
                      />
                    </button>
                    <button className="text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300">
                      Cancel appointment
                    </button>
                  </>
                )}

                {item.payment && !item.isCompleted && (
                  <button className="sm:min-w-48 py-2 border rounded text-[#696969] bg-[#EAEFFF]">
                    Paid
                  </button>
                )}

                {item.isCompleted && (
                  <button className="sm:min-w-48 py-2 border border-green-500 rounded text-green-500">
                    Completed
                  </button>
                )}

                {item.cancelled && !item.isCompleted && (
                  <button className="sm:min-w-48 py-2 border border-red-500 rounded text-red-500">
                    Appointment cancelled
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default MyAppointments;
