const express = require("express");
const router = express.Router();
const Booking = require("../models/kookings");
const authMiddleware = require("../middleware/authorization");

// Route to update payment status
router.post("/update-payment-status/:id", authMiddleware, async (req, res) => {
  const { status } = req.body; // "Pending" or "Paid"
  const bookingId = req.params.id;

  try {
    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      { paymentStatus: status },
      { new: true }
    );
    res.json({ message: "Payment status updated", booking });
  } catch (error) {
    res.status(500).json({ error: "Failed to update payment status" });
  }
});

module.exports = router;
