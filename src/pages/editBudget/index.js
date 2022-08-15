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
import { ANNUAL, MONTHLY, DAILY, WEEKLY, CUSTOM, Options, Months } from "../../constants";
import FormSelectComponent from "../../components/selectComponent";

const EditBudget = () => {
  
  const [collectData, setCollectData] = React.useState({
    year: "",
    title: "",
    description: "",
    amount: "",
    month: "",
    startDate: "",
    duration: "",
    endDate: "",
    period: "",
  });

  const formatDate = (date) => {
    if (date === "" || date === null || date === undefined) {
      return "";
    } else {
      let splitDate = date.split("/");
      let joinDateFromBehind = splitDate.reverse().join("-");
      return joinDateFromBehind;
    }
  };

  
  const { id } = useParams();

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
  const dismissToast = () => {
    toast.dismiss();
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
      console.log(response.data.data);
      setCollectData({
        ...collectData,
        title: response.data.data.title,
        description: response.data.data.description,
        amount: response.data.data.amount,
        period: response.data.data.period,
        startDate: formatDate(response.data.data.budgetStartDate),
        endDate: formatDate(response.data.data.budgetEndDate),
        year: response.data.data.year,
        month: response.data.data.month,
        duration: response.data.data.duration,
      });
      
    } catch (error) {
      console.log(error);
      toast.error(error, {
        autoClose: 3000,
        onClose: dismissToast,
      });
    }
  };
  console.log(collectData);
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);
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
      title: collectData.title,
      description: collectData.description,
      amount: collectData.amount,
      year: collectData.year,
      duration: collectData.duration,
      month: collectData.month,
      period: collectData.period,
      budgetStartDate: changeDateFormat(collectData.startDate),
      budgetEndDate:
        collectData.period === "DAILY"
          ? changeDateFormat(collectData.startDate)
          : changeDateFormat(collectData.endDate),
    };
    console.log("this is payload", payload);
    try {
      const response = await request.put(`budgets/${id}`, payload, {
        headers: {
          "Content-Type": "application/json",
          DVC_KY_HDR: 2,
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(
       response.data.message, {
        autoClose: 3000,
        onClose: dismissToast,
       }
      );
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

 
  const generateYearsFromCurrentYear = () => {
    let currentYear = new Date().getFullYear();
    let years = [];
    for (let i = currentYear; i < currentYear + 10; i++) {
      years.push({ value: i, label: i });
    }
    return years;
  };
  

  const handleChange2 = (e) => {
    setCollectData({ ...collectData, period: e.target.value });
  };
  const handleChangeYear = (e) => {
    setCollectData({ ...collectData, year: e.target.value });
  };
  const handleChangeMonth = (e) => {
    setCollectData({ ...collectData, month: e.target.value });
  };

  const handleChangeDuration = (e) => {
    setCollectData({ ...collectData, duration: e.target.value });
  };
  const handleChangeStartDate = (e) => {
    setCollectData({ ...collectData, startDate: e.target.value });
  };
  const handleChangeEndDate = (e) => {
    setCollectData({ ...collectData, endDate: e.target.value });
  };
  const handleChangeTitle = (e) => {
    setCollectData({ ...collectData, title: e.target.value });
  };
  const handleChangeDescription = (e) => {
    setCollectData({ ...collectData, description: e.target.value });
  };
  const handleChangeAmount = (e) => {
    setCollectData({ ...collectData, amount: e.target.value });
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
              value={collectData.title}
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
              value={collectData.amount}
              onChange={(e) => handleChangeAmount(e)}
              error={formik.errors.amount}
            />
          </div>
          <div>
            <h5>Period</h5>

            <FormSelectComponent
              name="period"
              options={Options}
              value={collectData.period}
              onChange={(e) => handleChange2(e)}
              placeholder={"Select Frequency"}
            />
          </div>
          {collectData.period === ANNUAL && (
            <div className="fommy">
              <FormSelectComponent
                name="year"
                options={generateYearsFromCurrentYear()}
                value={collectData.year}
                onChange={(e) => handleChangeYear(e)}
                placeholder={"Select Frequency"}
              />
            </div>
          )}
          {collectData.period === MONTHLY && (
            <div className="fommy">
              <FormSelectComponent
                name="year"
                options={generateYearsFromCurrentYear()}
                value={collectData.year}
                onChange={(e) => handleChangeYear(e)}
                placeholder={"Select Frequency"}
              />
              <FormSelectComponent
                name="month"
                options={Months}
                value={collectData.month}
                onChange={(e) => handleChangeMonth(e)}
                placeholder={"Select Frequency"}
              />
            </div>
          )}
          {collectData.period === WEEKLY && (
            <div className="fommy3">
              <FormInputComponent
                placeholder="Start Date"
                label="Start Date"
                type="date"
                value={collectData.startDate}
                name="budgetStartDate"
                onChange={(e) => handleChangeStartDate(e)}
              />
              <FormInputComponent
                placeholder="Duration"
                label="duration"
                type="number"
                value={collectData.duration}
                name="duration"
                onChange={(e) => handleChangeDuration(e)}
              />
            </div>
          )}
          {collectData.period === DAILY && (
            <div className="fommy3">
              <FormInputComponent
                placeholder="Start Date"
                label="Start Date"
                type="date"
                value={collectData.startDate}
                name="budgetStartDate"
                onChange={(e) => handleChangeStartDate(e)}
              />
            </div>
          )}
          {collectData.period === CUSTOM && (
            <div className="fommy3">
              <FormInputComponent
                placeholder="Start Date"
                label="Start Date"
                type="date"
                value={collectData.startDate}
                name="budgetStartDate"
                onChange={(e) => handleChangeStartDate(e)}
              />
              <FormInputComponent
                placeholder="End Date"
                label="End Date"
                type="date"
                value={collectData.endDate}
                name="budgetEndDate"
                onChange={(e) => handleChangeEndDate(e)}
              />
            </div>
          )}

          <div className="form__wrapper2">
            <FormInputComponent
              placeholder="Enter Description here..."
              label="Description"
              type="text"
              value={collectData.description}
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
