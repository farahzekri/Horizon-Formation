const express = require('express');
const router = express.Router();
const classController = require('../controllers/classesController');



router.post('/creation', classController.createClass);
router.get('/AllClasses', classController.getAllClasses);
router.put('/Updateclasses', classController.updateClass);
router.delete('/delete/:id', classController.deleteClass);
module.exports = router;