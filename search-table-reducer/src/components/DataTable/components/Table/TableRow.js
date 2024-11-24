export function TableRow({ row, "data-row-id": dataRowId }) {
  return (
    <tr className="data-row" data-row-id={dataRowId}>
      <td>{row.name}</td>
      <td>{row.age}</td>
    </tr>
  );
}
