
import React from 'react'
import ProfileNav from './ProfileNav'
import SideNav from './SideNav'
import AddEmployee from '../modules/adminservice/AddEmployee';
import ViewEmployee from '../modules/adminservice/ViewEmployee';
import AddServiceCenter from '../modules/adminservice/AddServiceCenter';
import ViewServiceSenters from '../modules/adminservice/ViewServiceCenters';
import AppStatastics from '../modules/adminservice/AppStatastics';
import { Route, Routes } from 'react-router-dom';
import AddCustomer from '../modules/crm/AddCustomer';
import ViewCustomers from '../modules/crm/ViewCustomers';

import ClaimForm from '../modules/agent/ClaimForm';
import ViewClaims from '../modules/agent/ViewClaims';
function DashBoard() {

       let userJson=localStorage.getItem('user');
           
       const {employeeDesignation}    =JSON.parse(userJson);

          const appRoutes={
               ADMIN:[
                   {mappingPath:'add-employee',component:<AddEmployee/>},
                   {mappingPath:'view-employee',component:<ViewEmployee/>},
                   {mappingPath:'add-servicecenter', component:<AddServiceCenter/>},
                   {mappingPath:'show-servicecenter',component:<ViewServiceSenters/>},
                   {mappingPath:'app-statastics' ,component:<AppStatastics/>},
                   {mappingPath:'edit-employee/:employeeId' ,component:<AddEmployee/>}

               ],
               CRM:[
                {mappingPath:'add-customer' ,component:<AddCustomer />},
                {mappingPath:'view-customers' ,component:<ViewCustomers/>},
                {mappingPath:'single-customer' ,component:<AddServiceCenter/>}
                
               ],
               AGENT:[
                {mappingPath:'claim-form' ,component:<ClaimForm/>},
                {mappingPath:'view-claim' ,component:<ViewClaims/>},
                {mappingPath:'editClaim/:claimId' ,component:<ClaimForm/>}

               ]

          }

  return (
    <div>

         <ProfileNav/>
       
         <div className='row w-100'>
          <div className='col col-3'>
          <SideNav/>
          </div>
          <div className='col col-9 border border-dark mt-1'>

              <Routes>
              {
                appRoutes[employeeDesignation].map((info,index)=> 
               
                          <Route key={index} path={info.mappingPath} element={info.component}/>)
              
              }
              </Routes>    
          </div>
            
         </div>
    </div>
  )
}

export default DashBoard;