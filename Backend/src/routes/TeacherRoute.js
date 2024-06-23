const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { auth, checkPermissions } = require("../middlewares/authentication");
const logApiUsage = require("../middlewares/logApiUsage");

module.exports = router;
