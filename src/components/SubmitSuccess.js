import React from 'react';
import styled from 'styled-components';


const SubmitSuccess = ({message}) => {
  return(
      <Wrapper>
          <img
            src="/images/sucess-icon.svg"
            alt="green-tick"
            className="sucess-icon"
          />
          <h2 className="form-font green-text">Success</h2>
          <p className="form-font success-msg">
            {message}
          </p>
        </Wrapper>
  )

}
export default SubmitSuccess;

const Wrapper = styled.div`
/* display: ${({ deleteItem }) => (deleteItem ? "flex" : "none")}; */
    width: 70%;
    background: "#ffffff";
    align-items: center;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    border-radius: 5px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    margin:0 auto;
    @media (max-width: 768px) {
      width: 100%;
      padding: 20px;
    } 
.sucess-icon {
    width: 6.2rem;
    padding-top: 2rem;
    margin-bottom: 1.7rem;
    @media (max-width: 768px) {
      width: 4.2rem;
      margin-bottom: 1.7rem;
    }
  }
  .green-text {
    font-size: 3.4rem;
    margin-bottom: 2.2.rem;
    @media (max-width: 768px) {
      font-size: 2.4rem;
      margin-bottom: 1.7rem;
    }
  }
  .success-msg {
    width: 25.9rem;
    font-size: 1.6rem;
    line-height: 2.4rem;
    text-align: center;
    margin-bottom: 3.8rem;
    @media (max-width: 768px) {
      width: 100%;
      font-size: 1.4rem;
      line-height: 2.4rem;
      margin-bottom: 2.8rem;
    }
  }
  .success-btn {
    width: 100% !important;
    font-weight: 500;
    font-size: 1.6rem;
    line-height: 3.2rem;
  }
  .success-btn:hover,
  .success-btn:focus {
    background: #34a853;
    color: #ffffff;
    text-decoration: none;
    cursor: pointer;
  }
  .error-msg {
    color: red;
  }
  .basic-multi-select{

  }
`;