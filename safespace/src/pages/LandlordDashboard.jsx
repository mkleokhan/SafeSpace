import React from "react";
import { Link } from "react-router-dom"; // For navigation links
import { useSelector } from "react-redux"; // Assuming you're using Redux for state management

const LandlordDashboard = () => {
  // Example data from Redux or some other state management
  const landlordData = useSelector((state) => state.auth.landlordData);
  console.log(landlordData);

  return (
    <div className="flex">
      <aside className="w-1/4 bg-gray-800 text-white p-4">
        <h2 className="text-2xl font-bold mb-4">Landlord Dashboard</h2>
        <ul>
          <li>
            <Link
              to="/landlord-dashboard"
              className="block py-2 hover:bg-gray-600"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/manage-properties"
              className="block py-2 hover:bg-gray-600"
            >
              Manage Properties
            </Link>
          </li>
          <li>
            <Link to="/bookings" className="block py-2 hover:bg-gray-600">
              Bookings
            </Link>
          </li>
          <li>
            <Link to="/profile" className="block py-2 hover:bg-gray-600">
              Profile
            </Link>
          </li>
        </ul>
      </aside>

      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">
          Welcome,{landlordData.name} !
        </h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Your Properties</h2>
          {/* Example list of properties */}
          <ul></ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Upcoming Bookings</h2>
          {/* Example list of bookings */}
          <ul></ul>
        </section>
      </main>
    </div>
  );
};

export default LandlordDashboard;
