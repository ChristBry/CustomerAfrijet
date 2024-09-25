import React, { useEffect, useRef, useState } from 'react'
import '../styles/style.css'
import Header from '../composants/header'
import axios from 'axios'
import countryData from '../composants/country.json';
import { motion } from 'framer-motion'
import { AnimatePresence } from 'framer-motion'

const AgencySurvey = () => {

    const sectionRefs = {
        infos: useRef(null),
        agence: useRef(null),
        services: useRef(null),
    };

    const sections = [
        { label: 'Informations générales', ref: sectionRefs.infos },
        { label: 'Agence', ref: sectionRefs.agence },
        { label: 'Services Afrijet', ref: sectionRefs.services },
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
        destination: '',
        agence: '',
        acceuil_agence: '',
        raison_agence: '',
        satisfaction_agent: '',
        temps_attente: '',
        tarification: '',
        note_programme_fidelite: '',
        note_salon_business: '',
        note_bagage: '',
        note_serviceUM: '',
        note_animal_cabine: '',
        note_animal_soute: '',
        recommandation: ''
    })

    /*CheckedItems permet de selectionner et deselectionner une checkbox en fontion de l'etat d'une autre checkbox avec la fonction 
        handleChange associe */
    const [CheckedItems, setCheckedItems] = useState({
        homme: false,
        femme: false,
        chaleureux: false,
        pas_chaleureux: false,
        proche_de_chez_moi: false,
        pour_plus_conseils: false,
        site_web: false,
        paiement_facile: false,
        attente_oui: false,
        attente_non: false,
        Entre_5minutes: false,
        plus_15minutes: false,
        tarification_oui: false,
        tarification_non: false,
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
        axios.post('https://afrijet.pockethost.io/api/collections/AgenceSurvey/records', data, {
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
                setData('')
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
                <Header />
                <div className='fil_ariane'>
                    <ol className="list-none flex">
                        {sections.map((section, index) => (
                            <li key={index} className="flex items-center">
                                {index > 0 && <span className="text-gray-100 span-fil"> &gt; </span>}
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
                <section ref={sectionRefs.infos} id="informations générales">
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
                            Vers quelle destination voyagez-vous le plus souvent ?
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
                <section ref={sectionRefs.agence} id="agence">
                    <div className='space'>
                        <br />
                    </div>
                    <div className='info-generales'>
                        <h2>Agence</h2>
                    </div>
                    <div className="mx-5 mt-5 sm:col-span-3 border-b border-gray-900/10 pb-5">
                        <label htmlFor="agence" className=" mt-4 block text-sm font-medium leading-6 text-gray-900">
                            Dans quelle agence d'AFRIJET êtes-vous ?
                        </label>
                        <div className="mt-2">
                            <select
                                id="agence"
                                name="agence"
                                className="bg-gray-200 block w-full rounded-md font-medium border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xl sm:text-sm sm:leading-6"
                                onChange={(e) => setData({ ...data, agence: e.target.value })}
                            >
                                <option selected disabled>Veuillez sélectionner votre agence</option>
                                <option>Bata-BSG</option>
                                <option>Brazzaville-Airport</option>
                                <option>Cotonou-COO</option>
                                <option>Cotonou-Airport</option>
                                <option>Douala-Akwa</option>
                                <option>Douala-Airport</option>
                                <option>Mvengue-Airport</option>
                                <option>Mvengue-FCV</option>
                                <option>Libreville-ADL-GSEZ</option>
                                <option>Libreville-Casino</option>
                                <option>Libreville-Lotus</option>
                                <option>Libreville-Owendo</option>
                                <option>Libreville-Parasolier</option>
                                <option>Libreville-Terminal 2</option>
                                <option>Port Gentil-POG</option>
                                <option>Port Gentil-Airport</option>
                                <option>Pointe Noire-Elais</option>
                                <option>Pointe Noire-Airport</option>
                                <option>Oyem-Airport</option>
                                <option>Oyem-OYE</option>
                                <option>Malabo-Airport</option>
                                <option>Malabo-SSG</option>
                                <option>Principe-Airport</option>
                                <option>Sao Tomé-Airport</option>
                                <option>Sao Tomé-TMS</option>
                                <option>Malabo-Airport</option>
                                <option>Yaoundé-Elysée</option>
                                <option>Yaoundé-Airport</option>
                            </select>
                        </div>
                    </div>
                    <div className="mt-4 mx-4 border-b border-gray-900/10 pb-5">
                        <fieldset>
                            <legend className="text-sm font-semibold leading-6 text-gray-900">Comment jugez-vous l'acceuil au sein de nos agences ?</legend>
                            <div className="mt-2 grid grid-cols-2">
                                <div className="flex gap-x-3 p-2 bg-gray-200 rounded">
                                    <div className="flex h-6 items-center">
                                        <input
                                            checked={CheckedItems.chaleureux}
                                            onClick={handleChange}
                                            onChange={(e) => setData({ ...data, acceuil_agence: e.target.value })}
                                            disabled={CheckedItems.pas_chaleureux}
                                            id="chaleureux"
                                            value="chaleureux"
                                            name="chaleureux"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"

                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="chaleureux" className="font-medium text-gray-900">
                                            Chaleureux
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
                                            id="pas_chaleureux"
                                            value="pas chaleureux"
                                            name="pas_chaleureux"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="pas_chaleureux" className="font-medium text-gray-900">
                                            Pas Chaleureux
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                    <div className="mt-4 mx-5 border-b border-gray-900/10 pb-5">
                        <fieldset>
                            <legend className="text-sm font-semibold leading-6 text-gray-900">Pourquoi choisissez-vous de vous rendre en agence ?</legend>
                            <div className="mt-2 grid grid-cols-2">
                                <div className="flex gap-x-3 p-2 bg-gray-200 rounded">
                                    <div className="flex h-6 items-center">
                                        <input
                                            id="proche_de_chez_moi"
                                            value="proche de chez moi"
                                            name="proche_de_chez_moi"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            onChange={(e) => setData({ ...data, raison_agence: e.target.value })}
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="proche_de_chez_moi" className="font-medium text-gray-900">
                                            Proche de chez moi
                                        </label>
                                    </div>
                                </div>
                                <div className="flex gap-x-3 mx-4 p-2 bg-gray-200 rounded">
                                    <div className="flex h-6 items-center">
                                        <input
                                            id="pour_plus_conseils"
                                            value="pour plus de conseils"
                                            name="pour_plus_conseils"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            onChange={(e) => setData({ ...data, raison_agence: e.target.value })}
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="pour_plus_conseils" className="font-medium text-gray-900">
                                            Pour plus de conseils
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-2 grid grid-cols-2">
                                <div className="flex gap-x-3 p-2 bg-gray-200 rounded">
                                    <div className="flex h-6 items-center">
                                        <input
                                            id="site_web"
                                            value="effectuer le paiement"
                                            name="site_web"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            onChange={(e) => setData({ ...data, raison_agence: e.target.value })}
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="site_web" className="font-medium text-gray-900">
                                            J'ai utilisé le site web et je veux payer
                                        </label>
                                    </div>
                                </div>
                                <div className="flex gap-x-3 mx-4 p-2 bg-gray-200 rounded">
                                    <div className="flex h-6 items-center">
                                        <input
                                            id="paiement_facile"
                                            value="paiement facile"
                                            name="paiement_facile"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            onChange={(e) => setData({ ...data, raison_agence: e.target.value })}
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="paiement_facile" className="font-medium text-gray-900">
                                            Le paiement est facile
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                    <div className="mt-4 mx-5 border-b border-gray-900/10 pb-5">
                        <fieldset>
                            <legend className="text-sm font-semibold leading-6 text-gray-900">L'agent qui vous a recu était-il à votre écoute et a-t-il répondu à vos attentes ?</legend>
                            <div className="mt-2 grid grid-cols-2">
                                <div className="flex gap-x-3 p-3 bg-gray-200 rounded">
                                    <div className="flex h-6 items-center">
                                        <input
                                            checked={CheckedItems.attente_oui}
                                            onClick={handleChange}
                                            disabled={CheckedItems.attente_non}
                                            id="attente_oui"
                                            value="attente satisfait"
                                            name="attente_oui"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            onChange={(e) => setData({ ...data, satisfaction_agent: e.target.value })}
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="attente_oui" className="font-medium text-gray-900">
                                            Oui
                                        </label>
                                    </div>
                                </div>
                                <div className="flex gap-x-3 mx-4 p-3 bg-gray-200 rounded">
                                    <div className="flex h-6 items-center">
                                        <input
                                            checked={CheckedItems.attente_non}
                                            onClick={handleChange}
                                            disabled={CheckedItems.attente_oui}
                                            id="attente_non"
                                            value="attente non satisfait"
                                            name="attente_non"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            onChange={(e) => setData({ ...data, satisfaction_agent: e.target.value })}
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="attente_non" className="font-medium text-gray-900">
                                            Non
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                    <div className="mt-4 mx-5 border-b border-gray-900/10 pb-5">
                        <fieldset>
                            <legend className="text-sm font-semibold leading-6 text-gray-900">Votre temps d'attente avant votre prise en charge par un agent était :</legend>
                            <div className="mt-2 grid grid-cols-2">
                                <div className="flex gap-x-3 p-3 bg-gray-200 rounded">
                                    <div className="flex h-6 items-center">
                                        <input
                                            checked={CheckedItems.Entre_5minutes}
                                            onClick={handleChange}
                                            disabled={CheckedItems.plus_15minutes}
                                            id="Entre_5minutes"
                                            value="entre 5 et 15 minutes"
                                            name="Entre_5minutes"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            onChange={(e) => setData({ ...data, temps_attente: e.target.value })}
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="Entre_5minutes" className="font-medium text-gray-900">
                                            Entre 5 et 15 minutes
                                        </label>
                                    </div>
                                </div>
                                <div className="flex gap-x-3 mx-4 p-3 bg-gray-200 rounded">
                                    <div className="flex h-6 items-center">
                                        <input
                                            checked={CheckedItems.plus_15minutes}
                                            onClick={handleChange}
                                            disabled={CheckedItems.Entre_5minutes}
                                            id="plus_15minutes"
                                            value="plus de 15 minutes"
                                            name="plus_15minutes"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            onChange={(e) => setData({ ...data, temps_attente: e.target.value })}
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="plus_15minutes" className="font-medium text-gray-900">
                                            Plus de 15 minutes
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                    <div className="mt-4 mx-5 border-b border-gray-900/10 pb-5">
                        <fieldset>
                            <legend className="text-sm font-semibold leading-6 text-gray-900">Etes-vous satisfait du choix du vendeur sur la tarification de votre billet ?</legend>
                            <div className="mt-2 grid grid-cols-2">
                                <div className="flex gap-x-3 p-3 bg-gray-200 rounded">
                                    <div className="flex h-6 items-center">
                                        <input
                                            checked={CheckedItems.tarification_oui}
                                            onClick={handleChange}
                                            disabled={CheckedItems.tarification_non}
                                            id="tarification_oui"
                                            value="satisfaire du tarif"
                                            name="tarification_oui"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            onChange={(e) => setData({ ...data, tarification: e.target.value })}
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="tarification_oui" className="font-medium text-gray-900">
                                            Oui
                                        </label>
                                    </div>
                                </div>
                                <div className="flex gap-x-3 mx-4 p-3 bg-gray-200 rounded">
                                    <div className="flex h-6 items-center">
                                        <input
                                            checked={CheckedItems.tarification_non}
                                            onClick={handleChange}
                                            disabled={CheckedItems.tarification_oui}
                                            id="tarification_non"
                                            value="pas satisfaire du tarif"
                                            name="tarification_non"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            onChange={(e) => setData({ ...data, tarification: e.target.value })}
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="tarification_non" className="font-medium text-gray-900">
                                            Non
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                </section>
                <section ref={sectionRefs.infos} id="services afrijet">
                    <div className='space'>
                        <br />
                    </div>
                    <div className='info-generales'>
                        <h2>SERVICES AFRIJET</h2>
                    </div>
                    <div className='mt-4 mx-5'>
                        <p className='mt-8'>S'il fallait noter de 1 à 4, la clarté des explications sur les différents services additionnels</p>
                        <small className='text-xs text-gray-700'>(La note 1 exprime un très faible dégré de satisfaction, la note 4 reflète un haut dégré de satisfaction)</small>
                    </div>
                    <div class="bg-white mt-4 px-6 border-b border-gray-900/10 pb-3">
                        <fieldset>
                            <legend class="text-sm font-semibold leading-6 text-gray-900 pt-4">Programme de fidélité :</legend>
                            <div className="mt-4 grid grid-cols-4">
                                <div class="flex items-center mb-4">
                                    <input type="checkbox" id="note_programme_1" name="note" value="1" class="mr-2"
                                        onChange={(e) => setData({ ...data, note_programme_fidelite: e.target.value })}
                                    />
                                    <label for="note_programme_1" class="text-gray-700">1</label>
                                </div>
                                <div class="flex items-center mb-4">
                                    <input type="checkbox" id="note_programme_2" name="note" value="2" class="mr-2"
                                        onChange={(e) => setData({ ...data, note_programme_fidelite: e.target.value })}
                                    />
                                    <label for="note_programme_2" class="text-gray-700">2</label>
                                </div>
                                <div class="flex items-center mb-4">
                                    <input type="checkbox" id="note_programme_3" name="note" value="3" class="mr-2"
                                        onChange={(e) => setData({ ...data, note_programme_fidelite: e.target.value })}
                                    />
                                    <label for="note_programme_3" class="text-gray-700">3</label>
                                </div>
                                <div class="flex items-center mb-4">
                                    <input type="checkbox" id="note_programme_4" name="note" value="4" class="mr-2"
                                        onChange={(e) => setData({ ...data, note_programme_fidelite: e.target.value })}
                                    />
                                    <label for="note_programme_4" class="text-gray-700">4</label>
                                </div>
                            </div>
                        </fieldset>
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