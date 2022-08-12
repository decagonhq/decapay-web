import React, { useState, useEffect } from "react";
// import DatePicker from "react-dater";
import "react-dater/dist/index.css";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { Calendar } from "react-date-range";
import format from "date-fns/format";
import "../../styles/styles.css";
import styled from "styled-components"

// custom styles for the calendar
const CalendarWrapper = styled.div`
  width: 100%;
  font-family: "Inter";
  font-style: normal;
  line-height: 19px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .calenderElement {
    width: 100%;
    height: 100%;
    padding: 20px;
    font-family: "Inter";
    font-style: normal;
    line-height: 19px;
    margin:0 auto;
    @media only screen and (max-width: 379px) {
      height: 180px;
    }
  }

  `;

const Datething = () => {

  // eslint-disable-next-line
  const [calendar, setCalendar] = useState("");

  useEffect(() => {
    setCalendar(format(new Date(), "MM/dd/yyyy"));
  }, []);

  function handleSelect(date) {
    // console.log(date); // native Date object
    setCalendar(format(date, "MM/dd/yyyy"));
  }
  // const [open, setOpen] = useState(true);

  return (
    <CalendarWrapper>
      <input value={calendar} readOnly className="inputBox" />
      <Calendar
        date={new Date()}
        onChange={handleSelect}
        className="calenderElement"
        color="green"
        showSelectionPreview={true}
        minDate={new Date()}
        // maxDate={new Date(2022, 09, 31)}
      />
    </CalendarWrapper>
  );
};

export default Datething;
