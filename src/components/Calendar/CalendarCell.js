import React from "react";
import { Grid } from "semantic-ui-react";

const CalendarCell = (props) => {
  const { keyValue, index, className, onClick, children } = props;
  
  return (
    <Grid.Column key={keyValue} index={index} className={className} onClick={onClick}>
      {children}
    </Grid.Column>
  );
};

export default CalendarCell;