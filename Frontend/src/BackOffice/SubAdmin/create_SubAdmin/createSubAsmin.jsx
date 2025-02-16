import React, { useState } from "react";
import Card from "components/card";
import InputField from "components/fields/InputField";
import { statesOfTunisia } from "./stateoftunis";
import SelectField from "../../../components/fields/SelectField";
import DateField from "components/fields/DateField";
import ProgressBar from "./components/progressBar";
import { RoleCheckbox } from "./components/RolecheckBox";
import authService from "../../../services/authServices";
import PhoneField from "components/fields/PhoneField";
import { validateField } from "./components/validateField";
import PhoneNumberInput from "components/fields/PhoneField";
import { useNavigate } from "react-router-dom";
const CreateSubAdmin = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    city: "",
    state: "",
    zip: "",
    genre: "",
    phone: "",
    dob: "",
    phone: "",
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
    username: null,
    email: null,
    password: null,
    confirmPassword: null,
    firstName: null,
    lastName: null,
    city: null,
    state: null,
    zip: null,
    genre: null,
    dob: null,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    const error = validateField(name, value, formData.password);
    setFormErrors({
      ...formErrors,
      [name]: error,
    });
  };

  const handleSubmit = async () => {
    const errors = {};
    Object.keys(formData).forEach((key) => {
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
    if (isStudentChecked) permissions.push("manage:student");
    else {
      if (studentActions.add) permissions.push("add:student");
      if (studentActions.edit) permissions.push("edit:student");
      if (studentActions.delete) permissions.push("delete:student");
    }
    if (isTeacherChecked) permissions.push("manage:teacher");
    else {
      if (teacherActions.add) permissions.push("add:teacher");
      if (teacherActions.edit) permissions.push("edit:teacher");
      if (teacherActions.delete) permissions.push("delete:teacher");
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
      phone: formData.phone,
    };

    try {
      let message = await authService.register(userData);
      if (message === "User registered successfully") {
        alert("SubAdmin ajouté avec succès");
        window.location.href = "/admin/Utilisateurs";
      } else {
        alert(message);
      }
    } catch (error) {
      alert(error.message);
    }
  };
  const getInputState = (error) => {
    if (error === null) return ""; // Pas de couleur au début
    return error ? "error" : "success";
  };
  const navigate = useNavigate();
  return (
    <Card className="mt-20 flex items-center justify-center rounded-lg bg-white p-10 px-9 shadow-md">
      <div className="w-full max-w-full">
        <button
          type="submit"
          className="mb-6 w-36 rounded-lg bg-blue-500 py-2 text-white hover:bg-blue-600"
          onClick={() => navigate("/admin/Utilisateurs")}
        >
          Retourn
        </button>
        <div className="col-span-1 ml-[159px]">
          <ProgressBar steps={steps} currentStep={currentStep} />
        </div>

        {currentStep === 0 && (
          <form className="w-full max-w-full ">
            <h1 className="mb-9 flex items-center justify-center text-2xl">
              Ajouter un SubAdmin
            </h1>

            <div className="-mx-18 mb-6 flex flex-wrap">
              <div className="mb-6 w-full px-4 md:mb-0 md:w-1/2">
                <InputField
                  label="Nom d'utilisateur"
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Nom d'utilisateur"
                  value={formData.username}
                  onChange={handleChange}
                  error={formErrors.username}
                  state={getInputState(formErrors.username)}
                />
              </div>
              <div className="w-full px-4 md:w-1/2">
                <InputField
                  label="Email"
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  error={formErrors.email}
                  state={getInputState(formErrors.email)}
                />
              </div>
            </div>

            <div className="-mx-18 mb-6 flex flex-wrap">
              <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
                <InputField
                  label="Mot de passe"
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Mot de passe"
                  value={formData.password}
                  onChange={handleChange}
                  error={formErrors.password}
                  state={getInputState(formErrors.password)}
                />
              </div>
              <div className="w-full px-3 md:w-1/2">
                <InputField
                  label="Confirmer Mot de passe"
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirmer Mot de passe"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  error={formErrors.confirmPassword}
                  state={getInputState(formErrors.confirmPassword)}
                />
              </div>
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="rounded bg-gray-500 py-2 px-4 text-white"
                disabled
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
          <form className="w-full max-w-full">
            <h1 className="mb-9 flex items-center justify-center text-2xl">
              Ajouter un SubAdmin
            </h1>

            <div className="-mx-18 mb-6 flex flex-wrap">
              <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
                <InputField
                  label="Prénom"
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="Prénom"
                  value={formData.firstName}
                  onChange={handleChange}
                  error={formErrors.firstName}
                  state={getInputState(formErrors.firstName)}
                />
              </div>
              <div className="w-full px-3 md:w-1/2">
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
                  error={formErrors.state}
                  state={getInputState(formErrors.state)}
                />
              </div>
            </div>
            <div className="-mx-18 mb-6 flex flex-wrap">
              <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
                <InputField
                  label="Nom"
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Nom"
                  value={formData.lastName}
                  onChange={handleChange}
                  error={formErrors.lastName}
                  state={getInputState(formErrors.lastName)}
                />
              </div>
              <div className="w-full px-3 md:w-1/2">
                <InputField
                  label="Ville"
                  type="text"
                  id="city"
                  name="city"
                  placeholder="Ville"
                  value={formData.city}
                  onChange={handleChange}
                  error={formErrors.city}
                  state={getInputState(formErrors.city)}
                />
              </div>
            </div>
            <div className="-mx-18 mb-6 flex flex-wrap">
              <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
                <SelectField
                  label="Genre"
                  id="genre"
                  name="genre"
                  placeholder="Sélectionner le genre"
                  options={genreOptions}
                  value={formData.genre}
                  onChange={(selectedValue) =>
                    setFormData({ ...formData, genre: selectedValue })
                  }
                  error={formErrors.genre}
                  state={getInputState(formErrors.genre)}
                />
              </div>
              <div className="w-full px-3 md:w-1/2">
                <InputField
                  label="Code postal"
                  type="text"
                  id="zip"
                  name="zip"
                  placeholder="Code postal"
                  value={formData.zip}
                  onChange={handleChange}
                  error={formErrors.zip}
                  state={getInputState(formErrors.zip)}
                />
              </div>
            </div>

            <div className="-mx-18 mb-6 flex flex-wrap">
              <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
                <InputField
                  label="Phone Number"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full px-3 md:w-1/2">
                <DateField
                  label="Date De Naissance"
                  id="dob"
                  name="dob"
                  placeholder="Date de naissance"
                  value={formData.dob}
                  onChange={(selectedDate) =>
                    setFormData({ ...formData, dob: selectedDate })
                  }
                  error={formErrors.dob}
                  state={formErrors.dob ? "error" : "success"}
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
          <div>
            <h1 className="mb-9 flex items-center justify-center">
              Permissions
            </h1>
            <div className="-mx-1 mb-6 flex flex-wrap">
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
                className="rounded bg-gray-500 py-2 px-4 text-white"
              >
                Précédent
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="rounded bg-green-500 py-2 px-4 text-white"
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
