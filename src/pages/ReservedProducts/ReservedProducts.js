import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import {Link, useParams, Navigate} from 'react-router-dom';
import {getData, Round} from '../../backendFunctions/functions'
// import data from '../../data.js';
import ClientRP from './ClientRP';
import OwnerRP from './OwnerRP';
import "./reservedProducts.css";

const ReservedProducts = () => {
//   const navigate = useNavigate();
  const {userId} = useParams();
//   console.log(userId);
//   console.log(JSON.parse(localStorage.getItem("currentUser")).id);
  const [tabState, setTabState] = useState(0);

//   if (!localStorage.getItem("currentUser")) {
// 	window.alert("Debes iniciar sesión");
// 	return <Navigate to="../"/>
//   }

  return(
    <div className="flex flex-col justify-center items-center p-4">
			<Container>
				<TabContainer className="bg-gray-100">
						<Tab onClick={(event)=>{event.preventDefault();setTabState(0)}}
						className={"font-medium text-xl " + (tabState===0? "bg-white shadow-right" : "cursor-pointer")}
						>
								Cliente
						</Tab>
						<Tab onClick={(event)=>{event.preventDefault();setTabState(1)}}
						className={"font-medium text-xl " + (tabState===1? "bg-white shadow-left" : "cursor-pointer")}
						>
								Vendedor
						</Tab>
				</TabContainer>
        <ClientRP userId={userId} className={"z-50 bg-white relative rounded-xl "+ (tabState===0? "" : "hidden")}/>
        <OwnerRP userId={userId}  className={"z-50 bg-white relative rounded-xl "+ (tabState===1? "" : "hidden")}/>
			</Container>

	</div>

);
};

const TabContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	border-top-left-radius: 12px;
	border-top-right-radius: 12px;
	box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.24);
	z-index: -1;

`;

const Container = styled.div`
	box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
	border-radius: 12px;
`;

const Tab = styled.div`
	border-top-left-radius: 12px;
	border-top-right-radius: 12px;
	width: 100%;
	padding-top: 12px;
	padding-bottom: 12px;
	text-align: center;
	;
`;
export default ReservedProducts;