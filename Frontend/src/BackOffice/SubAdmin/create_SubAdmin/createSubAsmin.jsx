
import React, { useState } from "react";
import Card from "components/card";
import InputField from "components/fields/InputField";
import { statesOfTunisia } from "./stateoftunis";
import SelectField from "components/fields/SelectetField";
import DateField from "components/fields/DateField";
import ProgressBar from "./components/progressBar";

import { RoleCheckbox } from "./components/RolecheckBox";
const CreateSubAdmin = () => {

    const [selectedState, setSelectedState] = useState("");
    const [selectedgenre, setselectedgenre] = useState("");
    const [currentStep, setCurrentStep] = useState(0);

    const genre = [{ value: "mâle", label: "mâle" },
    { value: "femelle", label: "femelle" },
    { value: "autre", label: "Bautre" },]

    const steps = [
        "Étape 1: Informations personnelles",
        "Étape 2: permissions",

    ];

    const nextStep = () => {
        setCurrentStep(currentStep + 1);
    };

    const prevStep = () => {
        setCurrentStep(currentStep - 1);
    };
    //////////// principe de checkbox 
   
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
    return (
        <>


            <Card className="mt-20 bg-white  flex justify-center items-center p-8 rounded-lg shadow-md">
                <div className="grid grid-cols-1  gap-8">
                    <div className="col-span-1 ">
                        <ProgressBar steps={steps} currentStep={currentStep} />
                    </div>

                    {currentStep === 0 && (
                        <form className="w-full max-w-lg">
                            <h1 className=" flex justify-center items-center mb-9  ">AJouter un SubAdmin</h1>

                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">

                                    <InputField
                                        label="Nom d'utilisateur"
                                        type="text"
                                        placeholder="Nom d'utilisateur"
                                    />
                                </div>
                                <div className="w-full md:w-1/2 px-3">
                                    <InputField
                                        label="Email"
                                        type="text"
                                        placeholder="UserName"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full px-3">
                                    <InputField
                                        label="Mots de Passe"
                                        type="Password"
                                        placeholder="Mots de Passe"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full px-3">
                                    <InputField
                                        label="Confirmation de Mots de Passe"
                                        type="Password"
                                        placeholder="Confirmation"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <InputField
                                        label="Prénom"
                                        type="text"
                                        placeholder="Prénom"
                                    />

                                </div>
                                <div className="w-full md:w-1/2 px-3">
                                    <InputField
                                        label="Nom "
                                        type="text"
                                        placeholder="Nom "
                                    />
                                </div>
                            </div>

                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >address</label>
                            <div className="flex flex-wrap -mx-3 mb-2">

                                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                    <InputField
                                        label="ville "
                                        type="text"
                                        placeholder="ville "
                                    />
                                </div>
                                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">

                                    <div className="relative">
                                        <SelectField
                                            label="Select a State"
                                            id="select-state"
                                            placeholder="Select a State"
                                            options={statesOfTunisia}
                                            value={selectedState}
                                            onChange={setSelectedState}
                                            classNames="mb-6"
                                        />
                                    </div>
                                </div>
                                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                    <InputField
                                        label="Zip "
                                        type="number"
                                        placeholder="Zip "
                                    />
                                </div>
                            </div>
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <div className="relative">

                                        <SelectField
                                            label="Genre"
                                            id="sGenre"
                                            placeholder="Genre"
                                            options={genre}
                                            value={selectedgenre}
                                            onChange={setselectedgenre}
                                            classNames="mb-6"
                                        />
                                    </div>

                                </div>
                                <div className="w-full md:w-1/2 px-3">
                                    <DateField
                                        label="Date de naissance"
                                        placeholder="Choisissez votre date de naissance"
                                        classNames="mb-6"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <button type="button" className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" disabled>
                                    Précédent
                                </button>
                                <button type="button" onClick={nextStep} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                                    Suivant
                                </button>
                            </div>
                        </form>
                    )}

                    {currentStep === 1 && (
                        <div>

                            <h1 className=" flex justify-center items-center mb-9 ">Permissions</h1>
                            <div className="flex flex-wrap -mx-3 mb-6 ">
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
                                <button type="button" onClick={prevStep} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" >
                                    Précédent
                                </button>
                                <button type="button" onClick={nextStep} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                                    Ajouter subAdmin
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </Card>



        </>);
}

export default CreateSubAdmin;