import React, { useState } from "react";
import styled from "styled-components";
// import FormTitleSection from "./FormTitleSection";

const FormModal=({children})=>{
  return (
    <StyledHome>
        
      <div className="modal-body">
        {children}
      </div>
    </StyledHome>
  );
};
export default FormModal;

const StyledHome = styled.div`
 
  font-family: "Sofia Pro";
  position: absolute;

  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100000;
  display: flex;
  justify-content: center;
  align-items: center;

  .modal-body {
    background: white;
    max-width: 35%;
    max-height: 90vh;
    border-radius: 10px;
    overflow: auto;
    padding: 20px;
    /* print */
   
`;
