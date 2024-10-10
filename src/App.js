
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css'
import './App.css';
import Home from './includes/Home';
import DashBoard from './includes/DashBoard';

function App() {
  return (
    <div className="App">
       <BrowserRouter>
           <Routes>
               <Route path='/' element={<Navigate to={'/home'}/>}/>
               <Route path='/home/*' element={<Home/>}/>
               <Route path='/drive-safe/*' element={<DashBoard/>}/>
              
           </Routes>
       </BrowserRouter>
    </div>
  );
}

export default App;
