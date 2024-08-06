const express = require('express');
const router = express.Router();
const payementController = require('../controllers/paymentController');


router.post('/add', payementController.addPayment);
router.put('/UpdateReceipt/:paymentId', payementController.updateReceipt );
router.get('/getPaymentsByStudentId/:studentId', payementController.getPaymentsByStudentId);
router.get('/receiptPDF/:paymentId', payementController.exportReceiptAsPDF);


module.exports = router;