const express = require("express");
const router = express.Router();
const salleController = require("../controllers/salleController");
const { checkToken } = require("../middlewares/authentication");
const logApiUsage = require("../middlewares/logApiUsage");

router.post("/addSalle", checkToken, logApiUsage, salleController.addSalle);

router.get(
    "/getAllSalle",
    
    salleController.getAllSalle
  );
router.delete("/deletesalles/:id",salleController.deleteSalleById)  
  module.exports = router;
