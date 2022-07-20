import React from 'react'
import styled from "styled-components";
import Button from "../../../components/Button";
import FormInputComponent from "../../../components/InputComponent";
import LogoComponent from "../../../components/LogoComponent";
import {Link} from "react-router-dom";


function LoginPage() {
  return (
    <StyledHome>
      <LogoComponent />
      <div className="form__container">
        <p className="header">Login</p>
        <div className="form__wrapper">
          <FormInputComponent placeholder="Enter your email" label="Email" />
        </div>
        <div className="form__wrapper">
          <FormInputComponent placeholder="Enter your Password" label="Password" />
        </div>
        <div className='remember-me'>
          <input type="checkbox"  />
          <span>Remember Login</span>
        </div>
        <div className="form__wrapper padding">
          <Button type="submit">Login</Button>
        </div>
        <div>
          <Link to="/">
          <p className="text-center"> Forgot Password</p>
          </Link>
        </div>
        <div>
          <p className="bottom__text">Don't have an account ?<span ><Link to="/"
            className='to-register' 
          > Create An Account</Link> </span></p>

        </div>
      </div>
    </StyledHome>
  );
};
export default LoginPage;

const StyledHome = styled.div`
  font-family: "Inter";
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  overflow: auto;
  padding:20px;
  .form__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 600px;
    border: 1px solid #e6e6e6;
    @media (max-width: 768px) {
      width: 100%;
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
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;

    color: #21334F;
    
  }
  .padding{
    margin-bottom:20px;
  }
  .text-center{
    text-align:center;
    color :rgba(0, 156, 244, 1);
  }
  .to-register{
    color:rgba(20, 168, 0, 1);
  }
  .remember-me{
    display:flex;
    align-self:flex-start;
    margin-left:90px;
    align-items:center;
  }
  .remember-me input{
    width:30px;
    height:50px;
  }
`;
