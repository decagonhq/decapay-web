import React, { useState } from "react";
import styled from "styled-components";
import MyButton from "../../components/Button";
import ClipLoader from "react-spinners/ClipLoader";
import FormTitleSection from "../../components/modal/FormTitleSection";
import CurrencyFormat from "react-currency-format";
import FormInputComponent from "../InputComponent";
import { ToastContainer } from "react-toastify";

const LogExpenseResuable = ({
  closeModal,
  inputName,
  options,
  formTitle,
  inputValue,
  inputDateValue,
  onChangeInputDate,
  inputDateType,
  inputLabelDate,
  inputNameDate,
  placeholderInputDate,
  inputType,
  onChangeInput,
  placeholderInput,
  placeholderCurrency,
  labelCurrency,
  currencyName,
  onChangeCurrency,
  valueCurrency,
  onClick,
  onClickCancel,
  inputLabel,
}) => {
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);
  return (
    <StyledHome>
      <ToastContainer />
      <FormTitleSection title={formTitle} onClick={closeModal} />
      <div className="form__wrapper">
        <CurrencyFormat
          placeholder={placeholderCurrency}
          label={labelCurrency}
          displayType={"input"}
          style={{ width: "100%", height: "100%", padding: "10px" }}
          prefix={"₦"}
          name={currencyName}
          thousandSeparator={true}
          value={valueCurrency}
          onChange={onChangeCurrency}
        />
      </div>
      <div className="form__wrapper">
        <FormInputComponent
          placeholder={placeholderInput}
          label={inputLabel}
          type={inputType}
          value={inputValue}
          name={inputName}
          onChange={onChangeInput}
        />
      </div>
      <div className="form__wrapper">
        <FormInputComponent
          placeholder={placeholderInputDate}
          label={inputLabelDate}
          type={inputDateType}
          value={inputDateValue}
          name={inputNameDate}
          onChange={onChangeInputDate}
        />
      </div>

      <div className="btn">
        <MyButton type="submit" className="form__button" onClick={onClick}>
          {loading ? <ClipLoader color="white" size="40px" /> : "Save"}
        </MyButton>
      </div>
    </StyledHome>
  );
};
export default LogExpenseResuable;

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
