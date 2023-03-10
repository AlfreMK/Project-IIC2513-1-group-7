import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {getData, Round} from '../../backendFunctions/functions'
// import data from '../../data.js';
import img from '../../images/stores/quickdeli/quickdeli4.jpg';
import UserRP from "./UserRP";
import axios from 'axios';

const OwnerRP = (props) => {
	const userId = props.userId;
	const classProp = props.className;
  const [data, setData] = useState([]);
  // console.log("index");
  // console.log(localStorage.getItem('userid'));
  const updateData = () => {
	let changeData = getData(`/rproducts/owner/${userId}`);
    changeData.then((json) => {
		if (json){
			setData(json[0]);
		}
	});
	}
  const [firstInstance, setFirstInstance] = useState(true);
	if (firstInstance){
		updateData();
		setFirstInstance(false);
	};
  useEffect(() => {
	window.addEventListener('rproductsHasBeenUpdated', updateData);
	return () => {
		window.removeEventListener('rproductsHasBeenUpdated', updateData);
	}
  }, []);

  const deleteReserve = (id) => {
		axios.delete(
			`${process.env.REACT_APP_SERVER_URL}/rproducts/delete/` +
			id)
			.then(res => {
				if (res.status === 200){
					console.log('Reserve successfully deleted');
					window.dispatchEvent(new Event("rproductsHasBeenUpdated"));
					}
					else
					Promise.reject()
				})
				.catch(err => console.log('Something went wrong'));
		}
	const cancel = (id) => {
		axios.put(
			`${process.env.REACT_APP_SERVER_URL}/product/cancelReserve/${id}`)
			.then(res => {
				if (res.status === 200){
					console.log('Product successfully updated');
					window.dispatchEvent(new Event("rproductsHasBeenUpdated"));
				}
				else
				Promise.reject()
			})
			.catch(err => console.log('Something went wrong'))}
	const cancelAll = () => {
		axios.put(
			`${process.env.REACT_APP_SERVER_URL}/rproducts/cancelAll/${0}/${userId}`)
			.then(res => {
				if (res.status === 200){
					console.log('Reserves successfully cancelled');
					window.dispatchEvent(new Event("rproductsHasBeenUpdated"));
					}
					else
					Promise.reject()
				})
				.catch(err => console.log('Something went wrong'));
		}
	const deleteAll = () => {
		axios.delete(
			`${process.env.REACT_APP_SERVER_URL}/rproducts/deleteAll/${0}/${userId}`)
			.then(res => {
				if (res.status === 200){
					console.log('Reserves successfully deleted');
					window.dispatchEvent(new Event("rproductsHasBeenUpdated"));
					}
					else
					Promise.reject()
				})
				.catch(err => console.log('Something went wrong'));
		}
  return(
	<div className={`flex flex-col justify-center items-center ${classProp}`}>
  <Container className= "mx-4">
		<div className="flex py-2 justify-between w-full items-center">
			<p className="text-xl md:text-2xl font-medium px-4">Productos Reservados</p>
			<div className="flex flex-col">
				<button className="p-2 my-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 text-xs md:text-sm" onClick={() => deleteAll()}>
					<i className="fas fa-check px-1"></i> 
					Todos entregados
				</button>
				{/* <button className="text-red-500 hover:text-red-600 text-xs md:text-sm px-4" onClick={() => cancelAll()}>
					Cancelar todos
				</button> */}
			</div>
		</div>
    {data.map((product, index)=> (
      <ProductContainer key={product.id}>

		<div className="w-24 text-sm md:text-base">
			Reservado en 
			<StoreLink to={`${process.env.REACT_APP_URL}/details/${product.store_id}`} className="font-medium hover:underline">
				<p>{product.store_name}</p>
			</StoreLink>
			por <UserRP className="font-medium inline hover:underline" userId={product.clientId}/>
		</div>
		<img src={img} className="inline-object hidden md:block w-36 h-36 mr-2 rounded-full" alt="product" />
		<MiddleContainer className="p-4">
			<p className="font-medium text-lg md:text-xl">{product.name}</p>
			<p className="text-xs md:text-sm hidden md:block">{product.description}</p>
		</MiddleContainer>
		<RightContainer className="p-4">
			<p className="font-medium text-base md:text-lg">${product.price}</p>
			<button className="p-2 my-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 text-xs md:text-sm" onClick={() => deleteReserve(product.id)}>
				<i className="fas fa-check px-1"></i>
				Entregado
			</button>
			<button className="text-red-500 hover:text-red-600 text-xs md:text-sm" onClick={(event) => {event.preventDefault();cancel(product.product_id);deleteReserve(product.id)}}>
				Cancelar
			</button>
		</RightContainer>
      </ProductContainer>
      ))}
	<div className="flex w-full justify-end pr-8 py-6">
		<div className="flex flex-col px-5">
			<p className="font-medium text-xl">Total</p>
			<p className="text-xs">{data.length} productos</p>
		</div>
		<p className=" text-lg md:text-xl font-medium px-5">${data.reduce((acc, curr) => acc + curr.price, 0)}</p>
	</div>
  </Container>
	</div>

);
};

const StoreLink = styled(Link)`
`;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding:30px;
	padding-bottom: 0;
	
`;

const ProductContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	padding-top: 10px;
	padding-bottom: 10px;
	border-bottom: 1px solid #e0e0e0;
	width: 100%;
	justify-content: space-between;

`;

const RightContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const MiddleContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

export default OwnerRP;