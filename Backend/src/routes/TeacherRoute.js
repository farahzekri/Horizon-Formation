const express = require('express');
const router = express.Router();
const { auth } = require("../middlewares/authentication");
const logApiUsage = require("../middlewares/logApiUsage");
const { checkToken } = require("../middlewares/authentication");

const teacherController = require('../controllers/TeacherController');

// Create a new teacher
router.post("/add", checkToken ,logApiUsage, teacherController.createTeacher);

// Get all teachers
router.get(
  "/getAll",
  checkToken,
  logApiUsage,
  teacherController.getAllTeachers
);

// Get a teacher by ID
router.get(
  "/getById/:id",
  checkToken,
  logApiUsage,
  teacherController.getTeacherById
);

// Update a teacher
router.put(
  "/update/:id",
  checkToken,
  logApiUsage,
  teacherController.updateTeacher
);

// Delete a teacher
router.delete(
  "/delete/:id",
  checkToken,
  logApiUsage,
  teacherController.deleteTeacher
);

module.exports = router;
