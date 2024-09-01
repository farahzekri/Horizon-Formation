import React, { useState } from 'react';
import SelectField from "components/fields/SelectField";
import SelectandInputField from "components/fields/selectandinputfield";
import { Niveauclasse, SalleClasses } from "../valeurselect";

const ClassInfo = ({ isEditing, formData,setFormData, classDetails, formations,handleEditClick, handleInputChange, handleSaveClick, handleCancelClick }) => {
   
    if (!classDetails) {
        return <div>Loading class details...</div>; // or some other loading state
    }
    return (
        <div className='bg-white shadow-lg p-6 mb-6'>
            {!isEditing ? (
                <button
                    className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={handleEditClick}
                >
                    Modifier
                </button>
            ) : (
                <>
                    <button
                        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
                        onClick={handleSaveClick}
                    >
                        Enregistrer
                    </button>
                    <button
                        className="mb-4 px-4 py-2 bg-red-500 text-white rounded"
                        onClick={handleCancelClick}
                    >
                        Annuler
                    </button>
                </>
            )}
            <div className="flex flex-wrap -mx-18 mb-6">
                <div className="w-full md:w-1/2 px-4 mb-6 md:mb-0">
                    <div className="text-sm text-navy-700 dark:text-white ml-3 font-bold">
                        Formation: {isEditing ? (
                            <SelectField
                                type="text"
                                name="formationId"
                                placeholder="Formation"
                                value={formData.formationId}
                                onChange={(value) => handleInputChange({ target: { name: 'formationId', value } })}
                                options={formations.map((formation) => ({
                                    value: formation._id,
                                    label: formation.name,
                                }))}
                            />
                        ) : (
                            <p>{classDetails.formationId ? classDetails.formationId.name : 'Aucune formation disponible'}</p>
                        )}
                    </div>
                </div>
                <div className="w-full md:w-1/2 px-4">
                    <div className="text-sm text-navy-700 dark:text-white ml-3 font-bold">
                        Niveau: {isEditing ? (
                            <SelectField
                                id="Niveau"
                                name="level"
                                placeholder="Sélectionner Niveau"
                                options={Niveauclasse}
                                value={formData.level}
                                onChange={(selectedValue) => setFormData({ ...formData, level: selectedValue })}

                            />
                        ) : (
                            <p>{classDetails.level}</p>
                        )}
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap -mx-18 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <div className="text-sm text-navy-700 dark:text-white ml-3 font-bold">
                        Salle: {isEditing ? (
                            <SelectandInputField
                                id="room"
                                name="room"
                                placeholder="Salle"
                                options={SalleClasses}
                                value={formData.room}
                                onChange={(selectedValue) => setFormData({ ...formData, room: selectedValue })}
                            />
                        ) : (
                            <p>{classDetails.room}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClassInfo;