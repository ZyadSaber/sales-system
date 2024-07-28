import { memo, forwardRef, useImperativeHandle, useState, useCallback } from "react";
import { useFetch, useFormManager } from "@/hooks";
import { RecordWithAnyData } from "@/types";
import BaseTable from "./BaseTable"
import { TableDataRecord } from "./interface"

const TableWithApi = (
    {
        apiId,
        params,
        rowKey,
        ...restTableProps
    }: any,
    ref: any
) => {

    const { values, onChange, setState } = useFormManager({
        initialValues: {
            count: 0,
            data: []
        }
    })

    const { data, count } = values

    const handleResponse = useCallback((e: TableDataRecord) => {
        setState(e)
    }, [setState])

    const { loading } = useFetch({
        apiId,
        fetchOnFirstRun: true,
        onResponse: handleResponse,
        params
    })

    const handleTableChange = useCallback(({ index, changeProps: { name, value } }: RecordWithAnyData) => {
        const computedArray = data.map((record: RecordWithAnyData) => {
            if (record?.[rowKey] === index) {
                return {
                    ...record,
                    [name]: value
                }
            }
            return record
        })
        onChange({
            name: "data",
            value: computedArray
        })
    }, [data, onChange, rowKey])

    return (
        <BaseTable
            dataSource={data}
            totalRecords={count}
            loading={loading}
            onTableChange={handleTableChange}
            rowKey={rowKey}
            {...restTableProps}
        />
    )
}

export default memo(forwardRef(TableWithApi))