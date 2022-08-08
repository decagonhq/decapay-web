import React from "react";
import styled from "styled-components";

const TitleCard = ({ title }) => {
  return (
    <ListStyle>
        <p className="bg-title">My Budget</p>
        <p className="bg-title-amount">N30,000.00</p>
    
    </ListStyle>
  );
};

export default TitleCard;

const ListStyle = styled.div`
  width: 100%;
  height: 7em;
  background: #14a800;
  padding: 20px;
  font-family: "Inter";
  font-style: normal;
  line-height: 19px;
  @media only screen and (max-width: 379px) {
    height: 180px;
  }
  @media only screen and (max-width: 299px) {
    height: 200px;
  }

  .bg-title {
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    display: flex;
    align-items: center;

    color: #ffffff;
  }
  .bg-title-amount {
    font-family: "Inter";
    font-style: normal;
    font-weight: 800;
    font-size: 32px;
    line-height: 39px;
    /* identical to box height */

    display: flex;
    align-items: center;

    color: #ffffff;
  }
`;
