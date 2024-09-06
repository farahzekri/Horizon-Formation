import React, { useState } from 'react';
import teacherServices from "../../services/teacherServices";
import {toast} from "react-toastify";

const SalaryCreationModal = ({ onClose, teacher, onSalariesCreated  }) => {
    const [workHours, setWorkHours] = useState('');
    const [hourlyRate, setHourlyRate] = useState('');
    const [method, setMethod] = useState('Bank Transfer');
    const [year, setYear] = useState(new Date().getFullYear());

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('year', year)
        try {
            const teacherId = teacher?._id;
            const response = await teacherServices.createSalariesForYear(
                teacherId,
                parseFloat(workHours),
                parseFloat(hourlyRate),
                method,
                parseInt(year, 10)
            );
            console.log('res', response)
            onSalariesCreated(response.salaries.salaryInfo.salaries);
            toast.success('Salaires générés avec succès');
            onClose(); // Close the modal after successful creation
        } catch (error) {
            console.error('Error creating salaries:', error.message);
            toast.error("Erreur lors de la génération des salaires",error.message);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg w-96">
                <h2 className="text-xl font-semibold mb-4">Créer des salaires pour l'année</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Heures travaillées
                        </label>
                        <input
                            type="number"
                            value={workHours}
                            onChange={(e) => setWorkHours(e.target.value)}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Taux horaire (En Dinar Tunisien)
                        </label>
                        <input
                            type="number"
                            value={hourlyRate}
                            onChange={(e) => setHourlyRate(e.target.value)}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Méthode de Paiement
                        </label>
                        <select
                            value={method}
                            onChange={(e) => setMethod(e.target.value)}
                            className="w-full p-2 border rounded"
                        >
                            <option value="Bank Transfer">Virement bancaire</option>
                            <option value="Check">Chèque</option>
                            <option value="Cash">Espèce</option>
                            <option value="Other">Autre</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Année
                        </label>
                        <input
                            type="number"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="mr-2 bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Ajouter
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SalaryCreationModal;
