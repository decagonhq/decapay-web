import React, { useRef, useState, Fragment, useEffect } from "react";
import styled from "styled-components";
import Layout from "../../components/dashboardSidebar/Layout";
import FormModal from "../../components/modal/FormModal";
import BudgetCategoryReusable from "./EditBudgetCategory";
import request from "../../utils/apiHelper";
import { toast } from "react-toastify";

// import { useFormik } from "formik";
// import * as yup from "yup";

const BudgetCategory = () => {
  const [idOfBudget, setIdOfBudget] = useState(-1);
  const [editModal, setEditModal] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [category, setCategory] = useState("");
  const [editCategory, setEditCategory] = useState({
    category: "",
    id: "",
  });

  const [data, setData] = useState([]);
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
  const onSubmit = async () => {
    console.log(category);
    let payload = {
      title: category,
    };
    try {
      const response = await request.post(
        `budget_categories`,
        payload,
        headers
      );
      setCreateModal(false);
      toast.success(response.data.message);
      setCategory("");
      fetchData();
    } catch (error) {
      console.log(error);
      // toast.error(error);
    }
  };
  const onSubimtEdit = async () => {
    console.log(editCategory);
    let payload = {
      title: editCategory.category,
    };
    try {
      const response = await request.put(
        `budget_categories/${editCategory.id}`,
        payload,
        headers
      );
      setEditModal(false);
      toast.success(response.data.message);
      setEditCategory({
        category: "",
        id: "",
      });
      fetchData();
    } catch (error) {
      console.log(error);
      // toast.error(error);
    }
  };
  const handleChange = (e) => {
    setCategory(e.target.value);
  };
  const handleEdithChange = (e) => {
    setEditCategory({
      ...editCategory,
      [e.target.name]: e.target.value,
    });
  };
  console.log(editCategory);
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  const fetchData = async () => {
    try {
      const response = await request.get(`budget_categories`, headers);
      setData(response.data.data);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
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
      <div className="header-wrapper">
          <div className="header">
            <p style={{ fontWeight: "bold", fontSize: "20px" }}>Budget category</p>
          </div>
          <div className="button-container">
            <button onClick={() => setCreateModal(true)}>
              Create budget category
            </button>
          </div>
        </div>
        <div className="category-container">
          
          {data && data.length > 0 ? (
            data.map((item, index) => (
              <div className="category" key={index}>
                <p className="category-title">{item.title}</p>
                <p
                  onClick={() => setIdOfBudget(index)}
                  style={{ fontSize: "30px", cursor: "pointer" }}
                >
                  ...
                  {idOfBudget === index ? (
                    <Fragment>
                      <span ref={ref} className="popup">
                        <p
                          onClick={() => {
                            setEditModal(true);
                            setEditCategory({
                              category: item.title,
                              id: item.id,
                            });
                          }}
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
        {editModal && (
          <FormModal>
            <BudgetCategoryReusable
              closeModal={() => setEditModal(false)}
              placeholder="Edit Budget category"
              label="Name of budget category"
              type="text"
              name="category"
              buttonType="submit"
              value={editCategory.category}
              onChange={(e) => handleEdithChange(e)}
              onClick={onSubimtEdit}
            />
          </FormModal>
        )}
        {createModal && (
          <FormModal>
            <BudgetCategoryReusable
              closeModal={() => setCreateModal(false)}
              placeholder="Create budget categories"
              buttonValue="Create"
              label="Name of Category"
              type="text"
              name="budgetCategory"
              buttonType="submit"
              value={category}
              onChange={(e) => handleChange(e)}
              onClick={onSubmit}
              formTitle={`What do you usually spend on?`}
            />
          </FormModal>
        )}
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
  .header-wrapper {
    width: 100%;
    display: flex;
    margin-top:20px;
    flex-direction: row;
    justify-content: space-between;
  }

  .button-container {
    /* width: 100%; */
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
    font-family: "Sofia Pro";
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
      cursor: poSofia Pro;
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
