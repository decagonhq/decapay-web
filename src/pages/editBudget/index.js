import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Layout from "../../components/dashboardSidebar/Layout";
import FormInputComponent from "../../components/InputComponent";
// import Select from "react-dropdown-select";
import Select from "react-select";
import GoBack from "../../components/Goback";
// import { Formik } from "formik";
import * as yup from "yup";
import MyButton from "../../components/Button";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";
import request from "../../utils/apiHelper";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import FormSelectComponent from "../../components/selectComponent";

const EditBudget = () => {
  const [data, setData] = useState([]);
  const [annual, setAnnual] = React.useState(false);
  const [monthly, setMonthly] = React.useState(false);
  const [weekly, setWeekly] = React.useState(false);
  const [daily, setDaily] = React.useState(false);
  const [custom, setCustom] = React.useState(false);
  const [period, setPeriod] = React.useState("");
  const options = [
    { value: "ANNUAL", label: "ANNUAL" },
    { value: "MONTHLY", label: "MONTHLY" },
    { value: "WEEKLY", label: "WEEKLY" },
    { value: "DAILY", label: "DAILY" },
    { value: "CUSTOM", label: "CUSTOM" },
  ];
  const { id } = useParams();
  useEffect(() => {
    fetchData();
    // initialPeriod();
  }, []);
  const initialValues = {
    title: "",
    amount: "",
    period: "",
    budgetStartDate: "",
    budgetEndDate: "",
    description: "",
    year: 0,
    month: 0,
    duration: 0,
  };

  const headers = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };
  const fetchData = async () => {
    try {
      const response = await request.get(`budgets/${id}`, headers);
      setData(response.data.data);
      setPeriod(response.data.data.budgetPeriod);
      if (response.data.data.budgetPeriod === "ANNUAL") {
        setAnnual(true);
      }
      if (response.data.data.budgetPeriod === "MONTHLY") {
        setMonthly(true);
      }
      if (response.data.data.budgetPeriod === "WEEKLY") {
        setWeekly(true);
      }
      if (response.data.data.budgetPeriod === "DAILY") {
        setDaily(true);
      }
      if (response.data.data.budgetPeriod === "CUSTOM") {
        setCustom(true);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  console.log(typeof initialValues.period);
  const timerBeforeRedirect = () => {
    setTimeout(() => {
      window.location.href = "/home";
    }, 2000);
  };
  const createBudgetValidationSchema = yup.object().shape({
    title: yup.string().required("Title is required"),
    amount: yup.number().required("Amount is required"),
    period: yup.string().required("Period is required"),
  });
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const changeDateFormat = (date) => {
    const splitDate = date.split("-");
    return `${splitDate[2]}/${splitDate[1]}/${splitDate[0]}`;
  };

  const onSubmit = async (values) => {
    formik.values.budgetStartDate = changeDateFormat(
      formik.values.budgetStartDate
    );
    formik.values.budgetEndDate = changeDateFormat(formik.values.budgetEndDate);
    formik.values.amount = parseInt(formik.values.amount);
    if (formik.values.period === "DAILY") {
      /* eslint-disable */
      formik.values.budgetEndDate = formik.values.budgetStartDate;
    } else if (formik.values.period === "CUSTOM") {
      formik.values.budgetEndDate = values.budgetEndDate;
    } else {
      formik.values.budgetEndDate = "";
    }
    try {
      await request.put(`budgets/${id}`, formik.values, {
        headers: {
          "Content-Type": "application/json",
          DVC_KY_HDR: 2,
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Budget created successfully");
      setLoading(false);
      timerBeforeRedirect();
    } catch (error) {
      toast.error(error.response.status);
      setLoading(false);
      console.log(error);
    }
  };
  const formik = useFormik({
    initialValues,
    createBudgetValidationSchema,
    onSubmit,
  });

  const years = [
    { value: "1", label: "2022" },
    { value: "2", label: "2023" },
    { value: "3", label: "2024" },
    { value: "4", label: "2025" },
    { value: "5", label: "2026" },
    { value: "6", label: "2027" },
    { value: "7", label: "2028" },
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

  // const dispatch = useDispatch();

  console.log("this is Period", period);
  console.log("this is weekly", weekly);
  console.log("this is daily", daily);
  console.log("this is monthly", monthly);
  console.log("this isannual", annual);
  console.log("this is custom", custom);

  const initialPeriod = () => {
    if (period === "ANNUAL") {
      setAnnual(true);
      setMonthly(false);
      setWeekly(false);
      setDaily(false);
      setCustom(false);
    } else if (period === "MONTHLY") {
      setAnnual(false);
      setMonthly(true);
      console.log(monthly);
      setWeekly(false);
      setDaily(false);
      setCustom(false);
    } else if (period === "WEEKLY") {
      setAnnual(false);
      setMonthly(false);
      setWeekly(true);
      console.log(weekly);
      setDaily(false);
      setCustom(false);
    } else if (period === "DAILY") {
      setAnnual(false);
      setMonthly(false);
      setWeekly(false);
      setDaily(true);
      setCustom(false);
    } else if (period === "CUSTOM") {
      setAnnual(false);
      setMonthly(false);
      setWeekly(false);
      setDaily(false);
      setCustom(true);
    }
  };

  const handleChange2 = (e) => {
    setPeriod(e.target.value);
    if (period === "ANNUAL") {
      setAnnual(true);
      setMonthly(false);
      setWeekly(false);
      setDaily(false);
      setCustom(false);
    } else if (period === "MONTHLY") {
      setAnnual(false);
      setMonthly(true);
      console.log(monthly);
      setWeekly(false);
      setDaily(false);
      setCustom(false);
    } else if (period === "WEEKLY") {
      setAnnual(false);
      setMonthly(false);
      setWeekly(true);
      console.log(weekly);
      setDaily(false);
      setCustom(false);
    } else if (period === "DAILY") {
      setAnnual(false);
      setMonthly(false);
      setWeekly(false);
      setDaily(true);
      setCustom(false);
    } else if (period === "CUSTOM") {
      setAnnual(false);
      setMonthly(false);
      setWeekly(false);
      setDaily(false);
      setCustom(true);
    }
  };
  console.log(period);

  return (
    <Layout>
      <StyledHome>
        <div className="form_wrap">
          <div className="form__container">
            <div className="header_wrapper">
              <GoBack />
              <h4 className="header_style">Edit Budget</h4>
            </div>
          </div>

          <div className="form__wrapper">
            <FormInputComponent
              placeholder="Enter Title"
              label="Title"
              type="text"
              name="title"
              value={formik.values.title}
              defaultValue={data?.title}
              onChange={formik.handleChange}
              error={formik.errors.title}
            />
          </div>
          <div className="form__wrapper">
            <FormInputComponent
              placeholder="Enter Amount"
              label="Amount"
              type="text"
              name="amount"
              value={formik.values.amount}
              defaultValue={data?.projectedAmount}
              onChange={formik.handleChange}
              error={formik.errors.amount}
            />
          </div>
          <div>
            <h5>Period</h5>
            {/* <Select
              options={options}
              name="period"
              className="fommy2"
              // {{ label: "Select Dept", value: 0 }}
              // {data.budgetPeriod}
              defaultValue={
                data.budgetPeriod === "ANNUAL"
                  ? { label: "Annual", value: "1" }
                  : data.budgetPeriod === "MONTHLY"
                  ? { label: "Monthly", value: "2" }
                  : data.budgetPeriod === "WEEKLY"
                  ? { label: "Weekly", value: "3" }
                  : data.budgetPeriod === "DAILY"
                  ? { label: "Daily", value: "4" }
                  : data.budgetPeriod === "CUSTOM"
                  ? { label: "Custom", value: "5" }
                  : { label: "Select Period", value: 0 }
              }
              placeholder={"Select Frequency"}
              error={formik.errors.period}
              value={formik.values.period}
              onChange={(e) => {
                handleChange2(e);
                // console.log(e);

                // formik.values.period = e[0].value.toUpperCase();
                formik.values.period = e.value.toUpperCase();
              }}

              // onChange={(e) => {
              //
              // }}
            /> */}
            <FormSelectComponent
              name="period"
              // label="Period"
              options={options}
              //  defaultValue={
              //   options.find((item) => item.value === data.budgetPeriod)
              //  }

              value={period}
              // defaultValue={period}
              onChange={(e) => handleChange2(e)}
              placeholder={"Select Frequency"}
            />
          </div>
          {annual && (
            <div className="fommy">
              <Select
                options={years}
                name="years"
                className="fommy2"
                placeholder="Select Year"
                value={formik.values.year}
                onChange={(e) => {
                  formik.values.year = parseInt(e.value);
                }}
              />
            </div>
          )}
          {monthly && (
            <div className="fommy">
              <Select
                options={years}
                name="year"
                className="fommy2"
                placeholder="Select Year"
                value={formik.values.year}
                onChange={(e) => {
                  console.log(e.value);
                  formik.values.year = parseInt(e.value);
                }}
              />
              <Select
                options={months}
                name="month"
                value={formik.values.month}
                placeholder="Select Month"
                className="fommy2"
                onChange={(e) => {
                  formik.values.month = parseInt(e.value);
                }}
              />
            </div>
          )}
          {weekly && (
            <div className="fommy3">
              <FormInputComponent
                placeholder="Start Date"
                label="Start Date"
                type="date"
                value={formik.values.budgetStartDate}
                name="budgetStartDate"
                onChange={formik.handleChange}
              />
              <FormInputComponent
                placeholder="Duration"
                label="duration"
                type="number"
                value={formik.values.duration}
                name="duration"
                onChange={formik.handleChange}
              />
            </div>
          )}
          {daily && (
            <div className="fommy3">
              <FormInputComponent
                placeholder="Start Date"
                label="Start Date"
                type="date"
                value={formik.values.budgetStartDate}
                name="budgetStartDate"
                onChange={formik.handleChange}
              />
            </div>
          )}
          {custom && (
            <div className="fommy3">
              <FormInputComponent
                placeholder="Start Date"
                label="Start Date"
                type="date"
                value={formik.values.budgetStartDate}
                name="budgetStartDate"
                onChange={formik.handleChange}
              />
              <FormInputComponent
                placeholder="End Date"
                label="End Date"
                type="date"
                value={formik.values.budgetEndDate}
                name="budgetEndDate"
                onChange={formik.handleChange}
              />
            </div>
          )}

          <div className="form__wrapper2">
            <FormInputComponent
              placeholder="Enter Description here..."
              label="Description"
              type="text"
              value={formik.values.description}
              defaultValue={data?.budgetPeriod}
              onChange={formik.handleChange}
              name="description"
            />
          </div>
          <div className="form__wrapper2">
            <MyButton
              type="submit"
              value="Edit Budget"
              disabled={!formik.isValid}
              className="form__button"
              onClick={formik.handleSubmit}
            >
              {loading ? (
                <ClipLoader color="white" size="40px" />
              ) : (
                "Edit Budget"
              )}
            </MyButton>
          </div>
        </div>
      </StyledHome>
    </Layout>
  );
};

export default EditBudget;

const StyledHome = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background-color: "white";
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
  .fommy2 {
    height: 50px;
  }
  .fommy3 {
    margin-top: 40px;
  }
`;
