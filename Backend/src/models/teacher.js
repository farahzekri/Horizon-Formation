const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TeacherSchema = new Schema({
  role: {
    type: String,
    enum: ["Full-Time", "Half-Time"],
    required: true,
  },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  dob: { type: Date,default: Date.now},
  gender: { type: String, enum: ["Male", "Female"] },
  phone: { type: String, required: true},
  address: {
    city: { type: String },
    state: { type: String },
    zip: { type: String },
  },
  subjects: [{ type: String }],
  experience: { type: Number }, // in years
  qualifications: [{ type: String }],
  hireDate: { type: Date },
  salary: { type: Number },
  NumberOfHours: { type: Number },
  payments: [{ date: Date, amount: Number }], // Added for tracking payments
  dateCreated: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Teacher", TeacherSchema);
