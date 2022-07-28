import React from "react";
import styled from "styled-components";
import Button from "../../../components/Button";
import FormInputComponent from "../../../components/InputComponent";
import LogoComponent from "../../../components/LogoComponent";
// import { Link } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import { useSelector } from "react-redux";
import request  from "../../../utils/apiHelper";
// import forgotPassword from "../../../redux/actions/auth/forgotPassword.action";

function ForgotPassword() {
  const forgotPasswordValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter valid email")
      .required("Email Address is Required"),
  });
  const { loading } = useSelector((state) => state.forgotPassword);
  // const dispatch = useDispatch();

  return (
    <StyledHome>
      <LogoComponent />
      <Formik
        validationSchema={forgotPasswordValidationSchema}
        initialValues={{
          "email": "",
        }}
        onSubmit={async (values) => {
          console.log(values);
          try {
            const res = await request.post("forgot-password", values, {
              DVC_KY_HDR: "2",
            });
            console.log(res);
            // toast.success("Password reset link sent to your email");
          } catch (error) {
            console.log(error);
          }
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          isValid,
        }) => (
          <div className="form__container">
            <p className="header">Forgot Password</p>

            <div className="form__wrapper">
              <FormInputComponent
                placeholder="Enter your email"
                label="Email"
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange("email")}
                error={errors.email}
              />
            </div>

            <div className="form__wrapper padding">
              <Button
                type="submit"
                disabled={!isValid}
                loading={loading}
                onClick={handleSubmit}
              >
                Reset Password
              </Button>
            </div>
            <div></div>
          </div>
        )}
      </Formik>
    </StyledHome>
  );
}

export default ForgotPassword;

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
    margin-top: 70px;
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
