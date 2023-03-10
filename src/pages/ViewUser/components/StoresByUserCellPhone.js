import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {getData, Round} from '../../../backendFunctions/functions'
import { Heart } from "../../HeartComponent/HeartComponents";
import image from '../../../images/stores/quickdeli/quickdeli_biblioteca.jpg';
import "../index.css";
// import data from '../../data.js';

const StoresByUserCellPhone = (props) => {
  const classProp = props.className;
  const userId = props.userId;
  const [stores, setData] = useState([]);
  useEffect(() => {
    let changeData = getData(`/user/stores/${props.userId}`);
    changeData.then((json) => {
      if (json){
        setData(json[0]);
      }
    });
  }, [props.userId]);
  return (
    <div className={` ${classProp}`}>
    <Container> 
    {stores.map((store)=> (
      
      <Store className='shadow-xl transition hover:shadow' key={store.id} to={`${process.env.REACT_APP_URL}/details/${store.id}`}>
        <Image className="" src={image}/>
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
      ))}
  </Container>
  </div>

);
};


const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Store = styled(Link)`
    display: flex;
    flex-direction: column;
    width: 60%;
    margin: 20px;
`;


const TextStore = styled.div`
  display: flex;
  flex-direction: column;
  justify-content:center;
  font-size: 18px;
  margin-left: 10px;
  padding: 5px;
`

const Image = styled.img`
    object-fit: cover;
    width: 100%;
    height: 300px;
    aspectRatio: 1;
    @media (max-width: 800px) { 
      height: 150px;
    }
  `;

const ContentStore = styled.p`
    margin: 2px;
`;


  export default StoresByUserCellPhone;