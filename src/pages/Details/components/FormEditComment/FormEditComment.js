import React, { useState, useEffect, useRef } from "react";
import { Formik, Form, Field } from 'formik';
import {useParams, useNavigate} from 'react-router-dom';
import TextField from './components/TextField';
import TextArea from './components/TextArea';
import Title from './components/title';
import axios from 'axios';
import * as Yup from 'yup';
import {Heart} from '../../../HeartComponent/HeartComponents';

const FormEditComment = (props) => {
  const dataRating = props.dataRating;
  const tagKeytoText = props.tagKeytoText;
  const [ratingState, setRating] = useState(dataRating.rating);
  const [commentState, setComment] = useState(dataRating.comment);
  const [hoverState, setHoverState] = useState(1);
  const [tagsState, setStateTag] = useState({
    bueno: dataRating.bueno,
    bonito: dataRating.bonito,
    barato: dataRating.barato,
    rapido: dataRating.rapido,
  });
  const changeStateTag = (tag) => {
    setStateTag({
      ...tagsState, [tag]: !tagsState[tag]});
  }
  const onCommentChange = (value) => {
    setComment(value);
  }
  const changeRating = (rating) => {
    setRating(rating);
  };
  const validate = Yup.object({
    comment: Yup.string(),
    rating: Yup.number(),
  });
  useEffect(() => {
    if (dataRating.id!=null){
      setRating(dataRating.rating);
      setComment(dataRating.comment);
      setStateTag({
        bueno: dataRating.bueno,
        bonito: dataRating.bonito,
        barato: dataRating.barato,
        rapido: dataRating.rapido,
      });
    }
  }, [dataRating]);
  
  return (
    <Formik
      initialValues={{
        rating: ratingState,
        comment: commentState,
        bueno: tagsState['bueno'],
        bonito: tagsState['bonito'],
        barato: tagsState['barato'],
        rapido: tagsState['rapido'],
      }}
      enableReinitialize={true}
      validationSchema={validate}
      onSubmit={values => {
        if (dataRating.id!=null){
          axios.put(
            `${process.env.REACT_APP_SERVER_URL}/ratings/edit/id/${dataRating.id}`,
            values)
            .then(res => {
              if (res.status === 200){
                console.log('Comment successfully updated');
                window.dispatchEvent(new Event("commentsHasBeenUpdated"));
                window.dispatchEvent(new Event("ratingsHasBeenUpdated"));
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
                  onMouseLeave={event => {event.preventDefault();setHoverState(1);}}>
                    <Heart fill={ratingState >= 2 || hoverState >= 2 ? "fill" : ""}/>
                  </div>
                </li>
                <li>
                  <div onClick={event => {event.preventDefault();changeRating(3);}}
                  onMouseEnter={event => {event.preventDefault();setHoverState(3);}}
                  onMouseLeave={event => {event.preventDefault();setHoverState(1);}}>
                    <Heart fill={ratingState >= 3 || hoverState >= 3 ? "fill" : ""}/>
                  </div>
                </li>
                <li>
                  <div onClick={event => {event.preventDefault();changeRating(4);}}
                  onMouseEnter={event => {event.preventDefault();setHoverState(4);}}
                  onMouseLeave={event => {event.preventDefault();setHoverState(1);}}>
                    <Heart fill={ratingState >= 4 || hoverState >= 4 ? "fill" : ""}/>
                  </div>
                </li>
                <li>
                  <div onClick={event => {event.preventDefault();changeRating(5);}}
                  onMouseEnter={event => {event.preventDefault();setHoverState(5);}}
                  onMouseLeave={event => {event.preventDefault();setHoverState(1);}}>
                    <Heart fill={ratingState >= 5 || hoverState >= 5? "fill" : ""}/>
                  </div>
                </li>
              </ul>
              <div className="w-full flex justify-center flex-wrap">
                <div 
                  onClick={event => {event.preventDefault();changeStateTag("bueno");}}
                  className={(tagsState["bueno"]? "button-tag button-tag-active ": "button-tag button-tag-inactive")} >
                  &#128076; {tagKeytoText["bueno"]}
                </div>
                <div 
                  onClick={event => {event.preventDefault();changeStateTag("bonito");}}
                  className={(tagsState["bonito"]? "button-tag button-tag-active ": "button-tag button-tag-inactive")} >
                  &#129321; {tagKeytoText["bonito"]}
                </div>
                <div 
                  onClick={event => {event.preventDefault();changeStateTag("barato");}}
                  className={(tagsState["barato"]? "button-tag button-tag-active ": "button-tag button-tag-inactive")} >
                  &#129297; {tagKeytoText["barato"]}
                </div>
                <div 
                  onClick={event => {event.preventDefault();changeStateTag("rapido");}}
                  className={(tagsState["rapido"]? "button-tag button-tag-active ": "button-tag button-tag-inactive")} >
                  &#9201; {tagKeytoText["rapido"]}
                </div>
              </div>
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

export default FormEditComment;