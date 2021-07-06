import React from "react";
import DayView from "../Views/DayView";
import MonthView from "../Views/MonthView";
import YearView from "../Views/YearView";

const CalendarContextServer = (props) => {
  const { context } = props;

  const setContextContent = () => {
    switch (context) {
      case 0:
        return <DayView {...props} />;
      case 1:
        return <MonthView {...props} />;
      case 2:
        return <YearView {...props} />;
    }
  };

  return <>{setContextContent()}</>;
};

export default CalendarContextServer;
