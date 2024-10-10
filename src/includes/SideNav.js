import React from 'react'
import { Link } from 'react-router-dom';
import '../style/SideNav.css'

function SideNav() {
     
    let userJson=localStorage.getItem('user');
        const {userType}= JSON.parse(userJson);
  
    const buttons={
        ADMIN:[
              {lable:'Add Employee' ,path:'add-employee'},
              {lable:'View Employees' ,path:'view-employee'},
              {lable:'New Servicecenter' ,path:'add-servicecenter'},
              {lable:'Show Servicecenters' ,path:'show-servicecenter'},
              {lable:'App Statastics' ,path:'app-statastics'}       
        ],
        CRM:[
             {lable:'Add Customer' ,path:'add-customer'},
             {lable:'View Customers', path:'view-customers'},
             {lable:'Show Due Customer' ,path:'due-customer'}
        ],
        AGENT:[

        ]
    }
  return (
    <div className='bg-primary mt-1 btn-container'>
       
       {
        buttons[userType].map((btn,index)=><Link key={index} className='btn btn-dark m-3' to={btn.path}>{btn.lable}</Link>)
       }
        
    </div>
  )
}

export default SideNav