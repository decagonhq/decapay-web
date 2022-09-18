import React, { useState, useEffect } from "react";
import styled from "styled-components";
// import Layout from "../../components/dashboardSidebar/Layout";
import FormInputComponent from "../../components/InputComponent";
// import GoBack from "../../components/Goback";
import * as yup from "yup";
import MyButton from "../../components/Button";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";
import request from "../../utils/apiHelper";
// import { useParams } from "react-router-dom";
import CurrencyFormat from "react-currency-format";
import FormTitleSection from "../../components/modal/FormTitleSection";
import { useFormik } from "formik";
import DatePicker from "react-datepicker";
import moment from "moment";
import format from "date-fns/format";
import { dateFormats2, currency } from "../../constants";
import { toNumber } from "../../utils/utils";
import {
  ANNUAL,
  MONTHLY,
  DAILY,
  WEEKLY,
  CUSTOM,
  Options,
  Months,
  changeDateFormat,
  formatDate,
} from "../../constants";
import FormSelectComponent from "../../components/selectComponent";

const EditBudget = ({ closeModal, id, title }) => {
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
  const [calendar, setCalendar] = useState({
    budgetStartDate: "",
    budgetEndDate: "",
  });
  const [newId, setNewId] = React.useState(-1);

  // const { id } = useParams();

  const initialValues = {
    newId: newId,
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
  const fetchData = async () => {
    try {
      const response = await request.get(`budgets/edit/${id}`);
      setNewId(id);
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
      setCalendar({
        ...calendar,
        budgetStartDate: moment(
          formatDate(response.data.data.budgetStartDate)
        ).toDate(),

        budgetEndDate: moment(
          formatDate(response.data.data.budgetEndDate)
        ).toDate(),
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
      window.location.href = "/budgets";
    }, 2000);
  };
  const createBudgetValidationSchema = yup.object().shape({
    title: yup.string().required("Title is required"),
    amount: yup.number().required("Amount is required"),
    period: yup.string().required("Period is required"),
  });
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const onSubmit = async () => {
    let payload = {
      ...collectData,
      amount:
        typeof collectData.amount === "number"
          ? collectData.amount
          : toNumber(collectData.amount),
      budgetStartDate:
        collectData.period === CUSTOM
          ? format(calendar.budgetStartDate, dateFormats2)
          : changeDateFormat(collectData.budgetStartDate),
      budgetEndDate:
        collectData.period === CUSTOM
          ? format(calendar.budgetEndDate, dateFormats2)
          : collectData.period === DAILY
          ? changeDateFormat(collectData.budgetStartDate)
          : changeDateFormat(collectData.budgetEndDate),
    };
    try {
      const response = await request.put(`budgets/${newId}`, payload, {
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
  };
  const handleOnChangeDate = (date, name) => {
    setCalendar({ ...calendar, [name]: date });
  };
  const disableEndDateBasedOnStartDate = (date, budgetStartDate) => {
    if (date > budgetStartDate) {
      return true;
    }
    return false;
  };
  return (
    // <Layout>
    <StyledHome>
      <div className="form_wrap">
        <FormTitleSection title={`Edit ${title}`} onClick={closeModal} />
        {/* <div className="form__container">
            <div className="header_wrapper">
              <GoBack />
              <h4 className="header_style">Edit Budget</h4>
            </div>
          </div> */}
        <input type="hidden" name="newId" value={newId} />

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
            displayType={"input"}
            style={{ width: "100%", height: "100%", padding: "10px" }}
            prefix={currency + " "}
            name="amount"
            thousandSeparator={true}
            value={collectData.amount}
            onChange={(e) => handleChange(e)}
            error={formik.errors.amount}
          />
        </div>
        <div>
          <label>Period</label>

          <FormSelectComponent
            name="period"
            options={Options}
            value={collectData.period}
            onChange={(e) => {
              handleSelect(e, "period");
            }}
            placeholder={"Select Frequency"}
          />
        </div>
        {collectData.period === ANNUAL && (
          <div className="">
            <FormSelectComponent
              name="year"
              options={generateYearsFromCurrentYear()}
              value={collectData.year}
              onChange={(e) => {
                handleSelect(e, "year");
              }}
              placeholder={"Select Frequency"}
            />
          </div>
        )}
        {collectData.period === MONTHLY && (
          <div className="">
            <FormSelectComponent
              name="year"
              options={generateYearsFromCurrentYear()}
              value={collectData.year}
              onChange={(e) => {
                handleSelect(e, "year");
              }}
              placeholder={"Select Frequency"}
            />
            <FormSelectComponent
              name="month"
              options={Months}
              value={collectData.month}
              onChange={(e) => {
                handleSelect(e, "month");
              }}
              placeholder={"Select Frequency"}
            />
          </div>
        )}
        {collectData.period === WEEKLY && (
          <div className="">
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
          <div className="">
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
          <div className="">
            <div className="form_wrapper3">
              <h7>Start Date</h7>
              <DatePicker
                onChange={(e) => {
                  handleOnChangeDate(e, "budgetStartDate");
                }}
                value={calendar.budgetStartDate}
                selected={calendar.budgetStartDate}
              />
            </div>
            <div className="form_wrapper3">
              <h7>End Date</h7>
              <DatePicker
                onChange={(e) => {
                  handleOnChangeDate(e, "budgetEndDate");
                }}
                value={calendar.budgetEndDate}
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
            className="form__wrapper2"
            onClick={formik.handleSubmit}
          >
            {loading ? <ClipLoader color="white" size="40px" /> : "Edit Budget"}
          </MyButton>
        </div>
      </div>
    </StyledHome>
    // </Layout>
  );
};

export default EditBudget;

const StyledHome = styled.div`
  font-family: "Sofia Pro";
  display: flex;
  flex-direction: column;
  align-items: center;
  /* height: 100vh; */
  background-color: "white";
  h1 {
    font-size: 2rem;
    font-weight: bold;
    color: #333;
    text-transform: uppercase;
  }
  .form__wrapper2 {
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
  .mt-2 {
    margin-top: 15px;
  }
  .form__wrapper4 {
    width: 100%;
    height: 2.5rem;
    margin-bottom: 20px;
  }
  label {
    margin-bottom: -5px;
    font-size: 1rem;
  }
`;
