import React, { useState, useEffect } from "react";
import { Table, Container, Grid } from "semantic-ui-react";
import moment from "moment";
import {
  WEEK_DAYS,
  THIS_MONTH,
  THIS_YEAR,
  CONTROLS,
  CALENDAR_MONTHS,
  getMomentMonth,
  calculateYearRange,
} from "../../helpers/calendar";

import CalendarControlHeader from "./CalendarControlHeader";
import CalendarWeekHeader from "./CalendarWeekHeader";
import CalendarContextServer from "./CalendarContextServer";

const Calendar = (props) => {
  const yearGridCount = 12;

  const [calendarContext, setCalendarContext] = useState(0);
  const [month, setMonth] = useState(THIS_MONTH);
  const [year, setYear] = useState(THIS_YEAR);
  const [yearRange, setYearRange] = useState([]);
  const [yearRangeIndex, setYearRangeIndex] = useState([]);
  const [yearRangeArray, setYearRangeArray] = useState([]);

  const resetYearRangeData = (yearRangeData = null) => {
    yearRangeData =
      yearRangeData != null
        ? yearRangeData
        : calculateYearRange(year, yearGridCount);
    setYearRange([yearRangeData[0], yearRangeData[1]]);
    setYearRangeIndex(yearRangeData[2]);
    setYearRangeArray(yearRangeData[3]);
  };

  useEffect(() => {
    resetYearRangeData();
  }, []);

  const handleContextChange = () => {
    let context = 0;

    switch (calendarContext) {
      case 0:
        context = 1;
        break;
      case 1:
        context = 2;
        break;
      case 2:
        context = 0;
        break;
    }

    setCalendarContext(context);
    resetYearRangeData();
  };

  const handleDayViewControls = (controlname) => {
    switch (true) {
      case controlname == CONTROLS.NEXT &&
        month == CALENDAR_MONTHS.DECEMBER.index:
        setMonth(1);
        setYear(year + 1);
        break;
      case controlname == CONTROLS.NEXT &&
        month !== CALENDAR_MONTHS.DECEMBER.index:
        setMonth(month + 1);
        break;
      case controlname == CONTROLS.BACK &&
        month == CALENDAR_MONTHS.JANUARY.index:
        setMonth(12);
        setYear(year - 1);
        break;
      case controlname == CONTROLS.BACK &&
        month !== CALENDAR_MONTHS.JANUARY.index:
        setMonth(month - 1);
        break;
    }
  };

  const handleMonthViewControls = (controlname) => {
    controlname == CONTROLS.BACK && setYear(year - 1);
    controlname == CONTROLS.NEXT && setYear(year + 1);
  };

  const handleYearViewControls = (controlname) => {
    let yearRangeData;
    if (controlname == CONTROLS.BACK) {
      yearRangeData = calculateYearRange(
        year,
        yearGridCount,
        yearRangeIndex - 1
      );
    }
    if (controlname == CONTROLS.NEXT) {
      yearRangeData = calculateYearRange(
        year,
        yearGridCount,
        yearRangeIndex + 1
      );
    }
    resetYearRangeData(yearRangeData);
  };

  const handleCellClick = (_e, { value }) => {
    setYear(value);
    setCalendarContext(calendarContext - 1);
  };

  const handleControls = (_e, { controlname }) => {
    switch (calendarContext) {
      case 0:
        handleDayViewControls(controlname);
        break;
      case 1:
        handleMonthViewControls(controlname);
        break;
      case 2:
        handleYearViewControls(controlname);
        break;
    }
  };

  return (
    <React.Fragment>
      <Container className="cal-container">
        <Grid relaxed columns="equal">
          <CalendarControlHeader
            context={calendarContext}
            handleContextChange={handleContextChange}
            handleControls={handleControls}
            month={month}
            year={year}
            yearRange={yearRange}
          />
          <CalendarContextServer
            context={calendarContext}
            handleCellClick={handleCellClick}
            yearRangeArray={yearRangeArray}
          />
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default Calendar;
