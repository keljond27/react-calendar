import React from "react";
import { Grid } from "semantic-ui-react";

const CalendarCell = (props) => {
  const { keyValue, index, className, onClick, children } = props;
  
  return (
    <td key={keyValue} index={index} className={className} onClick={onClick}>
      {children}
    </td>
  );
};

export default CalendarCell;