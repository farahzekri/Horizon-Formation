// components/EnrollmentInformation.jsx
import React from 'react';

const EmployementInformation = ({ teacher }) => (
    <div className="bg-white shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Informations d'inscription</h2>
        <p className="mb-2"><strong>Date d'inscription :</strong> {new Date(teacher.employmentInfo?.hireDate).toLocaleDateString()}</p>
        <p className="mb-2"><strong>Departement :</strong> {teacher.employmentInfo?.departmentId}</p>
        <p className="mb-2"><strong>Poste :</strong> {teacher.employmentInfo?.position}</p>
    </div>
);

export default EmployementInformation;
