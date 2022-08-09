import React, { useState, useEffect } from "react";
// import DatePicker from "react-dater";
import "react-dater/dist/index.css";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { Calendar } from "react-date-range";
import format from "date-fns/format";
import "../../styles/styles.css";
import styled from "styled-components"

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
      {/* <input value={calendar} readOnly className="inputBox" /> */}
      <Calendar
        date={new Date()}
        onChange={handleSelect}
        className="calenderElement"
        color="green"
        showSelectionPreview={true}
      />
    </CalendarWrapper>
  );
};

export default Datething;

const CalendarWrapper = styled.div`
  display:flex;
  flex-direction:column;
  justify-content: center;
  align-items:center;
  width:100%;
  input.inputBox {
  font-size: 22px;
  padding: 5px 8px 4px 8px;
  border-radius: 3px;
  border: 1px solid #666;
}

.calendarElement {
  width:600px;
  border: 2px solid black;
  font-size: 22px;
}
`;