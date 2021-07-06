import React, { useState, useEffect } from "react";
import { Button } from "semantic-ui-react";

import { splitArray } from "../../helpers/calendar";

const YearView = (props) => {
  const { yearRangeArray, handleCellClick } = props;

  const rowCount = 3;
  const colCount = 4;

  const [arrayChunks, setArrayChunks] = useState([]);

  useEffect(() => {
    setArrayChunks(splitArray(yearRangeArray, rowCount, colCount));
  }, [yearRangeArray])

  return (
    <table className="year-grid-table" >
          <tbody>
            {arrayChunks.map((chunk, index) => {
              return (
                <tr key={index}>
                  { chunk.map((year, index) => {
                    return (
                      <td className="year-grid-table-cell" key={index}>
                        <Button name="year" value={year} className="year-grid-table-cell-btn" style={{width: "100%", height: "100%"}} onClick={handleCellClick}>{year}</Button>
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

export default YearView;
