import React, { useState } from "react";
import styled from "styled-components";
import MyButton from "../../components/Button";
import ClipLoader from "react-spinners/ClipLoader";
import FormTitleSection from "../../components/modal/FormTitleSection";
import CurrencyFormat from "react-currency-format";
// import FormSelectComponent from "../../components/selectComponent";
import { NavLink } from "react-router-dom";

const BudgetLineItemResuable = ({
  closeModal,
  selectName,
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
        {/* <FormSelectComponent
          name={selectName}
          options={options}
          value={selectValue}
          onChange={onChangeSelect}
          placeholder={placeholderSelect}
        /> */}
        {options && options.length > 0 ? (
          <select
            name={selectName}
            options={options}
            value={selectValue}
            onChange={onChangeSelect}
            placeholder={placeholderSelect}
          >
            {options.map((option, index) => (
                option.value === "" ?  <option key={index} defaultValue value={option.value} >{option.label}</option> : 
                <option key={index} value={option.value}>{option.label}</option>
                ))}
          </select>
        ) : (
          <div className="empty">
            <NavLink to={"/budgetCategory"}>Create budget category</NavLink>
          </div>
        )}
      </div>
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
      <br />
      <MyButton type="submit" onClick={onClick}>
        {loading ? <ClipLoader color="white" size="40px" /> : "Save"}
      </MyButton>
    </StyledHome>
  );
};
export default BudgetLineItemResuable;

const StyledHome = styled.div`
  .form__wrapper {
    width: 100%;
    border-radius: 5px;
  }
  select {
    display: inline-block;
    font-size: 14px;
    color: rgba(33, 51, 79, 0.8);
    width: 100%;
    background: none;
    height: 2.5rem;
    padding: 0rem 0.5rem;
  }
  select:focus {
    border: 0.8px solid #34a853;
  }
  select:active {
    border: 0.8px solid #34a853;
  }
  @media only screen and (max-width: 405px) {
    select {
      width: 100%;
    }
  }
  .empty {
    display: inline-block;
    font-size: 14px;
    color: rgba(33, 51, 79, 0.8);
    width: 100%;
    background: none;
    height: 2.5rem;
    padding: 0rem 0.5rem;
    border: 1px solid black;
    padding: 10px;
  }
  a {
    color: rgba(33, 51, 79, 0.8);
    text-decoration: none;
    font-size: 14px;
  }
  @media only screen and (max-width: 405px) {
    .empty {
      width: 100%;
    }
  }
`;
