const express = require("express");
require("dotenv").config();
const tenantRouter = require("./routes/tenantRoutes");
const landlordRouter = require("./routes/landlordRoutes");
const authRouter = require("./routes/authRoutes");
const roomRouter = require("./routes/roomRoutes");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const CONNECTION_STRING = process.env.MONGODB_URI;
mongoose.connect(CONNECTION_STRING).then(() => {
  console.log("connected to mongodb");
});
const app = express();
app.use("/images", express.static(path.join(__dirname, "images")));

const PORT = 5000;
app.use(cors());
// app.use(
//   cors({
//     origin: "http://localhost:3000", // Replace with your frontend domain
//   })
// );
app.use(express.json());
app.use("/tenant", tenantRouter);
app.use("/landlord", landlordRouter);
app.use("/rooms", roomRouter);

app.use("/auth", authRouter);

app.listen(PORT, () => {
  console.log("Server Started, Listening at ", PORT);
});
