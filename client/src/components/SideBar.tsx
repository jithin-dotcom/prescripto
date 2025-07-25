

import { assets } from "../assets/assets2";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const navItems = [
    {
      label: "Dashboard",
      to: "/doctor-dashboard",
      icon: assets.home_icon,
    },
    {
      label: "Appointments",
      to: "/doctor-appointments",
      icon: assets.appointment_icon,
    },
    {
      label: "Profile",
      to: "/doctor-profile",
      icon: assets.people_icon,
    },
  ];

  return (
    <aside className="min-h-screen bg-white border-r w-16 md:w-60 transition-all duration-300 ease-in-out">
      <ul className="flex flex-col gap-2 py-6">
        {navItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.to}
            className={({ isActive }) =>
              `group flex items-center gap-3 py-3.5 px-3 md:px-6 mx-2 rounded-r-full transition-all duration-300 ease-in-out transform hover:bg-[#5F6FFF] hover:text-white hover:scale-[1.03]
              ${isActive ? "bg-[#5F6FFF] text-white" : "text-[#515151]"}`
            }
          >
            <img
              src={item.icon}
              alt={item.label}
              className="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
            />
            <span className="hidden md:inline text-sm font-medium">{item.label}</span>
          </NavLink>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;














// import { useState } from "react";
// import { NavLink } from "react-router-dom";
// import { assets } from "../assets/assets2";
// import { Menu, X } from "lucide-react";

// const Sidebar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const navItems = [
//     {
//       label: "Dashboard",
//       to: "/doctor-dashboard",
//       icon: assets.home_icon,
//     },
//     {
//       label: "Appointments",
//       to: "/doctor-appointments",
//       icon: assets.appointment_icon,
//     },
//     {
//       label: "Profile",
//       to: "/doctor-profile",
//       icon: assets.people_icon,
//     },
//   ];

//   const toggleSidebar = () => {
//     setIsOpen((prev) => !prev);
//   };

//   return (
//     <>
//       {/* Mobile Toggle Button */}
//       <button
//         className="fixed top-20 left-4 z-50 bg-[#5F6FFF] text-white p-3 rounded-full shadow-lg hover:bg-[#4b56cc] transition-colors duration-300 md:hidden"
//         onClick={toggleSidebar}
//         aria-label="Toggle sidebar"
//       >
//         {isOpen ? <X size={24} /> : <Menu size={24} />}
//       </button>

//       {/* Sidebar */}
//       <aside
//         className={`fixed top-16 left-0 h-[calc(100vh-4rem)] bg-white border-r transition-all duration-300 ease-in-out z-40
//           ${isOpen ? "w-64 translate-x-0" : "w-0 -translate-x-full md:w-16 md:translate-x-0"}
//           md:w-60 md:static md:h-screen`}
//       >
//         {/* Sidebar Header */}
//         <div className="hidden md:flex items-center justify-between p-4 border-b">
//           <span className="text-lg font-semibold text-gray-800">Doctor Panel</span>
//         </div>

//         {/* Navigation Links */}
//         <ul className="flex flex-col gap-2 py-6">
//           {navItems.map((item, index) => (
//             <NavLink
//               key={index}
//               to={item.to}
//               onClick={() => setIsOpen(false)}
//               className={({ isActive }) =>
//                 `group flex items-center gap-4 py-4 px-4 md:px-6 mx-2 rounded-r-full transition-all duration-300 ease-in-out hover:bg-[#5F6FFF] hover:text-white hover:shadow-md
//                 ${isActive ? "bg-[#5F6FFF] text-white shadow-md" : "text-[#515151]"}`
//               }
//             >
//               <img
//                 src={item.icon}
//                 alt={item.label}
//                 className="w-6 h-6 md:w-5 md:h-5 transition-transform duration-300 group-hover:scale-110"
//               />
//               <span
//                 className={`${
//                   isOpen ? "inline" : "hidden"
//                 } md:inline text-sm font-medium truncate`}
//               >
//                 {item.label}
//               </span>
//             </NavLink>
//           ))}
//         </ul>
//       </aside>

//       {/* Overlay for Mobile */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
//           onClick={toggleSidebar}
//         ></div>
//       )}
//     </>
//   );
// };

// export default Sidebar;