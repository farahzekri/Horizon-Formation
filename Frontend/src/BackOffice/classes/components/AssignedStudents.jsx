import React from 'react';
import ColumnsTable from "./columnstable";
import CheckTable from "./checktable";
import Checkbox from "components/checkbox";

const AssignedStudents = ({ isEditing, allStudents, selectedStudents, classDetails, handleCheckboxChange,handleEditClick, handleSaveClick, handleCancelClick  }) => {
    const columnsData2 = [
        {
            Header: 'Sélectionner',
            accessor: 'checkbox',
            Cell: ({ row }) => (
                <Checkbox
                    checked={selectedStudents.includes(row.original._id)}
                    onChange={() => handleCheckboxChange(row.original._id)}
                />
            ),
        },
        {
            Header: 'Nom',
            accessor: (row) => `${row.personalInfo.lastName} ${row.personalInfo.firstName}`,
        },
        {
            Header: 'Formations',
            accessor: 'enrollmentInfo.formations[0].level',
        },
    ];

    const columnsData = [
        {
            Header: 'Nom',
            accessor: (row) => `${row.personalInfo.lastName} ${row.personalInfo.firstName}`,
        },
        {
            Header: 'email',
            accessor: 'personalInfo.email',
        },
        {
            Header: 'Numero de telephone',
            accessor: 'personalInfo.phoneNumber',
        },
    ];

    return (
        <div className="max-h-96 overflow-y-auto bg-white shadow-lg p-6 mb-6">
             {!isEditing ? (
                <button
                    className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={handleEditClick}
                >
                    Modifier
                </button>
            ) : (
                <>
                    <button
                        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
                        onClick={handleSaveClick}
                    >
                        Enregistrer
                    </button>
                    <button
                        className="mb-4 px-4 py-2 bg-red-500 text-white rounded"
                        onClick={handleCancelClick}
                    >
                        Annuler
                    </button>
                </>
            )}
            {isEditing ? (
                <CheckTable
                    columnsData={columnsData2}
                    tableData={allStudents}
                    selected={selectedStudents}
                    handleCheckboxChange={handleCheckboxChange}
                />
            ) : (
                <ColumnsTable
                    columnsData={columnsData}
                    tableData={classDetails.students.map(student => ({
                        ...student.studentId,
                        personalInfo: {
                            ...student.studentId.personalInfo,
                            dateOfBirth: new Date(student.studentId.personalInfo.dateOfBirth).toLocaleDateString('fr-FR'),
                        },
                    }))}
                />
            )}
        </div>
    );
};

export default AssignedStudents;
