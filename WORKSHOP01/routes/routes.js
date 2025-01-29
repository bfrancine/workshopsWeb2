const express = require('express');
const router = express.Router();

// Importa el modelo
const Model = require('../models/model');

// Método POST - Guarda datos en la base de datos
router.post('/post', async (req, res) => {
    const data = new Model({
        name: req.body.name,
        age: req.body.age
    });

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave); // Responde con los datos guardados
    } catch (error) {
        res.status(400).json({ message: error.message }); // Maneja errores
    }
});

// Método GET - Obtiene todos los datos
router.get('/getAll', async (req, res) => {
    try {
        const allData = await Model.find(); // Obtiene todos los documentos
        res.status(200).json(allData);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Método GET - Obtiene un dato por ID
router.get('/getOne/:id', async (req, res) => {
    try {
        const data = await Model.findById(req.params.id); // Busca por ID
        if (!data) {
            return res.status(404).json({ message: 'Data not found' });
        }
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Método PATCH - Actualiza un dato por ID
router.patch('/update/:id', async (req, res) => {
    try {
        const updatedData = await Model.findByIdAndUpdate(
            req.params.id, 
            { name: req.body.name, age: req.body.age },
            { new: true } // Retorna el documento actualizado
        );
        if (!updatedData) {
            return res.status(404).json({ message: 'Data not found' });
        }
        res.status(200).json(updatedData);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Método DELETE - Elimina un dato por ID
router.delete('/delete/:id', async (req, res) => {
    try {
        const deletedData = await Model.findByIdAndDelete(req.params.id); // Elimina por ID
        if (!deletedData) {
            return res.status(404).json({ message: 'Data not found' });
        }
        res.status(200).json({ message: 'Data deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//Obtener toda la data
router.get('/getAll', async (req, res) => {
    try{
        const data = await Model.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Obtener por el ID
//Get by ID Method
router.get('/getOne/:id', async (req, res) => {
    try{
        const data = await Model.findById(req.params.id);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Actualizar y eliminar los datos de la base con el ID

//Update by ID Method
router.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Model.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Delete by ID Method
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = router;

