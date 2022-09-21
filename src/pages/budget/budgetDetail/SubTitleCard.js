import React from "react";
import styled from "styled-components";
import { hundredPercent } from "../../../constants";

const SubTitleCard = ({
  title,
  src,
  amount,
  alt,
  percent,
  projectedAmount,
  spentSoFar,
}) => {
  return (
    <ListStyle>
      <p>{title}</p>
      <div className="image">
        <img src={src} alt={alt} />
      </div>
      <p
        className={
          percent > hundredPercent || spentSoFar > projectedAmount
            ? "amt red"
            : "amt green"
        }
      >
        {amount}
      </p>
    </ListStyle>
  );
};

export default SubTitleCard;

const ListStyle = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 15px 30px;
  /* gap: 10px; */
  width: 100%;
  /* height: 113px; */
  background: rgba(20, 168, 0, 0.03);
  border: 1px solid rgba(20, 168, 0, 0.03);
  overflow: hidden;

  @media only screen and (max-width: 379px) {
    height: 180px;
  }
  @media only screen and (max-width: 299px) {
    height: 200px;
  }
  p {
    box-sizing: border-box;
    font-size: 18px;
    font-weight: 500;
    margin: 0;
    padding: 0;
  }
  .image {
    display: flex;
    box-sizing: border-box;
    justify-content: end;
    align-items: right;
    float: right;
    margin: 0;
    margin-top: -10px;
    padding: 0;
  }

  .amt {
    font-family: "Sofia Pro";
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 29px;
    display: flex;
    align-items: center;
    margin-top: -15px;
  }
  .green {
    color: #21334f;
  }
  .red {
    color: red;
  }
  @media only screen and (max-width: 991px) {
    padding: 5px;
    .image {
      display: none;
      margin-top: 0;
    }
    .amt {
      margin-top: 0;
    }
  }
`;
