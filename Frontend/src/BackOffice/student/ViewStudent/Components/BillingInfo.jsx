// components/BillingInformation.jsx
import React from 'react';

const BillingInformation = ({ student }) => (
    <div className="bg-white shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Informations de facturation</h2>
        <div>
            <strong>Invoices:</strong>
            <ul className="list-disc pl-5">
                {student.billingInfo.invoices.map((invoice) => (
                    <li key={invoice.invoiceId} className="mb-1">{invoice.invoiceId}</li>
                ))}
            </ul>
        </div>
        <div>
            <strong>Payments:</strong>
            <ul className="list-disc pl-5">
                {student.billingInfo.payments.map((payment) => (
                    <li key={payment.paymentId} className="mb-1">{payment.paymentId}</li>
                ))}
            </ul>
        </div>
    </div>
);

export default BillingInformation;
