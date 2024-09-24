import React, { useEffect, useRef, useState } from 'react'
import '../styles/style.css'
import axios from 'axios'
import countryData from '../composants/country.json';
import { motion } from 'framer-motion'
import { AnimatePresence } from 'framer-motion';
import logoAfrijet from '../assets/images/Logo.png'

const AgencySurvey = () => {

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
                ease: 'easeIn',
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
        sexe: '',
        nationalite: '',
        depart: '',
        destination: '',
        experience_vol: '',
        horaire_vol: '',
        confort_siege: '',
        proprete: '',
        note_serviceUM: '',
        note_animal_cabine: '',
        note_animal_soute: '',
        qualite_repas: '',
        divertissement: '',
        courtoisie: '',
        recommandation: ''
    })

    /*CheckedItems permet de selectionner et deselectionner une checkbox en fontion de l'etat d'une autre checkbox avec la fonction 
        handleChange associe */
    const [CheckedItems, setCheckedItems] = useState({
        homme: false,
        femme: false,
        horaire_oui: false,
        horaire_non: false,
        confortable: false,
        inconfortable: false,
        satisfaisante: false,
        insatisfaisante: false,
        divertissement_oui: false,
        divertissement_non: false,
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
        axios.post('https://afrijet.pockethost.io/api/collections/ExperienceSurvey/records', data, {
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
                        <h1>Enquête en vol</h1>
                    </div>
                </div>
                <div className='fil_ariane'>
                    <p>Informations générales</p>
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <section>
                    <div className='space'>
                        <br />
                    </div>
                    <div className='info-generales-info'>
                        <h2>Informations générales</h2>
                    </div>
                    <div className="mt-4 mx-5 border-b border-gray-900/10 pb-5">
                        <fieldset>
                            <legend className="text-sm font-semibold leading-6 text-gray-900">Etes-vous un(e) ?</legend>
                            <div className="mt-2 grid grid-cols-2">
                                <div className="flex gap-x-3 p-2 bg-gray-200 rounded">
                                    <div className="flex h-6 items-center">
                                        <input
                                            checked={CheckedItems.homme}
                                            onClick={handleChange}
                                            onChange={(e) => setData({ ...data, sexe: e.target.value })}
                                            disabled={CheckedItems.femme}
                                            id="homme"
                                            value="homme"
                                            name="homme"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="homme" className="font-medium text-gray-900">
                                            Homme
                                        </label>
                                    </div>
                                </div>
                                <div className="flex gap-x-3 mx-4 p-2 bg-gray-200 rounded">
                                    <div className="flex h-6 items-center">
                                        <input
                                            checked={CheckedItems.femme}
                                            onClick={handleChange}
                                            onChange={(e) => setData({ ...data, sexe: e.target.value })}
                                            disabled={CheckedItems.homme}
                                            id="femme"
                                            value="femme"
                                            name="femme"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="femme" className="font-medium text-gray-900">
                                            Femme
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                    <div className="mx-5 mt-5 sm:col-span-3 border-b border-gray-900/10 pb-5">
                        <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                            De quelle nationalité êtes-vous ?
                        </label>
                        <div className="mt-2">
                            <select
                                id="nationalite"
                                name="nationalite"
                                className="bg-gray-200 block w-full rounded-md font-medium border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xl sm:text-sm sm:leading-6"
                                onChange={(e) => setData({ ...data, nationalite: e.target.value })}
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
                    <div className="mx-5 mt-5 sm:col-span-3 border-b border-gray-900/10 pb-5">
                        <label htmlFor="destination" className="block text-sm font-medium leading-6 text-gray-900">
                            Quelle est votre ville de départ ?
                        </label>
                        <div className="mt-2">
                            <select
                                id="depart"
                                name="depart"
                                className="bg-gray-200 block w-full rounded-md font-medium border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xl sm:text-sm sm:leading-6"
                                onChange={(e) => setData({ ...data, depart: e.target.value })}
                            >
                                <option selected disabled>Veuillez sélectionner la ville</option>
                                <option>Douala</option>
                                <option>Libreville</option>
                                <option>Yaoundé</option>
                                <option>Oyem</option>
                                <option>Port-Gentil</option>
                                <option>Franceville</option>
                                <option>Kinshasa</option>
                                <option>Ponite-Noire</option>
                                <option>Brazzaville</option>
                            </select>
                        </div>
                    </div>
                    <div className="mx-5 mt-5 sm:col-span-3 border-b border-gray-900/10 pb-5">
                        <label htmlFor="destination" className="block text-sm font-medium leading-6 text-gray-900">
                            Vers quelle destination voyagez-vous ?
                        </label>
                        <div className="mt-2">
                            <select
                                id="destination"
                                name="destination"
                                className="bg-gray-200 block w-full rounded-md font-medium border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xl sm:text-sm sm:leading-6"
                                onChange={(e) => setData({ ...data, destination: e.target.value })}
                            >
                                <option selected disabled>Veuillez sélectionner votre destination</option>
                                <option>Douala</option>
                                <option>Libreville</option>
                                <option>Yaoundé</option>
                                <option>Oyem</option>
                                <option>Port-Gentil</option>
                                <option>Franceville</option>
                                <option>Kinshasa</option>
                                <option>Ponite-Noire</option>
                                <option>Brazzaville</option>
                            </select>
                        </div>
                    </div>
                </section>
                <section>
                    <div className='space'>
                        <br />
                    </div>
                    <div className='info-generales'>
                        <h2>Expérience de vol</h2>
                    </div>
                    <div className="mt-4 mx-5 border-b border-gray-900/10 pb-5">
                        <fieldset>
                            <legend className="text-sm font-semibold leading-6 text-gray-900">Comment évalueriez-vous votre expérience globale de vol ?</legend>
                            <div className="mt-2 grid grid-cols-2">
                                <div className="flex gap-x-3 p-2 bg-gray-200 rounded">
                                    <div className="flex h-6 items-center">
                                        <input
                                            id="Excellente_experience"
                                            value="Excellente"
                                            name="Excellente_experience"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            onChange={(e) => setData({ ...data, experience_vol: e.target.value })}
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="Excellente_experience" className="font-medium text-gray-900">
                                            Excellente
                                        </label>
                                    </div>
                                </div>
                                <div className="flex gap-x-3 mx-4 p-2 bg-gray-200 rounded">
                                    <div className="flex h-6 items-center">
                                        <input
                                            id="Bonne_experience"
                                            value="Bonne"
                                            name="Bonne_experience"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            onChange={(e) => setData({ ...data, experience_vol: e.target.value })}
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="Bonne_experience" className="font-medium text-gray-900">
                                            Bonne
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-2 grid grid-cols-2">
                                <div className="flex gap-x-3 p-2 bg-gray-200 rounded">
                                    <div className="flex h-6 items-center">
                                        <input
                                            id="Moyenne_experience"
                                            value="Moyenne"
                                            name="Moyenne_experience"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            onChange={(e) => setData({ ...data, experience_vol: e.target.value })}
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="Moyenne_experience" className="font-medium text-gray-900">
                                            Moyenne
                                        </label>
                                    </div>
                                </div>
                                <div className="flex gap-x-3 mx-4 p-2 bg-gray-200 rounded">
                                    <div className="flex h-6 items-center">
                                        <input
                                            id="Mauvaise_experience"
                                            value="Mauvaise"
                                            name="Mauvaise_experience"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            onChange={(e) => setData({ ...data, experience_vol: e.target.value })}
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="Mauvaise_experience" className="font-medium text-gray-900">
                                            Mauvaise
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                    <div className="mt-4 mx-5 border-b border-gray-900/10 pb-5">
                        <fieldset>
                            <legend className="text-sm font-semibold leading-6 text-gray-900">Le vol a-t-il respecté l'horaire prévu ?</legend>
                            <div className="mt-2 grid grid-cols-2">
                                <div className="flex gap-x-3 p-3 bg-gray-200 rounded">
                                    <div className="flex h-6 items-center">
                                        <input
                                            checked={CheckedItems.horaire_oui}
                                            onClick={handleChange}
                                            disabled={CheckedItems.horaire_non}
                                            id="horaire_oui"
                                            value="Oui"
                                            name="horaire_oui"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            onChange={(e) => setData({ ...data, horaire_vol: e.target.value })}
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="horaire_oui" className="font-medium text-gray-900">
                                            Oui
                                        </label>
                                    </div>
                                </div>
                                <div className="flex gap-x-3 mx-4 p-3 bg-gray-200 rounded">
                                    <div className="flex h-6 items-center">
                                        <input
                                            checked={CheckedItems.horaire_non}
                                            onClick={handleChange}
                                            disabled={CheckedItems.horaire_oui}
                                            id="horaire_non"
                                            value="Non"
                                            name="horaire_non"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            onChange={(e) => setData({ ...data, horaire_vol: e.target.value })}
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="horaire_non" className="font-medium text-gray-900">
                                            Non
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                    <div className="mt-4 mx-5 border-b border-gray-900/10 pb-5">
                        <fieldset>
                            <legend className="text-sm font-semibold leading-6 text-gray-900">Comment évalueriez-vous le confort de votre siège ?</legend>
                            <div className="mt-2 grid grid-cols-2">
                                <div className="flex gap-x-3 p-3 bg-gray-200 rounded">
                                    <div className="flex h-6 items-center">
                                        <input
                                            checked={CheckedItems.confortable}
                                            onClick={handleChange}
                                            disabled={CheckedItems.inconfortable}
                                            id="Confortable"
                                            value="Confortable"
                                            name="Confortable"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            onChange={(e) => setData({ ...data, confort_siege: e.target.value })}
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="Confortable" className="font-medium text-gray-900">
                                            Confortable
                                        </label>
                                    </div>
                                </div>
                                <div className="flex gap-x-3 mx-4 p-3 bg-gray-200 rounded">
                                    <div className="flex h-6 items-center">
                                        <input
                                            checked={CheckedItems.inconfortable}
                                            onClick={handleChange}
                                            disabled={CheckedItems.confortable}
                                            id="Inconfortable"
                                            value="Inconfortable"
                                            name="Inconfortable"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            onChange={(e) => setData({ ...data, confort_siege: e.target.value })}
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="Inconfortable" className="font-medium text-gray-900">
                                            Inconfortable
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                    <div className="mt-4 mx-5 border-b border-gray-900/10 pb-5">
                        <fieldset>
                            <legend className="text-sm font-semibold leading-6 text-gray-900">La propreté de l'avion était-elle satisfaisante ?</legend>
                            <div className="mt-2 grid grid-cols-2">
                                <div className="flex gap-x-3 p-3 bg-gray-200 rounded">
                                    <div className="flex h-6 items-center">
                                        <input
                                            checked={CheckedItems.satisfaisante}
                                            onClick={handleChange}
                                            disabled={CheckedItems.insatisfaisante}
                                            id="satisfaisante"
                                            value="satisfaisante"
                                            name="satisfaisante"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            onChange={(e) => setData({ ...data, proprete: e.target.value })}
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="satisfaisante" className="font-medium text-gray-900">
                                            Satisfaisante
                                        </label>
                                    </div>
                                </div>
                                <div className="flex gap-x-3 mx-4 p-3 bg-gray-200 rounded">
                                    <div className="flex h-6 items-center">
                                        <input
                                            checked={CheckedItems.insatisfaisante}
                                            onClick={handleChange}
                                            disabled={CheckedItems.satisfaisante}
                                            id="insatisfaisante"
                                            value="insatisfaisante"
                                            name="insatisfaisante"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            onChange={(e) => setData({ ...data, proprete: e.target.value })}
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="insatisfaisante" className="font-medium text-gray-900">
                                            Insatisfaisante
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                </section>
                <section>
                    <div className='space'>
                        <br />
                    </div>
                    <div className='info-generales'>
                        <h2>SERVICES à BORD</h2>
                    </div>
                    <div className='mt-4 mx-5'>
                        <p className='mt-8'>S'il fallait noter de 1 à 4, les différents services à bord</p>
                        <small className='text-xs text-gray-700'>(La note 1 exprime un très faible dégré de satisfaction, la note 4 reflète un haut dégré de satisfaction)</small>
                    </div>
                    <div class="bg-white px-6 border-b border-gray-900/10 pb-3">
                        <fieldset>
                            <legend class="text-sm font-semibold leading-6 text-gray-900 pt-4">Service UM :</legend>
                            <div className="mt-4 grid grid-cols-4">
                                <div class="flex items-center mb-4">
                                    <input type="checkbox" id="note1" name="note" value="1" class="mr-2"
                                        onChange={(e) => setData({ ...data, note_serviceUM: e.target.value })}
                                    />
                                    <label for="note1" class="text-gray-700">1</label>
                                </div>
                                <div class="flex items-center mb-4">
                                    <input type="checkbox" id="note2" name="note" value="2" class="mr-2"
                                        onChange={(e) => setData({ ...data, note_serviceUM: e.target.value })}
                                    />
                                    <label for="note2" class="text-gray-700">2</label>
                                </div>
                                <div class="flex items-center mb-4">
                                    <input type="checkbox" id="note3" name="note" value="3" class="mr-2"
                                        onChange={(e) => setData({ ...data, note_serviceUM: e.target.value })}
                                    />
                                    <label for="note3" class="text-gray-700">3</label>
                                </div>
                                <div class="flex items-center mb-4">
                                    <input type="checkbox" id="note4" name="note" value="4" class="mr-2"
                                        onChange={(e) => setData({ ...data, note_serviceUM: e.target.value })}
                                    />
                                    <label for="note4" class="text-gray-700">4</label>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                    <div class="bg-white px-6 border-b border-gray-900/10 pb-3">
                        <fieldset>
                            <legend class="text-sm font-semibold leading-6 text-gray-900 pt-4">Animaux en cabine :</legend>
                            <div className="mt-4 grid grid-cols-4">
                                <div class="flex items-center mb-4">
                                    <input type="checkbox" id="note1" name="note" value="1" class="mr-2"
                                        onChange={(e) => setData({ ...data, note_animal_cabine: e.target.value })}
                                    />
                                    <label for="note1" class="text-gray-700">1</label>
                                </div>
                                <div class="flex items-center mb-4">
                                    <input type="checkbox" id="note2" name="note" value="2" class="mr-2"
                                        onChange={(e) => setData({ ...data, note_animal_cabine: e.target.value })}
                                    />
                                    <label for="note2" class="text-gray-700">2</label>
                                </div>
                                <div class="flex items-center mb-4">
                                    <input type="checkbox" id="note3" name="note" value="3" class="mr-2"
                                        onChange={(e) => setData({ ...data, note_animal_cabine: e.target.value })}
                                    />
                                    <label for="note3" class="text-gray-700">3</label>
                                </div>
                                <div class="flex items-center mb-4">
                                    <input type="checkbox" id="note4" name="note" value="4" class="mr-2"
                                        onChange={(e) => setData({ ...data, note_animal_cabine: e.target.value })}
                                    />
                                    <label for="note4" class="text-gray-700">4</label>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                    <div class="bg-white px-6 border-b border-gray-900/10 pb-3">
                        <fieldset>
                            <legend class="text-sm font-semibold leading-6 text-gray-900 pt-4">Animaux en soute :</legend>
                            <div className="mt-4 grid grid-cols-4">
                                <div class="flex items-center mb-4">
                                    <input type="checkbox" id="note1" name="note" value="1" class="mr-2"
                                        onChange={(e) => setData({ ...data, note_animal_soute: e.target.value })}
                                    />
                                    <label for="note1" class="text-gray-700">1</label>
                                </div>
                                <div class="flex items-center mb-4">
                                    <input type="checkbox" id="note2" name="note" value="2" class="mr-2"
                                        onChange={(e) => setData({ ...data, note_animal_soute: e.target.value })}
                                    />
                                    <label for="note2" class="text-gray-700">2</label>
                                </div>
                                <div class="flex items-center mb-4">
                                    <input type="checkbox" id="note3" name="note" value="3" class="mr-2"
                                        onChange={(e) => setData({ ...data, note_animal_soute: e.target.value })}
                                    />
                                    <label for="note3" class="text-gray-700">3</label>
                                </div>
                                <div class="flex items-center mb-4">
                                    <input type="checkbox" id="note4" name="note" value="4" class="mr-2"
                                        onChange={(e) => setData({ ...data, note_animal_soute: e.target.value })}
                                    />
                                    <label for="note4" class="text-gray-700">4</label>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                    <div className="mt-4 mx-5 border-b border-gray-900/10 pb-5">
                        <fieldset>
                            <legend className="text-sm font-semibold leading-6 text-gray-900">Comment évalueriez-vous la qualité des repas/snacks servis ?</legend>
                            <div className="mt-2 grid grid-cols-2">
                                <div className="flex gap-x-3 p-2 bg-gray-200 rounded">
                                    <div className="flex h-6 items-center">
                                        <input
                                            id="Bon_repas"
                                            value="Bonne"
                                            name="Bon_repas"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            onChange={(e) => setData({ ...data, qualite_repas: e.target.value })}
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="Bon_repas" className="font-medium text-gray-900">
                                            Bonne
                                        </label>
                                    </div>
                                </div>
                                <div className="flex gap-x-3 mx-4 p-2 bg-gray-200 rounded">
                                    <div className="flex h-6 items-center">
                                        <input
                                            id="Moyenne_repas"
                                            value="Moyenne"
                                            name="Moyenne_repas"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            onChange={(e) => setData({ ...data, qualite_repas: e.target.value })}
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="Moyenne_repas" className="font-medium text-gray-900">
                                            Moyenne
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-2 grid grid-cols-2">
                                <div className="flex gap-x-3 p-2 bg-gray-200 rounded">
                                    <div className="flex h-6 items-center">
                                        <input
                                            id="Pas de repas"
                                            value="Pas de repas"
                                            name="Pas de repas"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            onChange={(e) => setData({ ...data, qualite_repas: e.target.value })}
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="Pas de repas" className="font-medium text-gray-900">
                                            Pas de repas/snacks servis
                                        </label>
                                    </div>
                                </div>
                                <div className="flex gap-x-3 mx-4 p-2 bg-gray-200 rounded">
                                    <div className="flex h-6 items-center">
                                        <input
                                            id="Mauvaise_repas"
                                            value="Mauvaise"
                                            name="Mauvaise_repas"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            onChange={(e) => setData({ ...data, qualite_repas: e.target.value })}
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="Mauvaise_repas" className="font-medium text-gray-900">
                                            Mauvaise
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                    <div className="mt-4 mx-4 border-b border-gray-900/10 pb-5">
                        <fieldset>
                            <legend className="text-sm font-semibold leading-6 text-gray-900">Avez-vous utilisé le service de divertissement à bord ?</legend>
                            <div className="mt-2 grid grid-cols-2">
                                <div className="flex gap-x-3 p-2 bg-gray-200 rounded">
                                    <div className="flex h-6 items-center">
                                        <input
                                            checked={CheckedItems.divertissement_oui}
                                            onClick={handleChange}
                                            onChange={(e) => setData({ ...data, divertissement: e.target.value })}
                                            disabled={CheckedItems.divertissement_non}
                                            id="divertissement_oui"
                                            value="Oui"
                                            name="divertissement_oui"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"

                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="divertissement_oui" className="font-medium text-gray-900">
                                            Oui
                                        </label>
                                    </div>
                                </div>
                                <div className="flex gap-x-3 mx-4 p-2 bg-gray-200 rounded">
                                    <div className="flex h-6 items-center">
                                        <input
                                            checked={CheckedItems.pas_chaleureux}
                                            onClick={handleChange}
                                            onChange={(e) => setData({ ...data, acceuil_agence: e.target.value })}
                                            disabled={CheckedItems.chaleureux}
                                            id="divertissement_non"
                                            value="Non"
                                            name="divertissement_non"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="divertissement_non" className="font-medium text-gray-900">
                                            Non
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                    <div className="mt-4 mx-5 border-b border-gray-900/10 pb-5">
                        <fieldset>
                            <legend className="text-sm font-semibold leading-6 text-gray-900">Comment évalueriez-vous la courtoisie et l'efficacité du personnel de bord ?</legend>
                            <div className="mt-2 grid grid-cols-2">
                                <div className="flex gap-x-3 p-2 bg-gray-200 rounded">
                                    <div className="flex h-6 items-center">
                                        <input
                                            id="Excellente_courtoise"
                                            value="Excellente"
                                            name="Excellente_courtoise"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            onChange={(e) => setData({ ...data, courtoisie: e.target.value })}
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="Excellente_courtoise" className="font-medium text-gray-900">
                                            Excellente
                                        </label>
                                    </div>
                                </div>
                                <div className="flex gap-x-3 mx-4 p-2 bg-gray-200 rounded">
                                    <div className="flex h-6 items-center">
                                        <input
                                            id="Bonne_courtoise"
                                            value="Bonne"
                                            name="Bonne_courtoise"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            onChange={(e) => setData({ ...data, courtoisie: e.target.value })}
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="Bonne_courtoise" className="font-medium text-gray-900">
                                            Bonne
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-2 grid grid-cols-2">
                                <div className="flex gap-x-3 p-2 bg-gray-200 rounded">
                                    <div className="flex h-6 items-center">
                                        <input
                                            id="Moyenne_courtoisie"
                                            value="Moyenne"
                                            name="Moyenne_courtoisie"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            onChange={(e) => setData({ ...data, courtoisie: e.target.value })}
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="Moyenne_courtoisie" className="font-medium text-gray-900">
                                            Moyenne
                                        </label>
                                    </div>
                                </div>
                                <div className="flex gap-x-3 mx-4 p-2 bg-gray-200 rounded">
                                    <div className="flex h-6 items-center">
                                        <input
                                            id="Mauvaise_courtoisie"
                                            value="Mauvaise"
                                            name="Mauvaise_courtoisie"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            onChange={(e) => setData({ ...data, courtoisie: e.target.value })}
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="Mauvaise_courtoisie" className="font-medium text-gray-900">
                                            Mauvaise
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                    <div className="mt-4 mx-4 pb-5">
                        <fieldset>
                            <legend className="text-sm font-semibold leading-6 text-gray-900">Recommanderiez-vous AFRIJET à une de vos connaissances ? Pourquoi ?</legend>
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