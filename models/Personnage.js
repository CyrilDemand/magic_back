// models/Personnage.js

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const personnageSchema = new Schema({
    // ... vos champs de schéma ...
});

module.exports = mongoose.model('Personnage', personnageSchema);
