import React, { useState, useEffect, useRef } from "react";
import { Formik, Form, Field } from 'formik';
import {useParams, useNavigate} from 'react-router-dom';
import TextField from './components/TextField';
import TextArea from './components/TextArea';
import Title from './components/title';
import axios from 'axios';
import * as Yup from 'yup';
import {Heart} from '../../../HeartComponent/HeartComponents';

const FormEditUComment = (props) => {
  const dataRating = props.dataRating;
  const [hoverState, setHoverState] = useState(1);
  const [ratingState, setRating] = useState(dataRating.rating);
  const [commentState, setComment] = useState(dataRating.content);
  const onCommentChange = (value) => {
    setComment(value);
  }
  const changeRating = (rating) => {
    setRating(rating);
  };
  const validate = Yup.object({
    content: Yup.string(),
    rating: Yup.number(),
  });
  useEffect(() => {
    if (dataRating.id!=null){
      setRating(dataRating.rating);
      setComment(dataRating.content);
    }
  }, [dataRating]);
  
  return (
    <Formik
      initialValues={{
        rating: ratingState,
        content: commentState,
      }}
      enableReinitialize={true}
      validationSchema={validate}
      onSubmit={values => {
        if (dataRating.id!=null){
          axios.put(
            `${process.env.REACT_APP_SERVER_URL}/uratings/edit/${dataRating.id}`,
            values)
            .then(res => {
              if (res.status === 200){
                console.log('Comment successfully updated');
                window.dispatchEvent(new Event("ucommentsHasBeenUpdated"));
                window.dispatchEvent(new Event("uratingsHasBeenUpdated"));
              }
              else
              Promise.reject()
            })
            .catch(err => console.log('Something went wrong'))
      }
      }}
    >
      {formik => (
            <Form autoComplete='off'>
                <Title text='Editar Rating' />
                <ul className={`flex mt-4 cursor-pointer justify-center`}>
                <li>
                  <div onClick={event => {event.preventDefault();changeRating(1);}}>
                    <Heart fill={ratingState >= 1 ? "fill" : ""}  />
                  </div>
                </li>
                <li>
                  <div onClick={event => {event.preventDefault();changeRating(2);}}
                  onMouseEnter={event => {event.preventDefault();setHoverState(2);}}
                  onMouseLeave={event => {event.preventDefault();setHoverState(1);}}
                  >
                    <Heart fill={ratingState >= 2 || hoverState >= 2 ? "fill" : ""}/>
                  </div>
                </li>
                <li>
                  <div onClick={event => {event.preventDefault();changeRating(3);}}
                  onMouseEnter={event => {event.preventDefault();setHoverState(3);}}
                  onMouseLeave={event => {event.preventDefault();setHoverState(1);}}
                  >
                    <Heart fill={ratingState >= 3 || hoverState >= 3 ? "fill" : ""}/>
                  </div>
                </li>
                <li>
                  <div onClick={event => {event.preventDefault();changeRating(4);}}
                  onMouseEnter={event => {event.preventDefault();setHoverState(4);}}
                  onMouseLeave={event => {event.preventDefault();setHoverState(1);}}>
                    <Heart fill={ratingState >= 4 || hoverState >= 4? "fill" : ""}/>
                  </div>
                </li>
                <li>
                  <div onClick={event => {event.preventDefault();changeRating(5);}}
                  onMouseEnter={event => {event.preventDefault();setHoverState(5);}}
                  onMouseLeave={event => {event.preventDefault();setHoverState(1);}}>
                    <Heart fill={ratingState >= 5 || hoverState >= 5 ? "fill" : ""}/>
                  </div>
                </li>
              </ul>
                <TextField label="Comentario" name="comment" value={commentState} onChange={e => onCommentChange(e.target.value)} type="text" required/>
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

export default FormEditUComment;