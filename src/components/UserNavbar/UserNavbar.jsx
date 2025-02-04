// UserNavbar.jsx
import React from "react";
import { FiMenu } from "react-icons/fi";

const UserNavbar = ({ toggleSidebar, isSidebarOpen }) => {
  return (
    <nav className="bg-gray-700 shadow-md transition-all duration-300  text-white  flex justify-between items-center p-4 fixed w-full z-50 top-0 left-0">
      {/* Logo & Title */}
      <div className="text-xl font-semibold">
        User Dashboard
      </div>

      {/* Hamburger Icon on small screens */}
      <button
        onClick={toggleSidebar}
        className={`lg:hidden text-white p-2 rounded-md ${isSidebarOpen ? 'bg-gray-800' : ''}`}
      >
        <FiMenu size={24} />
      </button>

      {/* User icon on larger screens */}
      <div className="hidden lg:block">
        <img
          src="/path-to-user-avatar.jpg"
          alt="User Avatar"
          className="w-8 h-8 rounded-full"
        />
      </div>
    </nav>
  );
};

export default UserNavbar;
