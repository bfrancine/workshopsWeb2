require('dotenv').config(); // Cargar variables de entorno

const express = require('express');
const app = express();
const mongoose = require('mongoose');

// Importar rutas usando 'require' (CommonJS)
const routesTeachers = require('./routes/teachers'); // Corregir la importación de las rutas
console.log("DATABASE_URL:", process.env.DATABASE_URL);

// Conexión a la base de datos
const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString, { useNewUrlParser: true, useUnifiedTopology: true }); // Agregar opciones para evitar advertencias
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error); // Imprimir error de conexión
});

database.once('connected', () => {
    console.log('Database Connected'); // Confirmación de conexión exitosa
});

// Parser para el cuerpo de las solicitudes (necesario para métodos POST y PUT)
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// Verificar y permitir CORS (Cross-Origin Resource Sharing)
const cors = require("cors");
app.use(cors({
  origin: '*', // Permitir cualquier dominio
  methods: '*', // Permitir cualquier método HTTP
}));

// Usar las rutas correctamente para las solicitudes
app.use('/teachers', routesTeachers);

// Iniciar el servidor en el puerto 3001
app.listen(3001, () => {
  console.log('Example app listening on port 3001!'); // Confirmación de que el servidor está corriendo
});
