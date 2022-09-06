import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const GetStarted = () => {
  const navigate = useNavigate();
  return (
    <Wrapper
      onClick={() =>
        navigate(`../login`, {
          replace: true,
        })
      }
    >
      Get started
    </Wrapper>
  );
};

export default GetStarted;

const Wrapper = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  height: 22px;
  box-sizing: border-box;
  margin: 0;
  display: flex;
  gap: 15px;
  align-items: center;
  width: 100%;
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;

  cursor: pointer;
`;
