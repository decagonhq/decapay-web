import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const MenuItem = ({ label, onClick, Icon, active, to }) => {
  return (
    <MenuItemStyle>
      <div
        onClick={onClick}
        className={active ? "selected p-items" : "p-items"}
      >
        <NavLink
          exact={true}
          className={active ? "link text-active" : "link text-inactive"}
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
font-family:"Sofia Pro";
  .p-items {
    display: flex;
    cursor: pointer;
    align-items: center;
    margin-bottom: 0.2rem;
  }
  .selected {
    color: white;
    background: #14a800;
  }
  .link{
    text-decoration: none;
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
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    cursor: pointer;
    &:hover {
      background: #14a800;
      color: white;
    }

    & p {
      padding: 0;
      margin: 0;
    }
  }
  .text-active {
    color: white;
  }
  .text-inactive {
    color: #8e919c;
  }
`;

export default MenuItem;
