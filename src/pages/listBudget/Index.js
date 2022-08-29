import React, { useState, useRef, useEffect, Fragment } from "react";
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

let pageSize = 5;
const Index = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [idOfBudget, setIdOfBudget] = useState(-1);
  const [createBudgetModal, setCreateBudgetModal] = useState(false);
  const [editBudgetModal, setEditBudgetModal] = useState(false);
  const [budgetTitle, setBudgetTitle] = useState("");
  const [currentTableData, setCurrentTableData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

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
  }, [currentPage]);
  console.log(currentPage);
  const fetchData = async () => {
    try {
      const response = await request.get(
        `budgets?size=${pageSize}&page=${currentPage}`,
        headers
      );
      console.log(response.data);
      setCurrentTableData(response.data.data.content);
      setTotalCount(response.data.data.totalElements);
      setDataInfo(response.data.data.pageable);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

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
    setBudgetTitle(title);
  };

  // console.log(dataInfo);

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
        <div className="header page">
          <p>Most recent</p>
          <p>
            Showing {currentPage} of {Math.ceil(totalCount / pageSize)}
          </p>
        </div>

        {/* Custom table starts here */}
        <div className="category-container">
          <div className="category header">
            <p className="category-title">Budget title</p>
            <p className="category-title">Period</p>
            <p className="category-title">Amount</p>
            <p className="category-title">Amount spent</p>
            <p className="category-title">Percentage spent</p>
            <p className="category-title">Action</p>
          </div>
          {currentTableData !== null && currentTableData?.length > 0 ? (
            currentTableData.map((item, index) => (
              <div className="category body" key={index}>
                <p
                  onClick={() =>
                    navigate(`../budgetDetail/${item.id}`, {
                      replace: true,
                    })
                  }
                  className="category-title"
                  style={{
                    cursor: "pointer",
                  }}
                >
                  {item.title}
                </p>
                <p className="category-title">{item.period}</p>
                <p className="category-title">{item.displayProjectedAmount}</p>
                <p className="category-title">
                  {item.displayTotalAmountSpentSoFar}
                </p>
                <p className="category-title">
                  {item.displayPercentageSpentSoFar}
                </p>
                <p
                  style={{
                    cursor: "pointer",
                    fontSize: "30px",
                    fontWeight: "bold",
                  }}
                  onClick={() => setIdOfBudget(item.id)}
                  className="dots"
                >
                  ...
                  {idOfBudget === item.id ? (
                    <Fragment>
                      <span ref={ref} className="popup">
                        <p
                          onClick={
                            () => handleEditModal(item.title)
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
                </p>
              </div>
            ))
          ) : (
            <p>There are no budget category</p>
          )}
        </div>
        <div className="pagination-container">
          <Pagination
            className="pagination-bar"
            currentPage={currentPage}
            totalCount={totalCount}
            pageSize={pageSize}
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
            <EditBudget
              title={budgetTitle}
              id={idOfBudget}
              closeModal={() => setEditBudgetModal(false)}
            />
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

  /* background: rgba(0, 156, 244, 0.05); */
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
    /* right: 20px; */
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

  /* Custom table styles */

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
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    gap: 10px;
    /* border-radius: 5px; */
  }
  .header {
    font-weight: 600;
    margin-bottom: -20px;
    font-size: 16px;
  }
  .body {
    background: rgba(0, 156, 244, 0.05);
    font-weight: 500;
    font-size: 14px;
  }

  .dots {
    font-size: 30px;
    cursor: "pointer";
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
`;
