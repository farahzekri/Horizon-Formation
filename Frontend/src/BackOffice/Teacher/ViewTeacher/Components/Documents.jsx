// components/Documents.jsx
import React from 'react';

const Documents = ({ teacher }) => (
    <div className="bg-white shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Documents</h2>
        <ul className="list-disc pl-5">
            {teacher.documents.map((document) => (
                <li key={document.documentId} className="mb-1">{document.documentId}</li>
            ))}
        </ul>
    </div>
);

export default Documents;
