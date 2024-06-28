const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClassSchema = new Schema({
    formationId: { type: Schema.Types.ObjectId, ref: 'Formation', required: true },
    level: { type: String, required: true },
    room: { type: String, required: true },
    students: [
        {
            studentId: { type: Schema.Types.ObjectId, ref: 'Student' }
        }
    ],
    dateCreated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Class', ClassSchema);
