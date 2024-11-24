import "./SearchTableApp.css";
import * as React from "react";
import { reducerMethod } from "./components/ReducerMethod";
import { MyCounterContainer } from "./components/MyCounterContainer";

const initialDataSet = [
  { name: "Puffle", age: 13 },
  { name: "Puffles", age: 4 },
  { name: "Puffley", age: 3 },
  { name: "Pufflet", age: 5 },
  { name: "Pufflett", age: 5 },
  { name: "Pufflets", age: 5 },
  { name: "Luna", age: 10 },
  { name: "Georgy", age: 9 },
  { name: "Teddy", age: 5 },
  { name: "Teds", age: 5 },
  { name: "Baby Boy", age: 2 },
  { name: "Tuxedo", age: 4 },
  { name: "Tuxey", age: 9 },
];

const TableContext = React.createContext();

function useTableContext() {
  const context = React.useContext(TableContext);
  if (context === undefined) {
    throw new Error(
      "useTableContext must be used within a SearchTableProvider"
    );
  }
  return context;
}

function SearchTableProvider({ children }) {
  const [data, setData] = React.useState(initialDataSet);
  const initialTableSettings = {
    searchTerm: "",
    sortColumn: null,
  };
  const [tableSettings, dispatch] = React.useReducer(
    reducerMethod,
    initialTableSettings
  );

  function sortTable(sortColumn, inputData = data) {
    let sortedData = [];
    console.log(`sortColumn: ${sortColumn}`);
    dispatch({
      type: "sortColumn",
      payload: sortColumn,
    });

    sortedData = []
      .concat(inputData)
      .sort((a, b) =>
        a[sortColumn.toLowerCase()] > b[sortColumn.toLowerCase()] ? 1 : -1
      );

    setData(sortedData);
  }

  function handleReset() {
    if (tableSettings.sortColumn) {
      sortTable(tableSettings.sortColumn, initialDataSet);
    } else {
      setData(initialDataSet);
    }
    dispatch({
      type: "searchTerm",
      payload: "",
    });
  }

  const value = [
    data,
    setData,
    tableSettings,
    dispatch,
    sortTable,
    handleReset,
  ];

  return (
    <TableContext.Provider value={value}>
      <div className="search-table">{children}</div>
    </TableContext.Provider>
  );
}

function SearchBar() {
  const [, setData, tableSettings, dispatch, sortTable, handleReset] =
    useTableContext();

  function handleSubmit(e) {
    e.preventDefault();
    if (tableSettings.searchTerm === "") {
      console.log(`Search term: ${tableSettings.searchTerm}`);
      handleReset();
      return;
    }
    console.log(`Searchy term: ${tableSettings.searchTerm}`);

    // Filter data, then sort if sortColumn is set
    let filterData = initialDataSet.filter((row) => {
      if (row.name.includes(tableSettings.searchTerm)) {
        return row;
      }
    });

    if (tableSettings.sortColumn) {
      sortTable(tableSettings.sortColumn, filterData);
    } else {
      setData(filterData);
    }
  }

  return (
    <form key="input-form" onSubmit={handleSubmit} className="search-form">
      <div>
        <input
          key="search-input"
          autoFocus="autoFocus"
          className="search-input"
          id="search-input"
          name="searchTerm"
          placeholder="Search term..."
          value={tableSettings.searchTerm}
          onChange={(e) =>
            dispatch({
              type: "searchTerm",
              payload: e.target.value,
            })
          }
        />
        <button type="submit">Search</button>
      </div>
    </form>
  );
}

function Reset() {
  const [, , , , , handleReset] = useTableContext();

  return (
    <button className="reset" onClick={handleReset}>
      Reset Search
    </button>
  );
}

function DataTable() {
  let dataRows = [];
  const [data, , , , sortTable] = useTableContext();
  console.log(`data: ${data[0].name}`);
  dataRows = data.map((row, i) => {
    return (
      <tr className="data-row" key={i.toString()} id={i}>
        <td>{row.name}</td>
        <td>{row.age}</td>
      </tr>
    );
  });

  return (
    <table className="data-table">
      <thead>
        <tr>
          <th>
            <button className="header-name" onClick={() => sortTable("Name")}>
              Name
            </button>
          </th>
          <th>
            <button className="header-age" onClick={() => sortTable("Age")}>
              Age
            </button>
          </th>
        </tr>
      </thead>
      <tbody>{dataRows}</tbody>
    </table>
  );
}

function SearchTableContainer({ children }) {
  return <div className="search-table">{children}</div>;
}

function SearchTable() {
  return (
    <SearchTableProvider>
      <SearchTableContainer>
        <SearchBar />
        <Reset />
        <DataTable />
        <h4>Counter:</h4>
        <MyCounterContainer />
      </SearchTableContainer>
    </SearchTableProvider>
  );
}

function SearchTableApp() {
  return (
    <div className="App">
      <header className="App-header">Search Table</header>
      <SearchTable />
    </div>
  );
}

export default SearchTableApp;
