const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const subAdminController = require("../controllers/subAdminController");
const {
  auth,
  checkPermissions,
  checkToken,
} = require("../middlewares/authentication");
const logApiUsage = require("../middlewares/logApiUsage");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/logout", userController.LogOut);
router.get("/refresh-token", userController.refreshToken);
router.get(
  "/student",
  checkToken,
  auth,
  logApiUsage,
  checkPermissions("manage:students"),
  userController.student
);
router.get(
  "/get_All_Users",
  checkToken,
  logApiUsage,
  userController.get_All_Users
);
router.put(
  "/Update_Status/:userId",
  checkToken,
  logApiUsage,
  userController.Update_Status
);

router.get(
  "/Profil/:username",
  checkToken,
  logApiUsage,
  subAdminController.getUserProfile
);
router.put(
  "/updateProfil/:username",
  checkToken,
  logApiUsage,
  subAdminController.updateUserProfile
);
module.exports = router;
