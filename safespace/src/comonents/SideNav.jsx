import { Button } from "@mui/material";
import React, { useState } from "react";

const SideNav = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`${
          isOpen ? "bg-gray-900 w-64" : "w-0"
        } h-screen p-5 pt-8 relative duration-300 overflow-hidden`}
      >
        {/* Sidebar content, such as menu items */}
        <div className="flex items-center gap-4">
          <div
            className={`text-white text-xl font-medium transition-all duration-300 ${
              isOpen ? "block" : "hidden"
            }`}
          >
            {/* Placeholder for Sidebar Title */}
          </div>
        </div>

        <ul className={`pt-6 mt-4 ${isOpen ? "block" : "hidden"}`}>
          <li className="text-gray-300 text-sm flex items-center gap-x-4 p-2 hover:bg-gray-700 rounded-md cursor-pointer">
            <i className="fas fa-home"></i>
            <span>Dashboard</span>
          </li>
          <li className="text-gray-300 text-sm flex items-center gap-x-4 p-2 hover:bg-gray-700 rounded-md cursor-pointer">
            <i className="fas fa-user"></i>
            <span>User</span>
          </li>
          <li className="text-gray-300 text-sm flex items-center gap-x-4 p-2 hover:bg-gray-700 rounded-md cursor-pointer">
            <i className="fas fa-envelope"></i>
            <span>Messages</span>
          </li>
          <li className="text-gray-300 text-sm flex items-center gap-x-4 p-2 hover:bg-gray-700 rounded-md cursor-pointer">
            <i className="fas fa-chart-line"></i>
            <span>Analytics</span>
          </li>
          <li className="text-gray-300 text-sm flex items-center gap-x-4 p-2 hover:bg-gray-700 rounded-md cursor-pointer">
            <i className="fas fa-cog"></i>
            <span>Settings</span>
          </li>
        </ul>
      </div>

      {/* Toggle Button */}
      <button
        variant="contained"
        className={`absolute top-9 bg-gray-900 text-white rounded-sm p-2 focus:outline-none mt-20 ${
          isOpen ? "bg-white text-black left-[14.5rem]" : "left-0"
        } transition-all duration-300`}
        onClick={toggleSidebar}
      >
        <i className={`fas fa-${isOpen ? "arrow-left" : "arrow-right"}`}>
          {isOpen ? "<" : ">"}
        </i>
      </button>

      {/* Main Content */}
      <div className="flex-1 p-7">
        <h1 className="text-2xl font-semibold">Responsive Sidebar Menu</h1>
        <p className="mt-4">This is the main content area.</p>
      </div>
    </div>
  );
};

export default SideNav;
