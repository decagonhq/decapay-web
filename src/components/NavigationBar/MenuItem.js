import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";


const MenuItem = ({ label, onClick, active, to,color }) => {

  return (
    <MenuItemStyle>
      <div
        onClick={onClick}
        className={active ? "selected p-items" : "p-items"}
      >
        <NavLink
          color={color}
          exact={true}
          className={active ? "link text-active" : "link text-inactive"}
          to={to}
        >
          {label}
        </NavLink>
      </div>
    </MenuItemStyle>
  );
};

const MenuItemStyle = styled.div`
  font-family: "Sofia Pro";
  .p-items {
    display: flex;
    cursor: pointer;
    align-items: center;
    width: 100%;
    padding: 5px 15px;
    /* box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); */
  }
  @media only screen and (max-width: 1046px) {
    .p-items {
      padding: 5px 5px;
    }
  }
    @media only screen and (max-width: 850px) {
      .p-items {
        padding: 5px 1px;
      }
    }
  
  .selected {
    color: white;
    background: #14a800;
  }
  .link {
    text-decoration: none;
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
    &:hover {
      color: #14A800;
    }
    &:active {
      color: #14A800;
    }

    & p {
      padding: 0;
      margin: 0;
    }
  }
  .text-active {
    color: #14A800;
  }
  .text-inactive {
    color:${(props) => props.color? props.color : "#21334F"};
  }
`;

export default MenuItem;
