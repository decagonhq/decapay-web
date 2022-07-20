import React from 'react'
import styled from "styled-components";
import { format } from "date-fns";
// import CurrencyInput from "react-currency-input";

const FormInputComponent = ({ height, label, type, name, value, onChange, onBlur, error, placeholder, defaultValue, max, prefix, allowDecimals, disabled }) => {
  let maxDate = max && format(max, "yyyy-MM-dd");
  // const allowdecimals = allowDecimals;
  return (
    <StyledFormInputComponent>
      {label && (
        <label htmlFor={name} className="form-font form-label">
          {label}
        </label>)}
        <input
          type={type}
          id={name}
          max={max && type === "date" ? maxDate : null}
          placeholder={placeholder}
          name={name}
          onChange={onChange}
          pattern={type==="number" ?  "[0-9]*" : null}
          onBlur={onBlur}
          onWheel={type === "number" ? (e) => e.target.blur() : undefined}
          value={value || defaultValue || ""}
          className="form-font"
          disabled={disabled}
          height={height}
        />
      {error && <div className="form-error">{error}</div>}
     
    </StyledFormInputComponent>
  );
}

const StyledFormInputComponent = styled.div`
    margin-bottom: 2.4rem;
    input {
        display: inline-block;
        font-size: 1.6rem;
        background: transparent;
        -webkit-appearance: none;
        min-width: 100%;
        border: none;
        height: ${({height}) => height ? height : '3.2rem'};
        padding-bottom: 0rem;
        padding-left: 1rem;
        border: 1px solid rgba(33, 51, 79, 0.15) !important;
    }
    input[type=number]::-webkit-inner-spin-button, 
    input[type=number]::-webkit-outer-spin-button { 
    -webkit-appearance: none !important; 
    margin: 0; 
    }
input[type=number] {
  -moz-appearance: textfield;
}
input:disabled{
background: rgba(0,0,0,0.1);
}

input:active{
  border: 1px solid green !important;
}
input:focus{
  border: 1px solid #34a853 !important;
}
    @media only screen and (max-width: 405px) {
        input{
            min-width: 100%;
        }
    }
    
    
`;

export default FormInputComponent