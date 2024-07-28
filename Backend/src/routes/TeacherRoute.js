const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');

// Create a new teacher
router.post('/add', teacherController.createTeacher);

// Get all teachers
router.get('/getAll', teacherController.getAllTeachers);

// Get a teacher by ID
router.get('/getById/:id', teacherController.getTeacherById);

// Update a teacher
router.put('/update/:id', teacherController.updateTeacher);

// Delete a teacher
router.delete('/delete/:id', teacherController.deleteTeacher);

module.exports = router;
