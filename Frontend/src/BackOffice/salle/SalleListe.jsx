import React, { useEffect, useState } from "react";
import salleService from "../../services/salleService";
import CheckTable from "../admin/tables/components/CheckTable";
import InputField from "../../components/fields/InputField";
import TextField from "../../components/fields/TextField";
import FormModal from "../../components/Modal/formModal";


const SalleList = () => {
    const [salles, setsalles] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        nameSalle: '',
    });
   
    useEffect(() => {
        const fetchsalles = async () => {
            try {
                const data = await salleService.getAllsalles();
                setsalles(data);
            } catch (error) {
                console.error('Error fetching salles:', error);
            }
        };

        fetchsalles();
    }, []);

    const columnsData = [
        {
            Header: 'Salle',
            accessor: 'nameSalle',
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
            try {
                await salleService.addSalle(formData);
                setFormData({
                    nameSalle: '',
                    
                });
                const fetchSalles = async () => {
                    try {
                        const data = await salleService.getAllsalles();
                        setsalles(data);
                    } catch (error) {
                        console.error('Error fetching salles:', error);
                    }
                };
                fetchSalles();
                handleCloseModal();
            } catch (error) {
                console.error('Error adding course:', error);
            }

    };
    const [selectedSalles, setSelectedSalles] = useState([]);
    const handleCheckboxChange = (salleId) => {
        setSelectedSalles((prevSelected) =>
            prevSelected.includes(salleId)
                ? prevSelected.filter(id => id !== salleId)
                : [...prevSelected, salleId]
        );
    };
    
    const handleDeleteSelected = async () => {
        try {
            await Promise.all(
                selectedSalles.map(id => salleService.deleteSallesById(id))
            );
            const fetchSalles = async () => {
                try {
                    const data = await salleService.getAllsalles();
                    setsalles(data);
                    setSelectedSalles([]); 
                } catch (error) {
                    console.error('Error fetching salles:', error);
                }
            };
            fetchSalles();
        } catch (error) {
            console.error('Error deleting salles:', error);
        }
    };
    return (
        <div>
            <CheckTable
                tableName="Tableau des Salles"
                columnsData={columnsData}
                tableData={salles}
                onAjouterClick={handleAjouterClick}
                handleCheckboxChange={handleCheckboxChange}
                handleDeleteSelected={handleDeleteSelected}
                selectedFormations={selectedSalles}
            />
            {isModalOpen && (
                <FormModal onClose={handleCloseModal}>
                    <form className="w-full" onSubmit={handleSubmit}>
                        <h2 className="text-xl font-bold mb-4">Ajouter une salle</h2>
                        <InputField
                            label="Nom de salle"
                            id="nameSalle"
                            name="nameSalle"
                            type="text"
                            placeholder="Entrez le nom de la salle"
                            value={formData.nameSalle}
                            onChange={handleChange}
                            extra="mb-4"
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

export default SalleList;
