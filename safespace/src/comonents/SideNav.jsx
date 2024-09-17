import { Button } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { clearAuth } from "../../Redux/authSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
const SideNav = () => {
  const [isOpen, setIsOpen] = useState(true);
  const tenant = useSelector((state) => {
    return state.auth.tenantData;
  });
  const landlord = useSelector((state) => {
    return state.auth.landlordData;
  });

  const dashboardUrl = landlord ? "/landlord/home" : "/tenant/bookings";
  const bookingsUrl = landlord ? "/landlord/bookings" : "/tenant/bookings";
  const inboxUrl = landlord ? "/landlord/inbox" : "/tenant/inbox";
  const settingsUrl = landlord ? "/landlord/settings" : "/tenant/settings";

  const dispatch = useDispatch();

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

        <ul className={`pt-6 mt-4 ${isOpen ? "block" : "hidden"} `}>
          <Link to={dashboardUrl}>
            <li className="text-gray-300 text-sm flex items-center gap-x-4 p-2 hover:bg-gray-700 rounded-md cursor-pointer">
              <i className="fas fa-home"></i>
              <span>Dashboard</span>
            </li>
          </Link>

          <Link to={bookingsUrl}>
            <li className="text-gray-300 text-sm flex items-center gap-x-4 p-2 hover:bg-gray-700 rounded-md cursor-pointer">
              <i className="fas fa-calendar-check"></i>
              <span>Bookings</span>
            </li>
          </Link>

          <Link to={inboxUrl}>
            <li className="text-gray-300 text-sm flex items-center gap-x-4 p-2 hover:bg-gray-700 rounded-md cursor-pointer">
              <i className="fas fa-envelope"></i>
              <span>Messages</span>
            </li>
          </Link>

          <Link to={settingsUrl}>
            <li className="text-gray-300 text-sm flex items-center gap-x-4 p-2 hover:bg-gray-700 rounded-md cursor-pointer">
              <i className="fas fa-cog"></i>
              <span>Settings</span>
            </li>
          </Link>

          <Button
            onClick={() => {
              dispatch(clearAuth());
            }}
          >
            <li className="text-red-500 text-sm flex items-center gap-x-4 p-2 hover:bg-gray-700 rounded-md cursor-pointer">
              <i className="fas fa-cog"></i>
              <span>Log Out</span>
            </li>
          </Button>
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
    </div>
  );
};

export default SideNav;
