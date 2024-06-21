import React, { useState } from "react";
import Card from "components/card";
import InputField from "components/fields/InputField";
import { statesOfTunisia } from "./stateoftunis";
import SelectField from "../../../components/fields/SelectField";
import DateField from "components/fields/DateField";
import ProgressBar from "./components/progressBar";
import { RoleCheckbox } from "./components/RolecheckBox";
import authService from "../../../services/authServices";

const CreateSubAdmin = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        city: '',
        state: '',
        zip: '',
        genre: '',
        dob: '',
    });

    const genreOptions = [
        { value: "Mâle", label: "Mâle" },
        { value: "Femelle", label: "Femelle" },
        { value: "Autre", label: "Autre" },
    ];

    const steps = [
        "Étape 1: Informations personnelles",
        "Étape 2: Privilèges",
    ];

    const nextStep = () => {
        setCurrentStep(currentStep + 1);
    };

    const prevStep = () => {
        setCurrentStep(currentStep - 1);
    };

    const [isStudentChecked, setIsStudentChecked] = useState(false);
    const [studentActions, setStudentActions] = useState({
        add: false,
        edit: false,
        delete: false,
    });

    const [isTeacherChecked, setIsTeacherChecked] = useState(false);
    const [teacherActions, setTeacherActions] = useState({
        add: false,
        edit: false,
        delete: false,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        const permissions = [];
        if (isStudentChecked) permissions.push('manage:student');
        else {
            if (studentActions.add) permissions.push('add:student');
            if (studentActions.edit) permissions.push('edit:student');
            if (studentActions.delete) permissions.push('delete:student');
        }
        if (isTeacherChecked) permissions.push('manage:teacher');
        else {
            if (teacherActions.add) permissions.push('add:teacher');
            if (teacherActions.edit) permissions.push('edit:teacher');
            if (teacherActions.delete) permissions.push('delete:teacher');
        }

        const userData = {
            username: formData.username,
            password: formData.password,
            email: formData.email,
            permissions,
            firstName: formData.firstName,
            lastName: formData.lastName,
            dob: formData.dob,
            gender: formData.genre,
            address: {
                city: formData.city,
                state: formData.state,
                zip: formData.zip.toString(),
            },
        };
console.log(userData)
        try {
            await authService.register(userData);
            alert('User registered successfully');
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <Card className="mt-20 bg-white flex justify-center items-center p-8 rounded-lg shadow-md">
            <div className="grid grid-cols-1 gap-8">
                <div className="col-span-1">
                    <ProgressBar steps={steps} currentStep={currentStep} />
                </div>

                {currentStep === 0 && (
                    <form className="w-full max-w-lg">
                        <h1 className="flex justify-center items-center mb-9">Ajouter un SubAdmin</h1>

                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <InputField
                                    label="Nom d'utilisateur"
                                    type="text"
                                    id="username"
                                    name="username"
                                    placeholder="Nom d'utilisateur"
                                    value={formData.username}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                                <InputField
                                    label="Email"
                                    type="text"
                                    id="email"
                                    name="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <InputField
                                    label="Mot de passe"
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Mot de passe"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                                <InputField
                                    label="Confirmer Mot de passe"
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    placeholder="Confirmer Mot de passe"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <InputField
                                    label="Prénom"
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    placeholder="Prénom"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                                <InputField
                                    label="Nom"
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    placeholder="Nom"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <InputField
                                    label="Ville"
                                    type="text"
                                    id="city"
                                    name="city"
                                    placeholder="Ville"
                                    value={formData.city}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                                <InputField
                                    label="Code postal"
                                    type="number"
                                    id="zip"
                                    name="zip"
                                    placeholder="Code postal"
                                    value={formData.zip}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <SelectField
                                    label="Genre"
                                    id="genre"
                                    name="genre"
                                    placeholder="Sélectionner le genre"
                                    options={genreOptions}
                                    value={formData.genre}
                                    onChange={(selectedValue) => setFormData({ ...formData, genre: selectedValue })}
                                />
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                                <DateField
                                    label="Date de naissance"
                                    id="dob"
                                    name="dob"
                                    placeholder="Date de naissance"
                                    value={formData.dob}
                                    onChange={(selectedDate) => setFormData({ ...formData, dob: selectedDate })}
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3">
                                <SelectField
                                    label="État"
                                    id="state"
                                    name="state"
                                    placeholder="Sélectionner l'état"
                                    options={statesOfTunisia}
                                    value={formData.state}
                                    onChange={(selectedValue) => setFormData({ ...formData, state: selectedValue })}
                                />
                            </div>
                        </div>

                        <div className="flex justify-between">
                            <button
                                type="button"
                                onClick={prevStep}
                                className="bg-gray-500 text-white py-2 px-4 rounded"
                            >
                                Précédent
                            </button>
                            <button
                                type="button"
                                onClick={nextStep}
                                className="bg-blue-500 text-white py-2 px-4 rounded"
                            >
                                Suivant
                            </button>
                        </div>
                    </form>
                )}

                {currentStep === 1 && (
                    <div>
                        <h1 className="flex justify-center items-center mb-9">Permissions</h1>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <RoleCheckbox
                                role="Étudiante"
                                isChecked={isStudentChecked}
                                setIsChecked={setIsStudentChecked}
                                actions={studentActions}
                                setActions={setStudentActions}
                            />
                            <RoleCheckbox
                                role="Professeur"
                                isChecked={isTeacherChecked}
                                setIsChecked={setIsTeacherChecked}
                                actions={teacherActions}
                                setActions={setTeacherActions}
                            />
                        </div>
                        <div className="flex justify-between">
                            <button
                                type="button"
                                onClick={prevStep}
                                className="bg-gray-500 text-white py-2 px-4 rounded"
                            >
                                Précédent
                            </button>
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="bg-green-500 text-white py-2 px-4 rounded"
                            >
                                Soumettre
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </Card>
    );
};

export default CreateSubAdmin;