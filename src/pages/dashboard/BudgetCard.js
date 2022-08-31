import React from "react";
import styled from "styled-components";

const Budget = ({ title, amount, totalAmount, percentage, onClick }) => {
  return (
    <ListStyle>
      <div className="list--wrapper">
        <div className="list-item-row title">
          <p>{title}</p>
          <p onClick={onClick}>...</p>
        </div>
        <div className="list-item-row">
          <p>Budget amount</p>
          <p>{amount}</p>
        </div>
        <div className="list-item-row">
          <p>Total amount spent</p>
          <p>{totalAmount}</p>
        </div>
        <div className="list-item-row">
          <p >Percentage</p>
          <p style={{color:"#14A800"}}>{percentage}</p>
        </div>
      </div>
    </ListStyle>
  );
};

export default Budget;

const ListStyle = styled.div`
  width: 100%;
  height: 150px;
  background: rgba(0, 0, 0, 0.04);
  padding: 10px;
  font-family: "Inter";
  font-style: normal;
  line-height: 19px;
  @media only screen and (max-width: 379px) {
    height: 180px;
  }
  @media only screen and (max-width: 299px) {
    height: 200px;
  }
  @media only screen and (max-width: 230px) {
    height: 250px;
  }
  .list--wrapper {
    max-height: 100% !important;
    display: flex;
    flex-direction: column;
    
  }
  .list-item-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 100px;

    
    @media only screen and (max-width: 455px) {
      gap: 50px;
    }
    @media only screen and (max-width: 337px) {
      gap: 10px;
    }
  }
  .title {
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
    color: #21334f;
  }
  .popup {
    position: absolute;
    min-width: 200px;
    right: 50px;
    /* top: 40px; */
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: #ffffff;
    padding: 1rem;
    border: 1px solid rgba(33, 51, 79, 0.1);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.06);
    z-index: 3;
    border-radius: 10px;
    z-index: 100;
    font-family: "Sofia Pro";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 19px;
    color: #071232;

    p:not(:last-child) {
      margin-bottom: 12px!important;
    }
    p:hover {
      display: inline-block;
    }
    
    p {
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
`;
