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
      <br />
        <MyButton type="submit" >
          {loading ? <ClipLoader color="white" size="40px" /> : "Save"}
        </MyButton>
    </StyledHome>
  );
};
export default CreateBudgetCategory;

const StyledHome = styled.div`
font-family:"Sofia Pro";
  .form__wrapper {
    width: 100%;
    border-radius: 5px;
  }
`;
