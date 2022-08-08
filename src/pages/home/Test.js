import React, { useState, useMemo } from 'react';
import Pagination from '../../utils/pagination';
import data from './mock-data.json';
// import './style.scss';
import styled from 'styled-components';

let PageSize = 10;

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  return (
    <PaginationContainer>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>FIRST NAME</th>
            <th>LAST NAME</th>
            <th>EMAIL</th>
            {/* <th>PHONE</th> */}
          </tr>
        </thead>
        <tbody>
          {currentTableData.map(item => {
            return (
              <tr>
                <td>{item.id}</td>
                <td>{item.first_name}</td>
                <td>{item.last_name}</td>
                <td>{item.email}</td>
                {/* <td>{item.phone}</td> */}
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={data.length}
        pageSize={PageSize}
        onPageChange={page => setCurrentPage(page)}
      />
    </PaginationContainer>
  );
}

const PaginationContainer = styled.div`

  .pagination-bar {
    display: flex;
    justify-content: space-between;
    width: 300px;
  }`;