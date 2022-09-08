import React from "react";
import styled from "styled-components";
import MenuItem from "./MenuItem";
import Logo from "../LogoComponent";
import GetStarted from "./GetStarted";

const SidebarDemo = () => {


  return (
    <MenuStyle>
        <div className="menu--wrapper">
          <Logo />
          <MenuItem label="Home" to="/home"  />
          <MenuItem
            // key={index}
            label={"How it works"}
            to={"/"}
          />
          <MenuItem
            // key={index}
            label={"Contact us"}
            to={"/"}
          />
          <div className="get-started">
            <GetStarted />
          </div>
        </div>
    </MenuStyle>
  );
};

export default SidebarDemo;

const MenuStyle = styled.div`
  /* width: 15rem ; */
  font-family: "Sofia Pro";
  height: 100vh;
  padding: 5px;
  width: 150px;
  /* background: #B2BEB5; */
  background: #FFFFFF;
  display: flex;
  justify-content:center;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  ::-webkit-scrollbar {
    display: none;
  }
  .menu--wrapper {
    margin-top: 20px;
    box-sizing: border-box;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 50px;
  }
  .get-started{
    background:#14A800;
    border-radius: 5px;
    color: #FFFFFF;
    padding: 5px 10px;
    
  }
`;
