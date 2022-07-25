import React from "react";
import styled from "styled-components";
import MenuItem from "./MenuItem";
import { AiOutlineHome } from "react-icons/ai";
import { AiFillSchedule } from "react-icons/ai";
import { FiVideo } from "react-icons/fi";
import { FaMoneyBillWaveAlt } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { GiDoctorFace } from "react-icons/gi";
import { BsPersonFill } from "react-icons/bs";
import { MdOutlineLogout } from "react-icons/md";
import { AiFillMedicineBox } from "react-icons/ai";
import { ImLab } from "react-icons/im";
import { RiCurrencyLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import Logo from "./Logo";

const SidebarDemo = () => {
  const [homeActive] = React.useState(true);
  const [scheduleActive] = React.useState(false);
  const [consultationActive] = React.useState(false);
  const [billingActive] = React.useState(false);
  const [settingsActive] = React.useState(false);
  const [doctorActive] = React.useState(false);
  // const [logoutActive] = React.useState(false);
  const [PatientActive] = React.useState(false);
  const [pharmacyActive] = React.useState(false);
  const [diagnosticActive] = React.useState(false);
  const [rentalActive] = React.useState(false);
  const pageInfo = useSelector((state) => state.pageInfo);
  const { userType } = pageInfo;

  const logout = () => {
    localStorage.clear();
    window.location.href = `/login`;
    return;
  };
  return (
    <MenuStyle>
      <div className="menu--wrapper">
        <div className="logo-container">
          <Logo />
        </div>
        <MenuItem
          label="Home"
          Icon={AiOutlineHome}
          to="/home"
          active={homeActive}
        />

        {userType !== "Accountant" ? (
          <MenuItem
            label="Doctors"
            Icon={GiDoctorFace}
            to={"/doctor-list"}
            active={doctorActive}
          />
        ) : null}
        <MenuItem
          label="Patients"
          Icon={BsPersonFill}
          to={"/patient"}
          active={PatientActive}
        />

        {userType !== "Accountant" ? (
          <MenuItem
            label={"Schedule"}
            Icon={AiFillSchedule}
            to={"/schedule"}
            active={scheduleActive}
          />
        ) : null}
        {userType !== "Accountant" ? (
          <MenuItem
            label="Consulting Room"
            Icon={FiVideo}
            to="/consultation"
            active={consultationActive}
          />
        ) : null}
        {userType === "Pharmacist" || userType === "admin" ? (
          <MenuItem
            // key={index}
            label={"Pharmacy"}
            Icon={AiFillMedicineBox}
            active={pharmacyActive}
            to={"/pharmacy"}
          />
        ) : null}
        {userType === "Diagnostic" || userType === "admin" ? (
          <MenuItem
            label={"Diagnostic/Lab"}
            Icon={ImLab}
            active={diagnosticActive}
            to={"/diagnostic"}
          />
        ) : null}

        {userType === "admin" || userType === "Accountant" ? (
          <MenuItem
            label="Billings"
            Icon={FaMoneyBillWaveAlt}
            to="/billings"
            active={billingActive}
          />
        ) : null}
        {userType === "admin" ? (
          <MenuItem
            label="Rentals"
            Icon={RiCurrencyLine}
            to="/rentals"
            active={rentalActive}
          />
        ) : null}
        {userType === "admin" ? (
          <MenuItem
            label="Settings"
            Icon={FiSettings}
            to="/settings"
            active={settingsActive}
          />
        ) : null}

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
  height: 100vh;
  padding: 5px;
  /* box-shadow: 0px 0px 10px #e6e6e6; */
  /* z-index: 1; */
  width: 200px;
  background: url("https://res.cloudinary.com/dwbfq30yz/image/upload/v1650097185/DBbackground_down_slmy3x.png")
      center bottom no-repeat,
    url("https://res.cloudinary.com/dwbfq30yz/image/upload/v1650097185/DBbackground_down_slmy3x.png")
      center top no-repeat;
  background-size: contain;
  overflow-y:auto;
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
