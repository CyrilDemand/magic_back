const express = require('express');
const router = express.Router();
const { addSkill, getSkills } = require('../controllers/skillsController');

router.post('/', addSkill);
router.get('/', getSkills);

module.exports = router;
