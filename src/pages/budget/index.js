import React, { useState } from "react";
import styled from "styled-components";
import Layout from "../../components/dashboardSidebar/Layout";
import FormInputComponent from "../../components/InputComponent";
import Select from "react-dropdown-select";
import Calendar from "react-calendar";

const CreateBudget = () => {
  const options = [
    { value: "1", label: "Annual" },
    { value: "2", label: "Monthly" },
    { value: "3", label: "Weekly" },
    { value: "4", label: "Daily" },
    { value: "5", label: "custom" },
  ];
  const years = [
    { value: "1", label: "2020" },
    { value: "2", label: "2021" },
    { value: "3", label: "2022" },
    { value: "4", label: "2023" },
    { value: "5", label: "2024" },
    { value: "6", label: "2025" },
    { value: "7", label: "2026" },
    { value: "8", label: "2027" },
    { value: "9", label: "2028" },
  ];
  const months = [
    { value: "1", label: "January" },
    { value: "2", label: "February" },
    { value: "3", label: "March" },
    { value: "4", label: "April" },
    { value: "5", label: "May" },
    { value: "6", label: "June" },
    { value: "7", label: "July" },
    { value: "8", label: "August" },
    { value: "9", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];
  const weeks = [
    { value: "1", label: "Week 1" },
    { value: "2", label: "Week 2" },
    { value: "3", label: "Week 3" },
    { value: "4", label: "Week 4" },
  ];
  const [annual, setAnnual] = React.useState(false);
  const [monthly, setMonthly] = React.useState(false);
  const [weekly, setWeekly] = React.useState(false);
  const [daily, setDaily] = React.useState(false);
  const [custom, setCustom] = React.useState(false);
  const [date, setDate] = useState(new Date());
  const handleChange = (e) => {
    // if(!e.value || !e.label) return;
    let valueOfE = e.map((item) => item.value);
    console.log(valueOfE);
    if (valueOfE[0] === "1") {
      setAnnual(true);
      setMonthly(false);
      setWeekly(false);
      setDaily(false);
      setCustom(false);
    } else if (valueOfE[0] === "2") {
      setAnnual(false);
      setMonthly(true);
      setWeekly(false);
      setDaily(false);
      setCustom(false);
    } else if (valueOfE[0] === "3") {
      setAnnual(false);
      setMonthly(false);
      setWeekly(true);
      setDaily(false);
      setCustom(false);
    } else if (valueOfE[0] === "4") {
      setAnnual(false);
      setMonthly(false);
      setWeekly(false);
      setDaily(true);
      setCustom(false);
    } else if (valueOfE[0] === "5") {
      setAnnual(false);
      setMonthly(false);
      setWeekly(false);
      setDaily(false);
      setCustom(true);
    }
  };
  console.log(annual);
  // useEffect(() => {
  //   handleChange(
  //   )
  // }, [annual, monthly, weekly, daily, custom])
  return (
    <Layout>
      <StyledHome>
        <div className="form_wrap">
          <div className="form__container">
            <div className="header_wrapper">
              <button className="btn_wrapper">
                <img
                  src={require("../../assets/icons/backButton.png")}
                  alt="back"
                />
                Back
              </button>
              <h3 className="header_style">Create Budget</h3>
            </div>
          </div>
          <div className="form__wrapper">
            <FormInputComponent
              placeholder="Enter Title"
              label="Title"
              type="password"
              name="password"
            />
          </div>
          <div className="form__wrapper">
            <FormInputComponent
              placeholder="Enter Amount"
              label="Amount"
              type="password"
              name="password"
            />
          </div>
          <div>
            <h5>Period</h5>
            <Select
              options={options}
              name="period"
              className="fommy2"
              placeholder="Select Frequency"
              onChange={(e) => handleChange(e)}
              // onChange={(e) => {
              //
              // }}
            />
          </div>
          {annual && (
            <div className="fommy">
              <Select
                options={years}
                className="fommy2"
                placeholder="Select Year"
                onChange={(e) => {
                  console.log(e.value);
                }}
              />
            </div>
          )}
          {monthly && (
            <div className="fommy">
              <Select
                options={years}
                className="fommy2"
                placeholder="Select Year"
                onChange={(e) => {
                  console.log(e.value);
                }}
              />
              <Select options={months} placeholder="Select Month" 
                className="fommy2"
              />
            </div>
          )}
          {weekly && (
            <div className="fommy">
              <Select
                options={years}
                placeholder="Select Year"
                onChange={(e) => {
                  console.log(e.value);
                }}
                className="fommy2"
              />
              <Select options={months} placeholder="Select Month" 
                className="fommy2"
                
              />
              <Select options={weeks} placeholder="Select Week"
              className="fommy2" />
            </div>
          )}
          {daily && (
            <div className="fommy">
              <div className="calendar-container">
                <Calendar onChange={setDate} value={date} />
              </div>
            </div>
          )}
          {custom && (
            <div className="fommy3">
              <FormInputComponent
              placeholder="Start Date"
              label="Start Date"
              type="date"
              name="date"
              onChange={(e) => {
                console.log(e.target.value);
                
              }}
            />
            <FormInputComponent
              placeholder="End Date"
              label="End Date"
              type="date"
              name="date"
              onChange={(e) => {
                console.log(e.target.value);
                
              }}
            />
            </div>
            
          )}

          <div className="form__wrapper2">
            <FormInputComponent
              placeholder="Enter Description here..."
              label="Description"
              type="password"
              name="password"
              
            />
          </div>
        </div>
      </StyledHome>
    </Layout>
  );
};

export default CreateBudget;

const StyledHome = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background-color: #fafafa;
  h1 {
    font-size: 2rem;
    font-weight: bold;
    color: #333;
    text-transform: uppercase;
  }
  .form__wrapper2 {
    margin-top: 30px;
  }
  .form_wrap {
    width: 50%;
    margin-top: 50px;
    border-radius: 5px;
  }
  .btn_wrapper {
    align-items: center;
    justify-content: center;
    display: flex;
    padding: 4px;
    border-radius: 10px;
  }
  .form__container {
    display: flex;
    width: 100%;
    align-items: center;
  }
  .header_style {
    justify-content: center;
    align-items: center;
    align-self: center;
    display: flex;
  }
  .header_wrapper {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 10px;
  }
  .fommy {
    margin-top: 20px;
  }
  .fommy2{
    height : 50px
  }
  .fommy3{
    margin-top: 40px;
  }
`;
