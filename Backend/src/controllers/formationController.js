const Formation = require('../models/formation');

// Add a new formation
const addFormation = async (req, res) => {
    try {
        const formation = new Formation(req.body);
        await formation.save();
        res.status(201).send(formation);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Get all formations
const getAllFormations = async (req, res) => {
    try {
        const formations = await Formation.find({});
        res.status(200).send(formations);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update a formation by id
const updateFormationById = async (req, res) => {
    const id = req.params.id;
    const updates = req.body;

    try {
        const formation = await Formation.findByIdAndUpdate(id, updates, { new: true, runValidators: true });

        if (!formation) {
            return res.status(404).send();
        }

        res.status(200).send(formation);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Get a formation by id
const getFormationById = async (req, res) => {
    const id = req.params.id;

    try {
        const formation = await Formation.findById(id);

        if (!formation) {
            return res.status(404).send();
        }

        res.status(200).send(formation);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Delete a formation by id
const deleteFormationById = async (req, res) => {
    const id = req.params.id;

    try {
        const formation = await Formation.findByIdAndDelete(id);

        if (!formation) {
            return res.status(404).send();
        }

        res.status(200).send(formation);
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = {
    addFormation,
    getAllFormations,
    updateFormationById,
    getFormationById,
    deleteFormationById
};
