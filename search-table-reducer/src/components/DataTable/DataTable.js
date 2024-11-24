import { DataTableProvider } from "./DataTableProvider";
import { TableControls } from "./components/TableControls/TableControls";
import { Table } from "./components/Table/Table";

export function DataTable() {
  return (
    <DataTableProvider>
      <div className="data-table-container">
        <TableControls />
        <Table />
      </div>
    </DataTableProvider>
  );
}
