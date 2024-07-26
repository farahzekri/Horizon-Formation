// components/EnrollmentInformation.jsx
import React from 'react';

const EnrollmentInformation = ({ student }) => (
    <div className="bg-white shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Informations d'inscription</h2>
        <p className="mb-2"><strong>Date d'inscription :</strong> {new Date(student.enrollmentInfo?.registrationDate).toLocaleDateString()}</p>
        <p className="mb-2"><strong>Formation :</strong> {student.enrollmentInfo?.formationId.name}</p>
        <p className="mb-2"><strong>Classe :</strong> {student.enrollmentInfo?.classe}</p>
    </div>
);

export default EnrollmentInformation;
