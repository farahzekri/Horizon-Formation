const express = require('express');
const router = express.Router();
const formationController = require('../controllers/formationController');

// Add a new formation
router.post('/addFormation', formationController.addFormation);

// Get all formations
router.get('/getAllFormations', formationController.getAllFormations);

// Update a formation by id
router.put('/updateFormation/:id', formationController.updateFormationById);

// Get a formation by id
router.get('/getFormation/:id', formationController.getFormationById);

// Delete a formation by id
router.delete('/deleteFormation/:id', formationController.deleteFormationById);

module.exports = router;
