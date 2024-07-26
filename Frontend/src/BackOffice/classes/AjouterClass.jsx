import Card from "components/card";
import InputField from "components/fields/InputField";
import { useEffect, useState } from "react";
import studentService from '../../services/studentServices';
import formationService from '../../services/formationServices';
import Checkbox from "components/checkbox";
import DateField from "components/fields/DateField";
import classServices from "services/classService";
import { useNavigate } from "react-router-dom";
import { Niveauclasse, SalleClasses } from "./valeurselect";
import SelectField from "components/fields/SelectField";
import SelectandInputField from "components/fields/selectandinputfield";
import CheckTable from "./components/checktable";
import StudentList from "BackOffice/student/StudentList";
const AjouterClass = () => {
    const [students, setStudents] = useState([]);
    const [selectedStudents, setSelectedStudents] = useState([]);

    const [formations, setFormations] = useState([]);
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
                setStudents(data);
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };

        fetchStudents();
    }, []);
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
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleCheckboxChange = (studentId) => {
        setSelectedStudents(prevSelected =>
            prevSelected.includes(studentId)
                ? prevSelected.filter(id => id !== studentId)
                : [...prevSelected, studentId]
        );
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formattedStudents = selectedStudents.map(studentId => ({ studentId }));
        const classData = {
            ...formData,
            students: formattedStudents
        };

        try {
            await classServices.addclass(classData);
            alert('Class added successfully!');
        } catch (error) {
            alert('Error adding class.');


        }
    };
    const navigate = useNavigate();
    const columnsData = [
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
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredStudents, setFilteredStudents] = useState(students);

 
    useEffect(() => {
        setFilteredStudents(
            students.filter(student => 
                `${student.personalInfo.lastName} ${student.personalInfo.firstName}`.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, students]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };
    return (
        <>

            <Card className="mt-20 bg-white px-9 flex justify-center items-center p-10 rounded-lg shadow-md">

                <form className="w-full max-w-full " onSubmit={handleSubmit}>
                    <button
                        type="submit"
                        className="mb-6 w-36 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                        onClick={() => navigate('/admin/Classes')}
                    >
                        Retourn
                    </button>
                    <h1 className="flex justify-center items-center mb-9 text-2xl">Ajouter une Classe</h1>
                    <div className="flex flex-wrap -mx-18 mb-6">
                        <div className="w-full md:w-1/2 px-4 mb-6 md:mb-0">
                            <SelectField
                                label="Formation"
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
                        </div>
                        <div className="w-full md:w-1/2 px-4">
                            <SelectField
                                label="Niveau"
                                id="Niveau"
                                name="level"
                                placeholder="Sélectionner Niveau"
                                options={Niveauclasse}
                                value={formData.level}
                                onChange={(selectedValue) => setFormData({ ...formData, level: selectedValue })}

                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-18 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <SelectandInputField
                                label="Salle"
                                id="room"
                                name="room"
                                placeholder="Salle"
                                options={SalleClasses}
                                value={formData.room}
                                onChange={(selectedValue) => setFormData({ ...formData, room: selectedValue })}

                            />
                        </div>


                    </div>
                    <div className="flex flex-wrap -mx-18 mb-6">

                        <div className="w-full px-3">
                        <input
                        type="text"
                        placeholder="Rechercher par nom"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none"
                    />
                        <div className="max-h-96 overflow-y-auto">   
                            <CheckTable 
                            columnsData={columnsData} 
                            tableData={filteredStudents}
                            selected={selectedStudents} 
                            handleCheckboxChange={handleCheckboxChange} />
                     
                        </div>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="mt-4 w-36 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                    >
                        Ajouter class
                    </button>
                </form>


            </Card>

        </>);
}

export default AjouterClass;