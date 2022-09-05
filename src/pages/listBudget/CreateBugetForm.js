import React, { useState } from "react";
import styled from "styled-components";
// import Layout from "../../components/dashboardSidebar/Layout";
import FormInputComponent from "../../components/InputComponent";
import Select from "react-dropdown-select";
// import GoBack from "../../components/Goback";
import { Formik } from "formik";
import * as yup from "yup";
import MyButton from "../../components/Button";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";
import request from "../../utils/apiHelper";
import FormTitleSection from "../../components/modal/FormTitleSection";
import DatePicker from "react-datepicker";
import format from "date-fns/format";
import { dateFormats2 } from "../../constants";
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
} from "../../constants";
// import "react-datepicker/dist/react-datepicker.css";

const CreateBudget = ({ closeModal }) => {
  const timerBeforeRedirect = () => {
    setTimeout(() => {
      window.location.href = "/budgets";
    }, 1000);
  };
  const [calendar, setCalendar] = useState({
    budgetStartDate: "",
    budgetEndDate: "",
  });
  const options = [
    { value: "1", label: "Annual" },
    { value: "2", label: "Monthly" },
    { value: "3", label: "Weekly" },
    { value: "4", label: "Daily" },
    { value: "5", label: "custom" },
  ];
  const createBudgetValidationSchema = yup.object().shape({
    title: yup.string().required("Title is required"),
    amount: yup.number().required("Amount is required"),
    period: yup.string().required("Period is required"),
  });
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  
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

    values.amount = parseInt(values.amount);
    if (values.period === DAILY) {
      /* eslint-disable */
      values.budgetEndDate = values.budgetStartDate;
    } else if (values.period === CUSTOM) {
      values.budgetEndDate = values.budgetEndDate;
    } else {
      values.budgetEndDate = "";
    }
    try {
      const response = await request.post(`budgets`, values, {
        headers: {
          "Content-Type": "application/json",
          DVC_KY_HDR: 2,
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(response.data.message, {
        autoClose: 2000,
        onClose: dismissToast,
      });
      setLoading(false);
      timerBeforeRedirect();
    } catch (error) {
      toast.error(error.response.status, {
        autoClose: 2000,
        onClose: dismissToast,
      });
      setLoading(false);
      console.log(error);
    }
  };

  // const dispatch = useDispatch();

  const [period, setPeriod] = React.useState({
    weekly: false,
    monthly: false,
    annual: false,
    daily: false,
    custom: false,
  });
  const handleChange2 = (e) => {
    // if(!e.value || !e.label) return;
    let valueOfE = e.map((item) => item.value);
    console.log(valueOfE);
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
  console.log(calendar);
  // useEffect(() => {
  //   handleChange(
  //   )
  // }, [annual, monthly, weekly, daily, custom])
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
            setLoading(true);
            onSubmit(values);
            console.log(values);
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
                <FormInputComponent
                  placeholder="Enter Title"
                  label="Title"
                  type="text"
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                  error={errors.title}
                />
              </div>
              <div className="form__wrapper">
                <FormInputComponent
                  placeholder="Enter Amount"
                  label="Amount"
                  type="text"
                  name="amount"
                  value={values.amount}
                  onChange={handleChange}
                  error={errors.amount}
                />
              </div>
              <div className="period">
                <label>Period</label>
                <Select
                  options={Options}
                  name="period"
                  className="select"
                  placeholder="Select Frequency"
                  error={errors.period}
                  value={values.period}
                  onChange={(e) => {
                    handleChange2(e);
                    values.period = e[0].label.toUpperCase();
                  }}

                  // onChange={(e) => {
                  //
                  // }}
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
                      console.log(e[0].label);
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
                      console.log(e.value);
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
                      console.log(e[0].label);
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
                  {/* <FormInputComponent
                    placeholder="Start Date"
                    label="Start Date"
                    type="date"
                    value={values.budgetStartDate}
                    name="budgetStartDate"
                    onChange={handleChange}
                  />
                  <FormInputComponent
                    placeholder="End Date"
                    label="End Date"
                    type="date"
                    value={values.budgetEndDate}
                    name="budgetEndDate"
                    onChange={handleChange}
                  /> */}
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
                    <h7>End Date</h7>
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
