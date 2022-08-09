import React from "react";
import classnames from "classnames";
import { usePagination } from "../hooks/usePagination";
import styled from "styled-components";
// import "./pagination.scss";

const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className,
    DOTS,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <PaginationContainer
      className={classnames("pagination-container", { [className]: className })}
    >
      {/* Left navigation arrow */}
      <li
        className={classnames("pagination-item", {
          disabled: currentPage === 1,
        })}
        onClick={onPrevious}
      >
        <div className="arrow left">{/* arrow here */}</div>
      </li>
      {paginationRange.map((pageNumber) => {
        // If the pageItem is a DOT, render the DOTS unicode character
        if (pageNumber === DOTS) {
          return <li className="pagination-item dots">...</li>;
        }

        // Render our Page Pills
        return (
          <li
            className={classnames("pagination-item", {
              selected: pageNumber === currentPage,
            })}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      {/*  Right Navigation arrow */}
      <li
        className={classnames("pagination-item", {
          disabled: currentPage === lastPage,
        })}
        onClick={onNext}
      >
        <div className="arrow right">{/* arrow here */}</div>
      </li>
    </PaginationContainer>
  );
};

export default Pagination;

const PaginationContainer = styled.ul`
  list-style-type: none;
  .dots{
    margin-top:
    font-size: 1.5rem;
    font-weight: bold;
    .dots:hover {
    background-color: transparent;
    /* cursor: pointer; */
  }
  }
  .pagination-container {
    display: flex;
    list-style-type: none;
  }
  .pagination-item {
    padding: 0 12px;
    height: 32px;
    text-align: center;
    margin: auto 4px;
    color: rgba(0, 0, 0, 0.87);
    display: flex;
    box-sizing: border-box;
    align-items: center;
    letter-spacing: 0.01071em;
    border-radius: 16px;
    line-height: 1.43;
    font-size: 13px;
    min-width: 32px;
    cursor: pointer;
    }

  .selected {
    background-color: rgba(0, 0, 0, 0.08);
  }
  .arrow::before {
      position: relative;
      /* top: 3pt; Uncomment this to lower the icons as requested in comments*/
      content: "";
      /* By using an em scale, the arrows will size with the font */
      display: inline-block;
      width: 0.4em;
      height: 0.4em;
      border-right: 0.12em solid rgba(0, 0, 0, 0.87);
      border-top: 0.12em solid rgba(0, 0, 0, 0.87);
    }

    .right {
      transform: rotate(45deg);
     
    }

    .left {
      transform: rotate(-132deg) translate(-70%);
    }

  .disabled {
    pointer-events: none;
  }
  .arrow::before {
    border-right: 0.12em solid rgba(0, 0, 0, 0.43);
    border-top: 0.12em solid rgba(0, 0, 0, 0.43);
  }

  .arrow:hover {
    background-color: transparent;
    cursor: default;
  }
`;
