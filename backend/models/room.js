const mongoose = require("mongoose");
const Landlord = require("./landlord");

const roomSchema = new mongoose.Schema({
  title: String,
  description: String,
  rentPerMonth: Number,
  location: {
    address: String,
    city: String,
    zipCode: String,
  },

  images: [String],

  facilities: String,
  beds: Number,
  attachBathroom: Boolean,
  landlord: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Landlord, // Reference to the Landlord model
  },
});

module.exports = mongoose.model("Room", roomSchema);
