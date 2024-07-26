const Schedule = require('../models/Schedule');

const createOrUpdateSchedule = async (req, res) => {
    try {
        const { classId, days } = req.body;

        // Vérifiez la structure des données
        if (!Array.isArray(days) || !days.every(d => typeof d === 'object' && d.day && Array.isArray(d.times))) {
            throw new Error('Invalid data structure for days');
        }

        let schedule = await Schedule.findOne({ classId });

        if (schedule) {
            // Si un emploi du temps existe, mettez-le à jour
            schedule.days = days;
            await schedule.save();
            res.status(200).json(schedule);
        } else {
            // Sinon, créez un nouvel emploi du temps
            const newSchedule = new Schedule({
                classId,
                days
            });

            await newSchedule.save();
            res.status(201).json(newSchedule);
        }
    } catch (error) {
        console.error('Error creating or updating schedule:', error);
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
        const schedule = await Schedule.findOne({ classId }).populate('classId');

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

module.exports = {
    createOrUpdateSchedule,
    getAllSchedules,
    getScheduleByClassId,
    updateSchedule,
    deleteSchedule
};
