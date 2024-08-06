const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController');



router.post('/add', invoiceController.addInvoice);
router.get('/getInvoiceById/:studentId', invoiceController.getInvoiceByStudentId);
router.put('/updateInvoice/:studentId', invoiceController.updateInvoice);



module.exports = router;