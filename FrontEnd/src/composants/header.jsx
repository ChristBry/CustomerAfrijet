import React from 'react'
import '../styles/style.css'
import logoAfrijet from '../assets/images/Logo.png'

const header = () => {
  return (
    <div className='header'>
        <div className='logo'>
            <img src={logoAfrijet} alt='logo Afrijet'/>
        </div>
        <div className='customer_survey'>
            <h1>Enquête Client</h1>
        </div>
    </div>
  )
}

export default header