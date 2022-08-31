import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function Goback(props) {
  return (
    <svg
      width={props.width}
      height={props.height}
      viewBox="0 0 18 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        width="2.28571"
        height="16"
        rx="1"
        transform="matrix(0 -1 -1 0 17.2891 9.375)"
        fill="#21334F"
      />
      <path
        d="M9.52492 14.281C9.97123 14.7273 9.97123 15.4509 9.52492 15.8972C9.0786 16.3435 8.35499 16.3435 7.90867 15.8972L1.05153 9.04006C0.618872 8.6074 0.603734 7.91073 1.01719 7.45968L7.3029 0.602539C7.72941 0.13726 8.45234 0.105829 8.91762 0.532335C9.3829 0.95884 9.41433 1.68177 8.98783 2.14705L3.44153 8.19756L9.52492 14.281Z"
        fill="#21334F"
      />
    </svg>
  );
}

const GoBack =({onClick, text}) => {
  const navigate = useNavigate();
  return (
    <GoBackStyle onClick={onClick ? onClick : ()=>navigate(-1)} >
      <Goback width="0.8em" height="0.8em" />
      <p>{text?text:"Back"}</p>
    </GoBackStyle>
  )
}


export default GoBack;

const GoBackStyle = styled.div`
  cursor: pointer;
  display: flex;
  width: 80px;
  height: 30px;
  background: rgba(0, 0, 0, 0.04);
  border-radius: 50px;
  /* justify-content:center; */
  align-items: center;
  /* margin: 0 auto; */
  padding: 10px;
  gap:5px;
  p{
    font-size:14px;
    margin-top:15px;
  }
`;