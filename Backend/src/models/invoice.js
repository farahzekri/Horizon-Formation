const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InvoiceSchema = new Schema({
    studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    date: { type: Date, required: true },
    formations: [
        {
            formationId: { type: Schema.Types.ObjectId, ref: 'Formation', required: true },
            amount: { type: Number, required: true }
        }
    ],
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ['paid', 'unpaid'], default: 'unpaid' },
    dateCreated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Invoice', InvoiceSchema);
