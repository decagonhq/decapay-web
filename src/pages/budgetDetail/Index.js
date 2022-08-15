import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TitleCard from "./TitleCard";
import SubTitleCard from "./SubTitleCard";
import BudgetItem from "./BudgetItem";
import Button from "../../components/Button";
import Calendar from "./DateComponent";
import Layout from "../../components/dashboardSidebar/Layout";
import request from "../../utils/apiHelper";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const Index = () => {
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

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
      toast.error(error.response.data.message);
    }
  };
  return (
    <Layout>
      <DetailStyle>
        <TitleCard 
        amount = {data?.displayProjectedAmount}
        />

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
        {startDate && endDate ? <div className="calender">
          <Calendar  startDate={startDate} endDate={endDate} />
        </div>:null}
        

        {data && data?.length > 0 ? (
          data?.lineItems.map((item, index) => (
            <div key={index} className="mb-2">
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

        <Button>+ Create Budget</Button>
      </DetailStyle>
    </Layout>
  );
};

export default Index;

const DetailStyle = styled.div`
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
`;
