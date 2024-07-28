const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const {auth, checkPermissions} = require("../middlewares/authentication");
const logApiUsage = require("../middlewares/logApiUsage");


router.post('/add', studentController.addStudent);
router.get('/all', studentController.getAllStudents);
router.get('/allInfo/:id', studentController.getStudentById);
router.delete('/deleteStudent/:id', studentController.deleteStudentById);
router.get('/getById/:id', studentController.getStudentById);
router.put('/editStudent/:id', studentController.editStudent);
router.get('/getFormationByStudentId/:id', studentController.getFormationByStudentId);


module.exports = router;
