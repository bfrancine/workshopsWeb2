const express = require('express');
const route = express.Router();
const teacherController = require('../controllers/teacherController.js'); // Usar require() en lugar de import
const Teacher = require('../models/teacherModel');  // Asegúrate de tener este modelo de Teacher

// Otras rutas ya existentes para manejar profesores
route.post('/', teacherController.teacherCreate);
route.get('/:id', teacherController.teacherGet);
route.put('/:id', teacherController.teacherPut);
route.delete('/:id', teacherController.teacherDelete);
route.get('/', teacherController.teacherGet);

module.exports = route;

