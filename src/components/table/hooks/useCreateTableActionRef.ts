import { useRef, useCallback } from "react";
import { RecordWithAnyData } from "@/types";
import { TableForwardedValuesForRef } from "../interface";

const useCreateTableActionRef = () => {
  const tableRef = useRef<TableForwardedValuesForRef>();

  const fetchTableData = useCallback(
    async (params?: RecordWithAnyData) => tableRef.current?.runFetch(params),
    [tableRef]
  );

  const getTableData = useCallback(
    () => tableRef.current?.getCurrentDataSource() || [],
    [tableRef]
  );

  const setTableData = useCallback(
    (
      newTableData:
        | RecordWithAnyData[]
        | ((previous: RecordWithAnyData[]) => RecordWithAnyData[])
    ) => tableRef.current?.setTableData(newTableData) || [],
    [tableRef]
  );

  const resetTable = useCallback(
    () => tableRef.current?.resetTableData() || [],
    [tableRef]
  );

  return {
    tableRef,
    fetchTableData,
    getTableData,
    setTableData,
    resetTable,
  };
};

export default useCreateTableActionRef;
