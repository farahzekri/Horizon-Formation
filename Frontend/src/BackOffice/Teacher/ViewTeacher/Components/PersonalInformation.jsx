import React, { useState } from 'react';
import { statesOfTunisia } from "../../../SubAdmin/create_SubAdmin/stateoftunis";
import InputField from "../../../../components/fields/InputField";
import SelectField from "../../../../components/fields/SelectField";
import DateField from "../../../../components/fields/DateField";
import studentServices from "../../../../services/studentServices";
import teacherServices from "../../../../services/teacherServices";

const PersonalInformation = ({ teacher, onSave }) => {
        const [isEditing, setIsEditing] = useState(false);
        const [formData, setFormData] = useState(teacher.personalInfo);
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
                try {
                        const response = await teacherServices.editTeacher(teacher._id, formData);
                        onSave(formData);
                        setIsEditing(false);
                } catch (error) {
                        console.error('Error in handleSaveClick:', error);  // Log error details for debugging
                        setError('Failed to update personal information');
                }
        };

        const handleCancelClick = () => {
                setFormData(teacher.personalInfo);
                setIsEditing(false);
        };

        return (
            <div className="bg-white shadow-lg rounded-b-md  mb-6 relative dark:text-white dark:bg-navy-700 ">
                    <div className="text-end p-2">
                    <button
                        className="  bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={isEditing ? handleSaveClick : handleEditClick}
                    >
                            {isEditing ? 'Enregistrer' : 'Modifier'}
                    </button>
                    </div>
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    {isEditing ? (
                        <div className="p-6">
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
                                        <div className="border-t border-gray-200 ">
                                                <dl>
                                                        <div
                                                            className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                                <dt className="text-sm font-medium text-gray-500">
                                                                        Nom et Prénom
                                                                </dt>
                                                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                                        {teacher.personalInfo.firstName} {teacher.personalInfo.lastName}
                                                                </dd>
                                                        </div>
                                                        <div
                                                            className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                                <dt className="text-sm font-medium text-gray-500">
                                                                        Date de naissance
                                                                </dt>
                                                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                                        {new Date(teacher.personalInfo.dateOfBirth).toLocaleDateString()}
                                                                </dd>
                                                        </div>
                                                        <div
                                                            className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                                <dt className="text-sm font-medium text-gray-500">
                                                                        Numéro de téléphone
                                                                </dt>
                                                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                                        {teacher.personalInfo.phoneNumber}
                                                                </dd>
                                                        </div>
                                                        <div
                                                            className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                                <dt className="text-sm font-medium text-gray-500">
                                                                        Email
                                                                </dt>
                                                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                                        {teacher.personalInfo.email}
                                                                </dd>
                                                        </div>
                                                        <div
                                                            className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                                <dt className="text-sm font-medium text-gray-500">
                                                                        Adresse
                                                                </dt>
                                                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                                        {teacher.personalInfo.address.city}, {teacher.personalInfo.address.state}, {teacher.personalInfo.address.zip}
                                                                </dd>
                                                        </div>
                                                </dl>
                                        </div>
                        </div>
                    )}
            </div>
        );
};

export default PersonalInformation;
