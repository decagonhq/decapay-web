import React from "react";
import styled from "styled-components";
// import ClipLoader from "react-spinners/ClipLoader";

const MyButton = ({
  width,
  children,
  white,
  href,
  min,
  max,
  full,
  className,
  type,
  transparent,
  green,
  onClick,
  loading,
  disabled,
}) => {
  return (
    <StyledButton
      width={width}
      // className={className || "btn btn-component"}
      white={white}
      green={green}
      min={min}
      full={full}
      type={type}
      max={max}
      onClick={onClick}
      disabled={disabled}
      
    >
      {children}
      {/* <div className="spin-parent"> */}
        {/* {loading && (
          <ClipLoader color="white" size="40px" className="spinner" />
        )} */}
      {/* </div> */}
    </StyledButton>
  );
};
const StyledButton = styled.button`
  padding: 1rem;
  color: white;
  text-decoration: none;
  letter-spacing: 1px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0;
  width: 100% !important;
  height: ${({ height }) => (height ? height : "2.5rem")};
  font-weight: 400;
  font-size: 16px;
  border: none;
  text-align: center;
  color: ${({ white, transparent,disabled }) =>
    white ? "#34A853" : transparent ? "#34A853" : disabled ? "#9e9e9e" : "white"};
  /* background: linear-gradient(96.67deg, #34a853 0%, #b8d344 100%); */
  background: ${({disabled}) => disabled ? "#e0e0e0" : "#14a800"};
  white-space: nowrap;
  cursor: ${({ disabled }) => disabled ? "not-allowed" : "pointer"};

  border: ${({ transparent }) => (transparent ? "1px solid #34A853" : "none")};
  :hover {
    cursor: ${({ disabled }) => disabled ? "not-allowed" : "pointer"};
    background: ${({ disabled }) => disabled ? "#e0e0e0" : "#14a800"};
  }

  .spin-parent {
    position: absolute;
  }

  @media only screen and (max-width: 600px) {
    font-size: 12px;
    height: 2.5rem;
  }
  @media only screen and (max-width: 540px) {
    max-height: 2rem;
  }
`;

export default MyButton;
