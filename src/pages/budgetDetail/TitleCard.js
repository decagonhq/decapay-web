import React from "react";
import styled from "styled-components";

const TitleCard = ({ title, amount, startDate, endDate, period }) => {
  return (
    <ListStyle>
      <div className="title-wrapper">
        <div>
          <p className="bg-title-amount">{title}</p>
          <p className="bg-title-amount">{amount}</p>
        </div>
        <div className="detail-wrapper">
          <p className="bg-title transform">Budget Period: {period}</p>
          <p className="bg-title">Start Date: {startDate}</p>
          <p className="bg-title">End Date: {endDate}</p>
        </div>
        <div className="detail-wrapper__mobile">
          <p className="bg-title">{startDate}-{endDate}</p>
        </div>
      </div>
    </ListStyle>
  );
};

export default TitleCard;

const ListStyle = styled.div`
  width: 100%;
  background: #14a800;
  padding: 20px 30px;
  font-family: "Sofia Pro";
  font-style: normal;
  .title-wrapper {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: -20px;
  }
  .detail-wrapper__mobile{
    display:none;
  }
  @media only screen and (max-width: 991px) {
    padding: 20px;

    .title-wrapper {
      display: grid;
      grid-template-columns: 1fr 1fr ;
      margin-bottom: -20px;
    }
    .bg-title {
      line-height: 0.4;
    }
    .bg-title-amount {
      line-height: 0.6;
    }
  }
 
  @media only screen and (max-width: 299px) {
  }
  @media only screen and (max-width: 459px) {
    .title-wrapper {
      display: flex;
      flex-direction: column;

    }
    .period{
      display:none;
    }
    .bg-title {
      line-height: 1;
    }
    .bg-title-amount {
      line-height: 1;
    }
    .detail-wrapper{
      display:none;
    }
    .detail-wrapper__mobile{
      display:block;
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
    font-weight: 600;
    font-size: 30px;
    /* identical to box height */

    display: flex;
    align-items: center;

    color: #ffffff;
  }
  .transform {
    /* text-transform: uppercase; */
  }
`;
