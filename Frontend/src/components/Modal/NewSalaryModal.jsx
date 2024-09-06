import React, { useState } from 'react';
import teacherServices from "../../services/teacherServices";
import {toast} from "react-toastify";

const NewSalaryModal = ({ onClose, teacher, onSalaryCreated }) => {
    const [workHours, setWorkHours] = useState(teacher?.salaryInfo?.workHours);
    const [hourlyRate, setHourlyRate] = useState(teacher?.salaryInfo?.hourlyRate);
    const [month, setMonth] = useState('');
    const [method, setMethod] = useState('Bank Transfer');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const teacherId = teacher?._id;
            console.log('Month:', month); // Debugging the month value
            const response = await teacherServices.addTeacherSalary(
                teacherId,
                parseFloat(workHours),
                parseFloat(hourlyRate),
                method,
                month
            );

            // Log the full response for debugging
            console.log('API Response:', response);

            if (response && response.salary) {
                // Ensure salaryInfo.salaries is correctly accessed
                onSalaryCreated(response.salary.salaryInfo.salaries);
                toast.success('Salaire ajouté avec succès');
                onClose();
            } else {
                console.error('Unexpected API response structure:', response);
                toast.error("Erreur inattendue lors de l'ajout du salaire");
            }
        } catch (error) {
            console.error('Error creating salary:', error.message);
            toast.error("Erreur lors de l'ajout du salaire: " + error.message);
        }
    };


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg w-96">
                <h2 className="text-xl font-semibold mb-4">Ajouter un nouveau salaire</h2>
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
                            Mois
                        </label>
                        <input
                            type="month"
                            value={month}
                            onChange={(e) => setMonth(e.target.value)}
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

export default NewSalaryModal;
