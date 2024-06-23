const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GradeSchema = new Schema({
    studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    grade: { type: Number, required: true },
    evaluationDate: { type: Date, required: true },
    dateCreated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Grade', GradeSchema);
