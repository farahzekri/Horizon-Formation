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

router.post(
    '/salaries/create',
    teacherController.createSalariesForYear);

router.post(
    '/salaries/add',
    teacherController.addTeacherSalary);

router.put(
    '/salaries/update',
    teacherController.updateSalaries);

router.delete(
    '/salaries/delete/:teacherId/:salaryId',
    teacherController.deleteSalary);

router.get(
    '/salariesByYear/:teacherId',
    teacherController.getSalariesByYear);
module.exports = router;
