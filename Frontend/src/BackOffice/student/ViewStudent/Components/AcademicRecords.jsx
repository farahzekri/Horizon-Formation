// components/AcademicRecords.jsx
import React from 'react';

const AcademicRecords = ({ student }) => (
    <div className="bg-white shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Dossiers académiques</h2>
        <div>
            <strong>Absences:</strong>
            <ul className="list-disc pl-5">
                {student.academicRecords.absences.map((absence) => (
                    <li key={absence.date} className="mb-1">{new Date(absence.date).toLocaleDateString()} - {absence.reason}</li>
                ))}
            </ul>
        </div>
        <div>
            <strong>Grades:</strong>
            <ul className="list-disc pl-5">
                {student.academicRecords.grades.map((grade) => (
                    <li key={grade.gradeId} className="mb-1">{grade.gradeId}</li>
                ))}
            </ul>
        </div>
        <div>
            <strong>Report Cards:</strong>
            <ul className="list-disc pl-5">
                {student.academicRecords.reportCards.map((reportCard) => (
                    <li key={reportCard.reportCardId} className="mb-1">{reportCard.reportCardId}</li>
                ))}
            </ul>
        </div>
        <div>
            <strong>Diplomas:</strong>
            <ul className="list-disc pl-5">
                {student.academicRecords.diplomas.map((diploma) => (
                    <li key={diploma.diplomaId} className="mb-1">{diploma.diplomaId}</li>
                ))}
            </ul>
        </div>
    </div>
);

export default AcademicRecords;
