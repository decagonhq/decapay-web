import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TitleCard from "./TitleCard";
import SubTitleCard from "./SubTitleCard";
import BudgetItem from "./BudgetItem";
import Calendar from "./DateComponent";
import Layout from "../../components/dashboardSidebar/Layout";
import request from "../../utils/apiHelper";
import { useParams } from "react-router-dom";
import FormModal from "../../components/modal/FormModal";
import BudgetLineItemResuable from "../../components/modal/modalForLineItem";
import { toast } from "react-toastify";

const Index = () => {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [createLineModal, setCreateLineModal] = useState(false);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);
  const fetchCategory = async () => {
    try {
      const response = await request.get(`budget_categories`, headers);
      setCategories(response.data.data);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }

  const { id } = useParams();
  const headers = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  const fetchData = async () => {
    try {
      const response = await request.get(`budgets/${id}`, headers);
      setData(response.data.data);
      setStartDate(response.data.data.startDate);
      setEndDate(response.data.data.endDate);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(data);
  return (
    <Layout>
      <DetailStyle>
        <div className="button-container">
          <button className="button"
            onClick={() => {
              setCreateLineModal(true);
            }
            }
           >Create line item</button>
        </div>
        <div className="budget-summary">
          <div className="title">
            <TitleCard amount={data?.displayProjectedAmount} />

            <div className="sub_container general mt-2 mb-2">
              <SubTitleCard
                title="Total Amount spent"
                alt=""
                amount={data?.displayTotalAmountSpentSoFar}
                src="/images/money-2.svg"
              />
              <SubTitleCard
                title="Percent"
                alt=""
                amount={data?.displayPercentageSpentSoFar}
                src="/images/percent.svg"
              />
            </div>
          </div>

          {startDate && endDate ? (
            <div className="calender">
              <Calendar startDate={startDate} endDate={endDate} />
            </div>
          ) : null}
        </div>
        {data && data?.length > 0 ? (
          data?.lineItems.map((item, index) => (
            <div className="mb-2">
              <BudgetItem log amount="N200000" soFar="N3400" percent="20%" />
            </div>
          ))
        ) : (
          <div className="empty">
            <img
              className="empty-img"
              src="/images/empty-img.svg"
              alt="empty"
            />
            <p>No line item found in the budget</p>
          </div>
        )}

        {/* <Button>+ Create Budget</Button> */}
        {createLineModal && (
          <FormModal>
            <BudgetLineItemResuable
              closeModal={() => setCreateLineModal(false)}
              formTitle="Create line item"
              placeholderCurrency="enter projected amount"
              placeholderSelect="Create line item"

            />
          </FormModal>
        )}
      </DetailStyle>
    </Layout>
  );
};

export default Index;

const DetailStyle = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  box-sizing: border-box;
  background: #ffffff;

  @media only screen and (max-width: 540px) {
    width: 100%;
  }
  .title {
    width: 60%;
    margin-top: 20px;
  }
  .budget-summary {
    width: 100%;
    display: flex;
    justify-content: space-around;
  }

  .general {
    width: 100%;
  }
  .sub_container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
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
  .button-container {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
  .button {
    margin-top: 20px;
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
`;
