import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Layout from "../../components/dashboardSidebar/Layout";
import FormInputComponent from "../../components/InputComponent";
import GoBack from "../../components/Goback";
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
  const [year, setYear] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [month, setMonth] = React.useState("");
  const [startDate, setStartDate] = React.useState("");
  const [duration, setDuration] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [period, setPeriod] = React.useState("");

  const formatDate = (date) => {
    let splitDate = date.split("/");
    let joinDateFromBehind = splitDate.reverse().join("-");
    return joinDateFromBehind;
  };
  
  
  
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
    // eslint-disable-next-line
  }, []);
  
  const initialValues = {
    title: data?.title,
    amount: data?.amount,
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
      const response = await request.get(`budgets/edit/${id}`, headers);
      setData(response.data.data);
      setPeriod(response.data.data.period);
      setTitle(response.data.data.title);
      setDescription(response?.data.data.description);
      setAmount(response.data.data.amount);
      if (response.data.data.period === "ANNUAL") {
        setYear(response.data.data.year);
        console.log(response.data.data.year);
      } else if (response.data.data.period === "MONTHLY") {
        setMonth(response.data.data.month);
        setYear(response.data.data.year);
        console.log(month);
      } else if (response.data.data.period === "WEEKLY") {
        setDuration(response.data.data.duration);
        setStartDate(formatDate(response.data.data.budgetStartDate));
        console.log(duration);
      } else if (response.data.data.period === "DAILY") {
        setStartDate(formatDate(response.data.data.budgetStartDate));
        setEndDate(formatDate(response.data.data.budgetEndDate));
        console.log(duration);
      } else if (response.data.data.period === "CUSTOM") {
        setStartDate(formatDate(response.data.data.budgetStartDate));
        setEndDate(formatDate(response.data.data.budgetEndDate));
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

  const onSubmit = async () => {
    let payload = {
      title: title,
      description: description,
      amount: amount,
      year: year,
      duration: duration,
      month: month,
      period: period,
      budgetStartDate: changeDateFormat(startDate),
      budgetEndDate: period==="DAILY"?changeDateFormat(startDate):changeDateFormat(endDate),
      
    };
    console.log("this is payload", payload);
    try {
      await request.put(`budgets/${id}`, payload, {
        headers: {
          "Content-Type": "application/json",
          DVC_KY_HDR: 2,
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Budget Editted successfully");
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
    { value: "2022", label: "2022" },
    { value: "2023", label: "2023" },
    { value: "2024", label: "2024" },
    { value: "2025", label: "2025" },
    { value: "2026", label: "2026" },
    { value: "2027", label: "2027" },
    { value: "2028", label: "2028" },
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

  const handleChange2 = (e) => {
    setPeriod(e.target.value);
  };
  const handleChangeYear = (e) => {
    setYear(e.target.value);
  };
  const handleChangeMonth = (e) => {
    setMonth(e.target.value);
  };
  const handleChangeDuration = (e) => {
    setDuration(e.target.value);
  };
  const handleChangeStartDate = (e) => {
    setStartDate(e.target.value);
  };
  const handleChangeEndDate = (e) => {
    setEndDate(e.target.value);
  };
  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  };
  const handleChangeAmount = (e) => {
    setAmount(e.target.value);
  };

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
              value={title}
              onChange={(e) => handleChangeTitle(e)}
              error={formik.errors.title}
            />
          </div>
          <div className="form__wrapper">
            <FormInputComponent
              placeholder="Enter Amount"
              label="Amount"
              type="text"
              name="amount"
              value={amount}
              onChange={(e) => 
                handleChangeAmount(e)}
              error={formik.errors.amount}
            />
          </div>
          <div>
            <h5>Period</h5>

            <FormSelectComponent
              name="period"
              options={options}

              value={period}
              onChange={(e) => handleChange2(e)}
              placeholder={"Select Frequency"}
            />
          </div>
          {period === "ANNUAL" && (
            <div className="fommy">
              <FormSelectComponent
                name="year"
                options={years}
                value={year}
                onChange={(e) => handleChangeYear(e)}
                placeholder={"Select Frequency"}
              />
            </div>
          )}
          {period === "MONTHLY" && (
            <div className="fommy">
              <FormSelectComponent
                name="year"
                options={years}
                value={year}
                onChange={(e) => handleChangeYear(e)}
                placeholder={"Select Frequency"}
              />
              <FormSelectComponent
                name="month"
                options={months}
                value={month}
                onChange={(e) => handleChangeMonth(e)}
                placeholder={"Select Frequency"}
              />
            </div>
          )}
          {period === "WEEKLY" && (
            <div className="fommy3">
              <FormInputComponent
                placeholder="Start Date"
                label="Start Date"
                type="date"
                value={formatDate(startDate)}
                name="budgetStartDate"
                onChange={(e)=>handleChangeStartDate(e)}
              />
              <FormInputComponent
                placeholder="Duration"
                label="duration"
                type="number"
                value={duration}
                name="duration"
                onChange={(e)=>handleChangeDuration(e)}
              />
            </div>
          )}
          {period === "DAILY" && (
            <div className="fommy3">
              <FormInputComponent
                placeholder="Start Date"
                label="Start Date"
                type="date"
                value={formatDate(startDate)}
                name="budgetStartDate"
                onChange={(e) =>
                  handleChangeStartDate(e)}
              />
            </div>
          )}
          {period === "CUSTOM" && (
            <div className="fommy3">
              <FormInputComponent
                placeholder="Start Date"
                label="Start Date"
                type="date"
                value={formatDate(startDate)}
                name="budgetStartDate"
                onChange={(e) =>
                  handleChangeStartDate(e)}
              />
              <FormInputComponent
                placeholder="End Date"
                label="End Date"
                type="date"
                value={formatDate(endDate)}
                name="budgetEndDate"
                onChange={(e)=>
                  handleChangeEndDate(e)}
                
              />
            </div>
          )}

          <div className="form__wrapper2">
            <FormInputComponent
              placeholder="Enter Description here..."
              label="Description"
              type="text"
              value={description}
              defaultValue={data?.description}
              onChange={handleChangeDescription}
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
