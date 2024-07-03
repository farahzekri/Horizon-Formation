import React, { useEffect, useState } from "react";
import courseService from "../../services/courseServices";
import CheckTable from "../admin/tables/components/CheckTable";
import InputField from "../../components/fields/InputField";
import TextField from "../../components/fields/TextField";
import FormModal from "../../components/Modal/formModal";


const CourseList = () => {
    const [courses, setCourses] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: ''
    });
    const [selectedCourses, setSelectedCourses] = useState([]);
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const data = await courseService.getAllCourses();
                setCourses(data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, []);

    const columnsData = [
        {
            Header: 'Matière',
            accessor: 'name',
        },
        {
            Header: 'Date de Creation',
            accessor: 'dateCreated',
        },
        {
            Header: 'Action',
            accessor: '',
        },
    ];

    const handleAjouterClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
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
        console.log(formData);
            try {
                await courseService.addCourse(formData);
                setFormData({
                    name: '',
                    description: '',
                });
                const fetchCourses = async () => {
                    try {
                        const data = await courseService.getAllCourses();
                        setCourses(data);
                    } catch (error) {
                        console.error('Error fetching courses:', error);
                    }
                };
                fetchCourses();
                handleCloseModal();
            } catch (error) {
                console.error('Error adding course:', error);
            }

    };

    const handleCheckboxChange = (courseId) => {
        setSelectedCourses((prevSelected) =>
            prevSelected.includes(courseId)
                ? prevSelected.filter(id => id !== courseId)
                : [...prevSelected, courseId]
        );
    };
    const handleDeleteSelected = async () => {
        try {
            await Promise.all(
                selectedCourses.map(id => courseService.deleteCourseById(id))
            );
            const fetchCourses = async () => {
                try {
                    const data = await courseService.getAllCourses();
                    setCourses(data);
                    setSelectedCourses([]); // Clear selected formations
                } catch (error) {
                    console.error('Error fetching courses:', error);
                }
            };
            fetchCourses();
        } catch (error) {
            console.error('Error deleting courses:', error);
        }
    };
    return (
        <div>
            <CheckTable
                tableName="Tableau des matières"
                columnsData={columnsData}
                tableData={courses}
                onAjouterClick={handleAjouterClick}
                handleCheckboxChange={handleCheckboxChange}
                handleDeleteSelected={handleDeleteSelected}
                selectedFormations={selectedCourses}
            />
            {isModalOpen && (
                <FormModal onClose={handleCloseModal}>
                    <form className="w-full" onSubmit={handleSubmit}>
                        <h2 className="text-xl font-bold mb-4">Ajouter une Matière</h2>
                        <InputField
                            label="Matière"
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Entrez le nom de la matière"
                            value={formData.name}
                            onChange={handleChange}
                            extra="mb-4"
                        />
                        <TextField
                            label="Description (Optionnel)"
                            id="description"
                            name="description"
                            placeholder="Entrez une description de la matière"
                            value={formData.description}
                            onChange={handleChange}
                            extra="mb-4"
                            rows="10"
                        />
                        <div className="flex">
                            <button type="submit" className="bg-blue-500 text-white p-2 rounded">Ajouter</button>
                        </div>
                    </form>
                </FormModal>
            )}
        </div>
    );
};

export default CourseList;
