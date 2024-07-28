const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");
const {
  auth,
  checkPermissionscheckToken,
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

module.exports = router;
