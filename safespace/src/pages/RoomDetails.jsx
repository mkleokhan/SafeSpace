import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Carousel styles
import SignInModal from "../comonents/SignInModal"; // Import your SignInModal component

const RoomDetails = () => {
  const [room, setRoom] = useState(null); // Room data state
  const { roomId } = useParams();
  const [openBookingModal, setOpenBookingModal] = useState(false); // Booking modal open/close state
  const [openSignInModal, setOpenSignInModal] = useState(false); // Sign-in modal open/close state
  const [error, setError] = useState(""); // Error message state
  const [bookingData, setBookingData] = useState({
    checkIn: "",
    checkOut: "",
    paymentStatus: "Pending",
  }); // Booking form data state

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  // Fetch room details
  const fetchSpecificRoom = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/rooms/allrooms/${roomId}`
      );
      setRoom(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Open booking modal
  const handleOpenBookingModal = () => {
    // Check if user is logged in
    if (!localStorage.getItem("token")) {
      // If not logged in, open sign-in modal
      setOpenSignInModal(true);
    } else {
      // If logged in, open booking modal
      setOpenBookingModal(true);
    }
    setError(""); // Clear any previous error when reopening modal
  };

  // Close booking modal
  const handleCloseBookingModal = () => {
    setOpenBookingModal(false);
  };

  // Close sign-in modal
  const handleCloseSignInModal = () => {
    setOpenSignInModal(false);
  };

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Validate booking dates
  const validateBooking = () => {
    const { checkIn, checkOut } = bookingData;

    // Check if both dates are provided
    if (!checkIn && !checkOut) {
      setError("Please select check-in and check-out dates.");
      return false;
    } else if (!checkIn) {
      setError("Please select a check-in date.");
      return false;
    } else if (!checkOut) {
      setError("Please select a check-out date.");
      return false;
    }

    // Convert to Date objects
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    // Check if check-in date is before check-out date
    if (checkInDate >= checkOutDate) {
      setError("Check-out date must be after check-in date.");
      return false;
    }

    // Check if the stay is at least 30 days
    const differenceInDays = (checkOutDate - checkInDate) / (1000 * 3600 * 24);
    if (differenceInDays < 30) {
      setError("You must book the room for at least 30 days.");
      return false;
    }

    // No errors
    setError("");
    return true;
  };

  // Handle booking form submission
  const handleBooking = async () => {
    // Validate booking before sending request
    if (!validateBooking()) return;

    try {
      // Make a POST request to the booking API
      const response = await axios.post(
        "http://localhost:5000/rooms/booking",
        {
          roomId: room._id, // Pass the selected room ID
          landlordId: room.landlord._id, // Pass the room's landlord ID
          checkIn: bookingData.checkIn, // User's check-in date
          checkOut: bookingData.checkOut, // User's check-out date
          rent: room.rentPerMonth, // Rent to be paid for the room
          paymentStatus: bookingData.paymentStatus, // Initial payment status
        },
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"), // Include user token for authorization
          },
        }
      );

      console.log("Booking successful:", response.data);

      // Close the booking modal after successful booking
      handleCloseBookingModal();
      // Optionally, show a success message
      alert("Booking successfully created!");
    } catch (error) {
      console.error("Booking error:", error);
      // Optionally, show an error message
      alert("There was an error with your booking. Please try again.");
    }
  };

  useEffect(() => {
    fetchSpecificRoom();
  }, [roomId]);

  if (!room) return <div>Loading...</div>; // Loading state

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col lg:flex-row">
        {/* Carousel for images */}
        <div className="w-full lg:w-1/2">
          <Carousel showThumbs={true} infiniteLoop className="w-full h-full">
            {room.images.map((image, index) => (
              <div key={index} className="">
                <img
                  src={image}
                  alt={`Room ${index + 1}`}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </Carousel>
        </div>

        {/* Room details */}
        <div className="p-6 w-full lg:w-1/2">
          <h1 className="text-2xl font-bold mb-2">{room.title}</h1>
          <p className="text-gray-700 mb-4">{room.description}</p>
          <p className="text-gray-600 mb-2">
            Location: {room.location.address}, {room.location.city},{" "}
            {room.location.zipCode}
          </p>
          <p className="text-gray-600 mb-2">
            Rent per Month: ${room.rentPerMonth}
          </p>
          <p className="text-gray-600 mb-2">Beds: {room.beds}</p>
          <p className="text-gray-600 mb-4">Landlord: {room.landlord.name}</p>

          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenBookingModal}
          >
            Book Now
          </Button>
        </div>
      </div>

      {/* Booking form in modal */}
      <Dialog open={openBookingModal} onClose={handleCloseBookingModal}>
        <DialogTitle>Book Room</DialogTitle>
        <DialogContent>
          <TextField
            label="Check-In Date"
            name="checkIn"
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{ min: today }} // Disallow past dates
            onChange={handleChange}
            value={bookingData.checkIn}
          />
          <TextField
            label="Check-Out Date"
            name="checkOut"
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{ min: bookingData.checkIn || today }} // Disallow check-out before check-in
            onChange={handleChange}
            value={bookingData.checkOut}
          />
          {error && <p className="text-red-500">{error}</p>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseBookingModal} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleBooking} color="primary">
            Confirm Booking
          </Button>
        </DialogActions>
      </Dialog>

      {/* Sign-in modal */}
      <SignInModal open={openSignInModal} onClose={handleCloseSignInModal} />
    </div>
  );
};

export default RoomDetails;
