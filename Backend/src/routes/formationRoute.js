const express = require('express');
const router = express.Router();
const formationController = require('../controllers/formationController');
const {
  checkToken,
} = require("../middlewares/authentication");
const logApiUsage = require("../middlewares/logApiUsage");
// Add a new formation
router.post(
  "/addFormation",
  checkToken,
  logApiUsage,
  formationController.addFormation
);

// Get all formations
router.get(
  "/getAllFormations",
  checkToken,
  logApiUsage,
  formationController.getAllFormations
);

// Update a formation by id
router.put(
  "/updateFormation/:id",
  checkToken,
  logApiUsage,
  formationController.updateFormationById
);

// Get a formation by id
router.get(
  "/getFormation/:id",
  checkToken,
  logApiUsage,
  formationController.getFormationById
);

// Delete a formation by id
router.delete(
  "/deleteFormation/:id",
  checkToken,
  logApiUsage,
  formationController.deleteFormationById
);

module.exports = router;
