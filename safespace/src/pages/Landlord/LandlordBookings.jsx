import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import SideNav from "../../comonents/SideNav"; // Make sure the path is correct

const LandlordBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = useSelector((state) => state.auth.token);

  // Fetch the bookings when the component mounts
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/rooms/allbookings",
          {
            headers: {
              "x-auth-token": token,
            },
          }
        );
        setBookings(response.data.bookings);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBookings();
  }, [token]);

  if (loading) return <p>Loading bookings...</p>;
  if (error)
    return <p className="text-red-500">Error fetching bookings: {error}</p>;

  return (
    <div className="flex">
      <SideNav />
      <div className="flex-1 p-4">
        <div className="flex flex-col md:flex-row md:justify-between mb-6">
          <h1 className="text-2xl font-semibold mb-4">All Bookings</h1>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-4 text-left text-gray-600">Booking ID</th>
                <th className="p-4 text-left text-gray-600">Room</th>
                <th className="p-4 text-left text-gray-600">Tenant</th>
                <th className="p-4 text-left text-gray-600">Check-in</th>
                <th className="p-4 text-left text-gray-600">Check-out</th>
                <th className="p-4 text-left text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id} className="border-b">
                  <td className="p-4">{booking._id}</td>
                  <td className="p-4">{booking.room.title}</td>
                  <td className="p-4">{booking.tenantId.name}</td>
                  <td className="p-4">
                    {new Date(booking.checkIn).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    {new Date(booking.checkOut).toLocaleDateString()}
                  </td>
                  <td className="p-4">{booking.paymentStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LandlordBookings;
