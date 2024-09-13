const Landlord = require("../models/landlord");
const authMiddleware = require("../middleware/authorization");
const bcrypt = require("bcrypt");

const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    const allLandlords = await Landlord.find();
    res.status(200).json({ msg: "all landlord here", allLandlords });
    console.log("all landlord");
  } catch (error) {
    console.log("error fetching landlords");
    res.json({ msg: "error fetching landlords", error: error });
  }
});

router.get("/user/:id", authMiddleware, (req, res) => {
  console.log("specific user here");

  res.send("specific user here");
});

router.post("/createUser", async (req, res) => {
  try {
    const data = req.body;
    const salt = await bcrypt.genSalt(10);
    data.password = await bcrypt.hash(data.password, salt);
    const landlordExists = await Landlord.findOne({ email: data.email });
    if (landlordExists) {
      res.status(401).send("user already exists");
    } else {
      const createLandlord = new Landlord(data);
      await createLandlord.save();
      console.log("createdLandlord: ", createLandlord);
      //   console.log("landlord saved in database successfully");
      res
        .status(200)
        .json({ msg: "Landlord Created Successfully", user: req.body });
    }
  } catch (error) {
    console.log("error creating landlord", error);
    res.send(error);
  }
});

router.put("/update-user/:id", (req, res) => {
  res.send("update landlord");
});

router.delete("/delete-user/:id", (req, res) => {
  res.send("delete landlord");
});
module.exports = router;
