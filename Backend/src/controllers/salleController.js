const Salle = require('../models/salle');

const addSalle = async (req, res) => {
    try {
        const salle = new Salle(req.body);
        await salle.save();
        res.status(201).send(salle);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Get all courses
const getAllSalle = async (req, res) => {
    try {
        const salles = await Salle.find({});
        res.status(200).send(salles);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update a course by name
const updateSalleeById = async (req, res) => {
    const id = req.params.id;
    const updates = req.body;

    try {
        const salle = await Salle.findByIdAndUpdate(id, updates, { new: true, runValidators: true });

        if (!salle) {
            return res.status(404).send();
        }

        res.status(200).send(salle);
    } catch (error) {
        res.status(400).send(error);
    }
};

const deleteSalleById = async (req, res) => {
    const id = req.params.id;

    try {
        const salle = await Salle.findByIdAndDelete(id);

        if (!salle) {
            return res.status(404).send();
        }

        res.status(200).send(salle);
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = {
    addSalle,
    getAllSalle,
    updateSalleeById,
    deleteSalleById
};