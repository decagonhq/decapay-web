import React, { useState } from "react";
import styled from "styled-components";
import MyButton from "../../components/Button";
import FormInputComponent from "../../components/InputComponent";
import ClipLoader from "react-spinners/ClipLoader";
import FormTitleSection from "../../components/modal/FormTitleSection";

const BudgetCategoryReusable = ({ closeModal, onClick, placeholder, label,type, name, buttonType, value, formTitle, onChange}) => {

  // eslint-disable-next-line 
  const [loading, setLoading] = useState(false);
  

  return (
    <StyledHome>
      <FormTitleSection title={formTitle} onClick={closeModal} />
      <div className="form__wrapper">
        <FormInputComponent
          placeholder={placeholder}
          label= {label}
          type= {type}
          onChange= {onChange}
          name= {name}
          value = {value}
        />
      </div>
      <div className="btn">
        <MyButton type= {buttonType}  className="form__button"
          onClick={onClick}>
        
          {loading ? <ClipLoader color="white" size="40px" /> : "Save"}
        </MyButton>
      </div>
    </StyledHome>
  );
};
export default BudgetCategoryReusable;

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
