import React, { useState, useMemo, useRef, useEffect, Fragment } from "react";
import styled from "styled-components";
import GoBack from "../../components/Goback";
import Layout from "../../components/dashboardSidebar/Layout";
import { data } from "./Data";
import Pagination from "../../utils/pagination";

let PageSize = 5;
const Index = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [idOfBudget, setIdOfBudget] = useState(-1);
  const ref = useRef(null);

  console.log(idOfBudget);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIdOfBudget(-1);
    }
  };

  // const handleShowModal = (idx) => {
  //   setIdOfBudget(idx);
  //   setShowPopup(!showPopup);
  // };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  return (
    <Layout>
      <BudgetSyle>
        <div className="budget-container">
          <div className="header">
            <GoBack />
            <p>Budget List</p>
          </div>
          <div className="header page">
            <p>Most recent</p>
            <p>
              Showing {currentPage} of {PageSize - 2}
            </p>
          </div>
          <div className="list-container">
            {currentTableData.map((item, index) => (
              <ul className="item-wrapper">
                {/* Budget 1 - Monthly */}
                <div className="list--wrapper">
                  <div className="list-item-row title">
                    <p>{item.title}</p>
                    <p style={{cursor:"pointer"}} onClick={() => setIdOfBudget(index)}>
                      ...
                      {idOfBudget === index ? (
                        <Fragment>
                          <span ref={ref} className="popup">
                            <p>Edit</p>
                            <p>View details</p>
                            <p style={{color:"red"}}>Delete</p>
                          </span>
                        </Fragment>
                      ) : null}
                    </p>
                  </div>
                  <div className="list-item-row">
                    <p>Budget amount</p>
                    <p>{item.amount}</p>
                  </div>
                  <div className="list-item-row">
                    <p>Total amount spent</p>
                    <p>{item.totalAmount}</p>
                  </div>
                  <div className="list-item-row">
                    <p>Percentage</p>
                    <p style={{ color: "#14A800" }}>{item.percentage}</p>
                  </div>
                </div>
              </ul>
            ))}
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
        </div>
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
  .header {
    width: 100%;
    display: flex;
    justify-content: space-between;
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
    width: 563px;
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

    /* box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.08); */
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
    min-width: 200px;
    right: 370px;
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

    p {
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
`;
