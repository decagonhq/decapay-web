import React, { useState } from "react";
import styled from "styled-components";
import MyButton from "../../components/Button";
import FormInputComponent from "../../components/InputComponent";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import ClipLoader from "react-spinners/ClipLoader";
import FormTitleSection from "../../components/modal/FormTitleSection";

const EditBudgetCategory = ({ closeModal }) => {
  const [loading, setLoading] = useState(false);
  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter valid email")
      .required("Email Address is Required"),
    password: yup
      .string()
      .min(8, ({ min }) => `Password must be at least ${min} characters`)
      .required("Password is required"),
  });

  return (
    <StyledHome>
      <FormTitleSection title="Edit buget category" onClick={closeModal} />
      <div className="form__wrapper">
        <FormInputComponent
          placeholder="Budget category name"
          label="Budget category"
          type="text"
          name="budgetCategory"
        />
      </div>
      <div className="btn">
        <MyButton type="submit" value="Create Budget" className="form__button">
          {loading ? <ClipLoader color="white" size="40px" /> : "Save"}
        </MyButton>
      </div>
    </StyledHome>
  );
};
export default EditBudgetCategory;

const StyledHome = styled.div`
  .form__wrapper {
    width: 100%;
    border-radius: 5px;
  }
  .btn{
    display: flex;
    justify-content: center;
    align-items: center;
    border:none;
  }
`;
