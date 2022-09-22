import React, { useState, useEffect, Fragment, useRef } from "react";
import styled from "styled-components";
// import GoBack from "../../components/Goback";
import Layout from "../../components/dashboardSidebar/Layout";
import { useNavigate } from "react-router-dom";
import request from "../../utils/apiHelper";
import { toast } from "react-toastify";
import DynamicTitle from "../../components/DynamicTitle";
import "../../styles/table.style.css"

const Index = () => {
  const [currentTableData, setCurrentTableData] = useState([]);
  const [idOfBudget, setIdOfBudget] = useState(-1);

  const ref = useRef(null);
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);
  const fetchData = async () => {
    try {
      const response = await request.get(
        `budgets?size=10&page=1&state=current`
      );
      setCurrentTableData(response.data.data.content);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const navigate = useNavigate();

  return (
    <Layout>
      <BudgetSyle>
        <DynamicTitle title="Dashboard" />
        <div className="header page">
          <div className="">
            <p style={{ fontWeight: "bold", fontSize: "20px" }}>
              Current budget
            </p>
          </div>
          <p
            onClick={() =>
              navigate(`../budgets/`, {
                replace: true,
              })
            }
            style={{ color: "green", cursor: "pointer" }}
          >
            See all budgets
          </p>
        </div>

        {/* Custom table starts here */}
        <div className="category-container">
          <table>
          <tr className="category ">
            <th className="category-text">Budget title</th>
            <th className="category-text">Period</th>
            <th className="category-text">Amount</th>
            <th className="category-text">Amount spent</th>
            <th className="category-text">Percentage spent</th>
            <th className="category-text">Action</th>
          </tr>
          {currentTableData !== null && currentTableData?.length > 0 ? (
            currentTableData.map((item, index) => (
              <tr className="category body" key={index}>
                <td
                  onClick={() =>
                    navigate(`../budgetDetail/${item.id}`, {
                      replace: true,
                    })
                  }
                  className="category-text"
                  style={{
                    cursor: "pointer",
                  }}
                >
                  {item.title}
                </td>
                <td className="category-text">{item.period}</td>
                <td className="category-text">{item.displayProjectedAmount}</td>
                <td className="category-text">
                  {item.displayTotalAmountSpentSoFar}
                </td>
                <td className="category-text">
                  {item.displayPercentageSpentSoFar}
                </td>
                <td
                  style={{
                    cursor: "pointer",
                    fontSize: "30px",
                    fontWeight: "bold",
                  }}
                  onClick={() => setIdOfBudget(item.id)}
                  className="dots"
                >
                  ...
                  {idOfBudget === item.id ? (
                    <Fragment>
                      <span ref={ref} className="popup">
                        <p
                          onClick={() =>
                            navigate(`../budgetDetail/${item.id}`, {
                              replace: true,
                            })
                          }
                        >
                          View details
                        </p>
                        {/* <p style={{ color: "red" }}>Delete</p> */}
                      </span>
                    </Fragment>
                  ) : null}
                </td>
              </tr>
            ))
          ) : (
            <div className="empty">
              <img
                className="empty-img"
                src="/images/dashboard.svg"
                alt="empty"
              />
              <h3>No Budget yet</h3>
              <p>
                You’ve not created any budget list yet. Click on the + sign icon
                below to create a budget.
              </p>
            </div>
          )}
          </table>
        </div>
      </BudgetSyle>
    </Layout>
  );
};

export default Index;
const BudgetSyle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;

  /* background: rgba(0, 156, 244, 0.05); */
  .header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 10px;
    font-weight: 600;
    margin-bottom: -20px;
    font-size: 16px;
  }
  .page {
    font-family: "Sofia Pro";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;

    /* color: #a5b1b7; */
  }
  .budget-container {
    padding: 10px;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    box-sizing: border-box;
    padding: 40px;
    background: #ffffff;
    border: 1px solid #d6d6d6;
    @media only screen and (max-width: 540px) {
      width: 100%;
    }
  }
  .list-container {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    gap: 15px;
  }
  .empty {
    width:221px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
  }
  .empty-img {
    width: 221px;
    height: 221px;
  }
  .pagination-container {
    display: flex;
    /* flex-direction: column; */
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  }
  .pagination-bar {
    display: flex;
    justify-content: space-between;
    width: 300px;
  }
  .item-wrapper {
    width: 100%;
    height: 150px;
    background: rgba(0, 0, 0, 0.04);
    padding: 10px;
    font-family: "Sofia Pro";
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
    min-width: 150px;
    /* right: 20px; */
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
      margin-bottom: 12px !important;
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
  .header-wrapper {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  button {
    color: white;
    text-decoration: none;
    letter-spacing: 1px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0;
    width: 200px;
    height: 2.5rem;
    font-weight: 400;
    font-size: 16px;
    border: none;
    text-align: center;
    color: white;
    background: #14a800;
    white-space: nowrap;
    border: none;
    :hover {
      cursor: pointer;
      background: #14a800;
    }
  }

  /* Custom table styles */

  .category-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: 20px;
    padding: 10px;
    gap: 10px;
  }

  
  .dots {
    font-size: 30px;
    cursor: "pointer";
    font-weight: "bold";
  }
  @media only screen and (max-width: 1280px) {
    .category {
      margin-bottom: 10px;
    }
    .category-text {
      font-size: 12px;
    }
  }
  @media only screen and (max-width: 990px) {
    .category {
      padding: 5px 8px;
      height: 100px;
    }
  }
  @media only screen and (max-width: 768px) {
    .category {
      height: 75px;
    }
  }
  @media only screen and (max-width: 540px) {
    .category {
      height: 70px;
    }
    .category-text {
      font-size: 10px;
    }
  }

  @media only screen and (max-width: 411px) {
    .category {
      height: 40px;
    }
  }
  @media only screen and (max-width: 487px) {
    .category {
      padding: 4px;
      height: 50px;
      font-size: 1rem;
    }
    .dots {
      font-size: 25px;
    }
    .header {
      font-size: 12px;
    }
    .body {
      font-size: 12px;
    }
  }
  @media only screen and (max-width: 377px) {
    .category {
      display: flex;
      justify-content: space-between;
      width: 100%;
      padding: 0px;
      font-size: 12px;
    }
  }
  @media only screen and (max-width: 290px) {
    .category {
      display: flex;
      justify-content: space-between;
      width: 100%;
      padding: 0px;
      font-size: 10px;
    }
  }
`;
