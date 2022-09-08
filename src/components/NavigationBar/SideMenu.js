import React from "react";
import styled from "styled-components";
import MenuItem from "./MenuItem";
import Logo from "../LogoComponent";
import GetStarted from "./GetStarted";

const SidebarDemo = () => {

  return (
    <MenuStyle>
      <div className="menu--bar">
        <div className="logo-container">
          <Logo />
        </div>
        <div className="menu--wrapper">
          <MenuItem label="Home" to="/" />
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
      </div>
    </MenuStyle>
  );
};

export default SidebarDemo;

const MenuStyle = styled.div`
  /* width: 15rem ; */
  font-family: "Sofia Pro";
  height: 60px;
  padding: 5px;
  width: 100%;
  background: #FFFFFF;
  /* background: #B2BEB5; */
  display: flex;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  ::-webkit-scrollbar {
    display: none;
  }
  .menu--bar{
    width:100%;
    display: flex;
    justify-content:space-between;
    position: absolute;
    padding: 0 25px;
    top: -5px;

  }
  .menu--wrapper {
    margin-top: 20px;
    width: 40%;
    box-sizing: border-box;
    height: 100%;
    display: flex;
    gap: 5px;
    justify-content: space-between;
  }
  .logo-container {
    /* background:red ; */
    margin-bottom: 6rem;
  }
  .get-started{
    background:#14A800;
    border-radius: 5px;
    color: #FFFFFF;
    padding: 5px 10px;
  }
`;
