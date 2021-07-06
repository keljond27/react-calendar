import React, { useState, useEffect } from "react";
import { Button } from "semantic-ui-react";
import moment from "moment";

import { splitArray,  CALENDAR_MONTHS } from "../../helpers/calendar";


const MonthView = (props) => {
  const { handleCellClick } = props;

  const rowCount = 3;
  const colCount = 4;

  const [arrayChunks, setArrayChunks] = useState([]);

  useEffect(() => {
    setArrayChunks(splitArray(CALENDAR_MONTHS, rowCount, colCount, true));
  }, [])

  return (
    <table className="month-grid-table" >
          <tbody>
            {arrayChunks.map((chunk, index) => {
              return (
                <tr key={index}>
                  { chunk.map((monthData, index) => {
                    let monthNum = new Date(`${monthData} 1, 2000`).getMonth();
                    return (
                      <td className="month-grid-table-cell" key={index}>
                        <Button name="month" value={monthNum} className="month-grid-table-cell-btn" style={{width: "100%", height: "100%"}} onClick={handleCellClick}>{monthData}</Button>
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
  );
};

export default MonthView;