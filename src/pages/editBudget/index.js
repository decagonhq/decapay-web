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
import CurrencyFormat from 'react-currency-format';
import { useFormik } from "formik";
import {
  ANNUAL,
  MONTHLY,
  DAILY,
  WEEKLY,
  CUSTOM,
  Options,
  Months,
} from "../../constants";
import FormSelectComponent from "../../components/selectComponent";

const EditBudget = () => {
  const [collectData, setCollectData] = React.useState({
    year: "",
    title: "",
    description: "",
    amount: "",
    month: "",
    budgetStartDate: "",
    duration: "",
    budgetEndDate: "",
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
  const stripCommaAndConvertToNumber = (amount) => {
    if (amount === "" || amount === null || amount === undefined ) {
      return "";
    }
    else if(typeof(amount) === "number"){
      return amount;
    }
    else {
      let splitAmount = amount.split(",");
      let joinBackAmount = splitAmount.join("");
      let removeNairaandConvertToNumber = parseInt(joinBackAmount.replace("#", ""));
      return removeNairaandConvertToNumber;
    }
  }

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
      setCollectData({
        ...collectData,
        title: response.data.data.title,
        description: response.data.data.description,
        amount: response.data.data.amount,
        period: response.data.data.period,
        budgetStartDate: formatDate(response.data.data.budgetStartDate),
        budgetEndDate: formatDate(response.data.data.budgetEndDate),
        year: response.data.data.year,
        month: response.data.data.month,
        duration: response.data.data.duration,
      });
    } catch (error) {
      toast.error(error, {
        autoClose: 3000,
        onClose: dismissToast,
      });
    }
  };
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
      ...collectData,
      amount: stripCommaAndConvertToNumber(collectData.amount),
      budgetStartDate: changeDateFormat(collectData.budgetStartDate),
      budgetEndDate:
        collectData.period === "DAILY"
          ? changeDateFormat(collectData.budgetStartDate)
          : changeDateFormat(collectData.budgetEndDate),
    };
    try {
      const response = await request.put(`budgets/${id}`, payload, {
        headers: {
          "Content-Type": "application/json",
          DVC_KY_HDR: 2,
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(response.data.message, {
        autoClose: 3000,
        onClose: dismissToast,
      });
      setLoading(false);
      timerBeforeRedirect();
    } catch (error) {
      console.log(error);
      toast.error(error.response.status, {
        autoClose: 3000,
        onClose: dismissToast,
      });
      setLoading(false);
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

  const handleChange = (e) => {
    setCollectData({ ...collectData, [e.target.name]: e.target.value });

    
  };
  const handleSelect = (e, name) => {
    setCollectData({ ...collectData, [name]: e.target.value });
  }
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
              onChange={(e) => handleChange(e)}
              error={formik.errors.title}
            />
          </div>
          <div className="form__wrapper4">
            <CurrencyFormat 
              placeholder="Enter Amount"
              label="Amount"
              displayType={'input'}
              style = {{width: '100%',
              height: '100%',
              padding: '10px',
              }}
              prefix={'#'}
              name="amount"
              thousandSeparator={true}
              value={collectData.amount}
              onChange={(e) => handleChange(e)}
              error={formik.errors.amount}
            />
          </div>
          <div>
            <h5>Period</h5>

            <FormSelectComponent
              name="period"
              options={Options}
              value={collectData.period}
              onChange={(e) => {
                handleSelect(e, "period")
              
              }}

              placeholder={"Select Frequency"}
            />
          </div>
          {collectData.period === ANNUAL && (
            <div className="fommy">
              <FormSelectComponent
                name="year"
                options={generateYearsFromCurrentYear()}
                value={collectData.year}
                onChange={(e) => {
                  handleSelect(e, "year")
                
                }}
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
                onChange={(e) => {
                  handleSelect(e, "year")
                
                }}
                placeholder={"Select Frequency"}
              />
              <FormSelectComponent
                name="month"
                options={Months}
                value={collectData.month}
                onChange={(e) => {
                  handleSelect(e, "month")
                
                }}
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
                value={collectData.budgetStartDate}
                name="budgetStartDate"
                onChange={(e) => handleChange(e)}
              />
              <FormInputComponent
                placeholder="Duration"
                label="duration"
                type="number"
                value={collectData.duration}
                name="duration"
                onChange={(e) => handleChange(e)}
              />
            </div>
          )}
          {collectData.period === DAILY && (
            <div className="fommy3">
              <FormInputComponent
                placeholder="Start Date"
                label="Start Date"
                type="date"
                value={collectData.budgetStartDate}
                name="budgetStartDate"
                onChange={(e) => handleChange(e)}
              />
            </div>
          )}
          {collectData.period === CUSTOM && (
            <div className="fommy3">
              <FormInputComponent
                placeholder="Start Date"
                label="Start Date"
                type="date"
                value={collectData.budgetStartDate}
                name="budgetStartDate"
                onChange={(e) => handleChange(e)}
              />
              <FormInputComponent
                placeholder="End Date"
                label="End Date"
                type="date"
                value={collectData.budgetEndDate}
                name="budgetEndDate"
                onChange={(e) => handleChange(e)}
              />
            </div>
          )}

          <div className="form__wrapper2">
            <FormInputComponent
              placeholder="Enter Description here..."
              label="Description"
              type="text"
              value={collectData.description}
              onChange={(e) => handleChange(e)}
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
  .form__wrapper4 {
    width: 100%;
    height: 50px;
    margin-bottom: 20px;
  }
`;
