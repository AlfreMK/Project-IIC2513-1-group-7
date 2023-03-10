import React, {useState, useEffect} from 'react';
import { Formik, Form } from 'formik';
import {useParams, useNavigate , Navigate} from 'react-router-dom';
import TextField from './components/TextField';
import TextArea from './components/TextArea';
import Title from './components/title';
import axios from 'axios';
import * as Yup from 'yup';
import {getData} from '../../backendFunctions/functions'
import styled from 'styled-components';

// https://www.geeksforgeeks.org/how-to-build-a-basic-crud-app-with-node-js-and-reactjs/

const EditStore = () => {
  const navigate = useNavigate();
  
  const {id} = useParams();
  const [data, setData] = useState({
    name: '',
    location: '',
    mail: '',
    schedule: '',
    content: '',
    direction: '',
    phone: '',
    userId: '',});
  useEffect(() => {
    let changeData = getData(`/stores/id/${id}`);
    changeData.then((json) => {
      if (json){
        setData(json);
      }
      });
    }, [id]);
  const onTodoChange = (property, value) => {
    setData(prev => ({...prev, [property]: value}));
  }
  const validate = Yup.object({
    name: Yup.string()
      .max(20, '* Debe ser de 20 caracteres o menos')
      .min(4, '* Debe ser de 4 caracteres o más')
      .required('* Obligatorio'),
    location: Yup.string()
      .min(5, '* Debe ser de 5 caracteres o más')
      .required('* Obligatorio'),
    mail: Yup.string()
      .email('* Email es inválido')
      .required('* Obligatorio'),
    schedule: Yup.string()
      .min(4, '* Debe ser de 4 caracteres o más')
      .required('* Obligatorio'),
    content: Yup.string()
      .min(5, '* Debe ser de 5 caracteres o más')
      .required('* Obligatorio'),
    direction: Yup.string()
      .min(5, '* Debe ser de 5 caracteres o más')
      .required('* Obligatorio'),
    phone: Yup.string()
      .min(8, '* Debe ser de 8 dígitos')
      .max(8, '* Debe ser de 8 dígitos')
      .required('* Obligatorio'),
  });
  // console.log(data);
  if (!localStorage.getItem("currentUser")) {
    window.alert("Debes iniciar sesión");
	  return <Navigate to={`${process.env.REACT_APP_URL}/`}/>
  }
  if (data.userId !== JSON.parse(localStorage.getItem("currentUser")).id){
    if (!JSON.parse(localStorage.getItem("currentUser")).admin){
    return <p> ERROR </p>
  }}
  return (
    <>
    <Container>
    <Formik
      initialValues={{
        name: data.name,
        location: data.location,
        mail: data.mail,
        schedule: data.schedule,
        content: data.content,
        direction: data.direction,
        phone: data.phone,
      }}
      enableReinitialize={true}
      validationSchema={validate}
      onSubmit={() => {
        axios.put(
          `${process.env.REACT_APP_SERVER_URL}/stores/edit/id/` +
          id,
          data)
          .then(res => {
            if (res.status === 200){
              console.log('Store successfully edited');
              navigate(`${process.env.REACT_APP_URL}/details/${id}`);
            }
            else
            Promise.reject()
          })
          .catch(err => console.log('Something went wrong'));
        }}
        >
      {formik => (
        <div className='flex justify-center py-3'>
            <Form autoComplete='off' className='bg-blue-200 rounded-md flex flex-col shadow-inner shadow-blue-300 py-8 px-6 form-store'>
                <Title text='Editar Tienda' />
                <TextField label="Nombre Tienda" name="name" type="text" value={data.name} onChange={e => onTodoChange("name", e.target.value)}/>
                <TextField label="Ubicación Tienda" name="location" type="text" value={data.location} onChange={e => onTodoChange("location", e.target.value)}/>
                <TextArea label="Descripción" name="content" type="text" value={data.content} onChange={e => onTodoChange("content", e.target.value)}/>
                <TextField label="Horario" name="schedule" type="text" value={data.schedule} onChange={e => onTodoChange("schedule", e.target.value)}/>
                <TextField label="Email Contacto" name="mail" type="email" value={data.mail} onChange={e => onTodoChange("mail", e.target.value)}/>
                <TextField label="Dirección Contacto" name="direction" type="text" value={data.direction} onChange={e => onTodoChange("direction", e.target.value)}/>
                <TextField label="Teléfono Contacto" name="phone" type="text" value={data.phone} onChange={e => onTodoChange("phone", e.target.value)}/>
                <div className='flex justify-center'>
                    <button className="py-1.5 bg-blue-600 rounded text-base text-white w-24 hover:bg-blue-700 p-1 mt-2" type='submit'>
                        Editar
                    </button>
                </div>
                
            </Form>
            </div>
      )}
    </Formik>
    <div className='flex justify-center py-3'>
      <div className='flex justify-center border border-red-500 text-center bg-blue-200 rounded-md flex flex-col shadow-inner shadow-blue-300 py-8 px-6 form-store'>
        <p className='text-lg'>¿Eliminar Tienda?</p>
        <p className='text-lg'>No hay vuelta atrás</p>
        <div className='flex justify-center mt-2'>
          <button 
          className="py-1.5 bg-white border-2 border-red-500 rounded text-base text-red-500 w-24 hover:bg-red-500 hover:text-white p-1 mt-2"
          onClick={() => {
            axios.delete(
              `${process.env.REACT_APP_SERVER_URL}/stores/delete/id/` +
              id)
              .then(res => {
                if (res.status === 200){
                  console.log('Store successfully deleted');
                  navigate(`${process.env.REACT_APP_URL}/index`);
                  }
                  else
                  Promise.reject()
                })
                .catch(err => console.log('Something went wrong'));
          }}>
              Eliminar Tienda
          </button>
        </div>
      </div>
    </div>
    </Container>
  </>
  )
}
const Container = styled.div`

`;
export default EditStore;