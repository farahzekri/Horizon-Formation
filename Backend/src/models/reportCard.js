const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReportCardSchema = new Schema({
    studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    term: { type: String, required: true },
    grades: [
        {
            courseId: { type: Schema.Types.ObjectId, ref: 'Course' },
            grade: { type: Number, required: true }
        }
    ],
    comments: { type: String },
    dateIssued: { type: Date, required: true },
    dateCreated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ReportCard', ReportCardSchema);
