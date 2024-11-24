export function ResetButton({ actions }) {
  return (
    <button className="reset" onClick={actions.handleReset}>
      Reset
    </button>
  );
}
