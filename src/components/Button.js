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
}) => {
  return (
    <StyledButton
      width={width}
      className={className || "btn btn-component"}
      white={white}
      green={green}
      min={min}
      full={full}
      type={type}
      max={max}
      onClick={onClick}
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
  color: white;
  text-decoration: none;
  letter-spacing: 1px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0;
  width: 100%;
  height: ${({ height }) => (height ? height : "2.5rem")};
  font-weight: 400;
  font-size: 16px;
  border: none;
  text-align: center;
  color: ${({ white, transparent }) =>
    white ? "#34A853" : transparent ? "#34A853" : "white"};
  /* background: linear-gradient(96.67deg, #34a853 0%, #b8d344 100%); */
  background: #14a800;
  white-space: nowrap;
  border: ${({ transparent }) => (transparent ? "1px solid #34A853" : "none")};
  :hover {
    cursor: pointer;
    background: #14a800;
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
