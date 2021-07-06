import React, { useState, useEffect } from "react";
import { Button } from "semantic-ui-react";
import calendar, { getJulianDate, splitArray, WEEK_DAYS } from "../../helpers/calendar";

const DayView = (props) => {
  const { handleCellClick, month, year, day, markedDates, markToday } = props;

  const rowCount = 6;
  const colCount = 7;

  const [arrayChunks, setArrayChunks] = useState([]);
  const [daySelected, setDaySelected] = useState([]);

  useEffect(() => {
    let calendarData = calendar(new Date(year, month, 1));
    setArrayChunks(splitArray(calendarData, rowCount, colCount));
    setDaySelected(day);
  }, []);

  useEffect(() => {
    let calendarData = calendar(new Date(year, month, 1));
    setArrayChunks(splitArray(calendarData, rowCount, colCount));
  }, [month]);

  useEffect(() => {
    let calendarData = calendar(new Date(year, month, 1));
    setArrayChunks(splitArray(calendarData, rowCount, colCount));
  }, [year]);

  const handleDayClick = (_e, { name, value }) => {
    handleCellClick(_e, { name, value });
    setDaySelected(value);
  };

  const today = (day) => {
    if (markToday[0]) {
      let date = new Date();
      console.log(
        arrayMatch(
          [date.getFullYear(), date.getMonth() + 1, date.getDate()],
          day
        )
      );
      return arrayMatch(
        [date.getFullYear(), date.getMonth() + 1, date.getDate()],
        day
      );
    } else {
      return false;
    }
  };

  const arrayMatch = (a, b) => {
    return (
      Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, index) => val === b[index])
    );
  };

  const marked = (markedDates, day, returnMarkedColor = false) => {
    let isMarked = markedDates.map((x) => arrayMatch(x.date, day));
    if (returnMarkedColor) {
      return (
        isMarked.indexOf(true) > -1 && markedDates[isMarked.indexOf(true)].color
      );
    } else {
      return isMarked.indexOf(true) > -1
        ? markedDates[isMarked.indexOf(true)]
        : false;
    }
  };

  return (
    <>
      <table className="day-grid-table">
        <tbody>
          <tr>
            {Object.keys(WEEK_DAYS).map((day, index) => {
              return (
                <td key={index} className="cal-week-header-cell">
                  {WEEK_DAYS[day].toUpperCase()}
                </td>
              );
            })}
          </tr>

          {arrayChunks.map((chunk, index) => {
            return (
              <tr key={index}>
                {chunk.map((day, index) => {
                  let julian = getJulianDate(day[0], day[1], day[2]);
                  return (
                    <td className={`day-grid-table-cell`} key={index}>
                      <Button
                        name="day"
                        value={day}
                        className={`day-grid-table-cell-btn ${
                          arrayMatch(day, daySelected) ? "selected" : ""
                        } ${
                          marked(markedDates, day) ? `marked_${index}` : ""
                        } ${today(day) ? `today` : ""}`}
                        style={{
                          width: "100%",
                          height: "100%",
                          backgroundColor: marked(markedDates, day, true),
                        }}
                        onClick={handleDayClick}
                        disabled={day[1] != month + 1}
                      >
                        <div style={{ margin: "0 10px" }}>
                          <div className="day-cell-content">{day[2]}</div>
                          <div
                            style={{
                              borderBottom: `solid 1px ${
                                arrayMatch(day, daySelected) ? "#fff" : "#0003"
                              }`,
                              margin: "10px 0 10px",
                            }}
                          />
                          <div className="julian-cell-content">{julian}</div>
                        </div>
                      </Button>
                      <style>
                        {`
                          .marked_${index} {
                            background-color: ${marked(
                              markedDates,
                              day,
                              true
                            )} !important;
                          }
                          .today {
                            border: solid 2px ${
                              markToday[1] || "black"
                            } !important;
                          }
                        `}
                      </style>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default DayView;
