const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const {auth, checkPermissions} = require("../middlewares/authentication");

router.post('/add', auth, checkPermissions('manage:student','add:student'), studentController.addStudent);
router.get('/all',auth, checkPermissions('manage:student','add:student'), studentController.getAllStudents);
router.delete('/deleteStudent/:id', studentController.deleteStudentById)

module.exports = router;
