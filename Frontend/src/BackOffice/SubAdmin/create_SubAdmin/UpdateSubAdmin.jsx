import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "components/card";
import InputField from "components/fields/InputField";
import { statesOfTunisia } from "./stateoftunis";
import SelectField from "../../../components/fields/SelectField";
import DateField from "components/fields/DateField";
import ProgressBar from "./components/progressBar";
import { RoleCheckbox } from "./components/RolecheckBox";
import PhoneField from "components/fields/PhoneField";
import { validateField } from "./components/validateField";
import PhoneNumberInput from "components/fields/PhoneField";
import { get_User_By_Username, Update_User_By_Username } from "../../../services/UserService";
import { data } from "autoprefixer";

const UpdateSubAdmin = () => {
    const { username } = useParams();
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
        permissions: '',
        phone:','
    });

    const genreOptions = [
        { value: "Mâle", label: "Mâle" },
        { value: "Femelle", label: "Femelle" },
        { value: "Autre", label: "Autre" },
    ];

    const steps = [
        "Étape 1: Acount personnelles",
        "Étape 2: Informations personnelles",
        "Étape 3: Privilèges",
    ];

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const data = await get_User_By_Username(username);
                setFormData({
                    username: data.username,
                    email: data.email,
                    password: '',
                    confirmPassword: '',
                    firstName: data.firstName,
                    lastName: data.lastName,
                    city: data.address.city,
                    state: data.address.state,
                    zip: data.address.zip,
                    genre: data.gender,
                    dob: data.dob ? new Date(data.dob).toISOString().split('T')[0] : '', // Vérifiez le format de la 
                    permissions: data.permissions,
                    phone:data.phone,
                });
            } catch (error) {
                console.error("Failed to fetch user data:", error.message);
            }
        };
        fetchUserData();
    }, [username]);

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

    const [formErrors, setFormErrors] = useState({
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
        phone:'',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        const error = validateField(name, value, formData.password);
        setFormErrors({
            ...formErrors,
            [name]: error
        });
    };

    const handleSubmit = async () => {
        const errors = {};
        Object.keys(formData).forEach(key => {
            const error = validateField(key, formData[key], formData.password);
            if (error) {
                errors[key] = error;
            }
        });
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }
    
        const permissions = [];
    
        if (isStudentChecked) {
            permissions.push('manage:student');
        } else {
            if (studentActions.add) permissions.push('add:student');
            if (studentActions.edit) permissions.push('edit:student');
            if (studentActions.delete) permissions.push('delete:student');
        }
    
        if (isTeacherChecked) {
            permissions.push('manage:teacher');
        } else {
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
            phone: data.phone,
        };
    
        try {
            await Update_User_By_Username(username, userData);
            alert('Utilisateur mis à jour avec succès');
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
                        <h1 className="flex justify-center items-center mb-9">Mettre à jour un SubAdmin</h1>

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
                                    error={formErrors.username}
                                    state={formErrors.username ? 'error' : 'success'}
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
                                    error={formErrors.email}
                                    state={formErrors.email ? 'error' : 'success'}
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
                                    error={formErrors.password}
                                    state={formErrors.password ? 'error' : 'success'}
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
                                    error={formErrors.confirmPassword}
                                    state={formErrors.confirmPassword ? 'error' : 'success'}
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
                    <form className="w-full max-w-lg">
                        <h1 className="flex justify-center items-center mb-9">Mettre à jour un SubAdmin</h1>

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
                                    error={formErrors.firstName}
                                    state={formErrors.firstName ? 'error' : 'success'}
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
                                    error={formErrors.lastName}
                                    state={formErrors.lastName ? 'error' : 'success'}
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3 mb-6">
                                <InputField
                                    label="Ville"
                                    type="text"
                                    id="city"
                                    name="city"
                                    placeholder="Ville"
                                    value={formData.city}
                                    onChange={handleChange}
                                    error={formErrors.city}
                                    state={formErrors.city ? 'error' : 'success'}
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <SelectField
                                    label="État"
                                    id="state"
                                    name="state"
                                    options={statesOfTunisia}
                                    value={formData.state}
                                    onChange={handleChange}
                                    error={formErrors.state}
                                    state={formErrors.state ? 'error' : 'success'}
                                />
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                                <InputField
                                    label="Code postal"
                                    type="text"
                                    id="zip"
                                    name="zip"
                                    placeholder="Code postal"
                                    value={formData.zip}
                                    onChange={handleChange}
                                    error={formErrors.zip}
                                    state={formErrors.zip ? 'error' : 'success'}
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <SelectField
                                    label="Genre"
                                    id="genre"
                                    name="genre"
                                    options={genreOptions}
                                    value={formData.genre}
                                    onChange={handleChange}
                                    error={formErrors.genre}
                                    state={formErrors.genre ? 'error' : 'success'}
                                />
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                                <DateField
                                    label="Date de naissance"
                                    id="dob"
                                    name="dob"
                                    placeholder="Date de naissance"
                                    value={formData.dob}
                                    onChange={handleChange}
                                    error={formErrors.dob}
                                    state={formErrors.dob ? 'error' : 'success'}
                                />
                            </div>
                            
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3">
                                <PhoneNumberInput
                                    label="Numero de telephone"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    error={formErrors.phone}
                                    state={formErrors.phone ? 'error' : 'success'}
                                    
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
                {currentStep === 2 && (
                    <form className="w-full max-w-lg">
                        <h1 className="flex justify-center items-center mb-9">Mettre à jour un SubAdmin</h1>

                        {/* <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3 mb-6">
                                <RoleCheckbox
                                    label="Manage Students"
                                    id="manageStudents"
                                    isChecked={isStudentChecked}
                                    onChange={(e) => setIsStudentChecked(e.target.checked)}
                                />
                                {!isStudentChecked && (
                                    <>
                                        <RoleCheckbox
                                            label="Add Student"
                                            id="addStudent"
                                            isChecked={studentActions.add}
                                            onChange={(e) => setStudentActions({ ...studentActions, add: e.target.checked })}
                                        />
                                        <RoleCheckbox
                                            label="Edit Student"
                                            id="editStudent"
                                            isChecked={studentActions.edit}
                                            onChange={(e) => setStudentActions({ ...studentActions, edit: e.target.checked })}
                                        />
                                        <RoleCheckbox
                                            label="Delete Student"
                                            id="deleteStudent"
                                            isChecked={studentActions.delete}
                                            onChange={(e) => setStudentActions({ ...studentActions, delete: e.target.checked })}
                                        />
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3 mb-6">
                                <RoleCheckbox
                                    label="Manage Teachers"
                                    id="manageTeachers"
                                    isChecked={isTeacherChecked}
                                    onChange={(e) => setIsTeacherChecked(e.target.checked)}
                                />
                                {!isTeacherChecked && (
                                    <>
                                        <RoleCheckbox
                                            label="Add Teacher"
                                            id="addTeacher"
                                            isChecked={teacherActions.add}
                                            onChange={(e) => setTeacherActions({ ...teacherActions, add: e.target.checked })}
                                        />
                                        <RoleCheckbox
                                            label="Edit Teacher"
                                            id="editTeacher"
                                            isChecked={teacherActions.edit}
                                            onChange={(e) => setTeacherActions({ ...teacherActions, edit: e.target.checked })}
                                        />
                                        <RoleCheckbox
                                            label="Delete Teacher"
                                            id="deleteTeacher"
                                            isChecked={teacherActions.delete}
                                            onChange={(e) => setTeacherActions({ ...teacherActions, delete: e.target.checked })}
                                        />
                                    </>
                                )}
                            </div>
                        </div> */}

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
                    </form>
                )}
            </div>
        </Card>
    );
};

export default UpdateSubAdmin;
