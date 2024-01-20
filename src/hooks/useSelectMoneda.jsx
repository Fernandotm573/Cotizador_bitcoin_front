import { useState } from 'react';
import styled from '@emotion/styled';

// Styled Component
const Label = styled.label`
    color: #fff;
    display: block;
    font-family: 'Lato' sans-serif;
    font-size: 24px;
    font-weight: 700;
    margin: 15px 0;
`
const Select = styled.select`
    width: 100%;
    padding: 14px;
    font-size: 18px;
    border-radius: 10px;
`

const useSelectMoneda = (label, opciones) => {

    //UseState
    const [state, setState] = useState('')

    // Funcion del Hook
    const SelectMoneda = () => (

        <>
        {/* Aquí se retorna el JSX */}
            <Label>{label} </Label>
            <Select
               value={state}
               onChange= {e => setState(e.target.value)}
            >
                <option value="">Seleccione</option>

                {opciones.map(opcion =>(
                    <option
                    key= {opcion.id}
                    value={opcion.id}
                    
                    > {opcion.nombre} </option> 
                    
                                          
                )) }  
            </Select>
            
        </>
    );

    // Llama a la función para obtener el componente JSX
    return [state, SelectMoneda];
};

export default useSelectMoneda;
