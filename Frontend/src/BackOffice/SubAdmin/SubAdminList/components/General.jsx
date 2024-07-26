import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MdModeEditOutline, MdCreditCard } from "react-icons/md";
import InputField from "../../../../components/fields/InputField";
import SelectField from "../../../../components/fields/SelectField";
import PhoneNumberInput from "../../../../components/fields/PhoneField";
import {
  Update_User_By_Username_sarra,
  get_User_By_Username,
} from "../../../../services/UserService";
import { statesOfTunisia } from "../../../SubAdmin/create_SubAdmin/stateoftunis";
import TooltipHorizon from "../../../../components/tooltip/index";
import Card from "components/card";
import { validateField } from "./validateField";

const genderOptions = [
  { value: "Femelle", label: "Femelle" },
  { value: "Mâle", label: "Mâle" },
  { value: "Autre", label: "Autre" },
];

const General = () => {
  const { username } = useParams();
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [errors, setErrors] = useState({
    firstName: null,
    lastName: null,
    email: null,
    phone: null,
    gender: null,
    dob: null,
    address: {
      state: null,
      city: null,
      zip: null,
    },
    password: null,
    confirmPassword: null,
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    address: {
      state: "",
      city: "",
      zip: "",
    },
    password: "",
    confirmPassword: "",
  });

  // Modal state
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const data = await get_User_By_Username(username);
        setUserProfile(data);
        setFormData({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          email: data.email || "",
          phone: data.phone || "",
          gender: data.gender || "",
          dob: data.dob ? data.dob.split("T")[0] : "",
          address: data.address || { state: "", city: "", zip: "" },
        });
      } catch (err) {
        console.error("Error fetching user profile:", err);
      }
    };

    // Assuming `username` is set somewhere before this useEffect
    fetchUserProfile();
  }, [username]);

  const handleEditClick = () => {
    setShowUpdateForm(!showUpdateForm);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    if (name in formData.address) {
      setFormData((prevData) => ({
        ...prevData,
        address: {
          ...prevData.address,
          [name]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  
    // Validation du numéro de téléphone
    if (name === 'phone') {
      const phoneError = validatePhoneNumber(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: phoneError,
      }));
    } else {
      // Validation pour les autres champs
      const error = validateField(name, value, formData.password);
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: error,
      }));
    }
  };
  
  
  const handleSubmitProfile = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  
    // Validation du numéro de téléphone
    const phoneError = validatePhoneNumber(formData.phone);
    if (phoneError) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        phone: phoneError,
      }));
      return alert("vérifiez vos données!"); // Arrête la soumission du formulaire si erreur
    }
  
    try {
      console.log("Données de formulaire avant mise à jour :", formData);
      const updatedProfile = await Update_User_By_Username_sarra(username, formData);
      console.log("Profil mis à jour :", updatedProfile);
      setUserProfile(updatedProfile);
      setShowUpdateForm(false);
      alert("Profil mis à jour avec succès !");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Une erreur est survenue lors de la mise à jour du profil.");
    }
  };

  const getInputState = (fieldName) => {
    if (!formSubmitted) return "";
    return errors[fieldName] ? "error" : "success";
  };

  const validatePhoneNumber = (value) => {
    // Vérifie que la longueur est d'au moins 8 chiffres
    if (value.length < 8) {
      return "Le numéro de téléphone doit contenir au moins 8 chiffres.";
    }
    // Vérifie que le numéro contient uniquement des chiffres
    if (!/^[0-9]+$/.test(value)) {
      return "Le numéro de téléphone doit contenir uniquement des chiffres.";
    }
    return null;
  };
  
  
  const handleSelectChange = (name, selectedValue) => {
    setFormData((prevData) => ({
      ...prevData,
      address: {
        ...prevData.address,
        [name]: selectedValue,
      },
    }));
  };

  
  if (!userProfile) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {showUpdateForm && (
        <Card extra="w-full h-full p-3">
          <div className="mt-2 mb-8 w-full">
            <h4 className="flex items-center justify-between px-2 text-xl font-bold text-navy-700 dark:text-white">
              <span>Mettre à jour le Profil</span>
              <TooltipHorizon
                trigger={
                  <div className="flex cursor-pointer items-center">
                    <MdCreditCard
                      className="mr-2 text-gray-600 dark:text-white"
                      onClick={handleEditClick}
                    />
                  </div>
                }
                content="Information Générale"
                placement="top"
              />
            </h4>
            <form onSubmit={handleSubmitProfile}>
              <div className="grid grid-cols-2 gap-4 px-2">
                <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                  <InputField
                    label="Nom"
                    id="lastName"
                    type="text"
                    name="lastName"
                    placeholder="Nom"
                    extra="mb-4"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    error={errors.lastName}
                    state={getInputState("lastName")}
                    className={`text-base font-medium text-navy-700 dark:text-white ${
                      getInputState("lastName") === "error"
                        ? "border-red-500"
                        : ""
                    }`}
                  />
                </div>
                <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                  <InputField
                    label="Prenom"
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="Prenom"
                    extra="mb-4"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    error={errors.firstName}
                    state={getInputState("firstName")}
                    className="text-base font-medium text-navy-700 dark:text-white"
                  />
                </div>
                <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                  <InputField
                    label="Email"
                    id="email"
                    type="text"
                    name="email"
                    placeholder="Entrer votre email"
                    extra="mb-4"
                    value={formData.email}
                    onChange={handleInputChange}
                    error={errors.email}
                    state={getInputState("email")}
                    className="text-base font-medium text-navy-700 dark:text-white"
                  />
                </div>
                <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                  <InputField
                    label="Telephone"
                    id="phone"
                    name="phone"
                    type="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    error={errors.phone}
                    state={getInputState("phone")}
                  />
                </div>
                <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                  <SelectField
                    label="Genre"
                    id="gender"
                    name="gender"
                    placeholder="Sélectionner le genre"
                    options={genderOptions}
                    value={formData.gender}
                    onChange={(selectedValue) =>
                      setFormData({ ...formData, gender: selectedValue })
                    }
                    error={errors.gender}
                    state={getInputState("gender")}
                  />
                </div>
                <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                  <InputField
                    label="Date De Naissance"
                    id="dob"
                    type="date"
                    name="dob"
                    placeholder="Entrer la date de Naissance"
                    extra="mb-4"
                    value={formData.dob}
                    onChange={handleInputChange}
                    error={errors.dob}
                    state={getInputState("dob")}
                    className="text-base font-medium text-navy-700 dark:text-white"
                  />
                </div>
                <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                  <label className="ml-3 text-sm font-bold font-medium text-navy-700 dark:text-white">
                    Addresse
                  </label>
                  <SelectField
                    label="État"
                    id="state"
                    name="state"
                    placeholder="Sélectionner l'état"
                    options={statesOfTunisia}
                    value={formData.address.state}
                    onChange={(selectedValue) =>
                      handleSelectChange("state", selectedValue)
                    }
                    error={errors.state}
                    state={getInputState("state")}
                    className="text-base font-medium text-navy-700 dark:text-white"
                  />

                  <InputField
                    label="Ville"
                    id="city"
                    type="text"
                    placeholder="Ville"
                    extra="mb-4"
                    name="city"
                    value={formData.address.city}
                    onChange={handleInputChange}
                    error={errors.city}
                    state={getInputState("city")}
                    className="text-base font-medium text-navy-700 dark:text-white"
                  />
                  <InputField
                    label="Code Postal"
                    id="zip"
                    type="text"
                    placeholder="Code Postal"
                    extra="mb-4"
                    name="zip"
                    value={formData.address.zip}
                    onChange={handleInputChange}
                    error={errors.zip}
                    state={getInputState("zip")}
                    className="text-base font-medium text-navy-700 dark:text-white"
                  />
                </div>
              </div>

              <div className="mt-4 flex items-center justify-end">
                <button
                  type="submit"
                  className="mr-4 h-12 w-36 rounded-lg bg-navy-700 text-white hover:bg-yellow-500"
                >
                  Mettre à jour
                </button>
              </div>
            </form>
          </div>
        </Card>
      )}
      {!showUpdateForm && (
        <Card extra="w-full h-full p-3">
          <div className="mt-2 mb-8 w-full">
            <h4 className="flex items-center justify-between px-2 text-xl font-bold text-navy-700 dark:text-white">
              <span>Information générale</span>
              <TooltipHorizon
                trigger={
                  <div className="flex cursor-pointer items-center">
                    <MdModeEditOutline
                      className="mr-2 text-gray-600 dark:text-white"
                      onClick={handleEditClick}
                    />
                  </div>
                }
                content="Modifier le Profil"
                placement="top"
              />
            </h4>
            <div className="mt-4 grid grid-cols-2 gap-4 px-2">
              <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <span className="text-base font-medium text-navy-700 dark:text-white">
                  Nom : {userProfile.lastName}
                </span>
              </div>
              <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <span className="text-base font-medium text-navy-700 dark:text-white">
                  Prénom : {userProfile.firstName}
                </span>
              </div>
              <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <span className="text-base font-medium text-navy-700 dark:text-white">
                  Email : {userProfile.email}
                </span>
              </div>
              <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <span className="text-base font-medium text-navy-700 dark:text-white">
                  Téléphone : {userProfile.phone}
                </span>
              </div>
              <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <span className="text-base font-medium text-navy-700 dark:text-white">
                  Genre : {userProfile.gender}
                </span>
              </div>
              <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <span className="text-base font-medium text-navy-700 dark:text-white">
                  Date de Naissance :{" "}
                  {userProfile.dob ? userProfile.dob.split("T")[0] : ""}
                </span>
              </div>
              <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <span className="text-base font-medium text-navy-700 dark:text-white">
                  Addresse : {userProfile.address.city},{" "}
                  {userProfile.address.state}, {userProfile.address.zip}
                </span>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default General;
