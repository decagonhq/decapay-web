import React, { useState} from "react";
import styled from "styled-components";
import Button from "../../components/Button";
import FormInputComponent from "../../components/InputComponent";
import { useFormik } from "formik";
import * as Yup from "yup";
import ClipLoader from "react-spinners/ClipLoader";

const validationSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required("Password is required"),
  newPassword: Yup.string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required("Password is required"),
});

const Home = () => {

  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line
  const [disabled, setDisabled] = useState(true);

  const initialValues = {
    oldPassword: "",
    newPassword: "",
  };

  const onSubmit = (values) => {
    console.log(values);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <StyledHome>
      <p>Change password</p>
      <form onSubmit={formik.handleSubmit}>
        {/* <div className="two-column"> */}
        <div className="form__wrapper">
          <FormInputComponent
            type="password"
            placeholder="Old password"
            // label="Password"
            name="oldPassword"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.errors.password}
          />
        </div>
        <div className="form__wrapper">
          <FormInputComponent
            placeholder="New password"
            type="password"
            name="newPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            error={formik.errors.confirmPassword}
          />
        </div>
        {/* </div> */}
        <div className="form__wrapper padding">
          <Button disabled={disabled} onClick={formik.handleSubmit} type="submit">
            {loading ? (
              <ClipLoader color="white" size="40px" />
            ) : (
              "Change password"
            )}
          </Button>
        </div>
      </form>
    </StyledHome>
  );
};
export default Home;
const StyledHome = styled.div`
  .form__wrapper {
    width: 100% !important;
  }
  .padding {
    margin-bottom: 15px;
  }
  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;
