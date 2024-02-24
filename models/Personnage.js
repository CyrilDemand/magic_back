const mongoose = require('mongoose');

const personnageSchema = new mongoose.Schema({
    prenom: { type: String, required: true},
    nom: { type: String, required: true},
    autresPrenoms: [String],
    autresNoms: [String],
    alias: String,
    anniversaire: {
        type: Date,
        required: true
    },
    age: {
        type: Number,
        default: function() {
            // Calculer l'âge à partir de l'anniversaire
            const today = new Date();
            const birthDate = new Date(this.anniversaire);
            let age = today.getFullYear() - birthDate.getFullYear();
            const m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            return age;
        }
    },
    sexe: {
        type: String,
        required: true
    },
    race: String,
    origine: String,
    niveau: Number,
    tailleCategorie: {
        type: String,
        enum: ['S', 'M', 'L', 'XL', 'XXL']
    },
    tailleCm: Number,
    attributs: {
        vie: Number,
        stamina: Number,
        force: Number,
        intelligence: Number,
        sagesse: Number,
        dexterite: Number,
        agilite: Number,
        perception: Number,
        charisme: Number,
        chance: Number
    },
    quantiteMana: Number,
    element1: String,
    element2: String,
    element3: String,
    element4: String,
    type: String,
    frequenceOmana: Number,
    rang: String,
    titres: [String],
    competences: {
        actives: [String],
        passives: [String]
    },
    benedictions: [String],
    maledictions: [String],
    familia: String,
    guildes: {
        principale: String,
        secondaire: String
    },
    situationFamiliale: String
});

module.exports = mongoose.model('Personnage', personnageSchema);
