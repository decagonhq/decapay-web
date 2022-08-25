import React, { useRef, useState, Fragment, useEffect } from "react";
import styled from "styled-components";
import Layout from "../../components/dashboardSidebar/Layout";
import request from "../../utils/apiHelper";
import { toast } from "react-toastify";
// import MyButton from "../../components/Button";
import ClipLoader from "react-spinners/ClipLoader";
import FormTitleSection from "../../components/modal/FormTitleSection";
import CurrencyFormat from "react-currency-format";
import Pagination from "../../utils/pagination";
import FormModal from "../../components/modal/FormModal";
import Goback from "../../components/Goback";

const expenses = [
  {
    id: 1,
    amount: "£100",
    description: "international expenses are often not too good",
    date: "2020-01-01",
    time: "12:00",
  },
  {
    id: 2,
    amount: "£800",
    description: "Buy and sell in Nigeria is a good idea",
    date: "2020-01-01",
    time: "12:00",
  },
];

let pageSize = 5;
const BudgetCategory = () => {
  const [idOfBudget, setIdOfBudget] = useState(-1);
  const [editModal, setEditModal] = useState(false);
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  // eslint-disable-next-line
  const [currentTableData, setCurrentTableData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  console.log(data);

  const ref = useRef(null);
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIdOfBudget(-1);
    }
  };

  const headers = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  const urlParams = new URLSearchParams(window.location.search);
  const budgetId = urlParams.get("budgetId");
  const catId = urlParams.get("catId");
  const lineItem = urlParams.get("item");

  // eslint-disable-next-line
  const fetchData = async () => {
    try {
      const response = await request.get(
        `budgets/${budgetId}/lineItems/${catId}/expenses?size=${pageSize}&page=${currentPage}`,
        headers
      );
      setData(response.data.data);
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
  }, []);
  console.log(data);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  return (
    <Layout>
      <ListStyle>
        <div className="goback">
          {" "}
          <Goback />
        </div>

        <div className="header-wrapper">
          <div className="">
            <p style={{ fontWeight: "bold", fontSize: "20px" }}>
              Expenses | {lineItem}
            </p>
          </div>
          <div className="button-container">
            <button>Add expenses</button>
          </div>
        </div>
        <div className="category-container">
          {expenses && expenses.length > 0 && (
            <div className="category header">
              <p className="category-title">Amount</p>
              <p className="category-title">Description</p>
              <p className="category-title">Date</p>
              <p className="category-title">Time</p>
              <p className="category-title">Action</p>
            </div>
          )}
          {expenses && expenses.length > 0 ? (
            expenses.map((item, index) => (
              <div className="category body" key={index}>
                <p className="category-title">{item.amount}</p>
                <p className="category-title">{item.description}</p>
                <p className="category-title">{item.date}</p>
                <p className="category-title">{item.time}</p>
                <p onClick={() => setIdOfBudget(index)} className="dots">
                  ...
                  {idOfBudget === index ? (
                    <Fragment>
                      <span ref={ref} className="popup">
                        <p
                          className="pop-item"
                          onClick={() => setEditModal(true)}
                        >
                          Edit
                        </p>
                        <p className="pop-item delete">Delete</p>
                      </span>
                    </Fragment>
                  ) : null}
                </p>
              </div>
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
        </div>
        {editModal && (
          <FormModal>
            <div>
              <FormTitleSection
                title={`Edit Expenses`}
                onClick={() => setEditModal(!editModal)}
              />
              <form
              // onSubmit={onSubmitEdit}
              >
                <div className="form__wrapper">
                  <CurrencyFormat
                    label="Projected amount"
                    displayType={"input"}
                    style={{ width: "100%", height: "100%", padding: "10px" }}
                    prefix={"₦"}
                    name="amount"
                    thousandSeparator={true}
                    // value={projectedAmount}
                    // onChange={(e) => handleOnChange(e)}
                  />
                </div>
                <div className="btn-wrapper">
                  <button
                    type="submit"
                    // className="form__button"
                    // onClick={onSubmitEdit}
                  >
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
  width: 100%;
  display: flex;
  flex-direction: column;
  .goback {
    margin-top: 20px;
  }
  .header-wrapper {
    width: 100%;
    display: flex;

    flex-direction: row;
    justify-content: space-between;
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
  .category {
    font-family: "Inter";
    font-style: normal;

    width: 100%;
    align-items: center;
    padding: 10px 14px;
    height: 57px;
    display: grid;
    grid-template-columns: 1fr 2fr 1fr 1fr 1fr;
    gap: 10px;
    /* border-radius:5px; */
  }
  .header {
    font-weight: 600;
    margin-bottom: -20px;
    font-size: 16px;
  }
  .body {
    background: rgba(0, 156, 244, 0.05);
    font-weight: 500;
    font-size: 16px;
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
  @media only screen and (max-width: 990px) {
    .category {
      padding: 5px 8px;
      height: 100px;
    }
  }
  @media only screen and (max-width: 487px) {
    .category {
      padding: 4px;
      height: 150px;
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
`;
