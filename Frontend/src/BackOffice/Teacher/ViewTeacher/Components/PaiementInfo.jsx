import React, {useState, useMemo, useCallback, useEffect} from 'react';
import SalaryCreationModal from "../../../../components/Modal/SalaryCreationModal";
import teacherServices from "../../../../services/teacherServices";
import Checkbox from "../../../../components/checkbox";
import {toast} from "react-toastify";
import NewSalaryModal from "../../../../components/Modal/NewSalaryModal";

const BillingInformation = ({ teacher }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isNewModalOpen, setIsNewModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedSalaries, setEditedSalaries] = useState(teacher.salaryInfo.salaries);
    const [selectedSalaries, setSelectedSalaries] = useState([]);
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [years, setYears] = useState([]);
    const [salaries, setSalaries] = useState({});

    const fetchSalariesByYear = async () => {
        try {
            const response = await teacherServices.getSalariesByYear(teacher?._id);
            setSalaries(response);
            const uniqueYears = Array.from(new Set(
                Object.keys(response).map(year => parseInt(year))
            ));

            setYears(uniqueYears);
            console.log('years', years)
            if (!uniqueYears.includes(currentYear)) {
                setCurrentYear(uniqueYears[0] || new Date().getFullYear());
            }
        } catch (error) {
            console.error('Error fetching salaries:', error);
        }
    };
    useEffect(() => {
        fetchSalariesByYear();
    }, [teacher?._id, currentYear]);
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    const handleOpenNewModal = () => {
        setIsNewModalOpen(true);
    };

    const handleCloseNewModal = () => {
        setIsNewModalOpen(false);
    };
    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    const handleSaveClick = async () => {
        try {
            const salariesToUpdate = Object.values(salaries[currentYear] || []).map(salary => {
                const { _id, method, paymentDate, paid, hourlyRate, workHours } = salary;
                return { _id, method, paymentDate, paid, hourlyRate, workHours };
            });

            await teacherServices.updateSalaries(teacher._id, salariesToUpdate);
            setIsEditing(false);
            toast.success("Salaires modifiés avec succès!");
            fetchSalariesByYear();
        } catch (error) {
            console.error("Error updating salaries:", error);
            toast.error("Erreur lors de la modification des salaires:", error);
        }
    };

    const handleInputChange = (index, field, value) => {
        const updatedSalaries = { ...salaries };
        const currentSalaries = updatedSalaries[currentYear] || [];
        const updatedSalary = { ...currentSalaries[index], [field]: value };
        updatedSalaries[currentYear] = [...currentSalaries.slice(0, index), updatedSalary, ...currentSalaries.slice(index + 1)];
        setSalaries(updatedSalaries);
    };

    const handleTogglePaid = (index) => {
        const updatedSalaries = { ...salaries };
        const currentSalaries = updatedSalaries[currentYear] || [];
        const today = new Date().toISOString().split('T')[0];
        const updatedSalary = {
            ...currentSalaries[index],
            paid: !currentSalaries[index].paid,
            paymentDate: !currentSalaries[index].paid ? today : currentSalaries[index].paymentDate
        };
        updatedSalaries[currentYear] = [...currentSalaries.slice(0, index), updatedSalary, ...currentSalaries.slice(index + 1)];
        setSalaries(updatedSalaries);
    };

    const handleSelectSalary = (id) => {
        setSelectedSalaries(prevSelected =>
            prevSelected.includes(id)
                ? prevSelected.filter(salaryId => salaryId !== id)
                : [...prevSelected, id]
        );
    };

    const handleSelectAll = () => {
        if (selectedSalaries.length === (salaries[currentYear] || []).length) {
            setSelectedSalaries([]); // Deselect all if all are selected
        } else {
            setSelectedSalaries((salaries[currentYear] || []).map(salary => salary._id)); // Select all
        }
    };

    const handleDeleteClick = async () => {
        if (selectedSalaries.length === 0) return;

        try {
            for (const salaryId of selectedSalaries) {
                await teacherServices.deleteSalary(teacher._id, salaryId);
            }
            const updatedSalaries = { ...salaries };
            updatedSalaries[currentYear] = (salaries[currentYear] || []).filter(
                (salary) => !selectedSalaries.includes(salary._id)
            );
            setSalaries(updatedSalaries);
            setSelectedSalaries([]);
            toast.success("Salaires supprimés avec succès!");
            fetchSalariesByYear();
        } catch (error) {
            toast.error("Erreur lors de la suppression des salaires:", error);
        }
    };

    const handleYearChange = (newYear) => {
        if (years.includes(newYear)) {
            setCurrentYear(newYear);
        }
    };
    return (
        <div className="bg-white shadow-lg p-6 mb-6">
            <div className="flex justify-between p-2">
                <h2 className="text-xl font-semibold mb-4">Salaires</h2>
                <div className="space-x-2">
                    <button
                        onClick={handleOpenModal}
                        className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600`}
                    >
                        Générer les salaires pour une année
                    </button>
                    <button
                        onClick={handleOpenNewModal}
                        className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600`}
                    >
                        Générer un nouvel salaire
                    </button>
                    <button
                        onClick={handleEditClick}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                        {isEditing ? 'Annuler' : 'Modifier'}
                    </button>
                    {isEditing && (
                        <button
                            onClick={handleSaveClick}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Sauvegarder
                        </button>
                    )}
                    {selectedSalaries.length > 0 && (
                        <button
                            onClick={handleDeleteClick}
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        >
                            Supprimer
                        </button>
                    )}
                </div>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            <Checkbox
                                checked={selectedSalaries.length === editedSalaries.length}
                                onChange={handleSelectAll}
                            />
                        </th>
                        <th scope="col" className="px-6 py-3">Mois</th>
                        <th scope="col" className="px-6 py-3">Taux horaire</th>
                        <th scope="col" className="px-6 py-3">Heures travaillées</th>
                        <th scope="col" className="px-6 py-3">Montant</th>
                        <th scope="col" className="px-6 py-3">Méthode</th>
                        <th scope="col" className="px-6 py-3">Date de paiement</th>
                        <th scope="col" className="px-6 py-3">Payé</th>
                    </tr>
                    </thead>
                    <tbody>
                    {Object.keys(salaries).length === 0 ? (
                        <tr>
                            <td colSpan="8" className="px-6 py-4 text-center text-xl text-gray-500">
                                Aucun salaire disponible pour ce formateur, générez de nouveaux salaires.
                            </td>
                        </tr>
                    ) : salaries[currentYear]?.length === 0 ? (
                        <tr>
                            <td colSpan="8" className="px-6 py-4 text-center text-xl text-gray-500">
                                Aucun salaire disponible pour {currentYear}, générez de nouveaux salaires.
                            </td>
                        </tr>
                    ) : (
                        salaries[currentYear]?.map((salary, index) => (
                            <tr key={salary._id} // Use _id for the key
                                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                <td className="px-6 py-4">
                                    <Checkbox
                                        checked={selectedSalaries.includes(salary?._id)}
                                        onChange={() => handleSelectSalary(salary?._id)}
                                    />
                                </td>
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {new Date(salary.month).toLocaleDateString('fr-FR', {
                                        year: 'numeric',
                                        month: 'long'
                                    })}
                                </td>
                                <td className="px-6 py-4">
                                    {isEditing ? (
                                        <input
                                            type="number"
                                            value={salary.hourlyRate}
                                            onChange={(e) => handleInputChange(index, 'hourlyRate', parseFloat(e.target.value))}
                                            className="border rounded px-2 py-1 w-20"
                                        />
                                    ) : (
                                        `${salary.hourlyRate.toFixed(2)} DT`
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    {isEditing ? (
                                        <input
                                            type="number"
                                            value={salary.workHours}
                                            onChange={(e) => handleInputChange(index, 'workHours', parseFloat(e.target.value))}
                                            className="border rounded px-2 py-1 w-20"
                                        />
                                    ) : (
                                        salary.workHours
                                    )}
                                </td>
                                <td className="px-6 py-4">{salary.amount ? salary.amount.toFixed(2) : 'N/A'} DT</td>
                                <td className="px-6 py-4">
                                    {isEditing ? (
                                        <select
                                            value={salary.method}
                                            onChange={(e) => handleInputChange(index, 'method', e.target.value)}
                                            className="border rounded px-2 py-1"
                                        >
                                            <option value="Bank Transfer">Virement bancaire</option>
                                            <option value="Check">Chèque</option>
                                            <option value="Cash">Espèce</option>
                                            <option value="Other">Autre</option>
                                        </select>
                                    ) : (
                                        salary.method
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    {salary.paymentDate ? new Date(salary.paymentDate).toLocaleDateString('fr-FR', {
                                        day: '2-digit',
                                        month: '2-digit'
                                    }) : 'Pas envoyée'}
                                </td>
                                <td className="px-6 py-4">
                                    {isEditing ? (
                                        <button
                                            onClick={() => handleTogglePaid(index)}
                                            className={`px-2 py-1 rounded ${salary.paid ? 'bg-green-500' : 'bg-red-500'} text-white`}
                                        >
                                            {salary.paid ? 'Oui' : 'Non'}
                                        </button>
                                    ) : (
                                        salary.paid ? 'Oui' : 'Non'
                                    )}
                                </td>
                            </tr>
                        )))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-between items-center mt-4">
                <button
                    onClick={() => handleYearChange(currentYear - 1)}
                    disabled={!years.includes(currentYear - 1)}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                >
                    Année précédente
                </button>
                <span className="text-gray-700">{currentYear}</span>
                <button
                    onClick={() => handleYearChange(currentYear + 1)}
                    disabled={!years.includes(currentYear + 1)}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                >
                    Année suivante
                </button>
            </div>
            {isModalOpen &&
                <SalaryCreationModal
                    teacher={teacher}
                    onClose={handleCloseModal}
                    onSalariesCreated={fetchSalariesByYear}
                />}
            {isNewModalOpen &&
                <NewSalaryModal
                    teacher={teacher}
                    onClose={handleCloseNewModal}
                    onSalaryCreated={fetchSalariesByYear}
                />}
        </div>
    );
};

export default BillingInformation;
