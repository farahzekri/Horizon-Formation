const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TeacherSchema = new Schema({
  username: { type: String, required: true, unique: true },
  role: {
    type: String,
    enum: ["Full-Time", "Half-Time"],
    default: "teacher",
    required: true,
  },
  firstName: { type: String },
  lastName: { type: String },
  dob: { type: Date },
  gender: { type: String, enum: ["Male", "Female"] },
  phone: { type: String },
  address: {
    city: { type: String },
    state: { type: String },
    zip: { type: String },
  },

  // Teacher-specific fields
  subjects: [{ type: String }],
  experience: { type: Number }, // in years
  qualifications: [{ type: String }],
  hireDate: { type: Date },
  salary: { type: Number },
  NumberOfHours: { type: Number },
  // Administrative Metadata
  dateCreated: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Teacher", TeacherSchema);
