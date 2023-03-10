import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from 'formik';
import TextField from './components/TextField';
import Title from './components/title';
import axios from 'axios';
import * as Yup from 'yup';

const FormEditProduct = (props) => {
  const dataProduct = props.dataProduct;
  const [data, setData] = useState({
    id: dataProduct.id,
    name: dataProduct.name,
    description: dataProduct.description,
    price: dataProduct.price,
    category: dataProduct.category,
    stock: dataProduct.stock,
  });
  const onTodoChange = (property, value) => {
    setData(prev => ({...prev, [property]: value}));
  }
  useEffect(() => {
    if (dataProduct.id!=null){
      setData(dataProduct);
    }
  }, [dataProduct]);
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
        name: data.name,
        description: data.description,
        price: data.price,
        category: data.category,
        stock: data.stock,
      }}
      enableReinitialize={true}
      validationSchema={validate}
      onSubmit={values => {
        if (dataProduct.id!=null){
          axios.put(
            `${process.env.REACT_APP_SERVER_URL}/product/edit/id/${dataProduct.id}`,
            values)
            .then(res => {
              if (res.status === 200){
                console.log('Product successfully updated');
                window.dispatchEvent(new Event("productsHasBeenUpdated"));
              }
              else
              Promise.reject()
            })
            .catch(err => console.log('Something went wrong'))}
      }}
    >
      {formik => (
        <Form autoComplete='off'>
            <Title text='Editar Producto' />
            <TextField label="Nombre Producto" name="name" type="text" onChange={e => onTodoChange("name", e.target.value)}/>
            <TextField label="Descripción" name="description" type="text" onChange={e => onTodoChange("description", e.target.value)}/>
            <TextField label="Precio" name="price" type="number" onChange={e => onTodoChange("price", e.target.value)}/>
            <Field label="Categoría" as="select" name="category" onChange={e => onTodoChange("category", e.target.value)} className="w-full pt-4 pb-4 px-2 rounded select-input ">
              <option value="Plato del dia">Plato del Día</option>
              <option value="Sandwiches">Sandwiches</option>
              <option value="Ensaladas">Ensaladas</option>
              <option value="Wraps">Wraps</option>
              <option value="Postres">Postres</option>
              <option value="Vegetariano">Veggie</option>
              <option value="Pastas">Pastas</option>
            </Field>
            <TextField label="Cantidad Stock" name="stock" type="number" onChange={e => onTodoChange("stock", e.target.value)}/>
            <div className='flex justify-center'>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 border border-blue-700 rounded cursor-pointer" type='submit'>
                    Editar
                </button>
            </div>
        </Form>
      )}
    </Formik>
  )
}

export default FormEditProduct;