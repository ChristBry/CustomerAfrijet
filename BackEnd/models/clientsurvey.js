// models/clientSurvey.js
const mongoose = require('mongoose');

const clientSurveySchema = new mongoose.Schema({

    date: {
        type: Date,
        default: Date.now,
    },
    sexe: {
        type: String,
        required: true,
    },
    nationalite: {
        type: String,
        required: true,
    },
    destination: {
        type: String,
        required: true,
    },
    agence: {
        type: String,
        required: true,
    },
    acceuil_agence: {
        type: String,
        required: true,
    },
    raison_agence: {
        type: String,
        required: true,
    },
    satisfaction_agent: {
        type: String,
        required: true,
    },
    temps_attente: {
        type: String,
        required: true,
    },
    tarification: {
        type: String,
        required: true,
    },
    note_programme_fidelite: {
        type: String,
        required: true,
    },
    note_salon_business: {
        type: String,
        required: true,
    },
    note_bagage: {
        type: String,
        required: true,
    },
    note_serviceUM: {
        type: String,
        required: true,
    },
    note_animal_cabine: {
        type: String,
        required: true,
    },
    note_animal_soute: {
        type: String,
        required: true,
    },
    recommandation: {
        type: String,
        required: true,
    }
});

const ClientSurvey = mongoose.model('CustomerSurvey', clientSurveySchema);

module.exports = ClientSurvey;