import { SearchBar } from "./SearchBar";
import { ResetButton } from "./ResetButton";

export function TableControls({ searchTerm, sortColumn, tableData, actions }) {
  return (
    <div className="table-controls">
      <SearchBar
        searchTerm={searchTerm}
        sortColumn={sortColumn}
        tableData={tableData}
        actions={actions}
      />
      <ResetButton actions={actions} />
    </div>
  );
}
