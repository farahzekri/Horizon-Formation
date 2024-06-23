const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FormationSchema = new Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String },
    levels: [String], // e.g., 'BTP', 'BTS', 'CAP'
    registrationFee: { type: Number, required: true },
    tuitionFee: { type: Number, required: true },
    courses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
    // Administrative Metadata
    dateCreated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Formation', FormationSchema);
