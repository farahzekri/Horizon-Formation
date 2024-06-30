const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FormationSchema = new Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String },
    level: { type: String, required: true }, // e.g., 'BTP', 'BTS', 'CAP'
    registrationFee: { type: Number, required: true },
    tuitionFee: { type: Number, required: true },
    courses: [{
        courseName: { type: String },
        coefficient: { type: Number}
    }],
    // Administrative Metadata
    dateCreated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Formation', FormationSchema);
