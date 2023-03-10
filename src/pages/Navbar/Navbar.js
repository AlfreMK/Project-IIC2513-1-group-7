import React, { useState, useEffect, useRef } from "react";
import {Link, useNavigate} from 'react-router-dom';
import styled from "styled-components";
import logo from "../../images/icon.svg";
import pfp from '../../images/users/bojji.jpg';
import SearchBar from "../SearchBar/SearchBar";
import "./index.css";



const Navbar = (props) => {
  const navigate = useNavigate();
  // console.log(JSON.parse(localStorage.getItem("currentUser")).id);
  const [isLogged, setUserLogin] = useState((localStorage.getItem("isLoggedIn") === 'true'));
  const [userId, setUser] = useState();
  const [currentUser, setCurrentUser] = useState();
  const [isAdmin, setIsAdmin] = useState(false);
  const ref = useRef(null);

  let {id} = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser")==="true")
  : "";

  // let {admin} = localStorage.getItem("currentUser")
  // ? JSON.parse(localStorage.getItem("currentUser"))
  // : false;

  useEffect(() => {
    if (profileDropdown){
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          SetProfileDropdown(false);
        }
      }
      // Bind the event listener
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  });
  // console.log(id);

  useEffect(() => {
    if (userId === undefined && id !== undefined) {
      // console.log("oli");
      if (localStorage.getItem("isLoggedIn") === 'true'){
      setCurrentUser(JSON.parse(localStorage.getItem("currentUser")));
      setUser(JSON.parse(localStorage.getItem("currentUser")).id);
      setIsAdmin(JSON.parse(localStorage.getItem("currentUser")).admin);
    }}
    function checkUserData() {
      const item = (localStorage.getItem("isLoggedIn") === 'true');
      // console.log(localStorage.getItem("isLoggedIn"));
      // if (localStorage.getItem("isLoggedIn") === "false"){
      //   console.log("FALSO");
      // }
      // if (!localStorage.getItem("isLoggedIn")){
      //   console.log("FALSO !");
      // }
      if (localStorage.getItem("isLoggedIn") === "true"){
        setUser(JSON.parse(localStorage.getItem("currentUser")).id);
        setCurrentUser(JSON.parse(localStorage.getItem("currentUser")));
        setIsAdmin(JSON.parse(localStorage.getItem("currentUser")).admin);
        setUserLogin(item);
      }
    }
    window.addEventListener('thereHasBeenALogin', checkUserData)
    return () => {
      window.removeEventListener('thereHasBeenALogin', checkUserData)
    }
  }, [userId]);
  const logOut = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("userToken");
    // localStorage.setItem('isLoggedIn', JSON.stringify(false));
    // localStorage.setItem('userid', JSON.stringify());
    localStorage.setItem('isLoggedIn', JSON.stringify(false));
    // console.log(localStorage.getItem("isLoggedIn"));
    setIsAdmin(false);
    setUserLogin(false);
    navigate(`${process.env.REACT_APP_URL}/`);
    window.dispatchEvent(new Event("thereHasBeenALogin"));
  };
  
  const [statedropdown, SetStateDropdown] = useState(false);
  const ActivateDropDown = (param) => {
    SetStateDropdown(!statedropdown);
    // console.log("dropdown");
    };
  const [profileDropdown, SetProfileDropdown] = useState(false);
  const activateProfileDropDown = () => {
    SetProfileDropdown(!profileDropdown);
  }
  // console.log(currentUser);
  
  const show = (statedropdown) ? "navbar-dropdown-active" : "navbar-dropdown " ;
  return (
<nav className="bg-blue-600 border-gray-200 px-2 sm:px-4 shadow-md">
  <div className="container flex flex-wrap justify-between  items-center mx-auto">
    <div className="flex md:order-2 py-2.5  mx-6">
      <div className="hidden relative md:flex mx-4 items-center justify-center">
          <SearchBar/>
      </div>
      <button onClick={event => {event.preventDefault();ActivateDropDown();}} type="button"  className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-200" aria-expanded="false">
        <svg className="w-6 h-6" fill="white" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" ></path></svg>
        <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
      </button>
      {isLogged &&
      <div className="hidden md:block">
        <img className="inline object- w-12 h-12 mr-2 rounded-full border-[2px] border-blue-700 hover:border-sky-500 cursor-pointer"
        onClick={event => {event.preventDefault();activateProfileDropDown()}}
        src={pfp} alt={"userpfp"} 
        />
        <div className="relative">
          <div className={(profileDropdown ? "profile-dropdown-active shadow-md bg-white text-sm rounded-lg mt-2" : "profile-dropdown-inactive")}>
            <div className="flex flex-col" ref={ref}>
                <ViewUser to={`${process.env.REACT_APP_URL}/viewuser/${userId}`} onClick={(event)=>{activateProfileDropDown();}} className="cursor-pointer hover:bg-gray-200 rounded-t-lg p-2">
                  <i className="fas fa-user mx-2 text-gray-600"></i>
                  Perfil</ViewUser>
                <ViewUser to={`${process.env.REACT_APP_URL}/reservedproducts/${userId}`} onClick={(event)=>{activateProfileDropDown();}} className="cursor-pointer hover:bg-gray-200 p-2">
                <i className="fas fa-apple-alt mx-2 text-gray-600"></i>
                Reservas</ViewUser>
                <span className="border border-gray-100"></span>
                <span onClick={event => {event.preventDefault();logOut();}} className="cursor-pointer rounded-b-lg hover:bg-gray-200 w-full px-4 p-2">
                  Cerrar Sesión</span>
            </div>
          </div>
        </div>
      </div>}
    </div>
    <div className={`justify-between py-2.5 items-center  mx-6 w-full md:flex md:w-auto md:order-1 ${show}`}  id="mobile-menu-3">
      <div className="relative mt-3 md:hidden">
        <SearchBar/>
      </div>
      <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
        {!isLogged &&
        <li>
          <span onClick={event => {event.preventDefault();navigate(`${process.env.REACT_APP_URL}/`);}} className="flex mt-1 cursor-pointer text-xl py-2 pr-4 pl-3 text-white rounded md:bg-transparent md:p-0 " aria-current="page"><Image src={logo}></Image> Almuerzos UC</span>
        </li>}
        {isLogged &&
        <li>
          <span onClick={event => {event.preventDefault();navigate(`${process.env.REACT_APP_URL}/index`);}} className="flex mt-1 cursor-pointer text-xl py-2 pr-4 pl-3 text-white rounded md:bg-transparent md:p-0 " aria-current="page"><Image src={logo}></Image> Almuerzos UC</span>
        </li>}
        {!isLogged &&
        <li>
          <LoginRegister to={`${process.env.REACT_APP_URL}/signinup/${1}`} className="block m-2 cursor-pointer pr-4 pl-3 text-white  hover:bg-gray-50 hover:bg-transparent hover:text-gray-400 md:p-0 ">Iniciar Sesión</LoginRegister>
        </li>}
        {!isLogged &&
        <li>
          <LoginRegister to={`${process.env.REACT_APP_URL}/signinup/${2}`} className="block m-2 cursor-pointer pr-4 pl-3 text-white hover:bg-gray-50 hover:bg-transparent hover:text-gray-400 md:p-0 ">Registrarse</LoginRegister>
        </li>}
        {isLogged &&
        <li>
          <NavButton onClick={event => {event.preventDefault();navigate(`${process.env.REACT_APP_URL}/newstore`);}} className="block cursor-pointer bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded">Nueva Tienda</NavButton>
        </li>}
        {isAdmin &&
        <li>
          <NavButton onClick={event => {event.preventDefault();navigate(`${process.env.REACT_APP_URL}/users`);}} className="block cursor-pointer bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded">Usuarios</NavButton>
        </li>}
        {isLogged &&
        <>
        <li>
          <ViewUser to={`${process.env.REACT_APP_URL}/viewuser/${userId}`} className="block m-2 md:hidden cursor-pointer pr-4 pl-3 text-white hover:bg-gray-50 hover:bg-transparent hover:text-gray-400 md:p-0 ">
            Perfil</ViewUser>
        </li>
        <li>
          <ViewUser to={`${process.env.REACT_APP_URL}/reservedproducts/${userId}`} className="block m-2 md:hidden cursor-pointer pr-4 pl-3 text-white hover:bg-gray-50 hover:bg-transparent hover:text-gray-400 md:p-0 ">
            Reservas</ViewUser>
        </li>
        <li>
          <span onClick={event => {event.preventDefault();logOut();}} className="block m-2 md:hidden cursor-pointer pr-4 pl-3 text-white hover:bg-gray-50 hover:bg-transparent hover:text-gray-400 md:p-0 ">
            Cerrar Sesión</span>
        </li>
        </>}
      </ul>
    </div>
  </div>
</nav>

      
  );
};

const NavButton = styled.span`
box-shadow: rgba(255, 255, 255, 0.10) 0px -50px 36px -28px inset;
border: 1px solid rgba(0, 0, 0, 0.40);
&:hover{
  color: rgba(255, 255, 255, 0.80);
}

`
const Image = styled.img`
  height: 30px;
  aspect-ratio: 1;
  filter: invert(100%);
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  margin-right: 7px;

`

const ViewUser = styled(Link)`
`
const LoginRegister = styled(Link)`
`

export default Navbar;
