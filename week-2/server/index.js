require('dotenv').config();
console.log("DATABASE_URL:", process.env.DATABASE_URL); // Verificar la URL

const express = require('express');
const app = express();
const mongoose = require('mongoose');

// Importar rutas
const routesTeachers = require('./routes/teachers');
const routesCourses = require('./routes/course');

// Conexión a la base de datos
const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString)
  .then(() => console.log('Database Connected'))
  .catch((error) => console.log('Error in database connection:', error));

// Parser para solicitudes
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// Verificar y permitir CORS
const cors = require("cors");
app.use(cors({
  origin: '*', 
  methods: '*',
}));

// Usar las rutas
app.use('/teachers', routesTeachers);
app.use('/course', routesCourses);

// Iniciar servidor
app.listen(3001, () => {
  console.log('Example app listening on port 3001!');
});
