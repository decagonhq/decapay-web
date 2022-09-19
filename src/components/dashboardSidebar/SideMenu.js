import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MenuItem from "./MenuItem";
import { MdOutlineLogout } from "react-icons/md";
import { TbLayoutDashboard } from "react-icons/tb";
import { AiOutlineDollar } from "react-icons/ai";
import { MdListAlt } from "react-icons/md";
import {RiLockPasswordLine} from "react-icons/ri";
import {CgProfile} from "react-icons/cg";
import Logo from "../LogoComponent";
import request from "../../utils/apiHelper";
import { toast } from "react-toastify";

const SidebarDemo = () => {
  const [homeActive, setHomeActive] = useState(false);
  const [budgetActive, setBudgetActive] = useState(false);
  const [catActive, setCatActive] = useState(false);
  const [viewProfileActive, setViewProfileActive] = useState(false);
  const [changePasswordActive, setChangePasswordActive] = useState(false);

  const logout = async () => {
    let token = localStorage.getItem("token");
    let payload = {
      token: token,
    };
    try {
      await request.post("signout", payload);
      localStorage.clear();
      window.location.href = `/login`;
      toast.success("Logout successful");
      return;
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };
  // get window.location
  const page = window.location.pathname.split("/")[1];
  useEffect(() => {
    if (page === "home") {
      setHomeActive(true);
    } else if (page === "budgets" || page === "budgetDetail") {
      setBudgetActive(true);
    } else if (page === "budgetCategory") {
      setCatActive(true);
    } else if (page === "myProfile") {
      setViewProfileActive(true);
    } else if (page === "changePassword") {
      setChangePasswordActive(true);
    }
  }, [page, homeActive, budgetActive, catActive]);

  return (
    <MenuStyle>
      <div className="menu--wrapper">
        <div className="logo-container">
          <Logo />
        </div>
        <MenuItem
          label="Dashboard"
          Icon={TbLayoutDashboard}
          to="/home"
          active={homeActive}
        />
        <MenuItem
          // key={index}
          label={"Budgets"}
          Icon={AiOutlineDollar}
          to={"/budgets"}
          active={budgetActive}
        />
        <MenuItem
          label="Budget Category"
          Icon={MdListAlt}
          to="/budgetCategory"
          active={catActive}
        />
        <MenuItem
          label="Profile"
          Icon={CgProfile}
          to="/myProfile"
          active={viewProfileActive}
        />
         <MenuItem
          label="Change Password"
          Icon={RiLockPasswordLine}
          to="/changePassword"
          active={changePasswordActive}
        />
        <div className="logout">
          <MdOutlineLogout />
          <p onClick={() => logout()}>Logout</p>
        </div>
      </div>
    </MenuStyle>
  );
};

export default SidebarDemo;

const MenuStyle = styled.div`
  /* width: 15rem ; */
  font-family:"Sofia Pro" ;
  height: 100vh;
  padding: 5px;
  /* box-shadow: 0px 0px 10px #e6e6e6; */
  /* z-index: 1; */
  width: 200px;
  background: #ffffff;
  background-size: contain;
  overflow-y: auto;
  ::-webkit-scrollbar {
    display: none;
  }
  .menu--wrapper {
    margin-top: 20px;
    width: 100%;
    box-sizing: border-box;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 5px;
    justify-content: flex-start;
  }
  .top-pattern {
    position: absolute;
    top: -6rem;
    left: -10rem;
    z-index: -1;
  }
  .top-image {
    height: 20rem;
    width: 22.5rem;
  }
  .bottom-pattern {
    position: absolute;
    bottom: 4rem;
    left: 1rem;
    z-index: -1;
  }
  .bottom-image {
    height: 10rem;
    width: 11.5rem;
  }
  .logo-container {
    /* background:red ; */
    margin-bottom: 6rem;
  }

  .logout {
    display: flex;
    gap: 10px;
    color: red;
    gap: 15px;
    align-items: center;
    padding: 15px 10px;
    margin-top: 30px;
    cursor: pointer;
    & p {
      padding: 0;
      margin: 0;
    }
  }

  @media (max-width: 768px) {
    /* width: 5rem; */
    padding: 1rem;
  }
`;
