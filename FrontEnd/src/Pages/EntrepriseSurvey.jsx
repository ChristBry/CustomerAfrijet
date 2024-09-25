import React, { useEffect, useRef, useState } from 'react'
import '../styles/style.css'
import axios from 'axios'
import countryData from '../composants/country.json';
import { motion } from 'framer-motion'
import { AnimatePresence } from 'framer-motion';
import logoAfrijet from '../assets/images/Logo.png'

const AgencySurvey = () => {

    const sectionRefs = {
        experience: useRef(null),
        services: useRef(null),
        recommendation: useRef(null),
    };

    const sections = [
        { label: 'Expérience de collaboration', ref: sectionRefs.experience },
        { label: 'Satifactions services', ref: sectionRefs.services },
        { label: 'Suggestions', ref: sectionRefs.suggestions },
    ];

    const [isPopVisible, setIsPopVisible] = useState(false); // Declaration de la variable pour la popUp
    const popupRef = useRef(null)

    const date = new Date().toISOString() // Definition de la variable date

    // Définition des variantes d'animation pour l'apparition
    const variants = {
        hidden: { opacity: 0, x: -100 }, // L'élément est caché en haut
        visible: {
            opacity: 1,
            x: 0, // L'élément descend à sa position d'origine
            transition: {
                duration: 0.2,
                ease: 'easeOut',
            },
        },
    }

    // Fonction qui permet d'ajouter les pays a partir de mon fichier country.json
    const [countries, setCountries] = useState([])
    useEffect(() => {
        const fetchCountries = () => {
            setCountries(countryData); // Mettez à jour l'état avec les données
        };

        fetchCountries();
    }, []);

    // Initialisation de l'etat de ma variable data grace au hook UseState pour recuperer les donnees entrees par les utilisateurs
    const [data, setData] = useState({
        date: date,
        anciennete: '',
        experience_globale: '',
        localisation: '',
        service: '',
        communication: '',
        note_service_client: '',
        note_ponctualite: '',
        note_confort: '',
        note_reservation: '',
        note_prix: '',
        suggestion: '',
        ajout_service: '',
        recommandation: ''
    })

    /*CheckedItems permet de selectionner et deselectionner une checkbox en fontion de l'etat d'une autre checkbox avec la fonction 
        handleChange associe */
    const [CheckedItems, setCheckedItems] = useState({
        transport_passagers: false,
        transport_fret: false,
        com_oui: false,
        com_non: false,
    })
    const handleChange = (event) => {
        const { name, checked } = event.target;
        setCheckedItems({
            ...CheckedItems,
            [name]: checked
        })
    }

    // Fonction qui permet d'envoyer les donnees stocker dans la variable data pour stocker les informations grace a axios
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://afrijet.pockethost.io/api/collections/EntrepriseSurvey/records', data, {
            headers: {
                'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MjgxNTQ0NzgsImlkIjoiamNxY3hiMjVyZDBpZG5uIiwidHlwZSI6ImFkbWluIn0.xzz72aFsquq--L38hXFh34oDmV-kXL_IkjRM49J28V4', // Token Administrateur PocketBase
                'Content-Type': 'application/json',
                body: JSON.stringify(data),
            }
        })
            .then(response => {
                console.log('Données envoyées avec succès');
                // afficher la popUp après l'envoi des données
                setIsPopVisible(true)
                setData(''); // Réinitialise le champ de données
            })
            .catch(err => console.log(err))
    }

    const closePopUp = () => {
        setIsPopVisible(false);
        setData(''); // Réinitialise le champ de données
    }

    // Ferme la popup si on clique en dehors
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                closePopUp();
            }
        };

        if (isPopVisible) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isPopVisible]);

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={variants}
        >
            <div>
                <div className='header'>
                    <div className='logo'>
                        <img src={logoAfrijet} alt='logo Afrijet' />
                    </div>
                    <div className='customer_survey'>
                        <h1>Enquête Corporate</h1>
                    </div>
                </div>
                <div className='fil_ariane'>
                    <ol className="list-none flex">
                        {sections.map((section, index) => (
                            <li key={index} className="flex items-center">
                                {index > 0 && <span className="text-gray-100"> &gt; </span>}
                                <a
                                    href={`#${section.label.toLowerCase()}`}
                                    className="text-blue-600 hover:text-blue-800 focus:text-brown-600 focus:outline-none focus:ring-2 focus:ring-brown-300"
                                >
                                    <p>{section.label}</p>
                                </a>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <section ref={sectionRefs.experience} id="expérience de collaboration">
                    <div className='space'>
                        <br />
                    </div>
                    <div className='info-generales-info'>
                        <h2>Expérience de collaboration</h2>
                    </div>
                    <div className="mt-4 mx-5 border-b border-gray-900/10 pb-5">
                        <fieldset>
                            <legend className="text-sm font-semibold leading-6 text-gray-900">Depuis combien de temps travaillez-vous avec Afrijet ?</legend>
                            <div className="mt-2 grid grid-cols-2">
                                <div className="flex gap-x-3 p-2 bg-gray-200 rounded">
                                    <div className="flex h-6 items-center">
                                        <input
                                            id="Moins de 1 ans"
                                            value="Moins de 1 ans"
                                            name="Moins de 1 ans"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            onChange={(e) => setData({ ...data, anciennete: e.target.value })}
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="Moins de 1 ans" className="font-medium text-gray-900">
                                            Moins de 1 ans
                                        </label>
                                    </div>
                                </div>
                                <div className="flex gap-x-3 mx-4 p-2 bg-gray-200 rounded">
                                    <div className="flex h-6 items-center">
                                        <input
                                            id="De 1 à 3 ans"
                                            value="De 1 à 3 ans"
                                            name="De 1 à 3 ans"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            onChange={(e) => setData({ ...data, anciennete: e.target.value })}
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="De 1 à 3 ans" className="font-medium text-gray-900">
                                            De 1 à 3 ans
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-2 grid grid-cols-2">
                                <div className="flex gap-x-3 p-2 bg-gray-200 rounded">
                                    <div className="flex h-6 items-center">
                                        <input
                                            id="Plus de 3 ans"
                                            value="Plus de 3 ans"
                                            name="Plus de 3 ans"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            onChange={(e) => setData({ ...data, anciennete: e.target.value })}
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="Plus de 3 ans" className="font-medium text-gray-900">
                                            Plus de 3 ans
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                    <div className="mt-4 mx-5 border-b border-gray-900/10 pb-5">
                        <fieldset>
                            <legend className="text-sm font-semibold leading-6 text-gray-900">Comment évalueriez-vous votre expérience globale avec Afrijet ?</legend>
                            <div className="mt-2 grid grid-cols-2">
                                <div className="flex gap-x-3 p-2 bg-gray-200 rounded">
                                    <div className="flex h-6 items-center">
                                        <input
                                            id="Satisfaisante"
                                            value="Satisfaisante"
                                            name="Satisfaisante"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            onChange={(e) => setData({ ...data, experience_globale: e.target.value })}
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="Satisfaisante" className="font-medium text-gray-900">
                                            Satisfaisante
                                        </label>
                                    </div>
                                </div>
                                <div className="flex gap-x-3 mx-4 p-2 bg-gray-200 rounded">
                                    <div className="flex h-6 items-center">
                                        <input
                                            id="Moyenne"
                                            value="Moyenne"
                                            name="Moyenne"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            onChange={(e) => setData({ ...data, experience_globale: e.target.value })}
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="Moyenne" className="font-medium text-gray-900">
                                            Moyenne
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-2 grid grid-cols-2">
                                <div className="flex gap-x-3 p-2 bg-gray-200 rounded">
                                    <div className="flex h-6 items-center">
                                        <input
                                            id="Insatisfaisante"
                                            value="Insatisfaisante"
                                            name="Insatisfaisante"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            onChange={(e) => setData({ ...data, experience_globale: e.target.value })}
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="Insatisfaisante" className="font-medium text-gray-900">
                                            Insatisfaisante
                                        </label>
                                    </div>
                                </div>
                                <div className="flex gap-x-3 mx-4 p-2 bg-gray-200 rounded">
                                    <div className="flex h-6 items-center">
                                        <input
                                            id="Très Insatisfaisante"
                                            value="Très Insatisfaisante"
                                            name="Très Insatisfaisante"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            onChange={(e) => setData({ ...data, experience_globale: e.target.value })}
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="Très Insatisfaisante" className="font-medium text-gray-900">
                                            Très Insatisfaisante
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                    <div className="mx-5 mt-5 sm:col-span-3 border-b border-gray-900/10 pb-5">
                        <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                            Dans quelle pays votre entreprise se trouve ?
                        </label>
                        <div className="mt-2">
                            <select
                                id="localisation"
                                name="localisation"
                                className="bg-gray-200 block w-full rounded-md font-medium border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xl sm:text-sm sm:leading-6"
                                onChange={(e) => setData({ ...data, localisation: e.target.value })}
                            >
                                <option selected disabled>Veuillez sélectionner votre pays</option>
                                {
                                    countries.map((item) => (
                                        <option key={item.country}>{item.country}</option>
                                    ))
                                }

                            </select>
                        </div>
                    </div>
                    <div className="mt-4 mx-5 border-b border-gray-900/10 pb-5">
                        <fieldset>
                            <legend className="text-sm font-semibold leading-6 text-gray-900">Quels services d'Afrijet utilisez-vous principalement ?</legend>
                            <div className="mt-2 grid grid-cols-2">
                                <div className="flex gap-x-3 p-3 bg-gray-200 rounded">
                                    <div className="flex h-6 items-center">
                                        <input
                                            checked={CheckedItems.transport_fret}
                                            onClick={handleChange}
                                            disabled={CheckedItems.transport_passagers}
                                            id="transport_fret"
                                            value="Transport Fret"
                                            name="transport_fret"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            onChange={(e) => setData({ ...data, service: e.target.value })}
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="transport_fret" className="font-medium text-gray-900">
                                            Transport de passagers
                                        </label>
                                    </div>
                                </div>
                                <div className="flex gap-x-3 mx-4 p-3 bg-gray-200 rounded">
                                    <div className="flex h-6 items-center">
                                        <input
                                            checked={CheckedItems.transport_passagers}
                                            onClick={handleChange}
                                            disabled={CheckedItems.transport_fret}
                                            id="transport_passagers"
                                            value="Transort passagers"
                                            name="transport_passagers"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            onChange={(e) => setData({ ...data, service: e.target.value })}
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="transport_passagers" className="font-medium text-gray-900">
                                            Transport Fret
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                    <div className="mt-4 mx-5 border-b border-gray-900/10 pb-5">
                        <fieldset>
                            <legend className="text-sm font-semibold leading-6 text-gray-900">Êtes-vous satisfait des communications entre votre entreprise et Afrijet ?</legend>
                            <div className="mt-2 grid grid-cols-2">
                                <div className="flex gap-x-3 p-3 bg-gray-200 rounded">
                                    <div className="flex h-6 items-center">
                                        <input
                                            checked={CheckedItems.com_oui}
                                            onClick={handleChange}
                                            disabled={CheckedItems.com_non}
                                            id="com_oui"
                                            value="Oui"
                                            name="com_oui"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            onChange={(e) => setData({ ...data, communication: e.target.value })}
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="com_oui" className="font-medium text-gray-900">
                                            Oui
                                        </label>
                                    </div>
                                </div>
                                <div className="flex gap-x-3 mx-4 p-3 bg-gray-200 rounded">
                                    <div className="flex h-6 items-center">
                                        <input
                                            checked={CheckedItems.com_non}
                                            onClick={handleChange}
                                            disabled={CheckedItems.com_oui}
                                            id="com_non"
                                            value="Non"
                                            name="com_non"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            onChange={(e) => setData({ ...data, communication: e.target.value })}
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="com_non" className="font-medium text-gray-900">
                                            Non
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                </section>
                <section ref={sectionRefs.services} id="satifactions services">
                    <div className='space'>
                        <br />
                    </div>
                    <div className='info-generales'>
                        <h2>Satisfaction des services</h2>
                    </div>
                    <div className='mt-4 mx-5'>
                        <p className='mt-8'>S'il fallait noter de 1 à 4, les différents services d'AFRIJET</p>
                        <small className='text-xs text-gray-700'>(La note 1 exprime un très faible dégré de satisfaction, la note 4 reflète un haut dégré de satisfaction)</small>
                    </div>
                    <div class="bg-white px-6 border-b border-gray-900/10 pb-3">
                        <fieldset>
                            <legend class="text-sm font-semibold leading-6 text-gray-900 pt-4">Qualité du service client :</legend>
                            <div className="mt-4 grid grid-cols-4">
                                <div class="flex items-center mb-4">
                                    <input type="checkbox" id="note1" name="note" value="1" class="mr-2"
                                        onChange={(e) => setData({ ...data, note_service_client: e.target.value })}
                                    />
                                    <label for="note1" class="text-gray-700">1</label>
                                </div>
                                <div class="flex items-center mb-4">
                                    <input type="checkbox" id="note2" name="note" value="2" class="mr-2"
                                        onChange={(e) => setData({ ...data, note_service_client: e.target.value })}
                                    />
                                    <label for="note2" class="text-gray-700">2</label>
                                </div>
                                <div class="flex items-center mb-4">
                                    <input type="checkbox" id="note3" name="note" value="3" class="mr-2"
                                        onChange={(e) => setData({ ...data, note_service_client: e.target.value })}
                                    />
                                    <label for="note3" class="text-gray-700">3</label>
                                </div>
                                <div class="flex items-center mb-4">
                                    <input type="checkbox" id="note4" name="note" value="4" class="mr-2"
                                        onChange={(e) => setData({ ...data, note_service_client: e.target.value })}
                                    />
                                    <label for="note4" class="text-gray-700">4</label>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                    <div class="bg-white px-6 border-b border-gray-900/10 pb-3">
                        <fieldset>
                            <legend class="text-sm font-semibold leading-6 text-gray-900 pt-4">Ponctualités des vols :</legend>
                            <div className="mt-4 grid grid-cols-4">
                                <div class="flex items-center mb-4">
                                    <input type="checkbox" id="note1" name="note" value="1" class="mr-2"
                                        onChange={(e) => setData({ ...data, note_ponctualite: e.target.value })}
                                    />
                                    <label for="note1" class="text-gray-700">1</label>
                                </div>
                                <div class="flex items-center mb-4">
                                    <input type="checkbox" id="note2" name="note" value="2" class="mr-2"
                                        onChange={(e) => setData({ ...data, note_ponctualite: e.target.value })}
                                    />
                                    <label for="note2" class="text-gray-700">2</label>
                                </div>
                                <div class="flex items-center mb-4">
                                    <input type="checkbox" id="note3" name="note" value="3" class="mr-2"
                                        onChange={(e) => setData({ ...data, note_ponctualite: e.target.value })}
                                    />
                                    <label for="note3" class="text-gray-700">3</label>
                                </div>
                                <div class="flex items-center mb-4">
                                    <input type="checkbox" id="note4" name="note" value="4" class="mr-2"
                                        onChange={(e) => setData({ ...data, note_ponctualite: e.target.value })}
                                    />
                                    <label for="note4" class="text-gray-700">4</label>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                    <div class="bg-white px-6 border-b border-gray-900/10 pb-3">
                        <fieldset>
                            <legend class="text-sm font-semibold leading-6 text-gray-900 pt-4">Confort à bord :</legend>
                            <div className="mt-4 grid grid-cols-4">
                                <div class="flex items-center mb-4">
                                    <input type="checkbox" id="note1" name="note" value="1" class="mr-2"
                                        onChange={(e) => setData({ ...data, note_confort: e.target.value })}
                                    />
                                    <label for="note1" class="text-gray-700">1</label>
                                </div>
                                <div class="flex items-center mb-4">
                                    <input type="checkbox" id="note2" name="note" value="2" class="mr-2"
                                        onChange={(e) => setData({ ...data, note_confort: e.target.value })}
                                    />
                                    <label for="note2" class="text-gray-700">2</label>
                                </div>
                                <div class="flex items-center mb-4">
                                    <input type="checkbox" id="note3" name="note" value="3" class="mr-2"
                                        onChange={(e) => setData({ ...data, note_confort: e.target.value })}
                                    />
                                    <label for="note3" class="text-gray-700">3</label>
                                </div>
                                <div class="flex items-center mb-4">
                                    <input type="checkbox" id="note4" name="note" value="4" class="mr-2"
                                        onChange={(e) => setData({ ...data, note_confort: e.target.value })}
                                    />
                                    <label for="note4" class="text-gray-700">4</label>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                    <div class="bg-white px-6 border-b border-gray-900/10 pb-3">
                        <fieldset>
                            <legend class="text-sm font-semibold leading-6 text-gray-900 pt-4">Gestion des réservations :</legend>
                            <div className="mt-4 grid grid-cols-4">
                                <div class="flex items-center mb-4">
                                    <input type="checkbox" id="note1" name="note" value="1" class="mr-2"
                                        onChange={(e) => setData({ ...data, note_reservation: e.target.value })}
                                    />
                                    <label for="note1" class="text-gray-700">1</label>
                                </div>
                                <div class="flex items-center mb-4">
                                    <input type="checkbox" id="note2" name="note" value="2" class="mr-2"
                                        onChange={(e) => setData({ ...data, note_reservation: e.target.value })}
                                    />
                                    <label for="note2" class="text-gray-700">2</label>
                                </div>
                                <div class="flex items-center mb-4">
                                    <input type="checkbox" id="note3" name="note" value="3" class="mr-2"
                                        onChange={(e) => setData({ ...data, note_reservation: e.target.value })}
                                    />
                                    <label for="note3" class="text-gray-700">3</label>
                                </div>
                                <div class="flex items-center mb-4">
                                    <input type="checkbox" id="note4" name="note" value="4" class="mr-2"
                                        onChange={(e) => setData({ ...data, note_reservation: e.target.value })}
                                    />
                                    <label for="note4" class="text-gray-700">4</label>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                    <div class="bg-white px-6 border-b border-gray-900/10 pb-3">
                        <fieldset>
                            <legend class="text-sm font-semibold leading-6 text-gray-900 pt-4">Rapport qualité/prix :</legend>
                            <div className="mt-4 grid grid-cols-4">
                                <div class="flex items-center mb-4">
                                    <input type="checkbox" id="note1" name="note" value="1" class="mr-2"
                                        onChange={(e) => setData({ ...data, note_prix: e.target.value })}
                                    />
                                    <label for="note1" class="text-gray-700">1</label>
                                </div>
                                <div class="flex items-center mb-4">
                                    <input type="checkbox" id="note2" name="note" value="2" class="mr-2"
                                        onChange={(e) => setData({ ...data, note_prix: e.target.value })}
                                    />
                                    <label for="note2" class="text-gray-700">2</label>
                                </div>
                                <div class="flex items-center mb-4">
                                    <input type="checkbox" id="note3" name="note" value="3" class="mr-2"
                                        onChange={(e) => setData({ ...data, note_prix: e.target.value })}
                                    />
                                    <label for="note3" class="text-gray-700">3</label>
                                </div>
                                <div class="flex items-center mb-4">
                                    <input type="checkbox" id="note4" name="note" value="4" class="mr-2"
                                        onChange={(e) => setData({ ...data, note_prix: e.target.value })}
                                    />
                                    <label for="note4" class="text-gray-700">4</label>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                </section>
                <section ref={sectionRefs.suggestions} id="suggestions">
                    <div className='space'>
                        <br />
                    </div>
                    <div className='info-generales'>
                        <h2>SUGGESTIONS</h2>
                    </div>
                    <div className="mt-4 mx-4 pb-5">
                        <fieldset>
                            <legend className="text-sm font-semibold leading-6 text-gray-900">Quelles améliorations suggéreriez-vous pour nos services ?</legend>
                            <div class="mt-2">
                                <textarea id="suggestion"
                                    name="suggestion"
                                    rows="3"
                                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-gray-200"
                                    onChange={(e) => setData({ ...data, suggestion: e.target.value })}
                                >

                                </textarea>
                            </div>
                        </fieldset>
                    </div>
                    <div className="mt-4 mx-4 pb-5">
                        <fieldset>
                            <legend className="text-sm font-semibold leading-6 text-gray-900">Y a-t-il des services que vous aimeriez voir ajoutés ?</legend>
                            <div class="mt-2">
                                <input id="ajout_service"
                                    name="ajout_service"
                                    rows="3"
                                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-gray-200"
                                    onChange={(e) => setData({ ...data, ajout_service: e.target.value })}
                                >

                                </input>
                            </div>
                        </fieldset>
                    </div>
                    <div className="mt-4 mx-4 pb-5">
                        <fieldset>
                            <legend className="text-sm font-semibold leading-6 text-gray-900">Recommanderiez-vous AFRIJET à une autre entreprise ? Pourquoi ou Pourquoi pas ?</legend>
                            <div class="mt-2">
                                <textarea id="recommandation"
                                    name="recommandation"
                                    rows="3"
                                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-gray-200"
                                    onChange={(e) => setData({ ...data, recommandation: e.target.value })}
                                >

                                </textarea>
                            </div>
                        </fieldset>
                    </div>
                </section>
                <div>
                    <motion.button
                        whileHover={{ scale: 1.1, backgroundColor: 'rgb(165,42,42)', boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)' }}
                        whileTap={{ scale: 0.95, backgroundColor: 'rgb(165,42,42)' }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        class="btn-valider flex items-center bg-red-800 text-white py-2 px-4 rounded hover:bg-red-600"
                        type='submit'
                    >
                        Valider
                        <i class="fa-solid fa-check mx-2"></i>
                    </motion.button>
                </div>
            </form>

            <AnimatePresence>
                {isPopVisible && (
                    <motion.div
                        className='popup'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            ref={popupRef}
                            className='popup-content'
                            initial={{ y: -30 }}
                            animate={{ y: 0 }}
                            exit={{ y: -30 }}
                            transition={{ duration: 0.3 }}
                        >
                            <i class="fa-solid fa-circle-check"></i>
                            <h4 className='mt-1'>Merci pour votre Feedback !</h4>
                        </motion.div>

                    </motion.div>
                )}
            </AnimatePresence>


        </motion.div>
    )
}

export default AgencySurvey