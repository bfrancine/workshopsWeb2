const express = require('express');
const route = express.Router();
const teacherController = require('../controllers/teacherController.js'); // Usar require() en lugar de import

// Definir las rutas
route.post('/', teacherController.teacherCreate);
route.get('/:id', teacherController.teacherGet);
route.put('/:id', teacherController.teacherPut);
route.delete('/:id', teacherController.teacherDelete);

module.exports = route;
