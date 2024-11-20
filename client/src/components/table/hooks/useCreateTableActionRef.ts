import { useRef, useCallback } from "react";
import { RecordWithAnyValue } from "../../../types";

const useCreateTableActionRef = () => {
  const tableRef = useRef();

  const fetchTableData = useCallback(
    async (params?: RecordWithAnyValue) =>
      //@ts-ignore
      await tableRef.current?.runQuery(params),
    [tableRef]
  );

  const getTableData = useCallback(
    //@ts-ignore
    () => tableRef.current?.getCurrentDataSource() || [],
    [tableRef]
  );

  const resetTableData = useCallback(
    //@ts-ignore
    () => tableRef.current?.resetTableData() || [],
    [tableRef]
  );

  return {
    tableRef,
    fetchTableData,
    getTableData,
    resetTableData,
  };
};

export default useCreateTableActionRef;
