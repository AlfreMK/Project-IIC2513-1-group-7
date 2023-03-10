import React, {useState} from 'react';
import './Login.css';
import Title from './components/Title/Title';
// import Label from './components/Label/label';
// import Input from './components/Input/input';
import TextField from './components/TextField';
import axios from 'axios';
import {useParams, useNavigate} from 'react-router-dom';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import styled from 'styled-components';

// import { useEffect } from 'react';
const Login = () => {

    const navigate = useNavigate();
    const validate = Yup.object({
      // name: Yup.string()
      // // .max(20, '* Debe ser de 20 caracteres o menos')
      // // .min(4, '* Debe ser de 4 caracteres o más')
      // .required('* Obligatorio'),
      nickname: Yup.string()
      // .min(5, '* Debe ser de 4 caracteres o más')
      .required('* Obligatorio'),
      // mail: Yup.string()
      // .email('* Email es inválido')
      // .required('* Obligatorio'),
      password: Yup.string()
        // .min(5, '* Debe ser de 6 caracteres o más')
        .required('* Obligatorio'),
        // password_repeat: Yup.string()
        // .min(5, '* Debe ser de 6 caracteres o más')
        // .required('* Obligatorio'),
        // direction: Yup.string()
        // .min(5, '* Debe ser de 5 caracteres o más')
        // .required('* Obligatorio'),
        // phone: Yup.string()
        // .min(8, '* Debe ser de 8 dígitos')
        // .max(8, '* Debe ser de 8 dígitos')
        // .required('* Obligatorio'),
      })
      
    
    return (
      <Container>
      <Formik
      initialValues={{
        // name: '',
        nickname: '',
        // correo: '',
        password: '',
        // contraseña_repito: '',
          }}
          validationSchema={validate}
          onSubmit={values => {

              const nickname = values.nickname;
              const password = values.password;
                // axios.get(`${process.env.REACT_APP_SERVER_URL}/user/nickname/` + nickname)
                axios.post(`${process.env.REACT_APP_SERVER_URL}/user/log/`, values)
                .then(res => {
                  if (res.status === 200){
                    localStorage.setItem("currentUser", JSON.stringify(res.data));
                    localStorage.setItem("userToken", res.data.token);
                    localStorage.setItem('isLoggedIn', JSON.stringify(true));
                    window.dispatchEvent(new Event("thereHasBeenALogin"));
                    console.log('User logged in successfully');
                    navigate(`${process.env.REACT_APP_URL}/index`);
                  }
                  else
                  Promise.reject()
                })
                .catch(err => {
                  window.alert(err.response.data.error);});
                  // if (err.response.data.error == "La contraseña no coincide"){
                  //   window.alert("Contraseña incorrecta")
                  // } 
                  // else if (err.response.data.error == "No existe ese usuario"){
                  //   window.alert("No existe ese usuario")
                  // }
                  // else {
                  // window.alert("Ocurrió un error")}});
              }}
        >
          {formik => (
                <Form autoComplete='off' className=''>
                    <Title text='Iniciar Sesión' className="py-2 font-bold" />
                    <TextField label="Usuario" name="nickname" type="text" />
                    <TextField label="Contraseña" name="password" type="password" />
                    <div className='flex justify-center'>
                        <button className="py-2.5 font-medium px-10 shadow-inner shadow bg-blue-600 rounded text-base text-white  hover:bg-blue-700 p-1 mt-2" type='submit'>
                            Ingresar
                        </button>
                    </div>
                </Form>
          )}
        </Formik>
      </Container>
      )
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Login;