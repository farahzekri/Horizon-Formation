import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import studentServices from '../../../services/studentServices';
import PersonalInformation from "./Components/PersonalInformation";
import EnrollmentInformation from "./Components/EmployementInfo";
import BillingInformation from "./Components/PaiementInfo";
import AcademicRecords from "./Components/AcademicRecords";
import Documents from "./Components/Documents";
import Tabs from "../../../components/tabs/StudentTabs";
import {FaAward, FaFileInvoiceDollar, FaUser} from "react-icons/fa";
import { GiArchiveRegister } from "react-icons/gi";
import {IoIosDocument} from "react-icons/io";
import teacherServices from "../../../services/teacherServices";
import EmployementInformation from "./Components/EmployementInfo";

const ViewTeacher = () => {
    const { teacherId } = useParams();
    const [teacher, setTeacher] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('personalInfo');

    const fetchTeacher = async () => {
        try {
            const data = await teacherServices.getTeacherById(teacherId);
            setTeacher(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTeacher();
    }, [teacherId]);

    const onSave = async () => {
        try {
            fetchTeacher();
        } catch (error) {
            setError('Failed to fetch updated teacher information');
        }
    };

    if (loading) return <div className="flex justify-center items-center h-full"><div>Loading...</div></div>;
    if (error) return <div className="flex justify-center items-center h-full"><div>Error: {error}</div></div>;

    const tabs = [
        { key: 'personalInfo', label: 'Personal Information', icon: <FaUser size={18} className="mr-2"/>},
        { key: 'enrollmentInfo', label: 'Informations d\'emploi', icon: <GiArchiveRegister size={18} className="mr-2"/>},
        { key: 'billingInfo', label: 'Informations de paiement', icon: <FaFileInvoiceDollar size={18} className="mr-2"/> },
        { key: 'academicRecords', label: 'Dossiers académiques', icon: <FaAward size={18} className="mr-2"/>},
        {key: 'documents', label: 'Documents', icon: <IoIosDocument size={20} className="mr-2"/>}
    ];

    return (
        <div className="p-6">
            <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab}/>
            {activeTab === 'personalInfo' && <PersonalInformation teacher={teacher} onSave={onSave} />}
            {activeTab === 'enrollmentInfo' && <EmployementInformation teacher={teacher} />}
            {activeTab === 'billingInfo' && <BillingInformation teacher={teacher} />}
            {activeTab === 'academicRecords' && <AcademicRecords teacher={teacher} />}
            {activeTab === 'documents' && <Documents teacher={teacher} />}
        </div>
    );
};

export default ViewTeacher;
