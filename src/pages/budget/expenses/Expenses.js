import React, { useRef, useState, Fragment, useEffect } from "react";
import styled from "styled-components";
import Layout from "../../../components/dashboardSidebar/Layout";
import request from "../../../utils/apiHelper";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import FormTitleSection from "../../../components/modal/FormTitleSection";
import CurrencyFormat from "react-currency-format";
import Pagination from "../../../utils/pagination";
import FormModal from "../../../components/modal/FormModal";
import Goback from "../../../components/Goback";
import useDialog from "../../../hooks/useDialog";
import FormInputComponent from "../../../components/InputComponent";
import DatePicker from "react-datepicker";
import DynamicTitle from "../../../components/DynamicTitle";
import CreateExpenses from "../../../components/modal/formModalForLog";
import { dateFormats2 } from "../../../constants";
import format from "date-fns/format";
import moment from "moment";
import {
  toNumber,
  disableDateInputFieldBasedOnStartDateToCurrentDate,
} from "../../../utils/utils";
import "react-datepicker/dist/react-datepicker.css";
import { dateFormats, currency } from "../../../constants";
import PageTitle from "../../../components/PageTitle";
import "../../../styles/table.style.css";
import {serialNumber, pageSummary} from "../../../utils/pageSummary"

let pageSize = 5;
const BudgetCategory = () => {
  const [idOfBudget, setIdOfBudget] = useState(-1);
  const [editModal, setEditModal] = useState(false);
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line
  const [currentTableData, setCurrentTableData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [editData, setEditData] = useState({});
  const [createExpense, setCreateExpense] = useState(false);

  const submitEditData = async (event) => {
    event.preventDefault();
    setLoading(true);
    let payload = {
      amount:
        typeof editData.amount === "number"
          ? editData.amount
          : toNumber(editData.amount),
      description: editData.description,
      transactionDate: moment(editData.transactionDate).format(dateFormats),
    };
    try {
      const response = await request.put(`expenses/${editData.id}`, payload);
      setLoading(false);
      toast.success(response.data.message, {
        autoClose: 3000,
        onClose: dismissToast,
      });
      setEditModal(false);
      fetchData();
    } catch (error) {
      console.log(payload);
      setLoading(false);
      toast.error(error.response.data.message, {
        autoClose: 3000,
        onClose: dismissToast,
      });
    }
  };

  const { deleteItemId } = useDialog();

  const ref = useRef(null);
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIdOfBudget(-1);
    }
  };

  const urlParams = new URLSearchParams(window.location.search);
  const startDate = urlParams.get("startDate");
  const budgetId = urlParams.get("budgetId");
  const catId = urlParams.get("catId");
  const lineItem = urlParams.get("item");

  const dismissToast = () => {
    toast.dismiss();
  };
  // eslint-disable-next-line
  const fetchData = async () => {
    try {
      const response = await request.get(
        `budgets/${budgetId}/lineItems/${catId}/expenses?size=${pageSize}&page=${currentPage}`
      );
      setCurrentTableData(response.data.data.content);
      setTotalCount(response.data.data.totalElements);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [currentPage]);
  // console.log(data);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  const handleDeleteItem = async (id) => {
    try {
      const response = await request.delete(`expenses/${id}`);
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
  const handleOnChangeDate = (value) => {
    setEditData({ ...editData, transactionDate: value });
  };
  const handleEditModal = (e, value) => {
    setEditData({ ...editData, [value]: e.target.value });
  };

  const editHandler = (item) => {
    setEditModal(true);
    let curr = currentTableData?.find((i) => i.id === item);
    setEditData(curr);
  };

  const postLogExpense = async () => {
    let payload = {
      amount: toNumber(createLogExpense.amount),
      transactionDate: calendar,
      description: createLogExpense.description,
    };
    setLoading(true);
    try {
      const response = await request.post(
        `budgets/${budgetId}/lineItems/${catId}/expenses`,
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
        setCreateExpense(false);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message, {
        autoClose: 3000,
        onClose: dismissToast,
      });
    }
  };

  const [calendar, setCalendar] = useState("");

  const initLogData = () => {
    return {
      amount: "",
      description: "",
      transactionDate: calendar,
    };
  };
  const [createLogExpense, setCreateLogExpense] = useState(initLogData());

  const handleOnChangeCreatLog = (e, value) => {
    setCreateLogExpense({
      ...createLogExpense,
      [value]: e.target.value,
    });
  };
  const handleOnChangeDate2 = (value) => {
    setCalendar(format(value, dateFormats2));
  };

  return (
    <Layout>
      <DynamicTitle title="Expenses" />
      <ListStyle>
        <div className="goback">
          {" "}
          <Goback />
        </div>
        <PageTitle title={`Expenses | ${lineItem}`}>
          <button type="submit" onClick={() => setCreateExpense(true)}>
            Add expenses
          </button>
        </PageTitle>
        <div className="header page">
          <p>
            {pageSummary(currentPage, pageSize, totalCount, currentTableData)}
          </p>
        </div>
        <div className="category-container">
          <table>
            {currentTableData && currentTableData.length > 0 && (
              <tr className="category">
                <th>S/No</th>
                <th className="category-text">Amount</th>
                <th className="category-text">Description</th>
                <th className="category-text">Date</th>
                <th className="category-text">Action</th>
              </tr>
            )}
            {currentTableData && currentTableData.length > 0 ? (
              currentTableData.map((item, index) => (
                <tr className="category body" key={index}>
                  <td>{serialNumber(index,currentPage,pageSize)}</td>
                  <td className="category-text">{item.displayAmount}</td>
                  <td className="category-text">{item.description}</td>
                  <td className="category-text">{item.displayTransactionDate}</td>
                  <td onClick={() => setIdOfBudget(index)} className="dots">
                    ...
                    {idOfBudget === index ? (
                      <Fragment>
                        <span ref={ref} className="popup">
                          <p
                            className="pop-item"
                            onClick={() => {
                              editHandler(item.id);
                            }}
                          >
                            Edit
                          </p>
                          <p
                            onClick={() =>
                              deleteItemId(handleDeleteItem, item.id)
                            }
                            className="pop-item delete"
                          >
                            Delete
                          </p>
                        </span>
                      </Fragment>
                    ) : null}
                  </td>
                </tr>
              ))
            ) : (
              <div className="empty">
                <img
                  className="empty-img"
                  src="/images/empty-img.svg"
                  alt="empty"
                />
                <p>No expenses to display yet</p>
              </div>
            )}
          </table>
        </div>
        {editModal && (
          <FormModal>
            <div>
              <FormTitleSection
                title={`Edit Expenses`}
                onClick={() => setEditModal(!editModal)}
              />
              <form>
                <div className="form__wrapper">
                  <CurrencyFormat
                    label="Projected amount"
                    displayType={"input"}
                    style={{ width: "100%", height: "100%", padding: "10px" }}
                    prefix={currency + " "}
                    name="amount"
                    thousandSeparator={true}
                    onChange={(e) => {
                      handleEditModal(e, "amount");
                    }}
                    value={editData?.amount}
                  />
                </div>
                <div className="form__wrapper">
                  <FormInputComponent
                    label="Description"
                    type="text"
                    name="description"
                    onChange={(e) => {
                      handleEditModal(e, "description");
                    }}
                    value={editData?.description}
                  />
                </div>
                <div className="form__wrapper">
                  <h7>Select Date</h7>
                  <DatePicker
                    selected={moment(editData?.transactionDate).toDate()}
                    onChange={(e) => {
                      handleOnChangeDate(e);
                    }}
                    minDate={moment(startDate).toDate()}
                    maxDate={moment(
                      new Date().toISOString().substring(0, 10)
                    ).toDate()}
                    disabled={disableDateInputFieldBasedOnStartDateToCurrentDate(
                      moment(editData?.transactionDate).toDate(),
                      startDate
                    )}
                    defaultValue="2021/01/01"
                  />
                </div>
                <div className="btn-wrapper">
                  <button type="submit" onClick={submitEditData}>
                    {loading ? (
                      <ClipLoader color="white" size="40px" />
                    ) : (
                      "Save"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </FormModal>
        )}
        {createExpense && (
          <FormModal>
            <CreateExpenses
              formTitle={`${lineItem}`}
              minDate={moment(startDate).toDate()}
              maxDate={moment(
                new Date().toISOString().substring(0, 10)
              ).toDate()}
              closeModal={() => setCreateExpense(false)}
              onChangeCurrency={(e) => {
                handleOnChangeCreatLog(e, "amount");
              }}
              onChangeInput={(e) => {
                handleOnChangeCreatLog(e, "description");
              }}
              handleChangeDate={(e) => {
                handleOnChangeDate2(e);
              }}
              inputDateValue={createLogExpense.transactionDate}
              inputValue={createLogExpense.description}
              defaultValue={calendar}
              onClick={postLogExpense}
            />
          </FormModal>
        )}
        <div className="pagination-container">
          <Pagination
            className="pagination-bar"
            currentPage={currentPage}
            totalCount={totalCount}
            pageSize={pageSize}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </ListStyle>
    </Layout>
  );
};

export default BudgetCategory;

const ListStyle = styled.div`
  font-family: "Sofia Pro";
  width: 100%;
  display: flex;
  flex-direction: column;
  .goback {
    margin-top: 20px;
  }
  .header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 10px;
    font-weight: 600;
    margin-bottom: -20px;
    font-size: 16px;
  }
  .page {
    font-family: "Sofia Pro";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;

    color: #a5b1b7;
  }
  .button-container {
    display: flex;
    justify-content: flex-end;
  }
  button {
    color: white;
    text-decoration: none;
    letter-spacing: 1px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0;
    width: 100%;
    height: 2.5rem;
    font-weight: 400;
    font-size: 16px;
    border: none;
    text-align: center;
    color: white;
    background: #14a800;
    white-space: nowrap;
    border: none;
    padding: 10px;
    :hover {
      cursor: pointer;
      background: #14a800;
    }
  }
  .form__wrapper {
    .react-datepicker-wrapper,
    .react-datepicker__input-container,
    .react-datepicker__input-container input {
      display: block;
      width: 100%;
      height: 39px;
    }
  }
  .category-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: 20px;
    padding: 10px;
    gap: 10px;
  }
.popup {
    position: absolute;
    min-width: 150px;
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
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 19px;
    color: #071232;
  }

  .pop-item {
    cursor: pointer;
  }
  .delete {
    color: red;
  }
  .dots {
    font-size: 30px;
    cursor: pointer;
    font-weight: "bold";
  }
  @media only screen and (max-width: 1280px) {
    .category {
      margin-bottom: 10px;
    }
    .category-text {
      font-size: 12px;
    }
  }
  @media only screen and (max-width: 990px) {
    .category {
      padding: 5px 8px;
      height: 100px;
    }
  }

  .form__wrapper {
    width: 100%;
    border-radius: 5px;
    margin-top: 20px;
  }
  .btn-wrapper {
    margin-top: 20px;
    width: 100%;
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
  .pagination-container {
    display: flex;
    /* flex-direction: column; */
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  }
  .pagination-bar {
    display: flex;
    justify-content: space-between;
    width: 300px;
  }
  @media only screen and (max-width: 1280px) {
    .category {
      margin-bottom: 10px;
    }
    .category-text {
      font-size: 12px;
    }
  }
  @media only screen and (max-width: 990px) {
    .category {
      padding: 5px 8px;
      height: 100px;
    }
  }
  @media only screen and (max-width: 768px) {
    .category {
      height: 75px;
    }
  }
  @media only screen and (max-width: 540px) {
    .category {
      height: 70px;
    }
    .category-text {
      font-size: 10px;
    }
  }

  @media only screen and (max-width: 411px) {
    .category {
      height: 40px;
    }
  }
  @media only screen and (max-width: 487px) {
    .category {
      padding: 4px;
      height: 50px;
      font-size: 1rem;
    }
    .dots {
      font-size: 25px;
    }
    .header {
      font-size: 12px;
    }
    .body {
      font-size: 12px;
    }
  }
  @media only screen and (max-width: 377px) {
    .category {
      display: flex;
      justify-content: space-between;
      width: 100%;
      padding: 0px;
      font-size: 12px;
    }
  }
  @media only screen and (max-width: 290px) {
    .category {
      display: flex;
      justify-content: space-between;
      width: 100%;
      padding: 0px;
      font-size: 10px;
    }
  }
`;
