export const tableActions = {
  setSearchTerm: (term) => ({
    type: "searchTerm",
    payload: term,
  }),
  setSortColumn: (column) => ({
    type: "sortColumn",
    payload: column,
  }),
  setTableData: (data) => ({
    type: "tableData",
    payload: data,
  }),
};
