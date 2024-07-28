const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/authentication");
const logApiUsage = require("../middlewares/logApiUsage");
const {checkToken }= require("../middlewares/authentication");
const validateTeacher = require("../middlewares/ValidationTeacherMiddleware");
const teacherController = require("../controllers/TeacherController");

router.post(
  "/CreateTeachers",
  logApiUsage,
  // validateTeacher.validateAvailability,
  checkToken,
  teacherController.createTeacher
);
router.put(
  "/EditTeachers/:id",
  logApiUsage,
  auth,
  checkToken,
  teacherController.editTeacher
);
router.get(
  "/ViewTeachers/:id",
  logApiUsage,
  auth,
  checkToken,
  teacherController.viewTeacherById
);
router.get(
  "/ViewAllTeachers",
  logApiUsage,
  auth,
  checkToken,
  teacherController.viewAllTeachers
);
router.delete(
  "/DeleteTeacher/:id",
  logApiUsage,
  auth,
  checkToken,
  teacherController.deleteTeacherById
);
router.post(
  "/Teachers/:id/Availability",
  logApiUsage,
  validateTeacher.validateAvailability,
  auth,
  checkToken,
  teacherController.recordTeacherAvailability
);
router.put(
  "/Teachers/:id/Compensation",
  logApiUsage,
  auth,
  checkToken,
  teacherController.defineTeacherCompensation
);
router.get(
  "/Teachers/:id/Remuneration",
  logApiUsage,
  auth,
  checkToken,
  teacherController.calculateTeacherRemuneration
);
router.post(
  "/Teachers/:id/Payments",
  logApiUsage,
  auth,
  checkToken,
  teacherController.trackTeacherPayments
);
router.get(
  "/Teachers/:id/Workload",
  logApiUsage,
  auth,
  checkToken,
  teacherController.printTeacherWorkload
);
router.get(
  "/Teachers/Payroll",
  logApiUsage,
  auth,
  checkToken,
  teacherController.generateTeacherPayrollReports
);
router.post(
  "/Teachers/:id/Archive",
  logApiUsage,
  validateTeacher.validateAvailability,
  auth,
  checkToken,
  teacherController.archiveTeacherRecords
);
router.get(
  "/Teachers/Archived",
  logApiUsage,
  auth,
  checkToken,
  teacherController.archivedTeachers
);
module.exports = router;
