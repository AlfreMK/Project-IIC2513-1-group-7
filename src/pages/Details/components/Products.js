import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import axios from 'axios';
import "../index.css";
import image from '../../../images/stores/quickdeli/quickdeli1.jpg';
import {getData} from '../../../backendFunctions/functions'
import FormNewProduct from "./FormNewProduct/FormNewProduct";
import FormEditProduct from "./FormEditProduct/FormEditProduct";
import FormReserveProduct from "./ReserveProduct/ReserveProduct";
import Modal from '../../Modal/Modal';
import Warning from "./Warning/Warning";

const Products  = (props) => {
  // console.log(props, "producots");
  const classProp = props.className;
    const [currentUser, setCurrentUser] = useState("");
    const [stateRProducts, setStateRProducts] = useState({
      clientId: "",
      storeId: props.storeId,
      ownerId: props.ownerId,
    });
    const mailStore = props.mailStore;
    const ownerId = props.ownerId;
    const boolTienda = props.boolStore;
    const [stateLabel, setStateLabel] = useState({state1: true, state2: true, state3: true, state4: true, state5: true, state6: true, state7: true});
    const ChangeStateLabel = (label) => {
      if (label===1){
        setStateLabel(prev => ({...prev, state1: !stateLabel.state1}));
      }
      else if (label===2){
        setStateLabel(prev => ({...prev, state2: !stateLabel.state2}));
      }
      else if (label===3){
        setStateLabel(prev => ({...prev, state3: !stateLabel.state3}));
      }
      else if (label===4){
        setStateLabel(prev => ({...prev, state4: !stateLabel.state4}));
      }
      else if (label===5){
        setStateLabel(prev => ({...prev, state5: !stateLabel.state5}));
      }
      else if (label===6){
        setStateLabel(prev => ({...prev, state6: !stateLabel.state6}));
      }
      else if (label===7){
        setStateLabel(prev => ({...prev, state7: !stateLabel.state7}));
      }
    };
    const [deleteMode, setDeleteMode] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const activeLabel = " text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-white bg-blue-600 uppercase last:mr-0 mr-1 ";
    const activeLabelDelete = " text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-white bg-red-500 uppercase last:mr-0 mr-1 ";
    const inactiveLabelDelete = " text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-white bg-red-200 uppercase last:mr-0 mr-1 ";
    const inactiveLabel = " text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-white bg-blue-300 uppercase last:mr-0 mr-1 ";
    const storeId = props.store;
    const [firstInstance, setFirstInstance] = useState(true);
    const [selectedStore, setData] = useState({Products: []});
    const [modalMode, buttonMode] = useState(1);
    // console.log(currentUser.toString());
    const [dataProduct, setDataProduct] = useState({
      id: null,
      name: '',
      description: '',
      price: '',
      category: 'Plato del dia',
      stock: '',
    });
    function updateData(store_id) {
      let changeData = getData(`/products/id/${store_id}`);
      changeData.then((json) => {
        if (json){
          setData(json);
        }
        // console.log(json);
      });
    }
    if (firstInstance){
      updateData(storeId);
      setFirstInstance(false);
    };
    useEffect(() => {
      if (localStorage.getItem("isLoggedIn") === "true"){
        setCurrentUser(JSON.parse(localStorage.getItem("currentUser")).id);
        setStateRProducts({
          clientId: localStorage.getItem("userid"),
          storeId: props.storeId,
          ownerId: props.ownerId,
        });
      }
    }
    , [currentUser]);
    useEffect(() => {
      updateData(storeId);
    }, [storeId]);
    useEffect(() => {
      const updateProducts = () => {
        updateData(storeId);
        setShowModal(false);
        setDataProduct({
          id: null,
          name: '',
          description: '',
          price: '',
          category: 'Plato del dia',
          stock: '',
        })
      }
      window.addEventListener('productsHasBeenUpdated', updateProducts);
      return () => {
        window.removeEventListener('productsHasBeenUpdated', updateProducts);
      }
    }, [storeId]);
    
    const changeDeleteMode = () => {
      setDeleteMode(!deleteMode);
    }
    const deleteProduct = (id) => {
      if (deleteMode){
        // console.log(id);
        axios.delete(
          `${process.env.REACT_APP_SERVER_URL}/product/delete/id/` +
          id)
          .then(res => {
            if (res.status === 200){
              console.log('Product successfully deleted');
              window.dispatchEvent(new Event("productsHasBeenUpdated"));
              }
              else
              Promise.reject()
            })
            .catch(err => console.log('Something went wrong'));
      }

    }
    const editProduct = (product) => {
      if (modalMode===2){
        setDataProduct(product);
        setShowModal(true);
      }
    }
    const ReserveProduct = (product) => {
      if (product.stock > 0){
        setDataProduct(product);
        setStateRProducts({
          clientId: localStorage.getItem("userid"),
          ownerId: props.ownerId,
        })
        buttonMode(3);
        setShowModal(true)
      }
      else {
        buttonMode(4);
        setShowModal(true);
      }
    }
    return (
      <div className={classProp}>

        <Modal
            show={showModal}
            setShow={setShowModal}
            products={true}
        // hideCloseButton
        >
          <div className="modal-container" >
            {modalMode === 1 &&
            <FormNewProduct storeId={storeId} />
            }
            {modalMode === 2 &&
            <FormEditProduct dataProduct={dataProduct} storeId={storeId} />
            }
            {modalMode === 3 &&
            <FormReserveProduct dataProduct={dataProduct} clientId={stateRProducts.clientId} ownerId={stateRProducts.ownerId} storeId={storeId} />
            }
            {modalMode === 4 &&
            <Warning mail={mailStore} />
            }
          </div>
        </Modal>


      <Container className="">
        <LabelsContainer>
          <span className={"cursor-pointer mb-2 " + (stateLabel.state1? activeLabel : inactiveLabel)} onClick={event => {event.preventDefault();ChangeStateLabel(1);}}>
            Plato del día
          </span>
          <span className={"cursor-pointer mb-2 " + (stateLabel.state2? activeLabel : inactiveLabel)} onClick={event => {event.preventDefault();ChangeStateLabel(2);}}>
            Sandwiches
          </span>
          <span className={"cursor-pointer mb-2 " + (stateLabel.state3? activeLabel : inactiveLabel)} onClick={event => {event.preventDefault();ChangeStateLabel(3);}}>
            Ensaladas
          </span>
          <span className={"cursor-pointer mb-2 " + (stateLabel.state4? activeLabel : inactiveLabel)} onClick={event => {event.preventDefault();ChangeStateLabel(4);}}>
            Wraps
          </span>
          <span className={"cursor-pointer mb-2 " + (stateLabel.state5? activeLabel : inactiveLabel)} onClick={event => {event.preventDefault();ChangeStateLabel(5);}}>
            Postres
          </span>
          <span className={"cursor-pointer mb-2 " + (stateLabel.state6? activeLabel : inactiveLabel)} onClick={event => {event.preventDefault();ChangeStateLabel(6);}}>
            Veggie
          </span>
          <span className={"cursor-pointer mb-2 " + (stateLabel.state7? activeLabel : inactiveLabel)} onClick={event => {event.preventDefault();ChangeStateLabel(7);}}>
            Pastas
          </span>
        </LabelsContainer>
        {boolTienda &&
        <ButtonContainer className="">
          <ButtonEdit onClick={() => {setShowModal(true);buttonMode(1);}} className={`cursor-pointer mb-2 ` + activeLabel + ` hover:bg-blue-800`}>
            <i className="fas fa-plus"></i>
            <p className="mx-2 hidden">Agregar</p>
          </ButtonEdit>
          <ButtonEdit onClick={() => {if (modalMode!==2){buttonMode(2)}else if (modalMode===2){buttonMode(1)};if (deleteMode){changeDeleteMode();}}} className={`cursor-pointer mb-2 pr-1.5 ` + (modalMode===2? activeLabel: inactiveLabel)}>
            <i className="fas fa-edit"></i>
            <p className="mx-2 hidden">Editar</p>
          </ButtonEdit>
          <ButtonEdit onClick={() => {changeDeleteMode();if (modalMode===2){buttonMode(1)};}} className={`cursor-pointer mb-2 ` + (deleteMode? activeLabelDelete : inactiveLabelDelete)}>
            <i className="fas fa-trash"></i>
            <p className="mx-2 hidden">Modo Borrar</p>
          </ButtonEdit>
        </ButtonContainer>}
      </Container>
      <Menu>
        {selectedStore.Products
        .filter(function(product) {
            if (product.category==="Plato del dia" && stateLabel.state1){
              return product;
            }
            else if (product.category==="Sandwiches" && stateLabel.state2){
              return product;
            }
            else if (product.category==="Ensaladas" && stateLabel.state3){
              return product;
            }
            else if (product.category==="Wraps" && stateLabel.state4){
              return product;
            }
            else if (product.category==="Postres" && stateLabel.state5){
              return product;
            }
            else if (product.category==="Vegetariano" && stateLabel.state6){
              return product;
            }
            else if (product.category==="Pastas" && stateLabel.state7){
              return product;
            }
            return false;
          })
          .map((product)=> (
            <ProductContainer key={product.id} className={`relative w-40 h-40 overflow-hidden ` + (modalMode===2? "cursor-pointer": "")} onClick={event => {event.preventDefault();deleteProduct(product.id);editProduct(product)}}>
                {/* onClick={deleteProduct(product.id)} */}
              {/* <ImageProduct className="shadow-inner" src={product.urlImage} alt={product.name} /> */}
              <ImageProduct className="shadow-inner" src={image} alt={product.name}/>
              <ProductText className={'absolute bottom-0 left-0 '
               + (deleteMode? "delete-product-container " : "" )
               + (modalMode===2? "delete-product-container edit-product-container": "")
               + (!(modalMode===2||deleteMode)? " no-delete-product-container" : "" )}>
                <div className={"icon-delete " + (deleteMode? "": "hidden")}>
                  <i className={"fa fa-remove"} style={{fontSize: "120px", filter: "opacity(0.5)"}}></i>
                </div>
                <div className={(deleteMode? "opacity-40 product-info px-6 py-4 ": "px-6 py-4 ")}>
                  <h3>{product.name}</h3>
                  <ProductInfo>{product.description}</ProductInfo>
                  <ProductInfo>${product.price} CLP</ProductInfo>
                  <ProductInfo>{product.stock} Reservas Disponibles</ProductInfo>
                  {currentUser.toString()!=='undefined' &&
                    <button className="bg-blue-700 p-2 px-3 rounded-md button-reserve mt-4 text-base"
                    onClick={event => {event.preventDefault();ReserveProduct(product);}}>
                      Reservar
                    </button>
                  }
                </div>
              </ProductText>
            </ProductContainer>
        ))}
    </Menu>
    </div>
    )
  };

  
  const ProductText = styled.div`
  `;

  const ProductInfo = styled.p`
  font-size: 16px;
  display: none;
  margin-top: 20px;
  transition: 3s;
  @media (max-width: 900px) { 
    font-size: 14px;
  }
`;
  
  const ImageProduct = styled.img`
    width: 100%;
    aspect-ratio: 1;
    height: 300px;
`;


  const ProductContainer = styled.div`
    width: 300px;
    min-width: 300px;
    height: 300px;
    justify-content: center;
    align-items:center;
    margin: 10px;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
    background-color: black;
    @media (max-width: 900px) { 
      height: 250px;
      width: 250px;
      min-width: 250px;
    }
  `;

  const Menu = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    height: auto;
    transition: max-height 1s ease-out;
    max-height: 700px;
    min-height: 310px;
    overflow-y: scroll;
    transition: all 1s ease-out;
    border-bottom: 1px solid #e6e6e6;
  `;

  const LabelsContainer = styled.div`
  margin: 10px;
  margin-top: 15px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-right: 15px;
`

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


const ButtonEdit = styled.div`
  
  
`

  export default Products;