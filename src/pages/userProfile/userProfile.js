import React from "react";
import styled from "styled-components";
import Layout from "../../components/dashboardSidebar/Layout";
import PageTitle from "../../components/PageTitle";
import ResetPassword from "./ResetPassword";
import User from "./index";

const Home = () => {
  return (
    <Layout>
      <StyledHome>
        <PageTitle title="Profile" />
        <div className="profile-container">
          <div className="password form__container">
            <ResetPassword />
          </div>

          <div className="form__container">
            <User />
          </div>
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
  .profile-container {
    width: 90%;
    display: grid;
    grid-template-columns: 1fr 3fr;
    gap: 1rem;
    @media only screen and (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }
  .password {
    height: fit-content;
  }
  .form__container {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    border: 1px solid #e6e6e6;
    margin-top: 50px;
    @media (max-width: 768px) {
      width: 100%;
    }
  }
`;
