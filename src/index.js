import React  from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Details from './pages/Details/Details'
import Login from './pages/Login/index.js'
import SignUp from './pages/CreateUser';
import FormStore from './pages/CreateStore/FormStore';
import EditStore from './pages/EditStore/FormStore';
import Footer from './pages/Footer/Footer';
import Navbar from './pages/Navbar/Navbar';
import IndexStores from './pages/StoresIndex/IndexStores';
import EditUser from './pages/EditUser/index';
import ViewUser from './pages/ViewUser/ViewUser';
import LoginRegister from './pages/LoginRegister/LoginRegister';
import ReservedProducts from './pages/ReservedProducts/ReservedProducts';
import Users from './pages/Users/Users';

import reportWebVitals from './reportWebVitals';
import { Routes, Route, BrowserRouter} from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';

import AuthContextProvider from './contexts/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css"
    />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
    />
    <div className='flex flex-col h-screen justify-between'>
      
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/signinup/:mode' element={<LoginRegister/>}/>
        <Route path='/details/:id' element={<Details />} />
        <Route path='/viewuser/:id' element={<ViewUser />} />
        <Route path='/editstore/:id' element={<EditStore />} />
        <Route path='/newstore' element={<FormStore />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/index' element={<IndexStores />} />
        <Route path='/edituser/:id' element={<EditUser />} />
        <Route path='/landingpage' element={<LandingPage />} />
        <Route path='/reservedproducts/:userId' element={<ReservedProducts />} />
        <Route path='/users' element={<Users />}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
    </div>
  </React.StrictMode>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
