import React, { useState } from "react";
import styled from "styled-components";
import SideMenu from "./SideMenu";
import SideNav from "./SideNav";
import { Burger } from "../Hamburger";
import Logo from "../LogoComponent";

const Layout = ({ children, hasBackground }) => {
  const [open, setOpen] = useState(false);
  const [setGroup] = useState("");

  const handleShow = (group) => {
    setGroup(group);
  };

  return (
    <Wrapper
      className={"dashboard-layout"}
      open={open}
      background={hasBackground}
    >
      <div className="large">
        <SideMenu />
      </div>

      {open && (
        <div className="burger">
          <SideNav handleShow={handleShow} open={open} setOpen={setOpen} />
          <Burger open={open} setOpen={setOpen} />
        </div>
      )}
      <div className="burger">
        <Logo />
        <Burger open={open} setOpen={setOpen} />
      </div>
      <div className="content">{children}</div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .burger {
    display: none;
  }
  @media only screen and (max-width: 768px) {
    .burger {
      display: flex;
      justify-content: space-between;
      padding: 5px 25px;
    }
    .large {
      display: none;
    }
  }
  .content {
    margin-top:20px;
  }
`;

export default Layout;
