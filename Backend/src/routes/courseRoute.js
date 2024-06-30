const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

// Add a new course
router.post('/addCourse', courseController.addCourse);

// Get all courses
router.get('/getAllCourses', courseController.getAllCourses);

// Update a course by name
router.put('/updateCourse/:id', courseController.updateCourseById);

// Get a course by name
router.get('/getCourse/:id', courseController.getCourseById);

// Delete a course by name
router.delete('/deleteCourse/:id', courseController.deleteCourseById);

module.exports = router;
