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
        const classes = await Class.find().populate('students.studentId');
        res.status(200).json(classes);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching classes', error: err.message });
    }
};
const getclassesById = async (req, res) => {
    try {
        const { id } = req.params; 
        const classDetails = await Class.findById(id).populate('formationId').populate('students.studentId');

        if (!classDetails) {
            return res.status(404).json({ message: 'Classe non trouvée' });
        }

        res.status(200).json(classDetails);
    } catch (error) {
        console.error('Erreur lors de la récupération des détails de la classe:', error);
        res.status(500).json({ message: 'Erreur serveur lors de la récupération des détails de la classe' });
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
const updateClassDetails = async (req, res) => {
    const { id } = req.params;
    const { formationId, level, room } = req.body;

    if (!formationId || !level || !room) {
        return res.status(400).json({ message: 'Formation ID, level, and room are required' });
    }

    try {
        const updatedClass = await Class.findByIdAndUpdate(
            id,
            { formationId, level, room },
            { new: true, runValidators: true }
        );

        if (!updatedClass) {
            return res.status(404).json({ message: 'Class not found' });
        }

        res.status(200).json(updatedClass);
    } catch (err) {
        res.status(500).json({ message: 'Error updating class details', error: err.message });
    }
};
const updateClassStudents = async (req, res) => {
    const { id } = req.params;
    const { students } = req.body;

    if (!students) {
        return res.status(400).json({ message: 'Students are required' });
    }

    try {
        const updatedClass = await Class.findByIdAndUpdate(
            id,
            { students: students.map(studentId => ({ studentId })) },
            { new: true, runValidators: true }
        );

        if (!updatedClass) {
            return res.status(404).json({ message: 'Class not found' });
        }

        res.status(200).json(updatedClass);
    } catch (err) {
        res.status(500).json({ message: 'Error updating class students', error: err.message });
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
    deleteClass,
    getclassesById,
    updateClassDetails,
    updateClassStudents,
};