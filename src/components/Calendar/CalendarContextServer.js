import React from "react";
import { Grid } from "semantic-ui-react";
import DayView from "../Views/DayView";
import MonthView from "../Views/MonthView";
import YearView from "../Views/YearView";

const CalendarCell = (props) => {
  const { context } = props;

  const setContextContent = () => {
    switch (context) {
      case 0:
        return <DayView />;
      case 1:
        return <MonthView />;
      case 2:
        return <YearView />;
    }
  };

  return <>{setContextContent()}</>;
};

export default CalendarCell;
