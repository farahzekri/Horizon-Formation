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

router.post("/register", checkToken, logApiUsage, userController.register);
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
router.put(
  "/updatePassword/:username",
  checkToken,
  logApiUsage,
  subAdminController.UpdatePassword
);
router.get("/checkRole", checkToken, logApiUsage, subAdminController.CheckRole);
module.exports = router;
