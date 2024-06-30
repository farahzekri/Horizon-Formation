const Class =require('../models/class');


const createClass = async (req, res) => {
    const { formationId, level, room, students } = req.body;

    // Vérification que les champs requis sont présents
    if ( !level || !room || !students) {
        return res.status(400).json({ message: 'Formation ID, level, room, and students are required' });
    }

    try {
         
        const newClass = new Class({
            formationId,
            level,
            room,
            students
        });
        
        const savedClass = await newClass.save();
        res.status(201).json(savedClass);
    } catch (err) {
        console.error('Error creating class:', err);
        res.status(500).json({ message: 'Error creating class', error: err.message });
    }
};

const getAllClasses = async (req, res) => {
    try {
        const classes = await Class.find().populate('students.studentId');;
        res.status(200).json(classes);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching classes', error: err.message });
    }
};
const updateClass = async (req, res) => {
    const { id } = req.params;
    const { formationId, level, room, students } = req.body;

    if (!formationId || !level || !room || !students) {
        return res.status(400).json({ message: 'Formation ID, level, room, and students are required' });
    }

    try {
        const updatedClass = await Class.findByIdAndUpdate(
            id,
            {
                formationId,
                level,
                room,
                students: students.map(studentId => ({ studentId }))
            },
            { new: true, runValidators: true }
        );

        if (!updatedClass) {
            return res.status(404).json({ message: 'Class not found' });
        }

        res.status(200).json(updatedClass);
    } catch (err) {
        res.status(500).json({ message: 'Error updating class', error: err.message });
    }
};
const deleteClass = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedClass = await Class.findByIdAndDelete(id);

        if (!deletedClass) {
            return res.status(404).json({ message: 'Class not found' });
        }

        res.status(200).json({ message: 'Class deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting class', error: err.message });
    }
};

module.exports = {
    createClass,
    getAllClasses,
    updateClass,
    deleteClass
};