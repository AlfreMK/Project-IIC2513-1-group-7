import React, { useState } from "react";
import styled from 'styled-components';
import {useParams} from 'react-router-dom';
import "../index.css";


  const Contact  = (props) => {
    const classProp = props.className;
    const selectedStore = props.store;
    return (
      <div className={classProp}>
      <ContactContainer>
        <ContactTitle style={{fontSize:"20px"}}>Contáctanos:</ContactTitle>
        <ContactContainer>
            <ContactTitle>Dirección</ContactTitle>
            {selectedStore.direction}
        </ContactContainer>
        <ContactContainer>
            <ContactTitle>Teléfono</ContactTitle>
            {selectedStore.phone}
        </ContactContainer>
        <ContactContainer>
            <ContactTitle>Mail</ContactTitle>
            {selectedStore.mail}
        </ContactContainer>
      </ContactContainer>
      </div>
    )
  };


  
  const ContactContainer = styled.div`
    display: flex;
    flex-direction: column;
  `;


  
  const ContactTitle = styled.h3`
    font-size: 18px;
    font-weight: 600;
    margin-top: 10px;
  `;


  export default Contact;