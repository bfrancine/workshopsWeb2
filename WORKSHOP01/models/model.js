const mongoose = require('mongoose');

// Definición del esquema de datos
const dataSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    age: {
        required: true,
        type: Number
    }
});

// Exporta el modelo
module.exports = mongoose.model('Data', dataSchema);
