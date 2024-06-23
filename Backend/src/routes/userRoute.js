const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {auth, checkPermissions} = require("../middlewares/authentication");
const logApiUsage = require("../middlewares/logApiUsage");

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/student', auth, checkPermissions('manage:students'), userController.student);
router.get('/getall/:id',logApiUsage, userController.getUsers);
module.exports = router;
