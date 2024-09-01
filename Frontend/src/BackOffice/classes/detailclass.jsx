import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import classServices from "services/classService";
import formationService from '../../services/formationServices';
import studentService from '../../services/studentServices';
import Schedule from "./emploi";
import AssignedStudents from "./components/AssignedStudents";
import ClassInfo from "./components/ClassInfo";
import {FaCalendarAlt, FaListAlt, FaUser} from "react-icons/fa";
import Tabs from "components/tabs/StudentTabs";
const DetailClasses = () => {
    const { id } = useParams();
    const [classDetails, setClassDetails] = useState(null);
    const [formations, setFormations] = useState([]);
    const [allStudents, setAllStudents] = useState([]);
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [formData, setFormData] = useState({
        formationId: '',
        level: '',
        room: '',
    });
    const [activeTab, setActiveTab] = useState('classInfo');
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const data = await studentService.getAllStudents();
                setAllStudents(data);
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };

        fetchStudents();
    }, []);

    useEffect(() => {
        const fetchClassDetails = async () => {
            try {
                const response = await classServices.getclassById(id);
                setClassDetails(response);
                setFormData({
                    formationId: response.formationId?._id || '',
                    level: response.level || '',
                    room: response.room || '',
                });
                const selectedIds = response.students.map(student => student.studentId._id);
                setSelectedStudents(selectedIds);
            } catch (error) {
                console.error('Erreur lors de la récupération des détails de la classe:', error);
            }
        };

        fetchClassDetails();
    }, [id]);

    useEffect(() => {
        const fetchFormations = async () => {
            try {
                const data = await formationService.getAllFormations();
                setFormations(data);
            } catch (error) {
                console.error('Error fetching formations:', error);
            }
        };

        fetchFormations();
    }, []);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setFormData({
            formationId: classDetails.formationId?._id || '',
            level: classDetails.level || '',
            room: classDetails.room || '',
        });
    };

    const handleSaveClassDetails = async () => {
        try {
            await classServices.updateClassDetails(id, {
                formationId: formData.formationId,
                level: formData.level,
                room: formData.room
            });
            setIsEditing(false);
            const updatedClassDetails = await classServices.getclassById(id);
            setClassDetails(updatedClassDetails);
        } catch (error) {
            console.error('Erreur lors de la sauvegarde des modifications:', error);
        }
    };

    const handleSaveClassStudents = async () => {
        try {
            await classServices.updateClassStudents(id, selectedStudents);
            setIsEditing(false);
            const updatedClassDetails = await classServices.getclassById(id);
            setClassDetails(updatedClassDetails);
        } catch (error) {
            console.error('Erreur lors de la sauvegarde des étudiants:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log(`Input Change - Name: ${name}, Value: ${value}`);  // Debugging line
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    const handleCheckboxChange = (studentId) => {
        setSelectedStudents((prevSelected) =>
            prevSelected.includes(studentId)
                ? prevSelected.filter((id) => id !== studentId)
                : [...prevSelected, studentId]
        );
    };

    const tabs = [
        { key: 'classInfo', label: 'Informations sur la classe', icon: <FaUser size={18} className="mr-2" /> },
        { key: 'assignedStudents', label: 'Etudiants assignés', icon: <FaListAlt size={18} className="mr-2" /> },
        { key: 'classSchedule', label: 'Emploi du temps', icon: <FaCalendarAlt size={18} className="mr-2" /> },
    ];

    return (
        <div className="p-6">
            <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
            {activeTab === 'classInfo' && (
                <ClassInfo
                    isEditing={isEditing}
                    formData={formData}
                    setFormData={setFormData}
                    classDetails={classDetails}
                    formations={formations}
                    handleInputChange={handleInputChange}
                    handleSaveClick={handleSaveClassDetails}
                    handleCancelClick={handleCancelClick}
                    handleEditClick={handleEditClick}
                />
            )}
            {activeTab === 'assignedStudents' && (
                <AssignedStudents
                    isEditing={isEditing}
                    allStudents={allStudents}
                    selectedStudents={selectedStudents}
                    classDetails={classDetails}
                    handleCheckboxChange={handleCheckboxChange}
                    handleSaveClick={handleSaveClassStudents}
                    handleCancelClick={handleCancelClick}
                    handleEditClick={handleEditClick}
                    
                />
            )}
            {activeTab === 'classSchedule' && <Schedule />}
            {/* {isEditing && (
                <div className="flex justify-end space-x-4 mt-4">
                    <button className="btn btn-secondary" onClick={handleCancelClick}>
                        Annuler
                    </button>
                    <button className="btn btn-primary" onClick={handleSaveClick}>
                        Sauvegarder
                    </button>
                </div>
            )} */}
        </div>
    );
};

export default DetailClasses;