import React from "react";
import { Grid } from "semantic-ui-react";
import CalendarWeekHeader from "../Calendar/CalendarWeekHeader";

const DayView = (props) => {
  const {} = props;
  
  return (
    <>
    <CalendarWeekHeader {...props} />
    </>
  );
};

export default DayView;