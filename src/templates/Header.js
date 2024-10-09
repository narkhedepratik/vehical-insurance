import { Button } from 'bootstrap'
import React from 'react'
import { Link } from 'react-router-dom'
import '../style/Commun.css';

function Header() {
  return (
         <nav className='header-nav'>

            <h1 className='w-25'>Drive any where,<br/>Dont care..!</h1>
            
            <div className='w-75'>
            <Link className="header-btn" to={'about-us'}>About Us</Link>
            <Link className="header-btn"to={'services'}>Our Services</Link>
            <Link className="header-btn" to={'best-for-you'}>Best For You</Link>
            <Link className='header-btn' to={''}>Enquiry</Link>
            <Link className="header-btn" to={'contact-us'}>Contact Us</Link>
            <Link className="header-btn" to={'sign-in'}>Sign-In</Link>
            </div>


         </nav>
  )
}

export default Header