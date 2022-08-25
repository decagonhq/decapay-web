import React, { useRef, useState, Fragment, useEffect } from "react";
import styled from "styled-components";
import Layout from "../../components/dashboardSidebar/Layout";
import request from "../../utils/apiHelper";
import { toast } from "react-toastify";
import MyButton from "../../components/Button";
import ClipLoader from "react-spinners/ClipLoader";
import FormTitleSection from "../../components/modal/FormTitleSection";
import CurrencyFormat from "react-currency-format";
// import useDialog from "../../hooks/useDialog";
import FormModal from "../../components/modal/FormModal";
// import { useFormik } from "formik";
// import * as yup from "yup";

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

const BudgetCategory = () => {
  const [idOfBudget, setIdOfBudget] = useState(-1);
  const [editModal,setEditModal] = useState(false)
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false)
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
  
  
  
// eslint-disable-next-line 
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
        <div className="category-container">
          <div className="category header">
            <p className="category-title">Description</p>
            <p className="category-title">Amount</p>
            <p className="category-title">Date</p>
            <p className="category-title">Time</p>
            <p className="category-title">Action</p>
          </div>
          {expenses && expenses.length > 0 ? (
            expenses.map((item, index) => (
              <div className="category body" key={index}>
                <p className="category-title">{item.description}</p>
                <p className="category-title">{item.amount}</p>
                <p className="category-title">{item.date}</p>
                <p className="category-title">{item.time}</p>
                <p
                  onClick={() => setIdOfBudget(index)}
                 className="dots"
                >
                  ...
                  {idOfBudget === index ? (
                    <Fragment>
                      <span ref={ref} className="popup">
                        <p onClick={()=>setEditModal(true)} >Edit</p>
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
                  <MyButton
                    type="submit"
                    // className="form__button"
                    // onClick={onSubmitEdit}
                  >
                    {loading ? (
                      <ClipLoader color="white" size="40px" />
                    ) : (
                      "Save"
                    )}
                  </MyButton>
                </div>
              </form>
            </div>
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
    
    
    width: 100%;
    align-items: center;
    padding: 10px 14px;
    height: 57px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    gap: 10px;
    /* border-radius:5px; */
  }
  .header{
    font-weight: 600;
    margin-bottom:-20px ;
    font-size: 16px;
  }
  .body{
    background: rgba(0, 156, 244, 0.05);
    font-weight: 500;
    font-size: 14px;
  }

  
  .popup {
    position: absolute;
    min-width: 150px;
    /* right: 20px; */
    /* top: 120px; */
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
  .dots {
    font-size: 30px; 
    cursor: "pointer";
    font-weight:"bold" 
  }
  @media only screen and (max-width: 990px) {
    .category {
      padding: 5px 8px ;
      height:100px;
  }
}
@media only screen and (max-width: 487px) {
    .category {
      padding: 4px ;
      height:150px;
      font-size:1rem;
  }
      .dots{
        font-size:25px;
      }
    .header{
      font-size:12px;
    }
    .body{
      font-size:12px;
    }
  }
@media only screen and (max-width: 377px) {
    .category {
     display:flex;
     justify-content: space-between;
     width:100%;
     padding:0px;
     font-size:12px;
  }
}
@media only screen and (max-width: 290px) {
    .category {
     display:flex;
     justify-content: space-between;
     width:100%;
     padding:0px;
     font-size:10px;
  }
}
.form__wrapper {
    width: 100%;
    border-radius: 5px;
    margin-top: 20px;
  }
  .btn-wrapper {
    margin-top: 20px;
  }
`;
