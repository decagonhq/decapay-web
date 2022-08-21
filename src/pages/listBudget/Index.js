import React, { useState, useMemo, useRef, useEffect, Fragment } from "react";
import styled from "styled-components";
import CreateBudget from "./CreateBugetForm";
import EditBudget from "./EditBudget";
// import GoBack from "../../components/Goback";
import FormModal from "../../components/modal/FormModal";
import Layout from "../../components/dashboardSidebar/Layout";
import Pagination from "../../utils/pagination";
import { useNavigate } from "react-router-dom";
import request from "../../utils/apiHelper";
import { toast } from "react-toastify";

let PageSize = 10;
const Index = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [idOfBudget, setIdOfBudget] = useState(-1);
  const [data, setData] = useState([]);
  const [createBudgetModal, setCreateBudgetModal] = useState(false);
  const [editBudgetModal, setEditBudgetModal] = useState(false);
  const [budgetTitle, setBudgetTitle] = useState("");
  // eslint-disable-next-line
  const [dataInfo, setDataInfo] = useState([]);
  const ref = useRef(null);

  const headers = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  const fetchData = async () => {
    try {
      const response = await request.get(`budgets?pageNumber=${1}`, headers);
      setData(response.data.data.content);
      setDataInfo(response.data.data.pageable);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return data.slice(firstPageIndex, lastPageIndex);
    // eslint-disable-next-line
  }, [currentPage, data]);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIdOfBudget(-1);
    }
  };
  const navigate = useNavigate();
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  const handleEditModal = (title) => {
    setEditBudgetModal(true);
    setBudgetTitle(title)
  }

  return (
    <Layout>
      <BudgetSyle>
        <div className="header-wrapper">
          <div className="header">
            <p style={{ fontWeight: "bold", fontSize: "20px" }}>Budget List</p>
          </div>
          <div className="button-container">
            <button onClick={() => setCreateBudgetModal(true)}>
              Create budget
            </button>
          </div>
        </div>

        <div className="table-container">
          <div className="header page">
            <p>Most recent</p>
            <p>
              Showing {currentPage} of {PageSize - 2}
            </p>
          </div>
          <table>
            <tr>
              <th>Budget title</th>
              <th>Period</th>
              <th>Amount</th>
              <th>Amount spent</th>
              <th>Percentage spent</th>
              <th>Action</th>
            </tr>

            {currentTableData !== null && currentTableData?.length > 0 ? (
              currentTableData.map((item, index) => (
                <tr>
                  <td>{item.title}</td>
                  <td>{item.period}</td>
                  <td>{item.displayProjectedAmount}</td>
                  <td>{item.displayTotalAmountSpentSoFar}</td>
                  <td>{item.displayPercentageSpentSoFar}</td>
                  <td
                    style={{
                      cursor: "pointer",
                      fontSize: "30px",
                      fontWeight: "bold",
                    }}
                    onClick={() => setIdOfBudget(item.id)}
                  >
                    ...
                    {idOfBudget === item.id ? (
                      <Fragment>
                        <span ref={ref} className="popup">
                          <p
                            onClick={() =>handleEditModal(item.title)
                              // navigate(`../edithBudget/${item.id}`, {
                              //   replace: true,
                              // })
                            }
                          >
                           Edit
                          </p>
                          <p
                            onClick={() =>
                              navigate(`../budgetDetail/${item.id}`, {
                                replace: true,
                              })
                            }
                          >
                            View details
                          </p>
                          <p style={{ color: "red" }}>Delete</p>
                        </span>
                      </Fragment>
                    ) : null}
                  </td>
                </tr>
              ))
            ) : (
              <p>No budget to display</p>
            )}
          </table>
        </div>
        <div className="pagination-container">
          <Pagination
            className="pagination-bar"
            currentPage={currentPage}
            totalCount={data.length}
            pageSize={PageSize}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
        {createBudgetModal && (
          <FormModal>
            <CreateBudget closeModal={() => setCreateBudgetModal(false)} />
          </FormModal>
        )}
        {editBudgetModal && (
          <FormModal>
            <EditBudget title={budgetTitle} id={idOfBudget} closeModal={() => setEditBudgetModal(false)} />
          </FormModal>
        )}
      </BudgetSyle>
    </Layout>
  );
};

export default Index;
const BudgetSyle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;

  background: rgba(0, 156, 244, 0.05);
  .header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 10px;
  }
  .page {
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;

    color: #a5b1b7;
  }
  .budget-container {
    padding: 10px;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    box-sizing: border-box;
    padding: 40px;
    background: #ffffff;
    border: 1px solid #d6d6d6;
    @media only screen and (max-width: 540px) {
      width: 100%;
    }
  }
  .list-container {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    gap: 15px;
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
  .item-wrapper {
    width: 100%;
    height: 150px;
    background: rgba(0, 0, 0, 0.04);
    padding: 10px;
    font-family: "Inter";
    font-style: normal;
    line-height: 19px;
    @media only screen and (max-width: 379px) {
      height: 180px;
    }
    @media only screen and (max-width: 299px) {
      height: 200px;
    }
    @media only screen and (max-width: 230px) {
      height: 250px;
    }
  }
  .list--wrapper {
    max-height: 100% !important;
    display: flex;
    flex-direction: column;
  }
  .list-item-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 100px;

    @media only screen and (max-width: 455px) {
      gap: 50px;
    }
    @media only screen and (max-width: 337px) {
      gap: 10px;
    }
  }
  .title {
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
    color: #21334f;
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
    font-family: "Inter";
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

    p {
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  .table-container {
    box-sizing: border-box;
    padding: 0px 27px;
    display: flex;
    flex-direction: column;
    overflow-x: auto;
    font-family: "Inter";
    border-radius: 15px;
    height: 100vh;
    width: 100%;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
    width: 100%;
    grid-area: a;
  }
  tr {
    cursor: pointer;
  }

  th {
    font-family: "Inter";
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    color: #8e919c;
  }

  td {
    font-family: "Inter";
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 22px;
    /* color: #2254d3 !important; */
  }

  th,
  td {
    text-align: left;
    padding: 20px 8px;
    border-bottom: 1px solid #dfe8fc;
  }
  .table-image {
    height: 40px;
    width: 40px;
    margin-right: 10px;
    border-radius: 60px;
  }
  .header-wrapper {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  button {
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
`;
