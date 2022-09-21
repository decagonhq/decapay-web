import React from "react";
import MyButton from "../../components/Button";
import styled from "styled-components";
import { Link } from "react-router-dom";
import DynamicTitle from "../../components/DynamicTitle";

const ErrorPage = () => {
  return (
    <ErrorPageWrapper>
      <DynamicTitle title="Error" />
      <Error404Wrapper>
        <div className="wrapper">
          <h1 className="error-404-title">Oops!</h1>
          <p>Hello there you reached an error page here</p>
          <Link to="/home">
            <MyButton className="btn-comp error-page-btn">Go Home</MyButton>
          </Link>
        </div>
      </Error404Wrapper>
    </ErrorPageWrapper>
  );
};

const ErrorPageWrapper = styled.div`
  width: 100%;
`;

const Error404Wrapper = styled.div`
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: #34a853;
  height: 100vh;
  text-align: center;
  .wrapper {
    width: 50%;
    height: 50vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 0 8px rgba(33, 51, 79, 0.44);
    text-align: center;
  }
  .error-404-title {
    font-size: 17vmin;
    text-align: center;
  }
  .error-page-btn {
    margin: auto;
  }
  @media screen and (max-width: 768px) {
    .wrapper {
      width: 100%;
    }
  }
  @media only screen and (max-width: 451px) {
    .wrapper {
      width: 100%;
    }
  }
`;

export default ErrorPage;
