

import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets2';
import { useAuthStore } from '../store/authStore';
import { Menu, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { AlertTriangle } from 'lucide-react';
import { IndianRupee } from 'lucide-react';

const Sidebar = () => {
  const role = useAuthStore((state) => state.role);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  
  const adminNavItems = [
    { to: '/admin-dashboard', label: 'Dashboard', icon: assets.home_icon },
    { to: '/all-appointments', label: 'Appointments', icon: assets.appointment_icon },
    { to: '/add-doctor', label: 'Add Doctor', icon: assets.add_icon },
    { to: '/doctor-list', label: 'Doctors List', icon: assets.people_icon },
    {
      to: '/add-user',
      label: 'Add User',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 14a4 4 0 10-8 0m8 0a4 4 0 00-8 0m8 0v1a4 4 0 01-8 0v-1m0 0v-1m8 1v-1m-4-8a4 4 0 100 8 4 4 0 000-8z" />
        </svg>
      ),
    },
    {
      to: '/user-list',
      label: 'User List',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-5-4M9 20H4v-2a4 4 0 015-4m1-4a4 4 0 100-8 4 4 0 000 8zm10 4a4 4 0 100-8 4 4 0 000 8z" />
        </svg>
      ),
    },
    { to: '/all-concerns', label: 'Concerns', icon: <AlertTriangle className="w-5 h-5" /> },
     { to: '/all-payouts', label: 'Payouts', icon: <IndianRupee className="w-4 h-4" /> },
  ];

  const doctorNavItems = [
    { to: '/doctor-dashboard', label: 'Dashboard', icon: assets.home_icon },
    { to: '/doctor-appointments', label: 'Appointments', icon: assets.appointment_icon },
    { to: '/doctor-profile', label: 'Profile', icon: assets.people_icon },
   
  ];

  const navItems = role === 'admin' ? adminNavItems : role === 'doctor' ? doctorNavItems : [];

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);
  const toggleMobileMenu = () => setIsMobileOpen(!isMobileOpen);

  const baseItemStyles = `
    group flex items-center gap-3 py-3.5 px-3 md:px-4 mx-2 rounded-r-full
    transition-all duration-300 ease-in-out transform
    hover:bg-[#5F6FFF] hover:text-white hover:scale-[1.03]
  `;

  const textStyles = `
    hidden md:inline text-sm font-medium
  `;

  const iconStyles = `
    w-5 h-5 transition-transform duration-300 group-hover:scale-110
  `;

  const tooltipStyles = `
    absolute left-14 bg-black text-white text-xs rounded py-1 px-2 z-50 shadow-md
    opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap
  `;

  const sidebarContent = (
    <ul className="flex flex-col gap-2 py-6">
      {navItems.map((item, index) => (
        <NavLink
          key={index}
          to={item.to}
          onClick={() => setIsMobileOpen(false)}
          className={({ isActive }) =>
            `${baseItemStyles} relative ${
              isActive ? 'bg-[#5F6FFF] text-white' : 'text-[#515151]'
            }`
          }
        >
          
          {typeof item.icon === 'string' ? (
            <img src={item.icon} alt={item.label} className={iconStyles} />
          ) : (
            <span className="text-[#515151] group-hover:text-white">{item.icon}</span>
          )}
          {!isCollapsed ? (
            <span className={textStyles}>{item.label}</span>
          ) : (
            <span className={tooltipStyles}>{item.label}</span>
          )}
        </NavLink>
      ))}
    </ul>
  );

  return (
    <>
      
      <div className="md:hidden p-3">
        <button onClick={toggleMobileMenu}>
          {isMobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <aside
        className={`hidden md:flex flex-col min-h-screen bg-white  transition-all duration-300 ease-in-out 
        ${isCollapsed ? 'w-16' : 'w-60'}`}
      >
        <div className="flex justify-end p-2">
          <button onClick={toggleSidebar} className="p-1 rounded hover:bg-gray-100">
            {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>
        {sidebarContent}
      </aside>

      
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
          onClick={toggleMobileMenu}
        >
          <aside
            className="w-60 bg-white h-full z-50 p-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end">
              <button onClick={toggleMobileMenu}>
                <X size={24} />
              </button>
            </div>
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
};

export default Sidebar;






