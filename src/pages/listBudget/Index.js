import React,{useState, useMemo} from "react";
import styled from "styled-components";
import BudgetCard from "./BudgetCard";
import GoBack from "../../components/Goback";
import Layout from "../../components/dashboardSidebar/Layout";
import { data } from "./Data";
import Pagination from "../../utils/pagination";


let PageSize = 5;
const Index = () => {
   const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

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
            <p>Showing {currentPage} of {PageSize-2}</p>
          </div>
          <div className="list-container">
            {currentTableData.map((item, index) => {
              return <BudgetCard key={index} {...item} />;
            })}
          </div>
          <div className="pagination-container">
          <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={data.length}
        pageSize={PageSize}
        onPageChange={page => setCurrentPage(page)}
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
  .pagination-container{
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
