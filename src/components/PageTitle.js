import React from "react";
import styled from "styled-components";

export default function PageTitle({children, title}) {
  return (
      <HeaderStyle>
        <div className="">
          <p style={{ fontWeight: "bold", fontSize: "20px" }}>
            {title}
          </p>
        </div>
        <div className="children-container">
          {children}
        </div>
      </HeaderStyle>
  );
}

const HeaderStyle = styled.div`
    width: 100%;
    display: flex;
   padding:1rem;
    flex-direction: row;
    justify-content: space-between;
    .children-container{
      display: flex;
      justify-content:space-between;
      /* align-items:flex-end; */
    }
`;
