import { memo, forwardRef, useImperativeHandle, useMemo, useCallback, useState } from "react";
import { useFetch } from "@/hooks";
import { RecordWithAnyData } from "@/types";
import BaseTable from "./BaseTable"
import { TableForwardedRefType, TableWithApiProps } from "./interface"

const TableWithApi = (
    {
        apiId,
        params,
        rowKey,
        ...restTableProps
    }: TableWithApiProps,
    ref: TableForwardedRefType
) => {

    const [tableData, setTableData] = useState<RecordWithAnyData[]>([])

    const handleResponse = useCallback((e: RecordWithAnyData[]) => {
        setTableData(e)
    }, [])

    const { loading, runFetch } = useFetch({
        apiId,
        fetchOnFirstRun: true,
        onResponse: handleResponse,
        params
    })

    const handleTableChange = useCallback(({ index, changeProps: { name, value } }: RecordWithAnyData) => {
        const computedArray = tableData.map((record: RecordWithAnyData) => {
            if (record?.[rowKey] === index) {
                return {
                    ...record,
                    [name]: value,
                    record_status: record?.record_status === 'q' ? "u" : "n"
                }
            }
            return record
        })
        setTableData(prev => ({
            ...prev,
            data: computedArray
        }))
    }, [rowKey, tableData])

    const foundDataSource = useMemo(() => tableData, [tableData]);

    useImperativeHandle(ref, () => ({
        runFetch,
        setTableData,
        resetTableData: () => setTableData([]),
        getCurrentDataSource: () => foundDataSource,
    }));


    return (
        <BaseTable
            dataSource={tableData}
            totalRecords={tableData?.length}
            loading={loading}
            onTableChange={handleTableChange}
            rowKey={rowKey}
            {...restTableProps}
        />
    )
}

// @ts-ignore ignore react "forwardRef" for misleading types.
export default memo(forwardRef(TableWithApi))