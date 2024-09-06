const Schedule = require('../models/schedule');
const mongoose = require('mongoose');
const Salle =require('../models/salle')
const createOrUpdateSchedule = async (req, res) => {
    try {
        const { classId, days } = req.body;

        // Vérifie la structure des données
        if (!Array.isArray(days) || !days.every(d => d.day && Array.isArray(d.times) && d.times.every(t => t.start && t.end && t.room && t.course))) {
            console.error('Invalid data structure for days:', days);
            throw new Error('Invalid data structure for days');
        }

        // Convertir room, course et teacher en ObjectId
        const updatedDays = days.map(day => ({
            day: day.day,
            times: day.times.map(time => ({
                start: time.start,
                end: time.end,
                room: new mongoose.Types.ObjectId(time.room),  // Assurez-vous que c'est un ObjectId
                course: new mongoose.Types.ObjectId(time.course), // Assurez-vous que c'est un ObjectId
                teacher: time.teacher ? new mongoose.Types.ObjectId(time.teacher) : null  // Assurez-vous que c'est un ObjectId, peut être null
            }))
        }));

        let schedule = await Schedule.findOne({ classId });

        if (schedule) {
            // Mise à jour de l'emploi du temps existant
            schedule.days = updatedDays;
            await schedule.save();
            res.status(200).json(schedule);
        } else {
            // Création d'un nouvel emploi du temps
            const newSchedule = new Schedule({
                classId,
                days: updatedDays
            });
            await newSchedule.save();
            res.status(201).json(newSchedule);
        }
    } catch (error) {
        console.error('Error creating or updating schedule:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};


const getAllSchedules = async (req, res) => {
    try {
        const schedules = await Schedule.find().populate('classId');
        res.status(200).json(schedules);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching schedules', error: err.message });
    }
};

const getScheduleByClassId = async (req, res) => {
    try {
        const { classId } = req.params;
        const schedule = await Schedule.findOne({ classId }).populate('classId').populate('days.times.room').populate('days.times.coure');

        if (!schedule) {
            return res.status(404).json({ message: 'Schedule not found' });
        }

        res.status(200).json(schedule);
    } catch (error) {
        console.error('Error fetching schedule details:', error);
        res.status(500).json({ message: 'Server error fetching schedule details' });
    }
};

const updateSchedule = async (req, res) => {
    const { classId } = req.params;
    const { days } = req.body;

    if (!days) {
        return res.status(400).json({ message: 'Days are required' });
    }

    try {
        const updatedSchedule = await Schedule.findOneAndUpdate(
            { classId },
            { days },
            { new: true, runValidators: true }
        );

        if (!updatedSchedule) {
            return res.status(404).json({ message: 'Schedule not found' });
        }

        res.status(200).json(updatedSchedule);
    } catch (err) {
        res.status(500).json({ message: 'Error updating schedule', error: err.message });
    }
};

const deleteSchedule = async (req, res) => {
    const { classId } = req.params;

    try {
        const deletedSchedule = await Schedule.findOneAndDelete({ classId });

        if (!deletedSchedule) {
            return res.status(404).json({ message: 'Schedule not found' });
        }

        res.status(200).json({ message: 'Schedule deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting schedule', error: err.message });
    }
    
};
const getAvailableRooms = async (req, res) => {
    try {
        const { day, start, end } = req.body; // Recevoir le jour, l'heure de début et de fin

        // Trouver toutes les salles qui sont déjà réservées pour ce créneau
        const occupiedRooms = await Schedule.find({
            "days.day": day,
            "days.times": {
                $elemMatch: {
                    $or: [
                        { start: { $lt: end, $gte: start } }, // Créneau chevauche
                        { end: { $gt: start, $lte: end } }   // Créneau chevauche
                    ]
                }
            }
        }).select("days.times.room");

        const occupiedRoomIds = occupiedRooms.flatMap(schedule =>
            schedule.days.flatMap(day =>
                day.times.map(time => time.room.toString())
            )
        );

        // Trouver toutes les salles qui ne sont pas occupées pendant ce créneau
        const availableRooms = await Salle.find({
            _id: { $nin: occupiedRoomIds }
        });

        res.status(200).json(availableRooms);
    } catch (error) {
        console.error('Error fetching available rooms:', error);
        res.status(500).json({ message: 'Server error fetching available rooms' });
    }
};
module.exports = {
    createOrUpdateSchedule,
    getAllSchedules,
    getScheduleByClassId,
    updateSchedule,
    getAvailableRooms,
    deleteSchedule,
    
};
