import React from "react";
import styled from "styled-components";
import Button from "../../components/Button";
import FormInputComponent from "../../components/InputComponent";
import LogoComponent from "../../components/LogoComponent";
import {Link} from "react-router-dom";
import Layout from "../../components/dashboardSidebar/Layout";
const Home = () => {

  return (
    <Layout>
    <StyledHome>
      <LogoComponent />
      <div className="form__container">
        <p className="header">Create an account</p>
        <div className="form__wrapper">
          <FormInputComponent placeholder="Enter your first name" label="First Name" />
        </div>
        <div className="form__wrapper">
          <FormInputComponent placeholder="Enter your last name" label="Last Name" />
        </div>
        <div className="form__wrapper">
          <FormInputComponent placeholder="Enter your email" label="Email" />
        </div>
        <div className="form__wrapper">
          <FormInputComponent placeholder="Enter your phone number" label="Phone Number" />
        </div>
        <div className="form__wrapper">
          <FormInputComponent type="password" placeholder="password" label="Password" />
        </div>
        <div className="form__wrapper">
          <FormInputComponent placeholder="Confirm password" label="Confirm Password" />
        </div>
        <div className="form__wrapper padding">
          <Button type="submit">Submit Button</Button>
        </div>
        <div>
          <p className="bottom__text">Already have an account?<span><Link to="/" > Login</Link> </span></p>

        </div>
      </div>
    </StyledHome>
    </Layout>
  );
};
export default Home;
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
  }
  .bottom__text {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;

    color: #21334F;
    span{
      color:#14A800;
      Link{
        text-decoration: none;
      }
    }
  }
  .padding{
    margin-bottom:20px;
  }
`;
