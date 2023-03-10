import React, { useState, useEffect, useRef } from "react";
import styled from 'styled-components';
import { Formik, Form, ErrorMessage, useField } from 'formik';
import { Heart } from '../../HeartComponent/HeartComponents';
import {Link, useParams} from 'react-router-dom';
import {getData, transformDateFormat} from '../../../backendFunctions/functions';
import axios from 'axios';
import pfp from '../../../images/users/bojji.jpg';
import Modal from '../../Modal/Modal';
import FormEditComment from "./FormEditComment/FormEditComment";
import * as Yup from 'yup';
import "../index.css";

const Comments  = (props) => {
  // console.log(props);
  // if (props.boolStore === true){
  //   console.log("true");
  // }
  const classProp = props.className;
    const tagKeytoText = {
      bueno: "Buena Comida",
      bonito: "Bonito el lugar",
      barato: "Barato",
      rapido: "Rápido al atender",
    }
    const storeId = props.storeId;
    const [current_userid, setCurrent_userid] = useState("");
    const [currentuser, setCurrentUser] = useState("");
    const [firstInstance, setFirstInstance] = useState(true);
    const [selectedStore, setData] = useState({Comments: []});
    const ref = useRef(null);
    function updateData(store_id){
      let changeData = getData(`/comments/${store_id}`);
      changeData.then((json) => {
        if (json){
          setData({Comments: json});
        }
        // console.log(json);
      });
    };
    if (firstInstance){
      updateData(storeId);
      setFirstInstance(false);
    };
    useEffect(() => {
      updateData(storeId);
    }, [storeId]);
    // useEffect(())
    useEffect(() => {
      if (localStorage.getItem("isLoggedIn") === 'true'){
        setCurrent_userid(JSON.parse(localStorage.getItem("currentUser")).id);
        setCurrentUser(JSON.parse(localStorage.getItem("currentUser")));
      }
      // console.log(current_user);
      const updateComments = () => {
        updateData(storeId);
        setShowModal(false);
        setComment('');
        setStateTag({
          bueno: false,
          bonito: false,
          barato: false,
          rapido: false
        })
        setRating(1);
        // if (ref.current) {
        //   ref.current.scrollIntoView({behavior: "smooth", block: 'start'});
        // }
      }
      window.addEventListener('commentsHasBeenUpdated', updateComments);
      return () => {
        window.removeEventListener('commentsHasBeenUpdated', updateComments);
      }
    }, [storeId]);

    // for create comment
    const [ratingState, setRating] = useState(1);
    const [commentState, setComment] = useState('');
    const [hoverState, setHoverState] = useState(1);
    const onCommentChange = (value) => {
      setComment(value);
    }
    const changeRating = (rating) => {
      setRating(rating);
      // console.log(rating);
    };
    const validate = Yup.object({
      comment: Yup.string(),
      rating: Yup.number(),
    });

    const [tagsState, setStateTag] = useState({
      bueno: false,
      bonito: false,
      barato: false,
      rapido: false,
    });

    const changeStateTag = (tag) => {
      setStateTag({
        ...tagsState, [tag]: !tagsState[tag]});
    }

    // for update comment
    const [showModal, setShowModal] = useState(false);
    const [dataRatingUpdate, setDataRatingUpdate] = useState({
      id: null,
      rating: 1,
      comment: '',
      bueno: false,
      bonito: false,
      barato: false,
      rapido: false,
    });
    const [activeDropDown, setActivesDropDown] = useState({});
    const changeStateDropDown = (id) => {
      // console.log(activeDropDown);
      // console.log(id);
      if (!activeDropDown[id]) {
        setActivesDropDown({ [id]: true});
      }
      else{
        setActivesDropDown({ [id]: ![id]});
      }
    };

    const deleteRating = (id) => {
        axios.delete(
          `${process.env.REACT_APP_SERVER_URL}/ratings/delete/id/` +
          id)
          .then(res => {
            if (res.status === 200){
              console.log('Rating successfully deleted');
              window.dispatchEvent(new Event("commentsHasBeenUpdated"));
              window.dispatchEvent(new Event("ratingsHasBeenUpdated"));
              }
              else
              Promise.reject()
            })
            .catch(err => console.log('Something went wrong'));
      }
      // console.log("----")
      // console.log(current_userid);
      // console.log("----")
    return (
      <div className={classProp}>
      <Modal
          show={showModal}
          setShow={setShowModal}
      // hideCloseButton
      >
        <div className="modal-container">
          <FormEditComment dataRating={dataRatingUpdate} tagKeytoText={tagKeytoText}/>
        </div>
      </Modal>

      <CommentsContainer>
        {selectedStore.Comments.map((comment)=> (
            <Comment key={comment.id} className="mx-2 comment-shadow">
              <div className="upper-container-comment flex flex-wrap">
                <CommentUser to={`../${process.env.REACT_APP_URL}/viewuser/${comment.User.id}`}>
                    <img className="inline object- w-12 h-12 mr-2 rounded-full" src={pfp} alt={"userpfp"} />
                    <CommentUserName>{comment.User.nickname}</CommentUserName>
                </CommentUser>
                <div className="flex items-center">
                  <span className="mx-2 text-xs text-gray-600">{transformDateFormat(comment.createdAt)}</span>
                  {((current_userid.toString() === comment.User.id.toString()) || (currentuser.admin)) &&
                  <div onClick={event => {event.preventDefault();changeStateDropDown(comment.id)}} className="text-blue-500 px-2 cursor-pointer" >
                    <i className={'fa fa-ellipsis-v'}></i>
                    <div className={"dropdown-parent"}>
                      <div className={"dropdown "+ (activeDropDown[comment.id]? "block": "hidden")}>
                        <button className="flex items-center button-dropdown" onClick={event => {event.preventDefault();setShowModal(true);setDataRatingUpdate({
                          id: comment.id,
                          rating: comment.rating,
                          comment: comment.comment,
                          bueno: comment.bueno,
                          bonito: comment.bonito,
                          barato: comment.barato,
                          rapido: comment.rapido,
                          });}}>
                          <i className="fa fa-pencil"></i>
                          <p className="mx-2">Editar</p>
                        </button>
                        <button onClick={() => deleteRating(comment.id)} className="flex items-center button-dropdown">
                          <i className="fa fa-remove" ></i>
                          <p className="mx-2">Borrar</p>
                        </button>
                      </div>
                    </div>
                  </div>
                  }
                </div>
              </div>
              <CommentTags tags={comment} tagKeytoText={tagKeytoText} className="mt-1"/>
              <RatingfromUser className="ml-2" value={comment.rating} />
              <CommentContent>{comment.comment}</CommentContent>
            </Comment>
        ))}
        <div ref={ref}></div>
    </CommentsContainer>
    {(current_userid.toString()!=='') && (props.boolStore === false) &&    
    <div className="flex items-center justify-center mt-5 mb-5">
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
        // console.log(values);
        axios.post(
          `${process.env.REACT_APP_SERVER_URL}/ratings/create/${storeId}/${current_userid}`,
          values)
            .then(res => {
              if (res.status === 200){
                console.log('Rating successfully created');
                window.dispatchEvent(new Event("commentsHasBeenUpdated"));
                window.dispatchEvent(new Event("ratingsHasBeenUpdated"));
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
              <ul className={`flex m-4 cursor-pointer`}>
                <li>
                  <div onClick={event => {event.preventDefault();changeRating(1);}}>
                    <Heart fill={ratingState >= 1 || hoverState >= 1 ? "fill" : ""}/>
                  </div>
                </li>
                <li>
                  <div onClick={event => {event.preventDefault();changeRating(2);}}
                  onMouseEnter={event => {event.preventDefault();setHoverState(2);}}
                  onMouseLeave={event => {event.preventDefault();setHoverState(1);}}
                  >
                    <Heart fill={ratingState >= 2 || hoverState >= 2? "fill" : ""}/>
                  </div>
                </li>
                <li>
                  <div onClick={event => {event.preventDefault();changeRating(3);}}
                  onMouseEnter={event => {event.preventDefault();setHoverState(3);}}
                  onMouseLeave={event => {event.preventDefault();setHoverState(1);}}>
                    <Heart fill={ratingState >= 3 || hoverState >= 3? "fill" : ""}/>
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
                    <Heart fill={ratingState >= 5 || hoverState >= 5? "fill" : ""}/>
                  </div>
                </li>
              </ul>
              {/* ////// */}
              {/* Tags form  */}
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
              {/* //////////// */}
              <TextField name="comment" type="text" value={commentState} onChange={e => onCommentChange(e.target.value)} />
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
        }
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

   
const RatingfromUser = (props) => {
  const forClass = props.className;
  const ratingValue = props.value;
  return (
    <ul className={`flex mt-2 ${forClass}`}>
      <li>
        <Heart fill={ratingValue >= 1 ? "fill" : ""}  />
      </li>
      <li>
        <Heart fill={ratingValue >= 2 ? "fill" : ""}/>
      </li>
      <li>
        <Heart fill={ratingValue >= 3 ? "fill" : ""}/>
      </li>
      <li>
        <Heart fill={ratingValue >= 4 ? "fill" : ""}/>
      </li>
      <li>
        <Heart fill={ratingValue >= 5 ? "fill" : ""}/>
      </li>
    </ul>
  );
};

  const CommentTags = (props) => {
    const comment = props.tags;
    const forClass = props.className;
    const tagKeytoText = props.tagKeytoText;
    const tags = {
      "bueno": comment.bueno,
      "bonito": comment.bonito,
      "barato": comment.barato,
      "rapido": comment.rapido
    }
    const activeTag = "block bg-blue-500 text-white p-1.5 px-3 text-xs rounded-full m-1";
    return (
      <div className={`flex ${forClass} flex-wrap`}>
        <div className={tags.bueno? activeTag: "hidden"}>
          {tagKeytoText["bueno"]}
        </div>
        <div className={tags.bonito? activeTag: "hidden"}>
          {tagKeytoText["bonito"]}
        </div>
        <div className={tags.barato? activeTag: "hidden"}>
          {tagKeytoText["barato"]}
        </div>
        <div className={tags.rapido? activeTag: "hidden"}>
          {tagKeytoText["rapido"]}
        </div>
      </div>
    );
    };

  const CommentsContainer = styled.div`
    display: flex;
    flex-direction: column;
    max-height: 1000px;
    overflow-y: scroll;
    overflow-x: hidden;
    `;

  const Comment = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
    align-content: center;
    margin-bottom:10px;
    margin-top:10px;
  `;

  const CommentContent = styled.p`
    margin:5px;
    word-break: break-word;
  `

  const CommentUser = styled(Link)`
    display: flex;
    flex-direction: row;
    align-content: center;
  `;


  const CommentUserName = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-weight: 500;
`;


export {
    Comments,
  }