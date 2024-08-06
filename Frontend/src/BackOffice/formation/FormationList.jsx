import React, { useEffect, useState } from "react";
import CheckTable from "../admin/tables/components/CheckTable";
import InputField from "../../components/fields/InputField";
import TextField from "../../components/fields/TextField";
import formationService from "../../services/formationServices";
import SelectField from "../../components/fields/SelectField";
import MultiSelectField from "../../components/fields/MultiSelectField";
import FormationProgressBar from "./components/FormationProgressBar";
import courseService from "../../services/courseServices";
import FormModal from "../../components/Modal/formModal";

const levels = [
    { value: "BTP", label: "BTP" },
    { value: "BTS", label: "BTS" },
    { value: "CAP", label: "CAP" },
];

const FormationList = () => {
    const [formations, setFormations] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({
        name: '',
        type: '',
        level: '',
        registrationFee: '',
        tuitionFee: '',
        description: '',
        courses: []
    });
    const [courses, setCourses] = useState([]);
    const [selectedFormations, setSelectedFormations] = useState([]);

    useEffect(() => {
        const fetchFormations = async () => {
            try {
                const data = await formationService.getAllFormations();
                setFormations(data);
            } catch (error) {
                console.error('Error fetching formations:', error);
            }
        };

        fetchFormations();
    }, []);

    const fetchCourses = async () => {
        try {
            const data = await courseService.getAllCourses();
            setCourses(data);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    const steps = [
        "Étape 1: Informations Générales",
        "Étape 2: Matières",
    ];

    const nextStep = () => {
        setCurrentStep(currentStep + 1);
    };

    const prevStep = () => {
        setCurrentStep(currentStep - 1);
    };

    const columnsData = [
        {
            Header: 'Formation',
            accessor: 'name',
        },
        {
            Header: 'Type de Formation',
            accessor: 'type',
        },
        {
            Header: 'Niveau de Formation',
            accessor: 'level',
        },
        {
            Header: 'Date de Creation',
            accessor: 'dateCreated',
        },
    ];

    const handleAjouterClick = () => {
        setIsModalOpen(true);
        fetchCourses();
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentStep(0);
    };

    const handleCourseChange = (selectedCourses) => {
        const updatedCourses = selectedCourses.map((course) => ({
            courseName: course.label,
            coefficient: ''
        }));
        const uniqueCourses = updatedCourses.filter(
            (course, index, self) =>
                index === self.findIndex((c) => c.courseName === course.courseName)
        );
        setFormData({ ...formData, courses: uniqueCourses  });
    };

    const handleCoefficientChange = (index, value) => {
        const updatedCourses = [...formData.courses];
        updatedCourses[index].coefficient = value;
        setFormData({ ...formData, courses: updatedCourses });
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (currentStep === 0) {
            nextStep();
        } else {
            try {
                await formationService.addFormation(formData);
                setFormData({
                    name: '',
                    type: '',
                    level: '',
                    registrationFee: '',
                    tuitionFee: '',
                    description: '',
                    courses: []
                });
                const fetchFormations = async () => {
                    try {
                        const data = await formationService.getAllFormations();
                        setFormations(data);
                    } catch (error) {
                        console.error('Error fetching formations:', error);
                    }
                };

                fetchFormations();
                handleCloseModal();
            } catch (error) {
                console.error('Error adding formation:', error);
            }
        }
    };

    const handleCheckboxChange = (formationId) => {
        setSelectedFormations((prevSelected) =>
            prevSelected.includes(formationId)
                ? prevSelected.filter(id => id !== formationId)
                : [...prevSelected, formationId]
        );
    };
    const handleDeleteSelected = async () => {
        try {
            await Promise.all(
                selectedFormations.map(id => formationService.deleteFormationById(id))
            );
            const fetchFormations = async () => {
                try {
                    const data = await formationService.getAllFormations();
                    setFormations(data);
                    setSelectedFormations([]); // Clear selected formations
                } catch (error) {
                    console.error('Error fetching formations:', error);
                }
            };
            fetchFormations();
        } catch (error) {
            console.error('Error deleting formations:', error);
        }
    };

    return (
        <div>
            <CheckTable
                tableName="Tableau des Formations"
                columnsData={columnsData}
                tableData={formations}
                onAjouterClick={handleAjouterClick}
                handleCheckboxChange={handleCheckboxChange}
                handleDeleteSelected={handleDeleteSelected}
                selectedFormations={selectedFormations}
            />
            {isModalOpen && (
                <FormModal onClose={handleCloseModal}>
                    <form className="w-full" onSubmit={handleSubmit}>
                        <h2 className="text-xl font-bold mb-4">Ajouter une Formation</h2>
                        <FormationProgressBar steps={steps} currentStep={currentStep}/>
                        {currentStep === 0 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <InputField
                                        label="Formation"
                                        id="name"
                                        name="name"
                                        type="text"
                                        placeholder="Entrez le nom de la formation"
                                        value={formData.name}
                                        onChange={handleChange}
                                        extra="mb-4"
                                    />
                                    <InputField
                                        label="Type de Formation"
                                        id="type"
                                        name="type"
                                        type="text"
                                        placeholder="Entrez le type de la formation"
                                        value={formData.type}
                                        onChange={handleChange}
                                        extra="mb-4"
                                    />
                                    <SelectField
                                        label="Niveau de Formation"
                                        id="level"
                                        name="level"
                                        placeholder="Sélectionner le Niveau"
                                        options={levels}
                                        value={formData.level}
                                        onChange={(selectedValue) =>
                                            setFormData({...formData, level: selectedValue})
                                        }
                                    />
                                    <InputField
                                        label="Frais d'inscription"
                                        id="registrationFee"
                                        name="registrationFee"
                                        type="number"
                                        placeholder="0 DT"
                                        value={formData.registrationFee}
                                        onChange={handleChange}
                                        extra="mb-4"
                                    />
                                    <InputField
                                        label="Frais de Scolarité"
                                        id="tuitionFee"
                                        name="tuitionFee"
                                        type="number"
                                        placeholder="0 DT"
                                        value={formData.tuitionFee}
                                        onChange={handleChange}
                                        extra="mb-4"
                                    />
                                </div>
                                <TextField
                                    label="Description (Optionnel)"
                                    id="description"
                                    name="description"
                                    placeholder="Entrez une description de la formation"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows="20"
                                    extra="mb-4"
                                />
                            </div>
                        )}
                        {currentStep === 1 && (
                            <div>
                                <MultiSelectField
                                    label="Matières"
                                    id="courses"
                                    name="courses"
                                    options={courses.map(course => ({value: course._id, label: course.name}))}
                                    value={formData.courses.map(course => ({
                                        value: course.courseName,
                                        label: course.courseName
                                    }))}
                                    onChange={(selectedOptions) => handleCourseChange(selectedOptions)}
                                    extra="mb-4"
                                />
                                {formData.courses.map((course, index) => (
                                    <div key={index} className="mb-4">
                                        <InputField
                                            label={`Coefficient pour ${course.courseName}`}
                                            id={`coefficient-${index}`}
                                            name={`coefficient-${index}`}
                                            type="number"
                                            placeholder="Enter coefficient"
                                            value={course.coefficient}
                                            onChange={(e) => handleCoefficientChange(index, e.target.value)}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className="flex justify-between mt-4">
                            {currentStep > 0 && <button type="button" onClick={prevStep}>Précédent</button>}
                            <div className="flex-grow text-right">
                                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                                    {currentStep === steps.length - 1 ? 'Ajouter' : 'Suivant'}
                                </button>
                            </div>
                        </div>

                    </form>
                </FormModal>
            )}
        </div>
    );
};

export default FormationList;
