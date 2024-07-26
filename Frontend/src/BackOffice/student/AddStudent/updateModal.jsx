import React, { useState } from 'react';
import Card from "../../../components/card";
import InputField from "../../../components/fields/InputField";
import DateField from "../../../components/fields/DateField";



const UpdateStudentModal = ({student, handleUpdate }) => {
    const [formData, setFormData] = useState({
        firstName: student.personalInfo.firstName,
        lastName: student.personalInfo.lastName,
        dateOfBirth: student.personalInfo.dateOfBirth,
        phoneNumber: student.personalInfo.phoneNumber,
        email: student.personalInfo.email,
        address: student.personalInfo.address,
        formations: student.enrollmentInfo.formations.map((formation) => ({
            _id: formation._id,
            level: formation.level,
            name: formation.formationId.name,
        })),
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFormationChange = (index, e) => {
        const { name, value } = e.target;
        const newFormations = formData.formations.map((formation, i) => (
            i === index ? { ...formation, [name]: value } : formation
        ));
        setFormData({
            ...formData,
            formations: newFormations,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleUpdate(formData);
    };

    return (
        <Card>
            <div className="flex items-center justify-center min-h-screen">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-4">Update Student</h2>
                    <form onSubmit={handleSubmit}>
                        <InputField
                            label="First Name"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            extra="mb-4"
                        />
                        <InputField
                            label="Last Name"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            extra="mb-4"
                        />
                        <DateField
                            label="Date of Birth"
                            id="dateOfBirth"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                            extra="mb-4"
                        />
                        <InputField
                            label="Phone Number"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            extra="mb-4"
                        />
                        <InputField
                            label="Email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            extra="mb-4"
                        />
                        <InputField
                            label="Address"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            extra="mb-4"
                        />
                        {formData.formations.map((formation, index) => (
                            <div key={formation._id} className="mb-4">
                                <h3 className="text-lg font-semibold mb-2">Formation {index + 1}</h3>
                                <InputField
                                    label="Level"
                                    id={`formation-level-${index}`}
                                    name="level"
                                    value={formation.level}
                                    onChange={(e) => handleFormationChange(index, e)}
                                    extra="mb-2"
                                />
                                <InputField
                                    label="Name"
                                    id={`formation-name-${index}`}
                                    name="name"
                                    value={formation.name}
                                    onChange={(e) => handleFormationChange(index, e)}
                                    extra="mb-2"
                                />
                            </div>
                        ))}
                        <button type="submit" className="mt-4">
                            Update
                        </button>
                    </form>
                </div>
            </div>
        </Card>
    );
};

export default UpdateStudentModal;
