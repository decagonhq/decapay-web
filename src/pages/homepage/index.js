import React from "react";
import styled from "styled-components";
import Layout from "../../components/NavigationBar/Layout";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <Layout>
      <Wrapper>
        <div className="midWrapper">
          <div className="headerWrap">
            <h1 className="headerTitle">Effectively manage your budget</h1>
            <p className="paragraph">
              The platform gives a personal budget plan and how you can spend
              your money.
            </p>
            <div className="home-btn">
              <Link to="/login" className="btn btn-success">
                Get Started
              </Link>
            </div>
          </div>
          <div className="imgWrap">
            <img src="/images/homepageImage.png" alt="homepageImage" />
          </div>
        </div>
        <div className="bottomWrap">
          <div className="bottomHeader">
            <h1 className="headerTitle2">Spend your budgets meaningfully</h1>
            <p>Understand how you spend and track budget</p>
          </div>
          <div className="subWrap">
            <div className="imgDivWrap">
              <img src="images/calculateBudget.png" alt="calculate" />
              <p className="innerText">Calculate your budget</p>
            </div>
            <div className="imgDivWrap">
              <img src="images/receipt.png" alt="receipt" />
              <p className="innerText">Generate monthly receipt</p>
            </div>
            <div className="imgDivWrap">
              <img src="images/deliveryTracking.png" alt="delivery" />
              <p className="innerText">Easily track budget</p>
            </div>
          </div>
        </div>
        <div className="footerWrap">
          <div className="footImageWrap">
            <img src="images/decapayWhiteIcon.png" alt="icon" />
            <p className="p">Decapay</p>
          </div>
          <div className="footer">
            <p className="bottomP"> 
              © 2022 Decagon Institute. All rights reserved. Terms of Use and
              Privacy Policy
            </p>
            <div className="bottomImageWrap">
            
              <img src="images/Twitter.png" className="bottomImage" alt="twitter"/>
              <img src="images/Youtube.png" className="bottomImage" alt="youtube"/>
              <img src ="images/Instagram.png" className="bottomImage" alt="instagram"/>
            </div>
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
  .midWrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 70px;
    @media (max-width: 768px) {
      flex-direction: column;
      padding: 20px;
      justify-content: center;
      align-items: center;
    }
  }
  .paragraph {
    font-size: 20px;
    width: 60%;
    @media (max-width: 768px) {
      width: 100%;
    }
  }
  .headerTitle {
    font-size: 40px;
    font-weight: 700;
    color: rgba(33, 51, 79, 1);
    width: 70%;
    @media (max-width: 768px) {
      width: 100%;
    }
  }
  .headerWrap {
    margin-top: 140px;
  }
  .bottomHeader {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  @media only screen and (max-width: 768px) {
    .imgWrap {
      display: none;
    }
  }
  .bottomWrap {
    margin-top: 120px;
  }
  .subWrap {
    display: flex;
    flex-direction: row;
    gap: 50px;  
    justify-content: space-between;
    padding: 70px 70px;
    @media (max-width: 768px) {
      flex-direction: column;
    }
  }
  .headerTitle2 {
    color: rgba(33, 51, 79, 1);
  }
  .imgDivWrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width :100%;
    align-items: center;
    padding: 20px;
    border-radius: 10px;
    border: 1px solid #ccc;
  }
  .innerText {
    font-size: 25px;
    margin-top: 30px;
  }
  .footer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 30px;
    border-top: 1px solid rgba(245, 250, 250, 1);
  }
  .footerWrap {
    background: rgba(33, 51, 79, 1);
    display: flex;
    flex-direction: column;
    padding: 20px;
  }
  .footImageWrap {
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    margin-top: 20px;

  }
  .p {
    color: #fff;
    font-size: 20px;
    font-weight: 700;
    align-self: center;
    justify-self: center;
    margin-top: 10px; 
    margin-left: 3px;
  }
  .bottomImageWrap {
    display: flex;
    flex-direction: row;
    gap: 20px;
  }
  .bottomImage {
    width: 38px;
    height: 38px;

  }
  .bottomP {
    color: rgba(255, 255, 255, 1);
  }
  
`;
