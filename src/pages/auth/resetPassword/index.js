import React from "react";
import styled from "styled-components";
import Button from "../../../components/Button";
import FormInputComponent from "../../../components/InputComponent";
import LogoComponent from "../../../components/LogoComponent";
// import { Link } from "react-router-dom";

function ResetPassword() {
  return (
    <StyledHome>
        <LogoComponent />
      <div className="form__container">
        <p className="header">Forgot Password</p>

        <div className="form__wrapper">
          <FormInputComponent placeholder="Enter Your new password" label="Password" />
        </div>
        <div className="form__wrapper">
          <FormInputComponent placeholder="Confirm new passsword" label="Confirm Password" />
        </div>
        
        
        <div className="form__wrapper padding">
          <Button type="submit">Confirm New Passoword</Button>
        </div>
        <div>
          
        </div>
        
      </div>
    </StyledHome>
  );
}

export default ResetPassword;

const StyledHome = styled.div`
  font-family: "Inter";
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  overflow: auto;
  padding: 20px;
  
  .form__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    align-self: center;
    margin-top : 70px;
    width: 600px;
    border: 1px solid #e6e6e6;
    @media (max-width: 768px) {
      width: 100%;
      padding: 20px;
    }
  }
  .header {
    font-style: normal;
    font-weight: 700;
    font-size: 32px;
    line-height: 39px;
    color: #21334f;
  }

  .form__wrapper {
    width: 70%;
    margin-bottom: -30px;
    border-radius: 5px;
  }
  .bottom__text {
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #21334f;
  }
  .padding {
    margin-bottom: 20px;
    margin-top: 20px;
    margin-left: 20px;
  }
  .text-center {
    text-align: center;
    color: rgba(0, 156, 244, 1);
  }
  .to-register {
    color: rgba(20, 168, 0, 1);
  }
  .remember-me {
    display: flex;
    align-self: flex-start;
    margin-left: 90px;
    align-items: center;
    @media (max-width: 768px) {
      margin-left: 0px;
      justify-content: center;
      align-items: center;
      align-self: center;
    }
  }
  .remember-me input {
    width: 30px;
    height: 50px;
  }
`;