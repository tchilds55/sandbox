import { useState, useCallback } from "react";
import { TableControls } from "./components/TableControls/TableControls";
import { Table } from "./components/Table/Table";
import { initialDataSet } from "./context/DataTableConstants";

export function DataTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState(null);
  const [tableData, setTableData] = useState(initialDataSet);

  const sortTable = useCallback(
    (sortColumn, inputData = tableData) => {
      setSortColumn(sortColumn);

      const sortedData = [...inputData].sort((a, b) =>
        a[sortColumn.toLowerCase()] > b[sortColumn.toLowerCase()] ? 1 : -1
      );

      setTableData(sortedData);
    },
    [tableData]
  );

  const handleReset = useCallback(() => {
    if (sortColumn) {
      sortTable(sortColumn, initialDataSet);
    } else {
      setTableData(initialDataSet);
    }
    setSearchTerm("");
  }, [sortColumn, sortTable]);

  const actions = {
    setSearchTerm,
    setSortColumn,
    setTableData,
    sortTable,
    handleReset,
  };
  return (
    <div className="data-table-container">
      <TableControls
        searchTerm={searchTerm}
        sortColumn={sortColumn}
        tableData={tableData}
        actions={actions}
      />
      <Table tableData={tableData} sortColumn={sortColumn} actions={actions} />
    </div>
  );
}
