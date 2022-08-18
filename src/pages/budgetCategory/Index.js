import React,{useRef,useState,Fragment,useEffect} from "react";
import styled from "styled-components";
import Layout from "../../components/dashboardSidebar/Layout";
import { useNavigate } from "react-router-dom";
import EditBudgetCategory from "./EditBudgetCategory";
import FormModal from "../../components/modal/FormModal";

const budgetCategory = [
  { id: 1, name: "Food" },
  { id: 2, name: "Transportation" },
  { id: 3, name: "Entertainment" },
  { id: 4, name: "Health" },
  { id: 5, name: "Utilities" },
  { id: 6, name: "Personal" },
  { id: 7, name: "Groceries" },
  { id: 8, name: "Other" },
];

const BudgetCategory = () => {
  const [editModal, setEditModal] = useState(false);
  const [idOfBudget, setIdOfBudget] = useState(-1);
  const navigate = useNavigate();
  const ref = useRef(null);
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIdOfBudget(-1);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  return (
    <Layout>
      <ListStyle>
        <div className="category-container">
          <div className="button-container">
            <button>Create budget category</button>
          </div>
          {budgetCategory && budgetCategory.length > 0 ? (
            budgetCategory.map((item, index) => (
              <div className="category" key={index}>
                <p className="category-title">{item.name}</p>
                <p onClick={() => setIdOfBudget(index)} style={{ fontSize: "30px", cursor: "pointer" }} >...
                {idOfBudget === index ? (
                      <Fragment>
                        <span ref={ref} className="popup">
                          <p
                            onClick={() =>setEditModal(true)}
                          >
                            Edit
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
        {editModal && 
        <FormModal >
          <EditBudgetCategory closeModal={() =>setEditModal(false)}/>
          </FormModal>}
      </ListStyle>
    </Layout>
  );
};

export default BudgetCategory;

const ListStyle = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .button-container {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
  /* .btn{
    width:200px;
  } */
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
    font-weight: 600;
    font-size: 16px;

    width: 100%;
    align-items: center;
    padding: 10px 14px 10px 14px;
    height: 57px;
    background: rgba(0, 156, 244, 0.05);
    /* box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.04); */
    display: flex;
    justify-content: space-between;
    font-size: 16px;
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
    height: 3.2rem;
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
`;
