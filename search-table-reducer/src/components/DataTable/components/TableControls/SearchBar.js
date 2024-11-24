import { useDataTable } from "../../hooks/useDataTable";
import { tableActions } from "../../context/actions";

export function SearchBar() {
  const { tableSettings, actions } = useDataTable();
  const { dispatch, handleReset } = actions;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!tableSettings.searchTerm) {
      handleReset();
      return;
    }

    if (!tableSettings.tableData) {
      console.warn("No data available to search");
      return;
    }

    const filterData = tableSettings.tableData.filter((row) => {
      return Object.values(row)
        .join(" ")
        .toLowerCase()
        .includes(tableSettings.searchTerm.toLowerCase());
    });

    if (tableSettings.sortColumn) {
      // Note sortTable will set the data
      actions.sortTable(tableSettings.sortColumn, filterData);
    } else {
      dispatch(tableActions.setTableData(filterData));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <div>
        <input
          autoFocus
          className="search-input"
          placeholder="Search term..."
          value={tableSettings.searchTerm}
          onChange={(e) => dispatch(tableActions.setSearchTerm(e.target.value))}
        />
        <button type="submit" className="table-button">
          Search
        </button>
      </div>
    </form>
  );
}
