import React from "react";
import styled from "styled-components";
import Button from "../../components/Button";
import FormInputComponent from "../../components/InputComponent";
import LogoComponent from "../../components/LogoComponent";
import {Link} from "react-router-dom";
import {Formik} from 'formik';
import * as yup from 'yup';
// import Layout from "../../components/dashboardSidebar/Layout";
const Home = () => {
  const registrationValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Please enter valid email')
      .required('Email Address is Required'),
    password: yup
      .string()
      .min(8, ({min}) => `Password must be at least ${min} characters`)
      .required('Password is required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
    lastName: yup
      .string()
      .required('Last Name is required'),
    firstName: yup
      .string()
      .required('First Name is required'),
    phoneNumber: yup
      .string()
      .required('Phone Number is required'),

  });
  return (
    // <Layout>
    <StyledHome>
      <LogoComponent />
      <Formik
          validationSchema={registrationValidationSchema}
          initialValues={{
            email: '',
            password: '',
            firstName: '',
            lastName : '',
            phoneNumber: '',
            confirmPassword: '',
            
          }}
          onSubmit={values => console.log(values)}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            isValid,
          }) => (
      <div className="form__container">
        <p className="header">Create an account</p>
        <div className="form__wrapper">
          <FormInputComponent placeholder="Enter your first name" label="First Name" 
            type = "text"
            value = {values.firstName}
            onChange = {handleChange('firstName')}
            error = {errors.firstName}
          />
        </div>
        <div className="form__wrapper">
          <FormInputComponent placeholder="Enter your last name" label="Last Name"
            type = "text"
            value = {values.lastName}
            onChange = {handleChange('lastName')}
            error = {errors.lastName}
          />
        </div>
        <div className="form__wrapper">
          <FormInputComponent placeholder="Enter your email" label="Email" 
            type = "email"
            value = {values.email}
            onChange = {handleChange('email')}
            error = {errors.email}
          />
        </div>
        
        <div className="form__wrapper">
          <FormInputComponent placeholder="Enter your phone number" label="Phone Number" 
            type = "text"
            value = {values.phoneNumber}
            onChange = {handleChange('phoneNumber')}
            error = {errors.phoneNumber}
          />
        </div>
        <div className="form__wrapper">
          <FormInputComponent type="password" placeholder="password" label="Password"
            value = {values.password}
            onChange = {handleChange('password')}
            error = {errors.password}
          />  
        </div>
        <div className="form__wrapper">
          <FormInputComponent placeholder="Confirm password" label="Confirm Password" 
            type = "password"
            value = {values.confirmPassword}
            onChange = {handleChange('confirmPassword')}
            error = {errors.confirmPassword}
          />
        </div>
        <div className="form__wrapper padding">
          <Button type="submit">Submit Button</Button>
        </div>
        <div>
          <p className="bottom__text">Already have an account?<span><Link to="/" > Login</Link> </span></p>

        </div>
      </div>
      )}
      </Formik>
    </StyledHome>
    // </Layout>
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
`

;
