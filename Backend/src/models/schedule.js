const mongoose = require('mongoose');
const teacher = require('./teacher');
const Schema = mongoose.Schema;

const scheduleSchema = new Schema({
    classId: { type: Schema.Types.ObjectId, ref: 'Class', required: true },
    days: [{
        day: String,
        times: [{
            start: String,  // ou Date, selon votre besoin
            end: String ,    // ou Date, selon votre besoin
            room: { type: Schema.Types.ObjectId, ref: 'Salle' },  
            course: { type: Schema.Types.ObjectId, ref: 'Course' },
            teacher:{type: Schema.Types.ObjectId, ref: 'Teacher' }
        }]
    }]
});

const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;