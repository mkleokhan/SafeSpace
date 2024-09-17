import React, { useEffect, useState } from "react";
import axios from "axios";
import SideNav from "../../comonents/SideNav";
import { useSelector } from "react-redux";

const TenantBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = useSelector((state) => {
    console.log(state);
    return state.auth.token;
  });
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/rooms/tenant/bookings",
          {
            headers: {
              "x-auth-token": token, // Assuming token is stored in localStorage
            },
          }
        );
        console.log("response on tenant booking", response);
        setBookings(response.data.bookings);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch bookings");
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  return (
    <div className="flex">
      <SideNav />
      <div className="flex-1 p-4">
        <div className="flex flex-col md:flex-row md:justify-between mb-6">
          <h1 className="text-2xl font-semibold mb-4">Your Bookings</h1>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-4 text-left text-gray-600">Booking ID</th>
                <th className="p-4 text-left text-gray-600">Room</th>
                <th className="p-4 text-left text-gray-600">Landlord</th>
                <th className="p-4 text-left text-gray-600">Check-in</th>
                <th className="p-4 text-left text-gray-600">Check-out</th>
                <th className="p-4 text-left text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-4 text-center">
                    No bookings found
                  </td>
                </tr>
              ) : (
                bookings.map((booking) => (
                  <tr key={booking._id} className="border-b">
                    <td className="p-4">{booking._id}</td>
                    <td className="p-4">{booking.room.title}</td>
                    <td className="p-4">{booking.landlordId.name}</td>
                    <td className="p-4">
                      {new Date(booking.checkIn).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      {new Date(booking.checkOut).toLocaleDateString()}
                    </td>
                    <td className="p-4">{booking.paymentStatus}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TenantBookings;
