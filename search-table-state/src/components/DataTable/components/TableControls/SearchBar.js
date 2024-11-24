export function SearchBar({ searchTerm, sortColumn, tableData, actions }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchTerm) {
      actions.handleReset();
      return;
    }

    if (!tableData) {
      console.warn("No data available to search");
      return;
    }

    const filterData = tableData.filter((row) => {
      return Object.values(row)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    });

    if (sortColumn) {
      // Note sortTable will set the data
      actions.sortTable(sortColumn, filterData);
    } else {
      actions.setTableData(filterData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <div>
        <input
          autoFocus
          className="search-input"
          placeholder="Search term..."
          value={searchTerm}
          onChange={(e) => actions.setSearchTerm(e.target.value)}
        />
        <button type="submit" className="table-button">
          Search
        </button>
      </div>
    </form>
  );
}
