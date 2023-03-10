import React from 'react';
import './index.css';
import Title from './components/Title/title';
// import Label from './components/Label/label';
// import Input from './components/Input/input';
import TextField from './components/TextField';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import styled from 'styled-components';

const SignUp = () => {
    const navigate = useNavigate();
    const validate = Yup.object({
        name: Yup.string()
        .max(20, '* Debe ser de 20 caracteres o menos')
        .min(4, '* Debe ser de 4 caracteres o más')
        .required('* Obligatorio'),
        nickname: Yup.string()
        .min(5, '* Debe ser de 4 caracteres o más')
        .required('* Obligatorio'),
        email: Yup.string().required(' *Obligatorio').email('* Debe ser un correo válido'),
        password: Yup.string()
        .min(5, '* Debe ser de 6 caracteres o más')
        .required('* Obligatorio')
        .oneOf([Yup.ref("password_repeat")], "* Las contraseñas no coinciden"),
        password_repeat: Yup.string()
        .min(5, '* Debe ser de 6 caracteres o más')
        .required('* Obligatorio')
        .oneOf([Yup.ref("password")], "* Las contraseñas no coinciden"),
        // direction: Yup.string()
        // .min(5, '* Debe ser de 5 caracteres o más')
        // .required('* Obligatorio'),
        // phone: Yup.string()
        // .min(8, '* Debe ser de 8 dígitos')
        // .max(8, '* Debe ser de 8 dígitos')
        // .required('* Obligatorio'),
    })

    return (
      <Container className=""> 
        <Formik
          initialValues={{
            name: '',
            nickname: '',
            email: '',
            password: '',
            password_repeat: '',
          }}
          validationSchema={validate}
          onSubmit={values => {
            const nickname = values.nickname;
            // console.log(nickname);
            // const response = axios.get(`${process.env.REACT_APP_SERVER_URL}/users`, JSON.stringify({nickname}));
            // console.log(response.data.data.nickname);
            // console.log(response);
            axios.post(
              `${process.env.REACT_APP_SERVER_URL}/user/create`,
              values)
                .then(res => {
                  // console.log(res);
                  if (res.status === 200){
                    console.log('User successfully created');
                    navigate(`../${process.env.REACT_APP_URL}/index`);
                    //console.log(res.data.data.id);
                    // localStorage.setItem("currentUser", JSON.stringify(res.data.user));
                    // localStorage.setItem("userToken", res.data.token);
                    localStorage.setItem("currentUser", JSON.stringify(res.data));
                    localStorage.setItem("userToken", res.data.token);
                    // localStorage.setItem('userid', JSON.stringify(res.data.data.id)); // aca el 2do data era el user
                    localStorage.setItem('isLoggedIn', JSON.stringify(true));
                    // console.log(localStorage.getItem("currentUser"));
                    // console.log(localStorage.getItem("userToken"));
                    window.dispatchEvent(new Event("thereHasBeenALogin"));
                    //localStorage.setItem('user', JSON.stringify(res.data.data));
                    //console.log(localStorage.getItem('user'));
                  }
                  // else if(res.status === 400){
                  //   console.log(res.data);
                  //   console.log(res.err);
                  //   console.log(res);
                  //   console.log("error");
                  //   console.log(res.data.error);
                  //   //username en uso
                  //   // console.log("holi")
                  // }
                  else{Promise.reject()}
                })
                .catch(err => {
                  // console.log(err);
                  if (err.response.data.error === "Username en uso"){
                    window.alert("Ya existe ese usuario")
                  }
                  else if (err.response.data.error === "Contraseñas no coinciden"){
                    window.alert("Contraseñas no coinciden")
                  } else {
                  window.alert("Ocurrió un error")}});
          }}
        >
          {formik => (
                <Form autoComplete='off' className=''>
                    <Title text='Registrarse' className="font-bold"/>
                    <TextField label="Nombre" name="name" type="text" />
                    <TextField label="Nombre Usuario" name="nickname" type="text" />
                    <TextField label="Correo" name="email" type="email" />
                    <TextField label="Contraseña" name="password" type="password" />
                    <TextField label="Repetir contraseña" name="password_repeat" type="password" />
                    <div className='flex justify-center'>
                        <button className="py-2.5 px-10 font-medium shadow-inner shadow bg-blue-600 rounded text-base text-white  hover:bg-blue-700 p-1 mt-2" type='submit'>
                            Registrarse
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

export default SignUp;