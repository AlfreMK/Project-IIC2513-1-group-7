import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import {useParams} from 'react-router-dom';
import Products from './components/Products';
import {Ratings} from './components/Ratings';
import {Comments} from './components/Comments';
import Contact from './components/Contact';
import {Link} from 'react-router-dom';
import {getData} from '../../backendFunctions/functions'
import "./index.css";
// import data from '../../data.js';
import image from '../../images/stores/quickdeli/quickdeli_biblioteca.jpg';

const Details = (props) => {
  // console.log(localStorage.getItem('isLoggedIn'));
    const {id} = useParams();
    ////////////////////////
    ///// code for connection to database
    const [data, setData] = useState({
      id: id,
      name: '',
      location: '',
      mail: '',
      schedule: '',
      content: '',
      direction: '',
      phone: '',
    });
    const [isCurrentUserOwner, setBooleanOwner] = useState(false);
    console.log(isCurrentUserOwner);
    const [ownerId, setOwnerId] = useState(null);
    function updateData(id){
      let changeData = getData(`/stores/user/${id}`);
      changeData.then((json) => {
        if (json){
          if (json.User){
            setOwnerId(json.User.id);
          if (localStorage.getItem("isLoggedIn")==='true'){
            if (json.User.id.toString()  === JSON.parse(localStorage.getItem("currentUser")).id.toString()){
              setBooleanOwner(true);
            }
            else if(JSON.parse(localStorage.getItem("currentUser")).admin==="true"){
              setBooleanOwner(true);
            }else {
              setBooleanOwner(false);
            }
        } else {
          setBooleanOwner(false);
        }}
        else {
          if (localStorage.getItem("isLoggedIn")){
          if(JSON.parse(localStorage.getItem("currentUser")).admin==="true"){
            setBooleanOwner(true);
          }
          else {
            setBooleanOwner(false);
          }
        }
        else {
          setBooleanOwner(false);
        }}}});
    }
    // console.log(localStorage.getItem("isLoggedIn"));
    
    useEffect(() => {
      updateData(id);
      let changeData = getData(`/stores/id/${id}`);
      changeData.then((json) => {
        if (json){
          setData(json);
        }
      });
    }, [id]);

    const selectedStore = data;
    ////////////////////////
    const [openTab, setOpenTab] = useState(1);
  
    const activeClass = "inline-block p-4 text-blue-600 rounded-t-lg border-b-2 border-blue-600 active dark:text-blue-500 dark:border-blue-500";
    const inactiveClass = "cursor-pointer inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300";

    const visibleContainer = "block hidden-container-active"
    const hiddenContainer = "hidden"

    // if (!localStorage.getItem("currentUser")) {
    //   window.alert("Debes iniciar sesión");
    //   return <Navigate to="../"/>
    // }
    return (
      <Container>
        <Image className="shadow-2xl rounded principal-image" style={{}} src={image}/>
        <StoreName className="inline-flex items-center">
          <p>{selectedStore.name}</p>
            {isCurrentUserOwner &&
            <ButtonEdit to={`../${process.env.REACT_APP_URL}/editstore/${id}`} className="button-edit text-white bg-blue-600 rounded-full text-xs px-2 text-center inline-flex items-center mb-2">
              <i className="fa fa-cog text-sm ml-[2px]" aria-hidden="true"></i>
              <p className="mx-2 hidden">Editar</p>
            </ButtonEdit>}
          </StoreName>
        <StoreLocation>{selectedStore.location}</StoreLocation>
        <StoreSchedule>{selectedStore.schedule}</StoreSchedule>
        <StoreContent className="mb-8">
            <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700" >
                <ul className="flex flex-wrap -mb-px">
                    <li className="mr-2">
                        <p  className={(openTab === 1? activeClass : inactiveClass)} onClick={event => {event.preventDefault();setOpenTab(1);}}>
                        Productos Disponibles</p>
                    </li>
                    <li className="mr-2">
                        <p className={(openTab === 2? activeClass : inactiveClass)} onClick={event => {event.preventDefault();setOpenTab(2);}}>
                        Acerca de Nosotros</p>
                    </li>
                    <li className="mr-2">
                        <p className={(openTab === 3? activeClass : inactiveClass)} onClick={event => {event.preventDefault();setOpenTab(3);}}>
                        Calificaciones</p>
                    </li>
                    <li className="mr-2">
                        <p className={(openTab === 4? activeClass : inactiveClass)} onClick={event => {event.preventDefault();setOpenTab(4);}}>
                        Contacto</p>
                    </li>
                </ul>
            </div>

            <HiddenContainer>
                <Products store={id} boolStore={isCurrentUserOwner} ownerId={ownerId} mailStore={selectedStore.mail} className={(openTab === 1 ? "seen-animation":"hidden")}/>
                <AboutUs className={(openTab === 2 ? "seen-animation":"not-seen")}>{selectedStore.content} </AboutUs>
                <Ratings storeId={id} className={(openTab === 3 ? "seen-animation":"not-seen")}/>
                <Comments storeId={id} boolStore={isCurrentUserOwner} className={(openTab === 3 ? "seen-animation":"not-seen")}/>
                <Contact store={selectedStore} className={(openTab === 4 ? "seen-animation":"not-seen")}/>
            </HiddenContainer>
        </StoreContent>
      </Container>
    )
  };
  

  const ButtonEdit = styled(Link)`
  
  
  `


  const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin: 2%;
    margin-right: 15%;
    margin-left: 15%;
  `;

  const StoreName = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 30px;
    font-weight: 600;
    margin-top: 10px;
  `;

  const StoreLocation = styled.p`
    font-size: 25px;
    font-weight: 400;
  `;
  const StoreSchedule = styled.p`
    font-size: 21px;
    font-weight: 200;
  `;
  
  const Image = styled.img`
    object-fit: cover;
  `;


  const StoreContent = styled.div`

  `;

  
  const HiddenContainer = styled.div`
    transition: all 0.5s ease-in-out;
  `;

  const AboutUs = styled.p`
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 20px;
    max-height: 700px;
    min-height: 310px;
    overflow-y: scroll;
  `;





  export default Details;