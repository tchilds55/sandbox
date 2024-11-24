import { TableHeader } from "./TableHeader";
import { TableBody } from "./TableBody";

export function Table({ sortColumn, tableData, actions }) {
  return (
    <table className="data-table">
      <TableHeader sortColumn={sortColumn} actions={actions} />
      <TableBody tableData={tableData} />
    </table>
  );
}
