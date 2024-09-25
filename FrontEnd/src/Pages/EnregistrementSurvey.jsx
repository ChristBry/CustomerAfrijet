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
                duration: 0.5,
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
        escale: '',
        destination: '',
        experience_comptoire: '',
        assistance_comptoire: '',
        courtoisie_personnel: '',
        difficulte: '',
        explication_difficulte: '',
        note_salon_business: '',
        note_bagage: '',
        note_serviceUM: '',
        recevoir_service: '',
        recommandation: ''
    })

    /*CheckedItems permet de selectionner et deselectionner une checkbox en fontion de l'etat d'une autre checkbox avec la fonction 
        handleChange associe */
    const [CheckedItems, setCheckedItems] = useState({
        homme: false,
        femme: false,
        assistance_oui: false,
        assistance_non: false,
        difficulte_oui: false,
        difficulte_non: false,
        explication_difficulte: false,
        infos_oui: false,
        infos_non: false,
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
        axios.post('https://afrijet.pockethost.io/api/collections/EnregistrementSurvey/records', data, {
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
                        <h1>Enquête Enregistrement</h1>
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
                        <label htmlFor="escale" className="block text-sm font-medium leading-6 text-gray-900">
                            Dans quelle escale êtes-vous ?
                        </label>
                        <div className="mt-2">
                            <select
                                id="escale"
                                name="escale"
                                className="bg-gray-200 block w-full rounded-md font-medium border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xl sm:text-sm sm:leading-6"
                                onChange={(e) => setData({ ...data, escale: e.target.value })}
                            >
                                <option selected disabled>Veuillez sélectionner l'escale</option>
                                <option>Brazzaville</option>
                                <option>Kinshasa</option>
                                <option>Cotonou</option>
                                <option>Douala</option>
                                <option>Franceville</option>
                                <option>Libreville</option>
                                <option>Oyem</option>
                                <option>Port-Gentil</option>
                                <option>Bata</option>
                                <option>Pointe-Noire</option>
                                <option>Malabo</option>
                                <option>Sao Tomé</option>
                                <option>Principe</option>
                                <option>Yaoundé</option>
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
                                <option>Brazzaville</option>
                                <option>Kinshasa</option>
                                <option>Cotonou</option>
                                <option>Douala</option>
                                <option>Franceville</option>
                                <option>Libreville</option>
                                <option>Oyem</option>
                                <option>Port-Gentil</option>
                                <option>Bata</option>
                                <option>Pointe-Noire</option>
                                <option>Malabo</option>
                                <option>Sao Tomé</option>
                                <option>Principe</option>
                                <option>Yaoundé</option>
                            </select>
                        </div>
                    </div>
                </section>
                <section>
                    <div className='space'>
                        <br />
                    </div>
                    <div className='info-generales'>
                        <h2>Expérience d'Enregistrement</h2>
                    </div>
                    <div className="mt-4 mx-5 border-b border-gray-900/10 pb-5">
                        <fieldset>
                            <legend className="text-sm font-semibold leading-6 text-gray-900">Comment évalueriez-vous votre expérience d'enregistrement ?</legend>
                            <div className="mt-2 grid grid-cols-2">
                                <div className="flex gap-x-3 p-2 bg-gray-200 rounded">
                                    <div className="flex h-6 items-center">
                                        <input
                                            id="satisfaisante"
                                            value="satisfaisante"
                                            name="satisfaisante"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            onChange={(e) => setData({ ...data, experience_comptoire: e.target.value })}
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="satisfaisante" className="font-medium text-gray-900">
                                            Satisfaisante
                                        </label>
                                    </div>
                                </div>
                                <div className="flex gap-x-3 mx-4 p-2 bg-gray-200 rounded">
                                    <div className="flex h-6 items-center">
                                        <input
                                            id="moyenne"
                                            value="moyenne"
                                            name="moyenne"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            onChange={(e) => setData({ ...data, experience_comptoire: e.target.value })}
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="moyenne" className="font-medium text-gray-900">
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
                                            onChange={(e) => setData({ ...data, experience_comptoire: e.target.value })}
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
                                            id="tres_insatisfaisante"
                                            value="tres_insatisfaisante"
                                            name="tres_insatisfaisante"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            onChange={(e) => setData({ ...data, experience_comptoire: e.target.value })}
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="tres_insatisfaisante" className="font-medium text-gray-900">
                                            Très Insatisfaisante
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                    <div className="mt-4 mx-5 border-b border-gray-900/10 pb-5">
                        <fieldset>
                            <legend className="text-sm font-semibold leading-6 text-gray-900">Avez-vous eu besoin d'assistance lors de l'enregistrement ?</legend>
                            <div className="mt-2 grid grid-cols-2">
                                <div className="flex gap-x-3 p-3 bg-gray-200 rounded">
                                    <div className="flex h-6 items-center">
                                        <input
                                            checked={CheckedItems.assistance_oui}
                                            onClick={handleChange}
                                            disabled={CheckedItems.assistance_non}
                                            id="assistance_oui"
                                            value="Oui"
                                            name="assistance_oui"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            onChange={(e) => setData({ ...data, assistance_comptoire: e.target.value })}
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="assistance_oui" className="font-medium text-gray-900">
                                            Oui
                                        </label>
                                    </div>
                                </div>
                                <div className="flex gap-x-3 mx-4 p-3 bg-gray-200 rounded">
                                    <div className="flex h-6 items-center">
                                        <input
                                            checked={CheckedItems.assistance_non}
                                            onClick={handleChange}
                                            disabled={CheckedItems.assistance_oui}
                                            id="assistance_non"
                                            value="Non"
                                            name="assistance_non"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            onChange={(e) => setData({ ...data, tarification: e.target.value })}
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="assistance_non" className="font-medium text-gray-900">
                                            Non
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                    <div className="mt-4 mx-5 border-b border-gray-900/10 pb-5">
                        <fieldset>
                            <legend className="text-sm font-semibold leading-6 text-gray-900">Comment évalueriez-vous la courtoisie du personnel au comptoir ?</legend>
                            <div className="mt-2 grid grid-cols-2">
                                <div className="flex gap-x-3 p-2 bg-gray-200 rounded">
                                    <div className="flex h-6 items-center">
                                        <input
                                            id="Excellente"
                                            value="Excellente"
                                            name="Excellente"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            onChange={(e) => setData({ ...data, courtoisie_personnel: e.target.value })}
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="Excellente" className="font-medium text-gray-900">
                                            Excellente
                                        </label>
                                    </div>
                                </div>
                                <div className="flex gap-x-3 mx-4 p-2 bg-gray-200 rounded">
                                    <div className="flex h-6 items-center">
                                        <input
                                            id="Bonne"
                                            value="Bonne"
                                            name="Bonne"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            onChange={(e) => setData({ ...data, courtoisie_personnel: e.target.value })}
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="Bonne" className="font-medium text-gray-900">
                                            Bonne
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-2 grid grid-cols-2">
                                <div className="flex gap-x-3 p-2 bg-gray-200 rounded">
                                    <div className="flex h-6 items-center">
                                        <input
                                            id="Moyenne"
                                            value="Moyenne"
                                            name="moyenne"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            onChange={(e) => setData({ ...data, courtoisie_personnel: e.target.value })}
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="Moyenne" className="font-medium text-gray-900">
                                            Moyenne
                                        </label>
                                    </div>
                                </div>
                                <div className="flex gap-x-3 mx-4 p-2 bg-gray-200 rounded">
                                    <div className="flex h-6 items-center">
                                        <input
                                            id="Mauvaise"
                                            value="Mauvaise"
                                            name="Mauvaise"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            onChange={(e) => setData({ ...data, courtoisie_personnel: e.target.value })}
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="Mauvaise" className="font-medium text-gray-900">
                                            Mauvaise
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                    <div className="mt-4 mx-4 border-b border-gray-900/10 pb-5">
                        <fieldset>
                            <legend className="text-sm font-semibold leading-6 text-gray-900">Avez-vous rencontré des difficultés lors de l'enregistrement ?</legend>
                            <div className="mt-2 grid grid-cols-2">
                                <div className="flex gap-x-3 p-2 bg-gray-200 rounded">
                                    <div className="flex h-6 items-center">
                                        <input
                                            checked={CheckedItems.difficulte_oui}
                                            onClick={handleChange}
                                            onChange={(e) => setData({ ...data, difficulte: e.target.value })}
                                            disabled={CheckedItems.difficulte_non}
                                            id="difficulte_oui"
                                            value="Oui"
                                            name="difficulte_oui"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"

                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="difficulte_oui" className="font-medium text-gray-900">
                                            Oui
                                        </label>
                                    </div>
                                </div>
                                <div className="flex gap-x-3 mx-4 p-2 bg-gray-200 rounded">
                                    <div className="flex h-6 items-center">
                                        <input
                                            checked={CheckedItems.difficulte_non}
                                            onClick={handleChange}
                                            onChange={(e) => setData({ ...data, difficulte: e.target.value })}
                                            disabled={CheckedItems.difficulte_oui}
                                            id="difficulte_non"
                                            value="Non"
                                            name="difficulte_non"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="difficulte_non" className="font-medium text-gray-900">
                                            Non
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                    <div className="mt-4 mx-4 border-b border-gray-900/10 pb-5">
                        <fieldset>
                            <legend className="text-sm font-semibold leading-6 text-gray-900">Si oui, Veuillez préciser :</legend>
                            <div class="mt-2">
                                <textarea id="explication_difficulte"
                                    name="explication_difficulte"
                                    rows="3"
                                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-gray-200"
                                    onChange={(e) => setData({ ...data, explication_difficulte: e.target.value })}
                                >

                                </textarea>
                            </div>
                        </fieldset>
                    </div>
                </section>
                <section>
                    <div className='space'>
                        <br />
                    </div>
                    <div className='info-generales'>
                        <h2>SERVICES ET COMMODITES</h2>
                    </div>
                    <div className='mt-4 mx-5'>
                        <p className='mt-8'>S'il fallait noter de 1 à 4, les différents services additionnels</p>
                        <small className='text-xs text-gray-700'>(La note 1 exprime un très faible dégré de satisfaction, la note 4 reflète un haut dégré de satisfaction)</small>
                    </div>
                    <div class="bg-white px-6 border-b border-gray-900/10 pb-3">
                        <fieldset>
                            <legend class="text-sm font-semibold leading-6 text-gray-900 pt-4">Salon Business :</legend>
                            <div className="mt-4 grid grid-cols-4">
                                <div class="flex items-center mb-4">
                                    <input type="checkbox" id="note1" name="note" value="1" class="mr-2"
                                        onChange={(e) => setData({ ...data, note_salon_business: e.target.value })}
                                    />
                                    <label for="note1" class="text-gray-700">1</label>
                                </div>
                                <div class="flex items-center mb-4">
                                    <input type="checkbox" id="note2" name="note" value="2" class="mr-2"
                                        onChange={(e) => setData({ ...data, note_salon_business: e.target.value })}
                                    />
                                    <label for="note2" class="text-gray-700">2</label>
                                </div>
                                <div class="flex items-center mb-4">
                                    <input type="checkbox" id="note3" name="note" value="3" class="mr-2"
                                        onChange={(e) => setData({ ...data, note_salon_business: e.target.value })}
                                    />
                                    <label for="note3" class="text-gray-700">3</label>
                                </div>
                                <div class="flex items-center mb-4">
                                    <input type="checkbox" id="note4" name="note" value="4" class="mr-2"
                                        onChange={(e) => setData({ ...data, note_salon_business: e.target.value })}
                                    />
                                    <label for="note4" class="text-gray-700">4</label>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                    <div class="bg-white px-6 border-b border-gray-900/10 pb-3">
                        <fieldset>
                            <legend class="text-sm font-semibold leading-6 text-gray-900 pt-4">Bagage supplémentaire :</legend>
                            <div className="mt-4 grid grid-cols-4">
                                <div class="flex items-center mb-4">
                                    <input type="checkbox" id="note1" name="note" value="1" class="mr-2"
                                        onChange={(e) => setData({ ...data, note_bagage: e.target.value })}
                                    />
                                    <label for="note1" class="text-gray-700">1</label>
                                </div>
                                <div class="flex items-center mb-4">
                                    <input type="checkbox" id="note2" name="note" value="2" class="mr-2"
                                        onChange={(e) => setData({ ...data, note_bagage: e.target.value })}
                                    />
                                    <label for="note2" class="text-gray-700">2</label>
                                </div>
                                <div class="flex items-center mb-4">
                                    <input type="checkbox" id="note3" name="note" value="3" class="mr-2"
                                        onChange={(e) => setData({ ...data, note_bagage: e.target.value })}
                                    />
                                    <label for="note3" class="text-gray-700">3</label>
                                </div>
                                <div class="flex items-center mb-4">
                                    <input type="checkbox" id="note4" name="note" value="4" class="mr-2"
                                        onChange={(e) => setData({ ...data, note_bagage: e.target.value })}
                                    />
                                    <label for="note4" class="text-gray-700">4</label>
                                </div>
                            </div>
                        </fieldset>
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
                    <div className="mt-4 mx-4 border-b border-gray-900/10 pb-5">
                        <fieldset>
                            <legend className="text-sm font-semibold leading-6 text-gray-900">Souhaitez-vous recevoir des informations sur nos services additionnels (bagages, salon, etc.) ?</legend>
                            <div className="mt-2 grid grid-cols-2">
                                <div className="flex gap-x-3 p-2 bg-gray-200 rounded">
                                    <div className="flex h-6 items-center">
                                        <input
                                            checked={CheckedItems.infos_oui}
                                            onClick={handleChange}
                                            onChange={(e) => setData({ ...data, recevoir_service: e.target.value })}
                                            disabled={CheckedItems.infos_non}
                                            id="infos_oui"
                                            value="Oui"
                                            name="infos_oui"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"

                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="infos_oui" className="font-medium text-gray-900">
                                            Oui
                                        </label>
                                    </div>
                                </div>
                                <div className="flex gap-x-3 mx-4 p-2 bg-gray-200 rounded">
                                    <div className="flex h-6 items-center">
                                        <input
                                            checked={CheckedItems.infos_non}
                                            onClick={handleChange}
                                            onChange={(e) => setData({ ...data, acceuil_agence: e.target.value })}
                                            disabled={CheckedItems.infos_oui}
                                            id="infos_non"
                                            value="Non"
                                            name="infos_non"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="infos_non" className="font-medium text-gray-900">
                                            Non
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