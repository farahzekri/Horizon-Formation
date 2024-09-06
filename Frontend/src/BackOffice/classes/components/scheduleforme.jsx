import React, { useState, useEffect } from 'react';
import scheduleService from '../../../services/scheduleservice'
import formationService from 'services/formationServices';
const ScheduleForm = ({  classId,timeSlot, onSave, onClose }) => {
   
    const [teacherName, setTeacherName] = useState('');
    const [startTime, setStartTime] = useState(timeSlot.time.split(' - ')[0]); // Début de la séance
    const [endTime, setEndTime] = useState(timeSlot.time.split(' - ')[1]); // Fin de la séance
    const [room, setRoom] = useState('');
    const [availableRooms, setAvailableRooms] = useState([]);
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(''); 
    // Filter out rooms that are already selected for the current time slot
    const filteredRooms = availableRooms.filter(r => !timeSlot.room || r !== timeSlot.room);
    useEffect(() => {
        const fetchAvailableRooms = async () => {
            try {
                console.log('Fetching rooms for:', timeSlot.day, startTime, endTime); // Ajoutez ce log
                const response = await scheduleService.getAvailableRooms(timeSlot.day, startTime, endTime);
                console.log('room', response.data);
                setAvailableRooms(response.data);
            } catch (error) {
                console.error('Error fetching available rooms:', error);
            }
        };
    
        if (startTime && endTime) {
            fetchAvailableRooms();
        }
    }, [timeSlot.day, startTime, endTime]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await formationService.getcourses(classId);
                console.log(response)
                setCourses(response);
            } catch (error) {
                console.error('Erreur lors de la récupération des cours:', error);
            }
        };

        fetchCourses();
    }, [classId]);
  
    const handleSubmit = (e) => {
        e.preventDefault();
        const scheduleData = {
            classId,
            day: timeSlot.day,
            times: [
                {
                    start: startTime,
                    end: endTime,
                    room: room, 
                    course: selectedCourse, 
                    teacher: teacherName 
                }
            ]
        };
        console.log(scheduleData);
        onSave(scheduleData); // Pass the entire schedule data to the parent
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Ajouter/Modifier un créneau</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-2">Matière</label>
                        <select
                            value={selectedCourse}
                            onChange={(e) => setSelectedCourse(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                        >
                            <option value="">Sélectionnez une matière</option>
                            {courses.map((course, index) => (
                                <option key={index} value={course._id}>
                                    {course.courseName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Enseignant</label>
                        <input
                            type="text"
                            value={teacherName}
                            onChange={(e) => setTeacherName(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Salle</label>
                        <select
                            value={room}
                            onChange={(e) => setRoom(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                        >
                            <option value="">Sélectionnez une salle</option>
                            {filteredRooms.map((r, index) => (
                                <option key={index} value={r._id}>
                                    {r.nameSalle}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="mr-2 px-4 py-2 bg-gray-300 text-black rounded"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded"
                        >
                            Enregistrer
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ScheduleForm;