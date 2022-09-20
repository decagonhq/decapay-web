import React, { useState} from "react";
import styled from "styled-components";
import Button from "../../components/Button";
import FormInputComponent from "../../components/InputComponent";
import { useFormik } from "formik";
import * as Yup from "yup";
import ClipLoader from "react-spinners/ClipLoader";
import request from "../../utils/apiHelper";
import { toast } from "react-toastify";

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required("Password is required"),
  newPassword: Yup.string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required("Password is required"),
  confirmNewPassword: Yup.string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required("Password is required")
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),

});

const Home = () => {

  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line
  const [disabled, setDisabled] = useState(true);

  const initialValues = {
    password: "",
    newPassword: "",
    confirmNewPassword: "",
  };
  const resetFormik = () => {
    formik.setFieldValue("password", "");
    formik.setFieldValue("newPassword", "");
    formik.setFieldValue("confirmNewPassword", "");
  };
  const dismissToast = () => {
    toast.dismiss();
  };
  const changePassword = async (values) => {
    try {
      setLoading(true);
      const response = await request.post(`profile/changePassword`, values);
      let promiseFulfilled = response.data;
      setLoading(false);
      toast.success(promiseFulfilled.message, {
        onClose: dismissToast,
      });
      resetFormik();
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message, {
        onClose: dismissToast,
      });
    }
  };
  const onSubmit = (values) => {
    console.log(values);
    changePassword(values);
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
            name="password"
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
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            error={formik.errors.newPassword}
          />
        </div>
        <div className="form__wrapper">
          <FormInputComponent
            placeholder="Confirm New Password"
            type="password"
            name="confirmNewPassword"
            value={formik.values.confirmNewPassword}
            onChange={formik.handleChange}
            error={formik.errors.confirmNewPassword}
          />
        </div>
        {/* </div> */}
        <div className="form__wrapper padding">
          <Button disabled={
            !formik.isValid
          }onClick={formik.handleSubmit} type="submit">
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
