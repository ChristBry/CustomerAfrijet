import React from 'react'
import '../styles/style.css'
import logoAfrijet from '../assets/images/LogoAfrijet.jpg'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const bienvenue = () => {

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

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={variants}
        >
            <div className=''>
                <div className='logo-afrijet'>
                    <img src={logoAfrijet} alt='logo Afrijet' />
                </div>
            </div>
            <section className='welcome-section'>
                <div>
                    <h3 className='mx-4 text-xl'>Quelle type d'enquête voulez-vous effectuer aujourd'hui ?</h3>
                </div>
                <ul className='mt-8 mx-10 options'>
                    <li className='p-3'>
                        <Link className='' to='/agencesurvey'>
                            <i class="fa-solid fa-comments"></i>
                            <span className='mx-3'>Enquête en agence</span>
                            <i class="fa-solid fa-arrow-right mt-1 float-right"></i>
                        </Link>
                    </li>
                    <li className='mt-4 p-3'>
                        <Link className='' to='/enregistrementsurvey'>
                            <i class="fa-solid fa-user-check"></i>
                            <span className='mx-3'>Enquête à l'enregistrement au comptoir</span>
                            <i class="fa-solid fa-arrow-right float-right"></i>
                        </Link>
                    </li>
                    <li className='mt-4 p-3'>
                        <Link className='' to='/experiencesurvey'>
                            <i class="fa-solid fa-plane"></i>
                            <span className='mx-3'>Enquête expérience en vol</span>
                            <i class="fa-solid fa-arrow-right mt-1 float-right"></i>
                        </Link>
                    </li>
                    <li className='mt-4 p-3'>
                        <Link className='' to='/corporatesurvey'>
                            <i class="fa-solid fa-building"></i>
                            <span className='mx-3'>Enquête Entreprise</span>
                            <i class="fa-solid fa-arrow-right mt-1 float-right"></i>
                        </Link>
                    </li>
                </ul>
                <div>




                </div>
            </section>

        </motion.div>
    )
}

export default bienvenue