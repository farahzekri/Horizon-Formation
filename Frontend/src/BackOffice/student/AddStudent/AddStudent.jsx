import React, { useState } from "react";
import InputField from "../../../components/fields/TextField";

function AddStudent() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        city: "",
        zip: "",
        state: "",
        phoneNumber: "",
        email: "",
        formationId: "",
        level: "",
        classId: "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold mb-4">Add Student</h2>
            <InputField
                label="First Name"
                id="firstName"
                name="firstName"
                type="text"
                placeholder="Enter first name"
                value={formData.firstName}
                onChange={handleChange}
                extra="mb-4"
            />
            <InputField
                label="Last Name"
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Enter last name"
                value={formData.lastName}
                onChange={handleChange}
                extra="mb-4"
            />
            <InputField
                label="Date of Birth"
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                placeholder="Enter date of birth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                extra="mb-4"
            />
            <InputField
                label="City"
                id="city"
                name="city"
                type="text"
                placeholder="Enter city"
                value={formData.city}
                onChange={handleChange}
                extra="mb-4"
            />
            <InputField
                label="ZIP"
                id="zip"
                name="zip"
                type="text"
                placeholder="Enter ZIP code"
                value={formData.zip}
                onChange={handleChange}
                extra="mb-4"
            />
            <InputField
                label="State"
                id="state"
                name="state"
                type="text"
                placeholder="Enter state"
                value={formData.state}
                onChange={handleChange}
                extra="mb-4"
            />
            <InputField
                label="Phone Number"
                id="phoneNumber"
                name="phoneNumber"
                type="text"
                placeholder="Enter phone number"
                value={formData.phoneNumber}
                onChange={handleChange}
                extra="mb-4"
            />
            <InputField
                label="Email"
                id="email"
                name="email"
                type="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                extra="mb-4"
            />
            <InputField
                label="Formation ID"
                id="formationId"
                name="formationId"
                type="text"
                placeholder="Enter formation ID"
                value={formData.formationId}
                onChange={handleChange}
                extra="mb-4"
            />
            <InputField
                label="Level"
                id="level"
                name="level"
                type="text"
                placeholder="Enter level"
                value={formData.level}
                onChange={handleChange}
                extra="mb-4"
            />
            <InputField
                label="Class ID"
                id="classId"
                name="classId"
                type="text"
                placeholder="Enter class ID"
                value={formData.classId}
                onChange={handleChange}
                extra="mb-4"
            />
            <button
                type="submit"
                className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
            >
                Add Student
            </button>
        </form>
    );
}

export default AddStudent;
