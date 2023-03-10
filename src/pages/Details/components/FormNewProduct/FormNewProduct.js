import React from 'react';
import { Formik, Form, Field } from 'formik';
import {useParams, useNavigate} from 'react-router-dom';
import TextField from './components/TextField';
import TextArea from './components/TextArea';
import Title from './components/title';
import axios from 'axios';
import * as Yup from 'yup';
import {getData} from '../../../../backendFunctions/functions'

const FormNewProduct = (props) => {
  const storeId = props.storeId;
  const validate = Yup.object({
    name: Yup.string()
      .max(20, '* Debe ser de 20 caracteres o menos')
      .min(4, '* Debe ser de 4 caracteres o más')
      .required('* Obligatorio'),
    description: Yup.string()
      .min(5, '* Debe ser de 5 caracteres o más')
      .required('* Obligatorio'),
    price: Yup.number()
      .positive('* Debe ser un número positivo')
      .typeError('* Debe ser un número')
      .required('* Obligatorio'),
    stock: Yup.number()
      .positive('* Debe ser un número positivo')
      .typeError('* Debe ser un número')
      .required('* Obligatorio'),
  })
  return (
    <Formik
      initialValues={{
        name: '',
        description: '',
        price: '',
        category: 'Plato del dia',
        stock: '',
      }}
      validationSchema={validate}
      onSubmit={values => {
        axios.post(
          `${process.env.REACT_APP_SERVER_URL}/product/create/` + storeId,
          values)
            .then(res => {
              if (res.status === 200){
                console.log('Product successfully created');
                // navigate(`../details/${storeId}`);
                window.dispatchEvent(new Event("productsHasBeenUpdated"));
              }
              else
              Promise.reject()
            })
            .catch(err => console.log('Something went wrong'))
      }}
    >
      {formik => (
            <Form autoComplete='off' >
                <Title text='Nuevo Producto' />
                <TextField label="Nombre Producto" name="name" type="text" />
                <TextField label="Descripción" name="description" type="text" />
                <TextField label="Precio" name="price" type="number" />
                <Field label="Categoría" as="select" name="category" className="w-full pt-4 pb-4 px-2 rounded select-input ">
                  <option value="Plato del dia">Plato del Día</option>
                  <option value="Sandwiches">Sandwiches</option>
                  <option value="Ensaladas">Ensaladas</option>
                  <option value="Wraps">Wraps</option>
                  <option value="Postres">Postres</option>
                  <option value="Vegetariano">Veggie</option>
                  <option value="Pastas">Pastas</option>
                </Field>
                <TextField label="Cantidad Stock" name="stock" type="number" />
                <div className='flex justify-center'>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 border border-blue-700 rounded cursor-pointer" type='submit'>
                        Agregar
                    </button>
                </div>
            </Form>
      )}
    </Formik>
  )
}

export default FormNewProduct;