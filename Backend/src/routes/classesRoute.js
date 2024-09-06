const express = require("express");
const router = express.Router();
const classController = require("../controllers/classesController");
const { checkToken } = require("../middlewares/authentication");
const logApiUsage = require("../middlewares/logApiUsage");

router.post("/creation", checkToken,logApiUsage ,classController.createClass);
router.get(
  "/AllClasses",
  checkToken,
  logApiUsage,
  classController.getAllClasses
);
router.put(
  "/Updateclasses",
  checkToken,
  logApiUsage,
  classController.updateClass
);
router.delete(
  "/delete/:id",
  checkToken,
  logApiUsage,
  classController.deleteClass
);
router.put(
  "/updateclassdetails/:id",
  checkToken,
  logApiUsage,
  classController.updateClassDetails
);
router.put(
  "/updateClassStudents/:id",
  checkToken,
  logApiUsage,
  classController.updateClassStudents
);
router.get(
  "/classe/:id",
  checkToken,
  logApiUsage,
  classController.getclassesById
);
module.exports = router;
