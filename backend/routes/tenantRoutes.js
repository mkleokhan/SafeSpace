const authMiddleware = require("../middleware/authorization");
const Tenant = require("../models/tenant");
const router = require("express").Router();
const bcrypt = require("bcrypt");

router.get("/", async (req, res) => {
  try {
    const allTenants = await Tenant.find();
    res.status(200).json({ msg: "all tenant here", allTenants });
    console.log("all tenant");
  } catch (error) {
    console.log("error fetching tenants");
    res.json({ msg: "error fetching tenants", error: error });
  }
});

router.get("/user/:id",  (req, res) => { 
  console.log("pecific user here");
  res.send("specific user here");
});

router.post("/createUser", async (req, res) => {
  try {
    const data = req.body;
    const salt = await bcrypt.genSalt(10);
    data.password = await bcrypt.hash(data.password, salt);
    const tenantExists = await Tenant.findOne({ email: data.email });
    if (tenantExists) {
      res.status(401).send("user already exists");
    } else {
      const createTenant = new Tenant(data);
      await createTenant.save();
      console.log("createdTenant: ", createTenant);
      //   console.log("tenant saved in database successfully");
      res
        .status(200)
        .json({ msg: "Tenant Created Successfully", user: req.body });
    }
  } catch (error) {
    console.log("error creating tenant", error);
    res.send(error);
  }
});

router.put("/update-user/:id", (req, res) => {
  res.send("update tenant");
});

router.delete("/delete-user/:id", (req, res) => {
  res.send("delete tenant");
});
module.exports = router;
