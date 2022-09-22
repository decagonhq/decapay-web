import React, { useState } from "react";
import styled from "styled-components";
// import Layout from "../../components/dashboardSidebar/Layout";
import FormInputComponent from "../../../components/InputComponent";
import Select from "react-dropdown-select";
// import GoBack from "../../components/Goback";
import { Formik } from "formik";
import * as yup from "yup";
import MyButton from "../../../components/Button";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";
import request from "../../../utils/apiHelper";
import FormTitleSection from "../../../components/modal/FormTitleSection";
import DatePicker from "react-datepicker";
import format from "date-fns/format";
import CurrencyFormat from "react-currency-format";
import { dateFormats2,currency } from "../../../constants";
import { useNavigate } from "react-router-dom";

import {
  generateYearsFromCurrentYear,
  Options,
  Months,
  ANNUAL,
  MONTHLY,
  DAILY,
  WEEKLY,
  CUSTOM,
  changeDateFormat,
} from "../../../constants";

const CreateBudget = ({ closeModal }) => {
  const [projectedAmount, setProjectedAmount] = useState("");
  const [calendar, setCalendar] = useState({
    budgetStartDate: "",
    budgetEndDate: "",
  });

  const createBudgetValidationSchema = yup.object().shape({
    title: yup.string().required("Title is required"),
  });
  const [loading, setLoading] = useState(false);
 const navigation = useNavigate();
  
  const dismissToast = () => {
    toast.dismiss();
  };
  const onSubmit = async (values) => {
    if (values.period === CUSTOM) {
      values.budgetStartDate = format(calendar.budgetStartDate, dateFormats2);
      values.budgetEndDate = format(calendar.budgetEndDate, dateFormats2);
    }
    else {
      values.budgetStartDate = changeDateFormat(values.budgetStartDate);
      values.budgetEndDate = changeDateFormat(values.budgetEndDate);
    }

    values.amount = projectedAmount;
    if (values.period === DAILY) {
      /* eslint-disable */
      values.budgetEndDate = values.budgetStartDate;
    } else if (values.period === CUSTOM) {
      values.budgetEndDate = values.budgetEndDate;
    } else {
      values.budgetEndDate = "";
    }
    try {
      const response = await request.post(`budgets`, values);
      toast.success(response.data.message, {
        autoClose: 2000,
        onClose: dismissToast,
      });
      setLoading(false);
      navigation(`/budgetDetail/${response.data.data.id}`);
    } catch (error) {
      toast.error(error.response.status, {
        autoClose: 2000,
        onClose: dismissToast,
      });
      setLoading(false);
    }
  };



  const [period, setPeriod] = React.useState({
    weekly: false,
    monthly: false,
    annual: false,
    daily: false,
    custom: false,
  });
  const handleChange2 = (e) => {
    let valueOfE = e.map((item) => item.value);
    if (valueOfE[0] === ANNUAL) {
      setPeriod({
        ...period,
        weekly: false,
        monthly: false,
        annual: true,
        daily: false,
        custom: false,
      });
    } else if (valueOfE[0] === MONTHLY) {
      setPeriod({
        ...period,
        weekly: false,
        monthly: true,
        annual: false,
        daily: false,
        custom: false,
      });
    } else if (valueOfE[0] === WEEKLY) {
      setPeriod({
        ...period,
        weekly: true,
        monthly: false,
        annual: false,
        daily: false,
        custom: false,
      });
    } else if (valueOfE[0] === DAILY) {
      setPeriod({
        ...period,
        weekly: false,
        monthly: false,
        annual: false,
        daily: true,
        custom: false,
      });
    } else if (valueOfE[0] === CUSTOM) {
      setPeriod({
        ...period,
        weekly: false,
        monthly: false,
        annual: false,
        daily: false,
        custom: true,
      });
    }
  };
  const disableEndDateBasedOnStartDate = (date, budgetStartDate) => {
    if (date > budgetStartDate) {
      return true;
    }
    return false;
  };
  const handleOnChangeDate = (date, name) => {
    setCalendar({ ...calendar, [name]: date });
  };
 
  const handleOnChange = (e) => {
    let amount = e.target.value;
    let regex = /[^0-9]/g;
    let newAmount = amount.replace(regex, "");
    setProjectedAmount(newAmount);
  };

  return (
    <StyledHome>
      <div className="container">
        <FormTitleSection title="Create Budget" onClick={closeModal} />
        <Formik
          validationSchema={createBudgetValidationSchema}
          initialValues={{
            title: "",
            amount: "",
            period: "",
            budgetStartDate: "",
            budgetEndDate: "",
            description: "",
            year: 0,
            month: 0,
            duration: 0,
          }}
          onSubmit={(values) => {
            console.log(values);
            setLoading(true);
            onSubmit(values);
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            isValid,
          }) => (
            <div className="form_wrap">
              <div className="form__wrapper">
              <label>Title<span className="required_sign">*</span></label>
                <FormInputComponent
                  placeholder="Enter Title"
                  type="text"
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                  error={errors.title}
                />
              </div>
              <div className="form__wrapper">
                {/* <FormInputComponent
                  placeholder="Enter Amount"
                  label="Amount"
                  type="text"
                  name="amount"
                  value={values.amount}
                  onChange={handleChange}
                  error={errors.amount}
                /> */}
                <label className="form__label">Amount<span className="required_sign">*</span></label>
                <CurrencyFormat
                  placeholder="Enter Amount"
                  label="Amount"
                  displayType={"input"}
                  style={{ width: "100%", height: "100%", padding: "10px" }}
                  prefix={currency  + " "}
                  name={currency}
                  thousandSeparator={true}
                  value={projectedAmount}
                  onChange={(e) => handleOnChange(e)}
                /> 
              </div>
              
              <div className="period">
                <label>Period<span className="required_sign">*</span></label>
                <Select
                  options={Options}
                  name="period"
                  className="select"
                  placeholder="Select Period"
                  error={errors.period}
                  value={values.period}
                  onChange={(e) => {
                    handleChange2(e);
                    values.period = e[0].label.toUpperCase();
                  }}

                  
                />
              </div>
              {period.annual && (
                <div className="mt-2">
                  <Select
                    options={generateYearsFromCurrentYear()}
                    name="years"
                    className="select"
                    placeholder="Select Year"
                    value={values.year}
                    onChange={(e) => {
                      values.year = parseInt(e[0].label);
                    }}
                  />
                </div>
              )}
              {period.monthly && (
                <div className="mt-2">
                  <Select
                    options={generateYearsFromCurrentYear()}
                    name="year"
                    className="select mt-2"
                    placeholder="Select Year"
                    value={values.year}
                    onChange={(e) => {
                      values.year = parseInt(e[0].label);
                    }}
                  />
                  <Select
                    options={Months}
                    name="month"
                    value={values.month}
                    placeholder="Select Month"
                    className="select mt-2"
                    onChange={(e) => {
                      values.month = parseInt(e[0].value);
                    }}
                  />
                </div>
              )}
              {period.weekly && (
                <div className="mt-2">
                  <FormInputComponent
                    placeholder="Start Date"
                    label="Start Date"
                    type="date"
                    value={values.budgetStartDate}
                    name="budgetStartDate"
                    onChange={handleChange}
                  />
                  <FormInputComponent
                    placeholder="Duration"
                    label="duration"
                    type="number"
                    value={values.duration}
                    name="duration"
                    onChange={handleChange}
                  />
                </div>
              )}
              {period.daily && (
                <div className="fommy3">
                  <FormInputComponent
                    placeholder="Start Date"
                    label="Start Date"
                    type="date"
                    value={values.budgetStartDate}
                    name="budgetStartDate"
                    onChange={handleChange}
                  />
                </div>
              )}
              {period.custom && (
                <div className="mt-2">
                  <div className="form_wrapper3">
                    <h7>Start Date</h7>
                    <DatePicker
                      onChange={(e) => {
                        handleOnChangeDate(e, "budgetStartDate");
                      }}
                      selected={calendar.budgetStartDate}
                    />
                  </div>
                  <div className="form_wrapper3">
                    <h7>End Date <span className="required_sign">*</span></h7>
                    <DatePicker
                      onChange={(e) => {
                        handleOnChangeDate(e, "budgetEndDate");
                      }}
                      selected={calendar.budgetEndDate}
                      minDate={calendar.budgetStartDate}
                      name="budgetEndDate"
                      disabled={disableEndDateBasedOnStartDate(
                        calendar.budgetStartDate
                      )}
                    />
                  </div>
                </div>
              )}

              <div className="form__wrapper2 mt-2">
                <FormInputComponent
                  placeholder="Enter Description here..."
                  label="Description"
                  type="text"
                  value={values.description}
                  onChange={handleChange}
                  name="description"
                />
              </div>
              <div className="form__wrapper2">
                <MyButton
                  type="submit"
                  value="Create Budget"
                  disabled={!isValid}
                  className="form__wrapper2"
                  onClick={handleSubmit}
                >
                  {loading ? (
                    <ClipLoader color="white" size="40px" />
                  ) : (
                    "Create Budget"
                  )}
                </MyButton>
              </div>
            </div>
          )}
        </Formik>
      </div>
    </StyledHome>
  );
};

export default CreateBudget;

const StyledHome = styled.div`
  font-family: "Sofia Pro";
  display: flex;
  flex-direction: column;
  align-items: center;
  /* height: 100vh; */
  background-color: "white";
  .form_wrapper3 {
    width: 100%;
    border-radius: 5px;
    .react-datepicker__navigation--next {
      width: 30px;
    }
    .react-datepicker__navigation--previous {
      width: 30px;
    }
    .react-datepicker-wrapper,
    .react-datepicker__input-container,
    .react-datepicker__input-container input {
      display: block;
      width: 100%;
      height: 39px;
      margin-top: 5px;
    }
  }

  .container {
    width: 100%;
  }
  .required_sign{
    color: red;
    margin-top: 6px;
  }
  .period{
    margin-top: 20px;
  }
  .form_wrap {
    width: 100%;
    /* margin-top: 50px; */
    border-radius: 5px;
  }
  .btn_wrapper {
    align-items: center;
    justify-content: center;
    display: flex;
    padding: 4px;
    border-radius: 10px;
  }
  .error {
    color: red;
    font-size: 0.7rem;
  }
  .select {
    height: 2.5rem;
    font-size: 1rem;
  }
  label {
    margin-bottom: -5px;
    font-size: 1rem;
  }
  .mt-2 {
    margin-top: 15px;
  }
  .form__wrapper2 {
    width: 100%;
  }
`;
