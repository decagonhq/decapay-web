import React from 'react'
import styled from "styled-components";
const FormSelectComponent = ({label, error, name, options, readOnly, value, onChange, onBlur, defaultValue}) => {
    return (
        <StyledFormSelectComponent>
            {label && <label htmlFor={name} className="form-font form-label">{label}</label>}
            <div className="select-field">
            <select id={name} value={value} onChange={onChange} onBlur={onBlur} defaultValue={defaultValue} >
                {options.map((option, index) => (
                option.value === "" ?  <option key={index} defaultValue value={option.value} >{option.label}</option> : 
                <option key={index} value={option.value}>{option.label}</option>
                ))}
            </select>
            </div>
            { error &&  <div className='form-error'>{error}</div>}
        </StyledFormSelectComponent>
    )
}
const StyledFormSelectComponent = styled.div`
    margin-bottom: 1rem;
    .select-field{
        height: 2.5rem;
        /* border: 1px solid rgba(33, 51, 79, 0.15); */
        /* padding: 1.5rem 0.5rem 1.5rem 0.5rem; */
    }
    select{
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
    select:active{
        border: 0.8px solid #34a853;
    }
    @media only screen and (max-width: 405px) {
        select{
            width: 100%;
        }
    }
`;
export default FormSelectComponent;
