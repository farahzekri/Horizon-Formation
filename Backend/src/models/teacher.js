const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeacherSchema = new Schema({
  personalInfo: {
    firstName: { type: String },
    lastName: { type: String },
    dateOfBirth: { type: Date },
    address: {
      city: { type: String },
      zip: { type: String },
      state: { type: String }
    },
    phoneNumber: { type: String },
    email: { type: String, unique: true }
  },
  employmentInfo: {
    hireDate: { type: Date, default: Date.now },
    departmentId: { type: Schema.Types.ObjectId, ref: 'Department' },
    position: { type: String },
  },
  salaryInfo: {
    salaries: [
      {
        salaryId: { type: Schema.Types.ObjectId, ref: 'Salary' }
      }
    ],

  },
  workHours: [
    {
      date: { type: Date, required: true },
      hours: { type: Number, required: true }
    }
  ],
  academicRecords: {
    courses: [
      {
        courseId: { type: Schema.Types.ObjectId, ref: 'Course' }
      }
    ],
    evaluations: [
      {
        evaluationId: { type: Schema.Types.ObjectId, ref: 'Evaluation' }
      }
    ]
  },
  documents: [
    {
      documentId: { type: Schema.Types.ObjectId, ref: 'Document' }
    }
  ],
  // Administrative Metadata
  dateCreated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Teacher', TeacherSchema);
