import React, { useState } from 'react';

const ScheduleFormTime = ({ timeStart, onSave, onClose }) => {
    const [timeEnd, setTimeEnd] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(timeEnd);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Sélectionner l'heure de fin</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-2">Heure de début</label>
                        <input
                            type="time"
                            value={timeStart}
                            readOnly
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Heure de fin</label>
                        <input
                            type="time"
                            value={timeEnd}
                            onChange={(e) => setTimeEnd(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Sauvegarder
                        </button>
                    </div>
                </form>
            </div>
        </div>)
        }
export default ScheduleFormTime;