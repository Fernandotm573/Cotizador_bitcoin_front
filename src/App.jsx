//import {useState} from 'react'
import styled from "@emotion/styled"
import ImagenCripto from './img/img_bitcoint.jpg'
import Formulario from "./components/Formulario"

//Styled Componets
const Contenedor = styled.div`
   max-width: 900px;
   margin:  0 auto;
   width: 90%;
   @media (min-width: 992px){
     display: grid;
     grid-template-columns: repeat(2, 1fr);
     column-gap: 2rem;
   }
`

const Imagen = styled.img `
   max-width: 400px;
   width: 80%;
   margin: 100px auto 0 auto;
   display: block;
`

const Heading  = styled.h1`
   font-family: 'lato', sans-serif;
   color: #fff;
   text-align: center;
   font-weight: 700;
   margin-top: 80px;
   margin-bottom: 50px;
   font-size: 34px;
`

function App() {

  return (
    
      <Contenedor>
         <Imagen src={ImagenCripto} alt="Imagen Cripto" /> 

         <div>
            <Heading> Cotizador de Bitcoint en tiempo real</Heading>

            <Formulario> </Formulario>
         </div>       
         
      </Contenedor>
    
  )
}

export default App
