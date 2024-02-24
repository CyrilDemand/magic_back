const express = require('express');
const router = express.Router();
const { addPersonnage, getPersonnages, getPersonnageByPrenom } = require('../controllers/charactersController');

router.post('/', addPersonnage);
router.get('/', getPersonnages);
router.get('/:prenom', getPersonnageByPrenom);

module.exports = router;
