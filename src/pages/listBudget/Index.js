import React from "react";
import styled from "styled-components";
import BudgetCard from "./BudgetCard";
import GoBack from "../../components/Goback";
import Layout from "../../components/dashboardSidebar/Layout";
import {Data} from "./Data"

const Index = () => {
  return (
    <Layout>
      <BudgetSyle>
        <div className="budget-container">
          <div className="header">
            <GoBack />
            <p>Budget List</p>
          </div>
          <div className="header page">
            <p>Most recent</p>
            <p>Showing 1 of 16</p>
          </div>
          <div className="list-container">
            {Data.map((item, index) => {
              return <BudgetCard key={index} {...item} />;
            }
            )}
          </div>
          {/* <BudgetCard
            title="Budget 2 - Annually"
            amount="#100"
            totalAmount="#300"
            percentage="60%"
          />
          <BudgetCard
            title="Budget 3 - Weekly"
            amount="#100"
            totalAmount="#300"
            percentage="90%"
          /> */}
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
  .header {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .page {
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;

    color: #a5b1b7;
  }
  .budget-container {
    padding: 10px;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    box-sizing: border-box;
    width: 563px;
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
`;
