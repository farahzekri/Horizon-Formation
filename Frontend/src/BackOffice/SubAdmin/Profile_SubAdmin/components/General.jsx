import Card from "components/card";
import React, { useState, useEffect } from 'react';
import { MdModeEditOutline,MdCreditCard } from "react-icons/md";
import InputField from '../../../../components/fields/InputField';
import userService from '../../../../services/authServices';
import { statesOfTunisia } from "../../../SubAdmin/create_SubAdmin/stateoftunis";
import CustomModal from '../../../../components/Modal/modal';
import SelectField from "../../../../components/fields/SelectField";
import TooltipHorizon from '../../../../components/tooltip/index';
import PhoneNumberInput from "components/fields/PhoneField";
import { validateField } from "./validateField";
import {jwtDecode} from "jwt-decode";

const genderOp = [
  { value: "Femelle", label: "Femelle" },
  { value: "Mâle", label: "Mâle" },
  { value: "Autre", label: "Autre" },
];

const General = () => {
  const [username, setUsername] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState(null);


  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [address, setAddress] = useState({
    state: '',
    city: '',
    zip: '',
  });
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleEditClick = () => {
    setShowUpdateForm(!showUpdateForm);
  };

  //control de saisie 
  const [errors, setErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  

  // Get Profile
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    const decodedToken = jwtDecode(token);
    setUsername(decodedToken.username); // Update username state
    

    const fetchUserProfile = async () => {
      try {
        const data = await userService.getUserProfile(decodedToken.username);
        setUserProfile(data);
        setFirstName(data.firstName || '');
        setLastName(data.lastName || '');
        setEmail(data.email || '');
        setPhone(data.phone || '');
        setGender(data.gender || '');
        setDob(data.dob ? data.dob.split('T')[0] : '');
        setAddress(data.address || {
          state: '',
          city: '',
          zip: '',
        });
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUserProfile();
  }, []);

  // Update Profile;
  const handleSubmitProfile = async (e) => {
    e.preventDefault();

        // Validation des champs
        const lastNameError = validateField('lastName', lastName);
        const firstNameError = validateField('firstName', firstName);
        const emailError = validateField('email', email);
        const phoneError = validateField('phone', phone);
        const genderError = validateField('gender', gender);
        const dobError = validateField('dob', dob);
        const cityError = validateField('city', address.city);
        const stateError = validateField('state', address.state);
        const zipError = validateField('zip', address.zip);

        // Mettre à jour l'état des erreurs
        setErrors({
            lastName: lastNameError,
            firstName: firstNameError,
            email: emailError,
            phone: phoneError,
            gender: genderError,
            dob: dobError,
            city: cityError,
            state: stateError,
            zip: zipError
        });

        // Vérifier s'il y a des erreurs
        if (
            lastNameError || firstNameError || emailError || phoneError ||
            genderError || dobError || cityError || stateError || zipError
        ) {
            // Il y a des erreurs, ne soumettez pas le formulaire
            alert('Il y a des erreurs dans le formulaire.');
            console.log('Il y a des erreurs dans le formulaire.');
            return;
        }
    try {
      const updatedProfile = {
        firstName,
        lastName,
        dob,
        gender,
        email,
        phone,
        address: {
          state: address.state,
          city: address.city,
          zip: address.zip,
        }
      };

      const data = await userService.updateUserProfile(username, updatedProfile);
      setUserProfile(data);
      alert('Profil mis à jour avec succès !');
      setShowUpdateForm(false);
    } catch (error) {
      setError(error.message || 'Une erreur est survenue lors de la mise à jour du profil.');
      alert(error.message || 'Une erreur est survenue lors de la mise à jour du profil.');
    }
  };
   // Fonction pour obtenir l'état du champ
   const getInputState = (fieldName) => {
    if (!formSubmitted) return ''; // Au début, pas encore soumis, pas de bordure colorée
    if (errors[fieldName]) return 'error'; // S'il y a une erreur, bordure rouge
    return 'success'; // Valide, bordure verte
  };

  //modifier password
  const handleSubmitPassword = async (e) => {
    e.preventDefault();
     // Validation des champs
     const oldPasswordError = validateField('oldPassword', oldPassword);
     const newPasswordError = validateField('newPassword', newPassword);
  

     // Mettre à jour l'état des erreurs
     setErrors({
      oldPassword: oldPasswordError,
      newPassword: newPasswordError,
     });

     // Vérifier s'il y a des erreurs
     if (
      oldPasswordError || newPasswordError 
        
     ) {
         // Il y a des erreurs, ne soumettez pas le formulaire
         alert('Il y a des erreurs dans le formulaire.');
         console.log('Il y a des erreurs dans le formulaire.');
         return;
     }
    try {
      if (!oldPassword || !newPassword) {
        alert('Veuillez fournir les deux mots de passe.');
        return;
      }

      const passwordData = {
        oldPassword,
        newPassword,
      };

      const data = await userService.updateUserProfile(username, passwordData);
      alert('Mot de passe mis à jour avec succès !');
      closeModal();
    } catch (error) {
      setError(error.message || 'Une erreur est survenue lors de la mise à jour du mot de passe.');
      alert(error.message || 'Une erreur est survenue lors de la mise à jour du mot de passe.');
    }
  };





  // if (error) {
  //   return <div>Error: {error}</div>;
  // }

  if (!userProfile) {
    return <div>Loading...</div>;
  }



  return (
    // modifier le profil user
    <div>
      {showUpdateForm && (
        <Card extra={"w-full h-full p-3"}>
        <div className="mt-2 mb-8 w-full">
           <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-white flex justify-between items-center"  >

        <span>Mettre à jour le Profil</span>
        <TooltipHorizon
          trigger={
            <div className="flex items-center cursor-pointer">
              <MdCreditCard className="text-gray-600 dark:text-white mr-2"onClick={handleEditClick} />
            </div>
          }
          content="Information Génerale"
          placement="top"
        />
        </h4>
       {/* Cards */}
       <form onSubmit={handleSubmitProfile}>
       <div className="grid grid-cols-2 gap-4 px-2">

          <div className={`flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none`}>
          <InputField
              label="Nom"
              id="lastName"
              type="text"
              placeholder="Nom"
              extra="mb-4"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              error={errors.lastName}
              state={getInputState('lastName')}
              className={`text-base font-medium text-navy-700 dark:text-white ${
                getInputState('lastName') === 'error' ? 'border-red-500' : ''
              }`}
            />
          </div>
          <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
              <InputField
                  label="Prenom"
                  id="firstName"
                  type="text"
                  placeholder="Prenom"
                  extra="mb-4"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  error={errors.firstName}
                  state={getInputState(errors.firstName)}
                  className="text-base font-medium text-navy-700 dark:text-white"
                />
          </div>
          <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
              <InputField
                label="Email"
                id="email"
                type="text"
                placeholder="entrer votre email"
                extra="mb-4"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email}
                state={getInputState(errors.email)}
                className="text-base font-medium text-navy-700 dark:text-white"
              />
          </div>
          <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
              <PhoneNumberInput
                label="Telephone"
                id="phone"
                name="phone"
                value={phone}
                onChange={(value) => setPhone(value)}
                error={errors.phone}
                state={getInputState(errors.phone)}
              />
          </div>
          <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                   <SelectField
                       label="Genre"
                       id="gender"
                       name="gender"
                       placeholder="Sélectionner le genre"
                       options={genderOp}
                       value={gender}
                       onChange={(e) => setGender(e.target.value)}
                       error={errors.gender}
                       state={getInputState(errors.gender)}
                    />
            </div>
          <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
              <InputField
                label="Date De Naissance"
                id="dob"
                type="date"
                placeholder="Entrer la date de Naissance"
                extra="mb-4"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                error={errors.dob}
                state={getInputState(errors.dob)}
                className="text-base font-medium text-navy-700 dark:text-white"
              />
          </div>
          <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none ">

          <label
                    className={`text-sm text-navy-700 dark:text-white
                         ml-1.5 font-medium ml-3 font-bold"
                    }`}
                >
                    Addresse
                </label>

            
             <SelectField
                label="État"
                id="state"
                name="state"
               placeholder="Sélectionner l'état"
               options={statesOfTunisia}
              value={address.state}
              onChange={(e) => setAddress({ ...address, state: e.target.value })}
              error={errors.state}
              state={getInputState(errors.state)}
                />

          <InputField
              label="Ville"
              id="city"
              placeholder="Ville"
              extra="mb-4"
              value={address.city}
              onChange={(e) => setAddress({ ...address, city: e.target.value })}
              error={errors.city}
              state={getInputState(errors.city)}
              className="text-base font-medium text-navy-700 dark:text-white"
            />
            
            </div>
            <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none ">
            <InputField
              label="Code Postal"
              id="zipCode"
              placeholder="Code Postal"
              extra="mb-4"
              value={address.zip}
              onChange={(e) => setAddress({ ...address, zip: e.target.value })}
              error={errors.zip}
              state={getInputState(errors.zip)}
              className="text-base font-medium text-navy-700 dark:text-white"
            />
          </div>


        </div>
        <div className="flex justify-between mb-4 mt-2">
        <button
           type="button"
           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
           onClick={openModal}
         >
           Modifier le mot de passe
         </button>
         <div className="px-10">
         <button
           type="submit"
            className="bg-green-500 text-white px-4 py-2 mx-2 rounded hover:bg-green-600"
          >
            Enregistrer
          </button>
          <button
            type="button"
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={() => setShowUpdateForm(false)}
          >
            Annuler
          </button>

         </div>


      </div>
        </form>


        </div>
        </Card>
    )}
    {/* modifier le mmt de passe */}


      <CustomModal isOpen={showModal} onClose={closeModal}>
        <Card extra={"w-full h-full p-3"}>

        <div className="mt-2 mb-8 w-full">
           <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-white flex justify-between items-center" >

        <span>Modifier le mot de passe</span>

        </h4>
        </div>
        {/* Cards */}
       <form onSubmit={handleSubmitPassword}>
       <div className="grid grid-cols-2 gap-6 px-4">
           <div className=" justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
               <InputField
                  label="Ancien Mot De Passe"
                  id="oldPassword"
                  type="password"
                  placeholder="Entrer Votre Ancien Mot de Passe"
                  extra="mb-4"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  error={errors.oldPassword}
                  state={getInputState(errors.oldPassword)}
                  className="text-base font-medium text-navy-700 dark:text-white"
                />

          </div>
          <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
               <InputField
                  label="Neveau Mot De Passe"
                  id="newPassword"
                  type="password"
                  placeholder="Entrer Votre Neveau Mot de Passe"
                  extra="mb-4"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  error={errors.newPassword}
                  state={getInputState(errors.newPassword)}
                  className="text-base font-medium text-navy-700 dark:text-white"
                />

          </div>

          <div className="flex justify-between mb-2 mt-1">
         <div className="px-2">
         <button
           type="submit"
            className="bg-green-500 text-white px-4 py-2 mx-2 rounded hover:bg-green-600"
          >
            Enregistrer
          </button>
          <button
           onClick={closeModal}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Annuler
          </button>

         </div>


      </div>

       </div>
       </form>
          </Card>
          </CustomModal>


    {/* affichage des information du profil user */}

    {!showUpdateForm && (
      <div>
    <Card extra={"w-full h-full p-3"}>
      {/* Header */}
      <div className="mt-2 mb-8 w-full">
        <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-white flex justify-between items-center" >

        <span>Information Generale</span>
        <TooltipHorizon
          trigger={
            <div className="flex items-center cursor-pointer">
              <MdModeEditOutline className="text-gray-600 dark:text-white mr-2" onClick={handleEditClick} />
            </div>
          }
          content="Mise à jour du Profil"
          placement="top"
        />
        </h4>
      </div>
      {/* Cards */}
      <div className="grid grid-cols-2 gap-4 px-2">
        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Nom</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
          {userProfile.lastName}
          </p>
        </div>

        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Prenom</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
          {userProfile.firstName}
          </p>
        </div>

        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Email</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
          {userProfile.email}
          </p>
        </div>

        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Telephone</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
          {userProfile.phone}
          </p>
        </div>

        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Genre</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
          {userProfile.gender}
          </p>
        </div>

        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Date De Naissance</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
          {new Date(userProfile.dob).toLocaleDateString()}
          </p>
        </div>
        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Adresse</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            {userProfile.address.state} , {userProfile.address.city}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  , {userProfile.address.zip}
          </p>
        </div>
    </div>
    </Card>
    </div>
  )}
  </div>

  );
};

export default General;
