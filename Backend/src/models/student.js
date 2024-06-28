const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    personalInfo: {
        firstName: { type: String },
        lastName: { type: String },
        dateOfBirth: { type: Date },
        address: {
            city: { type: String },
            zip: { type: String },
            state: { type: String }
        },
        phoneNumber: { type: String },
        email: { type: String, unique: true }
    },
    enrollmentInfo: {
        registrationDate: { type: Date, default: Date.now },
        formations: [
            {
                formationId: { type: Schema.Types.ObjectId, ref: 'Formation' },
                level: { type: String },
                classId: { type: Schema.Types.ObjectId, ref: 'Class' }
            }
        ]
    },
    billingInfo: {
        invoices: [
            {
                invoiceId: { type: Schema.Types.ObjectId, ref: 'Invoice' }
            }
        ],
        payments: [
            {
                paymentId: { type: Schema.Types.ObjectId, ref: 'Payment' }
            }
        ]
    },
    academicRecords: {
        absences: [
            {
                date: { type: Date },
                reason: { type: String }
            }
        ],
        grades: [
            {
                gradeId: { type: Schema.Types.ObjectId, ref: 'Grade' }
            }
        ],
        reportCards: [
            {
                reportCardId: { type: Schema.Types.ObjectId, ref: 'ReportCard' }
            }
        ],
        diplomas: [
            {
                diplomaId: { type: Schema.Types.ObjectId, ref: 'Diploma' }
            }
        ]
    },
    documents: [
        {
            documentId: { type: Schema.Types.ObjectId, ref: 'Document' }
        }
    ],
    // Administrative Metadata
    dateCreated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Student', StudentSchema);
