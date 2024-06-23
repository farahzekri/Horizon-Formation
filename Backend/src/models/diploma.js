const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DiplomaSchema = new Schema({
    studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    diplomaType: { type: String, required: true },
    dateIssued: { type: Date, required: true },
    dateCreated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Diploma', DiplomaSchema);
