import React from "react";
import styled from "styled-components";

const TitleCard = ({ title, amount, startDate, endDate,period }) => {
  
  return (
    <ListStyle>
      <div className="title">
        <p className="bg-title-amount">Budget Title: {title}</p>
        <p className="bg-title-amount">Projected Amount: {amount}</p>
      </div>
      <div className="detail">
        <p className="bg-title transform">Budget Period: {period}</p>
        <p className="bg-title">Start Date: {startDate}</p>
        <p className="bg-title">End Date: {endDate}</p>
      </div>
    </ListStyle>
  );
};

export default TitleCard;

const ListStyle = styled.div`
  width: 100%;
  background: #14a800;
  padding: 10px 30px;
  font-family: "Sofia Pro";
  font-style: normal;
  /* line-height: 19px; */
  display: flex;
  flex-direction: column;
  @media only screen and (max-width: 379px) {
    height: 180px;
  }
  @media only screen and (max-width: 299px) {
    height: 200px;
  }
  .title {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content:center;
    align-items: center;
    padding:0;
    margin:0;
    gap: 0px;
    p{
      margin:0;
      padding:0;
      
    }
    }
  .detail {
    display: flex;
    justify-content: space-between;
    gap:5px;
    p{
      color: yellow;
      padding: 5px 10px;
    }
  }
  .bg-title {
    font-family: "Sofia Pro";
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    /* line-height: 19px; */
    display: flex;
    align-items: center;

    color: #ffffff;
  }
  .bg-title-amount {
    font-family: "Sofia Pro";
    font-style: normal;
    font-weight: 500;
    font-size: 25px;

    color: #ffffff;
  }
`;
