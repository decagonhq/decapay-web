import React from "react";
import styled from "styled-components";

export default function PageTitle({children, title}) {
  return (
      <HeaderStyle>
        <div className="">
          <p className="title">
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
    .title{
      font-weight:bold; 
      font-size:20px;
    }
    .children-container{
      display: flex;
      justify-content:space-between;
      /* align-items:flex-end; */
    }
    @media only screen and (max-width: 411px) {
      flex-direction: column;
      .title{
      font-weight:400; 
      font-size: 12px;
    }
  }
`;
