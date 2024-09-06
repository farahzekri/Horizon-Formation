import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ScheduleForm from './components/scheduleforme';
import scheduleService from 'services/scheduleservice';
import salleService from 'services/salleService';
import { FaChalkboardTeacher, FaSchool } from 'react-icons/fa'; // Import icons

const Schedule = () => {
    const { id } = useParams();
    const [schedule, setSchedule] = useState({
        days: [
            { day: 'Lundi', times: [] },
            { day: 'Mardi', times: [] },
            { day: 'Mercredi', times: [] },
            { day: 'Jeudi', times: [] },
            { day: 'Vendredi', times: [] },
            { day: 'Samedi', times: [] }
        ],
        times: ['08:00 - 09:30', '10:00 - 11:30', '12:00 - 13:30', '14:00 - 15:30', '16:00 - 17:30'],
    });
    const [availableRooms, setAvailableRooms] = useState([]);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState({ day: '', time: '' });

    useEffect(() => {
        const fetchScheduleAndRooms = async () => {
            try {
                const fetchedSchedule = await scheduleService.getScheduleByClassId(id);
                if (fetchedSchedule) {
                    setSchedule(prevSchedule => ({
                        ...prevSchedule,
                        days: fetchedSchedule.days,
                    }));
                }

                const rooms = await salleService.getAllsalles();
                setAvailableRooms(rooms);
            } catch (error) {
                console.error('Error fetching schedule or rooms:', error);
            }
        };

        fetchScheduleAndRooms();
    }, [id]);

    const handleTimeSlotClick = (day, time) => {
        setSelectedTimeSlot({ day, time });
        setShowDetailsModal(true);
    };

    const handleDetailsSave = async (scheduleData) => {
        const updatedDays = schedule.days.map(d => {
            if (d.day === scheduleData.day) {
                const existingSlotIndex = d.times.findIndex(slot => 
                    slot.start === scheduleData.times[0].start && 
                    slot.end === scheduleData.times[0].end
                );
    
                if (existingSlotIndex > -1) {
                    // Update existing time slot
                    d.times[existingSlotIndex] = scheduleData.times[0];
                } else {
                    // Add new time slot
                    d.times.push(scheduleData.times[0]);
                }
            }
            return d;
        });
    
        try {
            const newSchedule = await scheduleService.addSchedule(id, updatedDays);
            setSchedule(prevSchedule => ({
                ...prevSchedule,
                days: newSchedule.days,
            }));
            setShowDetailsModal(false);
        } catch (error) {
            console.error('Error saving schedule:', error);
        }
    };

    const getCellContent = (day, time) => {
        const timeSlot = day.times.find(slot => `${slot.start} - ${slot.end}` === time);

        if (timeSlot) {
            return {
                content: (
                    <div className="flex items-center space-x-2">
                        <FaChalkboardTeacher className="text-blue-500" />
                        <span className="text-green-500">{timeSlot.course.name}</span>
                        <span>avec</span>
                        <span className="text-green-500">{timeSlot.teacher}</span>
                        <FaSchool className="text-red-500 ml-2" />
                        <span>en {timeSlot.room.nameSalle}</span>
                    </div>
                ),
                colspan: 1
            };
        }

        return { content: '', colspan: 1 };
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl">
                <h1 className="text-3xl font-bold mb-4 text-center text-black">Emploi du Temps</h1>
                {schedule && schedule.days ? (
                    <table className="min-w-full divide-y divide-gray-200 border rounded-lg">
                        <thead className="bg-indigo-100">
                            <tr>
                                <th className="px-4 py-2 text-left text-black">Jour</th>
                                {schedule.times.map((time, index) => (
                                    <th key={index} className="px-4 py-2 text-left text-black">{time}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {schedule.days.map((day, index) => (
                                <tr key={index} className="border-t">
                                    <td className="px-4 py-2 font-medium text-black bg-gray-50">{day.day}</td>
                                    {schedule.times.map((time, timeIndex) => {
                                        const { content, colspan } = getCellContent(day, time);
                                        return (
                                            <td
                                                key={timeIndex}
                                                className="px-4 py-2 border-r cursor-pointer hover:bg-indigo-50 transition duration-200"
                                                colSpan={colspan}
                                                onClick={() => handleTimeSlotClick(day.day, time)}
                                            >
                                                {content || (
                                                    <div className="text-gray-400">
                                                        <span>Libre</span>
                                                    </div>
                                                )}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="text-center">
                        <p className="text-gray-500">Aucun emploi du temps disponible.</p>
                        <button
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
                            onClick={() => setSchedule(prevSchedule => ({
                                ...prevSchedule,
                                days: [
                                    { day: 'Lundi', times: [] },
                                    { day: 'Mardi', times: [] },
                                    { day: 'Mercredi', times: [] },
                                    { day: 'Jeudi', times: [] },
                                    { day: 'Vendredi', times: [] },
                                    { day: 'Samedi', times: [] }
                                ]
                            }))}
                        >
                            Ajouter un emploi
                        </button>
                    </div>
                )}
                {showDetailsModal && (
                    <ScheduleForm
                        classId={id}
                        timeSlot={selectedTimeSlot}
                        availableRooms={availableRooms}
                        onSave={handleDetailsSave}
                        onClose={() => setShowDetailsModal(false)}
                    />
                )}
            </div>
        </div>
    );
};

export default Schedule;
