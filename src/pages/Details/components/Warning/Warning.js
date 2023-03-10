import React, {useState} from 'react';
// import styled from 'styled-components';
import "./index.css";

const Warning = (props) => {
  const classProp = props.className;
  const mail = props.mail;
  const [clipBoardState, setClipBoardState] = useState("Copiar al Portapapeles");
  return (
    <div className={`flex justify-start ${classProp}`}>
        <div className='mr-4 mt-0.5 text-red-600'>
            <i className='fas fa-exclamation-circle'></i>
        </div>
        <div className={``}>
            <p className='text-lg font-medium text-red-600'>Error</p>
            <p>No hay stock suficiente.</p>
            <p>Prueba contactarte mediante el correo de la tienda:</p>
            <p 
            className='inline underline text-blue-600 cursor-pointer hover:text-blue-800 link-clipboard'
            onClick={(event)=>{event.preventDefault();navigator.clipboard.writeText(mail);setClipBoardState("Copiado")}}
            onMouseLeave={(event)=>{event.preventDefault();setClipBoardState("Copiar al Portapapeles")}}
            >{mail}</p>
            <div className='clipboard-message bg-gray-700 text-white text-xs p-2 mt-1 px-4 rounded'>
                {clipBoardState}
            </div>
        </div>

    </div>
  )
}


export default Warning;