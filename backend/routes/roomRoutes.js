const router = require("express").Router();
const authMiddleware = require("../middleware/authorization");
const Booking = require("../models/bookings");
const Landlord = require("../models/landlord");
const Room = require("../models/room");
const upload = require("../middleware/multer_Middleware");

router.post(
  "/postRoom",
  authMiddleware,
  upload.array("images"),
  async (req, res) => {
    console.log(req.files);
    try {
      const imagePaths = req.files.map((file) => file.path.replace(/\\/g, "/"));
      const landlordId = req.user.id;
      console.log("landlord Id", landlordId);
      const room = req.body;
      // console.log("room", room);
      const createRoom = await new Room({
        title: room.title,
        description: room.description,
        rentPerMonth: room.rentPerMonth,
        location: room.location,
        images: imagePaths,
        facilities: room.facilities,
        beds: room.beds,
        attachBathroom: room.attachBathroom,
        landlord: landlordId,
      }).populate({ path: "landlord", select: "name CNIC email phone" });

      await createRoom.save();
      console.log("Created Room, ", createRoom);
      res
        .status(201)
        .json({ msg: "Room created successfully,", room: createRoom });
    } catch (error) {
      console.log("cannot create room", error);
    }
  }
);

router.get("/allrooms", async (req, res) => {
  const rooms = await Room.find().populate({
    path: "landlord",
    select: "name email phone", // Specify the fields you want to include from the 'host' document
  });
  res.send(rooms);
});

router.get("/allrooms/:id", async (req, res) => {
  const rooms = await Room.findById(req.params.id);
  console.log(rooms);
  res.send(rooms);
});

router.post("/booking", authMiddleware, async (req, res) => {
  try {
    const { roomId, landlordId, checkIn, checkOut, rent, paymentStatus } =
      req.body;
    const room = await Room.findById(roomId);
    const guest = await Landlord.findById(landlordId);
    if (!room || !landlordId) {
      return res.status(404).json({ msg: "Room not Available" });
    }

    const newBooking = new Booking({
      room: roomId,
      landlord: landlordId,
      checkIn,
      checkOut,
      rent,
      paymentStatus,
    });

    await newBooking.save();
    res
      .status(201)
      .json({ msg: "Booking created successfully", booking: newBooking });
  } catch (error) {
    console.log("error booking the room", error);
    return res.status(500).send("Internal server error");
  }
});

module.exports = router;
