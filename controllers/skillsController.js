const Competence = require("../models/Competence");

exports.addSkill = async (req, res) => {
    const existingCompetence = await Competence.findOne({ nomDeCompetence: req.body.nomDeCompetence});

    if (existingCompetence) {
        // Un personnage avec ces valeurs existe déjà
        if (existingCompetence._id.toString() === req.body._id) {
            // Si l'ID du document existant correspond à l'ID envoyé dans le corps de la requête,
            // cela signifie que vous modifiez le même document.
            try {
                // Utilisez findOneAndUpdate pour mettre à jour le document existant.
                const updatedCompetence = await Competence.findOneAndUpdate(
                    { _id: existingCompetence._id },
                    req.body, // Les nouvelles valeurs à mettre à jour
                    { new: true } // Cette option renvoie le document mis à jour plutôt que l'ancien.
                );
                res.status(200).send("Competence mis à jour avec succès.");
            } catch (error) {
                res.status(500).send('Une erreur est survenue lors de la mise à jour de la competence.');
            }
        } else {
            res.status(409).send('Une competence avec ces valeurs existe déjà.');
        }
    } else {
        // Aucun document existant avec ces valeurs, vous pouvez insérer le nouveau document.
        const nouvelleCompetence = new Competence(req.body);
        await nouvelleCompetence.save();
        res.status(201).send("Competence créé avec succès.");
    }
};

exports.getSkills = async (req, res) => {
    try {
        const competences = await Competence.find({});
        res.status(200).json(competences);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

exports.deleteSkillById = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedCompetence = await Competence.findByIdAndDelete(id);
        if (deletedCompetence) {
            res.status(200).send("Competence supprimé avec succès.");
        } else {
            res.status(404).send("Competence non trouvé");
        }
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}