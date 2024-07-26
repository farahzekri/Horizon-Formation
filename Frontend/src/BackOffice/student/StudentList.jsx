import React, { useEffect, useState } from 'react';
import ComplexTable from "../admin/tables/components/ComplexTable";
import studentService from '../../services/studentServices';
import CheckTable from "../admin/tables/components/CheckTable";
import {Outlet, useNavigate} from "react-router-dom";
import courseService from "../../services/courseServices";

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const [selectedStudents, setSelectedStudents] = useState([]);

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
            Header: 'Class',
            accessor: 'enrollmentInfo.classId.level',
        },
        {
            Header: 'Formations',
            accessor: 'enrollmentInfo.formationId.name', // Assuming the first formation is displayed
        },
        {
            Header: 'Date de registration',
            accessor: 'enrollmentInfo.registrationDate',
        },
        {
            Header: 'Action Etudiant',
            accessor: '',
        },
    ];
    const handleCheckboxChange = (studentId) => {
        setSelectedStudents((prevSelected) =>
            prevSelected.includes(studentId)
                ? prevSelected.filter(id => id !== studentId)
                : [...prevSelected, studentId]
        );
    };
    const handleDeleteSelected = async () => {
        try {
            await Promise.all(
                selectedStudents.map(id => studentService.deleteStudentById(id))
            );
            const fetchStudents = async () => {
                try {
                    const data = await studentService.getAllStudents();
                    setStudents(data);
                    setSelectedStudents([]); // Clear selected formations
                } catch (error) {
                    console.error('Error fetching courses:', error);
                }
            };
            fetchStudents();
        } catch (error) {
            console.error('Error deleting courses:', error);
        }
    };

    const handleViewStudent = (studentId) => {
        navigate(`/admin/Etudiants/${studentId}`);
    };


    return (
        <div>
            <CheckTable tableName="Tableau des étudiants"
                        columnsData={columnsData}
                        tableData={students}
                        onAjouterClick={() => navigate('/admin/Etudiants/Ajouter')}
                        handleCheckboxChange={handleCheckboxChange}
                        handleDeleteSelected={handleDeleteSelected}
                        handleViewStudent={handleViewStudent}
                        selectedFormations={selectedStudents}
            />
        </div>
    );
};

export default StudentList;
