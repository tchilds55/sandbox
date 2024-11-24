import * as React from "react";

function AltDataTable({ data, columnSort, setColumnSort }) {
  let dataRows = [];

  if (columnSort) {
    // Sort data and then filter
    dataRows = []
      .concat(data)
      .sort((a, b) =>
        a[columnSort.toLowerCase()] > b[columnSort.toLowerCase()] ? 1 : -1
      )
      .map((row, i) => {
        return (
          <tr className="data-row" key={i.toString()} id={i}>
            <td>{row.name}</td>
            <td>{row.age}</td>
          </tr>
        );
      });
  }
  // No column sorting, Just filter data
  else
    dataRows = data.map((row, i) => {
      return (
        <tr className="data-row" key={i.toString()} id={i}>
          <td>{row.name}</td>
          <td>{row.age}</td>
        </tr>
      );
    });

  function sortByName() {
    setColumnSort("Name");
  }

  function sortByAge() {
    setColumnSort("Age");
  }

  return (
    <table className="data-table">
      <thead>
        <tr>
          <th>
            <button className="header-name" onClick={sortByName}>
              Name - O
            </button>
          </th>
          <th>
            <button className="header-age" onClick={sortByAge}>
              Age
            </button>
          </th>
        </tr>
      </thead>
      <tbody>{dataRows}</tbody>
    </table>
  );
}

export default AltDataTable;
