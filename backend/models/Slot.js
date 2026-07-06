const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema(
  {
    slotNumber: {
      type: String,
      required: true,
      unique: true,
    },

    status: {
      type: String,
      default: "available",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Slot", slotSchema);