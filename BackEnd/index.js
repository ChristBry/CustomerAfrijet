// server/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

//Importer le modele ClientSurvey 
const ClientSurvey = require('../BackEnd/models/clientsurvey');

app.post('/survey', async (req, res) => {
    console.log('Données reçues:', req.body); // Pour vérifier les données reçues
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

    // Vérification des champs requis
    if (!sexe || !nationalite || !destination || !agence || !acceuil_agence || !raison_agence ||
        !satisfaction_agent || !temps_attente || !tarification || !note_programme_fidelite ||
        !note_salon_business || !note_bagage || !note_serviceUM || !note_animal_cabine ||
        !note_animal_soute || !recommandation) {
        return res.status(400).json({ message: 'Tous les champs sont requis.' });
    }

    // Vérifiez l'état de la connexion
    console.log('État de la connexion MongoDB :', mongoose.connection.readyState); // 1 = connecté, 0 = déconnecté
    if (mongoose.connection.readyState !== 1) {
        console.error('La connexion à MongoDB n’est pas active.');
        return;
    }

    try {
        const newSurvey = new ClientSurvey(req.body);
        await newSurvey.save();
        res.status(201).json({ message: 'Enquête sauvegardée avec succès', survey: newSurvey });
    } catch (error) {
        console.error('Erreur lors de la sauvegarde:', error);
        res.status(500).json({ message: 'Erreur lors de la sauvegarde de l\'enquête', error });
    }
});


// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URL, {
    
    serverSelectionTimeoutMS: 10000, // Augmentez le délai d'attente si nécessaire
    socketTimeoutMS: 45000, // Délai pour la socket
}, 6000000)
    .then(() => console.log('MongoDB connecté'))
    .catch(err => console.error(err));

mongoose.connection.once('open', () => {
    console.log('Connexion établie avec MongoDB.');

    // Appel de la fonction pour tester le ping
    testPing();
});

// Fonction async pour tester le ping
async function testPing() {
    try {
        const result = await mongoose.connection.db.command({ ping: 1 });
        console.log('Réponse du ping MongoDB :', result);
    } catch (error) {
        console.error('Erreur lors du ping à MongoDB :', error);
    }
}

mongoose.set('bufferCommands', false);

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution`);
});