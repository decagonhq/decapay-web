import React from "react";
import styled from "styled-components";
import Button from "../../components/Button";
import FormInputComponent from "../../components/InputComponent";
import LogoComponent from "../../components/LogoComponent";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
// import Layout from "../../components/dashboardSidebar/Layout";
import { useDispatch, useSelector } from "react-redux";
import registerUser from "../../redux/actions/auth/signup.action";

const Home = () => {
  const phoneRegExp = /^\d*(\+\d+)?$/;
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter valid email")
      .required("Email Address is Required"),
    password: Yup.string()
      .min(8, ({ min }) => `Password must be at least ${min} characters`)
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    lastName: Yup.string().required("Last Name is required"),
    firstName: Yup.string().required("First Name is required"),
    phoneNumber: Yup.string()
      .required("Phone Number is required")
      .matches(phoneRegExp, "Phone Number is not valid")
      .min(11, "Phone Number cannot be less than 11 digits")
      .max(14, "Phone Number must be more than digits"),
  });

  const signup = useSelector((state) => state.signup);
  console.log(signup);
  const dispatch = useDispatch();
  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
    lastName: "",
    firstName: "",
    phoneNumber: "",
  };

  const onSubmit = (values) => {
    delete values.confirmPassword;
    dispatch(registerUser(values));
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <StyledHome>
      <LogoComponent />

      <div className="form__container">
        <p className="header">Create an account</p>
        <form onSubmit={formik.handleSubmit}>
          <div className="form__wrapper">
            <FormInputComponent
              placeholder="Enter your first name"
              label="First Name"
              name="firstName"
              type="text"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              error={formik.errors.firstName}
            />
          </div>
          <div className="form__wrapper">
            <FormInputComponent
              placeholder="Enter your last name"
              label="Last Name"
              name="lastName"
              type="text"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              error={formik.errors.lastName}
            />
          </div>
          <div className="form__wrapper">
            <FormInputComponent
              placeholder="Enter your email"
              label="Email"
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.errors.email}
            />
          </div>

          <div className="form__wrapper">
            <FormInputComponent
              placeholder="Enter your phone number"
              label="Phone Number"
              type="text"
              name="phoneNumber"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              error={formik.errors.phoneNumber}
            />
          </div>
          <div className="form__wrapper">
            <FormInputComponent
              type="password"
              placeholder="password"
              label="Password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.errors.password}
            />
          </div>
          <div className="form__wrapper">
            <FormInputComponent
              placeholder="Confirm password"
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              error={formik.errors.confirmPassword}
            />
          </div>
          <div className="form__wrapper padding">
            <Button
              loading={signup.loading}
              onClick={formik.handleSubmit}
              type="submit"
            >
             {(!signup.loading && "Sign up") || ""}
            </Button>
          </div>
        </form>
        <div>
          <p className="bottom__text">
            Already have an account?
            <span>
              <Link to="/login"> Login</Link>{" "}
            </span>
          </p>
        </div>
      </div>
    </StyledHome>
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
  padding: 20px;
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
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;

    color: #21334f;
    span {
      color: #14a800;
      Link {
        text-decoration: none;
      }
    }
  }
  .padding {
    margin-bottom: 20px;
  }
  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;
