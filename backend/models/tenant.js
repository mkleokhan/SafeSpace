const mongoose = require("mongoose");

const tenantSchema = new mongoose.Schema({
  name: String,
  CNIC: String,
  email: String,
  phone: String,
  password: String,
});

module.exports = mongoose.model("Tenants", tenantSchema);
