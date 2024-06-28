const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const logApiUsage = require("../middlewares/logApiUsage");
const teacherController = require("../controllers/TeacherController");

router.post("/CreateTeachers", logApiUsage, teacherController.createTeacher);
router.put("/EditTeachers/:id", logApiUsage, teacherController.editTeacher);
router.get("/ViewTeachers/:id", logApiUsage, teacherController.viewTeacherById);
router.get("/ViewAllTeachers", logApiUsage, teacherController.viewAllTeachers);
router.delete(
  "/DeleteTeacher/:id",
  logApiUsage,
  teacherController.deleteTeacherById
);
router.post(
  "/Teachers/:id/Availability",
  logApiUsage,
  teacherController.recordTeacherAvailability
);
router.put(
  "/Teachers/:id/Compensation",
  logApiUsage,
  teacherController.defineTeacherCompensation
);
router.get(
  "/Teachers/:id/Remuneration",
  logApiUsage,
  teacherController.calculateTeacherRemuneration
);
router.post(
  "/Teachers/:id/Payments",
  logApiUsage,
  teacherController.trackTeacherPayments
);
router.get(
  "/Teachers/:id/Workload",
  logApiUsage,
  teacherController.printTeacherWorkload
);
router.get(
  "/Teachers/Payroll",
  logApiUsage,
  teacherController.generateTeacherPayrollReports
);
router.post(
  "/Teachers/:id/Archive",
  logApiUsage,
  teacherController.archiveTeacherRecords
);
module.exports = router;
