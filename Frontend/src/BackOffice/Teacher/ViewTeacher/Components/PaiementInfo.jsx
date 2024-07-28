// components/BillingInformation.jsx
import React from 'react';

const BillingInformation = ({ teacher }) => (
    <div className="bg-white shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Informations de paiement</h2>
        <div>
            <strong>Payments:</strong>
            <ul className="list-disc pl-5">
                {teacher.salaryInfo.salaries.map((salary) => (
                    <li key={salary.salaryId} className="mb-1">{salary.salaryId}</li>
                ))}
            </ul>
        </div>
    </div>
);

export default BillingInformation;
