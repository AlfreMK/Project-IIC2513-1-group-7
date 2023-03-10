import React, {useState, useEffect} from 'react';
import { Formik, Form } from 'formik';
import {useParams, useNavigate, Navigate} from 'react-router-dom';
import TextField from './components/TextField';
import TextArea from './components/TextArea';
import Title from './components/title';
import axios from 'axios';
import * as Yup from 'yup';
import {getData} from '../../backendFunctions/functions';
import styled from 'styled-components';
import Navbar from '../Navbar/Navbar';

// https://www.geeksforgeeks.org/how-to-build-a-basic-crud-app-with-node-js-and-reactjs/

const EditUser = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  const [data, setData] = useState({
    name: '',
    nickname: '',
    email: '',
    password: '',
    password_repeat: '',
    newpassword: '',
    newpassword_repeat: '',
    actualpassword: '',
    // cambio_contraseña: false,
    currentUser: localStorage.getItem("currentUser")});
  useEffect(() => {
    let changeData = getData(`/user/id/${id}`);
    changeData.then((json) => {

      if (json){
        json["password"] = "";
        json["password_repeat"] = "";
        json["newpassword"] = "";
        json["newpassword_repeat"] = "";
        json["actualpassword"] = "";
        json["currentUser"] = localStorage.getItem("currentUser");
        setData(json);
      }
    });
  }, []);
  const onTodoChange = (property, value) => {
    // console.log(typeof(value));
    // console.log("property", property);
    // console.log("value", value);
    // if (property === "cambio_contraseña"){
    //   setData(prev => ({...prev, [property]: value}));
    // }
    setData(prev => ({...prev, [property]: value}));
  }
  // console.log(data.password, "pass");
  const validate = Yup.object({
    name: Yup.string()
      .max(20, '* Debe ser de 20 caracteres o menos')
      .min(4, '* Debe ser de 4 caracteres o más')
      .required('* Obligatorio'),
      nickname: Yup.string()
      .min(5, '* Debe ser de 4 caracteres o más')
      .required('* Obligatorio'),
      email: Yup.string().required(' *Obligatorio').email('Debe ser un correo valido'),
      password: Yup.string()
      .min(5, '* Debe ser de 6 caracteres o más')
      .required('* Obligatorio')
      .oneOf([Yup.ref("password_repeat")], "Las contraseñas no coinciden"),
      password_repeat: Yup.string()
      .min(5, '* Debe ser de 6 caracteres o más')
      .required('* Obligatorio')
      .oneOf([Yup.ref("password")], "Las contraseñas no coinciden"),
  });

  const validate_cambio_contraseña = Yup.object({
      newpassword: Yup.string()
      .min(5, '* Debe ser de 6 caracteres o más')
      .required('* Obligatorio')
      .oneOf([Yup.ref("newpassword_repeat")], "Las contraseñas no coinciden"),
      newpassword_repeat: Yup.string()
      .min(5, '* Debe ser de 6 caracteres o más')
      .required('* Obligatorio')
      .oneOf([Yup.ref("newpassword")], "Las contraseñas no coinciden"),
      actualpassword: Yup.string()
      .required('* Obligatorio')
  });

  if (!localStorage.getItem("currentUser")) {
    window.alert("Debes iniciar sesión");
	  return <Navigate to={`${process.env.REACT_APP_URL}/`}/>
  }
  return (
    <Container>
    <Formik
      initialValues={{ 
        name: data.name,
        nickname: data.nickname,
        email: data.email,
        password: data.password,
        password_repeat: data.password_repeat,
        // cambio_contraseña: data.cambio_contraseña,
      }}
      enableReinitialize={true}
      validationSchema={validate}
      onSubmit={() => {
        // onTodoChange("cambio_contraseña", false);
        // setData(["cambio_contraseña"] true});
        // console.log("Data no cambio ", data);
        axios.put(
          `${process.env.REACT_APP_SERVER_URL}/user/edit/id/` +
          id,
          {data, cambio_contra: false})
          .then(res => {
            // console.log(res.data);
            // console.log("Respuesta");
            // console.log("reres");
            if (res.status === 200){
              // console.log(localStorage.getItem("currentUser"));
              console.log('User successfully edited');
              navigate(`../${process.env.REACT_APP_URL}/index`);
            }
            // else if(res.status === 400){
            //   console.log(res.data);
            //   console.log("uwu");
            // }
            // else{}
            else{Promise.reject()}
            })
            .catch(err => {
              // console.log(err);
              if (err.response.data.error === "Contraseñas no coinciden"){
                window.alert("Contraseña incorrecta")
              } else {
              window.alert("Ocurrió un error")}});
          }}
          >
      {formik => (
        <div className='flex justify-center py-3'>
            <Form autoComplete='off' className='bg-blue-200 rounded-md flex flex-col shadow-inner shadow-blue-300 py-8 px-6 form-edit-user'>
                <Title text='Editar Usuario' />
                <TextField label="Nombre Usuario" name="name" type="text" value={data.name} onChange={e => onTodoChange("name", e.target.value)}/>
                <TextField label="Usuario" name="nickname" type="text" value={data.nickname} onChange={e => onTodoChange("nickname", e.target.value)}/>
                <TextField label="Correo" name="email" type="email" value={data.email} onChange={e => onTodoChange("email", e.target.value)}/>
                <TextField label="Contraseña" name="password" type="password" value={data.password} onChange={e => onTodoChange("password", e.target.value)}/>
                <TextField label="Repetir contraseña" name="password_repeat" type="password" value={data.password_repeat} onChange={e => onTodoChange("password_repeat", e.target.value)}/>
                <div className='flex justify-center'>
                    <button className="py-1.5 bg-blue-600 rounded text-base text-white w-24 hover:bg-blue-700 p-1 mt-2" type='submit'>
                        Editar
                    </button>
                </div>
                
            </Form>
            </div>
      )}
    </Formik>
    <Formik
      initialValues={{ 
        // name: data.name,
        // nickname: data.nickname,
        // email: data.email,
        // password: data.password,
        // password_repeat: data.password_repeat,
        newpassword: data.newpassword,
        newpassword_repeat: data.newpassword_repeat,
        actualpassword: data.actualpassword,
        // cambio_contraseña: data.cambio_contraseña
      }}
      enableReinitialize={true}
      validationSchema={validate_cambio_contraseña}
      // onTodoChange
      onSubmit={() => {
        // console.log("oli");
        // console.log(data);
        // setData({"cambio_contraseña": true});
        // onTodoChange("cambio_contraseña", true);
        // console.log("DATA cambio", data);
        axios.put(
          `${process.env.REACT_APP_SERVER_URL}/user/edit/id/` +
          id,
          {data, cambio_contra: true})
          .then(res => {
            // console.log(res.data);
            // console.log("Respuesta");
            // console.log("reres");
            if (res.status === 200){
              // console.log(localStorage.getItem("currentUser"));
              console.log('User successfully edited');
              // if
              navigate(`../${process.env.REACT_APP_URL}/index`);
            }
            // else if(res.status === 400){
            //   console.log(res.data);
            //   console.log("uwu");
            // }
            // else{}
            Promise.reject()
            })
            .catch(err => {
              console.log(err);
              if (err.response.data.error == "Contraseñas no coinciden"){
                window.alert("Contraseña incorrecta")
              } else {
              window.alert("Ocurrió un error")}});
        //   }}
      }}
          >
      {formik => (
        <div className='flex justify-center py-3'>
            <Form autoComplete='off' className='bg-blue-200 rounded-md flex flex-col shadow-inner shadow-blue-300 py-8 px-6 form-edit-user'>
                <Title text='¿Deseas cambiar la contraseña?' />
                <TextField label="Nueva Contraseña" name="newpassword" type="password" value={data.newpassword} onChange={e => onTodoChange("newpassword", e.target.value)}/>
                <TextField label="Repetir contraseña" name="newpassword_repeat" type="password" value={data.newpassword_repeat} onChange={e => onTodoChange("newpassword_repeat", e.target.value)}/>
                <TextField label="Contraseña Actual" name="actualpassword" type="password" value={data.actualpassword} onChange={e => onTodoChange("actualpassword", e.target.value)}/>
                <div className='flex justify-center'>
                    <button className="py-1.5 bg-blue-600 rounded text-base text-white w-24 hover:bg-blue-700 p-1 mt-2" type='submit'>
                        Cambiar Contraseña
                    </button>
                </div>
                
            </Form>
            </div>
      )}
    </Formik>
    <div className='flex justify-center py-3'>
      <div className='flex justify-center border border-red-500 text-center bg-blue-200 rounded-md flex flex-col shadow-inner shadow-blue-300 py-8 px-6 '>
        <p className='text-lg'>¿Eliminar Usuario?</p>
        <p className='text-lg'>No hay vuelta atrás</p>
        <div className='flex justify-center mt-2'>
          <button 
          className="py-1.5 bg-white border-2 border-red-500 rounded text-base text-red-500 w-24 hover:bg-red-500 hover:text-white p-1 mt-2"
          onClick={() => {
            axios.delete(
              `${process.env.REACT_APP_SERVER_URL}/user/delete/id/` +
              id)
              .then(res => {
                if (res.status === 200){
                  console.log('User successfully deleted');
                  // localStorage.setItem('userid', JSON.stringify());
                  localStorage.removeItem("currentUser");
                  localStorage.removeItem("userToken");
                  localStorage.setItem('isLoggedIn', JSON.stringify(false));
                  window.dispatchEvent(new Event("thereHasBeenALogin"));
                  navigate(`../${process.env.REACT_APP_URL}/`);
                  }
                  else
                  Promise.reject()
                })
                .catch(err => console.log('Something went wrong'));
          }}>
              Eliminar Usuario
          </button>
        </div>
      </div>
    </div>
  </Container>
  )
}
const Container = styled.div`

`;
export default EditUser;