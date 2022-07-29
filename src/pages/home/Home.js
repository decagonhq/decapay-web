import React from "react";
import styled from "styled-components";
import Layout from "../../components/dashboardSidebar/Layout";
const Home = () => {
  return (
    <Layout>
      <StyledHome>
        <h1>DECAPAY Dashboard
        </h1>
        <h2>Work in Progress </h2>
      </StyledHome>
    </Layout>
  );
};
export default Home;
const StyledHome = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #fafafa;
  h1 {
    font-size: 2rem;
    font-weight: bold;
    color: #333;
    text-transform: uppercase;
  }
`;
