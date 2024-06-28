const express = require("express");
const router = express.Router();
const {auth}=require('../middlewares/authentication');
const logApiUsage = require("../middlewares/logApiUsage");
const validateTeacher = require("../middlewares/ValidationTeacherMiddleware");
const teacherController = require("../controllers/TeacherController");


router.post(
  "/CreateTeachers",
  logApiUsage,
  validateTeacher.validateAvailability,
  auth,
  teacherController.createTeacher
);
router.put(
  "/EditTeachers/:id",
  logApiUsage,
  auth,
  teacherController.editTeacher
);
router.get(
  "/ViewTeachers/:id",
  logApiUsage,
  auth,
  teacherController.viewTeacherById
);
router.get(
  "/ViewAllTeachers",
  logApiUsage,
  auth,
  teacherController.viewAllTeachers
);
router.delete(
  "/DeleteTeacher/:id",
  logApiUsage,
  auth,
  teacherController.deleteTeacherById
);
router.post(
  "/Teachers/:id/Availability",
  logApiUsage,
  validateTeacher.validateAvailability,
  auth,
  teacherController.recordTeacherAvailability
);
router.put(
  "/Teachers/:id/Compensation",
  logApiUsage,
  auth,
  teacherController.defineTeacherCompensation
);
router.get(
  "/Teachers/:id/Remuneration",
  logApiUsage,
  validateTeacher.validateAvailability,
  auth,
  teacherController.calculateTeacherRemuneration
);
router.post(
  "/Teachers/:id/Payments",
  logApiUsage,
  validateTeacher.validateAvailability,
  auth,
  teacherController.trackTeacherPayments
);
router.get(
  "/Teachers/:id/Workload",
  logApiUsage,
  validateTeacher.validateAvailability,
  auth,
  teacherController.printTeacherWorkload
);
router.get(
  "/Teachers/Payroll",
  logApiUsage,
  validateTeacher.validateAvailability,
  auth,
  teacherController.generateTeacherPayrollReports
);
router.post(
  "/Teachers/:id/Archive",
  logApiUsage,
  validateTeacher.validateAvailability,
  auth,
  teacherController.archiveTeacherRecords
);
module.exports = router;
