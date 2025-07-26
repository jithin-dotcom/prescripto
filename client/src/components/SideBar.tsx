

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











