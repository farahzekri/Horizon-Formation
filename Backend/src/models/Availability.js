const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AvailabilitySchema = new Schema({
  teacher: { type: Schema.Types.ObjectId, ref: "Teacher", required: true },
  dayOfWeek: {
    type: String,
    enum: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    required: true,
  },
  availabilitySlots: [
    {
      startTime: { type: String, required: true }, // e.g., '09:00'
      endTime: { type: String, required: true }, // e.g., '12:00'
    },
  ],

  // Administrative Metadata
  dateCreated: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Availability", AvailabilitySchema);
