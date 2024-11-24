import { useReducer, useMemo, useCallback } from "react";
import { DataTableContext, initialDataSet } from "./context/DataTableContext";

function reducerMethod(state, action) {
  switch (action.type) {
    case "searchTerm":
      return { ...state, searchTerm: action.payload };
    case "sortColumn":
      return { ...state, sortColumn: action.payload };
    case "tableData":
      return { ...state, tableData: action.payload };
    default:
      return state;
  }
}

export function DataTableProvider({ children }) {
  //const [data, setData] = useState(initialDataSet);
  const [tableSettings, dispatch] = useReducer(reducerMethod, {
    searchTerm: "",
    sortColumn: null,
    tableData: initialDataSet,
  });

  const sortTable = useCallback(
    (sortColumn, inputData = tableSettings.tableData) => {
      dispatch({ type: "sortColumn", payload: sortColumn });

      const sortedData = [...inputData].sort((a, b) =>
        a[sortColumn.toLowerCase()] > b[sortColumn.toLowerCase()] ? 1 : -1
      );

      dispatch({ type: "tableData", payload: sortedData });
    },
    [tableSettings.tableData]
  );

  const handleReset = useCallback(() => {
    if (tableSettings.sortColumn) {
      sortTable(tableSettings.sortColumn, initialDataSet);
    } else {
      dispatch({ type: "tableData", payload: initialDataSet });
    }
    dispatch({ type: "searchTerm", payload: "" });
  }, [tableSettings.sortColumn, sortTable]);

  const value = useMemo(
    () => ({
      tableSettings,
      actions: {
        dispatch,
        sortTable,
        handleReset,
      },
    }),
    [tableSettings, sortTable, handleReset]
  );

  return (
    <DataTableContext.Provider value={value}>
      {children}
    </DataTableContext.Provider>
  );
}
