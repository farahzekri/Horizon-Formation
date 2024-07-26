import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import classServices from "services/classService";
import { Niveauclasse, SalleClasses } from "./valeurselect";
import Card from "components/card";
import SelectField from "components/fields/SelectField";
import SelectandInputField from "components/fields/selectandinputfield";
import formationService from '../../services/formationServices';
import ColumnsTable from "./components/columnstable";
import CheckTable from "./components/checktable";
import Checkbox from "components/checkbox";
import studentService from '../../services/studentServices';

const DetailClasses = () => {
    const { id } = useParams(); // Récupérer l'ID depuis l'URL
    const [classDetails, setClassDetails] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formations, setFormations] = useState([]);
    const navigate = useNavigate();
    const [students, setStudents] = useState([]);
    const [allStudents, setAllStudents] = useState([]);
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [formData, setFormData] = useState({
        formationId: '',
        level: '',
        room: '',
    });
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const data = await studentService.getAllStudents();
                console.log('Students data:', data);
                setAllStudents(data);
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };

        fetchStudents();
    }, []);
    useEffect(() => {
        const fetchClassDetails = async () => {
            try {
                const response = await classServices.getclassById(id);
                setFormData({
                    formationId: response.formationId?._id || '',
                    level: response.level || '',
                    room: response.room || '',
                });
                const selectedIds = response.students.map(student => student.studentId._id);
                setSelectedStudents(selectedIds);
                setClassDetails(response);
            } catch (error) {
                console.error('Erreur lors de la récupération des détails de la classe:', error);
            }
        };

        fetchClassDetails();
    }, [id]);
    useEffect(() => {
        const fetchFormations = async () => {
            try {
                const data = await formationService.getAllFormations();
                console.log('Formations data:', data);
                setFormations(data);
            } catch (error) {
                console.error('Error fetching formations:', error);
            }
        };

        fetchFormations();
    }, []);
    if (!classDetails) {
        return <p>Chargement...</p>;
    }
    const handleEditClick = () => {
        setIsEditing(true);
        setFormData({
            formationId: classDetails.formationId?._id || '',
            level: classDetails.level || '',
            room: classDetails.room || '',
        });
        const selectedIds = classDetails.students.map(student => student.studentId._id);
        setSelectedStudents(selectedIds);
    };
    const handleCancelClick = () => {
        setIsEditing(false);
    };
    const handleSaveClick = async () => {
        try {
            await classServices.updateClass(id, {
                ...formData,
                students: selectedStudents
            });
            setIsEditing(false);
            const updatedClassDetails = await classServices.getclassById(id);
            setClassDetails(updatedClassDetails);
        } catch (error) {
            console.error('Erreur lors de la sauvegarde des modifications:', error);
        }
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleCheckboxChange = (studentId) => {
        setSelectedStudents((prevSelected) =>
            prevSelected.includes(studentId)
                ? prevSelected.filter((id) => id !== studentId)
                : [...prevSelected, studentId]
        );
    };
    const columnsData2 = [
        {
            Header: 'Sélectionner',
            accessor: 'checkbox',
            Cell: ({ row }) => (
                <Checkbox
                    checked={selectedStudents.includes(row.original._id)}
                    onChange={() => handleCheckboxChange(row.original._id)}
                />
            ),
        },
        {
            Header: 'Nom',
            accessor: (row) => `${row.personalInfo.lastName} ${row.personalInfo.firstName}`,
        },
        {
            Header: 'Formations',
            accessor: 'enrollmentInfo.formations[0].level', // Assuming the first formation is displayed
        },
    ];
    const columnsData = [

        {
            Header: 'Nom',
            accessor: (row) => `${row.personalInfo.lastName} ${row.personalInfo.firstName}`,
        },
        {
            Header: 'email',
            accessor: 'personalInfo.email', // Assuming the first formation is displayed
        },
        {
            Header: 'Numero de telephone',
            accessor: 'personalInfo.phoneNumber', // Assuming the first formation is displayed
        },
    ];
    const tableData = allStudents.map(student => ({
        ...student,
        personalInfo: {
            ...student.personalInfo,
            dateOfBirth: new Date(student.personalInfo.dateOfBirth).toLocaleDateString('fr-FR'),
        },
    }));
    return (

        <>
            <Card className="mt-20 bg-white px-9 flex justify-center items-center p-10 rounded-lg shadow-md">

                <div className="w-full max-w-full">
                    <button
                        type="submit"
                        className="mb-6 w-36 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                        onClick={() => navigate('/admin/Classes')}
                    >
                        Retourn
                    </button>
                    <h2 className="flex justify-center items-center mb-9 text-2xl">
                        {isEditing ? (
                            <p>Modifier classe</p>
                        ) : (
                            <p>Détails de la classe</p>
                        )}
                    </h2>
                    <div className="flex flex-wrap -mx-18 mb-6">
                        <div className="w-full md:w-1/2 px-4 mb-6 md:mb-0">
                            <p className="text-sm text-navy-700 dark:text-white ml-3 font-bold">
                                Formation: {isEditing ? (
                                    <SelectField
                                        type="text"
                                        name="formationId"
                                        placeholder="Formation "
                                        value={formData.formationId}
                                        onChange={(value) => handleInputChange({ target: { name: 'formationId', value } })}
                                        options={formations.map((formation) => ({
                                            value: formation._id, // Utilisez l'ID ou un autre identifiant unique
                                            label: formation.name,
                                        }))}
                                    />
                                ) : (
                                    classDetails.formationId ? (
                                        <p>{classDetails.formationId.name}</p>
                                    ) : (
                                        <p>Aucune formation disponible</p>
                                    )
                                )}</p>
                        </div>
                        <div className="w-full md:w-1/2 px-4">
                            <p className="text-sm text-navy-700 dark:text-white ml-3 font-bold">
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
                                    classDetails.level
                                )}</p>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-18 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <p className="text-sm text-navy-700 dark:text-white ml-3 font-bold">
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
                                    classDetails.room
                                )}</p>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-18 mb-6">
                    <div className="max-h-96 overflow-y-auto">  
                        {isEditing ? (
                            
                               
                                    <CheckTable
                                        columnsData={columnsData2}
                                        tableData={allStudents}
                                        selected={selectedStudents}
                                        handleCheckboxChange={handleCheckboxChange}
                                    />
                           
                            
                        ) : (

                                    <ColumnsTable
                                        columnsData={columnsData}
                                        tableData={classDetails.students.map(student => ({
                                            ...student.studentId,
                                            personalInfo: {
                                                ...student.studentId.personalInfo,
                                                dateOfBirth: new Date(student.studentId.personalInfo.dateOfBirth).toLocaleDateString('fr-FR'),
                                            },
                                        }))}
                                    />
                               
                            
                        )}
                      </div>
                    </div>

                    <div className="flex justify-center">
                        {isEditing ? (
                            <>
                                <button onClick={handleSaveClick} className="mt-4 w-36 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">Enregistrer</button>
                                <button onClick={handleCancelClick} className="mt-4 w-36 bg-red-500 text-white py-2  rounded-lg hover:bg-red-600 ml-4">Annuler</button>
                            </>
                        ) : (
                            <button onClick={handleEditClick} className="mt-4 w-36 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">Modifier</button>
                        )}
                    </div>
                </div>
            </Card>
        </>
    );
}

export default DetailClasses;