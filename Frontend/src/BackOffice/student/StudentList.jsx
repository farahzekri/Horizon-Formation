import React, { useEffect, useState } from 'react';
import ComplexTable from "../admin/tables/components/ComplexTable";
import studentService from '../../services/studentServices';
import CheckTable from "../admin/tables/components/CheckTable";

const StudentList = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const data = await studentService.getAllStudents();
                setStudents(data);
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };

        fetchStudents();
    }, []);

    const columnsData = [
        {
            Header: 'Nom',
            accessor: (row) => `${row.personalInfo.lastName} ${row.personalInfo.firstName}`,
        },
        {
            Header: 'Numéro',
            accessor: 'personalInfo.phoneNumber',
        },
        {
            Header: 'Email',
            accessor: 'personalInfo.email',
        },
        {
            Header: 'Formation',
            accessor: 'enrollmentInfo.formations[0].level', // Assuming the first formation is displayed
        },
        {
            Header: 'Date de registration',
            accessor: 'enrollmentInfo.registrationDate',
        },
        {
            Header: 'Action',
            accessor: '',
        },
    ];

    return (
        <div>
            <CheckTable tableName="Tableau des étudiants" columnsData={columnsData} tableData={students} />
        </div>
    );
};

export default StudentList;
