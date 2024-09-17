import React, { useEffect, useState } from "react";
import axios from "axios"; // Axios to make HTTP requests
import { useSelector } from "react-redux";
const LandlordBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = useSelector((state) => state.auth.token);

  // Fetch the bookings when the component mounts
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        console.log(token);
        const response = await axios.get(
          "http://localhost:5000/rooms/allbookings",
          {
            headers: {
              "x-auth-token": token, // Send token in Authorization header
            },
          }
        ); // Replace with your bookings API endpoint

        console.log(response);
        setBookings(response.data.bookings);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) return <p>Loading bookings...</p>;
  if (error) return <p>Error fetching bookings: {error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-6">All Bookings</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full text-left">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Booking ID</th>
              <th className="p-2">Room</th>
              <th className="p-2">Tenant</th>
              <th className="p-2">Check-in</th>
              <th className="p-2">Check-out</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id} className="border-b">
                <td className="p-2">{booking._id}</td>
                <td className="p-2">{booking.room.title}</td>
                <td className="p-2">{booking.tenantId.name}</td>
                <td className="p-2">
                  {new Date(booking.checkIn).toLocaleDateString()}
                </td>
                <td className="p-2">
                  {new Date(booking.checkOut).toLocaleDateString()}
                </td>
                <td className="p-2">{booking.paymentStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LandlordBookings;
