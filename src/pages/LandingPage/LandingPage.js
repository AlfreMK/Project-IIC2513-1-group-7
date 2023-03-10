import {React, useEffect, useState} from 'react';
import styled from 'styled-components';
import {Link, useNavigate} from 'react-router-dom';
import img from '../../images/food_image.jpg';
import img1 from '../../images/stores/quickdeli/quickdeli.jpg';
import img2 from '../../images/stores/quickdeli/quickdeli_biblioteca.jpg';
import img3 from '../../images/stores/quickdeli/quickdeli_campus.jpg';
import img4 from '../../images/stores/quickdeli/quickdeli_persona.jpg';
import './index.css';
import logo from "../../images/icon.svg";



const LandingPage = () => {
  const navigate = useNavigate();
  localStorage.removeItem("currentUser");
  localStorage.removeItem("userToken");
  localStorage.setItem('isLoggedIn', JSON.stringify(false));
  
  // https://stackoverflow.com/questions/44205000/how-to-add-class-in-element-on-scroll-react-js
  const [scroll, setScroll] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 0);
    });
  }, []);
  return(
  <Container className=""> 
  <ImageLP className={`rounded shadow-2xl opacity-animation`} >
    <img className="w-full h-full rounded object-cover" style={{filter: "brightness(55%)"}} src={img} alt=""></img>
      <Logo src={logo}></Logo>
      <TextImage className="text-4xl font-bold mx-4 text-white text-center sm:text-6xl">Almuerzos UC</TextImage>
      <TextImage className="text-lg text-white mx-4 text-center sm:text-xl">Tu mejor aplicación para encontrar la comida que quieres en el momento que quieres!</TextImage>
  </ImageLP>
    <div className={`text-4xl md:text-5xl font-bold w-1/2 m-10 text-center ${scroll ? "fade-left-animation" : ""}` }>
      ¿Aún no tienes cuenta en <p className='text-blue-500 inline'>Almuerzos UC</p>?
    </div>
    <p className={`text-xl text-center mx-4 ${scroll ? "fade-right-animation" : ""}`}>
      Regístrate y obtén características únicas!
    </p>
    <div className={`flex flex-wrap  ${scroll ? "fade-right-animation" : ""}`}>
    <DivLink to={`../signinup/${2}`}className='m-10 mx-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded cursor-pointer'>Registrarse</DivLink>
    <DivLink to={`../signinup/${1}`} className='m-10 mx-3 bg-white hover:bg-blue-700 hover:text-white text-blue-500 font-bold py-2 px-4 border border-blue-700 rounded cursor-pointer'>Iniciar Sesión</DivLink>
  </div>
    <p className={`text-xl text-center mb-10 w-1/2 ${scroll ? "opacity-animation" : ""}`}>
      O si lo prefieres puedes empezar a ver las las tiendas...
    </p>
    <div onClick={event => {event.preventDefault();navigate('../index');}} className="cursor-pointer bg-black w-2/3 flex-column items-center relative mb-20">
        <Grid className={`relative grid grid-flow-row-dense grid-cols-2 grid-rows-2 shadow-2xl w-full hover:brightness-[85%]`}>
          <img className="brightness-75" src={img1} alt=""/>
          <img className="brightness-75" src={img2} alt=""/>
          <img className="brightness-75" src={img3} alt=""/>
          <img className="brightness-75" src={img4} alt=""/>
          <SeeStores  className='m-3 text-2xl md:text-3xl text-white font-bold rounded'>Ver Tiendas</SeeStores>
        </Grid>
    </div>

  </Container>

);
};

const DivLink = styled(Link)`
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;


const ImageLP = styled.div`
  width: 75%;
  height: 600px;
  margin-top: 100px;
  margin-bottom: 50px;
  @media (max-width: 640px) { 
    height: 400px;
  }
`

const Grid = styled.div`

`

const TextImage = styled.div`
    display: flex;
    justify-content: center;
    position: relative;

    top: -500px;
    @media (max-width: 640px) { 
      top: -350px;
    }
    
`

const SeeStores = styled.p`
text-align: center;
position: absolute;
width: 100%;
height: 100%;
display: flex;
justify-content: center;
align-items: center;
top: -10px;
`
// @media (max-width: 1250px) { 
//   top: -250px;
// }
// @media (max-width: 1000px) { 
//   top: -200px;
// }
// @media (max-width: 800px) { 
//   top: -150px;
// }
// @media (max-width: 700px) { 
//   top: -110px;
// }

const Logo = styled.img`
  height: 100px;
  aspect-ratio: 1;
  filter: invert(100%);
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  position: relative;
  left: calc(50% - 48px);;
  top: -510px;
  @media (max-width: 640px) { 
    top: -350px;
    height: 100px;
  }

`


export default LandingPage;