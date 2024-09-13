const mongoose = require("mongoose");

const landlordSchema = new mongoose.Schema({
  name: String,
  CNIC: String,
  email: String,
  phone: String,
  password: String,
  address: String,
  zipCode: String,
});

module.exports = mongoose.model("Landlord", landlordSchema);
