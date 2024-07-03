const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const StudentSchema = new Schema({
    studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true }
}, { _id: false });

const ClassSchema = new Schema({
    formationId: { type: Schema.Types.ObjectId, ref: 'Formation'},
    level: { type: String, required: true },
    room: { type: String, required: true },
    students: [StudentSchema],
    dateCreated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Class', ClassSchema);
