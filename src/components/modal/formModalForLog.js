import React, { useState } from "react";
import styled from "styled-components";
import MyButton from "../Button";
import ClipLoader from "react-spinners/ClipLoader";
import FormTitleSection from "./FormTitleSection";
import CurrencyFormat from "react-currency-format";
import FormInputComponent from "../InputComponent";
import { ToastContainer } from "react-toastify";
import DatePicker from "react-datepicker";
import {currency} from "../../constants";

const LogExpenseResuable = ({
  closeModal,
  inputName,
  formTitle,
  inputValue,
  onChangeInput,
  currencyName,
  onChangeCurrency,
  valueCurrency,
  onClick,
  handleChangeDate,
  minDate,
  maxDate,
  disabled,
  defaultValue,
}) => {
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);
  return (
    <StyledHome>
      <ToastContainer />
      <FormTitleSection title={`Expenses for ${formTitle}`} onClick={closeModal} />
      <div className="form__wrapper">
        <CurrencyFormat
          placeholder="Enter amount"
          label={"Amount"}
          displayType={"input"}
          style={{ width: "100%", height: "100%", padding: "10px" }}
          prefix={currency  + " "}
          name={currencyName}
          thousandSeparator={true}
          value={valueCurrency}
          onChange={onChangeCurrency}
        />
      </div>
      <div className="form__wrapper">
        <FormInputComponent
          placeholder={"Enter description"}
          label={"Description"}
          type={"text"}
          value={inputValue}
          name={inputName}
          onChange={onChangeInput}
        />
      </div>
      <div className="form__wrapper">
        <h7>Select Date</h7>
        <DatePicker
          // selected={selectedDate}
          onChange={handleChangeDate}
          minDate={minDate}
          maxDate={maxDate}
          value={defaultValue}
          disabled={disabled}
        />
      </div>
        <br />
        <MyButton type="submit" className="form__button" onClick={onClick}>
          {loading ? <ClipLoader color="white" size="40px" /> : "Save"}
        </MyButton>
    </StyledHome>
  );
};
export default LogExpenseResuable;

const StyledHome = styled.div`
  .form__wrapper {
    width: 100%;
    border-radius: 5px;

    .react-datepicker-wrapper,
    .react-datepicker__input-container,
    .react-datepicker__input-container input {
      display: block;
      width: 100%;
      height: 39px;
    }
  }
  .btn {
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
  }
`;
