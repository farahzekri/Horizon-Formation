const express = require('express');
const router = express.Router();
const scheduleController = require('../controllers/scheduleController');

router.post('/create', scheduleController.createOrUpdateSchedule);
router.get('/get', scheduleController.getAllSchedules);
router.get('/:classId', scheduleController.getScheduleByClassId);
router.put('/:classId', scheduleController.updateSchedule);
router.delete('/:classId', scheduleController.deleteSchedule);

module.exports = router;