const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const timeSlotSchema = new Schema({
    timeStart: String,
    timeEnd: String,
    formationName: String,
});

const daySchema = new Schema({
    day: String,
    times: [timeSlotSchema],
});

const scheduleSchema = new Schema({
    classId: { type: Schema.Types.ObjectId, ref: 'Class', required: true },
    days: [daySchema],
});

const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;
