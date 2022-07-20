import React from 'react';
import styled from "styled-components"
import ClipLoader from "react-spinners/ClipLoader"

const MyButton = ({children, white, href, min, max, full, className, type, transparent, green, onClick, loading}) => {

    return (
        <div className="btn-parent">
           <StyledButton className={className || "btn btn-component"} white={white} green={green} min={min} full={full} type={type} max={max} onClick={onClick}>
            {children}
            <div className="spin-parent">
              {loading && <ClipLoader color="white" size="40px" className="spinner" />}
            </div>
            </StyledButton> 
            
        </div>
    )
}
const StyledButton = styled.button`
    color: white;
    text-decoration: none;
    letter-spacing: 1px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0;
    width: 18.1rem;
    width: ${({min, max, full}) => min ? '26.1rem' : max ? '40rem' : full ? '100%' : '18.1rem'};
    height: ${({height}) => height ? height : '3.2rem'};
    font-weight: 400;
    font-size: 16px;
    border: none;
    text-align: center;
    color: ${({white, transparent}) => white ? "#34A853": transparent ? "#34A853" : "white"};
    background: linear-gradient(96.67deg, #34A853 0%, #B8D344 100%);
    background: #14A800;
    white-space: nowrap;
    border: ${({transparent}) => transparent ? "1px solid #34A853" : "none"};
    :hover{
        cursor: pointer;
    }
  
    .spin-parent{
    position: absolute;
  }
  
    @media only screen and (max-width: 600px) {
        font-size:12px;
        height: 4.2rem;

    }
   

`;

export default MyButton
