import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import { Formik, Form, ErrorMessage, useField } from 'formik';
import { Heart } from "../../HeartComponent/HeartComponents";
import axios from 'axios';
import * as Yup from 'yup';
import image from '../../../images/stores/quickdeli/quickdeli_biblioteca.jpg';
import "../index.css";
// import data from '../../data.js';

const URatings = (props) => {
  const userId = props.receptorId;
	const [ratingState, setRatingState] = useState(1);
  const [hoverState, setHoverState] = useState(1);
	const [contentState, setContentState] = useState('');
	const validate = Yup.object({
		content: Yup.string(),
		rating: Yup.number(),
	});
	
  const fillHeart = "fas fa-heart mx-0.5";
  const emptyHeart = "far fa-heart mx-0.5";
  return (
		<div className="flex items-center justify-center mt-5 mb-5 " style={{width: "70%"}}>
      <Formik
      initialValues={{
        rating: ratingState,
        content: contentState,
      }}
      enableReinitialize={true}
      validationSchema={validate}
      onSubmit={values => {
        // console.log(values);
        axios.post(
          `${process.env.REACT_APP_SERVER_URL}/uratings/create/${props.receptorId}/${JSON.parse(localStorage.getItem('currentUser')).id}`,
          values)
            .then(res => {
              if (res.status === 200){
                console.log('Rating successfully created');
                // console.log(props.receptorId);
                // console.log(JSON.parse(localStorage.getItem("currentUser")).id);
                window.dispatchEvent(new Event("ucommentsHasBeenUpdated"));
                window.dispatchEvent(new Event("uratingsHasBeenUpdated"));
								setContentState('');
								setRatingState(1);
              }
              else
              Promise.reject()
            })
            .catch(err => console.log('Something went wrong'))
      }}
      >
        {formik => (
          <Form className="w-full bg-white rounded-lg px-4">
            <div className="flex flex-wrap -mx-3 pb-6 pt-2 px-4 justify-between newcomment-container">
              <h2 className="px-4 pt-3 pb-2 text-gray-800 text-lg">Agrega una calificación</h2>
              {/* Calificacion User */}
              <ul className={`flex m-4 cursor-pointer text-blue-500`}>
                <li>
                  <div onClick={event => {event.preventDefault();setRatingState(1);}}>
                  <i className={ratingState >= 1 || hoverState >= 1 ? fillHeart : emptyHeart}></i>
                  </div>
                </li>
                <li>
                  <div onClick={event => {event.preventDefault();setRatingState(2);}}
                  onMouseEnter={event => {event.preventDefault();setHoverState(2);}}
                  onMouseLeave={event => {event.preventDefault();setHoverState(1);}}
                  >
                  <i className={ratingState >= 2 || hoverState >= 2 ? fillHeart : emptyHeart}></i>
                  </div>
                </li>
                <li>
                  <div onClick={event => {event.preventDefault();setRatingState(3);}}
                  onMouseEnter={event => {event.preventDefault();setHoverState(3);}}
                  onMouseLeave={event => {event.preventDefault();setHoverState(1);}}
                  >
                  <i className={ratingState >= 3 || hoverState >= 3 ? fillHeart : emptyHeart}></i>
                  </div>
                </li>
                <li>
                  <div onClick={event => {event.preventDefault();setRatingState(4);}}
                  onMouseEnter={event => {event.preventDefault();setHoverState(4);}}
                  onMouseLeave={event => {event.preventDefault();setHoverState(1);}}
                  >
                  <i className={ratingState >= 4 || hoverState >= 4 ? fillHeart : emptyHeart}></i>
                  </div>
                </li>
                <li>
                  <div onClick={event => {event.preventDefault();setRatingState(5);}}
                  onMouseEnter={event => {event.preventDefault();setHoverState(5);}}
                  onMouseLeave={event => {event.preventDefault();setHoverState(1);}}
                  >
                    <i className={ratingState >= 5 || hoverState >= 5 ? fillHeart : emptyHeart}></i>
                  </div>
                </li>
              </ul>
              {/* ////// */}
              <TextField name="comment" type="text" value={contentState} onChange={e => setContentState(e.target.value)} />
              <div className="w-full md:w-full flex items-start md:w-full px-3 flex-wrap">
                <div className="flex items-start w-1/2 text-gray-700 px-2 mr-auto">
                  <svg fill="none" className="w-5 h-5 text-gray-600 mr-1" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <p className="text-xs md:text-sm pt-px mb-4">No publiques información privada</p>
                </div>
                <div className="-mr-1">
                  <input type='submit' className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 border border-blue-700 rounded cursor-pointer" value='Enviar Calificación'>
                  </input>
                </div>
              </div>
            </div>
        </Form>
        )}
        </Formik>
      </div>
  )
  };
  
	
const TextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="w-full md:w-full px-3 mb-2 mt-2">
        <textarea
          {...field} {...props}
          className={`bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3  placeholder-gray-700 focus:text-gray-700 focus:border-blue-600 focus:outline-none transition
          ease-in-out`}
          placeholder='Escribe una calificación...' required
        />
        <label className="absolute duration-300 top-5 -z-1 origin-0 text-gray-500" htmlFor={field.name}>{label}</label>
        <ErrorMessage component="div" name={field.name} className="error" /> 
    </div>
  )
}



  export default URatings;