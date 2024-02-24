const express = require('express');
const router = express.Router();
const { addSkill, getSkills, deleteSkillById } = require('../controllers/skillsController');

router.post('/', addSkill);
router.get('/', getSkills);
router.delete('/:id', deleteSkillById);

module.exports = router;
