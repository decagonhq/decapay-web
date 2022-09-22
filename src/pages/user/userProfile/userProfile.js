import React from "react";
import styled from "styled-components";
import Layout from "../../../components/dashboardSidebar/Layout";
import PageTitle from "../../../components/PageTitle";
import User from "./index";

const Home = () => {
  return (
    <Layout>
      <StyledHome>
        <PageTitle title="Profile" />
          <div className="form__container">
            <User />
          </div>
      </StyledHome>
    </Layout>
  );
};
export default Home;
const StyledHome = styled.div`
  font-family: "Sofia Pro";
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  .form__container {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    border: 1px solid #e6e6e6;
    margin-top: 50px;
    width:50%;
    @media (max-width: 768px) {
      width: 100%;
    }
  }
`;
