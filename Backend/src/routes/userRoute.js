const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {auth, checkPermissions} = require("../middlewares/authentication");


router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/student', auth, checkPermissions('manage:students'), userController.student);
router.get('/get_All_Users', userController.get_All_Users);
module.exports = router;
