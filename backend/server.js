require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const Slot = require("./models/Slot");
const Booking = require("./models/Booking");
const User = require("./models/User");

const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

// ===============================
// AUTH ROUTES
// ===============================
app.use("/api/auth", authRoutes);

// ===============================
// CREATE DEFAULT SLOTS
// ===============================
async function createDefaultSlots() {
  const count = await Slot.countDocuments();

  if (count === 0) {
    const slots = [];

    ["A", "B", "C"].forEach((row) => {
      for (let i = 1; i <= 4; i++) {
        slots.push({
          slotNumber: `${row}${i}`,
          status: "available",
        });
      }
    });

    await Slot.insertMany(slots);
    console.log("✅ Default Slots Created");
  }
}

createDefaultSlots();

// ===============================
// GET ALL SLOTS
// ===============================
app.get("/slots", async (req, res) => {
  try {
    const slots = await Slot.find();

    // Sort A1, A2, A3... B1... C4
    slots.sort((a, b) => {
      const rowA = a.slotNumber.charCodeAt(0);
      const rowB = b.slotNumber.charCodeAt(0);

      if (rowA !== rowB) {
        return rowA - rowB;
      }

      return (
        parseInt(a.slotNumber.slice(1)) -
        parseInt(b.slotNumber.slice(1))
      );
    });

    res.json(slots);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// ===============================
// ADMIN STATS
// ===============================
app.get("/admin/stats", async (req, res) => {
  try {
    const totalSlots = await Slot.countDocuments();

    const occupiedSlots = await Slot.countDocuments({
      status: "occupied",
    });

    const availableSlots = await Slot.countDocuments({
      status: "available",
    });

    const totalBookings =
      await Booking.countDocuments();

    const totalUsers =
      await User.countDocuments();

    res.json({
      totalSlots,
      occupiedSlots,
      availableSlots,
      totalBookings,
      totalUsers,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// ===============================
// ADMIN USERS
// ===============================
app.get("/admin/users", async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.json(users);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// ===============================
// ALL BOOKINGS
// ===============================
app.get("/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find().sort({
      createdAt: -1,
    });

    res.json(bookings);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// ===============================
// USER BOOKINGS
// ===============================
app.get("/bookings/user/:userId", async (req, res) => {
  try {
    const bookings = await Booking.find({
      userId: req.params.userId,
    }).sort({
      createdAt: -1,
    });

    res.json(bookings);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// ===============================
// BOOK SLOT
// ===============================
app.post("/book", async (req, res) => {
  try {
    const {
      userId,
      userName,
      email,
      slotId,
      vehicleNumber,
      bookingDate,
      entryTime,
      exitTime,
    } = req.body;

    const slot = await Slot.findById(slotId);

    if (!slot) {
      return res.status(404).json({
        message: "Slot not found",
      });
    }

    if (slot.status === "occupied") {
      return res.status(400).json({
        message: "Slot already booked",
      });
    }

    slot.status = "occupied";
    await slot.save();

    const bookingId =
      "BK" +
      Date.now() +
      Math.floor(Math.random() * 1000);

    const booking = new Booking({
      bookingId,
      userId,
      userName,
      email,
      slotId,
      vehicleNumber,
      bookingDate,
      entryTime,
      exitTime,
    });

    await booking.save();

    res.status(201).json({
      message: "Booking Successful",
      booking,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// ===============================
// CANCEL BOOKING
// ===============================
app.delete("/booking/:id", async (req, res) => {
  try {
    const booking =
      await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    const slot = await Slot.findById(
      booking.slotId
    );

    if (slot) {
      slot.status = "available";
      await slot.save();
    }

    await Booking.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Booking Cancelled",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});