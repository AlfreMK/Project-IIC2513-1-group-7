import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import {Link, useNavigate} from 'react-router-dom';
import {getData, Round} from '../../../backendFunctions/functions'
import { Heart } from "../../HeartComponent/HeartComponents";
import image from '../../../images/stores/quickdeli/quickdeli_biblioteca.jpg';
import "../index.css";
// import data from '../../data.js';

const StoresByUser = (props) => {
  const navigate = useNavigate();
  const classProp = props.className;
  const [stores, setData] = useState([]);
  useEffect(() => {
    let changeData = getData(`/user/stores/${props.userId}`);
    changeData.then((json) => {
			setData(json[0]);
    });
  }, [props.userId]);
  const [storeInView, setStoreInView] = useState(0);
  const changeStoreInView = (value) => {
    if (value < 0 && storeInView > 0) {
      setStoreInView(storeInView-1);
    }
    else if (value > 0 && storeInView<stores.length-1) {
      setStoreInView(storeInView+1);
    }
  }
  const handleClick = (event, index) => {
    event.preventDefault();
    if (index > storeInView){
      changeStoreInView(1);
    }
    else if (index < storeInView){
      changeStoreInView(-1);
    }
    else if (index === storeInView){
      navigate(`/details/${stores[index].id}`);
    }
  }
  const classSlide = (index) => {
    if (index === storeInView +1) {
      return "right-slide";
    }
    else if (index === storeInView-1) {
      return "left-slide";
    }
  }
  return (
    <div className={"container-slides pb-10 mt-2 " + classProp}>
    <ContainerStores>
			{stores.map((store, index)=> (
        <div className={(storeInView === index ? "z-50" : "absolute z-0") + (index > storeInView+1 || index < storeInView-1 ? " hidden ":"")} key={index}>
				<Store className={`shadow-xl cursor-pointer transition store-container ` + classSlide(index) + (storeInView === index ? " hover:shadow store-container-active": "" )} 
        onClick={(event) => {handleClick(event, index)}}
        >
          <img className={(storeInView === index ? "image-slide" : "image-slide-not-main")} src={image} alt=""/>
          <TextStore>
            <div className='flex justify-between items-center'>
            <div className="">
            <ContentStore className='font-semibold'>{store.name}</ContentStore>
            <ContentStore className=''>{store.schedule}</ContentStore>
            </div>
              <div className="flex mr-3">
                <p className='mr-1'>{Round(store.rating)}</p>
                <Heart fill="fill"/>
              </div>
            </div>
          </TextStore>
        </Store>
        </div>
      ))}
    </ContainerStores>
    </div>
  )
  };
  
	
const ContainerStores = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
`;

const Store = styled.div`

`;


const TextStore = styled.div`
display: flex;
flex-direction: column;
justify-content:center;
font-size: 18px;
margin-left: 10px;
padding: 5px;
`


const ContentStore = styled.p`
margin: 2px;
`;



  export default StoresByUser;