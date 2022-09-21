import React from 'react'
// import { useState } from "react";
import styled from 'styled-components';

const Checkbox = ({ isChecked, onChangeFunction, checked,name }) => {
    return (
        <CustomCheckboxWrapper>
            <input
                type="checkbox"
                onChange={onChangeFunction}
                checked={checked}
                name={name}
            />
            <span
                className={`checkbox ${isChecked ? "checkbox--active" : ""}`}
                // This element is purely decorative so
                // we hide it for screen readers
                aria-hidden="true"
            >
                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.76415 10.4897L12.8921 4.36099L13.8355 5.30366L6.76415 12.375L2.52148 8.13233L3.46415 7.18966L6.76415 10.4897Z" fill={isChecked ? "white" : ""} />
                </svg>
            </span>
        </CustomCheckboxWrapper>
    )
}



export const CustomCheckboxWrapper = styled.label`
    
    input {
        clip: rect(0 0 0 0);
        clip-path: inset(50%);
        height: 1px;
        overflow: hidden;
        position: absolute;
        white-space: nowrap;
        width: 1px;
    }
    .checkbox {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 24px;
        width: 24px;
        padding: 2px;
        background: #fff;
        border: 1.5px #14a800 solid;
        border-radius: 5px;
        margin-right: 4px;
    }

    .checkbox--active {
        border-color: #14a800;
        background: #14a800;
    }
`

export default Checkbox