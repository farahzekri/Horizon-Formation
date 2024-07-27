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
        enum: ['Check', 'Cash', 'Bank Transfer'], 
        required: true 
    },
    receipt: { 
        type: {
            receiptNumber: { type: String, unique: true },
            dateIssued: { type: Date, default: null },
            issuer: { type: String, default: null },
            paymentDetails: {
                amount: { type: Number, default: null },
                method: { type: String, default: null }
            }
        },
        default: null
    },
    dateCreated: { type: Date, default: Date.now }
});

// Méthode d'instance pour générer et remplir automatiquement le numéro de reçu, le montant et la méthode
PaymentSchema.methods.initializeReceipt = async function () {
    await loadNanoid();
    this.receipt = {
        receiptNumber: nanoid(), // Générer un numéro de reçu unique
        dateIssued: null,
        issuer: null,
        paymentDetails: {
            amount: this.amount, // Montant du paiement
            method: this.method  // Méthode de paiement
        }
    };
};

// Méthode d'instance pour mettre à jour les détails du reçu ultérieurement
PaymentSchema.methods.updateReceiptDetails = function (issuer) {
    if (this.receipt) {
        this.receipt.dateIssued = new Date(); // Date d'émission actuelle
        this.receipt.issuer = issuer;          // Émetteur du reçu
    } else {
        console.error('Receipt does not exist to update.');
    }
};

module.exports = mongoose.model('Payment', PaymentSchema);
