import React, { useState } from "react";
import styled from "styled-components";
import MyButton from "../../../components/Button";
import FormInputComponent from "../../../components/InputComponent";
import ClipLoader from "react-spinners/ClipLoader";
import FormTitleSection from "../../../components/modal/FormTitleSection";

const BudgetCategoryReusable = ({
  closeModal,
  onClick,
  placeholder,
  label,
  type,
  name,
  buttonType,
  value,
  formTitle,
  onChange,
}) => {
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);

  return (
    <StyledHome>
      <FormTitleSection title={formTitle} onClick={closeModal} />
        <FormInputComponent
          placeholder={placeholder}
          label={label}
          type={type}
          onChange={onChange}
          name={name}
          value={value}
        />
        <MyButton  type="submit" onClick={onClick}>
        {loading ? <ClipLoader color="white" size="40px" /> : "Save"}
      </MyButton>
    </StyledHome>
  );
};
export default BudgetCategoryReusable;

const StyledHome = styled.div`
  font-family: "Sofia Pro";
  display: flex;
  flex-direction: column;
  width: 100% !important;

`;
