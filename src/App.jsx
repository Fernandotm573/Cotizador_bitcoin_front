import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import Formulario from './components/Formulario';
import Resultado from './components/Resultado';
import Spinner from './components/Spinner';
//import ImagenCripto from './img/img_bitcoint.jpg';
import ImagenCripto from './img/bitcoin-3132717_1280.jpg';



const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
  border-radius: 50%;
`;

const Heading = styled.h1`
  font-family: 'Lato', sans-serif;
  color: #000;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;

  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #000000;
    display: block;
    margin: 10px auto 0 auto;
  }
`;



function App() {
  const [monedas, setMonedas] = useState({});
  const [resultado, setResultado] = useState({});
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (Object.keys(monedas).length > 0) {
      const cotizarCripto = async () => {
        try {
          setCargando(true);
          setResultado({});

          const { moneda, criptomoneda } = monedas;
          const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

          const respuesta = await fetch(url);

          if (!respuesta.ok) {
            throw new Error(`Error en la solicitud: ${respuesta.statusText}`);
          }

          const resultado = await respuesta.json();

          if (!resultado.DISPLAY || !resultado.DISPLAY[criptomoneda] || !resultado.DISPLAY[criptomoneda][moneda]) {
            throw new Error('Respuesta inesperada de la API');
          }

          setResultado(resultado.DISPLAY[criptomoneda][moneda]);
          setCargando(false);
        } catch (error) {
          console.error('Error al cotizar criptomoneda:', error);
          setCargando(false);
          setError('Error al obtener datos de la API');
        }
      };

      cotizarCripto();
    }
  }, [monedas]);

  return (
    <Contenedor>
      <Imagen
        src={ImagenCripto}
        alt="imagenes criptomonedas"
      />

      <div>
        <Heading>Cotizador de Criptomonedas en tiempo Real</Heading>
        <Formulario
          setMonedas={setMonedas}
        />

        {error && <p>Error: {error}</p>}
        {cargando && <Spinner />}
        {resultado.PRICE && <Resultado resultado={resultado} />}
      </div>
    </Contenedor>
  );
}

export default App;