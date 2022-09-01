import React, { useState } from "react";
import { Container } from "react-bootstrap";
import styled from "styled-components";
import SideMenu from "./SideMenu";
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
      <div className="dashboard-layout__sidebar">
        <SideMenu handleShow={handleShow} open={open} setOpen={setOpen} />
      </div>
      <div className="top-nav">
        <Container className="d-flex align-items-center justify-content-between">
          <Logo />
          <Burger open={open} setOpen={setOpen} />
        </Container>
      </div>
      <div className="dashboard-layout__contents">
        <Container>{children}</Container>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: #f5f7fa;
  font-family: "Sofia Pro";
  .dashboard-layout__sidebar {
    background: #f3f4f8;
    box-shadow: 4px 0px 16px rgba(0, 0, 0, 0.16);
  }
  .dashboard-layout__contents {
    position: relative;
    padding: 0 10px;
  }
  .top-nav {
    display: none;
  }

  .hamburger {
    display: none;
  }

  .logo {
    width: 15rem;
    height: 2.605rem;
  }
  .container {
    background-color: white;
   
    /* box-shadow: 0px 0px 15px #00000029; */
  }
  /* .form-modal {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
  } */
  .dashboard-layout {
    &__sidebar {
      transition: all 0.8s;
      position: fixed;
      height: 100vh;
      /* width: 304px; */
      transform: translate(0px);
      z-index: 1;
    }

    &__contents {
      /* padding: 2rem 2.4rem 2rem 2.4rem; */
      transition: all 0.8s;
      margin-left: 200px;
      min-height: 100vh;
      background: ${({ background }) => (background ? "#f0f5f1" : "#fff")};
    }

    @media screen and (max-width: 1170px) {
      &__sidebar {
        transform: ${({ open }) =>
          open ? "translateX(0px)" : "translateX(-304px)"};
        box-shadow: ${({ open }) =>
          open ? "5px 0px 4px 2px #0000000f" : "unset"};
      }
      &__contents {
        margin-left: 0px;
        padding: 1rem 1rem 2rem 1rem;
      }
    }
  }
  @media (min-width: 1200px) {
    .container {
      min-width: 98%;
    }
  }
  @media screen and (max-width: 1170px) {
    .hamburger {
      display: flex;
    }

    .top-nav {
      display: block;
      padding: 2rem 0;
      background-color: #fff;
    }
  }
  @media only screen and (min-width: 280px) and (max-width: 728px) {
    .dashboard-layout__contents {
      padding: 2.8rem 0.5rem 2rem 0.5rem;
    }
  }
`;

export default Layout;
