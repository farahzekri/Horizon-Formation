const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController');
const { checkToken } = require("../middlewares/authentication");
const logApiUsage = require("../middlewares/logApiUsage");


router.post('/add',checkToken,logApiUsage, invoiceController.addInvoice);
router.get(
  "/getInvoiceById/:studentId",
  checkToken,
  logApiUsage,
  invoiceController.getInvoiceByStudentId
);
router.put(
  "/updateInvoice/:studentId",
  checkToken,
  logApiUsage,
  invoiceController.updateInvoice
);
router.put(
  "/updateInvoiceStatus/:id",
  checkToken,
  logApiUsage,
  invoiceController.updateInvoiceStatus
);


module.exports = router;