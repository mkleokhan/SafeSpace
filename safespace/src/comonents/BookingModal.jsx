// src/components/BookingModal.js

import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";

const BookingModal = ({ open, onClose, room, onBook }) => {
  const [bookingData, setBookingData] = useState({
    checkIn: "",
    checkOut: "",
    paymentStatus: "Pending",
  });
  const [error, setError] = useState("");

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateBooking = () => {
    const { checkIn, checkOut } = bookingData;

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

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (checkInDate >= checkOutDate) {
      setError("Check-out date must be after check-in date.");
      return false;
    }

    const differenceInDays = (checkOutDate - checkInDate) / (1000 * 3600 * 24);
    if (differenceInDays < 30) {
      setError("You must book the room for at least 30 days.");
      return false;
    }

    setError("");
    return true;
  };

  const handleBooking = () => {
    if (!validateBooking()) return;

    onBook(bookingData);
  };

  return (
    <Dialog open={open} onClose={onClose}>
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
          inputProps={{ min: today }}
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
          inputProps={{ min: bookingData.checkIn || today }}
          onChange={handleChange}
          value={bookingData.checkOut}
        />
        {error && <p className="text-red-500">{error}</p>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleBooking} color="primary">
          Confirm Booking
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BookingModal;
