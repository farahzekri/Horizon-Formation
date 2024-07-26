import React, { useState } from 'react';
import { statesOfTunisia } from "../../../SubAdmin/create_SubAdmin/stateoftunis";
import InputField from "../../../../components/fields/InputField";
import SelectField from "../../../../components/fields/SelectField";
import DateField from "../../../../components/fields/DateField";
import studentServices from "../../../../services/studentServices";

const PersonalInformation = ({ student, onSave }) => {
        const [isEditing, setIsEditing] = useState(false);
        const [formData, setFormData] = useState(student.personalInfo);
        const [error, setError] = useState(null);

        const handleEditClick = () => {
                setIsEditing(true);
        };

        const handleChange = (event) => {
                const { name, value } = event.target;
                setFormData((prevData) => ({
                        ...prevData,
                        [name]: value,
                }));
        };

        const handleStateChange = (selectedValue) => {
                setFormData((prevData) => ({
                        ...prevData,
                        address: {
                                ...prevData.address,
                                state: selectedValue,
                        },
                }));
        };
        const handleDateChange = (date) => {
                setFormData((prevData) => ({
                        ...prevData,
                        dateOfBirth: date,
                }));
        };

        const handleSaveClick = async () => {
                console.log('id', student._id);
                try {
                        const response = await studentServices.editStudent(student._id, formData);
                        console.log('Response:', response);  // Check the response for successful updates
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
                                        <InputField
                                            label="Nom"
                                            id="firstName"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            placeholder="First Name"
                                        />
                                        <InputField
                                            label="Prénom"
                                            id="lastName"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            placeholder="Last Name"
                                        />
                                        <DateField
                                            label="Date de naissance"
                                            id="dateOfBirth"
                                            value={formData.dateOfBirth}
                                            onChange={handleDateChange}
                                        />
                                        <InputField
                                            label="Numéro de téléphone"
                                            id="phoneNumber"
                                            name="phoneNumber"
                                            value={formData.phoneNumber}
                                            onChange={handleChange}
                                            placeholder="Phone Number"
                                        />
                                        <InputField
                                            label="Email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Email"
                                        />
                                        <SelectField
                                            label="État"
                                            id="state"
                                            name="state"
                                            value={formData.address.state}
                                            onChange={handleStateChange}
                                            placeholder="Select State"
                                            options={statesOfTunisia}
                                        />
                                        <InputField
                                            label="Ville"
                                            id="city"
                                            name="city"
                                            value={formData.address.city}
                                            onChange={handleChange}
                                            placeholder="City"
                                        />
                                        <InputField
                                            label="Code postal"
                                            id="zip"
                                            name="zip"
                                            value={formData.address.zip}
                                            onChange={handleChange}
                                            placeholder="ZIP Code"
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
                                <p className="mb-2">
                                        <strong>Nom:</strong> {student.personalInfo.firstName} {student.personalInfo.lastName}
                                </p>
                                <p className="mb-2">
                                        <strong>Date de naissance:</strong> {new Date(student.personalInfo.dateOfBirth).toLocaleDateString()}
                                </p>
                                <p className="mb-2">
                                        <strong>Numéro de téléphone:</strong> {student.personalInfo.phoneNumber}
                                </p>
                                <p className="mb-2">
                                        <strong>Email:</strong> {student.personalInfo.email}
                                </p>
                                <p>
                                        <strong>Adresse:</strong> {student.personalInfo.address.city}, {student.personalInfo.address.state}, {student.personalInfo.address.zip}
                                </p>
                        </div>
                    )}
            </div>
        );
};

export default PersonalInformation;
