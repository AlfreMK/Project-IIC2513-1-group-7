import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {getData, Round, transformDateFormat} from '../../../backendFunctions/functions'
import { Heart } from "../../HeartComponent/HeartComponents";
import pfp from '../../../images/users/bojji.jpg';
import PostURating from "./PostURating";
import FormEditUComment from "./FormEditComment/FormEditUComment";
import {URatings} from "./URatings";
import Modal from '../../Modal/Modal';
import axios from 'axios';
import "../index.css";
// import data from '../../data.js';

const UComments = (props) => {
  const classProp = props.className;
  const userId = props.userId;
  const [current_user, setCurrent_user] = useState("");
	const [uratings, setData] = useState([]);
	const [dataRatingUpdate, setDataRatingUpdate] = useState({
		id: null,
		rating: 1,
		content: '',
	});
	const [showModal, setShowModal] = useState(false);
	const [activeDropDown, setActivesDropDown] = useState({});
	const changeStateDropDown = (id) => {
		if (!activeDropDown[id]) {
			setActivesDropDown({ [id]: true});
		}
		else{
			setActivesDropDown({ [id]: ![id]});
		}
	};
	useEffect(() => {
		if (localStorage.getItem("isLoggedIn") === 'true'){
			setCurrent_user(JSON.parse(localStorage.getItem("currentUser")).id);
		  };
		updateData(userId);
	}, [userId]);
	function updateData(user_id){
		let changeData = getData(`/uratings/receptor/${user_id}`);
		changeData.then((json) => {
			if (json){
				setData(json[0]);
			}
    });
	}
	const [firstInstance, setFirstInstance] = useState(true);
	if (firstInstance){
		updateData(userId);
		setFirstInstance(false);
	};
	
  useEffect(() => {
		const updateComments = () => {
			updateData(userId);
			setShowModal(false);
			// if (ref.current) {
			//   ref.current.scrollIntoView({behavior: "smooth", block: 'start'});
			// }
		}
		window.addEventListener('ucommentsHasBeenUpdated', updateComments);
		return () => {
			window.removeEventListener('ucommentsHasBeenUpdated', updateComments);
		}
  }, [userId]);
	const deleteURating = (id) => {
		axios.delete(
			`${process.env.REACT_APP_SERVER_URL}/uratings/delete/` +
			id)
			.then(res => {
				if (res.status === 200){
					console.log('URating successfully deleted');
					window.dispatchEvent(new Event("ucommentsHasBeenUpdated"));
					window.dispatchEvent(new Event("uratingsHasBeenUpdated"));
					}
					else
					Promise.reject()
				})
				.catch(err => console.log('Something went wrong'));
	}
	// console.log(userId.toString(), current_user.toString());
  return (
		<div className={"mt-12 flex flex-col justify-center items-center mb-8 " + classProp}>
			<Modal
				show={showModal}
				setShow={setShowModal}
			// hideCloseButton
			>
				<div className="modal-container">
				<FormEditUComment dataRating={dataRatingUpdate}/>
				</div>
			</Modal>

			<URatings userId={userId}/>
			<CommentsContainer style={{width: "70%"}}>
				{uratings.map((rating)=> (
					<Comment key={rating.id} className="mx-2 comment-shadow">
					<div className="upper-container-comment flex flex-wrap">
						<CommentUser to={`../${process.env.REACT_APP_URL}/viewuser/${rating.transmiterId}`}>
								<img className="inline object- w-12 h-12 mr-2 rounded-full" src={pfp} alt={"userpfp"} />
								<CommentUserName>{rating.nickname}</CommentUserName>
						</CommentUser>
						<div className="flex items-center">
							<span className="mx-2 text-xs text-gray-600">{transformDateFormat(rating.createdAt)}</span>
							{current_user.toString() === rating.transmiterId.toString() &&
							<div onClick={event => {event.preventDefault();changeStateDropDown(rating.id)}} className="text-blue-500 px-2 cursor-pointer" >
								<i className={'fa fa-ellipsis-v'}></i>
								<div className={"dropdown-parent"}>
									<div className={"dropdown "+ (activeDropDown[rating.id]? "block": "hidden")}>
										<button className="flex items-center button-dropdown" onClick={event => {event.preventDefault();setShowModal(true);setDataRatingUpdate({
											id: rating.id,
											rating: rating.rating,
											content: rating.content,
											});}}>
											<i className="fa fa-pencil"></i>
											<p className="mx-2">Editar</p>
										</button>
										<button onClick={() => deleteURating(rating.id)} className="flex items-center button-dropdown">
											<i className="fa fa-remove" ></i>
											<p className="mx-2">Borrar</p>
										</button>
									</div>
								</div>
							</div>
							}
						</div>
					</div>
					<RatingfromUser className="ml-2" value={rating.rating} />
					<CommentContent>{rating.content}</CommentContent>
				</Comment>
		))}
		</CommentsContainer>
		{current_user.toString()!=='' && (userId.toString() !== current_user.toString()) &&   
			<PostURating receptorId={userId}/>
		}
		</div>
  )
  };
  
	
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



export default UComments;