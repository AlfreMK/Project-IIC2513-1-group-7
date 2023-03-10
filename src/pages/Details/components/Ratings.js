import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import "../index.css";
import {getData, SortObject} from '../../../backendFunctions/functions'
import {FillHeart} from '../../HeartComponent/HeartComponents';

  const Ratings = (props) => {
    const classProp = props.className;
    const storeId = props.storeId;
    const [selectedStore, setData] = useState({Ratings: []});
    const [tagsState, setTagsState] = useState({
      bueno: 0,
      bonito: 0,
      barato: 0,
      rapido: 0,
    });
    const changeTagState = (json) => {
      setTagsState({
        bueno: json.Ratings.filter(rating => rating.bueno === true).length || 0,
        bonito: json.Ratings.filter(rating => rating.bonito === true).length || 0,
        barato: json.Ratings.filter(rating => rating.barato === true).length || 0,
        rapido: json.Ratings.filter(rating => rating.rapido === true).length || 0,
      });
    }
    const tagKeytoText = {
      bueno: "Buena Comida",
      bonito: "Bonito el lugar",
      barato: "Barato",
      rapido: "Rápido al atender",
    }
    const [firstInstance, setFirstInstance] = useState(true);
    function updateData(store_id){
      let changeData = getData(`/ratings/store/${store_id}`);
      changeData.then((json) => {
        if (json){
          setData(json);
          changeTagState(json);
        }
      });
    }
    if (firstInstance){
      updateData(storeId);
      setFirstInstance(false);
    };
    useEffect(() => {
      updateData(storeId);
    }, [storeId]);
    useEffect(() => {
      const updateRatings = () => {
        updateData(storeId);
      }
      window.addEventListener('ratingsHasBeenUpdated', updateRatings);
      return () => {
        window.removeEventListener('ratingsHasBeenUpdated', updateRatings);
      }
    }, [storeId]);

    const totalRatings = selectedStore.Ratings.length;
    const ratings5stars = selectedStore.Ratings.filter(rating => rating.rating === 5).length || 0;
    const ratings4stars = selectedStore.Ratings.filter(rating => rating.rating === 4).length || 0;
    const ratings3stars = selectedStore.Ratings.filter(rating => rating.rating === 3).length || 0;
    const ratings2stars = selectedStore.Ratings.filter(rating => rating.rating === 2).length || 0;
    const ratings1stars = selectedStore.Ratings.filter(rating => rating.rating === 1).length || 0;

    let percentage5stars = "00";
    let percentage4stars = "00";
    let percentage3stars = "00";
    let percentage2stars = "00";
    let percentage1stars = "00";

    if (totalRatings > 0) {
      percentage5stars = (~~((ratings5stars/totalRatings)*100)).toString().padStart(2, "0");
      percentage4stars = (~~((ratings4stars/totalRatings)*100)).toString().padStart(2, "0");
      percentage3stars = (~~((ratings3stars/totalRatings)*100)).toString().padStart(2, "0");
      percentage2stars = (~~((ratings2stars/totalRatings)*100)).toString().padStart(2, "0");
      percentage1stars = (~~((ratings1stars/totalRatings)*100)).toString().padStart(2, "0");
    }

    return (
      <div className={classProp}>
      <div className={"flex flex-col items-center "}>
        <ContainerRatings className="w-full">
        <p className="text-xl font-medium" style={{textAlign: "center"}}>{totalRatings} Calificaciones</p>
        <div className="flex items-center justify-center mt-4">
          <span className="text-sm font-medium mr-1 text-blue-600 dark:text-blue-500">5</span>
          <FillHeart/>
          <div className="w-2/4 h-5 mr-4 ml-2 bg-gray-200 rounded dark:bg-white-700">
            <div className="h-5 bg-blue-400 rounded" style={{width: `${percentage5stars}%`}}></div>
          </div>
          <span className="text-sm font-medium text-blue-600 dark:text-blue-500">{percentage5stars}%</span>
        </div>
        <div className="flex items-center justify-center mt-4">
          <span className="text-sm font-medium mr-1 text-blue-600 dark:text-blue-500">4</span>
          <FillHeart/>
          <div className="w-2/4 h-5 mr-4 ml-2 bg-gray-200 rounded dark:bg-white-700">
          <div className="h-5 bg-blue-400 rounded" style={{width: `${percentage4stars}%`}}></div>
          </div>
          <span className="text-sm font-medium text-blue-600 dark:text-blue-500">{percentage4stars}%</span>
        </div>
        <div className="flex items-center justify-center mt-4">
          <span className="text-sm font-medium mr-1 text-blue-600 dark:text-blue-500">3</span>
          <FillHeart/>
          <div className="w-2/4 h-5 mr-4 ml-2 bg-gray-200 rounded dark:bg-white-700">
          <div className="h-5 bg-blue-400 rounded" style={{width: `${percentage3stars}%`}}></div>
          </div>
          <span className="text-sm font-medium text-blue-600 dark:text-blue-500">{percentage3stars}%</span>
        </div>
          <div className="flex items-center justify-center mt-4">
            <span className="text-sm font-medium mr-1 text-blue-600 dark:text-blue-500">2</span>
            <FillHeart/>
            <div className="w-2/4 h-5 mr-4 ml-2 bg-gray-200 rounded dark:bg-white-700">
            <div className="h-5 bg-blue-400 rounded" style={{width: `${percentage2stars}%`}}></div>
          </div>
          <span className="text-sm font-medium text-blue-600 dark:text-blue-500">{percentage2stars}%</span>
        </div>
        <div className="flex items-center justify-center mt-4">
          <span className="text-sm font-medium mr-1 text-blue-600 dark:text-blue-500">1</span>
          <FillHeart/>
          <div className="w-2/4 h-5 mr-4 ml-2 bg-gray-200 rounded dark:bg-white-700">
            <div className="h-5 bg-blue-400 rounded" style={{width: `${percentage1stars}%`}}></div>
          </div>
          <span className="text-sm font-medium text-blue-600 dark:text-blue-500">{percentage1stars}%</span>
        </div>
      </ContainerRatings>
      <ContainerLabels className="bg-blue-500 mb-4 p-2 rounded-lg">
        <p className="text-center text-lg font-medium mb-4 mt-2 text-white">Calificaciones por Tag</p>
        <ContainerTags>
          {SortObject(tagsState).map((tag, index) => (
            <div key={index} className="mb-3 flex text-sm items-center bg-blue-450 mx-2 p-2 px-3 rounded-lg border border-blue-600">
              <span className="bg-gray-50 tag-rating text-blue-500 rounded-full font-medium">{tag.value}</span>
              <span className="text-white">{tagKeytoText[tag.key]}</span>
            </div>
          ))}
        </ContainerTags>
      </ContainerLabels>
    </div>
    </div>
    );
  };



  
  
  
  const ContainerRatings = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 5%;
  `;
  
  const ContainerTags = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
`;

const ContainerLabels = styled.div`
  width: 85%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items:center;
`;

export{
    Ratings,
}