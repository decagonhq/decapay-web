import React,{useState} from 'react'
import styled from "styled-components";
import Button from "../../../components/Button";
import FormInputComponent from "../../../components/InputComponent";
import LogoComponent from "../../../components/LogoComponent";
import {Link} from "react-router-dom";
import {Formik} from 'formik';
import * as yup from 'yup';
import login from "../../../redux/actions/auth/login.action";
import { useDispatch } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";

const  LoginPage=()=> {
  const [loading, setLoading] = useState(false);
  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Please enter valid email')
      .required('Email Address is Required'),
    password: yup
      .string()
      .min(8, ({min}) => `Password must be at least ${min} characters`)
      .required('Password is required'),
  });
  // const {loading} = useSelector((state) => state.login);
  const dispatch = useDispatch();
  
  return (
    <StyledHome>
      <LogoComponent />
      <Formik
          validationSchema={loginValidationSchema}
          initialValues={{
            email: '',
            password: '',
            
          }}
          onSubmit={
            (values) => {
              setLoading(true);
              // console.log(values);
              dispatch(login(values));
              setLoading(false);
            }
          }>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            isValid,
          }) => (
      <div className="form__container">
        <p className="header">Login</p>
        
        <div className="form__wrapper">
          <FormInputComponent placeholder="Enter your email" label="Email"
            type = "email"
            name="email"
            value = {values.email}
            onChange = {handleChange}
            error = {errors.email}
           />
        </div>
        <div className="form__wrapper">
          <FormInputComponent placeholder="Enter your Password" label="Password"
            type = "password"
            name = "password"
            value = {values.password}
            onChange = {handleChange}
            error = {errors.password}
          />
        </div>
        <div className='remember-me'>
          <input clasName="checkbox" type="checkbox"  />
          <span>Remember Login</span>
        </div>
        <div className="form__wrapper padding">
          <Button type="submit"
            disabled={!isValid}
            loading={loading}
            onClick = {handleSubmit}
          >{loading? <ClipLoader color="white" size="40px" />:"Login"}</Button>
        </div>
        <div>
          <Link to="/forgotPassword">
          <p className="text-center"> Forgot Password</p>
          </Link>
        </div>
        <div>
          <p className="bottom__text">Don't have an account ?<span ><Link to="/register"
            className='to-register' 
          > Create An Account</Link> </span></p>

        </div>
      </div>
       )}
       </Formik>
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
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #21334F;
    
  }
  .padding{
    margin-bottom:20px;
    align-self : center;
    align-items: center;
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
    gap:5px;
    margin-left:90px;
    gap : 5px;
    align-items:center;
    padding: 10px;
    @media (max-width: 768px) {
      margin-left:0px;
      justify-content:center;
      align-items:center;
      align-self:center;
    }
  }
  .remember-me input{
    width:20px;
    height:20px
  }
  input[type="checkbox"] {
    border-radius: 10px;
  }
`;
