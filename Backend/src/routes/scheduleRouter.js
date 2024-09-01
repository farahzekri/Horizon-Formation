const express = require('express');
const router = express.Router();
const scheduleController = require('../controllers/scheduleController');
const { checkToken } = require("../middlewares/authentication");
const logApiUsage = require("../middlewares/logApiUsage");

router.post(
  "/create",
  checkToken,
  logApiUsage,
  scheduleController.createOrUpdateSchedule
);
router.get("/get", checkToken, logApiUsage, scheduleController.getAllSchedules);
router.get(
  "/:classId",
  checkToken,
  logApiUsage,
  scheduleController.getScheduleByClassId
);
router.put(
  "/:classId",
  checkToken,
  logApiUsage,
  scheduleController.updateSchedule
);
router.delete(
  "/:classId",
  checkToken,
  logApiUsage,
  scheduleController.deleteSchedule
);

module.exports = router;