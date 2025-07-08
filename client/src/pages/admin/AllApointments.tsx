
import Navbar from "../../components/NavbarAdmin";
import SidebarAdmin from "../../components/SideBarAdmin";
import { assets } from "../../assets/assets2";

const mockAppointments = [
  {
    userData: { name: "John Doe", image: "/user1.jpg", dob: "1990-01-01" },
    slotDate: "2025-06-10",
    slotTime: "10:30 AM",
    docData: { name: "Dr. Smith", image: "/doctor1.jpg" },
    amount: "1500",
    cancelled: false,
    isCompleted: true,
  },
  {
    userData: { name: "Jane Doe", image: "/user2.jpg", dob: "1995-07-20" },
    slotDate: "2025-06-12",
    slotTime: "02:00 PM",
    docData: { name: "Dr. Alice", image: "/doctor2.jpg" },
    amount: "1200",
    cancelled: true,
    isCompleted: false,
  },
];

const AllAppointments = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />

      <div className="flex flex-1">
        <SidebarAdmin />

        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          <h1 className="text-2xl font-semibold text-gray-700 mb-6">
            All Appointments
          </h1>

          <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
            {/* Desktop Header */}
            <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] py-4 px-6 bg-[#EAEFFF] text-[#262626] font-medium border-b text-sm">
              <p>#</p>
              <p>Patient</p>
              <p>Age</p>
              <p>Date & Time</p>
              <p>Doctor</p>
              <p>Fees</p>
              <p>Action</p>
            </div>

            {/* Rows */}
            {mockAppointments.map((item, index) => (
              <div
                key={index}
                className="flex flex-col sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] sm:items-center gap-y-3 text-sm text-gray-700 py-4 px-6 border-b hover:bg-[#5F6FFF] hover:text-white transition-all duration-300"
              >
                {/* Row for small screen */}
                <div className="flex sm:hidden flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium w-24">Patient:</span>
                    <img
                      src={item.userData.image}
                      className="w-8 h-8 rounded-full object-cover"
                      alt="patient"
                    />
                    <span>{item.userData.name}</span>
                  </div>

                  <div className="flex gap-2">
                    <span className="font-medium w-24">Date & Time:</span>
                    <span>
                      {item.slotDate}, {item.slotTime}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-medium w-24">Doctor:</span>
                    <img
                      src={item.docData.image}
                      className="w-8 h-8 rounded-full object-cover"
                      alt="doctor"
                    />
                    <span>{item.docData.name}</span>
                  </div>

                  <div className="flex gap-2">
                    <span className="font-medium w-24">Fees:</span>
                    <span>₹{item.amount}</span>
                  </div>

                  <div className="flex gap-2">
                    <span className="font-medium w-24">Status:</span>
                    {item.cancelled ? (
                      <span className="text-red-500 font-medium">Cancelled</span>
                    ) : item.isCompleted ? (
                      <span className="text-green-600 font-medium">Completed</span>
                    ) : (
                      <img
                        src={assets.cancel_icon}
                        alt="cancel"
                        className="w-6 cursor-pointer"
                      />
                    )}
                  </div>
                </div>

                {/* Row for large screen */}
                <p className="hidden sm:block">{index + 1}</p>

                <div className="hidden sm:flex items-center gap-2">
                  <img
                    src={item.userData.image}
                    className="w-8 h-8 rounded-full object-cover"
                    alt="patient"
                  />
                  <p>{item.userData.name}</p>
                </div>

                <p className="hidden sm:block">30</p>

                <p className="hidden sm:block">
                  {item.slotDate}, {item.slotTime}
                </p>

                <div className="hidden sm:flex items-center gap-2">
                  <img
                    src={item.docData.image}
                    className="w-8 h-8 rounded-full object-cover"
                    alt="doctor"
                  />
                  <p>{item.docData.name}</p>
                </div>

                <p className="hidden sm:block">₹{item.amount}</p>

                <div className="hidden sm:block">
                  {item.cancelled ? (
                    <p className="text-red-500 font-medium text-xs">Cancelled</p>
                  ) : item.isCompleted ? (
                    <p className="text-green-600 font-medium text-xs">
                      Completed
                    </p>
                  ) : (
                    <img
                      src={assets.cancel_icon}
                      alt="cancel"
                      className="w-6 cursor-pointer"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AllAppointments;
