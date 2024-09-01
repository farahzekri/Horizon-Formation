const express = require('express');
const router = express.Router();
const payementController = require('../controllers/paymentController');
const { checkToken } = require("../middlewares/authentication");
const logApiUsage = require("../middlewares/logApiUsage");

router.post("/add", checkToken, logApiUsage, payementController.addPayment);
router.put(
  "/UpdateReceipt/:paymentId",
  checkToken,
  logApiUsage,
  payementController.updateReceipt
);
router.get(
  "/getPaymentsByStudentId/:studentId",
  checkToken,
  logApiUsage,
  payementController.getPaymentsByStudentId
);
router.get(
  "/receiptPDF/:paymentId",
  checkToken,
  logApiUsage,
  payementController.exportReceiptAsPDF
);


module.exports = router;