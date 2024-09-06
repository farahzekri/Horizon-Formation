const Class =require('../models/class');
const Student=require('../models/student')

const createClass = async (req, res) => {
    const { formationId, level, students } = req.body;

    // Vérification que les champs requis sont présents
    if (!level || !students) {
        return res.status(400).json({ message: 'Formation ID, level, and students are required' });
    }

    try {
        // Créer une nouvelle classe
        const newClass = new Class({
            formationId,
            level,
            students
        });

        const savedClass = await newClass.save();

        // Mettre à jour chaque étudiant pour lier l'ID de la classe créée
        await Promise.all(students.map(async (student) => {
            await Student.findByIdAndUpdate(student.studentId, {
                $set: { 'enrollmentInfo.classId': savedClass._id }
            });
        }));

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
    const { formationId, level, students } = req.body;

    if (!formationId || !level  || !students) {
        return res.status(400).json({ message: 'Formation ID, level, room, and students are required' });
    }

    try {
        const updatedClass = await Class.findByIdAndUpdate(
            id,
            {
                formationId,
                level,
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
    const { formationId, level} = req.body;

    if (!formationId || !level ) {
        return res.status(400).json({ message: 'Formation ID, level, and room are required' });
    }

    try {
        const updatedClass = await Class.findByIdAndUpdate(
            id,
            { formationId, level },
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
        // Récupérer la classe actuelle pour obtenir les anciens étudiants
        const currentClass = await Class.findById(id);
        if (!currentClass) {
            return res.status(404).json({ message: 'Class not found' });
        }

        const currentStudentIds = currentClass.students.map(student => student.studentId.toString());
        const updatedStudentIds = students.map(studentId => studentId.toString());

        // Ajouter le classId aux nouveaux étudiants
        const newStudents = updatedStudentIds.filter(studentId => !currentStudentIds.includes(studentId));
        await Promise.all(newStudents.map(async studentId => {
            await Student.findByIdAndUpdate(studentId, {
                $set: { 'enrollmentInfo.classId': id }
            });
        }));

        // Supprimer le classId des anciens étudiants qui ne sont plus dans la classe
        const removedStudents = currentStudentIds.filter(studentId => !updatedStudentIds.includes(studentId));
        await Promise.all(removedStudents.map(async studentId => {
            await Student.findByIdAndUpdate(studentId, {
                $unset: { 'enrollmentInfo.classId': "" }
            });
        }));

        // Mettre à jour la classe avec la nouvelle liste d'étudiants
        const updatedClass = await Class.findByIdAndUpdate(
            id,
            { students: students.map(studentId => ({ studentId })) },
            { new: true, runValidators: true }
        );

        res.status(200).json(updatedClass);
    } catch (err) {
        res.status(500).json({ message: 'Error updating class students', error: err.message });
    }
};

const deleteClass = async (req, res) => {
    const { id } = req.params;

    try {
        // Trouver la classe à supprimer
        const deletedClass = await Class.findByIdAndDelete(id);

        if (!deletedClass) {
            return res.status(404).json({ message: 'Class not found' });
        }

        // Mettre à jour les étudiants pour supprimer le classId
        await Student.updateMany(
            { 'enrollmentInfo.classId': id },
            { $unset: { 'enrollmentInfo.classId': "" } }
        );

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