import React from 'react'
import { Link } from 'react-router-dom'
import '../style/ProfileNav.css'

function ProfileNav() {

       const userJson =localStorage.getItem('user');
        const user =JSON.parse(userJson);

  return (
    <nav className='bg-primary p-2 d-flex justify-content-between'>
        <div className='d-flex '>
         <img src={'data:image/jpeg;base64,'+user.employeeImage} className='profile-img me-4' alt='Image not available'/>
         <div>
         <h1 className='text-white fs-3'>{user.username}</h1>
         <h3 className='text-warning fs-4'>{user.employeeDesignation}</h3>
         </div>
       </div>
       <div>
       <Link to={'/'} className='btn btn-danger'>Sign-out</Link>
       </div>
    </nav>
  )
}

export default ProfileNav