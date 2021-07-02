import React from "react";
import { Grid } from "semantic-ui-react";
import { WEEK_DAYS } from "../../helpers/calendar";
import CalendarWeekCell from "./CalendarWeekCell";

const CalendarWeekHeader = (props) => {
  return (
    <>
      <Grid.Row>
        {Object.keys(WEEK_DAYS).map((day, index) => {
          return <CalendarWeekCell day={day} key={index} />;
        })}
      </Grid.Row>
    </>
  );
};

export default CalendarWeekHeader;
