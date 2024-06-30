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
        const students = await Student.find();

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
module.exports = {
    addStudent,
    getAllStudents,
    deleteStudentById
};
