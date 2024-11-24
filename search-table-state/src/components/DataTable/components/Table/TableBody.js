import { TableRow } from "./TableRow";

export function TableBody({ tableData }) {
  if (tableData.length === 0) {
    return (
      <tbody>
        <tr>
          <td colSpan={2}>No results found</td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody>
      {tableData.map((row, index) => (
        <TableRow
          key={`${row.name}-${index}`}
          row={row}
          data-row-id={`row-${index}`}
        />
      ))}
    </tbody>
  );
}
