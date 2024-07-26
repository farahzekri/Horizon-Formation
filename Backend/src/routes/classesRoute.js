const express = require('express');
const router = express.Router();
const classController = require('../controllers/classesController');



router.post('/creation', classController.createClass);
router.get('/AllClasses', classController.getAllClasses);
router.put('/Updateclasses/:id', classController.updateClass);
router.delete('/delete/:id', classController.deleteClass);
router.get('/classe/:id',classController.getclassesById);
module.exports = router;

