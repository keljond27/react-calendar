import React from "react";
import { WEEK_DAYS, convertObjToArr } from "../../helpers/calendar";
import CalendarCell from "./CalendarCell";

const CalendarWeekCell = (props) => {
  const { day, index } = props;

  const daylabel = WEEK_DAYS[day].toUpperCase();

  return (
    <CalendarCell
      keyValue={daylabel}
      index={index}
      className="cal-week-header-cell"
    >
      {daylabel}
    </CalendarCell>
  );
};

export default CalendarWeekCell;
