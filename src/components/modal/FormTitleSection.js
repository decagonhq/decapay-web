import React from "react";
import styled from "styled-components";

const FormTitleSection = ({ title, name, onClick }) => {
  return (
    <StyledFormTitleSection>
      <div>
        <p className="formTitle form-font">{title}</p>
        <p className="forName">{name}</p>
      </div>

      <img
        src="/images/close-icon.svg"
        alt="close icon"
        onClick={onClick}
        className="closeIcon"
      />
    </StyledFormTitleSection>
  );
};

const StyledFormTitleSection = styled.div`
  display: flex;
  justify-content: space-between;
  /* border-bottom: 1px solid #f0eff6; */
  .formTitle {
    font-size: 1.5rem;
    line-height: 3rem;
    color: #2254d3;
    font-family: "Sofia Pro";
  }
  .closeIcon {
    width: 1rem;
    /* padding-bottom: 0.7rem; */
    cursor: pointer;
  }
  .forName {
    color: #8e919c;
  }
`;

export default FormTitleSection;
