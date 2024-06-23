const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    // Administrative Metadata
    dateCreated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Course', CourseSchema);
