import React from "react";
import styled from "styled-components";
import Layout from "../../components/NavigationBar/Layout";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <Layout>
      <Wrapper>
        <div className="container">
          <h1 className="home-title">DecaPay</h1>
          <p className="home-text">
            DecaPay is a budget management app that helps you to manage your
          </p>
          <p>income expenses</p>
          <div className="home-btn">
            <Link to="/login" className="btn btn-success">
              Get Started
            </Link>
          </div>
        </div>
      </Wrapper>
    </Layout>
  );
};
export default HomePage;

const Wrapper = styled.div`
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;
