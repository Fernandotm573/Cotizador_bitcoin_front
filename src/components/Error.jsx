import styled from '@emotion/styled'

//Styled Component
const Texto = styled.div`
    background-color: red;
    color: #fff;
    padding: 15px;
    font-size: 22px;
    text-transform: uppercase;
    font-family: 'Lato', sans-serif;
    font-weight: 700;
    text-align: center;
`


const Error = ({children}) => {
  return (
    <Texto>
        {children}
    </Texto>
  )
}

export default Error