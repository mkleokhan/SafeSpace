const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  room: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
  landlord: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Landlord",
    required: true,
  },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  rent: { type: Number, required: true },
  paymentStatus: {
    type: String,
    enum: ["Pending", "Paid"],
    default: "Pending",
  },
});

module.exports = mongoose.model("Booking", bookingSchema);
