
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css'
import './App.css';
import Home from './includes/Home';
import DashBoard from './includes/DashBoard';

import AddServiceCenter from './modules/adminservice/AddServiceCenter';
import AddCustomer from './modules/crm/AddCustomer';
import ClaimForm from './modules/agent/ClaimForm';


function App() {
  return (
    <div className="App">
       <BrowserRouter>
           <Routes>
               <Route path='/' element={<Navigate to={'/home'}/>}/>
               <Route path='/home/*' element={<Home/>}/>
               <Route path='/drive-safe/*' element={<DashBoard/>}/>
               <Route path="/edit/:serviceCenterId" element={<AddServiceCenter />} />
               <Route path='/drive-safe/* ' element={<AddCustomer/>}/>
               <Route path='/editcus/:customerId' element={<AddCustomer/>}/>

               <Route path="editClaim/:claimId/"element={<ClaimForm/>}/>
               
              


              
           </Routes>
       </BrowserRouter>
    </div>
  );
}

export default App;
