import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import Error from './Error'
import useSelectMonedas from "../hooks/useSelectMoneda";
import { monedas } from "../data/Monedas";



//import { monedas } from '../data/monedas'

const InputSubmit = styled.input`
    background-color: #9497FF;
    border: none;
    width: 100%;
    padding: 10px;
    color: #FFF;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: background-color .3s ease;
    margin-top: 30px;
    &:hover {
        background-color: #7A7DFE;
        cursor: pointer;
    }
`

const Formulario = ({ setMonedas }) => {
    const [criptos, setCriptos] = useState([]);
    const [error, setError] = useState(false);
    const [moneda, SelectMonedas] = useSelectMonedas('Elige tu Moneda', monedas);
    const [criptomoneda, SelectCriptomoneda] = useSelectMonedas('Elige tu Criptomoneda', criptos);
  
    useEffect(() => {
      const consultarAPI = async () => {
        try {
          const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD';
          const respuesta = await fetch(url);
          const resultado = await respuesta.json();
  
          const arrayCriptos = resultado.Data.map((cripto) => ({
            id: cripto.CoinInfo.Name,
            nombre: cripto.CoinInfo.FullName,
          }));
  
          setCriptos(arrayCriptos);
        } catch (error) {
          console.error('Error al consultar la API de criptomonedas:', error.message);
          // Manejo del error aquí, puedes establecer un estado de error si es necesario.
        }
      };
  
      consultarAPI();
    }, []);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if ([moneda, criptomoneda].includes('')) {
        setError(true);
        return;
      }
  
      setError(false);
  
      try {
        const url = `http://localhost:3000/crt-api`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
  
        // Hacer algo con la respuesta (puede ser establecer un estado, mostrar en consola, etc.)
        console.log('Resultado de la API:', resultado);
  
        // Puedes pasar la respuesta a la función setMonedas si es necesario.
        setMonedas({
          moneda,
          criptomoneda,
          resultado, // Si necesitas pasar la respuesta al estado, por ejemplo.
        });
      } catch (error) {
        console.error('Error al obtener datos de la API:', error.message);
        // Manejo del error aquí.
      }
    };
  
    return (
      <>
        {error && <Error>Todos los campos son obligatorios</Error>}
  
        <form onSubmit={handleSubmit}>
          <SelectMonedas />
          <SelectCriptomoneda />
  
          <InputSubmit type="submit" value="Cotizar" />
        </form>
      </>
    );
  };
  
  export default Formulario;