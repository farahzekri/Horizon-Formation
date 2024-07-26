// pages/ViewStudent.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import studentServices from '../../../services/studentServices';
import PersonalInformation from "./Components/PersonalInformation";
import EnrollmentInformation from "./Components/EnrollementInfo";
import BillingInformation from "./Components/BillingInfo";
import AcademicRecords from "./Components/AcademicRecords";
import Documents from "./Components/Documents";
import Tabs from "../../../components/tabs/StudentTabs";
import {FaAward, FaFileInvoiceDollar, FaUser} from "react-icons/fa";
import { GiArchiveRegister } from "react-icons/gi";
import {IoIosDocument} from "react-icons/io";

const ViewStudent = () => {
    const { studentId } = useParams();
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('personalInfo');

    const fetchStudent = async () => {
        try {
            const data = await studentServices.getStudentById(studentId);
            setStudent(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudent();
    }, [studentId]);

    // Function to re-fetch the student data after save
    const onSave = async () => {
        try {
            const data = await studentServices.getStudentById(studentId);
            setStudent(data);
        } catch (error) {
            setError('Failed to fetch updated student information');
        }
    };

    if (loading) return <div className="flex justify-center items-center h-full"><div>Loading...</div></div>;
    if (error) return <div className="flex justify-center items-center h-full"><div>Error: {error}</div></div>;

    const tabs = [
        { key: 'personalInfo', label: 'Personal Information', icon: <FaUser size={18} className="mr-2"/>},
        { key: 'enrollmentInfo', label: 'Informations d\'inscription', icon: <GiArchiveRegister size={18} className="mr-2"/>},
        { key: 'billingInfo', label: 'Informations de facturation', icon: <FaFileInvoiceDollar size={18} className="mr-2"/> },
        { key: 'academicRecords', label: 'Dossiers académiques', icon: <FaAward size={18} className="mr-2"/>},
        {key: 'documents', label: 'Documents', icon: <IoIosDocument size={20} className="mr-2"/>}
    ];

    return (
        <div className="p-6">
            <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab}/>
            {activeTab === 'personalInfo' && <PersonalInformation student={student} onSave={onSave} />}
            {activeTab === 'enrollmentInfo' && <EnrollmentInformation student={student} />}
            {activeTab === 'billingInfo' && <BillingInformation student={student} />}
            {activeTab === 'academicRecords' && <AcademicRecords student={student} />}
            {activeTab === 'documents' && <Documents student={student} />}
        </div>
    );
};

export default ViewStudent;
