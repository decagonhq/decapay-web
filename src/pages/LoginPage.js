import React from "react";
import styled from "styled-components";
import Button from "../components/Button";
import FormInputComponent from "../components/InputComponent";
const Home = () => {
  return (
    <StyledHome>
      <div>
        <FormInputComponent label="First Name" />
      </div>
      <div>
        <FormInputComponent label="Last Name" />
      </div>

      <Button type="submit">Submit Button</Button>
    </StyledHome>
  );
};
export default Home;
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
