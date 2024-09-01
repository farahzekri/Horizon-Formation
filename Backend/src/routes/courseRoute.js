const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");
const { checkToken } = require("../middlewares/authentication");
const logApiUsage = require("../middlewares/logApiUsage");
// Add a new course
router.post("/addCourse", checkToken, logApiUsage, courseController.addCourse);

// Get all courses
router.get(
  "/getAllCourses",
  checkToken,
  logApiUsage,
  courseController.getAllCourses
);

// Update a course by name
router.put(
  "/updateCourse/:id",
  checkToken,
  logApiUsage,
  courseController.updateCourseById
);

// Get a course by name
router.get(
  "/getCourse/:id",
  checkToken,
  logApiUsage,
  courseController.getCourseById
);

// Delete a course by name
router.delete(
  "/deleteCourse/:id",
  checkToken,
  logApiUsage,
  courseController.deleteCourseById
);

module.exports = router;
