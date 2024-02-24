const mongoose = require('mongoose');

const competenceSchema = new mongoose.Schema({
    nomDeCompetence: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tier: {
        type: Number,
        required: true,
        min: 1,
        max: 15
    },
    familleDeMagie: {
        type: String,
        required: true
    },
    element: {
        type: String,
        required: true
    },
    classe: {
        type: String,
        required: true
    },
    rang: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    coutEnMana: {
        type: Number,
        required: true
    },
    actif: {
        type: Boolean,
        required: true
    }
});

const Competence = mongoose.model('Sort', competenceSchema);

module.exports = Competence;
