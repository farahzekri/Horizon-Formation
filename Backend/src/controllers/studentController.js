const Student = require('../models/Student');
const Course = require("../models/course");

const addStudent = async (req, res) => {
    try {

        const studentData = req.body;

        const newStudent = new Student(studentData);
        console.log(newStudent)
        await newStudent.save();

        res.status(201).json(newStudent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find()
            .populate({
                path: 'enrollmentInfo.formationId',
                select: 'name'
            })
            .populate({
                path: 'enrollmentInfo.classId',
                select: 'level'
            });
        res.status(200).json(students);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteStudentById = async (req, res) => {
    const id = req.params.id;

    try {
        const student = await Student.findByIdAndDelete(id);

        if (!student) {
            return res.status(404).send();
        }

        res.status(200).send(student);
    } catch (error) {
        res.status(500).send(error);
    }
};

const getStudentById = async (req, res) => {
    try {
        const id = req.params.id;
        const student = await Student.findById(id).
        populate({
            path: 'enrollmentInfo.formationId',
            select: 'name'
        }).populate({
                path: 'enrollmentInfo.classId',
                select: 'level'
            });
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json(student);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const editStudent = async (req, res) => {
    const studentId = req.params.id;
    const updatedData = req.body;

    const formattedData = {};

    if (updatedData.firstName || updatedData.lastName || updatedData.dateOfBirth || updatedData.address || updatedData.phoneNumber || updatedData.email) {
        formattedData.personalInfo = {
            ...(updatedData.firstName && { firstName: updatedData.firstName }),
            ...(updatedData.lastName && { lastName: updatedData.lastName }),
            ...(updatedData.dateOfBirth && { dateOfBirth: updatedData.dateOfBirth }),
            ...(updatedData.address && { address: updatedData.address }),
            ...(updatedData.phoneNumber && { phoneNumber: updatedData.phoneNumber }),
            ...(updatedData.email && { email: updatedData.email }),
        };
    }

    if (updatedData.registrationDate || updatedData.formationId || updatedData.classId) {
        formattedData.enrollmentInfo = {
            ...(updatedData.registrationDate && { registrationDate: updatedData.registrationDate }),
            ...(updatedData.formationId && { formationId: updatedData.formationId }),
            ...(updatedData.classId && { classId: updatedData.classId }),
        };
    }

    try {
        const updatedStudent = await Student.findByIdAndUpdate(studentId, formattedData, {
            new: true,
            runValidators: true
        });

        if (!updatedStudent) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.status(200).json(updatedStudent);
    } catch (error) {
        console.error('Error updating student:', error);  // Log error details for debugging
        res.status(400).json({ message: 'Failed to update student', error: error.message });
    }
};


module.exports = {
    addStudent,
    getAllStudents,
    deleteStudentById,
    getStudentById,
    editStudent,
};
