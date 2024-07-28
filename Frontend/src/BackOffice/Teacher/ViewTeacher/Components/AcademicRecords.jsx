// components/AcademicRecords.jsx
import React from 'react';

const AcademicRecords = ({ teacher }) => (
    <div className="bg-white shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Dossiers académiques</h2>
        <div>
            <strong>Absences:</strong>
            <ul className="list-disc pl-5">
                {teacher.academicRecords.courses.map((course) => (
                    <li key={course.courseId} className="mb-1">{course.courseId}</li>
                ))}
            </ul>
        </div>
        <div>
            <strong>Grades:</strong>
            <ul className="list-disc pl-5">
                {teacher.academicRecords.evaluations.map((evaluation) => (
                    <li key={evaluation.gradeId} className="mb-1">{evaluation.gradeId}</li>
                ))}
            </ul>
        </div>
    </div>
);

export default AcademicRecords;
