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
      console.log("getting formdata: ", room.images);
      // console.log("room", room);

      const images = Array.isArray(room.images)
        ? room.images
        : JSON.parse(room.images);

      const createRoom = await new Room({
        title: room.title,
        description: room.description,
        rentPerMonth: room.rentPerMonth,
        location: room.location,
        images: images,
        facilities: room.facilities,
        beds: room.beds,
        attachBathroom: room.attachBathroom,
        landlord: landlordId,
      }).populate({ path: "landlord", select: "name CNIC email phone" });

      await createRoom.save();
      // console.log("Created Room, ", createRoom);
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
  const populatedRoom = await rooms.populate({
    path: "landlord",
    select: "name  _id",
  });
  console.log(populatedRoom);
  res.send(populatedRoom);
});

router.post("/booking", authMiddleware, async (req, res) => {
  try {
    const { roomId, checkIn, checkOut, rent, paymentStatus } = req.body;
    const tenantId = req.user.id; // Get the guest (user) ID from the auth middleware
    console.log("tenant id in booking route", tenantId);
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ msg: "Room not found" });
    }

    const landlordId = room.landlord; // Get the landlord ID from the room

    const newBooking = new Booking({
      room: roomId,
      tenantId: tenantId,
      landlordId: landlordId, // Guest is the user making the booking
      checkIn,
      checkOut,
      rent,
      paymentStatus,
    });

    console.log("Booking request:", newBooking);
    let populatedBooking = await newBooking.populate({
      path: "landlordId",
      select: "name address",
    });

    populatedBooking = await populatedBooking.populate({
      path: "tenantId",
      select: "name address",
    });

    console.log("populated booking : ", populatedBooking);
    await populatedBooking.save();
    res
      .status(201)
      .json({ msg: "Booking created successfully", booking: populatedBooking });
  } catch (error) {
    console.error("Error booking the room:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
});

router.get("/landlord/bookings", authMiddleware, async (req, res) => {
  try {
    const landlordId = req.user.id; // Assuming user is authenticated and landlord ID is in req.user
    console.log(landlordId);
    const bookings = await Booking.find({ landlordId }).populate(
      "room tenantId"
    );
    console.log("bookings found", bookings);
    res.status(200).json({ bookings });
  } catch (error) {
    console.log("Error Fetching Bookings:", error);
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});

router.get("/tenant/bookings", authMiddleware, async (req, res) => {
  try {
    const tenantId = req.user.id; // Assuming tenant ID is in req.user
    const bookings = await Booking.find({ tenantId }).populate(
      "room landlordId"
    );

    console.log(bookings);
    res.status(200).json({ bookings });
  } catch (error) {
    console.log("Error Fetching Tenant's Bookings:", error);
    res.status(500).json({ error: "Failed to fetch tenant bookings" });
  }
});

module.exports = router;
