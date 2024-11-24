import { useDataTable } from "../../hooks/useDataTable";

export function ResetButton() {
  const { actions } = useDataTable();

  return (
    <button className="reset" onClick={actions.handleReset}>
      Reset
    </button>
  );
}
