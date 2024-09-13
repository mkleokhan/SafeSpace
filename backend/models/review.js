const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  tenant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Landlord",
    required: true,
  },

  room: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String },
});
module.exports = mongoose.model("Review", reviewSchema);
