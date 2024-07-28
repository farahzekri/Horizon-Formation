const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let nanoid;

const loadNanoid = async () => {
    if (!nanoid) {
        const { nanoid: generatedNanoid } = await import('nanoid');
        nanoid = generatedNanoid;
    }
};

const PaymentSchema = new Schema({
    studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    invoiceId: { type: Schema.Types.ObjectId, ref: 'Invoice', required: true },
    date: { type: Date, required: true },
    amount: { type: Number, required: true },
    method: { 
        type: String, 
        enum: ['Check', 'Cash', 'virement bancaire'], 
        required: true 
    },
    receipt: { 
        type: {
            receiptNumber: { type: String, unique: true },
            dateIssued: { type: Date, default: null },
            paymentDetails: {
                amount: { type: Number, default: null },
                method: { type: String, default: null }
            }
        },
        default: null
    },
    dateCreated: { type: Date, default: Date.now }
});


PaymentSchema.methods.initializeReceipt = async function () {
    await loadNanoid();
    this.receipt = {
        receiptNumber: nanoid(), 
        dateIssued: null,
        paymentDetails: {
            amount: this.amount, 
            method: this.method  
        }
    };
};


PaymentSchema.methods.updateReceiptDetails = function () {
    if (this.receipt) {
        this.receipt.dateIssued = new Date(); 
    } else {
        console.error('Receipt does not exist to update.');
    }
};

module.exports = mongoose.model('Payment', PaymentSchema);
