// routes/surveys.js
const express = require('express');
const router = express.Router();
const ClientSurvey = require('../models/clientsurvey');

// Route pour sauvegarder une enquête client
router.post('/surveys', async (req, res) => {
    const {
        sexe,
        nationalite,
        destination,
        agence,
        acceuil_agence,
        raison_agence,
        satisfaction_agent,
        temps_attente,
        tarification,
        note_programme_fidelite,
        note_salon_business,
        note_bagage,
        note_serviceUM,
        note_animal_cabine,
        note_animal_soute,
        recommandation
    } = req.body;

    try {
        const newSurvey = new ClientSurvey({
            sexe,
            nationalite,
            destination,
            agence,
            acceuil_agence,
            raison_agence,
            satisfaction_agent,
            temps_attente,
            tarification,
            note_programme_fidelite,
            note_salon_business,
            note_bagage,
            note_serviceUM,
            note_animal_cabine,
            note_animal_soute,
            recommandation
        });
        await newSurvey.save();
        res.status(201).json({ message: 'Enquête sauvegardée avec succès', survey: newSurvey });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la sauvegarde de l\'enquête', error });
    }
});

module.exports = router;