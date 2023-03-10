import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import {Link, Navigate} from 'react-router-dom';
import {getData, Round} from '../../backendFunctions/functions'
// import data from '../../data.js';
import image from '../../images/stores/quickdeli/quickdeli_biblioteca.jpg';

const IndexStores = () => {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    let changeData = getData("/stores/with_rating");
    changeData.then((json) => {
      if (json){
        setData(json[0]);
      }
      // console.log(json);
    });
  }, []);

  return(
  <Container className= "py-2"> 
    {data.map((store)=> (
      
      <Store className='shadow-xl transition hover:shadow' key={store.id} to={`/details/${store.id}`}>
        <Image className="" src={image}/>
        <TextStore>
          <div className='flex justify-between items-center'>
          <div className="">
          <ContentStore className='font-semibold'>{store.name}</ContentStore>
          <ContentStore className=''>{store.schedule}</ContentStore>
          </div>
            <div className="flex mr-3">
              <p className='mr-1'>{Round(store.rating)}</p>
              <FillHeart/>
            </div>
          </div>
        </TextStore>
      </Store>
      ))}
  </Container>

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

const FillHeart = (props) => {
  return (
    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="heart" className="w-3.5 text-blue-500 mr-1" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <path fill="currentColor" d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path>
  </svg>
  );
};

export default IndexStores;