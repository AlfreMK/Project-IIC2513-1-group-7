import React, {useEffect, useState} from 'react';
import Login from '../Login';
import SignUp from '../CreateUser';
import axios from 'axios';
import {getData} from '../../backendFunctions/functions'
import {useParams, useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import "./loginregister.css"
import "./loginregister.scss"


// https://www.florin-pop.com/blog/2019/03/double-slider-sign-in-up-form/
const LoginRegister = (props) => {
    const {mode} = useParams();
    // const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(mode === "1");
    useEffect(() => {
        setIsLogin(mode === "1");
    }
    , [mode]);
    return (
        <div>
        <div className='flex justify-center items-center mx-4 py-12 hidden md:flex'>
            <Container className={'container-login-register seen-animation ' + (isLogin? "" : "right-panel-active")}>
                <div className={"form-container sign-up-container " + (isLogin? "opacity-0 pointer-events-none" : "")}>
                    <SignUp/>
                </div>
                <div className={"form-container sign-in-container "  + (isLogin? "" : "opacity-0 pointer-events-none")}>
                    <Login/>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1 className='font-bold text-4xl py-2'>Bienvenido!</h1>
                            <div>
                                Si ya tienes una cuenta con nosotros, <p className='font-semibold'>¡Haz Click Abajo!</p>
                            </div>
                            <i className="fas fa-arrow-down my-4 text-2xl"></i>
                            <button className="border-2 border-white rounded-xl p-3 button-animation-1 hover:text-blue-500" onClick={(event) => {event.preventDefault();setIsLogin(true)}}>Iniciar Sesión</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1 className='font-bold text-4xl py-2'>Bienvenido!</h1>
                            <div>Si aún no tienes una cuenta con nosotros, <p className='font-semibold'>¡Haz Click Abajo!</p></div>
                            <i className="fas fa-arrow-down my-4 text-2xl"></i>
                            <button className="border-2 border-white rounded-xl p-3 button-animation-1 hover:text-blue-500" onClick={(event) => {event.preventDefault();setIsLogin(false)}}>Registrarse</button>
                        </div>
                    </div>
                </div>
                
            </Container>
        </div>
        <div className='flex justify-center items-center mx-4 py-12 md:hidden'>
            <div className='container-shadow p-6 py-12 rounded-xl'>
            {(isLogin? <Login/> : <SignUp/>)}
            </div>
        </div>
        </div>
      )
};

const Container = styled.div`
`;

export default LoginRegister;