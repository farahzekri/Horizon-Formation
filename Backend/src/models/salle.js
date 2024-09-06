const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const salleSchema = new Schema({
    
    nameSalle :{ type: String, required: true },
 
});

const Salle = mongoose.model('Salle', salleSchema);

module.exports = Salle;