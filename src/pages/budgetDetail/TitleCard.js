import React from "react";
import styled from "styled-components";

const TitleCard = ({ title, amount, startDate, endDate,period }) => {
  const dateConverter = (created_at) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    let current_datetime = new Date(created_at);
    let formatted_date =
      current_datetime.getDate() +
      " " +
      months[current_datetime.getMonth()] +
      ", " +
      current_datetime.getFullYear();
    return formatted_date;
  };
  return (
    <ListStyle>
      <div>
        <p className="bg-title-amount">{title}</p>
        <p className="bg-title">{amount}</p>
      </div>
      <div>
        <p className="bg-title transform">{period} Budget</p>
        <p className="bg-title">Start date: {dateConverter(startDate)}</p>
        <p className="bg-title">End date: {dateConverter(endDate)}</p>
      </div>
    </ListStyle>
  );
};

export default TitleCard;

const ListStyle = styled.div`
  width: 100%;
  height: 10em;
  background: #14a800;
  padding: 20px;
  font-family: "Sofia Pro";
  font-style: normal;
  line-height: 19px;
  display: flex;
  justify-content: space-around;
  @media only screen and (max-width: 379px) {
    height: 180px;
  }
  @media only screen and (max-width: 299px) {
    height: 200px;
  }

  .bg-title {
    font-family: "Sofia Pro";
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
    display: flex;
    align-items: center;

    color: #ffffff;
  }
  .bg-title-amount {
    font-family: "Sofia Pro";
    font-style: normal;
    font-weight: 800;
    font-size: 32px;
    line-height: 39px;
    /* identical to box height */

    display: flex;
    align-items: center;

    color: #ffffff;
  }
  .transform{
    text-transform: uppercase;
  }
`;
