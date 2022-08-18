import React, { useState } from "react";
import styled from "styled-components";
import MyButton from "../../components/Button";
import ClipLoader from "react-spinners/ClipLoader";
import FormTitleSection from "../../components/modal/FormTitleSection";
import CurrencyFormat from "react-currency-format";
import FormSelectComponent from "../../components/selectComponent";

const BudgetLineItemResuable = ({
  closeModal,
  name,
  options,
  formTitle,
  selectValue,
  onChangeSelect,
  placeholderSelect,
  placeholderCurrency,
  labelCurrency,
  currencyName,
    onChangeCurrency,
    valueCurrency,
    onClick,
}) => {
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);
  return (
    <StyledHome>
      <FormTitleSection title={formTitle} onClick={closeModal} />
      <div className="form__wrapper">
        <FormSelectComponent
          name={name}
          options={options}
          value={selectValue}
          onChange={onChangeSelect}
          placeholder={placeholderSelect}
        />
      </div>
      <div className="form__wrapper">
        <CurrencyFormat
          placeholder={placeholderCurrency}
          label={labelCurrency}
          displayType={"input"}
          style={{ width: "100%", height: "100%", padding: "10px" }}
          prefix={"#"}
          name={currencyName}
          thousandSeparator={true}
          value={valueCurrency}
          onChange={onChangeCurrency}
          
        />
      </div>
      <div className="btn">
        <MyButton type="submit" className="form__button"
            onClick={onClick}
        >
          {loading ? <ClipLoader color="white" size="40px" /> : "Save"}
        </MyButton>
      </div>
    </StyledHome>
  );
};
export default BudgetLineItemResuable;

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
