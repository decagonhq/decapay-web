import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const MenuItem = ({ label, onClick, Icon, active, to }) => {
  return (
    <MenuItemStyle>
      <div className="p-items">
        <NavLink
          exact={true}
          className={(isActive) => "p-link" + (!isActive ? "" : " selected")}
          to={to}
        >
          <Icon />
          <p>{label}</p>
        </NavLink>
      </div>
    </MenuItemStyle>
  );
};

const MenuItemStyle = styled.div`
  .p-items {
    display: flex;
    cursor: pointer;
    align-items: center;
    margin-bottom: 0.2rem;

    & .selected {
      color: #6c5ce7;
      background: #dfe8fc;
      border-radius: 10px;
    }
  }

  .p-link {
    text-decoration: none;
    color: #21334f;
    font-size: 1.2rem;
    font-weight: bold;
    height: 22px;
    padding: 20px 10px;
    box-sizing: border-box;
    margin: 0;
    display: flex;
    gap: 15px;
    align-items: center;
    width: 100%;

    /* Normal text */

    font-family: "Sofia Pro";
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 22px;
    /* identical to box height */

    /* Label & subheading */

    color: #8e919c;
    cursor: pointer;
    &:hover {
      background: #dfe8fc;
      border-radius: 10px;
    }

    & p {
      padding: 0;
      margin: 0;
    }
  }
  .p-link-label {
    text-decoration: none;
    color: #21334f;
    font-size: 1.2rem;
    font-weight: bold;
    cursor: pointer;
    width: 44px;
    height: 22px;

    /* Normal text */

    font-family: "Sofia Pro";
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 22px;
    /* identical to box height */

    /* Label & subheading */

    color: #8e919c;
    &:hover {
      color: #6c5ce7;
    }
    &:active {
      color: #6c5ce7;
    }
    @media (max-width: 768px) {
      display: none;
    }
  }
`;

export default MenuItem;
