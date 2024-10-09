import React from 'react'
import Header from '../templates/Header'
import '../style/Commun.css'
import AboutUs from '../templates/AboutUs'
import { Navigate, Route, Routes } from 'react-router-dom'
import OurServices from '../templates/OurServices'
import BestForYou from '../templates/BestForYou'
import ContactUs from '../templates/ContactUs'
import SignIn from '../templates/SignIn'

function Home() {
  return (
    <div>
        <Header/>
        <div className='templates'>
      <Routes>
            <Route path='/' element={<Navigate to={'about-us'}/>} />
            <Route path='about-us' element={<AboutUs/>}/>
            <Route path='services' element={<OurServices/>}/>
            <Route path='best-for-you' element={<BestForYou/>}/>
            <Route path='contact-us' element={<ContactUs/>}/>
            <Route path='sign-in' element={<SignIn/>}/>
      </Routes>
            
        </div>
    </div>
  )
}

export default Home