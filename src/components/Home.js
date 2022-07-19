import React from 'react'
import styled from 'styled-components'

const Home = () => {
  return (
    <StyledHome>
      <h1>DECAPAY Home</h1>
    </StyledHome>
  )
}
export default Home

const StyledHome = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #fafafa;
  h1 {
    font-size: 2rem;
    font-weight: bold;
    color: #333;
    text-transform: uppercase;
  }
`;