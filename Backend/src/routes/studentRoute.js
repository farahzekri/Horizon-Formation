const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");
const {
  auth,
  checkToken,
} = require("../middlewares/authentication");
const logApiUsage = require("../middlewares/logApiUsage");

router.post("/add", checkToken, logApiUsage, studentController.addStudent);
router.get("/all", checkToken, logApiUsage, studentController.getAllStudents);
router.delete(
  "/deleteStudent/:id",
  checkToken,
  logApiUsage,
  studentController.deleteStudentById
);

router.post("/add", checkToken, logApiUsage, studentController.addStudent);
router.get("/all", checkToken, logApiUsage, studentController.getAllStudents);
router.get(
  "/allInfo/:id",
  checkToken,
  logApiUsage,
  studentController.getStudentById
);
router.delete(
  "/deleteStudent/:id",
  checkToken,
  logApiUsage,
  studentController.deleteStudentById
);
router.get(
  "/getById/:id",
  checkToken,
  logApiUsage,
  studentController.getStudentById
);
router.put(
  "/editStudent/:id",
  checkToken,
  logApiUsage,
  studentController.editStudent
);
router.get(
  "/getFormationByStudentId/:id",
  checkToken,
  logApiUsage,
  studentController.getFormationByStudentId
);

module.exports = router;
