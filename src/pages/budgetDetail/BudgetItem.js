import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";


const Budget = ({ item, amount, soFar, percent }) => {
  return (
    <ListStyle>
      <div className="list--wrapper">
        <div className="left_side">
          <p>{item}</p>
          <p>projected amount: {amount}</p>
          <p>Amount so far: {soFar}</p>
          <Link className="link" to={"/line"}>View expenses</Link>
        </div>
        <div className="right_side">
          <p className="log">
            Log{" "}
            <span>
              <FiArrowUpRight className="icon" />
            </span>
            
          </p>
          <p className="link">{percent}</p>
        </div>
      </div>
      
    </ListStyle>
  );
};

export default Budget;

const ListStyle = styled.div`
  width: 100%;
  height: 108px;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);

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
    display: flex;
    justify-content: space-between;
    padding:20px;
  }
  .left_side p{
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
   padding: 0;
   margin: 0;
  }
  .right_side {
    align-items: center;
    padding: 4px 8px;
    gap: 2px;

    width: 63px;
    height: 32px;

    background: #14a800;
    border-radius: 4px;
  }
  .log {
    font-family: "Inter";
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 19px;
    display: flex;
    align-items: center;

    color: #ffffff;
  }
  .icon {
    /* color: white; */
    width: 20px;
  }
  .link{
    /* remove underline from link */
    text-decoration:none;
    color: #14A800;
  }
`;
