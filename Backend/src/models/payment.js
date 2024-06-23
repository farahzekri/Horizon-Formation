const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
    studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    invoiceId: { type: Schema.Types.ObjectId, ref: 'Invoice', required: true },
    date: { type: Date, required: true },
    amount: { type: Number, required: true },
    method: { type: String, required: true },
    receipt: { type: String },
    dateCreated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Payment', PaymentSchema);
