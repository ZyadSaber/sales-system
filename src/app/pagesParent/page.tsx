'use client'

import { memo, useCallback, useState } from "react"
import { TableWithApi, useCreateTableActionRef } from "@/components/table"
import { usePost } from "@/hooks"
import { RecordWithAnyData } from "@/types"
import { columns } from "./constants"

const PagesParent = () => {
    const { mutate } = usePost({
        apiId: "QUERY_AND_POST_PAGES_PARENT_TABLE_DATA"
    })

    const [selectedRow, setSelectedRow] = useState<RecordWithAnyData>()
    const {
        tableRef,
        fetchTableData,
        getTableData,
        setTableData,
    } = useCreateTableActionRef()

    const handleAdd = useCallback(() => {
        setTableData((prev) => (
            [
                {
                    page_parent_id: `${Math.random().toFixed(3)}_id`,
                    record_status: "n"
                },
                ...prev
            ]
        ))
    }, [setTableData])

    const handleSave = useCallback(() => {
        const tableDataToSave = getTableData()
        mutate({
            data: tableDataToSave,
            cb: ({ error }) => {
                console.log(error)
            }
        })
    }, [getTableData, mutate])

    const handleDelete = useCallback(() => {
        const computedObj = {
            ...selectedRow,
            record_status: 'd'
        }
    }, [selectedRow])

    return (
        <>
            <TableWithApi
                //@ts-ignore
                ref={tableRef}
                columns={columns as any}
                rowKey="page_parent_id"
                apiId="QUERY_AND_POST_PAGES_PARENT_TABLE_DATA"
                editableTable
                hideTableHeader={false}
                onAdd={handleAdd}
                onSave={handleSave}
                onDelete={handleDelete}
                onSelectRow={setSelectedRow}
            />
        </>
    )
}

export default memo(PagesParent)