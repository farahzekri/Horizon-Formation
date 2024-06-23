const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const {auth, checkPermissions} = require("../middlewares/authentication");

router.post('/add', auth, checkPermissions('manage:student','add:student'), studentController.addStudent);
router.get('/all', studentController.getAllStudents);

module.exports = router;
