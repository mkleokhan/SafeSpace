import React, { useState } from "react";
import SideNav from "../../comonents/SideNav";
import { Link } from "react-router-dom";

const LandlordHome = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex">
      {/* Sidebar */}
      <SideNav />

      {/* Main Content */}
      <div className="flex-1 p-4">
        <div className="flex flex-col md:flex-row md:justify-between">
          {/* Header Section */}
          <h1 className="text-2xl font-semibold mb-4">Landlord Dashboard</h1>
          <div className="flex gap-4">
            {/* Add other buttons or options */}
            <Link to="/landlord/postroom">
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                Add New Room
              </button>
            </Link>
            <Link to="/landlord/notifications">
              <button className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded">
                Notifications
              </button>
            </Link>
          </div>
        </div>

        {/* Responsive Content Section */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card Example */}
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Your Listings</h2>
            <p className="text-gray-600">
              Manage your properties and keep track of tenants.
            </p>
          </div>
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Tenant Requests</h2>
            <p className="text-gray-600">
              View and respond to tenant requests.
            </p>
          </div>
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Messages</h2>
            <p className="text-gray-600">
              Check your messages and stay in touch with tenants.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandlordHome;
