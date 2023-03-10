import React from 'react';
import { Formik, Form } from 'formik';
import { useNavigate, Navigate} from 'react-router-dom';
import TextField from './components/TextField';
import TextArea from './components/TextArea';
import Title from './components/title';
import axios from 'axios';
import * as Yup from 'yup';
import styled from 'styled-components';

const FormStore = () => {
  const navigate = useNavigate();
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
    phone: Yup.number()
      .typeError('* Debe ser un número')
      .integer('* Debe ser un número entero')
      .required('* Obligatorio'),
  })
  if (!localStorage.getItem("currentUser")) {
    window.alert("Debes iniciar sesión");
    return <Navigate to={`../${process.env.REACT_APP_URL}/`}/>
  }
  return (
    <Container>
    <Formik
      initialValues={{
        name: '',
        location: '',
        mail: '',
        schedule: '',
        content: '',
        direction: '',
        phone: '',
      }}
      validationSchema={validate}
      onSubmit={values => {
        // console.log(values);
        // console.log(JSON.parse(localStorage.getItem("currentUser")).id);
        // console.log(process.env.REACT_APP_SERVER_PORT);
        axios.post(
          `${process.env.REACT_APP_SERVER_URL}/stores/create/${JSON.parse(localStorage.getItem("currentUser")).id}`,
          values)
            .then(res => {
              if (res.status === 200){
                console.log('Store successfully edited');
                navigate(`../${process.env.REACT_APP_URL}/details/${res.data.data.id}`);
                // console.log(res.data.data);
              }
              else
              Promise.reject()
              // console.log("a");
            })
            .catch(err => console.log('Something went wrong'))
      }}
    >
      {formik => (
            <div className='flex justify-center py-3'>
            <Form autoComplete='off' className='bg-blue-200 rounded-md flex flex-col shadow-inner shadow-blue-300 py-8 px-6 form-store-U'>
                <Title text='Crear Tienda' />
                <TextField label="Nombre Tienda" name="name" type="text" />
                <TextField label="Ubicación Tienda" name="location" type="text" />
                <TextArea label="Descripción" name="content" type="text" />
                <TextField label="Horario" name="schedule" type="text" />
                <TextField label="Email Contacto" name="mail" type="email" />
                <TextField label="Dirección Contacto" name="direction" type="text" />
                {/* <PhoneInput > */}
                  {/* <div className='relative z-0 px-3 bg-white rounded mb-1 region-phone'>+569</div> */}
                  <TextField label="Teléfono Contacto" name="phone" type="tel" pattern="[0-9]{8}" />
                {/* </PhoneInput> */}
                <div className='flex justify-center'>
                    <button className="py-1.5 bg-blue-600 rounded text-base text-white w-24 hover:bg-blue-700 p-1 mt-2" type='submit'>
                        Crear
                    </button>
                </div>
            </Form>
            </div>
      )}
    </Formik>
    </Container>
  )
}
const Container = styled.div`

`;

const PhoneInput = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
export default FormStore;