import { useContext } from "react";
import { DataTableContext } from "../context/DataTableConstants";

export function useDataTable() {
  const context = useContext(DataTableContext);
  if (context === undefined) {
    throw new Error("useDataTable must be used within a DataTableProvider");
  }
  return context;
}
