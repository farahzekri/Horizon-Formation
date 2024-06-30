import React, { useState } from "react";
import Card from "components/card";
import InputField from "components/fields/InputField";
import ProgressBar from "../../../components/progress/index";
import SelectField from "../../../components/fields/SelectField";
import DateField from "components/fields/DateField";
import PhoneNumberInput from "components/fields/PhoneField";
import { statesOfTunisia } from "./stateoftunis";
const AddTeacher = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [teacher, setTeacher] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    phone: "",
    address: {
      city: "",
      state: "",
      zip: "",
    },
    subjects: [""],
    experience: 0,
    qualifications: [""],
    hireDate: "",
    salary: 0,
    NumberOfHours: 0,
    payments: [{ date: "", amount: 0 }],
  });
  const genreOptions = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
  ];

  const steps = [
    "Étape 1: Compte personnel",
    "Étape 2: Informations personnelles",
    "Étape 3: Privilèges",
  ];

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("address.")) {
      const addressField = name.split(".")[1];
      setTeacher((prevTeacher) => ({
        ...prevTeacher,
        address: {
          ...prevTeacher.address,
          [addressField]: value,
        },
      }));
    } else {
      setTeacher((prevTeacher) => ({
        ...prevTeacher,
        [name]: value,
      }));
    }
  };

  const token = localStorage.getItem("token");

  const handleCreateTeacher = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/Teacher/CreateTeachers",
        {
          method: "POST",
          body: JSON.stringify(teacher),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 201) {
        setTeacher({
          firstName: "",
          lastName: "",
          email: "",
          gender: "",
          phone: "",
          address: {
            city: "",
            state: "",
            zip: "",
          },
          subjects: [""],
          experience: 0,
          qualifications: [""],
          hireDate: "",
          salary: 0,
          NumberOfHours: 0,
          payments: [{ date: "", amount: 0 }],
        });
      }
    } catch (error) {
      console.error("Error creating teacher:", error);
    }
  };

  return (
    <Card className="mt-20 flex items-center justify-center rounded-lg bg-white p-8 shadow-md">
      <div className="grid grid-cols-1 gap-8">
        <div className="col-span-1">
          <ProgressBar steps={steps} currentStep={currentStep} />
        </div>
        {currentStep === 0 && (
          <form className="w-full max-w-lg">
            <h1 className="mb-9 flex items-center justify-center">
              Ajouter un Teacher
            </h1>
            <div className="-mx-3 mb-6 flex flex-wrap">
              <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
                <InputField
                  label="Nom"
                  name="firstName"
                  value={teacher.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full px-3 md:w-1/2">
                <InputField
                  label="Nom de famille"
                  name="lastName"
                  value={teacher.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="-mx-3 mb-6 flex flex-wrap">
              <div className="w-full px-3 md:w-1/2">
                <InputField
                  label="Email"
                  name="email"
                  value={teacher.email}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full px-3 md:w-1/2">
                <div className="w-full px-3">
                  <InputField
                    label="Numéro de téléphone"
                    name="phone"
                    value={teacher.phone}
                    onChange={handleChange} // Pass the event object here
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="rounded bg-gray-500 py-2 px-4 text-white"
              >
                Précédent
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="rounded bg-blue-500 py-2 px-4 text-white"
              >
                Suivant
              </button>
            </div>
          </form>
        )}
        {currentStep === 1 && (
          <form className="w-full max-w-lg">
            <h1 className="mb-9 flex items-center justify-center">
              Ajouter un Teacher
            </h1>
            <div className="-mx-3 mb-6 flex flex-wrap">
              <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
                <SelectField
                  label="Sexe"
                  name="gender"
                  options={genreOptions}
                  value={teacher.gender}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full px-3 md:w-1/2">
                <InputField
                  label="Ville"
                  name="address.city"
                  options={statesOfTunisia}
                  value={teacher.address.city}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="-mx-3 mb-6 flex flex-wrap">
              <div className="w-full px-3 md:w-1/2">
                <InputField
                  label="État"
                  name="address.state"
                  value={teacher.address.state}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full px-3 md:w-1/2">
                <InputField
                  label="Code postal"
                  name="address.zip"
                  value={teacher.address.zip}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="rounded bg-gray-500 py-2 px-4 text-white"
              >
                Précédent
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="rounded bg-blue-500 py-2 px-4 text-white"
              >
                Suivant
              </button>
            </div>
          </form>
        )}
        {currentStep === 2 && (
          <form className="w-full max-w-lg">
            <h1 className="mb-9 flex items-center justify-center">
              Ajouter un Teacher
            </h1>
            <div className="-mx-3 mb-6 flex flex-wrap">
              <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
                <InputField
                  label="Salaire"
                  name="salary"
                  value={teacher.salary}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full px-3 md:w-1/2">
                <InputField
                  label="Nombre d'heures"
                  name="NumberOfHours"
                  value={teacher.NumberOfHours}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="-mx-3 mb-6 flex flex-wrap">
              <div className="w-full px-3 md:w-1/2">
                <InputField
                  label="Expérience"
                  name="experience"
                  value={teacher.experience}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full px-3 md:w-1/2">
                <InputField
                  label="Qualifications"
                  name="qualifications"
                  value={teacher.qualifications}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="w-full px-3">
              <DateField
                label="Date d'embauche"
                name="hireDate"
                value={teacher.hireDate}
                onChange={handleChange}
              />
            </div>
            <div className="mt-6 flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="rounded bg-gray-500 py-2 px-4 text-white"
              >
                Précédent
              </button>
              <button
                type="button"
                onClick={handleCreateTeacher}
                className="rounded bg-blue-500 py-2 px-4 text-white"
              >
                Créer
              </button>
            </div>
          </form>
        )}
      </div>
    </Card>
  );
};

export default AddTeacher;
