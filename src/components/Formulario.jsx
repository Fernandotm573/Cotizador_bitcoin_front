import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Error from './Error';
import useSelectMoneda from '../hooks/useSelectMoneda';
import {monedas} from '../data/Monedas'



// Styled Components
const InputSubmit = styled.input`
    background-color: #2626e3;
    border: none;
    width: 100%;
    padding: 10px;
    color: fff;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 10px;
    transition: background-color .3s ease;
    margin-top: 30px;

    &:hover {
        background-color: #2f2f9b;
        cursor: pointer;
    }
`;

const Formulario = () => {

    //useEstate
    const [criptos, setCriptos] = useState([])
    const [error, setError] = useState(false)

      // Desestructura el resultado del hook
      const [moneda, SelectMoneda] = useSelectMoneda('Elige tu moneda', monedas);
      const [criptomoneda, SelectCriptoMoneda] = useSelectMoneda('Elige tu Criptomoneda', criptos);

    //UseEfect
    useEffect(() =>{
        const consultarApi = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=1&tsym=USD'

            //Fetch hacia la url
            const respuesta = await fetch(url)
            const resultado = await respuesta.json()

            //creamos un nuevo arreglo con map() para ir llenando arrayCriptos
            const arrayCriptos = resultado.Data.map( cripto => {

                const objeto = {
                    id: cripto.CoinInfo.Name,
                    nombre: cripto.CoinInfo.FullName
                }
                return objeto
            })
            setCriptos(arrayCriptos)

        }
        consultarApi()
        
    }, [])

    const handleSubmit = e =>{
        e.preventDefault()

        //Validacion del Formulario Vacio
        if([moneda, criptomoneda].includes('')){
            setError(true)
            return
        }
        setError(false)
        
    }

    //Formulario
    return (
        <>
           {error && <Error>Todos los campos son obligatorios</Error>}

           <form
             onSubmit={handleSubmit}
           >
              {/* Se utiliza el componente directamente */}
              <SelectMoneda />

              <SelectCriptoMoneda />

              <InputSubmit 
                  type="submit" 
                  value="Cotizar" />    
           </form>
        </>
    );
};

export default Formulario;
