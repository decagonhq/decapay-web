import React,{useState,useEffect} from "react";
import styled from "styled-components";
import TitleCard from "./TitleCard";
import SubTitleCard from "./SubTitleCard";
import BudgetItem from "./BudgetItem";
import Button from "../../components/Button";
import Calendar from "./Dateing";
import Layout from "../../components/dashboardSidebar/Layout";
import request from "../../utils/apiHelper";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const Index = ({ title }) => {
  const[data,setData] = useState([]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  const {id} = useParams();
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
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  console.log(data);
  return (
    <Layout>
      <DetailStyle>
        <TitleCard />

        <div className="sub_container general mt-2 mb-2">
          <SubTitleCard
            title="Total Amount spent"
            alt="amount"
            amount="N30,0000"
            src="images/money.svg"
          />
          <SubTitleCard
            title="Percent"
            alt="percent"
            amount="35%"
            src="images/percent.svg"
          />
        </div>
        <div className="calender">
          <Calendar />
        </div>
        <div>
          <div className="general mb-2">
            <BudgetItem log amount="N200000" soFar="N3400" percent="20%" />
          </div>
          <div className="mb-2">
            <BudgetItem log amount="N200000" soFar="N3400" percent="20%" />
          </div>
          <div className="mb-2">
            <BudgetItem log amount="N200000" soFar="N3400" percent="20%" />
          </div>
          <div className="mb-2">
            <BudgetItem log amount="N200000" soFar="N3400" percent="20%" />
          </div>
        </div>
        <Button>+ Create Budget</Button>
      </DetailStyle>
    </Layout>
  );
};

export default Index;

const DetailStyle = styled.div`
  /* justify-content: center; */
  /* align-items: center; */
  /* margin: 0 auto; */

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
`;
