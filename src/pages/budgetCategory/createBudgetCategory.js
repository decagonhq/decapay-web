import React, { useState } from "react";
import styled from "styled-components";
import MyButton from "../../components/Button";
import FormInputComponent from "../../components/InputComponent";
import ClipLoader from "react-spinners/ClipLoader";
import FormTitleSection from "../../components/modal/FormTitleSection";

const CreateBudgetCategory = ({ closeModal }) => {
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);
  return (
    <StyledHome>
      <FormTitleSection title="Create buget category" onClick={closeModal} />
      <div className="form__wrapper">
        <FormInputComponent
          placeholder="Budget category name"
          label="Budget category"
          type="text"
          name="budgetCategory"
        />
      </div>
      <div className="btn">
        <MyButton type="submit" className="form__button">
          {loading ? <ClipLoader color="white" size="40px" /> : "Save"}
        </MyButton>
      </div>
    </StyledHome>
  );
};
export default CreateBudgetCategory;

const StyledHome = styled.div`
  .form__wrapper {
    width: 100%;
    border-radius: 5px;
  }
  .btn {
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
  }
`;
