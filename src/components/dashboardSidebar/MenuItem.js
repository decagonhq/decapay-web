import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const MenuItem = ({ label, onClick, Icon, active, to }) => {
  return (
    <MenuItemStyle>
      <div className="p-items">
        <NavLink exact={true} className="p-link" to={to}>
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
  }

  .p-link {
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
    color: #8e919c;
    cursor: pointer;
    &:hover {
      background: #14a800;
      border-radius: 4px;
      color: white;
    }
    & p {
      padding: 0;
      margin: 0;
    }
  }
 
`;

export default MenuItem;
