import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import {useParams} from 'react-router-dom';
import {Link, useNavigate, Navigate} from 'react-router-dom';
import {getData} from '../../backendFunctions/functions';
import StoresByUser from './components/StoresByUser';
import StoresByUserCellPhone from './components/StoresByUserCellPhone';
import UComments from './components/UComments';
import "./index.css";
// import data from '../../data.js';
import pfp from '../../images/users/bojji.jpg';
import { Heart } from "../HeartComponent/HeartComponents";
const ViewUser = (props) => {

  const {id} = useParams();
  const navigate = useNavigate();
  const [userData, setData] = useState({
    name: '',
    nickname: '',
    email: '',
  });
  const [lengthStores, setLengthStores] = useState(0);
  // const [currentUser, setCurrentUser] = useState();
  const [currentUserid, setCurrentUserid] = useState("");
  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === 'true'){
      setCurrentUserid(JSON.parse(localStorage.getItem("currentUser")).id);
    };
    let changeData = getData(`/user/id/${id}`);
    changeData.then((json) => {
      if (json){
        setData(json);
      }
    });
    getData(`/user/stores/${id}`).then((json) => {
      if (json){
        setLengthStores(json[0].length);
      }
    });
  }, [id]);

  ////////////////////////
  const [openTab, setOpenTab] = useState(1);

  const activeClass = " cursor-pointer p-2.5 text-blue-600 rounded-t-lg border-b-2 border-blue-600";
  const inactiveClass = " cursor-pointer p-2.5 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300";
  const [clipBoardState, setClipBoardState] = useState("Copiar al Portapapeles");
  // if (!localStorage.getItem("currentUser")) {
  //   window.alert("Debes iniciar sesión");
  //   return <Navigate to="../"/>
  // }
  // console.log(currentUserid.toString());
  // console.log(id.toString());
  return (
    <Container>
      <UserInfo>
        <LeftUserInfo>
          <img className="inline object- w-40 h-40 mr-2 rounded-full" src={pfp} alt={"userpfp"} />
        </LeftUserInfo>
        <RightUserInfo>
          <UpperUserInfo>
            <p className="text-3xl mr-4">{userData.nickname}</p>
            {currentUserid.toString() === id.toString() &&
          //   <button onClick={event => {event.preventDefault(); useNavigate('../edituser/${id}');}} className="inline-block text-sm cursor-pointer bg-blue-600 rounded p-1 px-2 text-white  border border-blue-700 hover:bg-blue-700">
          //   Editar Usuario
          // </button>
            <ButtonEdit to={`${process.env.REACT_APP_URL}/edituser/${id}`} className="inline-block text-sm cursor-pointer bg-blue-600 rounded p-1 px-2 text-white  border border-blue-700 hover:bg-blue-700">
            Editar
            </ButtonEdit>
            }
          </UpperUserInfo>
          <BottomUserInfo>
            <div className="flex flex-col">
              <div>
                <p className="font-medium pb-2">{lengthStores} Tiendas</p>
              </div>
              <p>{userData.name}</p>
              <div className="relative">
                <p
                className='inline cursor-pointer hover:text-blue-800 hover:underline link-clipboard-profile'
                onClick={(event)=>{event.preventDefault();navigator.clipboard.writeText(userData.email);setClipBoardState("Copiado")}}
                onMouseLeave={(event)=>{event.preventDefault();setClipBoardState("Copiar al Portapapeles")}}
                >{userData.email}</p>
                <div className='clipboard-message-profile bg-gray-700 text-white p-1 mt-1 px-4 rounded text-xs'>
                  {clipBoardState}
                </div>
              </div>
            </div>
          </BottomUserInfo>
        </RightUserInfo>
      </UserInfo>
        <TabContent>
          <div className="flex justify-center tab-content text-gray-500 " >
            <ul className="flex justify-center " style={{width: "70%"}} >
              <li className="">
                <div  className={"tab-size " + (openTab === 1? activeClass : inactiveClass)} onClick={event => {event.preventDefault();setOpenTab(1);}}>
                <i className="fas fa-store mx-2"></i>
                Tiendas</div>
              </li>
              <li className="">
                <div className={"tab-size " + (openTab === 2? activeClass : inactiveClass)} onClick={event => {event.preventDefault();setOpenTab(2);}}>
                <i className="fas fa-heart mx-2"></i>
                Calificaciones </div>
              </li>
            </ul>
          </div>
          <div className="flex justify-center ">
          <HiddenContainer className={ (openTab === 1 ? "parent-container-stores " : "parent-container-uratings ")}>
            {/* <StoresByUser userId={id} className={(openTab === 1 ? "seen-animation hidden md:block":"hidden")}/>
            <StoresByUserCellPhone userId={id} className={(openTab === 1 ? "seen-animation md:hidden":"hidden")}/> */}
            {/* <UComments userId={id} className={(openTab === 2 ? "seen-animation":"hidden")}/> */}
          </HiddenContainer>
          </div>
        </TabContent>
    </Container>
  )
  };
  
  const TabContent = styled.div`
    width: 100%;
  `;

  const Image = styled.img`
    object-fit: cover;
  `;

  const Container = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  `;

  const HiddenContainer = styled.div`
    justify-content: center;
    overflow: hidden;
    
  `;

  const UserInfo = styled.div`
    display: flex;
    padding-bottom: 40px;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    padding-top: 40px;
  `;

  const RightUserInfo = styled.div`
  `;

  const LeftUserInfo = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
  `;

  const UpperUserInfo = styled.div`
    display: flex;
    align-items: center;
    padding-bottom: 5px;
  `;

  const BottomUserInfo = styled.div`
    display: flex;
    align-items: center;
    padding-top: 5px;
  `;
  const ButtonEdit = styled(Link)`
  
  
  `




  export default ViewUser;