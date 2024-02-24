const Personnage = require('../models/Personnage');

exports.addPersonnage = async (req, res) => {
    const existingPersonnage = await Personnage.findOne({ prenom: req.body.prenom, nom: req.body.nom });

    if (existingPersonnage) {
        // Un personnage avec ces valeurs existe déjà
        if (existingPersonnage._id.toString() === req.body._id) {
            // Si l'ID du document existant correspond à l'ID envoyé dans le corps de la requête,
            // cela signifie que vous modifiez le même document.
            try {
                // Utilisez findOneAndUpdate pour mettre à jour le document existant.
                const updatedPersonnage = await Personnage.findOneAndUpdate(
                    { _id: existingPersonnage._id },
                    req.body, // Les nouvelles valeurs à mettre à jour
                    { new: true } // Cette option renvoie le document mis à jour plutôt que l'ancien.
                );
                res.status(200).send("Personnage mis à jour avec succès.");
            } catch (error) {
                res.status(500).send('Une erreur est survenue lors de la mise à jour du personnage.');
            }
        } else {
            res.status(409).send('Un personnage avec ces valeurs existe déjà.');
        }
    } else {
        // Aucun document existant avec ces valeurs, vous pouvez insérer le nouveau document.
        const nouveauPersonnage = new Personnage(req.body);
        await nouveauPersonnage.save();
        res.status(201).send("Personnage créé avec succès.");
    }
};

exports.getPersonnages = async (req, res) => {
    try {
        const personnages = await Personnage.find({});
        res.status(200).json(personnages);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

exports.getPersonnageByPrenom = async (req, res) => {
    try {
        const prenom = req.params.prenom;
        const personnage = await Personnage.findOne({ prenom: prenom });

        if (!personnage) {
            return res.status(404).send('Personnage non trouvé');
        }

        res.send(personnage);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
};
