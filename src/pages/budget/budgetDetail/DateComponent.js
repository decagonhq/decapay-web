import React from "react";
// import DatePicker from "react-dater";
import "react-dater/dist/index.css";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { Calendar } from "react-date-range";
// import format from "date-fns/format";
import "../../../styles/styles.css";
import styled from "styled-components"

// custom styles for the calendar
const CalendarWrapper = styled.div`
  width: 100%;
  font-family: "Sofia Pro";
  font-style: normal;
  line-height: 19px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .calenderElement {
    max-width: 100% !important;
    height: 100%;
    font-family: "Sofia Pro";
    font-style: normal;
    line-height: 25px;
    @media only screen and (max-width: 379px) {
      height: 180px;
    }
  }

  `;

const Datething = ({startDate, endDate, calendar, handleSelect}) => {

  // eslint-disable-next-line
  
  // const [disabled,setDisabled] = useState(false)



  return (
    <CalendarWrapper>
      <input type="hidden" value={calendar} readOnly className="inputBox" />
      <Calendar
        onChange={handleSelect}
        className="calenderElement"
        color="green"
        showSelectionPreview={true}
        minDate={new Date(startDate)}
        maxDate={new Date(endDate)}
        // moveRangeOnFirstSelection={true}
        shownDate={new Date(startDate)}
      />
    </CalendarWrapper>
  );
};

export default Datething;
