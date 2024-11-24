import { useContext } from "react";
import { DataTableContext } from "../context/DataTableContext";

export function useDataTable() {
  const context = useContext(DataTableContext);
  if (context === undefined) {
    throw new Error("useDataTable must be used within a DataTableProvider");
  }
  return context;
}
