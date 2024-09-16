const router = require("express").Router();
require("dotenv").config();
const jwt = require("jsonwebtoken");
const Landlord = require("../models/landlord");
const Tenant = require("../models/tenant");
const bcrypt = require("bcrypt");

const SECRET_KEY = process.env.SECRET_KEY;

router.post("/landlord", async (req, res) => {
  try {
    const data = req.body;
    // Landlord ==> landlord Model, landlord==>local variable
    const landlord = await Landlord.findOne({ email: data.email });
    console.log(landlord);
    if (landlord) {
      const isPassword = await bcrypt.compare(data.password, landlord.password);

      if (isPassword) {
        const token = jwt.sign(
          {
            id: landlord._id,
            email: landlord.email,
            name: landlord.name,
            password: landlord.name,
          },
          SECRET_KEY
        );

        console.log(token);
        return res.status(200).json({ token, landlord });
      } else {
        console.log("Email or Password is incorrect");
        return res.status(400).send("Email or Password is incorrect");
      }
    } else {
      console.log("Email or Password is incorrect");
      return res.status(400).send("Email or Password is incorrect");
    }
  } catch (error) {
    console.log("error logging in...");
    return res.status(400).json({ msg: "error logging in...", error });
  }
});

router.post("/tenant", async (req, res) => {
  try {
    const data = req.body;
    // Tenant ==> Tenant Model, tenant==>local variable
    const tenant = await Tenant.findOne({ email: data.email });

    if (tenant) {
      const isPassword = await bcrypt.compare(data.password, tenant.password);

      if (isPassword) {
        const token = jwt.sign(
          {
            id: tenant._id,
            email: tenant.email,
            name: tenant.name,
            password: tenant.password,
          },
          SECRET_KEY
        );

        console.log(token);
        return res.status(200).send(token);
      } else {
        console.log("Email or Password is incorrect");
        return res.status(400).send("Email or Password is incorrect");
      }
    } else {
      return res.status(400).send("Email or Password is incorrect");
    }
  } catch (error) {
    console.log("error logging in...");
    return res.status(400).json({ msg: "error logging in...", error });
  }
});

module.exports = router;
