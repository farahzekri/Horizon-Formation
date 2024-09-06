const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SalarySchema = new Schema({
    teacherId: { type: Schema.Types.ObjectId, ref: 'Teacher', required: true },
    hourlyRate: { type: Number, required: true },
    workHours: { type: Number, required: true },
    amount: { type: Number },
    method: { type: String, enum: ['Bank Transfer', 'Check', 'Cash', 'Other'], required: true },
    paymentDate: { type: Date },
    month: { type: Date, required: true },
    paid: { type: Boolean, default: false },
    // Additional fields as necessary
    dateCreated: { type: Date, default: Date.now }
});

// Calculate payment amount based on hourly rate and work hours
SalarySchema.pre('validate', function (next) {
    if (this.isNew) {
        this.amount = this.hourlyRate * this.workHours;
    }
    next();
});

module.exports = mongoose.model('Salary', SalarySchema);
