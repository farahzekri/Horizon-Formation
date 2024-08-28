// components/EnrollmentInformation.jsx
import React, {useEffect, useState} from 'react';
import studentServices from "../../../../services/studentServices";
import DateField from "../../../../components/fields/DateField";
import SelectField from "../../../../components/fields/SelectField";
import formationServices from "../../../../services/formationServices";
import classServices from "../../../../services/classService";

const EnrollmentInformation = ({ student, onSave }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(student.enrollmentInfo);
    const [error, setError] = useState(null);
    const [formations, setFormations] = useState([]);
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        const fetchFormations = async () => {
            try {
                const response = await formationServices.getAllFormations();
                const formationOptions = response.map((formation) => ({
                    value: formation._id, // Assuming the formation ID is '_id'
                    label: formation.name, // Assuming the formation name is 'name'
                }));
                setFormations(formationOptions);
            } catch (error) {
                console.error("Error fetching formations:", error);
            }
        };

        fetchFormations();
    }, []);

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await classServices.getclass();
                const classOptions = response.map((classe) => ({
                    value: classe._id, // Assuming the formation ID is '_id'
                    label: classe.level, // Assuming the formation name is 'name'
                }));
                setClasses(classOptions);
            } catch (error) {
                console.error("Error fetching formations:", error);
            }
        };

        fetchClasses();
    }, []);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSelectChange = (selectedOption, fieldName) => {
        setFormData((prevData) => ({
            ...prevData,
            [fieldName]: selectedOption.value,
        }));
    };
    const handleDateChange = (date) => {
        setFormData((prevData) => ({
            ...prevData,
            registrationDate: date,
        }));
    };
    const handleSaveClick = async () => {
        try {
            const response = await studentServices.editStudent(student._id, formData);
            onSave(formData);
            setIsEditing(false);
        } catch (error) {
            console.error('Error in handleSaveClick:', error);  // Log error details for debugging
            setError('Failed to update personal information');
        }
    };

    const handleCancelClick = () => {
        setFormData(student.personalInfo);
        setIsEditing(false);
    };
    return (

            <div className="bg-white shadow-lg rounded-b-md p-6 mb-6 relative">
                <button
                    className="absolute top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={isEditing ? handleSaveClick : handleEditClick}
                >
                    {isEditing ? 'Enregistrer' : 'Modifier'}
                </button>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                {isEditing ? (
                    <div>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <DateField
                                label="Date de registration"
                                id="registrationDate"
                                value={formData.registrationDate}
                                onChange={handleDateChange}
                            />
                            <SelectField
                                label="Formation"
                                id="formation"
                                name="formation"
                                options={formations}
                                value={formData.formationId}
                                onChange={(selectedOption) => handleSelectChange(selectedOption, 'formationId')}
                            />
                            <SelectField
                                label="Classe"
                                id="classe"
                                name="classe"
                                options={classes}
                                value={formData.classId}
                                onChange={(selectedOption) => handleSelectChange(selectedOption, 'classId')}
                            />
                        </div>
                        <button
                            className="bg-red-500 text-white px-4 py-2 rounded mt-4"
                            onClick={handleCancelClick}
                        >
                            Cancel
                        </button>
                    </div>
                ) : (
                    <div>
                        <p className="mb-2"><strong>Date d'inscription
                            :</strong> {new Date(student.enrollmentInfo?.registrationDate).toLocaleDateString()}</p>
                        <p className="mb-2"><strong>Formation :</strong> {student.enrollmentInfo?.formationId.name}</p>
                        <p className="mb-2"><strong>Classe :</strong> {student.enrollmentInfo?.classId.level}</p>
                    </div>
                )}
            </div>
    );
}
export default EnrollmentInformation;
