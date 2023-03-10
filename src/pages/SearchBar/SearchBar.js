import React, { useState, useEffect, useRef } from "react";
import {Link, useNavigate} from 'react-router-dom';
import image from '../../images/stores/quickdeli/quickdeli_biblioteca.jpg';
import styled from "styled-components";
import axios from 'axios';
import pfp from '../../images/users/bojji.jpg';
import "./searchBar.css";



const SearchBar = (props) => {
	const [data, setData] = useState([]);
	const [searchValue, setSearchValue] = useState("");
	const [searchState, setSearchState] = useState("stores");
	const Search = (value) => {
		axios.get(
			`${process.env.REACT_APP_SERVER_URL}/search/${searchState}`, { params: { search: value } })
			.then(res => {
				if (res.status === 200){
					setData(res.data.data[0]);
					}
				else{
					Promise.reject();
					setData([]);
				}
				})
				.catch((err) => {
					setData([]);
				});
	}
	const handleSearch = (value) => {
		setSearchValue(value);
		Search(value);
	}
	const handleChangeOptionSelected = (event) => {
		event.preventDefault();
		if (searchState === "stores"){
			setSearchState("users");
		}
		else{
			setSearchState("stores");
		}
		setSearchValue("");
		setData([]);
	}

  return (
	<div className="flex items-center">
		<div className="relative text-white">
			<button className="fa-select flex items-center py-2 px-1 button-toggle bg-blue-700 hover:bg-blue-800 relative">
				<div className={(searchState==="users"? "" : " hidden ")}>
					<i className={`fas fa-user px-1`}></i>
				</div>
				<div className={(searchState==="stores"? "" : " hidden ")}>
					<i className={`fas fa-store px-1`}></i>
				</div>
				<i className="fa fa-angle-down px-1"></i>
			</button>
			<DropDownOption className={"bg-blue-500 hover:bg-blue-600 px-1 py-2 z-50 dropdown-option-search "}>
				<div className={(searchState==="users"? "hidden" : "flex items-center")}
				onClick={handleChangeOptionSelected}>
					<i className={`fas fa-user px-1`}></i> <p className="px-1">Usuarios</p>
				</div>
				<div className={(searchState==="stores"? "hidden" : "flex items-center")}
				onClick={handleChangeOptionSelected}>
					<i className={`fas fa-store px-1`}></i> <p className="px-1">Tiendas</p>
				</div>
			</DropDownOption>
		</div>
		<div className="relative flex flex-col justify-center">
			<i className="fa fa-search absolute ml-3.5 pointer-events-none text-gray-700"></i>
			<input type="search"
			className={`${props.className} p-2 pl-10 w-full text-gray-900 bg-gray-50 search-bar`}
			placeholder="Buscar..."
			onChange={(e) => handleSearch(e.target.value)}
			value={searchValue}
			/>
			{searchState==="stores" &&
			<DropDown className="rounded-lg dropdown-search z-50">
				{data.map((store, index) => {
					return (
					<LinkDiv to={`${process.env.REACT_APP_URL}/details/${store.id}`} key={index}>
						<div className={`flex items-center pl-6 py-2 text-sm bg-white hover:brightness-[85%] ` + (index === 0? " rounded-t-lg ": "") + (index+1 === data.length? " rounded-b-lg ": "")} >
							<img className="inline object- w-10 h-10 mr-2 rounded-xl" src={image} alt={""} />
								<p>{store.name}</p>
						</div>
					</LinkDiv>
					)
				}
				)}
			</DropDown>
			}
			{searchState==="users" &&
			<DropDown className="rounded-lg dropdown-search z-50">
				{data.map((user, index) => {
					return (
					<LinkDiv to={`${process.env.REACT_APP_URL}/viewuser/${user.id}`} key={index}>
						<div className={`flex items-center pl-6 py-2 text-sm bg-white hover:brightness-[85%] ` + (index === 0? " rounded-t-lg ": "") + (index+1 === data.length? " rounded-b-lg ": "")} >
							<img className="inline object- w-10 h-10 mr-2 rounded-full" src={pfp} alt={""} />
							<div>
								<p className="font-medium">{user.nickname}</p>
								<p className="text-xs">{user.name}</p>
							</div>
						</div>
					</LinkDiv>
					)
				}
				)}
			</DropDown>
			}
		</div>
	</div>
  );
};

const DropDown = styled.div`
	position: absolute;
	flex-direction: column;
	background-color: black;
	box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
	width: 100%;
	top: calc(100% + 10px);

`;

const DropDownOption = styled.div`
	position: absolute;
	box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
	top: calc(100% + 1px);
	padding-top: 5px;
	padding-bottom: 5px;
	left: 0px;
	border-radius: 8px;
	cursor: pointer;
`;

const LinkDiv = styled(Link)`
`;

export default SearchBar;
