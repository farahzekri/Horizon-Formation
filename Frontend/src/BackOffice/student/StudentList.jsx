import React, { useEffect, useState } from 'react';
import ComplexTable from "../admin/tables/components/ComplexTable";
import studentService from '../../services/studentServices';
import CheckTable from "../admin/tables/components/CheckTable";
import {Outlet, useNavigate} from "react-router-dom";

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const navigate = useNavigate();

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

    // Define columnsData based on students information
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
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Tableau des étudiants</h1>
                <button
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                    onClick={() => navigate('/admin/Etudiants/Ajouter')}
                >
                    Ajouter Etudiant
                </button>
            </div>
            <CheckTable tableName="Tableau des étudiants" columnsData={columnsData} tableData={students}/>
        </div>
    );
};

export default StudentList;
