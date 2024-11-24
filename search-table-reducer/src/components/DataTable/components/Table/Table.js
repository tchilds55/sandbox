import { TableHeader } from "./TableHeader";
import { TableBody } from "./TableBody";

export function Table() {
  return (
    <table className="data-table">
      <TableHeader />
      <TableBody />
    </table>
  );
}
