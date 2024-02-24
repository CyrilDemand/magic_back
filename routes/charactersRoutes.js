const express = require('express');
const router = express.Router();
const { addPersonnage, getPersonnages, getPersonnageByPrenom, deletePersonnage } = require('../controllers/charactersController');

router.post('/', addPersonnage);
router.get('/', getPersonnages);
router.get('/:prenom', getPersonnageByPrenom);
router.delete('/:id', deletePersonnage);

module.exports = router;
