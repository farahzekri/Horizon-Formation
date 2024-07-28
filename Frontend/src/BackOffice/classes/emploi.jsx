import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ScheduleForm from './scheduleforme'; // Component for the add/edit form
import scheduleService from 'services/scheduleservice';

const Schedule = () => {
    const { id } = useParams();
    const [schedule, setSchedule] = useState({
        days: [
            { day: 'Lundi', times: [] },
            { day: 'Mardi', times: [] },
            { day: 'Mercredi', times: [] },
            { day: 'Jeudi', times: [] },
            { day: 'Vendredi', times: [] }
        ],
        times: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'],
        schedule: {}
    });
    const [showModal, setShowModal] = useState(false);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState({ day: '', time: '' });

    useEffect(() => {
        const fetchSchedule = async () => {
            try {
                const fetchedSchedule = await scheduleService.getScheduleByClassId(id);
                if (fetchedSchedule) {
                    setSchedule({
                        days: fetchedSchedule.days,
                        times: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'],
                        schedule: fetchedSchedule.schedule || {}
                    });
                }
            } catch (error) {
                console.error('Error fetching schedule:', error);
            }
        };

        fetchSchedule();
    }, [id]);

    const handleTimeSlotClick = (day, time) => {
        setSelectedTimeSlot({ day, time });
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
        setSelectedTimeSlot({ day: '', time: '' });
    };

    const handleSave = async (day, timeSlot, { timeStart, timeEnd, formationName }) => {
        let updatedDays = [...schedule.days];

        updatedDays = updatedDays.map(d => {
            if (d.day === day) {
                return {
                    ...d,
                    times: [
                        ...d.times,
                        { timeStart, timeEnd, formationName }
                    ]
                };
            }
            return d;
        });

        try {
            const newSchedule = await scheduleService.addSchedule(id, updatedDays);
            setSchedule(newSchedule);
            handleModalClose();
        } catch (error) {
            console.error('Error saving schedule:', error);
        }
    };

    const getCellContent = (day, time) => {
        const timeSlot = day.times.find(slot => slot.timeStart === time);
        if (timeSlot) {
            const timeStartIndex = schedule.times.indexOf(timeSlot.timeStart);
            const timeEndIndex = schedule.times.indexOf(timeSlot.timeEnd);
            const colspan = timeEndIndex - timeStartIndex;
            return { content: timeSlot.formationName, colspan };
        }
        return { content: '', colspan: 1 };
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl">
                <h1 className="text-2xl font-bold mb-4 text-center">Emploi du temps</h1>
                {schedule && schedule.days && schedule.times ? (
                    <table className="min-w-full divide-y divide-gray-200 border rounded-lg">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 text-left">Jour</th>
                                {schedule.times.map((time, index) => (
                                    <th key={index} className="px-4 py-2 text-left">{time}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {schedule.days.map((day, index) => (
                                <tr key={index} className="border-t">
                                    <td className="px-4 py-2 font-medium">{day.day}</td>
                                    {schedule.times.map((time, timeIndex) => {
                                        const { content, colspan } = getCellContent(day, time);
                                        return (
                                            <td
                                                key={timeIndex}
                                                className="px-4 py-2 border text-center cursor-pointer hover:bg-gray-100"
                                                colSpan={colspan}
                                                onClick={() => handleTimeSlotClick(day.day, time)}
                                            >
                                                {content}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="text-center">
                        <p>Aucun emploi du temps disponible</p>
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                            onClick={() => setSchedule({
                                days: [
                                    { day: 'Lundi', times: [] },
                                    { day: 'Mardi', times: [] },
                                    { day: 'Mercredi', times: [] },
                                    { day: 'Jeudi', times: [] },
                                    { day: 'Vendredi', times: [] }
                                ],
                                times: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'],
                                schedule: {}
                            })}
                        >
                            Ajouter un emploi du temps
                        </button>
                    </div>
                )}

                {showModal && (
                    <ScheduleForm
                        classId={id}
                        timeSlot={selectedTimeSlot}
                        onSave={handleSave}
                        onClose={handleModalClose}
                    />
                )}
            </div>
        </div>
    );
};
export default Schedule;
