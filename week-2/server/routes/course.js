const express = require('express');
const route = express.Router();
const courseController = require('../controllers/courseController.js'); // Usar require() en lugar de import

// Definir las rutas
route.post('/', courseController.coursePost);
route.get('/:id', courseController.courseGet);
//route.put('/:id', teacherController.teacherPut);
//route.delete('/:id', teacherController.teacherDelete);

module.exports = route;