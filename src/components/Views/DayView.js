import React, { useState, useEffect } from "react";
import { Button } from "semantic-ui-react";
import calendar, {splitArray} from "../../helpers/calendar";
import CalendarWeekHeader from "../Calendar/CalendarWeekHeader";


const DayView = (props) => {
  const { handleCellClick, month, year } = props;

  const rowCount = 6;
  const colCount = 7;

  const [arrayChunks, setArrayChunks] = useState([]);

  useEffect(() => {
    let calendarData = calendar(new Date(year, month, 1));
    setArrayChunks(splitArray(calendarData, rowCount, colCount));
  }, []);

  useEffect(() => {
    let calendarData = calendar(new Date(year, month, 1));
    setArrayChunks(splitArray(calendarData, rowCount, colCount));
  }, [month]);

  useEffect(() => {
    let calendarData = calendar(new Date(year, month, 1));
    setArrayChunks(splitArray(calendarData, rowCount, colCount));
  }, [year]);

  return (
    <>
      <CalendarWeekHeader {...props} />
      <table className="month-grid-table">
        <tbody>
          {arrayChunks.map((chunk, index) => {
            return (
              <tr key={index}>
                {chunk.map((day, index) => {
                  return (
                    <td className="month-grid-table-cell" key={index}>
                      <Button
                        name="month"
                        value={day && day[2]}
                        className="month-grid-table-cell-btn"
                        style={{ width: "100%", height: "100%" }}
                        onClick={handleCellClick}
                      >
                        {day && day[2]}
                      </Button>
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
