import React from "react";
import PropTypes from "prop-types";
import { Grid, Icon } from "semantic-ui-react";
import { convertObjToArr, CALENDAR_MONTHS } from "../../helpers/calendar";
 
import { CONTROLS } from "../../helpers/calendar"

const CalendarControlHeader = (props) => {
  const { context, handleContextChange, handleControls, month, year, yearRange } = props;
  
  const monthArray = convertObjToArr(CALENDAR_MONTHS, true);

  const setContextContent = () => {
    switch (context) {
      case 0:
        return (
          <>
            {monthArray[month]} - {year}
          </>
        );
      case 1:
        return <>{year}</>;
      case 2:
        return <>{yearRange[0]} - {yearRange[1]}</>;
    }
  };

  return (
    <React.Fragment>
      <Grid.Row>
        <Grid.Column className="cal-header-back">
          <Icon
            controlname={CONTROLS.BACK}
            name="angle left"
            size="big"
            fitted={true}
            link
            onClick={handleControls}
          />
        </Grid.Column>
        <Grid.Column className="cal-header-text" onClick={handleContextChange}>
          {setContextContent()}
        </Grid.Column>
        <Grid.Column className="cal-header-next">
          <Icon
            controlname={CONTROLS.NEXT}
            name="angle right"
            size="big"
            fitted={true}
            link
            onClick={handleControls}
          />
        </Grid.Column>
      </Grid.Row>
    </React.Fragment>
  );
};

CalendarControlHeader.proptypes = {
  month: PropTypes.number,
  year: PropTypes.number,
};

export default CalendarControlHeader;
