import React from "react";
import styled from "styled-components";

const Budget = ({ title, amount, totalAmount, percentage, onClick }) => {
  return (
    <ListStyle>
      {/* Budget 1 - Monthly */}
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

  /* box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.08); */
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
`;
