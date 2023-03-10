import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import {Link, Navigate, useNavigate} from 'react-router-dom';
import {getData, Round} from '../../backendFunctions/functions'
// import data from '../../data.js';
import useAuth from "../../hooks/useAuth";
import axios from 'axios';

const Users = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const {currentUser} = useAuth();
  const [error, setError] = useState(null);

  // const updateData(() => {
  //   let changeData = getData("/users");
  //   changeData.then((json) => {
  //     // console.log(json);
  //     setData(json);
  //     // console.log(json);
  //   });
  // }, []);
  const updateData = () => {
    let changeData = getData("/users");
    changeData.then((json) => {
      if (json){
        setData(json);
      }
    });
    }
  // const updateData = () => {
  //   let changeData = getData(`/rproducts/client/${userId}`);
  //     changeData.then((json) => {
  //       setData(json[0]);
  //   });
    // }
    const [firstInstance, setFirstInstance] = useState(true);
    if (firstInstance){
      updateData();
      setFirstInstance(false);
    };
    useEffect(() => {
    window.addEventListener('usersHasBeenUpdated', updateData);
    return () => {
      window.removeEventListener('usersHasBeenUpdated', updateData);
    }
    }, []);
  // useEffect(() => {
  //   window.addEventListener('rproductsHasBeenUpdated', updateData);
  //   return () => {
  //     window.removeEventListener('rproductsHasBeenUpdated', updateData);
  //   }
  //   }, []);
  // console.log("data");
  // console.log(data);
  if (!localStorage.getItem("currentUser")) {
    window.alert("Debes iniciar sesión");
    return <Navigate to={`${process.env.REACT_APP_URL}/`}/>
  }
  // console.log(localStorage.getItem("currentUser").admin);
  // console.log(JSON.parse(localStorage.getItem("currentUser")).admin);
  if (!JSON.parse(localStorage.getItem("currentUser")).admin) {
    window.alert("Acceso denegado");
    return <Navigate to={`${process.env.REACT_APP_URL}/`}/>
  }
  // const requestOptions = {
  //   method: 'GET',
  //   headers: {
  //     'Authorization': 'Bearer ${currentUser?.token}'
  //   }
  // };

  // useEffect(() => {
  //   fetch('${process.env.REACT_APP_SERVER_URL}/users', requestOptions)
  //   .then(response => response.json())
  //   .then(data => {
  //     setUsers(data);
  //     setIsLoading(false);
  //   })
  //   .catch(err => {
  //     console.log('Ha ocurrido un error', err);
  //     setError(err);
  //   });
  // }, []);
  // if (!currentUser) {
  //   return <p>You are not logged in</p>
  // }
  return(
    <Container className= "py-2">
      <div className='text-black text-4xl flex justify-center m-2'>
            <label>Usuarios</label>
        </div>
      {data.map((user)=> (
          <TextUser>
            <ContentUser className='font-semibold'>Nombre: {user.name}</ContentUser>
            <ContentUser className=''>Username: {user.nickname}</ContentUser>
            <ButtonContainer className="">
              <ButtonEdit to={`${process.env.REACT_APP_URL}/edituser/${user.id}`} className="inline-block text-sm cursor-pointer bg-blue-600 rounded p-1 px-2 text-white  border border-blue-700 hover:bg-blue-700">
                Editar
              </ButtonEdit>
              <ButtonDelete onClick={() => {
            axios.delete(
              `${process.env.REACT_APP_SERVER_URL}/user/delete/id/` +
              user.id)
              .then(res => {
                if (res.status === 200){
                  console.log('User successfully deleted');
                  // localStorage.setItem('userid', JSON.stringify());
                  // localStorage.removeItem("currentUser");
                  // localStorage.removeItem("userToken");
                  // localStorage.setItem('isLoggedIn', JSON.stringify(false));
                  // window.dispatchEvent(new Event("thereHasBeenALogin"));
                  window.dispatchEvent(new Event("usersHasBeenUpdated"));
                  }
                  else
                  Promise.reject()
                })
                .catch(err => console.log('Something went wrong'));
              }} 
              className="inline-block text-sm cursor-pointer bg-blue-600 rounded p-1 px-2 text-white  border border-blue-700 hover:bg-blue-700">
                Eliminar usuario
              </ButtonDelete>
            </ButtonContainer>
          </TextUser>
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

const User = styled(Link)`
    display: flex;
    flex-direction: column;
    width: 60%;
    margin: 20px;
`;


const TextUser = styled.div`
  display: flex;
  flex-direction: column;
  justify-content:center;
  font-size: 18px;
  margin-left: 10px;
  padding: 5px;
  box-shadow: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);
  background-color: rgb(191 219 254);
  border-radius: 0.375rem; /* 6px */
  --tw-shadow-color: #93c5fd;
  padding: 1rem; /* 16px */
  margin: 1.25rem; /* 20px */
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

const ContentUser = styled.p`
    margin: 2px;
`;
const ButtonContainer = styled.div`
margin: 10px;
margin-top: 15px;
display: flex;
flex-direction: row;
flex-wrap: wrap;
user-select: none;
-moz-user-select: none;
-webkit-user-select: none;
`


const ButtonDelete = styled.div`
  margin: 10px;
  
`
const ButtonEdit = styled(Link)`
  margin: 10px;
  
`

const FillHeart = (props) => {
  return (
    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="heart" className="w-3.5 text-blue-500 mr-1" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <path fill="currentColor" d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path>
  </svg>
  );
};

export default Users;