import React, { useState } from "react";
import InputField from "../../../components/fields/InputField";
import Card from "../../../components/card";
import SelectField from "../../../components/fields/SelectField";
import { statesOfTunisia } from "../../SubAdmin/create_SubAdmin/stateoftunis";
import studentServices from "../../../services/studentServices";
import {useNavigate} from "react-router-dom";
import AlertMessage from "../../../components/alert/alertMessage";
import {useDisclosure} from "@chakra-ui/react";

const formationOp = [
    { value: "F1", label: "F1" },
    { value: "F2", label: "F2" },
];

function AddStudent() {
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [alertState, setAlertState] = useState({
        showAlert: false,
        alertType: "success", // Default to success
        alertMessage: "",
    });

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        city: "",
        zip: "",
        state: "",
        phoneNumber: "",
        email: "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Prepare data in the format expected by the server (matching Student schema)
            const studentData = {
                personalInfo: {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    dateOfBirth: formData.dateOfBirth,
                    address: {
                        city: formData.city,
                        zip: formData.zip,
                        state: formData.state,
                    },
                    phoneNumber: formData.phoneNumber,
                    email: formData.email,
                },
                // You can add more fields like billingInfo, academicRecords, etc., if needed
            };
            console.log(studentData)
            const response = await studentServices.addStudent(studentData);
            console.log("Student added successfully:", response);

            setAlertState({
                showAlert: true,
                alertType: "success",
                alertMessage: "Élève ajouté avec succès!",
            });
            onOpen();
            setFormData({
                firstName: "",
                lastName: "",
                dateOfBirth: "",
                city: "",
                zip: "",
                state: "",
                phoneNumber: "",
                email: "",
            });
            setTimeout(() => {
                navigate('/admin/Etudiants');
            }, 1000);
        } catch (error) {
            console.error("Error adding student:", error);
            setAlertState({
                showAlert: true,
                alertType: "error",
                alertMessage: "Erreur lors de l'ajout de l'élève.",
            });
            onOpen();
        }
    };

    const closeAlert = () => {
        setAlertState({
            ...alertState,
            showAlert: false,
        });
    };
    return (
        <Card extra={"w-full h-full p-3"}>
            <form onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold mb-4">Ajouter un nouveau élève</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col space-y-4">
                        <InputField
                            label="Prénom"
                            id="firstName"
                            name="firstName"
                            type="text"
                            placeholder="Enter first name"
                            value={formData.firstName}
                            onChange={handleChange}
                            extra="mb-4"
                        />
                        <InputField
                            label="Nom"
                            id="lastName"
                            name="lastName"
                            type="text"
                            placeholder="Enter last name"
                            value={formData.lastName}
                            onChange={handleChange}
                            extra="mb-4"
                        />
                        <SelectField
                            label="État"
                            id="state"
                            name="state"
                            placeholder="Sélectionner l'état"
                            options={statesOfTunisia}
                            value={formData.state}
                            onChange={(selectedValue) =>
                                setFormData({ ...formData, state: selectedValue })
                            }
                        />
                        <InputField
                            label="Ville"
                            id="city"
                            name="city"
                            type="text"
                            placeholder="Enter city"
                            value={formData.city}
                            onChange={handleChange}
                            extra="mb-4"
                        />
                        <InputField
                            label="ZIPCODE"
                            id="zip"
                            name="zip"
                            type="text"
                            placeholder="Enter ZIP code"
                            value={formData.zip}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col space-y-4">
                        <InputField
                            label="Date de Naissance"
                            id="dateOfBirth"
                            name="dateOfBirth"
                            type="date"
                            placeholder="Enter date of birth"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                            extra="mb-4"
                        />
                        <InputField
                            label="Numéro Téléphone"
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
                        <SelectField
                            label="Formation"
                            id="formation"
                            name="formation"
                            placeholder="Sélectionner la Formation"
                            options={formationOp}

                        />
                        <SelectField
                            label="Classe"
                            id="class"
                            name="class"
                            placeholder="Sélectionner le Classe"
                            options={formationOp}

                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                >
                    Ajouter élève
                </button>


                    <AlertMessage
                        status={alertState.alertType}
                        variant="left-accent"
                        description={alertState.alertMessage}

                    />

            </form>
        </Card>
    );
}

export default AddStudent;
