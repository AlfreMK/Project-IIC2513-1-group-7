import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import "../index.css";
import {getData, Round} from '../../../backendFunctions/functions'
import {FillHeart, Heart} from '../../HeartComponent/HeartComponents';

  const URatings = (props) => {
    const userId = props.userId;
    const classProp = props.className;
    const [uratings, setData] = useState([]);
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
      updateData(userId);
    }, [userId]);
    useEffect(() => {
      const updateComments = () => {
        updateData(userId);
        // if (ref.current) {
        //   ref.current.scrollIntoView({behavior: "smooth", block: 'start'});
        // }
      }
      window.addEventListener('ucommentsHasBeenUpdated', updateComments);
      return () => {
        window.removeEventListener('ucommentsHasBeenUpdated', updateComments);
      }
    }, [userId]);

    const totalRatings = uratings.length;
    const ratings5stars = uratings.filter(rating => rating.rating === 5).length || 0;
    const ratings4stars = uratings.filter(rating => rating.rating === 4).length || 0;
    const ratings3stars = uratings.filter(rating => rating.rating === 3).length || 0;
    const ratings2stars = uratings.filter(rating => rating.rating === 2).length || 0;
    const ratings1stars = uratings.filter(rating => rating.rating === 1).length || 0;

    const avg = (ratings5stars * 5 + ratings4stars * 4 + ratings3stars * 3 + ratings2stars * 2 + ratings1stars * 1) / totalRatings || 0;
    

    return (
      <div className={classProp}>
      <div className={"flex flex-col items-center mb-4"}>
      <ContainerRatings className="w-full">
        <div className="flex items-center justify-center mt-2">
          <RatingfromUser value={avg} className="m-1"/>
          <span className="font-medium text-xl">{Round(avg)} de 5</span>
        </div>
        <p className="text-lg " style={{textAlign: "center"}}>{totalRatings} Calificaciones</p>
      </ContainerRatings>
    </div>
    </div>
    );
  };



  
const RatingfromUser = (props) => {
  const forClass = props.className;
  const ratingValue = props.value;
  const fillHeart = "fas fa-heart mx-0.5";
  const emptyHeart = "far fa-heart mx-0.5";
  return (
    <ul className={`flex text-blue-500 text-xl ${forClass}`}>
      <li>
        <i className={ratingValue >= 1 ? fillHeart : emptyHeart}></i>
      </li>
      <li>
      <i className={ratingValue >= 2 ? fillHeart : emptyHeart}></i>
      </li>
      <li>
      <i className={ratingValue >= 3 ? fillHeart : emptyHeart}></i>
      </li>
      <li>
      <i className={ratingValue >= 4 ? fillHeart : emptyHeart}></i>
      </li>
      <li>
      <i className={ratingValue >= 5 ? fillHeart : emptyHeart}></i>
      </li>
    </ul>
  );
};
  
  
  const ContainerRatings = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 5%;
  `;
  

export{
  URatings,
}