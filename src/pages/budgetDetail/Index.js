import React, { useState, useEffect, Fragment, useRef } from "react";
import styled from "styled-components";
import TitleCard from "./TitleCard";
import SubTitleCard from "./SubTitleCard";
// import BudgetItem from "./BudgetItem";
import Calendar from "./DateComponent";
import Layout from "../../components/dashboardSidebar/Layout";
import request from "../../utils/apiHelper";
import { useParams } from "react-router-dom";
import FormModal from "../../components/modal/FormModal";
import BudgetLineItemResuable from "../../components/modal/modalForLineItem";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
// import EditLineItem from "./EditLineItem";
import MyButton from "../../components/Button";
import ClipLoader from "react-spinners/ClipLoader";
import FormTitleSection from "../../components/modal/FormTitleSection";
import CurrencyFormat from "react-currency-format";
import useDialog from "../../hooks/useDialog";
import LogExpenseResuable from "../../components/modal/formModalForLog";
import Goback from "../../components/Goback";
import { useNavigate } from "react-router-dom";
import moment from "moment";
// import { dateFormats } from "../../constants";
import { dateFormats2, dateFormats3, hundredPercent } from "../../constants";
import format from "date-fns/format";
import {
  disableDateInputFieldBasedOnStartDateToCurrentDate,
  toNumber,
} from "../../utils/utils";
import { currency } from "../../constants";
// import Checkbox from "../../components/checkbox";
import PageTitle from "../../components/PageTitle";

const Index = () => {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);

  let t = new Date();
  let today = format(t, dateFormats3);

  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);

  const [editModal, setEditModal] = useState(false);
  const [idOfLineItem, setIdOfLineItem] = useState(-1);
  const [projectedAmount, setProjectedAmount] = useState(0);
  const [categoryName, setCategoryName] = useState("");
  const [categoryId, setCategoryId] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [getCategordId, setGetCategordId] = useState(-1);
  const [calendar, setCalendar] = useState("");
  const [rememberTemplate, setRememberTemplate] = useState(false);
  // const [editRememberTemplate, setEditRememberTemplate] = useState(false);

  function handleSelect(date) {
    setCalendar(format(date, dateFormats2));
  }
 
  // const [editLineItemPayload, setEditLineItemPayload] = useState({});
  const [collectData, setCollectData] = useState({
    budgetCategoryId: "",
    amount: "",
  });

  const initLogData = () => {
    return {
      amount: "",
      description: "",
      transactionDate: calendar,
    };
  };
  const [createLogExpense, setCreateLogExpense] = useState(initLogData());
  const navigate = useNavigate();

  const ref = useRef(null);
  const { deleteItem } = useDialog();

  const dismissToast = () => {
    toast.dismiss();
  };
  const [createLineModal, setCreateLineModal] = useState(false);

  useEffect(() => {
    fetchData();
    fetchCategory();
    // eslint-disable-next-line
  }, []);

  const postLogExpense = async () => {
    let payload = {
      amount: toNumber(createLogExpense.amount),
      transactionDate: calendar,
      //  (createLogExpense.transactionDate).format(
      //   dateFormatmoments
      // ),
      description: createLogExpense.description,
    };
    setLoading(true);
    try {
      const response = await request.post(
        `budgets/${id}/lineItems/${getCategordId}/expenses`,
        payload
      );
      setLoading(false);
      setCreateLogExpense(initLogData());

      if (response) {
        toast.success(response.data.message, {
          autoClose: 3000,
          onClose: dismissToast,
        });
        fetchData();
        setLogExpenseModal(false);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message, {
        autoClose: 3000,
        onClose: dismissToast,
      });
    }
  };

  const fetchCategory = async () => {
    try {
      const response = await request.get(`budget_categories`);
      let res = response?.data?.data;
      if (res.length > 0) {
        let options = res?.map((category) => {
          return {
            value: category.id,
            label: category.title,
          };
        });
        // add select to res
        options.unshift({ value: "", label: "Select Category" });
        setCategories(options);
      } else {
        setCategories([]);
      }
    } catch (error) {
      toast.error(error.response.data.message, {
        autoClose: 3000,
        onClose: dismissToast,
      });
    }
  };

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIdOfLineItem(-1);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  const projectAmountRef = useRef(null);

  const submit = async () => {
    let payload = {
      budgetCategoryId: parseInt(collectData.budgetCategoryId),
      amount: toNumber(collectData.amount),
      setLineItemAsTemplate: rememberTemplate,
    };
    console.log(payload);
    try {
      const response = await request.post(
        `budgets/${id}/lineItems`,
        payload
      );
      setCreateLineModal(false);
      toast.success(response.data.message, {
        autoClose: 3000,
        onClose: dismissToast,
      });
      setRememberTemplate(false);
      fetchData();
    } catch (error) {
      toast.error(error.response.data.message, {
        autoClose: 3000,
        onClose: dismissToast,
      });
    }
  };
  const [logExpenseModal, setLogExpenseModal] = useState(false);
  const handleOnChanege = (e, value) => {
    setCollectData({
      ...collectData,
      [value]: e.target.value,
    });
  };
  const handleOnChangeCreatLog = (e, value) => {
    setCreateLogExpense({
      ...createLogExpense,
      [value]: e.target.value,
    });
  };
  const handleOnChangeDate = (value) => {
    setCalendar(format(value, dateFormats2));
  };
  const { id } = useParams();

  const fetchData = async () => {
    try {
      const response = await request.get(`budgets/${id}`);
      setData(response.data.data);
      let remoteStartDate = response.data.data.startDate;
      let remoteEndDate = response.data.data.endDate;
      let validEndDate = today > remoteEndDate ? remoteEndDate : today;
      setStartDate(remoteStartDate);
      setEndDate(validEndDate);
    } catch (error) {
      toast.error(error.response.data.message, {
        autoClose: 3000,
        onClose: dismissToast,
      });
    }
  };

  const getLineItem = () => {
    let item = data?.lineItems?.find(
      (lineItem) => lineItem.categoryId === categoryId
    );
    // setEditLineItemPayload(item);
    setProjectedAmount(item?.projectedAmount);
    setCategoryName(item?.category);
  };

  useEffect(() => {
    // eslint-disable-next-line
    getLineItem();
    // eslint-disable-next-line
  }, [categoryId]);

  const openPopup = (id, catId) => {
    setIdOfLineItem(id);
    setCategoryId(catId);
  };

  // regex to remove whatever is not number
  const handleOnChange = (e) => {
    let amount = e.target.value;
    let regex = /[^0-9]/g;
    let newAmount = amount.replace(regex, "");
    setProjectedAmount(newAmount);
  };

  const onSubmitEdit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let newPayload = {
      amount: projectedAmount,
    };
    try {
      const response = await request.put(
        `budgets/${id}/lineItems/${categoryId}`,
        newPayload
      );
      fetchData();
      toast.success(response.data.message, {
        autoClose: 3000,
        onClose: dismissToast,
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message, {
        autoClose: 3000,
        onClose: dismissToast,
      });
    }
  };

  const handleDeleteItem = async () => {
    try {
      const response = await request.delete(
        `budgets/${id}/lineItems/${categoryId}`
      );
      fetchData();
      toast.success(response.data.message, {
        autoClose: 3000,
        onClose: dismissToast,
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message, {
        autoClose: 3000,
        onClose: dismissToast,
      });
    }
  };
  const checkIfEndDateIsLessThanToday = () => {
    let today = new Date();
    let endDate = new Date(data?.endDate);
    if (today > endDate) {
      return endDate;
    } else {
      return today;
    }
  };

  return (
    <Layout>
      <DetailStyle>
        <div className="goback">
          {" "}
          <Goback
            text="Budgets"
            onClick={() =>
              navigate(`../budgets`, {
                replace: true,
              })
            }
          />
        </div>
        <PageTitle title={`Budget Detail`}>
          <button
            className="button"
            onClick={() => {
              setCreateLineModal(true);
            }}
          >
            Create line item
          </button>
        </PageTitle>
        {/* <div className="header-wrapper">
          <div className="header">
            <p style={{ fontWeight: "bold", fontSize: "20px" }}>
              Budget Detail
            </p>
          </div>
          <div className="button-container">
            <button
              className="button"
              onClick={() => {
                setCreateLineModal(true);
              }}
            >
              Create line item
            </button>
          </div>
        </div> */}

        <div className="budget-summary">
          <div className="title">
            <TitleCard
              title={data?.title}
              startDate={data?.displayStartDate}
              endDate={data?.displayEndDate}
              period={data?.budgetPeriod}
              amount={data?.displayProjectedAmount}
            />

            <div className="sub_container general mt-2 mb-2">
              <SubTitleCard
                title="Total Amount spent so far"
                alt=""
                spentSoFar={data?.totalAmountSpentSoFar}
                projectedAmount={data?.projectedAmount}
                amount={data?.displayTotalAmountSpentSoFar}
                src="/images/money-2.svg"
              />
              <SubTitleCard
                title="Percentage spent so far"
                percent={data?.percentageSpentSoFar}
                alt=""
                amount={data?.displayPercentageSpentSoFar}
                src="/images/percent.svg"
              />
            </div>
          </div>

          {startDate && endDate ? (
            <div className="calender">
              <Calendar
                handleSelect={handleSelect}
                calendar={calendar}
                startDate={startDate}
                endDate={endDate}
                today={today}
              />
            </div>
          ) : null}
        </div>
        {data.lineItems && data?.lineItems.length > 0 ? (
          data?.lineItems.map((item, index) => (
            <div className="line-item-container mb-2">
              {/* <BudgetItem log amount={item.displayProjectedAmount} soFar={item.displayTotalAmountSpentSoFar} percent={item.percentageSpentSoFar} item={item.category}/> */}
              <div className="list--wrapper">
                <div className="left_side">
                  <p>Category: {item.category}</p>
                  <p ref={projectAmountRef}>
                    Projected amount: {item.displayProjectedAmount}
                  </p>
                  <p
                    className={
                      item.projectedAmount < item.totalAmountSpentSoFar
                        ? "red"
                        : ""
                    }
                  >
                    Amount spent so far: {item.displayTotalAmountSpentSoFar}
                  </p>
                  <Link
                    className="link"
                    to={`/budgetDetail/expenses/?budgetId=${id}&catId=${item.categoryId}&item=${item.category}`}
                  >
                    View expenses
                  </Link>
                </div>
                <div
                  className="right_side"
                  onClick={() => {
                    setLogExpenseModal(true);
                    setGetCategordId(item.categoryId);
                  }}
                >
                  <p className="log">
                    Log{" "}
                    <span>
                      <FiArrowUpRight className="icon" />
                    </span>
                  </p>
                  <p
                    className={
                      item.percentageSpentSoFar > hundredPercent
                        ? "red"
                        : "link"
                    }
                  >
                    {item.displayPercentageSpentSoFar}
                  </p>
                </div>
                <p
                  onClick={() => openPopup(index, item.categoryId)}
                  style={{
                    cursor: "pointer",
                    fontSize: "30px",
                    fontWeight: "bold",
                  }}
                >
                  ...
                  {idOfLineItem === index ? (
                    <Fragment>
                      <span ref={ref} className="popup">
                        <p
                          onClick={() => {
                            setEditModal(true);
                          }}
                        >
                          Edit item
                        </p>
                        <p
                          onClick={() =>
                            deleteItem(handleDeleteItem, categoryName)
                          }
                          style={{ color: "red" }}
                        >
                          Remove item
                        </p>
                      </span>
                    </Fragment>
                  ) : null}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="empty">
            <img
              className="empty-img"
              src="/images/empty-img.svg"
              alt="empty"
            />
            <p>No line item found in the budget</p>
          </div>
        )}

        {/* <Button>+ Create Budget</Button> */}
        {createLineModal && (
          <FormModal>
            <BudgetLineItemResuable
              closeModal={() => setCreateLineModal(false)}
              formTitle="Create line item"
              placeholderCurrency="enter projected amount"
              placeholderSelect="Create line item"
              selectValue={collectData.budgetCategoryId}
              selectName="budgetCategoryId"
              currencyName="amount"
              onChangeSelect={(e) => {
                handleOnChanege(e, "budgetCategoryId");
              }}
              onChangeCurrency={(e) => {
                handleOnChanege(e, "amount");
              }}
              labelCurrency="Projected amount"
              valueCurrency={collectData.amount}
              onClick={submit}
              options={categories}
              onChangeCheck={() => setRememberTemplate(!rememberTemplate)}
              isChecked={rememberTemplate}
              budgetType={data?.budgetPeriod}
            />
          </FormModal>
        )}
        {editModal && (
          <FormModal>
            <div>
              <FormTitleSection
                title={`Edit ${categoryName}`}
                onClick={() => setEditModal(!editModal)}
              />
              <form onSubmit={onSubmitEdit}>
                <div className="form__wrapper">
                  <CurrencyFormat
                    label="Projected amount"
                    displayType={"input"}
                    style={{ width: "100%", height: "100%", padding: "10px" }}
                    prefix={currency}
                    name="amount"
                    thousandSeparator={true}
                    value={projectedAmount}
                    onChange={(e) => handleOnChange(e)}
                  />
                </div>
                {/* <div className="form__wrapper">
                  <Checkbox
                    isChecked={editRememberTemplate}
                    onChangeFunction={() =>
                      setEditRememberTemplate(!editRememberTemplate)
                    }
                  />
                  <span>
                    Remember this line item for budget of this type:{" "}
                    {data?.budgetPeriod}
                  </span>
                </div> */}
                <div className="btn-wrapper">
                  <MyButton
                    type="submit"
                    // className="form__button"
                    onClick={onSubmitEdit}
                  >
                    {loading ? (
                      <ClipLoader color="white" size="40px" />
                    ) : (
                      "Save"
                    )}
                  </MyButton>
                </div>
              </form>
            </div>
          </FormModal>
        )}
        {logExpenseModal && (
          <FormModal>
            <LogExpenseResuable
              closeModal={() => setLogExpenseModal(false)}
              formTitle="Log expense for "
              placeholderCurrency="enter amount"
              placeholderInputDate="Enter date"
              placeholderInput="Enter description"
              inputLabelDate="Date"
              labelCurrency="Amount"
              inputLabel="Description"
              inputDateType="date"
              inputType="text"
              inputDateValue={createLogExpense.transactionDate}
              defaultValue={calendar}
              inputValue={createLogExpense.description}
              inputNameDate="transactionDate"
              valueCurrency={createLogExpense.amount}
              selectedDate={createLogExpense.transactionDate}
              inputName="description"
              currencyName="amount"
              minDate={moment(startDate).toDate()}
              maxDate={moment(checkIfEndDateIsLessThanToday()).toDate()}
              onClick={postLogExpense}
              handleChangeDate={(e) => {
                handleOnChangeDate(e);
              }}
              disabled={disableDateInputFieldBasedOnStartDateToCurrentDate(
                startDate
              )}
              onChangeCurrency={(e) => {
                handleOnChangeCreatLog(e, "amount");
              }}
              onChangeInput={(e) => {
                handleOnChangeCreatLog(e, "description");
              }}
            />
          </FormModal>
        )}
      </DetailStyle>
    </Layout>
  );
};

export default Index;

const DetailStyle = styled.div`
  font-family: "Sofia Pro";
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  box-sizing: border-box;
  background: #ffffff;
  .goback {
    margin-top: 20px;
  }
  @media only screen and (max-width: 540px) {
    width: 100%;
  }
  .title {
    width: 60%;
    margin-top: 20px;
  }
  .budget-summary {
    width: 100%;
    display: flex;
    gap: 20px;
    /* justify-content: space-around; */
  }
  @media only screen and (max-width: 991px) {
    .title {
      width: 100%;
      margin-top: 20px;
    }
    .budget-summary {
      width: 100%;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }

  .general {
    width: 100%;
  }
  .sub_container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
  .empty {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .empty-img {
    width: 40px;
    height: 35px;
  }
  .header-wrapper {
    width: 100%;
    display: flex;
    margin-top: 20px;
    flex-direction: row;
    justify-content: space-between;
  }
  .button-container {
    /* width: 100%; */
    /* display: flex;
    justify-content: flex-end; */
  }
  .button {
    margin-top: 20px;
    color: white;
    text-decoration: none;
    letter-spacing: 1px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0;
    width: 200px;
    height: 2.5rem;
    font-weight: 400;
    font-size: 16px;
    border: none;
    text-align: center;
    color: white;
    background: #14a800;
    white-space: nowrap;
    border: none;
    :hover {
      cursor: pointer;
      background: #14a800;
    }
  }
  .line-item-container {
    font-family: "Sofia Pro";
    padding: 5px;
    width: 100%;
    height: 108px;
    background: rgba(0, 156, 244, 0.05);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);

    @media only screen and (max-width: 379px) {
      height: 180px;
    }
    @media only screen and (max-width: 299px) {
      height: 200px;
    }
    @media only screen and (max-width: 230px) {
      height: 250px;
    }
    .list--wrapper {
      display: flex;
      justify-content: space-between;

      padding: 10px;
    }
    .left_side p {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      padding: 0;
      margin: 0;
    }
    .right_side {
      align-items: center;
      padding: 4px 8px;
      gap: 2px;

      width: 63px;
      height: 32px;

      background: #14a800;
      border-radius: 4px;
    }
    .log {
      font-family: "Sofia Pro";
      font-style: normal;
      font-weight: bold;
      font-size: 16px;
      line-height: 19px;
      display: flex;
      align-items: center;

      color: #ffffff;
    }
    .icon {
      /* color: white; */
      width: 20px;
    }
    .link {
      /* remove underline from link */
      text-decoration: none;
      color: #14a800;
    }
  }
  .popup {
    position: absolute;
    min-width: 150px;
    right: 20px;
    /* top: 40px; */
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: #ffffff;
    padding: 1rem;
    border: 1px solid rgba(33, 51, 79, 0.1);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.06);
    z-index: 3;
    border-radius: 10px;
    z-index: 100;
    font-family: "Sofia Pro";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 19px;
    color: #071232;

    p:not(:last-child) {
      margin-bottom: 12px !important;
    }
    p:hover {
      display: inline-block;
    }
  }
  .form__wrapper {
    width: 100%;
    border-radius: 5px;
    margin-top: 20px;
  }
  .btn-wrapper {
    margin-top: 20px;
  }
  .red {
    text-decoration: none;
    color: red;
  }
`;
