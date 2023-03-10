import React, { useState, useEffect } from "react";
import { Formik, Form } from 'formik';
import Title from './components/title';
import axios from 'axios';

const FormReserveProduct = (props) => {
  const storeId = props.storeId;
  const dataProduct = props.dataProduct;
  const ownerId = props.ownerId;
  const clientId = props.clientId;
  const [data, setData] = useState({
    id: dataProduct.id,
    name: dataProduct.name,
    description: dataProduct.description,
    price: dataProduct.price,
    category: dataProduct.category,
    stock: dataProduct.stock,
  });
  useEffect(() => {
    if (dataProduct.id!=null){
      setData(dataProduct);
    }
  }, [dataProduct]);
  return (
    <Formik
      initialValues={{
        stock: data.stock,
      }}
      onSubmit={values => {
        if (dataProduct.id!=null){
          axios.put(
            `${process.env.REACT_APP_SERVER_URL}/product/reserve/${dataProduct.id}`)
            .then(res => {
              if (res.status === 200){
                console.log('Product successfully updated');
                // navigate(`../details/${storeId}`);
                axios.post(
                  `${process.env.REACT_APP_SERVER_URL}/rproducts/reserve/${clientId}/${ownerId}/${storeId}/${dataProduct.id}`)
                  .then(res => {
                    if (res.status === 200){
                      console.log('Product successfully reserved');
                    }}).catch(err => console.log('Something went wrong'))
                    ;
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
            <Title text='Reservar Producto' />
            <div className="p-4 pb-6">
              <div className="p-2 bg-blue-500 text-white rounded">
                <p className="bg-blue-600 p-2 text-lg font-medium rounded">{data.name}</p>
                <p className="p-2">{data.description}</p>
                <p className="p-2">{data.category}</p>
                <p className="p-2">${data.price} CLP</p>
              </div>
              <div className="p-3 py-2 mt-2 "><p className="inline p-1 font-medium text-xl">{data.stock}</p>Productos Disponibles</div>
            </div>
            
            <div className='flex justify-center'>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 border border-blue-700 rounded cursor-pointer" type='submit'>
                    Reservar
                </button>
            </div>
        </Form>
      )}
    </Formik>
  )
}

export default FormReserveProduct;