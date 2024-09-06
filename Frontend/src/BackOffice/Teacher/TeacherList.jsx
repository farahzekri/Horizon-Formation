import React, { useEffect, useState } from 'react';
import ComplexTable from "../admin/tables/components/ComplexTable";
import studentService from '../../services/studentServices';
import CheckTable from "../admin/tables/components/CheckTable";
import {Outlet, useNavigate} from "react-router-dom";
import courseService from "../../services/courseServices";
import teacherServices from "../../services/teacherServices";

const TeacherList = () => {
    const [teachers, setTeachers] = useState([]);
    const [selectedTeachers, setSelectedTeachers] = useState([]);

    const navigate = useNavigate();
    const fetchTeachers = async () => {
        try {
            const data = await teacherServices.getAllTeachers();
            setTeachers(data);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    useEffect(() => {
        fetchTeachers();
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
            Header: 'Filière',
            accessor: 'employmentInfo.formation.name',
        },
        {
            Header: 'Date d\'embauche',
            accessor: 'employmentInfo.hireDate',
        },
        {
            Header: 'Action Formateur',
            accessor: '',
        },
    ];
    const handleCheckboxChange = (teacherId) => {
        setSelectedTeachers((prevSelected) =>
            prevSelected.includes(teacherId)
                ? prevSelected.filter(id => id !== teacherId)
                : [...prevSelected, teacherId]
        );
    };
    const handleDeleteSelected = async () => {
        try {
            await Promise.all(
                selectedTeachers.map(id => teacherServices.deleteTeacherById(id))
            );
            fetchTeachers();
        } catch (error) {
            console.error('Error deleting courses:', error);
        }
    };

    const handleViewTeacher = (teacherId) => {
        navigate(`/admin/Formateurs/${teacherId}`);
    };


    return (
        <div>
            <CheckTable tableName="Tableau des formateurs"
                        columnsData={columnsData}
                        tableData={teachers}
                        onAjouterClick={() => navigate('/admin/Formateurs/Ajouter')}
                        handleCheckboxChange={handleCheckboxChange}
                        handleDeleteSelected={handleDeleteSelected}
                        handleViewStudent={handleViewTeacher}
                        selectedFormations={selectedTeachers}
            />
        </div>
    );
};

export default TeacherList;
