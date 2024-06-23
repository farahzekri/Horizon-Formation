import Card from "components/card";
import React, { useState, useEffect } from 'react';
import { MdModeEditOutline,MdCreditCard } from "react-icons/md";
import InputField from '../../../../components/fields/InputField';
import Dropdown from '../../../../components/dropdown/index';
import userService from '../../../../services/authServices';
import { useParams } from 'react-router-dom';
import CustomModal from '../../../../components/Modal/modal'
import TooltipHorizon from '../../../../components/tooltip/index';

const General = () => {

  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState(null);
  const { username } = useParams();
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
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  });
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleEditClick = () => {
    setShowUpdateForm(!showUpdateForm);
  };

  // Get Profile
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const data = await userService.getUserProfile(username);
        setUserProfile(data);
        setFirstName(data.firstName || '');
        setLastName(data.lastName || '');
        setEmail(data.email || '');
        setPhone(data.phone || '');
        setGender(data.gender || '');
        setDob(data.dob ? data.dob.split('T')[0] : '');
        setAddress(data.address || {
          street: '',
          city: '',
          state: '',
          zipCode: '',
          country: ''
        });
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUserProfile();
  }, [username]);

  // Update Profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedProfile = {
        firstName,
        lastName,
        dob,
        gender,
        email,
        phone,
        address: {
          street: address.street,
          city: address.city,
          state: address.state,
          zipCode: address.zipCode,
          country: address.country
        }
      };
  
      // Inclure les mots de passe seulement s'ils sont fournis
      if (oldPassword && newPassword) {
        updatedProfile.oldPassword = oldPassword;
        updatedProfile.newPassword = newPassword;
      }
  
      const data = await userService.updateUserProfile(username, updatedProfile);
      setUserProfile(data);
      alert('Profil mis à jour avec succès !');
      setShowUpdateForm(false);
      closeModal(); // Ferme le modal si ouvert
    } catch (error) {
      setError(error.message || 'Une erreur est survenue lors de la mise à jour du profil.');
      console.log('Erreur API:', error.response ? error.response.data : error.message);
    
      if (error.response && error.response.data && error.response.data.message === 'Old password is incorrect') {
        console.log('Affichage de l\'alerte');
        alert('Ancien mot de passe incorrect');
      } else {
        alert('Ancien mot de passe incorrect');
      }
    }
  };

 



  if (error) {
    return <div>Error: {error}</div>;
  }

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
       <form onSubmit={handleSubmit}>
       <div className="grid grid-cols-2 gap-4 px-2">
      
          <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
               <InputField
                  label="Nom"
                  id="lastName"
                  type="text"
                  placeholder="Nom"
                  extra="mb-4"
                  value={lastName}
                  onChange={(value) => setLastName(value)}
                  className="text-base font-medium text-navy-700 dark:text-white"
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
                  onChange={(value) => setFirstName(value)}
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
                onChange={(value) => setEmail(value)}
                className="text-base font-medium text-navy-700 dark:text-white"
              />
          </div>
          <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
              <InputField
                label="Telephone"
                id="phone"
                type="text"
                placeholder="Entrer votre numero du telephone"
                extra="mb-4"
                value={phone}
                onChange={(value) => setPhone(value)}
                className="text-base font-medium text-navy-700 dark:text-white"
              />
          </div>
          <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
              <label
                    className={`text-sm text-navy-700 dark:text-white
                         ml-1.5 font-medium ml-3 font-bold"
                    }`}
                >
                    Genre
                </label>
              <Dropdown
                    button={<button>{gender || 'Genre'}</button>}
                    classNames="w-48 bg-white rounded-md shadow-lg"
                >
                    <div className="py-1">
                        <div
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
                            onClick={() => setGender('Female')}
                        >
                            Femme
                        </div>
                        <div
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
                            onClick={() => setGender('Male')}
                        >
                            Homme
                        </div>
                        <div
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
                            onClick={() => setGender('Other')}
                        >
                            Autre
                        </div>
                    </div>
                </Dropdown>
                 
          </div>
          <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
              <InputField
                label="Date De Naissance"
                id="dob"
                type="date"
                placeholder="Entrer la date de Naissance"
                extra="mb-4"
                value={dob}
                onChange={(value) => setDob(value)}
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
             <InputField
              label="Street"
              id="street"
              placeholder="Street"
              cols="30"
              rows="4"
              extra="mb-4"
              value={address.street}
              onChange={(value) => setAddress({ ...address, street:value })}
              className="text-base font-medium text-navy-700 dark:text-white"
            />
            <InputField
              label="Ville"
              id="city"
              placeholder="Ville"
              extra="mb-4"
              value={address.city}
              onChange={(value) => setAddress({ ...address, city:value })}
              className="text-base font-medium text-navy-700 dark:text-white"
            />
            <InputField
              label="État"
              id="state"
              placeholder="État"
              extra="mb-4"
              value={address.state}
              onChange={(value) => setAddress({ ...address, state: value })}
              className="text-base font-medium text-navy-700 dark:text-white"
            />
            </div>
            <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none ">
            <InputField
              label="Code Postal"
              id="zipCode"
              placeholder="Code Postal"
              extra="mb-4"
              value={address.zipCode}
              onChange={(value) => setAddress({ ...address, zipCode:value })}
              className="text-base font-medium text-navy-700 dark:text-white"
            />
            <InputField
              label="Pays"
              id="country"
              placeholder="Pays"
              extra="mb-4"
              value={address.country}
              onChange={(value) => setAddress({ ...address, country: value })}
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
       <form onSubmit={handleSubmit}>
       <div className="grid grid-cols-2 gap-6 px-4">
           <div className=" justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
               <InputField
                  label="Ancien Mot De Passe"
                  id="oldPassword"
                  type="password"
                  placeholder="Entrer Votre Ancien Mot de Passe"
                  extra="mb-4"
                  value={oldPassword}
                  onChange={(value) => setOldPassword(value)}
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
                  onChange={(value) => setNewPassword(value)}
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
          {userProfile.address.street}, {userProfile.address.city}, {userProfile.address.state}, {userProfile.address.zipCode}, {userProfile.address.country}
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
