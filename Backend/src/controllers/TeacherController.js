const Salary = require('../models/salary');

// Create a new teacher
const Teacher = require("../models/teacher");
const Availability = require("../models/Availability");

const createTeacher = async (req, res) => {
  console.log('body', req.body);
  try {
    const teacher = new Teacher(req.body);
    await teacher.save();
    res.status(201).json(teacher);
  } catch (error) {
    console.error('Error creating teacher:', error);
    if (error.errors) {
      console.error('Validation errors:', error.errors);
    }
    res.status(400).json({ error: error.message });
  }}

// Get all teachers
const getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a teacher by ID
const getTeacherById = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }
    res.status(200).json(teacher);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a teacher
const updateTeacher = async (req, res) => {
  const updatedData = req.body;

  const formattedData = {
    personalInfo: {
      firstName: updatedData.firstName,
      lastName: updatedData.lastName,
      dateOfBirth: updatedData.dateOfBirth,
      address: updatedData.address,
      phoneNumber: updatedData.phoneNumber,
      email: updatedData.email
    }
  };
  try {
    const teacher = await Teacher.findByIdAndUpdate(req.params.id, formattedData, { new: true, runValidators: true });
    if (!teacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }
    res.status(200).json(teacher);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a teacher
const deleteTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndDelete(req.params.id);
    if (!teacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }
    res.status(200).json({ message: 'Teacher deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createTeacher,
  getAllTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher
};
