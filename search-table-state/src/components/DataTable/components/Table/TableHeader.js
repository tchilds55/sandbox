export function TableHeader({ sortColumn, actions }) {
  const { sortTable } = actions;

  const getSortIndicator = (column) => {
    if (sortColumn?.toLowerCase() === column.toLowerCase()) {
      return " 🔼";
    }
    return "";
  };

  return (
    <thead>
      <tr>
        <th>
          <button className="header-name" onClick={() => sortTable("name")}>
            Name{getSortIndicator("name")}
          </button>
        </th>
        <th>
          <button className="header-age" onClick={() => sortTable("age")}>
            Age{getSortIndicator("age")}
          </button>
        </th>
      </tr>
    </thead>
  );
}
