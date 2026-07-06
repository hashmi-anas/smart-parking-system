const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    bookingId: {
      type: String,
      required: true,
      unique: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    userName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    slotId: {
      type: String,
      required: true,
    },

    vehicleNumber: {
      type: String,
      required: true,
    },

    bookingDate: {
      type: String,
      required: true,
    },

    entryTime: {
      type: String,
      required: true,
    },

    exitTime: {
      type: String,
      required: true,
    },

    status: {
  type: String,
  default: "Active",
},
    },
  
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Booking", bookingSchema);